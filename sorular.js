// Her seviye bir dizidir. Her soru: ["Soru metni", ["A","B","C","D"], doğruŞıkIndeksi(0-3)]
// Bir seviyeye istediğin kadar (örn. 15) soru ekleyebilirsin; oyun sayıyı kendisi algılar.
const SORULAR = [
  // Seviye 1
  [
    ["Türkiye'nin başkenti neresidir?", ["Ankara", "İstanbul", "İzmir", "Bursa"], 0],
    ["Güneş Sistemi'ndeki en büyük gezegen hangisidir?", ["Mars", "Jüpiter", "Satürn", "Dünya"], 1],
    ["Bir yılda kaç ay vardır?", ["10", "11", "12", "13"], 2],
    ["Suyun kimyasal formülü nedir?", ["CO2", "H2O", "O2", "NaCl"], 1],
    ["Hangi hayvan ormanlar kralı olarak bilinir?", ["Kaplan", "Aslan", "Fil", "Ayı"], 1]
  ],
  // Seviye 2
  [
    ["Türkiye Cumhuriyeti hangi yıl ilan edildi?", ["1920", "1921", "1923", "1925"], 2],
    ["Dünyanın en uzun nehri genellikle hangisi kabul edilir?", ["Nil", "Amazon", "Tuna", "Fırat"], 0],
    ["Bir üçgenin iç açıları toplamı kaç derecedir?", ["90", "180", "270", "360"], 1],
    ["İnce Memed romanının yazarı kimdir?", ["Yaşar Kemal", "Orhan Kemal", "Sait Faik", "Kemal Tahir"], 0],
    ["Futbolda bir takım sahada kaç oyuncuyla yer alır?", ["9", "10", "11", "12"], 2]
  ],
  // Seviye 3
  [
    ["Hangi gezegen Kızıl Gezegen olarak bilinir?", ["Venüs", "Mars", "Merkür", "Neptün"], 1],
    ["İstanbul'u fetheden padişah kimdir?", ["Yavuz Sultan Selim", "Fatih Sultan Mehmet", "Kanuni", "II. Murat"], 1],
    ["Işığın boşlukta hızı yaklaşık kaç km/sn'dir?", ["30.000", "150.000", "300.000", "3.000.000"], 2],
    ["Japonya'nın başkenti neresidir?", ["Osaka", "Kyoto", "Tokyo", "Seul"], 2],
    ["İnsan vücudunun en büyük organı hangisidir?", ["Karaciğer", "Deri", "Akciğer", "Beyin"], 1]
  ],
  // Seviye 4
  [
    ["Mona Lisa tablosunun ressamı kimdir?", ["Michelangelo", "Leonardo da Vinci", "Raphael", "Picasso"], 1],
    ["Atom numarası 1 olan element hangisidir?", ["Helyum", "Oksijen", "Hidrojen", "Karbon"], 2],
    ["Türkiye'nin en yüksek dağı hangisidir?", ["Erciyes", "Uludağ", "Ağrı Dağı", "Kaçkar"], 2],
    ["Antik Olimpiyat Oyunları hangi ülkede başlamıştır?", ["İtalya", "Yunanistan", "Mısır", "Fransa"], 1],
    ["Standart bir piyanoda kaç tuş vardır?", ["76", "88", "92", "100"], 1]
  ],
  // Seviye 5
  [
    ["Mimar Sinan'ın ustalık eseri olarak kabul ettiği yapı hangisidir?", ["Süleymaniye", "Selimiye", "Şehzade", "Sultanahmet"], 1],
    ["Altının element sembolü nedir?", ["Ag", "Au", "Fe", "Gd"], 1],
    ["Dünyanın en büyük okyanusu hangisidir?", ["Atlantik", "Hint", "Pasifik", "Arktik"], 2],
    ["I. Dünya Savaşı hangi yıl başlamıştır?", ["1912", "1914", "1916", "1918"], 1],
    ["Suç ve Ceza romanının yazarı kimdir?", ["Tolstoy", "Dostoyevski", "Çehov", "Gogol"], 1]
  ],
  // Seviye 6
  [
    ["DNA'nın açılımı nedir?", ["Deoksiribonükleik asit", "Dioksit nükleik asit", "Dinükleik amino asit", "Deoksi nitrik asit"], 0],
    ["Malazgirt Savaşı hangi yıl yapılmıştır?", ["1019", "1071", "1176", "1243"], 1],
    ["Hangi ülke hem Asya'da hem Avrupa'da toprağa sahiptir?", ["Türkiye", "Japonya", "İspanya", "Hindistan"], 0],
    ["Pi sayısı yaklaşık olarak kaçtır?", ["2,14", "3,14", "4,13", "3,41"], 1],
    ["Nobel Edebiyat Ödülü'nü kazanan ilk Türk yazar kimdir?", ["Yaşar Kemal", "Orhan Pamuk", "Nazım Hikmet", "Aziz Nesin"], 1]
  ],
  // Seviye 7
  [
    ["İnsanın aya ilk ayak bastığı görev hangisidir?", ["Apollo 11", "Apollo 13", "Gemini 4", "Vostok 1"], 0],
    ["Sesin havadaki hızı yaklaşık kaç m/sn'dir?", ["34", "340", "3.400", "34.000"], 1],
    ["Osmanlı Devleti'nin kurucusu kimdir?", ["Orhan Bey", "Osman Bey", "Ertuğrul Gazi", "I. Murat"], 1],
    ["Hangi vitamin güneş ışığı ile cilt altında sentezlenir?", ["A", "C", "D", "K"], 2],
    ["Dünyanın en kalabalık ülkesi hangisidir?", ["Çin", "Hindistan", "ABD", "Endonezya"], 1]
  ],
  // Seviye 8
  [
    ["Büyük Taarruz hangi yıl başlamıştır?", ["1920", "1921", "1922", "1923"], 2],
    ["Görelilik kuramını hangi bilim insanı geliştirmiştir?", ["Newton", "Einstein", "Bohr", "Galileo"], 1],
    ["Mitokondrinin hücredeki temel görevi nedir?", ["Protein sentezi", "Enerji üretimi", "Kalıtım", "Sindirim"], 1],
    ["Rönesans hareketi hangi ülkede başlamıştır?", ["Fransa", "İtalya", "İngiltere", "Almanya"], 1],
    ["Dünyanın en derin gölü hangisidir?", ["Van", "Hazar", "Baykal", "Victoria"], 2]
  ],
  // Seviye 9
  [
    ["Lozan Barış Antlaşması hangi yıl imzalanmıştır?", ["1920", "1922", "1923", "1925"], 2],
    ["Ozon tabakasına en çok zarar veren gaz grubu hangisidir?", ["Kloroflorokarbonlar", "Azot", "Argon", "Helyum"], 0],
    ["Divanü Lügati't-Türk'ün yazarı kimdir?", ["Yusuf Has Hacib", "Kaşgarlı Mahmud", "Ahmet Yesevi", "Edip Ahmet"], 1],
    ["Hangi şehir iki kıta üzerinde kurulmuştur?", ["İzmir", "İstanbul", "Ankara", "Konya"], 1],
    ["Rubik küpünü icat eden kişi kimdir?", ["Ernő Rubik", "Nikola Tesla", "John von Neumann", "Béla Bartók"], 0]
  ],
  // Seviye 10
  [
    ["Atina'da Akademi'yi kuran filozof kimdir?", ["Aristoteles", "Platon", "Herodot", "Epikuros"], 1],
    ["1337'den 1453'e süren savaşın adı nedir?", ["Yüz Yıl Savaşları", "Otuz Yıl Savaşları", "Haçlı Seferleri", "Kırım Savaşı"], 0],
    ["Doğada bulunan en sert madde hangisidir?", ["Elmas", "Kuvars", "Çelik", "Titanyum"], 0],
    ["Türk kadınına milletvekili seçme ve seçilme hakkı hangi yıl verilmiştir?", ["1930", "1934", "1938", "1946"], 1],
    ["Fermat'ın son teoremini kanıtlayan matematikçi kimdir?", ["Andrew Wiles", "Euler", "Gauss", "Perelman"], 0]
  ]
];
