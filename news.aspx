<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="news.aspx.cs" Inherits="Cute.news" %>

<!DOCTYPE html>
<html lang="zh-CN">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" name="viewport">
	<link href="Style/style.css" rel="stylesheet" />
    <link href="Style/news.css" rel="stylesheet" />
    <title></title>
    <script src="Script/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="Script/script.js"></script>
    <script>
        var pic_real_width, pic_real_height;
        var isLoadShare=0;
		var is_original;
		var scrollTop=0;

        function is_weixn() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }

        function setOriginal(n) {
            is_original = n;
        }

        function getFileExt(str) {
            var d = /\.[^\.]+$/.exec(str);
            return d;
        }

        function gotoNews(url) {
            window.location.href = url;
        }
		
		function getParameter(sProp) {
			var re = new RegExp(sProp + "=([^\&]*)", "i");
			var a = re.exec(document.location.search);
			if (a == null)
				return null;
			return a[1];
		};
		
		function get_unix_time(dateStr)
		{
		    var newstr = dateStr.replace(/-/g,'/'); 
		    var date =  new Date(newstr); 
		    var time_str = date.getTime().toString();
		    return parseInt(time_str);
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
				
		//加载吸引人的新闻标题
		function loadZBNews(){
			$.ajax({
				 type: "get",
				 async: true,
				 url: "index.ashx?c=ajaxnews&a=notice",
				 dataType: "json",
				 success: function(data){
					 if(data.state=="success"){
						 randomNewsData=data.data;
						 if(data!=null&&data.data!=null){
							 randomIndex=data.data.length-1;
						 }
						 else{
							 randomIndex=-1;
						 }
						 handlerZBNews(data.data);
					 }
				 },
				 error: function(){  
				 }
			 });
		}
		
		function handlerZBNews(data){
			var splitWith=10;
			var newsHtml="";
			var singleImgUrl="";
			var mutiImageHtml="";
			var totalWidth=$("#newslist").width()-30;
			var imgWidth=(totalWidth-splitWith*2)/3;
			var imgHeight=132/184*imgWidth;
			var titleSize=17;
			if (paltform == "iPhone"&&screen.width>=414) {
			    titleSize=18.5;
			}
			if(data!=null){
				for(var i=0;i<data.length;i++){
					mutiImageHtml="";
					for(var n=0;n<data[i].picurls.length;n++){
					  mutiImageHtml+='<div class="imgItem" ><img style="width:'+imgWidth+'px;height:'+imgHeight+'px;" data-mark="newslist" src="'+data[i].picurls[n].url+'?imageView2/0/w/184/h/132/format/jpg" /></div>';
					  if(n>2){
						  break;
					  }
					}
					
					newsHtml='<table style="width:100%;" onclick=downloadApp("'+data[i].id+'")><tr><td class="mutiimg"><div class="mutitext" style="font-size:'+titleSize+'px;">'+data[i].description+'</div></td></tr><tr><td style="padding:0px 0px 0px 12px;vertical-align:top"><div class="imgGroup">'+mutiImageHtml+'<div class="clear"></div></div></td></tr><tr><td><div class="readnum">阅读量:'+data[i].copyfrom_text+'</div><span class="openxy">打开小芽查看</span></td></tr></table><div class="newsline"></div>';
					
					$(".newsRandom").eq(i).html(newsHtml);
					if(i>1){
						break;
					}
				}
			}
		} 
		
		function postClick(nid){
			$.ajax({
				 type: "get",
				 async: true,
				 url: "index.ashx?c=ajaxnews&a=hits&catid=1104&id="+nid,
				 dataType: "json",
				 success: function(data){
					 if(data.state=="success"){
					 }
				 },
				 error: function(){  
				 }
			 });
		}

        $(function () {
            
            var paltform = navigator.platform;
            var documentWidth = $(document.body).width() / 2;

            loadZBNews();
            //loadWeather("newsshare2");
			loadRate("newsshare2");

			if(getParameter("country")!="6"){//非澳洲的国家，暂时不显示论坛相关的介绍
				$(".adv_top").show();
				$(".cityNavBar").hide();
				$(".iconNav").hide();
				$(".downBtn").hide();
				$(".contentSplit").hide();
				$(".info_adv").hide();
				$("#bottom_img").show();
				$("#bottom_img2").hide();
			}
			else{
				$(".adv_top").hide();
				$(".cityNavBar").show();
				$(".iconNav").show();
				$(".downBtn").show();
				$(".contentSplit").show();
				$(".info_adv").show();
				$("#bottom_img").hide();
				$("#bottom_img2").show();
			}
			
			$(".downBtn img").click(function(){
				if (paltform == "iPhone") {//ios
					window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
				}
				else{
					window.location.href ="android_down.html";
				}
			});
			
			$(".iconNav").click(function(){
				if (paltform == "iPhone") {//ios
					window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
				}
				else{
					window.location.href ="android_down.html";
				}
			});
			
			$(".cityNavBar").click(function(){
				if (paltform == "iPhone") {//ios
					window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
				}
				else{
					window.location.href ="android_down.html";
				}
			});
			
			$("#dapp").click(function(){
				if (paltform == "iPhone") {//ios
					window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
					//window.location.href ="android_down.html";
				}
				else{
					window.location.href ="android_down.html";
				}
			});


            $(".maskbg").click(function () {
                $(".maskbg").fadeOut();
                $(".downtip").fadeOut();

            });

            $(".downtip").click(function (event) {
                $(".maskbg").hide();
                $(".downtip").hide();
            });

            $("#closeBtn").click(function (event) {
                $(".adv_bottom").hide();
            });

            $(".moreComment").click(function (event) {
                if (paltform == "iPhone") {//ios
					window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
				}
				else{
					window.location.href ="android_down.html";
				}
            });

            $(".readend").click(function (event) {
                if (paltform == "iPhone") {//ios
					window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
				}
				else{
					window.location.href ="android_down.html";
				}
            });
			
			$("#newslist").on("click",".iconNav",function(){
	            if (paltform == "iPhone") {//ios
					window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
				}
				else{
					window.location.href ="android_down.html";
				}
            });
			
			//tab tap handler
			$(".tab0").click(function(){
				window.location.href="http://www.xiaoyacity.com/default.html";
			});

			$(".tab1").click(function(){
				window.location.href="http://www.xiaoyacity.com/sqkb.html";
			});
			$(".tab2").click(function(){
				window.location.href="http://www.xiaoyacity.com/raidersIndex.html";
			});
			
			//tab tap handler
			$(".tab_0").click(function(){
				window.location.href="http://www.xiaoyacity.com/default.html";
			});
			$(".tab_1").click(function(){
				window.location.href="http://www.xiaoyacity.com/information.html";
			});
			$(".tab_2").click(function(){
				window.location.href="http://www.xiaoyacity.com/sqkb.html";
			});
			$(".tab_3").click(function(){
				window.location.href="http://www.xiaoyacity.com/raidersIndex.html";
			});

            if (paltform != "Win32" && paltform != "MacIntel") {
                $("body").css("background-color", "#fff");
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
							$("a").eq(i).attr("href",$("a").eq(i).attr("href").replace("jp:","www.wiloop.net/news.aspx?"));
						}
					}
				}
                $(".main video").css("width", "100%").css("height", "auto").css("background-color", "#000");
                $(".main").css("width", "100%");
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
                $(".main").css("background-color", "#fafafa").css("width", "950px").css("margin", "0 auto").css("font-size", "16px");
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
            
            var id = getParameter("id");
            
            //调用最新澳洲30条新闻接口
			$.ajax({
				 type: "get",
				 async: false,
				 url: "http://api.wiloop.com/index.ashx?c=ajaxnews&a=list",
				 dataType: "jsonp",
				 jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
				 jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
				 success: function(data){
					 if(data.state=="success"){
						 handlerData(data.data);
					 }
				 },
				 error: function(){  
					              
				 }
			 });
            
            function handlerData(data){
				  var newsHtml="";
				  var singleImgUrl="";
				  var mutiImageHtml="";
				  var newsTime;
				  var newsTimeStr="";
				  var todayStamp= Date.parse(new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate()+" 0:00:00");
				  var splitWith=10;
	              var totalWidth=$("#newslist").width()-30;
	              var imgWidth=(totalWidth-splitWith*2)/3;
	              var imgHeight=132/184*imgWidth;
	              var titleSize=17;
	              if (paltform == "iPhone"&&screen.width>=414) {
		              titleSize=18.5;
	              }

				  for(var i=0;i<data.length;i++){
					  //时间计算
					  newsTime = get_unix_time(data[i].updatetime);
					  newsTime=newsTime+2*3600*1000;
					  var t=new Date(newsTime);
					  if(newsTime>todayStamp){
						  newsTimeStr="今天 "+t.getHours()+":"+(t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes());
					  }
					  else{
						  newsTimeStr=t.getMonth()+1+"-"+t.getDate();
					  }
					  if(data[i].picurls!=null&&data[i].picurls.length<=1){//单图的形式
						  if(data[i].picurls.length<1){
							 singleImgUrl="http://img.wiloop.net/topic_default.png?imageView2/0/w/92/h/66/format/jpg" 
						  }
						  else{
							 singleImgUrl=data[i].picurls[0].url+"?imageView2/0/w/92/h/66/format/jpg" ;
						  }
						  newsHtml+='<table style="width:100%;" onclick=gotoNews("?id='+data[i].id+'&catid='+data[i].catid+'&country='+getParameter("country")+'")><tr><td style="padding:10px 0 0 10px;vertical-align:top; width:96px; height:78px;"><img data-mark="newslist" src="'+singleImgUrl+'" style="width:96px; height:68px;" /></td><td style="padding:10px 10px 6px 5px; vertical-align:top"><div style="font-size:'+titleSize+'px; min-height: 54px; font-weight:bold; color:#555; line-height: 22px;">'+data[i].title+'</div><div style="color: #aaa; font-size: 10px; text-align: right; padding-right: 10px;">'+newsTimeStr+'</div></td></tr></table><div class="newsline"></div>';
					  }
					  else{//多图的形式
						  mutiImageHtml="";
						  for(var n=0;n<data[i].picurls.length;n++){
							  mutiImageHtml+='<div class="imgItem" ><img style="width:'+imgWidth+'px;height:'+imgHeight+'px;" data-mark="newslist" src="'+data[i].picurls[n].url+'?imageView2/0/w/184/h/132/format/jpg" /></div>';
							  if(n>2){
								  break;
							  }
						  }
						  
						  newsHtml+='<table style="width:100%;" onclick=gotoNews("?id='+data[i].id+'&catid='+data[i].catid+'&country='+getParameter("country")+'")><tr><td style="padding:10px 5px 7px 10px; vertical-align:top"><div style="font-size:'+titleSize+'px;font-weight:bold; color:#555; line-height: 22px;">'+data[i].title+'</div></td></tr><tr><td style="padding:0px 10px 0px 10px;vertical-align:top"><div class="imgGroup">'+mutiImageHtml+'</div></td></tr><tr><td><div style="color: #aaa; font-size: 10px; text-align: right; margin-bottom:4px; padding-right: 10px;">'+newsTimeStr+'</div><td></tr></table><div class="newsline"></div>';
					  }
					  
					  //在列表一半的地方插入广告
					  if(i==14){
						  newsHtml+='<div class="cityNavBar" style="font-size:16px; padding:15px 0 0 12px;"><img style="float:left;" src="http://7xloa9.com5.z0.glb.clouddn.com//0310_03.png" width="20" height="20" /><b style="float:left; margin-left:5px;">免费发贴</b></div><div class="clear"></div><ul class="iconNav" style="margin-top:8px;"><li><div><img data-mark="newslist" src="http://img.wiloop.net/0310_07.png" /></div><span>澳洲新闻</span></li><li><div><img data-mark="newslist" src="http://img.wiloop.net/0310_09.png" /></div><span>澳洲租房</span></li><li><div><img data-mark="newslist" src="http://img.wiloop.net/0310_11.png" /></div><span>二手交易</span></li><li><div><img  data-mark="newslist" src="http://img.wiloop.net/0310_13.png" /></div><span>商家推广</span></li></ul>';
					  }
				  }
				  $("#newslist").append(newsHtml);
			 }
            
            $(".rate").on("click",".rappbtn",function(){
				window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
			});
			
			$("#content").on("click",".banner img",function(){
				gotoNews("newsDetail.html?id="+$(this).attr("data-id")+"&catid="+$(this).attr("data-catid"));
			});
			
			$(".iconNav_raiders li").click(function(){
				window.location.href = "raiders.html";
			});
			
			$(".littelink").click(function(){
				window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
			});
        });
    </script>
</head>
<body>
    <form id="form2" runat="server">
        <div style="display:none;"><img id="shareimg" src="" /></div>
        <div data-role="main" id="content">
        	<div id="header">
				<img class="messageBtn" src="http://img.wiloop.net/message.png" alt="search">
				<img class="titleBtn" src="http://img.wiloop.net/titleNav.png" alt="titleNav">
				<img class="searchBtn" src="http://img.wiloop.net/search.png" >
				
				<ul class="navTab">
					<li class="tab_0">
			        	<a href="#" class="selected">澳洲新闻</a>
			        </li>
			        <li class="tab_2">
			        	<a href="#">省钱快报</a>
			        </li>
			        <li class="tab_3">
			        	<a href="#">澳洲知乎</a>
			        </li>
			        <li class="tab_1">
			        	<a href="#">澳洲租房</a>
			        </li>
			        <div class="clear"></div>
				</ul>
			</div>
        	<div><img src="http://img.wiloop.net/11_02.png" width="100%" /></div>
			<ul class="littelink">
				<li><a href="javascript:void(0);">澳洲租房</a></li>
				<li style="width: 2%;">·</li>
				<li><a href="javascript:void(0);">招工找工</a></li>
				<li style="width: 2%;">·</li>
				<li><a href="javascript:void(0);">跳蚤市场</a></li>
				<li style="width: 2%;">·</li>
				<li><a href="javascript:void(0);">二手交易</a></li>
				<div class="clear"></div>
			</ul>
			<div class="newsRandom topstyle"></div>	
    	</div>
        <div class="main">
		
			<!--新闻内容主体-->
	        <div class="container-fluid">
	            <div class="row-fluid">
	                <div class="page-header-mini">
	                    <asp:Label ID="lblTitle" runat="server" Text="Label" style="font-size: 22px;"></asp:Label>
	                </div>
	                <div class="row-fluid" style="margin-top:5px;" >
	                     <table style="width:100%; height:28px;">
	                        <tr>
	                            <td style="width:60%;">
	                                <asp:Label ID="lblCopyFrom" runat="server" Text="来源" style="font-size: 10px;"></asp:Label>&nbsp;&nbsp;&nbsp;<asp:Label ID="lblTime" runat="server" Text="发布时间"></asp:Label>
	                            </td>
	                            <%--<td style=" text-align:right;font-size:10px; color:#c61919;">
	                                阅读量：10000+
	                            </td>--%>
	                        </tr>
	                    </table>
	                </div>         
	            </div>
	            <div class="row-fluid contentline" ><asp:Label ID="lblContent" runat="server" Text="新闻内容"></asp:Label></div>
	        </div> 
		        
		    <div class="moreComment"><span>打开小芽澳洲 查看评论(99+)</span></div>
		    <div class='newsline'></div>
		    <div class="newsRandom"></div>
		    <div class="rate"></div>
			<div class='newsline'></div>
			<div class="weather"><ul></ul></div>
			<div style="padding: 0 15px;"><img src="http://img.wiloop.net/11_04.png" width="100%" /></div>		
		        
	        
			<!--最新30条澳洲新闻-->
			<div style="padding:10px 0;" id="newslist">
	            <table style="width:100%; height:28px;">
	                <tr>
		                <td style="width:7px;"></td>
	                    <td style="width:7px; background-color:#c61919;"></td>
	                    <td style="padding-left:4px; text-align:left; color:#333;font-size:16px; font-weight:bold; ">澳洲最新要闻</td>
	                </tr>
	            </table>
	        </div>
	        	
			<!--推荐随机攻略-->
			<div style="padding-top:10px;">
	            <table style="width:100%; height:28px;">
	                <tr>
		                <td style="width:7px;"></td>
	                    <td style="width:7px; background-color:#c61919;"></td>
	                    <td style="padding-left:4px; text-align:left; color:#333;font-size:16px; font-weight:bold; ">精华随机推荐</td>
	                </tr>
	            </table>
	         </div>
	        <asp:Repeater ID="Repeater1" runat="server">
	            <ItemTemplate>
	                <table style="width:100%; height:35px;" onclick=gotoNews("?id=<%#Eval("id") %>&catid=<%#Eval("catid") %>")>
	                    <tr>
	                        <td style="width:96px; padding:10px 0 6px 10px;"><image data-mark="newslist" src="<%#GetImage(Eval("pictureurls")) %>" style="width:96px; height:68px;" /></td>
	                        <td style="height:35px; padding:10px 5px; vertical-align:top"><a style="font-size:17px; font-weight:bold; color:#555; text-decoration:none;" href="?id=<%#Eval("id") %>&catid=<%#Eval("catid") %>"><%# Eval("title") %></a></td>
	                    </tr>
	                </table>
	                <div class="newsline"></div>
	            </ItemTemplate>
	        </asp:Repeater>
	
	        <asp:Repeater ID="Repeater2" runat="server">
	            <ItemTemplate>
	                <table style="width:100%; height:35px;" onclick=gotoNews("?id=<%#Eval("id") %>&catid=<%#Eval("catid") %>")>
	                    <tr>
	                        <td style="width:96px; padding:10px 0 6px 10px;"><div style="position:relative;"><image class="playicon" src="images/playicon_video.png" style="position:absolute;left:32px;top:12px;width:32px; z-index=2;" /><image data-mark="newslist" src="<%#GetImage(Eval("pictureurls")) %>" style=" position:relative; z-index=1;width:96px; height:68px;" /></div></td>
	                        <td style="height:35px; padding:10px 5px; vertical-align:top"><a style="font-size:17px; font-weight:bold; color:#555; text-decoration:none;" href="?id=<%#Eval("id") %>&catid=<%#Eval("catid") %>"><%# Eval("title") %></a></td>
	                    </tr>
	                </table>
	                <div class="newsline"></div>
	            </ItemTemplate>
	        </asp:Repeater>
	        
	        <div class="moreComment"><span>打开小芽澳洲</span><span>看30000+篇澳洲精华文章</span></div>
	
			<div class="readend"><span>亲，都看到这儿了，就下载个小芽澳洲吧~</span></div>
		</div>
		
        <div class="adv_bottom" style="display:none;">
             <table style="width:100%;">
                <tr>
                    <td style="width:44px;"><Image class="b_logo" src="http://7xloa9.com5.z0.glb.clouddn.com/AppIcon.gif" /></td>
                    <td vertical-align="middle"><asp:Image ID="bottom_img" runat="server" width="168" style="display:none;" /><img id="bottom_img2" src="images/bottom_11.gif" width="168" /></td>
					<td width="76" text-align="center"><a id="dapp" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653" class="quickOpen">立即下载</a></td>
                    <td width="40" text-align="right" vertical-align="middle" style="padding-top:5px;">&nbsp;&nbsp;<image id="closeBtn" src="images/closebtn.png" width="20" /></td>
                </tr>
            </table>
	    </div>
        <div class="tabbar tabbar2">
			<ul>
			<li class="tab_0">
				<img src="http://img.wiloop.net/tabbar_homepage_w.png" alt="tabbar_homepage">
				<a href="#">澳洲新闻</a>
			</li>
			<li class="tab_2">
				<img src="http://img.wiloop.net/tabbar_discover_w.png" alt="tabbar_discover">
				<a href="#">省钱快报</a>
			</li>
			<li class="tab_3">
				<img src="http://img.wiloop.net/tabbar_me_w.png" alt="tabbar_me">
				<a href="#">澳洲知乎</a>
			</li>
			<li class="tab_1">
				<img src="http://img.wiloop.net/tabbar_contacts_w.png" alt="tabbar_contacts">
				<a href="#">澳洲论坛</a>
			</li>
			<div class="clear"></div>
			</ul>
		</div>
		<div class="adv_top" style="height:0px;">
             <asp:Image ID="top_img" runat="server" width="0" style="display:none;" />
	    </div>
	    <div style='margin:0 auto;display:none;'>
			<img id='wx_pic' src="http://img.wiloop.net/32.png" />
	  	</div>
    </form>
</body>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-76237433-2', 'auto');
  ga('send', 'pageview');

</script>
</html>
