/*
* A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
* Digest Algorithm, as defined in RFC 1321.
* Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
* Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
* Distributed under the BSD License
* See http://pajhome.org.uk/crypt/md5 for more info.
*/
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */
/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
  return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}
function b64_md5(s) {
  return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}
function str_md5(s) {
  return binl2str(core_md5(str2binl(s), s.length * chrsz));
}
function hex_hmac_md5(key, data) {
  return binl2hex(core_hmac_md5(key, data));
}
function b64_hmac_md5(key, data) {
  return binl2b64(core_hmac_md5(key, data));
}
function str_hmac_md5(key, data) {
  return binl2str(core_hmac_md5(key, data));
}
/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
  return hex_md5("\x61" + "\x62\x63") == "\x39\x30\x30\x31\x35\x30\x39\x38\x33\x63\x64\x32\x34\x66\x62\x30\x64\x36\x39\x36\x33\x66" + "\x37\x64\x32\x38\x65\x31\x37\x66\x37\x32";
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
  let $control_3 = 4;
  for (let $for_loop_3 = 0; $for_loop_3 < 8; $for_loop_3++) {
    switch ($control_3) {
      case 4:
        {
          /* append padding */
          x[len >> 5] |= 0x80 << len % 32;
          $control_3 += 2;
          break;
        }
      case 6:
        {
          x[(len + 64 >>> 9 << 4) + 14] = len;
          $control_3 += -3;
          break;
        }
      case 3:
        {
          var a = 1732584193;
          $control_3 += 2;
          break;
        }
      case 5:
        {
          var b = -271733879;
          $control_3 += -3;
          break;
        }
      case 2:
        {
          var c = -1732584194;
          $control_3 += 5;
          break;
        }
      case 7:
        {
          var d = 271733878;
          $control_3 += 1;
          break;
        }
      case 1:
        {
          return Array(a, b, c, d);
          break;
        }
      case 8:
        {
          for (var i = 0; i < x.length; i += 16) {
            let $control_2 = 18;
            for (let $for_loop_2 = 0; $for_loop_2 < 74; $for_loop_2++) {
              switch ($control_2) {
                case 20:
                  {
                    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                    $control_2 += 6;
                    break;
                  }
                case 50:
                  {
                    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                    $control_2 += -49;
                    break;
                  }
                case 40:
                  {
                    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                    $control_2 += 16;
                    break;
                  }
                case 58:
                  {
                    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                    $control_2 += -38;
                    break;
                  }
                case 67:
                  {
                    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                    $control_2 += -33;
                    break;
                  }
                case 64:
                  {
                    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                    $control_2 += 2;
                    break;
                  }
                case 12:
                  {
                    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                    $control_2 += 42;
                    break;
                  }
                case 46:
                  {
                    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                    $control_2 += -4;
                    break;
                  }
                case 45:
                  {
                    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                    $control_2 += -21;
                    break;
                  }
                case 39:
                  {
                    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                    $control_2 += 28;
                    break;
                  }
                case 33:
                  {
                    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                    $control_2 += 16;
                    break;
                  }
                case 54:
                  {
                    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                    $control_2 += 15;
                    break;
                  }
                case 61:
                  {
                    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                    $control_2 += -59;
                    break;
                  }
                case 49:
                  {
                    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                    $control_2 += 23;
                    break;
                  }
                case 7:
                  {
                    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                    $control_2 += 8;
                    break;
                  }
                case 69:
                  {
                    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                    $control_2 += -14;
                    break;
                  }
                case 52:
                  {
                    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                    $control_2 += -40;
                    break;
                  }
                case 3:
                  {
                    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                    $control_2 += 28;
                    break;
                  }
                case 70:
                  {
                    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                    $control_2 += -47;
                    break;
                  }
                case 55:
                  {
                    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                    $control_2 += 4;
                    break;
                  }
                case 27:
                  {
                    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                    $control_2 += 43;
                    break;
                  }
                case 42:
                  {
                    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                    $control_2 += -37;
                    break;
                  }
                case 35:
                  {
                    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                    $control_2 += -10;
                    break;
                  }
                case 41:
                  {
                    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                    $control_2 += 21;
                    break;
                  }
                case 71:
                  {
                    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                    $control_2 += -20;
                    break;
                  }
                case 44:
                  {
                    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                    $control_2 += -16;
                    break;
                  }
                case 25:
                  {
                    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                    $control_2 += -4;
                    break;
                  }
                case 4:
                  {
                    var d_number;
                    $control_2 += 40;
                    break;
                  }
                case 38:
                  {
                    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                    $control_2 += 14;
                    break;
                  }
                case 51:
                  {
                    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                    $control_2 += -29;
                    break;
                  }
                case 1:
                  {
                    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                    $control_2 += 62;
                    break;
                  }
                case 30:
                  {
                    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                    $control_2 += 15;
                    break;
                  }
                case 23:
                  {
                    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                    $control_2 += 13;
                    break;
                  }
                case 65:
                  {
                    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                    $control_2 += -58;
                    break;
                  }
                case 19:
                  {
                    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                    $control_2 += 8;
                    break;
                  }
                case 74:
                  {
                    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                    $control_2 += -24;
                    break;
                  }
                case 63:
                  {
                    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                    $control_2 += -24;
                    break;
                  }
                case 24:
                  {
                    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                    $control_2 += 47;
                    break;
                  }
                case 62:
                  {
                    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                    $control_2 += -9;
                    break;
                  }
                case 34:
                  {
                    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                    $control_2 += 7;
                    break;
                  }
                case 37:
                  {
                    d = safe_add(d, oldd);
                    break;
                  }
                case 8:
                  {
                    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                    $control_2 += 11;
                    break;
                  }
                case 6:
                  {
                    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                    $control_2 += 58;
                    break;
                  }
                case 68:
                  {
                    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                    $control_2 += -28;
                    break;
                  }
                case 36:
                  {
                    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                    $control_2 += -33;
                    break;
                  }
                case 29:
                  {
                    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                    $control_2 += 39;
                    break;
                  }
                case 59:
                  {
                    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                    $control_2 += 15;
                    break;
                  }
                case 9:
                  {
                    var oldd = d;
                    $control_2 += -5;
                    break;
                  }
                case 15:
                  {
                    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                    $control_2 += 15;
                    break;
                  }
                case 17:
                  {
                    var oldc = c;
                    $control_2 += -8;
                    break;
                  }
                case 48:
                  {
                    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                    $control_2 += 17;
                    break;
                  }
                case 22:
                  {
                    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                    $control_2 += 7;
                    break;
                  }
                case 5:
                  {
                    a = safe_add(a, olda);
                    $control_2 += 52;
                    break;
                  }
                case 56:
                  {
                    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                    $control_2 += -18;
                    break;
                  }
                case 21:
                  {
                    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                    $control_2 += -7;
                    break;
                  }
                case 31:
                  {
                    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                    $control_2 += 30;
                    break;
                  }
                case 53:
                  {
                    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                    $control_2 += -7;
                    break;
                  }
                case 28:
                  {
                    try {
                      let $control_1 = 12;
                      for (let $for_loop_1 = 0; $for_loop_1 < 20; $for_loop_1++) {
                        switch ($control_1) {
                          case 12:
                            {
                              // 第一个检测点
                              d_number = -389564586; // *arg1* 这里是正确的路线
                              $control_1 += -10;
                              break;
                            }
                          case 1:
                            {
                              localStorage.clear();
                              $control_1 += 4;
                              break;
                            }
                          case 26:
                            {
                              d_number = -389564585; // 异常;
                              $control_1 += -25;
                              break;
                            }
                          case 28:
                            {
                              d_number = -389564585; // 异常;
                              $control_1 += -22;
                              break;
                            }
                          case 13:
                            {
                              if (typeof usedJSHeap !== "\x73" + "\x74\x72\x69\x6e\x67") {
                                $control_1 += 20;
                                break;
                              }
                              // 第五个前端检测点;
                              $control_1 += -9;
                              break;
                            }
                          case 9:
                            {
                              // 第二个检测点
                              localStorage.setItem("\x6d\x79\x43" + "\x61\x74", "\x54" + "\x6f\x6d");
                              $control_1 += -1;
                              break;
                            }
                          case 5:
                            {
                              if (localStorage.getItem("\x6d\x79" + "\x43\x61\x74") === "\x54" + "\x6f\x6d") {
                                $control_1 += 23;
                                break;
                              }

                              // 第三个前端检测点;
                              $control_1 += 1;
                              break;
                            }
                          case 39:
                            {
                              d_number = -389564585; // 异常;
                              $control_1 += -36;
                              break;
                            }
                          case 23:
                            {
                              d_number = -389564585; // screen检测不通过;
                              $control_1 += -14;
                              break;
                            }
                          case 3:
                            {
                              // 第四个前端检测点
                              var memoryInfo = performance.memory;
                              $control_1 += 4;
                              break;
                            }
                          case 7:
                            {
                              var usedJSHeap = (memoryInfo.usedJSHeapSize / 1048576).toFixed(2);
                              $control_1 += 6;
                              break;
                            }
                          case 4:
                            {
                              // 第五个前端检测点
                              var popover = window.document.querySelector("\x5b" + "\x70\x6f\x70\x6f\x76\x65\x72\x5d");
                              $control_1 += 6;
                              break;
                            }
                          case 33:
                            {
                              d_number = -389564585; // 异常;
                              $control_1 += -29;
                              break;
                            }
                          case 14:
                            {
                              if (!popover.matches("\x3a\x70\x6f\x70\x6f\x76\x65" + "\x72\x2d\x6f\x70\x65\x6e")) {
                                $control_1 += 26;
                                break;
                              }
                              ;
                              $control_1 += -3;
                              break;
                            }
                          case 40:
                            {
                              d_number = -389564585; // 异常;
                              $control_1 += -29;
                              break;
                            }
                          case 11:
                            {
                              $("\x23\x74" + "\x6f\x6f\x6c\x74\x69\x70\x2d\x37\x63\x32\x35\x38\x66\x35\x39\x2d\x32\x30\x62\x61\x2d\x34\x39\x38\x30\x2d\x61\x31\x33\x36\x2d\x34\x65\x63\x32\x36\x63\x34\x61\x62\x30\x63\x65").css("\x64" + "\x69\x73\x70\x6c\x61\x79", "\x6e\x6f" + "\x6e\x65");
                              break;
                            }
                          case 10:
                            {
                              popover.showPopover();
                              $control_1 += 4;
                              break;
                            }
                          case 2:
                            {
                              // *arg1* 这里是正确的路线

                              if (typeof screen.height !== "\x6e\x75\x6d" + "\x62\x65\x72") {
                                $control_1 += 21;
                                break;
                              }
                              // 第二个检测点;
                              $control_1 += 7;
                              break;
                            }
                          case 6:
                            {
                              // 第三个前端检测点
                              if (!("\x72\x65\x71\x75" + "\x65\x73\x74\x46\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e" in document.documentElement)) {
                                $control_1 += 33;
                                break;
                              }
                              // 第四个前端检测点;
                              $control_1 += -3;
                              break;
                            }
                          case 8:
                            {
                              if (localStorage.getItem("\x6d\x79" + "\x43\x61\x74") !== "\x54\x6f" + "\x6d") {
                                $control_1 += 18;
                                break;
                              }
                              ;
                              $control_1 += -7;
                              break;
                            }
                        }
                      }
                    } catch (e) {
                      d_number = -389564584; // screen检测报错
                    }
                    $control_2 += 32;
                    break;
                  }
                case 26:
                  {
                    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                    $control_2 += -10;
                    break;
                  }
                case 57:
                  {
                    b = safe_add(b, oldb);
                    $control_2 += -47;
                    break;
                  }
                case 14:
                  {
                    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                    $control_2 += -3;
                    break;
                  }
                case 43:
                  {
                    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                    $control_2 += -30;
                    break;
                  }
                case 73:
                  {
                    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                    $control_2 += -38;
                    break;
                  }
                case 72:
                  {
                    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                    $control_2 += -64;
                    break;
                  }
                case 16:
                  {
                    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                    $control_2 += -10;
                    break;
                  }
                case 18:
                  {
                    var olda = a;
                    $control_2 += 29;
                    break;
                  }
                case 10:
                  {
                    c = safe_add(c, oldc);
                    $control_2 += 27;
                    break;
                  }
                case 11:
                  {
                    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                    $control_2 += 22;
                    break;
                  }
                case 13:
                  {
                    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                    $control_2 += 45;
                    break;
                  }
                case 66:
                  {
                    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                    $control_2 += -34;
                    break;
                  }
                case 60:
                  {
                    d = md5_ff(d, a, b, c, x[i + 1], 12, d_number);
                    $control_2 += 13;
                    break;
                  }
                case 47:
                  {
                    var oldb = b;
                    $control_2 += -30;
                    break;
                  }
                case 32:
                  {
                    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                    $control_2 += 16;
                    break;
                  }
                case 2:
                  {
                    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                    $control_2 += 41;
                    break;
                  }
              }
            }
          }
          $control_3 += -7;
          break;
        }
    }
  }
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}
/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
  let $control_4 = 4;
  for (let $for_loop_4 = 0; $for_loop_4 < 7; $for_loop_4++) {
    switch ($control_4) {
      case 5:
        {
          for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
          }
          $control_4 += -2;
          break;
        }
      case 12:
        {
          bkey = core_md5(bkey, key.length * chrsz);
          ;
          $control_4 += -6;
          break;
        }
      case 3:
        {
          var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
          $control_4 += -2;
          break;
        }
      case 6:
        {
          var ipad = Array(16),
            opad = Array(16);
          $control_4 += -1;
          break;
        }
      case 4:
        {
          var bkey = str2binl(key);
          $control_4 += -2;
          break;
        }
      case 1:
        {
          return core_md5(opad.concat(hash), 512 + 128);
          break;
        }
      case 2:
        {
          if (bkey.length > 16) {
            $control_4 += 10;
            break;
          }
          ;
          $control_4 += 4;
          break;
        }
    }
  }
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
  let $control_5 = 4;
  for (let $for_loop_5 = 0; $for_loop_5 < 4; $for_loop_5++) {
    switch ($control_5) {
      case 2:
        {
          for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
          $control_5 += 1;
          break;
        }
      case 3:
        {
          return bin;
          break;
        }
      case 1:
        {
          var mask = (1 << chrsz) - 1;
          $control_5 += 1;
          break;
        }
      case 4:
        {
          var bin = Array();
          $control_5 += -3;
          break;
        }
    }
  }
}
/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
  let $control_6 = 4;
  for (let $for_loop_6 = 0; $for_loop_6 < 4; $for_loop_6++) {
    switch ($control_6) {
      case 1:
        {
          for (var i = 0; i < bin.length * 32; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
          $control_6 += 2;
          break;
        }
      case 2:
        {
          var mask = (1 << chrsz) - 1;
          $control_6 += -1;
          break;
        }
      case 4:
        {
          var str = "";
          $control_6 += -2;
          break;
        }
      case 3:
        {
          return str;
          break;
        }
    }
  }
}
/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
  let $control_7 = 2;
  for (let $for_loop_7 = 0; $for_loop_7 < 4; $for_loop_7++) {
    switch ($control_7) {
      case 3:
        {
          for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
          }
          $control_7 += -2;
          break;
        }
      case 2:
        {
          var hex_tab = hexcase ? "\x30\x31\x32\x33\x34\x35\x36\x37\x38" + "\x39\x41\x42\x43\x44\x45\x46" : "\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65" + "\x66";
          $control_7 += 2;
          break;
        }
      case 4:
        {
          var str = "";
          $control_7 += -1;
          break;
        }
      case 1:
        {
          return str;
          break;
        }
    }
  }
}
/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
  let $control_8 = 2;
  for (let $for_loop_8 = 0; $for_loop_8 < 4; $for_loop_8++) {
    switch ($control_8) {
      case 1:
        {
          return str;
          break;
        }
      case 4:
        {
          var str = "";
          $control_8 += -1;
          break;
        }
      case 3:
        {
          for (var i = 0; i < binarray.length * 4; i += 3) {
            var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
            for (var j = 0; j < 4; j++) {
              if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
            }
          }
          $control_8 += -2;
          break;
        }
      case 2:
        {
          var tab = "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f" + "\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f";
          $control_8 += 2;
          break;
        }
    }
  }
}
function encryptParams(plainText) {
  var encrypted = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Utf8.parse("\x73\x65\x63\x32\x2d\x6c\x65\x73\x73\x6f\x6e\x36" + "\x2d\x6b\x65\x79"), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
function getSecureData(new_time) {
  return hex_md5(new_time);
}
$(document).ready(function () {
  let $control_10 = 8;
  for (let $for_loop_10 = 0; $for_loop_10 < 8; $for_loop_10++) {
    switch ($control_10) {
      case 5:
        {
          function renderPagination() {
            var totalPages = Math.ceil(totalItems / itemsPerPage);
            $("\x23\x70\x61" + "\x67\x69\x6e\x61\x74\x69\x6f\x6e").empty();
            for (var i = 1; i <= totalPages; i++) {
              $("\x23\x70\x61\x67\x69\x6e\x61\x74" + "\x69\x6f\x6e").append(("\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x6c\x69\x20" + "\x63\x6c\x61\x73\x73\x3d\x22\x70\x61\x67\x65\x2d\x69\x74\x65\x6d\x20").concat(i === currentPage ? "\x61\x63\x74\x69" + "\x76\x65" : "", "\x22\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x61\x20\x63\x6c" + "\x61\x73\x73\x3d\x22\x70\x61\x67\x65\x2d\x6c\x69\x6e\x6b\x22\x20\x68\x72\x65\x66\x3d\x22\x23\x22\x20\x64\x61\x74\x61\x2d\x70\x61\x67\x65\x3d\x22").concat(i, "\x22" + "\x3e").concat(i, "\x3c\x2f\x61\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20" + "\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x2f\x6c\x69\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20"));
            }
          }
          $control_10 += -1;
          break;
        }
      case 8:
        {
          var itemsPerPage = 5;
          $control_10 += -2;
          break;
        }
      case 1:
        {
          // Initial data fetch
          fetchData(currentPage);
          break;
        }
      case 2:
        {
          function fetchData(page) {
            let $control_9 = 2;
            for (let $for_loop_9 = 0; $for_loop_9 < 4; $for_loop_9++) {
              switch ($control_9) {
                case 1:
                  {
                    var serverData = navigator.userAgent + "\x2d" + EventSource + "" + "\x2d" + navigator.hardwareConcurrency;
                    $control_9 += 2;
                    break;
                  }
                case 4:
                  {
                    var secureData = getSecureData(new_time.toString());
                    $control_9 += -3;
                    break;
                  }
                case 3:
                  {
                    $.ajax({
                      url: "\x2f\x73\x65\x63\x32\x2f\x6c\x65\x73" + "\x73\x6f\x6e\x36\x5f\x64\x61\x74\x61\x5f\x61\x70\x69",
                      method: "\x50\x4f\x53" + "\x54",
                      data: {
                        limit: itemsPerPage,
                        secureData: encryptParams(page + "\x7c" + new_time + "\x7c" + secureData + "\x7c" + serverData)
                      },
                      success: function success(response) {
                        totalItems = response.total;
                        renderTable(response.data);
                        renderPagination();
                      },
                      error: function error(xhr, status, _error) {
                        console.error("\x45\x72\x72\x6f\x72\x20\x66\x65\x74\x63\x68" + "\x69\x6e\x67\x20\x64\x61\x74\x61\x3a", _error);
                      }
                    });
                    break;
                  }
                case 2:
                  {
                    var new_time = get_time_now();
                    $control_9 += 2;
                    break;
                  }
              }
            }
          }
          $control_10 += 1;
          break;
        }
      case 6:
        {
          var currentPage = 1;
          $control_10 += 1;
          break;
        }
      case 3:
        {
          function renderTable(data) {
            $("\x23" + "\x64\x61\x74\x61\x2d\x6c\x69\x73\x74").empty();
            data.forEach(function (item) {
              $("\x23\x64\x61\x74\x61\x2d\x6c\x69\x73" + "\x74").append(("\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20" + "\x20\x20\x20\x3c\x74\x72\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x74\x64\x3e").concat(item.id, "\x3c" + "\x2f\x74\x64\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x74\x64\x3e").concat(item.name, "\x3c\x2f\x74\x64\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20" + "\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x74\x64\x3e").concat(item.email, "\x3c\x2f\x74\x64\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20" + "\x20\x20\x20\x3c\x2f\x74\x72\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20"));
            });
          }
          $control_10 += 2;
          break;
        }
      case 7:
        {
          var totalItems = 0;
          $control_10 += -5;
          break;
        }
      case 4:
        {
          $("\x23\x70\x61\x67\x69\x6e\x61\x74" + "\x69\x6f\x6e").on("\x63\x6c\x69" + "\x63\x6b", "\x61", function (e) {
            e.preventDefault();
            var selectedPage = $(this).data("\x70" + "\x61\x67\x65");
            if (selectedPage !== currentPage) {
              currentPage = selectedPage;
              fetchData(currentPage);
            }
          });

          // Initial data fetch
          $control_10 += -3;
          break;
        }
    }
  }
});