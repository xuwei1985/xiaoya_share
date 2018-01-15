var isLoadding=false;
var pagesize=20;
var max_id=0;
var catid=0;
var isComplete=false;//是否加载完所有数据
var scrollTop=0;
var isloaded=false;
var is_original="0";
var id = getParameter("id");
var catid = getParameter("catid");
var dm = getParameter("dm");//每次用不同的用户名
var randomNewsData;
var randomIndex;
var randomPage=0;
var addTime;
var addUserId;
var addUserName;

function setOriginal(n) {
    is_original = n;
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
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
	if(dm==1||localStorage.getItem("xiaoya_topic_user_identity")==null||localStorage.getItem("xiaoya_topic_user_identity").length<=0||(timestamp-localStorage.getItem("xiaoya_topic_user_identity_time"))>2*24*60*60*1000){
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

function downloadApp(nid){
	//window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
	if (paltform == "iPhone") {//ios
			window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653";
		}
		else{
			window.location.href ="android_down.html";
		}
}


//get topic detail info
function getMJUser(uname){
	$.ajax({
		 type: "get",
		 async: true,
		 url: "index.ashx?c=infov2&a=getmj&mj="+uname,
		 dataType: "json",
		 success: function(data){
			 if(data.state=="success"){
				 $("#matchUserHead").attr("src",data.data.userhead);
				 $("#matchUserName").html(data.data.nickname);
				 addUserId=data.data.memberid;
				 addUserName=data.data.nickname;
			 }
			 else{
				 alert("Error");
			 }
		 },
		 error: function(){  
			 hideLoading();
		 }
	 });
}

//get topic detail info
function loadTopic(){
	$.ajax({
		 type: "get",
		 async: true,
		 url: "index.ashx?c=ajaxinfo&a=detail&id="+id,
		 dataType: "json",
		 success: function(data){
			 if(data.state=="success"){
				 handlerTopicDetail(data.data);
				 hideLoading();
			 }
		 },
		 error: function(){  
			 hideLoading();
		 }
	 });
}

 
//handler topic detail data
function handlerTopicDetail(data){
	var topicObj;
	var picsHtml="";
	if(data!=null&&data.length>0){
		topicObj=data[0];
		//处理图片内容
		if(topicObj.pictures!=null&&topicObj.pictures.length>0){
			for(var i=0;i<topicObj.pictures.length;i++){
				picsHtml+="<img src='"+topicObj.pictures[i].url+"' />"
			}
		}
		
		$(".topicTitle>span").html("【澳洲圈子】"+topicObj.title);
		$("title").html("【澳洲圈子】"+topicObj.title);
		$("#updateTime").html(topicObj.update_time);
		$("#userName").html(topicObj.nickname);
		$("#userHead").attr("src",topicObj.userhead);
		$(".topicContent").html(topicObj.description.replace(/\n/g,"<br>") +picsHtml);//topicObj.description
		$(".topic_count").html(topicObj.readcount+" 阅读&nbsp;&nbsp; "+topicObj.comment_count+" 评论");
		$(".txtComment").attr("data-topicId",topicObj.id).attr("data-topicId",topicObj.id)
		
		if (paltform == "Win32" || paltform == "MacIntel") {
			$("#content").css("background-color", "#fafafa").css("width", "850px").css("margin", "0 auto");
			$("#header").css("position","relative");
		}
		//
	}
} 


//load topic commnets by page
function getCommentsList(){
	if(!isLoadding){
		isLoadding=true;
		
		$.ajax({
		 type: "get",
		 async: true,
		 url: "index.ashx?c=ajaxinfo&a=commentlist",
		 data: {listid:id,pagesize:pagesize,max_id:max_id,member:getUserIdentity()},
		 dataType: "json",
		 beforeSend:function(){
                      
         },
		 success: function(data){
			 if(data.state=="success"){
				handlerCommentsData(data.data);
				handlerPage(data.data)
			 }
			 isLoadding=false;
		 },
		 error: function(){  
			 isLoadding=false;
			 $(".nextPage").html("点击加载更多");         
		 }
	 });
	}
}

function handlerCommentsData(data){
	if(data!=null&&data.length>0){
		max_id=data[data.length-1].id;
		var commentHtml="";
		
		for(var i=0;i<data.length;i++){
			commentHtml+='<li><div class="commentInfo"><img class="avatar" src="'+data[i].headurl+'" /><div><span class="nickname">'+data[i].username+'</span><span class="creatTime">'+data[i].creat_at+'</span></div><span class="userfloor">'+data[i].idx+'楼</span><div class="clear"></div></div><div class="commentContent"><span>'+data[i].content+'</span>';
			
			//判断是否是回复别人的回复
			if(data[i].replays!=undefined&&data[i].replays.length>0){
				commentHtml+='<div class="replySource"><div class="replyInfo"><div class="commentInfo"><span class="nickname">'+data[i].replays[0].username+'</span><span class="userfloor">'+data[i].replays[0].idx+'楼</span><div class="clear"></div></div><div class="commentContent"><span>'+data[i].replays[0].content+'</span></div></div></div>';
			}
			
			commentHtml+='</div><div class="commentReplyToolBar" ><img src="Images/tata_comment@2x.png" /><a href="javascript:void(0);" class="btnReplyUser" data-id="'+data[i].id+'" data-uid="'+data[i].userid+'" data-uname="'+data[i].username+'" data-floor="'+data[i].idx+'" data-content="'+data[i].content+'">回复</a></div></li>';
		}
		
		$(".topicCommentList").eq(0).append(commentHtml);
	}
	
	if(getParameter("st")==1){
		showShareTip();
	}
} 

function handlerPage(data){
	 if(data!=null&&data.length>0){
		  if(data.length>=pagesize){
			  isComplete=false;
			  $(".nextPage").html("点击加载更多");
		  }else{
			  isComplete=true;
			  $(".nextPage").html("已经全部加载");
		  }
	  }
	  else{
		  if($(".topicCommentList li").length<=0){
			  $(".nextPage").html("");
		  }
	  }
}


function postClick(){
	
	$.ajax({
		 type: "get",
		 async: true,
		 url: "index.ashx?c=ajaxinfo&a=read&id="+id,
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
		var uid="0";
		var memberIndentity="";
		if(addUserId!=undefined&&addUserId!=null&&addUserId.length>0){
			uid=addUserId;
			memberIndentity="";
		}
		else{
			uid="";
			memberIndentity=getUserIdentity();
		}
		addTime=$("#commentTime").val();
		
		
		$.ajax({
		 type: "post",
		 async: true,
		 url: "index.ashx?c=ajaxinfo&a=Commentadd&listid="+obj.attr("data-topicId")+"&memberid="+uid+"&member="+memberIndentity+"&username="+(addUserName==undefined?"":addUserName)+"&content="+obj.val().trim()+"&replyid="+obj.attr("data-replyid")+"&replyuserid="+obj.attr("data-replyuid")+"&replyusername="+obj.attr("data-replyuname")+"&addtime="+addTime,
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
				
				commentHtml+='</div><div class="commentReplyToolBar" ><img src="Images/tata_comment@2x.png" /><a href="javascript:void(0);" class="btnReplyUser" data-id="'+data.data.id+'" data-uid="'+data.data.userid+'" data-uname="'+data.data.username+'" data-floor="'+data.data.idx+'" data-content="'+obj.val().trim()+'">回复</a></div></li>';
				 $(".myCommentList").append(commentHtml);
				 
				 obj.val("");
				 obj.parents(".topicBlock").find(".replyFloor").hide();
				 obj.parents(".topicBlock").find(".btnClose").hide();
				 obj.parents(".topicBlock").find(".txtComment").attr("data-replyid","0").attr("data-replyuid","0").attr("data-replyuname","");
				 $("#header").show();
				 $(".btnReply").show();
				 
				 //重新获取现在的发布时间
				 addTime=getNowFormatDate();
				 $("#commentTime").val(addTime);
				 
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
	addTime=getNowFormatDate();
	$("#commentTime").val(addTime);
	
	if(dm=="1"){
		$("#adminBar").show();
	}
	
	$("#btnMatch").click(function(){
		if($("#matchUser").val().length>0){
			getMJUser($("#matchUser").val());
		}
		else{
			alert("Enter a tag");
		}
		
	});
	
	//防止自动加载失败后。还可以支持手动点击一下
	$(".nextPage").click(function(){
		if(!isLoadding){
			getCommentsList();
		}
	});

	//回复用户
	$(".topicBlock").on('click','.btnReplyUser',function(){
		$("html,body").animate({scrollTop: $(this).parents(".topicBlock").find(".commentBar").offset().top-170}, 400);
		$(this).parents(".topicBlock").find(".txtComment").trigger("click");
		$(this).parents(".topicBlock").find(".txtComment").trigger("focus");
		$(this).parents(".topicBlock").find(".replyFloor").text("回复第"+$(this).attr("data-floor")+"楼").show();
		$(this).parents(".topicBlock").find(".btnClose").show()
		$(this).parents(".topicBlock").find(".txtComment").attr("data-replyid",$(this).attr("data-id")).attr("data-replyuid",$(this).attr("data-uid")).attr("data-replyuname",$(this).attr("data-uname")).attr("data-replycontent",$(this).attr("data-content")).attr("data-replyfloor",$(this).attr("data-floor"));
	})
	
	
	//匿名回帖
	$(".topicBlock").on('click','.btnReply',function(){
		$("html,body").animate({scrollTop: $(this).parents(".topicBlock").find(".commentBar").offset().top-170}, 400);
		 $(this).parents(".topicBlock").find(".txtComment").trigger("click");
		 $(this).parents(".topicBlock").find(".txtComment").trigger("focus");
		 $(this).parents(".topicBlock").find(".txtComment").attr("data-replyid",$(this).attr("data-id")).attr("data-replyuid",$(this).attr("data-uid")).attr("data-replyuname",$(this).attr("data-uname"));
		 
		 $(this).parents(".topicBlock").find(".replyFloor").hide();
		 $(this).parents(".topicBlock").find(".btnClose").hide()
	})
	
	$(".topicBlock").on('focus','.txtComment',function(){
		$("#header").hide();
		$(".btnReply").hide();
	})
	
/*
	$(".topicBlock").on('blur','.txtComment',function(){
		$("#header").show();
		$(".btnReply").show();
	})
*/
	
	$(".topicBlock").on('click','.btnClose',function(){
		$(this).parents(".topicBlock").find(".txtComment").attr("data-replyid","0").attr("data-replyuid","0").attr("data-replyuname","");
		$(this).prev().hide();
		$(this).hide()
	})
	
	//发送帖子回复
	$(".topicBlock").on('click','.btnSendComment',function(){
		postTopicComment($(this).parents(".topicBlock").find(".txtComment"));
	})
	
	$(".topicBlock").on('click','.btnShare_bottom',function(){
		showShareTip();
	})
	
	$(".topicBlock").on('click','.btnReply_bottom',function(){
		showShareTip();
	})
	
	$(".topicBlock").on('click','#btnShare',function(){
		showShareTip();
	})
	
	
	$(".maskbg").click(function () {
        $(".maskbg").hide();
        $(".downtip").hide();

    });

    $(".downtip").click(function (event) {
        $(".maskbg").hide();
        $(".downtip").hide();
    });
	
}

$(function(){
	//showLoading();
	loadTopic();
	getCommentsList();
	postClick();
	initAction();

	//点击加载更多数据
	/*
function loadMoreNews(){
		if(!isComplete){
			$(".nextPage").html("加载中...");
			getRaiders();
		}
	}
*/

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

    /*
if(isloaded){//上拉自动加载更多数据
        if((contentH-viewH-scrollOffset)<1200&&!isLoadding&&!isComplete){
	        $(".nextPage").html("加载中...");
	        getRaiders();
    	}  
    }
*/
});  

window.onload = function () {
 	isloaded=true;
}


