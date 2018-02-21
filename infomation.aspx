<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="infomation.aspx.cs" Inherits="Cute.infomation" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" name="viewport">
    <meta media="(device-height: 568px)" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" name="viewport">
    <title></title>
    <link href="Style/style.css" rel="stylesheet" />
    <link href="Style/info.css" rel="stylesheet" />
    <script src="Scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="Script/script.js"></script>
	<script>
		function getParameter(sProp) {
			var re = new RegExp(sProp + "=([^\&]*)", "i");
			var a = re.exec(document.location.search);
			if (a == null)
				return null;
			return a[1];
		};
		
		$(function(){
			var strname =getParameter("type");
			if(strname=='houtai'){
				$(".mainPage").css({
					"width":"450px",
					"margin":"0 auto",
					"word-break":"break-all",
					"background-color":"#f9f9f9"
				});
			}
		});
			
		var paltform = navigator.platform;
		
		$(function(){
			$(".moreComment").click(function (event) {
		        downloadApp();
		    });
		    
		    $(".adv_down").click(function(){
				downloadApp();
			});
			
			$(".littelink").click(function(){
				downloadApp();
			});
			
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
		});
	</script>
</head>
<body>
    <form id="form1" runat="server">
	<div data-role="main" id="content">
    	<div id="header">
			<img class="messageBtn" src="<%=image_url %>message.png" alt="search">
			<img class="titleBtn" src="<%=image_url %>titleNav.png" alt="titleNav">
			<img class="searchBtn" src="<%=image_url %>search.png" >
			
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
		        	<a href="#">澳洲论坛</a>
		        </li>
		        <div class="clear"></div>
			</ul>
		</div>
	</div>
    <asp:Panel ID="Panel3" runat="server">
    <div class="mainPage">
	    <div><img src="<%=image_url %>11_02.png" width="100%" /></div>
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
        <!--标题信息-->
        <div class="info_basic">
            <div class="basic_left"> <img id="imgleft" runat="server" src="Images/topic_default.png" width="100" height="72"/></div>
            <div class="basic_right">
                <asp:Label ID="lblTitle" runat="server" Text="Label" CssClass="topicTitle"></asp:Label>
                <div>
                    <table style="width:100%;">
                        <tr>
                            <td style="width:18px; text-align:left;"><img id="userHeader" src="Images/AppIcon.jpg" width="20" height="20" runat="server" /></td>
                            <td> <asp:Label ID="lblNickname" runat="server" Text="Label" CssClass="nickname"></asp:Label>  </td>
                            <td style="width:90px; text-align:right;"><asp:Label ID="lblPubishTime" runat="server" Text="Label" CssClass="publishTime"></asp:Label>
                                <asp:Label ID="lblreadcount" runat="server" Text="" Visible="false"></asp:Label></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        
        
        <!--房屋出租信息（特有）-->
        <asp:Panel ID="Panel1" runat="server">    
            <div  class="rentInfo"> 
			<table style="width:100%;" border="0"cellpadding="2"cellspacing="0">
				<tr>
					<td class="rentField">租金</td>
					<td class="rentValue">
                        <asp:Label ID="lblRent" runat="server"></asp:Label> 澳元/周</td>
				</tr>
				<tr>
					<td class="rentField">区域</td>
					<td class="rentValue"><asp:Label ID="lblArea" runat="server"></asp:Label></td>
				</tr>
				<tr>
					<td class="rentField">来源</td>
					<td class="rentValue"><asp:Label ID="lblSource" runat="server"></asp:Label></td>
				</tr>
				<tr>
					<td class="rentField">类别</td>
					<td class="rentValue"><asp:Label ID="lblType" runat="server"></asp:Label></td>
				</tr>
				<tr>
					<td class="rentField">电话</td>
					<td class="rentValue"><asp:Label ID="lblPhone" runat="server"></asp:Label></td>
				</tr>
                <tr>
					<td class="rentField lastone" >微信</td>
					<td class="rentValue lastone"><asp:Label ID="lblWebChat" runat="server"></asp:Label></td>
				</tr>
			</table>
            </div>  	  
            <div class="contentSplit"></div>
        </asp:Panel>
		

        <!--房屋出租信息（特有）-->
        <asp:Panel ID="Panel2" runat="server">    
            <div  class="rentInfo">
                <table style="width:100%;" border="0"cellpadding="2"cellspacing="0">
				<tr>
					<td class="rentField">电话</td>
					<td class="rentValue"><asp:Label ID="lblPhone2" runat="server"></asp:Label></td>
				</tr>
                <tr>
					<td class="rentField lastone">微信</td>
					<td class="rentValue lastone"><asp:Label ID="lblWebChat2" runat="server"></asp:Label></td>
				</tr>
                    </table>

            </div>
            </asp:Panel>

        <!--详情内容列表-->
        <div class="topicContent">
            <asp:Label ID="lblContent" runat="server" Text=""></asp:Label>
			<!--图片列表-->
			<asp:Repeater ID="Repeater1" runat="server">
				<ItemTemplate>
					<img class="itemPic" src="<%#Eval("url") %>"/>
				</ItemTemplate>
			</asp:Repeater>
        </div>
        
<!-- 		<div class="contentSplit2">以下内容由小芽澳洲论坛提供</div> -->

    </div>
        </asp:Panel>
        <asp:Panel ID="Panel4" runat="server">
            <p style="padding:20px 25px; color:#666; font-size:16px; text-align:center; line-height:40px; margin:0 auto; width:80%">此帖已关闭</p>
        </asp:Panel>

<!--
		<div class="adv_bottom">
             <table style="width:100%;">
                <tr>
                    <td style="width:44px;"><Image class="b_logo" src="http://7xloa9.com5.z0.glb.clouddn.com/AppIcon.gif" /></td>
                    <td vertical-align="middle"><img src="images/bottom_11.gif" width="168" /></td>
					<td width="76" text-align="center"><a id="dapp" href="javascript:void(0);" class="quickOpen">立即下载</a></td>
                    <td width="40" text-align="right" vertical-align="middle" style="padding-top:5px;">&nbsp;&nbsp;<image id="closeBtn" src="images/closebtn.png" width="20" /></td>
                </tr>
            </table>
	    </div>
-->

	    <div style='margin:0 auto;display:none;'>
			<img id='wx_pic' src="<%=image_url %>32.png" />
	  	</div>
    </form>
    <div class="adv_down">
         <table style="width:100%;">
            <tr>
                <td style="width:64px; padding-left: 12px;"><Image class="b_logo" src="<%=image_url %>32.png" /></td>
                <td vertical-align="middle">
                    <div style="font-size: 21px;">小芽澳洲</div>
                    <div style="font-size: 12px; line-height: 22px; color: #ccc;">新闻·贴吧·折扣·租房</div>
                </td>
				<td width="100" text-align="left"><a id="dapp" href="javascript:void(0);" class="quickOpen">立即下载</a></td>
            </tr>
        </table>
    </div>
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
