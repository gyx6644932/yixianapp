        var uploadImgNum = 0;
        var imgArr = [];
        var fileNames = [];
        var expertId = 0;

        function addImg() {
            uexWindow.cbActionSheet = function(opId, dataType, data) {
                if (data == 0) {
                    cameraOpen();
                }
                if (data == 1) {
                    fileOpen();
                }
            }
            var value = "拍照上传;从手机相册选择";
            var mycars = value.split(";");
            uexWindow.actionSheet("", "取 消", mycars);
        }

        function deleteImg(obj) {
            var src = $(obj).attr('src');
            var str = "";
            for (var i = 0; i < imgArr.length; i++) {
                if (imgArr[i] == src) {
                    imgArr.splice(i, 1);
                } else {
                    str += imgArr[i];
                }
            }
            $(obj).remove();
        }

        function cameraOpen() {
            uexCamera.cbOpen = function(opCode, dataType, data) {

                imgArr.push(data);

                var str = "";

                for (var i = 0; i < imgArr.length; i++) {
                    str += "<img onclick='deleteImg(this)' class='uwh-bg umar-r-ect' src='" + imgArr[i] + "'>";
                }
                $('#imgList').html(str);
            }
            uexCamera.open();
        }

        function fileOpen() {
            uexImageBrowser.cbPick = function(opCode, dataType, data) {
                if (data == "") {
                    return;
                }

                var arr = data.split(',');

                if (imgArr.length + arr.length > 4) {
                    uexWindow.toast("0", "5", "上传图片不能超4张！", "2000");
                    return;
                }

                for (var i = 0; i < arr.length; i++) {
                    imgArr.push(arr[i]);
                }

                var str = "";

                for (var i = 0; i < imgArr.length; i++) {
                    str += "<img onclick='deleteImg(this)' class='uwh-bg umar-r-ect' src='" + imgArr[i] + "'>";
                }
                $('#imgList').html(str);
            }
            uexImageBrowser.pickMulti(4);
        }

        function uploadImg() {

            var content = $("#content").val();
            var Token = getToken();

            if (Token == null) {
                 uexWindow.openPopover("login", "0", "login.html", "", 0, 0, 0, 0, '', "0", 0);
                return;
            }

            if (content == "" || imgArr.length == 0) {
                uexWindow.toast("0", "5", "请填写描述和上传图片！", "2000");
                return;
            }

            if (expertid == 0) {
                uexWindow.toast("0", "5", "请选择一名专家！", "2000");
                return;
            }

            if (uploadImgNum == imgArr.length) {
                uexWindow.toast("0", "5", "图片上传结束！", "2000");

                appcan.request.ajax({
                    type : 'POST',
                    url : http + "common/uploadicon",
                    data : {
                        token : Token,
                        content : content,
                        icon : fileNames.join('|'),
                        expertid : expertid
                    },
                    dataType : 'json',
                    timeout : 300,
                    success : function(result) {
                        if (result.Success) {
                            uexWindow.toast("0", "5", "1", "2000");
                        } else {
                            uexWindow.toast("0", "5", "2", "2000");
                        }
                    },
                    error : function(xhr, type) {
                        uexWindow.toast("0", "5", '您网络不给力,请重新加载!', "2000");
                    },
                    offline : false
                });

                return;
            }
            upload(imgArr[uploadImgNum], uploadImgNum);
            uploadImgNum++;
        }

        function upload(imgPath, i) {
            var uploadHttp = http + "common/uploadicon";
            randOpId = Math.floor(Math.random() * (1000 + 1));
            uexUploaderMgr.onStatus = function(opCode, fileSize, percent, serverPath, status) {
                switch (status) {
                case 0:
                    uexWindow.toast("1", "5", percent + "%", "0");
                    break;
                case 1:
                    uexUploaderMgr.closeUploader(opCode);
                    uexWindow.closeToast();

                    var json = eval("(" + serverPath + ")");

                    if (json.flag) {
                        fileNames.push(json.data);
                    }

                    uexWindow.toast("0", "5", "图片成功上传！", "2000");
                    uploadImg();
                    break;
                case 2:
                    uexWindow.closeToast();
                    uexWindow.toast('0', '5', "图片上传失败", "2000");
                    uexUploaderMgr.closeUploader(opCode);
                    uploadImg();
                    break;
                default:
                    break;
                }
            }

            uexUploaderMgr.cbCreateUploader = function(opCode, dataType, data) {
                if (data == 0) {
                    var path = imgPath;
                    var inCompress = 1;
                    if (uexWidgetOne.platformName == "iOS") {
                        uexUploaderMgr.uploadFile(opCode, path, "file", inCompress, 720);
                    }
                    if (uexWidgetOne.platformName == "android") {
                        uexUploaderMgr.uploadFile(opCode, path, "file", inCompress, 720);
                    }
                } else {
                    uexWindow.closeToast();
                    var strimg2 = "图片上传失败";
                    uexWindow.toast('0', '5', '图片上传失败', 3000);
                }
            }
            var strimg2 = "开始上传图片";
            uexWindow.toast('1', '5', strimg2, '');
            uexUploaderMgr.createUploader(randOpId, uploadHttp);
        }


    