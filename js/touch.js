/*
 codeio.showimage.js

 2015-08-04

 风骑士之怒

 */

(function($) {

    $.extend($, {
        showimage : function(callback) {
            var doubleFlag = false;
            var doubleTouch = false;
            var jg = 20;
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
            var totalpage = 2;
            var wrapW = totalpage * (w + jg);
            var page = 0;

            var divScroll = $("<div/>").addClass("scrollIdentify").appendTo("p");
            var divWrap = $("<div/>").addClass("wrap").appendTo(divScroll);
            var divPager = $("<div/>").addClass("pager").appendTo(divScroll);

            divPager.html(currentPage + ' / ' + totalpage);
         
           
                str = templateDiv();
                divWrap.append(str);
           
            function templateDiv(src){
            var str = ''
            str += " <div id='TodayBg'  class='ub-f1 tx-l uc-a1 gery ubb bc-border' style='display: block;width: 100%'>";
               str += " <div class='ub ub-ac uinn ub-ver bc-bg'>";
                  str += "  <div class='ub ub-f1 ub-ac ub-pc textbb orange' style='width: 12em;height:2.8em;'>";
                       str += " <a style='position: relative;'>您的今日鉴定收入 </a>";
                    str += " </div>";
                    str += " <div class='ub-f1 ub ub-pc ub-ac orange textbb' style='width: 10em;height:2.3em;position: relative;top:-.6em;'>";
                       str += " <img style='position: absolute;' src='../img/identify/bg2.png'/>";
                      str += "  <a id='todayAll'></a>";
                  str += "  </div>";
                        str += " <div class='Oldday ub-f1 ub ub-ac ub-pe' style='position: absolute;right:1em;top:6em;width: 3em;height:4em;'>";
                        str += " <i class=' fa fa-chevron-right orange' style='font-size: 1.2em;'></i>";
                     str += "</div>";
               str += " </div>";
                str += "<div class='ub ub-ver bc-bg' id='expertList' style='height: 8em;border-radius: 0em 0em 0.3em 0.3em;' id='expertList'>";
                    str += "<div class='ub'  style='height: 50%;'>";
                       str += " <div class='ub-f1 ub-ver ub ub-ac'>";
                           str += " <div class='ub'>";
                                str += "随机鉴定收入";
                           str += " </div>";
                           str += " <a id='todayRandomIdentifyIncome' class='orange'></a>";
                           str += " <div class='ubb'  style='width: 5.5em;border-color: #BBBBBB;padding-top: .5em;'></div>";
                       str += " </div>";
                        str += "<div class='ub-ver ub ub-ac ub-pc ubl ' style='height: 2.5em;border-color:#BBBBBB'>";

                       str += " </div>";
                       str += " <div class='ub-f1 ub-ver ub ub-ac'>";
                           str += " <div class='ub'>";
                               str += " 指定鉴定收入";
                           str += " </div>";
                           str += " <a id='todayExpertIdentifyIncome' class='orange'></a>";
                            str += "<div class='ubb'  style='width: 5.5em;border-color: #BBBBBB;padding-top: .5em;'></div>";
                        str += "</div>";
                   str += " </div>";

                   str += " <div class='ub'  style='height: 30%;'>";
                        str += "<div class='ub-f1 ub-ver ub ub-ac'>";
                           str += " <div class='ub'>";
                               str += " 随机鉴定订单";
                            str += "</div>";
                           str += " <a id='todayRandomIdentifyOrder' class='orange'></a>";
                        str += "</div>";
                        str += "<div class='ub-ver ub ub-ac ub-pc ubl ' style='height: 2.5em;border-color: #BBBBBB'>";

                       str += " </div>";
                        str += "<div class='ub-f1 ub-ver ub ub-ac'>";
                            str += "<div  class='ub'>";
                             str += "   指定鉴定订单";
                           str += " </div>";
                           str += " <a id='todayExpertIdentifyOrder' class='orange'></a>";
                        str += "</div>";
                    str += "</div>";
                str += "</div>";
           str += " </div>";

            str += " <div id='OldBg'  class='ub-f1 tx-l uc-a1 gery ubb bc-border' style='width: 100%'>";
                str += " <div class='ub ub-ac uinn ub-ver bc-bg'>";
                    str += " <div class='ub ub-f1 ub-ac ub-pc textbb orange' style='width: 12em;height:2.8em'>";
                        str += " <a style='position: relative;'>您的往期鉴定收入 </a>";
                   str += "  </div>";
                    str += " <div class='ub-f1 ub ub-pc ub-ac orange textbb' style='width: 10em;height:2.3em;position: relative;top:-.6em;'>";
                        str += " <img style='position: absolute;' src='../img/identify/bg2.png'/>";
                        str += " <a id='totalAll'></a>";
                    str += " </div>";
                       str += " <div class='Today ub-f1 ub ub-ac' style='position: absolute;left:1em;top:6em;width: 3em;height:4em;'>";
                        str += "<i class=' fa fa-chevron-left orange' style='font-size: 1.2em;'></i>";
                   str += " </div>";
                str += " </div>";
                str += " <div class='ub ub-ver bc-bg' id='expertList' style='height: 8em;border-radius: 0em 0em 0.3em 0.3em;' id='expertList'>";
                    str += " <div class='ub'  style='height: 50%;'>";
                        str += " <div class='ub-f1 ub-ver ub ub-ac'>";
                            str += " <div class='ub'>";
                                 str += "随机鉴定收入";
                            str += " </div>";
                            str += " <a id='totalRandomIdentifyIncome' class='orange'></a>";
                            str += " <div class='ubb'  style='width: 5.5em;border-color: #BBBBBB;padding-top: .5em;'></div>";
                        str += " </div>";
                         str += "<div class='ub-ver ub ub-ac ub-pc ubl ' style='height: 2.5em;border-color:#BBBBBB'>";

                         str += "</div>";
                         str += "<div class='ub-f1 ub-ver ub ub-ac'>";
                             str += "<div class='ub'>";
                                str += " 指定鉴定收入";
                            str += " </div>";
                            str += " <a id='totalExpertIdentifyIncome' class='orange'></a>";
                             str += "<div class='ubb'  style='width: 5.5em;border-color: #BBBBBB;padding-top: .5em;'></div>";
                        str += " </div>";
                    str += " </div>";

                    str += " <div class='ub'  style='height: 30%;'>";
                        str += " <div class='ub-f1 ub-ver ub ub-ac'>";
                            str += " <div class='ub'>";
                                str += " 随机鉴定订单";
                            str += " </div>";
                            str += " <a id='totalRandomIdentifyOrder' class='orange'></a>";
                        str += " </div>";
                        str += " <div class='ub-ver ub ub-ac ub-pc ubl ' style='height: 2.5em;border-color: #BBBBBB'>";

                         str += "</div>";
                         str += "<div class='ub-f1 ub-ver ub ub-ac'>";
                            str += " <div  class='ub'>";
                                str += " 指定鉴定订单";
                            str += " </div>";
                            str += " <a id='totalExpertIdentifyOrder' class='orange'></a>";
                        str += " </div>";
                     str += "</div>";
                str += " </div>";
            str += " </div>";
            
            return str
}
            divScroll.css("width", w + "px");
            divWrap.css("width", wrapW + "px");
            divScroll.find(".item").css("width", w + "px");
            
            divScroll.on("touchstart", function(e) {
                e.preventDefault();
                g1 = e.touches[0];
                x1 = g1.pageX;
                y1 = g1.pageY;

                startX1 = g1.pageX;
                startY1 = g1.pageY;

                        left = divWrap.offset().left;

                        divWrap.css({
                            "-webkit-transition-duration" : "0"
                        });
            });


            divScroll.on("touchmove", function(e) {
                g1 = e.touches[0];
                x1 = g1.pageX;
                y1 = g1.pageY;
                
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
                                if (temp < -((w + jg) * (totalpage - 1))) {
                                    temp = -((w + jg) * (totalpage - 1));
                                }

                                if (temp > 0) {
                                    temp = 0;
                                }

                                divWrap.css("left", temp + "px");
                            }

                            currentPage = Math.round(curr) + 1;

                            divPager.html(currentPage + ' / ' + totalpage);
                
            });

            divScroll.on("touchend", function(e) {
                g1 = e.changedTouches[0];
                x1 = g1.pageX;

                if (startX1 != x1 && Math.abs(startX1 - x1) > 5) {
                    var nowLeft = divWrap.offset().left;

                    var curr = Math.round(Math.abs(nowLeft) / w);

                    divWrap.css({
                        "-webkit-transition-duration" : "300ms",
                        "left" : -(w + jg) * curr + "px"
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
