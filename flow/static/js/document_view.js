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
var localstorage_detect = function() {
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
var LZString = {
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
var saveAs = saveAs || function(a) {
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
if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else {
  if (typeof define !== "undefined") {
    if (define !== null) {
      if (define.amd != null) {
        define([], function() {
          return saveAs;
        });
      }
    }
  }
}
var CLIENT_VERSION = 17;
var IS_WINDOWS = null;
var IS_MAC_OS = null;
var IS_LINUX = null;
var IS_CHROME_OS = null;
var WINDOW_ID = null;
var MOST_RECENTLY_OPENED_WINDOW_ID_KEY = "mostRecentlyOpenedWindowId";
var TIMEZONE_INFO = null;
var SHOW_COMPLETED = true;
var TIMEOUTS = {};
var CURRENTLY_ACTIVE_PAGE = null;
var DRAG_MODE = false;
var TRACK_TAG_COUNTS = true;
var WINDOW_FOCUSED = true;
var WORD_CHARS = "\\p{L}";
var WORD_CHARS_PLUS_DIGITS = WORD_CHARS + "\\p{Nd}";
var TEXT_ENTITY_BOUNDARY_CHARS = "[(),.!?';:\\/\\[\\]]";
var NAVIGABLE_PROJECTS_PATTERN = ".project:visible:not(.parent, .mainTreeRoot)";
var DROP_TARGET_PATTERN = NAVIGABLE_PROJECTS_PATTERN + ", .childrenEnd:visible";
var GLOBAL_NAVIGABLE_PROJECTS_PATTERN = ".page.active " + NAVIGABLE_PROJECTS_PATTERN;
var DO_NOT_INITIALIZE = false;
var READY_FOR_DOCUMENT_READY = false;
var DOCUMENT_READY_TRIGGERED = false;
var CONTENT_HTML_CONTAINER = null;
var SHORTCUT_KEYS = null;
var SHORTCUT_KEYS_WITH_META = null;
var SHORTCUT_KEYS_FOR_MOVING = null;
var SHORTCUT_KEYS_FOR_MOVING_WITH_META = null;
var FORMAT_FLAGS = null;
var LAST_CONTENT_FOCUS_TIMESTAMP = null;
var NUM_DELETED_ITEMS_NEEDED_FOR_DROPDOWN_MESSAGE = 10;
var LAST_UP_OR_DOWN_ARROW_IN_NAME_USED_DEFAULT_BEHAVIOR = false;
var USE_ANDROID_CHROME_BACKSPACE_HACK = null;
var USE_ANDROID_CHROME_ENTER_HACK = null;
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

function fetchInitializationData(callback, e) {
  if (e === undefined) {
    e = false;
  }
  var j = 5E3;
  var handleError = function() {
    if (e) {
      setTimeout(l, j);
      j = Math.min(j * 2, 6E5);
    } else {
      callback(null);
    }
  };
  var f = typeof PROJECT_TREE_DATA_URL_PARAMS !== "undefined" ? $.extend({}, PROJECT_TREE_DATA_URL_PARAMS) : {};
  f.client_version = !FULL_OFFLINE_ENABLED || IS_PACKAGED_APP ? CLIENT_VERSION : "newest";
  var ajaxData = {
    url : "/get_initialization_data?" + $.param(f),
    dataType : "json",
    success : function(data) {
      if (data == null) {
        handleError();
      } else {
        data.fetchedWithClientVersion = CLIENT_VERSION;
        callback(data);
      }
    },
    error : handleError
  };
  var l = function() {
    $.ajax(ajaxData);
  };
  l();
}
function doInitializationDataFetch() {
  fetchInitializationData(initializationDataFetchFinishedCallback);
}
function initializeLocalStorageAndGetInitializationData() {
  function a() {
    localstorage_helper.init();
    if (localstorage_helper.localStorageSupported()) {
      localstorage_helper.write(MOST_RECENTLY_OPENED_WINDOW_ID_KEY, WINDOW_ID);
    }
  }
  WINDOW_ID = date_time.getCurrentTimeInMS() + "-" + Math.random();
  a();
  doInitializationDataFetch();
}
function allJSFinishedLoadingCallback() {
  if (!DO_NOT_INITIALIZE) {
    initializeLocalStorageAndGetInitializationData();
  }
}
function initializationDataFetchFinishedCallback(data) {
    setupGlobalVariables(data)
}
function setupGlobalVariables(data) {
  try {
    if (data === null) {
      throw Error("Initialization data load failed.");
    }
    var j = data.globals;
    var h = data.projectTreeData;
    var f = data.settings;
    var n = 0;
    for (;n < j.length;n++) {
      var l = j[n];
      window[l[0]] = l[1];
    }
    USER_ID_AS_INT = parseInt(USER_ID);
    PROJECT_TREE_DATA = h;
    CLIENT_ID = PROJECT_TREE_DATA.clientId;
    MAIN_PROJECT_TREE_INFO = PROJECT_TREE_DATA.mainProjectTreeInfo;
    AUXILIARY_PROJECT_TREE_INFOS = PROJECT_TREE_DATA.auxiliaryProjectTreeInfos;
    var q;
    for (q in f) {
      if (q in SETTINGS) {
        SETTINGS[q].value = f[q];
      }
    }
    userstorage.init();

    READY_FOR_DOCUMENT_READY = true;
    if (DOCUMENT_READY_TRIGGERED) {
      documentReadyFunc();
    }
  } catch (k) {
    handleExceptionDuringInitialization(k);
  }
}
function documentReadyFunc() {

  DOCUMENT_READY_TRIGGERED = true;
  if (READY_FOR_DOCUMENT_READY) {
    try {
      utils.debugMessage("Debug mode ON");
      if (FULL_OFFLINE_ENABLED && (!IS_PACKAGED_APP && !localstorage_helper.localStorageSupported())) {
        throw Error("localStorage not supported in full-offline mode.");
      }
      $("#documentView").removeAttr("style");
      detectAndSetUpEnvironment();
      // TIMEZONE_INFO = jstz.determine_timezone().timezone;
      TIMEZONE_INFO = undefined;
      if (TIMEZONE_INFO === undefined) {
        utils.debugMessage("Failed to detect timezone!");
        SEND_TIMEZONE_TO_SERVER = false;
      } else {
        utils.debugMessage("Time zone: " + TIMEZONE_INFO.olson_tz);
      }
      FORMAT_FLAGS = new content_text.FormatFlags;
      $.ajaxSetup({
        timeout : 12E5
      });
      project_tree_object.initModule();
      project_tree.initializeProjectTrees(MAIN_PROJECT_TREE_INFO, AUXILIARY_PROJECT_TREE_INFOS);
      location_history.init();
      var a = createPage();
      a.addClass("active");
      a.setPositionAndDimensionsForPage();
      CURRENTLY_ACTIVE_PAGE = a;
      addEvents();
      initializeShowCompleted();
      selectAndSearchUsingLocation(location_history.getCurrentLocation());
      push_poll.init();

      if (IS_ANDROID) {
        if (!IS_CHROME) {
          showMessage('You are not using Chrome, which is our officially supported Android browser. <a href="https://play.google.com/store/apps/details?id=com.android.chrome">Download Chrome</a> for a much better experience.');
        }
      }
    } catch (j) {
      handleExceptionDuringInitialization(j);
    } finally {
        var h = IS_MOBILE ? 400 : 150;
        setTimeout(function() {
          $("#loadingScreen").fadeOut(h);
        }, 0);
    }
  }
}
$(document).ready(documentReadyFunc);
function handleExceptionDuringInitialization(a) {
  var e = String(a);
  utils.debugMessage("Error encountered during initialization: '" + e + "'");

  if (a instanceof userstorage.InitializationError) {
    setTimeout(function() {
      clearUserStorage(reloadPageFromServer);
    }, 250);
  } else {
    $("#pageContainer").hide();
    if (confirm('WorkFlowy encountered an error initializing.\n\nClick "OK" below to reload the page. If this error happens repeatedly, please email help@workflowy.com with the error message shown below (which you can copy-paste), as well as the name of the browser you are using.\n\nERROR: "' + e + '"\n\n(This error is usually caused by browser extensions, so we recommend checking if disabling any that you have installed solves the problem.)')) {
      setTimeout(reloadPageFromServer, 250);
    } else {
      throw a;
    }
  }
}
function detectAndSetUpEnvironment() {
  if (DEMO_MODE) {
    $.ajax = $.get = $.post = function() {
    };
  }
  IS_WINDOWS = IS_MAC_OS = IS_LINUX = false;
  var a = window.navigator.userAgent;
  if (a.match(/windows/i) !== null) {
    $("body").addClass("windows");
    IS_WINDOWS = true;
  } else {
    if (a.match(/mac os/i) !== null) {
      $("body").addClass("macos");
      IS_MAC_OS = true;
    } else {
      if (a.match(/linux/i) !== null) {
        $("body").addClass("linux");
        IS_LINUX = true;
      } else {
        if (a.match(/cros/i) !== null) {
          $("body").addClass("cros");
          IS_CHROME_OS = true;
        }
      }
    }
  }
  USE_ANDROID_CHROME_ENTER_HACK = USE_ANDROID_CHROME_BACKSPACE_HACK = false;
  if (IS_ANDROID) {
    a = a.match(/Chrome\/([0-9]+)/);
    var e = null;
    if (a !== null) {
      e = parseInt(a[1]);
      if (e < 39 || e >= 48) {
        USE_ANDROID_CHROME_BACKSPACE_HACK = true;
      }
      if (e >= 48) {
        USE_ANDROID_CHROME_ENTER_HACK = true;
      }
    }
    utils.debugMessage("Android Chrome major version: " + e);
  }
  APPCACHE_ENABLED = APPCACHE_ENABLED && ("applicationCache" in window && window.applicationCache !== null);
  if (IS_MOBILE) {
    TRACK_TAG_COUNTS = false;
  }
  if (IS_IE) {
    CONTENT_HTML_CONTAINER = $("#contentHtmlContainer");
  }
  SHORTCUT_KEYS = IS_WINDOWS || (IS_LINUX || IS_CHROME_OS) ? ["alt"] : ["ctrl"];
  SHORTCUT_KEYS_FOR_MOVING = IS_CHROME_OS ? ["ctrl"] : SHORTCUT_KEYS;
  SHORTCUT_KEYS_WITH_META = SHORTCUT_KEYS.concat(["meta"]);
  SHORTCUT_KEYS_FOR_MOVING_WITH_META = SHORTCUT_KEYS_FOR_MOVING.concat(["meta"]);
}
function selectOnActivePage(a) {
  a = a.split(",");
  var e = 0;
  for (;e < a.length;e++) {
    a[e] = ".page.active " + a[e];
  }
  return $(a.join(", "));
}
function getActivePage() {
  return CURRENTLY_ACTIVE_PAGE;
}
function createPage() {
  var a = $('<div class="page" style="transition: none;"><div class="pageStar"></div><div class="mainTreeRoot project open" projectid="None"><div class="name"><div class="content"></div><span class="parentArrow"></span></div><div class="notes"><div class="content"></div></div><div class="children"></div><div class="addButton" title="Add new item">+</div></div><div class="footer"><h3 class="siteSlogan"></h3></div><div class="bottomPadding"></div><div class="widgetContainer"></div></div>');
  $("#pageContainer").append(a);
  var e = a.css("transition");
  setTimeout(function() {
    if (a.css("transition") === e) {
      a.css("transition", "");
    }
  }, 0);
  return a;
}
jQuery.fn.setPositionAndDimensionsForPage = function() {
  var a = $(this);
  var e = $(window).width();
  var j = a.outerWidth() - a.width();
  if (IS_MOBILE) {
    var h = IS_TABLET ? 10 : 5;
    var f = e - 2 * h;
    e = h;
    j = f - j;
    setPagePositionAndDimensions(a, j, e);
  } else {
    f = Math.min(e, 700 + j);
    e = Math.max(Math.round((e - f) / 2), 0);
    j = f - j;
    setPagePositionAndDimensions(a, j, e);
  }
};
function setPagePositionAndDimensions(a, e, j) {
  var h = $(window).height();
  var f = Math.round(h * 0.2);
  h = Math.round(h * 1.1) - f;
  a.css({
    width : e + "px"
  });
  setPagePositionStyle(a, j, 0);
  a.find(".mainTreeRoot").css({
    minHeight : h + "px",
    paddingBottom : f + "px"
  });
}
function setPagePositionStyle(a, e, j) {
  var h = a[0];
  if (IS_MOBILE) {
    h.style.left = e + "px";
    h.style.top = j + "px";
  } else {
    dom_utils.setTransformStyleForElement(a[0], "translate(" + e + "px, " + j + "px)");
  }
}
function getPagePositionFromStyle(a) {
  a = a[0];
  return IS_MOBILE ? {
    x : a.style.left !== "" ? parseInt(a.style.left) : 0,
    y : a.style.top !== "" ? parseInt(a.style.top) : 0
  } : dom_utils.getTransformTranslateParametersFromStyle(a);
}
jQuery.fn.deletePages = function() {
  this.each(function() {
    var a = $(this);
    a.find(".mainTreeRoot").clearControlsUnderProject();
    if (tagging.getTagAutocompleter().isAttachedToPage(a)) {
      tagging.getTagAutocompleter().detach();
    }
    if (item_select.itemSelectionControlsAreUnderPage(a)) {
      item_select.clearItemSelection();
    }
    a.remove();
  });
};
function initializeShowCompleted() {
  var a = SHOW_COMPLETED_DEFAULT;
  if (localstorage_helper.localStorageSupported()) {
    var e = project_tree.mainLocalStorageKey("completedMode");
    e = localstorage_helper.read(e);
    if (e === "show") {
      a = true;
    } else {
      if (e === "hide") {
        a = false;
      }
    }
  }
  setShowCompleted(a);
}
jQuery.fn.overwriteProjectChildrenHtml = function(a) {
  var e = $(this);
  project_tree.getProjectReferenceFromDomProject(e).registerSubtreeRemovedFromDom(true);
  a = a();
  e.clearControlsUnderProject(true);
  e = e.children(".children");
  dom_utils.clearChildrenOfElement(e[0]);
  e.html(a);
};
function selectAndSearchUsingLocation(a) {
  var e = getCurrentlyFocusedContent();
  if (e !== null) {
    e.blur();
  }
  e = a.toProjectReference();
  if (e === null) {
    e = project_tree.getMainProjectTree().getRootProjectReference();
  }
  a = a.getSearchQuery();
  selectProjectReferenceInstantly(e);
  if (e = a !== null) {
    search.setSearchBoxAndSearch(a);
  } else {
    if (search.inSearchMode()) {
      search.cancelSearch();
    }
  }
  if (!location_history.restoreLastSavedClientViewStateForCurrentLocation()) {
    if (!e) {
      if (!IS_MOBILE) {
        focusFirstChildOfSelected();
      }
    }
    $(window).scrollTop(0);
  }
}
jQuery.fn.getChildren = function() {
  return $(this).children(".children").children(".project");
};
jQuery.fn.getVisibleChildren = function() {
  return $(this).getChildren().filter(":visible");
};
jQuery.fn.hasVisibleChildren = function() {
  return $(this).children(".children").children(".project:visible:first").length > 0;
};
jQuery.fn.getFirstVisibleChildOrChildrenEnd = function() {
  return $(this).children(".children").children(DROP_TARGET_PATTERN).first();
};
function getCurrentlyFocusedContent() {
  var a = $(document.activeElement);
  if (a.length !== 1 || !a.is(".content")) {
    return null;
  }
  if (window.getSelection().rangeCount === 0) {
    return null;
  }
  return a;
}
function getCurrentlyFocusedContentOrInput() {
  var a = $(document.activeElement);
  if (a.length !== 1 || !a.is(".content, input, .previewWindow")) {
    return null;
  }
  if (!a.is("input") && window.getSelection().rangeCount === 0) {
    return null;
  }
  return a;
}
jQuery.fn.selectIt = function(a, e) {
  if (a === undefined) {
    a = "first_child";
  }
  e = animations.getAnimationSpeed(e);
  var j = $(this);
  var h = project_tree.getProjectReferenceFromDomProject(j);
  hideControls();
  if (!j.is(".selected")) {
    var f = selectOnActivePage(".selected");
    var n = getCurrentlyFocusedContent();
    var l = null;
    var q = null;
    if (n !== null) {
      l = project_tree.getProjectReferenceFromDomProject(n.getProject());
      q = n.getCaret().start;
    }
    if (getCurrentlyFocusedContentOrInput() !== null) {
      blurFocusedContentOrInput();
    }
    var o = null;
    if (a === "first_child") {
      n = h.getPotentiallyVisibleChildren();
      if (n.length > 0) {
        o = n[0];
      } else {
        if (!h.isMainTreeRoot()) {
          o = h;
        }
      }
    } else {
      if (a === "last_selected") {
        o = project_tree.getProjectReferenceFromDomProject(f);
      }
    }
    n = function() {
      var x = j.getName();
      x.removeAttr("style");
      x.children(".content").removeAttr("style");
      f.getName().children(".content").removeAttr("style");
      f.getNotes().removeAttr("style");
      selectOnActivePage(".addButton").removeAttr("style");
      $(".nameAnimated").remove();
      location_history.setLocationModificationInProgress(true);
      if (search.inSearchMode()) {
        search.exitSearchMode();
      }
      h.constructProjectTreeAsSelected();
      saved_views.notifyViewChanged();
      h.setPageTitleAndFragmentPathForProject();
      location_history.setLocationModificationInProgress(false);
      var u = selectOnActivePage(".selected");
      u.addClass("highlighted");
      setTimeout(function() {
        u.removeClass("highlighted");
      }, 100);
      if (IS_MOBILE) {
        $(window).scrollTop(0);
      } else {
        if (o !== null) {
          x = l !== null ? l.getMatchingDomProject() : null;
          var b = o.getMatchingDomProject();
          if (b.length === 1) {
            if (e === "animate") {
              animations.getAnimationCounter().setContentToFocus(b.getName().children(".content"));
            }
            if (x !== null && b.filter(x).length > 0) {
              if (e === "animate") {
                animations.getAnimationCounter().setCaretPos(q);
              } else {
                b.children(".name").children(".content").setCaret(q);
              }
            } else {
              if (e !== "animate") {
                b.children(".name").moveCursorToBeginning();
              }
            }
            if (a !== "last_selected") {
              $(window).scrollTop(0);
            }
          }
        }
      }
    };
    if (e === "animate") {
      animations.getAnimationCounter().addCallback(n);
      n = [{
        project : j
      }, {
        project : f
      }];
      var c = selectOnActivePage(".mainTreeRoot");
      var g = c.getChildren();
      var d = c.attr("class");
      g.detach();
      h.constructProjectTreeAsSelected(false);
      var k = function(x) {
        var u = null;
        var b = null;
        x = x.getMatchingDomProject();
        if (x.length === 1) {
          b = x.getName().children(".content");
          if (b.is(":visible")) {
            u = b.offset();
          }
          b = {
            fontSize : b.css("fontSize"),
            lineHeight : b.css("lineHeight")
          };
        }
        return{
          offset : u,
          style : b
        };
      };
      var p = 0;
      for (;p < n.length;p++) {
        var v = n[p];
        var r = project_tree.getProjectReferenceFromDomProject(v.project);
        r = k(r);
        v.newOffset = r.offset;
        v.newStyle = r.style;
      }
      p = c.children(".children");
      p.html("");
      p.append(g);
      c.attr("class", d);
      p = 0;
      for (;p < n.length;p++) {
        v = n[p];
        d = v.project.getName().children(".content");
        d.css("visibility", "hidden");
        c = $('<div class="nameAnimated">' + d.html() + "</div>");
        getActivePage().append(c);
        c.css({
          position : "absolute",
          zIndex : 100,
          whiteSpace : d.css("whiteSpace"),
          fontSize : d.css("fontSize"),
          lineHeight : d.css("lineHeight")
        });
        if (v.newOffset === null) {
          c.offset(d.offset());
          v = {
            fontSize : "0px"
          };
        } else {
          c.offset(v.newOffset);
          g = c.position();
          if (d.is(":visible")) {
            c.offset(d.offset());
          } else {
            c.css({
              fontSize : "0px",
              lineHeight : "0px"
            });
          }
          v = v.newStyle;
          v.top = g.top;
          v.left = g.left;
        }
        c.incrementAnimationCounter().animate(v, animations.getAnimationTiming("zoom"), function() {
          animations.getAnimationCounter().decrement();
        });
      }
      n = f.getVisibleChildren();
      n.slice(0, 10).incrementAnimationCounter().slideUpWithoutMemoryLeaks(animations.getAnimationTiming("zoom"), function() {
        animations.getAnimationCounter().decrement();
      });
      if (n.length > 10) {
        n.slice(10).hideWithoutMemoryLeaks();
      }
      selectOnActivePage(".addButton").hideWithoutMemoryLeaks();
      if (f.hasClass("noted")) {
        f.children(".notes").incrementAnimationCounter().animate({
          opacity : 0
        }, animations.getAnimationTiming("zoom"), function() {
          animations.getAnimationCounter().decrement();
        });
      }
      n = j.find(".parent");
      if (j.is(".parent")) {
        n = n.add(j);
      }
      n.children(".name").incrementAnimationCounter().animate({
        fontSize : "0px"
      }, animations.getAnimationTiming("zoom"), function() {
        animations.getAnimationCounter().decrement();
      });
      j.addClass("highlighted");
    } else {
      n();
    }
  }
};
function selectProjectReferenceInstantly(a, e) {
  if (e === undefined) {
    e = false;
  }
  if (!e) {
    var j = selectOnActivePage(".selected");
    if (j.length === 1 && project_tree.getProjectReferenceFromDomProject(j).equals(a)) {
      var h = a.getAncestors();
      j = j.getAncestors();
      if (h.length == j.length) {
        var f = true;
        var n = 0;
        for (;n < h.length;n++) {
          var l = h[n];
          var q = j.eq(n);
          if (!l.equals(project_tree.getProjectReferenceFromDomProject(q))) {
            f = false;
            break;
          }
        }
        if (f) {
          return;
        }
      }
    }
  }
  utils.debugMessage("Rebuilding DOM project tree in selectProjectReferenceInstantly because selected/ancestors changed.");
  a.constructProjectTreeAsSelected();
  a.setPageTitleAndFragmentPathForProject();
  saved_views.notifyViewChanged();
}
function reconstructDomProjectTree() {
  project_tree.getProjectReferenceFromDomProject(selectOnActivePage(".selected")).constructProjectTreeAsSelected();
}
jQuery.fn.setExpanded = function(a) {
  var e = $(this);
  project_tree.getProjectReferenceFromDomProject(e).setExpanded(a);
  return this;
};
jQuery.fn.refreshExpanded = function() {
  this.each(function() {
    var a = $(this);
    if (!a.is(".mainTreeRoot")) {
      if (!a.is(".open")) {
        if (project_tree.getProjectReferenceFromDomProject(a).isExpanded()) {
          a.showChildren("instant");
        }
      }
    }
  });
  return this;
};
jQuery.fn.isHalfOpenSearchMatchAncestor = function() {
  var a = $(this);
  return shouldShowCompletedProjects() ? a.hasClass("halfOpenSearchMatchAncestorWhenCompletedVisible") : a.hasClass("halfOpenSearchMatchAncestorWhenCompletedHidden");
};
jQuery.fn.isFullyExpanded = function() {
  var a = $(this);
  return a.hasClass("open") && !a.isHalfOpenSearchMatchAncestor();
};
jQuery.fn.showChildren = function(a) {
  a = animations.getAnimationSpeed(a);
  this.each(function() {
    var e = $(this);
    var j = project_tree.getProjectReferenceFromDomProject(e);
    e.addClass("open");
    var h = e.isHalfOpenSearchMatchAncestor();
    if (h) {
      e.removeClass("halfOpenSearchMatchAncestorWhenCompletedVisible halfOpenSearchMatchAncestorWhenCompletedHidden");
    }
    if (!e.is(".parent, .selected")) {
      j.setIsExpandedInDom(true);
      if (h && a !== "instant") {
        var f = $(project_tree.getProjectReferencesFromDomProjects(e.getVisibleChildren()))
      }
      e.overwriteProjectChildrenHtml(function() {
        var q = j.constructChildProjectTreeHtmls();
        return global_project_tree_object.constructChildren(q);
      });
      if (a !== "instant") {
        e.addClass("animatingShowChildren");
        var n = e.getVisibleChildren();
        var l = h ? n.filter(function(q, o) {
          var c = project_tree.getProjectReferenceFromDomProject($(o));
          return!(f.filter(function(g, d) {
            return c.equals(d);
          }).length > 0);
        }) : n;
        animations.getAnimationCounter().addCallback(function() {
          e.removeClass("animatingShowChildren");
          l.removeAttr("style");
        });
        l.hideWithoutMemoryLeaks();
        l.slice(0, 30).incrementAnimationCounter().slideDown(animations.getAnimationTiming("children"), function() {
          animations.getAnimationCounter().decrement();
        });
      }
    }
  });
  return this;
};
jQuery.fn.hideChildren = function(a) {
  a = animations.getAnimationSpeed(a);
  this.each(function() {
    var e = $(this);
    var j = project_tree.getProjectReferenceFromDomProject(e);
    if (e.is(".parent, .selected")) {
      e.removeClass("open");
    } else {
      var h = function() {
        e.removeClass("open");
        j.setIsExpandedInDom(false);
        e.overwriteProjectChildrenHtml(function() {
          return global_project_tree_object.constructChildren([]);
        });
      };
      if (a == "instant") {
        h();
      } else {
        e.children(".children").incrementAnimationCounter().slideUpWithoutMemoryLeaks(animations.getAnimationTiming("children"), function() {
          $(this).removeAttr("style");
          h();
          animations.getAnimationCounter().decrement();
        });
      }
    }
  });
  return this;
};
jQuery.fn.getProject = function() {
  return $(this).closest(".project");
};
jQuery.fn.getParent = function() {
  return $(this).parent(".children").parent(".project");
};
jQuery.fn.getAncestors = function() {
  var a = this;
  var e = [];
  for (;!a.is(".mainTreeRoot");) {
    a = a.getParent();
    e = e.concat(a.get());
  }
  return $(e);
};
jQuery.fn.getPriority = function() {
  var a = $(this);
  if (a.is(".childrenEnd")) {
    a = a.getParent();
    return project_tree.getProjectReferenceFromDomProject(a).getChildren().length;
  } else {
    return project_tree.getProjectReferenceFromDomProject(a).getPriority();
  }
};
function getCompletedProjectsToAnimate() {
  var a = selectOnActivePage(".selected > .children > .project.done, .selected > .children > .project.completedDescendantMatches:not(.matches,.uncompletedDescendantMatches), .selected .project.open:visible > .children > .project.done, .selected .project.open:visible > .children > .project.completedDescendantMatches:not(.matches,.uncompletedDescendantMatches)");
  a = a.filter(":visible");
  return a = a.slice(0, 10);
}
function showCompleted(a) {
  a = animations.getAnimationSpeed(a);
  setShowCompleted(true);
  var e = operations.saveClientViewState();
  blurFocusedContent();
  reconstructDomProjectTree();
  var j = function() {
    if (!IS_MOBILE) {
      operations.restoreClientViewState(e, {
        scrollToFocusBehavior : "doNotScroll"
      });
    }
  };
  if (a !== "instant") {
    animations.getAnimationCounter().addCallback(j);
    a = getCompletedProjectsToAnimate();
    a.hideWithoutMemoryLeaks();
    a.incrementAnimationCounter().slideDown(animations.getAnimationTiming("children"), function() {
      $(this).removeAttr("style");
      animations.getAnimationCounter().decrement();
    });
  } else {
    j();
  }
}
function hideCompleted(a) {
  function e() {
    var n = null;
    if (f !== null) {
      var l = f.getProject();
      if (!l.is(":visible")) {
        var q = l.getPreviousProject();
        if (q.filter(l).length === 0) {
          n = project_tree.getProjectReferenceFromDomProject(q);
        }
      }
    }
    reconstructDomProjectTree();
    if (!IS_MOBILE) {
      if (n !== null) {
        q = n.getMatchingDomProject();
        if (q.length === 1) {
          if (q.is(":visible")) {
            q.getName().children(".content").setCaret(0, 0, "doNotScroll");
          }
        }
      } else {
        operations.restoreClientViewState(h, {
          scrollToFocusBehavior : "doNotScroll"
        });
      }
    }
  }
  a = animations.getAnimationSpeed(a);
  var j = getCompletedProjectsToAnimate();
  setShowCompleted(false);
  var h = operations.saveClientViewState();
  var f = getCurrentlyFocusedContent();
  if (a !== "instant" && j.length > 0) {
    animations.getAnimationCounter().addCallback(e);
    j.show();
    j.incrementAnimationCounter().slideUpWithoutMemoryLeaks(animations.getAnimationTiming("children"), function() {
      $(this).removeAttr("style");
      animations.getAnimationCounter().decrement();
    });
  } else {
    e();
  }
}
function setShowCompleted(a) {
  SHOW_COMPLETED = a;
  if (!search.inSearchMode()) {
    if (localstorage_helper.localStorageSupported()) {
      var e = project_tree.mainLocalStorageKey("completedMode");
      localstorage_helper.write(e, a ? "show" : "hide");
    }
  }
  if (a) {
    getActivePage().addClass("showCompleted");
    $(".showCompletedButton .show").hide();
    $(".showCompletedButton .hide").show();
  } else {
    getActivePage().removeClass("showCompleted");
    $(".showCompletedButton .show").show();
    $(".showCompletedButton .hide").hide();
  }
}
function shouldShowCompletedProjects() {
  return SHOW_COMPLETED;
}
function toggleCompletedVisibility() {
  if (shouldShowCompletedProjects()) {
    hideCompleted();
  } else {
    showCompleted();
  }
}
jQuery.fn.getLastSavedContentText = function() {
  var a = $(this);
  var e = project_tree.getProjectReferenceFromDomProject(a.getProject());
  return a.isName() ? e.getName() : e.getNote();
};
jQuery.fn.contentChanged = function() {
  var a = $(this);
  var e = a.getLastSavedContentText();
  return content_text.getTextForContent(a) !== e;
};
jQuery.fn.saveContent = function(a) {
  if (a === undefined) {
    a = false;
  }
  var e = $(this);
  var j = project_tree.getProjectReferenceFromDomProject(e.getProject());
  if (j.isValid()) {
    if (!j.isReadOnly()) {
      if (e.contentChanged()) {
        var h = e.isName();
        var f = e.getContentText();
        e = h ? f : null;
        h = !h ? f : null;
        if (!a) {
          undo_redo.startOperationBatch(true);
        }
        j.applyLocalEdit(e, h);
        if (!a) {
          undo_redo.finishOperationBatch();
        }
      }
    }
  }
};
jQuery.fn.focusProject = function() {
  var a = $(this);
  var e = a.getName().children(".content");
  var j = a.getNotes().children(".content");
  var h = getCurrentlyFocusedContent();
  if (!(h !== null && (h[0] === e[0] || h[0] === j[0]))) {
    a.getName().moveCursorToBeginning();
  }
};
jQuery.fn.setContentHtml = function(a) {
  $(this).html(a);
};
jQuery.fn.setContentHtmlAsUserEdit = function(a) {
  var e = $(this);
  e.setContentHtml(a);
  setSaveTimer(e);
};
jQuery.fn.getContentText = function() {
  var a = $(this);
  return content_text.getTextForContent(a);
};
jQuery.fn.setContentText = function(a, e) {
  var j = $(this);
  if (e === undefined) {
    e = j.isNote();
  }
  var h = !e && j.getProject().hasClass("parent");
  j.setContentHtml(content_text.getContentHtml(a, e, null, h));
};
jQuery.fn.setContentTextAsUserEdit = function(a, e) {
  var j = $(this);
  if (e === undefined) {
    e = j.isNote();
  }
  j.setContentText(a, e);
  setSaveTimer(j);
};
jQuery.fn.setAndSaveContentText = function(a) {
  var e = $(this);
  e.setContentText(a);
  e.saveContent(true);
};
jQuery.fn.updateContentHtmlAfterUserEdit = function() {
  var a = $(this);
  var e = a.isNote();
  var j = a.html();
  var h = new content_text.ContentText(a, e);
  var f = h.getContentHtml();
  if (USE_ANDROID_CHROME_ENTER_HACK) {
    var n = false;
    a.find("div").each(function() {
      if ($(this).attr("class") === "") {
        n = true;
      }
    });
  }
  var l = j === f;
  if (IS_IE && !l) {
    CONTENT_HTML_CONTAINER.html(f);
    l = CONTENT_HTML_CONTAINER.html();
    CONTENT_HTML_CONTAINER.html("");
    l = j === l;
  }
  if (!l) {
    j = getCurrentlyFocusedContent();
    if (j = j !== null && j[0] === a[0]) {
      var q = a.getCaret()
    }
    a.setContentHtml(f);
    if (j) {
      a.setCaret(q.start, q.end);
    }
  }
  tagging.getTagAutocompleter().updateDisplay(a);
  if (USE_ANDROID_CHROME_ENTER_HACK && n) {
    setTimeout(function() {
      var o = getCurrentlyFocusedContent();
      if (o !== null) {
        if (o[0] === a[0]) {
          a.returnHandler();
        }
      }
    }, 0);
  } else {
    if (USE_ANDROID_CHROME_BACKSPACE_HACK) {
      if (!e) {
        if (!h.originalContentContainsBeginningMarkerChar()) {
          setTimeout(function() {
            var o = getCurrentlyFocusedContent();
            if (o !== null) {
              if (o[0] === a[0]) {
                a.backspaceHandler();
              }
            }
          }, 0);
        }
      }
    }
  }
};
function addEvents() {
  $(".dialogCloseButton").live("click", function() {
    $(this).closest(".ui-dialog-content").dialog("close");
  });
  $("#site_message .closeButton").click(function() {
    $("#site_message").slideUp();
  });
  window.onbeforeunload = function() {
    saveEditingContent();
    if (project_tree.getAllProjectTreesHelper().haveUnsavedData()) {
      push_poll.scheduleNextPushAndPoll(true);
      return "You have unsaved changes. Do you want to leave this page and discard your changes?";
    }
  };
  $(window).bind("resize", function() {
    getActivePage().setPositionAndDimensionsForPage();
    search.notifyWindowResized();
    item_select.notifyWindowResized();
  });
  $.address.externalChange(function() {
    location_history.notifyExternalFragmentChange();
    selectAndSearchUsingLocation(location_history.getCurrentLocation());
  });
  if (IS_ANDROID) {
    if ("hidden" in document) {
      var a = "hidden";
      var e = "visibilitychange";
    } else {
      a = "webkitHidden";
      e = "webkitvisibilitychange";
    }
    $(document).bind(e, function() {
      var h = document[a];
      if (h && WINDOW_FOCUSED) {
        windowBlurHandler();
      } else {
        if (!h) {
          if (!WINDOW_FOCUSED) {
            windowFocusHandler();
          }
        }
      }
    });
  } else {
      $(window).focus(windowFocusHandler);
      $(window).blur(windowBlurHandler);
  }
  $(".saveButton.saveNow").clickOrTapHandler({
    event : function() {
      push_poll.scheduleNextPushAndPoll(true);
    },
    mousedown : function() {
      return false;
    }
  });
  if (IS_MOBILE) {
    $("#controlsLeft").bind("touchstart", function() {
      if (event.target === this) {
        return false;
      }
    });
    $("#controlsLeft a.complete").tapHandler(null, function() {
      var h = $("#controls").getProject();
      h.completeIt();
      blurFocusedContentOrInput();
      h.addClass("tapped");
      setTimeout(function() {
        h.removeClass("tapped");
      }, 250);
      return false;
    });
    $("#controlsLeft a.note").tapHandler(function() {
      return false;
    }, function() {
      if (getCurrentlyFocusedContent() !== null) {
        var h = $("#controls").getProject();
        var f = h.getNotes();
        if (getCurrentlyFocusedContent()[0] === f.children(".content")[0]) {
          h.editName();
        } else {
          h.editNote();
        }
        return false;
      }
    });
    $("#controlsLeft #moveMobile span").tapHandler(function() {
      var h = $(this);
      if (!h.hasClass("disabled")) {
        h.addClass("tapped");
      }
    }, function() {
      var h = $(this);
      if (h.hasClass("disabled")) {
        return false;
      }
      var f = $("#controls").getProject();
      if (h.hasClass("indent")) {
        f.indentProjects();
      } else {
        if ($(this).hasClass("outdent")) {
          f.outdentProjects();
        }
      }
      return false;
    }, false);
  }
  if (!IS_MOBILE) {
    $("#controlsLeft > .note").click(function() {
      $(this).getProject().editNote();
      hideControls();
    });
    $("#controlsLeft > .complete").click(function() {
      $(this).getProject().completeIt();
    });
    $("#controlsLeft > .share").click(function() {
      $(this).getProject().showSharePopup();
      hideControls();
    });
    $("#controlsLeft .export").click(function() {
      $(this).getProject().exportIt();
      hideControls();
    });
    $("#controlsLeft .duplicate").click(function() {
      var h = $(this).getProject();
      var f = h.getNextSibling(true);
      h.duplicateIt(f);
      hideControls();
    });
    $("#controlsLeft .delete").click(function() {
      $(this).getProject().deleteIt();
    });
    $("#controlsLeft a").click(function() {
      TIMEOUTS.highlight = setTimeout(function() {
        selectOnActivePage(".highlighted").removeClass("highlighted");
      }, 300);
    });
  }
  if (!IS_MOBILE) {
    jQuery.fn.initiateHideHoverControls = function() {
      var h = $(this).getProject();
      var f = h.children(".name").find("#controlsLeft");
      h.removeClass("highlighted");
      clearTimeout(TIMEOUTS.showControls);
      TIMEOUTS.hideHoverControls = setTimeout(function() {
        f.removeClass("hovered");
      }, 1);
    };
    jQuery.fn.initiateShowHoverControls = function() {
      var h = $(this).getProject();
      if (!(DRAG_MODE || h.isContainedWithinItemSelection())) {
        selectOnActivePage(".highlighted").removeClass("highlighted");
        if (!h.is(".selected")) {
          h.addClass("highlighted");
        }
        clearTimeout(TIMEOUTS.hideHoverControls);
        TIMEOUTS.showControls = setTimeout(function() {
          if (h.is(":visible")) {
            h.showControls();
          }
        }, 500);
      }
    };
    $(".page.active .bullet").live("mouseenter", function() {
      $(this).initiateShowHoverControls();
    }).live("mouseleave", function() {
      $(this).initiateHideHoverControls();
    });
    $("#controlsLeft").mouseenter(function() {
      var h = $(this).getProject();
      selectOnActivePage(".highlighted").removeClass("highlighted");
      h.addClass("highlighted");
      clearTimeout(TIMEOUTS.hideHoverControls);
    }).mouseleave(function() {
      $(this).initiateHideHoverControls();
    });
    $(".page.active .selected .name").live("mouseenter", function() {
      $(this).placeControls();
    }).live("mouseleave", function() {
      TIMEOUTS.hideControls = setTimeout(function() {
        hideControls();
      }, 50);
    });
    $(".page.active .selected:not(.mainTreeRoot) > .name").live("mouseenter", function() {
      $(this).initiateShowHoverControls();
    }).live("mouseleave", function() {
      $(this).initiateHideHoverControls();
    });
  }
  jQuery.fn.placeControls = function() {
    var h = $(this);
    var f = h.getProject();
    clearTimeout(TIMEOUTS.hideControls);
    if (!(DRAG_MODE || f.isContainedWithinItemSelection())) {
      f = h.children("#controls");
      if (f.length === 0) {
        f = $("#controls");
        f.children("#controlsLeft").removeClass("hovered");
        if (project_tree.getProjectReferenceFromDomProject(h.getProject()).isReadOnly()) {
          f.addClass("readOnly");
        } else {
          f.removeClass("readOnly");
        }
        h.append(f);
        clearTimeout(TIMEOUTS.hideHoverControls);
      }
    }
  };
  jQuery.fn.showControls = function() {
    var h = $(this);
    var f = project_tree.getProjectReferenceFromDomProject(h);
    f = f.isReadOnly() && !f.isAddedSubtreePlaceholder();
    if (IS_MOBILE) {
      l = h.children(".name");
      l.placeControls();
      q = l.children("#controls");
      l = q.find(".outdent");
      var n = q.find(".indent");
      l.add(n).removeClass("disabled");
      if (h.getNewNextProjectOrChildrenEndForOutdent() === null) {
        l.addClass("disabled");
      }
      if (h.getNewNextProjectOrChildrenEndForIndent() === null) {
        n.addClass("disabled");
      }
      if (!IS_ANDROID) {
        q.offset({
          top : $("body").scrollTop(),
          left : 0
        });
      }
      q.width($(window).width());
      h = $("#controlsLeft");
      h.addClass("hovered");
      if (f) {
        h.removeClass("hovered");
      }
    } else {
      if (f) {
        return;
      }
      var l = h.children(".name");
      l.placeControls();
      var q = l.find("#controlsLeft");
      q.fadeIn(50, function() {
        $(this).removeAttr("style");
      });
      q.addClass("hovered");
    }
  };
  if (IS_MOBILE) {
    $("body").bind("touchstart", function(h) {
      $(this).dataWithoutMemoryLeaks("touchMove", false);
      if (DRAG_MODE) {
        h.preventDefault();
        h.stopPropagation();
      }
    }).bind("touchmove", function() {
      $(this).dataWithoutMemoryLeaks("touchMove", true);
    }).bind("touchend", function(h) {
      var f = $(this).dataWithoutMemoryLeaks("touchMove") === true;
      $(this).removeDataWithoutMemoryLeaks("touchMove");
      if (DRAG_MODE) {
        h.preventDefault();
        h.stopPropagation();
      } else {
        var n = $(h.target);
        if (!f && (getCurrentlyFocusedContentOrInput() !== null && n.closest("#controls, .content, input, button, .addButton, .parentArrow, .bullet, #searchCancel").length === 0)) {
          blurFocusedContentOrInput();
          h.preventDefault();
        }
      }
    });
    $(window).scroll(function() {
      clearTimeout(TIMEOUTS.scroll);
      TIMEOUTS.scroll = setTimeout(function() {
        if (IS_IOS) {
          $(".tapped").removeClass("tapped");
        }
        var h = getCurrentlyFocusedContent();
        if (h !== null) {
          if (h.isOnScreen()) {
            if (!IS_ANDROID) {
              h.getProject().showControls();
            }
          } else {
            if (!IS_ANDROID || date_time.getCurrentTimeInMS() - LAST_CONTENT_FOCUS_TIMESTAMP > 1500) {
              blurFocusedContentOrInput();
            }
          }
        }
      }, 10);
    });
    $(".page.active .selected .content").tapHandler(moving.setupMobileDragging, function(h) {
      var f = $(this);
      var n = f.getProject();
      if (!(READ_ONLY_MAIN_TREE || n.is(".mainTreeRoot"))) {
        if ($(h.target).closest(".contentTag, .contentLink").length === 0) {
          n = getCurrentlyFocusedContentOrInput();
          if (n !== null) {
            if (n[0] === f[0]) {
              return;
            } else {
              blurFocusedContentOrInput();
              return false;
            }
          }
          if (IS_MOBILE) {
            h = h.originalEvent.changedTouches[0];
            var l = f.findCaretPositionForTouch(h.pageX, h.pageY);
            if (IS_ANDROID) {
              setTimeout(function() {
                f.setCaret(l);
              }, 0);
            } else {
              f.setCaret(l);
            }
            return false;
          }
        }
      }
    }, false);
  }
  if (IS_MOBILE) {
    $(".page.active .parent > .name").tapHandler(null, function() {
      $(this).getProject().selectIt();
      return false;
    });
    $(".page.active .selected .project .parentArrow").tapHandler(null, function() {
      var h = $(this).getProject();
      blurFocusedContentOrInput();
      h.clickExpandButton();
      return false;
    }, true, "delay");
  }
  e = $(".page.active .selected .content .contentTag");
  e.clickOrTapHandler({
    untapBehavior : "never",
    mousedown : function() {
      return false;
    },
    event : function(h) {
      function f() {
        var x = $('<div class="contentTagAnimated">' + l + "</div>");
        $("#documentView").append(x);
        x.css({
          fontSize : n.css("fontSize"),
          lineHeight : n.css("lineHeight")
        });
        x.offset($("#searchBox").offset());
        var u = x.position();
        x.offset(n.offset());
        x.animate({
          top : u.top,
          left : u.left,
          opacity : "0.5"
        }, animations.getAnimationTiming("zoom"), function() {
          $(this).remove();
          search.toggleTagInCurrentSearch(l);
        });
      }
      var n = $(this);
      var l = n.text();
      if (tagging.tagDeleteModifierDown(h)) {
        h = n.closest(".content");
        var q = h.isNote();
        var o = h.getProject();
        if (project_tree.getProjectReferenceFromDomProject(o).isReadOnly()) {
          return false;
        }
        q = new content_text.ContentText(h, q);
        o = dom_utils.getTextInNodeBefore(h[0], n[0], 0).text.length;
        var c = q.getPlainText().substring(o).match(RegExp("^" + l + "[ \t]*"));
        if (c === null) {
          return false;
        }
        c = c[0].length;
        q = q.substring(0, o).concatenate(q.substring(o + c));
        var g = n.css("fontSize");
        var d = n.css("lineHeight");
        c = Math.ceil(l.length / 20);
        var k = "";
        var p = 0;
        for (;p < l.length;p += c) {
          var v = l.substring(p, p + c);
          k += "<span>" + v + "</span>";
        }
        c = $(k);
        n.replaceWith(c);
        var r = $("#documentView");
        c.each(function() {
          var x = $(this);
          var u = x.offset();
          x = $('<div class="contentTagPiece">' + x.text() + "</div>");
          r.append(x);
          x.css({
            fontSize : g,
            lineHeight : d
          });
          x.offset(u);
          u = x.position();
          x.animate({
            top : u.top + 100 * (1 - 2 * Math.random()),
            left : u.left + 100 * (1 - 2 * Math.random()),
            opacity : "0.7"
          }, 200, "linear", function() {
            $(this).remove();
          });
        });
        undo_redo.startOperationBatch();
        h.setAndSaveContentText(q.getText());
        h.setCaret(o);
        undo_redo.finishOperationBatch();
        return false;
      }
      blurFocusedContentOrInput();
      if (search.tagIsInCurrentSearch(l)) {
        search.toggleTagInCurrentSearch(l);
        return false;
      }
      if (IS_IOS) {
        setTimeout(function() {
          f();
        }, 1);
      } else {
        f();
      }
      return false;
    }
  });
  e.live("mouseenter", function(h) {
    var f = $(this);
    if (tagging.tagDeleteModifierDown(h)) {
      f.addClass("contentTagDeleteHover");
    }
  }).live("mouseleave", function() {
    $(this).removeClass("contentTagDeleteHover");
  });
  $(".page.active .selected .content .contentLink").clickOrTapHandler({
    mousedown : function() {
      return false;
    },
    cancelTapOnMove : true,
    event : function(h) {
      var f = $(this);
      var n = f.attr("href");
      blurFocusedContentOrInput();
      if (!h.ctrlKey && !h.metaKey) {
        var l = function(o) {
          var c = o.indexOf("#");
          if (c === -1) {
            c = o.length;
          }
          return[o.substring(0, c), o.substring(c)];
        };
        var q = l(n);
        h = q[0];
        q = q[1];
        l = l(window.location.href)[0];
        if (h === l) {
          window.location.href = n;
          return false;
        }
      }
      if (f.is(".contentLink--image")) {
        window.open(n)
      } else {
          window.open(n);
      }
      return false;
    }
  });
  $(".showCompletedButton").clickOrTapHandler({
    event : function() {
      toggleCompletedVisibility();
      return false;
    },
    mousedown : function() {
      return false;
    }
  });
    $("#logo").clickOrTapHandler({
      event : function() {
        if (!animations.animationsAreInProgress()) {
          var h = selectOnActivePage(".mainTreeRoot");
          if (h.is(".selected")) {
            search.cancelSearch();
          } else {
            $(this).transition({
              rotateY : "360deg"
            }, 250, function() {
              $(this).removeAttr("style");
            });
            h.selectIt();
          }
        }
      }
    }).dblclick(function() {
      var h = selectOnActivePage(".mainTreeRoot");
      if (h.is(".selected")) {
        h.expandOrCollapseAllDescendantsOfProjectToggle();
        dom_utils.clearSelection();
      }
    });
  if (!IS_MOBILE) {
    $(".page.active .project.parent > .name > .content").live("click", function(h) {
      var f = $(this).getProject();
      if (!(h.ctrlKey || h.metaKey)) {
        f.selectIt();
        return false;
      }
    });
    $(".page.active .selected > .name > .content").live("dblclick", function(h) {
      var f = $(this);
      var n = f.getProject();
      if (!($(h.target).closest(".contentTag, .contentLink").length > 0)) {
        n.expandOrCollapseAllDescendantsOfProjectToggle();
        f.setCaret(0);
        return false;
      }
    });
  }
  if (IS_MOBILE) {
    $(".page.active .bullet").tapHandler(function() {
      $(this).getProject().addClass("tapped");
    }, function() {
      $(this).getProject().selectIt();
      return false;
    }, true, "never", function(h) {
      h.getProject().removeClass("tapped");
    });
  } else {
    $("#expandButton").live("click", function() {
      $(this).clickExpandButton(true);
      return false;
    });
    $(".page.active .bullet").live("mouseenter", function() {
      var h = $(this);
      var f = h.getProject();
      if (DRAG_MODE || f.isContainedWithinItemSelection()) {
        h.removeAttr("title");
      } else {
        var n = project_tree.getProjectReferenceFromDomProject(h.getProject());
        f = n.getLastModifiedDateString();
        var l = n.getCompletedDateString();
        var q = n.getLastModifiedByUserId();
        var o = n = null;
        if (l !== null) {
          n = "Completed: " + l;
        }
        if (l === null || l !== f) {
          o = "Last changed: " + f;
        }
        if (q !== USER_ID_AS_INT) {
          if (o !== null) {
            o += " (by collaborator)";
          } else {
            if (n !== null) {
              n += " (by collaborator)";
            }
          }
        }
        f = "";
        if (n !== null) {
          f += n;
        }
        if (o !== null) {
          if (f.length > 0) {
            f += ", \n";
          }
          f += o;
        }
        h.attr("title", f);
      }
    }).live("mousedown", function(h) {
      var f = $(this);
      f.dataWithoutMemoryLeaks("preDragClick", true);
      if (h.button === 0) {
        if (!(h.ctrlKey || h.metaKey)) {
          var n = h.altKey;
          var l = f.getProject();
          var q = l.isContainedWithinItemSelection();
          var o = q ? item_select.getSelectedItems() : l;
          var c = n ? o : filterReadOnlyProjects(o, true);
          if (c.filter(l).length === 0 && (!q || c.filter(l.getItemSelectedContainer()).length === 0)) {
            return false;
          }
          l.initiateHideHoverControls();
          var g = h.clientX;
          var d = h.clientY;
          $(window).bind("mousemove.bulletDrag", function(k) {
            if (Math.sqrt(Math.pow(k.clientX - g, 2) + Math.pow(k.clientY - d, 2)) >= 3) {
              $(window).unbind(".bulletDrag");
              f.removeDataWithoutMemoryLeaks("preDragClick");
              moving.startDesktopDragging(l, c, h, q, n);
            }
          }).bind("mouseup.bulletDrag", function() {
            $(window).unbind(".bulletDrag");
          });
          return false;
        }
      }
    }).live("click", function(h) {
      var f = $(this);
      var n = f.getProject();
      if (f.dataWithoutMemoryLeaks("preDragClick") !== true) {
        h.preventDefault();
      } else {
        if (n.isContainedWithinItemSelection()) {
          item_select.clearItemSelection();
          h.preventDefault();
        } else {
          if (!(h.ctrlKey || h.metaKey)) {
            n.selectIt();
            h.preventDefault();
          }
        }
      }
    });
    var j = function(h) {
      if (!h.hasVisibleChildren()) {
        return false;
      }
      h = h.getParent();
      if (!project_tree.getProjectReferenceFromDomProject(h).canCreateChild()) {
        return false;
      }
      return true;
    };
    $(".page.active .addSiblingButton").live("click", function() {
      var h = $(this);
      var f = h.getProject();
      if (j(f)) {
        if (!h.hasClass("clicked")) {
          h.addClass("clicked");
          h = f.getParent();
          f = f.getPriority() + 1;
          undo_redo.startOperationBatch();
          createNewProject(h, f).getName().moveCursorToBeginning();
          undo_redo.finishOperationBatch();
        }
      }
    }).live("mouseenter", function() {
      var h = $(this);
      var f = h.getProject();
      if (j(f)) {
        h.addClass("hovered");
        h.attr("title", "Add sibling item");
      }
    }).live("mouseleave", function() {
      var h = $(this);
      h.removeClass("hovered");
      h.removeClass("clicked");
    });
  }
  $("a.undelete").live("click", function() {
    undo_redo.undoLastDeleteTriggeringDropdown();
    return false;
  });
  $("#message > .close").click(function() {
    hideMessage();
  });
  $("a.refresh").live("click", function() {
    reloadPageFromServer();
    return false;
  });
  if (!IS_MOBILE) {
    $(".page.active .mainTreeRoot").live("click", function(h) {
      if ($(h.target).hasClass("mainTreeRoot")) {
        if (item_select.getSelectedItems().length > 0) {
          return false;
        }
        h = selectOnActivePage(".selected .project:visible:last");
        if (h.length === 1) {
          h.getName().moveCursorToEnd();
        } else {
          if (!search.inSearchMode()) {
            selectOnActivePage(".selected").appendChildProject();
          }
        }
        return false;
      }
    });
  }
  if (IS_MOBILE) {
    $(".page.active .addButton").tapHandler(null, function() {
      selectOnActivePage(".selected").appendChildProject();
      return false;
    });
  } else {
    $(".page.active .addButton").live("click", function() {
      selectOnActivePage(".selected").appendChildProject();
      return false;
    });
  }
  addContentInteractionEventHandlers($(".page.active .selected .content"));
  addGlobalKeyboardShortcuts();

  $("#exportPopup").dialog({
    autoOpen : false,
    width : 550,
    buttons : {
      Close : function() {
        $(this).dialog("close");
      }
    },
    modal : false,
    position : ["center", 150],
    title : "Export List",
    close : function() {
      clearExportPopup();
    }
  });
  $("#sharePopup").dialog({
    autoOpen : false,
    width : 750,
    modal : true,
    position : ["center", 200],
    title : "Share list"
  });
  $(".ui-dialog-titlebar-close").live("mousedown", function() {
    return false;
  });
  e = $("#reloadAppCacheButton");
  if (e.length === 1) {
    e.clickOrTapHandler({
      event : function() {
        forceReloadAppCache();
        return false;
      }
    });
  }


  $("#exportAllButton").click(function() {
    $(".page.active .mainTreeRoot").exportIt(true);
    return false;
  });
  $("#printButton").click(function() {
    setTimeout(function() {
      window.print();
    }, 1);
  });
  $("#addSharedSubtreeToMyAccountButton").click(function() {
    addSharedSubtreeToAccount();
  });
  $("#addSharedSubtreeToMyAccountPopup").dialog({
    autoOpen : false,
    width : 500,
    modal : true,
    position : ["center", 200],
    title : "Add shared list"
  });
  if (APPCACHE_ENABLED) {
    appcache_helper.init();
  }
  search.init();
  moving.init();
  item_select.init();
  sharing.init();

  (function(){
    $.ajax({
      url : "/get_settings",
      dataType : "json",
      success : function(g) {
        if (g != null) {
          if (userstorage.isEnabled()) {
            userstorage.updateSettingsFromServer(g);
          }
        }
      }
    });
  })()
  undo_redo.init();
  exporting.init();
  saved_views.init();
}
function windowFocusHandler() {
  WINDOW_FOCUSED = true;
  $("body").removeClass("windowBlurred");
  $(".content.focusedButWindowBlurred").removeClass("focusedButWindowBlurred");
  if (localstorage_helper.localStorageSupported()) {
    localstorage_helper.notifyWindowFocus();
  }
  if (!push_poll.pushPollAlreadyScheduled()) {
    push_poll.scheduleNextPushAndPoll(false, true, true);
  }
  push_poll.updateLastSyncedStrings();
  location_history.notifyWindowFocus();
}
function windowBlurHandler() {
  WINDOW_FOCUSED = false;
  $("body").addClass("windowBlurred");
    saved_views.updateModifierKeyStatus(false, false);
}
function clearUserStorage(a) {
  if (userstorage.isEnabled()) {
    userstorage.clear(a);
  } else {
    a();
  }
}
jQuery.fn.findCaretPositionForTouch = function(a, e) {
  function j(m) {
    m = Math.floor((m - o.top) / c);
    if (m < 0) {
      m = 0;
    } else {
      if (m > g - 1) {
        m = g - 1;
      }
    }
    return m;
  }
  function h(m) {
    f.setContentHtml(r.getContentHtml(m));
    var w = f.find(".contentCaret").offset();
    var t = j(w.top - c / 2);
    if (t < k) {
      return true;
    } else {
      if (t > k) {
        return false;
      } else {
        w = d.left - w.left;
        t = Math.abs(w);
        if (v < 0 || t < p) {
          v = m;
          p = t;
        }
        return w > 0;
      }
    }
  }
  var f = $(this);
  var n = f.isNote();
  var l = false;
  var q = getCurrentlyFocusedContent();
  if (n && (!f.getProject().hasClass("selected") && (q !== null && q[0] !== f[0]))) {
    f.addClass("showAsEditing");
    l = true;
  }
  var o = f.offset();
  var c = parseInt(f.css("lineHeight"));
  var g = f.height() / c;
  var d = {
    left : a,
    top : e
  };
  var k = l ? 0 : j(d.top);
  var p = -1;
  var v = -1;
  q = f.html();
  var r = new content_text.ContentText(f, n);
  n = r.getPlainText();
  var x = 0;
  var u = n.length;
  var b = 0;
  for (;x <= u;) {
    var s = b === 0 ? n.length : Math.floor((x + u) / 2);
    if (h(s)) {
      x = s + 1;
    } else {
      u = s - 1;
    }
    b++;
  }
  f.setContentHtml(q);
  if (l) {
    f.removeClass("showAsEditing");
  }
  return v;
};
jQuery.fn.scrollToViewProjectForMobile = function() {
  var a = $(this);
  var e = $("#controlsLeft").outerHeight();
  $("body").animate({
    scrollTop : a.offset().top - e * 2
  }, 200);
};
jQuery.fn.clickExpandButton = function(a, e) {
  if (a === undefined) {
    a = false;
  }
  if (e === undefined) {
    e = false;
  }
  var j = $(this);
  var h = j.getProject();
  if (!h.is(".task")) {
    var f = h.isFullyExpanded();
    var n = null;
    if (a) {
      var l = date_time.getCurrentTimeInMS();
      var q = j.dataWithoutMemoryLeaks("lastClick");
      var o = j.dataWithoutMemoryLeaks("openOnLastClick");
      var c = j.dataWithoutMemoryLeaks("lastClickFinished");
      j.dataWithoutMemoryLeaks("lastClick", l);
      j.dataWithoutMemoryLeaks("openOnLastClick", f);
      j.removeDataWithoutMemoryLeaks("lastClickFinished");
      setTimeout(function() {
        if (j.dataWithoutMemoryLeaks("lastClick") === l) {
          j.dataWithoutMemoryLeaks("lastClickFinished", date_time.getCurrentTimeInMS());
        }
      }, 1);
      if (q !== undefined && (c !== undefined && l - c < 250 || l - q < 250)) {
        n = o ? "collapse" : "expand";
      }
    }
    q = h.getName();
    if (n !== null) {
      if (!e) {
        q.moveCursorToBeginning();
      }
      if (n === "expand") {
        h.expandOrCollapseAllDescendantsOfProject(true);
      } else {
        h.expandOrCollapseAllDescendantsOfProject(false);
      }
    } else {
      if (!e) {
        n = q.children(".content");
        animations.getAnimationCounter().setContentToFocus(n);
      }
      if (f) {
        h.hideChildren().setExpanded(false);
      } else {
        if (search.inSearchMode()) {
          f = project_tree.getProjectReferenceFromDomProject(h);
          search.registerFullyExpandedItemForCurrentSearch(f);
        }
        h.showChildren().setExpanded(true);
      }
    }
  }
};
jQuery.fn.expandOrCollapseAllDescendantsOfProject = function(a) {
  var e = $(this);
  project_tree.getProjectReferenceFromDomProject(e).expandOrCollapseAllDescendants(a);
  e = e.getChildren().not(".task");
  if (a) {
    e.showChildren("instant");
  } else {
    e.hideChildren("instant");
  }
};
jQuery.fn.expandOrCollapseAllDescendantsOfProjectToggle = function() {
  var a = $(this);
  if (a.find(".project:not(.open,.task)").length > 0) {
    a.expandOrCollapseAllDescendantsOfProject(true);
  } else {
    a.expandOrCollapseAllDescendantsOfProject(false);
  }
};
jQuery.fn.appendChildProject = function() {
  var a = $(this);
  if (project_tree.getProjectReferenceFromDomProject(a).canCreateChild()) {
    var e = a.children(".children").children(".childrenEnd").getPriority();
    undo_redo.startOperationBatch();
    a = createNewProject(a, e);
    a.getName().moveCursorToBeginning();
    if (IS_MOBILE) {
      a = a.offset().top - 50;
      $(window).scrollTop(a);
    }
    undo_redo.finishOperationBatch();
  }
};
jQuery.fn.editNote = function() {
  var a = $(this).getProject();
  a.addClass("noted");
  a = a.getNotes();
  a.moveCursorToEnd();
  if (!IS_MOBILE) {
    a.scrollToBeOnScreen("down");
  }
};
jQuery.fn.editName = function() {
  $(this).getProject().getName().moveCursorToEnd();
};
jQuery.fn.getName = function() {
  return $(this).children(".name");
};
jQuery.fn.getNotes = function() {
  return $(this).children(".notes");
};
jQuery.fn.projectIsEmpty = function() {
  var a = $(this);
  return(new content_text.ContentText(a.getName().children(".content"), false)).isEmpty() && ((new content_text.ContentText(a.getNotes().children(".content"), true)).isEmpty() && (a.hasClass("task") && !a.hasClass("shared")));
};
jQuery.fn.projectIsMergable = function(a) {
  var e = $(this);
  var j = project_tree.getProjectReferenceFromDomProject(e);
  var h = e.hasClass("shared");
  var f = e.hasClass("done");
  var n = a.hasClass("done");
  return e.hasClass("task") && ((new content_text.ContentText(e.getNotes().children(".content"), true)).isEmpty() && (!h && (!f && (!j.isReadOnly() && !(n && (!f && (new content_text.ContentText(a.getName().children(".content"), false)).isEmpty()))))));
};
jQuery.fn.caretAtEndOfText = function(a) {
  if (a === undefined) {
    a = false;
  }
  var e = $(this);
  var j = e.getCaret();
  if (j.start !== j.end) {
    return false;
  }
  e = content_text.getPlainTextForContent(e);
  a = a ? e.replace(/\s*$/, "").length : e.length;
  return j.start >= a;
};
jQuery.fn.caretAtBeginningOfText = function() {
  var a = $(this).getCaret();
  if (a.start !== a.end) {
    return false;
  }
  return a.start === 0;
};
jQuery.fn.focusHandler = function() {
  var a = $(this);
  item_select.notifyContentFocused(a);
  if (IS_MOBILE) {
    LAST_CONTENT_FOCUS_TIMESTAMP = date_time.getCurrentTimeInMS();
    push_poll.hideOfflineNotice();
    $("#shared_notice").hide();
    a.getProject().showControls();
  }
};
jQuery.fn.blurHandler = function() {
  var a = $(this);
  var e = a.getProject();
  var j = a.isNote();
  clearTimeout(TIMEOUTS.saveTimer);
  TIMEOUTS.saveTimer = null;
  a.saveContent();
  var h = function(n) {
    var l = getCurrentlyFocusedContent();
    if (!(l !== null && l[0] == n[0])) {
      if (!n.hasClass("copyOrPasteInProgress")) {
        if (!n.hasClass("focusedButWindowBlurred")) {
          if ((new content_text.ContentText(a, j)).isEmpty()) {
            e.removeClass("noted");
          }
        }
      }
    }
  };
  var f = getCurrentlyFocusedContent();
  if (f !== null && f[0] === a[0]) {
    if (!IS_MOBILE && j) {
      a.addClass("focusedButWindowBlurred");
      setTimeout(function() {
        if (WINDOW_FOCUSED) {
          a.removeClass("focusedButWindowBlurred");
          h(a);
        }
      }, 0);
    }
  } else {
    FORMAT_FLAGS.clear();
  }
  if (j) {
    h(a);
  }
  tagging.getTagAutocompleter().detach();
  if (IS_MOBILE) {
    setTimeout(function() {
      var n = getCurrentlyFocusedContent();
      if (n === null || n[0] !== a[0]) {
        a.removeAttr("contenteditable");
      }
    }, 0);
  }
  if (IS_MOBILE) {
    hideControls();
    push_poll.unhideOfflineNotice();
    $("#shared_notice").show();
  }
};
jQuery.fn.clickOrTapHandler = function(a) {
  a = $.extend({
    touchstart : false,
    mousedown : false,
    event : null,
    untapBehavior : "touchend",
    useBind : false,
    neverPreventScrolling : false,
    cancelTapOnMove : false
  }, a);
  var e = $(this);
  if (IS_MOBILE) {
    e.tapHandler(a.touchstart, a.event, true, a.untapBehavior, null, a.useBind, a.neverPreventScrolling, a.cancelTapOnMove);
  } else {
    if (a.useBind) {
      e.bind("click", a.event);
      if (a.mousedown) {
        e.bind("mousedown", a.mousedown);
      }
    } else {
      e.live("click", a.event);
      if (a.mousedown) {
        e.live("mousedown", a.mousedown);
      }
    }
  }
  return this;
};
jQuery.fn.tapHandler = function(a, e, j, h, f, n, l, q) {
  function o(d, k) {
    if (n) {
      g.bind(d, k);
    } else {
      g.live(d, k);
    }
  }
  function c(d) {
    d.removeClass("tapped");
    if (f !== null) {
      f(d);
    }
  }
  if (j === undefined) {
    j = true;
  }
  if (h === undefined) {
    h = "touchend";
  }
  if (f === undefined) {
    f = null;
  }
  if (n === undefined) {
    n = false;
  }
  if (l === undefined) {
    l = false;
  }
  if (q === undefined) {
    q = false;
  }
  var g = $(this);
  o("touchstart", function(d) {
    var k = $(this);
    if (j) {
      k.addClass("tapped");
    }
    k.dataWithoutMemoryLeaks("touchMove", false);
    var p = d.originalEvent.touches[0];
    k.dataWithoutMemoryLeaks("firstTouch", {
      screenX : p.screenX,
      screenY : p.screenY
    });
    var v = k.offset();
    p = v.top - $(document).scrollTop();
    var r = p + k.outerHeight();
    v = v.left;
    var x = v + k.outerWidth();
    k.dataWithoutMemoryLeaks("touchStartClientBounds", {
      top : p,
      bottom : r,
      left : v,
      right : x
    });
    p = k.closest(".page").length === 1 && k.closest("#controls").length === 0;
    if (l) {
      p = true;
    }
    if (!p) {
      d.preventDefault();
    }
    k.dataWithoutMemoryLeaks("isOnPage", p);
    if (typeof a === "function") {
      return a.call(k[0], d);
    }
  });
  o("touchmove", function(d) {
    var k = $(this);
    if (IS_ANDROID && k.dataWithoutMemoryLeaks("isOnPage") === true) {
      k.dataWithoutMemoryLeaks("touchMove", true);
      c(k);
    } else {
      d = d.originalEvent.targetTouches[0];
      var p = k.dataWithoutMemoryLeaks("touchStartClientBounds");
      if (d.clientX < p.left || (d.clientX >= p.right || (d.clientY < p.top || d.clientY >= p.bottom))) {
        k.dataWithoutMemoryLeaks("touchMove", true);
        c(k);
      }
      if (q) {
        p = k.dataWithoutMemoryLeaks("firstTouch");
        if (Math.pow(Math.pow(d.screenX - p.screenX, 2) + Math.pow(d.screenY - p.screenY, 2), 0.5) > 20) {
          k.dataWithoutMemoryLeaks("touchMove", true);
        }
      }
    }
  });
  o("touchend", function(d) {
    var k = $(this);
    var p = k.dataWithoutMemoryLeaks("touchMove") === true;
    k.removeDataWithoutMemoryLeaks("touchMove");
    k.removeDataWithoutMemoryLeaks("touchStartClientBounds");
    k.removeDataWithoutMemoryLeaks("firstTouch");
    if (!p) {
      if (h === "touchend") {
        c(k);
      } else {
        if (h === "delay") {
          setTimeout(function() {
            c(k);
          }, 200);
        }
      }
      return e.call(this, d);
    }
  });
  o("touchcancel", function() {
    var d = $(this);
    d.removeDataWithoutMemoryLeaks("touchMove");
    d.removeDataWithoutMemoryLeaks("touchStartClientBounds");
    d.removeDataWithoutMemoryLeaks("firstTouch");
    c(d);
  });
};
jQuery.fn.tapIt = function(a) {
  if (a === undefined) {
    a = "normal";
  }
  var e = $(this);
  a = a === "fast" ? 100 : 250;
  e.addClass("tapped");
  setTimeout(function() {
    e.removeClass("tapped");
  }, a);
};
function createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(a) {
  return function(e) {
    if (saved_views.HUDIsVisible()) {
      e.preventDefault();
    } else {
      return a.call(this, e);
    }
  };
}
function addContentInteractionEventHandlers(a) {
  function e(l, q) {
    if (q === undefined) {
      q = false;
    }
    var o = q ? function(c) {
      return c.isInReadOnlyTree();
    } : function(c) {
      return c.isReadOnly();
    };
    return function(c) {
      var g = $(this).getProject();
      g = project_tree.getProjectReferenceFromDomProject(g);
      if (o(g)) {
        return false;
      }
      return l.call(this, c);
    };
  }
  a.live("focus", function() {
    $(this).focusHandler();
  });
  a.live("blur", function() {
    $(this).blurHandler();
  });
  a.live("click", function() {
    tagging.getTagAutocompleter().detach();
  });
  a.live("keydown", $.fn.keyDownHandler);
  a.live("keypress", $.fn.keyPressHandler);
  a.live("cut", function() {
    var l = $(this);
    var q = l.getProject();
    if (project_tree.getProjectReferenceFromDomProject(q).isReadOnly()) {
      return false;
    }
    l.handleCutInContent();
  });
  a.live("copy", function() {
    $(this).handleCopyInContent();
  });
  if (!IS_IE) {
    a.live("input", function() {
      var l = $(this);
      setSaveTimer(l);
      if (IS_IOS && IOS_VERSION < 7) {
        setTimeout(function() {
          l.updateContentHtmlAfterUserEdit();
        }, 0);
      } else {
        l.updateContentHtmlAfterUserEdit();
      }
    });
  }
  var j = key_events.enableKeyEvents(a);
  j.addHandler("keydown", "down", createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler($.fn.downArrowHandler));
  j.addHandler("keydown", "up", createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler($.fn.upArrowHandler));
  j.addHandler("keydown", "left", createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler($.fn.leftArrowHandler));
  j.addHandler("keydown", "right", createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler($.fn.rightArrowHandler));
  j.addHandler("keydown", "ctrl+p", function(l) {
    return $(this).upArrowHandler(l, true);
  });
  j.addHandler("keydown", "ctrl+n", function(l) {
    return $(this).downArrowHandler(l, true);
  });
  j.addHandler("keydown", "ctrl+d", e(function() {
    var l = $(this);
    var q = new content_text.ContentText(l, true);
    var o = l.getCaret();
    var message = date_time.dateToDateTimeString(new Date())
    q = q.insertAtCaret(message, o);
    l.setContentTextAsUserEdit(q.getText());
    l.setCaret(o.start + message.length);
    return false;
  }));
  if (!USE_ANDROID_CHROME_ENTER_HACK) {
    j.addHandler("keydown", "return", createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler($.fn.returnHandler));
  }
  j.addHandler("keydown", "shift+return", e(function() {
    var l = $(this);
    if (l.isName()) {
      l.editNote();
    } else {
      l.editName();
    }
    return false;
  }));
  j.addHandlerForShortcuts("keydown", "shift+backspace", ["ctrl", "meta"], e(function() {
    $(this).getProject().deleteIt();
    return false;
  }));
  j.addHandlerForShortcuts("keydown", "return", ["ctrl", "meta"], createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(e(function() {
    $(this).getProject().completeIt();
    return false;
  })));
  j.addHandler("keydown", "alt+return", function() {
    return false;
  });
  j.addHandler("keydown", "ctrl+shift+return", function() {
    return false;
  });
  jQuery.fn.backspaceHandler = e(function() {
    var l = $(this);
    var q = l.getProject();
    var o = project_tree.getProjectReferenceFromDomProject(q);
    var c = l.isNote();
    var g = new content_text.ContentText(l, c);
    if (c) {
      if (g.isEmpty()) {
        q.children(".name").moveCursorToEnd();
        return false;
      }
    } else {
      c = l.getCaret();
      if (!(q.is(".selected") || (c.start != 0 || c.start != c.end))) {
        var d = q.getPreviousProject();
        var k = d.projectIsMergable(q);
        if (d.is(".selected") || (d.filter(q).length != 0 || (d.getParent().filter(q.getParent()).length == 0 || !k))) {
          if (q.projectIsEmpty() && !o.isReadOnly()) {
            q.deleteIt();
            return false;
          } else {
            return;
          }
        }
        undo_redo.startOperationBatch();
        o = new content_text.ContentText(d.getName().children(".content"), false);
        g = o.concatenate(g);
        q.getName().children(".content").setAndSaveContentText(g.getText());
        d.deleteIt(true);
        g = o.getPlainText().length;
        if (USE_ANDROID_CHROME_BACKSPACE_HACK) {
          if (g === c.start) {
            l.blur();
          }
        }
        l.setCaret(g);
        if (IS_MOBILE) {
          q.scrollToViewProjectForMobile();
        }
        undo_redo.finishOperationBatch();
        return false;
      }
    }
  });
  if (!USE_ANDROID_CHROME_BACKSPACE_HACK) {
    j.addHandler("keydown", "backspace", $.fn.backspaceHandler);
  }
  j.addHandler("keydown", "del", e(function() {
    var l = $(this);
    var q = l.getProject();
    var o = l.isNote();
    if (!o) {
      var c = new content_text.ContentText(l, o);
      o = c.getPlainText();
      l = l.getCaret();
      if (!(q.is(".selected") || (l.start != o.length || l.start != l.end))) {
        l = q.getNextProject();
        var g = project_tree.getProjectReferenceFromDomProject(l);
        var d = q.projectIsMergable(l);
        if (!(l.filter(q).length != 0 || (l.getParent().filter(q.getParent()).length == 0 || (!d || g.isReadOnly())))) {
          undo_redo.startOperationBatch();
          l = l.getName().children(".content");
          g = new content_text.ContentText(l, false);
          q.deleteIt(true);
          q = c.concatenate(g);
          l.setAndSaveContentText(q.getText());
          l.setCaret(o.length);
          undo_redo.finishOperationBatch();
          return false;
        }
      }
    }
  }));
  j.addHandler("keydown", "tab", e(function() {
    var l = $(this);
    if (tagging.getTagAutocompleter().autocompleteSelectedTag(l)) {
      return false;
    }
    if (l.isNote()) {
      var q = new content_text.ContentText(l, true);
      var o = l.getCaret();
      q = q.insertAtCaret("\t", o);
      l.setContentTextAsUserEdit(q.getText());
      l.setCaret(o.start + 1);
    } else {
      l.getProject().indentProjects();
    }
    return false;
  }, true));
  j.addHandler("keydown", "shift+tab", e(function() {
    var l = $(this);
    if (l.isName()) {
      l.getProject().outdentProjects();
    }
    return false;
  }, true));
  var h = function() {
    $(this).keyboardZoomIn();
    return false;
  };
  var f = function() {
    keyboardZoomOut();
    return false;
  };
  j.addHandlerForShortcuts("keydown", "right", SHORTCUT_KEYS, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(h));
  j.addHandlerForShortcuts("keydown", "left", SHORTCUT_KEYS, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(f));
  j.addHandlerForShortcuts("keydown", ".", SHORTCUT_KEYS_WITH_META, h);
  j.addHandlerForShortcuts("keydown", ",", SHORTCUT_KEYS_WITH_META, f);
  j.addHandlerForShortcuts("keydown", "shift+.", SHORTCUT_KEYS_WITH_META, h);
  j.addHandlerForShortcuts("keydown", "shift+,", SHORTCUT_KEYS_WITH_META, f);
  j.addHandlerForShortcuts("keydown", "up", ["ctrl", "meta"], createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(function() {
    $(this).keyboardCollapse();
    return false;
  }));
  j.addHandlerForShortcuts("keydown", "down", ["ctrl", "meta"], createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(function() {
    $(this).keyboardExpand();
    return false;
  }));
  j.addHandler("keydown", "ctrl+space", function() {
    var l = $(this).getProject();
    if (l.is(".selected")) {
      l.expandOrCollapseAllDescendantsOfProjectToggle();
    } else {
      l.clickExpandButton(true, true);
    }
    return false;
  });
  j.addHandlerForShortcuts("keydown", "shift+up", SHORTCUT_KEYS_FOR_MOVING_WITH_META, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(e(function() {
    var l = $(this);
    if (!l.isNote()) {
      l.getProject().moveProjectsUpOrDown("up");
      return false;
    }
  }, true)));
  j.addHandlerForShortcuts("keydown", "shift+down", SHORTCUT_KEYS_FOR_MOVING_WITH_META, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(e(function() {
    var l = $(this);
    if (!l.isNote()) {
      l.getProject().moveProjectsUpOrDown("down");
      return false;
    }
  }, true)));
  j.addHandlerForShortcuts("keydown", "shift+left", SHORTCUT_KEYS_FOR_MOVING, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(e(function() {
    var l = $(this);
    if (!l.isNote()) {
      l.getProject().outdentProjects();
      return false;
    }
  }, true)));
  j.addHandlerForShortcuts("keydown", "shift+right", SHORTCUT_KEYS_FOR_MOVING, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(e(function() {
    var l = $(this);
    if (!l.isNote()) {
      l.getProject().indentProjects();
      return false;
    }
  }, true)));
  h = function(l) {
    return function() {
      var q = $(this);
      var o = q.getProject();
      if (project_tree.getProjectReferenceFromDomProject(o).isReadOnly()) {
        return false;
      }
      o = q.getCaret();
      if (o.start === o.end) {
        FORMAT_FLAGS.setFormatFlagsSetLocation(q, o.start);
        if (l === "bold") {
          FORMAT_FLAGS.toggleBold();
        } else {
          if (l === "italic") {
            FORMAT_FLAGS.toggleItalic();
          } else {
            if (l === "underline") {
              FORMAT_FLAGS.toggleUnderline();
            }
          }
        }
        return false;
      }
      var c = new content_text.ContentText(q, q.isNote());
      if (l === "bold") {
        c.toggleBoldForCaret(o);
      } else {
        if (l === "italic") {
          c.toggleItalicForCaret(o);
        } else {
          if (l === "underline") {
            c.toggleUnderlineForCaret(o);
          }
        }
      }
      q.setContentHtmlAsUserEdit(c.getContentHtml());
      q.setCaret(o.start, o.end);
      return false;
    };
  };
  j.addHandlerForShortcuts("keydown", "b", ["ctrl", "meta"], h("bold"));
  j.addHandlerForShortcuts("keydown", "i", ["ctrl", "meta"], h("italic"));
  j.addHandlerForShortcuts("keydown", "u", ["ctrl", "meta"], h("underline"));
  h = function(l) {
    var q = $(this);
    var o = q.getCaret();
    q = content_text.getPlainTextForContent(q);
    if (o.start === 0 && o.end >= q.length) {
      item_select.itemSelectAll();
      return false;
    }
    l.stopPropagation();
  };
  if (IS_WINDOWS || IS_LINUX) {
    j.addHandler("keydown", "ctrl+a", h);
  }
  j.addHandler("keydown", "meta+a", h);
  var n = function(l, q) {
    var o = $(this);
    l.stopPropagation();
    if (!o.isNote()) {
      var c = o.getCaret();
      dom_utils.executeASAP(function() {
        var g = getCurrentlyFocusedContent();
        if (!(g === null || g[0] !== o[0])) {
          g = o.getCaret();
          if (g.start === c.start) {
            if (g.end === c.end) {
              item_select.startItemSelectionWithProject(o.getProject(), q);
            }
          }
        }
      });
    }
  };
  j.addHandler("keydown", "shift+up", function(l) {
    return n.call(this, l, "up");
  });
  j.addHandler("keydown", "shift+down", function(l) {
    return n.call(this, l, "down");
  });
  if (IS_IE) {
    j.addHandlerForShortcuts("keydown", "v", ["ctrl", "meta"], function(l) {
      return $(this).handlePasteIntoContent(l);
    });
    j.addHandlerForShortcuts("keydown", "v", ["ctrl+shift", "meta+shift"], function(l) {
      return $(this).handlePasteIntoContent(l);
    });
    j.addHandlerForShortcuts("keydown", "insert", ["shift"], function(l) {
      return $(this).handlePasteIntoContent(l);
    });
  }
  a.live("paste", function(l) {
    return $(this).handlePasteIntoContent(l, true);
  });
}
function addGlobalKeyboardShortcuts() {
  function a(g) {
    var d = g.ctrlKey || g.metaKey;
    g = d && g.shiftKey;
    saved_views.updateModifierKeyStatus(g, d);
  }
  function e(g) {
    if (search.inSearchMode()) {
      search.exitSearchMode(true);
    }
    selectProjectReferenceInstantly(g);
    if (!IS_MOBILE) {
      focusFirstChildOfSelected();
    }
    $(window).scrollTop(0);
  }
  var j = $(window);
  var h = key_events.enableKeyEvents(j, true);
  h.addHandlerForShortcuts("keydown", "left", SHORTCUT_KEYS, function(g) {
    g.preventDefault();
  });
  h.addHandlerForShortcuts("keydown", "right", SHORTCUT_KEYS, function(g) {
    g.preventDefault();
  });
  h.addHandlerForShortcuts("keydown", ",", SHORTCUT_KEYS_WITH_META, function(g) {
    g.preventDefault();
  });
  h.addHandlerForShortcuts("keydown", ".", SHORTCUT_KEYS_WITH_META, function(g) {
    g.preventDefault();
  });
  h.addHandler("keydown", "backspace", function(g) {
    if (getCurrentlyFocusedContentOrInput() === null) {
      g.preventDefault();
    }
  });
  h.addHandlerForShortcuts("keydown", "s", ["ctrl", "meta"], function() {
    saveEditingContent();
    push_poll.scheduleNextPushAndPoll(true);
    return false;
  });
  h.addHandlerForShortcuts("keydown", "z", ["ctrl", "meta"], function() {
    undo_redo.undo();
    return false;
  });
  h.addHandlerForShortcuts("keydown", "shift+z", ["ctrl", "meta"], function() {
    undo_redo.redo();
    return false;
  });
  h.addHandlerForShortcuts("keydown", "y", ["ctrl", "meta"], function() {
    undo_redo.redo();
    return false;
  });
  h.addHandlerForShortcuts("keydown", "o", ["ctrl", "meta"], function() {
    toggleCompletedVisibility();
    return false;
  });
  h.addHandlerForShortcuts("keydown", "home", ["ctrl", "meta"], function() {
    var g = getCurrentlyFocusedContent();
    if (!(g !== null && g.isNote())) {
      focusFirstProject();
      return false;
    }
  });
  h.addHandlerForShortcuts("keydown", "end", ["ctrl", "meta"], function() {
    var g = getCurrentlyFocusedContent();
    if (!(g !== null && g.isNote())) {
      focusLastProject();
      return false;
    }
  });
  h.addHandler("keydown", "esc", function() {
    var g = getCurrentlyFocusedContentOrInput();
    g = g !== null && g.is("#searchBox");
    if (moving.isMoving()) {
      moving.cancelDragging();
      return false;
    }
    if (undeleteMessageIsVisible() && !g) {
      hideMessage();
      return false;
    }
    search.searchToggleShortcutHandler();
    return false;
  });
  h.addHandlerForShortcuts("keydown", "shift+*", ["ctrl", "meta"], function() {
    saved_views.toggleCurrentViewSaved();
    return false;
  });
  h.addHandlerForShortcuts("keydown", "shift+;", ["ctrl", "meta"], function() {
    saved_views.switchLeft();
    return false;
  });
  h.addHandlerForShortcuts("keydown", ";", ["ctrl", "meta"], function() {
      saved_views.switchRight();
    return false;
  });
  j.bind("keydown", function(g) {
    if (tagging.keyCodeIsForTagDeleteModifierKey(g.keyCode)) {
      var d = selectOnActivePage(".selected .contentTag:hover");
      if (d.length === 1) {
        d.addClass("contentTagDeleteHover");
      }
    }
    a(g);
    if (saved_views.HUDIsVisible()) {
      switch(g.keyCode) {
        case $.ui.keyCode.LEFT:
          saved_views.switchLeft();
          return false;
        case $.ui.keyCode.RIGHT:
          saved_views.switchRight();
          return false;
        case $.ui.keyCode.ENTER:
          saved_views.switchToSelectedViewIfAppropriate();
          return false;
        default:
          saved_views.hideIfModifierNotPressed();
          return;
      }
    }
    d = g.ctrlKey || (g.altKey || (g.metaKey || g.shiftKey));
    var k = g.keyCode === $.ui.keyCode.LEFT || (g.keyCode === $.ui.keyCode.RIGHT || (g.keyCode === $.ui.keyCode.UP || g.keyCode === $.ui.keyCode.DOWN));
    var p = IS_FIREFOX && g.keyCode === $.ui.keyCode.SHIFT;
    if (!DRAG_MODE && (k && (!d && !p))) {
      d = item_select.clearItemSelection();
      if (d.length > 0) {
        k = function(v) {
          v = v.last();
          var r = v.find(NAVIGABLE_PROJECTS_PATTERN + ":last");
          return r.length > 0 ? r : v;
        };
        switch(g.keyCode) {
          case $.ui.keyCode.LEFT:
            d.first().getName().moveCursorToBeginning();
            break;
          case $.ui.keyCode.RIGHT:
            k(d).getName().moveCursorToEnd();
            break;
          case $.ui.keyCode.UP:
            d.first().getPreviousProject().getName().moveCursorToBeginning();
            break;
          case $.ui.keyCode.DOWN:
            g = k(d);
            d = g.getNextProject();
            if (d[0] === g[0]) {
              d.getName().moveCursorToEnd();
            } else {
              d.getName().moveCursorToBeginning();
            }
          ;
        }
        return false;
      }
    }
  });
  j.bind("keyup", function(g) {
    if (tagging.keyCodeIsForTagDeleteModifierKey(g.keyCode)) {
      var d = selectOnActivePage(".selected .contentTag:hover");
      if (d.length === 1) {
        d.removeClass("contentTagDeleteHover");
      }
    }
    a(g);
  });
  var f = ["meta"];
  if (IS_WINDOWS) {
    f.push("alt");
  } else {
    f.push("ctrl");
  }
  h.addHandlerForShortcuts("keydown", "shift+(", f, function() {
    var g = project_tree.getProjectReferenceFromDomProject(selectOnActivePage(".selected")).getPreviousPotentiallyVisibleSibling(true);
    if (g === null) {
      return false;
    }
    e(g);
    return false;
  });
  h.addHandlerForShortcuts("keydown", "shift+)", f, function() {
    var g = project_tree.getProjectReferenceFromDomProject(selectOnActivePage(".selected")).getNextPotentiallyVisibleSibling(true);
    if (g === null) {
      return false;
    }
    e(g);
    return false;
  });

  if (APPCACHE_ENABLED) {
    if (ON_DEVELOPMENT_SERVER) {
      h.addHandlerForShortcuts("keydown", "shift+a", ["ctrl", "meta"], function() {
        forceReloadAppCache();
        return false;
      });
    }
  }
  h.addHandlerForShortcuts("keydown", "return", ["ctrl", "meta"], createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(function() {
    completeItemSelectedProjects();
    return false;
  }));
  h.addHandlerForShortcuts("keydown", "shift+backspace", ["ctrl", "meta"], function() {
    deleteItemSelectedProjects();
    return false;
  });
  var n = function(g) {
    var d = item_select.getSelectedItems();
    d = filterReadOnlyProjects(d, true);
    if (d.length === 0) {
      return false;
    }
    g(d);
    return false;
  };
  var l = function() {
    return n(function(g) {
      g.indentProjects(true);
    });
  };
  var q = function() {
    return n(function(g) {
      g.outdentProjects(true);
    });
  };
  var o = function() {
    var g = document.activeElement;
    return g !== null && ("tabIndex" in g && g.tabIndex >= 0);
  };
  h.addHandler("keydown", "tab", function(g) {
    if (!o()) {
      return l(g);
    }
  });
  h.addHandler("keydown", "shift+tab", function(g) {
    if (!o()) {
      return q(g);
    }
  });
  h.addHandlerForShortcuts("keydown", "shift+up", SHORTCUT_KEYS_FOR_MOVING_WITH_META, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(function() {
    return n(function(g) {
      g.moveProjectsUpOrDown("up", true);
    });
  }));
  h.addHandlerForShortcuts("keydown", "shift+down", SHORTCUT_KEYS_FOR_MOVING_WITH_META, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(function() {
    return n(function(g) {
      g.moveProjectsUpOrDown("down", true);
    });
  }));
  h.addHandlerForShortcuts("keydown", "shift+left", SHORTCUT_KEYS_FOR_MOVING, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(q));
  h.addHandlerForShortcuts("keydown", "shift+right", SHORTCUT_KEYS_FOR_MOVING, createDoNothingWhenInLeftBarRecentSwitcherModeShortcutEventHandler(l));
  var c = function(g) {
    var d = getSelectedProjectsAndNavigableDescendants();
    d = filterReadOnlyProjects(d);
    if (d.length !== 0) {
      var k = [];
      var p = [];
      var v = function(r, x) {
        var u = new content_text.ContentText(r, x);
        if (u.getPlainText().length > 0) {
          var b = {
            content : r,
            contentTextContainer : u
          };
          k.push(b);
          var s = false;
          if (g === "bold") {
            s = u.isEntirelyBold();
          } else {
            if (g === "italic") {
              s = u.isEntirelyItalic();
            } else {
              if (g === "underline") {
                s = u.isEntirelyUnderline();
              }
            }
          }
          if (!s) {
            p.push(b);
          }
        }
      };
      d.each(function() {
        var r = $(this);
        v(r.getName().children(".content"), false);
        if (r.hasClass("noted")) {
          v(r.getNotes().children(".content"), true);
        }
      });
      if (k.length !== 0) {
        undo_redo.startOperationBatch();
        d = function(r) {
          var x = 0;
          for (;x < r.length;x++) {
            var u = r[x];
            var b = u.content;
            u = u.contentTextContainer;
            var s = {
              start : 0,
              end : u.getPlainText().length
            };
            if (g === "bold") {
              u.toggleBoldForCaret(s);
            } else {
              if (g === "italic") {
                u.toggleItalicForCaret(s);
              } else {
                if (g === "underline") {
                  u.toggleUnderlineForCaret(s);
                }
              }
            }
            b.setAndSaveContentText(u.getText());
          }
        };
        if (p.length > 0) {
          d(p);
        } else {
          d(k);
        }
        undo_redo.finishOperationBatch();
      }
    }
  };
  h.addHandlerForShortcuts("keydown", "b", ["ctrl", "meta"], function() {
    c("bold");
    return false;
  });
  h.addHandlerForShortcuts("keydown", "i", ["ctrl", "meta"], function() {
    c("italic");
    return false;
  });
  h.addHandlerForShortcuts("keydown", "u", ["ctrl", "meta"], function() {
    c("underline");
    return false;
  });
  f = function() {
    if (getCurrentlyFocusedContentOrInput() === null) {
      item_select.itemSelectAll();
      return false;
    }
  };
  if (IS_WINDOWS || IS_LINUX) {
    h.addHandler("keydown", "ctrl+a", f);
  }
  h.addHandler("keydown", "meta+a", f);
  h.addHandler("keydown", "shift+up", function() {
    if (getCurrentlyFocusedContentOrInput() === null) {
      item_select.expandItemSelectionUpOrDown("up");
      return false;
    }
  });
  h.addHandler("keydown", "shift+down", function() {
    if (getCurrentlyFocusedContentOrInput() === null) {
      item_select.expandItemSelectionUpOrDown("down");
      return false;
    }
  });
  j.bind("copy", function() {
    var g = item_select.getSelectedItems();
    if (g.length !== 0) {
      cut_copy_paste.handleCopyOfSelectedItems(g);
    }
  });
  j.bind("cut", function() {
    var g = item_select.getSelectedItems();
    var d = filterReadOnlyProjects(g, true);
    if (d.length === 0) {
      if (g.length > 0) {
        return false;
      } else {
        return;
      }
    }
    g = project_tree.getProjectReferencesFromDomProjects(d);
    var k = projectReferenceSubtreesContainAtLeastNProjects(g, NUM_DELETED_ITEMS_NEEDED_FOR_DROPDOWN_MESSAGE);
    var p = projectReferencesHaveAnyDescendants(g);
    cut_copy_paste.handleCopyOfSelectedItems(d, function() {
      d.deleteIt(false, true, k);
      item_select.clearItemSelection();
      if (k) {
        showMessage(d.length + " item" + (d.length > 1 ? "s" : "") + (p ? " (and " + (d.length > 1 ? "their" : "its") + " descendants)" : "") + ' cut and added to clipboard. <a class="undelete isForCut" href="#">Restore.</a>');
      }
    });
  });
}
function projectReferenceSubtreesContainAtLeastNProjects(a, e) {
  var j = 0;
  var h = 0;
  for (;h < a.length;h++) {
    var f = a[h].getNumDescendants(e - j);
    j += 1 + f;
    if (j >= e) {
      return true;
    }
  }
  return false;
}
function projectReferencesHaveAnyDescendants(a) {
  var e = 0;
  for (;e < a.length;e++) {
    if (a[e].hasDescendants()) {
      return true;
    }
  }
  return false;
}
function filterReadOnlyProjects(a, e) {
  if (e === undefined) {
    e = false;
  }
  var j = e ? function(h) {
    return h.isInReadOnlyTree();
  } : function(h) {
    return h.isReadOnly();
  };
  return a.filter(function() {
    var h = $(this);
    h = project_tree.getProjectReferenceFromDomProject(h);
    return!j(h);
  });
}
function getSelectedProjectsAndNavigableDescendants() {
  var a = item_select.getSelectedItems();
  return a.add(a.find(NAVIGABLE_PROJECTS_PATTERN));
}
function getItemSelectionProjectsToComplete() {
  var a = getSelectedProjectsAndNavigableDescendants();
  return filterReadOnlyProjects(a);
}
function completeItemSelectedProjects() {
  var a = getItemSelectionProjectsToComplete();
  if (a.length !== 0) {
    a.completeIt(true);
  }
}
function deleteItemSelectedProjects() {
  var a = item_select.getSelectedItems();
  a = filterReadOnlyProjects(a);
  if (a.length !== 0) {
    a.deleteIt(false, true);
    item_select.clearItemSelection();
  }
}
function focusFirstChildOfSelected() {
  var a = selectOnActivePage(".selected");
  var e = a.getVisibleChildren();
  (e.length > 0 ? e.first() : a).getName().moveCursorToBeginning();
}
function focusFirstProject() {
  var a = $(GLOBAL_NAVIGABLE_PROJECTS_PATTERN + ":first");
  if (a.length === 1) {
    a.getName().moveCursorToBeginning();
  }
}
function focusLastProject() {
  var a = $(GLOBAL_NAVIGABLE_PROJECTS_PATTERN + ":last");
  if (a.length === 1) {
    a.getName().moveCursorToEnd();
  }
}
function saveEditingContent() {
  var a = getCurrentlyFocusedContent();
  if (a !== null) {
    a.saveContent();
  }
}
jQuery.fn.keyDownHandler = function(a) {
  var e = $(this);
  var j = e.getProject();
  if (!IS_MOBILE) {
    hideControls();
  }
  if (j.hasClass("highlighted")) {
    j.removeClass("highlighted");
  }
  if (item_select.isDragSelecting()) {
    if (item_select.getSelectedItems().length > 0) {
      a.preventDefault();
    }
  }
  if (project_tree.getProjectReferenceFromDomProject(j).isReadOnly()) {
    if (!a.ctrlKey && (!a.altKey && !a.metaKey)) {
      switch(a.keyCode) {
        case $.ui.keyCode.DOWN:
        ;
        case $.ui.keyCode.UP:
        ;
        case $.ui.keyCode.LEFT:
        ;
        case $.ui.keyCode.RIGHT:
        ;
        case $.ui.keyCode.HOME:
        ;
        case $.ui.keyCode.END:
          break;
        default:
          a.preventDefault();
          return;
      }
    }
  }
  if (IS_IE) {
    setSaveTimer(e);
    setTimeout(function() {
      e.updateContentHtmlAfterUserEdit();
    }, 0);
  }
};
jQuery.fn.keyPressHandler = function(a) {
  var e = $(this);
  if (!IS_MOBILE) {
    var j = String.fromCharCode(a.which);
    if (tagging.isTagStartChar(j)) {
      tagging.getTagAutocompleter().attach(e, j);
    }
    if (!FORMAT_FLAGS.isEmpty()) {
      var h = e.getCaret();
      FORMAT_FLAGS.clearFormatFlagsSetLocationIfChanged(e, h.start);
      if (!FORMAT_FLAGS.isEmpty()) {
        setTimeout(function() {
          var f = getCurrentlyFocusedContent();
          if (!(f === null || f[0] !== e[0])) {
            f = e.getCaret();
            if (f.start === h.start + 1) {
              var n = new content_text.ContentText(e, e.isNote());
              var l = n.getPlainText();
              var q = {
                start : f.start - 1,
                end : f.end
              };
              if (l.charAt(q.start) === j) {
                if (FORMAT_FLAGS.boldIsSet()) {
                  n.toggleBoldForCaret(q);
                }
                if (FORMAT_FLAGS.italicIsSet()) {
                  n.toggleItalicForCaret(q);
                }
                if (FORMAT_FLAGS.underlineIsSet()) {
                  n.toggleUnderlineForCaret(q);
                }
                FORMAT_FLAGS.clear();
                e.setContentHtmlAsUserEdit(n.getContentHtml());
                e.setCaret(f.start, f.end);
              }
            }
          }
        }, 0);
      }
    }
  }
};
function setSaveTimer(a) {
  clearTimeout(TIMEOUTS.saveTimer);
  TIMEOUTS.saveTimer = setTimeout(function() {
    TIMEOUTS.saveTimer = null;
    a.saveContent();
  }, 1E3);
}
jQuery.fn.downArrowHandler = function(a, e) {
  if (e === undefined) {
    e = false;
  }
  var j = $(this);
  if (tagging.getTagAutocompleter().moveSelection(j, "down")) {
    return false;
  }
  var h = j.getProject();
  if (j.isNote()) {
    if (j.caretAtEndOfText()) {
      var f = h.getNextProject();
      if (f.filter(h).length === 0) {
        f.getName().moveCursorToBeginning();
        return false;
      }
    }
  } else {
    var n = j.getCaret();
    if (!e) {
      n = j.getContentCaretLineInfo(n.end);
      if (n.caretPosLine < n.numLines - 1) {
        LAST_UP_OR_DOWN_ARROW_IN_NAME_USED_DEFAULT_BEHAVIOR = true;
        return;
      }
    }
    var l = null;
    if (h.is(".selected") && h.is(".noted")) {
      l = function() {
        h.getNotes().moveCursorToBeginning();
      };
    } else {
      f = h.getNextProject();
      l = f.filter(h).length != 0 ? function() {
        h.getName().moveCursorToEnd();
      } : function() {
        f.getName().moveCursorToBeginning();
      };
    }
    n = LAST_UP_OR_DOWN_ARROW_IN_NAME_USED_DEFAULT_BEHAVIOR;
    LAST_UP_OR_DOWN_ARROW_IN_NAME_USED_DEFAULT_BEHAVIOR = false;
    if (IS_FIREFOX && (!e && n)) {
      dom_utils.executeASAP(function() {
        var q = getCurrentlyFocusedContent();
        if (q !== null) {
          if (q[0] === j[0]) {
            l();
          }
        }
      });
    } else {
      l();
      return false;
    }
  }
};
jQuery.fn.upArrowHandler = function(a, e) {
  if (e === undefined) {
    e = false;
  }
  var j = $(this);
  if (tagging.getTagAutocompleter().moveSelection(j, "up")) {
    return false;
  }
  var h = j.getProject();
  if (j.isNote()) {
    if (j.caretAtBeginningOfText()) {
      h.children(".name").moveCursorToBeginning();
      return false;
    }
  } else {
    var f = j.getCaret();
    if (!e) {
      if (j.getContentCaretLineInfo(f.start).caretPosLine > 0) {
        LAST_UP_OR_DOWN_ARROW_IN_NAME_USED_DEFAULT_BEHAVIOR = true;
        return;
      }
    }
    var n = null;
    var l = h.getPreviousProject();
    n = l.is(".selected") && (!h.is(".selected") && l.is(".noted")) ? function() {
      l.getNotes().moveCursorToEnd();
    } : function() {
      l.children(".name").moveCursorToBeginning();
    };
    h = LAST_UP_OR_DOWN_ARROW_IN_NAME_USED_DEFAULT_BEHAVIOR;
    LAST_UP_OR_DOWN_ARROW_IN_NAME_USED_DEFAULT_BEHAVIOR = false;
    if (IS_FIREFOX && (!e && h)) {
      dom_utils.executeASAP(function() {
        var q = getCurrentlyFocusedContent();
        if (q !== null) {
          if (q[0] === j[0]) {
            n();
          }
        }
      });
    } else {
      n();
      return false;
    }
  }
};
jQuery.fn.leftArrowHandler = function() {
  var a = $(this);
  var e = a.isNote();
  if (a.caretAtBeginningOfText()) {
    a = a.getProject();
    if (e) {
      a.getName().moveCursorToEnd();
    } else {
      e = a.getPreviousProject();
      if (e.is(".selected") && (!a.is(".selected") && e.is(".noted"))) {
        e.getNotes().moveCursorToEnd();
      } else {
        e.getName().moveCursorToEnd();
      }
    }
    return false;
  }
};
jQuery.fn.rightArrowHandler = function() {
  var a = $(this);
  if (a.caretAtEndOfText()) {
    var e = a.isNote();
    a = a.getProject();
    if (!e && (a.is(".selected") && a.is(".noted"))) {
      a.getNotes().moveCursorToBeginning();
      return false;
    }
    var j = a.getNextProject();
    if (!e || j.filter(a).length === 0) {
      j.getName().moveCursorToBeginning();
      return false;
    }
  }
};
jQuery.fn.returnHandler = function() {
  var a = $(this);
  if (tagging.getTagAutocompleter().autocompleteSelectedTag(a)) {
    return false;
  }
  var e = a.getProject();
  var j = a.isNote();
  var h = project_tree.getProjectReferenceFromDomProject(e).isReadOnly();
  var f = new content_text.ContentText(a, j);
  if (j) {
    if (!h) {
      var n = a.getCaret();
      e = f.insertAtCaret("\n", n);
      a.setContentTextAsUserEdit(e.getText(), true);
      a.setCaret(n.start + 1);
    }
    return false;
  }
  if (f.isEmpty() && e.isLastChild()) {
    if (e.outdentProjects()) {
      return false;
    }
  }
  j = function(c) {
    var g = IS_ANDROID && !USE_ANDROID_CHROME_ENTER_HACK;
    var d = function(k) {
      if (k === undefined) {
        k = false;
      }
      c.getName().children(".content").setCaret(0, 0, null, k);
    };
    d(g);
    if (g) {
      setTimeout(function() {
        blurFocusedContent();
        d(false);
      }, 0);
    }
  };
  if (e.is(".selected") || (a.caretAtEndOfText(true) || h && !a.caretAtBeginningOfText())) {
    var l;
    if (e.is(".open, .selected")) {
      l = e;
      e = 0;
    } else {
      l = e.getParent();
      e = e.getPriority() + 1;
    }
    n = project_tree.getProjectReferenceFromDomProject(l);
    if (n.canCreateChild()) {
      undo_redo.startOperationBatch();
      l = createNewProject(l, e);
      j(l);
      undo_redo.finishOperationBatch();
    }
  } else {
    l = e.getParent();
    n = project_tree.getProjectReferenceFromDomProject(l);
    if (n.canCreateChild()) {
      n = a.getCaret();
      a = f.substring(0, n.start);
      f = f.substring(n.end);
      undo_redo.startOperationBatch();
      l = createNewProject(l, e.getPriority());
      var q = e.getName();
      var o = l.getName();
      n = n.start === 0 && n.end === 0;
      if (!h && !n) {
        o.children(".content").setAndSaveContentText(a.getText());
        q.children(".content").setAndSaveContentText(f.getText());
        j(e);
      } else {
        j(l);
      }
      undo_redo.finishOperationBatch();
    }
  }
  return false;
};
jQuery.fn.isLastChild = function() {
  return $(this).getNextSibling().length === 0;
};
jQuery.fn.moveProjectsUpOrDown = function(a, e) {
  if (e === undefined) {
    e = false;
  }
  var j = $(this);
  if (!j.first().is(".selected")) {
    var h = j.splitIntoAdjacentProjectGroups();
    if (a === "up") {
      h = h[0];
      var f = h.first();
    } else {
      h = h[h.length - 1];
      f = h.last();
    }
    var n = function(g) {
      var d = project_tree.getProjectReferenceFromDomProject(g);
      var k = function(u) {
        u = u.getParent();
        if (u.is(".selected")) {
          return null;
        }
        u = a === "up" ? u : u.getNextSibling(true);
        return d.isValidMove(u) ? u : null;
      };
      var p = g;
      var v = 0;
      for (;;) {
        var r = a === "up" ? p.getPreviousSibling() : p.getNextSibling();
        if (v > 0) {
          for (;r.length === 1 && r.is(":not(.task):not(.open)");) {
            r = a === "up" ? r.getPreviousSibling() : r.getNextSibling();
          }
        }
        if (r.length === 1) {
          break;
        }
        p = p.getParent();
        v++;
        if (p.is(".selected")) {
          return k(g);
        }
      }
      if (v === 0) {
        v = a === "up" ? r : r.getNextSibling(true);
      } else {
        p = r;
        r = 0;
        for (;r < v - 1;) {
          var x = p.getVisibleChildren();
          if (x.length === 0) {
            break;
          }
          x = a === "up" ? x.last() : x.first();
          if (x.is(":not(.task):not(.open)")) {
            break;
          }
          p = x;
          r++;
        }
        if (v = p.is(".task")) {
          p.showChildren("instant").setExpanded(true);
        }
        if (a === "up" || v) {
          v = p.children(".children").children(".childrenEnd");
        } else {
          v = p.getVisibleChildren().first();
          if (v.length === 0) {
            v = p.children(".children").children(".childrenEnd");
          }
        }
      }
      if (!d.isValidMove(v)) {
        return k(g);
      }
      return v;
    }(f);
    var l = (f = n !== null) ? n : a === "up" ? h.last().getNextSibling(true) : h.first();
    j = j;
    if (!f) {
      j = j.not(h);
    }
    var q = $();
    j.each(function() {
      var g = $(this);
      if (project_tree.getProjectReferenceFromDomProject(g).isValidMove(l)) {
        q = q.add(g);
      }
    });
    if (q.length !== 0) {
      if (!e) {
        var o = project_tree.getProjectReferenceFromDomProject(q);
        var c = null;
        j = q.getName().children(".content");
        h = getCurrentlyFocusedContent();
        if (h !== null && h[0] === j[0]) {
          c = j.getCaret();
        }
      }
      undo_redo.startOperationBatch();
      q.moveProjects(l);
      if (!e) {
        if (c !== null) {
          o.getMatchingDomProject().getName().children(".content").setCaret(c.start, c.end);
        }
      }
      undo_redo.finishOperationBatch();
    }
  }
};
jQuery.fn.indentProjects = function(a) {
  if (a === undefined) {
    a = false;
  }
  var e = $(this);
  if (!a) {
    var j = project_tree.getProjectReferenceFromDomProject(e);
    var h = null;
    var f = e.getName().children(".content");
    var n = getCurrentlyFocusedContent();
    if (n !== null && n[0] === f[0]) {
      h = f.getCaret();
    }
  }
  e = e.splitIntoAdjacentProjectGroups();
  var l = false;
  f = false;
  n = 0;
  for (;n < e.length;n++) {
    var q = e[n];
    var o = q.eq(0);
    var c = o.getNewNextProjectOrChildrenEndForIndent();
    if (c === null) {
      l = true;
    } else {
      var g = c.newNextProjectOrChildrenEnd;
      c = c.previousSibling;
      var d = o;
      q.slice(1).each(function() {
        var k = $(this);
        if (project_tree.getProjectReferenceFromDomProject(k).isValidMove(g)) {
          d = d.add(k);
        } else {
          l = true;
        }
      });
      if (!f) {
        undo_redo.startOperationBatch();
        f = true;
      }
      d.moveProjects(g);
      if (!c.is(".open")) {
        c.showChildren("instant").setExpanded(true);
      }
    }
  }
  if (f) {
    if (!a) {
      if (h !== null) {
        restoreCaretAfterIndentOrOutdent(j, h);
      }
    }
    undo_redo.finishOperationBatch();
  }
  return!l;
};
jQuery.fn.splitIntoAdjacentProjectGroups = function() {
  var a = null;
  var e = [];
  $(this).each(function() {
    var j = $(this);
    if (a === null || j.getPreviousSibling().filter(a).length !== 1) {
      e.push(j);
    } else {
      e[e.length - 1] = e[e.length - 1].add(j);
    }
    a = j;
  });
  return e;
};
jQuery.fn.getNewNextProjectOrChildrenEndForIndent = function() {
  var a = $(this);
  var e = project_tree.getProjectReferenceFromDomProject(a);
  if (a.is(".selected")) {
    return null;
  }
  a = a.getPreviousSibling();
  if (a.length === 0) {
    return null;
  }
  var j = a.children(".children").children(".childrenEnd");
  if (!e.isValidMove(j)) {
    return null;
  }
  return{
    newNextProjectOrChildrenEnd : j,
    previousSibling : a
  };
};
jQuery.fn.outdentProjects = function(a) {
  if (a === undefined) {
    a = false;
  }
  var e = $(this);
  if (!a) {
    var j = project_tree.getProjectReferenceFromDomProject(e);
    var h = null;
    var f = e.getName().children(".content");
    var n = getCurrentlyFocusedContent();
    if (n !== null && n[0] === f[0]) {
      h = f.getCaret();
    }
  }
  e = e.splitIntoAdjacentProjectGroups();
  var l = f = false;
  n = 0;
  for (;n < e.length;n++) {
    var q = e[n];
    var o = q.eq(0);
    var c = o.getNewNextProjectOrChildrenEndForOutdent();
    if (c === null) {
      l = true;
    } else {
      var g = c.newNextProjectOrChildrenEnd;
      var d = o;
      q.slice(1).each(function() {
        var k = $(this);
        if (project_tree.getProjectReferenceFromDomProject(k).isValidMove(g)) {
          d = d.add(k);
        } else {
          l = true;
        }
      });
      if (!f) {
        undo_redo.startOperationBatch();
        f = true;
      }
      d.moveProjects(g);
    }
  }
  if (f) {
    if (!a) {
      if (h !== null) {
        restoreCaretAfterIndentOrOutdent(j, h);
      }
    }
    undo_redo.finishOperationBatch();
  }
  return!l;
};
function restoreCaretAfterIndentOrOutdent(a, e) {
  var j = IS_ANDROID && !USE_ANDROID_CHROME_ENTER_HACK;
  var h = function(f) {
    if (f === undefined) {
      f = false;
    }
    var n = a.getMatchingDomProject();
    if (n.length === 1) {
      n.getName().children(".content").setCaret(e.start, e.end, null, f);
    }
  };
  h(j);
  if (j) {
    setTimeout(function() {
      blurFocusedContent();
      h(false);
    }, 0);
  }
}
jQuery.fn.getNewNextProjectOrChildrenEndForOutdent = function() {
  var a = $(this);
  if (a.is(".selected")) {
    return null;
  }
  var e = a.getParent();
  if (e.is(".mainTreeRoot") || e.is(".selected")) {
    return null;
  }
  e = e.next(".project, .childrenEnd");
  if (!project_tree.getProjectReferenceFromDomProject(a).isValidMove(e)) {
    return null;
  }
  return{
    newNextProjectOrChildrenEnd : e
  };
};
jQuery.fn.isName = function() {
  return $(this).parent(".name").length > 0;
};
jQuery.fn.isNote = function() {
  return $(this).parent(".notes").length > 0;
};
function createNewProject(parent_node, priority) {
  return project_tree.getProjectReferenceFromDomProject(parent_node).applyLocalCreateChild(priority).getMatchingDomProject();
}
jQuery.fn.getPreviousProject = function(a, e) {
  if (a === undefined) {
    a = false;
  }
  if (e === undefined) {
    e = false;
  }
  var j = $(this);
  var h = a ? DROP_TARGET_PATTERN : NAVIGABLE_PROJECTS_PATTERN;
  var f = j.getPreviousSibling();
  if (f.length === 0) {
    f = j.getParent();
    if (f.is(h)) {
      return f;
    }
    return j;
  } else {
    if (e) {
      return f;
    } else {
      j = f;
      for (;;) {
        f = j.children(".children").children(h).last();
        if (f.length === 0) {
          return j;
        }
        j = f;
      }
    }
  }
};
jQuery.fn.getNextProject = function(a, e) {
  if (a === undefined) {
    a = false;
  }
  if (e === undefined) {
    e = false;
  }
  var j = $(this);
  var h = e ? DROP_TARGET_PATTERN : NAVIGABLE_PROJECTS_PATTERN;
  if (!a) {
    var f = j.children(".children").children(h).first();
    if (f.length > 0) {
      return f;
    }
  }
  f = j;
  do {
    var n = f.getNextSibling(e);
    if (n.length > 0) {
      return n;
    }
    f = f.getParent();
  } while (f.is(h));
  return j;
};
jQuery.fn.getPreviousSibling = function() {
  var a = $(this);
  do {
    a = a.prev();
  } while (a.length === 1 && !a.is(NAVIGABLE_PROJECTS_PATTERN));
  return a;
};
jQuery.fn.getNextSibling = function(a) {
  if (a === undefined) {
    a = false;
  }
  var e = $(this);
  a = a ? DROP_TARGET_PATTERN : NAVIGABLE_PROJECTS_PATTERN;
  e = e;
  do {
    e = e.next();
  } while (e.length === 1 && !e.is(a));
  return e;
};
jQuery.fn.moveCursorToEnd = function() {
  $(this).children(".content").setCaret(-1);
  return this;
};
jQuery.fn.moveCursorToBeginning = function() {
  $(this).children(".content").setCaret(0);
  return this;
};
jQuery.fn.keyboardZoomIn = function() {
  $(this).getProject().selectIt("first_child");
  return this;
};
function keyboardZoomOut() {
  var a = selectOnActivePage(".selected");
  if (!a.is(".mainTreeRoot")) {
    a.getParent().selectIt("last_selected");
  }
}
jQuery.fn.keyboardCollapse = function() {
  var a = $(this).getProject();
  if (a.is(".selected")) {
    var e = a.find(".project.open:visible").getAncestorCounts();
    a = e.maxNumAncestors;
    e = e.numAncestorsToProjectMap;
    if (a !== undefined) {
      a = e[a];
      var j;
      for (j in a) {
        a[j].hideChildren("instant").setExpanded(false);
      }
    }
  } else {
    if (!a.is(".task")) {
      if (!!a.is(".open")) {
        a.hideChildren().setExpanded(false);
      }
    }
  }
};
jQuery.fn.keyboardExpand = function() {
  var a = $(this).getProject();
  if (a.is(".selected")) {
    var e = a.find(".project:visible:not(.task):not(.open)").getAncestorCounts();
    a = e.minNumAncestors;
    e = e.numAncestorsToProjectMap;
    if (a !== undefined) {
      a = e[a];
      var j;
      for (j in a) {
        a[j].showChildren("instant").setExpanded(true);
      }
    }
  } else {
    if (!(a.is(".task") || a.isFullyExpanded())) {
      if (search.inSearchMode()) {
        j = project_tree.getProjectReferenceFromDomProject(a);
        search.registerFullyExpandedItemForCurrentSearch(j);
      }
      a.showChildren().setExpanded(true);
    }
  }
};
jQuery.fn.getAncestorCounts = function() {
  var a = $(this);
  var e = {};
  var j = undefined;
  var h = undefined;
  a.each(function() {
    var f = $(this);
    var n = project_tree.getProjectReferenceFromDomProject(f).getAncestors().length;
    if (n in e) {
      e[n].push(f);
    } else {
      e[n] = [f];
    }
    j = j === undefined || n < j ? n : j;
    h = h === undefined || n > h ? n : h;
  });
  return{
    numAncestorsToProjectMap : e,
    minNumAncestors : j,
    maxNumAncestors : h
  };
};
function showMessage(a, e, j) {
  if (e === undefined) {
    e = false;
  }
  if (j === undefined) {
    j = null;
  }
  var h = $("#message");
  h.removeClass();
  if (e) {
    h.addClass("errorMessage");
  }
  if (j !== null) {
    h.addClass(j);
  }
  h.find(".messageContent").html(a);
  if (!h.is(":visible")) {
    h.children(".close").hide();
    h.slideDown("normal", function() {
      $(this).find(".close").show();
    });
  }
}
function hideMessage(a) {
  if (a === undefined) {
    a = false;
  }
  var e = $("#message");
  e.children(".close").hide();
  e.find(".messageContent").html("");
  if (a) {
    e.hide();
  } else {
    e.slideUp();
  }
}
function undeleteMessageIsVisible(a) {
  if (a === undefined) {
    a = null;
  }
  var e = $("#message:visible > .messageContent > .undelete");
  if (e.length !== 1) {
    return false;
  }
  if (a !== null && e.hasClass("isForCut") !== a) {
    return false;
  }
  return true;
}
jQuery.fn.completeIt = function(a) {
  if (a === undefined) {
    a = false;
  }
  var e = $(this);
  undo_redo.startOperationBatch();
  var j = false;
  var h = e.not(".done").length > 0;
  var f = 10;
  e.each(function() {
    var q = $(this);
    var o = project_tree.getProjectReferenceFromDomProject(q);
    if (h) {
      if (!q.is(".done")) {
        o.applyLocalComplete();
        q.show();
        if (!shouldShowCompletedProjects()) {
          var c = function() {
            q.removeAttr("style");
            animations.getAnimationCounter().decrement();
          };
          setTimeout(f > 0 ? function() {
            q.clearControlsUnderProject();
            q.incrementAnimationCounter().slideUpWithoutMemoryLeaks(animations.getAnimationTiming("children"), c);
          } : function() {
            q.clearControlsUnderProject();
            q.incrementAnimationCounter();
            setTimeout(c, animations.getAnimationTiming("children"));
          }, 1E3);
          f--;
        }
        if (q.is(".selected")) {
          j = true;
        }
      }
    } else {
      o.applyLocalUncomplete();
    }
  });
  if (h) {
    if (j) {
      setTimeout(function() {
        selectOnActivePage(".selected").getParent().selectIt();
      }, 500);
    } else {
      if (!IS_MOBILE && (!a || !shouldShowCompletedProjects())) {
        var n = e.last();
        var l = n.getNextProject(true);
        if (l.filter(n).length === 1) {
          for (;;) {
            n = l;
            l = l.getPreviousProject();
            if (l.filter(n).length === 1) {
              break;
            }
            if (shouldShowCompletedProjects() || !l.is(".done")) {
              break;
            }
          }
        }
        if (e.filter(l).length === 0) {
          l.children(".name").moveCursorToBeginning();
        }
      }
    }
  } else {
    if (!IS_MOBILE) {
      if (!a) {
        e.focusProject();
      }
    }
  }
  undo_redo.finishOperationBatch();
  if (a) {
    if (!shouldShowCompletedProjects()) {
      item_select.clearItemSelection();
    }
  }
  return this;
};
jQuery.fn.deleteIt = function(a, e, j) {
  if (a === undefined) {
    a = false;
  }
  if (e === undefined) {
    e = false;
  }
  if (j === undefined) {
    j = null;
  }
  var h = $(this);
  if (!a) {
    if (!e) {
      saveEditingContent();
    }
    undo_redo.startOperationBatch();
  }
  var f = false;
  var n = 0;
  var l = undefined;
  var q = false;
  var o = project_tree.getProjectReferencesFromDomProjects(h);
  if (j === null) {
    var c = projectReferenceSubtreesContainAtLeastNProjects(o, NUM_DELETED_ITEMS_NEEDED_FOR_DROPDOWN_MESSAGE);
    var g = projectReferencesHaveAnyDescendants(o);
  }
  h.each(function(d) {
    var k = $(this);
    d = o[d];
    n += 1;
    var p = k.getParent();
    var v = k.is(".selected");
    f |= !d.isAddedSubtreePlaceholder();
    if (!a) {
      if (l === undefined) {
        l = k.getPreviousProject();
        if (l[0] === k[0]) {
          l = k.getNextProject(true);
          if (l[0] === k[0]) {
            l = null;
          } else {
            q = true;
          }
        }
      }
    }
    k = false;
    if (!a) {
      if (v) {
        p.selectIt();
      } else {
        if (l !== null) {
          k = IS_ANDROID && !USE_ANDROID_CHROME_BACKSPACE_HACK;
          p = l.getName().children(".content");
          v = q ? 0 : -1;
          p.setCaret(v, v, null, k);
          k = true;
        }
      }
    }
    d.applyLocalDelete();
    if (k) {
      if (IS_MOBILE) {
        l.scrollToViewProjectForMobile();
      }
    }
  });
  if (!a) {
    e = j !== null ? j : !f || c;
    undo_redo.finishOperationBatch(e);
    if (j === null && e) {
      if (f) {
        if (c) {
          showMessage((n > 1 ? n + " items" : "Item") + (g ? " (and " + (n > 1 ? "their" : "its") + " descendants)" : "") + ' deleted. <a class="undelete" href="#">Undo.</a>');
        }
      } else {
        showMessage("Embedded list" + (n > 1 ? "s" : "") + ' removed from this account. <a class="undelete" href="#">Undo.</a>');
      }
    }
  }
  return this;
};
jQuery.fn.duplicateIt = function(a, e) {
  if (e === undefined) {
    e = false;
  }
  var j = $(this);
  j = project_tree.getProjectReferencesFromDomProjects(j);
  if (projectReferenceSubtreesContainAtLeastNProjects(j, 1001)) {
    ui_sugar.showAlertDialog("Duplicating subtrees containing more than 1000 items is not supported.", "Error");
  } else {
    var h = project_tree.getProjectReferenceFromDomProject(a.getParent());
    var f = a.getPriority();
    var n = [];
    j.forEach(function(q) {
      q = q.duplicateProjectTreeForBulkCreate(true);
      n.push(q.projectTreeRoot);
    });
    undo_redo.startOperationBatch();
    j = h.applyLocalBulkCreateChildren(f, n);
    if (e) {
      item_select.clearItemSelection();
      project_tree.getMatchingDomProjectsForProjectReferences(j).addToItemSelection();
      undo_redo.finishOperationBatch(false, true);
    } else {
      var l = j[0].getMatchingDomProject();
      if (l.length > 0 && l.is(":visible")) {
        l.getName().moveCursorToBeginning();
        l.addClass("moving");
        setTimeout(function() {
          l.removeClass("moving");
        }, 500);
      }
      undo_redo.finishOperationBatch();
    }
    return this;
  }
};
jQuery.fn.moveProjects = function(a) {
  var e = $(this);
  e = project_tree.getProjectReferencesFromDomProjects(e);
  var j = project_tree.getProjectReferenceFromDomProject(a.getParent());
  a = a.getPriority();
  project_tree.applyLocalMoveForProjectReferences(e, j, a);
  a = $();
  j = 0;
  for (;j < e.length;j++) {
    a = a.add(e[j].getMatchingDomProject());
  }
  return a;
};
function hideControls() {
  var a = $("#controlsLeft");
  $("#hidden").append($("#controls"));
  a.removeClass("hovered");
}
jQuery.fn.clearControlsUnderProject = function(a) {
  if (a === undefined) {
    a = false;
  }
  var e = $(this);
  if ((a ? e.children(".children") : e).find("#controls").length === 1) {
    hideControls();
  }
};
function blurFocusedContent() {
  var a = getCurrentlyFocusedContent();
  if (a !== null) {
    a.blur();
  }
}
function blurFocusedContentOrInput() {
  var a = getCurrentlyFocusedContentOrInput();
  if (a !== null) {
    a.blur();
  }
}
jQuery.fn.setDialogButtonsDisable = function(a) {
  $(this).parent().find("button").button("option", "disabled", a);
};
function addSharedSubtreeToAccount() {
  var a = project_tree.getMainProjectTree();
  if (a.isShared()) {
    a = a.getShareId();
    var e = $("#addSharedSubtreeToMyAccountPopup");
    e.removeClass("success failure");
    e.dialog("open");
    e.addSpinner();
    e.dialog("option", {
      buttons : {}
    });
    var j = function(h, f, n) {
      if (n === undefined) {
        n = "There was an error communicating with the server. Please try again.";
      }
      e.addClass("failure");
      e.find(".failureMessage").text(n);
      e.removeSpinner();
      e.dialog("option", {
        buttons : {
          Close : function() {
            e.dialog("close");
          }
        }
      });
    };
    $.ajax({
      url : "/add_shared_subtree",
      data : {
        share_id : a
      },
      dataType : "json",
      type : "POST",
      success : function(h, f) {
        if (h == null) {
          j();
        } else {
          if (h.success) {
            e.addClass("success");
            e.removeSpinner();
            e.dialog("option", {
              buttons : {
                "View my account" : function() {
                  e.addSpinner();
                  e.setDialogButtonsDisable(true);
                  window.location = "/";
                },
                Close : function() {
                  e.dialog("close");
                }
              }
            });
          } else {
            var n = undefined;
            switch(h.error) {
              case "no_shared_project":
                n = "This list is no longer shared.";
                break;
              case "adding_own_shared_project":
                n = "This is your own list. It's already in your account!";
                break;
              case "already_added_shared_project":
                n = "You've already added this list to your account.";
            }
            j(h, f, n);
          }
        }
      },
      error : j
    });
  }
}
function refreshVisibleChildrenUnderSelectedForAddButton(a) {
  if (!IS_MOBILE) {
    if (a === undefined) {
      a = selectOnActivePage(".addButton");
    }
    if (selectOnActivePage(".selected > .children > .project:visible:first").length > 0) {
      a.addClass("visibleChildrenUnderSelected");
    } else {
      a.removeClass("visibleChildrenUnderSelected");
    }
  }
}
function reloadPageFromServer() {
  if (APPCACHE_ENABLED) {
    forceReloadAppCache();
  } else {
    window.location.reload(true);
  }
}
function forceReloadAppCache() {
  if (localstorage_helper.localStorageSupported()) {
    localstorage_helper.write("next", window.location.pathname + window.location.search + window.location.hash);
  }
  window.location = "/force_update_appcache";
}
function checkIfMostRecentlyOpenedWindowIdChanged() {
  if (localstorage_helper.localStorageSupported()) {
    var a = localstorage_helper.read(MOST_RECENTLY_OPENED_WINDOW_ID_KEY);
    if (!(!FULL_OFFLINE_ENABLED || (!APPCACHE_ENABLED ))) {
      if (WINDOW_ID !== a) {
        window.onbeforeunload = null;
        window.location = "/window_preempted";
      }
    }
  }
}
var localstorage_helper = function() {
  function a(q) {
    return n.getItem(q);
  }
  function e(q) {
    n.removeItem(q);
  }
  function j(q) {
    var o = n.length;
    var c = [];
    var g = 0;
    for (;g < o;g++) {
      var d = n.key(g);
      c.push(d);
    }
    o = 0;
    for (;o < c.length;o++) {
      q(c[o]);
    }
  }
  function h() {
    var q = {};
    j(function(o) {
      q[o] = a(o);
    });
    return q;
  }
  var f = null;
  var n = null;
  var l = null;
  return{
    init : function() {
      l = localstorage_detect.localStorageSupported();
      f = true;
      n = window.localStorage;
      if (!l) {
        return;
      }

      $(window).bind("storage", function(q) {
        if ("originalEvent" in q && "key" in q.originalEvent) {
          q = q.originalEvent.key;
          if (q === MOST_RECENTLY_OPENED_WINDOW_ID_KEY) {
            checkIfMostRecentlyOpenedWindowIdChanged();
          } else {
            if (userstorage.isEnabled()) {
              if (userstorage.isUserStorageKey(q)) {
                q = userstorage.stripKeyPrefix(q);
                userstorage.notifyChange(q);
              }
            }
          }
        }
      });
    },
    localStorageSupported : function() {
      return l;
    },
    write : function(q, o) {
      try {
        n.setItem(q, o);
      } catch (c) {
        if (FULL_OFFLINE_ENABLED) {
            ui_sugar.showAlertDialog("The storage available to WorkFlowy on your device is full. If you are working offline, syncing your data should free up space. If problems persist, please email <strong>help@workflowy.com</strong> and tell us what is happening.");
        }
      }
    },
    read : a,
    remove : e,
    bulkRemove : function(q, o) {
      if (o === undefined) {
        o = null;
      }
      if (f) {
        var c = 0;
        for (;c < q.length;c++) {
          e(q[c]);
        }
        if (o !== null) {
          o();
        }
      } else {
        n.bulkRemove(q, o);
      }
    },
    forEachKey : j,
    dumpAll : h,
    hackyDumpAllWithDecompressedChunks : function() {
      var q = h();
      var o;
      for (o in q) {
        if (o.match(/\.chunk\.\d+$/) !== null) {
          var c = q[o];
          if (c.charAt(0) === "*") {
            c = LZString.decompressFromUTF16(c.substring(1));
            q[o] = c;
          }
        }
      }
      return q;
    },
    notifyWindowFocus : function() {
      project_tree.getAllProjectTreesHelper().readLocalStorageExpandedProjects();
      if (userstorage.isEnabled()) {
        userstorage.notifyWindowFocus();
      }
    }
  };
}();
var userstorage = function() {
  function a() {
    this.name = "InitializationError";
  }
  function e(m) {
    if (m === undefined) {
      m = false;
    }
    if (!m) {
      if (q(p) !== USER_ID) {
        return;
      }
    }
    var w = h(v);
    if (w !== null) {
      m = m;
      if (m === undefined) {
        m = false;
      }
      var t;
      for (t in w) {
        var y = w[t];
        if (t in SETTINGS) {
          var A = y !== SETTINGS[t].value;
          SETTINGS[t].value = y;
          if (!m) {
            if (A) {
              // settings.registerSettingChange(t);
            }
          }
        }
      }
    }
  }
  function j(m) {
    var w = h(v);
    if (w === null) {
      w = {};
    }
    var t;
    for (t in m) {
      if (t in SETTINGS && SETTINGS[t].saveToClient) {
        w[t] = m[t];
      }
    }
    f(v, w);
  }
  function h(m) {
    m = q(m);
    if (m === null) {
      return null;
    }
    try {
      return JSON.parse(m);
    } catch (w) {
      return null;
    }
  }
  function f(m, w) {
    var t = JSON.stringify(w);
    o(m, t);
  }
  function n(m) {
    if (m === undefined) {
      m = null;
    }
    var w = [];
    l(function(t) {
      w.push(t);
    });
    c(w, m);
  }
  function l(m) {
    localstorage_helper.forEachKey(function(w) {
      if (g(w)) {
        w = d(w);
        m(w);
      }
    });
  }
  function q(m) {
    return localstorage_helper.read(k + m);
  }
  function o(m, w) {
    return localstorage_helper.write(k + m, w);
  }
  function c(m, w) {
    if (w === undefined) {
      w = null;
    }
    var t = [];
    var y = 0;
    for (;y < m.length;y++) {
      t.push(k + m[y]);
    }
    return localstorage_helper.bulkRemove(t, w);
  }
  function g(m) {
    return utils.isPrefixMatch(m, k);
  }
  function d(m) {
    return m.substring(k.length);
  }
  var k = "userstorage.";
  var p = "user_id";
  var v = "settings";
  var r = false;
  a.prototype = Error();
  var x = Class.extend({
    init : function(m, w, t) {
      this.namespace = m;
      this.name = w;
      this.storageKey = this.namespace + "." + this.name;
      this.value = t;
      if (this.isInStorage()) {
        this.syncFromStorage();
      } else {
        this.syncToStorage();
      }
    },
    setValue : function(m) {
      this.value = m;
      this.syncToStorage();
    },
    getValue : function() {
      return this.value;
    },
    isInStorage : function() {
      if (!FULL_OFFLINE_ENABLED) {
        return false;
      }
      return userstorage.read(this.storageKey) !== null;
    },
    syncFromStorage : function() {
      if (FULL_OFFLINE_ENABLED) {
        var m = userstorage.read(this.storageKey);
        this.value = utils.parseJsonWithErrorHandling(m, function() {
          throw new a;
        });
      }
    },
    syncToStorage : function() {
      if (FULL_OFFLINE_ENABLED) {
        var m = JSON.stringify(this.value);
        userstorage.write(this.storageKey, m);
      }
    }
  });
  var u = x.extend({
    init : function(m, w) {
      this._super(m, w, {});
    },
    set : function(m, w) {
      this.value[m] = w;
      this.syncToStorage();
    },
    get : function(m) {
      return this.value[m];
    },
    getDict : function() {
      return this.getValue();
    },
    clear : function() {
      this.setValue({});
    },
    copyTo : function(m) {
      m.setValue(this.value);
    },
    isEmpty : function() {
      return utils.objectIsEmpty(this.value);
    }
  });
  var b = Class.extend({
    type : null,
    init : function(m, w) {
      this.namespace = m;
      this.queueName = w;
      this.fullyQualifiedQueueName = this.namespace + "." + this.type + "." + this.queueName;
      this.list = null;
      if (this.isInStorage()) {
        this.syncFromStorage();
      } else {
        this.clear();
      }
    },
    isInStorage : function() {
      if (!FULL_OFFLINE_ENABLED) {
        return false;
      }
      return this.readKey("length") !== null;
    },
    syncFromStorage : function() {
      if (FULL_OFFLINE_ENABLED) {
        this.list = this.readList();
      }
    },
    syncToStorage : function() {
      if (FULL_OFFLINE_ENABLED) {
        this.writeList(this.list);
      }
    },
    syncToStorageForAppendAtPosition : function(m) {
      if (FULL_OFFLINE_ENABLED) {
        this.appendListInStorage(this.list, m);
      }
    },
    syncToStorageForUpdateOfLastItem : function() {
      if (FULL_OFFLINE_ENABLED) {
        var m = this.list[this.list.length - 1];
        var w = this.readKey("num_chunks") - 1;
        var t = this.readChunk(w);
        t[t.length - 1] = m;
        this.writeChunk(w, t);
      }
    },
    clear : function() {
      this.list = [];
      this.syncToStorage();
    },
    append : function(m) {
      var w = this.list.length > 0 ? this.list[this.list.length - 1] : null;
      if (w !== null) {
        w = this.collapseItemIntoPreviousItemIfApplicable(w, m);
        if (w !== null) {
          this.list[this.list.length - 1] = w;
          this.syncToStorageForUpdateOfLastItem();
          return;
        }
      }
      this.appendList([m]);
    },
    collapseItemIntoPreviousItemIfApplicable : function() {
      return null;
    },
    appendList : function(m) {
      var w = this.list.length;
      utils.pushArray(this.list, m);
      this.syncToStorageForAppendAtPosition(w);
    },
    copyTo : function(m) {
      m.list = this.list;
      m.syncToStorage();
    },
    prependTo : function(m) {
      m.list = this.list.concat(m.list);
      m.syncToStorage();
    },
    setList : function(m) {
      this.list = m;
      this.syncToStorage();
    },
    getLength : function() {
      return this.list.length;
    },
    getList : function() {
      return this.list;
    },
    applyToEachItemInList : function(m) {
      var w = false;
      var t = 0;
      for (;t < this.list.length;t++) {
        w |= m(this.list[t]);
      }
      if (w) {
        this.syncToStorage();
      }
    },
    readList : function() {
      var m = [];
      var w = this.readKey("num_chunks");
      if (w === null) {
        throw new a;
      }
      w = parseInt(w);
      if (isNaN(w) || w < 0) {
        throw new a;
      }
      var t = 0;
      for (;t < w;t++) {
        var y = this.readChunk(t);
        if (y === null) {
          throw new a;
        }
        utils.pushArray(m, y);
      }
      return m;
    },
    writeList : function(m) {
      var w = this.readKey("num_chunks");
      w = w !== null ? parseInt(w) : 0;
      var t = 0;
      for (;t < w;t++) {
        this.removeKey(this.chunkKey(t));
      }
      this.appendChunksInStorage(0, m);
      this.writeKey("length", m.length);
    },
    appendListInStorage : function(m, w) {
      var t = m.slice(w);
      var y = this.readKey("num_chunks");
      if (y > 0) {
        var A = y - 1;
        var F = this.readChunk(A);
        var z = 10 - F.length;
        if (z > 0) {
          z = t.splice(0, z);
          utils.pushArray(F, z);
          this.writeChunk(A, F);
        }
      }
      if (t.length > 0) {
        this.appendChunksInStorage(y, t);
      }
      this.writeKey("length", m.length);
    },
    appendChunksInStorage : function(m, w) {
      var t = m;
      var y = 0;
      for (;y < w.length;y += 10) {
        var A = t;
        var F = w.slice(y, y + 10);
        this.writeChunk(A, F);
        t++;
      }
      this.writeKey("num_chunks", t);
    },
    readChunk : function(m) {
      m = this.readKey(this.chunkKey(m));
      if (m === null || m.length === 0) {
        return null;
      }
      if (m.charAt(0) === "*") {
        m = LZString.decompressFromUTF16(m.substring(1));
        if (m === null) {
          return null;
        }
      } else {
        m = m;
      }
      try {
        var w = JSON.parse(m);
      } catch (t) {
        return null;
      }
      return w;
    },
    writeChunk : function(m, w) {
      var t = JSON.stringify(w);
      t = "*" + LZString.compressToUTF16(t);
      this.writeKey(this.chunkKey(m), t);
    },
    chunkKey : function(m) {
      return "chunk." + m;
    },
    getUserStorageKeyName : function(m) {
      return this.fullyQualifiedQueueName + "." + m;
    },
    readKey : function(m) {
      return userstorage.read(this.getUserStorageKeyName(m));
    },
    writeKey : function(m, w) {
      return userstorage.write(this.getUserStorageKeyName(m), w);
    },
    removeKey : function(m, w) {
      return userstorage.remove(this.getUserStorageKeyName(m), w);
    }
  });
  var s = b.extend({
    type : "operation_queue",
    init : function(m, w) {
      this._super(m, w);
    },
    containsOperationType : function(m) {
      var w = 0;
      for (;w < this.list.length;w++) {
        if (this.list[w].type === m) {
          return true;
        }
      }
      return false;
    },
    collapseItemIntoPreviousItemIfApplicable : function(m, w) {
      return operations.collapseOperationIntoPreviousOperationIfApplicable(m, w);
    }
  });
  b = b.extend({
    type : "operation_transaction_queue",
    init : function(m, w) {
      this._super(m, w);
    },
    getMostRecentOperationTransactionId : function() {
      return this.list.length === 0 ? null : this.list[this.list.length - 1].id;
    },
    garbageCollectPastOperationTransactions : function(m) {
      var w = this.list.length;
      for (;w > 0;w--) {
        if (this.list[w - 1].id <= m) {
          break;
        }
      }
      if (w > 0) {
        this.list = this.list.slice(w);
        this.syncToStorage();
      }
      return w;
    }
  });
  return{
    InitializationError : a,
    init : function() {
      if (localstorage_helper.localStorageSupported()) {
        r = true;
        var m = q(p);
        if (m === null || m !== USER_ID) {
          utils.debugMessage("Clearing userstorage because of new or different user_id");
          n();
          o(p, USER_ID);
          o("format_version", 3);
        }
        m = q("appcache_id");
        if (m === null || APPCACHE_ID !== m) {
          utils.debugMessage("First run for this app cache version");
          o("appcache_id", APPCACHE_ID);
        } else {
          utils.debugMessage("Not the first run for this app cache version");
          var w;
          for (w in FIRST_LOAD_FLAGS) {
            FIRST_LOAD_FLAGS[w] = false;
          }
        }
        e(true);
      }
    },
    isEnabled : function() {
      return r;
    },
    read : q,
    write : o,
    readJSON : h,
    writeJSON : f,
    remove : function(m) {
      return localstorage_helper.remove(k + m);
    },
    clear : n,
    isUserStorageKey : g,
    stripKeyPrefix : d,
    dumpAll : function() {
      var m = {};
      l(function(w) {
        m[w] = q(w);
      });
      return m;
    },
    updateSettingsFromServer : function(m) {
      j(m);
      e();
    },
    saveSettings : j,
    notifyChange : function(m) {
      if (m === v) {
        e();
      }
    },
    notifyWindowFocus : function() {
      e();
    },
    PersistentValue : x,
    PersistentDict : u,
    PersistentOperationQueue : s,
    PersistentOperationTransactionQueue : b
  };
}();
var appcache_helper = function() {
  function a(o, c) {
    var g = 0;
    for (;g < o.length;g++) {
      (0, o[g])(c);
    }
  }
  function e() {
    try {
      window.applicationCache.update();
    } catch (o) {
      utils.debugMessage(o);
      utils.debugMessage("Exception thrown when applicationCache.update() called. Update failed.");
      a(l, false);
      a(q, false);
      l = [];
      q = [];
      n = false;
    }
  }
  function j(o) {
    if (o === undefined) {
      o = null;
    }
    if (f()) {
      if (o !== null) {
        q.push(o);
      }
      n = true;
    } else {
      if (o !== null) {
        l.push(o);
      }
      e();
    }
  }
  function h(o) {
    if (f()) {
      l.push(function() {
        h(o);
      });
    } else {
      utils.debugMessage("Marking cache manifest dirty on server so we can update app cache");
      $.ajax({
        url : "/mark_cache_manifest_dirty",
        success : function() {
          j(o);
        }
      });
    }
  }
  function f() {
    return window.applicationCache.status === window.applicationCache.CHECKING || window.applicationCache.status === window.applicationCache.DOWNLOADING;
  }
  var n = false;
  var l = [];
  var q = [];
  return{
    init : function() {
      window.applicationCache.onupdateready = window.applicationCache.oncached = window.applicationCache.onobsolete = window.applicationCache.onnoupdate = function() {
        a(l, window.applicationCache.status === window.applicationCache.UPDATEREADY);
        l = q;
        q = [];
        if (n) {
          n = false;
          e();
        } else {
        }
      };
      window.applicationCache.onerror = function() {
        utils.pushArray(l, q);
        q = [];
        if (n || l.length > 0) {
          n = false;
          e();
        }
      };
    },
    update : j,
    markCacheManifestDirtyAndThenUpdate : h,
    swapCache : function() {
      window.applicationCache.swapCache();
    },
    isCurrentlyDownloading : function() {
      return window.applicationCache.status === window.applicationCache.DOWNLOADING;
    }
  };
}();
var dom_utils = function() {
  function a(k, p) {
    var v = k.childNodes;
    var r = 0;
    var x = v.length;
    for (;r < x;r++) {
      var u = v[r];
      if (e(u)) {
        p(u);
      }
    }
  }
  function e(k) {
    if (k.nodeName.toLowerCase() === "style") {
      return false;
    }
    return true;
  }
  function j(k) {
    var p = [];
    if (k.nodeType === Node.TEXT_NODE) {
      p.push(k);
    } else {
      a(k, function(v) {
        p.push.apply(p, j(v));
      });
    }
    return p;
  }
  function h(k, p, v) {
    var r = k === p;
    if (k.nodeType === Node.TEXT_NODE) {
      return r ? {
        text : k.nodeValue.substring(0, v),
        containsBeforeContainer : true
      } : {
        text : k.nodeValue,
        containsBeforeContainer : false
      };
    } else {
      k = k.childNodes;
      var x = r ? v : k.length;
      var u = false;
      var b = "";
      var s = 0;
      for (;s < x;s++) {
        var m = k[s];
        if (e(m)) {
          m = h(m, p, v);
          b += m.text;
          if (m.containsBeforeContainer) {
            u = true;
            break;
          }
        }
      }
      return{
        text : b,
        containsBeforeContainer : r || u
      };
    }
  }
  function f(k) {
    k = j(k);
    var p = "";
    var v = 0;
    for (;v < k.length;v++) {
      p += k[v].nodeValue;
    }
    return p;
  }
  function n(k, p, v) {
    var r = $("#header").outerHeight();
    var x = $(window);
    var u = x.height();
    var b = x.scrollTop();
    var s = b + r;
    b = b + u;
    var m = k - r - 20;
    var w = p + 20 - u;
    var t = p - k > u - r - 40;
    if (v === "none") {
      if (k < s || p > b) {
        if (t) {
          x.scrollTop(m);
        } else {
          x.scrollTop(k + (p - k) / 2 - (u - r) / 2 - r);
        }
      }
    } else {
      if (k < s) {
        if (v === "up" || !t) {
          x.scrollTop(m);
        } else {
          if (v === "down") {
            if (p > b) {
              x.scrollTop(w);
            }
          }
        }
      } else {
        if (p > b) {
          if (v === "down" || !t) {
            x.scrollTop(w);
          }
        }
      }
    }
  }
  function l(k) {
    var p = ["transform", "webkitTransform", "MozTransform", "msTransform"];
    var v = 0;
    for (;v < p.length;v++) {
      var r = p[v];
      if (r in k.style) {
        return r;
      }
    }
    return null;
  }
  function q(k) {
    return k.style[l(k)];
  }
  function o(k, p) {
    var v = 0;
    var r = 0;
    for (;r < k.length;r++) {
      if (k.charAt(r) !== content_text.CONTENT_BEGINNING_MARKER_CHAR_FOR_ANDROID_BACKSPACE_HACK) {
        v++;
        if (v > p) {
          return r;
        }
      }
    }
    return k.length;
  }
  var c = window.requestAnimationFrame || (window.mozRequestAnimationFrame || (window.webkitRequestAnimationFrame || (window.msRequestAnimationFrame || null)));
  var g = window.cancelAnimationFrame || (window.mozCancelAnimationFrame || (window.webkitCancelAnimationFrame || (window.msCancelAnimationFrame || null)));
  var d = IS_IE ? function(k) {
    var p = document.body.createTextRange();
    p.moveToElementText(k);
    return p.text.replace(/\r\n/g, "\n");
  } : function(k) {
    var p = window.getSelection();
    p.selectAllChildren(k);
    k = p.toString();
    p.removeAllRanges();
    return k;
  };
  jQuery.fn.getCaret = function() {
    var k = this[0];
    var p = window.getSelection().getRangeAt(0);
    var v = h(k, p.startContainer, p.startOffset).text;
    k = p.collapsed ? v : h(k, p.endContainer, p.endOffset).text;
    if (USE_ANDROID_CHROME_BACKSPACE_HACK) {
      v = v.replace(content_text.CONTENT_BEGINNING_MARKER_CHAR_FOR_ANDROID_BACKSPACE_HACK_REGEXP, "");
      k = k.replace(content_text.CONTENT_BEGINNING_MARKER_CHAR_FOR_ANDROID_BACKSPACE_HACK_REGEXP, "");
    }
    return{
      start : v.length,
      end : k.length
    };
  };
  jQuery.fn.setCaret = function(k, p, v, r) {
    if (p === undefined) {
      p = k;
    }
    if (v === undefined) {
      v = null;
    }
    if (r === undefined) {
      r = false;
    }
    if (!animations.animationsAreInProgress()) {
      if (!READ_ONLY_MAIN_TREE) {
        var x = $(this);
        if (IS_MOBILE) {
          if (x.attr("contenteditable") === undefined) {
            x.attr("contenteditable", "true");
          }
        }
        if (!IS_IOS && !r) {
          r = null;
          if (v === "doNotScroll" || v === "doNotScrollIfOnScreen" && x.isOnScreen()) {
            var u = $(window);
            r = u.scrollTop();
          }
          x.focus();
          if (r !== null) {
            u.scrollTop(r);
          }
        }
        v = x[0];
        u = null;
        if (!USE_ANDROID_CHROME_BACKSPACE_HACK && (k === 0 && p === 0)) {
          p = document.createRange();
          p.setStart(v, 0);
          p.setEnd(v, 0);
          u = p;
        } else {
          x = content_text.getPlainTextForContent(x).length;
          k = k === -1 ? x : Math.min(k, x);
          p = p === -1 ? x : Math.min(p, x);
          if (USE_ANDROID_CHROME_BACKSPACE_HACK) {
            x = f(v);
            k = o(x, k);
            p = o(x, p);
          }
          k = k;
          x = p;
          p = document.createRange();
          p.selectNodeContents(v);
          u = j(v);
          r = false;
          var b = 0;
          var s;
          var m = k === x;
          var w = 0;
          var t;
          for (;t = u[w++];) {
            s = b + t.length;
            if (!r && (k >= b && (k < s || m && k === s))) {
              p.setStart(t, k - b);
              r = true;
            }
            if (r && x <= s) {
              p.setEnd(t, x - b);
              break;
            }
            b = s;
          }
          if (!r) {
            k = v.childNodes.length;
            p.setStart(v, k);
            p.setEnd(v, k);
          }
          u = p;
        }
        v = window.getSelection();
        v.removeAllRanges();
        v.addRange(u);
      }
    }
  };
  jQuery.fn.getCaretForTextArea = function() {
    var k = $(this)[0];
    return{
      start : k.selectionStart,
      end : k.selectionEnd
    };
  };
  jQuery.fn.setCaretForTextArea = function(k, p) {
    if (p === undefined) {
      p = k;
    }
    var v = $(this);
    var r = v[0];
    v.focus();
    r.setSelectionRange(k, p);
  };
  jQuery.fn.getContentCaretOffset = function(k) {
    if (k === undefined) {
      k = null;
    }
    var p = $(this);
    var v = p.isNote();
    var r = p.html();
    var x = p.getCaret();
    if (k === null) {
      k = x.start;
    }
    v = new content_text.ContentText(p, v);
    p.setContentHtml(v.getContentHtml(k));
    k = p.find(".contentCaret").offset();
    p.setContentHtml(r);
    p.setCaret(x.start, x.end);
    return k;
  };
  jQuery.fn.getContentCaretLineInfo = function(k) {
    var p = $(this);
    var v = parseInt(p.css("lineHeight"));
    var r = Math.round(p.height() / v);
    var x = {
      numLines : r
    };
    if (r === 1 || k === 0) {
      x.caretPosLine = 0;
      return x;
    }
    r = p.isNote();
    r = new content_text.ContentText(p, r);
    k = $('<div class="content">' + r.getContentHtml(k) + "</div>");
    k.css({
      position : "absolute",
      width : p.width() + "px"
    });
    p.after(k);
    p = k.offset();
    r = k.find(".contentCaret").offset();
    k.remove();
    x.caretPosLine = Math.floor((r.top - v / 2 - p.top) / v);
    return x;
  };
  jQuery.fn.isOnScreen = function() {
    var k = $(this);
    var p = k.offset().top;
    k = p + k.outerHeight();
    var v = $(window).scrollTop();
    var r = v + $(window).height();
    return p < r && k > v;
  };
  jQuery.fn.scrollToBeOnScreen = function(k) {
    var p = $(this);
    var v = p.first();
    p = p.last();
    v = v.offset().top;
    p = p.offset().top + p.outerHeight();
    n(v, p, k);
  };
  jQuery.fn.hideWithoutMemoryLeaks = function() {
    this.css("display", "none");
    return this;
  };
  jQuery.fn.slideUpWithoutMemoryLeaks = function(k, p) {
    this.css("overflow", "hidden");
    this.animate({
      height : 0
    }, k, function() {
      var v = $(this);
      v.removeAttr("style");
      v.hideWithoutMemoryLeaks();
      if (p !== undefined) {
        p.call(this);
      }
    });
    return this;
  };
  jQuery.fn.dataWithoutMemoryLeaks = function(k, p) {
    var v = "data-" + utils.camelCaseToHyphenated(k);
    if (p !== undefined) {
      var r = JSON.stringify(p);
      this.attr(v, r);
      return this;
    } else {
      v = this.attr(v);
      return v !== undefined ? JSON.parse(v) : undefined;
    }
  };
  jQuery.fn.removeDataWithoutMemoryLeaks = function(k) {
    this.removeAttr("data-" + utils.camelCaseToHyphenated(k));
    return this;
  };
  return{
    supportsRequestAnimationFrame : function() {
      return c !== null && g !== null;
    },
    requestAnimationFrame : function(k) {
      return c(k);
    },
    cancelAnimationFrame : function(k) {
      g(k);
    },
    executeASAP : function(k) {
      if (c !== null) {
        c(k);
      } else {
        setTimeout(k, 0);
      }
    },
    executeAfterRepaint : function(k) {
      if (c === null) {
        setTimeout(k, 0);
      } else {
        c(function() {
          c(k);
        });
      }
    },
    selectionIsBackward : function() {
      var k = window.getSelection();
      if (k.rangeCount === 0 || k.isCollapsed) {
        return false;
      }
      var p = k.anchorNode.compareDocumentPosition(k.focusNode);
      if (p === 0) {
        return k.anchorOffset > k.focusOffset;
      }
      return(p & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
    },
    clearSelection : function() {
      window.getSelection().removeAllRanges();
    },
    selectElementText : function(k) {
      var p = window.getSelection();
      var v = document.createRange();
      v.selectNodeContents(k);
      p.removeAllRanges();
      p.addRange(v);
    },
    elementContainsSelection : function(k) {
      var p = window.getSelection();
      if (p.rangeCount === 0) {
        return false;
      }
      p = p.getRangeAt(0).commonAncestorContainer;
      return p === k || $.contains(k, p);
    },
    forEachVisibleChildOfNode : a,
    getInnerText : f,
    getTextInNodeBefore : h,
    getFormattedElementText : d,
    clearChildrenOfElement : function(k) {
      for (;k.firstChild;) {
        k.removeChild(k.firstChild);
      }
    },
    scrollForRangeToBeOnScreen : n,
    getTransformStyleForElement : q,
    setTransformStyleForElement : function(k, p) {
      k.style[l(k)] = p;
    },
    getTransformTranslateParametersFromStyle : function(k) {
      var p = q(k).match(/translate\((-?[0-9]+px|0), (-?[0-9]+px|0)\)/);
      if (p === null) {
        return null;
      }
      k = parseInt(p[1]);
      p = parseInt(p[2]);
      return{
        x : k,
        y : p
      };
    },
    nodeIsOrIsContainedByOtherNode : function(k, p) {
      return k === p || $.contains(p, k);
    }
  };
}();
var content_text = function() {
  function a(z, D) {
    var E = "";
    var G = 1;
    for (;z !== 0;) {
      if ((z & 1) !== 0) {
        var B = r[G].tag;
        if (D) {
          E += "<" + B + ">";
        } else {
          E = "</" + B + ">" + E;
        }
      }
      z >>= 1;
      G <<= 1;
    }
    return E;
  }
  function e(z, D) {
    if (z === null) {
      return D === null ? null : D;
    } else {
      if (D === null) {
        return z;
      }
    }
    var E = 0;
    for (;E < z.length;E++) {
      z[E] |= D[E];
    }
    return z;
  }
  function j(z, D) {
    if (z.nodeType === Node.TEXT_NODE) {
      return utils.createArrayOfIdenticalElements(D, z.nodeValue.length);
    } else {
      var E = z.nodeName.toLowerCase();
      if (E === "parsererror") {
        throw Error("Encountered parsererror");
      }
      if (E in x) {
        D |= x[E].flag;
      }
      var G = [];
      dom_utils.forEachVisibleChildOfNode(z, function(B) {
        B = j(B, D);
        utils.pushArray(G, B);
      });
      return G;
    }
  }
  function h(z, D, E, G, B) {
    if (G === undefined) {
      G = 0;
    }
    if (B === undefined) {
      B = 0;
    }
    if (!D && z.nodeType === Node.TEXT_NODE) {
      D = G & ~B;
      z = z.nodeValue;
      E.plainText += z;
      utils.pushArray(E.formatFlagsForChars, utils.createArrayOfIdenticalElements(D, z.length));
    } else {
      if (!D) {
        D = z.className.split(" ");
        var J = 0;
        for (;J < D.length;J++) {
          var N = D[J];
          if (N in u && u[N].tag !== null) {
            G |= u[N].flag;
          }
        }
        if (IS_IOS) {
          D = z.nodeName.toLowerCase();
          if (D in x) {
            G |= x[D].flag;
          }
          D = z.style;
          if (D.fontWeight === "normal") {
            B |= w;
          }
          if (D.fontStyle === "normal") {
            B |= t;
          }
        }
      }
      dom_utils.forEachVisibleChildOfNode(z, function(T) {
        h(T, false, E, G, B);
      });
    }
  }
  function f(z) {
    return z.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
  }
  function n(z, D, E, G, B, J) {
    if (G === undefined) {
      G = null;
    }
    if (B === undefined) {
      B = false;
    }
    if (J === undefined) {
      J = false;
    }
    var N = null;
    if (search.inSearchMode()) {
      N = search.getSearchQuery().getMatchingChars(z, k);
    }
    E = e(N, E);
    var T = [];
    content_parsing.forEachUrlInString(z, function(ba, ga, ja) {
      T.push({
        type : "url",
        spanStart : ba,
        spanLength : ga.length,
        urlContainsProtocol : ja
      });
    });
    content_parsing.forEachEmailAddressInString(z, function(ba, ga) {
      T.push({
        type : "email",
        spanStart : ba,
        spanLength : ga.length
      });
    });
    content_parsing.forEachPhoneNumberInString(z, function(ba, ga) {
      T.push({
        type : "phonenumber",
        spanStart : ba,
        spanLength : ga.length
      });
    });
    tagging.forEachTagInString(z, function(ba, ga) {
      T.push({
        type : "tag",
        spanStart : ba,
        spanLength : ga.length
      });
    }, false);
    T.sort(function(ba, ga) {
      if (ba.spanStart == ga.spanStart) {
        return 0;
      }
      return ba.spanStart < ga.spanStart ? -1 : 1;
    });
    N = "";
    var V = search.inSearchMode() && search.getSearchQuery().canMetaMatch();
    if (V) {
      N += '<span class="innerContentContainer">';
    }
    if (!D && USE_ANDROID_CHROME_BACKSPACE_HACK) {
      N += g;
    }
    var X = 0;
    var ea;
    for (ea in T) {
      var I = T[ea];
      var L = I.spanStart;
      if (!(L < X)) {
        N += q(z, E, G, X, I.spanStart, J);
        X = L + I.spanLength;
        var M = z.substring(L, X);
        var U = html_utils.htmlEscapeTextForContent(M);
        switch(I.type) {
          case "url":
            U = U;
            if (!I.urlContainsProtocol) {
              U = "http://" + U;
            }
            L = q(z, E, G, L, X, J);
            L = l(L, U, B);
            N += L;
            break;
          case "email":
            L = q(z, E, G, L, X, J);
            N += l(L, "mailto:" + U, B);
            break;
          case "phonenumber":
            U = html_utils.htmlEscapeTextForContent(urls.formatPhoneNumberForTelUrl(M));
            L = q(z, E, G, L, X, J);
            N += l(L, "tel:" + U, B);
            break;
          case "tag":
            M = q(z, E, G, L, L + 1, J);
            L = q(z, E, G, L + 1, X, J);
            N += '<span class="contentTag" title="Filter ' + U + '">' + M + '<span class="contentTagText">' + L + "</span></span>";
        }
        X = I.spanStart + I.spanLength;
      }
    }
    N += q(z, E, G, X, z.length, J);
    if (D) {
      N += "\n";
    }
    if (V) {
      N += "</span>";
    }
    return N;
  }
  function l(z, D, E) {
    return E ? '<span class="contentLink">' + z + "</span>" : '<a class="contentLink" target="_blank" rel="noreferrer" href="' + D + '">' + z + "</a>";
  }
  function q(z, D, E, G, B, J) {
    if (D === null && E === null) {
      return html_utils.htmlEscapeTextForContent(z.substring(G, B));
    }
    var N = "";
    G = G;
    for (;G < B;) {
      var T = G;
      var V;
      if (D !== null) {
        V = D[G] | 0;
        var X = V === 0 || !J ? Number.MAX_VALUE : 1;
        for (;G < B && (G - T < X && (D[G] | 0) === V);) {
          G++;
        }
      } else {
        V = 0;
        G = B;
      }
      X = G;
      if (E !== null && (E >= T && E < X)) {
        T = z.substring(T, E);
        X = z.substring(E, X);
        T = html_utils.htmlEscapeTextForContent(T) + '<span class="contentCaretContainer"><span class="contentCaret"></span>' + html_utils.htmlEscapeTextForContent(X.charAt(0)) + "</span>" + html_utils.htmlEscapeTextForContent(X.substring(1));
      } else {
        T = z.substring(T, X);
        T = html_utils.htmlEscapeTextForContent(T);
      }
      if (V !== 0) {
        V = V;
        X = "";
        var ea = 1;
        var I = false;
        for (;V !== 0;) {
          if ((V & 1) !== 0) {
            var L = r[ea].contentClass;
            if (I) {
              X += " ";
            }
            X += L;
            I = true;
          }
          V >>= 1;
          ea <<= 1;
        }
        N += '<span class="' + X + '">' + T + "</span>";
      } else {
        N += T;
      }
    }
    if (E !== null && (E === z.length && B === z.length)) {
      N += '<span class="contentCaret"></span>';
    }
    return N;
  }
  var o = new window.DOMParser;
  var c = /&|</;
  var g = "\u200b";
  var d = RegExp(g, "g");
  var k = null;
  var p = "";
  var v = [{
    tag : null,
    contentClass : "contentMatch"
  }, {
    tag : "b",
    contentClass : "contentBold"
  }, {
    tag : "i",
    contentClass : "contentItalic"
  }, {
    tag : "u",
    contentClass : "contentUnderline"
  }];
  var r = {};
  var x = {};
  var u = {};
  var b = 0;
  for (;b < v.length;b++) {
    var s = v[b];
    var m = Math.pow(2, b);
    s.flag = m;
    if (s.contentClass === "contentMatch") {
      k = m;
    }
    r[m] = s;
    if (s.tag !== null) {
      x[s.tag] = s;
      p += (p.length > 0 ? ", " : "") + "." + s.contentClass;
    }
    u[s.contentClass] = s;
  }
  var w = x.b.flag;
  var t = x.i.flag;
  var y = x.u.flag;
  var A = Class.extend({
    init : function(z) {
      if (z === undefined) {
        z = null;
      }
      if (z !== null) {
        this._formatFlags = z._formatFlags;
        this._setLocation = z._setLocation !== null ? utils.copyObject(z._setLocation) : null;
      } else {
        this._formatFlags = 0;
        this._setLocation = null;
      }
    },
    copy : function() {
      return new A(this);
    },
    isEmpty : function() {
      return this._formatFlags === 0;
    },
    boldIsSet : function() {
      return(this._formatFlags & w) !== 0;
    },
    italicIsSet : function() {
      return(this._formatFlags & t) !== 0;
    },
    underlineIsSet : function() {
      return(this._formatFlags & y) !== 0;
    },
    clear : function() {
      this._formatFlags = 0;
      this._setLocation = null;
    },
    toggleBold : function() {
      this._formatFlags ^= w;
    },
    toggleItalic : function() {
      this._formatFlags ^= t;
    },
    toggleUnderline : function() {
      this._formatFlags ^= y;
    },
    setFormatFlagsSetLocation : function(z, D, E) {
      if (E === undefined) {
        E = false;
      }
      var G = this._setLocation;
      z = {
        projectReference : project_tree.getProjectReferenceFromDomProject(z.getProject()),
        isNote : z.isNote(),
        caretPos : D
      };
      G = G !== null && (z.projectReference.equals(G.projectReference) && (z.isNote === G.isNote && z.caretPos === G.caretPos));
      if (!G) {
        this._formatFlags = 0;
      }
      this._setLocation = !G && E ? null : z;
    },
    clearFormatFlagsSetLocationIfChanged : function(z, D) {
      this.setFormatFlagsSetLocation(z, D, true);
    }
  });
  var F = Class.extend({
    init : function(z, D) {
      if (z instanceof F) {
        this._isForNote = z._isForNote;
        this._plainText = z._plainText;
        this._formatFlagsForChars = z._formatFlagsForChars;
      } else {
        if (D === undefined) {
          D = false;
        }
        this._isForNote = D;
        if (typeof z === "string") {
          if (c.test(z)) {
            var E = null;
            try {
              E = o.parseFromString("<root>" + z + "</root>", "text/xml");
            } catch (G) {
              E = null;
            }
            var B = false;
            if (E !== null) {
              var J = E.childNodes.length === 1 && E.childNodes[0].nodeName.toLowerCase() === "root" ? E.childNodes[0] : null;
              var N = null;
              if (J !== null) {
                B = true;
                try {
                  var T = J.childNodes;
                  N = T.length === 1 && T[0].nodeType === Node.TEXT_NODE ? null : j(J, 0);
                } catch (V) {
                  B = false;
                }
              }
            }
            if (B) {
              this._plainText = dom_utils.getInnerText(J);
              this._formatFlagsForChars = N;
            } else {
              this._plainText = "";
              this._formatFlagsForChars = null;
            }
            this._requiredParse = true;
            this._failedParse = !B;
          } else {
            this._plainText = z;
            this._formatFlagsForChars = null;
          }
        } else {
          N = {
            plainText : "",
            formatFlagsForChars : []
          };
          h(z[0], true, N);
          E = N.plainText;
          N = N.formatFlagsForChars;
          if (USE_ANDROID_CHROME_BACKSPACE_HACK) {
            this._originalContentContainsBeginningMarkerChar = E.length > 0 && E.charAt(0) === g;
            B = "";
            J = [];
            T = 0;
            for (;T < E.length;T++) {
              var X = E.charAt(T);
              var ea = N[T];
              if (X !== g) {
                B += X;
                J.push(ea);
              }
            }
            E = B;
            N = J;
          }
          if (E.charAt(E.length - 1) === "\n") {
            E = E.substring(0, E.length - 1);
            N.splice(N.length - 1, 1);
          }
          this._plainText = E;
          this._formatFlagsForChars = N;
        }
      }
    },
    requiredParse : function() {
      return this._requiredParse === true;
    },
    failedParse : function() {
      return this._failedParse === true;
    },
    originalContentContainsBeginningMarkerChar : function() {
      return this._originalContentContainsBeginningMarkerChar === true;
    },
    containsFormatting : function() {
      if (this._formatFlagsForChars === null) {
        return false;
      }
      var z = 0;
      for (;z < this._formatFlagsForChars.length;z++) {
        if (this._formatFlagsForChars[z] !== 0) {
          return true;
        }
      }
      return false;
    },
    getLines : function() {
      var z = [];
      var D = 0;
      for (;D < this._plainText.length;) {
        var E = this._plainText.indexOf("\n", D);
        if (E === -1) {
          E = this._plainText.length;
        }
        var G = this._plainText.substring(D, E);
        D = this._formatFlagsForChars !== null ? this._formatFlagsForChars.slice(D, E) : null;
        var B = this.copy();
        B._plainText = G;
        B._formatFlagsForChars = D;
        z.push(B);
        D = E + 1;
      }
      return z;
    },
    getText : function() {
      if (this._formatFlagsForChars === null) {
        return f(this._plainText);
      }
      var z = "";
      var D = 0;
      var E = 0;
      for (;E < this._plainText.length;) {
        var G = E;
        var B = this._formatFlagsForChars[G];
        for (;E < this._plainText.length && this._formatFlagsForChars[E] === B;) {
          E++;
        }
        var J = D & ~B;
        var N = B & ~D;
        var T = 0;
        if (N !== 0 && (D & ~J) > N) {
          var V = -2;
          for (;(N & ~V) === 0;) {
            V <<= 1;
          }
          T |= D & ~J & V;
        }
        if (J !== 0 && (D & ~J) > J) {
          V = -2;
          for (;(J & ~V) === 0;) {
            V <<= 1;
          }
          T |= D & ~J & V;
        }
        J |= T;
        N |= T;
        if (J !== 0) {
          z += a(J, false);
        }
        if (N !== 0) {
          z += a(N, true);
        }
        D = this._plainText.substring(G, E);
        z += f(D);
        D = B;
      }
      if (D !== 0) {
        z += a(D, false);
      }
      return z;
    },
    getContentHtml : function(z, D) {
      if (z === undefined) {
        z = null;
      }
      if (D === undefined) {
        D = false;
      }
      return n(this._plainText, this._isForNote, this._formatFlagsForChars, z, D);
    },
    getContentHtmlWithSingleCharFormattingSpans : function() {
      return n(this._plainText, this._isForNote, this._formatFlagsForChars, null, false, true);
    },
    getHtml : function() {
      return q(this._plainText, this._formatFlagsForChars, null, 0, this._plainText.length, false);
    },
    getPlainText : function() {
      return this._plainText;
    },
    isEmpty : function() {
      return this._plainText.length === 0;
    },
    copy : function() {
      return new F(this);
    },
    substring : function(z, D) {
      var E = this.copy();
      E._plainText = E._plainText.substring(z, D);
      E._formatFlagsForChars = E._formatFlagsForChars !== null ? E._formatFlagsForChars.slice(z, D) : null;
      return E;
    },
    concatenate : function(z) {
      var D = this.copy();
      if (D._formatFlagsForChars !== null || z._formatFlagsForChars !== null) {
        D._formatFlagsForChars = (D._formatFlagsForChars || utils.createArrayOfIdenticalElements(0, D._plainText.length)).concat(z._formatFlagsForChars || utils.createArrayOfIdenticalElements(0, z._plainText.length));
      }
      D._plainText += z._plainText;
      return D;
    },
    insertAtCaret : function(z, D) {
      var E = this.copy();
      E._plainText = E._plainText.substring(0, D.start) + z + E._plainText.substring(D.end);
      if (E._formatFlagsForChars !== null) {
        var G = D.start === 0 ? 0 : E._formatFlagsForChars[D.start - 1];
        E._formatFlagsForChars = E._formatFlagsForChars.slice(0, D.start).concat(utils.createArrayOfIdenticalElements(G, z.length), E._formatFlagsForChars.slice(D.end));
      }
      return E;
    },
    isEntirelyBold : function() {
      return this.isEntirelyFormatFlagged(w);
    },
    isEntirelyItalic : function() {
      return this.isEntirelyFormatFlagged(t);
    },
    isEntirelyUnderline : function() {
      return this.isEntirelyFormatFlagged(y);
    },
    isEntirelyFormatFlagged : function(z) {
      if (this._plainText.length === 0) {
        return true;
      }
      if (this._formatFlagsForChars === null) {
        return false;
      }
      var D = 0;
      for (;D < this._formatFlagsForChars.length;D++) {
        if ((this._formatFlagsForChars[D] & z) === 0) {
          return false;
        }
      }
      return true;
    },
    toggleBoldForCaret : function(z) {
      this.toggleFormatFlagForCaret(w, z);
    },
    toggleItalicForCaret : function(z) {
      this.toggleFormatFlagForCaret(t, z);
    },
    toggleUnderlineForCaret : function(z) {
      this.toggleFormatFlagForCaret(y, z);
    },
    toggleFormatFlagForCaret : function(z, D) {
      if (this._formatFlagsForChars === null) {
        this._formatFlagsForChars = utils.createArrayOfIdenticalElements(0, this._plainText.length);
      }
      var E = true;
      var G = D.start;
      for (;G < D.end;G++) {
        if ((this._formatFlagsForChars[G] & z) === 0) {
          E = false;
          break;
        }
      }
      G = D.start;
      for (;G < D.end;G++) {
        if (E) {
          this._formatFlagsForChars[G] &= ~z;
        } else {
          this._formatFlagsForChars[G] |= z;
        }
      }
    }
  });
  return{
    CONTENT_BEGINNING_MARKER_CHAR_FOR_ANDROID_BACKSPACE_HACK : g,
    CONTENT_BEGINNING_MARKER_CHAR_FOR_ANDROID_BACKSPACE_HACK_REGEXP : d,
    FormatFlags : A,
    ContentText : F,
    getContentHtml : function(z, D, E, G) {
      if (E === undefined) {
        E = null;
      }
      if (G === undefined) {
        G = false;
      }
      return(new F(z, D)).getContentHtml(E, G);
    },
    getHtml : function(z) {
      return(new F(z)).getHtml();
    },
    getPlainText : function(z) {
      return(new F(z)).getPlainText();
    },
    getTextForContent : function(z) {
      return(new F(z)).getText();
    },
    getPlainTextForContent : function(z) {
      return(new F(z)).getPlainText();
    },
    createContentTextContainerFromPlainText : function(z, D) {
      return new F(f(z), D);
    },
    xmlEscapeTextForContentText : f,
    getContentClassesSelector : function() {
      return p;
    }
  };
}();
var html_utils = function() {
  function a(e) {
    return e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\u00A0/g, "&nbsp;");
  }
  return{
    xmlEscapeText : function(e) {
      return e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\n/g, "&#10;");
    },
    htmlEscapeTextForContent : a,
    htmlEscapeText : function(e) {
      return a(e).replace(/"/g, "&quot;");
    }
  };
}();
var key_events = function() {
  var a = ["keydown", "keyup", "keypress"];
  var e = {
    8 : "backspace",
    9 : "tab",
    13 : "return",
    16 : "shift",
    17 : "ctrl",
    18 : "alt",
    19 : "pause",
    20 : "capslock",
    27 : "esc",
    32 : "space",
    33 : "pageup",
    34 : "pagedown",
    35 : "end",
    36 : "home",
    37 : "left",
    38 : "up",
    39 : "right",
    40 : "down",
    45 : "insert",
    46 : "del",
    91 : "meta",
    93 : "meta",
    96 : "0",
    97 : "1",
    98 : "2",
    99 : "3",
    100 : "4",
    101 : "5",
    102 : "6",
    103 : "7",
    104 : "8",
    105 : "9",
    106 : "*",
    107 : "+",
    109 : "-",
    111 : "/",
    112 : "f1",
    113 : "f2",
    114 : "f3",
    115 : "f4",
    116 : "f5",
    117 : "f6",
    118 : "f7",
    119 : "f8",
    120 : "f9",
    121 : "f10",
    122 : "f11",
    123 : "f12",
    144 : "numlock",
    145 : "scroll",
    186 : ";",
    188 : ",",
    190 : ".",
    191 : "/",
    219 : "[",
    221 : "]",
    222 : "'",
    224 : "meta"
  };
  var j = {
    "`" : "~",
    1 : "!",
    2 : "@",
    3 : "#",
    4 : "$",
    5 : "%",
    6 : "^",
    7 : "&",
    8 : "*",
    9 : "(",
    0 : ")",
    "-" : "_",
    "=" : "+",
    ";" : ": ",
    "'" : '"',
    "," : "<",
    "." : ">",
    "/" : "?",
    "\\" : "|",
    "[" : "{",
    "]" : "}"
  };
  var h = Class.extend({
    init : function(f, n) {
      function l(g) {
        function d(k) {
          return q.handleEvent(this, g, k, arguments);
        }
        if (n) {
          f.bind(g, d);
        } else {
          f.live(g, d);
        }
      }
      if (n === undefined) {
        n = false;
      }
      var q = this;
      this._useBind = n;
      this._boundHandlers = {};
      var o = 0;
      for (;o < a.length;o++) {
        var c = a[o];
        this._boundHandlers[c] = {};
        l(c);
      }
    },
    handleEvent : function(f, n, l, q) {
      n = this._boundHandlers[n];
      var o = l.type !== "keypress" && l.which in e ? e[l.which] : null;
      var c = String.fromCharCode(l.which).toLowerCase();
      var g = "";
      if (l.altKey && o !== "alt") {
        g += "alt+";
      }
      if (l.ctrlKey && o !== "ctrl") {
        g += "ctrl+";
      }
      if (l.metaKey && (!l.ctrlKey && o !== "meta")) {
        g += "meta+";
      }
      if (l.shiftKey && o !== "shift") {
        g += "shift+";
      }
      l = {};
      if (o !== null) {
        l[g + o] = true;
      } else {
        l[g + c] = true;
        l[g + j[c]] = true;
        if (g === "shift+") {
          l[j[c]] = true;
        }
      }
      o = false;
      var d;
      for (d in n) {
        if (d in l) {
          c = n[d];
          g = 0;
          for (;g < c.length;g++) {
            var k = c[g].apply(f, q);
            o |= k === false;
          }
        }
      }
      if (o) {
        return false;
      }
    },
    addHandler : function(f, n, l) {
      n = n.toLowerCase();
      f = this._boundHandlers[f];
      if (n in f) {
        f[n].push(l);
      } else {
        f[n] = [l];
      }
    },
    addHandlerForShortcuts : function(f, n, l, q) {
      var o = 0;
      for (;o < l.length;o++) {
        this.addHandler(f, l[o] + "+" + n, q);
      }
    }
  });
  return{
    enableKeyEvents : function(f, n) {
      return new h(f, n);
    },
    getStringRepresentationForKeyCode : function(f) {
      return f in e ? e[f] : null;
    }
  };
}();
var animations = function() {
  var a = {
    zoom : 150,
    children : 100,
    pageSlide : 400
  };
  var e = new (Class.extend({
    init : function() {
      this._animationsInProgress = 0;
      this._callbacks = [];
      this._contentToFocus = null;
      this._caretPos = 0;
    },
    setContentToFocus : function(j) {
      this._contentToFocus = j;
    },
    setCaretPos : function(j) {
      this._caretPos = j;
    },
    addCallback : function(j) {
      this._callbacks.push(j);
    },
    increment : function() {
      this._animationsInProgress++;
    },
    decrement : function() {
      this._animationsInProgress--;
      if (this._animationsInProgress === 0) {
        this.animationsComplete();
      } else {
        if (this._animationsInProgress < 0) {
          ui_sugar.showAlertDialog("Less than zero animations!");
        }
      }
    },
    animationsAreInProgress : function() {
      return this._animationsInProgress > 0;
    },
    animationsComplete : function() {
      $.each(this._callbacks, function(f, n) {
        n();
      });
      this._callbacks = [];
      var j = this._contentToFocus;
      var h = this._caretPos;
      this._contentToFocus = null;
      this._caretPos = 0;
      setTimeout(function() {
        if (!IS_MOBILE) {
          if (j !== null) {
            j.setCaret(h);
          }
        }
      }, 0);
    }
  }));
  jQuery.fn.incrementAnimationCounter = function() {
    $(this).each(function() {
      e.increment();
    });
    if ($(this).length === 0) {
      if (!e.animationsAreInProgress()) {
        e.animationsComplete();
      }
    }
    return this;
  };
  return{
    getAnimationTiming : function(j) {
      return a[j];
    },
    setAnimationTiming : function(j, h) {
      a[j] = h;
    },
    getAnimationSpeed : function(j) {
      if (NO_ANIMATIONS) {
        return "instant";
      }
      if (j === undefined) {
        return "animate";
      }
      return j;
    },
    animationsAreInProgress : function() {
      return e.animationsAreInProgress();
    },
    getAnimationCounter : function() {
      return e;
    }
  };
}();
var project_tree_object = function() {
  function a(u, b) {
    q(u, b);
    n(u);
    l(u);
    u[r] = new tagging.ItemTagManager(u, true);
  }
  function e(u) {
    return c in u;
  }
  function j(u) {
    return e(u) ? u[c] : "";
  }
  function h(u) {
    return g in u;
  }
  function f(u) {
    return h(u) ? u[g] : "";
  }
  function n(u) {
    if (e(u)) {
      var b = new content_text.ContentText(j(u), false);
      if (b.requiredParse()) {
        u[p] = b;
        return;
      }
    }
    delete u[p];
  }
  function l(u) {
    if (h(u)) {
      var b = new content_text.ContentText(f(u), true);
      if (b.requiredParse()) {
        u[v] = b;
        return;
      }
    }
    delete u[v];
  }
  function q(u, b) {
    if (b === null) {
      u[k] = null;
    } else {
      if (b.isAuxiliary()) {
        u[k] = b;
      }
    }
  }
  function o(u) {
    return d in u ? u[d] : null;
  }
  var c = "nm";
  var g = "no";
  var d = "as";
  var k = "pt";
  var p = "name_ct";
  var v = "note_ct";
  var r = "tag_mgr";
  var x = null;
  return{
    initModule : function() {
      x = {};
      x[c] = "<i>(removed by owner)</i>";
      x.ch = [];
      a(x, null);
    },
    create : function(u, b, s, m, w) {
      if (b === undefined) {
        b = null;
      }
      if (s === undefined) {
        s = null;
      }
      if (m === undefined) {
        m = null;
      }
      if (w === undefined) {
        w = null;
      }
      var t = {};
      t.id = u;
      if (b !== null) {
        t[c] = b;
      }
      if (s !== null) {
        t[g] = s;
      }
      if (m !== null) {
        t.cp = m;
      }
      if (w !== null) {
        t.ch = w;
      }
      return t;
    },
    initialize : function(u, b) {
      if (!("ch" in u)) {
        u.ch = [];
      }
      q(u, b);
      n(u);
      l(u);
      u[r] = new tagging.ItemTagManager(u, false);
      if ("shared" in u) {
        var s = u.shared;
        if (!("share_id" in s)) {
          s.share_id = u.id;
        }
        u.shared_info = new sharing.ItemSharedInfo(s);
        delete u.shared;
      }
    },
    initializeRootOfSharedSubtree : a,
    getProjectId : function(u) {
      return u.id;
    },
    setProjectId : function(u, b) {
      u.id = b;
    },
    hasName : e,
    getName : j,
    setName : function(u, b) {
      u[c] = b;
    },
    hasNote : h,
    getNote : f,
    setNote : function(u, b) {
      u[g] = b;
    },
    isCompleted : function(u) {
      return "cp" in u;
    },
    getCompleted : function(u) {
      return "cp" in u ? u.cp : false;
    },
    setCompleted : function(u, b) {
      console.log(u, b)
      if (b === false) {
        delete u.cp;
      } else {
        u.cp = b;
      }
    },
    getLastModified : function(u) {
      return u.lm;
    },
    setLastModified : function(u, b, s) {
      u.lm = b;
      if (s === null) {
        delete u.lmb;
      } else {
        u.lmb = s;
      }
    },
    getLastModifiedBy : function(u) {
      return "lmb" in u ? u.lmb : null;
    },
    getSharedInfo : function(u) {
      return "shared_info" in u ? u.shared_info : null;
    },
    setSharedInfo : function(u, b) {
      if (b === null) {
        delete u.shared_info;
      } else {
        u.shared_info = b;
      }
    },
    getChildren : function(u) {
      return u.ch;
    },
    setChildren : function(u, b) {
      u.ch = b;
    },
    getParent : function(u) {
      return u.pa;
    },
    setParent : function(u, b) {
      u.pa = b;
    },
    updateNameContentText : n,
    updateNoteContentText : l,
    getNameInPlainText : function(u) {
      return p in u ? u[p].getPlainText() : j(u);
    },
    getNoteInPlainText : function(u) {
      return v in u ? u[v].getPlainText() : f(u);
    },
    getTagManager : function(u) {
      return u[r];
    },
    hasSearchResult : function(u) {
      return "search_result" in u;
    },
    getSearchResult : function(u) {
      return "search_result" in u ? u.search_result : null;
    },
    setSearchResult : function(u, b) {
      u.search_result = b;
    },
    clearSearchResult : function(u) {
      delete u.search_result;
    },
    getProjectTree : function(u) {
      return k in u ? u[k] : project_tree.getMainProjectTree();
    },
    setProjectTree : q,
    isAddedSubtreePlaceholder : function(u) {
      return o(u) !== null;
    },
    getAddedSubtreeShareId : o,
    setAddedSubtreeShareId : function(u, b) {
      u[d] = b;
    },
    getAddedSubtree : function(u) {
      return "added_subtree" in u ? u.added_subtree : null;
    },
    setAddedSubtree : function(u, b) {
      u.added_subtree = b;
    },
    isInDom : function(u) {
      return "in_dom" in u ? u.in_dom : false;
    },
    setInDom : function(u, b) {
      if (b) {
        u.in_dom = true;
      } else {
        delete u.in_dom;
      }
    },
    isExpandedInDom : function(u) {
      return "is_expanded_in_dom" in u ? u.is_expanded_in_dom : null;
    },
    setIsExpandedInDom : function(u, b) {
      if (b === null) {
        delete u.is_expanded_in_dom;
      } else {
        u.is_expanded_in_dom = b;
      }
    },
    getDanglingPlaceholderProjectTreeObject : function() {
      return x;
    }
  };
}();
var global_project_tree_object = function() {
  function a(f) {
    if (project_tree_object.isAddedSubtreePlaceholder(f)) {
      f = project_tree_object.getAddedSubtree(f);
      return f !== null ? f.getRootProject() : project_tree_object.getDanglingPlaceholderProjectTreeObject();
    } else {
      return f;
    }
  }
  function e(f) {
    if (project_tree_object.isAddedSubtreePlaceholder(f)) {
      f = project_tree_object.getAddedSubtree(f);
      if (f !== null) {
        f.notifyContentsAreVisibleMayHaveChanged();
      }
    }
  }
  function j(f) {
    return f.join("") + '<div class="childrenEnd"></div>' + (!IS_MOBILE ? '<div class="addSiblingButton"></div>' : "");
  }
  function h(f) {
    var n = {};
    if (global_project_tree_object.hasName(f)) {
      project_tree_object.setName(n, global_project_tree_object.getName(f));
    }
    if (global_project_tree_object.hasNote(f)) {
      project_tree_object.setNote(n, global_project_tree_object.getNote(f));
    }
    if (global_project_tree_object.isCompleted(f)) {
      project_tree_object.setCompleted(n, true);
    }
    if (global_project_tree_object.isExpanded(f)) {
      n.expanded = true;
    }
    var l = 1;
    f = global_project_tree_object.getChildren(f);
    if (f.length > 0) {
      var q = [];
      var o = 0;
      for (;o < f.length;o++) {
        var c = h(f[o]);
        q.push(c.projectTreeRoot);
        l += c.size;
      }
      project_tree_object.setChildren(n, q);
    }
    return{
      projectTreeRoot : n,
      size : l
    };
  }
  return{
    getProjectId : function(f) {
      return project_tree.getProjectIdOfProjectTreeObject(f);
    },
    getProjectTree : function(f) {
      return f === null ? project_tree.getMainProjectTree() : project_tree_object.getProjectTree(f);
    },
    hasName : function(f) {
      return project_tree_object.hasName(a(f));
    },
    getName : function(f) {
      return project_tree_object.getName(a(f));
    },
    setName : function(f, n) {
      project_tree_object.setName(a(f), n);
    },
    hasNote : function(f) {
      return project_tree_object.hasNote(a(f));
    },
    getNote : function(f) {
      return project_tree_object.getNote(a(f));
    },
    setNote : function(f, n) {
      project_tree_object.setNote(a(f), n);
    },
    isCompleted : function(f) {
      return project_tree_object.isCompleted(a(f));
    },
    getCompleted : function(f) {
      return project_tree_object.getCompleted(a(f));
    },
    setCompleted : function(f, n) {
      project_tree_object.setCompleted(a(f), n);
    },
    getLastModified : function(f) {
      return project_tree_object.getLastModified(f);
    },
    setLastModified : function(f, n, l) {
      project_tree_object.setLastModified(f, n, l);
    },
    getLastModifiedByUserId : function(f) {
      var n = project_tree_object.getLastModifiedBy(f);
      return n !== null ? n : global_project_tree_object.getProjectTree(f).getOwnerId();
    },
    getSharedInfo : function(f) {
      return project_tree_object.getSharedInfo(a(f));
    },
    setSharedInfo : function(f, n) {
      project_tree_object.setSharedInfo(a(f), n);
    },
    getNameInPlainText : function(f) {
      return project_tree_object.getNameInPlainText(a(f));
    },
    getNoteInPlainText : function(f) {
      return project_tree_object.getNoteInPlainText(a(f));
    },
    getTagManager : function(f) {
      return project_tree_object.getTagManager(a(f));
    },
    hasSearchResult : function(f) {
      return project_tree_object.hasSearchResult(f);
    },
    getSearchResult : function(f) {
      f = project_tree_object.getSearchResult(f);
      return f !== null ? f : search.getNonMatchItemSearchResult();
    },
    setSearchResult : function(f, n) {
      project_tree_object.setSearchResult(f, n);
    },
    clearSearchResult : function(f) {
      project_tree_object.clearSearchResult(f);
    },
    getAddedSubtreeShareId : function(f) {
      return project_tree_object.getAddedSubtreeShareId(f);
    },
    isInDom : function(f) {
      return f === null ? true : project_tree_object.isInDom(f);
    },
    setInDom : function(f, n) {
      project_tree_object.setInDom(f, n);
      e(f);
    },
    isExpandedInDom : function(f) {
      return project_tree_object.isExpandedInDom(f);
    },
    setIsExpandedInDom : function(f, n) {
      project_tree_object.setIsExpandedInDom(f, n);
      e(f);
    },
    getChildren : function(f) {
      if (f === null) {
        return project_tree.getMainProjectTree().getRootProjectChildren();
      }
      if (project_tree_object.isAddedSubtreePlaceholder(f)) {
        f = project_tree_object.getAddedSubtree(f);
        return f !== null ? f.getRootProjectChildren() : project_tree_object.getChildren(project_tree_object.getDanglingPlaceholderProjectTreeObject());
      } else {
        return project_tree_object.getChildren(f);
      }
    },
    getParent : function(f) {
      var n = project_tree_object.getParent(f);
      if (n !== null) {
        return n;
      } else {
        f = global_project_tree_object.getProjectTree(f);
        return f.isAuxiliary() ? project_tree.getMainProjectTree().getSharedSubtreePlaceholder(f.getShareId()) : null;
      }
    },
    getSiblings : function(f) {
      if (f === null) {
        return[null];
      }
      f = global_project_tree_object.getParent(f);
      return global_project_tree_object.getChildren(f);
    },
    isReadOnly : function(f) {
      return READ_ONLY_MAIN_TREE || (f === null || (project_tree_object.isAddedSubtreePlaceholder(f) || global_project_tree_object.isInReadOnlyTree(f)));
    },
    isInReadOnlyTree : function(f) {
      return f !== null && project_tree_object.getProjectTree(f).isReadOnly();
    },
    getProjectReference : function(f) {
      return(f === null ? project_tree.getMainProjectTree() : global_project_tree_object.getProjectTree(f)).getProjectReferenceByProjectTreeObject(f);
    },
    isExpanded : function(f) {
      return global_project_tree_object.getProjectTree(f).projectIdIsExpanded(global_project_tree_object.getProjectId(f));
    },
    isAddedSubtreePlaceholder : function(f) {
      return f !== null && project_tree_object.isAddedSubtreePlaceholder(f);
    },
    isPotentiallyVisible : function(f, n) {
      if (n === undefined) {
        n = false;
      }
      var l = shouldShowCompletedProjects();
      var q = false;
      if (!global_project_tree_object.isCompleted(f) || l) {
        if (!n && search.inSearchMode()) {
          q = global_project_tree_object.getProjectReference(f);
          q = !global_project_tree_object.getSearchResult(f).isNeverVisibleForSearch(q, l);
        } else {
          q = true;
        }
      }
      return q;
    },
    getPotentiallyVisibleChildren : function(f, n) {
      if (n === undefined) {
        n = false;
      }
      var l = global_project_tree_object.getChildren(f);
      var q = [];
      var o = 0;
      for (;o < l.length;o++) {
        var c = l[o];
        if (global_project_tree_object.isPotentiallyVisible(c, n)) {
          q.push(c);
        }
      }
      return q;
    },
    getPreviousPotentiallyVisibleSibling : function(f, n) {
      var l = global_project_tree_object.getSiblings(f);
      var q = l.indexOf(f) - 1;
      for (;q >= 0;q--) {
        var o = l[q];
        if (global_project_tree_object.isPotentiallyVisible(o, n)) {
          return o;
        }
      }
      return null;
    },
    getNextPotentiallyVisibleSibling : function(f, n) {
      var l = global_project_tree_object.getSiblings(f);
      var q = l.indexOf(f) + 1;
      for (;q < l.length;q++) {
        var o = l[q];
        if (global_project_tree_object.isPotentiallyVisible(o, n)) {
          return o;
        }
      }
      return null;
    },
    getTreeForChildren : function(f) {
      return f === null ? project_tree.getMainProjectTree() : project_tree_object.isAddedSubtreePlaceholder(f) ? project_tree_object.getAddedSubtree(f) : project_tree_object.getProjectTree(f);
    },
    childrenAreInReadOnlyTree : function(f) {
      f = global_project_tree_object.getTreeForChildren(f);
      return f !== null ? f.isReadOnly() : true;
    },
    constructProjectTreeAsSelected : function(f, n) {
      if (n === undefined) {
        n = true;
      }
      var l = selectOnActivePage(".mainTreeRoot");
      l.overwriteProjectChildrenHtml(function() {
        var c = [];
        if (n) {
          var g = global_project_tree_object.getChildren(f);
          var d;
          for (d in g) {
            c.push(global_project_tree_object.constructProjectTreeHtml(g[d]));
          }
        }
        g = true;
        d = f;
        c = c;
        for (;d !== null;) {
          c = [global_project_tree_object.constructProjectTreeHtml(d, c, g ? "selected" : "parent")];
          d = global_project_tree_object.getParent(d);
          g = false;
        }
        return j(c);
      });
      if (project_tree.getMainProjectTree().isShared()) {
        var q = project_tree.getMainProjectTree();
        var o = q.getName();
        q = q.getNote();
      } else {
        o = "Home";
        q = "";
      }
      l.getName().children(".content").html(content_text.getContentHtml(o));
      l.getNotes().children(".content").html(content_text.getContentHtml(q));
      l.removeClass("selected parent noted");
      if (f === null) {
        l.addClass("selected");
      } else {
        l.addClass("parent");
      }
      if (q !== "") {
        l.addClass("noted");
      }
      if (n) {
        l = selectOnActivePage(".addButton");
        if (global_project_tree_object.childrenAreInReadOnlyTree(f)) {
          l.addClass("selectedTreeIsReadOnly");
        } else {
          l.removeClass("selectedTreeIsReadOnly");
        }
        refreshVisibleChildrenUnderSelectedForAddButton(l);
      }
    },
    constructProjectTreeHtml : function(f, n, l) {
      if (n === undefined) {
        n = null;
      }
      if (l === undefined) {
        l = "";
      }
      var q = global_project_tree_object.getProjectReference(f);
      var o = global_project_tree_object.getProjectId(f);
      var c = global_project_tree_object.getName(f);
      var g = global_project_tree_object.getNote(f);
      var d = global_project_tree_object.isCompleted(f);
      var k = global_project_tree_object.getSharedInfo(f) !== null;
      var p = global_project_tree_object.isAddedSubtreePlaceholder(f);
      var v = global_project_tree_object.getChildren(f);
      var r = shouldShowCompletedProjects();
      if (n === null) {
        if (d && !r || search.inSearchMode() && global_project_tree_object.getSearchResult(f).isNeverVisibleForSearch(q, r)) {
          return "";
        }
      }
      var x = false;
      if (v.length > 0) {
        x = search.inSearchMode() ? global_project_tree_object.getSearchResult(f).isExpandedForSearch(q) : global_project_tree_object.isExpanded(f);
      }
      global_project_tree_object.setInDom(f, true);
      global_project_tree_object.setIsExpandedInDom(f, n !== null || x);
      var u = r = "";
      var b = "";
      if (v.length === 0) {
        r += "task ";
      }
      if (d) {
        r += "done ";
      }
      if (g !== "") {
        r += "noted ";
      }
      if (k) {
        r += "shared ";
      }
      if (p) {
        r += "addedShared ";
      }
      if (x) {
        r += "open ";
      }
      r += l + " ";
      if (search.inSearchMode()) {
        q = global_project_tree_object.getSearchResult(f).getAdditionalClassesForSearch(q);
        r += q.project + " ";
        u += q.name + " ";
        b += q.note + " ";
      }
      n = n !== null ? n : x ? global_project_tree_object.constructChildProjectTreeHtmls(f) : [];
      q = l === "parent";
      l = !IS_MOBILE && (!READ_ONLY_MAIN_TREE && !q) ? " contenteditable" : "";
      if (!IS_MOBILE && !IS_PACKAGED_APP) {
        var s = window.location.pathname + "#/" + project_ids.truncateProjectId(o)
      }
      c = content_text.getContentHtml(c, false, null, q);
      c = q && (!IS_MOBILE && !IS_PACKAGED_APP) ? '<a class="content" href="' + s + '">' + c + "</a>" : '<div class="content"' + l + ">" + c + "</div>";
      s = IS_MOBILE ? '<div class="bullet"><div></div></div>' : '<a class="bullet"' + (IS_PACKAGED_APP ? "" : ' href="' + s + '"') + "></a>";
      f = global_project_tree_object.getProjectTree(f);
      f = f.isAuxiliary() ? ' data-tid="' + f.getTreeId() + '"' : "";
      return'<div class="project ' + r + '" projectid="' + o + '"' + f + '><div class="name ' + u + '">' + s + c + '<span class="parentArrow"></span></div><div class="notes ' + b + '"><div class="content"' + l + ">" + content_text.getContentHtml(g, true) + '</div></div><div class="children">' + j(n) + "</div></div>";
    },
    constructChildProjectTreeHtmls : function(f) {
      f = global_project_tree_object.getChildren(f);
      var n = [];
      var l = 0;
      for (;l < f.length;l++) {
        n.push(global_project_tree_object.constructProjectTreeHtml(f[l]));
      }
      return n;
    },
    constructChildren : j,
    registerSubtreeRemovedFromDom : function(f, n) {
      if (n === undefined) {
        n = false;
      }
      if (!n) {
        if (!global_project_tree_object.isInDom(f)) {
          return;
        }
        global_project_tree_object.setInDom(f, false);
        global_project_tree_object.setIsExpandedInDom(f, null);
      }
      var l = global_project_tree_object.getChildren(f);
      var q = 0;
      for (;q < l.length;q++) {
        global_project_tree_object.registerSubtreeRemovedFromDom(l[q]);
      }
    },
    duplicateProjectTreeForBulkCreate : function(f, n) {
      if (n === undefined) {
        n = false;
      }
      var l = h(f);
      if (n) {
        var q = l.projectTreeRoot;
        project_tree_object.setName(q, project_tree_object.getName(q) + " (copy)");
      }
      return l;
    }
  };
}();
var project_tree = function() {
  function a(b, s) {
    if (s === undefined) {
      s = false;
    }
    var m = String(g);
    g++;
    var w = new x(b, m);
    c[m] = w;
    if (!s) {
      h().registerAddedAuxiliaryProjectTree(w);
    }
  }
  function e(b) {
    var s = new tagging.TagCounter;
    var m = global_project_tree_object.getChildren(b);
    var w = 0;
    for (;w < m.length;w++) {
      var t = e(m[w]);
      s.add(t);
    }
    if (b === null) {
      b = h();
      if (b.isShared()) {
        b = b.getRootProject();
        b = project_tree_object.getTagManager(b);
        s.add(b.getTagCounts());
      }
      tagging.setRootDescendantTagCounts(s);
      return s;
    } else {
      b = global_project_tree_object.getTagManager(b);
      if (!s.isEmpty()) {
        b.setDescendantTagCounts(s);
      }
      m = new tagging.TagCounter;
      m.add(b.getTagCounts());
      m.add(s);
      return m;
    }
  }
  function j(b, s) {
    if (s === undefined) {
      s = c;
    }
    var m;
    for (m in s) {
      var w = s[m];
      if (w.isShared() && w.getShareId() === b) {
        return w;
      }
    }
    return null;
  }
  function h() {
    return c[o];
  }
  function f(b, s) {
    var m = {};
    var w = 0;
    for (;w < b.length;w++) {
      var t = b[w];
      var y = global_project_tree_object.getProjectId(t);
      t = global_project_tree_object.getProjectTree(t).getTreeId();
      if (!(t in m)) {
        m[t] = [];
      }
      m[t].push(y);
    }
    for (t in m) {
      (t in c ? c[t] : null).setExpandedForProjectIds(m[t], s);
    }
  }
  function n(b) {
    var s = b.attr("projectid");
    b = b.attr("data-tid");
    if (b === undefined) {
      b = o;
    }
    return new r(s, b);
  }
  function l(b) {
    return b !== null ? project_tree_object.getProjectId(b) : k;
  }
  function q() {
    if (p === null) {
      p = new u;
    }
    return p;
  }
  var o = "main";
  var c = {};
  var g = 0;
  var d = {};
  var k = "None";
  var p = null;
  var v = Class.extend({
    init : function(b) {
      this.treeId = b;
    },
    getProjectTree : function() {
      return this.treeId in c ? c[this.treeId] : null;
    }
  });
  var r = Class.extend({
    init : function(b, s) {
      this.projectid = b;
      this.treeId = s;
    },
    isValid : function() {
      return this.getProjectTree() !== null && this.getProjectTreeObject() !== undefined;
    },
    getProjectId : function() {
      return this.projectid;
    },
    getProjectTreeObject : function() {
      return this.getProjectTree().getProjectTreeObjectByProjectId(this.projectid);
    },
    getDeletedProjectTreeObject : function() {
      return this.getProjectTree().getDeletedProjectTreeObjectByProjectId(this.projectid);
    },
    getProjectTree : function() {
      return this.treeId in c ? c[this.treeId] : null;
    },
    equals : function(b) {
      return this.treeId === b.treeId && this.projectid === b.projectid;
    },
    isTreeRoot : function() {
      return this.projectid === k;
    },
    isMainTreeRoot : function() {
      return this.treeId === o && this.isTreeRoot();
    },
    isAuxiliaryTreeRoot : function() {
      return this.treeId !== o && this.isTreeRoot();
    },
    getUniqueIdentifier : function() {
      return this.treeId + ":" + this.projectid;
    },
    getUniqueIdentifierWithTruncatedProjectIds : function() {
      var b = "";
      var s = this.getProjectTree().getRootProjectId();
      if (s !== null) {
        b += project_ids.truncateProjectId(s) + ":";
      }
      b += project_ids.truncateProjectId(this.projectid);
      return b;
    },
    getName : function() {
      var b = this.getProjectTreeObject();
      return b !== null ? global_project_tree_object.getName(b) : null;
    },
    getNote : function() {
      var b = this.getProjectTreeObject();
      return b !== null ? global_project_tree_object.getNote(b) : null;
    },
    isCompleted : function() {
      var b = this.getProjectTreeObject();
      return b !== null ? global_project_tree_object.isCompleted(b) : null;
    },
    getSharedInfo : function() {
      var b = this.getProjectTreeObject();
      return b !== null ? global_project_tree_object.getSharedInfo(b) : null;
    },
    getTagManager : function() {
      var b = this.getProjectTreeObject();
      return b !== null ? global_project_tree_object.getTagManager(b) : null;
    },
    getSharedUrl : function() {
      var b = this.getProjectTreeObject();
      if (this.isAddedSubtreePlaceholder()) {
        b = global_project_tree_object.getAddedSubtreeShareId(b);
      } else {
        b = global_project_tree_object.getSharedInfo(b);
        b = b !== null ? b.getShareId() : null;
      }
      return b !== null ? "https://workflowy.com/s/" + b : "(not known yet)";
    },
    translateToGlobalProjectTreeObject : function() {
      if (this.projectid === k) {
        var b = this.getProjectTree();
        if (b === null) {
          return;
        }
        if (b.isAuxiliary()) {
          return h().getSharedSubtreePlaceholder(b.getShareId());
        }
      }
      return this.getProjectTreeObject();
    },
    getPlaceholderReferenceIfApplicable : function() {
      var b = this.translateToGlobalProjectTreeObject();
      return global_project_tree_object.getProjectReference(b);
    },
    getNonPlaceholderReferenceIfApplicable : function() {
      if (!this.isAddedSubtreePlaceholder()) {
        return this;
      }
      var b = this.getProjectTreeObject();
      b = project_tree_object.getAddedSubtree(b);
      return b !== null ? b.getRootProjectReference() : null;
    },
    getMatchingDomProject : function() {
      var b = this.translateToGlobalProjectTreeObject();
      if (b !== undefined) {
        if (!global_project_tree_object.isInDom(b)) {
          return $();
        }
        var s = global_project_tree_object.getProjectTree(b).getTreeId();
        b = global_project_tree_object.getProjectId(b);
      } else {
        if (this.projectid === k) {
          return $();
        }
        s = this.treeId;
        b = this.projectid;
      }
      return selectOnActivePage(".project[projectid=" + b + "]" + (s === o ? ":not([data-tid])" : "[data-tid=" + s + "]"));
    },
    getParent : function() {
      var b = this.getProjectTreeObject();
      if (b === null) {
        return null;
      }
      b = global_project_tree_object.getParent(b);
      return global_project_tree_object.getProjectReference(b);
    },
    getAncestors : function() {
      var b = this.getProjectTreeObject();
      var s = [];
      for (;b !== null;) {
        b = global_project_tree_object.getParent(b);
        s.push(global_project_tree_object.getProjectReference(b));
      }
      return s;
    },
    getSortablePath : function() {
      var b = this.getProjectTreeObject();
      var s = "";
      for (;b !== null;) {
        var m = global_project_tree_object.getParent(b);
        var w = global_project_tree_object.getChildren(m);
        b = w.indexOf(b);
        w = (w.length - 1).toString().length;
        w = utils.zeroPadInteger(b, w);
        s = s.length > 0 ? w + ":" + s : w;
        b = m;
      }
      return s;
    },
    getNumDescendants : function(b) {
      if (b === undefined) {
        b = null;
      }
      if (b !== null && b === 0) {
        return 0;
      }
      var s = this.getProjectTreeObject();
      var m = 0;
      var w = function(t) {
        t = global_project_tree_object.getChildren(t);
        if (t.length > 0) {
          var y = 0;
          for (;y < t.length;y++) {
            m++;
            if (b !== null && m === b) {
              return true;
            }
            if (w(t[y])) {
              return true;
            }
          }
        }
        return false;
      };
      w(s);
      return m;
    },
    hasDescendants : function() {
      return this.getNumDescendants(1) > 0;
    },
    isReadOnly : function() {
      return global_project_tree_object.isReadOnly(this.getProjectTreeObject());
    },
    isInReadOnlyTree : function() {
      return global_project_tree_object.isInReadOnlyTree(this.getProjectTreeObject());
    },
    isAddedSubtreePlaceholder : function() {
      return global_project_tree_object.isAddedSubtreePlaceholder(this.getProjectTreeObject());
    },
    isInSameTree : function(b) {
      return this.treeId === b.treeId;
    },
    childrenAreInSameTree : function(b) {
      var s = this.getProjectTreeObject();
      s = global_project_tree_object.getTreeForChildren(s);
      return s !== null ? s.getTreeId() === b.treeId : false;
    },
    childrenAreInReadOnlyTree : function() {
      return global_project_tree_object.childrenAreInReadOnlyTree(this.getProjectTreeObject());
    },
    getShareTypeForTreeForChildren : function() {
      var b = this.getProjectTreeObject();
      b = global_project_tree_object.getTreeForChildren(b);
      return b !== null && b.isShared() ? b.getShareType() : null;
    },
    isDescendantOf : function(b) {
      var s = this.getAncestors();
      var m = false;
      $.each(s, function(w, t) {
        if (b.equals(t)) {
          m = true;
          return false;
        }
      });
      return m;
    },
    isValidMove : function(b, s) {
      if (s === undefined) {
        s = false;
      }
      var m = s ? this.getProjectTree().deletedProjectSubtreeContainsAddedSubtreePlaceholder(this.getDeletedProjectTreeObject()) : this.containsAddedSubtreePlaceholder();
      if (b.is(".project")) {
        var w = project_tree.getProjectReferenceFromDomProject(b);
        if (!w.isInSameTree(this)) {
          return false;
        }
        if (m && w.hasSharedAncestor()) {
          return false;
        }
        if (!s && w.isDescendantOf(this)) {
          return false;
        }
      } else {
        w = b.getProject();
        w = project_tree.getProjectReferenceFromDomProject(w);
        if (!w.childrenAreInSameTree(this)) {
          return false;
        }
        if (m && w.hasSharedAncestor(true)) {
          return false;
        }
        if (!s && w.isDescendantOf(this) || w.equals(this)) {
          return false;
        }
      }
      return true;
    },
    isValidDuplicate : function(b) {
      if (b.is(".project")) {
        b = project_tree.getProjectReferenceFromDomProject(b);
        if (b.isInReadOnlyTree()) {
          return false;
        }
        if (b.isDescendantOf(this)) {
          return false;
        }
      } else {
        b = b.getProject();
        b = project_tree.getProjectReferenceFromDomProject(b);
        if (b.childrenAreInReadOnlyTree()) {
          return false;
        }
        if (b.isDescendantOf(this) || b.equals(this)) {
          return false;
        }
      }
      return true;
    },
    canCreateChild : function() {
      var b = this.getProjectTreeObject();
      b = global_project_tree_object.getTreeForChildren(b);
      return b !== null ? !b.isReadOnly() : false;
    },
    hasSharedAncestor : function(b) {
      if (b === undefined) {
        b = false;
      }
      if (b && this.isAddedSubtreePlaceholder()) {
        return false;
      }
      return this.getProjectTree().projectTreeObjectHasSharedAncestor(this.getProjectTreeObject(), b);
    },
    containsAddedSubtreePlaceholder : function() {
      return this.getProjectTree().projectSubtreeContainsAddedSubtreePlaceholder(this.getProjectTreeObject());
    },
    constructProjectTreeAsSelected : function(b) {
      global_project_tree_object.constructProjectTreeAsSelected(this.getProjectTreeObject(), b);
    },
    constructChildProjectTreeHtmls : function() {
      return global_project_tree_object.constructChildProjectTreeHtmls(this.getProjectTreeObject());
    },
    getChildren : function() {
      var b = global_project_tree_object.getChildren(this.getProjectTreeObject());
      var s = [];
      var m = 0;
      for (;m < b.length;m++) {
        s.push(global_project_tree_object.getProjectReference(b[m]));
      }
      return s;
    },
    getPotentiallyVisibleChildren : function() {
      var b = global_project_tree_object.getPotentiallyVisibleChildren(this.getProjectTreeObject());
      var s = [];
      var m = 0;
      for (;m < b.length;m++) {
        var w = global_project_tree_object.getProjectReference(b[m]);
        s.push(w);
      }
      return s;
    },
    getPreviousPotentiallyVisibleSibling : function(b) {
      b = global_project_tree_object.getPreviousPotentiallyVisibleSibling(this.getProjectTreeObject(), b);
      return b !== null ? global_project_tree_object.getProjectReference(b) : null;
    },
    getNextPotentiallyVisibleSibling : function(b) {
      b = global_project_tree_object.getNextPotentiallyVisibleSibling(this.getProjectTreeObject(), b);
      return b !== null ? global_project_tree_object.getProjectReference(b) : null;
    },
    setPageTitleForProject : function() {
      var b = this.getProjectTreeObject();
      var s = null;
      var m = true;
      if (b === null) {
        b = this.getProjectTree();
        if (b.isShared()) {
          s = content_text.getPlainText(b.getName());
        } else {
          if (!IS_MOBILE) {
            s = "Organize your brain.";
            m = false;
          }
        }
      } else {
        s = content_text.getPlainText(global_project_tree_object.getName(b));
      }
      if (s !== null) {
        if (s.length > 100) {
          s = s.substring(0, 100) + "...";
        }
        document.title = m ? s + " - WorkFlowy" : "WorkFlowy - " + s;
      } else {
        document.title = "WorkFlowy";
      }
    },
    setPageTitleAndFragmentPathForProject : function() {
      this.setPageTitleForProject();
      location_history.notifyZoomChange(this);
    },
    setExpanded : function(b) {
      this.getProjectTree().setExpandedForProjectIds([this.projectid], b);
      var s = "EXPAND";
      if (!b) {
        s = "COLLAPSE";
      }
    },
    isExpanded : function() {
      return global_project_tree_object.isExpanded(this.getProjectTreeObject());
    },
    expandOrCollapseAllDescendants : function(b) {
      function s(y) {
        var A = global_project_tree_object.getChildren(y);
        if (A.length > 0) {
          w.push(y);
          y = 0;
          for (;y < A.length;y++) {
            s(A[y]);
          }
        }
      }
      var m = this.getProjectTreeObject();
      var w = [];
      m = global_project_tree_object.getChildren(m);
      var t = 0;
      for (;t < m.length;t++) {
        s(m[t]);
      }
      f(w, b);
    },
    getLastModifiedDateString : function() {
      var b = this.getProjectTreeObject();
      b = global_project_tree_object.getLastModified(b);
      return this.getProjectTree().clientTimestampToString(b);
    },
    getCompletedDateString : function() {
      var b = this.getProjectTreeObject();
      b = global_project_tree_object.getCompleted(b);
      return b === false ? null : this.getProjectTree().clientTimestampToString(b);
    },
    getLastModifiedByUserId : function() {
      var b = this.getProjectTreeObject();
      return global_project_tree_object.getLastModifiedByUserId(b);
    },
    getPriority : function() {
      var b = this.getProjectTreeObject();
      return global_project_tree_object.getSiblings(b).indexOf(b);
    },
    duplicateProjectTreeForBulkCreate : function(b, s) {
      if (b === undefined) {
        b = false;
      }
      if (s === undefined) {
        s = false;
      }
      var m = s ? this.getDeletedProjectTreeObject() : this.getProjectTreeObject();
      return global_project_tree_object.duplicateProjectTreeForBulkCreate(m, b);
    },
    registerSubtreeRemovedFromDom : function(b) {
      global_project_tree_object.registerSubtreeRemovedFromDom(this.getProjectTreeObject(), b);
    },
    setIsExpandedInDom : function(b) {
      global_project_tree_object.setIsExpandedInDom(this.getProjectTreeObject(), b);
    },
    applyLocalEdit : function(b, s) {
      this.getProjectTree().applyLocalEdit(this.getProjectTreeObject(), b, s);
    },
    applyLocalCreateChild : function(priority) {
      var parent_reference = this.getParentReferenceForCreate();
      return parent_reference.getProjectTree().applyLocalCreateChild(parent_reference.getProjectTreeObject(), priority);
    },
    applyLocalBulkCreateChildren : function(b, s) {
      var m = this.getParentReferenceForCreate();
      return m.getProjectTree().applyLocalBulkCreateChildren(m.getProjectTreeObject(), b, s);
    },
    getParentReferenceForCreate : function() {
      var b = this.getProjectTreeObject();
      if (b !== null && project_tree_object.isAddedSubtreePlaceholder(b)) {
        b = project_tree_object.getAddedSubtree(b);
        if (b !== null) {
          return b.getProjectReferenceByProjectId(k);
        } else {
          throw Error("Trying to create child of dangling placeholder.");
        }
      } else {
        return this;
      }
    },
    applyLocalComplete : function() {
      this.getProjectTree().applyLocalComplete(this.getProjectTreeObject());
    },
    applyLocalUncomplete : function() {
      this.getProjectTree().applyLocalUncomplete(this.getProjectTreeObject());
    },
    applyLocalDelete : function() {
      this.getProjectTree().applyLocalDelete(this.getProjectTreeObject());
    },
    applyLocalUndelete : function(b, s) {
      var m = this._getNewParentProjectTreeObjectFromReference(b);
      this.getProjectTree().applyLocalUndelete(this.projectid, m, s);
    },
    _getNewParentProjectTreeObjectFromReference : function(b) {
      var s = this.getProjectTree();
      b = b.getProjectTreeObject();
      if (b !== null && project_tree_object.isAddedSubtreePlaceholder(b)) {
        var m = project_tree_object.getAddedSubtree(b);
        if (m !== null) {
          if (m === s) {
            b = null;
          }
        } else {
          throw Error("Trying to move an item under a dangling placeholder.");
        }
      }
      return b;
    },
    applyLocalShare : function(b, s) {
      this.getProjectTree().applyLocalShare(this.getProjectTreeObject(), b, s);
    },
    applyLocalUnshare : function() {
      this.getProjectTree().applyLocalUnshare(this.getProjectTreeObject());
    },
    applyLocalAddSharedEmail : function(b, s) {
      this.getProjectTree().applyLocalAddSharedEmail(this.getProjectTreeObject(), b, s);
    },
    applyLocalRemoveSharedEmail : function(b) {
      this.getProjectTree().applyLocalRemoveSharedEmail(this.getProjectTreeObject(), b);
    }
  });
  var x = Class.extend({
    init : function(b, s) {
      this.treeId = s;
      this.isMainProjectTree = s === o;
      this.isDefunct = false;
      var m = b.rootProject;
      this.namespace = "tree." + (m !== null ? project_tree_object.getProjectId(m) : o);
      this.rootProject = m;
      this.rootProjectChildren = b.rootProjectChildren;
      this.initialMostRecentOperationTransactionId = b.initialMostRecentOperationTransactionId;
      this.initialPollingIntervalInMs = b.initialPollingIntervalInMs;
      this.serverExpandedProjectsList = b.serverExpandedProjectsList;
      this.readOnly = DEMO_MODE && this.isMainProjectTree ? false : b.isReadOnly;
      this.ownerId = b.ownerId;
      this.dateJoinedTimestampInSeconds = b.dateJoinedTimestampInSeconds;
      if (this.rootProject !== null) {
        this.overQuota = new userstorage.PersistentValue(this.namespace, "overQuota", b.overQuota);
      } else {
        this.itemsCreatedInCurrentMonth = new userstorage.PersistentValue(this.namespace, "itemsCreatedInCurrentMonth", b.itemsCreatedInCurrentMonth);
        this.monthlyItemQuota = new userstorage.PersistentValue(this.namespace, "monthlyItemQuota", b.monthlyItemQuota);
      }
      if (this.rootProject !== null) {
        this.shareId = "shareId" in b ? b.shareId : project_tree_object.getProjectId(m);
        this.shareType = b.shareType;
      } else {
        this.shareType = this.shareId = null;
      }
      if (this.isMainProjectTree) {
        utils.debugMessage("Initializing main project tree.");
      } else {
        utils.debugMessage("Initializing auxiliary project tree (id: " + s + ") rooted at projectid: " + project_tree_object.getProjectId(this.rootProject));
      }
      utils.debugMessage("Initial polling interval: " + this.initialPollingIntervalInMs + " ms");
      this.operationRunner = new operations.ProjectTreeOperationRunner(this);
      this.projectIdToProjectMap = new project_ids.ProjectIdMap;
      this.deletedProjectIdToProjectMap = new project_ids.ProjectIdMap;
      this.sharedSubtreePlaceholders = {};
      this.sharedProjectIdToSharedProjectMap = {};
      this.expandedProjects = {};
      this.localStorageExpandedProjects = {};
      this.serverRunOperationTransactionQueue = new userstorage.PersistentOperationTransactionQueue(this.namespace, "server-run");
      this.pendingOperationQueue = new userstorage.PersistentOperationQueue(this.namespace, "pending");
      this.inFlightOperationQueue = new userstorage.PersistentOperationQueue(this.namespace, "in-flight");
      this.pendingExpandedProjectsDelta = new userstorage.PersistentDict(this.namespace, "pendingExpandedProjectsDelta");
      this.inFlightExpandedProjectsDelta = new userstorage.PersistentDict(this.namespace, "inFlightExpandedProjectsDelta");
      this.mostRecentOperationTransactionId = new userstorage.PersistentValue(this.namespace, "mostRecentOperationTransactionId", this.initialMostRecentOperationTransactionId);
      this.pollingIntervalInMs = new userstorage.PersistentValue(this.namespace, "pollingIntervalInMs", this.initialPollingIntervalInMs);
      this.pushPollInProgress = new userstorage.PersistentValue(this.namespace, "pushPollInProgress", false);
      this.mostRecentOperationTransactionIdWhenPushPollInitiated = new userstorage.PersistentValue(this.namespace, "mostRecentOperationTransactionIdWhenPushPollInitiated", null);
      this.lastPushPollCompleteTimestamp = new userstorage.PersistentValue(this.namespace, "lastPushPollCompleteTimestamp", date_time.getCurrentTimeInMS());
      this.initializeProjectTree();
      if (FULL_OFFLINE_ENABLED) {
        this.initializeTreeStateFromUserstorage();
      }
      this.initializeExpandedProjects();
    },
    getOwnerId : function() {
      return this.ownerId;
    },
    getName : function() {
      return this.isShared() ? project_tree_object.getName(this.rootProject) : "root";
    },
    getNote : function() {
      return this.isShared() ? project_tree_object.getNote(this.rootProject) : "";
    },
    isAuxiliary : function() {
      return!this.isMainProjectTree;
    },
    isInGlobalTree : function() {
      return this.isAuxiliary() ? h().getSharedSubtreePlaceholder(this.getShareId()) !== undefined : true;
    },
    isShared : function() {
      return this.rootProject !== null;
    },
    getShareId : function() {
      return this.shareId;
    },
    getShareType : function() {
      return this.shareType;
    },
    isReadOnly : function() {
      return READ_ONLY_MAIN_TREE || this.readOnly;
    },
    getIsDefunct : function() {
      return this.isDefunct;
    },
    makeDefunct : function() {
      this.isDefunct = true;
      h().registerRemovedAuxiliaryProjectTree(this);
      delete c[this.treeId];
      d[this.treeId] = this;
    },
    isOverQuota : function() {
      return!this.isShared() ? this.itemsCreatedInCurrentMonth.getValue() > this.monthlyItemQuota.getValue() : this.overQuota.getValue();
    },
    getItemsCreatedInCurrentMonth : function() {
      return!this.isShared() ? this.itemsCreatedInCurrentMonth.getValue() : null;
    },
    getMonthlyItemQuota : function() {
      return!this.isShared() ? this.monthlyItemQuota.getValue() : null;
    },
    localStorageKey : function(b) {
      var s = this.getShareId();
      return s === null ? b : b + "-" + s;
    },
    clientTimestampToString : function(b) {
      return date_time.dateToDateTimeString(new Date((this.dateJoinedTimestampInSeconds + b) * 1E3));
    },
    getCurrentClientTimestamp : function() {
      return this.getClientTimestampForTimestamp(date_time.getCurrentTimeInMS());
    },
    getClientTimestampForTimestamp : function(b) {
      return Math.floor(b / 1E3 - this.dateJoinedTimestampInSeconds);
    },
    initializeProjectTree : function() {
      this.projectIdToProjectMap = new project_ids.ProjectIdMap;
      this.sharedSubtreePlaceholders = {};
      this.sharedProjectIdToSharedProjectMap = {};
      if (this.rootProject !== null) {
        project_tree_object.initializeRootOfSharedSubtree(this.rootProject, this);
      }
      var b = 0;
      for (;b < this.rootProjectChildren.length;b++) {
        this.initializeProjectTreeSubtree(this.rootProjectChildren[b], null);
      }
    },
    initializeProjectTreeSubtree : function(b, s) {
      var m = project_tree_object.getAddedSubtreeShareId(b);
      if (m === null) {
        project_tree_object.initialize(b, this);
      } else {
        project_tree_object.setProjectTree(b, this);
      }
      this.projectIdToProjectMap.set(project_tree_object.getProjectId(b), b);
      project_tree_object.setParent(b, s);
      if (project_tree_object.getSharedInfo(b) !== null) {
        this.registerAddedSharedProject(b);
      }
      if (m !== null) {
        this.registerAddedSharedSubtreePlaceholder(b);
        if (!this.isAuxiliary() && !this.isShared()) {
          m = j(m);
          if (m !== null) {
            this.registerAddedAuxiliaryProjectTree(m);
          }
        }
      } else {
        m = project_tree_object.getChildren(b);
        var w = 0;
        for (;w < m.length;w++) {
          this.initializeProjectTreeSubtree(m[w], b);
        }
      }
    },
    initializeTreeStateFromUserstorage : function() {
      var b = this.initialMostRecentOperationTransactionId === "None" ? -1 : parseInt(this.initialMostRecentOperationTransactionId);
      var s;
      var m = this.mostRecentOperationTransactionId.getValue();
      s = m === "None" ? -1 : parseInt(m);
      m = false;
      if (b > s) {
        m = true;
        this.mostRecentOperationTransactionId.setValue(this.initialMostRecentOperationTransactionId);
      }
      b = this.serverRunOperationTransactionQueue.garbageCollectPastOperationTransactions(b);
      if (b > 0) {
        utils.debugMessage("Garbage collected " + b + " OTs from server-run queue because they are already reflected in base tree.");
      }
      b = this.serverRunOperationTransactionQueue.getMostRecentOperationTransactionId();
      if (this.operationRunner.reconstructTreeStateFromUserstorageOperations(this.serverRunOperationTransactionQueue.getList(), m).errorEncountered) {
        utils.debugMessage("Error encountered running operations in userstorage queues during initialization.");
        throw new userstorage.InitializationError;
      }
      if (b !== null) {
        this.mostRecentOperationTransactionId.setValue(String(b));
      }
      if (this.hasInFlightOperations() && !this.pushPollIsInProgress()) {
        throw new userstorage.InitializationError;
      }
    },
    registerAddedAuxiliaryProjectTree : function(b) {
      var s = b.getShareId();
      if (s in this.sharedSubtreePlaceholders) {
        project_tree_object.setAddedSubtree(this.sharedSubtreePlaceholders[s], b);
      }
    },
    registerRemovedAuxiliaryProjectTree : function(b) {
      b = b.getShareId();
      if (b in this.sharedSubtreePlaceholders) {
        project_tree_object.setAddedSubtree(this.sharedSubtreePlaceholders[b], null);
      }
    },
    getSharedSubtreePlaceholder : function(b) {
      return this.sharedSubtreePlaceholders[b];
    },
    getSharedSubtreePlaceholders : function() {
      var b = [];
      var s;
      for (s in this.sharedSubtreePlaceholders) {
        b.push(this.sharedSubtreePlaceholders[s]);
      }
      return b;
    },
    registerAddedSharedSubtreePlaceholder : function(b) {
      this.sharedSubtreePlaceholders[project_tree_object.getAddedSubtreeShareId(b)] = b;
    },
    registerRemovedSharedSubtreePlaceholder : function(b) {
      delete this.sharedSubtreePlaceholders[project_tree_object.getAddedSubtreeShareId(b)];
    },
    getSharedProjects : function() {
      var b = [];
      var s;
      for (s in this.sharedProjectIdToSharedProjectMap) {
        b.push(this.sharedProjectIdToSharedProjectMap[s]);
      }
      return b;
    },
    registerAddedSharedProject : function(b) {
      this.sharedProjectIdToSharedProjectMap[project_tree_object.getProjectId(b)] = b;
    },
    registerRemovedSharedProject : function(b) {
      delete this.sharedProjectIdToSharedProjectMap[project_tree_object.getProjectId(b)];
    },
    loadRefreshed : function(b, s) {
      this.rootProject = b;
      this.rootProjectChildren = s;
      this.initializeProjectTree();
    },
    initializeExpandedProjects : function() {
      var b = 0;
      for (;b < this.serverExpandedProjectsList.length;b++) {
        var s = this.serverExpandedProjectsList[b];
        this.expandedProjects[s] = {
          expanded : true
        };
      }
      this.readLocalStorageExpandedProjects();
      for (s in this.localStorageExpandedProjects) {
        this.expandedProjects[s] = {
          expanded : this.localStorageExpandedProjects[s].expanded
        };
      }
    },
    readLocalStorageExpandedProjects : function() {
      this.localStorageExpandedProjects = {};
      var b = null;
      if (localstorage_helper.localStorageSupported()) {
        b = this.localStorageKey("expanded");
        b = localstorage_helper.read(b);
      }
      if (!(b === null || b.length === 0)) {
        b = b.split(",");
        var s;
        for (s in b) {
          var m = b[s].split(":");
          this.localStorageExpandedProjects[m[0].substring(0, 8)] = {
            expanded : m.length === 1 || m[1] === "e"
          };
        }
      }
    },
    writeLocalStorageExpandedProjects : function() {
      var b = [];
      for (truncatedProjectId in this.localStorageExpandedProjects) {
        b.push(truncatedProjectId + ":" + (this.localStorageExpandedProjects[truncatedProjectId].expanded ? "e" : "c"));
      }
      b = b.join(",");
      if (localstorage_helper.localStorageSupported()) {
        var s = this.localStorageKey("expanded");
        localstorage_helper.write(s, b);
      }
    },
    projectIdIsExpanded : function(b) {
      b = b.substring(0, 8);
      return b in this.expandedProjects ? this.expandedProjects[b].expanded : false;
    },
    setExpandedForProjectIds : function(b, s) {
      var m = search.inSearchMode();
      var w;
      for (w in b) {
        var t = b[w];
        if (!(m && !search.isLocallyCreatedItemForCurrentSearch(this.getProjectReferenceByProjectId(t)))) {
          t = t.substring(0, 8);
          this.expandedProjects[t] = {
            expanded : s
          };
          this.localStorageExpandedProjects[t] = {
            expanded : s
          };
          this.pendingExpandedProjectsDelta.set(t, s);
        }
      }
      this.writeLocalStorageExpandedProjects();
    },
    addSubtreeExpansionsToPendingDelta : function(b) {
      if (!(b !== null && project_tree_object.isAddedSubtreePlaceholder(b))) {
        var s = this.getChildrenOfProjectTreeObject(b);
        if (s.length !== 0) {
          if (b !== null) {
            b = project_tree_object.getProjectId(b);
            var m = this.projectIdIsExpanded(b);
            this.pendingExpandedProjectsDelta.set(b.substring(0, 8), m);
            var w;
            for (w in s) {
              this.addSubtreeExpansionsToPendingDelta(s[w]);
            }
          }
        }
      }
    },
    getProjectTreeObjectByProjectId : function(b) {
      return b === k ? null : this.projectIdToProjectMap.get(b);
    },
    getDeletedProjectTreeObjectByProjectId : function(b) {
      return this.deletedProjectIdToProjectMap.get(b);
    },
    getNormalOrDeletedProjectTreeObjectByTruncatedProjectId : function(b) {
      var s = this.projectIdToProjectMap.getTruncated(b);
      if (s !== undefined) {
        return s;
      }
      return this.deletedProjectIdToProjectMap.getTruncated(b);
    },
    getProjectReferenceByProjectId : function(b) {
      return new r(b, this.treeId);
    },
    getProjectReferenceByProjectTreeObject : function(b) {
      return new r(l(b), this.treeId);
    },
    getRootProjectReference : function() {
      return this.getProjectReferenceByProjectId(k);
    },
    getProjectReferenceByTruncatedProjectId : function(b) {
      b = this.getNormalOrDeletedProjectTreeObjectByTruncatedProjectId(b);
      if (b === undefined) {
        return null;
      }
      return this.getProjectReferenceByProjectTreeObject(b);
    },
    getChildrenOfProjectTreeObject : function(b) {
      return b === null ? this.rootProjectChildren : project_tree_object.getChildren(b);
    },
    getSiblingsOfProjectTreeObject : function(b) {
      return this.getChildrenOfProjectTreeObject(project_tree_object.getParent(b));
    },
    getPriorityOfProjectTreeObject : function(b) {
      return this.getSiblingsOfProjectTreeObject(b).indexOf(b);
    },
    projectTreeObjectHasSharedAncestor : function(b, s) {
      if (s === undefined) {
        s = false;
      }
      var m = s ? b : project_tree_object.getParent(b);
      for (;m !== null;) {
        if (project_tree_object.getSharedInfo(m) !== null) {
          return true;
        }
        m = project_tree_object.getParent(m);
      }
      return false;
    },
    projectSubtreeContainsAddedSubtreePlaceholder : function(b) {
      if (project_tree_object.isAddedSubtreePlaceholder(b)) {
        return true;
      }
      if (this.getChildrenOfProjectTreeObject(b).length === 0) {
        return false;
      }
      var s;
      for (s in this.sharedSubtreePlaceholders) {
        var m = this.sharedSubtreePlaceholders[s];
        do {
          m = project_tree_object.getParent(m);
          if (m === b) {
            return true;
          }
        } while (m !== null);
      }
      return false;
    },
    deletedProjectSubtreeContainsAddedSubtreePlaceholder : function(b) {
      var s = false;
      this.applyToProjectSubtree(b, function(m) {
        if (project_tree_object.isAddedSubtreePlaceholder(m)) {
          s = true;
        }
      });
      return s;
    },
    knowAboutProjectId : function(b) {
      if (this.getProjectTreeObjectByProjectId(b) !== undefined) {
        return true;
      }
      return this.deletedProjectIdToProjectMap.contains(b);
    },
    containsSharedProjectWithShareId : function(b) {
      var s = false;
      this.applyToProjectSubtree(null, function(m) {
        m = project_tree_object.getSharedInfo(m);
        if (m !== null && m.getShareId() === b) {
          s = true;
        }
      });
      return s;
    },
    applyToProjectSubtree : function(b, s) {
      var m = b === null;
      if (!m) {
        s(b);
      }
      if (m || !project_tree_object.isAddedSubtreePlaceholder(b)) {
        m = this.getChildrenOfProjectTreeObject(b);
        var w = 0;
        for (;w < m.length;w++) {
          this.applyToProjectSubtree(m[w], s);
        }
      }
    },
    applyLocalOperationAndAddToPendingQueue : function(b, s, m) {
      if (m === undefined) {
        m = null;
      }
      var w = this.getCurrentClientTimestamp();
      var t = this.getOwnerId();
      t = USER_ID_AS_INT !== t ? USER_ID_AS_INT : null;
      if (m !== null) {
        s = operations.createOperationWithUndoData(b, s, m, w, t);
        utils.debugMessage("Applying local undo/redo operation:");
        utils.debugMessage(s);
        try {
          this.operationRunner.applyOperations([s]);
        } catch (y) {
          utils.debugMessage(y);
          return false;
        }
      } else {
        s = operations.createOperation(b, s, w, t);
        s = this.operationRunner.applyOperations([s])[0];
        undo_redo.addOperationToCurrentBatch(s, new v(this.treeId));
      }
      // useful
      this.pendingOperationQueue.append(s);
      push_poll.updateSaveStatus();
      push_poll.scheduleNextPushAndPoll();
      return true;
    },
    isLastLocallyDeletedProjectId : function(b) {
      return q().isLastLocallyDeletedProject(this.getProjectReferenceByProjectId(b));
    },
    hasUnsavedData : function() {
      return this.pendingOperationQueue.getLength() > 0 || this.inFlightOperationQueue.getLength() > 0;
    },
    pushPollIsInProgress : function() {
      return this.pushPollInProgress.getValue();
    },
    hasPendingOperations : function() {
      return this.pendingOperationQueue.getLength() > 0;
    },
    hasInFlightOperations : function() {
      return this.inFlightOperationQueue.getLength() > 0;
    },
    notifyContentsAreVisibleMayHaveChanged : function() {
      if (!this.pushPollIsInProgress()) {
        if (this.contentsAreVisible()) {
          if (date_time.getCurrentTimeInMS() - this.lastPushPollCompleteTimestamp.getValue() > this.pollingIntervalInMs.getValue() + 1E3) {
            push_poll.scheduleImmediatePollOnNextTick();
          }
        }
      }
    },
    contentsAreVisible : function() {
      if (this.isAuxiliary()) {
        var b = h().getSharedSubtreePlaceholder(this.getShareId());
        return b !== undefined && (global_project_tree_object.isInDom(b) && global_project_tree_object.isExpandedInDom(b));
      } else {
        return true;
      }
    },
    currentlySkippingPushPolls : function() {
      if (!this.isAuxiliary() || this.contentsAreVisible()) {
        return false;
      }
      if (this.hasPendingOperations()) {
        return false;
      }
      return date_time.getCurrentTimeInMS() < this.lastPushPollCompleteTimestamp.getValue() + 6E5;
    },
    beginPushAndPoll : function() {
      this.pushPollInProgress.setValue(true);
      this.mostRecentOperationTransactionIdWhenPushPollInitiated.setValue(this.mostRecentOperationTransactionId.getValue());
      this.pendingOperationQueue.copyTo(this.inFlightOperationQueue);
      this.pendingOperationQueue.clear();
      this.pendingExpandedProjectsDelta.copyTo(this.inFlightExpandedProjectsDelta);
      this.pendingExpandedProjectsDelta.clear();
      return this.getPushPollData();
    },
    getPushPollData : function() {
      if (!this.pushPollInProgress.getValue()) {
        return null;
      }
      var data = {
        most_recent_operation_transaction_id : this.mostRecentOperationTransactionId.getValue()
      };
      if (this.mostRecentOperationTransactionIdWhenPushPollInitiated.getValue() !== this.mostRecentOperationTransactionId.getValue()) {
        data.most_recent_operation_transaction_id_when_pushpoll_initiated = this.mostRecentOperationTransactionIdWhenPushPollInitiated.getValue();
      }
      if (!this.inFlightExpandedProjectsDelta.isEmpty()) {
        data.project_expansions_delta = this.inFlightExpandedProjectsDelta.getDict();
      }
      if (this.isShared()) {
        data.share_id = this.getShareId();
      }
      if (this.inFlightOperationQueue.getLength() > 0) {
        var operations = this.inFlightOperationQueue.getList();
        data.operations = operations;
      }
      return data;
    },
    resetPushAndPoll : function() {
      this.pushPollInProgress.setValue(false);
      this.mostRecentOperationTransactionIdWhenPushPollInitiated.setValue(null);
      this.inFlightOperationQueue.prependTo(this.pendingOperationQueue);
      this.inFlightOperationQueue.clear();
      this.pendingExpandedProjectsDelta.setValue($.extend({}, this.inFlightExpandedProjectsDelta.getValue(), this.pendingExpandedProjectsDelta.getValue()));
      this.inFlightExpandedProjectsDelta.clear();
    },
    completePushAndPoll : function(b, s) {
      var m = false;
      var w = false;
      var t = false;
      var y = false;
      var A = false;
      var F = false;
      var z = this.inFlightOperationQueue.getLength() > 0;
      utils.debugMessage("Completing " + (z ? "PUSH" : "POLL") + ' for tree "' + this.treeId + '".');
      var D = "error" in b ? b.error : null;
      if (D === null) {
        var E = "new_most_recent_operation_transaction_id" in b ? b.new_most_recent_operation_transaction_id : null;
        var G = "server_run_operation_transaction_json" in b ? b.server_run_operation_transaction_json : null;
        var B = "concurrent_remote_operation_transactions" in b ? b.concurrent_remote_operation_transactions : null;
        var J = "error_encountered_in_remote_operations" in b ? b.error_encountered_in_remote_operations : false;
        var N = "new_polling_interval_in_ms" in b ? b.new_polling_interval_in_ms : null;
        var T = "refreshed_root_project" in b ? b.refreshed_root_project : null;
        var V = "refreshed_project_tree" in b ? b.refreshed_project_tree : null;
        var X = "need_refreshed_project_tree" in b && b.need_refreshed_project_tree;
        D = "over_quota" in b ? b.over_quota : null;
        var ea = "items_created_in_current_month" in b ? b.items_created_in_current_month : null;
        var I = "monthly_item_quota" in b ? b.monthly_item_quota : null;
        if (E === null || (z && (!s && G === null) || (N === null || (X && (V === null || (this.isShared() && T === null || !this.isShared() && T !== null)) || (B === null && V === null || (this.isShared() && D === null || !this.isShared() && (ea === null || I === null))))))) {
          m = true;
        }
        if (!m) {
          var L = null;
          if (G !== null) {
            L = utils.parseJsonWithErrorHandling(G, function() {
              m = true;
            });
          }
          var M = null;
          if (B !== null) {
            M = utils.parseJsonListWithErrorHandling(B, function() {
              m = true;
            });
          }
        }
        if (!m) {
          utils.debugMessage("Polling interval from server: " + N + " ms");
          this.mostRecentOperationTransactionId.setValue(E);
          this.pollingIntervalInMs.setValue(N);
          if (J) {
            utils.debugMessage("Server returned error_encountered_in_remote_operations");
          }
          E = this.operationRunner.applyConcurrentRemoteOperationTransactionsOrRefreshProjectTree(M, V !== null ? {
            refreshedRootProject : T,
            refreshedRootProjectChildren : V
          } : null, X, s && L === null);
          if (L !== null) {
            this.operationRunner.updateShareIdsFromServerRunOperationsIfApplicable(L);
          }
          if ((G = M !== null && M.length > 0) || L !== null) {
            if (G) {
              this.serverRunOperationTransactionQueue.appendList(M);
            }
            if (L !== null) {
              this.serverRunOperationTransactionQueue.append(L);
            }
          }
          if (E.errorEncountered) {
            t = true;
          }
          if (E.loadedRefreshedProjectTree) {
            y = true;
          }
          if (this.isShared()) {
            utils.debugMessage("Quota info from server: " + (D ? "over" : "under") + " quota");
            L = D !== this.overQuota.getValue();
            this.overQuota.setValue(D);
          } else {
            utils.debugMessage("Quota info from server: " + ea + " / " + I + " items");
            L = ea !== this.itemsCreatedInCurrentMonth.getValue() || I !== this.monthlyItemQuota.getValue();
            this.itemsCreatedInCurrentMonth.setValue(ea);
            this.monthlyItemQuota.setValue(I);
          }
        }
      } else {
        utils.debugMessage('Server error: "' + D + '"');
        if (D === "account_is_busy" && !z) {
          utils.debugMessage("Account was busy for poll - will try again later.");
          F = true;
        } else {
          if (D === "shared_project_does_not_exist" && this.isAuxiliary()) {
            A = true;
          } else {
            if (z) {
              w = true;
            } else {
              m = true;
            }
          }
        }
      }
      D = m || (w || t);
      if (z) {
        sharing.notifyShareOrUnshareCompleteIfNeeded(this.inFlightOperationQueue, D);
      }
      if (F) {
        this.resetPushAndPoll();
      } else {
        this.pushPollInProgress.setValue(false);
        this.mostRecentOperationTransactionIdWhenPushPollInitiated.setValue(null);
        this.inFlightOperationQueue.clear();
        this.inFlightExpandedProjectsDelta.clear();
        this.lastPushPollCompleteTimestamp.setValue(date_time.getCurrentTimeInMS());
      }
      return{
        invalidResult : m,
        errorEncounteredRunningClientOperationsOnServer : w,
        errorEncounteredRunningRemoteOperationsOnClient : t,
        loadedRefreshedProjectTree : y,
        makeDefunct : A
      };
    },
    operationTransactionsContainUndeleteOfUnknownProject : function(b) {
      return this.operationRunner.operationTransactionsContainUndeleteOfUnknownProject(b);
    },
    getPendingOperationList : function() {
      return this.pendingOperationQueue.getList();
    },
    getInFlightOperationList : function() {
      return this.inFlightOperationQueue.getList();
    },
    setPendingOperationList : function(b) {
      this.pendingOperationQueue.setList(b);
    },
    setInFlightOperationList : function(b) {
      this.inFlightOperationQueue.setList(b);
    },
    getStats : function() {
      var b = 0;
      var s = 0;
      var m = 0;
      this.applyToProjectSubtree(null, function(w) {
        b++;
        if (!project_tree_object.isAddedSubtreePlaceholder(w)) {
          if (project_tree_object.getChildren(w).length === 0) {
            s++;
          }
        }
        if (project_tree_object.isCompleted(w)) {
          m++;
        }
      });
      return{
        items : b,
        leaves : s,
        completed : m
      };
    },
    applyLocalEdit : function(project, name, description) {
      // creates edit operation and adds it to pending queue
      // useful
      var operation = {
        projectid : project_tree_object.getProjectId(project)
      };
      if (name !== null) {
        operation.name = name;
      }
      if (description !== null) {
        operation.description = description;
      }
      this.applyLocalOperationAndAddToPendingQueue("edit", operation);
    },
    applyLocalCreateChild : function(b, s) {
      // generate unique id for project
      var id = utils.generateUUID();
      var w = new r(id, this.treeId);
      if (search.inSearchMode()) {
        search.registerLocallyCreatedItemForCurrentSearch(w);
      }
      this.applyLocalOperationAndAddToPendingQueue("create", {
        projectid : id,
        parentid : l(b),
        priority : s
      });
      return w;
    },
    applyLocalBulkCreateChildren : function(b, s, m) {
      var w = [];
      var t = [];
      var y = [];
      var A = this.treeId;
      var F = function(D, E) {
        if (E === undefined) {
          E = false;
        }
        var G = false;
        if ("expanded" in D) {
          G = true;
          delete D.expanded;
        }
        var B = utils.generateUUID();
        project_tree_object.setProjectId(D, B);
        var J = new r(B, A);
        if (E) {
          w.push(J);
        }
        if (search.inSearchMode()) {
          search.registerLocallyCreatedItemForCurrentSearch(J);
        }
        B = project_tree_object.getChildren(D);
        if (B !== undefined) {
          if (G) {
            t.push(J);
            if (E) {
              y.push(J);
            }
          }
          G = 0;
          for (;G < B.length;G++) {
            F(B[G]);
          }
        }
      };
      var z = 0;
      for (;z < m.length;z++) {
        F(m[z], true);
      }
      this.applyLocalOperationAndAddToPendingQueue("bulk_create", {
        parentid : l(b),
        starting_priority : s,
        project_trees : JSON.stringify(m)
      });
      project_tree.setExpandedForProjectReferences(t, true);
      z = 0;
      for (;z < y.length;z++) {
        y[z].getMatchingDomProject().showChildren("instant");
      }
      return w;
    },
    applyLocalComplete : function(b) {
      this.applyLocalOperationAndAddToPendingQueue("complete", {
        projectid : project_tree_object.getProjectId(b)
      });
    },
    applyLocalUncomplete : function(b) {
      this.applyLocalOperationAndAddToPendingQueue("uncomplete", {
        projectid : project_tree_object.getProjectId(b)
      });
    },
    applyLocalDelete : function(b) {
      project_tree_object.getParent(b);
      this.applyLocalOperationAndAddToPendingQueue("delete", {
        projectid : project_tree_object.getProjectId(b)
      });
    },
    applyLocalUndelete : function(b, s, m) {
      this.applyLocalOperationAndAddToPendingQueue("undelete", {
        projectid : b,
        parentid : l(s),
        priority : m
      });
    },
    applyLocalMove : function(b, s, m) {
      var w = this.getPriorityOfProjectTreeObject(b);
      var t = project_tree_object.getParent(b);
      if (s === t) {
        if (m > w) {
          m--;
        }
      }
      this.applyLocalOperationAndAddToPendingQueue("move", {
        projectid : project_tree_object.getProjectId(b),
        parentid : l(s),
        priority : m
      });
    },
    applyLocalBulkMove : function(b, s, m) {
      var w = [];
      var t = 0;
      var y = 0;
      for (;y < b.length;y++) {
        var A = b[y];
        w.push(project_tree_object.getProjectId(A));
        if (project_tree_object.getParent(A) === s) {
          A = this.getPriorityOfProjectTreeObject(A);
          if (m > A) {
            t++;
          }
        }
      }
      m -= t;
      this.applyLocalOperationAndAddToPendingQueue("bulk_move", {
        projectids_json : JSON.stringify(w),
        parentid : l(s),
        priority : m
      });
    },
    applyLocalShare : function(b, s, m) {
      if (m === undefined) {
        m = null;
      }
      this.addSubtreeExpansionsToPendingDelta(b);
      var w = project_tree_object.getSharedInfo(b);
      if (w !== null) {
        w.isSharedViaUrl();
      }
      b = {
        projectid : project_tree_object.getProjectId(b),
        share_type : s
      };
      if (s === "url") {
        b.write_permission = m;
      }
      this.applyLocalOperationAndAddToPendingQueue("share", b);
    },
    applyLocalUnshare : function(b) {
      this.applyLocalOperationAndAddToPendingQueue("unshare", {
        projectid : project_tree_object.getProjectId(b)
      });
    },
    applyLocalAddSharedEmail : function(b, s, m) {
      var w = null;
      var t = project_tree_object.getSharedInfo(b).getInfoForEmail(s);
      if (t !== null) {
        w = t.access_token;
      }
      if (w === null) {
        w = urls.generateUrlSafeRandomString(10);
      }
      this.applyLocalOperationAndAddToPendingQueue("add_shared_email", {
        projectid : project_tree_object.getProjectId(b),
        shared_email : s,
        write_permission : m,
        access_token : w
      });
    },
    applyLocalRemoveSharedEmail : function(b, s) {
      project_tree_object.getSharedInfo(b);
      this.applyLocalOperationAndAddToPendingQueue("remove_shared_email", {
        projectid : project_tree_object.getProjectId(b),
        shared_email : s
      });
    },
    getTreeId : function() {
      return this.treeId;
    },
    getRootProject : function() {
      return this.rootProject;
    },
    getRootProjectId : function() {
      return this.rootProject !== null ? project_tree_object.getProjectId(this.rootProject) : null;
    },
    getRootProjectChildren : function() {
      return this.rootProjectChildren;
    },
    getProjectIdToProjectMap : function() {
      return this.projectIdToProjectMap;
    },
    getDeletedProjectIdToProjectMap : function() {
      return this.deletedProjectIdToProjectMap;
    },
    getPollingIntervalInMs : function() {
      return this.pollingIntervalInMs.getValue();
    },
    getLastPushPollCompleteTimestamp : function() {
      return this.lastPushPollCompleteTimestamp.getValue();
    }
  });
  var u = Class.extend({
    init : function() {
    },
    applyToAllProjectTrees : function(b) {
      var s;
      for (s in c) {
        b(c[s]);
      }
    },
    findProjectByProjectId : function(b) {
      if (b === k) {
        return h().getProjectReferenceByProjectId(b);
      }
      var s;
      for (s in c) {
        var m = c[s].getProjectReferenceByProjectId(b);
        if (m.isValid()) {
          return m;
        }
      }
      return null;
    },
    getMatchingKnownProjectIdForTruncatedProjectId : function(b) {
      var s;
      for (s in c) {
        var m = c[s].getProjectReferenceByTruncatedProjectId(b);
        if (m !== null) {
          return m.getProjectId();
        }
      }
      return null;
    },
    haveUnsavedData : function() {
      var b;
      for (b in c) {
        if (c[b].hasUnsavedData()) {
          return true;
        }
      }
      return false;
    },
    readLocalStorageExpandedProjects : function() {
      var b;
      for (b in c) {
        c[b].readLocalStorageExpandedProjects();
      }
    },
    getSharedSubtreePlaceholders : function() {
      var b = [];
      var s;
      for (s in c) {
        var m = c[s].getSharedSubtreePlaceholders();
        b.push(m);
      }
      return utils.concatArrays(b);
    },
    getSharedProjects : function() {
      var b = [];
      var s;
      for (s in c) {
        var m = c[s].getSharedProjects();
        b.push(m);
      }
      return utils.concatArrays(b);
    },
    getMinPollingInterval : function() {
      var b = null;
      var s;
      for (s in c) {
        var m = c[s];
        if (!m.currentlySkippingPushPolls()) {
          m = m.getPollingIntervalInMs();
          if (b === null || m < b) {
            b = m;
          }
        }
      }
      return b;
    },
    getLastPushPollCompleteTimestamp : function() {
      var b = null;
      var s;
      for (s in c) {
        var m = c[s].getLastPushPollCompleteTimestamp();
        b = b === null ? m : Math.max(b, m);
      }
      return b;
    },
    pushPollIsInProgress : function() {
      var b;
      for (b in c) {
        if (c[b].pushPollIsInProgress()) {
          return true;
        }
      }
      return false;
    },
    havePendingOperations : function() {
      var b;
      for (b in c) {
        if (c[b].hasPendingOperations()) {
          return true;
        }
      }
      return false;
    },
    haveInFlightOperations : function() {
      var b;
      for (b in c) {
        if (c[b].hasInFlightOperations()) {
          return true;
        }
      }
      return false;
    },
    beginPushAndPoll : function() {
      var b = [];
      var s;
      for (s in c) {
        var m = c[s];
        if (!m.currentlySkippingPushPolls()) {
          m = m.beginPushAndPoll();
          b.push(m);
        }
      }
      return b;
    },
    getPushPollData : function() {
      var b = [];
      var s;
      for (s in c) {
        var m = c[s].getPushPollData();
        if (m !== null) {
          b.push(m);
        }
      }
      return b;
    },
    resetPushAndPoll : function() {
      var b;
      for (b in c) {
        var s = c[b];
        if (s.pushPollIsInProgress()) {
          s.resetPushAndPoll();
        }
      }
    },
    markIfRefreshedProjectTreeNeededForRemoteUndeletes : function(b) {
      if (!("results" in b)) {
        return false;
      }
      b = b.results;
      var s = 0;
      for (;s < b.length;s++) {
        var m = b[s];
        if (!("need_refreshed_project_tree" in m && m.need_refreshed_project_tree)) {
          var w = "concurrent_remote_operation_transactions" in m ? m.concurrent_remote_operation_transactions : null;
          var t = "share_id" in m ? m.share_id : null;
          if ("remote_operations_contain_undelete" in m && m.remote_operations_contain_undelete) {
            utils.debugMessage("Remote operations contain undelete. Testing if we know about the item being undeleted...");
            if (w !== null) {
              t = t !== null ? j(t) : h();
              if (t !== null) {
                w = utils.parseJsonListWithErrorHandling(w);
                if (w !== null) {
                  if (t.operationTransactionsContainUndeleteOfUnknownProject(w)) {
                    utils.debugMessage("... We do not. Marking that we need a refreshed project tree.");
                    m.need_refreshed_project_tree = true;
                  } else {
                    utils.debugMessage("... We do. No refreshed project tree needed.");
                  }
                }
              }
            }
          }
        }
      }
    },
    needRefreshedProjectTreesOrAddedSharedSubtrees : function(b) {
      if (!("results" in b)) {
        return false;
      }
      var s = b.results;
      if (("newly_added_shared_project_share_ids" in b ? b.newly_added_shared_project_share_ids : []).length > 0) {
        return true;
      }
      b = 0;
      for (;b < s.length;b++) {
        var m = s[b];
        if ("need_refreshed_project_tree" in m && m.need_refreshed_project_tree) {
          return true;
        }
      }
      return false;
    },
    extractRefreshedProjectTreesAndNewlyAddedSharedSubtreesFromNewProjectTreeData : function(b, s) {
      function m(z) {
        var D = 0;
        for (;D < b.auxiliaryProjectTreeInfos.length;D++) {
          var E = b.auxiliaryProjectTreeInfos[D];
          if (E.shareId === z) {
            return E;
          }
        }
        return null;
      }
      var w = "newly_added_shared_project_share_ids" in s ? s.newly_added_shared_project_share_ids : [];
      var t = [];
      var y = 0;
      for (;y < w.length;y++) {
        var A = w[y];
        var F = m(A);
        if (F !== null) {
          t.push(F);
          utils.debugMessage("Extracted newly added shared subtree with share-id " + A);
        }
      }
      if (t.length > 0) {
        s.newly_added_shared_project_trees = t;
      }
      w = s.results;
      t = 0;
      for (;t < w.length;t++) {
        y = w[t];
        if ("need_refreshed_project_tree" in y && y.need_refreshed_project_tree) {
          A = "share_id" in y ? y.share_id : null;
          F = null;
          F = A === null ? b.mainProjectTreeInfo : m(A);
          if (F !== null) {
            y.refreshed_project_tree = F.rootProjectChildren;
            if ("rootProject" in F) {
              y.refreshed_root_project = F.rootProject;
            }
            y.new_most_recent_operation_transaction_id = F.initialMostRecentOperationTransactionId;
          }
        }
      }
    },
    completePushAndPoll : function(b, s) {
      if (!("results" in b)) {
        return{
          invalidData : true
        };
      }
      var m = b.results;
      var w = "newly_added_shared_project_trees" in b ? b.newly_added_shared_project_trees : null;
      var t = false;
      var y = false;
      var A = false;
      var F = false;
      var z = false;
      var D = false;
      var E = 0;
      for (;E < m.length;E++) {
        var G = m[E];
        if ("concurrent_remote_operation_transactions" in G && G.concurrent_remote_operation_transactions.length > 0 || ("refreshed_project_tree" in G || "error" in G && G.error === "shared_project_does_not_exist")) {
          D = true;
          break;
        }
      }
      if (w !== null) {
        D = true;
      }
      if (D) {
        var B = operations.saveClientViewState();
        blurFocusedContent();
      }
      if (w !== null) {
        E = 0;
        for (;E < w.length;E++) {
          G = w[E];
          var J = G.shareId;
          if (j(J) === null) {
            if (j(J, d) === null) {
              a(G);
            }
          }
        }
      }
      E = 0;
      for (;E < m.length;E++) {
        G = m[E];
        J = "share_id" in G ? G.share_id : null;
        J = J !== null ? j(J) : h();
        if (J === null || !J.pushPollIsInProgress()) {
          t = true;
        } else {
          G = J.completePushAndPoll(G, s);
          t |= G.invalidResult;
          y |= G.errorEncounteredRunningClientOperationsOnServer;
          A |= G.errorEncounteredRunningRemoteOperationsOnClient;
          F |= G.loadedRefreshedProjectTree;
          if (G.makeDefunct) {
            J.makeDefunct();
            z = true;
          }
        }
      }
      if (this.pushPollIsInProgress()) {
        t = true;
      }
      if (D) {
        m = false;
        if (F || (w !== null || z)) {
          if (TRACK_TAG_COUNTS) {
            e(null);
          }
          if (search.inSearchMode()) {
            if (B.selectedProjectReference.isValid()) {
              search.reapplyCurrentSearch(B.selectedProjectReference);
            }
          }
          if (F) {
            undo_redo.clearStacks();
          }
          m = true;
        }
        operations.restoreClientViewState(B, {
          forceDomRebuild : m,
          scrollToFocusBehavior : "doNotScroll"
        });
      }
      return{
        invalidData : t,
        errorEncounteredRunningClientOperationsOnServer : y,
        errorEncounteredRunningRemoteOperationsOnClient : A
      };
    },
    getStats : function() {
      var b = {};
      var s;
      for (s in c) {
        b[s] = c[s].getStats();
      }
      var m = {};
      for (s in b) {
        var w = b[s];
        var t;
        for (t in w) {
          m[t] = (t in m ? m[t] : 0) + w[t];
        }
      }
      return{
        trees : b,
        totals : m
      };
    }
  });
  return{
    ROOT_PROJECTID : k,
    ProjectReference : r,
    applyLocalMoveForProjectReferences : function(b, s, m) {
      var w = b[0];
      s = w._getNewParentProjectTreeObjectFromReference(s);
      w = w.getProjectTree();
      var t = [];
      var y = 0;
      for (;y < b.length;y++) {
        t.push(b[y].getProjectTreeObject());
      }
      if (t.length === 1) {
        w.applyLocalMove(t[0], s, m);
      } else {
        w.applyLocalBulkMove(t, s, m);
      }
    },
    setExpandedForProjectReferences : function(b, s) {
      var m = [];
      var w = 0;
      for (;w < b.length;w++) {
        m.push(b[w].getProjectTreeObject());
      }
      f(m, s);
    },
    initializeProjectTrees : function(MAIN_PROJECT_TREE_INFO, s) {
      var m = 0;
      for (;m < s.length;m++) {
        a(s[m], true);
      }
      m = new x(MAIN_PROJECT_TREE_INFO, o);
      c[o] = m;
      if (TRACK_TAG_COUNTS) {
        e(null);
      }
    },
    initializeGlobalDescendantTagCounts : e,
    mainLocalStorageKey : function(b) {
      return h().localStorageKey(b);
    },
    getMainProjectTree : h,
    getProjectTreeByRootProjectId : function(b) {
      var s;
      for (s in c) {
        var m = c[s];
        if (m.getRootProjectId() === b) {
          return m;
        }
      }
      return null;
    },
    getSharedProjectTreeByShareId : j,
    getProjectIdOfProjectTreeObject : l,
    getProjectReferenceFromDomProject : n,
    getProjectReferencesFromDomProjects : function(b) {
      var s = [];
      b.each(function() {
        var m = $(this);
        s.push(n(m));
      });
      return s;
    },
    getProjectReferenceFromUniqueIdentifierWithTruncatedProjectIds : function(b) {
      var s = b.split(":");
      if (s.length > 2) {
        return null;
      }
      if (s.length === 1) {
        s = s[0];
        var m = h();
      } else {
        b = s[0];
        s = s[1];
        m = null;
        var w;
        for (w in c) {
          var t = c[w];
          var y = t.getRootProjectId();
          if (y !== null) {
            if (project_ids.projectIdMatchesTruncatedProjectId(y, b)) {
              m = t;
              break;
            }
          }
        }
        if (m === null) {
          return null;
        }
      }
      return m.getProjectReferenceByTruncatedProjectId(s);
    },
    getMatchingDomProjectsForProjectReferences : function(b) {
      var s = $();
      var m = 0;
      for (;m < b.length;m++) {
        s = s.add(b[m].getMatchingDomProject());
      }
      return s;
    },
    getAllProjectTreesHelper : q
  };
}();
var project_ids = function() {
  function a(j) {
    return j.substring(j.length - e);
  }
  var e = 12;
  return{
    ProjectIdMap : Class.extend({
      init : function() {
        this._projectIdMap = {};
        this._truncatedProjectIdToProjectIdMap = {};
      },
      get : function(j) {
        return this._projectIdMap[j];
      },
      getTruncated : function(j) {
        if (j in this._truncatedProjectIdToProjectIdMap) {
          return this.get(this._truncatedProjectIdToProjectIdMap[j]);
        }
      },
      set : function(j, h) {
        this._projectIdMap[j] = h;
        this._truncatedProjectIdToProjectIdMap[a(j)] = j;
      },
      remove : function(j) {
        delete this._projectIdMap[j];
        delete this._truncatedProjectIdToProjectIdMap[a(j)];
      },
      contains : function(j) {
        return j in this._projectIdMap;
      },
      applyToAll : function(j) {
        for (projectId in this._projectIdMap) {
          j(this._projectIdMap[projectId]);
        }
      }
    }),
    truncateProjectId : a,
    isTruncatedProjectId : function(j) {
      return j.length === e;
    },
    projectIdMatchesTruncatedProjectId : function(j, h) {
      return utils.isSuffixMatch(j, h);
    },
    INVALID_PROJECT_ID : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  };
}();
var operations = function() {
  function createOperation(c, g, d, k) {
    c = {
      type : c,
      data : g,
      client_timestamp : d
    };
    if (k !== null) {
      c.executed_by = k;
    }
    return c;
  }
  function createOperationWithUndoData(c, g, d, k, p) {
    c = createOperation(c, g, k, p);
    c.undo_data = d;
    return c;
  }
  function addUndoData(c, g) {
    var d = utils.deepCopyObject(c);
    d.undo_data = g;
    return d;
  }
  function h(c, g) {
    if (g === undefined) {
      g = false;
    }
    var d = [];
    var k = 0;
    for (;k < c.length;k++) {
      var p = c[k];
      if (g) {
        utils.debugMessage(function() {
          return "remote operation transaction: " + JSON.stringify(p);
        });
      }
      var v = p.ops;
      var r = p.client_timestamp;
      var x = "ex" in p ? p.ex : null;
      var u = 0;
      for (;u < v.length;u++) {
        var b = v[u];
        b.client_timestamp = r;
        if (x !== null) {
          b.executed_by = x;
        }
      }
      utils.pushArray(d, v);
    }
    return d;
  }
  function f(c) {
    var g = [];
    var d = c.length - 1;
    for (;d >= 0;d--) {
      var k = c[d];
      utils.debugMessage("inverting: " + k.type);
      k = n(k);
      g = g.concat(k);
    }
    return g;
  }
  function invertLocalOperation(c) {
    var g = o(c, "type");
    var d = o(c, "data");
    var k = o(c, "undo_data");
    var p = o(c, "client_timestamp");
    c = "executed_by" in c ? c.executed_by : null;
    switch(g) {
      case "edit":
        var v = o(d, "projectid");
        g = "name" in d ? d.name : null;
        d = "description" in d ? d.description : null;
        var r = o(k, "previous_last_modified");
        var x = o(k, "previous_last_modified_by");
        v = {
          projectid : v
        };
        p = {
          previous_last_modified : p,
          previous_last_modified_by : c
        };
        if (g !== null) {
          v.name = o(k, "previous_name");
          p.previous_name = g;
        }
        if (d !== null) {
          v.description = o(k, "previous_description");
          p.previous_description = d;
        }
        return[createOperationWithUndoData("edit", v, p, r, x)];
      case "create":
        k = o(d, "projectid");
        g = o(d, "parentid");
        d = o(d, "priority");
        return[createOperationWithUndoData("delete", {
          projectid : k
        }, {
          parentid : g,
          priority : d,
          previous_last_modified : p,
          previous_last_modified_by : c
        }, null, null)];
      case "complete":
        return q("complete", d, k, p, c);
      case "uncomplete":
        return q("uncomplete", d, k, p, c);
      case "delete":
        d = o(d, "projectid");
        g = o(k, "parentid");
        r = o(k, "priority");
        x = o(k, "previous_last_modified");
        k = o(k, "previous_last_modified_by");
        return[createOperationWithUndoData("undelete", {
          projectid : d,
          parentid : g,
          priority : r
        }, {
          previous_last_modified : p,
          previous_last_modified_by : c
        }, x, k)];
      case "undelete":
        g = o(d, "projectid");
        r = o(d, "parentid");
        d = o(d, "priority");
        x = o(k, "previous_last_modified");
        k = o(k, "previous_last_modified_by");
        return[createOperationWithUndoData("delete", {
          projectid : g
        }, {
          parentid : r,
          priority : d,
          previous_last_modified : p,
          previous_last_modified_by : c
        }, x, k)];
      case "move":
        g = o(d, "projectid");
        r = o(d, "parentid");
        d = o(d, "priority");
        x = o(k, "previous_parentid");
        v = o(k, "previous_priority");
        var u = o(k, "previous_last_modified");
        k = o(k, "previous_last_modified_by");
        return[createOperationWithUndoData("move", {
          projectid : g,
          parentid : x,
          priority : v
        }, {
          previous_parentid : r,
          previous_priority : d,
          previous_last_modified : p,
          previous_last_modified_by : c
        }, u, k)];
      case "share":
        g = o(d, "projectid");
        r = o(d, "share_type");
        x = "write_permission" in d ? d.write_permission : null;
        v = o(k, "previous_share_type");
        u = "previous_write_permission" in k ? k.previous_write_permission : null;
        d = o(k, "previous_last_modified");
        k = o(k, "previous_last_modified_by");
        if (v === "url" && r === "url") {
          if (u === null) {
            throw Error("Missing previous_write_permission when inverting a write_permission change to URL-based sharing.");
          }
          p = [createOperationWithUndoData("share", {
            projectid : g,
            share_type : "url",
            write_permission : u
          }, {
            previous_share_type : "url",
            previous_write_permission : x,
            previous_last_modified : p,
            previous_last_modified_by : c
          }, d, k)];
        } else {
          v = new sharing.ItemSharedInfo;
          if (r === "url") {
            v.shareViaUrl(x);
          } else {
            if (r === "email") {
              v.shareViaEmail();
            }
          }
          g = {
            projectid : g
          };
          p = {
            previous_shared_info : v.makeCopyOfRawSharedInfoWithoutShareId(),
            previous_last_modified : p,
            previous_last_modified_by : c
          };
          p = [createOperationWithUndoData("unshare", g, p, d, k)];
        }
        return p;
      case "unshare":
        d = o(d, "projectid");
        g = o(k, "previous_shared_info");
        r = o(k, "previous_last_modified");
        k = o(k, "previous_last_modified_by");
        g = new sharing.ItemSharedInfo(g);
        return g.getOperationsToCreate(d, p, c, r, k);
      case "add_shared_email":
        g = o(d, "projectid");
        r = o(d, "shared_email");
        x = o(d, "write_permission");
        d = o(d, "access_token");
        v = "previous_write_permission" in k ? k.previous_write_permission : null;
        u = o(k, "previous_last_modified");
        k = o(k, "previous_last_modified_by");
        p = v !== null ? [createOperationWithUndoData("add_shared_email", {
          projectid : g,
          shared_email : r,
          write_permission : v,
          access_token : d
        }, {
          previous_write_permission : x,
          previous_last_modified : p,
          previous_last_modified_by : c
        }, u, k)] : [createOperationWithUndoData("remove_shared_email", {
          projectid : g,
          shared_email : r
        }, {
          write_permission : x,
          access_token : d,
          previous_last_modified : p,
          previous_last_modified_by : c
        }, u, k)];
        return p;
      case "remove_shared_email":
        g = o(d, "projectid");
        d = o(d, "shared_email");
        r = o(k, "write_permission");
        x = o(k, "access_token");
        v = "user_id" in k ? k.user_id : null;
        u = o(k, "previous_last_modified");
        k = o(k, "previous_last_modified_by");
        var b = [];
        b.push(createOperationWithUndoData("add_shared_email", {
          projectid : g,
          shared_email : d,
          write_permission : r,
          access_token : x,
          send_email_if_new : false
        }, {
          previous_last_modified : p,
          previous_last_modified_by : c
        }, u, k));
        if (v !== null) {
          b.push(createOperationWithUndoData("register_shared_email_user", {
            projectid : g,
            access_token : x,
            user_id : v
          }, {
            previous_last_modified : p,
            previous_last_modified_by : c
          }, u, k));
        }
        return b;
      case "register_shared_email_user":
        r = o(d, "projectid");
        x = o(d, "access_token");
        d = "user_id" in d ? d.user_id : null;
        v = "previous_user_id" in k ? k.previous_user_id : null;
        g = o(k, "previous_last_modified");
        k = o(k, "previous_last_modified_by");
        r = {
          projectid : r,
          access_token : x
        };
        if (v !== null) {
          if (d !== null) {
            throw Error("Unexpected 'register_shared_email_user' operation with both user_id and previous_user_id !== null");
          }
          r.user_id = v;
        }
        p = {
          previous_last_modified : p,
          previous_last_modified_by : c
        };
        if (d !== null) {
          p.previous_user_id = d;
        }
        return[createOperationWithUndoData("register_shared_email_user", r, p, g, k)];
      case "make_shared_subtree_placeholder":
        throw Error("Can't invert make_shared_subtree_placeholder - not implemented.");;
      case "bulk_create":
        return l(d, k, p, c);
      case "bulk_move":
        r = o(d, "projectids_json");
        g = o(d, "parentid");
        o(d, "priority");
        k = o(k, "move_undo_datas");
        d = JSON.parse(r);
        if (k.length !== d.length) {
          throw Error("move_undo_datas is different length than projectids when inverting bulk_move.");
        }
        r = [];
        x = d.length - 1;
        for (;x >= 0;x--) {
          b = d[x];
          var s = k[x];
          var m = o(s, "previous_parentid");
          var w = o(s, "previous_priority");
          v = o(s, "previous_last_modified");
          u = o(s, "previous_last_modified_by");
          s = o(s, "priority_used_for_move");
          b = {
            projectid : b,
            parentid : m,
            priority : w
          };
          s = {
            previous_parentid : g,
            previous_priority : s,
            previous_last_modified : p,
            previous_last_modified_by : c
          };
          v = createOperationWithUndoData("move", b, s, v, u);
          r.push(v);
        }
        return r;
      default:
        throw Error("Unrecognized operation type: '" + g + "'");;
    }
  }
  function l(c, g, d, k) {
    g = o(c, "parentid");
    var p = o(c, "starting_priority");
    c = o(c, "project_trees");
    c = JSON.parse(c);
    var v = [];
    var r = c.length - 1;
    for (;r >= 0;r--) {
      var x = {
        projectid : project_tree_object.getProjectId(c[r])
      };
      x = createOperationWithUndoData("delete", x, {
        parentid : g,
        priority : p + r,
        previous_last_modified : d,
        previous_last_modified_by : k
      }, null, null);
      v.push(x);
    }
    return v;
  }
  function q(c, g, d, k, p) {
    g = o(g, "projectid");
    var v = o(d, "previous_completed");
    var r = o(d, "previous_last_modified");
    d = o(d, "previous_last_modified_by");
    return[createOperationWithUndoData(v === false ? "uncomplete" : "complete", {
      projectid : g
    }, {
      previous_last_modified : k,
      previous_last_modified_by : p,
      previous_completed : c === "complete" ? k : false
    }, r, d)];
  }
  function o(c, g) {
    if (!(g in c)) {
      throw Error("Expected field '" + g + "' not found.");
    }
    return c[g];
  }
  return{
    ProjectTreeOperationRunner : Class.extend({
      init : function(c) {
        this.projectTree = c;
      },
      applyConcurrentRemoteOperationTransactionsOrRefreshProjectTree : function(c, g, d, k) {
        if (d === undefined) {
          d = false;
        }
        if (k === undefined) {
          k = false;
        }
        if (g === null && ((c === null || c.length === 0) && !k)) {
          return{
            errorEncountered : false,
            loadedRefreshedProjectTree : false
          };
        }
        var p = false;
        if (d || c === null) {
          if (g !== null) {
            c = this.loadRefreshedProjectTree(g);
            c = c.errorEncountered;
            p = true;
          } else {
            c = true;
          }
        } else {
          c = this.applyConcurrentRemoteOperationTransactions(c, k);
          c = c.errorEncountered;
        }
        return{
          errorEncountered : c,
          loadedRefreshedProjectTree : p
        };
      },
      loadRefreshedProjectTree : function(c) {
        utils.debugMessage("loadRefreshedProjectTree called");
        var g = c.refreshedRootProject;
        c = c.refreshedRootProjectChildren;
        utils.debugMessage("Installing refreshed project tree");
        this.projectTree.loadRefreshed(g, c);
        selectOnActivePage(".mainTreeRoot").overwriteProjectChildrenHtml(function() {
          return "";
        });
        this.applyPendingOperations(true);
        return{
          errorEncountered : false
        };
      },
      applyConcurrentRemoteOperationTransactions : function(c, g) {
        if (g === undefined) {
          g = false;
        }
        utils.debugMessage("applyConcurrentRemoteOperationTransactions called");
        try {
          var d = h(c, true);
        } catch (k) {
          utils.debugMessage(k);
          return{
            errorEncountered : true
          };
        }
        utils.debugMessage("num remote operations: " + d.length);
        var p = this.projectTree.getPendingOperationList();
        var v = this.projectTree.getInFlightOperationList();
        var r = false;
        try {
          if (p.length > 0) {
            utils.debugMessage("undoing pending");
            this.undoLocalOperations(p);
          }
          if (v.length > 0) {
            utils.debugMessage("undoing in-flight");
            this.undoLocalOperations(v);
          }
          if (d.length > 0) {
            utils.debugMessage("applying remote");
            this.applyOperations(d, true, false);
            r = true;
          }
        } catch (x) {
          utils.debugMessage(x);
          return{
            errorEncountered : true
          };
        }
        if (g) {
          utils.debugMessage("NOT applying in-flight because operations not applied on server for redo");
        } else {
          this.applyInFlightOperations(r, true);
        }
        this.applyPendingOperations(r, true);
        return{
          errorEncountered : false
        };
      },
      applyInFlightOperations : function(c, g, d) {
        if (g === undefined) {
          g = false;
        }
        if (d === undefined) {
          d = false;
        }
        var k = this.projectTree.getInFlightOperationList();
        if (k.length > 0) {
          utils.debugMessage("applying in-flight");
          g = this.applyOperations(k, false, g, d);
          if (c) {
            utils.debugMessage("(amending in-flight operations because they were run over a new baseline tree)");
            this.projectTree.setInFlightOperationList(g);
          }
        }
      },
      applyPendingOperations : function(c, g, d) {
        if (g === undefined) {
          g = false;
        }
        if (d === undefined) {
          d = false;
        }
        var k = this.projectTree.getPendingOperationList();
        if (k.length > 0) {
          utils.debugMessage("applying pending");
          g = this.applyOperations(k, false, g, d);
          if (c) {
            utils.debugMessage("(amending pending operations because they were run over a new baseline tree)");
            this.projectTree.setPendingOperationList(g);
          }
        }
      },
      reconstructTreeStateFromUserstorageOperations : function(c, g) {
        if (g === undefined) {
          g = false;
        }
        utils.debugMessage("reconstructTreeStateFromUserstorageOperations called");
        try {
          var d = h(c, true);
        } catch (k) {
          utils.debugMessage(k);
          return{
            errorEncountered : true
          };
        }
        utils.debugMessage("num server-run operations: " + d.length);
        if (d.length > 0) {
          utils.debugMessage("applying server-run");
          try {
            this.applyOperations(d, true, false, true);
          } catch (p) {
            utils.debugMessage(p);
            return{
              errorEncountered : true
            };
          }
        }
        this.applyInFlightOperations(g, false, true);
        this.applyPendingOperations(g, false, true);
        return{
          errorEncountered : false
        };
      },
      updateShareIdsFromServerRunOperationsIfApplicable : function(c) {
        try {
          var g = h([c]);
          c = 0;
          for (;c < g.length;c++) {
            var d = g[c];
            var k = o(d, "type");
            var p = o(d, "data");
            if (k === "share" && "share_id" in p) {
              var v = o(p, "projectid");
              var r = p.share_id;
              var x = this.projectTree.getProjectTreeObjectByProjectId(v);
              if (x !== undefined) {
                var u = project_tree_object.getSharedInfo(x);
                if (u !== null) {
                  u.setShareId(r);
                }
              }
            }
          }
        } catch (b) {
          utils.debugMessage(b);
        }
      },
      operationTransactionsContainUndeleteOfUnknownProject : function(c) {
        try {
          var g = h(c);
          var d = new utils.Set;
          var k = new utils.Set;
          c = 0;
          for (;c < g.length;c++) {
            var p = g[c];
            var v = o(p, "type");
            var r = o(p, "data");
            if (v === "undelete") {
              var x = o(r, "projectid");
              d.add(x);
            } else {
              if (v === "create") {
                x = o(r, "projectid");
                k.add(x);
              } else {
                if (v === "bulk_create") {
                  var u = o(r, "project_trees");
                  var b = this.getProjectIdsToCreate(JSON.parse(u), false);
                  k.addSet(b);
                }
              }
            }
          }
          var s = d.elements();
          c = 0;
          for (;c < s.length;c++) {
            var m = s[c];
            if (!this.projectTree.knowAboutProjectId(m) && !k.contains(m)) {
              return true;
            }
          }
        } catch (w) {
          utils.debugMessage(w);
        }
        return false;
      },
      applyOperations : function(operations, g, d, k) {
        if (g === undefined) {
          g = true;
        }
        if (d === undefined) {
          d = false;
        }
        if (k === undefined) {
          k = false;
        }
        var p = [];
        var v = 0;
        for (;v < operations.length;v++) {
          var op = operations[v];
          var x = false;
          var undo_data = null;
          try {
            var type = o(op, "type");
            var data = o(op, "data");
            var timestamp = o(op, "client_timestamp");
            var executed_by = "executed_by" in op ? op.executed_by : null;
            if ("server_data" in op && ("was_noop" in op.server_data && op.server_data.was_noop)) {
              continue;
            }
            utils.debugMessage("apply: " + type);
            switch(type) {
              case "edit":
                undo_data = this.applyEditOperation(data, timestamp, executed_by, k);
                break;
              case "create":
                undo_data = this.applyCreateOperation(data, timestamp, executed_by, k, d);
                break;
              case "complete":
                undo_data = this.applyCompleteOperation(data, timestamp, executed_by, k);
                break;
              case "uncomplete":
                undo_data = this.applyUncompleteOperation(data, timestamp, executed_by, k);
                break;
              case "delete":
                undo_data = this.applyDeleteOperation(data, timestamp, executed_by, k);
                break;
              case "undelete":
                undo_data = this.applyUndeleteOperation(data, timestamp, executed_by, k);
                break;
              case "move":
                undo_data = this.applyMoveOperation(data, timestamp, executed_by, k);
                break;
              case "share":
                undo_data = this.applyShareOperation(data, timestamp, executed_by, k);
                break;
              case "unshare":
                undo_data = this.applyUnshareOperation(data, timestamp, executed_by, k);
                break;
              case "add_shared_email":
                undo_data = this.applyAddSharedEmailOperation(data, timestamp, executed_by, k);
                break;
              case "remove_shared_email":
                undo_data = this.applyRemoveSharedEmailOperation(data, timestamp, executed_by, k);
                break;
              case "register_shared_email_user":
                undo_data = this.applyRegisterSharedEmailUserOperation(data, timestamp, executed_by, k);
                break;
              case "make_shared_subtree_placeholder":
                undo_data = this.applyMakeSharedSubtreePlaceholderOperation(data, timestamp, executed_by, k);
                break;
              case "bulk_create":
                undo_data = this.applyBulkCreateOperation(data, timestamp, executed_by, k, d);
                break;
              case "bulk_move":
                undo_data = this.applyBulkMoveOperation(data, timestamp, executed_by, k);
                break;
              default:
                throw Error("Unrecognized operation type: '" + type + "'");;
            }
          } catch (t) {
            if (g) {
              throw t;
            } else {
              x = true;
            }
          }
          if (!x) {
            op = addUndoData(op, undo_data);
            // useful
            p.push(op);
          }
        }
        return p;
      },
      applyEditOperation : function(data, lastModified, d, k) {
        /*
        updates the project_tree_object with edited project
        creates operation which contains previous data
        */
        var projectId = o(data, "projectid");
        var name = "name" in data ? data.name : null;
        var description = "description" in data ? data.description : null;
        var project = this.getProjectTreeObjectByProjectIdOrThrowException(projectId);
        if (this.projectTree.isShared() && project === null) {
          project = this.projectTree.getRootProject();
        }
        var operation = {
          previous_last_modified : project_tree_object.getLastModified(project),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(project)
        };
        if (name !== null) {
          operation.previous_name = project_tree_object.getName(project);
          project_tree_object.setName(project, name);
          project_tree_object.updateNameContentText(project);
        }
        if (description !== null) {
          operation.previous_description = project_tree_object.getNote(project);
          project_tree_object.setNote(project, description);
          project_tree_object.updateNoteContentText(project);
        }
        project_tree_object.setLastModified(project, lastModified, d);
        global_project_tree_object.getTagManager(project).nameOrNoteChanged(k);
        if (!k) {
          k = this.projectTree.getProjectReferenceByProjectId(projectId);
          var dom_project = k.getMatchingDomProject();
          if (dom_project.length === 1) {
            var focusedContent = getCurrentlyFocusedContent();
            if (name !== null) {
              projectId = dom_project.getName().children(".content");
              if (focusedContent === null || focusedContent[0] !== projectId[0]) {
                projectId.setContentText(name, false);
              }
              if (dom_project.hasClass("selected")) {
                k.setPageTitleForProject();
              }
            }
            if (description !== null) {
              name = dom_project.getNotes().children(".content");
              if (focusedContent === null || focusedContent[0] !== name[0]) {
                name.setContentText(description, true);
                if (description.length > 0) {
                  dom_project.addClass("noted");
                } else {
                  dom_project.removeClass("noted");
                }
              }
            }
          }
        }
        return operation;
      },
      applyCreateOperation : function(c, g, d, k, p) {
        if (p === undefined) {
          p = false;
        }
        var v = o(c, "projectid");
        var r = o(c, "parentid");
        c = o(c, "priority");
        var x = {};
        if (p) {
          this.applyUndeleteOperation({
            projectid : v,
            parentid : r,
            priority : c
          }, g, d, k);
          return x;
        }
        p = {};
        project_tree_object.setProjectId(p, v);
        this.createProjects(r, c, [p], g, d, k);
        return x;
      },
      applyBulkCreateOperation : function(c, g, d, k, p) {
        if (p === undefined) {
          p = false;
        }
        var v = o(c, "parentid");
        var r = o(c, "starting_priority");
        var x = o(c, "project_trees");
        var u = {};
        if (p) {
          g = l(c, {}, g, d);
          g = f(g);
          d = 0;
          for (;d < g.length;d++) {
            v = g[d];
            this.applyUndeleteOperation(v.data, v.client_timestamp, "executed_by" in v ? v.executed_by : null, k);
          }
          return u;
        }
        c = JSON.parse(x);
        this.createProjects(v, r, c, g, d, k);
        return u;
      },
      createProjects : function(c, g, d, k, p, v) {
        function r(m) {
          var w = [];
          var t = project_tree_object.getChildren(m);
          if (t !== undefined) {
            var y = 0;
            for (;y < t.length;y++) {
              var A = r(t[y]);
              w.push(A);
            }
          }
          y = project_tree_object.getProjectId(m);
          A = project_tree_object.hasName(m) ? project_tree_object.getName(m) : null;
          var F = project_tree_object.hasNote(m) ? project_tree_object.getNote(m) : null;
          m = project_tree_object.isCompleted(m) ? k : null;
          t = w.length > 0 ? w : null;
          w = project_tree_object.create(y, A, F, m, t);
          project_tree_object.setLastModified(w, k, p);
          return w;
        }
        this.getProjectIdsToCreate(d);
        c = this.getProjectTreeObjectByProjectIdOrThrowException(c);
        var x = this.projectTree.getChildrenOfProjectTreeObject(c);
        g = g >= x.length ? x.length : g;
        var u = [];
        var b = 0;
        for (;b < d.length;b++) {
          var s = r(d[b]);
          u.push(s);
        }
        d = [g, 0].concat(u);
        x.splice.apply(x, d);
        x = this.projectTree.getProjectReferenceByProjectTreeObject(c);
        d = 0;
        for (;d < u.length;d++) {
          s = u[d];
          this.projectTree.initializeProjectTreeSubtree(s, c);
          if (!v) {
            project_tree.initializeGlobalDescendantTagCounts(s);
            global_project_tree_object.getTagManager(s).itemMoved(null, x);
          }
        }
        if (!v) {
          v = $();
          d = 0;
          for (;d < u.length;d++) {
            s = u[d];
            v = this.addProjectToDOM(c, g + d, function() {
              return $(global_project_tree_object.constructProjectTreeHtml(s));
            });
          }
          v.refreshExpanded();
        }
      },
      getProjectIdsToCreate : function(c, g) {
        function d(r) {
          var x = project_tree_object.getProjectId(r);
          if (g) {
            if (k.contains(x) || p.getProjectTreeObjectByProjectId(x) !== undefined) {
              throw Error("Trying to create project with already-existing projectid " + x);
            }
          }
          k.add(x);
          r = project_tree_object.getChildren(r);
          if (r !== undefined) {
            x = 0;
            for (;x < r.length;x++) {
              d(r[x]);
            }
          }
        }
        if (g === undefined) {
          g = true;
        }
        var k = new utils.Set;
        var p = this.projectTree;
        var v = 0;
        for (;v < c.length;v++) {
          d(c[v]);
        }
        return k;
      },
      addProjectToDOM : function(c, g, d) {
        c = this.projectTree.getProjectReferenceByProjectTreeObject(c).getMatchingDomProject();
        if (c.length === 1) {
          var k = c.is(".selected");
          if (!c.is("parent") && (k || c.is(".open"))) {
            d = d();
            var p = c.getChildren();
            var v = Math.min(g, p.length - 1);
            for (;v >= 0;) {
              var r = p.eq(v);
              var x = project_tree.getProjectReferenceFromDomProject(r).getPriority();
              if (x <= g) {
                break;
              }
              v--;
            }
            if (v < 0) {
              (p.length === 0 ? c.children(".children").children(".childrenEnd") : p.eq(0)).before(d);
            } else {
              if (x === g) {
                r.before(d);
              } else {
                r.after(d);
              }
            }
            if (k) {
              refreshVisibleChildrenUnderSelectedForAddButton();
            }
          }
          c.removeClass("task");
        }
        return c;
      },
      applyCompleteOperation : function(c, g, d, k) {
        var p = o(c, "projectid");
        var v = this.getProjectTreeObjectByProjectIdOrThrowException(p);
        c = {
          previous_last_modified : project_tree_object.getLastModified(v),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(v),
          previous_completed : project_tree_object.getCompleted(v)
        };
        project_tree_object.setCompleted(v, g);
        project_tree_object.setLastModified(v, g, d);
        if (!k) {
          g = this.projectTree.getProjectReferenceByProjectId(p).getMatchingDomProject();
          if (g.length == 1) {
            g.addClass("done");
          }
        }
        return c;
      },
      applyUncompleteOperation : function(c, g, d, k) {
        var p = o(c, "projectid");
        var v = this.getProjectTreeObjectByProjectIdOrThrowException(p);
        c = {
          previous_last_modified : project_tree_object.getLastModified(v),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(v),
          previous_completed : project_tree_object.getCompleted(v)
        };
        project_tree_object.setCompleted(v, false);
        project_tree_object.setLastModified(v, g, d);
        if (!k) {
          g = this.projectTree.getProjectReferenceByProjectId(p).getMatchingDomProject();
          if (g.length == 1) {
            g.removeClass("done");
          } else {
            g = project_tree_object.getParent(v);
            d = this.projectTree.getChildrenOfProjectTreeObject(g).indexOf(v);
            this.addProjectToDOM(g, d, function() {
              return $(global_project_tree_object.constructProjectTreeHtml(v));
            }).refreshExpanded();
          }
        }
        return c;
      },
      applyDeleteOperation : function(c, g, d, k) {
        c = this.getProjectTreeObjectByProjectIdOrThrowException(o(c, "projectid"), true);
        var p = project_tree_object.getParent(c);
        var v = this.projectTree.getChildrenOfProjectTreeObject(p);
        var r = v.indexOf(c);
        var x = {
          previous_last_modified : project_tree_object.getLastModified(c),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(c),
          parentid : project_tree.getProjectIdOfProjectTreeObject(p),
          priority : r
        };
        v.splice(r, 1);
        var u = this.projectTree.getProjectIdToProjectMap();
        var b = this.projectTree.getDeletedProjectIdToProjectMap();
        var s = this.projectTree;
        this.projectTree.applyToProjectSubtree(c, function(m) {
          project_tree_object.setLastModified(m, g, d);
          var w = project_tree_object.getProjectId(m);
          u.remove(w);
          b.set(w, m);
          if (project_tree_object.getSharedInfo(m) !== null) {
            s.registerRemovedSharedProject(m);
          }
          if (project_tree_object.isAddedSubtreePlaceholder(m)) {
            s.registerRemovedSharedSubtreePlaceholder(m);
          }
        });
        if (!k) {
          k = this.projectTree.getProjectReferenceByProjectTreeObject(p);
          global_project_tree_object.getTagManager(c).itemMoved(k, null);
          this.removeProjectFromDOM(c, p);
        }
        return x;
      },
      removeProjectFromDOM : function(c, g) {
        var d = this.projectTree.getProjectReferenceByProjectId(project_tree_object.getProjectId(c)).getMatchingDomProject();
        if (d.length === 1) {
          var k = d.getParent().is(".selected");
          d.clearControlsUnderProject();
          d.remove();
          global_project_tree_object.registerSubtreeRemovedFromDom(c);
          if (k) {
            refreshVisibleChildrenUnderSelectedForAddButton();
          }
        }
        if (this.projectTree.getChildrenOfProjectTreeObject(g).length === 0) {
          d = this.projectTree.getProjectReferenceByProjectTreeObject(g).getMatchingDomProject();
          if (d.length === 1) {
            d.addClass("task").hideChildren("instant");
          }
        }
      },
      applyUndeleteOperation : function(c, g, d, k) {
        var p = o(c, "projectid");
        var v = "parentid" in c ? c.parentid : undefined;
        var r = v === null;
        if (!r) {
          var x = o(c, "priority")
        }
        if (r && !this.projectTree.isShared()) {
          throw Error("Encountered parentid of null for undelete operation on main tree.");
        }
        var u = this.projectTree.getDeletedProjectIdToProjectMap();
        if (!u.contains(p)) {
          throw Error("No deleted project with projectid " + p);
        }
        var b = u.get(p);
        if (!r) {
          if (v === undefined) {
            v = project_tree.getProjectIdOfProjectTreeObject(project_tree_object.getParent(b));
          }
          var s = this.getProjectTreeObjectByProjectIdOrThrowException(v);
        }
        c = {
          previous_last_modified : project_tree_object.getLastModified(b),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(b)
        };
        if (r) {
          this.projectTree.applyToProjectSubtree(b, function(t) {
            t = project_tree_object.getProjectId(t);
            u.remove(t);
          });
        } else {
          var m = this.projectTree.getProjectIdToProjectMap();
          var w = this.projectTree;
          this.projectTree.applyToProjectSubtree(b, function(t) {
            project_tree_object.setLastModified(t, g, d);
            var y = project_tree_object.getProjectId(t);
            u.remove(y);
            m.set(y, t);
            if (project_tree_object.getSharedInfo(t) !== null) {
              w.registerAddedSharedProject(t);
            }
            if (project_tree_object.isAddedSubtreePlaceholder(t)) {
              w.registerAddedSharedSubtreePlaceholder(t);
              y = project_tree_object.getAddedSubtree(t);
              if (y !== null) {
                if (y.getIsDefunct()) {
                  project_tree_object.setAddedSubtree(t, null);
                }
              }
            }
          });
          this.insertProjectIntoProjectTree(b, s, x);
          if (!k) {
            k = this.projectTree.getProjectReferenceByProjectTreeObject(s);
            global_project_tree_object.getTagManager(b).itemMoved(null, k);
            this.addProjectToDOM(s, x, function() {
              return $(global_project_tree_object.constructProjectTreeHtml(b));
            }).refreshExpanded();
          }
        }
        return c;
      },
      applyMoveOperation : function(c, g, d, k) {
        var p = o(c, "projectid");
        var v = o(c, "parentid");
        var r = v === null;
        c = r ? null : o(c, "priority");
        return this.moveProjects([p], v, c, r, g, d, k, false)[0];
      },
      applyBulkMoveOperation : function(c, g, d, k) {
        var p = o(c, "projectids_json");
        var v = o(c, "parentid");
        var r = v === null;
        c = r ? null : o(c, "priority");
        return{
          move_undo_datas : this.moveProjects(JSON.parse(p), v, c, r, g, d, k, true)
        };
      },
      moveProjects : function(c, g, d, k, p, v, r, x) {
        if (k && !this.projectTree.isShared()) {
          throw Error("Encountered parentid of null for move operation on main tree.");
        }
        if (!k) {
          var u = this.getProjectTreeObjectByProjectIdOrThrowException(g)
        }
        g = k ? null : this.projectTree.getProjectReferenceByProjectTreeObject(u);
        var b = [];
        var s = 0;
        for (;s < c.length;s++) {
          var m = c[s];
          var w = this.getProjectTreeObjectByProjectIdOrThrowException(m, true);
          b.push(w);
        }
        if (!k) {
          var t = {};
          s = 0;
          for (;s < b.length;s++) {
            var y = b[s];
            c = project_tree_object.getParent(y);
            if (c === u) {
              t[project_tree_object.getProjectId(y)] = true;
            }
          }
          if (utils.objectIsEmpty(t)) {
            w = d;
          } else {
            c = this.projectTree.getChildrenOfProjectTreeObject(u);
            s = w = 0;
            for (;w < d && s < c.length;s++) {
              if (!(project_tree_object.getProjectId(c[s]) in t)) {
                w++;
              }
            }
            w = s;
          }
          t = {};
          s = 0;
          for (;s < b.length;s++) {
            y = b[s];
            c = project_tree_object.getParent(y);
            if (c === u) {
              m = this.projectTree.getChildrenOfProjectTreeObject(c);
              var A = m.indexOf(y);
              if (A < w) {
                t[project_tree_object.getProjectId(y)] = true;
              }
            }
          }
        }
        w = [];
        var F = $();
        s = 0;
        for (;s < b.length;s++) {
          y = b[s];
          c = project_tree_object.getParent(y);
          m = this.projectTree.getChildrenOfProjectTreeObject(c);
          A = m.indexOf(y);
          m.splice(A, 1);
          A = {
            previous_parentid : project_tree.getProjectIdOfProjectTreeObject(c),
            previous_priority : A,
            previous_last_modified : project_tree_object.getLastModified(y),
            previous_last_modified_by : project_tree_object.getLastModifiedBy(y)
          };
          if (!k) {
            m = project_tree_object.getProjectId(y);
            if (m in t) {
              delete t[m];
            }
            var z = d + utils.objectSize(t) + s;
            if (x) {
              A.priority_used_for_move = z;
            }
          }
          w.push(A);
          if (k) {
            var D = this.projectTree.getProjectIdToProjectMap();
            this.projectTree.applyToProjectSubtree(y, function(E) {
              E = project_tree_object.getProjectId(E);
              D.remove(E);
            });
          } else {
            this.insertProjectIntoProjectTree(y, u, z);
            project_tree_object.setLastModified(y, p, v);
          }
          if (!r) {
            m = this.projectTree.getProjectReferenceByProjectTreeObject(c);
            global_project_tree_object.getTagManager(y).itemMoved(m, g);
            this.removeProjectFromDOM(y, c);
            if (!k) {
              F = this.addProjectToDOM(u, z, function() {
                return $(global_project_tree_object.constructProjectTreeHtml(y));
              });
            }
          }
        }
        if (!r) {
          if (!k) {
            F.refreshExpanded();
          }
        }
        return w;
      },
      insertProjectIntoProjectTree : function(c, g, d) {
        project_tree_object.getProjectId(c);
        var k = this.projectTree.getChildrenOfProjectTreeObject(g);
        k.splice(d >= k.length ? k.length : d, 0, c);
        project_tree_object.setParent(c, g);
      },
      applyShareOperation : function(c, g, d, k) {
        var p = o(c, "projectid");
        var v = "share_type" in c ? c.share_type : "url";
        var r = "write_permission" in c ? c.write_permission : null;
        var x = "share_id" in c ? c.share_id : null;
        if (v !== "url" && v !== "email") {
          throw Error("Encountered 'share' operation with unrecognized share_type: '" + v + "'");
        }
        var u = this.getProjectTreeObjectByProjectIdOrThrowException(p);
        var b = project_tree_object.getSharedInfo(u);
        var s = null;
        if (b !== null) {
          s = b.isSharedViaUrl() ? "url" : "email";
        }
        c = {
          previous_share_type : s,
          previous_last_modified : project_tree_object.getLastModified(u),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(u)
        };
        if (s === "url") {
          c.previous_write_permission = b.getUrlSharingWritePermission();
        }
        if (b === null) {
          b = new sharing.ItemSharedInfo;
          project_tree_object.setSharedInfo(u, b);
        }
        if (x !== null) {
          b.setShareId(x);
        }
        if (v === "url") {
          b.shareViaUrl(r);
        } else {
          if (v === "email") {
            b.shareViaEmail();
          }
        }
        project_tree_object.setLastModified(u, g, d);
        if (s === null) {
          this.projectTree.registerAddedSharedProject(u);
        }
        if (!k) {
          g = this.projectTree.getProjectReferenceByProjectId(p);
          d = g.getMatchingDomProject();
          if (d.length === 1) {
            d.addClass("shared");
          }
          sharing.updateShareDialogIfOpenToProject(g);
        }
        return c;
      },
      applyUnshareOperation : function(c, g, d, k) {
        var p = o(c, "projectid");
        var v = this.getProjectTreeObjectByProjectIdOrThrowException(p);
        c = project_tree_object.getSharedInfo(v);
        c = {
          previous_shared_info : c !== null ? c.makeCopyOfRawSharedInfoWithoutShareId() : null,
          previous_last_modified : project_tree_object.getLastModified(v),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(v)
        };
        project_tree_object.setSharedInfo(v, null);
        project_tree_object.setLastModified(v, g, d);
        this.projectTree.registerRemovedSharedProject(v);
        if (!k) {
          g = this.projectTree.getProjectReferenceByProjectId(p);
          d = g.getMatchingDomProject();
          if (d.length === 1) {
            d.removeClass("shared");
          }
          sharing.updateShareDialogIfOpenToProject(g);
        }
        return c;
      },
      applyAddSharedEmailOperation : function(c, g, d, k) {
        var p = o(c, "projectid");
        var v = o(c, "shared_email");
        var r = o(c, "write_permission");
        var x = o(c, "access_token");
        var u = this.getProjectTreeObjectByProjectIdOrThrowException(p);
        var b = project_tree_object.getSharedInfo(u);
        if (b === null || !b.isSharedViaEmail()) {
          throw Error("'add_shared_email' applied to an item that isn't shared by email.");
        }
        c = {
          previous_last_modified : project_tree_object.getLastModified(u),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(u)
        };
        var s = b.getInfoForEmail(v);
        if (s !== null) {
          c.previous_write_permission = s.write_permission;
        }
        b.addSharedEmail(v, r, x);
        project_tree_object.setLastModified(u, g, d);
        if (!k) {
          g = this.projectTree.getProjectReferenceByProjectId(p);
          sharing.updateShareDialogIfOpenToProject(g);
        }
        return c;
      },
      applyRemoveSharedEmailOperation : function(c, g, d, k) {
        var p = o(c, "projectid");
        var v = o(c, "shared_email");
        var r = this.getProjectTreeObjectByProjectIdOrThrowException(p);
        var x = project_tree_object.getSharedInfo(r);
        if (x === null || !x.isSharedViaEmail()) {
          throw Error("'remove_shared_email' applied to an item that isn't shared by email.");
        }
        var u = x.getInfoForEmail(v);
        if (u === null) {
          throw Error("'remove_shared_email' applied to item that isn't shared for the given email.");
        }
        c = {
          write_permission : u.write_permission,
          access_token : u.access_token,
          previous_last_modified : project_tree_object.getLastModified(r),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(r)
        };
        if ("user_id" in u) {
          c.user_id = u.user_id;
        }
        x.removeSharedEmail(v);
        project_tree_object.setLastModified(r, g, d);
        if (!k) {
          g = this.projectTree.getProjectReferenceByProjectId(p);
          sharing.updateShareDialogIfOpenToProject(g);
        }
        return c;
      },
      applyRegisterSharedEmailUserOperation : function(c, g, d, k) {
        var p = o(c, "projectid");
        var v = o(c, "access_token");
        var r = "user_id" in c ? c.user_id : null;
        var x = this.getProjectTreeObjectByProjectIdOrThrowException(p);
        var u = project_tree_object.getSharedInfo(x);
        if (u === null || !u.isSharedViaEmail()) {
          throw Error("'register_shared_email_user' applied to an item that isn't shared by email.");
        }
        c = {
          previous_last_modified : project_tree_object.getLastModified(x),
          previous_last_modified_by : project_tree_object.getLastModifiedBy(x)
        };
        var b = u.getSharedEmailUserId(v);
        if (b !== null) {
          c.previous_user_id = b;
        }
        u.registerSharedEmailUser(v, r);
        project_tree_object.setLastModified(x, g, d);
        if (!k) {
          g = this.projectTree.getProjectReferenceByProjectId(p);
          sharing.updateShareDialogIfOpenToProject(g);
        }
        return c;
      },
      applyMakeSharedSubtreePlaceholderOperation : function(c) {
        var g = o(c, "projectid");
        c = "added_shared_project_share_id" in c ? c.added_shared_project_share_id : o(c, "added_shared_project_projectid");
        if (this.projectTree.isShared()) {
          throw Error("Trying to run make_shared_subtree_placeholder in a shared tree.");
        }
        g = this.getProjectTreeObjectByProjectIdOrThrowException(g);
        if (this.projectTree.projectTreeObjectHasSharedAncestor(g)) {
          throw Error("Trying to run make_shared_subtree_placeholder on a project with a shared ancestor.");
        }
        if (this.projectTree.getChildrenOfProjectTreeObject(g).length > 0) {
          throw Error("Trying to run make_shared_subtree_placeholder on a project with children.");
        }
        if (this.projectTree.containsSharedProjectWithShareId(c)) {
          throw Error("Trying to add the user's own shared subtree to their account.");
        }
        if (this.projectTree.getSharedSubtreePlaceholder(c)) {
          throw Error("Trying to add a shared subtree that's already been added.");
        }
        project_tree_object.setAddedSubtreeShareId(g, c);
        c = project_tree.getSharedProjectTreeByShareId(c);
        if (c !== null) {
          project_tree_object.setAddedSubtree(g, c);
        }
        this.projectTree.registerAddedSharedSubtreePlaceholder(g);
        return null;
      },
      undoLocalOperations : function(c) {
        this.applyOperations(f(c));
      },
      getProjectTreeObjectByProjectIdOrThrowException : function(c, g) {
        if (g === undefined) {
          g = false;
        }
        var d = this.projectTree.getProjectTreeObjectByProjectId(c);
        if (d === undefined) {
          throw Error("No project tree object with projectid " + c);
        }
        if (d !== null && (project_tree_object.isAddedSubtreePlaceholder(d) && !g)) {
          throw Error("Tried to perform disallowed operation on placeholder with projectid " + c);
        }
        return d;
      }
    }),
    createOperation : createOperation,
    createOperationWithUndoData : createOperationWithUndoData,
    invertLocalOperation : invertLocalOperation,
    collapseOperationIntoPreviousOperationIfApplicable : function(c, g) {
      if (c.type === "edit" && (g.type === "edit" && c.data.projectid === g.data.projectid)) {
        var d = utils.deepCopyObject(c);
        if ("name" in g.data) {
          d.data.name = g.data.name;
          if (!("previous_name" in d.undo_data)) {
            d.undo_data.previous_name = g.undo_data.previous_name;
          }
        }
        if ("description" in g.data) {
          d.data.description = g.data.description;
          if (!("previous_description" in d.undo_data)) {
            d.undo_data.previous_description = g.undo_data.previous_description;
          }
        }
        return d;
      }
      if (c.type === "move" && (g.type === "move" && c.data.projectid === g.data.projectid)) {
        return d = addUndoData(g, c.undo_data);
      }
      if (c.type === "bulk_move" && (g.type === "bulk_move" && c.data.projectids_json === g.data.projectids_json)) {
        return d = addUndoData(g, c.undo_data);
      }
      return null;
    },
    saveClientViewState : function(c) {
      c = $.extend({
        editingContentInfo : true,
        editingContentText : true,
        tagAutocompleterState : true,
        selectedProject : true,
        scrollPosition : false
      }, c || {});
      var g = {
        itemSelectionState : item_select.saveSelectionState()
      };
      if (c.editingContentInfo) {
        var d = getCurrentlyFocusedContent();
        var k = null;
        if (d !== null) {
          k = {};
          k.formatFlags = FORMAT_FLAGS.copy();
          k.projectReference = project_tree.getProjectReferenceFromDomProject(d.getProject());
          if (d.isName()) {
            k.contentType = "name";
          } else {
            if (d.isNote()) {
              k.contentType = "note";
            }
          }
          k.caret = d.getCaret();
          if (c.editingContentText) {
            var p = d.getContentText();
            if (p !== d.getLastSavedContentText()) {
              k.changedContentText = p;
            }
          }
          if (c.tagAutocompleterState) {
            d = tagging.getTagAutocompleter();
            if (d.isAttached()) {
              k.tagAutocompleterState = d.saveState();
            }
          }
        }
        g.editingContentInfo = k;
      }
      if (c.selectedProject) {
        g.selectedProjectReference = project_tree.getProjectReferenceFromDomProject(selectOnActivePage(".selected"));
      }
      if (c.scrollPosition) {
        g.scrollPosition = $(window).scrollTop();
      }
      return g;
    },
    restoreClientViewState : function(c, g) {
      g = $.extend({
        forceDomRebuild : false,
        scrollToFocusBehavior : "doNotScrollIfOnScreen",
        doSetScrollAfterTimeoutHack : false
      }, g || {});
      if ("selectedProjectReference" in c) {
        var d = c.selectedProjectReference;
        if (!d.isValid()) {
          d = project_tree.getMainProjectTree().getRootProjectReference();
          if (search.inSearchMode()) {
            search.exitSearchMode(true);
          }
        }
        selectProjectReferenceInstantly(d, g.forceDomRebuild);
      }
      if ("editingContentInfo" in c) {
        d = c.editingContentInfo;
        if (d !== null) {
          var k = d.projectReference.getMatchingDomProject();
          if (k.length === 1 && k.is(":visible")) {
            var p = null;
            if (d.contentType === "name") {
              p = k.getName().children(".content");
            } else {
              if (d.contentType === "note") {
                p = k.getNotes().children(".content");
                k.addClass("noted");
              }
            }
            if (p !== null) {
              if ("changedContentText" in d) {
                p.setContentText(d.changedContentText, d.contentType === "note");
              }
              p.setCaret(d.caret.start, d.caret.end, g.scrollToFocusBehavior);
              if ("tagAutocompleterState" in d) {
                tagging.getTagAutocompleter().restoreState(p, d.tagAutocompleterState);
              }
              FORMAT_FLAGS = d.formatFlags;
            }
          }
        }
      }
      item_select.restoreSelectionState(c.itemSelectionState);
      if ("scrollPosition" in c) {
        var v = c.scrollPosition;
        d = function() {
          $(window).scrollTop(v);
        };
        d();
        if (g.doSetScrollAfterTimeoutHack) {
          setTimeout(d, 0);
        }
      }
      if (moving.isMoving()) {
        moving.notifyDomProjectTreeMayHaveChanged();
      }
    }
  };
}();
var push_poll = function() {
  function a() {
    return d !== null;
  }
  function updateSaveStatus() {
    var w = project_tree.getAllProjectTreesHelper().haveInFlightOperations() || project_tree.getAllProjectTreesHelper().havePendingOperations();
    w = g && k ? "saving" : w ? "saveNow" : "saved";
    $(".saveButton").removeClass("saving saveNow saved").addClass(w);
  }
  function updateLastSyncedStrings() {
    var w = project_tree.getAllProjectTreesHelper().getLastPushPollCompleteTimestamp();
    w = date_time.getCurrentTimeInMS() - w;
    w = date_time.convertMillisecondsToTimeDeltaString(w);
    $(".lastSyncedString").text(w);
  }
  function scheduleNextPushAndPoll(w, t, y, A) {
    if (w === undefined) {
      w = false;
    }
    if (t === undefined) {
      t = false;
    }
    if (y === undefined) {
      y = false;
    }
    if (A === undefined) {
      A = false;
    }
    if (!g) {
      var F = a();
      if (y) {
        y = date_time.getCurrentTimeInMS();
        var z = project_tree.getAllProjectTreesHelper().getLastPushPollCompleteTimestamp();
        if (y - z > 6E5) {
          p = true;
        }
      }
      if (x) {
        if (F) {
          return;
        }
        w = o;
        d = setTimeout(f, w);
        k = project_tree.getAllProjectTreesHelper().haveInFlightOperations();
      } else {
        z = F && k;
        if (y = project_tree.getAllProjectTreesHelper().havePendingOperations()) {
          if (z && !w) {
            return;
          }
          w = w ? 1 : A ? o : q;
        } else {
          if (z || F && !t) {
            return;
          }
          if (!WINDOW_FOCUSED) {
            return;
          }
          w = t ? 1 : project_tree.getAllProjectTreesHelper().getMinPollingInterval();
        }
        if (F) {
          clearTimeout(d);
          d = null;
        }
        d = setTimeout(f, w);
        k = y;
      }
      utils.debugMessage("Scheduled " + (x ? "REDO " : "") + "push/poll (type: " + (k ? "push" : "poll") + ") to happen in " + w + " ms.");
    }
  }
  function f() {
    utils.debugMessage("pushAndPollServer called" + (x ? " (in redo mode)" : ""));
    d = null;
    if (g || !x && r.getValue() !== null) {
      ui_sugar.showAlertDialog("BAD: pushAndPollServer called while one is already in progress");
    } else {
      g = true;
      var w;
      var push_poll_data;
      if (x) {
        w = project_tree.getAllProjectTreesHelper().haveInFlightOperations();
        push_poll_data = project_tree.getAllProjectTreesHelper().getPushPollData();
      } else {
        r.setValue(urls.generateUrlSafeRandomString(m));
        w = project_tree.getAllProjectTreesHelper().havePendingOperations();
        push_poll_data = project_tree.getAllProjectTreesHelper().beginPushAndPoll();
      }
      if (FULL_OFFLINE_ENABLED) {
        setTimeout(updateSaveStatus, 100);
      } else {
        updateSaveStatus();
      }
      var handleError = function() {
        utils.debugMessage("pushAndPollServer failed. Retrying...");
        c++;
        if (w) {
          x = true;
        }
        n();
        if (FULL_OFFLINE_ENABLED) {
          if (c > 0) {
            if (p || c >= 2) {
              u = true;
              if (!b) {
                if (!$("#offlineNotice").is(":visible")) {
                  $("#offlineNotice").slideDown();
                }
              }
            }
          }
        } else {
          if (w && c >= 2) {
            if (c === 2) {
              ui_sugar.showAlertDialog("We are unable to save your changes right now.<br /><br />Your internet connection may be down, or we may be unable to contact the server. Your changes will be saved when we can reconnect.", "Warning");
            }
            showMessage("<strong>Warning: We are unable to save your changes right now.</strong><br>Your changes will be saved when we can reconnect to the server.", true, "connectionErrorMessage");
          }
        }
      };
      var payload = {
        client_id : CLIENT_ID,
        client_version : CLIENT_VERSION,
        push_poll_id : r.getValue(),
        // push_poll_data : JSON.stringify(push_poll_data)
      };
      if (project_tree.getMainProjectTree().isShared()) {
        payload.share_id = project_tree.getMainProjectTree().getShareId();
      }
      if (SEND_TIMEZONE_TO_SERVER) {
        payload.timezone = TIMEZONE_INFO.olson_tz;
      }
      if (x) {
        payload.is_redo = "true";
      }
      if (FULL_OFFLINE_ENABLED) {
        payload.full_offline_enabled = "true";
      }
      var ajaxData = {
        url : "/push_and_poll/",
        dataType : "json",
        type : "POST",
        success : function(A) {
          function F() {
            var D = x;
            g = false;
            r.setValue(null);
            var E = SEND_TIMEZONE_TO_SERVER = x = false;
            var G = false;
            var B = false;
            D = project_tree.getAllProjectTreesHelper().completePushAndPoll(z, D);
            if (!D.invalidData) {
              E = true;
              G = D.errorEncounteredRunningClientOperationsOnServer;
              B = D.errorEncounteredRunningRemoteOperationsOnClient;
            }
            updateSaveStatus();
            updateLastSyncedStrings();
            if (E) {
              if (G) {
                showMessage("We're sorry, the server encountered an error while saving your data. Please <a href='#' class='refresh'>reload the page</a> and try again.", true);
              } else {
                if (B) {
                  showMessage("An unexpected error occurred when applying the changes made in another session for this account. Please <a href='#' class='refresh'>reload the page</a> before continuing.", true);
                }
              }
            } else {
              showMessage("We're sorry, the server returned an unexpected response. Please <a href='#' class='refresh'>reload the page</a> and try again.", true);
            }
            if ("alert_message" in z) {
              ui_sugar.showAlertMessage(z.alert_message);
            }
            if ("dropdown_message" in z) {
              showMessage(z.dropdown_message, true);
            }
            scheduleNextPushAndPoll();
          }
          if (A == null) {
            handleError();
          } else {
            utils.debugMessage("pushAndPollServer succeeded!");
            c = 0;
            p = false;
            if (FULL_OFFLINE_ENABLED) {
              u = false;
              if ($("#offlineNotice").is(":visible")) {
                $("#offlineNotice").slideUp();
              }
            } else {
              if ($("#message.connectionErrorMessage:visible").length > 0) {
                hideMessage();
              }
            }
            if ("logged_out" in A && A.logged_out) {
              alert('Please login.')
            } else {
              var z = A;
              project_tree.getAllProjectTreesHelper().markIfRefreshedProjectTreeNeededForRemoteUndeletes(z);
              if (project_tree.getAllProjectTreesHelper().needRefreshedProjectTreesOrAddedSharedSubtrees(z)) {
                l(z, F);
              } else {
                F();
              }
            }
          }
        },
        error : handleError
      };
      if (!project_tree.getAllProjectTreesHelper().haveInFlightOperations()) {
        ajaxData.timeout = 3E4;
      }

      payload.push_poll_data = JSON.stringify(push_poll_data);
      ajaxData.data = payload;
      $.ajax(ajaxData);
    }
  }
  function n() {
    g = false;
    if (!x) {
      r.setValue(null);
      project_tree.getAllProjectTreesHelper().resetPushAndPoll();
    }
    updateSaveStatus();
    scheduleNextPushAndPoll(false, false, false, true);
  }
  function l(w, t) {
    utils.debugMessage("getRefreshedProjectTreesAndAddedSharedSubtrees called");
    var y = function(A) {
      utils.debugMessage("New project tree data loaded. Attaching refreshed project trees and adding shared subtrees.");
      A = A.projectTreeData;
      if (!(FULL_OFFLINE_ENABLED && (!IS_PACKAGED_APP && A.clientId === CLIENT_ID))) {
        project_tree.getAllProjectTreesHelper().extractRefreshedProjectTreesAndNewlyAddedSharedSubtreesFromNewProjectTreeData(A, w);
      }
      t();
    };
    if (FULL_OFFLINE_ENABLED && !IS_PACKAGED_APP) {
      appcache_helper.markCacheManifestDirtyAndThenUpdate(function(A) {
        if (A) {
          utils.debugMessage("App cache updated. Swapping to new cache and loading new project tree data.");
          appcache_helper.swapCache();
          fetchInitializationData(y);
        } else {
          utils.debugMessage("Failed to update app cache.");
          t();
        }
      });
    } else {
      fetchInitializationData(function(A) {
        y(A);
      }, true);
    }
  }
  var q = 5E3;
  var o = 5E3;
  var c = 0;
  var g = false;
  var d = null;
  var k = false;
  var p = false;
  var v = null;
  var r = null;
  var x = false;
  var u = false;
  var b = false;
  var s = null;
  var m = 8;
  return{
    init : function() {
      updateSaveStatus();
      updateLastSyncedStrings();
      r = new userstorage.PersistentValue("pushpoll", "currentId", null);
      var w = project_tree.getAllProjectTreesHelper().pushPollIsInProgress();
      if (w && r.getValue() === null) {
        throw new userstorage.InitializationError;
      }
      if (r.getValue() !== null) {
        var t = false;
        if (w) {
          if (project_tree.getAllProjectTreesHelper().haveInFlightOperations()) {
            utils.debugMessage("push_poll init: Redoing push recovered from userstorage");
            t = k = x = true;
          } else {
            utils.debugMessage("push_poll init: Resetting poll recovered from userstorage");
            project_tree.getAllProjectTreesHelper().resetPushAndPoll();
          }
        }
        if (!t) {
          r.setValue(null);
        }
      }
      w = FULL_OFFLINE_ENABLED || x ? 1 : project_tree.getAllProjectTreesHelper().getMinPollingInterval();
      d = setTimeout(f, w);
      if (FULL_OFFLINE_ENABLED) {
        p = true;
      }
      setInterval(function() {
        updateLastSyncedStrings();
      }, 6E4);
    },
    updateSaveStatus : updateSaveStatus,
    updateLastSyncedStrings : updateLastSyncedStrings,
    hideOfflineNotice : function() {
      b = true;
      if (s !== null) {
        clearTimeout(s);
        s = null;
      }
      $("#offlineNotice").hide();
    },
    unhideOfflineNotice : function() {
      b = false;
      if (s === null) {
        if (u) {
          s = setTimeout(function() {
            s = null;
            $("#offlineNotice").show();
          }, 1);
        }
      }
    },
    scheduleNextPushAndPoll : scheduleNextPushAndPoll,
    pushPollAlreadyScheduled : a,
    scheduleImmediatePollOnNextTick : function() {
      if (v === null) {
        v = setTimeout(function() {
          v = null;
          scheduleNextPushAndPoll(false, true);
        }, 1);
      }
    }
  };
}();
var location_history = function() {
  function a() {
    A = setTimeout(function() {
      if (!(animations.animationsAreInProgress() || search.inSearchMode() && s.getSearchQuery() === null)) {
        var B = {
          editingContentText : false,
          tagAutocompleterState : false,
          selectedProject : false,
          scrollPosition : true
        };
        if (IS_MOBILE) {
          B.editingContentInfo = false;
        }
        B = operations.saveClientViewState(B);
        h().storeClientViewStateForLocation(s, B);
      }
      A = null;
      if (WINDOW_FOCUSED) {
        a();
      }
    }, 500);
  }
  function e() {
    var B = $("#backwardNavigationButton");
    if (p()) {
      B.addClass("enabled");
    } else {
      B.removeClass("enabled");
    }
    B = $("#forwardNavigationButton");
    if (v()) {
      B.addClass("enabled");
    } else {
      B.removeClass("enabled");
    }
  }
  function j(B, J) {
    if (J === undefined) {
      J = null;
    }
    return new z(B.getProjectId(), J, B.getProjectTree().getRootProjectId());
  }
  function h() {
    if (y === null) {
      y = new D;
    }
    return y;
  }
  function f() {
    if (F === null) {
      F = new E;
    }
    return F;
  }
  function n() {
      return q();
  }
  function l() {

  }
  function q() {
    var B = $.address.pathNames();
    var J = $.address.parameter("q");
    return o(B, J);
  }
  function o(B, J) {
    if (J === undefined) {
      J = null;
    }
    var N;
    if (B.length === 0) {
      N = project_tree.ROOT_PROJECTID;
    } else {
      N = B[0];
      if (project_ids.isTruncatedProjectId(N)) {
        N = project_tree.getAllProjectTreesHelper().getMatchingKnownProjectIdForTruncatedProjectId(N);
        if (N === null) {
          N = project_ids.INVALID_PROJECT_ID;
        }
      } else {
        N = N;
      }
    }
    return new z(N, J !== null ? J.replace(/\+/g, " ") : null);
  }
  function c(B) {
    s = B;
    if (!m) {
      f().markVisited(s);
    }
  }
  function g(B) {
    if (!s.equals(B)) {
      var J = s;
      c(B);
      d(J);
      l();
    }
  }
  function d(B) {

  }
  function k(B) {
    return "/" + (B !== project_tree.ROOT_PROJECTID ? project_ids.truncateProjectId(B) : "");
  }
  function p() {
    return!w.isEmpty();
  }
  function v() {
    return!t.isEmpty();
  }
  function r() {
    if (p()) {
      var B = w.pop();
      t.push(s);
      c(B);
      selectAndSearchUsingLocation(B);
      l();
      e();
    }
  }
  function x() {
    if (v()) {
      var B = t.pop();
      w.push(s);
      c(B);
      selectAndSearchUsingLocation(B);
      l();
      e();
    }
  }
  var u = "savedLocation";
  var b = "urlhash";
  var s = null;
  var m = false;
  var w = null;
  var t = null;
  var y = null;
  var A = null;
  var F = null;
  var z = Class.extend({
    init : function(B, J, N) {
      if (J === undefined) {
        J = null;
      }
      this._zoomedProjectId = B;
      this._searchQuery = J;
      if (N === undefined) {
        B = project_tree.getAllProjectTreesHelper().findProjectByProjectId(B);
        this._projectTreeRootProjectId = B !== null ? B.getProjectTree().getRootProjectId() : null;
      } else {
        this._projectTreeRootProjectId = N;
      }
      this._uniqueId = this._generateUniqueId();
    },
    getZoomedProjectId : function() {
      return this._zoomedProjectId;
    },
    getSearchQuery : function() {
      return this._searchQuery;
    },
    getSearchString : function() {
      return this._searchQuery !== null ? this._searchQuery : "";
    },
    getProjectTreeRootProjectId : function() {
      return this._projectTreeRootProjectId;
    },
    getUniqueId : function() {
      return this._uniqueId;
    },
    toProjectReference : function() {
      var B = project_tree.getProjectTreeByRootProjectId(this._projectTreeRootProjectId);
      if (B === null) {
        return null;
      }
      B = B.getProjectReferenceByProjectId(this._zoomedProjectId);
      return B.isValid() ? B : null;
    },
    withNewZoomedProject : function(B) {
      return j(B, this._searchQuery);
    },
    withNewSearchQuery : function(B) {
      return new z(this._zoomedProjectId, B, this._projectTreeRootProjectId);
    },
    equals : function(B) {
      return this._projectTreeRootProjectId === B._projectTreeRootProjectId && (this._zoomedProjectId === B._zoomedProjectId && this._searchQuery === B._searchQuery);
    },
    getJson : function() {
      return JSON.stringify({
        zoomedProjectId : this._zoomedProjectId,
        searchQuery : this._searchQuery,
        projectTreeRootProjectId : this._projectTreeRootProjectId
      });
    },
    getCanonicalLocation : function() {
      var B = this.toProjectReference();
      if (B === null) {
        return this;
      }
      if (!B.isAddedSubtreePlaceholder()) {
        return this;
      }
      B = B.getNonPlaceholderReferenceIfApplicable();
      if (B === null) {
        return this;
      }
      return new z(B.getProjectId(), this._searchQuery, B.getProjectTree().getRootProjectId());
    },
    getValidPlaceholderLocationIfApplicable : function() {
      var B = this.toProjectReference();
      if (B === null) {
        return null;
      }
      if (!B.isAuxiliaryTreeRoot()) {
        return this;
      }
      B = B.getPlaceholderReferenceIfApplicable();
      return new z(B.getProjectId(), this._searchQuery, B.getProjectTree().getRootProjectId());
    },
    _generateUniqueId : function() {
      var B = [["zoomedProjectId", this._zoomedProjectId], ["projectTreeRootProjectId", this._projectTreeRootProjectId], ["searchString", this.getSearchString()]];
      var J = "";
      var N = 0;
      for (;N < B.length;N++) {
        var T = B[N][0];
        var V = B[N][1];
        if (N !== 0) {
          J += ",";
        }
        J += T + ":" + V;
      }
      return hex_md5(J);
    }
  });
  var D = Class.extend({
    init : function() {
      this._table = new utils.LookupTable(100, 100);
    },
    storeClientViewStateForLocation : function(B, J) {
      this._table.add(B.getCanonicalLocation().getUniqueId(), J);
    },
    retrieveClientViewStateForLocation : function(B) {
      return this._table.get(B.getCanonicalLocation().getUniqueId());
    }
  });
  var E = Class.extend({
    init : function() {
      this._mostRecentLeftBarLocationsTimestampMap = new G("mostRecentlySeenLeftBarLocations", 50);
      this._mostRecentNonLeftBarLocationsTimestampMap = new G("mostRecentlySeenNonLeftBarLocations", 10);
    },
    markVisited : function(B) {
      var J = B.getCanonicalLocation().getUniqueId();
        this._mostRecentNonLeftBarLocationsTimestampMap.storeCurrentTimestamp(J);
    },
    getLastViewTimestamp : function(B) {
      var J = B.getCanonicalLocation().getUniqueId();
      B = this._mostRecentLeftBarLocationsTimestampMap.retrieveTimestamp(J);
      J = this._mostRecentNonLeftBarLocationsTimestampMap.retrieveTimestamp(J);
      if (B === null && J === null) {
        return null;
      }
      return Math.max(B !== null ? B : 0, J !== null ? J : 0);
    }
  });
  var G = Class.extend({
    init : function(B, J) {
      var N = new utils.LookupTable(J);
      this._lookupTable = N;
      this._userstorageKey = B;
      this._maximumSize = J;
      if (userstorage.isEnabled()) {
        try {
          var T = this._readFromStorage() || [];
          T.sort(function(X, ea) {
            return X.timestamp < ea.timestamp ? -1 : X.timestamp > ea.timestamp ? 1 : 0;
          });
          T.forEach(function(X) {
            N.add(X.id, X.timestamp);
          });
        } catch (V) {
          throw new userstorage.InitializationError;
        }
      }
    },
    storeCurrentTimestamp : function(B) {
      var J = date_time.getCurrentTimeInMS();
      this._lookupTable.add(B, J);
      if (userstorage.isEnabled()) {
        var N = this._readFromStorage() || [];
        var T = -1;
        var V = 0;
        for (;V < N.length;V++) {
          if (N[V].id === B) {
            T = V;
            break;
          }
        }
        if (T !== -1) {
          N.splice(T, 1);
        }
        N.push({
          id : B,
          timestamp : J
        });
        if (N.length > this._maximumSize) {
          N = N.slice(N.length - this._maximumSize);
        }
        this._writeToStorage(N);
      }
    },
    retrieveTimestamp : function(B) {
      return this._lookupTable.get(B);
    },
    _readFromStorage : function() {
      return userstorage.readJSON(this._userstorageKey);
    },
    _writeToStorage : function(B) {
      userstorage.writeJSON(this._userstorageKey, B);
    }
  });
  return{
    init : function() {
      w = new utils.Stack(100, 100);
      t = new utils.Stack;
      if (!IS_PACKAGED_APP) {
        $.address.tracker(null);
      }
      c(n());
      a();
    },
    notifyWindowFocus : function() {
      if (A === null) {
        a();
      }
    },
    Location : z,
    newLocationFromZoomedProjectReference : j,
    getCurrentLocation : function() {
      return s;
    },
    getLocationFromFragment : function(B) {
      B = urls.parseUrlFragment(B);
      return o(B.pathNames, B.parameters.q);
    },
    notifyZoomChange : function(B) {
      if (!IS_PACKAGED_APP && !m) {
        var J = B.getProjectId();
        $.address.path(k(J));
      }
      g(s.withNewZoomedProject(B));
    },
    notifySearchChange : function(B) {
      if (B !== null && B.length === 0) {
        B = null;
      }
      if (!IS_PACKAGED_APP) {
        if (!m) {
          $.address.parameter("q", B);
        }
      }
      g(s.withNewSearchQuery(B));
    },
    notifyLocationChange : function(B) {
      g(B);
    },
    notifyExternalFragmentChange : function() {
      var B = q();
      g(B);
    },
    setLocationModificationInProgress : function(B) {
      if (!m && B) {
        d(s);
      } else {
        if (m && !B) {
          f().markVisited(s);
          if (!IS_PACKAGED_APP) {
            var J = s.getZoomedProjectId();
            J = k(J);
            var N = $.address.path();
            if (J = J !== N) {
              $.address.autoUpdate(false);
            }
            N = s.getSearchQuery();
            $.address.parameter("q", N);
            if (J) {
              $.address.autoUpdate(true);
            }
            J = s.getZoomedProjectId();
            $.address.path(k(J));
          }
        }
      }
      m = B;
    },
    canNavigateBackward : p,
    canNavigateForward : v,
    navigateBackward : r,
    navigateForward : x,
    restoreLastSavedClientViewStateForCurrentLocation : function(B) {
      if (B === undefined) {
        B = false;
      }
      var J = h().retrieveClientViewStateForLocation(s);
      if (J !== null) {
        if (!B) {
          blurFocusedContentOrInput();
        }
        operations.restoreClientViewState(J, {
          doSetScrollAfterTimeoutHack : !IS_PACKAGED_APP
        });
        return true;
      }
      return false;
    },
    getLastSavedScrollPositionForLocation : function(B) {
      B = h().retrieveClientViewStateForLocation(B);
      return B !== null ? B.scrollPosition : null;
    },
    getLastViewTimestampForLocation : function(B) {
      return f().getLastViewTimestamp(B);
    }
  };
}();
var undo_redo = function() {
  function a() {
    saveEditingContent();
    var g;
    if (l.isEmpty()) {
      g = null;
    } else {
      g = l.pop();
      var d = j(g);
      q.push(d);
      g = g;
    }
    if (g === null) {
      return false;
    }
    h(g);
    if (g === c) {
      if (undeleteMessageIsVisible()) {
        hideMessage();
      }
      c = null;
    }
    n();
    return true;
  }
  function e() {
    saveEditingContent();
    var g;
    if (q.isEmpty()) {
      g = null;
    } else {
      g = q.pop();
      var d = j(g);
      l.push(d);
      g = g;
    }
    if (g === null) {
      return false;
    }
    h(g);
    n();
    return true;
  }
  function j(g) {
    var d = [];
    var k = g.operationInfos.length - 1;
    for (;k >= 0;k--) {
      var p = g.operationInfos[k];
      var v = operations.invertLocalOperation(p.operation);
      var r = 0;
      for (;r < v.length;r++) {
        d.push({
          operation : v[r],
          projectTreeReference : p.projectTreeReference
        });
      }
    }
    return{
      operationInfos : d,
      preBatchClientViewState : g.postBatchClientViewState,
      postBatchClientViewState : g.preBatchClientViewState
    };
  }
  function h(g) {
    var d = g.operationInfos;
    g = g.postBatchClientViewState;
    blurFocusedContentOrInput();
    var k = false;
    var p = 0;
    for (;p < d.length;p++) {
      var v = d[p];
      var r = v.operation;
      v = v.projectTreeReference.getProjectTree();
      if (v === null) {
        k = true;
      } else {
        r = v.applyLocalOperationAndAddToPendingQueue(r.type, r.data, r.undo_data);
        k &= r;
      }
    }
    if (!k) {
      operations.restoreClientViewState(g);
    }
  }
  function f() {
    return operations.saveClientViewState({
      editingContentText : false,
      tagAutocompleterState : false
    });
  }
  function n() {
    if (l.isEmpty()) {
      $(".undo-button").removeClass("enabled");
    } else {
      $(".undo-button").addClass("enabled");
    }
    if (q.isEmpty()) {
      $(".redo-button").removeClass("enabled");
    } else {
      $(".redo-button").addClass("enabled");
    }
  }
  var l = null;
  var q = null;
  var o = null;
  var c = null;
  return{
    init : function() {
      l = new utils.Stack(100, 100);
      q = new utils.Stack;
      $(".undo-button.enabled").live("click", function() {
        a();
      });
      $(".redo-button.enabled").live("click", function() {
        e();
      });
    },
    startOperationBatch : function(g, d) {
      if (g === undefined) {
        g = false;
      }
      if (d === undefined) {
        d = null;
      }
      if (o !== null) {
        utils.debugAlert("Trying to start operation batch while one is already in progress.");
      } else {
        if (!g) {
          saveEditingContent();
        }
        if (d === null) {
          d = f();
        }
        o = {
          operationInfos : [],
          preBatchClientViewState : d,
          postBatchClientViewState : null
        };
        q.clear();
      }
    },
    addOperationToCurrentBatch : function(g, d) {
      if (o === null) {
        ui_sugar.showAlertDialog("Trying to add to operation batch while none are in progress.");
      }
      o.operationInfos.push({
        operation : g,
        projectTreeReference : d
      });
    },
    finishOperationBatch : function(g, d) {
      if (g === undefined) {
        g = false;
      }
      if (d === undefined) {
        d = false;
      }
      if (o === null) {
        utils.debugAlert("Trying to finish operation batch while none are in progress.");
      } else {
        var k = o;
        o = null;
        if (k.operationInfos.length !== 0) {
          k.postBatchClientViewState = f();
          var p = j(k);
          l.push(p);
          if (g) {
            c = p;
          }
          n();
          if (!d) {
            item_select.restoreSelectionState(k.preBatchClientViewState.itemSelectionState);
          }
        }
      }
    },
    undo : a,
    redo : e,
    clearStacks : function() {
      l.clear();
      q.clear();
    },
    undoLastDeleteTriggeringDropdown : function() {
      if (c !== null) {
        h(c);
        var g = j(c);
        l.push(g);
        if (undeleteMessageIsVisible()) {
          hideMessage();
        }
        c = null;
        n();
      }
    },
    saveClientViewStateForUndoRedo : f
  };
}();
var search = function() {
  function a() {
    return m !== null;
  }
  function e() {
    var C = $("#searchForm");
    if (!C.hasClass("clearPrompt")) {
      C.addClass("clearPrompt");
      j();
    }
  }
  function j() {
    if (!(!IS_MOBILE || IS_TABLET)) {
      if ($("#searchForm").hasClass("clearPrompt")) {
        var C = $("#searchBox");
        C.removeAttr("style");
        var O = C.offset().left + C.width();
        C.width(O - 10);
      }
    }
  }
  function h() {
    var C = $("#searchForm");
    if (C.hasClass("clearPrompt")) {
      C.removeClass("clearPrompt");
      if (IS_MOBILE) {
        if (!IS_TABLET) {
          $("#searchBox").removeAttr("style");
        }
      }
    }
  }
  function f(C) {
    return C.getUniqueIdentifier() in t;
  }
  function n(C) {
    return C.getUniqueIdentifier() in w;
  }
  function l(C) {
    var O = parseInt(C);
    if (isNaN(O) || O < 0) {
      O = 0;
    }
    if (C.length > 0) {
      C = C.charAt(C.length - 1);
      if (C === "h") {
        O *= 60;
      } else {
        if (C === "d") {
          O *= 1440;
        }
      }
    }
    O = O * 60 * 1E3;
    return date_time.getCurrentTimeInMS() - O;
  }
  function q(C, O, R, S) {
    if (O === undefined) {
      O = false;
    }
    if (R === undefined) {
      R = null;
    }
    if (S === undefined) {
      S = false;
    }
    C = new F(C);
    var W = false;
    if (C.isEmpty()) {
      if (a()) {
        c(O);
        W = true;
      }
    } else {
      o(C, O, R);
      if (C.shouldRevealMatchingCompletedItems()) {
        if (!shouldShowCompletedProjects()) {
          setShowCompleted(true);
        }
      } else {
        if (S) {
          if (shouldShowCompletedProjects() !== y) {
            setShowCompleted(y);
          }
        }
      }
      W = true;
    }
    if (W) {
      if (!O) {
        reconstructDomProjectTree();
      }
    }
    return W;
  }
  function o(C, O, R) {
    if (O === undefined) {
      O = false;
    }
    if (R === undefined) {
      R = null;
    }
    var S = a();
    k();
    R = R;
    if (R === undefined) {
      R = null;
    }
    var W = C.isOnlyNots();
    R = R === null ? project_tree.getProjectReferenceFromDomProject(selectOnActivePage(".selected")) : R;
    d(R.getProjectTreeObject(), C, W, true);
    m = C;
    getActivePage().addClass("searching");
    if (!S) {
      y = shouldShowCompletedProjects();
    }
    if (!IS_MOBILE) {
      $("#searchCancel").show();
    }
    S = getCurrentlyFocusedContentOrInput();
    if (O || (S === null || !S.is("#searchBox"))) {
      r(C.getSearchString());
    }
    if (!O) {
      saved_views.notifyViewChanged();
    }
  }
  function c(C) {
    if (C === undefined) {
      C = false;
    }
    if (shouldShowCompletedProjects() !== y) {
      setShowCompleted(y);
    }
    y = null;
    k();
    getActivePage().removeClass("searching");
    if (!IS_MOBILE) {
      $("#searchCancel").hide();
    }
    var O = getCurrentlyFocusedContentOrInput();
    if (C || (O === null || !O.is("#searchBox"))) {
      r("");
    }
    if (!C) {
      saved_views.notifyViewChanged();
    }
  }
  function g() {
    project_tree.getAllProjectTreesHelper().applyToAllProjectTrees(function(C) {
      C.applyToProjectSubtree(null, project_tree_object.clearSearchResult);
      C.getDeletedProjectIdToProjectMap().applyToAll(project_tree_object.clearSearchResult);
    });
  }
  function d(C, O, R, S, W) {
    if (S === undefined) {
      S = false;
    }
    if (W === undefined) {
      W = false;
    }
    var Z = !S && C !== null ? global_project_tree_object.isCompleted(C) : false;
    Z |= W;
    var ca = W = false;
    var H = false;
    var K = false;
    if (!R || (S || global_project_tree_object.isExpanded(C))) {
      var P = global_project_tree_object.getChildren(C);
      var Q = 0;
      for (;Q < P.length;Q++) {
        S = d(P[Q], O, R, false, Z);
        W |= S.uncompletedDescendantMatches;
        ca |= S.completedDescendantMatches;
        var Y = !S.uncompletedDescendantMatches && !S.completedDescendantMatches;
        H |= !S.isCompleted && !S.uncompletedDescendantMatches;
        K |= Y;
      }
    }
    S = W || ca;
    H &= S;
    K &= S;
    R = false;
    if (C !== null) {
      S = O.matches(C);
      R = S.matches;
      O = S.nameMatches;
      P = S.noteMatches;
      S = S.metaMatches;
      if (R || (W || ca)) {
        H = new ka(R, W, ca, O, P, S, H, K);
        global_project_tree_object.setSearchResult(C, H);
      }
    }
    return{
      uncompletedDescendantMatches : !Z && R || W,
      completedDescendantMatches : Z && R || ca,
      isCompleted : Z
    };
  }
  function k() {
    m = null;
    w = {};
    t = {};
    g();
  }
  function p() {
    if ("search" in TIMEOUTS) {
      clearTimeout(TIMEOUTS.search);
      delete TIMEOUTS.search;
    }
    if (q($("#searchBox").val())) {
      $(window).scrollTop(0);
    }
    clearTimeout(TIMEOUTS.setSearchInFragment);
    TIMEOUTS.setSearchInFragment = setTimeout(function() {
      location_history.notifySearchChange($("#searchBox").val());
    }, 1E3);
  }
  function v() {
    clearTimeout(TIMEOUTS.search);
    TIMEOUTS.search = setTimeout(function() {
      var C = $("#searchBox").val();
      clearTimeout(TIMEOUTS.search);
      if (!(a() && C === m.getSearchString())) {
        C = C.length;
        TIMEOUTS.search = setTimeout(function() {
          p();
        }, C == 0 || C > 2 ? 1 : 500);
      }
    }, 1);
  }
  function r(C) {
    $("#searchBox").val(C);
    var O = $.trim(C);
    if (O.length > 0) {
      e();
    } else {
      h();
    }
    location_history.notifySearchChange(O.length > 0 ? C : null);
  }
  function x(C) {
    r(C);
    p();
  }
  function u() {
    if (a()) {
      if (IS_MOBILE) {
        $("#searchBox").val("").blur();
      } else {
        $("#searchBox").val("");
        p();
      }
    }
  }
  function b() {
    var C = null;
    if (getCurrentlyFocusedContent() !== null) {
      saveEditingContent();
      C = operations.saveClientViewState();
    }
    var O = A;
    blurFocusedContentOrInput();
    u();
    if (C !== null) {
      operations.restoreClientViewState(C);
    }
    if (getCurrentlyFocusedContent() === null) {
      if (!IS_MOBILE) {
        focusFirstProject();
      }
      if (O !== null) {
        operations.restoreClientViewState(O);
      } else {
        location_history.restoreLastSavedClientViewStateForCurrentLocation(true);
      }
    }
  }
  function s(C) {
    return $("#searchBox").val().match(RegExp("(^|\\s)" + C + "(?=$|\\s)", "ig")) !== null;
  }
  var m = null;
  var w = {};
  var t = {};
  var y = null;
  var A = null;
  var F = Class.extend({
    init : function(C) {
      function O(Y) {
        Y = Y.split(/\s+/);
        var aa = 0;
        for (;aa < Y.length;aa++) {
          var fa = Y[aa];
          if (fa.length > 0) {
            R.push(fa);
          }
        }
      }
      var R = [];
      var S = RegExp('(^|\\s)(-?"[^"]*")($|\\s)', "g");
      var W = 0;
      for (;;) {
        var Z = S.exec(C);
        if (Z == null) {
          break;
        }
        var ca = Z[0];
        var H = Z[2];
        Z = Z.index;
        O(C.substring(W, Z));
        R.push(H);
        W = Z + ca.length;
      }
      O(C.substring(W));
      W = C.length > 0 && C.charAt(C.length - 1).match(/\s/) !== null;
      ca = [];
      S = [ca];
      H = 0;
      for (;H < R.length;H++) {
        var K = R[H];
        if (K === "OR") {
          ca = [];
          S.push(ca);
        } else {
          Z = false;
          if (K.charAt(0) === "-") {
            Z = true;
            K = K.substring(1);
            if (K.length === 0) {
              continue;
            }
          }
          var P = K.length >= 2 && (K.charAt(0) === '"' && K.charAt(K.length - 1) === '"');
          if (!(P && K.length === 2)) {
            K = K.toLowerCase();
            var Q = function(Y) {
              return utils.splitOnFirstOccurrence(Y, ":")[1];
            };
            if (P) {
              K = K.substring(1, K.length - 1);
              K = new N(K);
            } else {
              K = utils.isPrefixMatch(K, "last-changed:") ? new I(Q(K)) : utils.isPrefixMatch(K, "completed:") ? new L(Q(K)) : utils.isPrefixMatch(K, "last-changed-since:") ? new V(Q(K)) : utils.isPrefixMatch(K, "last-changed-before:") ? new X(Q(K)) : utils.isPrefixMatch(K, "completed-since:") ? new ea(Q(K)) :
              utils.isPrefixMatch(K, "last-changed-by:") ? new M(Q(K)) : K === "is:shared" ? new ba : K === "is:complete" ? new U : K === "is:embedded" ? new ga : K === "has:note" ? new ja : utils.isOnlyCJK(K) ? new N(K) : new J(K, H === R.length - 1 && !W);
            }
            if (Z) {
              K = new D(K);
            }
            ca.push(K);
          }
        }
      }
      W = [];
      ca = 0;
      for (;ca < S.length;ca++) {
        H = S[ca];
        if (H.length !== 0) {
          H = H.length > 1 ? new E(H) : H[0];
          W.push(H);
        }
      }
      S = W.length === 0 ? new E([]) : W.length > 1 ? new G(W) : W[0];
      this._searchString = C;
      this._rootNode = S;
      this._canMetaMatch = this._rootNode.canMetaMatch();
      this._shouldRevealMatchingCompletedItems = this._rootNode.shouldRevealMatchingCompletedItems();
    },
    getSearchString : function() {
      return this._searchString;
    },
    matches : function(C) {
      return this._rootNode.matches(C);
    },
    getMatchingChars : function(C, O) {
      var R = Array(C.length);
      this._rootNode.markMatchingChars(C, R, O);
      return R;
    },
    isEmpty : function() {
      return this._rootNode.isEmpty();
    },
    isOnlyNots : function() {
      return this._rootNode.isOnlyNots();
    },
    canMetaMatch : function() {
      return this._canMetaMatch;
    },
    shouldRevealMatchingCompletedItems : function() {
      return this._shouldRevealMatchingCompletedItems;
    }
  });
  var z = Class.extend({
    init : function() {
    },
    matches : function() {
      return{
        matches : false,
        metaMatches : false,
        nameMatches : false,
        noteMatches : false
      };
    },
    markMatchingChars : function() {
    },
    isEmpty : function() {
      return false;
    },
    isOnlyNots : function() {
      return false;
    },
    canMetaMatch : function() {
      return false;
    },
    shouldRevealMatchingCompletedItems : function() {
      return false;
    }
  });
  var D = z.extend({
    init : function(C) {
      this._super();
      this.child = C;
    },
    matches : function(C) {
      C = this.child.matches(C);
      if (C.matches) {
        C.matches = C.nameMatches = C.noteMatches = C.metaMatches = false;
      } else {
        C.matches = true;
        C.metaMatches = this.child.canMetaMatch();
      }
      return C;
    },
    isOnlyNots : function() {
      return true;
    },
    canMetaMatch : function() {
      return this.child.canMetaMatch();
    },
    shouldRevealMatchingCompletedItems : function() {
      return this.child.shouldRevealMatchingCompletedItems();
    }
  });
  var E = z.extend({
    init : function(C) {
      this._super();
      this.children = C;
    },
    matches : function(C) {
      var O = false;
      var R = false;
      var S = false;
      var W = 0;
      for (;W < this.children.length;W++) {
        var Z = this.children[W].matches(C);
        if (!Z.matches) {
          return{
            matches : false,
            nameMatches : false,
            noteMatches : false,
            metaMatches : false
          };
        }
        O |= Z.nameMatches;
        R |= Z.noteMatches;
        S |= Z.metaMatches;
      }
      return{
        matches : true,
        nameMatches : O,
        noteMatches : R,
        metaMatches : S
      };
    },
    markMatchingChars : function(C, O, R) {
      var S = 0;
      for (;S < this.children.length;S++) {
        this.children[S].markMatchingChars(C, O, R);
      }
    },
    isEmpty : function() {
      var C = 0;
      for (;C < this.children.length;C++) {
        if (!this.children[C].isEmpty()) {
          return false;
        }
      }
      return true;
    },
    isOnlyNots : function() {
      if (this.children.length === 0) {
        return false;
      }
      var C = 0;
      for (;C < this.children.length;C++) {
        if (!this.children[C].isOnlyNots()) {
          return false;
        }
      }
      return true;
    },
    canMetaMatch : function() {
      var C = 0;
      for (;C < this.children.length;C++) {
        if (this.children[C].canMetaMatch()) {
          return true;
        }
      }
      return false;
    },
    shouldRevealMatchingCompletedItems : function() {
      var C = 0;
      for (;C < this.children.length;C++) {
        if (this.children[C].shouldRevealMatchingCompletedItems()) {
          return true;
        }
      }
      return false;
    }
  });
  var G = z.extend({
    init : function(C) {
      this._super();
      this.children = C;
    },
    matches : function(C) {
      var O = false;
      var R = false;
      var S = false;
      var W = false;
      var Z = 0;
      for (;Z < this.children.length;Z++) {
        var ca = this.children[Z].matches(C);
        O |= ca.matches;
        R |= ca.nameMatches;
        S |= ca.noteMatches;
        W |= ca.metaMatches;
      }
      return{
        matches : O,
        nameMatches : R,
        noteMatches : S,
        metaMatches : W
      };
    },
    markMatchingChars : function(C, O, R) {
      var S = 0;
      for (;S < this.children.length;S++) {
        this.children[S].markMatchingChars(C, O, R);
      }
    },
    isEmpty : function() {
      var C = 0;
      for (;C < this.children.length;C++) {
        if (!this.children[C].isEmpty()) {
          return false;
        }
      }
      return true;
    },
    isOnlyNots : function() {
      if (this.children.length === 0) {
        return false;
      }
      var C = 0;
      for (;C < this.children.length;C++) {
        if (this.children[C].isOnlyNots()) {
          return true;
        }
      }
      return false;
    },
    canMetaMatch : function() {
      var C = 0;
      for (;C < this.children.length;C++) {
        if (this.children[C].canMetaMatch()) {
          return true;
        }
      }
      return false;
    },
    shouldRevealMatchingCompletedItems : function() {
      var C = 0;
      for (;C < this.children.length;C++) {
        if (this.children[C].shouldRevealMatchingCompletedItems()) {
          return true;
        }
      }
      return false;
    }
  });
  var B = z.extend({
    canMetaMatch : function() {
      return false;
    },
    _generateTextualMatchResult : function(C, O, R) {
      return{
        matches : C,
        nameMatches : O,
        noteMatches : R,
        metaMatches : false
      };
    }
  });
  z = z.extend({
    canMetaMatch : function() {
      return true;
    },
    _generateMetaMatchResult : function(C) {
      return{
        matches : C,
        nameMatches : false,
        noteMatches : false,
        metaMatches : C
      };
    }
  });
  var J = B.extend({
    init : function(C, O) {
      this._super();
      var R = utils.isWordOrNumberChar(C.charAt(0));
      var S = utils.isWordOrNumberChar(C.charAt(C.length - 1)) ? "(?=$|[^" + WORD_CHARS_PLUS_DIGITS + "])" : "()";
      R = (R ? "(^|[^" + WORD_CHARS_PLUS_DIGITS + "])" : "()") + "(" + utils.regExpEscapeString(C) + ")";
      if (!O) {
        R += S;
      }
      this.term = C;
      this.termRegExp = XRegExp(R, "ig");
    },
    matches : function(C) {
      var O = global_project_tree_object.hasName(C) && global_project_tree_object.getNameInPlainText(C).match(this.termRegExp) !== null;
      C = global_project_tree_object.hasNote(C) && global_project_tree_object.getNoteInPlainText(C).match(this.termRegExp) !== null;
      return this._generateTextualMatchResult(O || C, O, C);
    },
    markMatchingChars : function(C, O, R) {
      this.termRegExp.lastIndex = 0;
      for (;;) {
        var S = this.termRegExp.exec(C);
        if (S == null) {
          break;
        }
        var W = S[2];
        var Z = S = S.index + S[1].length;
        for (;Z < S + W.length;Z++) {
          O[Z] = R;
        }
      }
    }
  });
  var N = B.extend({
    init : function(C) {
      this._super();
      var O = utils.regExpEscapeString(C);
      this.literalString = C;
      this.literalStringRegExp = XRegExp(O, "ig");
    },
    matches : function(C) {
      var O = global_project_tree_object.hasName(C) && global_project_tree_object.getNameInPlainText(C).match(this.literalStringRegExp) !== null;
      C = global_project_tree_object.hasNote(C) && global_project_tree_object.getNoteInPlainText(C).match(this.literalStringRegExp) !== null;
      return this._generateTextualMatchResult(O || C, O, C);
    },
    markMatchingChars : function(C, O, R) {
      this.literalStringRegExp.lastIndex = 0;
      for (;;) {
        var S = this.literalStringRegExp.exec(C);
        if (S == null) {
          break;
        }
        var W = S[0];
        var Z = S.index;
        for (;Z < S.index + W.length;Z++) {
          O[Z] = R;
        }
      }
    }
  });
  B = z.extend({
    init : function(C) {
      this._super();
      var O;
      if (typeof C === "string") {
        C = C.match(/^(\d{1,2})\/(\d{1,2})(\/(\d{4}))?(@(\d{2}):(\d{2})(:(\d{2}))?)?$/);
        if (C === null) {
          this._hasInvalidValue = true;
          return;
        }
        var R = function(Q, Y, aa) {
          if (Y === undefined) {
            Y = Number.MIN_VALUE;
          }
          if (aa === undefined) {
            aa = Number.MAX_VALUE;
          }
          integer = parseInt(Q);
          if (integer < Y || integer > aa) {
            throw Error("Integer not in range [" + Y + ", " + aa + ']: "' + integer + '"');
          }
          return integer;
        };
        try {
          O = R(C[1], 1, 12);
          var S = R(C[2], 1, 31);
          var W = C[4];
          var Z = W !== undefined ? R(W) : (new Date).getFullYear();
          var ca = R(C[6] !== undefined ? C[6] : "00", 0, 23);
          var H = R(C[7] !== undefined ? C[7] : "00", 0, 59);
          var K = R(C[9] !== undefined ? C[9] : "00", 0, 59);
        } catch (P) {
          this._hasInvalidValue = true;
          return;
        }
        O = (new Date(Z, O - 1, S, ca, H, K)).getTime();
      } else {
        O = C;
      }
      this._hasInvalidValue = false;
      this._timestamp = O;
      this._treeIdToClientTimestampMap = {};
    },
    _getClientTimestampForProjectTree : function(C) {
      var O = C.getTreeId();
      if (!(O in this._treeIdToClientTimestampMap)) {
        this._treeIdToClientTimestampMap[O] = C.getClientTimestampForTimestamp(this._timestamp);
      }
      return this._treeIdToClientTimestampMap[O];
    }
  });
  var T = B.extend({
    init : function(C) {
      this._super(C);
    },
    matches : function(C) {
      if (this._hasInvalidValue) {
        return this._generateMetaMatchResult(false);
      }
      var O = global_project_tree_object.getLastModified(C);
      C = this._getClientTimestampForProjectTree(global_project_tree_object.getProjectTree(C));
      return this._generateMetaMatchResult(this.compareTimestamps(O, C));
    },
    shouldRevealMatchingCompletedItems : function() {
      return true;
    }
  });
  var V = T.extend({
    init : function(C) {
      this._super(C);
    },
    compareTimestamps : function(C, O) {
      return C >= O;
    }
  });
  var X = T.extend({
    init : function(C) {
      this._super(C);
    },
    compareTimestamps : function(C, O) {
      return C < O;
    }
  });
  var ea = B.extend({
    init : function(C) {
      this._super(C);
    },
    matches : function(C) {
      if (this._hasInvalidValue) {
        return this._generateMetaMatchResult(false);
      }
      var O = false;
      if (global_project_tree_object.isCompleted(C)) {
        O = global_project_tree_object.getCompleted(C);
        C = this._getClientTimestampForProjectTree(global_project_tree_object.getProjectTree(C));
        O = O >= C;
      }
      return this._generateMetaMatchResult(O);
    },
    shouldRevealMatchingCompletedItems : function() {
      return true;
    }
  });
  var I = V.extend({
    init : function(C) {
      this._super(l(C));
    }
  });
  var L = ea.extend({
    init : function(C) {
      this._super(l(C));
    }
  });
  var M = z.extend({
    TyPE_INVALID : 0,
    TYPE_ME : 1,
    TYPE_OTHERS : 2,
    init : function(C) {
      this._super();
      this._type = C === "me" ? this.TYPE_ME : C === "others" ? this.TYPE_OTHERS : this.TYPE_INVALID;
    },
    matches : function(C) {
      C = global_project_tree_object.getLastModifiedByUserId(C);
      var O = false;
      if (this._type === this.TYPE_ME) {
        O = C === USER_ID_AS_INT;
      } else {
        if (this._type === this.TYPE_OTHERS) {
          O = C !== USER_ID_AS_INT;
        }
      }
      return this._generateMetaMatchResult(O);
    },
    shouldRevealMatchingCompletedItems : function() {
      return true;
    }
  });
  var U = z.extend({
    init : function() {
      this._super();
    },
    matches : function(C) {
      return this._generateMetaMatchResult(global_project_tree_object.isCompleted(C));
    },
    shouldRevealMatchingCompletedItems : function() {
      return true;
    }
  });
  var ba = z.extend({
    init : function() {
      this._super();
    },
    matches : function(C) {
      return this._generateMetaMatchResult(global_project_tree_object.getSharedInfo(C) !== null);
    }
  });
  var ga = z.extend({
    init : function() {
      this._super();
    },
    matches : function(C) {
      return this._generateMetaMatchResult(global_project_tree_object.isAddedSubtreePlaceholder(C));
    }
  });
  var ja = z.extend({
    init : function() {
      this._super();
    },
    matches : function(C) {
      return this._generateMetaMatchResult(global_project_tree_object.hasNote(C));
    }
  });
  var ka = Class.extend({
    init : function(C, O, R, S, W, Z, ca, H) {
      this.matches = C;
      this.uncompletedDescendantMatches = O;
      this.completedDescendantMatches = R;
      this.nameMatches = S;
      this.noteMatches = W;
      this.metaMatches = Z;
      this.isHalfOpenSearchMatchAncestorWhenCompletedHidden = ca;
      this.isHalfOpenSearchMatchAncestorWhenCompletedVisible = H;
    },
    isExpandedForSearch : function(C) {
      return n(C) ? C.isExpanded() : this.isByDefaultExpandedForSearch();
    },
    isByDefaultExpandedForSearch : function() {
      return this.uncompletedDescendantMatches || this.completedDescendantMatches;
    },
    isNeverVisibleForSearch : function(C, O) {
      if (this.matches || (this.uncompletedDescendantMatches || (O && this.completedDescendantMatches || (n(C) || f(C.getParent()))))) {
        return false;
      }
      var R = global_project_tree_object.getParent(C.getProjectTreeObject());
      if (R === null || global_project_tree_object.getSearchResult(R).isByDefaultExpandedForSearch()) {
        return true;
      }
      return false;
    },
    getAdditionalClassesForSearch : function(C) {
      var O = {
        project : "",
        name : "",
        note : ""
      };
      var R = n(C) || f(C.getParent());
      if (this.matches || R) {
        O.project += "matches ";
        if (R || !this.uncompletedDescendantMatches && !this.completedDescendantMatches) {
          O.project += "terminalMatch ";
        }
      }
      if (this.uncompletedDescendantMatches) {
        O.project += "uncompletedDescendantMatches ";
      }
      if (this.completedDescendantMatches) {
        O.project += "completedDescendantMatches ";
      }
      if (!f(C)) {
        if (this.isHalfOpenSearchMatchAncestorWhenCompletedHidden) {
          O.project += "halfOpenSearchMatchAncestorWhenCompletedHidden ";
        }
        if (this.isHalfOpenSearchMatchAncestorWhenCompletedVisible) {
          O.project += "halfOpenSearchMatchAncestorWhenCompletedVisible ";
        }
      }
      if (this.metaMatches) {
        O.project += "metaMatches ";
      }
      if (this.nameMatches) {
        O.name += "matches ";
      }
      if (this.noteMatches) {
        O.note += "matches ";
      }
      return O;
    }
  });
  var la = new ka(false, false, false, false, false, false, false, false);
  return{
    init : function() {
      function C() {
        if (!IS_MOBILE) {
          v();
        }
      }
      function O() {
        if (a()) {
          b();
        } else {
          if (IS_MOBILE) {
            $("#searchBox").val("").blur();
          }
        }
        return false;
      }
      $("#searchBox").val("");
      $("#searchForm").submit(function() {
        if (IS_MOBILE) {
          $("#searchBox").blur();
        } else {
          p();
        }
        return false;
      });
      var R = $("#searchPrompt");
      if (IS_MOBILE) {
        R.tapHandler(null, function() {
          function S() {
            $("#searchBox").focus();
          }
          e();
          if (IS_IOS) {
            dom_utils.executeAfterRepaint(S);
          } else {
            S();
          }
          return false;
        });
      } else {
        R.click(function() {
          $("#searchBox").focus();
        });
      }
      R = $("#searchBox");
      R.bind("keydown", function(S) {
        var W = $(this);
        if (!IS_MOBILE) {
          setTimeout(function() {
            tagging.getTagAutocompleter().updateDisplay(W);
          }, 1);
          if (!(S.keyCode === $.ui.keyCode.TAB || (S.keyCode === $.ui.keyCode.ESCAPE || S.keyCode === $.ui.keyCode.DOWN))) {
            v();
          }
        }
      });
      R.bind("keypress", function(S) {
        var W = $(this);
        if (!IS_MOBILE) {
          S = String.fromCharCode(S.which);
          if (tagging.isTagStartChar(S)) {
            tagging.getTagAutocompleter().attach(W, S);
          }
        }
      });
      R.bind("cut", C);
      R.bind("paste", C);
      R.bind("click", function() {
        tagging.getTagAutocompleter().detach();
      });
      R.focus(function() {
        e();
        item_select.clearItemSelection();
      });
      R.blur(function() {
        var S = $.trim($(this).val()).length === 0;
        $("#searchForm");
        if (S) {
          h();
        } else {
          e();
        }
        tagging.getTagAutocompleter().detach();
        A = null;
        if (IS_MOBILE) {
          p();
        }
      });
      R = key_events.enableKeyEvents(R, "true");
      R.addHandler("keydown", "tab", function() {
        if (tagging.getTagAutocompleter().autocompleteSelectedTag($(this))) {
          return false;
        }
        focusFirstProject();
        return false;
      });
      R.addHandler("keydown", "return", function() {
        if (tagging.getTagAutocompleter().autocompleteSelectedTag($(this))) {
          return false;
        }
      });
      R.addHandler("keydown", "up", function() {
        if (tagging.getTagAutocompleter().moveSelection($(this), "up")) {
          return false;
        }
      });
      R.addHandler("keydown", "down", function() {
        if (tagging.getTagAutocompleter().moveSelection($(this), "down")) {
          return false;
        }
        if ($(this).caretAtEndOfText()) {
          focusFirstProject();
          return false;
        }
      });
      if (IS_MOBILE) {
        $("#searchCancel").tapHandler(function() {
          return false;
        }, O);
      } else {
        $("#searchCancel").click(O).mousedown(function() {
          return false;
        });
      }
    },
    inSearchMode : a,
    getSearchQuery : function() {
      return m;
    },
    getNonMatchItemSearchResult : function() {
      return la;
    },
    registerLocallyCreatedItemForCurrentSearch : function(C) {
      if (a()) {
        w[C.getUniqueIdentifier()] = true;
      }
    },
    registerFullyExpandedItemForCurrentSearch : function(C) {
      if (a()) {
        t[C.getUniqueIdentifier()] = true;
      }
    },
    isLocallyCreatedItemForCurrentSearch : n,
    setSearchBoxAndSearch : x,
    cancelSearch : u,
    reapplyCurrentSearch : function(C) {
      o(m, true, C);
    },
    searchProjectTree : q,
    exitSearchMode : c,
    searchWithSearchBoxAfterChange : v,
    searchToggleShortcutHandler : function() {
      var C = getCurrentlyFocusedContentOrInput();
      C = C !== null && C.is("#searchBox");
      if (a()) {
        b();
      } else {
        if (C) {
          C = A;
          $("#searchBox").blur();
          focusFirstProject();
          if (C) {
            operations.restoreClientViewState(C);
          }
        } else {
          A = operations.saveClientViewState({
            editingContentText : false,
            tagAutocompleterState : false,
            selectedProject : false,
            scrollPosition : true
          });
          $("#searchBox").focus();
        }
      }
    },
    tagIsInCurrentSearch : s,
    toggleTagInCurrentSearch : function(C) {
      var O = $("#searchBox").val();
      if (s(C)) {
        O = O.replace(RegExp("(^|\\s)" + C + "(?=$|\\s)", "ig"), "");
      } else {
        O += " " + C;
      }
      O = $.trim(O);
      if (O.length > 0) {
        O += " ";
      }
      x(O);
    },
    notifyWindowResized : function() {
      j();
    }
  };
}();
var tagging = function() {
  function a() {
    if (l === null) {
      l = new p;
    }
    return l;
  }
  function e(r) {
    return o.indexOf(r) !== -1;
  }
  function j(r, x, u) {
    if (u === undefined) {
      u = true;
    }
    var b = null;
    if (u) {
      b = Array(r.length);
      content_parsing.forEachUrlInString(r, function(t, y) {
        var A = t;
        for (;A < t + y.length;A++) {
          b[A] = true;
        }
      });
    }
    k.lastIndex = 0;
    for (;;) {
      var s = k.exec(r);
      if (s == null) {
        break;
      }
      var m = s[2];
      s = s.index + s[1].length;
      if (!(u && b[s] === true)) {
        if (utils.isDigit(m.charAt(1))) {
          var w = m.substring(1);
          if (w.length < 4 && utils.isOnlyDigits(w)) {
            continue;
          }
        }
        x(s, m);
      }
    }
  }
  function h(r, x) {
    var u = r;
    for (;u !== null;) {
      global_project_tree_object.getTagManager(u).applyTagCountsDelta(x);
      u = global_project_tree_object.getParent(u);
    }
    a().add(x);
  }
  function f() {
    if (q === null) {
      q = new v;
    }
    return q;
  }
  function n(r, x) {
    if (x) {
      var u = r.val();
      return content_text.createContentTextContainerFromPlainText(u, false);
    } else {
      return new content_text.ContentText(r, r.isNote());
    }
  }
  var l = null;
  var q = null;
  var o = "#@";
  var c = "[" + WORD_CHARS_PLUS_DIGITS + "][" + WORD_CHARS_PLUS_DIGITS + "\\-_]*";
  var g = c + "(:(" + c + "))*";
  var d = XRegExp("^" + (c + "(:(" + c + ")?)*") + "$", "i");
  var k = XRegExp("(^|\\s|" + TEXT_ENTITY_BOUNDARY_CHARS + ")([" + o + "](" + g + "))(?=$|\\s|" + TEXT_ENTITY_BOUNDARY_CHARS + ")", "ig");
  var p = Class.extend({
    init : function(r) {
      if (r === undefined) {
        r = null;
      }
      this.tagInfoMap = r == null ? {} : utils.deepCopyObject(r.tagInfoMap);
    },
    applyTagDelta : function(r, x) {
      var u = r.toLowerCase();
      if (!(u in this.tagInfoMap)) {
        var b = {
          count : 0
        };
        if (u !== r) {
          b.canonicalName = r;
        }
        this.tagInfoMap[u] = b;
      }
      this.tagInfoMap[u].count += x;
      if (this.tagInfoMap[u].count === 0) {
        delete this.tagInfoMap[u];
      }
    },
    add : function(r, x) {
      if (x === undefined) {
        x = false;
      }
      var u;
      for (u in r.tagInfoMap) {
        var b = r.tagInfoMap[u];
        this.applyTagDelta("canonicalName" in b ? b.canonicalName : u, x ? -b.count : b.count);
      }
    },
    subtract : function(r) {
      this.add(r, true);
    },
    incrementWithString : function(r) {
      var x = this;
      j(r, function(u, b) {
        x.applyTagDelta(b, 1);
      });
    },
    isEmpty : function() {
      return utils.objectIsEmpty(this.tagInfoMap);
    },
    getTagList : function(r, x, u, b) {
      if (r === undefined) {
        r = "";
      }
      if (x === undefined) {
        x = null;
      }
      if (u === undefined) {
        u = 0;
      }
      if (b === undefined) {
        b = null;
      }
      r = r.toLowerCase();
      var s = [];
      var m;
      for (m in this.tagInfoMap) {
        if (utils.isPrefixMatch(m, r)) {
          var w = this.tagInfoMap[m];
          var t = "canonicalName" in w ? w.canonicalName : m;
          if (b === null || !(m in b)) {
            s.push({
              tag : t,
              count : w.count
            });
          }
        }
      }
      s.sort(function(y, A) {
        if (y.count === A.count) {
          var F = utils.isDigit(y.tag.charAt(1));
          var z = utils.isDigit(A.tag.charAt(1));
          return F && !z ? 1 : z && !F ? -1 : y.tag < A.tag ? -1 : 1;
        } else {
          return y.count < A.count ? 1 : -1;
        }
      });
      return x !== null ? s.slice(u, u + x) : u > 0 ? s.slice(u) : s;
    }
  });
  c = Class.extend({
    init : function(r, x) {
      if (x === undefined) {
        x = false;
      }
      this.pto = r;
      this.isForRootOfSharedSubtree = x;
      this.descendantTagCounts = this.tagCounts = null;
      this.nameOrNoteChanged(true);
    },
    getTagCounts : function() {
      return this.tagCounts !== null ? this.tagCounts : new p;
    },
    setDescendantTagCounts : function(r) {
      this.descendantTagCounts = r;
    },
    nameOrNoteChanged : function(r) {
      if (r === undefined) {
        r = false;
      }
      if (TRACK_TAG_COUNTS) {
        var x = this.tagCounts;
        var u = new p;
        if (this.isForRootOfSharedSubtree) {
          if (project_tree_object.hasName(this.pto)) {
            u.incrementWithString(project_tree_object.getNameInPlainText(this.pto));
          }
          if (project_tree_object.hasNote(this.pto)) {
            u.incrementWithString(project_tree_object.getNoteInPlainText(this.pto));
          }
        } else {
          if (global_project_tree_object.hasName(this.pto)) {
            u.incrementWithString(global_project_tree_object.getNameInPlainText(this.pto));
          }
          if (global_project_tree_object.hasNote(this.pto)) {
            u.incrementWithString(global_project_tree_object.getNoteInPlainText(this.pto));
          }
        }
        var b = new p(u);
        if (x !== null) {
          b.subtract(x);
        }
        if (!b.isEmpty()) {
          this.tagCounts = u;
          if (!r) {
            if (this.isForRootOfSharedSubtree) {
              r = project_tree_object.getProjectTree(this.pto);
              if (r.isAuxiliary()) {
                r = project_tree.getMainProjectTree().getSharedSubtreePlaceholder(r.getShareId());
                h(global_project_tree_object.getParent(r), b);
              } else {
                a().add(b);
              }
            } else {
              h(global_project_tree_object.getParent(this.pto), b);
            }
          }
        }
      }
    },
    itemMoved : function(r, x) {
      if (!(r !== null && (x !== null && x.equals(r)))) {
        var u = this.getSubtreeTagCounts();
        if (!u.isEmpty()) {
          if (r !== null) {
            var b = new p;
            b.subtract(u);
            var s = r.translateToGlobalProjectTreeObject();
            h(s, b);
          }
          if (x !== null) {
            b = x.translateToGlobalProjectTreeObject();
            h(b, u);
          }
        }
      }
    },
    applyTagCountsDelta : function(r) {
      if (this.descendantTagCounts === null) {
        this.descendantTagCounts = new p;
      }
      this.descendantTagCounts.add(r);
    },
    getSubtreeTagCounts : function() {
      var r = new p;
      if (this.tagCounts !== null) {
        r.add(this.tagCounts);
      }
      if (this.descendantTagCounts !== null) {
        r.add(this.descendantTagCounts);
      }
      return r;
    }
  });
  var v = Class.extend({
    init : function() {
      function r(x) {
        x.siblings(".autocompleteTag.selectedAutocompleteTag").removeClass("selectedAutocompleteTag");
        x.addClass("selectedAutocompleteTag");
      }
      this.autocompleteBox = $("#autocompleteBox");
      this.cachedTagCountsSecondary = this.cachedTagCountsPrimary = this.tagStartCaretPos = this.isAttachedToSearchBox = this.content = null;
      this.tagListStartPos = 0;
      this.lastStartPosSearched = this.lastPrefixSearched = null;
      $("#autocompleteBox > .autocompleteTag").live("mouseenter", function() {
        var x = $(this);
        r(x);
      }).live("mousedown", function() {
        var x = $(this);
        r(x);
        f().autocompleteSelectedTag();
      });
    },
    isAttached : function() {
      return this.content !== null || this.isAttachedToSearchBox;
    },
    isAttachedToPage : function(r) {
      return this.isAttached() && $.contains(r[0], this.autocompleteBox[0]);
    },
    attach : function(r, x) {
      if (this.isAttached()) {
        this.detach();
      }
      var u = r.is("#searchBox");
      var b = "\\s|" + TEXT_ENTITY_BOUNDARY_CHARS;
      if (u) {
        b += "|-";
      }
      var s = XRegExp(b, "i");
      var m = n(r, u);
      b = (u ? r.getCaretForTextArea() : r.getCaret()).start;
      if (!(b > 0 && m.getPlainText().charAt(b - 1).match(s) === null)) {
        if (u) {
          this.autocompleteBox.addClass("attachedToSearchBox");
        }
        m = project_tree.getProjectReferenceFromDomProject(selectOnActivePage(".selected"));
        s = m.isMainTreeRoot() ? a() : m.getTagManager().getSubtreeTagCounts();
        m = u || m.isMainTreeRoot() ? null : a();
        this.content = u ? null : r;
        this.isAttachedToSearchBox = u;
        this.tagStartCaretPos = b;
        this.cachedTagCountsPrimary = new p(s);
        this.cachedTagCountsSecondary = m !== null ? new p(m) : null;
        this.tagListStartPos = 0;
        this._moveAutocompleteBoxToAppropriateDOMLocation();
        this.updateDisplay(r, x);
      }
    },
    _moveAutocompleteBoxToAppropriateDOMLocation : function() {
      if (this.isAttached()) {
        if (this.isAttachedToSearchBox) {
          this.autocompleteBox.appendTo("#documentView");
        } else {
          this.autocompleteBox.appendTo(selectOnActivePage(".widgetContainer"));
        }
      } else {
        this.autocompleteBox.appendTo("#hidden");
      }
    },
    updateDisplay : function(r, x) {
      if (x === undefined) {
        x = null;
      }
      if (this.isAttached()) {
        var u = r.is("#searchBox");
        var b = n(r, u);
        var s = u ? r.getCaretForTextArea() : r.getCaret();
        if (this.isAttachedToSearchBox) {
          if (!u) {
            this.detach();
            return;
          }
        } else {
          if (r[0] !== this.content[0]) {
            this.detach();
            return;
          }
        }
        if (x === null && s.start !== s.end) {
          this.detach();
        } else {
          if (s.start < this.tagStartCaretPos) {
            this.detach();
          } else {
            var m = x !== null ? x : b.getPlainText().substring(this.tagStartCaretPos, s.start);
            if (m.length === 0) {
              this.detach();
            } else {
              u = m.charAt(0);
              b = m.substring(1);
              if (!e(u) || b.length > 0 && b.match(d) === null) {
                this.detach();
              } else {
                if (m !== this.lastPrefixSearched || this.tagListStartPos !== this.lastStartPosSearched) {
                  if (m !== this.lastPrefixSearched) {
                    this.tagListStartPos = 0;
                  }
                  var w = this;
                  b = function() {
                    var t = w.cachedTagCountsPrimary.getTagList(m, 8, w.tagListStartPos);
                    if (t.length < 8 && w.cachedTagCountsSecondary !== null) {
                      var y = w.cachedTagCountsPrimary.getTagList(m);
                      var A = {};
                      var F = 0;
                      for (;F < y.length;F++) {
                        var z = y[F].tag.toLowerCase();
                        A[z] = true;
                      }
                      y = w.cachedTagCountsSecondary.getTagList(m, 8 - t.length, t.length > 0 ? 0 : w.tagListStartPos, A);
                      t = t.concat(y);
                    }
                    return t = function(D) {
                      function E(B, J) {
                        if (!_(B).some(function(T) {
                          return J === T.tag;
                        })) {
                          var N = _.chain(B).map(function(T) {
                            return T.tag.search(J) > -1 ? true : false;
                          }).lastIndexOf(true).value();
                          B.splice(N + 1, 0, {
                            count : 1,
                            tag : J
                          });
                        }
                      }
                      var G = function(B) {
                        return _.chain(B).filter(function(J) {
                          return J.tag.search(":") !== -1;
                        }).map(function(J) {
                          var N = J.tag.lastIndexOf(":");
                          return J.tag.slice(0, N + 1);
                        }).uniq(function(J, N) {
                          return J.tag !== N.tag;
                        }).value();
                      }(D);
                      _(G).forEach(function(B) {
                        E(D, B);
                      });
                      return D;
                    }(t);
                  };
                  u = b();
                  if (this.tagListStartPos > 0 && u.length < 8) {
                    this.tagListStartPos = Math.max(this.tagListStartPos - (8 - u.length), 0);
                    u = b();
                  }
                  this.autocompleteBox.html("");
                  b = 0;
                  for (;b < u.length;b++) {
                    s = $('<div class="autocompleteTag">' + u[b].tag + "</div>");
                    if (b === 0) {
                      s.addClass("selectedAutocompleteTag");
                    }
                    this.autocompleteBox.append(s);
                  }
                  if (u.length === 0) {
                    this.autocompleteBox.hide();
                  } else {
                    this.autocompleteBox.show();
                  }
                  this.lastPrefixSearched = m;
                  this.lastStartPosSearched = this.tagListStartPos;
                }
                if (this.isAttachedToSearchBox) {
                  b = r.offset();
                  s = r.height();
                  u = r.width();
                  b = {
                    top : b.top + s + 7,
                    left : b.left
                  };
                  u = u;
                } else {
                  b = this.content.getContentCaretOffset(this.tagStartCaretPos);
                  b.top += IS_IE ? parseInt(this.content.css("lineHeight")) : 5;
                  u = "auto";
                }
                this.autocompleteBox.offset({
                  top : Math.round(b.top),
                  left : Math.round(b.left)
                });
                this.autocompleteBox.width(u);
              }
            }
          }
        }
      }
    },
    detach : function() {
      if (this.isAttached()) {
        this.cachedTagCountsSecondary = this.cachedTagCountsPrimary = this.tagStartCaretPos = this.isAttachedToSearchBox = this.content = null;
        this.tagListStartPos = 0;
        this.lastStartPosSearched = this.lastPrefixSearched = null;
        this.autocompleteBox.removeClass("attachedToSearchBox");
        this._moveAutocompleteBoxToAppropriateDOMLocation();
      }
    },
    saveState : function() {
      return{
        isAttachedToSearchBox : this.isAttachedToSearchBox,
        tagStartCaretPos : this.tagStartCaretPos,
        cachedTagCountsPrimary : this.cachedTagCountsPrimary,
        cachedTagCountsSecondary : this.cachedTagCountsSecondary
      };
    },
    restoreState : function(r, x) {
      if (this.isAttached()) {
        this.detach();
      }
      this.content = !x.isAttachedToSearchBox ? r : null;
      this.isAttachedToSearchBox = x.isAttachedToSearchBox;
      this.tagStartCaretPos = x.tagStartCaretPos;
      this.cachedTagCountsPrimary = x.cachedTagCountsPrimary;
      this.cachedTagCountsSecondary = x.cachedTagCountsSecondary;
      this._moveAutocompleteBoxToAppropriateDOMLocation();
      this.updateDisplay(r);
    },
    moveSelection : function(r, x) {
      var u = this.getSelectedTag();
      if (u === null) {
        return false;
      }
      var b;
      if (x === "up") {
        b = u.prev(".autocompleteTag");
        if (b.length === 0) {
          if (this.tagListStartPos === 0) {
            this.detach();
          } else {
            this.tagListStartPos--;
            this.updateDisplay(r);
          }
          return true;
        }
      } else {
        b = u.next(".autocompleteTag");
        if (b.length === 0) {
          this.tagListStartPos++;
          this.updateDisplay(r);
          u = this.getSelectedTag();
          b = this.getDisplayedTags().last();
        }
      }
      u.removeClass("selectedAutocompleteTag");
      b.addClass("selectedAutocompleteTag");
      return true;
    },
    autocompleteSelectedTag : function(r) {
      function x() {
        var z = r;
        var D = y;
        if (A) {
          z.val(D.getPlainText());
        } else {
          z.setContentTextAsUserEdit(D.getText());
        }
        z = r;
        D = F;
        if (A) {
          z.setCaretForTextArea(D);
        } else {
          z.setCaret(D);
        }
        if (A) {
          search.searchWithSearchBoxAfterChange();
        }
      }
      if (r === undefined) {
        r = null;
      }
      var u = this.getSelectedTag();
      if (u === null) {
        return false;
      }
      var b;
      if (r === null) {
        r = this.isAttachedToSearchBox ? $("#searchBox") : this.content;
        b = true;
      } else {
        b = false;
      }
      var s = u.text();
      u = n(r, this.isAttachedToSearchBox);
      var m = u.getPlainText();
      var w = 0;
      for (;this.tagStartCaretPos + w < m.length && m.charAt(this.tagStartCaretPos + w).toLowerCase() === s.charAt(w).toLowerCase();w++) {
      }
      if (w === 0) {
        return false;
      }
      w = this.tagStartCaretPos + w;
      s = s;
      var t = s.charAt(s.length - 1);
      if ((w === m.length || m.charAt(w).match(/\s/) === null) && t !== ":") {
        s += " ";
      }
      var y = u.insertAtCaret(s, {
        start : this.tagStartCaretPos,
        end : w
      });
      var A = this.isAttachedToSearchBox;
      var F = this.tagStartCaretPos + s.length;
      if (b) {
        setTimeout(x, 1);
      } else {
        x();
      }
      this.detach();
      return true;
    },
    getSelectedTag : function() {
      if (!this.isAttached()) {
        return null;
      }
      var r = this.autocompleteBox.find(".autocompleteTag.selectedAutocompleteTag");
      return r.length === 1 ? r : null;
    },
    getDisplayedTags : function() {
      return this.autocompleteBox.find(".autocompleteTag");
    }
  });
  return{
    TagCounter : p,
    ItemTagManager : c,
    getTagAutocompleter : f,
    isTagStartChar : e,
    forEachTagInString : j,
    getRootDescendantTagCounts : a,
    setRootDescendantTagCounts : function(r) {
      l = r;
    },
    keyCodeIsForTagDeleteModifierKey : function(r) {
      r = key_events.getStringRepresentationForKeyCode(r);
      return r === "meta" || r === "alt";
    },
    tagDeleteModifierDown : function(r) {
      return r.metaKey && !r.ctrlKey || r.altKey;
    }
  };
}();
var content_parsing = function() {
  function a(p) {
    return utils.isAlpha(p);
  }
  function e(p) {
    return c.test(p);
  }
  function j(p) {
    if (p.charAt(p.length - 1) === ")") {
      var v = p.substring(0, p.length - 1);
      var r = 0;
      i = 0;
      for (;i < v.length;i++) {
        var x = v.charAt(i);
        if (x === "(") {
          r++;
        } else {
          if (x === ")") {
            if (r > 0) {
              r--;
            }
          }
        }
      }
      if (r === 0) {
        return v;
      }
    }
    return p;
  }
  var h = XRegExp("://|\\.([a-z]{2}[a-z]*)(?=$|[^.\\-" + WORD_CHARS_PLUS_DIGITS + "]|\\.$|\\.[^" + WORD_CHARS_PLUS_DIGITS + "])", "ig");
  var f = "[" + WORD_CHARS_PLUS_DIGITS + "]([" + WORD_CHARS_PLUS_DIGITS + "\\-_]*[" + WORD_CHARS_PLUS_DIGITS + "])?";
  var n = XRegExp("^" + f + "(\\." + f + ")*$", "i");
  var l = XRegExp("[" + WORD_CHARS_PLUS_DIGITS + ".\\-_]", "i");
  f = WORD_CHARS_PLUS_DIGITS + "\\/\\:#?&%=~;$@\\-_+!*'(){}";
  var q = XRegExp("^([" + (f + ".,") + "]*[" + f + "])", "i");
  var o = {
    AC : true,
    AD : true,
    AE : true,
    AERO : true,
    AF : true,
    AG : true,
    AI : true,
    AL : true,
    AM : true,
    AN : true,
    AO : true,
    AQ : true,
    AR : true,
    ARPA : true,
    AS : true,
    ASIA : true,
    AT : true,
    AU : true,
    AW : true,
    AX : true,
    AZ : true,
    BA : true,
    BB : true,
    BD : true,
    BE : true,
    BF : true,
    BG : true,
    BH : true,
    BI : true,
    BIZ : true,
    BJ : true,
    BM : true,
    BN : true,
    BO : true,
    BR : true,
    BS : true,
    BT : true,
    BV : true,
    BW : true,
    BY : true,
    BZ : true,
    CA : true,
    CAT : true,
    CC : true,
    CD : true,
    CF : true,
    CG : true,
    CH : true,
    CI : true,
    CK : true,
    CL : true,
    CM : true,
    CN : true,
    CO : true,
    COM : true,
    COOP : true,
    CR : true,
    CU : true,
    CV : true,
    CW : true,
    CX : true,
    CY : true,
    CZ : true,
    DE : true,
    DJ : true,
    DK : true,
    DM : true,
    DO : true,
    DZ : true,
    EC : true,
    EDU : true,
    EE : true,
    EG : true,
    ER : true,
    ES : true,
    ET : true,
    EU : true,
    FI : true,
    FJ : true,
    FK : true,
    FM : true,
    FO : true,
    FR : true,
    GA : true,
    GB : true,
    GD : true,
    GE : true,
    GF : true,
    GG : true,
    GH : true,
    GI : true,
    GL : true,
    GM : true,
    GN : true,
    GOV : true,
    GP : true,
    GQ : true,
    GR : true,
    GS : true,
    GT : true,
    GU : true,
    GW : true,
    GY : true,
    HK : true,
    HM : true,
    HN : true,
    HR : true,
    HT : true,
    HU : true,
    ID : true,
    IE : true,
    IL : true,
    IM : true,
    IN : true,
    INFO : true,
    INT : true,
    IO : true,
    IQ : true,
    IR : true,
    IS : true,
    IT : true,
    JE : true,
    JM : true,
    JO : true,
    JOBS : true,
    JP : true,
    KE : true,
    KG : true,
    KH : true,
    KI : true,
    KM : true,
    KN : true,
    KP : true,
    KR : true,
    KW : true,
    KY : true,
    KZ : true,
    LA : true,
    LB : true,
    LC : true,
    LI : true,
    LK : true,
    LR : true,
    LS : true,
    LT : true,
    LU : true,
    LV : true,
    LY : true,
    MA : true,
    MC : true,
    MD : true,
    ME : true,
    MG : true,
    MH : true,
    MIL : true,
    MK : true,
    ML : true,
    MM : true,
    MN : true,
    MO : true,
    MOBI : true,
    MP : true,
    MQ : true,
    MR : true,
    MS : true,
    MT : true,
    MU : true,
    MUSEUM : true,
    MV : true,
    MW : true,
    MX : true,
    MY : true,
    MZ : true,
    NA : true,
    NAME : true,
    NC : true,
    NE : true,
    NET : true,
    NF : true,
    NG : true,
    NI : true,
    NL : true,
    NO : true,
    NP : true,
    NR : true,
    NU : true,
    NZ : true,
    OM : true,
    ORG : true,
    PA : true,
    PE : true,
    PF : true,
    PG : true,
    PH : true,
    PK : true,
    PL : true,
    PM : true,
    PN : true,
    POST : true,
    PR : true,
    PRO : true,
    PS : true,
    PT : true,
    PW : true,
    PY : true,
    QA : true,
    RE : true,
    RO : true,
    RS : true,
    RU : true,
    RW : true,
    SA : true,
    SB : true,
    SC : true,
    SD : true,
    SE : true,
    SG : true,
    SH : true,
    SI : true,
    SJ : true,
    SK : true,
    SL : true,
    SM : true,
    SN : true,
    SO : true,
    SR : true,
    ST : true,
    SU : true,
    SV : true,
    SX : true,
    SY : true,
    SZ : true,
    TC : true,
    TD : true,
    TEL : true,
    TF : true,
    TG : true,
    TH : true,
    TJ : true,
    TK : true,
    TL : true,
    TM : true,
    TN : true,
    TO : true,
    TP : true,
    TR : true,
    TRAVEL : true,
    TT : true,
    TV : true,
    TW : true,
    TZ : true,
    UA : true,
    UG : true,
    UK : true,
    US : true,
    UY : true,
    UZ : true,
    VA : true,
    VC : true,
    VE : true,
    VG : true,
    VI : true,
    VN : true,
    VU : true,
    WF : true,
    WS : true,
    XXX : true,
    YE : true,
    YT : true,
    ZA : true,
    ZM : true,
    ZW : true
  };
  var c = /[a-z0-9-\+.]/i;
  var g = /[a-z0-9._%+-]/i;
  var d = /^[a-z0-9]+[a-z0-9\-.]*\.[a-z]+/i;
  var k = RegExp("(^|\\s|" + TEXT_ENTITY_BOUNDARY_CHARS + ")((\\+?1[\\-. ]?)?(\\([2-9][0-9][0-9]\\)|[2-9][0-9][0-9])[\\-. ]?[2-9][0-9][0-9][\\-. ]?[0-9]{4})(?=$|\\s|" + TEXT_ENTITY_BOUNDARY_CHARS + ")", "g");
  return{
    forEachUrlInString : function(p, v) {
      h.lastIndex = 0;
      for (;;) {
        var r = h.exec(p);
        if (r == null) {
          break;
        }
        var x = r[0];
        var u = r.index;
        var b;
        if (x === "://") {
          b = u = u;
          for (;b > 0 && e(p.charAt(b - 1));) {
            b--;
          }
          for (;b < u && !a(p.charAt(b));) {
            b++;
          }
          if (b === u) {
            continue;
          }
          if (p.substring(b, u).match(/^javascript$/i) !== null) {
            continue;
          }
          var s = u + x.length;
          r = q.exec(p.substring(s));
          if (r === null) {
            continue;
          }
          x = r[0];
          x = j(x);
          u = true;
          b = b;
          x = s + x.length;
        } else {
          if (!(r[1].toUpperCase() in o)) {
            continue;
          }
          s = r = u;
          for (;s > 0 && l.test(p.charAt(s - 1));) {
            s--;
          }
          u = p.substring(s, r);
          if (!n.test(u)) {
            continue;
          }
          u = false;
          b = s;
          x = r + x.length;
          if (x === p.length || p.charAt(x) !== "/") {
            x = x;
          } else {
            r = q.exec(p.substring(x));
            s = r[0];
            s = j(s);
            x = x + s.length;
          }
        }
        s = p.substring(b, x);
        v(b, s, u);
        h.lastIndex = x;
      }
    },
    forEachEmailAddressInString : function(p, v) {
      var r = 0;
      for (;;) {
        r = p.indexOf("@", r);
        if (r === -1) {
          break;
        }
        var x = r;
        r += 1;
        var u = x;
        for (;u > 0 && g.test(p.charAt(u - 1));) {
          u--;
        }
        if (u !== x) {
          x = d.exec(p.substring(r));
          if (x !== null) {
            r += x[0].length;
            x = p.substring(u, r);
            v(u, x);
          }
        }
      }
    },
    forEachPhoneNumberInString : function(p, v) {
      k.lastIndex = 0;
      for (;;) {
        var r = k.exec(p);
        if (r == null) {
          break;
        }
        v(r.index + r[1].length, r[2]);
      }
    }
  };
}();
var urls = function() {
  return{
    generateUrlSafeRandomString : function(a) {
      var e = "";
      var j = 0;
      for (;j < a;j++) {
        e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
      }
      return e;
    },
    parseUrlFragment : function(a) {
      var e = {
        pathNames : [],
        parameters : {}
      };
      if (a.charAt(0) === "#") {
        a = a.substring(1);
      }
      var j = a.indexOf("?");
      if (j === -1) {
        j = a.length;
      }
      var h = a.substring(0, j);
      a = a.substring(j + 1);
      j = h.split("/");
      h = 0;
      for (;h < j.length;h++) {
        var f = j[h];
        if (f.length > 0) {
          e.pathNames.push(f);
        }
      }
      a = a.split("&");
      h = 0;
      for (;h < a.length;h++) {
        j = a[h];
        if (j.length !== 0) {
          f = j.split("=");
          j = f[0];
          f = (f.length > 1 ? f[1] : "").replace(/\+/g, " ");
          f = decodeURIComponent(f);
          e.parameters[j] = f;
        }
      }
      return e;
    },
    isValidEmailAddress : function(a) {
      var e = a.lastIndexOf("@");
      if (e === -1) {
        return false;
      }
      a = a.substring(e + 1);
      e = a.lastIndexOf(".");
      if (e === -1 || e === a.length - 1) {
        return false;
      }
      return true;
    },
    formatPhoneNumberForTelUrl : function(a) {
      var e = a.replace(/[^0-9]/g, "");
      a = a.charAt(0) === "+";
      var j = [];
      switch(e.length) {
        case 11:
          j.push(e.substring(0, 1));
          e = e.substring(1);
        case 10:
          j.push(e.substring(0, 3));
          e = e.substring(3);
        case 7:
          j.push(e.substring(0, 3), e.substring(3, 7));
          break;
        default:
          j.push(e);
      }
      return(a ? "+" : "") + j.join("-");
    }
  };
}();
var sharing = function() {
  function a() {
    var c = $("#sharePopup");
    var g = q;
    var d = g.getSharedInfo();
    g.isAddedSubtreePlaceholder();
    o = false;
    c.html($("#sharePopupTemplate").html());
    var k = c.children(".sharePopupContentsContainer");
    if (g.isAddedSubtreePlaceholder()) {
      d = k.children(".embedded_settings");
      k.addClass("embedded");
      var p = !g.childrenAreInReadOnlyTree();
      d.addClass(p ? "embeddedEditable" : "embeddedViewOnly");
      if (g.getShareTypeForTreeForChildren() === "url") {
        d.addClass("embeddedSharedByUrl");
        d = d.find("input.collabLink");
        d.val(g.getSharedUrl());
        d.focus().select();
      }
      c.dialog("option", {
        buttons : {
          Close : function() {
            $(this).dialog("close");
          }
        }
      });
    } else {
      if (d === null) {
        d = k.children(".share_prompt");
        d.find("#id_share_type_url").attr("checked", "checked");
        d.find("#urlShareTypeOption").addClass("chosenShareTypeOption");
        var v = d.find("#urlShareTypeOption .shareTypeAdditionalInfo");
        var r = d.find("#emailShareTypeOption .shareTypeAdditionalInfo");
        v.show();
        r.hide();
        d.find("#url_editable_false, #email_editable_false").attr("checked", "checked");
        c.dialog("option", {
          buttons : {
            Share : e,
            Cancel : function() {
              $(this).dialog("close");
            }
          }
        });
      } else {
        if (d.isSharedViaUrl()) {
          v = k.children(".url_shared_settings");
          k.addClass("sharedViaUrl");
          p = d.getUrlSharingWritePermission();
          d = v.find(".is_editable.buttonset");
          if (p) {
            d.find("#url_settings_editable_true").attr("checked", "checked");
          } else {
            d.find("#url_settings_editable_false").attr("checked", "checked");
          }
          d = v.find("input.collabLink");
          d.val(g.getSharedUrl());
          d.focus().select();
        } else {
          v = k.children(".email_shared_settings");
          k.addClass("sharedViaEmail");
          r = "";
          var x = d.getSortedEmailInfos();
          var u = 0;
          for (;u < x.length;u++) {
            var b = x[u];
            var s = "user_id" in b;
            var m = "shared_email_" + u + "_editable";
            var w = "shared_email_" + u + "_editable_false";
            var t = "shared_email_" + u + "_editable_true";
            var y;
            if (p = b.write_permission) {
              y = "";
              p = 'checked="checked"';
            } else {
              y = 'checked="checked"';
              p = "";
            }
            p = '<span class="is_editable buttonset smallButtonset"><span class="buttons"><input type="radio" id="' + w + '" name="' + m + '" data-editable="false" ' + y + ' /><label for="' + w + '">view</label><input type="radio" id="' + t + '" name="' + m + '"  data-editable="true" ' + p + ' /><label for="' + t + '">edit</label></span></span>';
            b = html_utils.htmlEscapeText(b.email);
            r += '<tr><td class="sharedEmail" title="' + b + '">' + b + '</td><td class="sharedEmailActive">' + (s ? "active" : "inactive") + '</td><td class="sharedEmailWritePermissionToggle">' + p + '</td><td class="sharedEmailRemoveLinkContainer"><span class="sharedEmailRemoveLink">Remove</span></td></tr>';
          }
          if (x.length === 0) {
            v.addClass("noSharedEmails");
          }
          v.find("#sharedEmailsTable").children("tbody").html(r);
          v = v.find(".addPeopleWidget .is_editable.buttonset");
          d = d.getEmailInfos();
          if (d.length > 0 ? d[d.length - 1].write_permission : false) {
            v.find("#shared_email_editable_true").attr("checked", "checked");
          } else {
            v.find("#shared_email_editable_false").attr("checked", "checked");
          }
        }
        c.dialog("option", {
          buttons : {
            "Stop sharing this list" : function() {
              k.addSpinner();
              o = true;
              c.setDialogButtonsDisable(true);
              undo_redo.startOperationBatch();
              g.applyLocalUnshare();
              undo_redo.finishOperationBatch();
              push_poll.scheduleNextPushAndPoll(true);
            },
            Close : function() {
              $(this).dialog("close");
            }
          }
        });
      }
    }
    k.find(".buttonset").buttonset();
  }
  function e() {
    var c = $("#sharePopup");
    var g = c.children(".sharePopupContentsContainer");
    var d = g.children(".share_prompt");
    var k = q;
    g.addSpinner();
    o = true;
    c.setDialogButtonsDisable(true);
    if (d.find("#id_share_type_url, #id_share_type_email").filter(":checked").is("#id_share_type_url")) {
      c = d.find("#url_editable_false, #url_editable_true").filter(":checked").is("#url_editable_true");
      h(k, "url", c);
    } else {
      c = d.find("#email_editable_false, #email_editable_true").filter(":checked").is("#email_editable_true");
      d = j(d.find(".emailListInput").val());
      if (d.length > 0) {
        h(k, "email", c, d);
      } else {
        h(k, "email");
      }
    }
  }
  function j(c) {
    c = c.split(",");
    var g = [];
    var d = 0;
    for (;d < c.length;d++) {
      var k = $.trim(c[d]);
      if (urls.isValidEmailAddress(k)) {
        g.push(k);
      }
    }
    return g;
  }
  function h(c, g, d, k) {
    if (d === undefined) {
      d = null;
    }
    if (k === undefined) {
      k = null;
    }
    if (!(g === "email" && !true)) {
      undo_redo.startOperationBatch();
      c.applyLocalShare(g, d);
      if (k !== null) {
        g = 0;
        for (;g < k.length;g++) {
          c.applyLocalAddSharedEmail(k[g], d);
        }
      }
      undo_redo.finishOperationBatch();
      push_poll.scheduleNextPushAndPoll(true);
    }
  }
  function f(c, g, d) {
    undo_redo.startOperationBatch();
    var k = 0;
    for (;k < g.length;k++) {
      c.applyLocalAddSharedEmail(g[k], d);
    }
    undo_redo.finishOperationBatch();
    push_poll.scheduleNextPushAndPoll(true);
  }
  function n(c, g) {
    var d = 0;
    for (;d < c.length;d++) {
      var k = c[d];
      if (k.email === g) {
        return k;
      }
    }
    return null;
  }
  function l(c, g) {
    var d = 0;
    for (;d < c.length;d++) {
      var k = c[d];
      if (k.access_token === g) {
        return k;
      }
    }
    return null;
  }
  var q = null;
  var o = false;
  jQuery.fn.showSharePopup = function() {
    var c = $(this);
    c = project_tree.getProjectReferenceFromDomProject(c);
    if (!c.isAddedSubtreePlaceholder() && c.containsAddedSubtreePlaceholder()) {
      ui_sugar.showAlertDialog("It's not possible (yet) to share an item containing lists added from other accounts. If you want to share this item, move any such lists elsewhere first.", "Error");
    } else {
      var g = $("#sharePopup");
      g.dialog("option", {
        title : "Share list: " + content_text.getHtml(c.getName())
      });
      q = c;
      o = false;
      g.dialog("open");
      a();
    }
  };
  return{
    init : function() {
      $("#sharePopup").dialog({
        autoOpen : false,
        width : 500,
        modal : true,
        position : ["center", 150],
        title : "Share list",
        close : function() {
          q = null;
          o = false;
        }
      });
      $("#sharePopup .share_prompt #shareTypeSelector .shareTypeOption > :radio").live("click", function() {
        var c = $(this).closest(".shareTypeOption");
        var g = c.find(".shareTypeAdditionalInfo");
        var d = c.closest("#shareTypeSelector");
        c.addClass("chosenShareTypeOption");
        c = d.find(".shareTypeOption").not(c);
        c.removeClass("chosenShareTypeOption");
        g.slideDown(200);
        c.find(".shareTypeAdditionalInfo").slideUp(200);
      });
      $("#sharePopup .url_shared_settings .is_editable.buttonset :radio").live("click", function() {
        var c = $(this).data("editable") === true;
        h(q, "url", c);
      });
      $("#sharePopup .email_shared_settings #sharedEmailsTable .is_editable.buttonset :radio").live("click", function() {
        var c = $(this).data("editable") === true;
        var g = $(this).closest("tr").children("td.sharedEmail").text();
        f(q, [g], c);
      });
      $("#sharePopup .email_shared_settings #sharedEmailsTable .sharedEmailRemoveLink").live("click", function() {
        var c = $(this).closest("tr").children("td.sharedEmail").text();
        var g = q;
        undo_redo.startOperationBatch();
        g.applyLocalRemoveSharedEmail(c);
        undo_redo.finishOperationBatch();
        push_poll.scheduleNextPushAndPoll(true);
      });
      $("#sharePopup input.collabLink").live("click", function() {
        $(this).focus().select();
      });
      $("#sharePopup .share_prompt form").live("submit", function() {
        e();
        return false;
      });
      $("#sharePopup .email_shared_settings form.emailEntryForm").live("submit", function() {
        var c = $(this);
        var g = c.find("#shared_email_editable_false, #shared_email_editable_true").filter(":checked").is("#shared_email_editable_true");
        c = j(c.find(".emailListInput").val());
        if (c.length > 0) {
          f(q, c, g);
        }
        return false;
      });
      $("#sharePopup .email_shared_settings form.emailEntryForm .emailEntryFormSubmitButton").live("click", function() {
        $(this).closest("form.emailEntryForm").submit();
      });
    },
    ItemSharedInfo : Class.extend({
      init : function(c) {
        if (c === undefined) {
          c = null;
        }
        if (c === null) {
          c = {
            share_id : null
          };
        }
        this.rawItemSharedInfo = c;
      },
      getShareId : function() {
        return this.rawItemSharedInfo.share_id;
      },
      setShareId : function(c) {
        this.rawItemSharedInfo.share_id = c;
      },
      isSharedViaUrl : function() {
        return "url_shared_info" in this.rawItemSharedInfo;
      },
      isSharedViaEmail : function() {
        return "email_shared_info" in this.rawItemSharedInfo;
      },
      makeCopyOfRawSharedInfoWithoutShareId : function() {
        var c = utils.deepCopyObject(this.rawItemSharedInfo);
        c.share_id = null;
        return c;
      },
      getUrlSharingWritePermission : function() {
        return this.rawItemSharedInfo.url_shared_info.write_permission;
      },
      getInfoForEmail : function(c) {
        return n(this.rawItemSharedInfo.email_shared_info.emails, c);
      },
      getEmailInfos : function() {
        return this.rawItemSharedInfo.email_shared_info.emails;
      },
      getSortedEmailInfos : function() {
        var c = this.getEmailInfos();
        var g = [];
        var d = 0;
        for (;d < c.length;d++) {
          g.push(c[d]);
        }
        g.sort(function(k, p) {
          return k.email < p.email ? -1 : 1;
        });
        return g;
      },
      shareViaUrl : function(c) {
        if ("email_shared_info" in this.rawItemSharedInfo) {
          delete this.rawItemSharedInfo.email_shared_info;
        }
        this.rawItemSharedInfo.url_shared_info = {
          write_permission : c
        };
      },
      shareViaEmail : function() {
        if ("url_shared_info" in this.rawItemSharedInfo) {
          delete this.rawItemSharedInfo.url_shared_info;
        }
        if (!("email_shared_info" in this.rawItemSharedInfo)) {
          this.rawItemSharedInfo.email_shared_info = {
            emails : []
          };
        }
      },
      addSharedEmail : function(c, g, d) {
        if (this.isSharedViaEmail()) {
          var k = this.rawItemSharedInfo.email_shared_info.emails;
          var p = n(k, c);
          if (p !== null) {
            p.write_permission = g;
          } else {
            k.push({
              email : c,
              access_token : d,
              write_permission : g
            });
          }
        }
      },
      removeSharedEmail : function(c) {
        if (this.isSharedViaEmail()) {
          var g = this.rawItemSharedInfo.email_shared_info.emails;
          var d = null;
          var k = 0;
          for (;k < g.length;k++) {
            if (g[k].email === c) {
              d = k;
              break;
            }
          }
          if (d !== null) {
            g.splice(d, 1);
          }
        }
      },
      registerSharedEmailUser : function(c, g) {
        if (this.isSharedViaEmail()) {
          var d = l(this.rawItemSharedInfo.email_shared_info.emails, c);
          if (!(d === null || g !== null && "user_id" in d)) {
            if (g !== null) {
              d.user_id = g;
            } else {
              delete d.user_id;
            }
          }
        }
      },
      getSharedEmailUserId : function(c) {
        if (!this.isSharedViaEmail()) {
          return null;
        }
        c = l(this.rawItemSharedInfo.email_shared_info.emails, c);
        if (c === null || !("user_id" in c)) {
          return null;
        }
        return c.user_id;
      },
      getOperationsToCreate : function(c, g, d, k, p) {
        if (this.isSharedViaUrl()) {
          var v = {
            projectid : c,
            share_type : "url",
            write_permission : this.rawItemSharedInfo.url_shared_info.write_permission
          };
          var r = {
            previous_share_type : null,
            previous_last_modified : g,
            previous_last_modified_by : d
          };
          return[operations.createOperationWithUndoData("share", v, r, k, p)];
        } else {
          var x = [];
          v = {
            projectid : c,
            share_type : "email"
          };
          r = {
            previous_share_type : null,
            previous_last_modified : g,
            previous_last_modified_by : d
          };
          x.push(operations.createOperationWithUndoData("share", v, r, k, p));
          v = this.rawItemSharedInfo.email_shared_info.emails;
          r = 0;
          for (;r < v.length;r++) {
            var u = v[r];
            x.push(operations.createOperationWithUndoData("add_shared_email", {
              projectid : c,
              shared_email : u.email,
              write_permission : u.write_permission,
              access_token : u.access_token,
              send_email_if_new : false
            }, {
              previous_last_modified : g,
              previous_last_modified_by : d
            }, k, p));
            if ("user_id" in u) {
              x.push(operations.createOperationWithUndoData("register_shared_email_user", {
                projectid : c,
                access_token : u.access_token,
                user_id : u.user_id
              }, {
                previous_last_modified : g,
                previous_last_modified_by : d
              }, k, p));
            }
          }
          return x;
        }
      }
    }),
    updateShareDialogIfOpenToProject : function(c) {
      if (!(q === null)) {
        if (!!q.equals(c)) {
          if (!o) {
            a();
          }
        }
      }
    },
    notifyShareOrUnshareCompleteIfNeeded : function(c, g) {
      var d = c.containsOperationType("share");
      var k = c.containsOperationType("unshare");
      if (d || k) {
        if (q !== null) {
          if (g || !q.isValid()) {
            $("#sharePopup").dialog("close");
          } else {
            a();
            if (k) {
              $("#sharePopup").dialog("close");
            }
          }
        }
      }
    }
  };
}();
var exporting = function() {
  function a() {
    var c = $("#exportPopup");
    var g = c.find("form input:radio:checked");
    var d = c.children(".previewWindow");
    d.html("");
    d.removeClass("hasHtml hasText hasOpml");
    if (g.hasClass("htmlButton")) {
      g = f;
      var k = $('<div class="formattedExport">' + g.content + "</div>");
      d.addClass("hasHtml");
    } else {
      if (g.hasClass("textButton")) {
        g = n;
        k = $("<pre />").text(g.content);
        d.addClass("hasText");
      } else {
        if (g.hasClass("opmlButton")) {
          g = l;
          k = $("<pre />").text(g.content);
          d.addClass("hasOpml");
        }
      }
    }
    d.append(k);
    if (q) {
      c.find(".downloadText").show();
    }
    d.focus();
    dom_utils.selectElementText(d.get()[0]);
  }
  function e(c, g, d, k, p, v, r) {
    if (v === undefined) {
      v = false;
    }
    if (r === undefined) {
      r = false;
    }
    if (v) {
      var x = ""
    }
    if (r) {
      var u = ""
    }
    var b = function(s, m, w, t) {
      if (t === undefined) {
        t = true;
      }
      var y = "";
      if (t) {
        var A = new content_text.ContentText(global_project_tree_object.getName(s), false);
        var F = new content_text.ContentText(global_project_tree_object.getNote(s), true);
        var z = global_project_tree_object.isCompleted(s);
        var D = A.getPlainText();
        var E = F.getPlainText();
        var G = A.getHtml();
        var B = F.getHtml();
        if (r) {
          var J = html_utils.xmlEscapeText(A.getText());
          var N = html_utils.xmlEscapeText(F.getText());
        }
        A = "name";
        if (v) {
          if (m > 0) {
            x += w + "- ";
          }
        }
        if (r) {
          u += "<outline ";
        }
        if (z) {
          A += " done";
          if (v) {
            x += "[COMPLETE] ";
          }
          if (r) {
            u += '_complete="true" ';
          }
        }
        z = "";
        if (p && m === g) {
          F = global_project_tree_object.getProjectReference(s).getUniqueIdentifierWithTruncatedProjectIds();
          z += " " + h + '="' + F + '"';
        }
        y += '<span class="' + A + '"' + z + ">" + G + "</span>";
        if (v) {
          x += D + "\n";
          if (m === 0) {
            x += "\n";
          }
        }
        if (r) {
          u += 'text="' + J + '" ';
        }
        if (E != "") {
          y += m > 0 ? "<br />" : "<br /><br />";
          y += '<span class="note">' + B + "</span>";
          if (v) {
            D = m > 0 ? w + "  " : "";
            E = D + '"' + E.replace(/\n/g, "\n" + D) + '"\n';
            x += E;
            if (m === 0) {
              x += "\n";
            }
          }
          if (r) {
            u += '_note="' + N + '" ';
          }
        }
      }
      s = k(s);
      if (s.length > 0) {
        if (r) {
          if (t) {
            u += ">";
          }
        }
        y += "<ul>";
        m = m + 1;
        w = m > 1 ? w + "  " : w;
        N = 0;
        for (;N < s.length;N++) {
          E = b(s[N], m, w);
          y += "<li>" + E + "</li>";
        }
        y += "</ul>";
        if (r) {
          if (t) {
            u += "</outline>";
          }
        }
      } else {
        if (r) {
          if (t) {
            u += "/>";
          }
        }
      }
      return y;
    };
    c = {
      html : b(c, g, "", d)
    };
    if (v) {
      c.text = x;
    }
    if (r) {
      c.opml = u;
    }
    return c;
  }
  function j(c, g) {
    var d = function(u) {
      return global_project_tree_object.getPotentiallyVisibleChildren(u, g);
    };
    var k;
    var p;
    var v;
    if (c.length === 1) {
      var r = c[0];
      r = r.getProjectTreeObject();
      r = e(r, 0, r !== null, d, false, true, true);
      k = r.html;
      p = r.text;
      v = r.opml;
    } else {
      p = v = "";
      k = "<ul>";
      var x = 0;
      for (;x < c.length;x++) {
        r = c[x];
        r = r.getProjectTreeObject();
        r = e(r, 1, true, d, false, true, true);
        k += "<li>" + r.html + "</li>";
        p += r.text;
        v += r.opml;
      }
      k += "</ul>";
    }
    d = '<?xml version="1.0"?><opml version="2.0"><head><ownerEmail>' + html_utils.xmlEscapeText(SETTINGS.email.value) + "</ownerEmail></head><body>" + v + "</body></opml>";
    d = vkbeautify.xml(d, 2);
    return{
      html : k,
      text : p,
      opml : d
    };
  }
  var h = "data-wfid";
  var f = null;
  var n = null;
  var l = null;
  var q = false;
  try {
    q = !!new Blob;
  } catch (o) {
  }
  jQuery.fn.exportIt = function(c) {
    if (c === undefined) {
      c = false;
    }
    var g = [];
    $(this).each(function() {
      var k = $(this);
      g.push(project_tree.getProjectReferenceFromDomProject(k));
    });
    var d = $("#exportPopup");
    d.html($("#exportPopupTemplate").html());
    c = j(g, c);
    f = {
      content : c.html,
      contentType : "text/html",
      fileExtension : "html"
    };
    n = {
      content : c.text,
      contentType : "text/plain",
      fileExtension : "txt"
    };
    l = {
      content : c.opml,
      contentType : "text/xml",
      fileExtension : "opml"
    };
    d.dialog("open");
    d.find(":radio#id_html").attr("checked", true);
    a();
  };
  return{
    init : function() {
      $("#exportPopup").dialog({
        autoOpen : false,
        width : 550,
        buttons : {
          Close : function() {
            $(this).dialog("close");
          }
        },
        modal : false,
        position : ["center", 150],
        title : "Export List",
        close : function() {
          $("#exportPopup").html("");
          f = n = l = null;
        }
      });
      $("#exportPopup form input:radio").live("change", function() {
        a();
      });
      var c = $("#exportPopup .downloadLink");
      c.live("click", function() {
        var g = $("#exportPopup").find("form input:radio:checked");
        var d = null;
        if (g.hasClass("htmlButton")) {
          d = f;
        } else {
          if (g.hasClass("textButton")) {
            d = n;
          } else {
            if (g.hasClass("opmlButton")) {
              d = l;
            }
          }
        }
        if (d !== null) {
          g = d.content;
          if (d.contentType === "text/html") {
            g = '<!doctype html><html><head><meta charset="utf-8"><style>' + $("#formatted_export_css").html() + '</style></head><body class="formattedExport">' + g + "</body></html>";
          }
          if (IS_WINDOWS) {
            g = g.replace(/([^\r]|^)\n/g, "$1\r\n");
          }
          g = new Blob([g], {
            type : d.contentType + ";charset=utf-8"
          });
          saveAs(g, "workflowy-export." + d.fileExtension);
        }
        return false;
      });
      c.live("mousedown", function() {
        return false;
      });
    },
    generateProjectTreeHtmlForCopy : function(c) {
      var g = shouldShowCompletedProjects();
      var d = function(r) {
        if (!global_project_tree_object.isExpandedInDom(r)) {
          return[];
        }
        r = global_project_tree_object.getChildren(r);
        var x = [];
        var u = 0;
        for (;u < r.length;u++) {
          var b = r[u];
          if (global_project_tree_object.isInDom(b) && (g || !global_project_tree_object.isCompleted(b))) {
            x.push(b);
          }
        }
        return x;
      };
      if (c.length === 1 && c.eq(0).is(".selected")) {
        var k = project_tree.getProjectReferenceFromDomProject(c.eq(0)).getProjectTreeObject();
        return e(k, 0, true, d, true).html;
      }
      var p = [];
      c.each(function() {
        var r = $(this);
        p.push(project_tree.getProjectReferenceFromDomProject(r));
      });
      c = "<ul>";
      var v = 0;
      for (;v < p.length;v++) {
        k = p[v].getProjectTreeObject();
        k = e(k, 1, true, d, true).html;
        c += "<li>" + k + "</li>";
      }
      c += "</ul>";
      return c;
    },
    getProjectReferencesFromPasteBucketIfApplicable : function(c) {
      var g = c.children();
      if (g.length === 0) {
        return null;
      }
      var d = function(v) {
        v = v.children(".name");
        if (v.length !== 1) {
          return null;
        }
        v = v.attr(h);
        if (v === undefined) {
          return null;
        }
        return project_tree.getProjectReferenceFromUniqueIdentifierWithTruncatedProjectIds(v);
      };
      g = g.eq(0);
      if (g.is(".name")) {
        var k = d(c);
        return k !== null ? [k] : null;
      }
      if (!g.is("ul")) {
        return null;
      }
      c = [];
      g = g.children("li");
      var p = 0;
      for (;p < g.length;p++) {
        k = g.eq(p);
        k = d(k);
        if (k === null) {
          return null;
        }
        c.push(k);
      }
      return c.length > 0 ? c : null;
    }
  };
}();
var cut_copy_paste = function() {
  function a(m) {
    m = m.split("\n");
    var w = [];
    var t = 0;
    for (;t < m.length;t++) {
      var y = m[t];
      if ($.trim(y).length > 0) {
        w.push(new b(content_text.xmlEscapeTextForContentText(y)));
      }
    }
    return w;
  }
  function e(m) {
    m = m.getLines();
    var w = [];
    var t = 0;
    for (;t < m.length;t++) {
      var y = m[t];
      if ($.trim(y.getPlainText()).length > 0) {
        w.push(new b(y.getText()));
      }
    }
    return w;
  }
  function j(m) {
    function w(y) {
      var A = /^\s*((\*|-)\s+)?([\s\S]*)$/;
      y.forEach(function(F) {
        F.name = A.exec(F.name)[3];
      });
    }
    if (m.length === 0) {
      return m;
    }
    var t = function(y) {
      var A = utils.sortArrayOfNumbers(utils.copyArray(y));
      var F = {};
      var z = -1;
      var D = -1;
      var E = 0;
      for (;E < A.length;E++) {
        var G = A[E];
        if (G !== z) {
          z = G;
          D++;
          F[G] = D;
        }
      }
      y = y.map(function(B) {
        return F[B];
      });
      y[0] = 0;
      return y;
    }(function(y) {
      function A(F) {
        return(F = /^\s+/.exec(F.name)) ? F[0].length : 0;
      }
      counts = [];
      $(y).each(function(F, z) {
        counts.push(A(z));
      });
      return counts;
    }(m));
    if (m.length > 1) {
      w(m);
    }
    return function(y, A) {
      var F = [];
      var z = F;
      var D = 0;
      var E = {
        0 : F
      };
      A.forEach(function(G, B) {
        if (G > D) {
          E[D] = z;
          D += 1;
          newParent = [];
          z.push(newParent);
          z = newParent;
        } else {
          if (G < D) {
            z = E[G];
            D = G;
          }
        }
        z.push(y[B]);
      });
      return F;
    }(m, t);
  }
  function h(m) {
    var w = m;
    if (!l()) {
      m = m.html().replace(/<br>/ig, "\n").replace(/&nbsp;/ig, " ");
      w = $("<div />").html(m);
    }
    return w;
  }
  function f(m, w) {
    function t(E) {
      return E.replace(/\n/g, "").replace(/\t/g, r);
    }
    var y = m.isNote();
    var A = m.getCaret();
    if (y) {
      m.addClass("copyOrPasteInProgress");
    }
    var F = m.getContentCaretOffset();
    var z = $("#cutAndCopyBucket");
    z.show();
    z.offset({
      left : -9999,
      top : F.top
    });
    z.focus();
    var D = content_text.getPlainTextForContent(m);
    F = t(D.substring(0, A.start));
    D = t(D.substring(A.start, A.end));
    F = {
      start : F.length,
      end : F.length + D.length
    };
    D = new content_text.ContentText(m, y);
    D = IS_FIREFOX ? D.getContentHtml() : D.getContentHtmlWithSingleCharFormattingSpans();
    D = D.charAt(D.length - 1) === "\n" ? D.substring(0, D.length - 1) : D;
    D = q(D);
    z.html(D);
    z.setCaret(F.start, F.end);
    setTimeout(function() {
      dom_utils.clearSelection();
      z.html("");
      z.removeAttr("style");
      w(A);
      if (y) {
        m.removeClass("copyOrPasteInProgress");
      }
    }, 0);
  }
  function n(m) {
    var w = m.isNote();
    var t = m.getCaret();
    var y = new content_text.ContentText(m, w);
    if (y.containsFormatting()) {
      m.setContentHtml(y.getContentHtmlWithSingleCharFormattingSpans());
      m.setCaret(t.start, t.end);
      setTimeout(function() {
        var A = m.getCaret();
        var F = new content_text.ContentText(m, w);
        m.setContentHtml(F.getContentHtml());
        m.setCaret(A.start, A.end);
      }, 0);
    }
  }
  function l() {
    return!IS_FIREFOX && (!IS_IOS && !IS_IE);
  }
  function q(m) {
    return m.replace(/\n/g, "<br>").replace(/\t/g, r).replace(/  /g, "&nbsp; ");
  }
  function o(m) {
    if (window.DOMParser === undefined) {
      return null;
    }
    m = m.replace(RegExp(String.fromCharCode(160), "g"), " ");
    var w = new DOMParser;
    try {
      var t = w.parseFromString(m, "text/xml");
    } catch (y) {
      return null;
    }
    m = $(t).children("opml");
    if (m.length !== 1) {
      return null;
    }
    m = m.children("body");
    if (m.length !== 1) {
      return null;
    }
    return c(m);
  }
  function c(m) {
    var w = [];
    m.children("outline").each(function() {
      var t = $(this);
      var y = t.attr("text") || null;
      var A = t.attr("_note") || null;
      var F = t.attr("_complete") === "true" ? true : null;
      var z = t.attr("type") || null;
      if (z !== null) {
        z = z.toLowerCase();
      }
      var D = null;
      if (z === "link") {
        D = t.attr("url") || null;
      }
      y = y !== null ? g(y, false) : "";
      if (A !== null) {
        A = g(A, true);
      }
      if (D !== null) {
        y += content_text.xmlEscapeTextForContentText(" <" + D + ">");
      }
      w.push(new b(y, A, F, true));
      t = c(t);
      if (t.length > 0) {
        w.push(t);
      }
    });
    return w;
  }
  function g(m, w) {
    var t = new content_text.ContentText(m, w);
    if (t.requiredParse() && t.failedParse()) {
      t = content_text.xmlEscapeTextForContentText(m);
      t = new content_text.ContentText(t, w);
    }
    return t.getText();
  }
  function d(m) {
    var w = [];
    var t = function(D, E, G) {
      if (D === undefined) {
        D = null;
      }
      if (E === undefined) {
        E = null;
      }
      if (G === undefined) {
        G = null;
      }
      var B = {};
      if (D !== null) {
        project_tree_object.setName(B, D);
      }
      if (E !== null) {
        project_tree_object.setNote(B, E);
      }
      if (G !== null) {
        project_tree_object.setCompleted(B, G);
      }
      w.push(B);
    };
    var y = 0;
    for (;y < m.length;y++) {
      var A = m[y];
      if (A instanceof b) {
        var F = A.fromOpml ? A.name : $.trim(A.name);
        t(F, A.note, A.isComplete);
      } else {
        A = A;
        if (w.length === 0) {
          t();
        }
        A = d(A);
        F = w[w.length - 1];
        var z = project_tree_object.getChildren(F) || [];
        project_tree_object.setChildren(F, z.concat(A));
        F.expanded = true;
      }
    }
    return w;
  }
  function k(m) {
    var w = 0;
    var t = 0;
    for (;t < m.length;t++) {
      var y = m[t];
      if (y instanceof b) {
        w++;
      } else {
        w += k(y);
      }
    }
    return w;
  }
  function p() {
    ui_sugar.showAlertDialog("Pasting more than " + u + " items at a time is not supported.", "Error");
  }
  var v = /^\s*(<\?\s*xml[^?]*\?>)?\s*<\s*opml[\s\S]*<\/\s*opml\s*>\s*$/i;
  var r = "    ";
  var x = 0;
  var u = 2E3;
  var b = Class.extend({
    init : function(m, w, t, y) {
      if (w === undefined) {
        w = null;
      }
      if (t === undefined) {
        t = null;
      }
      if (y === undefined) {
        y = false;
      }
      this.name = m;
      this.note = w;
      this.isComplete = t;
      this.fromOpml = y;
    }
  });
  jQuery.fn.getInnerLines = function(m) {
    if (m === undefined) {
      m = true;
    }
    var w = false;
    var t = $(this);
    var arr = [];
    for (;;) {
      var A = t.find("ul, ol, li").first();
      if (A.length === 1) {
        w = true;
        var F = document.createRange();
        F.setStart(t.get(0), 0);
        F.setEndBefore(A.get(0));
        if (!F.collapsed) {
          var z;
          z = F.cloneContents();
          var D = new content_text.ContentText($(z), false);
          if (D.containsFormatting()) {
            if (!l()) {
              D = document.createElement("div");
              D.appendChild(z);
              z = h($(D));
              D = new content_text.ContentText(z, false);
            }
            z = e(D);
            if (!F.collapsed) {
              F.deleteContents();
            }
          } else {
            z = window.getSelection();
            z.removeAllRanges();
            z.addRange(F);
            F = z.toString();
            if (!z.isCollapsed) {
              z.deleteFromDocument();
            }
            z.removeAllRanges();
            if (!l()) {
              F = F.replace(/&nbsp;/ig, " ");
            }
            z = a(F);
          }
          arr = arr.concat(z);
        }
        F = A.is("li");
        z = A.getInnerLines(false);
        if (m || F) {
          arr = arr.concat(z);
        } else {
          if (arr.length > 0 && !(arr[arr.length - 1] instanceof b)) {
            arr[arr.length - 1] = arr[arr.length - 1].concat(z);
          } else {
            arr.push(z);
          }
        }
        A.remove();
      } else {
        var classSelector = content_text.getContentClassesSelector();
        if (t.find(classSelector).length > 0) {
          // if bold, italic, underline
          t = h(t);
          t = e(new content_text.ContentText(t, false));
        } else {
          t = s.isWordPaste(t[0]) ? s.reformatWordPaste(t[0]) : dom_utils.getFormattedElementText(t[0]);
          if (!l()) {
            t = t.replace(/\u00A0/g, " ");
          }
          t = a(t);
        }
        arr = arr.concat(t);
        if (m && !w) {
          arr = j(arr);
        }
        break;
      }
    }
    return arr;
  };
  var s = {
    isWordPaste : function(m) {
      return/<o:p>|MsoList|mso-list/i.test($(m).html()) && this.getLines(m).length > 0;
    },
    reformatWordPaste : function(m) {
      var w = [];
      this.getLines(m).each(function(t, y) {
        y = $(y);
        lineText = s.getLineText(y);
        lineIndentation = s.getLineIndentation(y);
        t = 1;
        for (;t < lineIndentation;t++) {
          lineText = " " + lineText;
        }
        w.push(lineText);
      });
      return w.join("\n");
    },
    getLines : function(m) {
      return $(m).find("p, h1, h2, h3, h4, h5, h6");
    },
    getLineText : function(m) {
      var w = m.text().replace(/\n/g, " ");
      if (s.isVisuallyStyledLine(m)) {
        w = w.match(/\s*\S*\s*(.*)/)[1];
      }
      return w;
    },
    getLineIndentation : function(m) {
      var w = /h(\d)/i;
      var t = /MsoHeading(\d+)/i;
      var y = 1;
      if (s.isVisuallyStyledLine(m)) {
        y = m.attr("style").match(s.STYLED_LINE_REGEX)[1];
      } else {
        if (w.test(m.attr("tagName"))) {
          y = m.attr("tagName").match(w)[1];
        } else {
          if (t.test(m.attr("class"))) {
            y = m.attr("class").match(t)[1];
          }
        }
      }
      return parseInt(y, 10);
    },
    isVisuallyStyledLine : function(m) {
      return(m = m.attr("style")) && s.STYLED_LINE_REGEX.test(m);
    },
    STYLED_LINE_REGEX : /mso-list:.*level(\d+)/
  };
  jQuery.fn.handleCutInContent = function() {
    var m = $(this);
    if (l) {
      if (IS_FIREFOX) {
        setTimeout(function() {
          m.updateContentHtmlAfterUserEdit();
        }, 0);
      } else {
        n(m);
      }
    } else {
      var w = m.isNote();
      f(m, function(t) {
        var y = new content_text.ContentText(m, w);
        y = y.substring(0, t.start).concatenate(y.substring(t.end));
        m.setContentTextAsUserEdit(y.getText(), w);
        m.setCaret(t.start, t.start, "doNotScrollIfOnScreen");
      });
    }
  };
  jQuery.fn.handleCopyInContent = function() {
    var m = $(this);
    if (l()) {
      if (!IS_FIREFOX) {
        n(m);
      }
    } else {
      f(m, function(w) {
        m.setCaret(w.start, w.end, "doNotScrollIfOnScreen");
      });
    }
  };
  jQuery.fn.handlePasteIntoContent = function(m, w) {
    if (w === undefined) {
      w = false;
    }
    var $this = $(this);
    var isNote = $this.isNote();
    var project = $this.getProject();
    var isReadOnly = project_tree.getProjectReferenceFromDomProject(project).isReadOnly();
    if (isReadOnly && isNote) {
      return false;
    }
    project = getCurrentlyFocusedContent();
    if (!(project === null || project[0] !== $this[0])) {
      x++;
      var count = x;
      if (IS_IE && w) {
        if (isReadOnly) {
          return false;
        }
        setTimeout(function() {
          $this.handleDirectPasteIntoContent();
        }, 1);
      } else {
        if (isNote) {
          $this.addClass("copyOrPasteInProgress");
        }
        var caret = $this.getCaret();
        var viewState = undo_redo.saveClientViewStateForUndoRedo();
        project = $this.getContentCaretOffset();
        var pasteBucket = $("#pasteBucket");
        pasteBucket.html("");
        pasteBucket.show();
        pasteBucket.offset({
          left : -9999,
          top : project.top
        });
        pasteBucket.focus();
        var ticker = null;
        var complete = function() {
          if (document.activeElement === pasteBucket[0]) {
            pasteBucket.blur();
          }
          pasteBucket.html("");
          pasteBucket.removeAttr("style");
          $("#pasteBucketSelectableCSS").html("");
          if (isNote) {
            $this.removeClass("copyOrPasteInProgress");
          }
        };
        var pasteHandler = function() {
          if (ticker !== null) {
            clearTimeout(ticker);
          }
          if (count === x) {
            setTimeout(function() {
              $("#pasteBucketSelectableCSS").html("#pasteBucket * { -moz-user-select: text !important; -webkit-user-select: text !important; -ms-user-select: text !important; -user-select: text !important; }");
              if (isNote) {
                if (pasteBucket.find(content_text.getContentClassesSelector()).length > 0) {
                  var text = h(pasteBucket);
                  text = new content_text.ContentText(text, true);
                } else {
                  text = content_text.createContentTextContainerFromPlainText(dom_utils.getFormattedElementText(pasteBucket[0]), true);
                }
                $this.handlePasteIntoNote(text, caret, viewState);
                complete();
              } else {
                text = exporting.getProjectReferencesFromPasteBucketIfApplicable(pasteBucket);
                if (text !== null) {
                  complete();
                  if (!$this.handleItemSelectionPasteIntoName(text, viewState, caret.start === 0 && caret.start === caret.end)) {
                    $this.setCaret(caret.start, caret.end);
                  }
                } else {
                  if (isReadOnly) {
                    complete();
                    $this.setCaret(caret.start, caret.end);
                  } else {
                    text = pasteBucket.text();
                    var fret = null;
                    if (text.match(v) !== null) {
                      fret = o(text);
                    }
                    if (fret === null) {
                      fret = pasteBucket.getInnerLines();
                    }
                    complete();
                    $this.handlePasteIntoName(fret, caret, viewState);
                  }
                }
              }
            }, 1);
          }
        };
        if (w) {
          pasteHandler();
        } else {
          $("body").one("paste", function() {
            pasteHandler();
          });
          ticker = setTimeout(function() {
            complete();
          }, 1E3);
        }
      }
    }
  };
  jQuery.fn.handlePasteIntoName = function(m, w, t) {
    var y = $(this);
    if (k(m) > u) {
      p();
    } else {
      var A = new content_text.ContentText(y, false);
      var F = A.substring(0, w.start);
      var z = A.substring(w.end);
      A = function(N) {
        undo_redo.startOperationBatch(true, t);
        N = new content_text.ContentText(N.name, false);
        var T = F.concatenate(N).concatenate(z);
        y.setAndSaveContentText(T.getText());
        N = w.start + N.getPlainText().length;
        y.setCaret(N, N, "doNotScrollIfOnScreen");
        undo_redo.finishOperationBatch();
      };
      if (m.length === 0) {
        A(new b(""));
      } else {
        var D = m[0] instanceof b && (m[0].note === null && m[0].isComplete !== true);
        if (m.length === 1 && D) {
          A(m[0]);
        } else {
          undo_redo.startOperationBatch(true, t);
          A = y.getProject();
          D = project_tree.getProjectReferenceFromDomProject(A);
          var E = (new content_text.ContentText(A.getNotes().children(".content"), true)).isEmpty() && A.is(".task");
          var G = A.is(".selected");
          if (!G && E) {
            E = m[0];
            var B = F;
            if (E instanceof b) {
              B = B.concatenate(new content_text.ContentText(E.name.replace(/\s*$/, ""), false));
              if (E.note !== null) {
                D.applyLocalEdit(null, E.note);
              }
              if (E.isComplete === true) {
                D.applyLocalComplete();
              }
              m.shift();
            }
            y.setAndSaveContentText(B.getText());
            E = z.getText();
            if ($.trim(E).length > 0) {
              m.push(new b(E));
            }
          }
          if (G) {
            G = m;
            E = [];
          } else {
            E = 0;
            for (;E < m.length && !(m[E] instanceof b);) {
              E++;
            }
            B = m.slice(0, E);
            G = [];
            var J = 0;
            for (;J < B.length;J++) {
              G = G.concat(B[J]);
            }
            E = m.slice(E);
          }
          m = d(G);
          G = d(E);
          B = A.getParent();
          E = A.getPriority();
          B = project_tree.getProjectReferenceFromDomProject(B);
          J = null;
          if (m.length > 0) {
            if (!A.is("open")) {
              A.showChildren("instant").setExpanded(true);
            }
            D = D.applyLocalBulkCreateChildren(0, m);
            J = D[D.length - 1];
          }
          if (G.length > 0) {
            D = B.applyLocalBulkCreateChildren(E + 1, G);
            J = D[D.length - 1];
          }
          if (J !== null) {
            A = J.getMatchingDomProject();
            D = A.find(NAVIGABLE_PROJECTS_PATTERN + ":last");
            (D.length === 1 ? D : A).getName().moveCursorToEnd();
          } else {
            A.getName().moveCursorToEnd();
          }
          undo_redo.finishOperationBatch();
        }
      }
    }
  };
  jQuery.fn.handleItemSelectionPasteIntoName = function(m, w, t) {
    var y = $(this).getProject();
    var A = project_tree.getProjectReferenceFromDomProject(y);
    if (A.isInReadOnlyTree()) {
      return false;
    }
    var F = false;
    var z = y.hasClass("selected");
    var D = y.projectIsEmpty();
    if (t && (!z && !D)) {
      z = y.getParent();
      t = y;
      A = y.getPriority();
    } else {
      if ((y.hasClass("open") || z) && !A.childrenAreInReadOnlyTree()) {
        z = y;
        t = y.getFirstVisibleChildOrChildrenEnd();
        A = 0;
      } else {
        if (z) {
          return false;
        }
        z = y.getParent();
        t = y.getNextSibling(true);
        A = y.getPriority();
        if (D) {
          F = true;
          A = A;
        } else {
          A = A + 1;
        }
      }
    }
    var E = project_tree.getProjectReferenceFromDomProject(z);
    D = [];
    z = [];
    var G = 0;
    var B = 0;
    for (;B < m.length;B++) {
      var J = m[B];
      var N = !J.isValid();
      if (!N || !J.isValidMove(t, true)) {
        var T = J.duplicateProjectTreeForBulkCreate(false, N);
        var V = T.projectTreeRoot;
        G += T.size;
        if (z.length > 0 && z[z.length - 1].type === "bulk_create") {
          z[z.length - 1].projectTrees.push(V);
        } else {
          z.push({
            type : "bulk_create",
            projectTrees : [V]
          });
        }
        if (N) {
          D.push(J);
        }
      } else {
        z.push({
          type : "undelete",
          projectReference : J
        });
      }
    }
    if (G > u) {
      p();
      return false;
    }
    undo_redo.startOperationBatch(true, w);
    var X = null;
    var ea = false;
    var I = A;
    z.forEach(function(L) {
      switch(L.type) {
        case "bulk_create":
          L = L.projectTrees;
          var M = E.applyLocalBulkCreateChildren(I, L);
          X = M[M.length - 1];
          I += L.length;
          break;
        case "undelete":
          L.projectReference.applyLocalUndelete(E, I);
          ea = true;
          X = J;
          I++;
      }
    });
    if (F) {
      y.deleteIt(true);
    }
    m = X.getMatchingDomProject();
    w = m.find(NAVIGABLE_PROJECTS_PATTERN + ":last");
    (w.length === 1 ? w : m).getName().moveCursorToEnd();
    undo_redo.finishOperationBatch();
    if (D.length > 0) {
      hideMessage(true);
      showMessage("<strong>WARNING</strong>: You just pasted deleted (probably cut) item(s) into a place where they can't be moved. Instead of moving them to the new location, they were copied (and if they were shared or embedded, the new copies are not). If you didn't intend this, please undo the paste and the cut.");
    } else {
      if (ea) {
        if (undeleteMessageIsVisible(true)) {
          hideMessage();
        }
      }
    }
    return true;
  };
  jQuery.fn.handlePasteIntoNote = function(m, w, t) {
    var y = $(this);
    var A = new content_text.ContentText(y, true);
    A = A.substring(0, w.start).concatenate(m).concatenate(A.substring(w.end));
    undo_redo.startOperationBatch(true, t);
    y.setAndSaveContentText(A.getText());
    m = w.start + m.getPlainText().length;
    y.setCaret(m, m, "doNotScrollIfOnScreen");
    undo_redo.finishOperationBatch();
  };
  jQuery.fn.handleDirectPasteIntoContent = function() {
    var m = $(this);
    var w = m.getProject();
    var t = dom_utils.getFormattedElementText(m[0]);
    if (m.isNote()) {
      w = content_text.createContentTextContainerFromPlainText(t, true);
      undo_redo.startOperationBatch(true);
      m.setAndSaveContentText(w.getText());
      undo_redo.finishOperationBatch();
    } else {
      t = a(t);
      if (!(t.length <= 1)) {
        undo_redo.startOperationBatch(true);
        var y = new content_text.ContentText(t[0].name.replace(/\s*$/, ""), false);
        m.setAndSaveContentText(y.getText());
        t.shift();
        m = d(t);
        if (w.is(".selected")) {
          t = w;
          w = 0;
        } else {
          t = w.getParent();
          w = w.getPriority() + 1;
        }
        w = project_tree.getProjectReferenceFromDomProject(t).applyLocalBulkCreateChildren(w, m);
        w = w[w.length - 1].getMatchingDomProject();
        m = w.find(NAVIGABLE_PROJECTS_PATTERN + ":last");
        (m.length === 1 ? m : w).getName().moveCursorToEnd();
        undo_redo.finishOperationBatch();
      }
    }
  };
  return{
    handleCopyOfSelectedItems : function(m, w) {
      if (w === undefined) {
        w = null;
      }
      var t = $("#cutAndCopyBucket");
      t.show();
      t.offset({
        left : -9999,
        top : $(document).scrollTop() + $(window).height() / 2
      });
      t.focus();
      var y = exporting.generateProjectTreeHtmlForCopy(m);
      if (!l()) {
        y = q(y);
      }
      t.html(y);
      dom_utils.selectElementText(t[0]);
      setTimeout(function() {
        dom_utils.clearSelection();
        t.blur();
        t.html("");
        t.removeAttr("style");
        item_select.blurAndClearTextSelection();
        if (w !== null) {
          w();
        }
      }, 0);
    }
  };
}();
var item_select = function() {
  function a() {
    var t = u.getClientY() + $(document).scrollTop();
    var y = r.getRangesBetweenPositionAndStartInclusive(t);
    var A = {};
    var F = [];
    t = [];
    var z = 0;
    for (;z < y.length;z++) {
      var D = y[z];
      var E = D.getProjectReference();
      A[E.getUniqueIdentifier()] = true;
      if (!(E.getParent().getUniqueIdentifier() in A)) {
        var G = D.getElement();
        F.push(G[0]);
        t.push(new w(E, D.getCreationTimestamp()));
      }
    }
    y = $().add(F);
    y.not(b).addClass("addedToSelection");
    b.not(y).removeClass("addedToSelection");
    if (b.length === 0 && y.length > 0) {
      ui_sugar.makeSelectionInvisible();
      x = new scrolling.VerticalScroller(function() {
        return u;
      }, a);
    } else {
      if (b.length > 0) {
        if (y.length === 0) {
          ui_sugar.makeSelectionVisible();
        }
      }
      if (x !== null) {
        x.startOrStopScrollingIfNeeded();
      }
    }
    b = y;
    s = t;
  }
  function e(t) {
    if (t === undefined) {
      t = false;
    }
    $(window).unbind(".itemSelect");
    if (v) {
      if (READ_ONLY_MAIN_TREE) {
        var y = window.getSelection();
        var A = null;
        if (document.activeElement === p[0] && dom_utils.elementContainsSelection(p[0])) {
          A = y.getRangeAt(0);
          p.blur();
        }
        p.removeAttr("contenteditable");
        if (A !== null) {
          y.removeAllRanges();
          y.addRange(A);
        }
      }
      if (t) {
        n();
      }
      if (x !== null) {
        x.stopScrollingIfStarted();
      }
      ui_sugar.clearPageCursor();
      ui_sugar.makeSelectionVisible();
      u = x = r = null;
      DRAG_MODE = v = false;
      if (f().length > 0) {
        g();
      }
      j();
    }
    p = k = null;
  }
  function j() {
    var t = $("#itemSelectionControls");
    var y = f();
    var A = y.first();
    if (y.length === 0 || y.length === 1 && (!A.is(".selected") && !A.is(".open"))) {
      $("#hidden").append(t);
    } else {
      selectOnActivePage(".widgetContainer").append(t);
      var F = y.add(y.find(NAVIGABLE_PROJECTS_PATTERN));
      if (F.not(".done").length > 0) {
        t.removeClass("allProjectsDone");
      } else {
        t.addClass("allProjectsDone");
      }
      if (h(y)) {
        t.addClass("readOnly");
      } else {
        t.removeClass("readOnly");
      }
      t.find(".numSelectedItemsValue").text(String(F.length));
      F = A.offset();
      y = F.top;
      A = Math.round(F.left + A.outerWidth() - t.outerWidth());
      t.offset({
        top : y,
        left : A
      });
    }
  }
  function h(t) {
    if (READ_ONLY_MAIN_TREE) {
      return true;
    }
    var y = false;
    t.each(function() {
      var A = $(this);
      if (!project_tree.getProjectReferenceFromDomProject(A).isReadOnly()) {
        y = true;
        return false;
      }
    });
    return!y;
  }
  function f(t) {
    if (t === undefined) {
      t = false;
    }
    if (b.length === 0) {
      return b;
    }
    var y = b.filter(GLOBAL_NAVIGABLE_PROJECTS_PATTERN);
    if (t) {
      b.removeClass("addedToSelection");
      b = $();
      s = [];
      j();
      if (IS_FIREFOX || (IS_SAFARI || IS_IE)) {
        $("#cutAndCopyDetectionContainer").removeAttr("style");
      }
    }
    return y;
  }
  function n() {
    return f(true);
  }
  function l() {
    if (b.length === 0) {
      return null;
    }
    var t = utils.copyArray(s).sort(function(F, z) {
      return z.getAddedToSelectionTimestamp() - F.getAddedToSelectionTimestamp();
    });
    var y = 0;
    for (;y < t.length;y++) {
      var A = t[y].getProjectReference().getMatchingDomProject();
      if (A.length === 1 && A.is(GLOBAL_NAVIGABLE_PROJECTS_PATTERN)) {
        return A;
      }
    }
    return null;
  }
  function q(t) {
    var y = 0;
    for (;y < t.length;y++) {
      var A = b.index(t[y]);
      s[A].updateAddedToSelectionTimestamp(date_time.getStrictlyIncreasingCurrentTimeInMS());
    }
  }
  function o(t) {
    var y = c();
    if (y !== null) {
      y.addToItemSelection(true);
      var A = b.index(y);
      A = s[A];
      var F = A.getLastShiftClickSelectedProjectReferences();
      if (F !== null) {
        var z = 0;
        for (;z < F.length;z++) {
          var D = F[z].getMatchingDomProject();
          if (D.length === 1) {
            D.removeFromItemSelection(true);
          }
        }
      }
      F = function(E, G, B) {
        var J = [];
        G = G;
        for (;;) {
          var N = G;
          G = B === "down" ? G.getNextProject(true) : G.getPreviousProject();
          if (G[0] === N[0]) {
            break;
          }
          N = G[0] === E[0];
          var T = !N && E.add(G).first()[0] === E[0];
          if (B === "down" && T || B === "up" && (!N && !T)) {
            break;
          }
          G.addToItemSelection(true);
          J.push(project_tree.getProjectReferenceFromDomProject(G));
          if (N) {
            break;
          }
        }
        return J;
      };
      z = t.add(y);
      if (z.length > 1) {
        t = z.eq(0).filter(y).length === 1 ? F(t, y, "down") : F(t, y, "up");
        A.updateLastShiftClickPivotTimestamp(date_time.getCurrentTimeInMS(), t);
      }
      j();
    }
  }
  function c() {
    if (b.length === 0) {
      var t = getCurrentlyFocusedContent();
      if (t !== null) {
        return t.getProject();
      } else {
        t = selectOnActivePage(".selected").getVisibleChildren().first();
        return t.length === 1 ? t : null;
      }
    }
    t = utils.copyArray(s).sort(function(F, z) {
      return z.getLastShiftClickPivotTimestamp() - F.getLastShiftClickPivotTimestamp();
    });
    var y = 0;
    for (;y < t.length;y++) {
      var A = t[y];
      if (A.getLastShiftClickPivotTimestamp() === 0) {
        break;
      }
      A = A.getProjectReference().getMatchingDomProject();
      if (A.length === 1 && A.is(GLOBAL_NAVIGABLE_PROJECTS_PATTERN)) {
        return A;
      }
    }
    return l();
  }
  function g() {
    if (READ_ONLY_MAIN_TREE) {
      dom_utils.clearSelection();
    } else {
      var t = getCurrentlyFocusedContentOrInput();
      if (t !== null) {
        dom_utils.clearSelection();
        t.blur();
      }
    }
    d();
  }
  function d() {
    if (IS_FIREFOX || (IS_SAFARI || IS_IE)) {
      var t = $("#cutAndCopyDetectionContainer");
      t.show();
      t.text(".");
      dom_utils.selectElementText(t[0]);
    }
  }
  var k = null;
  var p = null;
  var v = false;
  var r = null;
  var x = null;
  var u = null;
  var b = $();
  var s = [];
  var m = null;
  var w = Class.extend({
    init : function(t, y, A) {
      if (A === undefined) {
        A = null;
      }
      this._projectReference = t;
      this._addedToSelectionTimestamp = y;
      this._lastShiftClickPivotTimestamp = 0;
      this._lastShiftClickSelectedProjectReferences = null;
      this._selectedProjectsSubsumedMetaDatas = A;
    },
    getProjectReference : function() {
      return this._projectReference;
    },
    getAddedToSelectionTimestamp : function() {
      return this._addedToSelectionTimestamp;
    },
    updateAddedToSelectionTimestamp : function(t) {
      this._addedToSelectionTimestamp = t;
    },
    getLastShiftClickPivotTimestamp : function() {
      return this._lastShiftClickPivotTimestamp;
    },
    updateLastShiftClickPivotTimestamp : function(t, y) {
      this._lastShiftClickPivotTimestamp = t;
      this._lastShiftClickSelectedProjectReferences = y;
      var A = 0;
      for (;A < s.length;A++) {
        var F = s[A];
        if (F !== this) {
          F.__lastShiftClickSelectedProjectReferences = null;
        }
      }
    },
    getLastShiftClickSelectedProjectReferences : function() {
      return this._lastShiftClickSelectedProjectReferences;
    },
    getSelectedProjectsSubsumedMetaDatas : function() {
      return this._selectedProjectsSubsumedMetaDatas;
    }
  });
  jQuery.fn.isItemSelected = function() {
    return $(this).hasClass("addedToSelection");
  };
  jQuery.fn.getItemSelectedContainer = function() {
    var t = $(this);
    if (b.length === 0) {
      return null;
    }
    t = t.closest(".project.addedToSelection");
    return t.length > 0 ? t : null;
  };
  jQuery.fn.isContainedWithinItemSelection = function() {
    return $(this).getItemSelectedContainer() !== null;
  };
  jQuery.fn.addToItemSelection = function(t, y) {
    if (t === undefined) {
      t = false;
    }
    if (y === undefined) {
      y = null;
    }
    $(this).each(function(A) {
      var F = $(this);
      var z = b.index(F);
      if (z === -1) {
        if (F.closest(".project.addedToSelection").length === 0) {
          F.addClass("addedToSelection");
          z = F.find(".project.addedToSelection");
          if (y !== null) {
            A = y[A];
          } else {
            if (z.length > 0) {
              var D = [];
              z.each(function() {
                var E = $(this);
                E = b.index(E);
                D.push(s[E]);
              });
            } else {
              D = null;
            }
            A = project_tree.getProjectReferenceFromDomProject(F);
            A = new w(A, date_time.getStrictlyIncreasingCurrentTimeInMS(), D);
          }
          z.removeFromItemSelection(true);
          b = b.add(F);
          z = b.index(F);
          s.splice(z, 0, A);
        }
      }
    });
    if (!t) {
      j();
    }
    return this;
  };
  jQuery.fn.removeFromItemSelection = function(t, y) {
    if (t === undefined) {
      t = false;
    }
    if (y === undefined) {
      y = false;
    }
    $(this).each(function() {
      var A = $(this);
      var F = b.index(A);
      if (F !== -1) {
        A.removeClass("addedToSelection");
        b.splice(F, 1);
        A = s.splice(F, 1)[0];
        if (y) {
          A = A.getSelectedProjectsSubsumedMetaDatas();
          if (A !== null) {
            F = 0;
            for (;F < A.length;F++) {
              var z = A[F];
              var D = z.getProjectReference().getMatchingDomProject();
              if (D.length === 1) {
                D.addToItemSelection(true, [z]);
              }
            }
          }
        }
      }
    });
    if (!t) {
      j();
    }
    return this;
  };
  return{
    init : function() {
      if (!IS_MOBILE) {
        $(GLOBAL_NAVIGABLE_PROJECTS_PATTERN + " > .name > .content").live("mousedown", function(t) {
          var y = $(this);
          var A = y.getProject();
          if (!(!IS_CHROME_OS && (t.button === 0 && t.ctrlKey))) {
            var F = IS_CHROME_OS ? t.ctrlKey : t.metaKey || t.altKey;
            if (t.button === 0 && F) {
              if (A.isContainedWithinItemSelection()) {
                if (A.isItemSelected()) {
                  A.removeFromItemSelection();
                } else {
                  A.closest(".project.addedToSelection").removeFromItemSelection();
                }
              } else {
                A.addToItemSelection();
                y = b.index(A);
                s[y].updateLastShiftClickPivotTimestamp(date_time.getCurrentTimeInMS(), null);
              }
              g();
              t.preventDefault();
            } else {
              if (t.button === 0 && t.shiftKey) {
                F = getCurrentlyFocusedContent();
                if (!(F !== null && F[0] === y[0])) {
                  o(A);
                  g();
                  t.preventDefault();
                }
              } else {
                if (!IS_FIREFOX && (t.button === 2 && A.isContainedWithinItemSelection())) {
                  m = y;
                  dom_utils.executeASAP(function() {
                    g();
                  });
                } else {
                  if (t.button === 0) {
                    k = project_tree.getProjectReferenceFromDomProject(A);
                    p = y;
                    $(window).bind("mousemove.itemSelect", function(z) {
                      if (!v) {
                        if (READ_ONLY_MAIN_TREE) {
                          p.attr("contenteditable", "true");
                        }
                        n();
                        hideControls();
                        r = new ranges.VerticalRangeFinder(k);
                        ui_sugar.setPageCursor("text");
                        DRAG_MODE = v = true;
                      }
                      u = scrolling.createMoveEventDataFromMouseOrTouchMoveEvent(z);
                      a();
                    }).bind("mouseup.itemSelect", function() {
                      e();
                    }).bind("drag.itemSelect", function() {
                      e(true);
                    });
                  }
                }
              }
            }
          }
        });
        $("#documentView").bind("mousedown", function(t) {
          if (b.length !== 0) {
            if (t.button === 0) {
              if (!(t.metaKey || (t.altKey || (t.ctrlKey || t.shiftKey)))) {
                t = $(t.target);
                if (!(t.closest("#itemSelectionControls").length === 1)) {
                  if (!(t.is(".bullet") && t.getProject().isContainedWithinItemSelection())) {
                    n();
                  }
                }
              }
            }
          }
        });
        $("#itemSelectionControls > .complete").click(function() {
          completeItemSelectedProjects();
        }).mousedown(function() {
          var t = getItemSelectionProjectsToComplete().not(".done");
          t.addClass("doneAppearance");
          $(window).bind("mouseup.itemSelectionCompleteButton", function() {
            t.removeClass("doneAppearance");
          }).bind("drag.itemSelectionCompleteButton", function() {
            t.removeClass("doneAppearance");
          });
        });
        $("#itemSelectionControls > .delete").click(function() {
          deleteItemSelectedProjects();
        });
        $("#cutAndCopyDetectionContainer").bind("keydown", function(t) {
          if (!t.ctrlKey) {
            if (!t.metaKey) {
              t.preventDefault();
            }
          }
        }).bind("paste", function() {
          return false;
        });
      }
    },
    isDragSelecting : function() {
      return v;
    },
    getSelectedItems : f,
    getMostRecentlySelectedItem : l,
    clearItemSelection : n,
    saveSelectionState : function() {
      return s;
    },
    restoreSelectionState : function(t) {
      if (k !== null) {
        if (k.getMatchingDomProject().length !== 1) {
          e(true);
        } else {
          if (v) {
            r = new ranges.VerticalRangeFinder(k);
            a();
          }
        }
      } else {
        n();
        if (t.length !== 0) {
          if (getCurrentlyFocusedContentOrInput() === null) {
            var y = $();
            var A = {};
            var F = 0;
            for (;F < t.length;F++) {
              var z = t[F];
              var D = z.getProjectReference().getMatchingDomProject();
              if (D.length === 1) {
                y = y.add(D);
                D.addClass("addedToSelection");
                A[z.getProjectReference().getUniqueIdentifier()] = z;
              }
            }
            var E = [];
            y.each(function() {
              var G = $(this);
              G = project_tree.getProjectReferenceFromDomProject(G);
              G = A[G.getUniqueIdentifier()];
              E.push(G);
            });
            b = y;
            s = E;
            y.find(".project.addedToSelection").removeFromItemSelection(true);
            if (b.length > 0) {
              b.scrollToBeOnScreen("none");
              d();
            }
            j();
          }
        }
      }
    },
    itemSelectAll : function() {
      var t = selectOnActivePage(".selected");
      if (t.is(NAVIGABLE_PROJECTS_PATTERN)) {
        t.addToItemSelection();
      } else {
        t.getVisibleChildren().addToItemSelection();
      }
      g();
    },
    expandItemSelectionUpOrDown : function(t) {
      var y = l();
      if (y !== null) {
        var A = s[b.index(y)].getSelectedProjectsSubsumedMetaDatas();
        if (t === "down" && A !== null) {
          y.removeFromItemSelection(false, true);
        } else {
          A = function(D, E) {
            var G;
            if (E === "up") {
              G = D.getPreviousProject();
              if (G.filter(D).length !== 0) {
                return null;
              }
              G = G.closest(".project.addedToSelection");
              if (G.length === 0) {
                G = D.getPreviousProject(false, true);
              }
            } else {
              G = D.getNextProject(true);
              if (G.filter(D).length !== 0) {
                return null;
              }
            }
            return G;
          };
          var F = A(y, t);
          if (F !== null) {
            if (F.isItemSelected()) {
              y.removeFromItemSelection();
            } else {
              F.addToItemSelection();
              y = [];
              var z = F;
              for (;;) {
                z = A(z, t);
                if (z === null || !z.isItemSelected()) {
                  break;
                }
                y.push(z);
                z = z;
              }
              q(y);
            }
            F.scrollToBeOnScreen(t);
          }
        }
      }
    },
    startItemSelectionWithProject : function(t, y) {
      g();
      t.addToItemSelection();
      t.scrollToBeOnScreen(y);
    },
    notifyContentFocused : function(t) {
      var y = m;
      m = null;
      if (b.length !== 0) {
        if (!(y !== null && y[0] === t[0])) {
          n();
        }
      }
    },
    notifyWindowResized : function() {
      j();
    },
    itemSelectionControlsAreUnderPage : function(t) {
      return $.contains(t[0], $("#itemSelectionControls")[0]);
    },
    blurAndClearTextSelection : g
  };
}();


var date_time = function() {
  var a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var e = 0;
  return{
    getCurrentTimeInMS : function() {
      return(new Date).getTime();
    },
    getStrictlyIncreasingCurrentTimeInMS : function() {
      var j = date_time.getCurrentTimeInMS();
      return e = j > e ? j : e + 0.001;
    },
    dateToDateTimeString : function(j) {
      var h = j.getHours();
      var f = j.getMinutes();
      var n;
      if (h < 12) {
        n = "AM";
        if (h == 0) {
          h = 12;
        }
      } else {
        n = "PM";
        if (h > 12) {
          h -= 12;
        }
      }
      f = f <= 9 ? "0" + f : String(f);
      return a[j.getMonth()] + " " + j.getDate() + ", " + j.getFullYear() + " @ " + h + ":" + f + " " + n;
    },
    convertMillisecondsToTimeDeltaString : function(j) {
      j = Math.max(0, j);
      j = Math.floor(j / 6E4);
      if (j < 60) {
        return j + " minute" + (j === 1 ? "" : "s");
      }
      j = Math.floor(j / 60);
      if (j < 24) {
        return j + " hour" + (j === 1 ? "" : "s");
      }
      j = Math.floor(j / 24);
      return j + " day" + (j === 1 ? "" : "s");
    },
    getCurrentTimeAsDebugTimestamp : function() {
      var j = new Date;
      var h = utils.zeroPadInteger(j.getDate(), 2) + "/" + a[j.getMonth()] + "/" + j.getFullYear();
      j = utils.zeroPadInteger(j.getHours(), 2) + ":" + utils.zeroPadInteger(j.getMinutes(), 2) + ":" + utils.zeroPadInteger(j.getSeconds(), 2) + "." + utils.zeroPadInteger(j.getMilliseconds(), 3);
      return h + " " + j;
    }
  };
}();
var utils = function() {
  function a(d) {
    if (LOG_DEBUG_MESSAGES) {
      if (typeof d === "function") {
        d = d();
      }
      e("[" + date_time.getCurrentTimeAsDebugTimestamp() + "] " + d);
    }
  }
  function e(d) {
    if (window.console !== undefined) {
      if (typeof window.console.log === "function") {
        console.log(d);
      }
    }
  }
  function j(d) {
    return!isNaN(d);
  }
  function h() {
    return((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  }
  function f(d, k) {
    try {
      var p = JSON.parse(d);
    } catch (v) {
      k();
      return null;
    }
    return p;
  }
  var n = Class.extend({
    init : function() {
      this._dict = {};
    },
    add : function(d) {
      this._dict[d] = true;
    },
    contains : function(d) {
      return d in this._dict;
    },
    remove : function(d) {
      delete this._dict[d];
    },
    elements : function() {
      return Object.keys(this._dict);
    }
  });
  var l = Class.extend({
    init : function(d, k, p) {
      if (d === undefined) {
        d = -1;
      }
      if (k === undefined) {
        k = 0;
      }
      if (p === undefined) {
        p = null;
      }
      this._stack = [];
      this._targetLength = d;
      this._lengthResizeBuffer = k;
      this._itemRemovalCallback = p;
    },
    push : function(d) {
      this._stack.push(d);
      if (this._targetLength > 0) {
        if (this._stack.length > this._targetLength + this._lengthResizeBuffer) {
          this._registerItemsRemoved(this._stack.splice(0, this._stack.length - this._targetLength));
        }
      }
    },
    pop : function() {
      var d = this._stack.pop();
      this._registerItemsRemoved([d]);
      return d;
    },
    remove : function(d) {
      var k = [];
      var p = [];
      var v = 0;
      for (;v < this._stack.length;v++) {
        var r = this._stack[v];
        if (r === d) {
          k.push(r);
        } else {
          p.push(r);
        }
      }
      this._stack = p;
      this._registerItemsRemoved(k);
    },
    last : function() {
      if (!this.isEmpty()) {
        return this._stack[this._stack.length - 1];
      }
    },
    topN : function(d) {
      return this._stack.slice(this._stack.length - Math.min(this._stack.length, d));
    },
    clear : function() {
      var d = this._stack;
      this._stack = [];
      this._registerItemsRemoved(d);
    },
    length : function() {
      return this._stack.length;
    },
    isEmpty : function() {
      return this.length() === 0;
    },
    _registerItemsRemoved : function(d) {
      if (this._itemRemovalCallback !== null) {
        d.forEach(this._itemRemovalCallback);
      }
    }
  });
  var q = Class.extend({
    init : function(d, k) {
      if (d === undefined) {
        d = -1;
      }
      if (k === undefined) {
        k = 0;
      }
      var p = this;
      this._keyStack = new l(d, k, function(v) {
        delete p._table[v];
      });
      this._table = {};
    },
    add : function(d, k) {
      if (d in this._table) {
        if (!this._keyStack.isEmpty() && d === this._keyStack.last()) {
          this._table[d] = k;
          return;
        }
        this.remove(d);
      }
      this._keyStack.push(d);
      this._table[d] = k;
    },
    get : function(d) {
      return d in this._table ? this._table[d] : null;
    },
    remove : function(d) {
      if (d in this._table) {
        this._keyStack.remove(d);
      }
    },
    clear : function() {
      this._keyStack.clear();
      this._table = {};
    },
    length : function() {
      return this._keyStack.length();
    },
    isEmpty : function() {
      return this._keyStack.isEmpty();
    },
    getMostRecentlyAddedKeys : function(d) {
      return this._keyStack.topN(d);
    }
  });
  var o = XRegExp("[" + WORD_CHARS_PLUS_DIGITS + "]");
  var c = /[a-z]/i;
  var g = XRegExp("^[\\p{Han}\\p{Hangul}\\p{Hiragana}\\p{Katakana}]+$");
  return{
    Set : n,
    Stack : l,
    LookupTable : q,
    debugMessage : a,
    debugAlert : function(d) {
      if (LOG_DEBUG_MESSAGES) {
        a(d);
        ui_sugar.showAlertDialog(html_utils.htmlEscapeText(d), "Debug Alert", false);
      }
    },
    consoleLog : e,
    printStackTrace : function() {
      var d = arguments.callee.caller;
      for (;d != null && typeof d === "function";) {
        e("name" in d && d.name !== "" ? d.name : "(anonymous)");
        d = d.caller;
      }
    },
    timeFunction : function(d) {
      var k = d.name ? d.name : "[unnamed]";
      var p = date_time.getCurrentTimeInMS();
      d();
      d = date_time.getCurrentTimeInMS() - p;
      e(k + " ran in " + d + " ms.");
    },
    clamp : function(d, k, p) {
      return Math.min(Math.max(d, k), p);
    },
    objectIsEmpty : function(d) {
      var k;
      for (k in d) {
        return false;
      }
      return true;
    },
    objectSize : function(d) {
      var k = 0;
      var p;
      for (p in d) {
        k++;
      }
      return k;
    },
    objectPropertyNames : function(d) {
      var k = [];
      var p;
      for (p in d) {
        k.push(p);
      }
      return k;
    },
    objectPropertyValues : function(d) {
      var k = [];
      var p;
      for (p in d) {
        k.push(d[p]);
      }
      return k;
    },
    objectsAreShallowEqual : function(d, k) {
      var p;
      for (p in d) {
        if (!(p in k) || k[p] !== d[p]) {
          return false;
        }
      }
      for (p in k) {
        if (!(p in d)) {
          return false;
        }
      }
      return true;
    },
    copyObject : function(d) {
      return $.extend({}, d);
    },
    deepCopyObject : function(d) {
      return $.extend(true, {}, d);
    },
    copyArray : function(d) {
      return d.slice(0);
    },
    deepCopyArray : function(d) {
      return $.extend(true, [], d);
    },
    createArrayOfIdenticalElements : function(d, k) {
      var p = Array(k);
      var v = 0;
      for (;v < k;v++) {
        p[v] = d;
      }
      return p;
    },
    isWordOrNumberChar : function(d) {
      return o.test(d);
    },
    isAlpha : function(d) {
      return c.test(d);
    },
    isDigit : j,
    isOnlyDigits : function(d) {
      var k = 0;
      for (;k < d.length;k++) {
        if (!j(d.charAt(k))) {
          return false;
        }
      }
      return true;
    },
    isOnlyWhitespace : function(d) {
      return d.match(/^\s*$/);
    },
    isOnlyCJK : function(d) {
      return g.test(d);
    },
    isPrefixMatch : function(d, k) {
      return d.lastIndexOf(k, 0) === 0;
    },
    isSuffixMatch : function(d, k) {
      return d.indexOf(k, d.length - k.length) !== -1;
    },
    splitOnFirstOccurrence : function(d, k) {
      var p = d.indexOf(k);
      if (p === -1) {
        return[d];
      }
      return[d.substring(0, p), d.substring(p + k.length)];
    },
    zeroPadInteger : function(d, k) {
      var p = d.toString();
      if (p.length >= k) {
        return p;
      }
      return Array(k - p.length + 1).join("0") + p;
    },
    camelCaseToHyphenated : function(d) {
      return d.replace(/([A-Z])/g, function(k) {
        return "-" + k.toLowerCase();
      });
    },
    pushArray : function(d, k) {
      Array.prototype.push.apply(d, k);
    },
    concatArrays : function(d) {
      if (d.length === 0) {
        return[];
      }
      return Array.prototype.concat.apply(d[0], d.slice(1));
    },
    sortArrayOfNumbers : function(d, k) {
      if (k === undefined) {
        k = false;
      }
      return d.sort(k ? function(p, v) {
        return v - p;
      } : function(p, v) {
        return p - v;
      });
    },
    regExpEscapeString : function(d) {
      return d.replace(/[-\[\]{}()*+?.,\\^$|#]/g, "\\$&");
    },
    generateUUID : function () {
      var uuid = '', ii;
      for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
        case 8:
        case 20:
          uuid += '-';
          uuid += (Math.random() * 16 | 0).toString(16);
          break;
        case 12:
          uuid += '-';
          uuid += '4';
          break;
        case 16:
          uuid += '-';
          uuid += (Math.random() * 4 | 8).toString(16);
          break;
        default:
          uuid += (Math.random() * 16 | 0).toString(16);
        }
      }
      return uuid;
    },
    parseJsonWithErrorHandling : f,
    parseJsonListWithErrorHandling : function(d, k) {
      if (k === undefined) {
        k = null;
      }
      var p = [];
      var v = 0;
      for (;v < d.length;v++) {
        var r = false;
        var x = f(d[v], function() {
          r = true;
        });
        if (r) {
          if (k !== null) {
            k();
          }
          return null;
        }
        p.push(x);
      }
      return p;
    },
    convertToOrderOfMagnitudeNumber : function(d) {
      d = d + "";
      d = d[0] + _.map(_.range(0, d.length - 1), function() {
        return 0;
      }).join("");
      return parseInt(d, 10);
    }
  };
}();
var react_utils = function() {
  return{
    TooltipContainer : React.createClass({
      propTypes : {
        containedElement : React.PropTypes.element.isRequired,
        getTooltipTextCallback : React.PropTypes.func.isRequired
      },
      getInitialState : function() {
        return{
          tooltipIsVisible : false
        };
      },
      render : function() {
        var a;
        a = this.props.containedElement.ref !== null ? this.props.containedElement : React.cloneElement(this.props.containedElement, {
          ref : "contained"
        });
        this._containedElementRefName = a.ref;
        var e = null;
        if (this.state.tooltipIsVisible) {
          e = React.DOM.div({
            className : "tooltip",
            ref : "tooltip"
          }, this.props.getTooltipTextCallback(), React.DOM.div({
            className : "tooltipArrow"
          }));
        }
        return React.DOM.div({
          className : "tooltipContainer",
          onMouseEnter : this._handleMouseEnter,
          onMouseLeave : this._handleMouseLeave
        }, a, e);
      },
      componentWillMount : function() {
        this._showTooltipTimeout = null;
      },
      componentDidMount : function() {
        this._positionTooltip();
      },
      componentDidUpdate : function() {
        this._positionTooltip();
      },
      _positionTooltip : function() {
        if (this.state.tooltipIsVisible) {
          var a = $(this._getContainedNode());
          var e = $(this.refs.tooltip);
          var j = a.position();
          var h = a.outerHeight();
          a = a.outerWidth();
          var f = e.outerWidth();
          $(e).css({
            top : j.top + h + 10 + "px",
            left : j.left + a / 2 - f / 2 + "px"
          });
        }
      },
      _handleMouseEnter : function(a) {
        if (dom_utils.nodeIsOrIsContainedByOtherNode(a.target, this._getContainedNode())) {
          this._clearShowTooltipTimeout();
          var e = this;
          this._showTooltipTimeout = setTimeout(function() {
            e._showTooltipTimeout = null;
            e.setState({
              tooltipIsVisible : true
            });
          }, 250);
        }
      },
      _handleMouseLeave : function(a) {
        if (dom_utils.nodeIsOrIsContainedByOtherNode(a.target, this._getContainedNode())) {
          this._clearShowTooltipTimeout();
          if (this.state.tooltipIsVisible) {
            this.setState({
              tooltipIsVisible : false
            });
          }
        }
      },
      _getContainedNode : function() {
        return this.refs[this._containedElementRefName];
      },
      _clearShowTooltipTimeout : function() {
        if (this._showTooltipTimeout !== null) {
          clearTimeout(this._showTooltipTimeout);
          this._showTooltipTimeout = null;
        }
      }
    })
  };
}();

var ui_sugar = function() {
  jQuery.fn.addSpinner = function() {
    $(this).each(function(a, e) {
      if ($(e).css("position") === "static") {
        $(e).css("position", "relative");
      }
      $(e).append('<div class="spinnerWrapper"><div class="spinner"></div></div>');
    });
    return this;
  };
  jQuery.fn.removeSpinner = function() {
    $(this).each(function(a, e) {
      $(e).find(".spinnerWrapper").remove();
    });
    return this;
  };
  jQuery.fn.flashColor = function(a) {
    var e = $(this);
    var j = $("<div>").css({
      backgroundColor : a,
      opacity : 0,
      position : "absolute",
      top : 0,
      left : 0,
      width : "100%",
      height : "100%"
    });
    e.append(j);
    j.css({
      opacity : 0.9
    }).animate({
      opacity : 0
    }, 500, function() {
      j.remove();
    });
  };
  return{
    showAlertDialog : function(a, e, j, h, f) {
      if (e === undefined) {
        e = "";
      }
      if (j === undefined) {
        j = true;
      }
      if (h === undefined) {
        h = null;
      }
      if (f === undefined) {
        f = null;
      }
      a = $('<div class="alertDialog">' + a + "</div>");
      a.appendTo($("#documentView"));
      h = h !== null ? h : [];
      h.push({
        text : f !== null ? f : "Close",
        click : function() {
          $(this).dialog("close");
        }
      });
      a.dialog({
        width : 500,
        modal : j,
        position : ["center", 150],
        title : e,
        close : function() {
          $(this).dialog("destroy").remove();
        },
        buttons : h
      });
    },
    setPageCursor : function(a) {
      var e = ["cursor: " + a + " !important"];
      if (a === "grab" || (a === "grabbing" || (a === "zoom-in" || a === "zoom-out"))) {
        e.push("cursor: -webkit-" + a + " !important");
        e.push("cursor: -moz-" + a + " !important");
      }
      a = "* { " + e.join("; ") + "; }";
      $("#pageCursorCSS").html(a);
    },
    clearPageCursor : function() {
      $("#pageCursorCSS").html("");
    },
    makeSelectionInvisible : function() {
      $("#selectionInvisibleCSS").html("::selection { background: transparent; }\n::-moz-selection { background: transparent; }");
    },
    makeSelectionVisible : function() {
      $("#selectionInvisibleCSS").html("");
    }
  };
}();

var ranges = function() {
  function a(f, n) {
    var l = 0;
    for (;l < f.length;l++) {
      if (f[l].equals(n)) {
        return true;
      }
    }
    return false;
  }
  function e(f, n) {
    var l = f.is(".project") && n.is(".project");
    if (f.is(".childrenEnd") && n.is(".childrenEnd") || l) {
      return f.getProject().attr("projectid") === n.getProject().attr("projectid");
    }
    return false;
  }
  var j = Class.extend({
    init : function(f, n, l) {
      if (n === undefined) {
        n = null;
      }
      if (l === undefined) {
        l = "none";
      }
      this.movingOrDuplicatingProjectReferences = n;
      this.dragAction = l;
      this.ranges = [];
      var q = ".project";
      if (l === "move" || l === "duplicate") {
        q += ", .childrenEnd";
      }
      n = f.getMatchingDomProject();
      if (l === "move" && IS_MOBILE) {
        l = n.next(q);
        if (l.length === 1 && f.isValidMove(l)) {
          n.css({
            display : "none"
          });
          this.createElementRange(l, 0);
        } else {
          this.createElementRange(n, 0);
        }
      } else {
        this.createElementRange(n, 0);
      }
    },
    getDragAction : function() {
      return this.dragAction;
    },
    getMovingOrDuplicatingProjectReferences : function() {
      return this.movingOrDuplicatingProjectReferences;
    },
    createElementRange : function(f, n) {
      var l = new h(f, n, this);
      this.ranges.push(l);
      return l;
    },
    getRangeForPosition : function(f) {
      var n;
      for (;;) {
        n = this.getClosestExistingRange(f);
        var l = n.getOffset();
        if (f < l.top) {
          if (n.previous !== undefined || (n.isFirst === true || n.createPrevious() === false)) {
            break;
          }
        } else {
          if (f > l.top) {
            if (n.next !== undefined || (n.isLast === true || n.createNext() === false)) {
              break;
            }
          } else {
            break;
          }
        }
      }
      if (this.dragAction === "move" || this.dragAction === "duplicate") {
        for (;a(this.movingOrDuplicatingProjectReferences, n.getProjectReference());) {
          if (n.next === undefined) {
            n.createNext();
          }
          n = n.next;
        }
      }
      return n;
    },
    getRangesBetweenPositionAndStartInclusive : function(f) {
      var n = this.ranges[0];
      var l = n.getElement().getName();
      var q = l.offset().top;
      var o = l.outerHeight();
      l = q - 5;
      q = q + o + 5;
      if (f >= l && f < q) {
        return[];
      }
      n = n.getOffset().top;
      o = this.getRangeForPosition(f);
      q = o.getOffset().top;
      if (f < l) {
        if (f < q - 14 * (Math.max(o.getElementNumber() + 3, 0) / 3) && o.previous !== undefined) {
          o = o.previous;
          l = o.getOffset().top;
          var c = l + o.getElement().outerHeight();
          if (f < c) {
            o = o;
            q = l;
          }
        }
        f = q;
        l = n;
      } else {
        if (f < q + 14 * (Math.max(-o.getElementNumber() + 1 + 3, 0) / 3) && o.previous !== undefined) {
          o = o.previous;
          q = o.getOffset().top;
        }
        f = n;
        l = q;
      }
      n = [];
      q = 0;
      for (;q < this.ranges.length;q++) {
        o = this.ranges[q];
        c = o.getOffset().top;
        if (c >= f) {
          if (c <= l) {
            n.push(o);
          }
        }
      }
      n.sort(function(g, d) {
        var k = g.getOffset().top;
        var p = d.getOffset().top;
        return k - p;
      });
      return n;
    },
    getClosestExistingRange : function(f) {
      var n = null;
      var l = -1;
      var q = 0;
      for (;q < this.ranges.length;q++) {
        var o = this.ranges[q];
        var c = o.distanceFromPosition(f);
        if (n === null || c < l) {
          n = o;
          l = c;
        }
      }
      return n;
    }
  });
  var h = Class.extend({
    init : function(f, n, l) {
      var q = f.offset();
      this.element = f;
      this.elementNumber = n;
      this.verticalRangeFinder = l;
      this.offset = q;
      this.projectReference = project_tree.getProjectReferenceFromDomProject(f.getProject());
      this.isValidDropPosition = this.height = this.width = null;
      this.creationTimestamp = date_time.getStrictlyIncreasingCurrentTimeInMS();
    },
    getElement : function() {
      return this.element;
    },
    getElementNumber : function() {
      return this.elementNumber;
    },
    getProjectReference : function() {
      return this.projectReference;
    },
    getIsValidDropPosition : function() {
      if (this.isValidDropPosition === null) {
        var f = this.verticalRangeFinder.getDragAction();
        var n = f === "move";
        f = f === "duplicate";
        var l = true;
        var q = this.verticalRangeFinder.getMovingOrDuplicatingProjectReferences();
        var o = 0;
        for (;o < q.length;o++) {
          var c = q[o];
          if (n) {
            l &= c.isValidMove(this.element);
          } else {
            if (f) {
              l &= c.isValidDuplicate(this.element);
            }
          }
        }
        this.isValidDropPosition = l;
      }
      return this.isValidDropPosition;
    },
    getOffset : function() {
      return this.offset;
    },
    getWidth : function() {
      if (this.width === null) {
        this.width = this.element.outerWidth();
      }
      return this.width;
    },
    getHeight : function() {
      if (this.height === null) {
        this.height = this.element.outerHeight();
      }
      return this.height;
    },
    getCreationTimestamp : function() {
      return this.creationTimestamp;
    },
    distanceFromPosition : function(f) {
      return Math.abs(f - this.offset.top);
    },
    createPrevious : function() {
      var f = this.verticalRangeFinder.getDragAction();
      f = this.element.getPreviousProject(f === "move" || f === "duplicate");
      if (e(this.element, f) || f.is(".selected")) {
        this.isFirst = true;
        return false;
      } else {
        this.previous = f = this.verticalRangeFinder.createElementRange(f, this.elementNumber - 1);
        f.next = this;
        return true;
      }
    },
    createNext : function() {
      var f = this.verticalRangeFinder.getDragAction();
      f = this.element.getNextProject(false, f === "move" || f === "duplicate");
      if (e(this.element, f)) {
        this.isLast = true;
        return false;
      } else {
        this.next = f = this.verticalRangeFinder.createElementRange(f, this.elementNumber + 1);
        f.previous = this;
        return true;
      }
    },
    equals : function(f) {
      return this.projectReference.equals(f.projectReference);
    }
  });
  return{
    VerticalRangeFinder : j,
    DRAG_ACTION_NONE : "none",
    DRAG_ACTION_MOVE : "move",
    DRAG_ACTION_DUPLICATE : "duplicate"
  };
}();
var scrolling = function() {
  var a = Class.extend({
    init : function(e, j) {
      this._clientX = e;
      this._clientY = j;
      this._timestamp = date_time.getCurrentTimeInMS();
    },
    getClientX : function() {
      return this._clientX;
    },
    getClientY : function() {
      return this._clientY;
    },
    getTimestamp : function() {
      return this._timestamp;
    }
  });
  return{
    createMoveEventDataFromMouseOrTouchMoveEvent : function(e) {
      if (IS_MOBILE) {
        e = e.originalEvent.touches[0];
        var j = IS_ANDROID ? e.pageY - $(document).scrollTop() : e.clientY;
        return new a(e.clientX, j);
      } else {
        return new a(e.clientX, e.clientY);
      }
    },
    VerticalScroller : Class.extend({
      init : function(e, j) {
        this._getMostRecentMouseOrTouchMoveEventDataCallback = e;
        this._onScrollCallback = j;
        this._startingClientY = this._getMostRecentMouseOrTouchMoveEventDataCallback().getClientY();
        this._haveScrolled = false;
        this._mostRecentScrollTimestamp = -1;
        this._mostRecentNewScrollTimestamp = null;
        this._isScrolling = false;
        this._previousScrollTop = this._requestAnimationFrameId = this._timeoutId = null;
      },
      startOrStopScrollingIfNeeded : function() {
        if (this.getScrollSpeed() !== 0) {
          this.startScrollingIfNotAlreadyStarted();
        } else {
          this.stopScrollingIfStarted();
        }
      },
      startScrollingIfNotAlreadyStarted : function() {
        if (!this._isScrolling) {
          this._isScrolling = true;
          this.scroll();
        }
      },
      stopScrollingIfStarted : function() {
        if (this._isScrolling) {
          if (this._requestAnimationFrameId !== null) {
            dom_utils.cancelAnimationFrame(this._requestAnimationFrameId);
            this._requestAnimationFrameId = null;
          } else {
            if (this._timeoutId !== null) {
              clearTimeout(this._timeoutId);
              this._timeoutId = null;
            }
          }
          this._isScrolling = false;
          this._mostRecentScrollTimestamp = -1;
        }
      },
      getMaxScrollSpeed : function() {
        return IS_MOBILE ? 1E3 : 1250;
      },
      getScrollSpeed : function() {
        var e = window.innerHeight ? window.innerHeight : $(window).height();
        var j = e * 0.15;
        var h = this._getMostRecentMouseOrTouchMoveEventDataCallback().getClientY();
        e = e - h;
        var f = h < j && (this._haveScrolled || h < this._startingClientY);
        var n = e < j && (this._haveScrolled || h > this._startingClientY);
        var l = this.getMaxScrollSpeed();
        var q = function(c) {
          c = 1 - c / j;
          c = Math.max(Math.min(c, 1), 0);
          return l * Math.pow(c, 2);
        };
        var o = 0;
        if (f) {
          o = -q(h);
        } else {
          if (n) {
            o = q(e);
          }
        }
        return Math.round(o);
      },
      scroll : function() {
        var e = this.getScrollSpeed();
        if (e === 0) {
          this.stopScrollingIfStarted();
        } else {
          var j = date_time.getCurrentTimeInMS();
          e = Math.round(e * (this._mostRecentScrollTimestamp !== -1 ? (j - this._mostRecentScrollTimestamp) / 1E3 : 0));
          var h = $(document).scrollTop();
          $(document).scrollTop(h + e);
          this._mostRecentScrollTimestamp = j;
          if (this._previousScrollTop === null || h !== this._previousScrollTop) {
            this._mostRecentNewScrollTimestamp = j;
          }
          this._previousScrollTop = h;
          this._haveScrolled = true;
          var f = this;
          j = function() {
            f.scroll();
          };
          if (dom_utils.supportsRequestAnimationFrame()) {
            this._requestAnimationFrameId = dom_utils.requestAnimationFrame(j);
          } else {
            this._timeoutId = setTimeout(j, 16);
          }
          this._onScrollCallback();
        }
      },
      getMostRecentNewScrollTimestamp : function() {
        return this._mostRecentNewScrollTimestamp;
      }
    })
  };
}();
var moving = function() {
  function a(A, F, z) {
    setTimeout(function() {
      if (l !== null) {
        l = null;
        F.unbind(".cancelDrag");
        var D = getCurrentlyFocusedContent();
        if (getCurrentlyFocusedContent() !== null) {
          D.blur();
        }
        e(F, z, z, scrolling.createMoveEventDataFromMouseOrTouchMoveEvent(A));
      }
    }, 0);
  }
  function e(A, F, z, D, E, G, B, J) {
    if (E === undefined) {
      E = null;
    }
    if (G === undefined) {
      G = null;
    }
    if (B === undefined) {
      B = false;
    }
    if (J === undefined) {
      J = false;
    }
    var N = project_tree.getProjectReferenceFromDomProject(F);
    var T = [];
    z.each(function() {
      var V = $(this);
      T.push(project_tree.getProjectReferenceFromDomProject(V));
    });
    u = A;
    q = N;
    o = T;
    c = B;
    g = J;
    r = D.getClientX();
    v = D.getClientY();
    x = D;
    m = G;
    if (E !== null) {
      F = E.offset();
      b = E;
      b.css({
        position : "fixed",
        top : F.top - $(document).scrollTop(),
        left : F.left
      });
      b.offset(F);
      b.addClass("dragging");
      z.addClass("moving");
    } else {
      E = F.getName();
      A = E.offset();
      s = E.clone().addClass("draggableNameClone").css({
        position : "fixed",
        top : A.top - $(document).scrollTop(),
        left : A.left,
        width : E.outerWidth(),
        zIndex : 1E3,
        fontSize : E.css("fontSize"),
        lineHeight : E.children(".content").css("lineHeight")
      }).appendTo("#documentView");
      if (F.is(".task")) {
        s.addClass("noHalo");
      }
      s.children(".content").removeAttr("contenteditable");
      E.css({
        opacity : 0
      });
      z.css({
        height : 0
      });
      z.children(".children").css({
        display : "none"
      });
    }
    if (!IS_MOBILE) {
      ui_sugar.setPageCursor("grabbing");
    }
    d = new ranges.VerticalRangeFinder(q, o, g ? ranges.DRAG_ACTION_DUPLICATE : ranges.DRAG_ACTION_MOVE);
    p = new scrolling.VerticalScroller(function() {
      return x;
    }, function() {
      f();
    });
    $("#moveDropLine").appendTo($("#documentView"));
    h();
    f();
    p.startOrStopScrollingIfNeeded();
    if (IS_MOBILE) {
      u.bind("touchmove.dragging", function(V) {
        x = scrolling.createMoveEventDataFromMouseOrTouchMoveEvent(V);
        p.startOrStopScrollingIfNeeded();
        h();
        f();
        return false;
      }).bind("touchend.dragging", function() {
        j();
        return false;
      }).bind("touchcancel.dragging", function() {
        j(true);
      });
    } else {
      u.bind("mousemove.dragging mouseleave.dragging", function(V) {
        x = scrolling.createMoveEventDataFromMouseOrTouchMoveEvent(V);
        p.startOrStopScrollingIfNeeded();
        h();
        f();
      }).bind("mouseup.dragging", function() {
        j();
        return false;
      });
    }
    if (IS_MOBILE) {
      w = setInterval(function() {
        var V;
        V = date_time.getCurrentTimeInMS() - p.getMostRecentNewScrollTimestamp();
        V = date_time.getCurrentTimeInMS() - x.getTimestamp() > 5E3 && V > 5E3 ? true : false;
        if (V) {
          j(true);
        }
      }, 1E3);
    }
    n = DRAG_MODE = true;
  }
  function j(A) {
    if (A === undefined) {
      A = false;
    }
    p.stopScrollingIfStarted();
    $("#itemSelectionControls").css("visibility", "");
    if (m) {
      m.css("visibility", "");
    }
    var F = project_tree.getMatchingDomProjectsForProjectReferences(o);
    if (F.length > 0) {
      F.removeClass("moving");
      F.removeAttr("style");
      F.children(".name").removeAttr("style");
      F.children(".children").removeAttr("style");
      if (!A && k !== null) {
        A = k.getElement();
        if (g) {
          F.duplicateIt(A, c);
        } else {
          if (F.filter(A).length === 0 && F.filter(A.getPreviousSibling()).length === 0) {
            undo_redo.startOperationBatch();
            F = F.moveProjects(A);
            undo_redo.finishOperationBatch();
          }
        }
      }
      if (!g) {
        A = IS_MOBILE ? 250 : 500;
        F.addClass("moving");
        setTimeout(function() {
          F.removeClass("moving");
        }, A);
      }
    }
    $("#moveDropLine").removeAttr("style").appendTo($("#hidden"));
    if (s !== null) {
      s.remove();
    } else {
      if (b !== null) {
        b.removeAttr("style");
        b.removeClass("dragging");
        if (b.is("#bulletBucket")) {
          $("#hidden").append(b);
        }
      }
    }
    if (!IS_MOBILE) {
      ui_sugar.clearPageCursor();
    }
    u.unbind(".dragging");
    n = DRAG_MODE = false;
    if (w !== null) {
      clearInterval(w);
      w = null;
    }
    b = s = u = m = x = v = r = k = p = d = g = c = o = null;
  }
  function h() {
    var A = null;
    var F = {
      x : 0,
      y : 0
    };
    if (s !== null) {
      A = s[0];
      F = t;
    } else {
      if (b !== null) {
        A = b[0];
      }
    }
    var z = b !== null ? x.getClientX() - r : 0;
    var D = x.getClientY() - v;
    if (A !== null) {
      dom_utils.setTransformStyleForElement(A, IS_IE && IE_VERSION <= 9 ? "translate(" + (z - F.x) + "px," + (D - F.y) + "px)" : "translate3d(" + (z - F.x) + "px," + (D - F.y) + "px,0)");
    }
  }
  function f() {
    var A = x.getClientY() + $(document).scrollTop();
    if (s !== null) {
      A -= t.y;
    }
    A = d.getRangeForPosition(A);
    if (A.getIsValidDropPosition()) {
      var F = A.getOffset();
      $("#moveDropLine").css({
        top : F.top,
        left : F.left,
        width : A.getWidth(),
        display : "block"
      });
      k = A;
    }
  }
  var n = false;
  var l = null;
  var q = null;
  var o = null;
  var c = null;
  var g = null;
  var d = null;
  var k = null;
  var p = null;
  var v = null;
  var r = null;
  var x = null;
  var u = null;
  var b = null;
  var s = null;
  var m = null;
  var w = null;
  var t = {
    x : 5,
    y : 2
  };
  var y = 0;
  return{
    init : function() {
      if (IS_ANDROID && (IS_CHROME && dom_utils.supportsRequestAnimationFrame())) {
        var A = date_time.getCurrentTimeInMS();
        var F = function() {
          var z = date_time.getCurrentTimeInMS();
          y = z - A;
          A = z;
          dom_utils.requestAnimationFrame(F);
        };
        dom_utils.requestAnimationFrame(F);
      }
    },
    isMoving : function() {
      return n;
    },
    setupMobileDragging : function(A) {
      if (!(IS_ANDROID && !IS_CHROME)) {
        if (l === null) {
          if (IS_ANDROID && IS_CHROME) {
            if (y >= 200) {
              return;
            }
          }
          var F = $(this);
          var z = F.getProject();
          var D = project_tree.getProjectReferenceFromDomProject(z);
          if (!(z.is(".selected") || (getCurrentlyFocusedContentOrInput() !== null || (F.closest(".name").length === 0 || (D.isInReadOnlyTree() || $(A.target).closest(".contentTag, .contentLink").length !== 0))))) {
            l = setTimeout(function() {
              a(A, F, z);
            }, 500);
            F.bind("touchmove.cancelDrag touchend.cancelDrag", function() {
              if (l !== null) {
                clearTimeout(l);
                l = null;
              }
              F.unbind(".cancelDrag");
            });
          }
        }
      }
    },
    startDesktopDragging : function(A, F, z, D, E) {
      blurFocusedContentOrInput();
      hideControls();
      var G = $(z.target);
      var B = $("#bulletBucket");
      B.html("");
      var J = Math.min(F.find(".bullet").length, 5);
      var N = 0;
      for (;N < J;N++) {
        B.append($('<div class="bulletBucketBullet"></div>'));
      }
      $("#documentView").append(B);
      B.offset(G.offset());
      if (D) {
        $("#itemSelectionControls").css("visibility", "hidden");
      }
      J = null;
      if (!(D || E)) {
        G.css("visibility", "hidden");
        J = G;
      }
      e($(window), A, F, scrolling.createMoveEventDataFromMouseOrTouchMoveEvent(z), B, J, D, E);
    },
    cancelDragging : function() {
      if (n) {
        j(true);
      }
    },
    notifyDomProjectTreeMayHaveChanged : function() {
      if (n) {
        if (q.getMatchingDomProject().length === 0 || project_tree.getMatchingDomProjectsForProjectReferences(o).length === 0) {
          j(true);
        } else {
          d = new ranges.VerticalRangeFinder(q, o, g ? ranges.DRAG_ACTION_DUPLICATE : ranges.DRAG_ACTION_MOVE);
          k = null;
          f();
        }
      }
    }
  };
}();

var saved_views = function() {
  function a(I) {
    if (I === undefined) {
      I = false;
    }
    if (!(N === null || !N)) {
      r = h(SETTINGS.saved_views_json.value);
      if (r === null) {
        r = [];
      }
      if (!I) {
        d();
        if (z) {
          o();
        }
      }
    }
  }
  function e() {
    if (J !== null) {
      clearTimeout(J);
    }
    J = null;
  }
  function j(I) {
    I = $(I.target);
    if (!(I.closest("#savedViewHUD").length === 1)) {
      if (!(I.closest(".pageStar").length === 1)) {
        if (!(I.closest("#savedViewHUDButton").length === 1)) {
          q();
        }
      }
    }
  }
  function h(I) {
    var L = null;
    try {
      L = JSON.parse(I);
    } catch (M) {
      return null;
    }
    I = [];
    var U = 0;
    for (;U < L.length;U++) {
      I.push(new X(L[U]));
    }
    return new ea(I);
  }
  function f() {
    var I = project_tree.getProjectReferenceFromDomProject(selectOnActivePage(".selected"));
    var L = I.getNonPlaceholderReferenceIfApplicable();
    var M = L !== null ? L : I;
    I = search.inSearchMode() ? search.getSearchQuery().getSearchString() : null;
    L = {
      projectid : M.isTreeRoot() ? null : M.getProjectId()
    };
    M = M.getProjectTree();
    if (M.isAuxiliary()) {
      L.auxiliaryRootProjectId = M.getRootProjectId();
    }
    L = {
      zoomedProject : L
    };
    if (I !== null) {
      L.searchQuery = I;
    }
    I = new X(L);
    I.notifyWasJustViewed();
    return I;
  }
  function n(I) {
    if (I === undefined) {
      I = false;
    }
    var L = animations.getAnimationSpeed(T);
    if (animations.animationsAreInProgress()) {
      if (I) {
        q();
      }
    } else {
      var M = b;
      if (M === null || !M.isValid()) {
        if (I) {
          q();
        }
      } else {
        var U = f();
        if (M.equals(U)) {
          if (I) {
            q();
          }
        } else {
          var ba;
          ba = t !== null && t.equals(M) ? y === "right" ? "left" : "right" : u.getSwitchDirection(U, M);
          t = U;
          y = ba;
          var ga = M.getZoomedProjectReferenceIfValid();
          var ja = M.getSearchString();
          selectOnActivePage(".mainTreeRoot").clearControlsUnderProject();
          item_select.clearItemSelection();
          U = $(window).scrollTop();
          $("body").height();
          var ka = function() {
            $(".page:not(.active)").hideWithoutMemoryLeaks().remove();
            $(".page.active").css("transition", "");
            ga.setPageTitleAndFragmentPathForProject();
            location_history.setLocationModificationInProgress(false);
            if (I) {
              q();
            }
            if (!location_history.restoreLastSavedClientViewStateForCurrentLocation()) {
              $(window).scrollTop(0);
              if (!IS_MOBILE) {
                var Z = selectOnActivePage(".selected");
                var ca = Z.getVisibleChildren().first();
                if (ca.length === 0) {
                  ca = Z.is(".mainTreeRoot") ? null : Z;
                }
                if (ca !== null) {
                  ca.getName().moveCursorToBeginning();
                }
              }
            }
          };
          var la = $(".page.active");
          la.removeClass("active");
          la.find(".content").removeAttr("contenteditable");
          var C = createPage();
          C.addClass("active");
          C.setPositionAndDimensionsForPage();
          CURRENTLY_ACTIVE_PAGE = C;
          if (shouldShowCompletedProjects()) {
            C.addClass("showCompleted");
          }
          location_history.setLocationModificationInProgress(true);
          search.searchProjectTree(ja, true, ga, true);
          ga.constructProjectTreeAsSelected();
          k(true);
          ka();
        }
      }
    }
  }
  function l(I, L) {
    if (I === undefined) {
      I = null;
    }
    if (L === undefined) {
      L = null;
    }
    if (I !== null) {
      s = I;
    }
    if (L !== null) {
      m = L;
    }
    D = true;
    if (!(z || (A || F))) {
      var M = $("#savedViewHUD");
      M.css({
        opacity : 0
      });
      M.show();
      o(m);
      w = false;
      A = true;
      M.animate({
        opacity : 1
      }, 100, function() {
        A = false;
        if (D) {
          if (s) {
            if (!(!B && (E || G))) {
              n(true);
            }
          }
        } else {
          q();
        }
      });
      z = true;
      $("body").bind("click", j);
    }
  }
  function q(I) {
    if (I === undefined) {
      I = false;
    }
    if (!I) {
      if (!B && (E || G)) {
        return;
      }
    }
    D = false;
    e();
    if (!(!z || (A || F))) {
      var L = $("#savedViewHUD");
      var M = L.find("#savedViewHUDPageContainer");
      F = true;
      L.animate({
        opacity : 0
      }, 400, function() {
        F = false;
        M.html("");
        L.hide();
        z = false;
        b = u = null;
        w = false;
        if (D) {
          l();
        }
      });
      $("body").unbind("click", j);
    }
  }
  function o(I) {
    if (I === undefined) {
      I = "none";
    }
    var L = f();
    var M = r.copy();
    M = M.getValidViews();
    if (M.getLength() > 0) {
      if (x !== null) {
        if (x.isValid()) {
          M.add(x);
        }
      }
    }
    M.sortByMostRecentlyViewed();
    u = M;
    b = u.getNextView(L, I);
    I = $("#savedViewHUD").find("#savedViewHUDPageContainer");
    if (u.getLength() > 0) {
      L = u.getPageListHtml(b);
      I.html(L);
    } else {
      L = $("#noSavedViewsNoticeTemplate").html();
      I.html(L);
    }
    c("instant", true);
  }
  function c(I, L) {
    if (L === undefined) {
      L = false;
    }
    I = animations.getAnimationSpeed(I);
    var M = $("#savedViewHUD");
    if (L) {
      M.scrollLeft(0);
    }
    var U = M.find(".savedViewPage.selectedSavedViewPage");
    if (U.length === 1) {
      var ba = M.width();
      var ga = M[0].scrollWidth;
      var ja = M.scrollLeft();
      var ka = ja + ba;
      var la = U.outerWidth(true);
      var C = U.position().left;
      la = C + la;
      var O = null;
      if (C < ja) {
        ba = U.prev(".savedViewPage");
        O = ba.length === 1 ? ba.position().left + ba.outerWidth(true) * (2 / 3) : 0;
      } else {
        if (la > ka) {
          U = U.next(".savedViewPage");
          O = (U.length === 1 ? U.position().left + U.outerWidth(true) * (1 / 3) : ga) - ba;
        }
      }
      if (O !== null) {
        if (I === "animate") {
          M.animate({
            scrollLeft : O
          }, 150);
        } else {
          M.scrollLeft(O);
        }
      }
    }
  }
  function g(I, L) {
    if (L === undefined) {
      L = null;
    }
    if (L !== null) {
      b = L;
    } else {
      if (b === null) {
        b = f();
      }
      b = u.getNextView(b, I);
    }
    var M = $("#savedViewHUD");
    M.find(".savedViewPage.selectedSavedViewPage").removeClass("selectedSavedViewPage");
    if (b !== null) {
      M = M.find(".savedViewPage[data-uniqueid=" + b.getUniqueId() + "]");
      if (M.length === 1) {
        M.addClass("selectedSavedViewPage");
        c();
      }
    }
  }
  function d() {
    var I = selectOnActivePage(".pageStar");
    var L = f();
    if (r.contains(L)) {
      I.addClass("starred");
      I.attr("title", "Unstar this page");
    } else {
      I.removeClass("starred");
      I.attr("title", "Star this page");
    }
  }
  function k(I) {
    if (I === undefined) {
      I = false;
    }
    if (N) {
      var L = f();
      var M = r.getMatchingView(L);
      L = M !== null ? M : L;
      M = M !== null;
      d();
      if (M) {
        L.notifyWasJustViewed();
        if (!I) {
          x = null;
        }
      } else {
        x = L;
      }
    }
  }
  function p(I) {
    if (N) {
      if (!z || F) {
        l(true, "none");
      } else {
        g(I);
      }
    }
  }
  function v() {
    function I() {
      // settings.changeSettings({
      //   saved_views_json : r.getJson()
      // });
    }
    var L = selectOnActivePage(".pageStar").hasClass("starred");
    var M = f();
    if (L) {
      r.remove(M);
      I();
      d();
      if (z) {
        o();
      }
    } else {
      r.add(M);
      I();
      d();
      if (x !== null && x.equals(M)) {
        x = null;
      }
      if (z && !F) {
        o();
      } else {
          l(false, "none");
          e();
          J = setTimeout(q, 1500);
      }
      $("#savedViewHUDButton").flashColor("#aaa");
    }
  }
  var r = null;
  var x = null;
  var u = null;
  var b = null;
  var s = null;
  var m = null;
  var w = false;
  var t = null;
  var y = null;
  var A = false;
  var F = false;
  var z = false;
  var D = false;
  var E = false;
  var G = false;
  var B = false;
  var J = null;
  var N = null;
  var T = "animate";
  var V = false;
  var X = Class.extend({
    init : function(I) {
      this.info = I;
      this.lastViewedTimestampInMS = 0;
      var L = I.zoomedProject;
      this.location = new location_history.Location(L.projectid === null ? project_tree.ROOT_PROJECTID : L.projectid, "searchQuery" in I ? I.searchQuery : null, "auxiliaryRootProjectId" in L ? L.auxiliaryRootProjectId : null);
    },
    getInfo : function() {
      return this.info;
    },
    getLocation : function() {
      return this.location;
    },
    isValid : function() {
      return this.getZoomedProjectReferenceIfValid() !== null;
    },
    getZoomedProjectReferenceIfValid : function() {
      var I = project_tree.getProjectTreeByRootProjectId(this.location.getProjectTreeRootProjectId());
      if (I === null) {
        return null;
      }
      I = I.getProjectReferenceByProjectId(this.location.getZoomedProjectId());
      if (!I.isValid()) {
        return null;
      }
      return I = I.getPlaceholderReferenceIfApplicable();
    },
    getSearchString : function() {
      return this.location.getSearchString();
    },
    equals : function(I) {
      if (I === null) {
        return false;
      }
      return this.location.equals(I.location);
    },
    getPageHtml : function(I) {
      var L = this.getZoomedProjectReferenceIfValid();
      L = L.isMainTreeRoot() ? "Home" : L.getName();
      var M = this.getSearchString();
      return'<div class="savedViewPage ' + (this.equals(I) ? "selectedSavedViewPage" : "") + '" data-uniqueid="' + this.getUniqueId() + '"><div class="savedViewPageInnerContainer"><div class="savedViewPageName">' + content_text.getHtml(L) + '</div><div class="savedViewPageSearchStringContainer"><span class="savedViewPageSearchString">' + html_utils.htmlEscapeText(M) + '</span></div></div><div class="savedViewPageFader"></div></div>';
    },
    getUniqueId : function() {
      return this.location.getUniqueId();
    },
    getLastViewedTimestamp : function() {
      return this.lastViewedTimestampInMS;
    },
    setLastViewedTimestamp : function(I) {
      this.lastViewedTimestampInMS = I;
    },
    notifyWasJustViewed : function() {
      var I = date_time.getCurrentTimeInMS();
      this.lastViewedTimestampInMS = I;
      if (userstorage.isEnabled()) {
        var L = userstorage.readJSON("savedViewLastViewedTimestamps") || {};
        L[this.location.getUniqueId()] = I;
        userstorage.writeJSON("savedViewLastViewedTimestamps", L);
      }
    }
  });
  var ea = Class.extend({
    init : function(I) {
      this.viewList = I;
    },
    getLength : function() {
      return this.viewList.length;
    },
    contains : function(I) {
      return this.indexOf(I) !== -1;
    },
    getViewByIndex : function(I) {
      return this.viewList[I];
    },
    getMatchingView : function(I) {
      I = this.indexOf(I);
      return I !== -1 ? this.viewList[I] : null;
    },
    indexOf : function(I) {
      var L = 0;
      for (;L < this.viewList.length;L++) {
        if (this.viewList[L].equals(I)) {
          return L;
        }
      }
      return-1;
    },
    copy : function() {
      return new ea(utils.copyArray(this.viewList));
    },
    add : function(I) {
      if (this.contains(I)) {
        return false;
      }
      this.viewList.push(I);
      return true;
    },
    remove : function(I) {
      I = this.indexOf(I);
      if (I === -1) {
        return false;
      }
      this.viewList.splice(I, 1);
      return true;
    },
    getValidViews : function() {
      var I = [];
      var L = 0;
      for (;L < this.viewList.length;L++) {
        var M = this.viewList[L];
        if (M.isValid()) {
          I.push(M);
        }
      }
      return new ea(I);
    },
    getValidViewsAsLocations : function() {
      var I = [];
      this.viewList.forEach(function(L) {
        L = L.getLocation().getValidPlaceholderLocationIfApplicable();
        if (L !== null) {
          I.push(L);
        }
      });
      return I;
    },
    getNextView : function(I, L) {
      var M = this.indexOf(I);
      if (this.viewList.length === 0) {
        return null;
      }
      var U;
      switch(L) {
        case "none":
          U = M === -1 ? 0 : M;
          break;
        case "left":
          U = M === -1 || M === 0 ? this.viewList.length - 1 : M - 1;
          break;
        case "right":
          U = M === -1 || M === this.viewList.length - 1 ? 0 : M + 1;
      }
      return this.viewList[U];
    },
    getSwitchDirection : function(I, L) {
      if (I === null) {
        return "right";
      }
      var M = this.indexOf(I);
      if (M === -1) {
        return "right";
      }
      return this.indexOf(L) < M ? "left" : "right";
    },
    getViewByUniqueId : function(I) {
      var L = 0;
      for (;L < this.viewList.length;L++) {
        var M = this.viewList[L];
        if (M.getUniqueId() === I) {
          return M;
        }
      }
      return null;
    },
    sortByMostRecentlyViewed : function() {
      this.viewList.sort(function(I, L) {
        var M = I.getLastViewedTimestamp();
        var U = L.getLastViewedTimestamp();
        return M < U ? 1 : U < M ? -1 : I.getUniqueId() < L.getUniqueId() ? -1 : 1;
      });
    },
    generateDiff : function(I) {
      var L = new ea([]);
      I = I.copy();
      var M = 0;
      for (;M < this.viewList.length;M++) {
        var U = this.viewList[M];
        if (!I.remove(U)) {
          L.add(U);
        }
      }
      M = {};
      if (I.getLength() > 0) {
        M.added = I;
      }
      if (L.getLength() > 0) {
        M.removed = L;
      }
      return M;
    },
    getViewInfoList : function() {
      var I = [];
      var L = 0;
      for (;L < this.viewList.length;L++) {
        I.push(this.viewList[L].getInfo());
      }
      return I;
    },
    getPageListHtml : function(I) {
      var L = "";
      var M = 0;
      for (;M < this.viewList.length;M++) {
        L += this.viewList[M].getPageHtml(I);
      }
      return L;
    },
    getJson : function() {
      return JSON.stringify(this.getViewInfoList());
    }
  });
  jQuery.fn.transitionOrAnimate = function(I, L, M) {
    var U = $(this);
    if ($.support.transition) {
      U.transition(I, L, M);
    } else {
      U.animate(I, L, M);
    }
  };
  return{
    init : function() {
      if (N = !project_tree.getMainProjectTree().isShared() && (!IS_MOBILE)) {
        a(true);
        if (userstorage.isEnabled()) {
          var I = userstorage.readJSON("savedViewLastViewedTimestamps") || {};
          var L;
          for (L in I) {
            var M = I[L];
            var U = r.getViewByUniqueId(L);
            if (U !== null) {
              U.setLastViewedTimestamp(M);
            }
          }
        }
        $(".savedViewPage").live("click", function() {
          var ba = $(this);
          ba = u.getViewByUniqueId(ba.attr("data-uniqueid"));
          if (ba !== null) {
            g(null, ba);
            setTimeout(n, 0);
          }
        }).live("contextmenu", function() {
          return false;
        });
        $(".page.active .pageStar").live("click", function() {
          v();
        }).live("contextmenu", function() {
          return false;
        });
        $("#savedViewHUDButton").bind("click", function() {
          if (D) {
            q(true);
          } else {
            l(false, "none");
          }
          return false;
        }).mousedown(function() {
          return false;
        });
        $("#savedViewHUD").bind("mouseenter", function() {
          e();
        }).bind("mouseleave", function() {
          q();
        }).bind("mousemove", function() {
          w = true;
        }).bind("mousedown", function() {
          return false;
        });
      }
    },
    registerSettingChange : a,
    generateViewListJsonDiff : function(I, L) {
      var M = h(I);
      var U = h(L);
      M = M.generateDiff(U);
      U = {};
      if ("added" in M) {
        U.added = M.added.getViewInfoList();
      }
      if ("removed" in M) {
        U.removed = M.removed.getViewInfoList();
      }
      return JSON.stringify(U);
    },
    HUDIsVisible : function() {
      return z;
    },
    hideIfModifierNotPressed : function() {
      if (J === null) {
        if (!(!B && (E || G))) {
          q();
        }
      }
    },
    notifyViewChanged : k,
    pretendModifierKeysNotPressedUntilTheyAreReleased : function() {
      B = true;
    },
    updateModifierKeyStatus : function(I, L) {
      if (N) {
        var M = !E && !G;
        E = I;
        G = L;
        var U = !E && !G;
        if (!M && U) {
          if (B) {
            B = false;
          } else {
            if (M = z) {
              if (M = !(A || F)) {
                if (!(M = !w)) {
                  M = $("#savedViewHUD").find(".savedViewPage.selectedSavedViewPage");
                  M = !(M.length === 1 && M.prev(".savedViewPage").length === 0);
                }
                M = M;
              }
              M = M;
            }
            if (M) {
              n(true);
            }
          }
        }
      }
    },
    switchToSelectedViewIfAppropriate : function() {
      if (z) {
        if (!(A || F)) {
          n();
        }
      }
    },
    switchLeft : function() {
      p("left");
    },
    switchRight : function() {
      p("right");
    },
    toggleCurrentViewSaved : v,
    getValidSavedLocations : function() {
      return r.getValidViewsAsLocations();
    }
  };
}();



/*
  Added functionality below:
*/

allJSFinishedLoadingCallback();
