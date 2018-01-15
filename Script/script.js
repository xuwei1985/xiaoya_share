var paltform = navigator.platform;
var documentWidth = $(document.body).width();



//数据序列化到本地
var activeIndentity=function(){
	if(window.sessionStorage){
		sessionStorage.setItem("session_indentity","xiaoya_mobile");
	}
}

var downloadApp=function(){
	if (paltform == "iPhone") {//ios
		window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
	}
	else{
		window.location.href ="android_down.html";
	}
}

/*
function getParameter(sProp) {
	var re = new RegExp(sProp + "=([^\&]*)", "i");
	var a = re.exec(document.location.search);
	if (a == null)
		return null;
	return a[1];
}
*/


function getParameter(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function get_unix_time(dateStr)
{
    var newstr = dateStr.replace(/-/g,'/'); 
    var date =  new Date(newstr); 
    var time_str = date.getTime().toString();
    return parseInt(time_str);
}

function getTimeStamp()
{
    var timestamp=new Date().getTime();
    return timestamp;
}

function getFileExt(str) {
    var d = /\.[^\.]+$/.exec(str);
    return d;
}

function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

//清除本地序列化数据
var clearSessionStorage=function(){
	if(window.sessionStorage){
		sessionStorage.clear();
	}
}

//banner数据序列化到本地
var saveBannerHistoryToLocal=function(key){
	if(window.sessionStorage){
		sessionStorage.setItem("banner_html_"+key,$(".banner").html());
	}
}

//banner从本地反序列化数据
var getBannerHistoryFromLocal=function(key){
	if(window.sessionStorage){
		var _html=sessionStorage.getItem("banner_html_"+key);
		
		if(_html!=null){
			$(".banner").append(_html);
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

//weather数据序列化到本地
var saveWeatherHistoryToLocal=function(key){
	if(window.sessionStorage){
		sessionStorage.setItem("weather_html_"+key,$(".weather ul").html());
	}
}

//weather从本地反序列化数据
var getWeatherHistoryFromLocal=function(key){
	if(window.sessionStorage){
		var _html=sessionStorage.getItem("weather_html_"+key);
		
		if(_html!=null){
			$(".weather ul").append(_html);
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

//Rate数据序列化到本地
var saveRateHistoryToLocal=function(key){
	if(window.sessionStorage){
		sessionStorage.setItem("rate_html_"+key,$(".rate").html());
	}
}

//Rate从本地反序列化数据
var getRateHistoryFromLocal=function(key){
	if(window.sessionStorage){
		var _html=sessionStorage.getItem("rate_html_"+key);
		
		if(_html!=null){
			$(".rate").append(_html);
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


var showLoading = function () {
    $(".ui-loader").fadeIn(200);
};

var hideLoading = function () {
    $(".ui-loader").fadeOut(200);
};

function loadBanner(catid){
	if(!getBannerHistoryFromLocal(catid)){
		$.ajax({
			 type: "get",
			 async: true,
			 url: catid==0?"index.ashx?c=ajaxnews&a=Banner":"index.ashx?c=ajaxnews&a=list&isBanner=1",
			 data: {catid:catid, pagesize:1},
			 dataType: "json",
			 beforeSend:function(){
		                  
		     },
			 success: function(data){
				 if(data.state=="success"){
					 handlerBanner(data.data);
					 saveBannerHistoryToLocal(catid);
				 }
				 else{
					 hideLoading();
				 }
			 },
			 error: function(){  
				 hideLoading();          
			 }
		 });
	}	
}

function handlerBanner(data){
	var obj;
	if(data!=null&&data.length>0){
		obj=data[0];
	}
	if(obj!=null){
		if(obj.title.length>0){
			$(".banner").html("<img data-id='"+obj.id+"' data-catid='"+obj.catid+"' src='"+obj.picurls[0].url+"'/><div class='titlebar'><span>"+obj.title+"</span></div>");
		}
		else{
			$(".banner").html("<img data-id='"+obj.id+"' data-catid='"+obj.catid+"' src='"+obj.picurls[0].url+"'/><div class='titlebar'><span>"+obj.copyfrom_text+"</span></div>");
		}
		
	}
}


function loadWeather(key){
	if(!getWeatherHistoryFromLocal(key)){
		$.ajax({
			 type: "get",
			 async: true,
			 url: "index.ashx?c=ajaxnews&a=Weather2",
			 data: null,
			 dataType: "json",
			 beforeSend:function(){
		                  
		     },
			 success: function(data){
				 if(data.state=="success"){
					 handlerWeather(data.data);
					 saveWeatherHistoryToLocal(key);
				 }
				 else{
					 hideLoading();
				 }
			 },
			 error: function(){  
				 hideLoading();          
			 }
		 });
	}	
}

function handlerWeather(data){
	var obj;
	var resultDic;
	var imgUrl;
	var low=0.0;
	var hight=0.0;
	var weatherHtml="";
    var dic = new Array();
    
    dic["Melbourne"] = "墨尔本";
    dic["Sydney"] = "悉尼";
    dic["Brisbane"] = "布里斯班";
    dic["Adelaide"] = "阿德莱德";

	
	if(data!=null){
		for(var key in data){
			obj=data[key];
			if (obj!=null&&obj.query!=null&&obj.query.results!=null&&obj.query.results.channel!=null) {
                resultDic=obj.query.results.channel;
                if(resultDic.item==undefined){
	                resultDic=resultDic[0];
                }

                if (resultDic!=null) {
                    imgUrl=resultDic.item.description;
                    imgUrl=imgUrl.substr(19, imgUrl.indexOf("/>")-19-1)

                    low=parseInt(resultDic.item.forecast[0].low);
                    hight=parseInt(resultDic.item.forecast[0].high);
                    low= parseInt(Math.round((low-32)/1.8));
                    hight=parseInt(Math.round((hight-32)/1.8));
                    
                    weatherHtml+="<li><img src='"+imgUrl+"' class='weathericon' /><div class='city'>"+dic[resultDic.location.city]+"</div><div class='tem bluetext'>"+low+"°/"+hight+"°</div></li>";
                }
			}
 		}
 		weatherHtml+="<div class='clear'></div>";
 		$(".weather ul").append(weatherHtml);
	}
}

function loadRate(key){
	if(!getRateHistoryFromLocal(key)){
		$.ajax({
			 type: "get",
			 async: true,
			 url: "index.ashx?c=ajaxnews&a=Exchangerate",
			 data: null,
			 dataType: "json",
			 beforeSend:function(){
		                  
		     },
			 success: function(data){
				 if(data.state=="success"){
					 handlerRate(data.data.data);
					 saveRateHistoryToLocal(key);
				 }
				 else{
					 hideLoading();
				 }
			 },
			 error: function(){  
				 hideLoading();          
			 }
		 });
	}	
}

function handlerRate(data){
	if(data!=null){
		$(".rate").html("<div><span class='ratetime'>实时</span><span>澳元/人民币 = <span class='bluetext'>"+data.amount.toFixed(3)+"</span></span><div class='clear'></div></div><div class='rappbtn'>查看四大银行汇率预测</div><div class='clear'></div>");
	}
}

$(function(){
	documentWidth=$(document.body).width();
	
	//handler navigation button event
	$(".messageBtn").click(function(){
		if(window.location.href.indexOf("default.html")<0){
			clearSessionStorage();
			window.location.href="http://www.xiaoyacity.com/default.html";
		}
	});
	
	$(".searchBtn").click(function(){
		downloadApp();
	});
	
	$(".titleBtn").click(function(){
		downloadApp();
	});
	
	
	//tab tap handler
	$(".tab_0").click(function(){
		downloadApp();
/*
		if(window.location.href.indexOf("default.html")<0){
			clearSessionStorage();
			window.location.href="http://www.xiaoyacity.com/default.html";
		}
*/
	});
	$(".tab_1").click(function(){
		downloadApp();
/*
		if(window.location.href.indexOf("information.html")<0){
			clearSessionStorage();
			if (paltform == "iPhone") {//ios
				window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
			}
			else{
				window.location.href ="android_down.html";
			}
		}
*/
	});
	$(".tab_2").click(function(){
		downloadApp();
/*
		if(window.location.href.indexOf("sqkb.html")<0){
			clearSessionStorage();
			window.location.href="http://www.xiaoyacity.com/sqkb.html";
		}
*/
	});
	$(".tab_3").click(function(){
		downloadApp();
/*
		if(window.location.href.indexOf("raiders.html")<0){
			clearSessionStorage();
			window.location.href = "http://www.xiaoyacity.com/raidersIndex.html";
		}
*/
	});
	
});

	