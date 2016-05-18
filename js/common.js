var host = "http://test.yx-app.com/";
var http = "http://test.yx-app.com/api/";
var imgThumbUrl = host +"data/icon/thumb/";
var imgNormalUrl = host+"data/icon/normal/";
var installUrl = host+"data/install/";
var notifyUrl = http+"common/";


        
function getUrl(endStr) {
    return http + endStr;
}

function gerImgThumbUrl(endStr) {
    return imgThumbUrl + endStr
}

function getImgNormalUrl(endStr) {
    return imgNormalUrl + endStr
}

function formatDate(date) {
    var formatDateStr = date.substring(6, date.length - 2);
    return parseInt(formatDateStr);
}

Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth() + 1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

function getRequestAjax(url, data, callback) {
    appcan.request.ajax({

        type : 'POST',

        url : url,
        //添加参数
        data : data,
        //期望的返回类型
        dataType : 'json',
        timeout : 3000, //超时时间
        beforeSend : function(xhr, settings) {
            uexWindow.toast("1", "5", "数据加载中...", "0");
        },

        success : function(result) {
            uexWindow.closeToast();
            callback(result);
        },
        error : function(result) {
            uexWindow.closeToast();
            var result_Obj={
                Success : false,
                Message : "网络异常"
            }
            callback(result_Obj);
        }
    })
}

function templateDivError(src){
            var str = '<div class="ub ub-ac ub-pc" style="position: absolute;top:8em;width:100%;">'
                          + '<div class="ub ub-ac ub-pc ub-ver">'
                                 + '<div class="ub ub-img1">'
                                     + ' <img src='+src+' style="width:8em;height:8em;">' 
                                 + '</div> ' 
                                 + '<div class="ub gery uinn bold">'
                                        + '数据加载失败' 
                                 + '</div>' 
                                 + '<div  class="ub gery uinn textb2">' 
                                        + '请检查您的手机是否联网，点击按钮重新加载' 
                                 + '</div>' 
                                 + '<div id="error" class="ub white uinn btn ub ub-ac bc-text2 ub-pc bc-btn uc-a1">' 
                                        + '重新加载' 
                                 + '</div>'
                           + '</div>'
                       + '</div>'
            return str
}

function getRequestAjax2(url, data, callback) {
    appcan.request.ajax({
        type : 'POST',
        url : url,
        //添加参数
        data : data,
        //期望的返回类型
        dataType : 'json',
        timeout : 3000, //超时时间
        beforeSend : function(xhr, settings) {
            
        },

        success : function(result) {
            uexWindow.closeToast();
            callback(result);
        },
        error : function(result) {
            uexWindow.closeToast();
            var result_Obj={
                Success : false,
                Message : "网络异常"
            }
            callback(result_Obj);
        }
    })
}


function getLocalStorageParme(parme) {
    var localStorage = window.localStorage;
    if(localStorage.length != 0){
        var getParme=localStorage.getItem(parme);
        if(getParme=="true" || getParme=="false"){
            getParme = (getParme == "true"); 
        } 
        return getParme;
    }
    return null;
}

function setLocalStorageParme(key, value) {
    var localStorage = window.localStorage;
    localStorage.setItem(key, value);
}

//获取Token值
function getToken(){
    var localStorage = window.localStorage;
    if (localStorage && localStorage.getItem("Token")) {
        return localStorage.getItem("Token");
    }
    return null;
}


/*获取地址信息*/
function getAddressId() {
    var localStorage = window.localStorage;

    if (localStorage && localStorage.getItem("addressId")) {
        return "addressId"
    }
    return "addressId";
}

/*切换页面*/
function changeDetail(change, addressId) {
    $("." + change).click(function() {
        appcan.openWinWithUrl(change, change + '.html');
        appcan.locStorage.setVal('addressId', addressId);
    })
}

function openpage(page,num) {
    appcan.button("." + page, "ani-act", function() {
        appcan.window.open({
            name : page,
            data :  page + '.html',
            dataType : 0,
            aniId : num
        });
    })
}

        /*动态加载 */
function initBounce(funcTop, funcBottom) {
    uexWindow.setBounce("1");
    if (!funcTop && !funcBottom){
        uexWindow.showBounceView("0", "rgba(255,255,255,0)", "0");
        uexWindow.showBounceView("1", "rgba(255,255,255,0)", "0");
        return;
    }
    
    var top = 0,btm = 1;
    uexWindow.onBounceStateChange = function(type, state) {

        if (type == top && state == 2) {//顶部弹动
            funcTop();
            uexWindow.resetBounceView("0");
        }
        if (type == btm && state == 2) {//底部弹动

            funcBottom();
            uexWindow.resetBounceView("1");

        }

    }
    if (funcTop) {
        uexWindow.setBounceParams('0', "{'pullToReloadText':'下拉刷新','releaseToReloadText':'释放刷新','loadingText':'正在刷新，请稍候'}");
        uexWindow.showBounceView(top, "rgba(255,255,255,0)", 1);
        
        uexWindow.notifyBounceEvent(top, 1);
    }
    if (funcBottom) {
        
        uexWindow.setBounceParams('1', "{'pullToReloadText':'加载更多','releaseToReloadText':'加载更多','loadingText':'加载中，请稍候'}");
        uexWindow.showBounceView(btm, "rgba(255,255,255,0)", 1);

        //设置弹动位置及效果([1:显示内容;0:不显示])
        uexWindow.notifyBounceEvent(btm, 1);
        //注册接收弹动事件([0:不接收onBounceStateChange方法回调;1:接收])
    }
}

function templateDivEmpty(info){
            var str='<div class="ub ub-ac ub-pc" style="position: absolute;top:10em;width:100%;">'
                       +'<div class="ub ub-ac ub-pc ub-ver">' 
                            +'<div class="ub ub-img1">'
                               +' <img src="../img/img1/logo.png" style="width:8em;height:8em;">'  
                            +'</div> '
                            +'<div class="ub bc-text3 uinn">'
                            +info
                            +'</div>'
                      +'</div>'
                    +'</div>'
             return str
}

function templateDivEmpty2(info){
            var str='<div class="ub ub-ac ub-pc" style="position: absolute;top:10em;width:100%;">'
                       +'<div class="ub ub-ac ub-pc ub-ver">' 
                            +'<div class="ub ub-img1">'
                               +' <img src="../../img/img1/logo.png" style="width:8em;height:8em;">'  
                            +'</div> '
                            +'<div class="ub bc-text3 uinn">'
                            +info
                            +'</div>'
                      +'</div>'
                    +'</div>'
             return str
}

function templateDivEmptyAL(){
            var str='<div class="ub ub-ac ub-pc" style="top:10em;width:100%;">'
                       +'<div class="ub ub-ac ub-pc ub-ver" style="width:100%;">' 
                            +'<div class="ub ub-img1">'
                               +' <img src="../img/img1/logo.png" style="width:8em;height:8em;">'  
                            +'</div> '
                             +'<div style="position: relative;width:94%;margin:1.5em auto;color:#989898" class="getoption">' 
                               +'<div style="position: absolute;top:0em;left:0em;width:35%;display:inline;text-align: center;">'
                                  +'<hr>'
                               + '</div>'
                                +' <div style="position: absolute;top:-0.7em;left:35%;width:30%;display:inline;text-align: center;font-size: 1em;color:#e55847;">拍卖规则'   
                                +'</div>'
                                +' <div style="position: absolute;top:0em;left:65%;width:35%;display:inline;text-align: center;">'
                                             +'<hr>'
                                +'</div>'
                           +'</div>'
                      +'</div>'
                    +'</div>'
             return str
}


function templateDivEnd(){
             var strEnd='<div class="ub ub-ac ub-pc ub-ver">'
                           +'<div class="ub ub-ac ub-pc" style="color:#d3d3d3;margin:0.5em;">没有更多'
                                
                           +'</div>'
                       +'</div>';
                                
             return strEnd;                                                                 
}

function templateDivEnd2(){
             var strEnd='<div class="ub ub-ac ub-pc ub-ver" style="width:100%;float:left;">'
                           +'<div class="ub ub-ac ub-pc" style="color:#d3d3d3;margin:0.5em;">没有更多'
                                
                           +'</div>'
                       +'</div>';
                                
             return strEnd;                                                                 
}

function templateDivEndAL(){
             var strEnd='<div class="ub ub-ac ub-pc ub-ver" style="width:100%;float:left;">'
                           +'<div style="position: relative;width:94%;margin:1.5em auto;color:#989898" class="getoption">' 
                               +'<div style="position: absolute;top:0em;left:0em;width:35%;display:inline;text-align: center;">'
                                  +'<hr>'
                               + '</div>'
                                +' <div style="position: absolute;top:-0.7em;left:35%;width:30%;display:inline;text-align: center;font-size: 1em;color:red;">拍卖规则'   
                                +'</div>'
                                +' <div style="position: absolute;top:0em;left:65%;width:35%;display:inline;text-align: center;">'
                                             +'<hr>'
                                +'</div>'
                           +'</div>'
                       +'</div>';     
             return strEnd;                                                                 
}

function evaluatePopoverTab(pageName,tabType){
          var readyIn=true;
          var nowPageIndex=1;
          var nowEndFlag=false;
          uexWindow.evaluatePopoverScript(pageName,"content","changeDiv('"+tabType+"','"+readyIn+"','"+nowPageIndex+"','"+nowEndFlag+"')");
}

function getmessage(talkUserId,openPageType,id){
    appcan.locStorage.val('openPageType', openPageType);
    if(openPageType == 'product'){
         appcan.locStorage.val('productId', id);
    }else if(openPageType == 'auction'){
        appcan.locStorage.val('auctionId', id);
    }
    
    var getMessageUrl=getUrl('message/getmessage');
    var data={
        receiverId : talkUserId,
        token : getToken()
    }
    
    function callback(result){
        if(result.Success){
            var data=result.Data
            var ReceiverId=data.Id;
            appcan.locStorage.val('talkUserId',talkUserId);
            appcan.locStorage.val('messageId',ReceiverId);
            
        }else{
            uexWindow.toast("0", "5", result.Message, "2000");
        }
    }
    getRequestAjax(getMessageUrl, data, callback)
} 

//设置用户状态
function setUserState(){
    var getUserUrl = getUrl("user/getuser");
            var data = {
                token : getToken()
            }
            function callback(result) {
                if (result.Success) {
                    var data=result.Data;
                    for (key in data) {

                        if (key == 'Avatar') {
                            localStorage.setItem(key, gerImgThumbUrl(data[key]));
                        } else {
                            localStorage.setItem(key, data[key]);
                        }
                    }       
                } 
            }
            getRequestAjax2(getUserUrl, data, callback);
}

function getGuide(getJsonGuide){
   // var arrayGuide=new Array("NewRandomIdentify","NewExpertIdentify","NewIdentifyComplete","NewMessage","NewAuctionCheckFailure","NewAuctionPreview","NewAuctionOngoing","NewAuctionFailure","NewBuyOrderWaitPay","NewBuyOrderNoSend","NewBuyOrderSend","NewBuyOrderRefund","NewBuyOrderComplete","NewSellOrderWaitPay","NewSellOrderNoSend","NewSellOrderSend","NewSellOrderRefund","NewSellOrderComplete");
                                                                                                                                                                                                                                                 
    var arrayGuide=new Array("NewRandomIdentify","NewExpertIdentify","NewIdentifyComplete","NewMessage","NewAuctionCheckFailure","NewAuctionPreview","NewAuctionOngoing","NewAuctionFailure","NewBuyOrderWaitPay","NewBuyOrderSend","NewBuyOrderRefund","NewSellOrderWaitPay","NewSellOrderNoSend","NewSellOrderRefund","NewSellOrderComplete");
    
    var jsonGuide={};
    var allFlag=false;
    var getUserUrl = getUrl("user/getuser");
            var data = {
                token : getToken()
            }
            function callback(result) {
                if (result.Success) {
                    var data=result.Data;
                    for(var i=0;i<arrayGuide.length;i++){
                        jsonGuide[arrayGuide[i]]=data[arrayGuide[i]];
                        if(arrayGuide[i] != 'NewMessage' && jsonGuide[arrayGuide[i]]){
                            allFlag=true;
                        }
                    } 
                    jsonGuide['allFlag']=allFlag;
                    getJsonGuide(jsonGuide);     
                }
               
            }
            getRequestAjax2(getUserUrl, data, callback);
            
}

function checkTel(val){
    var pattern=/(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;

    if(pattern.test(val)) { 
          return true; 
    }else{ 
          return false; 
    }
}



    
   