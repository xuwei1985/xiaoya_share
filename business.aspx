<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="business.aspx.cs" Inherits="Cute.business" %>

<!DOCTYPE html>
<html lang="zh-CN">
<head runat="server">
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" name="viewport">
    <meta media="(device-height: 568px)" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" name="viewport">
    <link href="Style/news.css" rel="stylesheet" />
    <style>
        body {
            background-color:#eeeeee;
            margin:0;
            padding:0;
            word-wrap:break-word;
            font-family: Arial;
        }
        .container-fluid {
            padding:0;
        }

	.row-fluid{
        width:100%;
        padding-top:5px;
		background-color:#ffffff;
		line-height:22px;
        padding-bottom:10px;
        border-bottom:1px solid #ccc;
        padding-left:15px;
        margin-top:0;
	}
        .row-fluid span {
            font-size:14px;
            line-height:22px;
        }


    .row-title{
        width:100%;
        background-color:#ffffff;
        padding-left:15px;
		color:#555;
		margin-top:13px;
		font-weight:bold;
        padding-top:8px;
        display:block;
	}

        #lblTitle {
            font-size:18px;
            line-height:20px;
            word-wrap:break-word;
        }
        .picbox {
            float:left;
            width:115px;
            height:80px;
            border:1px solid #ccc;
            margin-right:10px;
        }

            .picbox img {
                width:115px;
                height:80px;
            }

        .storebasic {
            float:left;
        }

        .infoline {
            background-color:#ffffff;
            clear:both;
            float:left;
            width:100%;
            padding-top:15px;
            padding-bottom:5px;
            padding-left:15px;
            border-bottom:1px solid #ccc;
           
        }

        .grayblock {
            width:100%;
            height:20px;
            float:left;
            background-color:#cccccc;
            
        }

        
#lblContent {
    color: #444;
    display: block;
    line-height: 25px;
    padding-right: 15px;
}
    </style>
    <script src="Scripts/jquery-1.11.1.min.js"></script>
    <script>

        var pic_real_width, pic_real_height;

        function is_weixn() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }

        $(function () {
            $.extend({
                urlGet: function () {
                    var aQuery = window.location.href.split("?");  //鍙栧緱Get鍙傛暟
                    var aGET = new Array();
                    if (aQuery.length > 1) {
                        var aBuf = aQuery[1].split("&");
                        for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                            var aTmp = aBuf[i].split("=");  //鍒嗙key涓嶸alue
                            aGET[aTmp[0]] = aTmp[1];
                        }
                    }
                    return aGET;
                }
            })

            $(".container-fluid").css("width", ($(document.body).width() - 15) + "px");
            $("#lblTitle").css("width", ($(document.body).width() - 150) + "px");
            

            var paltform = navigator.platform;
            var documentWidth = $(document.body).width() / 2;

            //from=timeline
            var get = $.urlGet();

            $(".download").click(function (event) {

                var ttop = (window.screen.height / 2 - 100) / 2 + $(document).scrollTop() - 40;
                if ((get["from"] == "timeline" || get["from"] == "singlemessage") && is_weixn()) {
                    $(".maskbg").css({
                        "width": $(document.body).width(),
                        "height": $(document.body).height() + 500
                    });
                    $(".downtip").css({
                        "top": ttop,
                    });
                    $(".maskbg").fadeIn();
                    $(".downtip").fadeIn();
                }
                else {
                    $(".maskbg").hide();
                    $(".downtip").hide();
                }
            });

            $(".downtip").click(function (event) {
                $(".maskbg").hide();
                $(".downtip").hide();
            });


            $(".maskbg").click(function () {
                $(".maskbg").fadeOut();
                $(".downtip").fadeOut();

            });

            if (paltform != "Win32" && paltform != "MacIntel") {//绉诲姩骞冲彴
                $(".main").css("width", "100%");
            }
            else {


            }
        });

    </script>
</head>
<body>
    <form id="form2" runat="server">
       <div class="adv_top">
            <table style="width:100%;">
                <tr>
                    <td style="width:52px; text-align:center;"><Image class="b_logo" src="images/appicon.gif" /></td>
                    <td vertical-align="middle"><asp:Image ID="top_img" runat="server" width="198" /></td>
				    <td width="76" text-align="center"><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653" class="quickOpen">立即打开</a></td>
                    <td width="10">&nbsp;</td>
                </tr>
            </table>
	   </div>
       <div class="container-fluid">
            <div style="border-bottom:1px solid #ccc; width:100%; float:left;padding-bottom:10px;background-color:#ffffff; padding-top:25px; padding-left:15px;">
                <div class="picbox">
                    <asp:Image ID="Image1" runat="server" />
                </div>
                <div class="storebasic">
                     <div class="page-header-mini">
                        <asp:Label ID="lblTitle" runat="server" Text="Label"></asp:Label>
                    </div>
                    <div style="margin-top:6px">
                        <asp:Image ID="storestar" Width="66" runat="server" />
                    </div>
                    <div>
                        <asp:Label ID="lblCopyFrom" runat="server" Text=""></asp:Label><asp:Label ID="lblTime" runat="server" Text="发布时间"></asp:Label>
                    </div>     
                </div>
                   
            </div>
           
           <div class="infoline" style="background-color:#fff;">&nbsp;<img src="Images/address@2x.png" width="12" />&nbsp;<asp:Label ID="lblAddress" runat="server" Text="暂无信息"></asp:Label><img src="Images/cellArrow@2x.png" style="float:right; width:30px;" /></div>
           <div class="infoline" style="background-color:#fff;"><img src="Images/tel@2x.png" width="18" />&nbsp;&nbsp;<asp:Label ID="lblPhone" runat="server" Text="暂无信息"></asp:Label><img src="Images/cellArrow@2x.png" style="float:right; width:30px;" /></div>
           <div style="clear:both;"></div>
            <div class="row-title">营业时间:</div>
            <div class="row-fluid">
                <asp:Label ID="lblOpen" runat="server" Text="营业时间" ></asp:Label>
            </div>
            <div class="row-title">商家介绍:</div>
            <div class="row-fluid" >
                <asp:Label ID="lblContent" runat="server" Text="该商家没有详细信息"></asp:Label>
            </div>

        </div>

         <%--<div class="bottomBar">
            <div class="logo"><img src="Images/AppIcon.png" width="50" /></div>
            <div class="slogan"><b>小芽同城</b><br /><span>了解更多澳洲同城资讯，吃喝玩乐，生活信息，旅游攻略...</span></div>
            <div class="download"><img src="Images/download-key.png" width="80" /></div>
             <img src="Images/down1.jpg" width="100%" border="0" />
        </div>--%>
	<div class="adv_bottom">
            <table style="width:100%;">
            <tr>
                <td style="width:44px;"><Image class="b_logo" src="images/appicon.gif" /></td>
                <td vertical-align="middle"><asp:Image ID="bottom_img" runat="server" width="168" /></td>
				<td width="76" text-align="center"><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.wuxuwei.xiaoya&g_f=991653" class="quickOpen">立即打开</a></td>
                <td width="40" text-align="right" vertical-align="middle" style="padding-top:5px;">&nbsp;&nbsp;<image id="closeBtn" src="images/closebtn.png" width="20" /></td>
            </tr>
        </table>
	</div>
 	<div class="maskbg" ></div>
        <div class="downtip">
            <p style="margin-bottom:25px; margin-top:15px; font-size:19px;">因为小企鹅墙掉了小苹果的链接，所以。。。</p>
            <p style=" font-size:17px;">方法一：点击右上角的“…” 选择在safari中打开，再次点击下载按钮即可自动跳转APP STORE下载小芽海外啦！</p>
            <p style=" font-size:17px;">方法二：打开APP STORE, 搜索“小芽海外”，即可下载！简单粗暴！</p>
        </div>
    </form>
</body>
</html>