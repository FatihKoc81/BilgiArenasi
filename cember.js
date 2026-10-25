/* Kelime Çemberi - Words of Wonders tarzı oyun. Butonunu ana menüye (#ana) kendisi ekler. */
(function () {
// w: ana kelimeler (bulmaca tablosunda çaprazlama yerleşir), b: bonus kelimeler (tabloda yok, bulununca bonus puan)
// Tabloya sığmayan ana kelimeler otomatik bonus kelime olur.
var LEVELS = [
  { l: "KALEM",  w: ["KALEM", "KALE", "ELMA", "ALEM", "KEL", "KAL"],
                 b: ["EMLAK", "KELAM", "AMEL", "LAME", "MAL", "ELA", "LAM", "KAM", "KEM", "AL", "EL", "AK"] },
  { l: "KİTAP",  w: ["KİTAP", "KAP", "TAK", "KİT", "TİP", "PİK"],
                 b: ["TAKİP", "PATİK", "KATİP", "AKİT", "ATİK", "PAKT", "KAT", "KİP", "PAK", "TİK", "AİT", "PAT", "AT", "İP", "İT", "AK"] },
  { l: "GÜNEŞ",  w: ["GÜNEŞ", "GÜN", "ŞEN", "GEN", "EŞ", "ÜN"],
                 b: ["EN", "NE"] },
  { l: "DENİZ",  w: ["DENİZ", "DİZ", "DİN", "DEN", "İZ", "EZ"],
                 b: ["ZİNDE", "DİZE", "EN", "NE", "İN", "DE"] },
  { l: "YAĞMUR", w: ["YAĞMUR", "YAĞ", "MAY", "RAY", "YAR", "YUM"],
                 b: ["AĞ", "AY", "AR", "YA"] },
  { l: "ATLAS", w: ["ATLAS", "SAAT", "ALT", "SAT", "ALA", "TAS"],
    b: ["ASA", "ATA", "SAL", "AL", "AT"] },
  { l: "AYRIK", w: ["AYRIK", "AYRI", "AYI", "YAR", "KIR", "RAY", "ARI"],
    b: ["AKI", "IRK", "KAR", "AK", "AR", "AY", "YA"] },
  { l: "KALIN", w: ["KALIN", "AKIN", "KANI", "ALIN", "AKIL", "NAL", "KAN"],
    b: ["AKI", "KAL", "KIL", "AK", "AL"] },
  { l: "SAKLI", w: ["SAKLI", "AKIL", "ASIL", "KISA", "KIL", "SAL", "KIS"],
    b: ["AKI", "KAL", "KAS", "AK", "AL"] },
  { l: "SANAT", w: ["SANAT", "SANA", "SAAT", "SAT", "ANA", "ANT", "ATA"],
    b: ["ASA", "TAN", "TAS", "AT"] },
  { l: "TASMA", w: ["TASMA", "MASA", "SAAT", "TAM", "SAT", "ASA", "MAT"],
    b: ["AMA", "ATA", "TAS", "AT"] },
  { l: "ŞARKI", w: ["ŞARKI", "KAR", "AŞI", "AŞK", "KIR", "KAŞ", "AKI"],
    b: ["ARI", "IRK", "ŞIK", "AK", "AR"] },
  { l: "ALTIN", w: ["ALTIN", "ALIN", "ALTI", "ANIT", "ATLI", "TAN", "ALT"],
    b: ["ANT", "NAL", "AL", "AT"] },
  { l: "ASKER", w: ["ASKER", "KARE", "KAS", "SAR", "SER", "ERA", "ERK"],
    b: ["KAR", "KES", "AK", "AR", "EK"] },
  { l: "DAMLA", w: ["DAMLA", "ADAM", "DAL", "LAM", "ADA", "ALA", "AMA"],
    b: ["DAM", "MAL", "AL", "DA"] },
  { l: "KOLAY", w: ["KOLAY", "OLAY", "YOLA", "KOLA", "YOK", "KAL", "OYA"],
    b: ["KOL", "YOL", "AK", "AL", "AY", "OK", "OL", "OY", "YA"] },
  { l: "NOKTA", w: ["NOKTA", "NOTA", "ANT", "TON", "KAT", "TAN", "TAK"],
    b: ["KAN", "TOK", "AK", "AT", "OK", "ON", "OT"] },
  { l: "POSTA", w: ["POSTA", "POST", "POTA", "SAT", "PAT", "TAS", "PAS"],
    b: ["SAP", "TOP", "AT", "OT"] },
  { l: "ANLAM", w: ["ANLAM", "ALAN", "ANA", "AMA", "LAM", "ALA", "NAL"],
    b: ["MAL", "AL"] },
  { l: "ASLAN", w: ["ASLAN", "ALAN", "SANA", "ALA", "ANA", "ASA", "NAL"],
    b: ["SAL", "AL"] },
  { l: "AYRAN", w: ["AYRAN", "YARA", "AYNA", "YAN", "RAY", "ANA", "NAR"],
    b: ["YAR", "AR", "AY", "YA"] },
  { l: "DİLEK", w: ["DİLEK", "KEDİ", "DELİ", "DİL", "İLK", "İLE", "KEL"],
    b: ["KİL", "DE", "EK", "EL", "İL"] },
  { l: "HASTA", w: ["HASTA", "SAAT", "ASA", "HAS", "HAT", "TAS", "SAT"],
    b: ["ATA", "AH", "AT"] },
  { l: "KANAT", w: ["KANAT", "TAN", "TAK", "ATA", "KAT", "KAN", "ANT"],
    b: ["ANA", "AK", "AT"] },
  { l: "KENAR", w: ["KENAR", "RENK", "KARE", "ERA", "NAR", "KAN", "KAR"],
    b: ["ERK", "AK", "AR", "EK", "EN", "NE"] },
  { l: "LOKMA", w: ["LOKMA", "MOLA", "KOLA", "LAM", "KAL", "KAM", "MAL"],
    b: ["KOL", "AK", "AL", "OK", "OL"] },
  { l: "MASAL", w: ["MASAL", "MASA", "ASA", "LAM", "ALA", "MAL", "SAL"],
    b: ["AMA", "AL"] },
  { l: "SAKAL", w: ["SAKAL", "SALAK", "KASA", "KAS", "ALA", "SAL", "KAL"],
    b: ["ASA", "AK", "AL"] },
  { l: "SATIR", w: ["SATIR", "SIRA", "SARI", "ARI", "TAS", "SIR", "SAT"],
    b: ["SAR", "AR", "AT"] },
  { l: "TAKIM", w: ["TAKIM", "ATKI", "KAT", "KAM", "TAM", "AKI", "MAT"],
    b: ["TAK", "AK", "AT"] },
  { l: "TARAK", w: ["TARAK", "KARA", "ATAR", "ARKA", "ATA", "KAT", "TAK"],
    b: ["KAR", "AK", "AR", "AT"] },
  { l: "VAKİT", w: ["VAKİT", "ATİK", "AKİT", "AİT", "KİT", "KAT", "TAK"],
    b: ["TİK", "AK", "AT", "İT"] },
  { l: "YALAN", w: ["YALAN", "ALAN", "AYNA", "ALAY", "NAL", "ANA", "YAN"],
    b: ["ALA", "AL", "AY", "YA"] },
  { l: "YARIN", w: ["YARIN", "AYRI", "NAR", "YAN", "ARI", "YAR", "AYI"],
    b: ["RAY", "AR", "AY", "YA"] },
  { l: "YARIŞ", w: ["YARIŞ", "AYRI", "YAR", "YAŞ", "AŞI", "RAY", "AYI"],
    b: ["ARI", "AR", "AY", "YA"] },
  { l: "YAZAR", w: ["YAZAR", "AZAR", "YARA", "YAZ", "ARZ", "YAR", "ZAR"],
    b: ["RAY", "AR", "AY", "AZ", "YA"] },
  { l: "ADRES", w: ["ADRES", "DERS", "DAR", "DER", "SAR", "SER", "ERA"],
    b: ["AR", "DA", "DE"] },
  { l: "BAKIR", w: ["BAKIR", "IRK", "KAR", "BAR", "KIR", "ARI", "AKI"],
    b: ["AK", "AR"] },
  { l: "HAZIR", w: ["HAZIR", "AHIR", "ARI", "HIZ", "HAZ", "ARZ", "ZAR"],
    b: ["AH", "AR", "AZ"] },
  { l: "IRMAK", w: ["IRMAK", "KIR", "KAM", "IRK", "ARI", "AKI", "KAR"],
    b: ["AK", "AR"] },
  { l: "MAKAS", w: ["MAKAS", "MASA", "KASA", "KAS", "KAM", "AMA", "ASA"],
    b: ["AK"] },
  { l: "PAZAR", w: ["PAZAR", "PARA", "AZAR", "ARPA", "RAP", "ARZ", "ZAR"],
    b: ["AR", "AZ"] },
  { l: "SARAY", w: ["SARAY", "YARA", "ASA", "YAR", "YAS", "SAR", "RAY"],
    b: ["AR", "AY", "YA"] },
  { l: "TAVAN", w: ["TAVAN", "TAVA", "VANA", "ATA", "TAN", "ANA", "ANT"],
    b: ["AT"] },
  { l: "ÇELİK", w: ["ÇELİK", "ÇİLEK", "KEL", "ÇEK", "İLE", "KİL", "İLK"],
    b: ["EK", "EL", "İL"] },
  { l: "BALIK", w: ["BALIK", "AKIL", "KIL", "KAL", "AKI", "BAL"],
    b: ["AK", "AL"] },
  { l: "BANYO", w: ["BANYO", "ONAY", "YAN", "BOY", "BAN", "OYA"],
    b: ["AY", "ON", "OY", "YA"] },
  { l: "BASİT", w: ["BASİT", "TAS", "ASİ", "AİT", "BİT", "SAT"],
    b: ["AT", "İT"] },
  { l: "KASIM", w: ["KASIM", "KISA", "KAS", "KIS", "AKI", "KAM"],
    b: ["AK"] },
  { l: "KAŞIK", w: ["KAŞIK", "KAŞ", "ŞIK", "AKI", "AŞK", "AŞI"],
    b: ["AK"] },
  { l: "KEMAN", w: ["KEMAN", "MEKAN", "KEM", "KAN", "KAM", "NEM"],
    b: ["AK", "EK", "EN", "NE"] },
  { l: "KOPYA", w: ["KOPYA", "PAK", "PAY", "OYA", "YOK", "KAP"],
    b: ["AK", "AY", "OK", "OY", "YA"] },
  { l: "KUMAŞ", w: ["KUMAŞ", "AŞK", "KAŞ", "KUŞ", "KAM", "KUM"],
    b: ["AK"] },
  { l: "LAMBA", w: ["LAMBA", "MAL", "BAL", "AMA", "LAM", "ALA"],
    b: ["AL"] },
  { l: "RADYO", w: ["RADYO", "RAY", "OYA", "YAR", "ODA", "DAR"],
    b: ["AR", "AY", "DA", "OY", "YA"] },
  { l: "RAKAM", w: ["RAKAM", "KARA", "ARKA", "KAR", "KAM", "AMA"],
    b: ["AK", "AR"] },
  { l: "SAMAN", w: ["SAMAN", "SANA", "MASA", "AMA", "ASA", "ANA"],
    b: [] },
  { l: "SICAK", w: ["SICAK", "KISA", "KIS", "AKI", "SAC", "KAS"],
    b: ["AK"] },
  { l: "TABAN", w: ["TABAN", "ATA", "TAN", "BAN", "ANT", "ANA"],
    b: ["AT"] },
  { l: "TANIM", w: ["TANIM", "ANIT", "MAT", "TAM", "TAN", "ANT"],
    b: ["AT"] },
  { l: "TAVLA", w: ["TAVLA", "TAVA", "ALA", "LAV", "ALT", "ATA"],
    b: ["AL", "AT"] },
  { l: "TUZAK", w: ["TUZAK", "UZAK", "KAZ", "KAT", "TUZ", "TAK"],
    b: ["AK", "AT", "AZ", "UT", "UZ"] },
  { l: "YAVRU", w: ["YAVRU", "YUVA", "RAY", "VAR", "YAR", "VUR"],
    b: ["AR", "AY", "YA"] },
  { l: "YILAN", w: ["YILAN", "ALIN", "YAN", "NAL", "AYI", "YIL"],
    b: ["AL", "AY", "YA"] },
  { l: "KARTON", w: ["KARTON", "NOKTA", "ORTA", "NOTA", "ORAN", "NAR", "KOR"],
    b: ["ANT", "KAN", "KAR", "KAT", "TAK", "TAN", "TOK", "TON", "AK", "AR", "AT", "OK", "ON", "OT"] },
  { l: "TOPRAK", w: ["TOPRAK", "PAKT", "POTA", "ORTA", "PARK", "KAT", "TOP"],
    b: ["KAP", "KAR", "KOR", "PAK", "PAT", "RAP", "TAK", "TOK", "AK", "AR", "AT", "OK", "OT"] },
  { l: "YAPRAK", w: ["YAPRAK", "KARA", "AYAK", "YARA", "ARKA", "PARA", "PARK"],
    b: ["ARPA", "KAP", "KAR", "PAK", "PAY", "RAP", "RAY", "YAR", "AK", "AR", "AY", "YA"] },
  { l: "ASKERİ", w: ["ASKERİ", "ASKER", "KARE", "ESKİ", "KİRA", "KİR", "ASİ"],
    b: ["ERA", "ERK", "KAR", "KAS", "KES", "SAR", "SER", "AK", "AR", "EK"] },
  { l: "KARTAL", w: ["KARTAL", "TARAK", "TARLA", "ATAR", "ARKA", "KARA", "TAK"],
    b: ["ALA", "ALT", "ATA", "KAL", "KAR", "KAT", "AK", "AL", "AR", "AT"] },
  { l: "KATMAN", w: ["KATMAN", "KANAT", "TAN", "KAT", "AMA", "ATA", "MAT"],
    b: ["ANA", "ANT", "KAM", "KAN", "TAK", "TAM", "AK", "AT"] },
  { l: "TAKVİM", w: ["TAKVİM", "VAKİT", "AKİT", "ATİK", "MAVİ", "TİK", "KAT"],
    b: ["AİT", "KAM", "KİT", "MAT", "TAK", "TAM", "AK", "AT", "İT"] },
  { l: "TASARI", w: ["TASARI", "SATIR", "SARI", "SAAT", "SIRA", "ATAR", "SAT"],
    b: ["ARI", "ASA", "ATA", "SAR", "SIR", "TAS", "AR", "AT"] },
  { l: "YASTIK", w: ["YASTIK", "ATKI", "SAYI", "KISA", "KAS", "AYI", "TAS"],
    b: ["AKI", "KAT", "KIS", "SAT", "TAK", "YAS", "AK", "AT", "AY", "YA"] },
  { l: "İSKELE", w: ["İSKELE", "ESKİ", "LİSE", "LEKE", "KESE", "SEL", "İLK"],
    b: ["ELE", "KEL", "KES", "KİL", "İLE", "EK", "EL", "İL"] },
  { l: "KANTİN", w: ["KANTİN", "ATİK", "AKİT", "TAK", "KİT", "AİT", "TAN"],
    b: ["ANT", "KAN", "KAT", "TİK", "AK", "AT", "İN", "İT"] },
  { l: "KAPLAN", w: ["KAPLAN", "PLAN", "KALP", "ALAN", "ANA", "KAL", "KAN"],
    b: ["ALA", "KAP", "NAL", "PAK", "AK", "AL"] },
  { l: "SALATA", w: ["SALATA", "ATLAS", "SAAT", "TAS", "SAL", "ALT"],
    b: ["ALA", "ASA", "ATA", "SAT", "AL", "AT"] },
  { l: "BALKON", w: ["BALKON", "KOLA", "BANK", "KAN", "KOL", "BOL", "KAL"],
    b: ["BAL", "BAN", "NAL", "AK", "AL", "OK", "OL", "ON"] },
  { l: "FIRSAT", w: ["FIRSAT", "SATIR", "SIRA", "SARI", "ARI", "SIR", "RAF"],
    b: ["SAR", "SAT", "TAS", "AR", "AT"] },
  { l: "KARPUZ", w: ["KARPUZ", "UZAK", "PARK", "KAZ", "KAR", "KAP", "RAP"],
    b: ["ARZ", "PAK", "ZAR", "AK", "AR", "AZ", "UZ"] },
  { l: "KELİME", w: ["KELİME", "LİME", "EMEK", "LEKE", "KEL", "KİL", "İLK"],
    b: ["ELE", "KEM", "İLE", "EK", "EL", "İL"] },
  { l: "KURALI", w: ["KURALI", "KURAL", "AKIL", "KIR", "IRK", "AKI", "ARI"],
    b: ["KAL", "KAR", "KIL", "AK", "AL", "AR"] },
  { l: "MANTAR", w: ["MANTAR", "ATAR", "ATA", "TAM", "ANT", "TAN", "ANA"],
    b: ["AMA", "MAT", "NAR", "AR", "AT"] },
  { l: "TAVŞAN", w: ["TAVŞAN", "TAVAN", "TAVA", "VANA", "ANT", "TAN", "ŞAN"],
    b: ["ANA", "ATA", "TAŞ", "AT"] },
  { l: "BAYRAK", w: ["BAYRAK", "YARA", "AYAK", "ARKA", "KARA", "YAR", "BAR"],
    b: ["KAR", "RAY", "AK", "AR", "AY", "YA"] },
  { l: "KARDEŞ", w: ["KARDEŞ", "KARE", "DAR", "ERA", "KAŞ", "ERK", "KAR"],
    b: ["AŞK", "DER", "AK", "AR", "DA", "DE", "EK", "EŞ"] },
  { l: "SANDIK", w: ["SANDIK", "KADIN", "KISA", "AKIN", "KANI", "KAN", "KAS"],
    b: ["AKI", "KIS", "AK", "DA"] },
  { l: "YORGAN", w: ["YORGAN", "ONAY", "ORAN", "YAN", "RAY", "GAR", "YAR"],
    b: ["NAR", "OYA", "AR", "AY", "ON", "OY", "YA"] },
  { l: "BALİNA", w: ["BALİNA", "BİNA", "ALAN", "BAN", "BAL", "NAL", "ANA"],
    b: ["ALA", "AL", "İL", "İN"] },
  { l: "MAKİNE", w: ["MAKİNE", "MEKAN", "KEMAN", "EKİN", "KAM", "NEM", "KAN"],
    b: ["KEM", "AK", "EK", "EN", "NE", "İN"] },
  { l: "BARDAK", w: ["BARDAK", "KARA", "ARKA", "DAR", "BAR", "KAR", "ADA"],
    b: ["AK", "AR", "DA"] },
  { l: "HARİTA", w: ["HARİTA", "TARİH", "RAHAT", "ATAR", "ATA", "HAT", "AİT"],
    b: ["AH", "AR", "AT", "İT"] },
  { l: "MUTFAK", w: ["MUTFAK", "KAT", "TAM", "KUM", "MAT", "TAK", "KAM"],
    b: ["AK", "AT", "UT"] },
  { l: "TASVİR", w: ["TASVİR", "AİT", "SAT", "SAR", "ASİ", "VAR", "TAS"],
    b: ["AR", "AT", "İT"] },
  { l: "AKILLI", w: ["AKILLI", "AKIL", "KAL", "KIL", "LAL", "AKI"],
    b: ["AK", "AL"] },
  { l: "BOYAMA", w: ["BOYAMA", "YAMA", "OYA", "BOY", "AMA", "MAY"],
    b: ["AY", "OY", "YA"] },
  { l: "DAĞLIK", w: ["DAĞLIK", "AKIL", "KAL", "DAL", "AKI", "KIL"],
    b: ["AK", "AL", "AĞ", "DA"] },
  { l: "DEFTER", w: ["DEFTER", "DERT", "DERE", "DER", "RET", "TER"],
    b: ["DE", "ET"] },
  { l: "ELBİSE", w: ["ELBİSE", "LİSE", "ELE", "İLE", "SEL", "EBE"],
    b: ["EL", "İL"] },
  { l: "GÖZLÜK", w: ["GÖZLÜK", "GÜZ", "GÖZ", "GÜL", "GÖL", "ÖLÜ"],
    b: ["ÖZ"] }
];
var ANA_PUAN = 10, BONUS_PUAN = 15; // harf başına puan
var MAVI = "#1f55b8";
var BASLANGIC_HAK = 3; // ampül ve tokmak için başlangıç hakkı

// LAYOUT-BEGIN
// Kelimeleri çapraz bulmaca gibi yerleştirir. d: 0 yatay, 1 dikey
function makeLayout(words) {
  var best = null;
  for (var t = 0; t < 80; t++) {
    var keyed = words.map(function (w) { return { w: w, k: w.length + Math.random() * 2.5 }; });
    keyed.sort(function (a, b) { return b.k - a.k; });
    var order = keyed.map(function (x) { return x.w; });
    var li = 0;
    for (var q = 1; q < order.length; q++) if (order[q].length > order[li].length) li = q;
    var first = order.splice(li, 1)[0];
    order.unshift(first);

    var grid = {}, dirs = {}, placed = [], un = [];
    var put = function (w, r, c, d) {
      for (var i = 0; i < w.length; i++) {
        var k = (r + (d ? i : 0)) + "," + (c + (d ? 0 : i));
        grid[k] = w[i];
        dirs[k] = (dirs[k] || 0) | (d ? 2 : 1);
      }
      placed.push({ w: w, r: r, c: c, d: d });
    };
    var ok = function (w, r, c, d) {
      var dr = d ? 1 : 0, dc = d ? 0 : 1, n = w.length, cross = 0;
      if (grid[(r - dr) + "," + (c - dc)] !== undefined) return false;
      if (grid[(r + dr * n) + "," + (c + dc * n)] !== undefined) return false;
      for (var i = 0; i < n; i++) {
        var rr = r + dr * i, cc = c + dc * i, k = rr + "," + cc, g = grid[k];
        if (g !== undefined) {
          if (g !== w[i]) return false;
          if (dirs[k] & (d ? 2 : 1)) return false;
          cross++;
        } else if (grid[(rr + dc) + "," + (cc + dr)] !== undefined || grid[(rr - dc) + "," + (cc - dr)] !== undefined) {
          return false;
        }
      }
      return cross >= 1 && cross < n;
    };

    put(order[0], 0, 0, 0);
    for (var k = 1; k < order.length; k++) {
      var w = order[k], cands = [];
      Object.keys(grid).forEach(function (key) {
        var p = key.split(","), r = +p[0], c = +p[1];
        for (var j = 0; j < w.length; j++) {
          if (w[j] !== grid[key]) continue;
          for (var d = 0; d < 2; d++) {
            var rr = r - (d ? j : 0), cc = c - (d ? 0 : j);
            if (ok(w, rr, cc, d)) cands.push([rr, cc, d]);
          }
        }
      });
      if (!cands.length) un.push(w);
      else { var pk = cands[Math.floor(Math.random() * cands.length)]; put(w, pk[0], pk[1], pk[2]); }
    }

    var minr = 1e9, minc = 1e9, maxr = -1e9, maxc = -1e9;
    placed.forEach(function (p) {
      var er = p.r + (p.d ? p.w.length - 1 : 0), ec = p.c + (p.d ? 0 : p.w.length - 1);
      minr = Math.min(minr, p.r); minc = Math.min(minc, p.c);
      maxr = Math.max(maxr, er); maxc = Math.max(maxc, ec);
    });
    var rows = maxr - minr + 1, cols = maxc - minc + 1;
    var score = placed.length * 1000 - rows * cols - (cols > 7 ? (cols - 7) * 40 : 0) - (rows > 9 ? (rows - 9) * 40 : 0);
    if (!best || score > best.score) best = { score: score, placed: placed, un: un, rows: rows, cols: cols, minr: minr, minc: minc };
  }
  best.placed.forEach(function (p) { p.r -= best.minr; p.c -= best.minc; });
  return { words: best.placed, un: best.un, rows: best.rows, cols: best.cols };
}
// LAYOUT-END

// Arka plan: gökyüzü, tepeler, nehir (dışarıdan resim gerekmez)
var svg =
"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 800' preserveAspectRatio='xMidYMid slice'>" +
"<defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#1747a8'/><stop offset='.4' stop-color='#3b8be0'/><stop offset='.68' stop-color='#b4e0ff'/></linearGradient></defs>" +
"<rect width='400' height='800' fill='url(#s)'/>" +
"<g fill='#fff' opacity='.85'><ellipse cx='330' cy='250' rx='60' ry='22'/><ellipse cx='362' cy='234' rx='40' ry='20'/><ellipse cx='50' cy='330' rx='55' ry='18'/><ellipse cx='84' cy='316' rx='35' ry='16'/><ellipse cx='260' cy='430' rx='45' ry='14'/></g>" +
"<path d='M0 560 L70 500 L130 550 L200 480 L280 555 L340 505 L400 550 L400 800 L0 800Z' fill='#6f9fc8'/>" +
"<path d='M0 600 Q100 540 200 590 T400 580 L400 800 L0 800Z' fill='#4fae4a'/>" +
"<g fill='#1f6b2e'><path d='M30 610 l14 -44 l14 44z'/><path d='M60 616 l12 -38 l12 38z'/><path d='M330 600 l14 -46 l14 46z'/><path d='M362 606 l12 -38 l12 38z'/><path d='M120 604 l10 -32 l10 32z'/></g>" +
"<path d='M0 655 Q120 605 240 655 T400 645 L400 800 L0 800Z' fill='#3a9a3c'/>" +
"<path d='M0 725 Q100 695 200 720 T400 710 L400 800 L0 800Z' fill='#2aa3e6'/>" +
"<ellipse cx='60' cy='770' rx='50' ry='16' fill='#8a7a6a'/><ellipse cx='140' cy='785' rx='42' ry='13' fill='#a39280'/><ellipse cx='300' cy='772' rx='55' ry='17' fill='#8a7a6a'/><ellipse cx='370' cy='788' rx='40' ry='12' fill='#a39280'/>" +
"</svg>";

var css = document.createElement("style");
css.textContent =
"#cm{position:fixed;top:0;left:0;right:0;bottom:0;height:100dvh;color:#fff;color-scheme:light;z-index:9999;display:none;flex-direction:column;align-items:center;font-family:inherit;overflow:hidden;box-sizing:border-box;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);-webkit-user-select:none;user-select:none}" +
"#cm .cm-top{width:100%;display:flex;align-items:center;gap:8px;padding:0;box-sizing:border-box;flex:none}" +
"#cm button.cm-sm{width:100%;background:#05050d;color:#fff;border:0;border-bottom:1px solid #232a4d;border-radius:0;padding:12px 0;font-family:inherit;font-size:20px;font-weight:800;letter-spacing:.5px;text-align:center}" +
"#cm .cm-pill{background:rgba(10,24,64,.72);border:2px solid rgba(255,255,255,.35);border-radius:999px;padding:6px 14px;font-size:16px;font-weight:700}" +
"#cm .cm-gridbox{flex:1;width:100%;min-height:0;display:flex;align-items:center;justify-content:center;padding:6px 12px;box-sizing:border-box}" +
"#cm .cm-gridin{position:relative}" +
"#cm .cm-cell{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:20%;background:rgba(255,255,255,.78);color:#fff;font-weight:800;box-sizing:border-box;box-shadow:0 2px 0 rgba(0,40,120,.25)}" +
"#cm .cm-cell.cm-on{background:#1e56c0}" +
"#cm .cm-cell.cm-hint{color:#1e56c0}" +
"#cm .cm-hm .cm-cell:not(.cm-on):not(.cm-hint){outline:3px solid #ffb300;outline-offset:-3px}" +
"#cm .cm-bonus{width:100%;box-sizing:border-box;padding:2px 14px;text-align:center;flex:none;max-height:64px;overflow:auto}" +
"#cm .cm-bonus .cm-bt{display:inline-block;font-size:13px;color:#fff;background:rgba(10,24,64,.6);border-radius:999px;padding:2px 10px;margin-bottom:3px}" +
"#cm .cm-chip{display:inline-block;background:#fff6d6;color:#8a5a00;border:1px solid #f2c14e;border-radius:10px;padding:1px 8px;margin:2px 3px;font-size:13px;font-weight:700}" +
"#cm .cm-cur{height:42px;margin:6px 0 8px;flex:none;display:flex;align-items:center;justify-content:center}" +
"#cm .cm-curp{display:inline-block;background:" + MAVI + ";color:#fff;font-weight:800;font-size:24px;letter-spacing:3px;padding:4px 22px;border-radius:999px;box-shadow:0 2px 6px rgba(0,0,0,.3)}" +
"#cm .cm-curp.ok{background:#1fa63a}#cm .cm-curp.bonus{background:#e0892b}#cm .cm-curp.bad{background:#c0392b}#cm .cm-curp.info{background:#5a6a8a}" +
"#cm .cm-wrap{position:relative;width:100%;display:flex;justify-content:center;flex:none;margin-bottom:18px}" +
"#cm .cm-wheel{position:relative;border-radius:50%;background:rgba(255,255,255,.88);box-shadow:0 4px 18px rgba(0,0,0,.3);touch-action:none}" +
"#cm .cm-wheel svg{position:absolute;left:0;top:0;pointer-events:none}" +
"#cm .cm-let{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:50%;font-weight:800;color:#111;pointer-events:none;transform:translate(-50%,-50%)}" +
"#cm .cm-let.cm-sel{background:" + MAVI + ";color:#fff}" +
"#cm button.cm-shuf{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:transparent;border:0;padding:0;display:flex;align-items:center;justify-content:center}" +
"#cm button.cm-tool{position:absolute;top:4px;width:54px;height:54px;border-radius:50%;background:#3a3f48;border:3px solid rgba(255,255,255,.55);font-size:26px;line-height:1;padding:0;box-shadow:0 3px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;overflow:visible}" +
"#cm button.cm-tool.cm-act{border-color:#ffb300;background:#6b4a00}" +
"#cm button.cm-bulb{right:14px}" +
"#cm button.cm-ham{left:14px}" +
"#cm .cm-score{position:absolute;left:14px;bottom:0}" +
"#cm .cm-banner{position:absolute;top:28%;left:50%;transform:translate(-50%,-50%);background:rgba(10,24,64,.82);color:#fff;font-size:34px;font-weight:800;padding:10px 30px;border-radius:999px;opacity:0;transition:opacity .3s;pointer-events:none;z-index:5;white-space:nowrap}" +
"#cm .cm-banner.show{opacity:1}" +
"#cm .cm-badge{position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;border-radius:11px;background:#e53935;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-sizing:border-box;padding:0 4px;font-family:inherit}" +
"#cm .cm-badge.zero{background:#2e9e4a}";
document.head.appendChild(css);

var root = document.createElement("div");
root.id = "cm";
root.style.background = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '") center/cover no-repeat, #2a6fd0';
root.innerHTML =
  '<div class="cm-top"><button class="cm-sm" id="cmBack">🧠 BİLGİ ARENASI</button></div><div class="cm-banner" id="cmBanner"></div>' +
  '<div class="cm-gridbox" id="cmGrid"></div><div class="cm-bonus" id="cmBonus"></div>' +
  '<div class="cm-cur" id="cmCur"></div>' +
  '<div class="cm-wrap"><div class="cm-wheel" id="cmWheel"><svg id="cmSvg"></svg>' +
  '<button class="cm-shuf" id="cmShuf" aria-label="Karıştır"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#9aa3b4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h3c4 0 5 10 9 10h5"/><path d="M3 17h3c1.6 0 2.7-1.4 3.7-3"/><path d="M13.3 10C14.3 8.4 15.4 7 17 7h3"/><path d="M17 4l3 3-3 3"/><path d="M17 14l3 3-3 3"/></svg></button></div>' +
  '<button class="cm-tool cm-ham" id="cmHam" aria-label="Tokmak">🔨<span class="cm-badge" id="cmHamN"></span></button>' +
  '<button class="cm-tool cm-bulb" id="cmHint" aria-label="İpucu">💡<span class="cm-badge" id="cmHintN"></span></button>' +
  '<div class="cm-pill cm-score" id="cmPuan"></div></div>';
document.body.appendChild(root);

var $ = function (id) { return document.getElementById(id); };
var lvIdx = 0, found = {}, foundB = {}, hintCells = {}, letters = [], sel = [], drag = false, puan = 0;
var cur = null, bonusList = [], placedMap = {}, S = 260, D = 54, ptr = null, flashT = null;
var hakIpucu = BASLANGIC_HAK, hakTokmak = BASLANGIC_HAK, hammerOn = false;
try { lvIdx = Math.min(parseInt(localStorage.getItem("cemberLv") || "0", 10) || 0, LEVELS.length - 1); } catch (e) {}
try { puan = parseInt(localStorage.getItem("cemberPuan") || "0", 10) || 0; } catch (e) {}
try {
  var h1 = localStorage.getItem("cemberHakIpucu"), h2 = localStorage.getItem("cemberHakTokmak");
  if (h1 !== null) hakIpucu = Math.max(0, parseInt(h1, 10) || 0);
  if (h2 !== null) hakTokmak = Math.max(0, parseInt(h2, 10) || 0);
} catch (e) {}

function puanKaydet() { try { localStorage.setItem("cemberPuan", puan); } catch (e) {} }
var bannerT = null;
function baslikYaz() { $("cmPuan").textContent = "⭐ " + puan; }
function bolumGoster() {
  var b = $("cmBanner");
  b.textContent = "Bölüm " + (lvIdx + 1);
  b.classList.add("show");
  if (bannerT) clearTimeout(bannerT);
  bannerT = setTimeout(function () { b.classList.remove("show"); }, 1000);
}

// Haklar: rozet sayı gösterir, 0 olunca "+" olur (ileride reklam/satın alma buraya bağlanacak)
function hakYaz() {
  var a = $("cmHintN"), b = $("cmHamN");
  a.textContent = hakIpucu > 0 ? hakIpucu : "+"; a.classList.toggle("zero", hakIpucu <= 0);
  b.textContent = hakTokmak > 0 ? hakTokmak : "+"; b.classList.toggle("zero", hakTokmak <= 0);
  try { localStorage.setItem("cemberHakIpucu", hakIpucu); localStorage.setItem("cemberHakTokmak", hakTokmak); } catch (e) {}
}
// İLERİDE: reklam izlenince veya satın alınca çağır -> window.cemberHakEkle("ipucu", 3)
window.cemberHakEkle = function (tur, n) {
  if (tur === "tokmak") hakTokmak += n; else hakIpucu += n;
  hakYaz();
};
function hakBitti() {
  // İLERİDE: burada reklam izle / satın al penceresi açılacak
  flash("Hakkın bitti", "info");
}
function tokmakKapat() {
  hammerOn = false;
  $("cmGrid").classList.remove("cm-hm");
  $("cmHam").classList.remove("cm-act");
}

function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}

function boyut() {
  S = Math.max(180, Math.min(300, Math.round(window.innerWidth * 0.74), Math.round(window.innerHeight * 0.36)));
  D = Math.round(S * 0.21);
  var w = $("cmWheel");
  w.style.width = S + "px"; w.style.height = S + "px";
  var sv = $("cmSvg");
  sv.setAttribute("width", S); sv.setAttribute("height", S); sv.setAttribute("viewBox", "0 0 " + S + " " + S);
  var sh = $("cmShuf"); var ss = Math.round(S * 0.2);
  sh.style.width = ss + "px"; sh.style.height = ss + "px";
}

function startLevel() {
  var L = LEVELS[lvIdx];
  found = {}; foundB = {}; hintCells = {}; sel = []; drag = false;
  tokmakKapat();
  cur = makeLayout(L.w);
  placedMap = {};
  cur.words.forEach(function (p) { placedMap[p.w] = p; });
  bonusList = L.b.concat(cur.un.filter(function (w) { return L.b.indexOf(w) === -1; }));
  letters = shuffle(L.l.split(""));
  baslikYaz(); hakYaz(); bolumGoster();
  $("cmCur").innerHTML = "";
  boyut();
  drawWords(); drawBonus(); drawWheel();
}

function drawWords() {
  var box = $("cmGrid");
  box.innerHTML = "";
  if (!cur) return;
  var g = 5, W = box.clientWidth - 24, H = box.clientHeight - 12;
  var cs = Math.floor(Math.min(46, (W - (cur.cols - 1) * g) / cur.cols, (H - (cur.rows - 1) * g) / cur.rows));
  if (cs < 14) cs = 14;
  var cells = {};
  cur.words.forEach(function (p) {
    for (var i = 0; i < p.w.length; i++) {
      var r = p.r + (p.d ? i : 0), c = p.c + (p.d ? 0 : i), k = r + "," + c;
      if (!cells[k]) cells[k] = { r: r, c: c, ch: p.w[i], on: false };
      if (found[p.w]) cells[k].on = true;
    }
  });
  var inner = document.createElement("div");
  inner.className = "cm-gridin";
  inner.style.width = (cur.cols * cs + (cur.cols - 1) * g) + "px";
  inner.style.height = (cur.rows * cs + (cur.rows - 1) * g) + "px";
  var h = "";
  Object.keys(cells).forEach(function (k) {
    var x = cells[k], cls = "cm-cell", txt = "";
    if (x.on) { cls += " cm-on"; txt = x.ch; }
    else if (hintCells[k]) { cls += " cm-hint"; txt = x.ch; }
    h += '<div class="' + cls + '" data-k="' + k + '" style="left:' + (x.c * (cs + g)) + "px;top:" + (x.r * (cs + g)) + "px;width:" + cs + "px;height:" + cs + "px;font-size:" + Math.round(cs * 0.6) + 'px">' + txt + "</div>";
  });
  inner.innerHTML = h;
  box.appendChild(inner);
}

function drawBonus() {
  var list = Object.keys(foundB);
  var h = '<div class="cm-bt">⭐ Bonus kelimeler (' + list.length + (bonusList.length ? "/" + bonusList.length : "") + ")</div><br>";
  list.forEach(function (w) { h += '<span class="cm-chip">' + w + "</span>"; });
  $("cmBonus").innerHTML = h;
}

function pos(i) {
  var n = letters.length, a = (i / n) * 2 * Math.PI - Math.PI / 2, R = S * 0.34;
  return { x: S / 2 + R * Math.cos(a), y: S / 2 + R * Math.sin(a) };
}

function drawWheel() {
  var w = $("cmWheel");
  Array.prototype.slice.call(w.querySelectorAll(".cm-let")).forEach(function (e) { e.remove(); });
  var sh = $("cmShuf");
  letters.forEach(function (ch, i) {
    var p = pos(i), d = document.createElement("div");
    d.className = "cm-let"; d.textContent = ch; d.dataset.i = i;
    d.style.left = p.x + "px"; d.style.top = p.y + "px";
    d.style.width = D + "px"; d.style.height = D + "px"; d.style.fontSize = Math.round(D * 0.62) + "px";
    w.insertBefore(d, sh);
  });
  drawLine();
}

function drawLine() {
  var pts = sel.map(function (i) { var p = pos(i); return p.x + "," + p.y; });
  if (drag && ptr && sel.length) pts.push(ptr.x + "," + ptr.y);
  $("cmSvg").innerHTML = '<polyline points="' + pts.join(" ") + '" fill="none" stroke="' + MAVI + '" stroke-width="' + Math.round(D * 0.3) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  Array.prototype.slice.call($("cmWheel").querySelectorAll(".cm-let")).forEach(function (e) {
    e.classList.toggle("cm-sel", sel.indexOf(+e.dataset.i) > -1);
  });
}

function word() { return sel.map(function (i) { return letters[i]; }).join(""); }
function drawCur() {
  if (flashT) { clearTimeout(flashT); flashT = null; }
  $("cmCur").innerHTML = sel.length ? '<span class="cm-curp">' + word() + "</span>" : "";
}
function flash(text, cls) {
  if (flashT) clearTimeout(flashT);
  $("cmCur").innerHTML = '<span class="cm-curp ' + cls + '">' + text + "</span>";
  flashT = setTimeout(function () { if (!drag) $("cmCur").innerHTML = ""; flashT = null; }, 1300);
}

function hit(e) {
  var r = $("cmWheel").getBoundingClientRect();
  ptr = { x: e.clientX - r.left, y: e.clientY - r.top };
  for (var i = 0; i < letters.length; i++) {
    var p = pos(i), dx = ptr.x - p.x, dy = ptr.y - p.y;
    if (Math.sqrt(dx * dx + dy * dy) <= D * 0.6) {
      if (sel.indexOf(i) === -1) sel.push(i);
      else if (sel.length > 1 && sel[sel.length - 2] === i) sel.pop();
      break;
    }
  }
  drawLine(); drawCur();
}

var wh = $("cmWheel");
wh.addEventListener("pointerdown", function (e) {
  if (e.target.closest && e.target.closest(".cm-shuf")) return;
  drag = true; sel = [];
  try { wh.setPointerCapture(e.pointerId); } catch (x) {}
  hit(e);
});
wh.addEventListener("pointermove", function (e) { if (drag) hit(e); });

function end() {
  if (!drag) return;
  drag = false;
  var w = word();
  if (w.length > 1) {
    if (placedMap[w] && !found[w]) {
      found[w] = true;
      var p = w.length * ANA_PUAN;
      puan += p; puanKaydet(); baslikYaz();
      flash("✅ " + w + " +" + p, "ok");
      drawWords();
      if (cur.words.every(function (x) { return found[x.w]; })) {
        flash("🎉 Seviye tamamlandı!", "ok");
        setTimeout(function () {
          lvIdx = (lvIdx + 1) % LEVELS.length;
          try { localStorage.setItem("cemberLv", lvIdx); } catch (e) {}
          startLevel();
        }, 1500);
      }
    } else if (bonusList.indexOf(w) > -1 && !foundB[w]) {
      foundB[w] = true;
      var bp = w.length * BONUS_PUAN;
      puan += bp; puanKaydet(); baslikYaz();
      flash("⭐ BONUS " + w + " +" + bp, "bonus");
      drawBonus();
    } else if (found[w] || foundB[w]) {
      flash("Zaten buldun", "info");
    } else {
      flash("❌ Yanlış", "bad");
    }
  } else {
    $("cmCur").innerHTML = "";
  }
  sel = []; ptr = null; drawLine();
}
window.addEventListener("pointerup", end);
window.addEventListener("pointercancel", end);

$("cmShuf").onclick = function () { letters = shuffle(letters); sel = []; drawWheel(); };

// Ampül: ilk kapalı harfi açar. Hak sadece gerçekten bir harf açılırsa düşer.
$("cmHint").onclick = function () {
  if (!cur) return;
  if (hakIpucu <= 0) { hakBitti(); return; }
  tokmakKapat();
  for (var k = 0; k < cur.words.length; k++) {
    var p = cur.words[k];
    if (found[p.w]) continue;
    for (var i = 0; i < p.w.length; i++) {
      var r = p.r + (p.d ? i : 0), c = p.c + (p.d ? 0 : i), key = r + "," + c;
      if (hintCells[key]) continue;
      // başka bir bulunmuş kelimeyle zaten açılmış harfi atla
      var acik = cur.words.some(function (q) {
        if (!found[q.w]) return false;
        for (var j = 0; j < q.w.length; j++) {
          if ((q.r + (q.d ? j : 0)) + "," + (q.c + (q.d ? 0 : j)) === key) return true;
        }
        return false;
      });
      if (acik) continue;
      hintCells[key] = true; hakIpucu--; hakYaz(); drawWords(); return;
    }
  }
};

// Tokmak: önce butona bas, sonra tablodan açmak istediğin kutuya dokun.
$("cmHam").onclick = function () {
  if (!cur) return;
  if (hammerOn) { tokmakKapat(); return; }
  if (hakTokmak <= 0) { hakBitti(); return; }
  hammerOn = true;
  $("cmGrid").classList.add("cm-hm");
  $("cmHam").classList.add("cm-act");
  flash("🔨 Açmak istediğin kutuya dokun", "info");
};
$("cmGrid").addEventListener("click", function (e) {
  if (!hammerOn) return;
  var el = e.target.closest ? e.target.closest(".cm-cell") : null;
  if (!el || el.classList.contains("cm-on") || el.classList.contains("cm-hint")) return;
  hintCells[el.getAttribute("data-k")] = true;
  hakTokmak--; hakYaz();
  tokmakKapat();
  drawWords();
});

window.addEventListener("resize", function () {
  if (root.style.display !== "flex") return;
  boyut(); drawWheel(); drawWords();
});
function kapat() { tokmakKapat(); root.style.display = "none"; }
$("cmBack").onclick = kapat;
document.addEventListener("anasayfa", kapat);

// Ana menüye (#ana) buton ekler; diğer oyun butonları gibi oyun açılınca otomatik gizlenir.
var ekli = null;
function boya() {
  if (!ekli) return;
  ekli.style.setProperty("background", "#e0892b", "important");
  ekli.style.setProperty("color", "#fff", "important");
}
function addButton(zorla) {
  if (ekli) return;
  var ana = $("ana");
  if (!ana) return;
  var hedef = null;
  ana.querySelectorAll("button").forEach(function (b) {
    if (/İşlem/.test(b.textContent)) hedef = b;
  });
  if (!hedef && !zorla) return; // İşlem butonu henüz eklenmedi, bekle
  var b;
  if (hedef) {
    b = hedef.cloneNode(false);
  } else {
    b = document.createElement("button");
    b.className = "btn";
  }
  b.removeAttribute("id");
  b.textContent = "🔤 Kelime Çemberi";
  b.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    root.style.display = "flex";
    startLevel();
  });
  if (hedef) hedef.parentNode.insertBefore(b, hedef.nextSibling);
  else ana.appendChild(b);
  ekli = b;
  boya();
}
addButton(false);
var anaEl = $("ana");
if (anaEl) {
  var mo = new MutationObserver(function () {
    addButton(false);
    if (ekli) mo.disconnect();
  });
  mo.observe(anaEl, { childList: true, subtree: true });
}
window.addEventListener("load", function () { addButton(true); boya(); });
})();
