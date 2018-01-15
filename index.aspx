<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="Cute.index1" %>

<!DOCTYPE html>
<html lang="zh-CN">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" name="viewport">
    <meta media="(device-height: 568px)" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" name="viewport">
    <link href="Style/index.css" rel="stylesheet" />
    <script src="Script/jquery-1.11.1.min.js"></script>
    <script>
        var pic_real_width, pic_real_height;
        var is_original;

        function getFileExt(str) {
            var d = /\.[^\.]+$/.exec(str);
            return d;
        }

        function setOriginal(n) {
            is_original = n;
        }
		
		function getLinkTitle(str){
			return $("[href='"+str+"']").text();
		}
		var paltform = navigator.platform;
        $(function () {
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

                $(".contentline span div").removeAttr("style").css("font-size", "18px").css("line-height", "28px");
                $(".contentline a").removeAttr("style").css("font-size", "18px").css("line-height", "28px");
                $(".contentline span").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
                $(".contentline p").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
                $(".contentline strong").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
                $(".contentline b").removeAttr("style").css("font-family", "").css("font-size", "18px").css("line-height", "28px");
            }
			else{
				$(".contentline p").removeAttr("style").css("line-height", "18px");
			}
			$(".contentline video").css("width", "100%").css("height", "auto").css("background-color", "#000");
			if (paltform == "iPhone") {//ios
			//$(".contentline video").bind("loadedmetadata",function(e){
			//	window.location="command:loaded";
			//});
			$(".contentline video").bind("loadedmetadata",function(e){
				window.location="command:loaded";
			}).attr("webkit-playsinline","true");
			}
			
            var documentWidth = $(document.body).width() / 2;
            for (var i = 0; i < $("img").length; i++) {
                $("<img/>").attr("data-index", i).attr("src", $("img").eq(i).attr("src")).load(function () {
                    picRealWidth = this.width;
                    picRealHeight = this.height;

                    if (picRealWidth > documentWidth) {
                        if (getFileExt($("img").eq($(this).attr("data-index")).attr("src")) != ".gif") {
                            $("img").eq($(this).attr("data-index")).removeAttr("style");
                            $("img").eq($(this).attr("data-index")).css("height", "auto");
                            $("img").eq($(this).attr("data-index")).css("width", "100%");
                        }
                    }
                });
                //if (parseInt(documentWidth) < parseInt(pic_real_width)) {
                //    $("img").eq(i).css("width", "100% !important");
                //}
            }
        });
    </script>
</head>
<body>
    <form id="form2" runat="server">
        <div class="container-fluid">
            <div class="row-fluid">
                <div>
                    <asp:Label ID="lblTitle" runat="server" Text="Label"></asp:Label>
                </div>
                <div class="row-fluid">
                    <asp:Label ID="lblCopyFrom" runat="server" Text="来源"></asp:Label>&nbsp;&nbsp;&nbsp;<asp:Label ID="lblTime" runat="server" Text="发布时间"></asp:Label>
                </div>         
            </div>
            <div class="row-fluid contentline">
                <asp:Label ID="lblContent" runat="server" Text="新闻内容"></asp:Label>
            </div>

        </div>
         <%--<div class="bottomBar">
            <div class="logo"><img src="Images/AppIcon.png" width="50" /></div>
            <div class="slogan"><b>小芽同城</b><br /><span>了解更多澳洲同城资讯，吃喝玩乐，生活信息，旅游攻略...</span></div>
            <div class="download"><img src="Images/download-key.png" width="80" /></div>
        </div>--%>
    </form>
</body>
</html>
