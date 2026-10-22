const stages = {
  stage1: [
    {c:"Genel kültür",q:"Bir yılda kaç ay vardır?",a:["10","11","12","13"],k:2,e:"Bir yılda 12 ay vardır."},
    {c:"Genel kültür",q:"Bir günde kaç saat vardır?",a:["12","20","24","30"],k:2,e:"Bir günde 24 saat vardır."},
    {c:"Genel kültür",q:"Türkiye'nin para birimi hangisidir?",a:["Euro","Türk lirası","Dolar","Sterlin"],k:1,e:"Türkiye'nin para birimi Türk lirasıdır."},
    {c:"Genel kültür",q:"Türkiye'nin başkenti neresidir?",a:["İstanbul","İzmir","Ankara","Bursa"],k:2,e:"Türkiye'nin başkenti Ankara'dır."},
    {c:"Genel kültür",q:"1 kilometre kaç metredir?",a:["100 m","500 m","1000 m","5000 m"],k:2,e:"1 kilometre 1000 metreye eşittir."},
    {c:"Bilim",q:"Suyun kimyasal formülü nedir?",a:["CO₂","H₂O","O₂","NaCl"],k:1,e:"Su iki hidrojen ve bir oksijen atomundan oluşur."},
    {c:"Bilim",q:"Kanı pompalayan organ hangisidir?",a:["Akciğer","Beyin","Karaciğer","Kalp"],k:3,e:"Kalp kanı dolaşım sistemine pompalar."},
    {c:"Bilim",q:"Dünya'nın doğal uydusu hangisidir?",a:["Mars","Ay","Güneş","Venüs"],k:1,e:"Dünya'nın doğal uydusu Ay'dır."},
    {c:"Coğrafya",q:"Dünyanın en büyük okyanusu hangisidir?",a:["Atlas","Hint","Arktik","Pasifik"],k:3,e:"En büyük okyanus Pasifik Okyanusu'dur."},
    {c:"Coğrafya",q:"Türkiye kaç coğrafi bölgeye ayrılır?",a:["5","6","7","8"],k:2,e:"Türkiye yedi coğrafi bölgeye ayrılır."},
    {c:"Spor",q:"Bir futbol takımı sahaya kaç oyuncuyla çıkar?",a:["9","10","11","12"],k:2,e:"Kaleci dâhil 11 oyuncu bulunur."},
    {c:"Spor",q:"Olimpiyat halkaları kaç tanedir?",a:["4","5","6","7"],k:1,e:"Olimpiyat simgesinde beş halka vardır."},
    {c:"Tarih",q:"İstanbul hangi yıl fethedildi?",a:["1071","1299","1453","1517"],k:2,e:"İstanbul 1453'te fethedildi."},
    {c:"Tarih",q:"1. Dünya Savaşı hangi yıl başlamıştır?",a:["1912","1914","1918","1926"],k:1,e:"1. Dünya Savaşı 1914 yılında başlamıştır."},
    {c:"Tarih",q:"Osmanlı Devleti'nin kurucusu kimdir?",a:["Osman Bey","Orhan Bey","Yıldırım Bayezid","Fatih Sultan Mehmet"],k:0,e:"Osmanlı Devleti'nin kurucusu Osman Bey'dir."}
  ],
  stage2: [
    {c:"Bilim",q:"Güneş sistemindeki en büyük gezegen hangisidir?",a:["Dünya","Mars","Jüpiter","Satürn"],k:2,e:"Jüpiter Güneş sisteminin en büyük gezegenidir."},
    {c:"Bilim",q:"Hangi gezegen 'Kızıl Gezegen' olarak bilinir?",a:["Venüs","Mars","Jüpiter","Satürn"],k:1,e:"Mars Kızıl Gezegen olarak bilinir."},
    {c:"Bilim",q:"Işık hızı saniyede yaklaşık kaç kilometredir?",a:["30 bin km","300 bin km","3 milyon km","3 milyar km"],k:1,e:"Işık hızı saniyede yaklaşık 300.000 kilometredir."},
    {c:"Bilim",q:"Suyun kaynama noktası deniz seviyesinde kaç derecedir?",a:["90°C","100°C","110°C","120°C"],k:1,e:"Saf su 100°C'de kaynar."},
    {c:"Coğrafya",q:"Dünyanın en uzun nehirlerinden olan Nil Nehri hangi kıtadadır?",a:["Asya","Afrika","Avrupa","Güney Amerika"],k:1,e:"Nil Nehri Afrika kıtasındadır."},
    {c:"Coğrafya",q:"Türkiye'nin en yüksek dağı hangisidir?",a:["Erciyes Dağı","Kaçkar Dağı","Ağrı Dağı","Uludağ"],k:2,e:"Türkiye'nin en yüksek dağı Ağrı Dağı'dır."},
    {c:"Coğrafya",q:"Yeryüzünün en büyük kıtası hangisidir?",a:["Afrika","Asya","Avrupa","Amerika"],k:1,e:"Asya yüzölçümü bakımından en büyük kıtadır."},
    {c:"Spor",q:"Basketbolda sahada bir takımda kaç oyuncu bulunur?",a:["4","5","6","7"],k:1,e:"Basketbol takımı sahada beş oyuncuyla yer alır."},
    {c:"Spor",q:"Voleybolda sahada her takımın kaç oyuncusu bulunur?",a:["5","6","7","8"],k:1,e:"Voleybolda sahada her takım 6 oyuncuyla yer alır."},
    {c:"Spor",q:"Satranç oyununda her oyuncunun başlangıçta kaç piyonu vardır?",a:["6","7","8","10"],k:2,e:"Her oyuncunun 8 piyonu bulunur."},
    {c:"Tarih",q:"Anadolu'nun kapılarını Türklere açan savaş hangisidir?",a:["Malazgirt Savaşı","Miryokefalon Savaşı","Pasinler Savaşı","Varna Savaşı"],k:0,e:"Malazgirt Savaşı ile Anadolu'nun kapıları Türklere açılmıştır."},
    {c:"Genel kültür",q:"İnsan vücudunda kaç tane temel duyu organı vardır?",a:["3","4","5","6"],k:2,e:"İnsan vücudunda beş temel duyu organı bulunur."},
    {c:"Genel kültür",q:"Trafik ışıklarında 'dur' anlamını veren renk hangisidir?",a:["Sarı","Yeşil","Kırmızı","Mavi"],k:2,e:"Kırmızı ışık dur anlamını taşır."},
    {c:"Genel kültür",q:"Periyodik tabloda 'O' simgesi hangi elementi temsil eder?",a:["Altın","Oksijen","Osnak","Odyum"],k:1,e:"'O' simgesi Oksijen elementini temsil eder."},
    {c:"Genel kültür",q:"Pisa Kulesi hangi ülkededir?",a:["Fransa","İtalya","İspanya","Yunanistan"],k:1,e:"Pisa Kulesi İtalya'dadır."}
  ]
};
