;
(function (_0x445103, _0x43706c, _0x18a37c, _0x1afc56) {
  var _0x4cce82 = _0x18a37c.location.protocol === "https:" ? 1 : 0;
  _0x43706c.SetCookieUT = function (_0x3ce51d, _0x45bfbb, _0x232a63) {
    if (_0x45bfbb === _0x1afc56) {
      return;
    }
    var _0x1325d2 = _0x3ce51d + "=" + escape(_0x45bfbb) + "; path=/; ";
    var _0x17cd2a = new Date();
    if (_0x232a63 === 1) {
      _0x17cd2a = new Date(2099, 1, 1);
    } else {
      _0x17cd2a.setTime(_0x17cd2a.getTime() + 86400000);
    }
    _0x1325d2 += " expires=" + _0x17cd2a.toUTCString() + ";  ";
    if (_0x4cce82 === 1) {
      _0x1325d2 += " SameSite=None; Secure";
    }
    _0x18a37c.cookie = _0x1325d2;
  };
  _0x43706c.GetCookieUT = function (_0x4d0140) {
    var _0x26ccff = _0x18a37c.cookie.split("; ");
    for (var _0xd6662c = 0; _0xd6662c < _0x26ccff.length; _0xd6662c++) {
      var _0x4d42d3 = _0x26ccff[_0xd6662c].split("=");
      if (_0x4d0140 === _0x4d42d3[0]) {
        return unescape(_0x4d42d3[1]);
      }
    }
    return null;
  };
  _0x43706c.aesEncryptKey = function (_0x59fe45, _0x36a96f) {
    var _0x353eb7 = CryptoJS.MD5(_0x59fe45).toString();
    var _0x3c5afe = CryptoJS.enc.Utf8.parse(_0x353eb7.substring(0, 16));
    var _0xa7fe4a = CryptoJS.enc.Utf8.parse(_0x353eb7.substring(16));
    var _0x3d5e5e = _0x3ebdd2(_0x36a96f, _0x3c5afe, _0xa7fe4a);
    return _0x3d5e5e;
  };
  _0x43706c.aesEncrypt = function (_0x1f96f3) {
    var _0x132fa1 = CryptoJS.MD5(_0x43706c._bsc_cv.fpv).toString();
    var _0x2afe7e = CryptoJS.enc.Utf8.parse(_0x132fa1.substring(0, 16));
    var _0x13d566 = CryptoJS.enc.Utf8.parse(_0x132fa1.substring(16));
    var _0x20b3ba = _0x3ebdd2(_0x1f96f3, _0x2afe7e, _0x13d566);
    return _0x20b3ba;
  };
  _0x43706c.aesDecrypt = function (_0x292199) {
    var _0x4eb90c = CryptoJS.MD5(_0x43706c._bsc_cv.fpv).toString();
    var _0x26cc74 = CryptoJS.enc.Utf8.parse(_0x4eb90c.substring(0, 16));
    var _0x2c377b = CryptoJS.enc.Utf8.parse(_0x4eb90c.substring(16));
    var _0x59a002 = _0x3e2ba8(_0x292199, _0x26cc74, _0x2c377b);
    return _0x59a002;
  };
  function _0x3ebdd2(_0xc98b5d, _0x5e2713, _0x1dcb32) {
    var _0x44ca5d = CryptoJS.AES.encrypt(_0xc98b5d, _0x5e2713, {
      iv: _0x1dcb32,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return _0x44ca5d.toString();
  }
  function _0x3e2ba8(_0x3425c0, _0x5c2b3c, _0x4c7b50) {
    var _0x583566 = CryptoJS.AES.decrypt(_0x3425c0, _0x5c2b3c, {
      iv: _0x4c7b50,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return _0x583566.toString(CryptoJS.enc.Utf8);
  }
  _0x43706c.JSONPGET = function (_0x4a5c15, _0x4de500, _0x590bd4) {
    _0x445103.ajax({
      url: _0x4a5c15,
      data: _0x4de500,
      type: "GET",
      dataType: "JSONP",
      jsonpCallback: "callback_" + new Date().getTime(),
      headers: {
        "X-Req-Token": _0x43706c._bsc_cv.signature()
      },
      success: function (_0x58d323) {
        var _0x332d2f = JSON.stringify(_0x58d323);
        var _0x1c11a6 = _0x445103.parseJSON(_0x332d2f);
        var _0x5f567c = _0x1c11a6.ret;
        if (_0x5f567c < 0) {
          return;
        }
        var _0x4569fa = "验证失败";
        var _0x48b89a = "确认";
        var _0x33450c = _0x43706c.navigator.language || _0x43706c.navigator.browserLanguage;
        if (!_0x43706c.isChinese(_0x33450c)) {
          _0x4569fa = "Verification Failed";
          _0x48b89a = "confirm";
        }
        if (_0x1c11a6.code === 521) {
          var _0x30140a = {
            title: _0x4569fa,
            closeBtn: 0,
            move: false,
            btn: _0x48b89a
          };
          layer.alert(_0x1c11a6.message, _0x30140a, function () {
            setTimeout("window.location.reload();", 400);
          });
          return;
        }
        var _0x8171af = _0x1c11a6.body;
        var _0x9be314 = _0x1c11a6.msg;
        if (_0x9be314 != _0x1afc56) {
          layer.msg(_0x9be314);
        }
        _0x8171af = _0x43706c.ungzip(_0x8171af);
        _0x590bd4(_0x8171af);
      }
    });
  };
  function _0x28ffa5(_0x4369ab) {
    var _0x3fb521 = {
      type: 1,
      title: false,
      shadeClose: false,
      closeBtn: 0,
      maxmin: false,
      resize: false,
      content: _0x4369ab,
      end: function () {}
    };
    layer.open(_0x3fb521);
  }
  _0x43706c.start_verify = function (_0x1c18ff) {
    var _0x278caf = _0x43706c.convertUrl;
    var _0x2e1f8e = {
      fpv: _0x43706c.gzip(_0x43706c._bsc_cv.fpv),
      level: _0x43706c.gzip(_0x1c18ff),
      type: _0x43706c.gzip("template"),
      wlocation: _0x43706c.gzip(JSON.stringify(_0x43706c._bsc_cv.wlocation)),
      captcha_protect: _0x43706c.captcha_protect(),
      originalImage: _0x43706c.gzip(_0x43706c.originalImage + "")
    };
    _0x43706c.JSONPGET(_0x278caf, _0x2e1f8e, _0x28ffa5);
  };
  _0x43706c.start_verify_auto = function () {
    if (_0x43706c.verify_level !== _0x1afc56) {
      if (_0x43706c.verify_level === 1) {
        _0x43706c.start_verify("one_points");
      } else if (_0x43706c.verify_level === 3) {
        _0x43706c.start_verify("click_v2");
      } else {
        _0x43706c.start_verify("slide_v2");
      }
      return;
    }
    var _0x2b49df = _0x43706c.GetCookieUT("upgrade_level");
    _0x43706c._bsc_cv.isUpgrade = _0x2b49df !== null;
    switch (_0x2b49df) {
      case "five_seconds":
        {
          _0x43706c.start_verify("five_seconds");
          break;
        }
      case "click_v2":
        {
          _0x43706c.start_verify("click_v2");
          break;
        }
      case "one_points":
        {
          _0x43706c.start_verify("one_points");
          break;
        }
      case "slide_v2":
        {
          _0x43706c.start_verify("slide_v2");
          break;
        }
      default:
        {
          _0x43706c.start_verify("default");
          break;
        }
    }
  };
  _0x43706c.ungzip = function (_0xbb4284) {
    var _0x2996fd = Base64_Uint8.toByteArray(_0xbb4284);
    var _0x47a3ec = pako.ungzip(_0x2996fd);
    var _0x3ba428 = Base64_Uint8.uint8ArrayToString(_0x47a3ec);
    return _0x3ba428;
  };
  _0x43706c.gzip = function (_0x1911db) {
    var _0x1048d6 = pako.gzip(_0x1911db);
    return Base64_Uint8.fromByteArray(_0x1048d6);
  };
  _0x43706c.rsaEncrypt = function (_0x3fdbf6) {
    var _0x451220 = new JSEncrypt();
    _0x451220.setPublicKey(_0x43706c._bsc_cv.pubk);
    var _0x17b775 = _0x451220.encrypt(_0x3fdbf6);
    return _0x17b775;
  };
  _0x43706c._bsc_cv.guid = function () {
    function _0x4a4ddd() {
      return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    return _0x4a4ddd() + _0x4a4ddd() + "-" + _0x4a4ddd() + "-" + _0x4a4ddd() + "-" + _0x4a4ddd() + "-" + _0x4a4ddd() + _0x4a4ddd() + _0x4a4ddd();
  };
  _0x43706c._bsc_cv.guid2 = function () {
    function _0x28c256() {
      return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    return _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256();
  };
  _0x43706c._bsc_cv.signature = function () {
    var _0x1b0b44 = _0x43706c._bsc_cv.guid2().substring(0, 16);
    var _0xfbc344 = CryptoJS.MD5(_0x1b0b44 + "shyundun").toString().substring(0, 16);
    return _0x1b0b44 + _0xfbc344;
  };
  _0x43706c._bsc_cv.pubk = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaaTUpL2aaZMcf3xluTrCga+WF\n2H9n/yKVAugdGJfTfvkCaGxX5HM16rgvHrsmiveAQYBEUkWN5mIJuM6bZS/tltzy\nKaykrfj/uM1ayyU51NGyH//t3PhZpDb6For00DadsNSyBlh5WFcxc9ufNODC88Fw\ngD7adZD/yxSk/mAvRwIDAQAB\n-----END PUBLIC KEY-----";
  _0x43706c._bsc_cv.fpv = _0x43706c._bsc_cv.guid2();
  function _0x56a25f(_0x1e98d9, _0x4d028d, _0x287c07, _0xdbc725, _0x2f1c80) {
    this.host = _0x1e98d9;
    this.href = _0x4d028d;
    this.userAgent = _0x287c07;
    this.platform = _0xdbc725;
    this.language = _0x2f1c80;
    this.time = new Date().getTime();
  }
  _0x43706c._bsc_cv.wlocation = new _0x56a25f(_0x43706c.location.host, _0x43706c.location.href, _0x43706c.navigator.userAgent, _0x43706c.navigator.platform, _0x43706c.navigator.language || _0x43706c.navigator.userLanguage || _0x43706c.navigator.browserLanguage || _0x43706c.navigator.systemLanguage);
  String.prototype.replaceAll = function (_0x42d960, _0x81a7c8) {
    return this.replace(new RegExp(_0x42d960, "gm"), _0x81a7c8);
  };
  _0x43706c._bsc_cv.isMobile = "ontouchstart" in _0x43706c;
  _0x43706c._bsc_cv.refreshTimes = 0;
})(jQuery, window, document);
;
(function () {
  function _0x143b36() {
    var _0x4e86a9 = window.navigator.webdriver === true;
    return _0x4e86a9;
  }
  function _0x4c4226() {
    var _0x27fee4 = window.navigator.cookieEnabled === true;
    return _0x27fee4;
  }
  function _0x4ab5cc() {
    var _0x143e18 = "phantom" in window;
    return _0x143e18;
  }
  function _0x1d8c91() {
    var _0x854039 = "callPhantom" in window;
    return _0x854039;
  }
  function _0x150a90() {
    var _0xe59df1 = "chrome" in window;
    return _0xe59df1;
  }
  function _0x18df99() {
    return window.outerWidth;
  }
  function _0x457a18() {
    return window.outerHeight;
  }
  function _0x248d15() {
    return window.innerWidth;
  }
  function _0x4bdbac() {
    return window.innerHeight;
  }
  window.captcha_protect = function () {
    _0x478615.end_time = new Date().getTime();
    _0x478615.guid = window._bsc_cv.guid();
    var _0x29e761 = CryptoJS.MD5(_0x478615.name + "_" + _0x478615.fpv).toString();
    var _0x36ae83 = window.rsaEncrypt(_0x29e761);
    var _0x6c0312 = window.aesEncryptKey(_0x29e761, JSON.stringify(_0x478615));
    return encodeURIComponent(window.gzip(_0x36ae83 + "captcha_protect" + _0x6c0312));
  };
  var _0x478615 = new Object();
  _0x478615.name = "captcha_protect";
  _0x478615.clickTimes = 0;
  _0x478615.moveTimes = 0;
  _0x478615.touchTimes = 0;
  _0x478615.start_time = new Date().getTime();
  _0x478615.clickArr = [];
  _0x478615.iswebdriver = _0x143b36();
  _0x478615.isphantom = _0x4ab5cc();
  _0x478615.iscallPhantom = _0x1d8c91();
  _0x478615.ischrome = _0x150a90();
  _0x478615.outerWidth = _0x18df99();
  _0x478615.outerHeight = _0x457a18();
  _0x478615.innerWidth = _0x248d15();
  _0x478615.innerHeight = _0x4bdbac();
  _0x478615.fpv = window._bsc_cv.fpv;
  _0x478615.isMobile = window._bsc_cv.isMobile;
  _0x478615.location_host = window.location.host;
  _0x478615.userAgent = window.navigator.userAgent;
  _0x478615.iscookieEnabled = _0x4c4226();
})();
;
(function (_0x5e9a5c, _0x4fb42a, _0x22122c, _0x26ba50) {
  var _0x3dca15 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACgCAYAAADq8hJGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAXWSURBVHhe7d3Za9RqGMDh8/d7IV64UBS1KHrj1puKG7YguNelbogbooIW9x2FHN4x855pGm3rqc6X9HngYzqTr0xv8msmyST/VAA1QQCSIABJEIAkCEASBCAJApAEAUiCACRBAJIgAEkQgCQIQBIEIAkCkAQBSIIAJEEAkiAASRCAJAhAEgQgCQKQBAFIggAkQQCSIABJEIAkCEASBCAJApAEAUiCACRBAJIgAEkQgCQIQBIEIAkCkAQBSIIAJEEAkiAASRCAJAhAEgQgCQKQBGGde//+ffX48ePBIwhCz7x48aI6d+5cNT09XT148KB+td3+/furDRs25IjnrG+C0CN37typtmzZsmglP3r0aL10sampqUXzhiNeZ/0ShJ54+PBh6woe48yZM/WsH+7evds6bzhiOeuTIPTE5cuXW1fuGEeOHKln/XD+/PnWecMRy9u8e/eu+vDhQ/2MPhKEnlhNEK5du9Y6bzhi+ajYwti7d28uP3jwYHXv3r16KX0iCB3y8uXLwWizmo8MseNx69atrXPj9Vg+ND8/3zovxu3bt+tZ9IUgdMTk5GSuiPFz2xGE1exUjP/wO3bsWDQ3no/+5//y5Us1MTGxaM7oiGXfvn2rZ9MHgtABbUcEIgpt4r/7jRs3qkuXLg22Gn7l06dP1ZUrVwaHG+Mxno9abudjjJ9tsdBNglC4hYWF1hUxRiz7kyIqbe87Op4+fVrPpg8EoXDjDMLz589b33d0OOrQL4LQAc0zCmPs3LmzXvpnnTx5csl7D0dzZyXdJwgdEN81aO5U/Jsr4+h7D8fhw4frpfSJIHTIrw47/mn379+v5ubmqqtXr1aPHj2qX62q169fD85LiCMOGzdurHbt2lUdO3asXkrXCAK/7e3bt0u2HEYH3SMI/LYDBw60hmA4Zmdn65l0hSAUJPYVxA7EPXv2DE4yKll8r6EtAqPjb+34ZO0IQiEiBs0VKq5rUKo4/6D59zZH7FOgWwShECdOnFiyQsUOulLFzs3m39sc27Ztq2fTFYJQiNgz31yhSt7kju8wbN++fcnfPDqa37KkfIJQiPhSUXOFKv3Enzj82PybR8fHjx/rmXSFIBTkyZMngwjMzMwMVravX7/WS8oVX4pqfpU6TmQa/Qo13SEI/G/fv3+vXr16VT179szVmztOEFhTsVUTR0xiSyceu7CVw38EgTVz/fr1wZGF0Y8PmzdvHnwEohsEgTURJ1KNhqA5Lly4UM+kZILAmhi9COvPRlxfgbIJQgHevHkz+Mwdj120krMWY5R85iU/CMKYxWXKhoft4jGed83FixeXrPxt49ChQ/VvUCpBGLPdu3cvWmniedes5GKsMU6dOlX/BqUShDHrQxDicu3NowttY7mbzzJ+gjBmffjIEJb72OAqSt0gCAXo+k7FoePHj7fGYN++ffUMSicIrKm4OczZs2cHF3qJx+VuFkNZBAFIggAkQQCSIABJEArT9SMNdJsgFGR6enpwmG7Tpk3FXz6NfhKEQjTvc+CeBoyDIBRCECiBIBTERwbGTRAK09WdinH9xNOnT9fP6CpBAJIgAEkQgCQIQBKEjrh169bgKMTc3Fz1+fPn+lVYW4LQAXGOQhyKHJ6jcPPmzXoJrC1B6IC4i/IwBjHipijjsLCwUP9EXwlCR8zPz1cTExPV7Oxs/crfFTFw9mT/CQIr5uzJ/hMEIAlCz8TNUOKOy3GRU1gtQeiZCMFw5+NKxLzJycn6GeudIPRMfM6fmpqqZmZm6ld+Le7abGuCIUEAkiAASRCAJAhAEgQgCQKQBAFIggAkQQCSIABJEIAkCEASBCAJApAEAUiCACRBAJIgAEkQgCQIQBIEIAkCkAQBSIIAJEEAkiAASRCAJAhAEgQgCQKQBAFIggAkQQCSIABJEIAkCEASBCAJApAEAUiCACRBAJIgAEkQgCQIQBIEIAkCkAQBSIIAJEEAkiAASRCAJAhAEgQgCQKQBAFIggDUqupfWLZuUwWxgWAAAAAASUVORK5CYII=";
  var _0x15062f = new Array();
  var _0x2ab50b = new Array();
  function _0x5174e6(_0x12b3af, _0x20e16a, _0x30352d) {
    this.x = _0x12b3af;
    this.y = _0x20e16a;
    this.t = _0x30352d;
    this.time = new Date().getTime();
  }
  function _0x466ac6(_0x52a573, _0x1592cc) {
    ;
    var _0x565428 = {
      mode: "fixed",
      vSpace: 5,
      explain: "加载中请稍候...",
      imgSize: {},
      blockSize: {},
      barSize: {},
      ready: function () {},
      success: function () {},
      retry: function () {},
      error: function () {}
    };
    _0x565428.imgSize.width = "260px";
    _0x565428.imgSize.height = "160px";
    _0x565428.blockSize.width = "54px";
    _0x565428.blockSize.height = "54px";
    _0x565428.barSize.width = "260px";
    _0x565428.barSize.width2 = "50px";
    _0x565428.barSize.height = "40px";
    this.$element = _0x52a573;
    this.defaults = _0x565428;
    this.options = _0x5e9a5c.extend({}, this.defaults, _0x1592cc);
  }
  _0x466ac6.prototype = {
    init: function () {
      var _0x5d0df6 = this;
      this.loadDom();
      this.options.ready();
      this.$element[0].onselectstart = _0x22122c.body.ondrag = function () {
        return false;
      };
      if (this.options.mode === "pop") {
        this.$element.on("mouseover", function (_0x2f6faf) {
          _0x5d0df6.showImg();
        });
        this.$element.on("mouseout", function (_0x2b7ea9) {
          _0x5d0df6.hideImg();
        });
        this.htmlDoms.out_panel.on("mouseover", function (_0x325055) {
          _0x5d0df6.showImg();
        });
        this.htmlDoms.out_panel.on("mouseout", function (_0x585dfb) {
          _0x5d0df6.hideImg();
        });
      }
      _0x5d0df6.$element.find(".verify-move-block").on("touchstart", function (_0xf9e709) {
        _0x5d0df6.start(_0xf9e709);
      });
      _0x5d0df6.$element.find(".verify-move-block").on("mousedown", function (_0x104f5a) {
        _0x5d0df6.start(_0x104f5a);
      });
      _0x4fb42a.addEventListener("touchmove", function (_0xfecc7a) {
        _0x5d0df6.move(_0xfecc7a);
      });
      _0x4fb42a.addEventListener("mousemove", function (_0x1cfe3b) {
        _0x5d0df6.move(_0x1cfe3b);
      });
      _0x4fb42a.addEventListener("touchend", function (_0x59db90) {
        _0x5d0df6.end(_0x59db90);
      });
      _0x4fb42a.addEventListener("mouseup", function (_0x5acc72) {
        _0x5d0df6.end(_0x5acc72);
      });
      _0x5d0df6.$element.find(".verify-refresh").on("click", function () {
        _0x5d0df6.refresh();
      });
    },
    loadDom: function () {
      var _0x1019cd = this;
      var _0x25e41e = "";
      var _0x5c77ea = "";
      _0x25e41e += "<div class=\"verify-img-out\"><div class=\"verify-img-panel\"><div  class=\"verify-refresh\"><i class=\"iconfont icon-refresh\"></i></div></div></div>";
      _0x5c77ea = "<div class=\"verify-sub-block\"></div>";
      _0x25e41e += "" + _0x1019cd.options.explain + "</span><div class=\"verify-left-bar\"><span class=\"verify-msg\"></span><div  class=\"verify-move-block\"><i  class=\"verify-icon iconfont icon-right\"></i>" + _0x5c77ea + "</div></div></div>";
      this.$element.append(_0x25e41e);
      this.$element.find(".verify-img-out").css("height", parseInt(_0x1019cd.options.imgSize.height) + _0x1019cd.options.vSpace + "px");
      this.$element.find(".verify-img-panel").css({
        width: _0x1019cd.options.imgSize.width,
        height: _0x1019cd.options.imgSize.height,
        background: "url(" + _0x3dca15 + ")",
        "background-size": _0x1019cd.options.imgSize.width + " " + _0x1019cd.options.imgSize.height
      });
      var _0x904499 = {
        width: _0x1019cd.options.barSize.width,
        height: _0x1019cd.options.barSize.height,
        "line-height": _0x1019cd.options.barSize.height
      };
      this.$element.find(".verify-bar-area").css(_0x904499);
      var _0x4267a1 = {
        width: _0x1019cd.options.barSize.width2,
        height: _0x1019cd.options.barSize.height
      };
      this.$element.find(".verify-move-block").css(_0x4267a1);
      var _0x60050b = {
        width: _0x1019cd.options.barSize.width2,
        height: _0x1019cd.options.barSize.height
      };
      this.$element.find(".verify-left-bar").css(_0x60050b);
      this.htmlDoms = {
        sub_block: this.$element.find(".verify-sub-block"),
        out_panel: this.$element.find(".verify-img-out"),
        img_panel: this.$element.find(".verify-img-panel"),
        bar_area: this.$element.find(".verify-bar-area"),
        move_block: this.$element.find(".verify-move-block"),
        left_bar: this.$element.find(".verify-left-bar"),
        msg: this.$element.find(".verify-msg"),
        icon: this.$element.find(".verify-icon"),
        refresh: this.$element.find(".verify-refresh")
      };
      var _0x17914f = _0x4fb42a.convertUrl;
      var _0x3dc8b0 = {
        captcha_protect: _0x4fb42a.captcha_protect(),
        fpv: _0x4fb42a.gzip(_0x4fb42a._bsc_cv.fpv),
        type: _0x4fb42a.gzip("slide_pic"),
        isUpgrade: _0x4fb42a._bsc_cv.isUpgrade,
        wlocation: _0x4fb42a.gzip(JSON.stringify(_0x4fb42a._bsc_cv.wlocation))
      };
      _0x5e9a5c.ajax({
        url: _0x17914f,
        data: _0x3dc8b0,
        type: "GET",
        dataType: "JSONP",
        jsonpCallback: "callback_" + new Date().getTime(),
        headers: {
          "X-Req-Token": _0x4fb42a._bsc_cv.signature()
        },
        success: function (_0x6274e2) {
          var _0x4addc4 = JSON.stringify(_0x6274e2);
          var _0x3e25a7 = _0x5e9a5c.parseJSON(_0x4addc4);
          var _0x4ec5e9 = _0x3e25a7.ret;
          if (_0x4ec5e9 < 0) {
            setTimeout("window.location.reload();", 800);
            return;
          }
          var _0xa99154 = "验证失败";
          var _0x54d186 = "确认";
          var _0x3c5a48 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
          if (!_0x4fb42a.isChinese(_0x3c5a48)) {
            _0xa99154 = "Verification Failed";
            _0x54d186 = "confirm";
          }
          if (_0x3e25a7.code === 521) {
            var _0x418454 = {
              title: _0xa99154,
              closeBtn: 0,
              move: false,
              btn: _0x54d186
            };
            layer.alert(_0x3e25a7.message, _0x418454, function () {
              setTimeout("window.location.reload();", 400);
            });
            return;
          }
          var _0x45b5a5 = _0x3e25a7.body;
          _0x45b5a5 = _0x4fb42a.ungzip(_0x45b5a5);
          var _0x24412a = _0x5e9a5c.parseJSON(_0x45b5a5);
          _0x4fb42a.slide_pic = _0x24412a;
          _0x4fb42a.randomKey = _0x4fb42a.slide_pic.randomKey;
          _0x1019cd.status = false;
          _0x1019cd.isEnd = false;
          _0x1019cd.setSize = _0x1019cd.resetSize(_0x1019cd);
          _0x1019cd.$element.css("position", "relative");
          if (_0x1019cd.options.mode === "pop") {
            _0x1019cd.htmlDoms.out_panel.css({
              display: "none",
              position: "absolute",
              bottom: "42px"
            });
            _0x1019cd.htmlDoms.sub_block.css({
              display: "none"
            });
          } else {
            _0x1019cd.htmlDoms.out_panel.css({
              position: "relative"
            });
          }
          _0x1019cd.htmlDoms.sub_block.css({
            width: _0x1019cd.options.blockSize.width,
            height: _0x1019cd.options.blockSize.height
          });
          _0x1019cd.htmlDoms.out_panel.css("height", parseInt(_0x1019cd.setSize.img_height) + _0x1019cd.options.vSpace + "px");
          _0x1019cd.htmlDoms.img_panel.css({
            width: _0x1019cd.setSize.img_width,
            height: _0x1019cd.setSize.img_height,
            background: "url(" + _0x4fb42a.slide_pic.background + ")",
            "background-size": _0x1019cd.setSize.img_width + " " + _0x1019cd.setSize.img_height
          });
          _0x1019cd.htmlDoms.bar_area.css({
            width: _0x1019cd.setSize.bar_width,
            height: _0x1019cd.options.barSize.height,
            "line-height": _0x1019cd.options.barSize.height
          });
          _0x1019cd.htmlDoms.move_block.css({
            width: _0x1019cd.options.barSize.width2,
            height: _0x1019cd.options.barSize.height
          });
          _0x1019cd.htmlDoms.left_bar.css({
            width: _0x1019cd.options.barSize.width2,
            height: _0x1019cd.options.barSize.height
          });
          var _0x3c5a48 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
          if (!_0x4fb42a.isChinese(_0x3c5a48)) {
            _0x1019cd.options.explain = "Please complete puzzle";
          } else {
            _0x1019cd.options.explain = "请拖动滑块完成拼图";
          }
          _0x1019cd.$element.find(".verify-msg:eq(0)").text(_0x1019cd.options.explain);
          _0x1019cd.randSet();
        }
      });
    },
    start: function (_0x26f5c2) {
      if (this.isEnd === false) {
        this.htmlDoms.move_block.css("background-color", "#1f90ff");
        this.htmlDoms.left_bar.css("border-color", "#7ac23b");
        this.htmlDoms.bar_area.css("border-color", "#1f90ff");
        this.htmlDoms.icon.css("color", "#fff");
        _0x26f5c2.stopPropagation();
        this.status = true;
        if (_0x4fb42a._bsc_cv.isMobile) {
          _0x26f5c2 = _0x26f5c2.originalEvent;
        }
        _0x15062f = [];
        _0x2ab50b = [];
        if (!_0x26f5c2.touches) {
          var _0x2017f3 = _0x26f5c2.clientX;
          var _0x3f0834 = _0x26f5c2.clientY;
        } else {
          var _0x2017f3 = _0x26f5c2.touches[0].pageX;
          var _0x3f0834 = _0x26f5c2.touches[0].pageY;
          _0x2017f3 = _0x2017f3.toFixed(0);
          _0x3f0834 = _0x3f0834.toFixed(0);
        }
        _0x15062f[_0x15062f.length] = new _0x5174e6(_0x2017f3, _0x3f0834, 1);
        _0x2ab50b[_0x2ab50b.length] = _0x15062f[_0x15062f.length - 1];
      }
    },
    move: function (_0x23312e) {
      if (this.status && this.isEnd === false) {
        if (this.options.mode === "pop") {
          this.showImg();
        }
        _0x23312e.stopPropagation();
        _0x23312e.preventDefault();
        if (!_0x23312e.touches) {
          var _0xa18389 = _0x23312e.clientX;
          var _0x1e8feb = _0x23312e.clientY;
        } else {
          var _0xa18389 = _0x23312e.touches[0].pageX;
          var _0x1e8feb = _0x23312e.touches[0].pageY;
          _0xa18389 = _0xa18389.toFixed(0);
          _0x1e8feb = _0x1e8feb.toFixed(0);
        }
        var _0x1b691f = _0x466ac6.prototype.getLeft(this.htmlDoms.bar_area[0]);
        var _0x451b96 = _0xa18389 - _0x1b691f;
        _0x15062f[_0x15062f.length] = new _0x5174e6(_0xa18389, _0x1e8feb, 2);
        var _0x42023a = _0x15062f[_0x15062f.length - 1].time - _0x15062f[_0x15062f.length - 2].time;
        var _0x1d5711 = new _0x5174e6(_0xa18389, _0x1e8feb, 2);
        _0x1d5711.time = _0x42023a;
        _0x2ab50b[_0x2ab50b.length] = _0x1d5711;
        if (_0x451b96 >= this.htmlDoms.bar_area[0].offsetWidth - parseInt(parseInt(this.options.blockSize.width) / 2) + 4) {
          _0x451b96 = this.htmlDoms.bar_area[0].offsetWidth - parseInt(parseInt(this.options.blockSize.width) / 2) + 4;
        }
        if (_0x451b96 <= 25) {
          _0x451b96 = parseInt(parseInt(this.options.blockSize.width) / 2);
        }
        if (_0x451b96 - parseInt(parseInt(this.options.blockSize.width) / 2) < 0) {
          this.htmlDoms.move_block.css("left", "0px");
        } else {
          this.htmlDoms.move_block.css("left", _0x451b96 - parseInt(parseInt(this.options.blockSize.width) / 2) + "px");
        }
        this.htmlDoms.left_bar.css("width", _0x451b96 - parseInt(parseInt(this.options.blockSize.width) / 2) + "px");
      }
    },
    end: function (_0x56fe96) {
      var _0x9c91ac = this;
      if (this.status && this.isEnd === false) {
        if (!_0x56fe96.touches) {
          var _0x411f69 = _0x56fe96.clientX;
          var _0x49f06d = _0x56fe96.clientY;
        } else {
          var _0x411f69 = _0x56fe96.changedTouches[0].pageX;
          var _0x49f06d = _0x56fe96.changedTouches[0].pageY;
          _0x411f69 = _0x411f69.toFixed(0);
          _0x49f06d = _0x49f06d.toFixed(0);
        }
        this.status = false;
        _0x15062f[_0x15062f.length] = new _0x5174e6(_0x411f69, _0x49f06d, 3);
        _0x2ab50b[_0x2ab50b.length] = _0x15062f[_0x15062f.length - 1];
        var _0x4b3cc5 = "init";
        var _0xeb2bbe = {
          moveblockleft: parseInt(this.htmlDoms.move_block.css("left")),
          randomKey: _0x4fb42a.slide_pic.randomKey
        };
        if (_0xeb2bbe === _0x26ba50) {
          return;
        }
        var _0x69117a = {
          tracks: _0x2ab50b,
          params: _0xeb2bbe
        };
        var _0x25d7c9 = _0x69117a;
        var _0x202255 = {
          captcha_protect: _0x4fb42a.captcha_protect(),
          body: _0x4fb42a.aesEncrypt(_0x4fb42a.gzip(JSON.stringify(_0x25d7c9))),
          fpv: _0x4fb42a.rsaEncrypt(_0x4fb42a._bsc_cv.fpv),
          isUpgrade: _0x4fb42a._bsc_cv.isUpgrade,
          refreshTimes: _0x4fb42a._bsc_cv.refreshTimes,
          type: "slide",
          wlocation: _0x4fb42a.gzip(JSON.stringify(_0x4fb42a._bsc_cv.wlocation))
        };
        _0x5e9a5c.ajax({
          url: _0x4fb42a.verifyUrl,
          data: _0x202255,
          type: "POST",
          dataType: "JSONP",
          jsonpCallback: "callback_" + new Date().getTime(),
          headers: {
            "X-Req-Token": _0x4fb42a._bsc_cv.signature()
          },
          success: function (_0x21a516) {
            var _0x129105 = JSON.stringify(_0x21a516);
            var _0xc811b3 = _0x5e9a5c.parseJSON(_0x129105);
            var _0x1c8cf3 = _0xc811b3.ret;
            if (_0x1c8cf3 < 0) {
              _0x9c91ac.refresh();
              _0x4fb42a._bsc_cv.refreshTimes++;
              return;
            }
            var _0x51dad3 = "验证失败";
            var _0x27be1c = "确认";
            var _0x3447be = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
            if (!_0x4fb42a.isChinese(_0x3447be)) {
              _0x51dad3 = "Verification Failed";
              _0x27be1c = "confirm";
            }
            if (_0xc811b3.code === 521) {
              var _0x5f0527 = {
                title: _0x51dad3,
                closeBtn: 0,
                move: false,
                btn: _0x27be1c
              };
              layer.alert(_0xc811b3.message, _0x5f0527, function () {
                setTimeout("window.location.reload();", 400);
              });
              return;
            }
            _0x4b3cc5 = _0xc811b3.result;
            if (_0xc811b3.upgrade !== _0x26ba50) {
              _0x4fb42a.SetCookieUT("upgrade_level", _0xc811b3.upgrade);
              _0x9c91ac.check("error");
              setTimeout("window.location.reload();", 400);
              return;
            }
            var _0x16ac11 = _0xc811b3.yd_captcha_token;
            _0x4fb42a.SetCookieUT("yd_captcha_token", _0x16ac11, 0);
            _0x9c91ac.check(_0x4b3cc5);
          }
        });
      }
    },
    showImg: function () {
      this.htmlDoms.out_panel.css({
        display: "block"
      });
      this.htmlDoms.sub_block.css({
        display: "block"
      });
    },
    hideImg: function () {
      this.htmlDoms.out_panel.css({
        display: "none"
      });
      this.htmlDoms.sub_block.css({
        display: "none"
      });
    },
    resetSize: function (_0x575f24) {
      var _0x29111e;
      var _0x525f8a;
      var _0x3da116;
      var _0xa5bc7f;
      var _0x4a4a2f = _0x575f24.$element.parent().width() || _0x5e9a5c(_0x4fb42a).width();
      var _0x429b3c = _0x575f24.$element.parent().height() || _0x5e9a5c(_0x4fb42a).height();
      if (_0x575f24.options.imgSize.width.indexOf("%") !== -1) {
        _0x29111e = parseInt(_0x575f24.options.imgSize.width) / 100 * _0x4a4a2f + "px";
      } else {
        _0x29111e = _0x575f24.options.imgSize.width;
      }
      if (_0x575f24.options.imgSize.height.indexOf("%") !== -1) {
        _0x525f8a = parseInt(_0x575f24.options.imgSize.height) / 100 * _0x429b3c + "px";
      } else {
        _0x525f8a = _0x575f24.options.imgSize.height;
      }
      if (_0x575f24.options.barSize.width.indexOf("%") !== -1) {
        _0x3da116 = parseInt(_0x575f24.options.barSize.width) / 100 * _0x4a4a2f + "px";
      } else {
        _0x3da116 = _0x575f24.options.barSize.width;
      }
      if (_0x575f24.options.barSize.height.indexOf("%") !== -1) {
        _0xa5bc7f = parseInt(_0x575f24.options.barSize.height) / 100 * _0x429b3c + "px";
      } else {
        _0xa5bc7f = _0x575f24.options.barSize.height;
      }
      var _0x3817fb = {
        img_width: _0x29111e,
        img_height: _0x525f8a,
        bar_width: _0x3da116,
        bar_height: _0xa5bc7f
      };
      return _0x3817fb;
    },
    randSet: function () {
      var _0x40e183 = this;
      var _0xc541ae = _0x4fb42a.slide_pic.py;
      var _0xeb993 = _0x4fb42a.slide_pic.px;
      _0x40e183.$element.find(".verify-sub-block").css({
        top: "-" + (parseInt(_0x40e183.setSize.img_height) - _0xc541ae + _0x40e183.options.vSpace) + "px",
        "background-size": _0x40e183.options.blockSize.width + " " + _0x40e183.options.blockSize.height,
        "background-image": "url(" + _0x4fb42a.slide_pic.targetImage + ")"
      });
      _0x40e183.htmlDoms.img_panel.css({
        width: _0x40e183.setSize.img_width,
        height: _0x40e183.setSize.img_height,
        background: "url(" + _0x4fb42a.slide_pic.background + ")",
        "background-size": _0x40e183.setSize.img_width + " " + _0x40e183.setSize.img_height
      });
    },
    refresh: function () {
      this.htmlDoms.refresh.show();
      this.$element.find(".verify-msg:eq(1)").text("");
      this.$element.find(".verify-msg:eq(1)").css("color", "#000");
      this.htmlDoms.move_block.animate({
        left: "0px"
      }, "fast");
      this.htmlDoms.left_bar.animate({
        width: "50px"
      }, "fast");
      this.htmlDoms.left_bar.css({
        "border-color": "#ddd"
      });
      this.htmlDoms.bar_area.css({
        "border-color": "#ddd"
      });
      this.htmlDoms.move_block.css("background-color", "#fff");
      this.htmlDoms.icon.css("color", "#1f90ff");
      this.htmlDoms.icon.removeClass("icon-close");
      this.htmlDoms.icon.addClass("icon-right");
      this.$element.find(".verify-msg:eq(0)").text(this.options.explain);
      this.randSet();
      var _0xfc6fe4 = this;
      var _0x7f5fc5 = _0x4fb42a.convertUrl;
      var _0x1bf88a = {
        captcha_protect: _0x4fb42a.captcha_protect(),
        fpv: _0x4fb42a.gzip(_0x4fb42a._bsc_cv.fpv),
        isUpgrade: _0x4fb42a._bsc_cv.isUpgrade,
        type: _0x4fb42a.gzip("slide_pic"),
        wlocation: _0x4fb42a.gzip(JSON.stringify(_0x4fb42a._bsc_cv.wlocation))
      };
      _0x5e9a5c.ajax({
        url: _0x7f5fc5,
        data: _0x1bf88a,
        type: "GET",
        dataType: "JSONP",
        jsonpCallback: "callback_" + new Date().getTime(),
        headers: {
          "X-Req-Token": _0x4fb42a._bsc_cv.signature()
        },
        success: function (_0x44d78f) {
          var _0x2237f4 = JSON.stringify(_0x44d78f);
          var _0xc51f20 = _0x5e9a5c.parseJSON(_0x2237f4);
          var _0x298e2a = _0xc51f20.ret;
          if (_0x298e2a < 0) {
            setTimeout("window.location.reload();", 800);
            return;
          }
          var _0x23fc90 = "验证失败";
          var _0x479e07 = "确认";
          var _0x3454ef = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
          if (!_0x4fb42a.isChinese(_0x3454ef)) {
            _0x23fc90 = "Verification Failed";
            _0x479e07 = "confirm";
          }
          if (_0xc51f20.code === 521) {
            var _0x11e1e7 = {
              title: _0x23fc90,
              closeBtn: 0,
              move: false,
              btn: _0x479e07
            };
            layer.alert(_0xc51f20.message, _0x11e1e7, function () {
              setTimeout("window.location.reload();", 400);
            });
            return;
          }
          var _0x3c446b = _0xc51f20.body;
          _0x3c446b = _0x4fb42a.ungzip(_0x3c446b);
          var _0x29e81e = _0x5e9a5c.parseJSON(_0x3c446b);
          _0x4fb42a.slide_pic = _0x29e81e;
          _0x4fb42a.randomKey = _0x4fb42a.slide_pic.randomKey;
          _0xfc6fe4.htmlDoms = {
            sub_block: _0xfc6fe4.$element.find(".verify-sub-block"),
            out_panel: _0xfc6fe4.$element.find(".verify-img-out"),
            img_panel: _0xfc6fe4.$element.find(".verify-img-panel"),
            bar_area: _0xfc6fe4.$element.find(".verify-bar-area"),
            move_block: _0xfc6fe4.$element.find(".verify-move-block"),
            left_bar: _0xfc6fe4.$element.find(".verify-left-bar"),
            msg: _0xfc6fe4.$element.find(".verify-msg"),
            icon: _0xfc6fe4.$element.find(".verify-icon"),
            refresh: _0xfc6fe4.$element.find(".verify-refresh")
          };
          _0xfc6fe4.status = false;
          _0xfc6fe4.isEnd = false;
          _0xfc6fe4.setSize = _0xfc6fe4.resetSize(_0xfc6fe4);
          _0xfc6fe4.$element.css("position", "relative");
          if (_0xfc6fe4.options.mode === "pop") {
            _0xfc6fe4.htmlDoms.out_panel.css({
              display: "none",
              position: "absolute",
              bottom: "42px"
            });
            _0xfc6fe4.htmlDoms.sub_block.css({
              display: "none"
            });
          } else {
            _0xfc6fe4.htmlDoms.out_panel.css({
              position: "relative"
            });
          }
          _0xfc6fe4.htmlDoms.sub_block.css({
            width: _0xfc6fe4.options.blockSize.width,
            height: _0xfc6fe4.options.blockSize.height
          });
          _0xfc6fe4.htmlDoms.out_panel.css("height", parseInt(_0xfc6fe4.setSize.img_height) + _0xfc6fe4.options.vSpace + "px");
          _0xfc6fe4.htmlDoms.img_panel.css({
            width: _0xfc6fe4.setSize.img_width,
            height: _0xfc6fe4.setSize.img_height,
            background: "url(" + _0x4fb42a.slide_pic.background + ")",
            "background-size": _0xfc6fe4.setSize.img_width + " " + _0xfc6fe4.setSize.img_height
          });
          _0xfc6fe4.htmlDoms.bar_area.css({
            width: _0xfc6fe4.setSize.bar_width,
            height: _0xfc6fe4.options.barSize.height,
            "line-height": _0xfc6fe4.options.barSize.height
          });
          _0xfc6fe4.htmlDoms.move_block.css({
            width: _0xfc6fe4.options.barSize.width2,
            height: _0xfc6fe4.options.barSize.height
          });
          _0xfc6fe4.htmlDoms.left_bar.css({
            width: _0xfc6fe4.options.barSize.width2,
            height: _0xfc6fe4.options.barSize.height
          });
          _0xfc6fe4.randSet();
        }
      });
      this.isEnd = false;
    },
    getLeft: function (_0x16ca75) {
      return _0x5e9a5c(_0x16ca75).offset().left;
    },
    check: function (_0x53dd55) {
      var _0xf93f88 = this;
      if (_0x53dd55 === "retry") {
        setTimeout(function () {
          var _0x1e32ef = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
          if (_0x4fb42a.isChinese(_0x1e32ef)) {
            _0xf93f88.options.explain = "需要再次完成拼图";
          } else {
            _0xf93f88.options.explain = "Retry";
          }
          _0xf93f88.refresh();
        }, 400);
        this.options.retry();
        _0x4fb42a._bsc_cv.refreshTimes++;
      } else if (_0x53dd55 === "exception") {
        setTimeout(function () {
          _0xf93f88.options.explain = "系统繁忙，请重试";
          _0xf93f88.refresh();
        }, 400);
        _0x4fb42a._bsc_cv.refreshTimes++;
      } else if (_0x53dd55 === "success") {
        var _0x2d7ad1 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
        if (!_0x4fb42a.isChinese(_0x2d7ad1)) {
          this.$element.find(".verify-msg:eq(0)").text("Verification Successful");
        } else {
          this.$element.find(".verify-msg:eq(0)").text("验证成功");
        }
        this.htmlDoms.move_block.css("background-color", "#1f90ff");
        this.htmlDoms.left_bar.css({
          "border-color": "#1f90ff",
          "background-color": "rgba(31, 144, 255, .05)"
        });
        this.$element.find(".verify-left-bar").append("<div class=\"block--status\"></div>");
        setTimeout(function () {
          _0xf93f88.$element.find(".verify-bar-area").addClass("is-success");
        }, 200);
        this.htmlDoms.icon.css("color", "#fff");
        this.htmlDoms.icon.removeClass("icon-right");
        this.htmlDoms.icon.addClass("icon-check");
        this.htmlDoms.refresh.hide();
        this.isEnd = true;
        this.options.success(this);
      } else {
        var _0x2d7ad1 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
        if (!_0x4fb42a.isChinese(_0x2d7ad1)) {
          this.$element.find(".verify-msg:eq(0)").text("Verification Failed");
        } else {
          this.$element.find(".verify-msg:eq(0)").text("验证失败");
        }
        this.htmlDoms.move_block.css("background-color", "#ff3707");
        this.htmlDoms.left_bar.css("border-color", "#ff3707");
        this.htmlDoms.icon.css("color", "#fff");
        this.htmlDoms.icon.removeClass("icon-right");
        this.htmlDoms.icon.addClass("icon-close");
        this.htmlDoms.bar_area.css("border-color", "#ff3707");
        setTimeout(function () {
          _0xf93f88.refresh();
        }, 400);
        this.options.error(this);
        _0x4fb42a._bsc_cv.refreshTimes++;
      }
      this.status = false;
    }
  };
  function _0x5d71b0(_0x495c2c, _0x2d74ef) {
    ;
    this.$element = _0x495c2c;
    this.defaults = {
      mode: "fixed",
      checkNum: 4,
      vSpace: 5,
      explain: "加载中请稍候...",
      imgSize: {
        width: "260px",
        height: "160px"
      },
      barSize: {
        width: "260px",
        height: "40px"
      },
      ready: function () {},
      success: function () {},
      retry: function () {
        var _0x3aa264 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
        if (!_0x4fb42a.isChinese(_0x3aa264)) {
          layer.msg("Retry", {
            shade: 0.3,
            time: 600
          });
        } else {
          layer.msg("需要重新验证", {
            shade: 0.3,
            time: 600
          });
        }
      },
      error: function () {
        var _0x43612c = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
        if (!_0x4fb42a.isChinese(_0x43612c)) {
          layer.msg("Retry", {
            shade: 0.3,
            time: 600
          });
        } else {
          layer.msg("需要重新验证", {
            shade: 0.3,
            time: 600
          });
        }
      }
    };
    this.options = _0x5e9a5c.extend({}, this.defaults, _0x2d74ef);
  }
  _0x5d71b0.prototype = {
    init: function () {
      var _0x2f2948 = this;
      _0x2f2948.loadDom();
      _0x2f2948.options.ready();
      this.$element[0].onselectstart = _0x22122c.body.ondrag = function () {
        return false;
      };
      if (this.options.mode === "pop") {
        this.$element.on("mouseover", function (_0x3c02aa) {
          _0x2f2948.showImg();
        });
        this.$element.on("mouseout", function (_0x9ddce) {
          _0x2f2948.hideImg();
        });
        this.htmlDoms.out_panel.on("mouseover", function (_0x41b97d) {
          _0x2f2948.showImg();
        });
        this.htmlDoms.out_panel.on("mouseout", function (_0x106b01) {
          _0x2f2948.hideImg();
        });
      }
      _0x2f2948.$element.find(".verify-img-panel canvas").on("click", function (_0x3af007) {
        _0x2f2948.checkPosArr.push(_0x2f2948.getMousePos(this, _0x3af007));
        if (_0x2f2948.num === _0x2f2948.options.checkNum) {
          _0x2f2948.num = _0x2f2948.createPoint(_0x2f2948.getMousePos(this, _0x3af007));
          setTimeout(function () {
            _0x2f2948.comparePosAjax(_0x2f2948.checkPosArr);
          }, 400);
          this.status = false;
        }
        if (_0x2f2948.num < _0x2f2948.options.checkNum) {
          _0x2f2948.num = _0x2f2948.createPoint(_0x2f2948.getMousePos(this, _0x3af007));
        }
      });
      _0x2f2948.$element.find(".verify-refresh").on("click", function () {
        _0x2f2948.refresh();
      });
      _0x4fb42a.addEventListener("touchstart", function (_0x32fe71) {
        _0x2f2948.start(_0x32fe71);
      });
      _0x4fb42a.addEventListener("mousedown", function (_0x3c8703) {
        _0x2f2948.start(_0x3c8703);
      });
      _0x4fb42a.addEventListener("touchmove", function (_0x5411a8) {
        _0x2f2948.move(_0x5411a8);
      });
      _0x4fb42a.addEventListener("mousemove", function (_0x3218c0) {
        _0x2f2948.move(_0x3218c0);
      });
    },
    loadDom: function () {
      var _0x34703d = this;
      this.checkPosArr = [];
      this.num = 1;
      var _0x5d0920 = "";
      this.setSize = _0x466ac6.prototype.resetSize(this);
      _0x5d0920 += "<div class=\"verify-img-out\"><div class=\"verify-img-panel content-container\"><div class=\"text-container\"><div class=\"verify-img-panel\"><div class=\"verify-refresh\" style=\"z-index:3\"><i class=\"iconfont icon-refresh\"></i><canvas width=\"" + this.setSize.img_width + "\" height=\"" + this.setSize.img_height + "\"></canvas><div class=\"verify-bar-area\"><span class=\"verify-msg\"><div class=\"target-image\"></div> </div>";
      this.$element.append(_0x5d0920);
      this.htmlDoms = {
        out_panel: this.$element.find(".verify-img-out"),
        img_panel: this.$element.find(".verify-img-panel"),
        bar_area: this.$element.find(".verify-bar-area"),
        msg: this.$element.find(".verify-msg"),
        target_image: this.$element.find(".target-image")
      };
      this.$element.css("position", "relative");
      if (this.options.mode === "pop") {
        this.htmlDoms.out_panel.css({
          display: "none",
          position: "absolute",
          bottom: "42px"
        });
      } else {
        this.htmlDoms.out_panel.css({
          position: "relative"
        });
      }
      this.htmlDoms.out_panel.css("height", parseInt(this.setSize.img_height) + this.options.vSpace + "px");
      this.htmlDoms.img_panel.css({
        width: this.setSize.img_width,
        height: this.setSize.img_height,
        "background-size": this.setSize.img_width + " " + this.setSize.img_height,
        "margin-bottom": this.options.vSpace + "px",
        cursor: "pointer"
      });
      this.htmlDoms.bar_area.css({
        width: this.options.barSize.width,
        height: this.options.barSize.height,
        "line-height": this.options.barSize.height
      });
      var _0x3ebcb4 = new Image();
      _0x3ebcb4.src = _0x3dca15;
      _0x5e9a5c(_0x3ebcb4).on("load", function (_0x237419) {
        this.fontPos = _0x34703d.drawImg(_0x34703d, this);
      });
      var _0x3e52f0 = _0x4fb42a.convertUrl;
      var _0x331a25 = {
        captcha_protect: _0x4fb42a.captcha_protect(),
        fpv: _0x4fb42a.gzip(_0x4fb42a._bsc_cv.fpv),
        isUpgrade: _0x4fb42a._bsc_cv.isUpgrade,
        type: _0x4fb42a.gzip("point_pic"),
        wlocation: _0x4fb42a.gzip(JSON.stringify(_0x4fb42a._bsc_cv.wlocation))
      };
      _0x5e9a5c.ajax({
        url: _0x3e52f0,
        data: _0x331a25,
        type: "GET",
        dataType: "JSONP",
        jsonpCallback: "callback_" + new Date().getTime(),
        headers: {
          "X-Req-Token": _0x4fb42a._bsc_cv.signature()
        },
        success: function (_0x556249) {
          var _0x40ca20 = JSON.stringify(_0x556249);
          var _0x5b82f0 = _0x5e9a5c.parseJSON(_0x40ca20);
          var _0x18714a = _0x5b82f0.ret;
          if (_0x18714a < 0) {
            setTimeout("window.location.reload();", 800);
            return;
          }
          var _0x163f7f = "验证失败";
          var _0x5cda60 = "确认";
          var _0x870437 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
          if (!_0x4fb42a.isChinese(_0x870437)) {
            _0x163f7f = "Verification Failed";
            _0x5cda60 = "confirm";
          }
          if (_0x5b82f0.code === 521) {
            var _0x1a2872 = {
              title: _0x163f7f,
              closeBtn: 0,
              move: false,
              btn: _0x5cda60
            };
            layer.alert(_0x5b82f0.message, _0x1a2872, function () {
              setTimeout("window.location.reload();", 400);
            });
            return;
          }
          var _0xd6ebff = _0x5b82f0.body;
          _0xd6ebff = _0x4fb42a.ungzip(_0xd6ebff);
          var _0x5bc814 = _0x5e9a5c.parseJSON(_0xd6ebff);
          _0x4fb42a.point_pic = _0x5bc814;
          _0x4fb42a.randomKey = _0x4fb42a.point_pic.randomKey;
          var _0x46db9a = _0x4fb42a.point_pic.background;
          var _0x59fc7f = _0x4fb42a.point_pic.targetImage;
          var _0x27fde1 = new Image();
          _0x27fde1.src = _0x46db9a;
          _0x5e9a5c(_0x27fde1).on("load", function (_0x32df4c) {
            this.fontPos = _0x34703d.drawImg(_0x34703d, this);
          });
          _0x34703d.htmlDoms.target_image.css({
            width: "260px",
            height: "40px",
            background: "url(" + _0x59fc7f + ")"
          });
        }
      });
    },
    drawImg: function (_0x275558, _0x25aba8) {
      var _0x4eb47e = this.$element.find("canvas")[0];
      var _0x2a5c44 = _0x4eb47e.getContext("2d");
      _0x2a5c44.drawImage(_0x25aba8, 0, 0, parseInt(this.setSize.img_width), parseInt(this.setSize.img_height));
      this.$element.find(".verify-bar-area").removeClass("is-error");
      return this.fontPos;
    },
    getMousePos: function (_0x2f0ab1, _0x3a5ee0) {
      var _0x50f201 = _0x3a5ee0 || _0x4fb42a.event;
      var _0x2a2fc2 = _0x22122c.documentElement.scrollLeft || _0x22122c.body.scrollLeft;
      var _0x454972 = _0x22122c.documentElement.scrollTop || _0x22122c.body.scrollTop;
      var _0x4f996c = _0x50f201.clientX - (_0x5e9a5c(_0x2f0ab1).offset().left - _0x5e9a5c(_0x4fb42a).scrollLeft());
      var _0x13c844 = _0x50f201.clientY - (_0x5e9a5c(_0x2f0ab1).offset().top - _0x5e9a5c(_0x4fb42a).scrollTop());
      _0x4f996c = _0x4f996c.toFixed(0);
      _0x13c844 = _0x13c844.toFixed(0);
      var _0x59f6b9 = {
        x: _0x4f996c,
        y: _0x13c844
      };
      return _0x59f6b9;
    },
    createPoint: function (_0x149333) {
      this.htmlDoms.img_panel.append("<div class=\"point-area\" style=\"position:absolute;top:" + parseInt(_0x149333.y - 10) + "px;left:" + parseInt(_0x149333.x - 10) + "px;\">" + this.num + "");
      return ++this.num;
    },
    comparePosAjax: function (_0x116b47) {
      var _0x332b00 = this;
      var _0x5826e4 = "init";
      var _0x364d94 = {
        tracks: _0x2ab50b,
        checkPosArr: _0x116b47,
        randomKey: _0x4fb42a.point_pic.randomKey
      };
      var _0x1325bb = _0x364d94;
      _0x5e9a5c.ajax({
        url: _0x4fb42a.verifyUrl,
        data: {
          captcha_protect: _0x4fb42a.captcha_protect(),
          body: _0x4fb42a.aesEncrypt(_0x4fb42a.gzip(JSON.stringify(_0x1325bb))),
          fpv: _0x4fb42a.rsaEncrypt(_0x4fb42a._bsc_cv.fpv),
          isUpgrade: _0x4fb42a._bsc_cv.isUpgrade,
          refreshTimes: _0x4fb42a._bsc_cv.refreshTimes,
          type: "points",
          wlocation: _0x4fb42a.gzip(JSON.stringify(_0x4fb42a._bsc_cv.wlocation))
        },
        type: "POST",
        dataType: "JSONP",
        jsonpCallback: "callback_" + new Date().getTime(),
        headers: {
          "X-Req-Token": _0x4fb42a._bsc_cv.signature()
        },
        success: function (_0x469043) {
          var _0x5a7000 = JSON.stringify(_0x469043);
          var _0x40935b = _0x5e9a5c.parseJSON(_0x5a7000);
          var _0x48587b = _0x40935b.ret;
          if (_0x48587b < 0) {
            _0x332b00.refresh();
            _0x4fb42a._bsc_cv.refreshTimes++;
            return;
          }
          var _0x3ff4c0 = "验证失败";
          var _0x9e32a9 = "确认";
          var _0x57aa26 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
          if (!_0x4fb42a.isChinese(_0x57aa26)) {
            _0x3ff4c0 = "Verification Failed";
            _0x9e32a9 = "confirm";
          }
          if (_0x40935b.code === 521) {
            var _0x119c5a = {
              title: _0x3ff4c0,
              closeBtn: 0,
              move: false,
              btn: _0x9e32a9
            };
            layer.alert(_0x40935b.message, _0x119c5a, function () {
              setTimeout("window.location.reload();", 400);
            });
            return;
          }
          if (_0x40935b.upgrade !== _0x26ba50) {
            _0x4fb42a.SetCookieUT("upgrade_level", _0x40935b.upgrade);
            _0x332b00.executeRes("error");
            setTimeout("window.location.reload();", 400);
            return;
          }
          _0x5826e4 = _0x40935b.result;
          var _0xc4c39b = _0x40935b.yd_captcha_token;
          _0x4fb42a.SetCookieUT("yd_captcha_token", _0xc4c39b, 0);
          _0x332b00.executeRes(_0x5826e4);
        }
      });
    },
    executeRes: function (_0x1a0c5e) {
      var _0xb47804 = this;
      if (_0x1a0c5e === "retry") {
        _0xb47804.options.retry();
        _0xb47804.$element.find(".verify-bar-area").css({
          color: "#FFB90F",
          "border-color": "#FFB90F"
        });
        _0xb47804.$element.find(".verify-msg").text("需要再次验证");
        setTimeout(function () {
          _0xb47804.$element.find(".verify-bar-area").css({
            color: "#000",
            "border-color": "#ddd"
          });
          _0xb47804.refresh();
        }, 400);
        _0x4fb42a._bsc_cv.refreshTimes++;
      } else if (_0x1a0c5e === "success") {
        _0xb47804.$element.find(".verify-bar-area").css({
          color: "#4cae4c",
          "border-color": "#5cb85c"
        }).addClass("is-success");
        _0xb47804.$element.find(".verify-msg").text("验证成功");
        _0xb47804.$element.find(".verify-refresh").hide();
        _0xb47804.$element.find(".verify-img-panel").unbind("click");
        _0xb47804.options.success(_0xb47804);
      } else if (_0x1a0c5e === "exception") {
        _0xb47804.options.error();
        _0xb47804.$element.find(".verify-bar-area").css({
          color: "#d9534f",
          "border-color": "#d9534f"
        });
        _0xb47804.$element.find(".verify-msg").text("系统异常，请重试");
        setTimeout(function () {
          _0xb47804.$element.find(".verify-bar-area").css({
            color: "#000",
            "border-color": "#ddd"
          });
          _0xb47804.refresh();
        }, 400);
        _0x4fb42a._bsc_cv.refreshTimes++;
      } else {
        _0xb47804.options.error();
        setTimeout(function () {
          _0xb47804.refresh();
        }, 400);
        _0x4fb42a._bsc_cv.refreshTimes++;
      }
      this.status = false;
      _0x15062f = [];
      _0x2ab50b = [];
    },
    showImg: function () {
      this.htmlDoms.out_panel.css({
        display: "block"
      });
    },
    hideImg: function () {
      this.htmlDoms.out_panel.css({
        display: "none"
      });
    },
    refresh: function () {
      var _0xd99810 = this;
      this.status = false;
      this.$element.find(".point-area").remove();
      this.checkPosArr = [];
      this.num = 1;
      _0xd99810.$element.find(".verify-refresh").show();
      _0xd99810.$element.find(".verify-bar-area").css({
        color: "#000",
        "border-color": "#ddd"
      });
      var _0x244344 = _0x4fb42a.convertUrl;
      var _0x4ab039 = {
        captcha_protect: _0x4fb42a.captcha_protect(),
        fpv: _0x4fb42a.gzip(_0x4fb42a._bsc_cv.fpv),
        isUpgrade: _0x4fb42a._bsc_cv.isUpgrade,
        type: _0x4fb42a.gzip("point_pic"),
        wlocation: _0x4fb42a.gzip(JSON.stringify(_0x4fb42a._bsc_cv.wlocation))
      };
      _0x5e9a5c.ajax({
        url: _0x244344,
        data: _0x4ab039,
        type: "GET",
        dataType: "JSONP",
        jsonpCallback: "callback_" + new Date().getTime(),
        headers: {
          "X-Req-Token": _0x4fb42a._bsc_cv.signature()
        },
        success: function (_0x335502) {
          var _0x2370ec = JSON.stringify(_0x335502);
          var _0x102979 = _0x5e9a5c.parseJSON(_0x2370ec);
          var _0x585d29 = _0x102979.ret;
          if (_0x585d29 < 0) {
            setTimeout("window.location.reload();", 800);
            return;
          }
          var _0xe95b7b = "验证失败";
          var _0x15a8ea = "确认";
          var _0x2713e7 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
          if (!_0x4fb42a.isChinese(_0x2713e7)) {
            _0xe95b7b = "Verification Failed";
            _0x15a8ea = "confirm";
          }
          if (_0x102979.code === 521) {
            var _0x224c54 = {
              title: _0xe95b7b,
              closeBtn: 0,
              move: false,
              btn: _0x15a8ea
            };
            layer.alert(_0x102979.message, _0x224c54, function () {
              setTimeout("window.location.reload();", 400);
            });
            return;
          }
          var _0x230267 = _0x102979.body;
          _0x230267 = _0x4fb42a.ungzip(_0x230267);
          _0x4fb42a.point_pic = _0x5e9a5c.parseJSON(_0x230267);
          _0x4fb42a.randomKey = _0x4fb42a.point_pic.randomKey;
          var _0x315133 = _0x4fb42a.point_pic.background;
          var _0x5b3b77 = _0x4fb42a.point_pic.targetImage;
          var _0x2d9504 = new Image();
          _0x2d9504.src = _0x315133;
          _0x5e9a5c(_0x2d9504).on("load", function (_0x52c7f0) {
            this.fontPos = _0xd99810.drawImg(_0xd99810, this);
          });
          _0xd99810.htmlDoms.target_image.css({
            background: "url(" + _0x5b3b77 + ")"
          });
        }
      });
      _0x15062f = [];
      _0x2ab50b = [];
    },
    start: function (_0x326cb2) {
      _0x326cb2.stopPropagation();
      this.status = true;
      if (!_0x326cb2.touches) {
        var _0x21e827 = _0x326cb2.clientX;
        var _0xa7a2c6 = _0x326cb2.clientY;
      } else {
        var _0x21e827 = _0x326cb2.touches[0].pageX;
        var _0xa7a2c6 = _0x326cb2.touches[0].pageY;
        _0x21e827 = _0x21e827.toFixed(0);
        _0xa7a2c6 = _0xa7a2c6.toFixed(0);
      }
      _0x15062f[_0x15062f.length] = new _0x5174e6(_0x21e827, _0xa7a2c6, 1);
      _0x2ab50b[_0x2ab50b.length] = _0x15062f[_0x15062f.length - 1];
    },
    move: function (_0x168261) {
      if (this.status) {
        if (this.options.mode === "pop") {
          this.showImg();
        }
        if (!_0x168261.touches) {
          var _0x1a5dec = _0x168261.clientX;
          var _0x27394c = _0x168261.clientY;
        } else {
          var _0x1a5dec = _0x168261.touches[0].pageX;
          var _0x27394c = _0x168261.touches[0].pageY;
          _0x1a5dec = _0x1a5dec.toFixed(0);
          _0x27394c = _0x27394c.toFixed(0);
        }
        _0x15062f[_0x15062f.length] = new _0x5174e6(_0x1a5dec, _0x27394c, 2);
        _0x2ab50b[_0x2ab50b.length] = _0x15062f[_0x15062f.length - 1];
      }
    }
  };
  function _0x269e72(_0x17f49, _0x4c4f13) {
    ;
    var _0x519b84 = {
      mode: "fixed",
      vSpace: 5,
      imgSize: {},
      barSize: {},
      ready: function () {},
      success: function () {},
      retry: function () {},
      error: function () {}
    };
    _0x519b84.imgSize.width = "260px";
    _0x519b84.imgSize.height = "160px";
    _0x519b84.barSize.width = "260px";
    _0x519b84.barSize.height = "40px";
    this.$element = _0x17f49;
    this.defaults = _0x519b84;
    this.options = _0x5e9a5c.extend({}, this.defaults, _0x4c4f13);
  }
  _0x269e72.prototype = {
    init: function () {
      var _0x16c276 = this;
      _0x16c276.loadDom();
      _0x16c276.options.ready();
      this.$element[0].onselectstart = _0x22122c.body.ondrag = function () {
        return false;
      };
      if (this.options.mode === "pop") {
        this.$element.on("mouseover", function (_0x17e04a) {
          _0x16c276.showImg();
        });
        this.$element.on("mouseout", function (_0x484862) {
          _0x16c276.hideImg();
        });
        this.htmlDoms.out_panel.on("mouseover", function (_0x35f49c) {
          _0x16c276.showImg();
        });
        this.htmlDoms.out_panel.on("mouseout", function (_0x22878c) {
          _0x16c276.hideImg();
        });
      }
      _0x16c276.$element.find(".verify-img-panel div").on("click", function (_0x147495) {
        if (!_0x4fb42a.isIE()) {
          event.stopPropagation();
        } else {
          event.cancelBubble = true;
        }
        _0x16c276.checkPosArr.push(_0x16c276.getMousePos(this, _0x147495));
        setTimeout(function () {
          _0x16c276.comparePosAjax(_0x16c276.checkPosArr);
        }, 400);
        this.status = false;
      });
      _0x4fb42a.addEventListener("touchstart", function (_0x42f2f0) {
        _0x16c276.start(_0x42f2f0);
      });
      _0x4fb42a.addEventListener("mousedown", function (_0x3a2153) {
        _0x16c276.start(_0x3a2153);
      });
      _0x4fb42a.addEventListener("touchmove", function (_0x4e279f) {
        _0x16c276.move(_0x4e279f);
      });
      _0x4fb42a.addEventListener("mousemove", function (_0x55e882) {
        _0x16c276.move(_0x55e882);
      });
    },
    loadDom: function () {
      this.checkPosArr = [];
      this.num = 1;
      this.setSize = _0x466ac6.prototype.resetSize(this);
      this.htmlDoms = {
        out_panel: this.$element.find(".verify-img-out"),
        content_container: this.$element.find(".content-container"),
        check_box: this.$element.find("#check-box"),
        logo_panel: this.$element.find(".logo-container"),
        text_container: this.$element.find(".text-container"),
        caption: this.$element.find(".caption"),
        msg: this.$element.find(".verify-msg")
      };
      this.$element.css("position", "relative");
      if (this.options.mode === "pop") {
        this.htmlDoms.out_panel.css({
          display: "none",
          position: "absolute",
          bottom: "42px"
        });
      } else {
        this.htmlDoms.out_panel.css({
          position: "relative"
        });
      }
      this.htmlDoms.caption.css({
        padding: "0"
      });
      this.htmlDoms.out_panel.css({
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "10px"
      });
      this.htmlDoms.content_container.css({
        display: "flex",
        alignItems: "center"
      });
      this.htmlDoms.check_box.css({
        cursor: "pointer"
      });
      this.htmlDoms.text_container.css({
        fontSize: "20px",
        marginLeft: "10px"
      });
      this.htmlDoms.logo_panel.css({
        marginLeft: "auto"
      });
    },
    getMousePos: function (_0x20f0a6, _0x5068ce) {
      var _0x3a41c1 = _0x5068ce || _0x4fb42a.event;
      var _0x27cc82 = _0x22122c.documentElement.scrollLeft || _0x22122c.body.scrollLeft;
      var _0x2a3bbe = _0x22122c.documentElement.scrollTop || _0x22122c.body.scrollTop;
      var _0xf2cbb = _0x3a41c1.clientX - (_0x5e9a5c(_0x20f0a6).offset().left - _0x5e9a5c(_0x4fb42a).scrollLeft());
      var _0x2a6ec9 = _0x3a41c1.clientY - (_0x5e9a5c(_0x20f0a6).offset().top - _0x5e9a5c(_0x4fb42a).scrollTop());
      _0xf2cbb = _0xf2cbb.toFixed(0);
      _0x2a6ec9 = _0x2a6ec9.toFixed(0);
      var _0x2083f6 = {
        x: _0xf2cbb,
        y: _0x2a6ec9
      };
      return _0x2083f6;
    },
    comparePosAjax: function (_0x3408fe) {
      var _0x483239 = this;
      var _0xbb44ef = "init";
      var _0x1fe295 = {
        tracks: _0x2ab50b,
        checkPosArr: _0x3408fe
      };
      var _0x2b1a38 = _0x1fe295;
      var _0x105ca4 = {
        captcha_protect: _0x4fb42a.captcha_protect(),
        body: _0x4fb42a.aesEncrypt(_0x4fb42a.gzip(JSON.stringify(_0x2b1a38))),
        fpv: _0x4fb42a.rsaEncrypt(_0x4fb42a._bsc_cv.fpv),
        isUpgrade: _0x4fb42a._bsc_cv.isUpgrade,
        refreshTimes: _0x4fb42a._bsc_cv.refreshTimes,
        type: "one_points",
        wlocation: _0x4fb42a.gzip(JSON.stringify(_0x4fb42a._bsc_cv.wlocation))
      };
      _0x5e9a5c.ajax({
        url: _0x4fb42a.verifyUrl,
        data: _0x105ca4,
        type: "POST",
        dataType: "JSONP",
        jsonpCallback: "callback_" + new Date().getTime(),
        headers: {
          "X-Req-Token": _0x4fb42a._bsc_cv.signature()
        },
        success: function (_0x340b97) {
          var _0x4ad5cc = JSON.stringify(_0x340b97);
          var _0x5797f9 = _0x5e9a5c.parseJSON(_0x4ad5cc);
          var _0x2c656c = _0x5797f9.ret;
          if (_0x2c656c < 0) {
            _0x483239.refresh();
            _0x4fb42a._bsc_cv.refreshTimes++;
            return;
          }
          var _0xf30f = "验证失败";
          var _0x2465e3 = "确认";
          var _0x54c9bf = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
          if (!_0x4fb42a.isChinese(_0x54c9bf)) {
            _0xf30f = "Verification Failed";
            _0x2465e3 = "confirm";
          }
          if (_0x5797f9.code === 521) {
            var _0x468a83 = {
              title: _0xf30f,
              closeBtn: 0,
              move: false,
              btn: _0x2465e3
            };
            layer.alert(_0x5797f9.message, _0x468a83, function () {
              setTimeout("window.location.reload();", 400);
            });
            return;
          }
          if (_0x5797f9.upgrade !== _0x26ba50) {
            _0x4fb42a.SetCookieUT("upgrade_level", _0x5797f9.upgrade);
            setTimeout("window.location.reload();", 800);
            return;
          }
          _0xbb44ef = _0x5797f9.result;
          var _0x156608 = _0x5797f9.yd_captcha_token;
          _0x4fb42a.SetCookieUT("yd_captcha_token", _0x156608, 0);
          _0x483239.executeRes(_0xbb44ef);
        }
      });
    },
    executeRes: function (_0x13e74b) {
      var _0x934dc5 = this;
      if (_0x13e74b === "success") {
        _0x934dc5.$element.find(".verify-bar-area").css({
          color: "#4cae4c",
          "border-color": "#5cb85c"
        }).addClass("is-success");
        _0x934dc5.$element.find(".verify-msg").text("验证成功");
        _0x934dc5.$element.find(".verify-refresh").hide();
        _0x934dc5.$element.find(".verify-img-panel").unbind("click");
        _0x934dc5.options.success(_0x934dc5);
      } else {
        setTimeout(function () {
          _0x934dc5.options.error();
          _0x934dc5.refresh();
        }, 400);
        _0x4fb42a._bsc_cv.refreshTimes++;
      }
      this.status = false;
      _0x15062f = [];
      _0x2ab50b = [];
    },
    showImg: function () {
      this.htmlDoms.out_panel.css({
        display: "block"
      });
    },
    hideImg: function () {
      this.htmlDoms.out_panel.css({
        display: "none"
      });
    },
    resetToggleLoading: function () {
      var _0x4e7748 = _0x22122c.getElementById("check-box");
      var _0x1046a5 = _0x22122c.getElementById("cb-img");
      if (_0x1046a5 === null) {
        _0x1046a5 = _0x22122c.createElement("img");
        _0x1046a5.id = "cb-img";
        _0x1046a5.src = pic;
      }
      if (!_0x4fb42a.isIE()) {
        if (_0x4e7748.classList.contains("loading")) {
          _0x4e7748.classList.add("check-box");
          _0x4e7748.classList.remove("loading");
          _0x4e7748.removeChild(_0x1046a5);
        }
      } else if (hasClass(_0x4e7748, "loading")) {
        addClass(_0x4e7748, "check-box");
        removeClass(_0x4e7748, "loading");
        _0x4e7748.removeChild(_0x1046a5);
      }
    },
    resetCss: function () {
      this.htmlDoms.caption.css({
        padding: "0"
      });
      this.htmlDoms.out_panel.css({
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "10px"
      });
      this.htmlDoms.content_container.css({
        display: "flex",
        alignItems: "center"
      });
      this.htmlDoms.check_box.css({
        cursor: "pointer"
      });
      this.htmlDoms.text_container.css({
        fontSize: "20px",
        marginLeft: "10px"
      });
      this.htmlDoms.logo_panel.css({
        marginLeft: "auto"
      });
      this.resetToggleLoading();
    },
    refresh: function () {
      this.resetCss();
    },
    start: function (_0xb74c1b) {
      _0xb74c1b.stopPropagation();
      this.status = true;
      if (!_0xb74c1b.touches) {
        var _0x90ab73 = _0xb74c1b.clientX;
        var _0x34a003 = _0xb74c1b.clientY;
      } else {
        var _0x90ab73 = _0xb74c1b.touches[0].pageX;
        var _0x34a003 = _0xb74c1b.touches[0].pageY;
        _0x90ab73 = _0x90ab73.toFixed(0);
        _0x34a003 = _0x34a003.toFixed(0);
      }
      _0x15062f[_0x15062f.length] = new _0x5174e6(_0x90ab73, _0x34a003, 1);
      _0x2ab50b[_0x2ab50b.length] = _0x15062f[_0x15062f.length - 1];
    },
    move: function (_0x59e764) {
      if (this.status) {
        if (this.options.mode === "pop") {
          this.showImg();
        }
        if (!_0x59e764.touches) {
          var _0x3c4c28 = _0x59e764.clientX;
          var _0x51dacb = _0x59e764.clientY;
        } else {
          var _0x3c4c28 = _0x59e764.touches[0].pageX;
          var _0x51dacb = _0x59e764.touches[0].pageY;
          _0x3c4c28 = _0x3c4c28.toFixed(0);
          _0x51dacb = _0x51dacb.toFixed(0);
        }
        _0x15062f[_0x15062f.length] = new _0x5174e6(_0x3c4c28, _0x51dacb, 2);
        _0x2ab50b[_0x2ab50b.length] = _0x15062f[_0x15062f.length - 1];
      }
    }
  };
  function _0x20c53a(_0x43e7a1, _0x1d10fe) {
    ;
    this.$element = _0x43e7a1;
    this.defaults = {
      mode: "fixed",
      vSpace: 5,
      imgSize: {
        width: "260px",
        height: "160px"
      },
      barSize: {
        width: "260px",
        height: "40px"
      },
      ready: function () {},
      success: function () {},
      retry: function () {
        var _0xf2db2e = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
        if (!_0x4fb42a.isChinese(_0xf2db2e)) {
          layer.msg("Retry", {
            shade: 0.3,
            time: 600
          });
        } else {
          layer.msg("需要重新验证", {
            shade: 0.3,
            time: 600
          });
        }
      },
      error: function () {}
    };
    this.options = _0x5e9a5c.extend({}, this.defaults, _0x1d10fe);
  }
  _0x20c53a.prototype = {
    init: function () {
      var _0x430abc = this;
      _0x430abc.loadDom();
      _0x430abc.options.ready();
      _0x430abc.$element[0].onselectstart = _0x22122c.body.ondrag = function () {
        return false;
      };
      _0x430abc.check();
    },
    check: function () {
      var _0x15502d = this;
      setTimeout(function () {
        _0x15502d.comparePosAjax();
      }, 4980);
      _0x15502d.status = false;
    },
    loadDom: function () {
      this.num = 1;
      var _0xc4ab89 = "";
      this.setSize = _0x466ac6.prototype.resetSize(this);
      var _0x4adce6 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
      var _0x3a7817;
      if (!_0x4fb42a.isChinese(_0x4adce6)) {
        _0x3a7817 = "Detecting browser environment";
      } else {
        _0x3a7817 = "请稍等，正在检查您的浏览器";
      }
      _0xc4ab89 += "<div class=\"verify-img-out\"><div class=\"verify-img-panel content-container\"><div class=\"text-container\"><div class=\"verify-img-panel\"><div class=\"verify-refresh\" style=\"z-index:3\"><i class=\"iconfont icon-refresh\"></i><canvas width=\"" + _0x3a7817 + "";
      this.$element.append(_0xc4ab89);
      this.htmlDoms = {
        out_panel: this.$element.find(".verify-img-out"),
        text_container: this.$element.find(".text-container"),
        caption: this.$element.find(".caption")
      };
      this.$element.css("position", "relative");
      this.htmlDoms.caption.css({
        padding: "0"
      });
      this.htmlDoms.text_container.css({
        fontSize: "18px"
      });
    },
    comparePosAjax: function () {
      var _0x1c7297 = this;
      var _0x30a716 = "init";
      _0x5e9a5c.ajax({
        url: _0x4fb42a.verifyUrl,
        data: {
          captcha_protect: _0x4fb42a.captcha_protect(),
          fpv: _0x4fb42a.rsaEncrypt(_0x4fb42a._bsc_cv.fpv),
          isUpgrade: _0x4fb42a._bsc_cv.isUpgrade,
          refreshTimes: _0x4fb42a._bsc_cv.refreshTimes,
          type: "five_seconds",
          wlocation: _0x4fb42a.gzip(JSON.stringify(_0x4fb42a._bsc_cv.wlocation))
        },
        type: "POST",
        dataType: "JSONP",
        jsonpCallback: "callback_" + new Date().getTime(),
        headers: {
          "X-Req-Token": _0x4fb42a._bsc_cv.signature()
        },
        success: function (_0x5c8275) {
          var _0x10b65c = JSON.stringify(_0x5c8275);
          var _0x41fbef = _0x5e9a5c.parseJSON(_0x10b65c);
          var _0x5777dc = _0x41fbef.ret;
          if (_0x5777dc < 0) {
            _0x1c7297.refresh();
            _0x4fb42a._bsc_cv.refreshTimes++;
            return;
          }
          var _0x1d2884 = "验证失败";
          var _0x592b7b = "确认";
          var _0x331ba9 = _0x4fb42a.navigator.language || _0x4fb42a.navigator.browserLanguage;
          if (!_0x4fb42a.isChinese(_0x331ba9)) {
            _0x1d2884 = "Verification Failed";
            _0x592b7b = "confirm";
          }
          if (_0x41fbef.code === 521) {
            var _0x22d910 = {
              title: _0x1d2884,
              closeBtn: 0,
              move: false,
              btn: _0x592b7b
            };
            layer.alert(_0x41fbef.message, _0x22d910, function () {
              setTimeout("window.location.reload();", 400);
            });
            return;
          }
          if (_0x41fbef.upgrade !== _0x26ba50) {
            _0x4fb42a.SetCookieUT("upgrade_level", _0x41fbef.upgrade);
            setTimeout("window.location.reload();", 800);
            return;
          }
          _0x30a716 = _0x41fbef.result;
          var _0x13cce6 = _0x41fbef.yd_captcha_token;
          _0x4fb42a.SetCookieUT("yd_captcha_token", _0x13cce6, 0);
          _0x1c7297.executeRes(_0x30a716);
        }
      });
    },
    executeRes: function (_0x130c73) {
      var _0x128555 = this;
      if (_0x130c73 === "success") {
        _0x128555.$element.find(".verify-img-panel").unbind("click");
        _0x128555.options.success(_0x128555);
      } else {
        _0x128555.options.retry();
        setTimeout(function () {
          _0x128555.refresh();
        }, 400);
        _0x4fb42a._bsc_cv.refreshTimes++;
      }
      this.status = false;
    },
    showImg: function () {
      this.htmlDoms.out_panel.css({
        display: "block"
      });
    },
    hideImg: function () {
      this.htmlDoms.out_panel.css({
        display: "none"
      });
    },
    countdown: function () {
      var _0x2b09eb = Date.now() + 5000;
      function _0x4bc7e7() {
        var _0x2602f9 = Math.floor((_0x2b09eb - Date.now()) / 1000);
        if (_0x2602f9 >= 0) {
          var _0x24effc = _0x2602f9 % 60;
          _0x22122c.getElementById("countdown").innerText = _0x24effc.toString();
        }
      }
      _0x4bc7e7();
      setInterval(_0x4bc7e7, 990);
    },
    resetCss: function () {
      this.countdown();
      this.check();
    },
    refresh: function () {
      this.resetCss();
    },
    start: function (_0x370543) {
      _0x370543.stopPropagation();
      this.status = true;
      if (!_0x370543.touches) {
        var _0x57fe5e = _0x370543.clientX;
        var _0x467fcb = _0x370543.clientY;
      } else {
        var _0x57fe5e = _0x370543.touches[0].pageX;
        var _0x467fcb = _0x370543.touches[0].pageY;
        _0x57fe5e = _0x57fe5e.toFixed(0);
        _0x467fcb = _0x467fcb.toFixed(0);
      }
      _0x15062f[_0x15062f.length] = new _0x5174e6(_0x57fe5e, _0x467fcb, 1);
      _0x2ab50b[_0x2ab50b.length] = _0x15062f[_0x15062f.length - 1];
    }
  };
  _0x5e9a5c.fn.slideVerify = function (_0x322745, _0xa0b12c) {
    var _0x2ee638 = new _0x466ac6(this, _0x322745);
    _0x2ee638.init();
  };
  _0x5e9a5c.fn.pointsVerify = function (_0x823a5e, _0x185b06) {
    var _0x490bf6 = new _0x5d71b0(this, _0x823a5e);
    _0x490bf6.init();
  };
  _0x5e9a5c.fn.onePointsVerify = function (_0x30d60e, _0x5aa358) {
    var _0x5e2d12 = new _0x269e72(this, _0x30d60e);
    _0x5e2d12.init();
  };
  _0x5e9a5c.fn.fiveSecondsVerify = function (_0x42aa95, _0x1d1ad7) {
    var _0x179b07 = new _0x20c53a(this, _0x42aa95);
    _0x179b07.init();
  };
})(jQuery, window, document);