/* Modello 3D di un singolo limone, ricavato dal rilievo del fondo (campo_3d_lidar).
   Piante 1-30: ricostruite dalle schede fotografiche. Le altre: chioma standard con altezza e diametro del rilievo. */
(function () {
  var DATI = {"sch":[{"n":1,"h":2.3,"w":2.6,"hb":0.5,"tr":1,"lean":12,"forma":"cespuglio","dens":0.75,"col":"chiaro","succ":0.7,"frutti":0.1},{"n":2,"h":2.5,"w":3,"hb":0.55,"tr":1,"lean":6,"forma":"cespuglio","dens":0.65,"col":"chiaro","succ":0.8,"frutti":0.05},{"n":3,"h":1.9,"w":2.6,"hb":0.3,"tr":2,"lean":10,"forma":"cespuglio","dens":0.5,"col":"chiaro","succ":0.9,"frutti":0},{"n":4,"h":2.6,"w":2.1,"hb":0.65,"tr":1,"lean":4,"forma":"globo","dens":0.7,"col":"chiaro","succ":0.5,"frutti":0.1},{"n":5,"h":2.8,"w":2,"hb":0.9,"tr":1,"lean":8,"forma":"eretto","dens":0.45,"col":"chiaro","succ":0.8,"frutti":0.05},{"n":6,"h":2.7,"w":3,"hb":0.6,"tr":2,"lean":10,"forma":"vaso","dens":0.6,"col":"medio","succ":0.4,"frutti":0.1},{"n":7,"h":4.4,"w":3.6,"hb":1.2,"tr":3,"lean":8,"forma":"vaso","dens":0.55,"col":"scuro","succ":0.2,"frutti":0.15},{"n":8,"h":3.2,"w":4,"hb":0.8,"tr":1,"lean":3,"forma":"ombrello","dens":0.8,"col":"scuro","succ":0.1,"frutti":0.15},{"n":9,"h":3,"w":3.6,"hb":0.8,"tr":2,"lean":6,"forma":"ombrello","dens":0.6,"col":"medio","succ":0.2,"frutti":0.1},{"n":10,"h":3,"w":3,"hb":0.4,"tr":3,"lean":5,"forma":"vaso","dens":0.6,"col":"medio","succ":0.5,"frutti":0.05},{"n":11,"h":3,"w":2.5,"hb":0.6,"tr":1,"lean":3,"forma":"eretto","dens":0.8,"col":"chiaro","succ":0.6,"frutti":0.15},{"n":12,"h":3,"w":2.5,"hb":0.6,"tr":1,"lean":3,"forma":"eretto","dens":0.8,"col":"chiaro","succ":0.6,"frutti":0.15},{"n":13,"h":3.4,"w":3,"hb":0.6,"tr":1,"lean":4,"forma":"eretto","dens":0.8,"col":"chiaro","succ":0.8,"frutti":0.1},{"n":14,"h":2.7,"w":3.2,"hb":0.7,"tr":1,"lean":8,"forma":"globo","dens":0.65,"col":"medio","succ":0.3,"frutti":0.05},{"n":15,"h":2.5,"w":2.8,"hb":0.5,"tr":1,"lean":3,"forma":"globo","dens":0.75,"col":"medio","succ":0.3,"frutti":0.05},{"n":16,"h":2.2,"w":3,"hb":0.25,"tr":2,"lean":6,"forma":"cespuglio","dens":0.6,"col":"medio","succ":0.3,"frutti":0.05},{"n":17,"h":4,"w":3.4,"hb":1.5,"tr":2,"lean":7,"forma":"vaso","dens":0.5,"col":"scuro","succ":0.1,"frutti":0.1},{"n":18,"h":2.8,"w":3,"hb":0.7,"tr":1,"lean":14,"forma":"globo","dens":0.6,"col":"medio","succ":0.4,"frutti":0.05},{"n":19,"h":3,"w":3,"hb":0.8,"tr":2,"lean":6,"forma":"vaso","dens":0.6,"col":"medio","succ":0.4,"frutti":0.05},{"n":20,"h":2.9,"w":2,"hb":0.5,"tr":1,"lean":3,"forma":"eretto","dens":0.65,"col":"chiaro","succ":0.9,"frutti":0},{"n":21,"h":3,"w":2.5,"hb":1,"tr":1,"lean":6,"forma":"eretto","dens":0.5,"col":"medio","succ":0.5,"frutti":0.05},{"n":22,"h":3.5,"w":4,"hb":0.8,"tr":2,"lean":5,"forma":"globo","dens":0.9,"col":"scuro","succ":0.1,"frutti":0.1},{"n":23,"h":3.5,"w":4.2,"hb":0.5,"tr":2,"lean":4,"forma":"globo","dens":0.9,"col":"scuro","succ":0.1,"frutti":0.1},{"n":24,"h":3.5,"w":3.6,"hb":0.7,"tr":2,"lean":6,"forma":"globo","dens":0.85,"col":"scuro","succ":0.2,"frutti":0.4},{"n":25,"h":3.6,"w":3.6,"hb":1.2,"tr":1,"lean":5,"forma":"ombrello","dens":0.7,"col":"medio","succ":0.2,"frutti":0.1},{"n":26,"h":3.5,"w":3.6,"hb":0.9,"tr":2,"lean":8,"forma":"ombrello","dens":0.8,"col":"scuro","succ":0.1,"frutti":0.1},{"n":27,"h":3.5,"w":3.2,"hb":0.8,"tr":3,"lean":6,"forma":"vaso","dens":0.7,"col":"scuro","succ":0.1,"frutti":0.35},{"n":28,"h":3.5,"w":3.6,"hb":0.5,"tr":3,"lean":5,"forma":"vaso","dens":0.65,"col":"medio","succ":0.2,"frutti":0.1},{"n":29,"h":3.5,"w":4,"hb":0.6,"tr":3,"lean":6,"forma":"ombrello","dens":0.75,"col":"medio","succ":0.1,"frutti":0.1},{"n":30,"h":3.5,"w":3.6,"hb":1,"tr":2,"lean":4,"forma":"ombrello","dens":0.8,"col":"scuro","succ":0.1,"frutti":0.1}],"lim":[[2.64,1.76],[2.61,1.78],[2.93,1.71],[2.78,1.84],[2.81,1.75],[2.78,1.78],[2.58,1.83],[2.68,1.83],[2.77,1.72],[2.61,1.56],[2.87,1.67],[2.6,1.57],[2.87,1.83],[2.88,1.83],[2.7,1.77],[2.69,1.72],[2.91,1.64],[2.86,1.58],[2.81,1.57],[2.57,1.81],[2.75,1.8],[2.86,1.78],[2.94,1.77],[2.72,1.57],[2.6,1.8],[2.66,1.76],[2.91,1.67],[2.99,1.65],[2.83,1.72],[2.67,1.61],[2.72,1.75],[2.74,1.59],[2.68,1.63],[2.79,1.78],[2.54,1.71],[2.8,1.77],[2.95,1.77],[2.73,1.79],[2.62,1.82],[2.65,1.75],[2.51,1.84],[2.68,1.59],[2.69,1.73],[2.53,1.84],[2.59,1.81],[2.63,1.64],[2.89,1.83],[2.7,1.75],[2.53,1.7],[2.55,1.84],[2.57,1.78],[2.53,1.69],[2.96,1.78],[2.6,1.85],[2.99,1.57],[2.77,1.6],[2.51,1.8],[2.5,1.6],[2.87,1.6],[2.65,1.83],[2.64,1.7],[2.95,1.73],[2.53,1.73],[3,1.71],[2.72,1.74],[2.63,1.85],[2.7,1.58],[2.81,1.84],[2.98,1.6],[2.56,1.64],[2.56,1.68],[2.95,1.63],[2.74,1.82],[2.85,1.57],[2.66,1.72],[2.85,1.57],[2.65,1.67],[2.59,1.8],[2.88,1.8],[2.93,1.64],[2.81,1.64],[2.74,1.81],[2.53,1.77],[2.8,1.59],[2.76,1.82],[2.92,1.6],[2.76,1.67],[2.85,1.7],[2.94,1.84],[2.51,1.55],[2.67,1.8],[2.91,1.84],[2.9,1.65],[2.69,1.82],[2.71,1.67],[2.71,1.63],[2.89,1.58],[2.71,1.64],[2.62,1.77],[2.61,1.68],[2.7,1.55],[2.7,1.8],[2.7,1.62],[2.67,1.64],[2.76,1.58],[2.82,1.85],[2.67,1.75],[2.68,1.76],[2.73,1.61],[2.76,1.64],[2.61,1.74],[2.91,1.78],[2.96,1.65],[2.95,1.7],[2.85,1.7],[2.69,1.56],[2.68,1.8],[2.78,1.6],[2.86,1.59],[2.63,1.62],[2.52,1.82],[2.74,1.78],[2.99,1.59],[2.5,1.63],[2.99,1.71],[2.92,1.79],[2.84,1.72],[2.82,1.6],[2.99,1.77],[2.73,1.64],[2.69,1.72],[3,1.64],[2.78,1.56],[2.52,1.58],[2.77,1.66],[2.88,1.67],[2.62,1.66],[2.51,1.6],[2.63,1.76],[2.78,1.62],[2.94,1.75],[2.72,1.64],[2.56,1.62],[2.75,1.72],[2.58,1.7],[2.76,1.75],[2.98,1.6],[2.79,1.61],[2.56,1.79],[2.58,1.62],[2.73,1.58],[2.51,1.67],[2.96,1.84],[2.52,1.77],[2.69,1.65],[2.76,1.77],[2.52,1.72],[2.61,1.65],[2.86,1.62],[2.8,1.56],[2.84,1.55],[2.58,1.65],[3,1.57],[2.8,1.65],[2.52,1.63],[2.75,1.63],[2.83,1.79],[2.93,1.79],[2.97,1.64],[2.89,1.65],[2.6,1.62],[2.89,1.78],[2.93,1.79],[3,1.75],[2.5,1.67],[2.56,1.66],[2.68,1.58],[2.66,1.77],[2.56,1.67],[2.99,1.63],[2.83,1.55],[2.86,1.82],[2.77,1.57],[2.73,1.67],[2.69,1.6],[2.65,1.78],[2.78,1.72],[2.8,1.62],[2.64,1.8],[2.77,1.78],[2.82,1.73],[2.71,1.66],[2.79,1.67],[2.81,1.62],[2.95,1.66],[2.87,1.66],[2.59,1.76],[2.75,1.68],[2.67,1.64],[2.7,1.84],[2.86,1.54],[2.68,1.77],[2.52,1.83],[2.62,1.66],[2.5,1.69],[2.59,1.67],[2.64,1.59],[2.53,1.55],[2.89,1.57],[2.58,1.82],[2.79,1.54],[2.74,1.62],[2.78,1.8],[2.93,1.81],[2.81,1.59],[2.63,1.83],[2.59,1.83],[2.65,1.76],[2.98,1.55],[2.8,1.78],[2.95,1.72],[2.83,1.64],[2.91,1.56],[2.51,1.7],[2.94,1.81],[2.57,1.66],[2.65,1.83],[2.57,1.82],[2.73,1.84],[2.75,1.72],[2.69,1.69],[2.74,1.64],[2.72,1.78],[2.71,1.59],[2.51,1.69],[2.71,1.8],[2.63,1.59],[2.55,1.57],[2.58,1.56],[2.76,1.83],[2.96,1.72],[2.75,1.55],[2.94,1.61],[2.74,1.59],[2.96,1.66],[2.76,1.77],[2.92,1.83],[2.76,1.68],[2.51,1.75],[2.79,1.76],[2.59,1.83],[2.56,1.83],[2.81,1.6],[2.86,1.83],[2.58,1.64],[2.72,1.64],[2.53,1.6],[2.51,1.66],[2.92,1.65],[2.87,1.69],[2.73,1.8],[2.69,1.64],[2.58,1.82],[2.53,1.74],[2.97,1.69],[2.74,1.76],[2.8,1.84],[2.88,1.79],[2.74,1.77],[2.61,1.66],[2.81,1.58],[2.91,1.72],[2.79,1.74],[2.73,1.79],[2.88,1.61],[2.51,1.76],[2.73,1.72],[2.68,1.65],[2.71,1.7],[2.69,1.68],[2.65,1.83],[2.8,1.73],[2.58,1.68],[2.94,1.68],[2.56,1.75],[2.65,1.61],[2.74,1.71],[2.96,1.64],[2.69,1.85],[2.77,1.7],[2.78,1.6],[2.7,1.69],[2.83,1.57],[2.69,1.65],[2.88,1.64],[2.87,1.68],[2.79,1.57],[2.54,1.73],[2.62,1.8],[2.76,1.61],[2.51,1.78],[2.53,1.64],[2.9,1.79],[2.75,1.59],[2.77,1.57],[2.85,1.54],[2.67,1.54],[2.99,1.62],[2.57,1.6],[2.98,1.69],[2.87,1.71],[2.89,1.82],[2.65,1.83],[2.5,1.62],[2.6,1.76],[2.94,1.66],[2.76,1.73],[2.53,1.59],[2.65,1.71],[2.56,1.54],[2.97,1.61],[2.83,1.77],[2.8,1.79],[2.76,1.58],[2.84,1.62],[2.73,1.78],[2.78,1.56],[2.83,1.55],[2.66,1.7],[2.82,1.84],[2.86,1.59],[2.97,1.61],[2.58,1.59],[2.62,1.71],[2.53,1.57],[2.96,1.65],[2.8,1.63],[2.72,1.58],[2.56,1.84],[2.99,1.83],[2.58,1.58],[2.7,1.74],[2.91,1.66],[2.76,1.64],[2.84,1.6],[2.72,1.6],[2.62,1.69],[2.61,1.83],[2.9,1.79],[2.61,1.75],[2.8,1.57],[2.66,1.74],[2.72,1.65],[2.82,1.72],[2.83,1.72],[2.63,1.73],[2.75,1.61],[2.66,1.69],[2.53,1.55],[2.84,1.72],[2.68,1.77],[2.6,1.78],[2.92,1.76],[2.92,1.6],[2.57,1.73],[2.52,1.63],[2.58,1.69],[2.53,1.59],[2.57,1.6],[2.9,1.77],[2.99,1.6],[2.83,1.82],[2.84,1.72],[2.72,1.79],[2.88,1.69],[2.9,1.71],[2.88,1.64],[2.66,1.65],[2.6,1.72],[2.89,1.77],[2.59,1.76],[2.83,1.66],[2.57,1.78],[2.56,1.61],[2.87,1.82],[2.84,1.75],[2.84,1.7],[2.56,1.74],[2.98,1.71],[2.68,1.74],[2.56,1.6],[2.94,1.71],[2.6,1.71],[2.79,1.78],[2.63,1.6],[2.92,1.64],[2.53,1.81],[2.81,1.71],[2.67,1.74],[2.98,1.69],[2.96,1.6],[2.99,1.59],[2.55,1.57],[2.88,1.79],[2.86,1.75],[2.71,1.84],[2.94,1.79],[2.68,1.61],[2.67,1.63],[2.75,1.75],[2.75,1.66],[2.96,1.58],[2.96,1.62],[2.9,1.8],[2.64,1.83],[2.78,1.75],[2.79,1.61],[2.88,1.65],[2.98,1.67],[2.59,1.85],[2.97,1.81],[2.81,1.77],[2.87,1.67],[2.93,1.83],[2.55,1.61],[2.54,1.62],[2.6,1.62],[2.87,1.81],[2.89,1.8],[2.95,1.58],[2.73,1.66],[2.88,1.56],[3,1.58],[2.66,1.72],[2.75,1.59],[2.78,1.67],[2.96,1.74],[2.55,1.78],[2.96,1.66],[2.5,1.8],[2.87,1.68],[2.7,1.64],[2.74,1.64],[2.67,1.81],[2.72,1.78],[2.61,1.6],[2.87,1.77],[2.98,1.85]]};
  var caricamento = null;
  function three() {
    if (window.THREE) return Promise.resolve(window.THREE);
    if (caricamento) return caricamento;
    caricamento = new Promise(function (ok, ko) {
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      s.onload = function () { ok(window.THREE); }; s.onerror = ko;
      document.head.appendChild(s);
    });
    return caricamento;
  }
  function rng(seed) { var s = (seed * 9301 + 49297) % 2147483647; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  var TINTA = { chiaro: [0.24, 0.50, 0.36], medio: [0.27, 0.40, 0.27], scuro: [0.29, 0.36, 0.19] };
  function scheda(n) {
    var s = DATI.sch.find(function (x) { return x.n === n; });
    if (s) return s;
    var l = DATI.lim[n - 1] || [2.7, 1.7];
    return { n: n, h: l[0], w: Math.max(1.6, l[1] * 2 * 0.85), hb: 0.5, tr: 1, lean: 6, forma: 'globo', dens: 0.8, col: 'medio', succ: 0.25, frutti: 0.3 };
  }
  function costruisci(T, s) {
    var g = new T.Group(), legno = [], foglie = [], frutti = [], getti = [];
    var V3 = function (a, b, c) { return new T.Vector3(a, b, c); };
    var R = rng(s.n * 7 + 3), x = 0, z = 0, y0 = 0;
    var leanDir = R() * 6.283, lean = s.lean * Math.PI / 180;
    var rT = 0.055 + 0.022 * s.h / Math.sqrt(s.tr), tops = [];
    for (var i = 0; i < s.tr; i++) {
      var a = leanDir + (s.tr > 1 ? i / s.tr * 6.283 + R() * 0.6 : 0);
      var tilt = lean + (s.tr > 1 ? 0.22 + R() * 0.2 : 0);
      var L = s.hb * (0.9 + R() * 0.25) / Math.cos(tilt);
      var d = V3(Math.sin(tilt) * Math.cos(a), Math.cos(tilt), Math.sin(tilt) * Math.sin(a));
      var p0 = V3(x + (R() - .5) * 0.08, y0 - 0.15, z + (R() - .5) * 0.08);
      var m = p0.clone().addScaledVector(d, L * 0.5).add(V3((R() - .5) * 0.14, 0, (R() - .5) * 0.14));
      var p1 = p0.clone().addScaledVector(d, L + 0.15);
      legno.push([p0, m, rT], [m, p1, rT * 0.85]); tops.push([p1, rT * 0.75]);
    }
    var hc = s.h - s.hb, rx = s.w / 2, ry = hc / 2, sh = Math.sin(lean) * s.hb;
    var cx = x + Math.cos(leanDir) * sh, cz = z + Math.sin(leanDir) * sh, cy = y0 + s.hb + ry;
    var nb = { vaso: 4, ombrello: 5, globo: 4, cespuglio: 6, eretto: 3 }[s.forma];
    var ang = { vaso: 0.62, ombrello: 0.95, globo: 0.55, cespuglio: 0.75, eretto: 0.22 }[s.forma];
    var tips = [];
    tops.forEach(function (tp, ti) {
      var p = tp[0], r = tp[1], k = Math.max(2, Math.round(nb / s.tr) + (R() < .5 ? 0 : 1));
      for (var j = 0; j < k; j++) {
        var az = (j / k) * 6.283 + ti * 1.3 + R() * 0.6, el = ang * (0.75 + R() * 0.5);
        var bd = V3(Math.sin(el) * Math.cos(az), Math.cos(el), Math.sin(el) * Math.sin(az));
        var len = Math.min(Math.hypot(rx * 0.85, ry * 1.1), (y0 + s.h - p.y) * 1.1) * (0.7 + R() * 0.3);
        var e = p.clone().addScaledVector(bd, len);
        if (e.y > y0 + s.h - 0.35) e.y = y0 + s.h - 0.35 - R() * 0.3;
        var mm = p.clone().lerp(e, 0.5).add(V3((R() - .5) * .25, (R() - .3) * .2, (R() - .5) * .25));
        legno.push([p, mm, r * 0.7], [mm, e, r * 0.45]);
        for (var q2 = 0; q2 < 2; q2++) {
          var a2 = az + (R() - .5) * 2.2, e2 = el + 0.2 + R() * 0.4;
          var d2 = V3(Math.sin(e2) * Math.cos(a2), Math.cos(e2) * (s.forma === 'ombrello' ? 0.45 : 1), Math.sin(e2) * Math.sin(a2)).normalize();
          var st = mm.clone().lerp(e, 0.3 + R() * 0.4), en = st.clone().addScaledVector(d2, len * 0.45);
          legno.push([st, en, r * 0.25]); tips.push(en);
        }
        tips.push(e);
      }
    });
    var nf = Math.round(14 + s.dens * 30 * Math.max(1, (s.w * hc) / 5));
    for (var f = 0; f < nf; f++) {
      var pp = null;
      for (var t = 0; t < 25 && !pp; t++) {
        var u = R() * 2 - 1, th = R() * 6.283, rr = Math.cbrt(R());
        var dx = Math.sqrt(1 - u * u) * Math.cos(th) * rr, dz = Math.sqrt(1 - u * u) * Math.sin(th) * rr, dy = u * rr;
        if (s.forma === 'ombrello') { if (dy < -0.15 && R() < 0.85) continue; dy = dy * 0.7 + 0.18; }
        if (s.forma === 'vaso' && Math.hypot(dx, dz) < 0.38 && dy < 0.35 && R() < 0.85) continue;
        if (s.forma === 'eretto') { dx *= 0.8; dz *= 0.8; }
        if (s.forma === 'cespuglio') dy -= 0.12;
        if (R() > s.dens * 0.6 + 0.45) continue;
        pp = V3(cx + dx * rx, cy + dy * ry, cz + dz * rx);
      }
      if (!pp) continue;
      var tq = tips[Math.floor(R() * tips.length)]; if (tq) pp.lerp(tq, 0.22);
      foglie.push([pp, (0.36 + R() * 0.3) * (0.75 + 0.4 * s.dens) * Math.min(1.25, Math.max(0.8, s.w / 3)), s.col, R()]);
    }
    var ns = Math.round(s.succ * 11);
    for (var k2 = 0; k2 < ns; k2++) {
      var a3 = R() * 6.283, r3 = R() * rx * 0.6;
      var q0 = V3(cx + Math.cos(a3) * r3, cy + ry * (0.3 + R() * 0.4), cz + Math.sin(a3) * r3);
      var q1 = q0.clone().add(V3((R() - .5) * 0.2, 0.6 + R() * 0.9, (R() - .5) * 0.2));
      getti.push([q0, q1]);
      foglie.push([q1.clone().add(V3(0, -0.2, 0)), 0.16 + R() * 0.12, 'chiaro', R()]);
      foglie.push([q0.clone().lerp(q1, 0.55), 0.14 + R() * 0.1, 'chiaro', R()]);
    }
    var nfr = Math.round(s.frutti * 70 + 5);
    for (var k3 = 0; k3 < nfr; k3++) {
      var u2 = R() * 2 - 1, th2 = R() * 6.283, kk = 0.85 + R() * 0.15;
      frutti.push(V3(cx + Math.sqrt(1 - u2 * u2) * Math.cos(th2) * rx * kk, cy + u2 * ry * 0.9 * kk, cz + Math.sqrt(1 - u2 * u2) * Math.sin(th2) * rx * kk));
    }
    var up = V3(0, 1, 0), m4 = new T.Matrix4(), q = new T.Quaternion(), sc = V3(1, 1, 1), pv = V3(0, 0, 0), col = new T.Color();
    function segmenti(lista, geo, mat) {
      var im = new T.InstancedMesh(geo, mat, lista.length);
      lista.forEach(function (sg, i) {
        var dd = sg[1].clone().sub(sg[0]), LL = dd.length();
        q.setFromUnitVectors(up, dd.normalize());
        m4.compose(pv.copy(sg[0]).lerp(sg[1], 0.5), q, sc.set(sg[2], LL, sg[2])); im.setMatrixAt(i, m4);
      });
      im.castShadow = true; im.receiveShadow = true; return im;
    }
    g.add(segmenti(legno, new T.CylinderGeometry(0.72, 1, 1, 7), new T.MeshLambertMaterial({ color: 0x5A4A3C })));
    if (getti.length) g.add(segmenti(getti.map(function (v) { return [v[0], v[1], 0.022]; }), new T.CylinderGeometry(1, 1, 1, 5), new T.MeshLambertMaterial({ color: 0x6E8A3E })));
    var gF = new T.IcosahedronGeometry(1, 1), ps = gF.attributes.position;
    for (var i2 = 0; i2 < ps.count; i2++) { var X = ps.getX(i2), Y = ps.getY(i2), Z = ps.getZ(i2), ff = 1 + 0.16 * Math.sin(X * 6.1 + Y * 4.7) + 0.12 * Math.cos(Z * 5.3 - Y * 3.9); ps.setXYZ(i2, X * ff, Y * ff, Z * ff); }
    gF.computeVertexNormals();
    var fo = new T.InstancedMesh(gF, new T.MeshLambertMaterial({ flatShading: true }), foglie.length);
    foglie.forEach(function (fl, i) {
      q.setFromAxisAngle(up, fl[3] * 6.28); m4.compose(fl[0], q, sc.set(fl[1], fl[1] * 0.85, fl[1])); fo.setMatrixAt(i, m4);
      var c = TINTA[fl[2]] || TINTA.medio; col.setHSL(c[0] + (fl[3] - .5) * 0.03, c[1] + (fl[3] - .5) * 0.08, c[2] + (fl[3] - .5) * 0.06); fo.setColorAt(i, col);
    });
    fo.castShadow = fo.receiveShadow = true; g.add(fo);
    var fr = new T.InstancedMesh(new T.IcosahedronGeometry(0.065, 1), new T.MeshLambertMaterial({ color: 0xE0B526 }), frutti.length);
    frutti.forEach(function (p, i) { m4.compose(p, q.identity(), sc.set(1, 1.15, 1)); fr.setMatrixAt(i, m4); });
    g.add(fr);
    var suolo = new T.Mesh(new T.CircleGeometry(Math.max(2.2, s.w * 0.95), 48), new T.MeshLambertMaterial({ color: 0x5B4A38 }));
    suolo.rotation.x = -Math.PI / 2; suolo.position.y = -0.02; suolo.receiveShadow = true; g.add(suolo);
    return g;
  }
  function monta(el, n) {
    if (!el || el.__albero === n) return;
    if (el.__ferma) el.__ferma();
    el.__albero = n;
    three().then(function (T) {
      if (el.__albero !== n) return;
      var s = scheda(n), W = el.clientWidth || 300, H = el.clientHeight || 300;
      var ren = new T.WebGLRenderer({ antialias: true, alpha: true });
      ren.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); ren.setSize(W, H, false);
      ren.shadowMap.enabled = true; ren.shadowMap.type = T.PCFSoftShadowMap; ren.outputEncoding = T.sRGBEncoding;
      ren.domElement.style.cssText = 'position:absolute;inset:0;display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab';
      el.innerHTML = ''; el.style.position = 'relative'; el.appendChild(ren.domElement);
      var scena = new T.Scene(), cam = new T.PerspectiveCamera(36, W / H, 0.1, 100);
      scena.add(new T.HemisphereLight(0xD8E4EA, 0x4A3B2C, 0.75));
      var sole = new T.DirectionalLight(0xfff0d8, 0.95); sole.position.set(4, 8, 3); sole.castShadow = true;
      sole.shadow.mapSize.set(1024, 1024); Object.assign(sole.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
      scena.add(sole);
      var albero = costruisci(T, s); scena.add(albero);
      var cy = s.h * 0.5, dist = Math.max(s.h, s.w) * 2.1 + 1, yaw = 0.6, pitch = 0.22, auto = true, drag = null, raf = 0;
      function posa() { cam.position.set(Math.sin(yaw) * Math.cos(pitch) * dist, cy + Math.sin(pitch) * dist, Math.cos(yaw) * Math.cos(pitch) * dist); cam.lookAt(0, cy, 0); }
      function giro() { if (auto && !drag) yaw += 0.004; posa(); ren.render(scena, cam); raf = requestAnimationFrame(giro); }
      var c = ren.domElement;
      c.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY }; auto = false; c.style.cursor = 'grabbing'; try { c.setPointerCapture(e.pointerId); } catch (x) {} });
      c.addEventListener('pointermove', function (e) { if (!drag) return; yaw -= (e.clientX - drag.x) * 0.012; pitch = Math.max(-0.15, Math.min(1.2, pitch + (e.clientY - drag.y) * 0.008)); drag = { x: e.clientX, y: e.clientY }; });
      var fine = function () { drag = null; c.style.cursor = 'grab'; };
      c.addEventListener('pointerup', fine); c.addEventListener('pointercancel', fine);
      c.addEventListener('wheel', function (e) { e.preventDefault(); dist = Math.max(2.5, Math.min(14, dist * (1 + e.deltaY * 0.001))); }, { passive: false });
      var ro = window.ResizeObserver ? new ResizeObserver(function () { var w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; ren.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }) : null;
      if (ro) ro.observe(el);
      giro();
      el.__ferma = function () { cancelAnimationFrame(raf); if (ro) ro.disconnect(); ren.dispose(); el.__ferma = null; };
    });
  }
  window.SEF3D = { monta: monta, scheda: scheda, totale: DATI.lim.length, haFoto: function (n) { return DATI.sch.some(function (x) { return x.n === n; }); } };
})();
