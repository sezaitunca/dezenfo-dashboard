import { useState, useMemo } from "react";
import tubitakLogo from "./assets/tubitak.png";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const data = [
  // Sayı 158 (Ocak 2025)
  {id:1,sayi:158,ay:"Oca",baslik:"Erdoğan İsrail'i aradı",kategori:"Dış Politika",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Cumhurbaşkanlığı",ulke:"İsrail",yontem:"Çarpıtma"},
  {id:2,sayi:158,ay:"Oca",baslik:"Yeşil/Gri pasaport ETIAS ücreti",kategori:"Dış Politika",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Hükümet Politikası",ulke:"AB",yontem:"Yanlış Bilgi"},
  {id:3,sayi:158,ay:"Oca",baslik:"Hatay mamografi/onkolog eksikliği",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Abartma/Eksik Bilgi",hedef:"Sağlık Bakanlığı",ulke:"Türkiye",yontem:"Abartma"},
  {id:4,sayi:158,ay:"Oca",baslik:"Diyanet 'ekmek yiyin' tavsiyesi",kategori:"Toplumsal",kaynak:"Basın",tur:"Bağlamından Koparma",hedef:"Diyanet",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:5,sayi:158,ay:"Oca",baslik:"Bursa yabancı uyruklu bıçaklama",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Göç Politikası",ulke:"Türkiye",yontem:"Kimlik Çarpıtma"},
  // Sayı 159
  {id:6,sayi:159,ay:"Oca",baslik:"Aile Destek Programı kesildi",kategori:"Ekonomi",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Hükümet Politikası",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:7,sayi:159,ay:"Oca",baslik:"TÜİK-Bakan işsizlik çelişkisi",kategori:"Ekonomi",kaynak:"Sosyal Medya",tur:"Bağlamından Koparma",hedef:"TÜİK",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:8,sayi:159,ay:"Oca",baslik:"Somali CB oğluna vatandaşlık",kategori:"Toplumsal",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Göç Politikası",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:9,sayi:159,ay:"Oca",baslik:"Münbiç Kürtçe mezar tahribi",kategori:"Dış Politika",kaynak:"Terör Örgütü",tur:"Sahte Görüntü",hedef:"TSK",ulke:"Suriye",yontem:"Eski Görüntü"},
  {id:10,sayi:159,ay:"Oca",baslik:"Suriye infaz görüntüleri",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Suriye Politikası",ulke:"Meksika",yontem:"Farklı Ülke Görüntüsü"},
  // Sayı 160
  {id:11,sayi:160,ay:"Oca",baslik:"Kartalkaya bina yıkım",kategori:"Kamu Hizmeti",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Kültür Bakanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:12,sayi:160,ay:"Oca",baslik:"Suriyelilere hastane önceliği",kategori:"Toplumsal",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Sağlık Bakanlığı",ulke:"Türkiye",yontem:"Provokasyon"},
  {id:13,sayi:160,ay:"Oca",baslik:"Sahte kamu sosyal medya hesapları",kategori:"Dijital",kaynak:"Sosyal Medya",tur:"Sahte Hesap",hedef:"Kamu Kurumları",ulke:"Türkiye",yontem:"Kimlik Taklidi"},
  {id:14,sayi:160,ay:"Oca",baslik:"SGK erkek dul maaşı",kategori:"Ekonomi",kaynak:"Sosyal Medya",tur:"Bağlamından Koparma",hedef:"SGK",ulke:"Türkiye",yontem:"Çarpıtma"},
  // Sayı 161
  {id:15,sayi:161,ay:"Şub",baslik:"İngiltere diplomatik vize",kategori:"Dış Politika",kaynak:"Basın",tur:"Bağlamından Koparma",hedef:"Hükümet Politikası",ulke:"İngiltere",yontem:"Çarpıtma"},
  {id:16,sayi:161,ay:"Şub",baslik:"Siirt polis ateş açtı",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Emniyet",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:17,sayi:161,ay:"Şub",baslik:"Fatih Özer tahliye",kategori:"Yargı",kaynak:"Basın",tur:"Bağlamından Koparma",hedef:"Yargı",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:18,sayi:161,ay:"Şub",baslik:"Fransız donanması Türk gemisi",kategori:"Dış Politika",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Türkiye İmajı",ulke:"Tanzanya",yontem:"Yanlış İlişkilendirme"},
  {id:19,sayi:161,ay:"Şub",baslik:"TC-ATA uçağı uyuşturucu",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Bağlamından Koparma",hedef:"Cumhurbaşkanlığı",ulke:"Brezilya",yontem:"Eski Olay"},
  {id:20,sayi:161,ay:"Şub",baslik:"Kalp krizi ölüm oranı %66",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Yanlış Veri",hedef:"Sağlık Sistemi",ulke:"Türkiye",yontem:"Veri Çarpıtma"},
  // Sayı 162
  {id:21,sayi:162,ay:"Şub",baslik:"Suriye elektrik fatura manipülasyonu",kategori:"Ekonomi",kaynak:"Sosyal Medya",tur:"Yanlış İlişkilendirme",hedef:"Enerji Politikası",ulke:"Suriye",yontem:"Yanlış İlişkilendirme"},
  {id:22,sayi:162,ay:"Şub",baslik:"Sakarya İlkokulu güçlendirme",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"MEB",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:23,sayi:162,ay:"Şub",baslik:"İsrail UTTS çipi",kategori:"Teknoloji",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Hükümet Politikası",ulke:"İsrail",yontem:"Komplo Teorisi"},
  {id:24,sayi:162,ay:"Şub",baslik:"SGK 3 kat para tahsilatı",kategori:"Ekonomi",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"SGK",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:25,sayi:162,ay:"Şub",baslik:"Suriyeliler ikamet izni geçişi",kategori:"Toplumsal",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Göç Politikası",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:26,sayi:162,ay:"Şub",baslik:"Türkiye turist gemisi battı",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Türkiye İmajı",ulke:"Kongo",yontem:"Farklı Ülke Görüntüsü"},
  // Sayı 163
  {id:27,sayi:163,ay:"Şub",baslik:"Guardian sıfır atık manipülasyonu",kategori:"Çevre",kaynak:"Uluslararası Medya",tur:"Çarpıtma",hedef:"Sıfır Atık Projesi",ulke:"İngiltere",yontem:"Propaganda"},
  {id:28,sayi:163,ay:"Şub",baslik:"Erdoğan Bosna hükümet müdahalesi",kategori:"Dış Politika",kaynak:"Uluslararası Medya",tur:"Tamamen Asılsız",hedef:"Cumhurbaşkanlığı",ulke:"Bosna Hersek",yontem:"Yanlış Bilgi"},
  {id:29,sayi:163,ay:"Şub",baslik:"TMSF mahkemesiz el koyma",kategori:"Ekonomi",kaynak:"Basın",tur:"Çarpıtma",hedef:"Hükümet Politikası",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:30,sayi:163,ay:"Şub",baslik:"Kız çocukları ölüm aylığı kesimi",kategori:"Ekonomi",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"SGK",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:31,sayi:163,ay:"Şub",baslik:"Kıbrıs gazisi randevu",kategori:"Kamu Hizmeti",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Sağlık Bakanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  // Sayı 164
  {id:32,sayi:164,ay:"Mar",baslik:"BBC Suriye Kürt manipülasyonu",kategori:"Dış Politika",kaynak:"Uluslararası Medya",tur:"Çarpıtma",hedef:"TSK",ulke:"İngiltere",yontem:"Propaganda"},
  {id:33,sayi:164,ay:"Mar",baslik:"Öcalan çağrısı müzakere iddiaları",kategori:"Güvenlik",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Terörsüz Türkiye",ulke:"Türkiye",yontem:"Spekülasyon"},
  {id:34,sayi:164,ay:"Mar",baslik:"Çayırhan özelleştirme",kategori:"Ekonomi",kaynak:"Basın",tur:"Çarpıtma",hedef:"Özelleştirme",ulke:"Türkiye",yontem:"Eksik Bilgi"},
  {id:35,sayi:164,ay:"Mar",baslik:"TÜBİTAK projeler reddedildi",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Çarpıtma",hedef:"TÜBİTAK",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:36,sayi:164,ay:"Mar",baslik:"MEB oruç fişleme",kategori:"Toplumsal",kaynak:"Basın",tur:"Çarpıtma",hedef:"MEB",ulke:"Türkiye",yontem:"Provokasyon"},
  {id:37,sayi:164,ay:"Mar",baslik:"Derbi 32.500 polis",kategori:"Güvenlik",kaynak:"Basın",tur:"Yanlış Veri",hedef:"Emniyet",ulke:"Türkiye",yontem:"Abartma"},
  // Sayı 165
  {id:38,sayi:165,ay:"Mar",baslik:"Konya köpek saldırısı Rana",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Adli Süreç",ulke:"Türkiye",yontem:"Komplo Teorisi"},
  {id:39,sayi:165,ay:"Mar",baslik:"Suriye Alevi aile hedef alındı",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"TSK",ulke:"Lübnan",yontem:"Farklı Ülke Görüntüsü"},
  {id:40,sayi:165,ay:"Mar",baslik:"Denizli maden ruhsatı",kategori:"Çevre",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Çevre Politikası",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:41,sayi:165,ay:"Mar",baslik:"YÖK Genel Sekreter uyuşturucu",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Çarpıtma",hedef:"YÖK",ulke:"Türkiye",yontem:"Yanlış İlişkilendirme"},
  {id:42,sayi:165,ay:"Mar",baslik:"Bakan Şimşek döviz kuru",kategori:"Ekonomi",kaynak:"Basın",tur:"Bağlamından Koparma",hedef:"Maliye Bakanlığı",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:43,sayi:165,ay:"Mar",baslik:"Ereğli formaldehit",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Sağlık Bakanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:44,sayi:165,ay:"Mar",baslik:"Suriye Alevi çocuklar",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Suriye Politikası",ulke:"Lübnan",yontem:"Eski Görüntü"},
  // Sayı 166
  {id:45,sayi:166,ay:"Mar",baslik:"Morgan Stanley Borsa çekildi",kategori:"Ekonomi",kaynak:"Basın",tur:"Bağlamından Koparma",hedef:"Ekonomi",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:46,sayi:166,ay:"Mar",baslik:"İmamoğlu sağlık kontrolü",kategori:"İç Siyaset",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Yargı Süreci",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:47,sayi:166,ay:"Mar",baslik:"100 şirket vergi borcu erteleme",kategori:"Ekonomi",kaynak:"Basın",tur:"Yanlış Veri",hedef:"Maliye Bakanlığı",ulke:"Türkiye",yontem:"Teknik Çarpıtma"},
  {id:48,sayi:166,ay:"Mar",baslik:"SİHA aile katliamı Suriye",kategori:"Dış Politika",kaynak:"Uluslararası Medya",tur:"Tamamen Asılsız",hedef:"TSK",ulke:"Suriye",yontem:"Propaganda"},
  {id:49,sayi:166,ay:"Mar",baslik:"Uygur Türkleri Çin'e gönderilecek",kategori:"Dış Politika",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"İnsan Hakları",ulke:"Çin",yontem:"Yanlış Bilgi"},
  {id:50,sayi:166,ay:"Mar",baslik:"MEB imam hatip Alman kredi",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Çarpıtma",hedef:"MEB",ulke:"Almanya",yontem:"Veri Çarpıtma"},
  {id:51,sayi:166,ay:"Mar",baslik:"Konya köpek ezilme",kategori:"Toplumsal",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Hayvan Hakları",ulke:"Özbekistan",yontem:"Farklı Ülke Görüntüsü"},
  // Sayı 167 (İmamoğlu krizi)
  {id:52,sayi:167,ay:"Mar",baslik:"Şimşek istifa iddiası",kategori:"Ekonomi",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Maliye Bakanlığı",ulke:"Türkiye",yontem:"Spekülasyon"},
  {id:53,sayi:167,ay:"Mar",baslik:"Plastik mermi iddiası",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Tanımlama"},
  {id:54,sayi:167,ay:"Mar",baslik:"İBB'ye kayyım atandı",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Belediye",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:55,sayi:167,ay:"Mar",baslik:"Öğrenci ulaşım desteği kesildi",kategori:"Kamu Hizmeti",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Aile Bakanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:56,sayi:167,ay:"Mar",baslik:"RTÜK canlı yayın kesme",kategori:"Medya",kaynak:"Basın",tur:"Çarpıtma",hedef:"RTÜK",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:57,sayi:167,ay:"Mar",baslik:"Portakal gazı kullanımı",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:58,sayi:167,ay:"Mar",baslik:"İstanbul giriş çıkış yasağı",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Valilik",ulke:"Türkiye",yontem:"Abartma"},
  {id:59,sayi:167,ay:"Mar",baslik:"KYK gösterici soruşturma",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Gençlik Bakanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:60,sayi:167,ay:"Mar",baslik:"Çıplak arama darp",kategori:"İnsan Hakları",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:61,sayi:167,ay:"Mar",baslik:"Belediye başkanı yetki iddiaları",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Yargı Süreci",ulke:"Türkiye",yontem:"Hukuki Çarpıtma"},
  {id:62,sayi:167,ay:"Mar",baslik:"MASAK raporu dezenformasyon",kategori:"Ekonomi",kaynak:"Basın",tur:"Çarpıtma",hedef:"MASAK",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:63,sayi:167,ay:"Mar",baslik:"Polis iftar kumanyası",kategori:"Toplumsal",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Emniyet",ulke:"Türkiye",yontem:"Eski Görüntü"},
  {id:64,sayi:167,ay:"Mar",baslik:"Elon Musk İmamoğlu logosu",kategori:"Dijital",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Sosyal Medya",ulke:"ABD",yontem:"Yanlış Bilgi"},
  {id:65,sayi:167,ay:"Mar",baslik:"İmamoğlu kreş operasyonu",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Belediye",ulke:"Türkiye",yontem:"Eski Görüntü"},
  {id:66,sayi:167,ay:"Mar",baslik:"Saraçhane Çin görüntüleri",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Gösteriler",ulke:"Çin",yontem:"Farklı Ülke Görüntüsü"},
  {id:67,sayi:167,ay:"Mar",baslik:"Polis oruç yasağı",kategori:"Toplumsal",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:68,sayi:167,ay:"Mar",baslik:"Fransa İngiltere Türkiye terk edin",kategori:"Dış Politika",kaynak:"İsrail Propaganda",tur:"Tamamen Asılsız",hedef:"Türkiye İmajı",ulke:"İsrail",yontem:"Propaganda"},
  {id:69,sayi:167,ay:"Mar",baslik:"Doğu Timor görüntüleri Türkiye",kategori:"İç Siyaset",kaynak:"Uluslararası Medya",tur:"Sahte Görüntü",hedef:"Gösteriler",ulke:"Doğu Timor",yontem:"Farklı Ülke Görüntüsü"},
  {id:70,sayi:167,ay:"Mar",baslik:"RTÜK taraflı ceza",kategori:"Medya",kaynak:"Basın",tur:"Çarpıtma",hedef:"RTÜK",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:71,sayi:167,ay:"Mar",baslik:"Öğrencilere plastik mermi",kategori:"Güvenlik",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:72,sayi:167,ay:"Mar",baslik:"Kandıra Cezaevi 100 kişi",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Adalet Bakanlığı",ulke:"Türkiye",yontem:"Spekülasyon"},
  {id:73,sayi:167,ay:"Mar",baslik:"Protestocu polis öldürdü",kategori:"Güvenlik",kaynak:"Uluslararası Medya",tur:"Tamamen Asılsız",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:74,sayi:167,ay:"Mar",baslik:"CHP Haliç toplantı yasağı",kategori:"İç Siyaset",kaynak:"Basın",tur:"Çarpıtma",hedef:"Valilik",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:75,sayi:167,ay:"Mar",baslik:"Çalışkan Mehmet Uçum iddiası",kategori:"İç Siyaset",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Cumhurbaşkanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:76,sayi:167,ay:"Mar",baslik:"Ermenistan sınır açıldı",kategori:"Dış Politika",kaynak:"Basın",tur:"Çarpıtma",hedef:"Dış Politika",ulke:"Azerbaycan",yontem:"Çarpıtma"},
  // Sayı 168
  {id:77,sayi:168,ay:"Mar",baslik:"BBC muhabir sınır dışı",kategori:"Medya",kaynak:"Uluslararası Medya",tur:"Çarpıtma",hedef:"İletişim Başkanlığı",ulke:"İngiltere",yontem:"Çarpıtma"},
  {id:78,sayi:168,ay:"Mar",baslik:"İmamoğlu sahte tanık",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Yargı Süreci",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:79,sayi:168,ay:"Mar",baslik:"Öcalan mektubu RTÜK cezası",kategori:"Medya",kaynak:"Basın",tur:"Çarpıtma",hedef:"RTÜK",ulke:"Türkiye",yontem:"Yanlış İlişkilendirme"},
  {id:80,sayi:168,ay:"Mar",baslik:"Kanada pasaport el koyma",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Büyükelçilik",ulke:"Kanada",yontem:"Yanlış Bilgi"},
  {id:81,sayi:168,ay:"Mar",baslik:"Yunanistan görüntüleri Türkiye",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Gösteriler",ulke:"Yunanistan",yontem:"Farklı Ülke Görüntüsü"},
  {id:82,sayi:168,ay:"Mar",baslik:"Silivri yer yok emniyete götürme",kategori:"İç Siyaset",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Adalet Bakanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:83,sayi:168,ay:"Mar",baslik:"Şehzade Camii restorasyon",kategori:"Kamu Hizmeti",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Cumhurbaşkanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:84,sayi:168,ay:"Mar",baslik:"Bahçeli entübe",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"MHP",ulke:"Türkiye",yontem:"Spekülasyon"},
  {id:85,sayi:168,ay:"Mar",baslik:"Şişli kent lokantası kapatma",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Çarpıtma",hedef:"Belediye",ulke:"Türkiye",yontem:"Kronoloji Çarpıtma"},
  {id:86,sayi:168,ay:"Mar",baslik:"Külliye'ye girildi",kategori:"İç Siyaset",kaynak:"İsrail Propaganda",tur:"Sahte Görüntü",hedef:"Cumhurbaşkanlığı",ulke:"Türkiye",yontem:"Yanlış İlişkilendirme"},
  {id:87,sayi:168,ay:"Mar",baslik:"Ankara konser soruşturması",kategori:"İç Siyaset",kaynak:"Basın",tur:"Çarpıtma",hedef:"Belediye",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:88,sayi:168,ay:"Mar",baslik:"Cizre polis pamuk şeker",kategori:"Güvenlik",kaynak:"Basın",tur:"Bağlamından Koparma",hedef:"Emniyet",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:89,sayi:168,ay:"Mar",baslik:"Şişli okul yemek iptali",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Belediye",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  // Sayı 169
  {id:90,sayi:169,ay:"Nis",baslik:"MASAK raporu Şimşek baskısı",kategori:"Ekonomi",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Yargı Bağımsızlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:91,sayi:169,ay:"Nis",baslik:"Silivri kantin kapalı",kategori:"İnsan Hakları",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Adalet Bakanlığı",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:92,sayi:169,ay:"Nis",baslik:"Enflasyon farkı stok vergisi",kategori:"Ekonomi",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Maliye Bakanlığı",ulke:"Türkiye",yontem:"Spekülasyon"},
  {id:93,sayi:169,ay:"Nis",baslik:"Gözaltında cinsel saldırı",kategori:"İnsan Hakları",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:94,sayi:169,ay:"Nis",baslik:"Kalp krizi İsrail tohum",kategori:"Sağlık",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Tarım Politikası",ulke:"İsrail",yontem:"Komplo Teorisi"},
  // Sayı 170
  {id:95,sayi:170,ay:"Nis",baslik:"DEM Parti 13 talep",kategori:"İç Siyaset",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Terörsüz Türkiye",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:96,sayi:170,ay:"Nis",baslik:"Gazzeliler Suriye kampları",kategori:"Dış Politika",kaynak:"İsrail Propaganda",tur:"Tamamen Asılsız",hedef:"Filistin Politikası",ulke:"İsrail",yontem:"Propaganda"},
  {id:97,sayi:170,ay:"Nis",baslik:"Gösterilerde balta yok iddiası",kategori:"İç Siyaset",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Gösteriler",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:98,sayi:170,ay:"Nis",baslik:"Politika kurulları maaş",kategori:"Ekonomi",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Cumhurbaşkanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:99,sayi:170,ay:"Nis",baslik:"Bayburt KYK bıçaklı saldırı",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Gençlik Bakanlığı",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:100,sayi:170,ay:"Nis",baslik:"İmamoğlu diploma komisyon",kategori:"İç Siyaset",kaynak:"Basın",tur:"Çarpıtma",hedef:"Üniversite",ulke:"Türkiye",yontem:"Hukuki Çarpıtma"},
  {id:101,sayi:170,ay:"Nis",baslik:"AFAD konteyner kent imza tehdidi",kategori:"Toplumsal",kaynak:"Basın",tur:"Çarpıtma",hedef:"AFAD",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:102,sayi:170,ay:"Nis",baslik:"El-Bab Filistin kampı",kategori:"Dış Politika",kaynak:"İsrail Propaganda",tur:"Tamamen Asılsız",hedef:"Filistin Politikası",ulke:"İsrail",yontem:"Propaganda"},
  {id:103,sayi:170,ay:"Nis",baslik:"MEB yaz tatili erkene çekme",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"MEB",ulke:"Türkiye",yontem:"Spekülasyon"},
  {id:104,sayi:170,ay:"Nis",baslik:"Diyanet fetva hadis manipülasyonu",kategori:"Toplumsal",kaynak:"Sosyal Medya",tur:"Bağlamından Koparma",hedef:"Diyanet",ulke:"Türkiye",yontem:"Organize Kampanya"},
  {id:105,sayi:170,ay:"Nis",baslik:"Gazze sağlık çalışanları Hamas",kategori:"Dış Politika",kaynak:"İsrail Propaganda",tur:"Tamamen Asılsız",hedef:"İsrail Soykırımı",ulke:"İsrail",yontem:"Propaganda"},
  // Sayı 171
  {id:106,sayi:171,ay:"Nis",baslik:"Gazzeliler 10 milyar dolar",kategori:"Dış Politika",kaynak:"İsrail Propaganda",tur:"Tamamen Asılsız",hedef:"Filistin Politikası",ulke:"İsrail",yontem:"Propaganda"},
  {id:107,sayi:171,ay:"Nis",baslik:"Lefkoşa Büyükelçilik kaset",kategori:"Dış Politika",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Dış Politika",ulke:"KKTC",yontem:"Kurgu"},
  {id:108,sayi:171,ay:"Nis",baslik:"Atatürk imzası peç kaldırma",kategori:"TSK",kaynak:"Basın",tur:"Çarpıtma",hedef:"TSK",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:109,sayi:171,ay:"Nis",baslik:"TOKİ konut projesi İmamoğlu",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Yanlış İlişkilendirme",hedef:"TOKİ",ulke:"Türkiye",yontem:"Yanlış İlişkilendirme"},
  {id:110,sayi:171,ay:"Nis",baslik:"CHP kurultay iptali kayyum",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"CHP",ulke:"Türkiye",yontem:"Spekülasyon"},
  {id:111,sayi:171,ay:"Nis",baslik:"Yemek kartı market sınırı",kategori:"Ekonomi",kaynak:"Basın",tur:"Çarpıtma",hedef:"SGK",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:112,sayi:171,ay:"Nis",baslik:"Köklü lise öğretmen ihraç",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Çarpıtma",hedef:"MEB",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:113,sayi:171,ay:"Nis",baslik:"Orta şerit ceza",kategori:"Güvenlik",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:114,sayi:171,ay:"Nis",baslik:"Erdoğan yargı mensubu diyaloğu",kategori:"Yargı",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Cumhurbaşkanlığı",ulke:"Türkiye",yontem:"Kurgu"},
  {id:115,sayi:171,ay:"Nis",baslik:"Buldan Öcalan serbest kalacak",kategori:"Güvenlik",kaynak:"Basın",tur:"Çarpıtma",hedef:"Terörsüz Türkiye",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:116,sayi:171,ay:"Nis",baslik:"El-Ehli Hastanesi Hamas karargahı",kategori:"Dış Politika",kaynak:"İsrail Propaganda",tur:"Tamamen Asılsız",hedef:"İsrail Soykırımı",ulke:"İsrail",yontem:"Propaganda"},
  // Sayı 172
  {id:117,sayi:172,ay:"Nis",baslik:"Sazlıdere Barajı su krizi",kategori:"Çevre",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Kanal İstanbul",ulke:"Türkiye",yontem:"Abartma"},
  {id:118,sayi:172,ay:"Nis",baslik:"AFAD İBB'siz deprem toplantısı",kategori:"Kamu Hizmeti",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"AFAD",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:119,sayi:172,ay:"Nis",baslik:"GPS Saturn deprem tetikleme",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Deprem",ulke:"Türkiye",yontem:"Komplo Teorisi"},
  {id:120,sayi:172,ay:"Nis",baslik:"ABD gemisi deprem HAARP",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Deprem",ulke:"ABD",yontem:"Komplo Teorisi"},
  {id:121,sayi:172,ay:"Nis",baslik:"AFAD acil kod İstanbul",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"AFAD",ulke:"Türkiye",yontem:"Panik Yaratma"},
  {id:122,sayi:172,ay:"Nis",baslik:"Hava Harp Okulu İzmir taşınma",kategori:"TSK",kaynak:"Basın",tur:"Çarpıtma",hedef:"TSK",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:123,sayi:172,ay:"Nis",baslik:"DMM yalanlarken doğruladı",kategori:"Medya",kaynak:"Basın",tur:"Çarpıtma",hedef:"İletişim Başkanlığı",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:124,sayi:172,ay:"Nis",baslik:"İSKİ TOKİ yıkım operasyon",kategori:"İç Siyaset",kaynak:"Basın",tur:"Yanlış İlişkilendirme",hedef:"Yargı Süreci",ulke:"Türkiye",yontem:"Yanlış İlişkilendirme"},
  {id:125,sayi:172,ay:"Nis",baslik:"Kaset şantaj iddiaları",kategori:"İç Siyaset",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Devlet Yetkilileri",ulke:"Türkiye",yontem:"Kurgu"},
  {id:126,sayi:172,ay:"Nis",baslik:"Deprem yapay zeka görüntüsü",kategori:"Dijital",kaynak:"Sosyal Medya",tur:"Yapay Zeka İçerik",hedef:"Deprem",ulke:"Türkiye",yontem:"AI Üretimi"},
  {id:127,sayi:172,ay:"Nis",baslik:"Müebbet mahkum mektup tahliye",kategori:"Yargı",kaynak:"Basın",tur:"Çarpıtma",hedef:"Adalet Bakanlığı",ulke:"Türkiye",yontem:"Yanlış İlişkilendirme"},
  {id:128,sayi:172,ay:"Nis",baslik:"49 kişi tutuklu iddiası",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Yanlış Veri",hedef:"Yargı Süreci",ulke:"Türkiye",yontem:"Abartma"},
  {id:129,sayi:172,ay:"Nis",baslik:"Esila Ayık bilinç kaybı",kategori:"İnsan Hakları",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Adalet Bakanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:130,sayi:172,ay:"Nis",baslik:"Planlı sezaryen yasaklandı",kategori:"Sağlık",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Sağlık Bakanlığı",ulke:"Türkiye",yontem:"Hukuki Çarpıtma"},
  // Sayı 173
  {id:131,sayi:173,ay:"May",baslik:"İtalya 5 bin vize iptali",kategori:"Dış Politika",kaynak:"Basın",tur:"Yanlış İlişkilendirme",hedef:"Cumhurbaşkanlığı",ulke:"İtalya",yontem:"Yanlış İlişkilendirme"},
  {id:132,sayi:173,ay:"May",baslik:"Kanal İstanbul açıklama çelişkisi",kategori:"İç Siyaset",kaynak:"Basın",tur:"Çarpıtma",hedef:"Hükümet Politikası",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:133,sayi:173,ay:"May",baslik:"CHP şoför tutuklama",kategori:"İç Siyaset",kaynak:"Basın",tur:"Çarpıtma",hedef:"Yargı Süreci",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:134,sayi:173,ay:"May",baslik:"Meclis dinleniyor",kategori:"İç Siyaset",kaynak:"Basın",tur:"Çarpıtma",hedef:"BTK",ulke:"Türkiye",yontem:"Abartma"},
  {id:135,sayi:173,ay:"May",baslik:"Başsavcı Gürlek siyasi görev",kategori:"Yargı",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Yargı Bağımsızlığı",ulke:"Türkiye",yontem:"Propaganda"},
  {id:136,sayi:173,ay:"May",baslik:"Netanyahu uçağı hava sahası",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"İsrail Politikası",ulke:"İsrail",yontem:"Yanlış Bilgi"},
  {id:137,sayi:173,ay:"May",baslik:"Harran barınma merkezi",kategori:"İnsan Hakları",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Göç Politikası",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:138,sayi:173,ay:"May",baslik:"Emlak Konut avantajlı satış",kategori:"Ekonomi",kaynak:"Basın",tur:"Çarpıtma",hedef:"TOKİ",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:139,sayi:173,ay:"May",baslik:"TSK teğmen ajan ifadesi",kategori:"TSK",kaynak:"Basın",tur:"Bağlamından Koparma",hedef:"MSB",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:140,sayi:173,ay:"May",baslik:"Etlik tavuk tümör hormon",kategori:"Sağlık",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Tarım Politikası",ulke:"Türkiye",yontem:"Bilim Dışı İddia"},
  {id:141,sayi:173,ay:"May",baslik:"72 saat enerji kesintisi",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Enerji Altyapısı",ulke:"Türkiye",yontem:"Panik Yaratma"},
  {id:142,sayi:173,ay:"May",baslik:"Güvenlik kamerası bantlama",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:143,sayi:173,ay:"May",baslik:"Erdoğan diploma Yargıtay",kategori:"İç Siyaset",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Cumhurbaşkanlığı",ulke:"Türkiye",yontem:"Hukuki Çarpıtma"},
  {id:144,sayi:173,ay:"May",baslik:"Çakarlı araç vali yeğeni",kategori:"Toplumsal",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"Valilik",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:145,sayi:173,ay:"May",baslik:"Fidan Hamas baskı",kategori:"Dış Politika",kaynak:"İsrail Propaganda",tur:"Tamamen Asılsız",hedef:"Dış Politika",ulke:"İsrail",yontem:"Propaganda"},
  {id:146,sayi:173,ay:"May",baslik:"Türk limanları Kıbrıs gemileri",kategori:"Dış Politika",kaynak:"Uluslararası Medya",tur:"Tamamen Asılsız",hedef:"Kıbrıs Politikası",ulke:"GKRY",yontem:"Yanlış Bilgi"},
  {id:147,sayi:173,ay:"May",baslik:"TRT muhabiri muhalefet hedef",kategori:"Medya",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"TRT",ulke:"Türkiye",yontem:"Yanlış İlişkilendirme"},
  {id:148,sayi:173,ay:"May",baslik:"Pakistan 6 uçak silah",kategori:"Dış Politika",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Dış Politika",ulke:"Pakistan",yontem:"Spekülasyon"},
  {id:149,sayi:173,ay:"May",baslik:"TRT Vaşington yazımı",kategori:"Medya",kaynak:"Sosyal Medya",tur:"Tamamen Asılsız",hedef:"TRT",ulke:"ABD",yontem:"Bilgisizlik"},
  {id:150,sayi:173,ay:"May",baslik:"Hindistan Suhoy jetleri Pakistan",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Uluslararası",ulke:"Rusya",yontem:"Eski Görüntü"},
  {id:151,sayi:173,ay:"May",baslik:"İdlib Ezidi kadınlar",kategori:"Dış Politika",kaynak:"İsrail Propaganda",tur:"Sahte Görüntü",hedef:"Suriye Politikası",ulke:"Mısır",yontem:"Farklı Ülke Görüntüsü"},
  // Sayı 174
  {id:152,sayi:174,ay:"May",baslik:"Şehit cenaze otoparktan",kategori:"TSK",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"TSK",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:153,sayi:174,ay:"May",baslik:"MSB şehit terör adı çıkarıldı",kategori:"TSK",kaynak:"Basın",tur:"Çarpıtma",hedef:"MSB",ulke:"Türkiye",yontem:"Çarpıtma"},
  {id:154,sayi:174,ay:"May",baslik:"Valaris DS-9 kıta sahanlığı",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Yanlış Veri",hedef:"Deniz Yetki Alanı",ulke:"GKRY",yontem:"Yanlış Konum"},
  {id:155,sayi:174,ay:"May",baslik:"ABD sabıka kaydı erişimi",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Çarpıtma",hedef:"Adalet Bakanlığı",ulke:"ABD",yontem:"Çarpıtma"},
  {id:156,sayi:174,ay:"May",baslik:"Özel saldırgan GBT silindi",kategori:"Güvenlik",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Emniyet",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:157,sayi:174,ay:"May",baslik:"Hindistan Pakistan saldırı görüntü",kategori:"Dış Politika",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"Uluslararası",ulke:"İran",yontem:"Eski Görüntü"},
  // Sayı 175
  {id:158,sayi:175,ay:"May",baslik:"Erdoğan rozet vekil tanımadı",kategori:"İç Siyaset",kaynak:"Basın",tur:"Bağlamından Koparma",hedef:"Cumhurbaşkanlığı",ulke:"Türkiye",yontem:"Bağlamından Koparma"},
  {id:159,sayi:175,ay:"May",baslik:"Yargı paketi 12 yıl 9 ay",kategori:"Yargı",kaynak:"Basın",tur:"Çarpıtma",hedef:"Adalet Bakanlığı",ulke:"Türkiye",yontem:"Hukuki Çarpıtma"},
  {id:160,sayi:175,ay:"May",baslik:"YÖK Fidan diploma denkliği",kategori:"İç Siyaset",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Dışişleri Bakanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:161,sayi:175,ay:"May",baslik:"Şimşek yatırımcı operasyon bilgi",kategori:"Ekonomi",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Maliye Bakanlığı",ulke:"Türkiye",yontem:"Yanlış Bilgi"},
  {id:162,sayi:175,ay:"May",baslik:"Gara dağı çatışma görüntüleri",kategori:"Güvenlik",kaynak:"Sosyal Medya",tur:"Sahte Görüntü",hedef:"TSK",ulke:"Türkiye",yontem:"Sahte Görüntü"},
  {id:163,sayi:175,ay:"May",baslik:"Anayasa özerk federal yönetim",kategori:"İç Siyaset",kaynak:"Basın",tur:"Tamamen Asılsız",hedef:"Terörsüz Türkiye",ulke:"Türkiye",yontem:"Spekülasyon"},
];

const COLORS = ["#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#8b5cf6","#ec4899","#06b6d4","#84cc16","#f43f5e","#6366f1","#14b8a6","#d946ef","#fb923c"];
const DARK_BG = "#0f172a";
const CARD_BG = "#1e293b";
const CARD_BORDER = "#334155";
const TEXT_PRIMARY = "#f1f5f9";
const TEXT_SECONDARY = "#94a3b8";
const ACCENT = "#3b82f6";

const tabs = ["Genel Bakış","Kategoriler","Kaynaklar & Yöntem","Söylem Analizi","Zaman Serisi","Coğrafi"];

export default function Dashboard() {
  const [tab, setTab] = useState(0);

  const kategoriler = useMemo(() => {
    const m = {};
    data.forEach(d => { m[d.kategori] = (m[d.kategori]||0)+1; });
    return Object.entries(m).map(([k,v])=>({name:k,value:v})).sort((a,b)=>b.value-a.value);
  },[]);

  const turler = useMemo(() => {
    const m = {};
    data.forEach(d => { m[d.tur] = (m[d.tur]||0)+1; });
    return Object.entries(m).map(([k,v])=>({name:k,value:v})).sort((a,b)=>b.value-a.value);
  },[]);

  const kaynaklar = useMemo(() => {
    const m = {};
    data.forEach(d => { m[d.kaynak] = (m[d.kaynak]||0)+1; });
    return Object.entries(m).map(([k,v])=>({name:k,value:v})).sort((a,b)=>b.value-a.value);
  },[]);

  const yontemler = useMemo(() => {
    const m = {};
    data.forEach(d => { m[d.yontem] = (m[d.yontem]||0)+1; });
    return Object.entries(m).map(([k,v])=>({name:k,value:v})).sort((a,b)=>b.value-a.value).slice(0,12);
  },[]);

  const aylik = useMemo(() => {
    const aylar = ["Oca","Şub","Mar","Nis","May"];
    return aylar.map(ay => {
      const items = data.filter(d=>d.ay===ay);
      const obj = {ay, toplam: items.length};
      const cats = {};
      items.forEach(d => { cats[d.kategori] = (cats[d.kategori]||0)+1; });
      return {...obj, ...cats};
    });
  },[]);

  const sayiBazli = useMemo(() => {
    const m = {};
    data.forEach(d => { m[d.sayi] = (m[d.sayi]||0)+1; });
    return Object.entries(m).map(([k,v])=>({sayi:`S.${k}`,count:v}));
  },[]);

  const ulkeler = useMemo(() => {
    const m = {};
    data.forEach(d => { m[d.ulke] = (m[d.ulke]||0)+1; });
    return Object.entries(m).map(([k,v])=>({name:k,value:v})).sort((a,b)=>b.value-a.value);
  },[]);

  const hedefler = useMemo(() => {
    const m = {};
    data.forEach(d => { m[d.hedef] = (m[d.hedef]||0)+1; });
    return Object.entries(m).map(([k,v])=>({name:k,value:v})).sort((a,b)=>b.value-a.value).slice(0,15);
  },[]);

  const radarData = useMemo(() => {
    const dims = ["Tamamen Asılsız","Çarpıtma","Bağlamından Koparma","Sahte Görüntü","Yanlış Bilgi","Spekülasyon"];
    return dims.map(d => {
      const c = data.filter(x => x.tur === d || x.yontem === d).length;
      return { dim: d.length > 16 ? d.slice(0,14)+'..' : d, val: c };
    });
  },[]);

  const soylems = useMemo(() => {
    const tamAsilsiz = data.filter(d=>d.tur==="Tamamen Asılsız").length;
    const carpitma = data.filter(d=>d.tur==="Çarpıtma"||d.tur==="Bağlamından Koparma").length;
    const sahte = data.filter(d=>d.tur==="Sahte Görüntü"||d.tur==="Yapay Zeka İçerik").length;
    const veri = data.filter(d=>d.tur==="Yanlış Veri"||d.tur==="Yanlış İlişkilendirme").length;
    return [
      {name:"Tamamen Uydurma",val:tamAsilsiz,pct:Math.round(tamAsilsiz/data.length*100)},
      {name:"Çarpıtma/Koparma",val:carpitma,pct:Math.round(carpitma/data.length*100)},
      {name:"Sahte/AI Görüntü",val:sahte,pct:Math.round(sahte/data.length*100)},
      {name:"Veri/İlişki Hatası",val:veri,pct:Math.round(veri/data.length*100)},
    ];
  },[]);

  const Card = ({children, title, span}) => (
    <div style={{background:CARD_BG,border:`1px solid ${CARD_BORDER}`,borderRadius:12,padding:"16px 20px",gridColumn:span?`span ${span}`:"span 1"}}>
      {title && <h3 style={{color:TEXT_PRIMARY,fontSize:14,fontWeight:600,marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>{title}</h3>}
      {children}
    </div>
  );

  const Stat = ({label,value,sub,color}) => (
    <div style={{background:CARD_BG,border:`1px solid ${CARD_BORDER}`,borderRadius:12,padding:"20px",textAlign:"center"}}>
      <div style={{fontSize:36,fontWeight:700,color:color||ACCENT}}>{value}</div>
      <div style={{fontSize:13,color:TEXT_PRIMARY,fontWeight:600,marginTop:4}}>{label}</div>
      {sub && <div style={{fontSize:11,color:TEXT_SECONDARY,marginTop:2}}>{sub}</div>}
    </div>
  );

  const CustomTooltip = ({active,payload,label}) => {
    if(!active||!payload?.length) return null;
    return (
      <div style={{background:"#0f172a",border:"1px solid #475569",borderRadius:8,padding:"8px 12px",fontSize:12}}>
        <div style={{color:TEXT_PRIMARY,fontWeight:600}}>{label}</div>
        {payload.map((p,i)=>(
          <div key={i} style={{color:p.color||p.fill||TEXT_SECONDARY}}>{p.name}: {p.value}</div>
        ))}
      </div>
    );
  };

  return (
    <div style={{background:DARK_BG,minHeight:"100vh",color:TEXT_PRIMARY,fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{padding:"24px 20px 12px",borderBottom:`1px solid ${CARD_BORDER}`}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <div style={{width:8,height:32,background:"linear-gradient(180deg,#ef4444,#3b82f6)",borderRadius:4}}/>
          <div>
            <h1 style={{fontSize:20,fontWeight:700,margin:0}}>Dezenformasyon Bülteni 2025 Almanak</h1>
            <p style={{fontSize:12,color:TEXT_SECONDARY,margin:0}}>Cumhurbaşkanlığı İletişim Başkanlığı — Sayı 158-175 Analiz Dashboard</p>
          </div>
        </div>
        <div style={{display:"flex",gap:4,marginTop:12,overflowX:"auto",paddingBottom:4}}>
          {tabs.map((t,i)=>(
            <button key={i} onClick={()=>setTab(i)} style={{
              padding:"8px 16px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:tab===i?600:400,
              background:tab===i?ACCENT:"transparent",color:tab===i?"#fff":TEXT_SECONDARY,whiteSpace:"nowrap"
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{padding:20}}>

        {tab===0 && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            <Stat label="Toplam İddia" value={data.length} sub="18 bülten sayısı" color="#ef4444"/>
            <Stat label="Aylık Ortalama" value={Math.round(data.length/5)} sub="Oca-May 2025" color="#f97316"/>
            <Stat label="Farklı Kategori" value={kategoriler.length} sub="tematik alan" color="#22c55e"/>
            <Stat label="Sahte Görüntü" value={data.filter(d=>d.tur==="Sahte Görüntü"||d.tur==="Yapay Zeka İçerik").length} sub="farklı ülke/AI" color="#8b5cf6"/>

            <Card title="Bülten Bazlı Dağılım" span={2}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={sayiBazli}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis dataKey="sayi" tick={{fill:TEXT_SECONDARY,fontSize:10}} angle={-45} textAnchor="end" height={50}/>
                  <YAxis tick={{fill:TEXT_SECONDARY,fontSize:10}}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="count" fill="#3b82f6" radius={[4,4,0,0]} name="İddia Sayısı"/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Dezenformasyon Türü" span={2}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={turler} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({pct})=>`${Math.round(pct)}%`} labelLine={false} fontSize={10}>
                    {turler.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                  </Pie>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Legend wrapperStyle={{fontSize:11}}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Güvenilirlik Skalası" span={4}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {soylems.map((s,i) => (
                  <div key={i} style={{background:"#0f172a",borderRadius:8,padding:16,textAlign:"center"}}>
                    <div style={{fontSize:28,fontWeight:700,color:COLORS[i]}}>{s.pct}%</div>
                    <div style={{fontSize:12,color:TEXT_PRIMARY,fontWeight:500}}>{s.name}</div>
                    <div style={{fontSize:11,color:TEXT_SECONDARY}}>{s.val} iddia</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {tab===1 && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
            <Card title="Kategorilere Göre Dağılım" span={2}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={kategoriler} layout="vertical" margin={{left:100}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis type="number" tick={{fill:TEXT_SECONDARY,fontSize:11}}/>
                  <YAxis type="category" dataKey="name" tick={{fill:TEXT_SECONDARY,fontSize:11}} width={95}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="value" radius={[0,4,4,0]} name="İddia Sayısı">
                    {kategoriler.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Hedeflenen Kurum/Politikalar (İlk 15)" span={2}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={hedefler} layout="vertical" margin={{left:120}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis type="number" tick={{fill:TEXT_SECONDARY,fontSize:11}}/>
                  <YAxis type="category" dataKey="name" tick={{fill:TEXT_SECONDARY,fontSize:11}} width={115}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="value" fill="#f97316" radius={[0,4,4,0]} name="Hedeflenme"/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {tab===2 && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
            <Card title="Kaynak Türleri">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={kaynaklar} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({name,value})=>`${name} (${value})`} labelLine={true} fontSize={11}>
                    {kaynaklar.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                  </Pie>
                  <Tooltip content={<CustomTooltip/>}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Manipülasyon Yöntemi Radar">
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={90}>
                  <PolarGrid stroke="#334155"/>
                  <PolarAngleAxis dataKey="dim" tick={{fill:TEXT_SECONDARY,fontSize:10}}/>
                  <PolarRadiusAxis tick={{fill:TEXT_SECONDARY,fontSize:9}}/>
                  <Radar dataKey="val" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Sıklık"/>
                  <Tooltip content={<CustomTooltip/>}/>
                </RadarChart>
              </ResponsiveContainer>
            </Card>
            <Card title="En Sık Kullanılan Yöntemler" span={2}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yontemler}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis dataKey="name" tick={{fill:TEXT_SECONDARY,fontSize:10}} angle={-35} textAnchor="end" height={80}/>
                  <YAxis tick={{fill:TEXT_SECONDARY,fontSize:11}}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="value" name="Kullanım" radius={[4,4,0,0]}>
                    {yontemler.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {tab===3 && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
            <Card title="Söylem Analizi: Dezenformasyon Sınıflandırması" span={2}>
              <div style={{fontSize:13,color:TEXT_SECONDARY,lineHeight:1.8,marginBottom:16}}>
                <p style={{margin:"0 0 12px"}}>Bültenlerde kullanılan resmi söylem kalıpları analiz edildiğinde, tutarlı bir çerçeveleme stratejisi ortaya çıkmaktadır:</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div style={{background:"#0f172a",padding:16,borderRadius:8,borderLeft:"3px solid #ef4444"}}>
                    <div style={{color:"#ef4444",fontWeight:600,fontSize:13,marginBottom:6}}>İddiaları Nitelendirme Dili</div>
                    <div style={{fontSize:12}}>"doğru değildir" (en sık) → "manipülasyon içermektedir" → "asılsızdır" → "dezenformasyondur" → "gerçeği yansıtmamaktadır"</div>
                  </div>
                  <div style={{background:"#0f172a",padding:16,borderRadius:8,borderLeft:"3px solid #3b82f6"}}>
                    <div style={{color:"#3b82f6",fontWeight:600,fontSize:13,marginBottom:6}}>Kapanış Formülleri</div>
                    <div style={{fontSize:12}}>"Asılsız iddialara itibar etmeyiniz" → "Kamuoyunu manipüle etmeye yönelik..." → "...provoke etmeye yönelik..." → "Dezenformasyon kampanyalarına itibar etmeyiniz"</div>
                  </div>
                  <div style={{background:"#0f172a",padding:16,borderRadius:8,borderLeft:"3px solid #22c55e"}}>
                    <div style={{color:"#22c55e",fontWeight:600,fontSize:13,marginBottom:6}}>Otorite Referansları</div>
                    <div style={{fontSize:12}}>Bakanlık açıklamaları, yasal mevzuat maddeleri, istatistiksel veriler, ters görsel arama sonuçları, uluslararası kuruluş raporları</div>
                  </div>
                  <div style={{background:"#0f172a",padding:16,borderRadius:8,borderLeft:"3px solid #f97316"}}>
                    <div style={{color:"#f97316",fontWeight:600,fontSize:13,marginBottom:6}}>Atıf Edilen Aktörler</div>
                    <div style={{fontSize:12}}>"İsrail propaganda hesapları", "Terör örgütü PKK/YPG", "bazı basın yayın organları", "bazı sosyal medya hesapları"</div>
                  </div>
                </div>
              </div>
            </Card>
            <Card title="Dezenformasyon Şiddet Skalası" span={1}>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  {l:"Tamamen Uydurma İçerik",pct:Math.round(data.filter(d=>d.tur==="Tamamen Asılsız").length/data.length*100),c:"#ef4444"},
                  {l:"Çarpıtma / Framing",pct:Math.round(data.filter(d=>d.tur==="Çarpıtma").length/data.length*100),c:"#f97316"},
                  {l:"Bağlamından Koparma",pct:Math.round(data.filter(d=>d.tur==="Bağlamından Koparma").length/data.length*100),c:"#eab308"},
                  {l:"Sahte / AI Görüntü",pct:Math.round(data.filter(d=>d.tur==="Sahte Görüntü"||d.tur==="Yapay Zeka İçerik").length/data.length*100),c:"#8b5cf6"},
                  {l:"Veri / Sayı Çarpıtma",pct:Math.round(data.filter(d=>d.tur==="Yanlış Veri").length/data.length*100),c:"#06b6d4"},
                ].map((item,i) => (
                  <div key={i}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4}}>
                      <span style={{color:TEXT_PRIMARY}}>{item.l}</span>
                      <span style={{color:item.c,fontWeight:600}}>{item.pct}%</span>
                    </div>
                    <div style={{height:8,background:"#0f172a",borderRadius:4}}>
                      <div style={{height:"100%",width:`${item.pct}%`,background:item.c,borderRadius:4,transition:"width 0.5s"}}/>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Eleştirel Değerlendirme Notu" span={1}>
              <div style={{fontSize:12,color:TEXT_SECONDARY,lineHeight:1.7}}>
                <p style={{margin:"0 0 8px",color:"#fbbf24",fontWeight:600}}>⚠ Metodolojik Uyarılar</p>
                <p style={{margin:"0 0 6px"}}>• Belge, hükümetin resmi perspektifinden hazırlanmıştır; bağımsız bir doğrulama mekanizması değildir.</p>
                <p style={{margin:"0 0 6px"}}>• "HAKİKAT" bölümlerindeki karşı anlatılar da bağımsız doğrulamaya tabidir.</p>
                <p style={{margin:"0 0 6px"}}>• Siyasi tartışma konusu olan meseleler ile olgusal yanlışlar aynı kategoride ele alınmaktadır.</p>
                <p style={{margin:"0 0 6px"}}>• Belge hem bilgi düzeltme hem stratejik iletişim işlevi görmektedir.</p>
                <p style={{margin:0}}>• Kaynak çeşitliliği ve çapraz doğrulama imkânı sınırlıdır.</p>
              </div>
            </Card>
          </div>
        )}

        {tab===4 && (
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:16}}>
            <Card title="Aylık İddia Sayısı Trendi">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={aylik}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis dataKey="ay" tick={{fill:TEXT_SECONDARY,fontSize:12}}/>
                  <YAxis tick={{fill:TEXT_SECONDARY,fontSize:11}}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Line type="monotone" dataKey="toplam" stroke="#ef4444" strokeWidth={3} dot={{r:6,fill:"#ef4444"}} name="Toplam İddia"/>
                </LineChart>
              </ResponsiveContainer>
              <div style={{fontSize:12,color:TEXT_SECONDARY,marginTop:8,textAlign:"center"}}>
                Mart 2025: İBB soruşturması sonrası dezenformasyon pik noktası — tek sayıda (167) 25 iddia
              </div>
            </Card>
            <Card title="Aylık Kategori Dağılımı">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={aylik}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis dataKey="ay" tick={{fill:TEXT_SECONDARY}}/>
                  <YAxis tick={{fill:TEXT_SECONDARY,fontSize:11}}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Legend wrapperStyle={{fontSize:11}}/>
                  <Bar dataKey="Dış Politika" stackId="a" fill="#3b82f6"/>
                  <Bar dataKey="İç Siyaset" stackId="a" fill="#ef4444"/>
                  <Bar dataKey="Ekonomi" stackId="a" fill="#22c55e"/>
                  <Bar dataKey="Güvenlik" stackId="a" fill="#f97316"/>
                  <Bar dataKey="Kamu Hizmeti" stackId="a" fill="#8b5cf6"/>
                  <Bar dataKey="Toplumsal" stackId="a" fill="#ec4899"/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {tab===5 && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
            <Card title="İddialarda Atıfta Bulunulan Ülkeler" span={2}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={ulkeler} layout="vertical" margin={{left:90}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis type="number" tick={{fill:TEXT_SECONDARY,fontSize:11}}/>
                  <YAxis type="category" dataKey="name" tick={{fill:TEXT_SECONDARY,fontSize:11}} width={85}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="value" name="İddia Sayısı" radius={[0,4,4,0]}>
                    {ulkeler.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Uluslararası Dezenformasyon Kaynakları" span={1}>
              <div style={{fontSize:12,color:TEXT_SECONDARY,lineHeight:1.8}}>
                <div style={{marginBottom:12}}>
                  <span style={{color:"#ef4444",fontWeight:600}}>İsrail Propaganda Hesapları:</span> {data.filter(d=>d.kaynak==="İsrail Propaganda").length} iddia — Gazze tehciri, hastane saldırıları, Türkiye imajı
                </div>
                <div style={{marginBottom:12}}>
                  <span style={{color:"#3b82f6",fontWeight:600}}>Uluslararası Medya:</span> {data.filter(d=>d.kaynak==="Uluslararası Medya").length} iddia — BBC, Guardian, Yunanistan/GKRY basını
                </div>
                <div style={{marginBottom:12}}>
                  <span style={{color:"#8b5cf6",fontWeight:600}}>Terör Örgütü Bağlantılı:</span> {data.filter(d=>d.kaynak==="Terör Örgütü").length} iddia — PKK/YPG propaganda
                </div>
                <div>
                  <span style={{color:"#22c55e",fontWeight:600}}>Sahte Görüntü Kaynağı Ülkeler:</span> Lübnan, Meksika, Kongo, Çin, Özbekistan, Doğu Timor, Yunanistan, Mısır, İran, Rusya
                </div>
              </div>
            </Card>
            <Card title="Farklı Ülke Görüntüsü Kullanımı" span={1}>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {data.filter(d=>d.yontem==="Farklı Ülke Görüntüsü"||d.yontem==="Eski Görüntü").map((d,i) => (
                  <div key={i} style={{background:"#0f172a",padding:"8px 12px",borderRadius:6,fontSize:11,display:"flex",justifyContent:"space-between"}}>
                    <span style={{color:TEXT_PRIMARY}}>{d.baslik.slice(0,35)}...</span>
                    <span style={{color:COLORS[i%COLORS.length],fontWeight:600}}>← {d.ulke}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      <div
  style={{
    padding: "16px 20px",
    borderTop: `1px solid ${CARD_BORDER}`,
    textAlign: "center",
    fontSize: 11,
    color: TEXT_SECONDARY,
  }}
>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
    <img
      src={tubitakLogo}
      alt="TÜBİTAK"
      style={{ height: 52, width: "auto", opacity: 0.95 }}
    />

    <div style={{ fontSize: 12, color: TEXT_PRIMARY, fontWeight: 600 }}>
      TÜBİTAK 3005 Projesi Çalışmaları
    </div>

    <div style={{ fontSize: 11, color: TEXT_SECONDARY }}>
      Proje No: <span style={{ color: TEXT_PRIMARY, fontWeight: 600 }}>125R089</span>
    </div>

    <div style={{ marginTop: 6 }}>
      Veri Kaynağı: T.C. Cumhurbaşkanlığı İletişim Başkanlığı — Dezenformasyon Bülteni 2025 Almanak 1. Cilt (Sayı 158-175)
      {" "} | Analiz: {data.length} iddia kodlanmıştır.
    </div>
  </div>
</div>
    </div>
  );
}

