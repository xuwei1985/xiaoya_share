<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="businessinfo.aspx.cs" Inherits="Cute.businessinfo" %>

<!DOCTYPE html>
<html lang="zh-CN">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" name="viewport">
    <meta media="(device-height: 568px)" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" name="viewport">
    <link href="Style/news.css" rel="stylesheet" />
    <script src="Scripts/jquery-1.11.1.min.js"></script>
    <script>
        var pic_real_width, pic_real_height;

        $(function () {
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
                <asp:Label ID="lblContent" runat="server" Text="该商家没有详细介绍"></asp:Label>
            </div>

        </div>
  
    </form>
</body>
</html>