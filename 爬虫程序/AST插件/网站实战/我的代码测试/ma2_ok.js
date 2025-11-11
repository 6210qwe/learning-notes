function R(r, e, _, s) {
  for (var i = 6; void 0 !== i;) {
    var n,
      v,
      k = 7 & i >> 3;
    switch (i) {
      case 0:
        e[3] = 0;
        e[10] = 0;
        e[12] = 0;
        e[4] = 0;
        var x = a % 7;
        if (o) {
          i = 24;
        } else {
          i = 5;
        }
        break;
      case 8:
        C = 1;
        var j = 0 === e.length,
          a = r[4];
        u && (C = 2);
        j ? i = 0 : i = 4;
        break;
      case 16:
        m = (m = (m = m.concat(a)).concat(T)).concat(b);
        i = 1;
        break;
      case 24:
        C = 3;
        var c = a - e[4],
          L = g[x],
          b = L ^ r[10],
          f = L ^ r[12],
          p = f - e[12];
        e[12] = f;
        var E = b - e[10],
          X = L ^ r[2],
          T = L ^ r[3];
        X = Xr(X, _);
        e[10] = b;
        var N = T - e[3];
        e[4] = a;
        var m = [C];
        e[3] = T;
        s ? i = 16 : i = 3;
        break;
      case 3:
        var $ = er(N);
        m = m.concat($);
        var B = er(E);
        m = m.concat(B);
        var l = er(p);
        m = m.concat(l);
        var t = rr(c);
        m = m.concat(t);
        var d = Z(X);
        m = m.concat(d);
        return m;
        break;
      case 6:
        var o = 2 === r[5],
          h = 5 === r[5],
          g = _[98],
          u = 4 === r[5],
          C = 0;
        if (h) {
          i = 8;
        } else {
          i = 2;
        }
        break;
    }
  }
}