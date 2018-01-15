var isLoadding=false;
var pagesize=30;
var max_id=0;
var catid=0;
var isComplete=false;//是否加载完所有数据
var scrollTop=0;
var is_original="0";
var id = getParameter("id");
var catid = getParameter("catid");
var randomNewsData;
var randomIndex;
var randomPage=0;
var domain="http://share.xiaoyacity.com";

function setOriginal(n) {
    is_original = n;
}


var randomString=function(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

//模拟用户唯一id
var getUserIdentity=function(){
	var timestamp = (new Date()).valueOf();
	if(localStorage.getItem("xiaoya_topic_user_identity")==null||localStorage.getItem("xiaoya_topic_user_identity").length<=0||(timestamp-localStorage.getItem("xiaoya_topic_user_identity_time"))>2*24*60*60*1000){
		localStorage.clear();
		var userIdntity=randomString(6)+timestamp;
		localStorage.setItem("xiaoya_topic_user_identity",userIdntity);
		localStorage.setItem("xiaoya_topic_user_identity_time",timestamp);
		return localStorage.getItem("xiaoya_topic_user_identity");
	}
	else{
		if(window.localStorage){
			return localStorage.getItem("xiaoya_topic_user_identity");
		}
		else{
			return "xiaoyaUser"
		}
	}
}

//数据序列化到本地
var saveViewHistoryToLocal=function(){
	if(window.sessionStorage){
		sessionStorage.setItem("history_html"+id,$("#newslist").html());
		sessionStorage.setItem("history_scrollTop"+id,scrollTop);
		sessionStorage.setItem("history_maxid"+id,max_id);
		sessionStorage.setItem("history_complete"+id,isComplete?1:0);
	}
}

//从本地反序列化数据
var getViewHistoryFromLocal=function(){
	if(window.sessionStorage){
		var _maxid=sessionStorage.getItem("history_maxid"+id);
		var _html=sessionStorage.getItem("history_html"+id);
		var _complete=sessionStorage.getItem("history_complete"+id);
		scrollTop=sessionStorage.getItem("history_scrollTop"+id);
		
		if(_maxid!=null&&_html!=null&&scrollTop!=null){
			max_id=_maxid;
			$("#newslist").append(_html);
			
			isComplete=parseInt(_complete);
			if(!isComplete){
			   $(".nextPage").html("点击加载更多");
		  	}else{
			   $(".nextPage").html("已经全部加载");
		  	}
			
			if(scrollTop>0){
				setTimeout(function(){
					$(document).scrollTop(scrollTop); 
				}, 120);
			}
			hideLoading();
			return true;
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}
}

//用户
var saveViewHistoryToLocal=function(){
	if(window.sessionStorage){
		sessionStorage.setItem("history_html"+id,$("#newslist").html());
		sessionStorage.setItem("history_scrollTop"+id,scrollTop);
		sessionStorage.setItem("history_maxid"+id,max_id);
		sessionStorage.setItem("history_complete"+id,isComplete?1:0);
	}
}

function downloadApp(nid){
	postClick(nid);
	//window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
	if (paltform == "iPhone") {//ios
			window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
		}
		else{
			window.location.href ="android_down.html";
		}
}

//get news detail info
function loadNews(){
	showLoading();
	$.ajax({
		 type: "get",
		 async: true,
		 url: domain+"/index.ashx?c=ajaxnews&a=detail&id="+id+"&catid="+catid,
		 dataType: "json",
		 success: function(data){
			 if(data.state=="success"){
				 handlerNewsDetail(data.data);
			 }
			 hideLoading();
		 },
		 error: function(){  
			 hideLoading();
		 }
	 });
}

 
//handler news detail data
function handlerNewsDetail(data){
	if(data!=null){
		setOriginal(data.is_original);
		if(is_original=="1"){
			$("#lblTime").hide();
		}
		$(document).attr("title",data.title);
		$("#lblTitle").html(data.title);
		$("#lblCopyFrom").html(data.copyfrom);
		$("#lblTime").html(data.time);
		$(".contentline").html(data.content.replace(/动图/g, ''));
		formateStyle();
		
	}
} 

function formateStyle(){
	if (paltform != "Win32" && paltform != "MacIntel") {
		
		//处理视频DOM转换
		var videos=$("embed");
		var videoHtml="";
		if(videos!=undefined&&videos!=null&&videos.length>0){
			for(var i=0;i<videos.length;i++){
				$('<video class="edui-upload-video  vjs-default-skin     video-js" controls="controls" preload="metadata" width="420" height="280" src="'+videos.eq(i).attr("src")+'" data-setup="{}" autobuffer="Autobuffer" style="width: 100%; height: auto; background-color: rgb(0, 0, 0);"><source src="'+videos.eq(i).attr("src")+'" type="video/mp4"></video>').insertBefore(videos.eq(i));
			}
		}
		videos.remove();
		
        if (is_original == "0") {
            if (paltform == "iPhone") {//ios
                $(".contentline span").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
                $(".contentline a").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
                $(".contentline p").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
                $(".contentline strong").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
                $(".contentline strong span").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
                $(".contentline b").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
                $(".contentline span div").removeAttr("style").css("font-size", "18px").css("line-height", "28px");
            }
            else {//安卓
                $("#lblTitle").removeAttr("style").css("font-family", "").css("font-size", "20px").css("font-weight", "bold").css("line-height", "30px");
                $(".contentline a").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "28px");
                $(".contentline span").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "28px");
                $(".contentline span div").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "28px");
                $(".contentline b").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "28px");
                $(".contentline p").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "28px");
                $(".contentline strong").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "28px");
            }
        }
		else{
			$(".contentline p").css("line-height", "18px").css("line-height", "28px").css("margin", "0px").css("padding", "0px");
		}
		
		if (paltform == "iPhone") {
			for (var i = 0; i < $("a").length; i++) {
				if ($("a").eq(i).attr("href")!=undefined&& $("a").eq(i).attr("href").indexOf("jp:")>-1) {
					$("a").eq(i).attr("href",$("a").eq(i).attr("href").replace("jp:","www.wiloop.net/newsdetail.html?"));
					//alert($("a").eq(i).attr("href"));
				}
			}
		}
        $(".contentline video").css("width", "100%").css("height", "auto").css("background-color", "#000");
        $(".contentline").css("width", "100%");
        
        
        for (var i = 0; i < $(".contentline img").length; i++) {
            if($(".contentline img").eq(i).attr("data-mark")!="newslist"){
/*
			            if (i==0) {
			                $("#wxshareimg").attr("src", $(".contentline img").eq(i).attr("src"));
			            }
*/
                $("<img/>").attr("data-index", i).attr("src", $(".contentline img").eq(i).attr("src")).load(function () {
                    picRealWidth = this.width;
                    picRealHeight = this.height;
                    
                        
                    if (picRealWidth > documentWidth) {
	                   
                        if (getFileExt($(".contentline img").eq($(this).attr("data-index")).attr("src")) != ".gif"&&($(this).attr("data-src")==undefined||$(this).attr("data-src").indexOf(".gif")==-1)) {
                            $(".contentline img").eq($(this).attr("data-index")).removeAttr("style");
                            $(".contentline img").eq($(this).attr("data-index")).css("width", "100%");
                            $(".contentline img").eq($(this).attr("data-index")).css("height", "auto");
                        }
                    }
                });
            }
        }
    }
    else {
	    
		
        $("br").css("display", "inline");
        $("#content").css("background-color", "#fafafa").css("width", "950px").css("font-size", "16px");
        $(".contentline span").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "22px");
        $(".contentline a").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "22px");
        $(".contentline p").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "22px");
        $(".contentline strong").removeAttr("style").css("font-family", "").css("font-size", "16px").css("line-height", "22px");
        $(".contentline span div").removeAttr("style").css("font-size", "16px").css("line-height", "22px");
        $(".contentline video").css("width", "100%").css("height", "auto").css("background-color", "#000");
        $(".contentline video").attr("autobuffer", "Autobuffer");
        $(".contentline video").attr("controls", "none");
        
        for (var i = 0; i < $("img").length; i++) {
            $("<img/>").attr("data-index", i).attr("src", $("img").eq(i).attr("src")).load(function () {
                picRealWidth = this.width;
                picRealHeight = this.height;
                var img = new Image();
                img.src = $("img").eq($(this).attr("data-index")).attr("src");
                if (img.width > 960) {
                    $("img").eq($(this).attr("data-index")).removeAttr("style");
                    $("img").eq($(this).attr("data-index")).css("width", "100%");
                    $("img").eq($(this).attr("data-index")).css("height", "auto");
                }

            });
        }
    }
}


function initAction(){

	// $("#content").on("click",".banner img",function(){
	// 	gotoNews("newsDetail.html?id="+$(this).attr("data-id")+"&catid="+$(this).attr("data-catid"));
	// });
	
}

$(function(){
	loadNews();
	initAction();
});

