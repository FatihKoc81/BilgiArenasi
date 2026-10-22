
const questions = [
// ==================== KOLAY (d:1) ====================
{c:"Genel kültür",q:"Bir yılda kaç ay vardır?",a:["10","11","12","13"],k:2,d:1,e:"Bir yılda 12 ay vardır."},
{c:"Genel kültür",q:"Bir günde kaç saat vardır?",a:["12","20","24","30"],k:2,d:1,e:"Bir günde 24 saat vardır."},
{c:"Genel kültür",q:"Gökkuşağında geleneksel olarak kaç renk sayılır?",a:["5","6","7","8"],k:2,d:1,e:"Geleneksel olarak yedi renk sayılır."},
{c:"Genel kültür",q:"Türkiye'nin para birimi hangisidir?",a:["Euro","Türk lirası","Dolar","Sterlin"],k:1,d:1,e:"Türkiye'nin para birimi Türk lirasıdır."},
{c:"Genel kültür",q:"Bir üçgenin iç açıları toplamı kaç derecedir?",a:["90","180","270","360"],k:1,d:1,e:"Üçgenin iç açıları toplamı 180 derecedir."},
{c:"Genel kültür",q:"Hangi hayvan 'ormanlar kralı' olarak bilinir?",a:["Kaplan","Aslan","Ayı","Kurt"],k:1,d:1,e:"Aslan ormanlar kralı olarak bilinir."},
{c:"Genel kültür",q:"Hangi mevsimde günler en uzundur?",a:["İlkbahar","Yaz","Sonbahar","Kış"],k:1,d:1,e:"Yaz mevsiminde günler en uzundur."},
{c:"Genel kültür",q:"Hangi renk ana renktir?",a:["Yeşil","Turuncu","Kırmızı","Mor"],k:2,d:1,e:"Kırmızı, sarı ve mavi ana renklerdir."},
{c:"Genel kültür",q:"Hangi sayı Roman rakamıyla 'X' olarak yazılır?",a:["5","10","50","100"],k:1,d:1,e:"X, 10 sayısını temsil eder."},
{c:"Genel kültür",q:"Hangi sayı 'düzine' olarak adlandırılır?",a:["10","12","20","100"],k:1,d:1,e:"Düzine 12 demektir."},
{c:"Genel kültür",q:"Hangi gezegen Güneş'e en yakındır?",a:["Venüs","Merkür","Mars","Dünya"],k:1,d:1,e:"Merkür Güneş'e en yakın gezegendir."},
{c:"Genel kültür",q:"Hangi hayvan soğukkanlıdır?",a:["Kedi","Köpek","Yılan","At"],k:2,d:1,e:"Yılan soğukkanlı bir hayvandır."},
{c:"Genel kültür",q:"Hangi gaz solunumda kullanılır?",a:["Azot","Karbondioksit","Oksijen","Hidrojen"],k:2,d:1,e:"Oksijen solunumda kullanılır."},
{c:"Genel kültür",q:"Hangi madde elektrik iletkenidir?",a:["Plastik","Cam","Bakır","Lastik"],k:2,d:1,e:"Bakır iyi bir elektrik iletkenidir."},
{c:"Genel kültür",q:"Hangi spor dalında 'love' terimi kullanılır?",a:["Futbol","Tenis","Basketbol","Voleybol"],k:1,d:1,e:"Love, teniste sıfır puan demektir."},

{c:"Bilim",q:"Suyun kimyasal formülü nedir?",a:["CO₂","H₂O","O₂","NaCl"],k:1,d:1,e:"Su iki hidrojen ve bir oksijen atomundan oluşur."},
{c:"Bilim",q:"Kanı pompalayan organ hangisidir?",a:["Akciğer","Beyin","Karaciğer","Kalp"],k:3,d:1,e:"Kalp kanı dolaşım sistemine pompalar."},
{c:"Bilim",q:"Dünya'nın doğal uydusu hangisidir?",a:["Mars","Ay","Güneş","Venüs"],k:1,d:1,e:"Dünya'nın doğal uydusu Ay'dır."},
{c:"Bilim",q:"Bitkiler fotosentez sırasında hangi gazı alır?",a:["Oksijen","Azot","Karbondioksit","Hidrojen"],k:2,d:1,e:"Fotosentez sırasında karbondioksit kullanılır."},
{c:"Bilim",q:"Gözün renkli kısmına ne ad verilir?",a:["Retina","İris","Kornea","Lens"],k:1,d:1,e:"Gözün renkli kısmı iristir."},
{c:"Bilim",q:"Hangi organ solunum sistemine aittir?",a:["Kalp","Akciğer","Böbrek","Karaciğer"],k:1,d:1,e:"Akciğer solunum organıdır."},
{c:"Bilim",q:"Hangi organ vücudumuzun en büyük organıdır?",a:["Karaciğer","Beyin","Deri","Akciğer"],k:2,d:1,e:"Deri vücudun en büyük organıdır."},
{c:"Bilim",q:"Sıcaklık birimi hangisidir?",a:["Metre","Santigrat","Litre","Kilogram"],k:1,d:1,e:"Santigrat (Celsius) sıcaklık birimidir."},
{c:"Bilim",q:"Hangi element periyodik tabloda 'O