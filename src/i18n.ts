import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav_marketplace": "Marketplace",
      "nav_education": "Education",
      "nav_wallet": "Wallet",
      "nav_forum": "Forum",
      "hero_title": "Thrive with Nature",
      "hero_subtitle": "\"We support self sustainable ecosystems align with nature to thrive not only just survive.\"",
      "btn_browse": "Browse Marketplace",
      "btn_learn": "Learn Vedic Practices",
      "joined_kc": "Kindness Credit (KC) Driven Economy",
      "footer_tagline": "Empowering farmers through ancient wisdom and subtle technology.",
      "theme_color": "Theme Color",
      "select_language": "Select Language"
    }
  },
  bn: { // Bengali
    translation: {
      "nav_marketplace": "বাজার",
      "nav_education": "শিক্ষা",
      "nav_wallet": "ওয়ালেট",
      "nav_forum": "ফোরাম",
      "hero_title": "প্রকৃতির সাথে সমৃদ্ধ হোন",
      "hero_subtitle": "\"আমরা প্রকৃতির সাথে সামঞ্জস্যপূর্ণ স্বনির্ভর বাস্তুতন্ত্রকে সমর্থন করি যাতে আমরা শুধু বেঁচে থাকা নয়, আরও সমৃদ্ধ হতে পারি।\"",
      "btn_browse": "মার্কেটপ্লেস দেখুন",
      "btn_learn": "বৈদিক পদ্ধতি শিখুন",
      "joined_kc": "কাইন্ডনেস ক্রেডিট (KC) ভিত্তিক অর্থনীতি"
    }
  },
  hi: { // Hindi
    translation: {
      "nav_marketplace": "बाज़ार",
      "nav_education": "शिक्षा",
      "nav_wallet": "वॉलेट",
      "nav_forum": "फोरम",
      "hero_title": "प्रकृति के साथ फलें-फूलें",
      "hero_subtitle": "\"हम प्रकृति के साथ संरेखित आत्म-टिकाऊ पारिस्थितिकी तंत्र का समर्थन करते हैं ताकि हम केवल जीवित न रहें बल्कि फलें-फूलें।\"",
      "btn_browse": "बाज़ार देखें",
      "btn_learn": "वैदिक पद्धतियां सीखें",
      "joined_kc": "काइंडनेस क्रेडिट (KC) आधारित अर्थव्यवस्था"
    }
  },
  es: { // Spanish
    translation: {
      "nav_marketplace": "Mercado",
      "nav_education": "Educación",
      "nav_wallet": "Billetera",
      "nav_forum": "Foro",
      "hero_title": "Prosperar con la Naturaleza",
      "hero_subtitle": "\"Apoyamos ecosistemas autosostenibles alineados con la naturaleza para prosperar, no solo sobrevivir.\"",
      "btn_browse": "Explorar Mercado",
      "btn_learn": "Aprender Prácticas Védicas"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
