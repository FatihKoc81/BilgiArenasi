// BİR KELİME BİR İŞLEM (tek kişilik)
// Turlar sırayla: Kelime, İşlem, Kelime, İşlem, Kelime, İşlem
// index.html en altında şu satır olmalı: <script src="islem.js"></script>
(function () {
  const ana = document.getElementById("ana");
  if (!ana) return;

  const TURLAR = ["k", "i", "k", "i", "k", "i"];
  const SURE_K = 60, SURE_I = 90, OPS = ["+", "−", "×", "÷"];
  const SESLI = "aaaaaaaeeeeeeeeiiiiiiıııııoooouuuüüöö";
  const SESSIZ = "rrrrrrllllllnnnnnkkkkkddddmmmmttttssssyyybbbzzzşşşccççggghhppvvfjğ";
  const KEL = `
araba kitap kalem masa sandalye pencere kapı duvar çatı bahçe çiçek ağaç yaprak orman deniz nehir göl dağ
tepe ova yol sokak şehir köy kasaba ülke dünya güneş yıldız bulut yağmur kar rüzgar fırtına şimşek gökyüzü
ekmek peynir zeytin domates salatalık patates soğan sarımsak biber patlıcan kabak havuç elma armut kiraz
çilek karpuz kavun üzüm portakal mandalina limon muz incir erik şeftali nar fındık ceviz badem
anne baba kardeş abla ağabey dede nine amca dayı teyze hala çocuk bebek arkadaş komşu öğretmen öğrenci
doktor hemşire mühendis avukat polis asker çiftçi işçi memur şoför pilot aşçı terzi berber
okul sınıf ders defter silgi çanta tahta bilgisayar telefon televizyon radyo kamera ekran klavye
tarih coğrafya matematik fizik kimya biyoloji edebiyat felsefe müzik resim spor futbol basketbol voleybol
tenis yüzme koşu yürüyüş bisiklet motosiklet otobüs tramvay metro vapur uçak tren gemi helikopter
sabah öğle akşam gece bugün yarın hafta ay yıl mevsim ilkbahar yaz sonbahar kış
kırmızı mavi yeşil sarı turuncu mor pembe siyah beyaz gri kahverengi
büyük küçük uzun kısa geniş dar kalın ince ağır hafif hızlı yavaş sıcak soğuk
güzel çirkin temiz kirli yeni eski genç yaşlı zengin fakir mutlu üzgün
sevgi saygı dostluk barış özgürlük adalet cesaret sabır umut hayal gerçek
kağıt zarf mektup gazete dergi roman hikaye masal şiir şarkı türkü
öğrenmek anlamak düşünmek konuşmak yazmak okumak dinlemek izlemek yürümek koşmak
oturmak kalkmak uyumak uyanmak yemek içmek pişirmek yıkamak
kelime harf cümle sözcük anlam sorun cevap soru çözüm oyun yarışma puan ödül
zaman saat dakika saniye takvim program plan proje çalışma
kuş balık kedi köpek at koyun keçi inek tavuk horoz ördek kaz arı kelebek karınca örümcek
aslan kaplan fil zürafa maymun kurt tilki ayı tavşan geyik
hastane eczane market pazar mağaza restoran kafe otel müze kütüphane stadyum sinema tiyatro
anahtar kilit ayna lamba halı perde yastık yorgan battaniye dolap sehpa koltuk
bardak tabak kaşık çatal bıçak tencere tava demlik fincan
`.split(/\s+/).filter(Boolean);
  const KSET = new Set(KEL);

  const $ = id => document.getElementById(id);
  const rnd = n => Math.floor(Math.random() * n);
  const TR = s => s.toLocaleUpperCase("tr");
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function mk(text, cls, fn) { const b = el("button", cls, text); b.onclick = fn; return b; }

  const css = document.createElement("style");
  css.textContent = `
  #isEkran .isHedef{text-align:center;color:#7f89b8;margin-bottom:6px}
  #isEkran .isHedef b{display:block;font-size:60px;line-height:1.1;color:#fff}
  #isEkran .isTur{text-align:center;color:#7f89b8;margin-bottom:4px}
  #isEkran .isSure{height:8px;background:#232f4a;border-radius:8px;margin:12px 0;overflow:hidden}
  #isEkran .isSure i{display:block;height:100%;width:100%;background:#2fbf71;transition:width 1s linear}
  #isEkran .isGrid{display:grid;gap:10px;margin-bottom:12px}
  #isEkran .isSay{grid-template-columns:repeat(3,1fr)}
  #isEkran .isIsl{grid-template-columns:repeat(4,1fr)}
  #isEkran .isHarf{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:12px}
  #isEkran .isGrid button,#isEkran .isHarf button{border:0;border-radius:999px;background:#232f4a;color:#fff;font:inherit;font-size:24px;font-weight:700;padding:14px 0;cursor:pointer}
  #isEkran .isHarf button{border-radius:14px;background:#3b6fe0}
  #isEkran .isGrid button.sec{background:#5c1a1a}
  #isEkran .isGrid button:disabled,#isEkran .isHarf button:disabled{opacity:.3;cursor:default}
  #isEkran .isKel{text-align:center;font-size:30px;font-weight:700;letter-spacing:3px;min-height:44px;margin-bottom:10px;color:#fff}
  #isEkran .isBilgi{text-align:center;color:#7f89b8;margin-bottom:10px}
  #isEkran .isLog{min-height:80px;white-space:pre-line;color:#7f89b8;line-height:1.7;margin-bottom:8px}
  #isEkran .isMsg{text-align:center;font-weight:700;min-height:28px;margin-bottom:8px}
  #isEkran .isUst{display:flex;justify-content:space-between;color:#7f89b8;margin-bottom:6px}
  `;
  document.head.append(css);

  const ekran = document.createElement("section");
  ekran.className = "kart hidden";
  ekran.id = "isEkran";
  ekran.innerHTML = `
    <div class="isUst"><b>🔤 Bir Kelime Bir İşlem</b><span id="isPuan">Puan: 0</span></div>
    <div class="isTur" id="isTur"></div>
    <div class="isSure"><i id="isBar"></i></div>
    <div id="isGovde"></div>
    <div class="isMsg" id="isMsg"></div>
    <div id="isAlt"></div>
    <button class="btn ikinci" id="isMenu">Ana menü</button>`;
  ana.after(ekran);

  const buton = document.createElement("button");
  buton.className = "btn ikinci";
  buton.textContent = "🔤 Bir Kelime Bir İşlem";
  ana.append(buton);

  let tur = 0, toplam = 0, tid, bitti = false, K, I;

  function puanYaz() { $("isPuan").textContent = "Puan: " + toplam; }
  function msg(t, ok) { $("isMsg").style.color = ok ? "#2fbf71" : "#f0b429"; $("isMsg").textContent = t; }

  function sayac(sn, son) {
    clearInterval(tid);
    const bar = $("isBar");
    bar.style.transition = "none";
    bar.style.width = "100%";
    bar.style.background = "";
    void bar.offsetWidth;
    bar.style.transition = "";
    let k = sn;
    tid = setInterval(() => {
      k--;
      bar.style.width = Math.max(0, k / sn * 100) + "%";
      if (k <= sn / 4) bar.style.background = "#f0b429";
      if (k <= 0) { clearInterval(tid); son(); }
    }, 1000);
  }

  function sonrakiBtn() {
    return mk(tur >= TURLAR.length - 1 ? "🏁 Sonucu gör" : "Sonraki tur ▶", "btn", () => {
      tur++;
      tur >= TURLAR.length ? oyunBitti() : turBasla();
    });
  }

  function turBasla() {
    bitti = false;
    clearInterval(tid);
    $("isMsg").textContent = "";
    $("isBar").style.transition = "none";
    $("isBar").style.width = "100%";
    $("isBar").style.background = "";
    $("isTur").textContent = "Tur " + (tur + 1) + "/" + TURLAR.length + " · " + (TURLAR[tur] === "k" ? "🔤 Kelime" : "🔢 İşlem");
    TURLAR[tur] === "k" ? kelimeBasla() : islemBasla();
  }

  function yeniOyun() { tur = 0; toplam = 0; puanYaz(); turBasla(); }

  function oyunBitti() {
    clearInterval(tid);
    $("isTur").textContent = "Oyun bitti";
    $("isMsg").textContent = "";
    const g = $("isGovde"), a = $("isAlt");
    g.textContent = ""; a.textContent = "";
    const h = el("div", "isHedef", "Toplam puan");
    h.append(el("b", "", toplam));
    g.append(h);
    a.append(mk("🔄 Tekrar oyna", "btn", yeniOyun));
  }

  // ---------- KELİME TURU ----------
  function kelimeBasla() { K = { h: [], kul: [] }; kCiz(); }

  function kKelime() { return K.kul.map(i => K.h[i]).join(""); }

  function kCiz() {
    const g = $("isGovde"), a = $("isAlt");
    g.textContent = ""; a.textContent = "";
    const tam = K.h.length === 10;
    const kutu = el("div", "isHarf");
    for (let i = 0; i < 10; i++) {
      const b = el("button", "", i < K.h.length ? TR(K.h[i]) : "?");
      b.disabled = !tam || bitti || K.kul.includes(i);
      b.onclick = () => { K.kul.push(i); kCiz(); };
      kutu.append(b);
    }
    g.append(kutu);
    if (!tam) {
      g.append(el("div", "isBilgi", "Harf seç: " + K.h.length + "/10"));
      a.append(mk("Sesli harf", "btn", () => harfEkle(SESLI)));
      a.append(mk("Sessiz harf", "btn ikinci", () => harfEkle(SESSIZ)));
      return;
    }
    g.append(el("div", "isKel", kKelime() ? TR(kKelime()) : "…"));
    if (bitti) { a.append(sonrakiBtn()); return; }
    a.append(mk("✅ Gönder", "btn", kBitir));
    const sil = mk("⌫ Sil", "btn ikinci", () => { K.kul.pop(); kCiz(); });
    sil.disabled = !K.kul.length;
    a.append(sil);
  }

  function harfEkle(havuz) {
    K.h.push(havuz[rnd(havuz.length)]);
    if (K.h.length === 10) sayac(SURE_K, kBitir);
    kCiz();
  }

  function yapilir(k, harfler) {
    const c = harfler.slice();
    for (const ch of k) {
      const i = c.indexOf(ch);
      if (i < 0) return false;
      c.splice(i, 1);
    }
    return true;
  }

  function kBitir() {
    if (bitti) return;
    bitti = true;
    clearInterval(tid);
    const w = kKelime();
    const ok = w.length >= 2 && KSET.has(w);
    const puan = ok ? w.length + (w.length === 10 ? 10 : 0) : 0;
    toplam += puan;
    puanYaz();
    const en = KEL.filter(k => yapilir(k, K.h)).sort((x, y) => y.length - x.length)[0];
    let yazi;
    if (!w) yazi = "Kelime kurmadın. Puan yok.";
    else if (ok) yazi = TR(w) + " ✔ +" + puan + " puan";
    else yazi = TR(w) + " listede yok. Puan yok.";
    if (en && en !== w) yazi += "\nListedeki en uzun: " + TR(en) + " (" + en.length + " harf)";
    msg(yazi, ok);
    $("isMsg").style.whiteSpace = "pre-line";
    kCiz();
  }

  // ---------- İŞLEM TURU ----------
  function hesapla(a, op, b) {
    if (op === "+") return a + b;
    if (op === "−") return a > b ? a - b : null;
    if (op === "×") return a * b;
    return b && a % b === 0 ? a / b : null;
  }

  function bulmaca() {
    const buyuk = [25, 50, 75, 100].sort(() => Math.random() - .5).slice(0, 1 + rnd(3));
    const havuz = buyuk.slice();
    while (havuz.length < 6) havuz.push(1 + rnd(10));
    for (let t = 0; t < 3000; t++) {
      let l = havuz.slice();
      const adim = 3 + rnd(3);
      for (let s = 0; s < adim && l.length > 1; s++) {
        const x = rnd(l.length), y = rnd(l.length);
        if (x === y) continue;
        const r = hesapla(l[x], OPS[rnd(4)], l[y]);
        if (r === null || r < 1) continue;
        l = l.filter((_, k) => k !== x && k !== y);
        l.push(r);
      }
      const son = l[l.length - 1];
      if (son >= 100 && son <= 999 && !havuz.includes(son)) return { havuz, hedef: son };
    }
    return { havuz: [100, 75, 50, 25, 3, 7], hedef: 652 };
  }

  function islemBasla() {
    const p = bulmaca();
    I = { hedef: p.hedef, sayilar: p.havuz.map((v, i) => ({ v, id: i })), gecmis: [], secA: null, secOp: null };
    sayac(SURE_I, iBitir);
    iCiz();
  }

  function iCiz() {
    const g = $("isGovde"), a = $("isAlt");
    g.textContent = ""; a.textContent = "";
    const h = el("div", "isHedef", "Hedef sayı");
    h.append(el("b", "", I.hedef));
    const say = el("div", "isGrid isSay");
    I.sayilar.forEach(n => {
      const b = el("button", I.secA === n.id ? "sec" : "", n.v);
      b.disabled = bitti;
      b.onclick = () => sayiSec(n.id);
      say.append(b);
    });
    const isl = el("div", "isGrid isIsl");
    OPS.forEach(o => {
      const b = el("button", I.secOp === o ? "sec" : "", o);
      b.disabled = bitti || I.secA === null;
      b.onclick = () => { I.secOp = o; iCiz(); };
      isl.append(b);
    });
    const log = el("div", "isLog", I.gecmis.length ? I.gecmis.map(x => x.yazi).join("\n") : "Bir sayı, bir işlem, bir sayı seç.");
    g.append(h, say, isl, log);
    if (bitti) { a.append(sonrakiBtn()); return; }
    a.append(mk("✅ Bitir", "btn", iBitir));
    const geri = mk("↩️ Geri al", "btn ikinci", iGeri);
    geri.disabled = !I.gecmis.length;
    a.append(geri);
  }

  function sayiSec(id) {
    if (bitti) return;
    if (I.secA === null || I.secOp === null) { I.secA = id; iCiz(); return; }
    if (id === I.secA) { I.secA = null; I.secOp = null; iCiz(); return; }
    const a = I.sayilar.find(n => n.id === I.secA), b = I.sayilar.find(n => n.id === id);
    const r = hesapla(a.v, I.secOp, b.v);
    if (r === null) { msg(I.secOp === "÷" ? "Bölme tam çıkmalı." : "Sonuç pozitif olmalı.", false); return; }
    $("isMsg").textContent = "";
    I.gecmis.push({ onceki: I.sayilar.slice(), yazi: a.v + " " + I.secOp + " " + b.v + " = " + r });
    I.sayilar = I.sayilar.filter(n => n.id !== a.id && n.id !== b.id);
    I.sayilar.push({ v: r, id: 100 + I.gecmis.length + rnd(1000000) });
    I.secA = null; I.secOp = null;
    if (r === I.hedef) { iBitir(); return; }
    iCiz();
  }

  function iGeri() {
    if (bitti || !I.gecmis.length) return;
    I.sayilar = I.gecmis.pop().onceki;
    I.secA = null; I.secOp = null;
    $("isMsg").textContent = "";
    iCiz();
  }

  function iBitir() {
    if (bitti) return;
    bitti = true;
    clearInterval(tid);
    const hedef = I.hedef;
    const yakin = I.sayilar.reduce((m, n) => Math.abs(n.v - hedef) < Math.abs(m - hedef) ? n.v : m, I.sayilar[0].v);
    const fark = Math.abs(yakin - hedef);
    let puan = 0, yazi;
    if (fark === 0) { puan = 10; yazi = "Tam isabet! +10 puan 🎯"; }
    else if (fark <= 5) { puan = 7; yazi = "En yakın " + yakin + " (" + fark + " fark). +7 puan"; }
    else if (fark <= 10) { puan = 5; yazi = "En yakın " + yakin + " (" + fark + " fark). +5 puan"; }
    else yazi = "En yakın " + yakin + " (" + fark + " fark). Puan yok";
    toplam += puan;
    puanYaz();
    $("isMsg").style.whiteSpace = "";
    msg(yazi, puan > 0);
    iCiz();
  }

  buton.onclick = () => {
    ana.classList.add("hidden");
    ekran.classList.remove("hidden");
    yeniOyun();
  };
  $("isMenu").onclick = () => document.querySelector("h1").click();
  document.addEventListener("anasayfa", () => clearInterval(tid));
})();
