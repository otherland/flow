(function() {
  var a = false;
  var e = /xyz/.test(function() {
  }) ? /\b_super\b/ : /.*/;
  this.Class = function() {
  };
  Class.extend = function(j) {
    function h() {
      if (!a) {
        if (this.init) {
          this.init.apply(this, arguments);
        }
      }
    }
    var f = this.prototype;
    a = true;
    var n = new this;
    a = false;
    var l;
    for (l in j) {
      n[l] = typeof j[l] == "function" && (typeof f[l] == "function" && e.test(j[l])) ? function(q, o) {
        return function() {
          var c = this._super;
          this._super = f[q];
          var g = o.apply(this, arguments);
          this._super = c;
          return g;
        };
      }(l, j[l]) : j[l];
    }
    h.prototype = n;
    h.prototype.constructor = h;
    h.extend = arguments.callee;
    return h;
  };
})();

(function() {
  function a(j) {
    var h = "    ";
    if (isNaN(parseInt(j))) {
      h = j;
    } else {
      switch(j) {
        case 1:
          h = " ";
          break;
        case 2:
          h = "  ";
          break;
        case 3:
          h = "   ";
          break;
        case 4:
          h = "    ";
          break;
        case 5:
          h = "     ";
          break;
        case 6:
          h = "      ";
          break;
        case 7:
          h = "       ";
          break;
        case 8:
          h = "        ";
          break;
        case 9:
          h = "         ";
          break;
        case 10:
          h = "          ";
          break;
        case 11:
          h = "           ";
          break;
        case 12:
          h = "            ";
      }
    }
    j = ["\n"];
    ix = 0;
    for (;ix < 100;ix++) {
      j.push(j[ix] + h);
    }
    return j;
  }
  function e() {
    this.step = "    ";
    this.shift = a(this.step);
  }
  e.prototype.xml = function(j, h) {
    var f = j.replace(/>\s{0,}</g, "><").replace(/</g, "~::~<").replace(/\s*xmlns\:/g, "~::~xmlns:").replace(/\s*xmlns\=/g, "~::~xmlns=").split("~::~");
    var n = f.length;
    var l = false;
    var q = 0;
    var o = "";
    var c = 0;
    var g = h ? a(h) : this.shift;
    c = 0;
    for (;c < n;c++) {
      if (f[c].search(/<!/) > -1) {
        o += g[q] + f[c];
        l = true;
        if (f[c].search(/--\>/) > -1 || (f[c].search(/\]>/) > -1 || f[c].search(/!DOCTYPE/) > -1)) {
          l = false;
        }
      } else {
        if (f[c].search(/--\>/) > -1 || f[c].search(/\]>/) > -1) {
          o += f[c];
          l = false;
        } else {
          if (/^<\w/.exec(f[c - 1]) && (/^<\/\w/.exec(f[c]) && /^<[\w:\-\.\,]+/.exec(f[c - 1]) == /^<\/[\w:\-\.\,]+/.exec(f[c])[0].replace("/", ""))) {
            o += f[c];
            if (!l) {
              q--;
            }
          } else {
            if (f[c].search(/<\w/) > -1 && (f[c].search(/<\//) == -1 && f[c].search(/\/>/) == -1)) {
              o = !l ? o += g[q++] + f[c] : o += f[c];
            } else {
              if (f[c].search(/<\w/) > -1 && f[c].search(/<\//) > -1) {
                o = !l ? o += g[q] + f[c] : o += f[c];
              } else {
                if (f[c].search(/<\//) > -1) {
                  o = !l ? o += g[--q] + f[c] : o += f[c];
                } else {
                  if (f[c].search(/\/>/) > -1) {
                    o = !l ? o += g[q] + f[c] : o += f[c];
                  } else {
                    o += f[c].search(/<\?/) > -1 ? g[q] + f[c] : f[c].search(/xmlns\:/) > -1 || f[c].search(/xmlns\=/) > -1 ? g[q] + f[c] : f[c];
                  }
                }
              }
            }
          }
        }
      }
    }
    return o[0] == "\n" ? o.slice(1) : o;
  };
  window.vkbeautify = new e;
})();

$.ajaxPrefilter(function(a) {
  if (a.WF_isForStaticResource !== true) {
    var e = a.url.charAt(0) === "/";
    if (typeof USER_ID !== "undefined") {
      if (e) {
        var j = "crosscheck_user_id=" + encodeURIComponent(USER_ID);
        a.data = "data" in a && (typeof a.data === "string" && a.data.length > 0) ? a.data + "&" + j : j;
      }
    }
  }
});

exports.localstorage_detect = function() {
  var a = null;
  var e = null;
  return{
    localStorageSupported : function() {
      if (a === null) {
        a = true;
        e = false;
        try {
          if (!("localStorage" in window)) {
            throw Error("No localStorage object.");
          }
          try {
            var j = window.localStorage;
          } catch (h) {
            e = true;
            throw Error("Permission denied accessing localStorage object.");
          }
          if (j === null) {
            throw Error("localStorage object is null.");
          }
          localStorage.setItem("localStorageTestKey", "dummy");
          if (localStorage.getItem("localStorageTestKey") !== "dummy") {
            throw Error("localStorage test key had wrong value when getItem called.");
          }
          localStorage.removeItem("localStorageTestKey");
        } catch (f) {
          a = false;
        }
      }
      return a;
    },
    permissionDeniedAccessingLocalStorage : function() {
      return e;
    }
  };
}();


exports.saveAs = function(a) {
  if (!(typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent))) {
    var e = a.document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    var j = "download" in e;
    var h = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);
    var f = a.webkitRequestFileSystem;
    var n = a.requestFileSystem || (f || a.mozRequestFileSystem);
    var l = function(p) {
      (a.setImmediate || a.setTimeout)(function() {
        throw p;
      }, 0);
    };
    var q = 0;
    var o = function(p) {
      var v = function() {
        if (typeof p === "string") {
          (a.URL || (a.webkitURL || a)).revokeObjectURL(p);
        } else {
          p.remove();
        }
      };
      if (a.chrome) {
        v();
      } else {
        setTimeout(v, 500);
      }
    };
    var c = function(p, v, r) {
      v = [].concat(v);
      var x = v.length;
      for (;x--;) {
        var u = p["on" + v[x]];
        if (typeof u === "function") {
          try {
            u.call(p, r || p);
          } catch (b) {
            l(b);
          }
        }
      }
    };
    var g = function(p) {
      if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(p.type)) {
        return new Blob(["\ufeff", p], {
          type : p.type
        });
      }
      return p;
    };
    var d = function(p, v, r) {
      if (!r) {
        p = g(p);
      }
      var x = this;
      r = p.type;
      var u = false;
      var b;
      var s;
      var m = function() {
        c(x, "writestart progress write writeend".split(" "));
      };
      var w = function() {
        if (s && (h && typeof FileReader !== "undefined")) {
          var F = new FileReader;
          F.onloadend = function() {
            var z = F.result;
            s.location.href = "data:attachment/file" + z.slice(z.search(/[,;]/));
            x.readyState = x.DONE;
            m();
          };
          F.readAsDataURL(p);
          x.readyState = x.INIT;
        } else {
          if (u || !b) {
            b = (a.URL || (a.webkitURL || a)).createObjectURL(p);
          }
          if (s) {
            s.location.href = b;
          } else {
            if (a.open(b, "_blank") == undefined && h) {
              a.location.href = b;
            }
          }
          x.readyState = x.DONE;
          m();
          o(b);
        }
      };
      var t = function(F) {
        return function() {
          if (x.readyState !== x.DONE) {
            return F.apply(this, arguments);
          }
        };
      };
      var y = {
        create : true,
        exclusive : false
      };
      var A;
      x.readyState = x.INIT;
      if (!v) {
        v = "download";
      }
      if (j) {
        b = (a.URL || (a.webkitURL || a)).createObjectURL(p);
        e.href = b;
        e.download = v;
        setTimeout(function() {
          var F = new MouseEvent("click");
          e.dispatchEvent(F);
          m();
          o(b);
          x.readyState = x.DONE;
        });
      } else {
        if (a.chrome && (r && r !== "application/octet-stream")) {
          A = p.slice || p.webkitSlice;
          p = A.call(p, 0, p.size, "application/octet-stream");
          u = true;
        }
        if (f && v !== "download") {
          v += ".download";
        }
        if (r === "application/octet-stream" || f) {
          s = a;
        }
        if (n) {
          q += p.size;
          n(a.TEMPORARY, q, t(function(F) {
            F.root.getDirectory("saved", y, t(function(z) {
              var D = function() {
                z.getFile(v, y, t(function(E) {
                  E.createWriter(t(function(G) {
                    G.onwriteend = function(B) {
                      s.location.href = E.toURL();
                      x.readyState = x.DONE;
                      c(x, "writeend", B);
                      o(E);
                    };
                    G.onerror = function() {
                      var B = G.error;
                      if (B.code !== B.ABORT_ERR) {
                        w();
                      }
                    };
                    "writestart progress write abort".split(" ").forEach(function(B) {
                      G["on" + B] = x["on" + B];
                    });
                    G.write(p);
                    x.abort = function() {
                      G.abort();
                      x.readyState = x.DONE;
                    };
                    x.readyState = x.WRITING;
                  }), w);
                }), w);
              };
              z.getFile(v, {
                create : false
              }, t(function(E) {
                E.remove();
                D();
              }), t(function(E) {
                if (E.code === E.NOT_FOUND_ERR) {
                  D();
                } else {
                  w();
                }
              }));
            }), w);
          }), w);
        } else {
          w();
        }
      }
    };
    var k = d.prototype;
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
      return function(p, v, r) {
        if (!r) {
          p = g(p);
        }
        return navigator.msSaveOrOpenBlob(p, v || "download");
      };
    }
    k.abort = function() {
      this.readyState = this.DONE;
      c(this, "abort");
    };
    k.readyState = k.INIT = 0;
    k.WRITING = 1;
    k.DONE = 2;
    k.error = k.onwritestart = k.onprogress = k.onwrite = k.onabort = k.onerror = k.onwriteend = null;
    return function(p, v, r) {
      return new d(p, v, r);
    };
  }
}(typeof self !== "undefined" && self || (typeof window !== "undefined" && window || this.content));

exports.LZString = {
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  _f : String.fromCharCode,
  compressToBase64 : function(a) {
    if (a == null) {
      return "";
    }
    var e = "";
    var j;
    var h;
    var f;
    var n;
    var l;
    var q;
    var o = 0;
    a = this.compress(a);
    for (;o < a.length * 2;) {
      if (o % 2 == 0) {
        j = a.charCodeAt(o / 2) >> 8;
        h = a.charCodeAt(o / 2) & 255;
        f = o / 2 + 1 < a.length ? a.charCodeAt(o / 2 + 1) >> 8 : NaN;
      } else {
        j = a.charCodeAt((o - 1) / 2) & 255;
        if ((o + 1) / 2 < a.length) {
          h = a.charCodeAt((o + 1) / 2) >> 8;
          f = a.charCodeAt((o + 1) / 2) & 255;
        } else {
          h = f = NaN;
        }
      }
      o += 3;
      n = j >> 2;
      j = (j & 3) << 4 | h >> 4;
      l = (h & 15) << 2 | f >> 6;
      q = f & 63;
      if (isNaN(h)) {
        l = q = 64;
      } else {
        if (isNaN(f)) {
          q = 64;
        }
      }
      e = e + this._keyStr.charAt(n) + this._keyStr.charAt(j) + this._keyStr.charAt(l) + this._keyStr.charAt(q);
    }
    return e;
  },
  decompressFromBase64 : function(a) {
    if (a == null) {
      return "";
    }
    var e = "";
    var j = 0;
    var h;
    var f;
    var n;
    var l;
    var q;
    var o;
    var c = 0;
    var g = this._f;
    a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    for (;c < a.length;) {
      f = this._keyStr.indexOf(a.charAt(c++));
      n = this._keyStr.indexOf(a.charAt(c++));
      q = this._keyStr.indexOf(a.charAt(c++));
      o = this._keyStr.indexOf(a.charAt(c++));
      f = f << 2 | n >> 4;
      n = (n & 15) << 4 | q >> 2;
      l = (q & 3) << 6 | o;
      if (j % 2 == 0) {
        h = f << 8;
        if (q != 64) {
          e += g(h | n);
        }
        if (o != 64) {
          h = l << 8;
        }
      } else {
        e += g(h | f);
        if (q != 64) {
          h = n << 8;
        }
        if (o != 64) {
          e += g(h | l);
        }
      }
      j += 3;
    }
    return this.decompress(e);
  },
  compressToUTF16 : function(a) {
    if (a == null) {
      return "";
    }
    var e = "";
    var j;
    var h;
    var f;
    var n = 0;
    var l = this._f;
    a = this.compress(a);
    j = 0;
    for (;j < a.length;j++) {
      h = a.charCodeAt(j);
      switch(n++) {
        case 0:
          e += l((h >> 1) + 32);
          f = (h & 1) << 14;
          break;
        case 1:
          e += l(f + (h >> 2) + 32);
          f = (h & 3) << 13;
          break;
        case 2:
          e += l(f + (h >> 3) + 32);
          f = (h & 7) << 12;
          break;
        case 3:
          e += l(f + (h >> 4) + 32);
          f = (h & 15) << 11;
          break;
        case 4:
          e += l(f + (h >> 5) + 32);
          f = (h & 31) << 10;
          break;
        case 5:
          e += l(f + (h >> 6) + 32);
          f = (h & 63) << 9;
          break;
        case 6:
          e += l(f + (h >> 7) + 32);
          f = (h & 127) << 8;
          break;
        case 7:
          e += l(f + (h >> 8) + 32);
          f = (h & 255) << 7;
          break;
        case 8:
          e += l(f + (h >> 9) + 32);
          f = (h & 511) << 6;
          break;
        case 9:
          e += l(f + (h >> 10) + 32);
          f = (h & 1023) << 5;
          break;
        case 10:
          e += l(f + (h >> 11) + 32);
          f = (h & 2047) << 4;
          break;
        case 11:
          e += l(f + (h >> 12) + 32);
          f = (h & 4095) << 3;
          break;
        case 12:
          e += l(f + (h >> 13) + 32);
          f = (h & 8191) << 2;
          break;
        case 13:
          e += l(f + (h >> 14) + 32);
          f = (h & 16383) << 1;
          break;
        case 14:
          e += l(f + (h >> 15) + 32, (h & 32767) + 32);
          n = 0;
      }
    }
    return e + l(f + 32);
  },
  decompressFromUTF16 : function(a) {
    if (a == null) {
      return "";
    }
    var e = "";
    var j;
    var h;
    var f = 0;
    var n = 0;
    var l = this._f;
    for (;n < a.length;) {
      h = a.charCodeAt(n) - 32;
      switch(f++) {
        case 0:
          j = h << 1;
          break;
        case 1:
          e += l(j | h >> 14);
          j = (h & 16383) << 2;
          break;
        case 2:
          e += l(j | h >> 13);
          j = (h & 8191) << 3;
          break;
        case 3:
          e += l(j | h >> 12);
          j = (h & 4095) << 4;
          break;
        case 4:
          e += l(j | h >> 11);
          j = (h & 2047) << 5;
          break;
        case 5:
          e += l(j | h >> 10);
          j = (h & 1023) << 6;
          break;
        case 6:
          e += l(j | h >> 9);
          j = (h & 511) << 7;
          break;
        case 7:
          e += l(j | h >> 8);
          j = (h & 255) << 8;
          break;
        case 8:
          e += l(j | h >> 7);
          j = (h & 127) << 9;
          break;
        case 9:
          e += l(j | h >> 6);
          j = (h & 63) << 10;
          break;
        case 10:
          e += l(j | h >> 5);
          j = (h & 31) << 11;
          break;
        case 11:
          e += l(j | h >> 4);
          j = (h & 15) << 12;
          break;
        case 12:
          e += l(j | h >> 3);
          j = (h & 7) << 13;
          break;
        case 13:
          e += l(j | h >> 2);
          j = (h & 3) << 14;
          break;
        case 14:
          e += l(j | h >> 1);
          j = (h & 1) << 15;
          break;
        case 15:
          e += l(j | h);
          f = 0;
      }
      n++;
    }
    return this.decompress(e);
  },
  compress : function(a) {
    if (a == null) {
      return "";
    }
    var e;
    var j;
    var h = {};
    var f = {};
    var n = "";
    var l = "";
    var q = "";
    var o = 2;
    var c = 3;
    var g = 2;
    var d = "";
    var k = 0;
    var p = 0;
    var v;
    var r = this._f;
    v = 0;
    for (;v < a.length;v += 1) {
      n = a.charAt(v);
      if (!Object.prototype.hasOwnProperty.call(h, n)) {
        h[n] = c++;
        f[n] = true;
      }
      l = q + n;
      if (Object.prototype.hasOwnProperty.call(h, l)) {
        q = l;
      } else {
        if (Object.prototype.hasOwnProperty.call(f, q)) {
          if (q.charCodeAt(0) < 256) {
            e = 0;
            for (;e < g;e++) {
              k <<= 1;
              if (p == 15) {
                p = 0;
                d += r(k);
                k = 0;
              } else {
                p++;
              }
            }
            j = q.charCodeAt(0);
            e = 0;
            for (;e < 8;e++) {
              k = k << 1 | j & 1;
              if (p == 15) {
                p = 0;
                d += r(k);
                k = 0;
              } else {
                p++;
              }
              j >>= 1;
            }
          } else {
            j = 1;
            e = 0;
            for (;e < g;e++) {
              k = k << 1 | j;
              if (p == 15) {
                p = 0;
                d += r(k);
                k = 0;
              } else {
                p++;
              }
              j = 0;
            }
            j = q.charCodeAt(0);
            e = 0;
            for (;e < 16;e++) {
              k = k << 1 | j & 1;
              if (p == 15) {
                p = 0;
                d += r(k);
                k = 0;
              } else {
                p++;
              }
              j >>= 1;
            }
          }
          o--;
          if (o == 0) {
            o = Math.pow(2, g);
            g++;
          }
          delete f[q];
        } else {
          j = h[q];
          e = 0;
          for (;e < g;e++) {
            k = k << 1 | j & 1;
            if (p == 15) {
              p = 0;
              d += r(k);
              k = 0;
            } else {
              p++;
            }
            j >>= 1;
          }
        }
        o--;
        if (o == 0) {
          o = Math.pow(2, g);
          g++;
        }
        h[l] = c++;
        q = String(n);
      }
    }
    if (q !== "") {
      if (Object.prototype.hasOwnProperty.call(f, q)) {
        if (q.charCodeAt(0) < 256) {
          e = 0;
          for (;e < g;e++) {
            k <<= 1;
            if (p == 15) {
              p = 0;
              d += r(k);
              k = 0;
            } else {
              p++;
            }
          }
          j = q.charCodeAt(0);
          e = 0;
          for (;e < 8;e++) {
            k = k << 1 | j & 1;
            if (p == 15) {
              p = 0;
              d += r(k);
              k = 0;
            } else {
              p++;
            }
            j >>= 1;
          }
        } else {
          j = 1;
          e = 0;
          for (;e < g;e++) {
            k = k << 1 | j;
            if (p == 15) {
              p = 0;
              d += r(k);
              k = 0;
            } else {
              p++;
            }
            j = 0;
          }
          j = q.charCodeAt(0);
          e = 0;
          for (;e < 16;e++) {
            k = k << 1 | j & 1;
            if (p == 15) {
              p = 0;
              d += r(k);
              k = 0;
            } else {
              p++;
            }
            j >>= 1;
          }
        }
        o--;
        if (o == 0) {
          o = Math.pow(2, g);
          g++;
        }
        delete f[q];
      } else {
        j = h[q];
        e = 0;
        for (;e < g;e++) {
          k = k << 1 | j & 1;
          if (p == 15) {
            p = 0;
            d += r(k);
            k = 0;
          } else {
            p++;
          }
          j >>= 1;
        }
      }
      o--;
      if (o == 0) {
        g++;
      }
    }
    j = 2;
    e = 0;
    for (;e < g;e++) {
      k = k << 1 | j & 1;
      if (p == 15) {
        p = 0;
        d += r(k);
        k = 0;
      } else {
        p++;
      }
      j >>= 1;
    }
    for (;;) {
      k <<= 1;
      if (p == 15) {
        d += r(k);
        break;
      } else {
        p++;
      }
    }
    return d;
  },
  decompress : function(a) {
    if (a == null) {
      return "";
    }
    var e = [];
    var j = 4;
    var h = 4;
    var f = 3;
    var n = "";
    var l = "";
    var q;
    var o;
    var c;
    var g;
    var d;
    var k = this._f;
    a = {
      string : a,
      val : a.charCodeAt(0),
      position : 32768,
      index : 1
    };
    l = 0;
    for (;l < 3;l += 1) {
      e[l] = l;
    }
    n = 0;
    c = Math.pow(2, 2);
    g = 1;
    for (;g != c;) {
      o = a.val & a.position;
      a.position >>= 1;
      if (a.position == 0) {
        a.position = 32768;
        a.val = a.string.charCodeAt(a.index++);
      }
      n |= (o > 0 ? 1 : 0) * g;
      g <<= 1;
    }
    switch(n) {
      case 0:
        n = 0;
        c = Math.pow(2, 8);
        g = 1;
        for (;g != c;) {
          o = a.val & a.position;
          a.position >>= 1;
          if (a.position == 0) {
            a.position = 32768;
            a.val = a.string.charCodeAt(a.index++);
          }
          n |= (o > 0 ? 1 : 0) * g;
          g <<= 1;
        }
        d = k(n);
        break;
      case 1:
        n = 0;
        c = Math.pow(2, 16);
        g = 1;
        for (;g != c;) {
          o = a.val & a.position;
          a.position >>= 1;
          if (a.position == 0) {
            a.position = 32768;
            a.val = a.string.charCodeAt(a.index++);
          }
          n |= (o > 0 ? 1 : 0) * g;
          g <<= 1;
        }
        d = k(n);
        break;
      case 2:
        return "";
    }
    q = l = e[3] = d;
    for (;;) {
      n = 0;
      c = Math.pow(2, f);
      g = 1;
      for (;g != c;) {
        o = a.val & a.position;
        a.position >>= 1;
        if (a.position == 0) {
          a.position = 32768;
          a.val = a.string.charCodeAt(a.index++);
        }
        n |= (o > 0 ? 1 : 0) * g;
        g <<= 1;
      }
      switch(d = n) {
        case 0:
          n = 0;
          c = Math.pow(2, 8);
          g = 1;
          for (;g != c;) {
            o = a.val & a.position;
            a.position >>= 1;
            if (a.position == 0) {
              a.position = 32768;
              a.val = a.string.charCodeAt(a.index++);
            }
            n |= (o > 0 ? 1 : 0) * g;
            g <<= 1;
          }
          e[h++] = k(n);
          d = h - 1;
          j--;
          break;
        case 1:
          n = 0;
          c = Math.pow(2, 16);
          g = 1;
          for (;g != c;) {
            o = a.val & a.position;
            a.position >>= 1;
            if (a.position == 0) {
              a.position = 32768;
              a.val = a.string.charCodeAt(a.index++);
            }
            n |= (o > 0 ? 1 : 0) * g;
            g <<= 1;
          }
          e[h++] = k(n);
          d = h - 1;
          j--;
          break;
        case 2:
          return l;
      }
      if (j == 0) {
        j = Math.pow(2, f);
        f++;
      }
      if (e[d]) {
        n = e[d];
      } else {
        if (d === h) {
          n = q + q.charAt(0);
        } else {
          return null;
        }
      }
      l += n;
      e[h++] = q + n.charAt(0);
      j--;
      q = n;
      if (j == 0) {
        j = Math.pow(2, f);
        f++;
      }
    }
  }
};
