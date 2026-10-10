/* Super Etna Food · Adotta un limone — collegamento al servizio
   1. Segui apps-script/ISTRUZIONI.md per pubblicare lo script su Google.
   2. Incolla qui sotto l'indirizzo dell'app web (finisce con /exec).
   Finché è vuoto le pagine girano in modalità DEMO: i dati restano solo in questo browser
   (accesso amministratore: PERICLE22 + la tua password · albero demo: 001 / zagara-4821). */
var SEF_API_URL = '';

(function () {
  var MASTER_HASH = '6fd20959ba757e658f5554e112ca1d50595510338cf9df85aa31176951ee986b', K = 'sef-demo-db-2';
  var DETTI = [
    ["Cu' simina, arricogghi.", 'Chi semina, raccoglie.'],
    ["L'àrbulu si canusci d'u fruttu.", "L'albero si riconosce dal frutto."],
    ["Cu' fa beni, beni aspetta.", 'Chi fa del bene, bene aspetta.'],
    ["Cu' nesci, arrinesci.", 'Chi parte, trova fortuna.'],
    ['U tempu è galantomu.', 'Il tempo è galantuomo.'],
    ['Ogni lignu havi u so fumu.', 'Ogni legno ha il suo fumo.'],
    ['Amuri e tussi nun si ponnu ammucciari.', 'Amore e tosse non si possono nascondere.']
  ];
  var MESI = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
  function pad(n) { return String(n == null ? '' : n).trim().replace(/^0+/, '').padStart(3, '0'); }
  function data(iso) { if (!iso) return ''; var p = String(iso).split('-'); return p.length < 3 ? String(iso) : (+p[2]) + ' ' + MESI[+p[1] - 1] + ' ' + p[0]; }
  function dataBreve(iso) { if (!iso) return ''; var p = String(iso).split('-'); return p.length < 3 ? String(iso) : (+p[2]) + ' ' + MESI[+p[1] - 1].slice(0, 3) + ' ' + p[0]; }
  function fine(iso) { if (!iso) return ''; var d = new Date(iso + 'T12:00:00'); d.setFullYear(d.getFullYear() + 1); d.setDate(d.getDate() - 1); return data(d.toISOString().slice(0, 10)); }
  function oggi() { return new Date().toISOString().slice(0, 10); }
  function id() { return Math.random().toString(36).slice(2, 10); }
  function desc(x, y) { return String(y.data).localeCompare(String(x.data)); }

  /* ---------- modalità demo (stesse regole dello script Google) ---------- */
  function semina() {
    return {
      alberi: { '001': { numero: '001', password: 'zagara-4821', adottante: 'Maria Rossi', email: '', formula: 'Spedito in Italia', inizio: '2026-10-01', varieta: 'Femminello', posizione: 'Filare F1, pianta 1', impianto: '1960', ultimaRaccolta: 'Gennaio 2026, primofiore', note: 'Pianta del 1960 nel primo filare, in buono stato.', certificato: '',
        consegne: [{ quando: 'Dicembre 2026', cosa: 'Primofiore, 15 kg', stato: 'In programma' }, { quando: 'Agosto 2027', cosa: 'Verdello, 15 kg', stato: 'In programma' }], stato: '' } },
      foto: [
        { id: id(), numero: '001', data: '2026-10-06', nota: 'Il verdello ancora sulla pianta, prima della raccolta.', src: 'assets/verdello-pianta.jpg' },
        { id: id(), numero: '001', data: '2026-05-10', nota: 'La potatura di produzione.', src: 'assets/potatura.jpg' },
        { id: id(), numero: '001', data: '2026-01-20', nota: "Il filare con l'Etna sullo sfondo.", src: 'assets/limoneto-etna.jpg' }
      ],
      diario: [
        { id: id(), numero: '001', data: '2026-05-10', tipo: 'Potatura', testo: 'Potatura di produzione, arieggiamento della chioma', kg: '' }
      ]
    };
  }
  function carica() { try { var d = JSON.parse(localStorage.getItem(K)); if (d && d.alberi) return d; } catch (e) {} var s = semina(); salva(s); return s; }
  function salva(d) { try { localStorage.setItem(K, JSON.stringify(d)); } catch (e) { throw new Error('Memoria della demo piena: elimina qualche foto.'); } }
  function pub(d, a, conPw) {
    var n = pad(a.numero), c = JSON.parse(JSON.stringify(a)); c.numero = n;
    if (!conPw) delete c.password;
    c.consegne = c.consegne || [];
    c.foto = d.foto.filter(function (f) { return pad(f.numero) === n; }).sort(desc);
    c.diario = d.diario.filter(function (f) { return pad(f.numero) === n; }).sort(desc);
    return c;
  }
  function utente(d, p) { var a = d.alberi[pad(p.numero)]; if (!a || !a.password || a.password !== String(p.password)) throw new Error('Numero o password non corretti.'); return a; }
  function master(p) { if (p._h !== MASTER_HASH) throw new Error('Password master non corretta.'); }
  var DATI = ['password','adottante','email','formula','inizio','varieta','posizione','impianto','ultimaRaccolta','note','certificato','consegne','targa'];
  function locale(p) {
    var d = carica(), a, n, i;
    if (p.azione.charAt(0) === 'm') master(p);
    n = p.numero != null ? pad(p.numero) : (p.albero ? pad(p.albero.numero) : '');
    a = d.alberi[n];
    switch (p.azione) {
      case 'accedi': return pub(d, utente(d, p));
      case 'proponi':
        a = utente(d, p);
        if (a.stato === 'inviato' || a.stato === 'approvato') throw new Error('La targhetta è già stata inviata.');
        var nome = String(p.nome || '').trim().slice(0, 32); if (!nome) throw new Error('Scrivi il nome della pianta.');
        Object.assign(a, { nomeProposto: nome, dettoProposto: String(p.detto || '').slice(0, 80), traduzioneProposta: String(p.traduzione || '').slice(0, 100), fotoTarghetta: p.foto || '', stato: 'inviato', inviatoIl: oggi(), motivo: '' });
        salva(d); return pub(d, a);
      case 'mElenco': return Object.keys(d.alberi).sort().map(function (k) { return pub(d, d.alberi[k], true); });
      case 'mSalva':
        a = a || { numero: n, stato: '' };
        DATI.forEach(function (k) { if (p.albero[k] !== undefined) a[k] = p.albero[k]; });
        d.alberi[n] = a; salva(d); return pub(d, a, true);
      case 'mFoto': d.foto.push({ id: id(), numero: n, data: p.data || oggi(), nota: p.nota || '', src: p.foto }); break;
      case 'mEliminaFoto': d.foto = d.foto.filter(function (f) { return f.id !== p.id; }); break;
      case 'mDiario': d.diario.push({ id: id(), numero: n, data: p.data || oggi(), tipo: p.tipo || 'Nota', testo: p.testo || '', kg: p.kg || '' }); break;
      case 'mEliminaDiario': d.diario = d.diario.filter(function (f) { return f.id !== p.id; }); break;
      case 'mApprova':
        if (!a) throw new Error('Albero non trovato.');
        Object.assign(a, { nomePianta: a.nomeProposto, detto: a.dettoProposto, traduzione: a.traduzioneProposta, stato: 'approvato', approvatoIl: oggi() }); break;
      case 'mRespingi': if (!a) throw new Error('Albero non trovato.'); Object.assign(a, { stato: 'respinto', motivo: p.motivo || '' }); break;
      case 'mRiapri': if (!a) throw new Error('Albero non trovato.'); Object.assign(a, { stato: '', motivo: '' }); break;
      default: throw new Error('Azione sconosciuta.');
    }
    salva(d); return pub(d, d.alberi[n] || { numero: n }, true);
  }

  window.SEF = {
    demo: !SEF_API_URL, DETTI: DETTI,
    pad: pad, data: data, dataBreve: dataBreve, fine: fine, oggi: oggi,
    chiama: function (azione, dati) {
      var p = Object.assign({ azione: azione }, dati || {});
      if (!SEF_API_URL) {
        var h = p.master && window.crypto && crypto.subtle ? crypto.subtle.digest('SHA-256', new TextEncoder().encode(p.master)).then(function (b) { return Array.prototype.map.call(new Uint8Array(b), function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); }) : Promise.resolve('');
        return h.then(function (hx) { p._h = hx; return new Promise(function (ok, ko) { setTimeout(function () { try { ok(locale(p)); } catch (e) { ko(e); } }, 250); }); });
      }
      return fetch(SEF_API_URL, { method: 'POST', body: JSON.stringify(p) })
        .then(function (r) { return r.json(); }, function () { throw new Error('Connessione non riuscita. Riprova tra poco.'); })
        .then(function (r) { if (!r.ok) throw new Error(r.errore || 'Errore del servizio.'); return r.dati; });
    },
    leggiFoto: function (file, max) {
      max = max || 1600;
      return new Promise(function (ok, ko) {
        var fr = new FileReader();
        fr.onerror = ko;
        fr.onload = function () {
          var img = new Image();
          img.onerror = ko;
          img.onload = function () {
            var s = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
            c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
            c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
            ok(c.toDataURL('image/jpeg', 0.85));
          };
          img.src = fr.result;
        };
        fr.readAsDataURL(file);
      });
    }
  };
})();

/* ---------- certificato PDF e immagine da condividere ---------- */
(function () {
  var S = window.SEF; if (!S) return;
  function img(src, cors) {
    return new Promise(function (ok) {
      if (!src) return ok(null);
      var i = new Image(); if (cors) i.crossOrigin = 'anonymous';
      i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = src;
    });
  }
  function righe(ctx, testo, max) {
    var parole = String(testo || '').split(' '), out = [], r = '';
    parole.forEach(function (p) { var t = r ? r + ' ' + p : p; if (ctx.measureText(t).width > max && r) { out.push(r); r = p; } else r = t; });
    if (r) out.push(r); return out;
  }
  function scrivi(ctx, testo, x, y, max, lh) { var rr = righe(ctx, testo, max); rr.forEach(function (r, i) { ctx.fillText(r, x, y + i * lh); }); return y + rr.length * lh; }
  function adatta(im, x, y, w, h) { var s = Math.min(w / im.width, h / im.height), fw = im.width * s, fh = im.height * s; return { x: x + (w - fw) / 2, y: y + (h - fh) / 2, w: fw, h: fh }; }
  function copri(ctx, im, x, y, w, h) { var s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s; ctx.drawImage(im, (im.width - sw) / 2, (im.height - sh) / 2, sw, sh, x, y, w, h); }
  function caratteri() {
    if (!document.fonts) return Promise.resolve();
    return Promise.all(['500 40px Newsreader', 'italic 400 40px Newsreader', '600 20px Karla', '400 20px Karla'].map(function (f) { return document.fonts.load(f); })).catch(function () {});
  }
  function fotoSicura(a) {
    var f = (a.foto || [])[0];
    var src = (f && f.src) || '';
    return img(src, /^https?:/.test(src)).then(function (im) {
      if (!im) return null;
      try { var c = document.createElement('canvas'); c.width = c.height = 2; c.getContext('2d').drawImage(im, 0, 0, 2, 2); c.toDataURL(); return im; } catch (e) { return null; }
    });
  }
  function dati(a) {
    var nome = a.nomePianta || a.nomeProposto || '';
    return { n: S.pad(a.numero), adottante: a.adottante || '', nome: nome, detto: a.detto || a.dettoProposto || '', trad: a.traduzione || a.traduzioneProposta || '',
      varieta: a.varieta || '', posizione: a.posizione || '', impianto: a.impianto || '',
      periodo: a.inizio ? 'dal ' + S.data(a.inizio) + ' al ' + S.fine(a.inizio) : '' };
  }
  function misura(x, it, k, maxW) {
    if (it.img) return { h: it.h * k, rr: [] };
    var s = it.s * k; x.font = it.f(s);
    var rr = it.uno ? [it.t] : righe(x, it.t, maxW);
    if (it.uno) { while (x.measureText(it.t).width > maxW && s > 12) { s *= 0.94; x.font = it.f(s); } }
    return { h: rr.length * s * (it.lh || 1.2), rr: rr, s: s };
  }
  function blocco(x, items, cx, top, bottom, maxW, extra) {
    var k = 1, m, tot;
    for (; k >= 0.5; k -= 0.04) {
      tot = 0; m = items.map(function (it) { var r = misura(x, it, k, maxW); tot += r.h + (it.gap || 0) * k; return r; });
      if (top + tot + (extra || 0) <= bottom) break;
    }
    var y = top + Math.max(0, (bottom - top - tot - (extra || 0)) / 2);
    items.forEach(function (it, i) {
      y += (it.gap || 0) * k; var r = m[i];
      if (it.img) { if (it.draw) it.draw(y, r.h); else x.drawImage(it.img, cx - r.h / 2, y, r.h, r.h); y += r.h; return; }
      x.font = it.f(r.s); x.fillStyle = it.c; x.textAlign = 'center'; x.textBaseline = 'top';
      var lh = r.s * (it.lh || 1.2);
      r.rr.forEach(function (riga, j) { x.fillText(riga, cx, y + j * lh + (lh - r.s) / 2); });
      y += r.h;
    });
    x.textBaseline = 'alphabetic';
    return y;
  }
  var SER = function (w, it) { return function (s) { return (it ? 'italic ' : '') + w + ' ' + Math.round(s) + 'px Newsreader, Georgia, serif'; }; };
  var SAN = function (w) { return function (s) { return w + ' ' + Math.round(s) + 'px Karla, sans-serif'; }; };
  function piastrella(x, px, py, w, h) {
    var cx = px + w / 2, cy = py + h / 2, s = Math.min(w, h);
    x.fillStyle = '#F6EBD3'; x.fillRect(px, py, w, h);
    x.fillStyle = '#F2C218';
    [[px, py], [px + w, py], [px, py + h], [px + w, py + h]].forEach(function (p) { x.beginPath(); x.arc(p[0], p[1], s * 0.2, 0, Math.PI * 2); x.fill(); });
    x.fillStyle = '#3E8A2E';
    for (var i = 0; i < 4; i++) { var an = Math.PI / 4 + i * Math.PI / 2; x.beginPath(); x.ellipse(cx + Math.cos(an) * s * 0.3, cy + Math.sin(an) * s * 0.3, s * 0.11, s * 0.05, an, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = '#1F4E9A';
    for (var j = 0; j < 4; j++) { var b = j * Math.PI / 2; x.beginPath(); x.ellipse(cx + Math.cos(b) * s * 0.17, cy + Math.sin(b) * s * 0.17, s * 0.15, s * 0.075, b, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = '#F2C218'; x.beginPath(); x.arc(cx, cy, s * 0.09, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#C8541E'; x.beginPath(); x.arc(cx, cy, s * 0.04, 0, Math.PI * 2); x.fill();
    x.strokeStyle = 'rgba(31,78,154,0.55)'; x.lineWidth = 2; x.strokeRect(px + 1, py + 1, w - 2, h - 2);
  }
  function rosone(x, cx, cy, r) {
    x.fillStyle = '#7A3E22'; x.beginPath(); x.arc(cx, cy, r + 10, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#F6EBD3'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
    for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4; x.fillStyle = i % 2 ? '#3E8A2E' : '#1F4E9A'; x.beginPath(); x.ellipse(cx + Math.cos(a) * r * 0.48, cy + Math.sin(a) * r * 0.48, r * 0.36, r * 0.14, a, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = '#C8541E'; x.beginPath(); x.arc(cx, cy, r * 0.24, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#F2C218'; x.beginPath(); x.arc(cx, cy, r * 0.16, 0, Math.PI * 2); x.fill();
    x.strokeStyle = '#E0A57A'; x.lineWidth = 3; x.beginPath(); x.arc(cx, cy, r + 4, 0, Math.PI * 2); x.stroke();
  }
  function triscele(x, cx, cy, r, col) {
    x.strokeStyle = col; x.lineWidth = r * 0.12; x.lineCap = 'round';
    for (var k = 0; k < 3; k++) {
      x.beginPath();
      for (var t = 0; t <= 1; t += 0.02) { var an = k * 2 * Math.PI / 3 + t * Math.PI * 2.4, rr = r * (0.15 + 0.85 * t), px = cx + Math.cos(an) * rr * 0.55, py = cy + Math.sin(an) * rr * 0.55;
        var ox = cx + Math.cos(k * 2 * Math.PI / 3) * r * 0.45, oy = cy + Math.sin(k * 2 * Math.PI / 3) * r * 0.45;
        var qx = ox + Math.cos(an) * r * 0.4 * (1 - t), qy = oy + Math.sin(an) * r * 0.4 * (1 - t);
        var X = t < 0.5 ? qx : qx, Y = t < 0.5 ? qy : qy; if (t === 0) x.moveTo(X, Y); else x.lineTo(X, Y); }
      x.lineTo(cx, cy); x.stroke();
    }
    x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r * 0.12, 0, Math.PI * 2); x.fill();
    x.lineCap = 'butt';
  }
  function rilievo(x, ins, W, H, sp) {
    x.strokeStyle = '#5C2E18'; x.lineWidth = sp; x.strokeRect(ins, ins, W - 2 * ins, H - 2 * ins);
    x.strokeStyle = '#E8B48A'; x.lineWidth = Math.max(2, sp / 3); x.strokeRect(ins + sp * 0.7, ins + sp * 0.7, W - 2 * ins - sp * 1.4, H - 2 * ins - sp * 1.4);
  }
  function cornice(x, W, H, T) {
    var g = x.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, Math.max(W, H) * 0.75);
    g.addColorStop(0, '#D99464'); g.addColorStop(0.55, '#B56E40'); g.addColorStop(1, '#7A3E22');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    var o = Math.round(T * 0.37);
    rilievo(x, o, W, H, Math.max(6, T * 0.13));
    var M = Math.round(T * 1.1), L = M, R = W - M, B = M, E = H - M;
    var n = Math.max(3, Math.round((R - L - 2 * T) / T)), tw = (R - L - 2 * T) / n;
    for (var i = 0; i < n; i++) { piastrella(x, L + T + i * tw, B, tw, T); piastrella(x, L + T + i * tw, E - T, tw, T); }
    var m = Math.max(3, Math.round((E - B - 2 * T) / T)), th = (E - B - 2 * T) / m;
    for (var j = 0; j < m; j++) { piastrella(x, L, B + T + j * th, T, th); piastrella(x, R - T, B + T + j * th, T, th); }
    x.strokeStyle = '#5C2E18'; x.lineWidth = Math.max(3, T * 0.065); x.strokeRect(L, B, R - L, E - B); x.strokeRect(L + T, B + T, R - L - 2 * T, E - B - 2 * T);
    [[L + T / 2, B + T / 2], [R - T / 2, B + T / 2], [L + T / 2, E - T / 2], [R - T / 2, E - T / 2]].forEach(function (p) { rosone(x, p[0], p[1], T * 0.72); });
    var gap = Math.round(T * 0.28), PX = L + T + gap, PY = B + T + gap, PW = R - L - 2 * T - 2 * gap, PH = E - B - 2 * T - 2 * gap;
    var pg = x.createLinearGradient(0, PY, 0, PY + PH); pg.addColorStop(0, '#FCF5E6'); pg.addColorStop(1, '#F4E7CC');
    x.fillStyle = pg; x.fillRect(PX, PY, PW, PH);
    x.strokeStyle = '#B56E40'; x.lineWidth = Math.max(3, T * 0.055); x.strokeRect(PX, PY, PW, PH);
    x.strokeStyle = '#E0A57A'; x.lineWidth = 2; x.strokeRect(PX + T * 0.15, PY + T * 0.15, PW - T * 0.3, PH - T * 0.3);
    return { x: PX, y: PY, w: PW, h: PH };
  }
  function fotoItem(x, foto, fh, maxW, gap) {
    return { img: true, h: fh, gap: gap, draw: function (y, h) {
      var cx = x.canvas.width / 2, p = adatta(foto, cx - maxW / 2, y, maxW, h), b = Math.max(8, h * 0.02);
      x.fillStyle = '#7A3E22'; x.fillRect(p.x - b, p.y - b, p.w + 2 * b, p.h + 2 * b);
      x.strokeStyle = '#E8B48A'; x.lineWidth = 3; x.strokeRect(p.x - b / 2, p.y - b / 2, p.w + b, p.h + b);
      x.drawImage(foto, p.x, p.y, p.w, p.h);
    } };
  }
  function altezza(x, items, maxW) { var t = 0; items.forEach(function (it) { t += misura(x, it, 1, maxW).h + (it.gap || 0); }); return t; }
  function certificato(a) {
    return Promise.all([caratteri(), img('assets/logo-round.png'), fotoSicura(a)]).then(function (r) {
      var logo = r[1], foto = r[2], d = dati(a), W = 1754, H = 2480, c = document.createElement('canvas'), x = c.getContext('2d');
      c.width = W; c.height = H;
      var P = cornice(x, W, H, 92), maxW = P.w - 200, cx = W / 2;
      var info = [d.varieta, d.posizione, d.impianto ? 'piantato nel ' + d.impianto : ''].filter(Boolean).join(' · ');
      var sopra = [];
      if (logo) sopra.push({ img: logo, h: 240 });
      sopra.push({ t: 'AZIENDA AGRICOLA ETNEA · ADOTTA UN LIMONE', f: SAN(600), s: 30, c: '#7A3E22', gap: 28, uno: true });
      sopra.push({ t: 'Certificato di adozione', f: SER(500), s: 100, c: '#5C2E18', gap: 18, uno: true, lh: 1.1 });
      sopra.push({ t: 'Si certifica che', f: SER(400, true), s: 44, c: '#3a2a20', gap: 26 });
      sopra.push({ t: d.adottante || '—', f: SER(500), s: 84, c: '#201e1d', gap: 8, uno: true, lh: 1.1 });
      sopra.push({ t: "ha adottato l'albero di limone n. " + d.n + (d.nome ? ' «' + d.nome + '»' : '') + " nel limoneto di Acireale, alle pendici dell\u2019Etna.", f: SER(400, true), s: 44, c: '#3a2a20', gap: 16, lh: 1.3 });
      var sotto = [];
      if (info) sotto.push({ t: info, f: SAN(400), s: 32, c: '#5a4636', gap: 36, lh: 1.35 });
      if (d.periodo) sotto.push({ t: 'Adozione ' + d.periodo, f: SAN(600), s: 34, c: '#0A5806', gap: 14, lh: 1.35 });
      if (d.detto) sotto.push({ t: d.detto, f: SER(400, true), s: 42, c: '#7A3E22', gap: 26, lh: 1.3 });
      var top = P.y + 60, bottom = P.y + P.h - 230, items = sopra.slice();
      if (foto) { var fw = Math.min(maxW, 1000), fh = Math.max(380, Math.min(900, bottom - top - altezza(x, sopra, maxW) - altezza(x, sotto, maxW) - 60)); fh = Math.min(fh, fw * foto.height / foto.width); items.push(fotoItem(x, foto, fh, fw, 50)); }
      items = items.concat(sotto);
      blocco(x, items, cx, top, bottom, maxW);
      var sy = P.y + P.h - 120;
      x.textAlign = 'left'; x.fillStyle = '#201e1d'; x.font = SER(400, true)(42); x.fillText('Antonio Grasso', P.x + 80, sy - 20);
      x.strokeStyle = '#5C2E18'; x.lineWidth = 2; x.beginPath(); x.moveTo(P.x + 80, sy); x.lineTo(P.x + 560, sy); x.stroke();
      x.font = SAN(400)(26); x.fillStyle = '#5a4636'; x.fillText('Super Etna Food · Acireale (CT)', P.x + 80, sy + 40);
      x.textAlign = 'right'; x.fillText('www.superetnafood.it', P.x + P.w - 80, sy + 40);
      return c;
    });
  }
  function storia(a) {
    return Promise.all([caratteri(), img('assets/logo-round.png'), fotoSicura(a)]).then(function (r) {
      var logo = r[1], foto = r[2], d = dati(a), W = 1080, H = 1920, c = document.createElement('canvas'), x = c.getContext('2d');
      c.width = W; c.height = H;
      var P = cornice(x, W, H, 64), maxW = P.w - 90, cx = W / 2;
      var testa = [{ t: "Ho adottato questo albero di limone sull'Etna", f: SER(400, true), s: 46, c: '#7A3E22', gap: 0, lh: 1.25 }];
      var sotto = [{ t: d.nome || ('Albero n. ' + d.n), f: SER(500), s: 78, c: '#5C2E18', gap: 36, lh: 1.1 }];
      if (d.detto) sotto.push({ t: d.detto, f: SER(400, true), s: 40, c: '#7A3E22', gap: 20, lh: 1.3 });
      var hLogo = 420, top = P.y + 40, bottom = P.y + P.h - 150;
      var fh = Math.max(340, Math.min(760, bottom - top - altezza(x, testa, maxW) - altezza(x, sotto, maxW) - hLogo - 30 - 36));
      var items = testa.slice();
      if (foto) items.push(fotoItem(x, foto, Math.min(fh, maxW * foto.height / foto.width), maxW, 36));
      else items.push({ img: true, h: Math.min(fh, 420), gap: 36, draw: function (y, hh) { rosone(x, cx, y + hh / 2, hh * 0.42); } });
      items = items.concat(sotto);
      if (logo) items.push({ img: logo, h: hLogo, gap: 30 });
      blocco(x, items, cx, top, bottom, maxW);
      var sy = P.y + P.h - 60;
      x.textAlign = 'center'; x.fillStyle = '#5a4636'; x.font = SAN(400)(28); x.fillText('Adotta anche tu il tuo albero', cx, sy - 44);
      x.fillStyle = '#0A5806'; x.font = SAN(600)(36); x.fillText('superetnafood.it', cx, sy);
      return c;
    });
  }
  S._certCanvas = certificato; S._storiaCanvas = storia;
  function blob(c, tipo, q) { return new Promise(function (ok) { c.toBlob(ok, tipo, q); }); }
  function pdfDaJpeg(bytes, w, h) {
    var enc = new TextEncoder(), parti = [], off = 0, offs = [];
    function add(x) { var b = typeof x === 'string' ? enc.encode(x) : x; parti.push(b); off += b.length; }
    var PW = w > h ? 842 : 595, PH = w > h ? 595 : 842, stream = 'q ' + PW + ' 0 0 ' + PH + ' 0 0 cm /Im0 Do Q';
    add('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
    offs[1] = off; add('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    offs[2] = off; add('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
    offs[3] = off; add('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + PW + ' ' + PH + '] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n');
    offs[4] = off; add('4 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + w + ' /Height ' + h + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + bytes.length + ' >>\nstream\n'); add(bytes); add('\nendstream\nendobj\n');
    offs[5] = off; add('5 0 obj\n<< /Length ' + stream.length + ' >>\nstream\n' + stream + '\nendstream\nendobj\n');
    var xref = off, t = 'xref\n0 6\n0000000000 65535 f \n';
    for (var i = 1; i <= 5; i++) t += String(offs[i]).padStart(10, '0') + ' 00000 n \n';
    add(t + 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF');
    return new Blob(parti, { type: 'application/pdf' });
  }
  function scarica(b, nome) { var u = URL.createObjectURL(b), l = document.createElement('a'); l.href = u; l.download = nome; document.body.appendChild(l); l.click(); l.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 4000); }
  S.scaricaCertificato = function (a) {
    return certificato(a).then(function (c) { return blob(c, 'image/jpeg', 0.92).then(function (b) { return b.arrayBuffer(); }).then(function (ab) {
      scarica(pdfDaJpeg(new Uint8Array(ab), c.width, c.height), 'certificato-albero-' + S.pad(a.numero) + '.pdf');
    }); });
  };
  S.METALLI = {
    bronzo: { nome: 'Bronzo', per: 'Sostenitore base', bg: 'assets/targhetta-bronzo.jpg', fondo: '#8E5A3C', ink: '#FFFFFF', ombra: 'none', foto: '77.2%', vuota: '#FFFFFF' },
    argento: { nome: 'Argento', per: 'Sostenitore a distanza', bg: 'assets/targhetta-argento.jpg', fondo: '#B9BCC0', ink: '#7A5208', ombra: 'none', foto: '76.7%', vuota: '#7A5208' },
    oro: { nome: 'Oro', per: 'Sostenitore da vicino', bg: 'assets/targhetta-oro.jpg', fondo: '#D1A94A', ink: '#FAFBFC', ombra: 'none', foto: '76.7%', vuota: '#FAFBFC' }
  };
  S.FORMULA_METALLO = { "Il tuo albero sull'Etna": 'bronzo', 'Spedito in Italia': 'argento', 'Dal fondo alle tue mani': 'oro' };
  S.metallo = function (a) { var k = (a && a.targa) || (a && S.FORMULA_METALLO[a.formula]) || 'bronzo'; return Object.assign({ chiave: k }, S.METALLI[k] || S.METALLI.bronzo); };
  S.scaricaFoto = function (a) {
    return storia(a).then(function (c) { return blob(c, 'image/png'); }).then(function (b) { scarica(b, 'certificato-albero-' + S.pad(a.numero) + '.png'); return 'scaricato'; });
  };
  S.condividi = function (a) {
    return storia(a).then(function (c) { return blob(c, 'image/png'); }).then(function (b) {
      var nome = 'albero-' + S.pad(a.numero) + '.png', file = new File([b], nome, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        return navigator.share({ files: [file], title: 'Il mio albero sull\u2019Etna', text: 'Ho adottato un albero di limoni sull\u2019Etna con Super Etna Food 🍋 superetnafood.it' }).then(function () { return 'condiviso'; }, function (e) { if (e && e.name === 'AbortError') return 'annullato'; scarica(b, nome); return 'scaricato'; });
      }
      scarica(b, nome); return 'scaricato';
    });
  };
})();
