var isLoadding=false;
var pagesize=30;
var max_id=0;
var catid=0;
var isComplete=false;//是否加载完所有数据
var scrollTop=0;
var isloaded=false;
var is_original="0";
var id = getParameter("id");
var catid = getParameter("catid");
var randomNewsData;
var randomIndex;
var randomPage=0;

function setOriginal(n) {
    is_original = n;
}

if(catid==1097){
	window.location.href="novideo.html";
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
			window.location.href = "android_down.html";
		}
		else{
			window.location.href ="android_down.html";
		}
}

//handler images request
function handlerImageRequest(){
	$("#newslist img").each(function(index,element){
		var imgObj=$(element);
		loadImage(imgObj.attr("data-src"),function(){
	        imgObj.attr("src",imgObj.attr("data-src"));
        });
	});
}

//load images by url，if it has cache than return
function loadImage(url,callback) {
    var img = new Image();
    
    img.src = url;
 
    if(img.complete) {  // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img);
        return; // 直接返回，不用再处理onload事件
    }
 
    img.onload = function(){
        img.onload = null;
        callback.call(img);
    }
}


//goto news detail page
function gotoNews(url) {
	scrollTop=$(document).scrollTop(); 
	saveViewHistoryToLocal();
    window.location.href = url;
}

//load news by page
function getRaiders(){
	if(!isLoadding){
		isLoadding=true;
		
		$.ajax({
		 type: "get",
		 async: true,
		 url: "index.ashx?c=ajaxraiders&a=random&cache=1",
		 data: {pagesize:pagesize,page:randomPage},
		 dataType: "json",
		 beforeSend:function(){
                      
         },
		 success: function(data){
			 if(data.state=="success"){
				 handlerData(data.data);
			 }
		 },
		 error: function(){  
			 isLoadding=false;
			 $(".nextPage").html("点击加载更多");         
		 }
	 });
	}
}


function handlerData(data){
	randomPage++;
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
	  
	  if(data!=null&&data.length>0){
		  max_id=data[data.length-1].id;
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
			  newsHtml+='<table style="width:100%;" onclick=gotoNews("newsDetail.html?id='+data[i].id+'&catid='+data[i].catid+'")><tr><td class="singleimg"><img data-mark="newslist" data-src="'+singleImgUrl+'" src="http://img.wiloop.net/topic_default.png" /></td><td class="singletitle"><div class="singletext" style="font-size:'+titleSize+'px;">'+data[i].title+'</div></td></tr></table><div class="newsline"></div>';
		  }
		  else{//多图的形式
			  mutiImageHtml="";
			  for(var n=0;n<data[i].picurls.length;n++){
				  mutiImageHtml+='<div class="imgItem" ><img style="width:'+imgWidth+'px;height:'+imgHeight+'px;" data-mark="newslist" data-src="'+data[i].picurls[n].url+'?imageView2/0/w/184/h/132/format/jpg" src="http://img.wiloop.net/topic_default.png" /></div>';
				  if(n>2){
					  break;
				  }
			  }
			  
			  newsHtml+='<table style="width:100%;" onclick=gotoNews("newsDetail.html?id='+data[i].id+'&catid='+data[i].catid+'")><tr><td class="mutiimg"><div class="mutitext" style="font-size:'+titleSize+'px;">'+data[i].title+'</div></td></tr><tr><td style="padding:0px 0px 0px 12px;vertical-align:top"><div class="imgGroup">'+mutiImageHtml+'<div class="clear"></div></div></td></tr></table><div class="newsline"></div>';
		   }
		  
		    if((i+1)%3==0&&randomIndex>=0){//splite news with three news
				
				mutiImageHtml="";
				for(var n=0;n<randomNewsData[randomIndex].picurls.length;n++){
				   mutiImageHtml+='<div class="imgItem" ><img style="width:'+imgWidth+'px;height:'+imgHeight+'px;" data-mark="newslist" data-src="'+randomNewsData[randomIndex].picurls[n].url+'?imageView2/0/w/184/h/132/format/jpg" src="http://img.wiloop.net/topic_default.png" /></div>';
				  if(n>2){
					  break;
				  }
				}
				
				newsHtml+='<table style="width:100%;" onclick=downloadApp("'+randomNewsData[randomIndex].id+'")><tr><td class="mutiimg"><div class="mutitext" style="font-size:'+titleSize+'px;">'+randomNewsData[randomIndex].description+'</div></td></tr><tr><td style="padding:0px 0px 0px 12px;vertical-align:top"><div class="imgGroup">'+mutiImageHtml+'<div class="clear"></div></div></td></tr><tr><td><div class="readnum">阅读量:'+randomNewsData[randomIndex].copyfrom_text+'</div><span class="openxy">打开小芽查看</span></td></tr></table><div class="newsline"></div>';
				
				randomIndex--;
			}

		  
	  }
	  $("#newslist").append(newsHtml);
	  if(isloaded){
		  setTimeout(function(){
			 handlerImageRequest();
		},300);
	  }

	  handlerPage(data);
	  isLoadding=false;
 }

function handlerPage(data){
	 if(data!=null){
		  if(data.length>=pagesize){
			  isComplete=false;
			  $(".nextPage").html("点击加载更多");
		  }else{
			  isComplete=true;
			  $(".nextPage").html("已经全部加载");
		  }
	  }
}

//get news detail info
function loadNews(){
	$.ajax({
		 type: "get",
		 async: true,
		 url: "index.ashx?c=ajaxnews&a=detail&id="+id+"&catid="+catid,
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
		
		//$(".danmuCantainer").show();
		
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
				 
				 /* getRaiders(); */
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

//加载精华帖子
function loadEssenceTopic(){
	$.ajax({
		 type: "get",
		 async: true,
		 url: "index.ashx?c=ajaxinfo&a=getone&essence=1&page=1&pagesize=1&member="+getUserIdentity(),
		 dataType: "json",
		 success: function(data){
			 if(data.state=="success"){
				 handlerEssenceTopic(data.data);
			 }
		 },
		 error: function(){  
		 }
	 });
}

//处理精华帖子数据
function handlerEssenceTopic(data){
	var topicHtml0="";
	var picsHtml0="";
	var topicHeader0='<div style="padding-top:10px; margin-bottom: 10px; "><table style="width:100%; height:22px;"><tr><td style="width:5px; background-color:#c61919;"></td><td style="padding-left:4px; text-align:left; color:#c61919;font-size:16px; font-weight: bold; ">网友正在看的帖子<span class="btnRechange"><img src="Images/tongbu_in@2x.png" />换一换</span></td></tr></table></div>';
	
	if(data!=null&&data.length>0){
		for(var i=0;i<data.length;i++){
			//处理图片内容
			if(data[i].pictures!=null&&data[i].pictures.length>0){
				for(var n=0;n<data[i].pictures.length;n++){
					picsHtml0+="<img src='"+data[i].pictures[n].url+"' />"
				}
			}
	
			topicHtml0+='<div class="essenceTopic topicBlock" data-status="close"><div class="topicTitle"><span>【澳洲圈子】'+data[i].title+'</span></div><div class="topic_info"><span class="topic_count">'+data[i].readcount+' 阅读  '+data[i].comment_count+' 评论</span><a href="javascript:void(0);" class="btnShare" data-id='+data[i].id+'>转发此贴</a><div class="clear"></div></div><div class="topicContent">'+data[i].content.replace(/\n/g,"<br>")+picsHtml0+'</div><div class="replyBar"><a href="javascript:void(0);" class="btnReply">匿名回帖</a></div><ul class="topicCommentList">';
			if(data[i].comments!=null&&data[i].comments.length>0){
				for(var j=0;j<data[i].comments.length;j++){
					topicHtml0+='<li><div class="commentInfo"><img class="avatar" src="'+data[i].comments[j].headurl+'" /><span class="nickname">'+data[i].comments[j].username+'</span><span class="userfloor">'+data[i].comments[j].idx+'楼</span><div class="clear"></div></div><div class="commentContent"><span>'+data[i].comments[j].content+'</span>';
					
					//判断是否是回复别人的回复
					if(data[i].comments[j].replays!=undefined&&data[i].comments[j].replays.length>0){
						topicHtml0+='<div class="replySource"><div class="replyInfo"><div class="commentInfo"><span class="nickname">'+data[i].comments[j].replays[0].username+'</span><span class="userfloor">'+data[i].comments[j].replays[0].idx+'楼</span><div class="clear"></div></div><div class="commentContent"><span>'+data[i].comments[j].replays[0].content+'</span></div></div></div>';
					}
					
					topicHtml0+='</div><div class="commentReplyToolBar" ><img src="Images/tata_comment@2x.png" /><a href="javascript:void(0);" class="btnReplyUser" data-id="'+data[i].comments[j].id+'" data-uid="'+data[i].comments[j].userid+'" data-uname="'+data[i].comments[j].username+'" data-floor="'+data[i].comments[j].idx+'" data-content="'+data[i].comments[j].content+'">回复</a></div></li>';
				}
			}
		
			topicHtml0+='</ul><div class="moreComment2" data-topicId="'+data[i].id+'">展开更多评论<img src="Images/arrow_down_blue.png"/></div><ul class="topicCommentList myCommentList"></ul><div class="commentTool"><div class="btnShare_bottom" data-topicId="'+data[i].id+'">转发</div><div class="btnReply_bottom" data-topicId="'+data[i].id+'">收藏</div><div class="clear"></div></div><div class="commentBar"><textarea data-topicId="'+data[i].id+'" rows="5" class="txtComment" maxlength="300" placeholder="我来说两句" data-role="none" data-replyid="0" data-replyuid="0" data-replyuname=""></textarea><span class="replyFloor"></span><img src="Images/closebtn@2x.png" class="btnClose" /><a href="javascript:void(0);" class="btnSendComment">匿名发表</a></div></div></div>';
			
		}
	}
	
	topicHtml0=topicHeader0+topicHtml0;
	//$(".randomTopic").prepend("Some prepended text."); 
	$(".essenceTopic").html(topicHtml0);
} 

//加载随机信帖子
function loadNewTopic(){
	$.ajax({
		 type: "get",
		 async: true,
		 url: "index.ashx?c=ajaxinfo&a=getone&essence=0&page=1&pagesize=3&member="+getUserIdentity(),
		 dataType: "json",
		 success: function(data){
			 if(data.state=="success"){
				 handlerNewTopic(data.data);
			 }
		 },
		 error: function(){  
		 }
	 });
}

//处理精华帖子数据
function handlerNewTopic(data){
	var topicHtml="";
	var picsHtml="";
	
	var topicHeader='<div style="padding-top:10px; margin-bottom: 10px; "><table style="width:100%; height:22px;"><tr><td style="width:5px; background-color:#c61919;"></td><td style="padding-left:4px; text-align:left; color:#c61919;font-size:16px; font-weight: bold; ">网友正在看的帖子<span class="btnRechange"><img src="Images/tongbu_in@2x.png" />换一换</span></td></tr></table></div>';
	
	if(data!=null&&data.length>0){
		for(var i=0;i<data.length;i++){
			picsHtml="";
			//处理图片内容
			if(data[i].pictures!=null&&data[i].pictures.length>0){
				for(var n=0;n<data[i].pictures.length;n++){
					picsHtml+="<img src='"+data[i].pictures[n].url+"' />"
				}
			}
			topicHtml+=topicHeader;
			topicHtml+='<div class="newTopic topicBlock" data-status="close"><div class="topicTitle"><span>【澳洲圈子】'+data[i].title+'</span></div><div class="topic_info"><span class="topic_count">'+data[i].readcount+' 阅读  '+data[i].comment_count+' 评论</span><a href="javascript:void(0);" class="btnShare" data-id='+data[i].id+'>转发此贴</a><div class="clear"></div></div><div class="topicContent">'+data[i].content.replace(/\n/g,"<br>")+picsHtml+'</div><div class="replyBar"><a href="javascript:void(0);" class="btnReply">匿名回帖</a></div><ul class="topicCommentList">';
			if(data[i].comments!=null&&data[i].comments.length>0){
				for(var j=0;j<data[i].comments.length;j++){
					topicHtml+='<li><div class="commentInfo"><img class="avatar" src="'+data[i].comments[j].headurl+'" /><span class="nickname">'+data[i].comments[j].username+'</span><span class="userfloor">'+data[i].comments[j].idx+'楼</span><div class="clear"></div></div><div class="commentContent"><span>'+data[i].comments[j].content+'</span>';
					
					//判断是否是回复别人的回复
					if(data[i].comments[j].replays!=undefined&&data[i].comments[j].replays.length>0){
						topicHtml+='<div class="replySource"><div class="replyInfo"><div class="commentInfo"><span class="nickname">'+data[i].comments[j].replays[0].username+'</span><span class="userfloor">'+data[i].comments[j].replays[0].idx+'楼</span><div class="clear"></div></div><div class="commentContent"><span>'+data[i].comments[j].replays[0].content+'</span></div></div></div>';
					}
					
					topicHtml+='</div><div class="commentReplyToolBar" ><img src="Images/tata_comment@2x.png" /><a href="javascript:void(0);" class="btnReplyUser" data-id="'+data[i].comments[j].id+'" data-uid="'+data[i].comments[j].userid+'" data-uname="'+data[i].comments[j].username+'" data-floor="'+data[i].comments[j].idx+'" data-content="'+data[i].comments[j].content+'">回复</a></div></li>';
				}
			}
		
			topicHtml+='</ul><div class="moreComment2" data-topicId="'+data[i].id+'">展开更多评论<img src="Images/arrow_down_blue.png"/></div><ul class="topicCommentList myCommentList"><div class="commentTool"><div class="btnShare_bottom" data-topicId="'+data[i].id+'">转发</div><div class="btnReply_bottom" data-topicId="'+data[i].id+'">收藏</div><div class="clear"></div></div><div class="commentBar"><textarea data-topicId="'+data[i].id+'" rows="5" class="txtComment" maxlength="300" placeholder="我来说两句" data-role="none" data-replyid="0" data-replyuid="0" data-replyuname=""></textarea><span class="replyFloor"></span><img src="Images/closebtn@2x.png" class="btnClose" /><a href="javascript:void(0);" class="btnSendComment">匿名发表</a></div></div></div>'
			
		}
	}
	
	
	$(".newTopic").append(topicHtml);
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

//提交评论信息
function postTopicComment(obj){
	if(obj.val().length>0){
		$.ajax({
		 type: "post",
		 async: true,
		 url: "index.ashx?c=ajaxinfo&a=Commentadd&listid="+obj.attr("data-topicId")+"&member="+getUserIdentity()+"&content="+obj.val().trim()+"&replyid="+obj.attr("data-replyid")+"&replyuserid="+obj.attr("data-replyuid")+"&replyusername="+obj.attr("data-replyuname")+"",
		 dataType: "json",
		 success: function(data){
			 if(data.state=="success"){
				 
				 //插入到本地评论列表
				 var commentHtml="";
				 commentHtml='<li><div class="commentInfo"><img class="avatar" src="'+data.data.small_avatar+'" /><span class="nickname">'+data.data.username+'</span><span class="userfloor">'+data.data.idx+'楼</span><div class="clear"></div></div><div class="commentContent"><span>'+obj.val().trim()+'</span>';
				 
				 
				 //判断是否是回复别人的回复
				if(obj.parents(".topicBlock").find(".btnClose").css("display")!="none"){
					commentHtml+='<div class="replySource"><div class="replyInfo"><div class="commentInfo"><span class="nickname">'+obj.attr("data-replyuname")+'</span><span class="userfloor">'+obj.attr("data-replyfloor")+'楼</span><div class="clear"></div></div><div class="commentContent"><span>'+obj.attr("data-replycontent")+'</span></div></div></div>';
				}
				
				commentHtml+='</div><div class="commentReplyToolBar" ><img src="Images/tata_comment@2x.png" /><a href="javascript:void(0);" class="btnReplyUser" data-id="'+data.data.id+'" data-uid="'+data.userid+'" data-uname="'+data.data.username+'" data-floor="'+data.data.idx+'">回复</a></div></li>';
				
					
				 obj.parents(".topicBlock").find(".myCommentList").append(commentHtml);
				 
				 obj.val("");
				 
				 obj.parents(".topicBlock").find(".replyFloor").hide();
				 obj.parents(".topicBlock").find(".btnClose").hide()
				 alert("评论成功");
			 }
			 else{
				 alert("评论失败");
			 }
		 },
		 error: function(){
			   alert("评论发生错误");
		 }
	 });
	}
	else{
		alert("请输入评论内容");
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
	//防止自动加载失败后。还可以支持手动点击一下
	$(".nextPage").click(function(){
		if(!isLoadding){
			loadMoreNews();
		}
	});
	
	$(".moreComment").click(function (event) {
        downloadApp();
    });
	
	$(".rate").on("click",".rappbtn",function(){
		downloadApp();
	});
	
	$(".adv_down").click("click",function(){
		downloadApp();
	});
	
	$("#content").on("click",".banner img",function(){
		gotoNews("newsDetail.html?id="+$(this).attr("data-id")+"&catid="+$(this).attr("data-catid"));
	});
	
	$(".iconNav_raiders li").click(function(){
		window.location.href = "raiders.html";
	});
	
	$(".littelink").click(function(){
		downloadApp();
	});
	
	//回复用户
	$(".randomTopic").on('click','.btnReplyUser',function(){
		$("html,body").animate({scrollTop: $(this).parents(".topicBlock").find(".commentBar").offset().top-170}, 400);
		
		$(this).parents(".topicBlock").find(".txtComment").trigger("click");
		$(this).parents(".topicBlock").find(".txtComment").trigger("focus");
		$(this).parents(".topicBlock").find(".replyFloor").text("回复第"+$(this).attr("data-floor")+"楼").show();
		$(this).parents(".topicBlock").find(".btnClose").show()
		$(this).parents(".topicBlock").find(".txtComment").attr("data-replyid",$(this).attr("data-id")).attr("data-replyuid",$(this).attr("data-uid")).attr("data-replyuname",$(this).attr("data-uname")).attr("data-replycontent",$(this).attr("data-content")).attr("data-replyfloor",$(this).attr("data-floor"));
		
		
	})
	
	
	//匿名回帖
	$(".randomTopic").on('click','.btnReply',function(){
		$("html,body").animate({scrollTop: $(this).parents(".topicBlock").find(".commentBar").offset().top-170}, 400);
		 $(this).parents(".topicBlock").find(".txtComment").trigger("click");
		 $(this).parents(".topicBlock").find(".txtComment").trigger("focus");
		 $(this).parents(".topicBlock").find(".txtComment").attr("data-replyid",$(this).attr("data-id")).attr("data-replyuid",$(this).attr("data-uid")).attr("data-replyuname",$(this).attr("data-uname"));
		 
		 $(this).parents(".topicBlock").find(".replyFloor").hide();
		 $(this).parents(".topicBlock").find(".btnClose").hide()
	})
	
	$(".randomTopic").on('focus','.txtComment',function(){
		$("#header").hide();
	})
	
	$(".randomTopic").on('blur','.txtComment',function(){
		$("#header").show();
	})
	
	$(".randomTopic").on('click','.btnClose',function(){
		$(this).parents(".topicBlock").find(".txtComment").attr("data-replyid","0").attr("data-replyuid","0").attr("data-replyuname","");
		$(this).prev().hide();
		$(this).hide()
	})
	
	//发送帖子回复
	$(".randomTopic").on('click','.btnSendComment',function(){
		postTopicComment($(this).parents(".topicBlock").find(".txtComment"));
	})
	
	
	$(".randomTopic").on('click','.btnShare',function(){
		window.location.href="topicDetail.html?id="+$(this).attr("data-id")+"&st=1";
	})
	
	
	$(".randomTopic").on('click','.moreComment2',function(){
		window.location.href="topicDetail.html?id="+$(this).attr("data-topicId")+"&st=0";
	})
	
	$(".randomTopic").on('click','.btnShare_bottom',function(){
		window.location.href="topicDetail.html?id="+$(this).attr("data-topicId")+"&st=1";
	})
	
	$(".randomTopic").on('click','.btnReply_bottom',function(){
		window.location.href="topicDetail.html?id="+$(this).attr("data-topicId")+"&st=1";
	})
	
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
	showLoading();
	loadNews();
	loadZBNews();
	/*
loadEssenceTopic();
	loadNewTopic();
*/
	initAction();
	
	//点击加载更多数据
	function loadMoreNews(){
		if(!isComplete){
			$(".nextPage").html("加载中...");
			getRaiders();
		}
	}

});


$(document).scroll(function(){   
    var viewH =$(window).height(),//可见高度  
    contentH =$(document).height(),//内容高度  
    scrollOffset =$(this).scrollTop();//滚动高度  
    
    if ($(".downtip").css("display")!="none") {
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
    

    if(isloaded){//上拉自动加载更多数据
        if((contentH-viewH-scrollOffset)<1200&&!isLoadding&&!isComplete){
	        $(".nextPage").html("加载中...");
	        getRaiders();
    	}  
    }
});  

window.onload = function () {
 	isloaded=true;
 	
	//优先从本地获取数据，不符合条件则从网络加载
    if(!getViewHistoryFromLocal()){
	    getRaiders();
    }
    else{
	    setTimeout(function(){
			 handlerImageRequest();
		},300);
    }
}


