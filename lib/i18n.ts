// lib/i18n.ts
// FlowMinds Multi-Language Localization Engine (AZ, EN, TR)
// Ported from the Flynatoure i18n pattern. English is the default locale.

export type Locale = "az" | "en" | "tr";

export interface TranslationDictionary {
  // Navbar
  navServices: string;
  navProjects: string;
  navTech: string;
  navContact: string;
  navGetStarted: string;

  // Hero
  heroBadge: string;
  heroTitleLead: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroCtaStart: string;
  heroCtaWork: string;
  statProjects: string;
  statSatisfaction: string;
  statAutomation: string;

  // Services
  servicesBadge: string;
  servicesTitlePrefix: string;
  servicesTitleHighlight: string;
  servicesSubtitle: string;
  svcWebTitle: string;        svcWebDesc: string;
  svcAgentTitle: string;      svcAgentDesc: string;
  svcSaasTitle: string;       svcSaasDesc: string;
  svcSocialTitle: string;     svcSocialDesc: string;
  svcMetaTitle: string;       svcMetaDesc: string;
  svcApiTitle: string;        svcApiDesc: string;
  svcCodeTitle: string;       svcCodeDesc: string;
  svcNoCodeTitle: string;     svcNoCodeDesc: string;
  svcWhatsappTitle: string;   svcWhatsappDesc: string;
  svcStrategyTitle: string;   svcStrategyDesc: string;

  // Projects
  projectsBadge: string;
  projectsTitlePrefix: string;
  projectsTitleHighlight: string;
  projectsSubtitle: string;
  projVisit: string;
  projRequestDemo: string;
  p1Tag: string; p1Desc: string; p1r1: string; p1r2: string; p1r3: string;
  p2Tag: string; p2Desc: string; p2r1: string; p2r2: string; p2r3: string;
  p3Tag: string; p3Desc: string; p3r1: string; p3r2: string; p3r3: string;
  p4Tag: string; p4Desc: string; p4r1: string; p4r2: string; p4r3: string;
  p5Tag: string; p5Desc: string; p5r1: string; p5r2: string; p5r3: string;
  p6Tag: string; p6Desc: string; p6r1: string; p6r2: string; p6r3: string;

  // Tech
  techBadge: string;
  techTitlePrefix: string;
  techTitleHighlight: string;
  techSubtitle: string;

  // Contact
  contactBadge: string;
  contactTitlePrefix: string;
  contactTitleHighlight: string;
  contactSubtitle: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  formSend: string;
  formSuccess: string;
  formError: string;

  // Footer
  footerTagline: string;
  footerColServices: string;
  footerColCompany: string;
  footerSvc1: string;
  footerSvc2: string;
  footerSvc3: string;
  footerSvc4: string;
  footerCompany1: string;
  footerCompany2: string;
  footerCompany3: string;
  footerCompany4: string;
  footerRights: string;
  footerOperational: string;
}

export const DICTIONARIES: Record<Locale, TranslationDictionary> = {
  en: {
    navServices: "Services",
    navProjects: "Projects",
    navTech: "Tech",
    navContact: "Contact",
    navGetStarted: "Get Started",

    heroBadge: "AI-Powered Digital Agency",
    heroTitleLead: "We Build Systems That",
    heroTitleHighlight: "Work For You",
    heroSubtitle: "AI web development, social media automation, Meta integrations & smart workflows — everything your business needs to scale.",
    heroCtaStart: "Start Your Project",
    heroCtaWork: "See Our Work",
    statProjects: "Projects",
    statSatisfaction: "Satisfaction",
    statAutomation: "Automation",

    servicesBadge: "What We Do",
    servicesTitlePrefix: "Our",
    servicesTitleHighlight: "Services",
    servicesSubtitle: "From AI-powered web apps to full Meta automation.",
    svcWebTitle: "AI Web Development",        svcWebDesc: "Intelligent websites powered by AI.",
    svcAgentTitle: "AI Agent Development",    svcAgentDesc: "Custom agents for WhatsApp, Messenger, Instagram.",
    svcSaasTitle: "SaaS Development",         svcSaasDesc: "Subscription tiers, payments, user lifecycle.",
    svcSocialTitle: "Social Automation",      svcSocialDesc: "Scheduling, smart replies & analytics.",
    svcMetaTitle: "Meta Solutions",           svcMetaDesc: "Instagram, Facebook & WhatsApp integrations.",
    svcApiTitle: "Long-Term API Keys",        svcApiDesc: "Permanent tokens for IG, FB & WA.",
    svcCodeTitle: "Code Automation",          svcCodeDesc: "Custom scripts & backend workflows.",
    svcNoCodeTitle: "No-Code Flows",          svcNoCodeDesc: "Zapier, Make & n8n automations.",
    svcWhatsappTitle: "WhatsApp Business API", svcWhatsappDesc: "AI chatbots & broadcast at scale.",
    svcStrategyTitle: "Digital Strategy",     svcStrategyDesc: "Growth hacking & funnel optimization.",

    projectsBadge: "Portfolio",
    projectsTitlePrefix: "Featured",
    projectsTitleHighlight: "Projects",
    projectsSubtitle: "Production systems running at scale — real businesses, real outcomes.",
    projVisit: "Visit",
    projRequestDemo: "Request Demo",
    p1Tag: "AI Travel Ecosystem",
    p1Desc: "Azerbaijan's first end-to-end AI travel platform — from WhatsApp message to confirmed booking, zero human involvement. AI agent 'Nigar' runs across WhatsApp, Messenger, Instagram and web in Azerbaijani, sourcing 500+ airline routes via Duffel, hotel inventory via Booking.com, CBAR real-time FX conversion, and AZN checkout via ePoint.az. Four-tier loyalty engine included.",
    p1r1: "AI agent across 4 channels", p1r2: "500+ airlines · Booking.com", p1r3: "ePoint.az · Apple/Google Pay · Bronze→Platinum",
    p2Tag: "Infrastructure Automation",
    p2Desc: "The operational backbone of natoure.az: Duffel + RateHawk daily price sync into Supabase, pgvector + Voyage AI semantic search enabling natural-language queries, automated tour packaging, weekly Telegram price reports — backed by AES-256-GCM encryption, webhook signature verification and server-side payment validation.",
    p2r1: "pgvector semantic search (RAG)", p2r2: "Daily auto tour packaging", p2r3: "AES-256 · 3D Secure · Rate limiting",
    p3Tag: "AI SaaS Platform",
    p3Desc: "Azerbaijan's first AI music SaaS — built around mugham intelligence. Generates Şur, Segah and Rast-aware prompts, produces audio via Suno API in real time, and writes Azerbaijani lyrics on demand. Three subscription tiers (Free / Pro / Studio) with automated billing and usage enforcement.",
    p3r1: "Mugham-aware AI prompt engine", p3r2: "Real-time audio via Suno API", p3r3: "Free / Pro / Studio tiers",
    p4Tag: "Content Automation",
    p4Desc: "The autonomous engine behind PromptAZ: Gemini AI writes and publishes daily SEO blog posts in Azerbaijani, new tracks auto-post to social platforms, the Qızıl Fond dataset expands continuously via scraping, Cloudflare Turnstile quotas self-manage, and weekly analytics land automatically. Zero human input.",
    p4r1: "Daily Gemini AI blog (SEO)", p4r2: "Qızıl Fond dataset pipeline", p4r3: "Auto social · Turnstile self-management",
    p5Tag: "LegalTech · Voice AI",
    p5Desc: "A voice-enabled legal assistant grounded in Azerbaijani legislation and international conventions. Answers complex legal queries in real time — no lawyer required for first-line research.",
    p5r1: "Voice-enabled legal responses", p5r2: "AZ legislation + intl. conventions", p5r3: "Multilingual, citation-aware",
    p6Tag: "Meta · WhatsApp · Social",
    p6Desc: "Enterprise-grade Meta automation: permanent token management for IG/FB/WA, Instagram DM flows, Facebook lead funnels, and WhatsApp Business chatbots handling 5,000+ messages daily — no manual renewal, no downtime.",
    p6r1: "Permanent IG/FB/WA tokens", p6r2: "5,000+ automated msgs/day", p6r3: "DM flows · Lead funnels · Chatbots",

    techBadge: "Our Stack",
    techTitlePrefix: "Built With The",
    techTitleHighlight: "Best Tools",
    techSubtitle: "Battle-tested, cutting-edge technologies that scale.",

    contactBadge: "Let's Talk",
    contactTitlePrefix: "Start Your",
    contactTitleHighlight: "Project",
    contactSubtitle: "Tell us what you need. We'll get back within 24 hours.",
    formName: "Your Name",
    formEmail: "your@email.com",
    formMessage: "Tell us about your project...",
    formSend: "Send Message",
    formSuccess: "Message sent! We'll be in touch soon.",
    formError: "Something went wrong. Please try again.",

    footerTagline: "AI-powered digital systems that automate, scale, and grow your business — while you sleep.",
    footerColServices: "Services",
    footerColCompany: "Company",
    footerSvc1: "AI Web Development",
    footerSvc2: "Social Media Automation",
    footerSvc3: "Meta Solutions",
    footerSvc4: "Code Automation",
    footerCompany1: "About",
    footerCompany2: "Projects",
    footerCompany3: "Tech Stack",
    footerCompany4: "Contact",
    footerRights: "© {year} FlowMinds. All rights reserved.",
    footerOperational: "All systems operational",
  },

  az: {
    navServices: "Xidmətlər",
    navProjects: "Layihələr",
    navTech: "Texnologiya",
    navContact: "Əlaqə",
    navGetStarted: "Başla",

    heroBadge: "AI Əsaslı Rəqəmsal Agentlik",
    heroTitleLead: "Biz Sizin Üçün",
    heroTitleHighlight: "İşləyən Sistemlər Qururuq",
    heroSubtitle: "AI veb inkişaf, sosial media avtomatlaşdırma, Meta inteqrasiyaları və ağıllı iş axınları — biznesinizin böyüməsi üçün lazım olan hər şey.",
    heroCtaStart: "Layihənizə Başlayın",
    heroCtaWork: "İşlərimizə Baxın",
    statProjects: "Layihə",
    statSatisfaction: "Məmnuniyyət",
    statAutomation: "Avtomatlaşdırma",

    servicesBadge: "Nə Edirik",
    servicesTitlePrefix: "Bizim",
    servicesTitleHighlight: "Xidmətlər",
    servicesSubtitle: "AI əsaslı veb tətbiqlərdən tam Meta avtomatlaşdırmasına qədər.",
    svcWebTitle: "AI Veb İnkişaf",            svcWebDesc: "AI ilə gücləndirilmiş ağıllı saytlar.",
    svcAgentTitle: "AI Agent İnkişafı",       svcAgentDesc: "WhatsApp, Messenger, Instagram üçün fərdi agentlər.",
    svcSaasTitle: "SaaS İnkişafı",            svcSaasDesc: "Abunə paketləri, ödənişlər, istifadəçi dövrü.",
    svcSocialTitle: "Sosial Avtomatlaşdırma", svcSocialDesc: "Planlama, ağıllı cavablar və analitika.",
    svcMetaTitle: "Meta Həlləri",             svcMetaDesc: "Instagram, Facebook və WhatsApp inteqrasiyaları.",
    svcApiTitle: "Uzunmüddətli API Açarları", svcApiDesc: "IG, FB və WA üçün daimi tokenlər.",
    svcCodeTitle: "Kod Avtomatlaşdırması",    svcCodeDesc: "Fərdi skriptlər və backend iş axınları.",
    svcNoCodeTitle: "No-Code Axınlar",        svcNoCodeDesc: "Zapier, Make və n8n avtomatlaşdırmaları.",
    svcWhatsappTitle: "WhatsApp Business API", svcWhatsappDesc: "AI çatbotlar və geniş miqyaslı yayım.",
    svcStrategyTitle: "Rəqəmsal Strategiya",  svcStrategyDesc: "Artım hakkinqi və satış qıfı optimallaşdırması.",

    projectsBadge: "Portfolio",
    projectsTitlePrefix: "Seçilmiş",
    projectsTitleHighlight: "Layihələr",
    projectsSubtitle: "Geniş miqyasda işləyən prodakşn sistemlər — real bizneslər, real nəticələr.",
    projVisit: "Ziyarət et",
    projRequestDemo: "Demo İstə",
    p1Tag: "AI Səyahət Ekosistemi",
    p1Desc: "Azərbaycanın ilk uçtan-uca AI səyahət platforması — WhatsApp mesajından təsdiqlənmiş rezervasiyaya qədər, sıfır insan müdaxiləsi. 'Nigar' AI agenti WhatsApp, Messenger, Instagram və vebdə Azərbaycan dilində işləyir; Duffel vasitəsilə 500+ aviaxətt, Booking.com vasitəsilə otel inventarı, CBAR real-vaxt valyuta çevrilməsi və ePoint.az ilə AZN ödənişi təmin edir. Dörd səviyyəli loyallıq sistemi daxildir.",
    p1r1: "4 kanalda AI agent", p1r2: "500+ aviaxətt · Booking.com", p1r3: "ePoint.az · Apple/Google Pay · Bürünc→Platin",
    p2Tag: "İnfrastruktur Avtomatlaşdırması",
    p2Desc: "natoure.az-ın əməliyyat onurğası: Duffel + RateHawk gündəlik qiymət sinxronizasiyası Supabase-ə, pgvector + Voyage AI semantik axtarışı təbii dildə sorğulara imkan verir, avtomatlaşdırılmış tur paketləmə, həftəlik Telegram qiymət hesabatları — AES-256-GCM şifrələmə, webhook imza yoxlaması və server tərəfli ödəniş validasiyası ilə dəstəklənir.",
    p2r1: "pgvector semantik axtarış (RAG)", p2r2: "Gündəlik avtomatik tur paketləmə", p2r3: "AES-256 · 3D Secure · Sürət limiti",
    p3Tag: "AI SaaS Platforması",
    p3Desc: "Azərbaycanın ilk AI musiqi SaaS-ı — muğam intellekti üzərində qurulub. Şur, Segah və Rast-yönümlü promptlar yaradır, Suno API vasitəsilə real vaxtda audio istehsal edir və tələb əsasında Azərbaycan dilində sözlər yazır. Üç abunə səviyyəsi (Free / Pro / Studio) avtomatik ödəniş və istifadə nəzarəti ilə.",
    p3r1: "Muğam-yönümlü AI prompt motoru", p3r2: "Suno API ilə real vaxt audio", p3r3: "Free / Pro / Studio səviyyələri",
    p4Tag: "Kontent Avtomatlaşdırması",
    p4Desc: "PromptAZ-ın arxasındakı avtonom motor: Gemini AI gündəlik SEO blog yazıları yazıb Azərbaycan dilində dərc edir, yeni treklər sosial platformalara avtomatik paylaşılır, Qızıl Fond dataseti scraping vasitəsilə davamlı genişlənir, Cloudflare Turnstile kvotaları özünü idarə edir və həftəlik analitika avtomatik gəlir. Sıfır insan müdaxiləsi.",
    p4r1: "Gündəlik Gemini AI bloqu (SEO)", p4r2: "Qızıl Fond dataset pipeline-ı", p4r3: "Avto sosial · Turnstile özünüidarə",
    p5Tag: "Hüquq Texnologiyası · Səsli AI",
    p5Desc: "Azərbaycan qanunvericiliyi və beynəlxalq konvensiyalara əsaslanan səslə işləyən hüquqi köməkçi. Mürəkkəb hüquqi sorğulara real vaxtda cavab verir — ilkin araşdırma üçün vəkil tələb olunmur.",
    p5r1: "Səslə hüquqi cavablar", p5r2: "AZ qanunvericiliyi + beynəlxalq konvensiyalar", p5r3: "Çoxdilli, mənbə-yönümlü",
    p6Tag: "Meta · WhatsApp · Sosial",
    p6Desc: "Enterprise səviyyəli Meta avtomatlaşdırması: IG/FB/WA üçün daimi token idarəetməsi, Instagram DM axınları, Facebook lid qıfları və gündə 5,000+ mesaj idarə edən WhatsApp Business çatbotları — əl ilə yeniləmə yox, dayanma yox.",
    p6r1: "Daimi IG/FB/WA tokenləri", p6r2: "Gündə 5,000+ avtomatik mesaj", p6r3: "DM axınları · Lid qıfları · Çatbotlar",

    techBadge: "Texnologiyalarımız",
    techTitlePrefix: "Ən Yaxşı",
    techTitleHighlight: "Alətlər",
    techSubtitle: "Sınaqdan keçmiş, qabaqcıl texnologiyalar — miqyaslanan.",

    contactBadge: "Danışaq",
    contactTitlePrefix: "Layihənizə",
    contactTitleHighlight: "Başlayın",
    contactSubtitle: "Nəyə ehtiyacınız olduğunu bildirin. 24 saat ərzində sizinlə əlaqə saxlayacağıq.",
    formName: "Adınız",
    formEmail: "sizin@email.com",
    formMessage: "Layihəniz haqqında bizə danışın...",
    formSend: "Mesaj Göndər",
    formSuccess: "Mesaj göndərildi! Tezliklə əlaqə saxlayacağıq.",
    formError: "Nəsə səhv getdi. Zəhmət olmasa yenidən cəhd edin.",

    footerTagline: "Biznesinizi avtomatlaşdıran, miqyaslandıran və böyüdən AI əsaslı rəqəmsal sistemlər — siz yatarkən.",
    footerColServices: "Xidmətlər",
    footerColCompany: "Şirkət",
    footerSvc1: "AI Veb İnkişaf",
    footerSvc2: "Sosial Media Avtomatlaşdırma",
    footerSvc3: "Meta Həlləri",
    footerSvc4: "Kod Avtomatlaşdırması",
    footerCompany1: "Haqqımızda",
    footerCompany2: "Layihələr",
    footerCompany3: "Texnologiyalar",
    footerCompany4: "Əlaqə",
    footerRights: "© {year} FlowMinds. Bütün hüquqlar qorunur.",
    footerOperational: "Bütün sistemlər işləkdir",
  },

  tr: {
    navServices: "Hizmetler",
    navProjects: "Projeler",
    navTech: "Teknoloji",
    navContact: "İletişim",
    navGetStarted: "Başla",

    heroBadge: "AI Destekli Dijital Ajans",
    heroTitleLead: "Sizin İçin",
    heroTitleHighlight: "Çalışan Sistemler Kuruyoruz",
    heroSubtitle: "AI web geliştirme, sosyal medya otomasyonu, Meta entegrasyonları ve akıllı iş akışları — işletmenizin büyümesi için ihtiyacınız olan her şey.",
    heroCtaStart: "Projenize Başlayın",
    heroCtaWork: "Çalışmalarımızı Görün",
    statProjects: "Proje",
    statSatisfaction: "Memnuniyet",
    statAutomation: "Otomasyon",

    servicesBadge: "Ne Yapıyoruz",
    servicesTitlePrefix: "Bizim",
    servicesTitleHighlight: "Hizmetlerimiz",
    servicesSubtitle: "AI destekli web uygulamalarından tam Meta otomasyonuna kadar.",
    svcWebTitle: "AI Web Geliştirme",         svcWebDesc: "AI ile güçlendirilmiş akıllı web siteleri.",
    svcAgentTitle: "AI Ajan Geliştirme",      svcAgentDesc: "WhatsApp, Messenger, Instagram için özel ajanlar.",
    svcSaasTitle: "SaaS Geliştirme",          svcSaasDesc: "Abonelik paketleri, ödemeler, kullanıcı yaşam döngüsü.",
    svcSocialTitle: "Sosyal Otomasyon",       svcSocialDesc: "Zamanlama, akıllı yanıtlar ve analitik.",
    svcMetaTitle: "Meta Çözümleri",           svcMetaDesc: "Instagram, Facebook ve WhatsApp entegrasyonları.",
    svcApiTitle: "Uzun Vadeli API Anahtarları", svcApiDesc: "IG, FB ve WA için kalıcı tokenlar.",
    svcCodeTitle: "Kod Otomasyonu",           svcCodeDesc: "Özel betikler ve backend iş akışları.",
    svcNoCodeTitle: "No-Code Akışlar",        svcNoCodeDesc: "Zapier, Make ve n8n otomasyonları.",
    svcWhatsappTitle: "WhatsApp Business API", svcWhatsappDesc: "AI sohbet botları ve geniş ölçekli yayın.",
    svcStrategyTitle: "Dijital Strateji",     svcStrategyDesc: "Büyüme hacking ve dönüşüm hunisi optimizasyonu.",

    projectsBadge: "Portföy",
    projectsTitlePrefix: "Öne Çıkan",
    projectsTitleHighlight: "Projeler",
    projectsSubtitle: "Ölçekli çalışan üretim sistemleri — gerçek işletmeler, gerçek sonuçlar.",
    projVisit: "Ziyaret et",
    projRequestDemo: "Demo İste",
    p1Tag: "AI Seyahat Ekosistemi",
    p1Desc: "Azerbaycan'ın ilk uçtan uca AI seyahat platformu — WhatsApp mesajından onaylı rezervasyona kadar, sıfır insan müdahalesi. 'Nigar' AI ajanı WhatsApp, Messenger, Instagram ve web'de Azerbaycanca çalışır; Duffel ile 500+ havayolu rotası, Booking.com ile otel envanteri, CBAR gerçek zamanlı döviz çevirimi ve ePoint.az ile AZN ödemesi sağlar. Dört kademeli sadakat motoru dahildir.",
    p1r1: "4 kanalda AI ajan", p1r2: "500+ havayolu · Booking.com", p1r3: "ePoint.az · Apple/Google Pay · Bronz→Platin",
    p2Tag: "Altyapı Otomasyonu",
    p2Desc: "natoure.az'ın operasyonel omurgası: Duffel + RateHawk günlük fiyat senkronizasyonu Supabase'e, pgvector + Voyage AI semantik arama doğal dil sorgularına olanak tanır, otomatik tur paketleme, haftalık Telegram fiyat raporları — AES-256-GCM şifreleme, webhook imza doğrulaması ve sunucu taraflı ödeme doğrulaması ile desteklenir.",
    p2r1: "pgvector semantik arama (RAG)", p2r2: "Günlük otomatik tur paketleme", p2r3: "AES-256 · 3D Secure · Hız sınırlama",
    p3Tag: "AI SaaS Platformu",
    p3Desc: "Azerbaycan'ın ilk AI müzik SaaS'ı — mugam zekâsı üzerine kurulu. Şur, Segah ve Rast farkındalıklı promptlar üretir, Suno API ile gerçek zamanlı ses üretir ve talep üzerine Azerbaycanca şarkı sözleri yazar. Otomatik faturalandırma ve kullanım denetimi ile üç abonelik kademesi (Free / Pro / Studio).",
    p3r1: "Mugam farkındalıklı AI prompt motoru", p3r2: "Suno API ile gerçek zamanlı ses", p3r3: "Free / Pro / Studio kademeleri",
    p4Tag: "İçerik Otomasyonu",
    p4Desc: "PromptAZ'ın arkasındaki otonom motor: Gemini AI günlük SEO blog yazıları yazıp Azerbaycanca yayınlar, yeni parçalar sosyal platformlara otomatik paylaşılır, Qızıl Fond veri seti scraping ile sürekli genişler, Cloudflare Turnstile kotaları kendini yönetir ve haftalık analitik otomatik gelir. Sıfır insan girişi.",
    p4r1: "Günlük Gemini AI blog (SEO)", p4r2: "Qızıl Fond veri seti pipeline'ı", p4r3: "Oto sosyal · Turnstile öz yönetimi",
    p5Tag: "Hukuk Teknolojisi · Sesli AI",
    p5Desc: "Azerbaycan mevzuatı ve uluslararası sözleşmelere dayalı sesli hukuki asistan. Karmaşık hukuki sorulara gerçek zamanlı yanıt verir — ilk araştırma için avukat gerekmez.",
    p5r1: "Sesli hukuki yanıtlar", p5r2: "AZ mevzuatı + uluslararası sözleşmeler", p5r3: "Çok dilli, kaynak farkındalıklı",
    p6Tag: "Meta · WhatsApp · Sosyal",
    p6Desc: "Kurumsal düzeyde Meta otomasyonu: IG/FB/WA için kalıcı token yönetimi, Instagram DM akışları, Facebook lead hunileri ve günde 5.000+ mesaj işleyen WhatsApp Business sohbet botları — manuel yenileme yok, kesinti yok.",
    p6r1: "Kalıcı IG/FB/WA tokenları", p6r2: "Günde 5.000+ otomatik mesaj", p6r3: "DM akışları · Lead hunileri · Sohbet botları",

    techBadge: "Teknolojilerimiz",
    techTitlePrefix: "En İyi",
    techTitleHighlight: "Araçlar",
    techSubtitle: "Savaşta test edilmiş, son teknoloji araçlar — ölçeklenebilir.",

    contactBadge: "Konuşalım",
    contactTitlePrefix: "Projenize",
    contactTitleHighlight: "Başlayın",
    contactSubtitle: "Neye ihtiyacınız olduğunu söyleyin. 24 saat içinde size geri döneceğiz.",
    formName: "Adınız",
    formEmail: "siz@email.com",
    formMessage: "Projeniz hakkında bize anlatın...",
    formSend: "Mesaj Gönder",
    formSuccess: "Mesaj gönderildi! Yakında iletişime geçeceğiz.",
    formError: "Bir şeyler ters gitti. Lütfen tekrar deneyin.",

    footerTagline: "İşletmenizi otomatikleştiren, ölçeklendiren ve büyüten AI destekli dijital sistemler — siz uyurken.",
    footerColServices: "Hizmetler",
    footerColCompany: "Şirket",
    footerSvc1: "AI Web Geliştirme",
    footerSvc2: "Sosyal Medya Otomasyonu",
    footerSvc3: "Meta Çözümleri",
    footerSvc4: "Kod Otomasyonu",
    footerCompany1: "Hakkımızda",
    footerCompany2: "Projeler",
    footerCompany3: "Teknolojiler",
    footerCompany4: "İletişim",
    footerRights: "© {year} FlowMinds. Tüm hakları saklıdır.",
    footerOperational: "Tüm sistemler çalışıyor",
  },
};
