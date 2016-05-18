var str='';
var btnType={
    sel : {
        firstBtn : {
            text : "下&nbsp;&nbsp;架",
            click : ""
        },
        secondBtn :{
            text : "物流明细",
            click : ""
        }
    },
    sto :{
        firstBtn :{
            text : "上&nbsp;&nbsp;架",
            click : ""
        }
    },
    aut :{
        firstBtn :{
            text : "报价明细",
            click : ""
        }
    },
    sol : {
        firstBtn :{
            text : "报价明细",
            click : ""
        },
        secondBtn :{
            text : "物流详细",
            click : ""
        }
    }, 
    com : {
        firstBtn :{
            text : "写评语",
            click : ""
        }
    }  
}

function getSSAS(obj,root){
    
    str=str+'<div class="ub ub-ac ub-pc div_SelSto" >'
           + '<div class="ub"><img class="img_SelSto" src='+obj.src+'></div>'
               +'<div class="ub ub-ver div_SelStoC" >'
                  +'<div class="ub">'+obj.describe+'</div>'  
                   +'<div class="ub div_SelStoC_bottom">' ;
                   
    for(key in btnType){
        if(key == obj.type ){
            for(var i in btnType[key]){
                str+='<div style="width:10%"></div>';
                str+='<div class="ub ub-ac ub-pc  uc-a1 uba ulev-1 div_SelSto_btn" onclick='+btnType[key][i].click+'>'+btnType[key][i].text+'</div> '
            }
        }
    } 
                 
    str+='</div></div></div>';
    var strObj=$(str);
    root.append(strObj);
}
 
