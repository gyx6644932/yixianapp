/*
 codeio.showimage.js

 2015-08-04

 风骑士之怒

 */

(function($) {

    $.extend($, {
        showimage : function(data, callback) {
            var imgData = data;
            var doubleFlag = false;
            var doubleTouch = false;
            var w = $(window).width();
            var h = $(window).height();
            var startX1 = 0;
            var startX2 = 0;
            var startY1 = 0;
            var startY2 = 0;
            var x1 = 0;
            var x2 = 0;
            var y1 = 0;
            var y1 = 0;
            var imgW = 0;
            var imgLeft = 0;
            var imgTop = 0;
            var left = 0;
            var bigTop = 0;
            var bigLeft = 0;
            var currentPage = 1;
            var totalpage = imgData.length;
            var wrapW = totalpage * w;
            var page = 0;

            var divScroll = $("<div/>").addClass("scroll").appendTo(document.body);
            var divWrap = $("<div/>").addClass("wrap").appendTo(divScroll);
            var divPager = $("<div/>").addClass("pager").appendTo(divScroll);

            divPager.html(currentPage + ' / ' + totalpage);

            for (var i = 0; i < imgData.length; i++) {
                divWrap.append("<div class='item'><img src='" + imgData[i] + "' /></div>");
            }

            divScroll.css("width", w + "px");
            divWrap.css("width", wrapW + "px");
            divScroll.find(".item").css("width", w + "px");

            divScroll.find("img").on("load", function() {
                var imgH = $(this).offset().height;
                if (h > imgH) {
                    var t = (h - imgH) / 2;
                    $(this).css("top", t + "px");
                } else {
                    $(this).css("height", h + "px");
                }
            });

            divScroll.on("touchstart", function(e) {
                e.preventDefault();

                g1 = e.touches[0];
                g2 = e.touches[1];

                x1 = g1.pageX;
                y1 = g1.pageY;

                startX1 = g1.pageX;
                startY1 = g1.pageY;

                doubleFlag = false;
                if (g2) {
                    doubleFlag = true;

                    x2 = g2.pageX;
                    y2 = g2.pageY;
                    startX2 = g2.pageX;
                    startY2 = g2.pageY;

                    imgW = divWrap.find(".item img").eq(currentPage - 1).offset().width;
                    imgLeft = divWrap.find(".item img").eq(currentPage - 1).offset().left;
                    imgTop = divWrap.find(".item img").eq(currentPage - 1).offset().top;
                } else {
                    if (doubleTouch === true) {
                        bigTop = divWrap.find(".item img").eq(currentPage - 1).offset().top;
                        bigLeft = divWrap.find(".item img").eq(currentPage - 1).offset().left;
                    } else {
                        left = divWrap.offset().left;

                        divWrap.css({
                            "-webkit-transition-duration" : "0"
                        });
                    }

                }
            });

            divScroll.on("touchmove", function(e) {
                g1 = e.touches[0];
                g2 = e.touches[1];

                x1 = g1.pageX;
                y1 = g1.pageY;

                if (g2) {
                    x2 = g2.pageX;
                    y2 = g2.pageY;

                    var changeX = Math.abs(startX1 - startX2) - Math.abs(x1 - x2);
                    var changeY = Math.abs(startY1 - startY2) - Math.abs(y1 - y2);
                    var changGL = Math.abs(changeX) > Math.abs(changeY) ? changeX : changeY;

                    if (imgW - changGL <= w) {
                        divWrap.find(".item img").eq(currentPage - 1).css({
                            "left" : "0",
                            "width" : "100%",
                            "height" : "auto"
                        });
                        doubleTouch = false;
                    } else {
                        var pec = Math.ceil(((imgW - changGL) / w) * 100);
                        
                        divWrap.find(".item img").eq(currentPage - 1).css({
                            "width" : pec + "%",
                            "height" : "auto",
                            "left" : (imgLeft + changeX) + "px",
                            "top" : (imgTop + changeY) + "px"
                        });

                        doubleTouch = true;
                    }

                    var imgH = divWrap.find(".item img").eq(currentPage - 1).offset().height;
                    if (h > imgH) {
                        var t = (h - imgH) / 2;
                        divWrap.find(".item img").eq(currentPage - 1).css("top", t + "px");
                    }

                } else {
                    if (!doubleFlag) {
                        if (doubleTouch === true) {
                            var tempTop = 0;
                            var tempLeft = 0;

                            if (startX1 - x1 > 0) {
                                tempLeft = bigLeft - (startX1 - x1);
                            }
                            if (startX1 - x1 < 0) {
                                tempLeft = bigLeft + x1 - startX1;
                            }
                            if (startY1 - y1 > 0) {
                                tempTop = bigTop - (startY1 - y1);
                            }
                            if (startY1 - y1 < 0) {
                                tempTop = bigTop + y1 - startY1;
                            }
                            divWrap.find(".item img").eq(currentPage - 1).css("left", tempLeft + "px");
                            divWrap.find(".item img").eq(currentPage - 1).css("top", tempTop + "px");

                        } else {
                            var temp = 0;

                            var nowLeft = divWrap.offset().left;

                            var curr = Math.abs(nowLeft) / w;

                            if (startX1 - x1 > 0) {
                                temp = left - (startX1 - x1);
                            }
                            if (startX1 - x1 < 0) {
                                temp = left + x1 - startX1;
                            }

                            if (startX1 != x1) {
                                
                                if (temp < -(w * (totalpage - 1))) {
                                    temp = -(w * (totalpage - 1));
                                }

                                if (temp > 0) {
                                    temp = 0;
                                }

                                divWrap.css("left", temp + "px");
                            }

                            currentPage = Math.round(curr) + 1;

                            divPager.html(currentPage + ' / ' + totalpage);
                        }
                    }
                }
            });

            divScroll.on("touchend", function(e) {
                g1 = e.changedTouches[0];
                g2 = e.changedTouches[1];
                x1 = g1.pageX;

                if (startX1 != x1 && Math.abs(startX1 - x1) > 5) {
                    var nowLeft = divWrap.offset().left;

                    var curr = Math.round(Math.abs(nowLeft) / w);

                    divWrap.css({
                        "-webkit-transition-duration" : "300ms",
                        "left" : -w * curr + "px"
                    });

                    currentPage = Math.round(curr) + 1;

                    divPager.html(currentPage + ' / ' + totalpage);
                } else {
                    if (typeof (callback) == "function" && !doubleFlag) {
                        callback();
                    }
                }
            });
        }
    });
})(Zepto);
