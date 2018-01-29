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
var domain="";//http://share.xiaoyacity.com
var orders=null;
var order_play_index=0;
var _czc = _czc || [];
_czc.push(["_setAccount", "1272586626"]);

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

function downloadApp(){
	//postClick(nid);
	window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.xilu.daao";
	//if (paltform == "iPhone") {//ios
	//		window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
	//	}
	//	else{
	//		window.location.href ="android_down.html";
	//	}
}
 
function getRandomOrders(){
	//调用最新澳洲30条新闻接口
		$.ajax({
			 type: "get",
			 async: false,
			 url: "http://www.kouzibuy.com/apiv1.php?act=random_msg_web",
			 dataType: "jsonp",
			 jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
			 jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
			 success: function(data){
				 if(data.code==0&&data.data&&data.data.list){
					orders=data.data.list;
					handlerOrders();
				 }
			 },
			 error: function(){  
							  
			 }
		 });
}
function handlerOrders(){
	if(orders&&orders.length>0){
        setTimeout(playOrderAnimation,800);
	}
}

function playOrderAnimation(){
	if(orders&&orders.length>0){
		
		if(order_play_index>=orders.length){
            order_play_index=0;
            $(".cTitle").animate({
                marginTop:90
            },400);
		}
		else {
            $("#order_icon").attr("src",orders[order_play_index].header);
            $("#order_title").text(orders[order_play_index].msg);
            $(".order_box").css("top","70px").show();
            runOrderBoxIn();
            order_play_index++;
		}
	}
	
}

function runOrderBoxIn(){
  $(".order_box").animate({ 
    top: "18px"
  }, 500,function(){
	  setTimeout(runOrderBoxOut,3000);
  } );
}

function runOrderBoxOut(){
  $(".order_box").animate({ 
    top: "-40px"
  }, 500,function(){
	  $(".order_box").css("top","70px");
	  playOrderAnimation();
  } );
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
		$("#cTitle").css("width", "950px");
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


function handlerJump() {
	if(returnCitySN.cname.toLowerCase()!="australia"){
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?")
        str=str.substr(num); //取得所有参数   stringvar.substr(start [, length ]

        window.location.href=domain+"/newsdetail2.html"+str;
	}
}

function showShareTip(){
	if ($(".downtip").css("display")=="none") {
		var ttop =20 + $(document).scrollTop();
		$(".maskbg").css({
            "width": document.documentElement.clientWidth+"px",
            "height":document.body.scrollHeight+"px",
			"opacity":0.85
        });
		
        $(".downtip").css({
            "top": ttop,
        });
        $(".maskbg").show();
        $(".downtip").show();
	}
}

function initAction(){
    $(".app_down").on("click",function(){
        if(_czc){
			if(returnCitySN.cname.toLowerCase()!="australia"){
				_czc.push(["_trackEvent","新闻详情_cn","点击","顶部下载",getParameter("id"),""]);
			}
			else{
				_czc.push(["_trackEvent","新闻详情","点击","顶部下载",getParameter("id"),""]);
			}
            
        }
        setTimeout(function(){
			window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.xilu.daao";
		},720);
    });

    $(".promote_goods li").on("click",function(){
		var g_index=$(this).attr("data-index");
        
		if(returnCitySN.cname.toLowerCase()!="australia"){
			if(_czc){
				_czc.push(["_trackEvent","新闻详情_cn","点击","商品_"+g_index+"下载",getParameter("id"),""]);
			}
		}
		else{
			if(_czc){
				_czc.push(["_trackEvent","新闻详情","点击","商品_"+g_index+"下载",getParameter("id"),""]);
			}
		}
		
		setTimeout(function(){
			window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.xilu.daao";
		},720);
    });
	
	$(".maskbg").click(function () {
        $(".maskbg").hide();
        $(".downtip").hide();

    });

    $(".downtip").click(function (event) {
        $(".maskbg").hide();
        $(".downtip").hide();
    });
	
	$("#shareNews").click(function(){
		showShareTip();
	})

}
$(function(){
	
	loadNews();
	getRandomOrders();
	initAction();
    handlerJump();
	
	
	if(_czc){
		if(returnCitySN.cname.toLowerCase()!="australia"){
			_czc.push(["_trackEvent","新闻详情_cn","初始化","初始化页面",getParameter("id"),""]);
		}
		else{
			_czc.push(["_trackEvent","新闻详情","初始化","初始化页面",getParameter("id"),""]);
		}
        
    }
	//http://freegeoip.net/json/?callback=foo

});

