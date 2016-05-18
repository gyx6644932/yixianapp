var curstep = localStorage.getItem('TaskName');
var FlowType;
function gettitle(){
    var curtype = localStorage.getItem("ArchiveType");
    FlowType = localStorage.getItem('FlowType');
    switch (FlowType) {
        case "1":
            $$('typehead').innerHTML = "日常公文";
            break;
        case "2":
            $$('typehead').innerHTML = "督办工作";
            break;
        case "3":
            $$('typehead').innerHTML = "建议提案";
            break;
        case "6":
            $$('typehead').innerHTML = "局领导批示";
            break;
        case "8":
            $$('typehead').innerHTML = "预售许可";
            break;
    }
    if (FlowType == 2 || curstep == '收文' || curstep == '派件' || curstep == '归档') {
        $$('divsubmit').innerText = '提交';
        
    }
    else {
        $$('divsubmit').innerText = '提交机要室';
    }
	var State=localStorage.getItem("State");
	if(State==1){
		if(curstep=='归档'){
			addClass($$('dend'),'ub');
			removeClass($$('dend'),'uhide');
		}
		else if(curstep=='派件'&&FlowType==1){
			addClass($$('dend'),'ub');
			removeClass($$('dend'),'uhide');
		}
		else{
			addClass($$('dend'),'uhide');
			removeClass($$('dend'),'ub');
		}
	}
}

function a_views(){
    var s = window.getComputedStyle(document.body, null);
    var x = 0;
    var y = 0;
    uexWindow.openPopover("oa_approve", "0", "oa_approve.html", "", int(x), int(y), int(s.width), int(s.height), int(s.fontSize), "0");
}

function closePop(){
    uexWindow.closePopover("oa_approve");
    
}

function submit(){
    if (FlowType != 2) { 
        if (curstep == '拟办意见' || curstep == '领导批示' || curstep == '办理') {
            uexWindow.evaluatePopoverScript("", "content", "getdetailandsubmit(2)");
        }
        else {
            openNewWin('contactslist', 'contactslist.html');
            localStorage.setItem("showcontacttype", "submit");
        }
        var cursuggest = localStorage["suggest"];
    }
    else { //抄送件
        uexWindow.evaluatePopoverScript("", "content", "getdetailandsubmit(1)");
    }
    
}

function save(){
    uexWindow.evaluatePopoverScript("", "content", "getdetailandsave()");
}

function getsuggest(){

    uexWindow.evaluatePopoverScript("", "content", "getsuggest()");
    
}

function cc(){
    localStorage.setItem("showcontacttype", "cc");
    openNewWin('contactslist', 'contactslist.html');
}
function endflow(){
	if (confirm('确认结束流程吗')) {
		uexWindow.evaluatePopoverScript("", "content", "getdetailandend()");
	}
}

var sta = 0;
function showflow(){
    var s = window.getComputedStyle(document.body, null);
    var x = 0;
    var y = 0;
    uexWindow.openPopover("showflow", "0", "showflow.html", "", int(x), int(y), int(s.width), int(s.height), int(s.fontSize), "0");
}

function closePop(){
    uexWindow.closePopover("showflow");
    
}

function closedetail(){
    var dfrom = localStorage.getItem('detailfrom');
    if (dfrom == 'list') {
        uexWindow.evaluateScript("listofrcgw", 0, "refreshthis()");
    }
    else {
        uexWindow.evaluateScript("default", 0, "refreshthis()");
    }
    winClose();
    
}

var sta = 0;
function choosepro(){
    var s = window.getComputedStyle(document.body, null);
    var x = 0;
    var y = 0;
    uexWindow.openPopover("showflow", "0", "choose-pro_content.html", "", int(x), int(y), int(s.width), int(s.height), int(s.fontSize), "0");
}




/*===================上传图片====================*/
var filefrom="";
var allimg="";
function deleteImg(src,e){
                e.stopPropagation();
                e.preventDefault();
                var img=filefrom.split(";");
                filefrom="";
                for(i=0;i<img.length-1;i++){
                        if(img!=src){
                                filefrom+=img+";";
                        }                        
                }
                img=filefrom.split(";");
                var imgList="";
                for(i=0;i<img.length-1;i++){
                        imgList+="<div id='img"+i+"' class='yxb1_box9 clearfix'>";
            imgList+="<div ontouchstart=zy_touch('btn-act1') onclick=\"deleteImg('"+img+"',event)\" class='x_box3'>";
            imgList+="<img src='img/yxico10.png'/>";
            imgList+="</div>";
            imgList+="<img ontouchstart=zy_touch('btn-act1') onclick=\"deleteImg('"+img+"',event)\" src='file://"+img+"'/>";
            imgList+="</div>";
                }
                $$('imgList').innerHTML=imgList;
}

function imgopen(){
    
        uexWindow.cbActionSheet=function (opId, dataType, data){
        if(data == 0){
                paiopen();
        }
        else if(data == 1){
                fileopen();
        }
        }
        var value = "拍照上传;本地上传";
        var mycars=value.split(";");
        uexWindow.actionSheet("","取消",mycars);
}

function paiopen(){
        uexCamera.cbOpen=function (opCode, dataType, data)        {
                filefrom +=data+";";
                var img=filefrom.split(";");
                var imgList="";
                var j="";
                for(i=0;i<img.length-1;i++){
                        imgList+="<div id='img"+i+"' class='yxb1_box9 clearfix'>";
            imgList+="<div ontouchstart=zy_touch('btn-act1') onclick=\"deleteImg('"+img+"',event)\" class='x_box3'>";
            imgList+="<img src='img/yxico10.png'/>";
            imgList+="</div>";
            imgList+="<img ontouchstart=zy_touch('btn-act1') onclick=\"deleteImg('"+img+"',event)\" src='file://"+img+"'/>";
            imgList+="</div>";        
                }
                $$('imgList').innerHTML=imgList;
        }
        uexCamera.open();
}

function fileopen(){
        uexImageBrowser.cbPick=function (opCode,dataType,data)        {
                if(data==""){return;}
                filefrom +=data+";";
                var img=filefrom.split(";");
                var imgList="";
                var j="";
                for(i=0;i<img.length-1;i++){        
                        imgList+="<div id='img"+i+"' class='yxb1_box9 clearfix'>";
            imgList+="<div ontouchstart=zy_touch('btn-act1') onclick=\"deleteImg('"+img+"',event)\" class='x_box3'>";
            imgList+="<img src='img/yxico10.png'/>";
            imgList+="</div>";
            imgList+="<img ontouchstart=zy_touch('btn-act1') onclick=\"deleteImg('"+img+"',event)\" src='file://"+img+"'/>";
            imgList+="</div>";
                }
                $$('imgList').innerHTML=imgList;
        }
        uexImageBrowser.pick();
}

var uploadImgNum=0;
function uploadImg(){
        if(filefrom==""){
                submit();//表单及其它数据提交到服务器端
                return;
        }
        var img=filefrom.split(";");        
        if(uploadImgNum==img.length-1){
                uexWindow.toast("0","5","图片上传结束！","2000");
                submit();
                return;
        }
        upload(img[uploadImgNum],uploadImgNum);
        uploadImgNum++;
}

function upload(imgPath,i){
        var uploadHttp =  http+"uploadimg/imgupload";
        randOpId = Math.floor(Math.random() * ( 1000 + 1));        
        uexUploaderMgr.onStatus = function(opCode,fileSize,percent,serverPath,status){
                switch (status){
                                case 0:
                                        uexWindow.toast("1","5",percent+"%","0");
                                        break;
                                case 1:
                                        uexUploaderMgr.closeUploader(opCode);
                                        uexWindow.closeToast();
                                        var json = eval("(" + serverPath + ")");
                                        if (json.code == 1) {
                                                allimg += json.img + ";";
                                        }
                                        $$('img'+i).style.display="none";
                                        uexWindow.toast("0","5","图片成功上传！","2000");        
                                        uploadImg();
                                        break;
                                case 2:
                                        uexWindow.closeToast();
                                        uexWindow.toast('0','5',"图片上传失败",2000);
                                        uexUploaderMgr.closeUploader(opCode);
                                        uploadImg();
                                        break;
                                default:
                                        break;
                        }
        }

        uexUploaderMgr.cbCreateUploader = function(opCode,dataType,data){
                if(data == 0){
                        var path=imgPath;
                        var inCompress = 1;
                        if (uexWidgetOne.platformName == "iOS"){
                                uexUploaderMgr.uploadFile(opCode,path,"file",inCompress,720);
                        }
                        if (uexWidgetOne.platformName == "android"){
                                uexUploaderMgr.uploadFile(opCode,path,"file",inCompress,720);
                        }
                }else{
                        uexWindow.closeToast();
                        var strimg2="图片上传失败";
                        uexWindow.toast('0','5','图片上传失败',3000);
                }
        }
        var strimg2="开始上传图片";
        uexWindow.toast('1','5',strimg2,'');
        uexUploaderMgr.createUploader(randOpId,uploadHttp);
}