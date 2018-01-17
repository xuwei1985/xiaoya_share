var paltform = navigator.platform;
var documentWidth = $(document.body).width();
var domain = "http://m.primedu.cn";
var appId = "wx12249a5e09de9521";
var appSecret = "7f5d7398874d62cad2a1f12fb1213921";
var timeStamp = getTimeStamp();
var noncestr = "supper_pgy";
var state = "pgy";
var openid = "ofBmiwmb4kkpDjqOBnVUZm3euhPc";
var mobile = "";
var nickname = "";
var avatar = "";
var appName = "彩虹堂英语";

//数据序列化到本地
var cacheUserData = function (openid, nickname, avatar) {
    if (window.localStorage) {
        localStorage.setItem("openid", openid);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("avatar", avatar);
    }
}

var getUserDataFromLocal = function () {
    if (window.localStorage) {
        return {
            "openid": localStorage.getItem("openid"),
            "nickname": localStorage.getItem("nickname"),
            "avatar": localStorage.getItem("avatar")
        };
    }
    return {
        "openid": "",
        "nickname": "",
        "avatar": ""
    };
}

//清除本地序列化数据
var clearLocalStorage = function () {
    if (window.localStorage) {
        localStorage.clear();
    }
}

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function get_unix_time(dateStr) {
    var newstr = dateStr.replace(/-/g, '/');
    var date = new Date(newstr);
    var time_str = date.getTime().toString();
    return parseInt(time_str);
}

function getTimeStamp() {
    var timestamp = new Date().getTime();
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

function showLoading() {
    if (layer) {
        layer.open({
            type: 2
        });
    }
}

function showRequesting() {
    if (layer) {
        layer.open({
            type: 2,
            content: "正在提交数据..."
        });
    }
}

function showAlert(content) {
    if (layer) {
        layer.open({
            content: content,
            btn: '我知道了'
        });
    }
}


function hideLoading() {
    if (layer) {
        layer.closeAll();
    }
}

function NoWxShare() {
    try {
        if (is_weixn()) {
            function onBridgeReady() {
                WeixinJSBridge.call('hideOptionMenu');
            }

            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady();
            }
        }

        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            // 在这里拿到e.err_msg，这里面就包含了所有的网络类型
            console.log(e.err_msg);
            //e.err_msg的取值如下所示: network_type:wifi wifi网络 2 network_type:edge 非wifi,包含3G/2G 3 network_type:fail 网络断开连接 4 network_type:wwan 2g或者3g
        });
    } catch (error) {
        console.log("Weixin error:" + error);
    }
}

function isValidMobile(mobile) {
    //手机号正则
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    //电话
    var phone = $.trim(mobile);
    if (!phoneReg.test(phone)) {
        return false;
    }
    return true;
}

$(function () {
    documentWidth = $(document.body).width();
});
