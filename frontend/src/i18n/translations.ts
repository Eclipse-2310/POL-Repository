import { Language } from '../types';

export interface TranslationDict {
  appName: string;
  tagline: string;
  heroSubtitle: string;
  startCheckin: string;
  viewDashboard: string;
  navOverview: string;
  navCheckin: string;
  navWellbeing: string;
  navSupport: string;
  navResources: string;
  navPrivacy: string;
  navAdmin: string;
  navCommunityGraph: string;
  
  // Check-in
  checkinTitle: string;
  voluntaryNotice: string;
  step1Question: string;
  step2Question: string;
  step3Question: string;
  step4Question: string;
  step5Question: string;
  journalPlaceholder: string;
  nextStep: string;
  prevStep: string;
  submitCheckin: string;
  wellbeingStatus: string;
  stable: string;
  needsAttention: string;
  supportRecommended: string;
  
  // Student metrics
  todaysWellbeing: string;
  mood: string;
  sleep: string;
  study: string;
  attendance: string;
  socialConnection: string;
  weeklyTrends: string;
  supportiveInsights: string;
  
  // Admin
  commandCenter: string;
  commandCenterSubtitle: string;
  totalActiveStudents: string;
  checkinsToday: string;
  studentsNeedingAttention: string;
  highPriorityAlerts: string;
  riskDistribution: string;
  earlyWarningAlerts: string;
  studentId: string;
  riskScore: string;
  topFactors: string;
  trend: string;
  lastCheckin: string;
  actions: string;
  reviewAlert: string;
  
  // Community Graph
  communityGraphTitle: string;
  communityGraphSubtitle: string;
  networkXNotice: string;
  
  // Offline & Demo
  offlineModeActive: string;
  offlineQueued: string;
  onlineSynced: string;
  demoModeBadge: string;
  demoModeNotice: string;
  resetDemoData: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    appName: "CampusGuard",
    tagline: "Don't wait for students to struggle in silence.",
    heroSubtitle: "An opt-in, privacy-first AI wellbeing early-warning system helping institutions detect academic overload and isolation before they escalate.",
    startCheckin: "Start Daily Check-in",
    viewDashboard: "View Wellness Dashboard",
    navOverview: "Overview",
    navCheckin: "Daily Check-in",
    navWellbeing: "My Wellbeing",
    navSupport: "Support Chat",
    navResources: "Resources",
    navPrivacy: "Privacy Center",
    navAdmin: "Admin Command",
    navCommunityGraph: "Community Graph",

    checkinTitle: "Daily Voluntary Wellbeing Check-in",
    voluntaryNotice: "Your answers are voluntary and used only to provide supportive early interventions.",
    step1Question: "How are you feeling today?",
    step2Question: "How many hours of sleep did you get last night?",
    step3Question: "How intense was your study or academic workload?",
    step4Question: "How connected have you felt to people around you?",
    step5Question: "Estimated class attendance and voluntary thoughts",
    journalPlaceholder: "Optional: Write a quick note about what is currently on your mind...",
    nextStep: "Continue",
    prevStep: "Back",
    submitCheckin: "Submit Check-in",
    wellbeingStatus: "Wellbeing Status",
    stable: "Stable",
    needsAttention: "Needs Attention",
    supportRecommended: "Support Recommended",

    todaysWellbeing: "Today's Wellbeing Snapshot",
    mood: "Mood",
    sleep: "Sleep",
    study: "Study Workload",
    attendance: "Attendance",
    socialConnection: "Social Connection",
    weeklyTrends: "7-Day Wellbeing Trajectory",
    supportiveInsights: "Supportive Automated Insights",

    commandCenter: "Campus Wellness Command Center",
    commandCenterSubtitle: "Early signals. Earlier support. Aggregated student wellbeing overview.",
    totalActiveStudents: "Total Active Students",
    checkinsToday: "Check-ins Today",
    studentsNeedingAttention: "Students Needing Attention",
    highPriorityAlerts: "High-Priority Alerts",
    riskDistribution: "Risk Distribution",
    earlyWarningAlerts: "Early Warning Alerts",
    studentId: "Student ID",
    riskScore: "Risk Score",
    topFactors: "Top Contributing Factors",
    trend: "Trend",
    lastCheckin: "Last Check-in",
    actions: "Actions",
    reviewAlert: "Review Alert",

    communityGraphTitle: "Community Connection Graph",
    communityGraphSubtitle: "NetworkX-powered voluntary peer interaction analysis for early isolation detection.",
    networkXNotice: "Graph insights use voluntary/anonymized interaction signals and are intended strictly as an early-support indicator.",

    offlineModeActive: "Offline Mode (Simulated)",
    offlineQueued: "Saved offline. Will automatically sync when connection returns.",
    onlineSynced: "Connected & synced with CampusGuard server",
    demoModeBadge: "Demo Mode Active",
    demoModeNotice: "All displayed student data is synthetic demo data.",
    resetDemoData: "Reset Synthetic Data"
  },
  hi: {
    appName: "कैंपसगार्ड (CampusGuard)",
    tagline: "छात्रों के संघर्ष में मौन रहने की प्रतीक्षा न करें।",
    heroSubtitle: "एक गोपनीयता-केंद्रित, स्वैच्छिक AI-संचालित कल्याण प्रणाली जो संस्थानों को अत्यधिक तनाव और अकेलेपन के शुरुआती संकेत पहचानने में मदद करती है।",
    startCheckin: "दैनिक चेक-इन शुरू करें",
    viewDashboard: "वेलनेस डैशबोर्ड देखें",
    navOverview: "अवलोकन",
    navCheckin: "दैनिक चेक-इन",
    navWellbeing: "मेरा स्वास्थ्य",
    navSupport: "सपोर्ट चैट",
    navResources: "संसाधन",
    navPrivacy: "गोपनीयता केंद्र",
    navAdmin: "एडमिन कमांड",
    navCommunityGraph: "समुदाय ग्राफ",

    checkinTitle: "दैनिक स्वैच्छिक कल्याण चेक-इन",
    voluntaryNotice: "आपके उत्तर स्वैच्छिक हैं और केवल समय पर सहायता प्रदान करने के लिए उपयोग किए जाते हैं।",
    step1Question: "आज आप कैसा महसूस कर रहे हैं?",
    step2Question: "बीती रात आपने कितने घंटे की नींद ली?",
    step3Question: "आपकी पढ़ाई या काम का दबाव कैसा रहा?",
    step4Question: "क्या आप अपने आसपास के लोगों से जुड़ाव महसूस कर रहे हैं?",
    step5Question: "अनुमानित कक्षा उपस्थिति और स्वैच्छिक विचार",
    journalPlaceholder: "वैकल्पिक: अपने मन की कोई भी बात यहाँ साझा करें...",
    nextStep: "आगे बढ़ें",
    prevStep: "पीछे",
    submitCheckin: "चेक-इन जमा करें",
    wellbeingStatus: "कल्याण स्थिति",
    stable: "संतुलित (Stable)",
    needsAttention: "ध्यान देने योग्य (Needs Attention)",
    supportRecommended: "सहायता अनुशंसित (Support Recommended)",

    todaysWellbeing: "आज का कल्याण सारांश",
    mood: "मनोदशा (Mood)",
    sleep: "नींद (Sleep)",
    study: "अध्ययन का भार",
    attendance: "उपस्थिति (Attendance)",
    socialConnection: "सामाजिक जुड़ाव",
    weeklyTrends: "7-दिवसीय कल्याण प्रक्षेपवक्र",
    supportiveInsights: "सहायक स्वचालित अंतर्दृष्टि",

    commandCenter: "कैंपस वेलनेस कमांड सेंटर",
    commandCenterSubtitle: "प्रारंभिक संकेत। त्वरित सहायता। समग्र छात्र कल्याण अवलोकन।",
    totalActiveStudents: "कुल सक्रिय छात्र",
    checkinsToday: "आज के चेक-इन",
    studentsNeedingAttention: "ध्यान देने योग्य छात्र",
    highPriorityAlerts: "उच्च-प्राथमिकता अलर्ट",
    riskDistribution: "जोखिम वितरण",
    earlyWarningAlerts: "प्रारंभिक चेतावनी अलर्ट",
    studentId: "छात्र आईडी",
    riskScore: "जोखिम स्कोर",
    topFactors: "प्रमुख कारक",
    trend: "प्रवृत्ति",
    lastCheckin: "अंतिम चेक-इन",
    actions: "कार्रवाई",
    reviewAlert: "समीक्षा करें",

    communityGraphTitle: "समुदाय जुड़ाव ग्राफ",
    communityGraphSubtitle: "NetworkX द्वारा संचालित स्वैच्छिक सहकर्मी संपर्क विश्लेषण।",
    networkXNotice: "ग्राफ अंतर्दृष्टि केवल शुरुआती सहायता के लिए है। किसी भी प्रकार की निगरानी नहीं की जाती है।",

    offlineModeActive: "ऑफ़लाइन मोड (सिम्युलेटेड)",
    offlineQueued: "ऑफ़लाइन सहेजा गया। नेटवर्क आते ही स्वचालित सिंक होगा।",
    onlineSynced: "कैंपसगार्ड सर्वर से जुड़ा हुआ",
    demoModeBadge: "डेमो मोड सक्रिय",
    demoModeNotice: "प्रदर्शित सभी छात्र डेटा पूरी तरह से कृत्रिम (Synthetic) है।",
    resetDemoData: "सिंथेटिक डेटा रीसेट करें"
  },
  mr: {
    appName: "कॅम्पसगार्ड (CampusGuard)",
    tagline: "विद्यार्थ्यांच्या संघर्षात मौन राहण्याची वाट पाहू नका.",
    heroSubtitle: "एक गोपनीयता-प्रथम, ऐच्छिक AI प्रणाली जी शैक्षणिक ताण आणि एकटेपणा संकट होण्यापूर्वी ओळखण्यास मदत करते.",
    startCheckin: "दैनिक चेक-इन सुरू करा",
    viewDashboard: "वेलनेस डॅशबोर्ड पहा",
    navOverview: "विहंगावलोकन",
    navCheckin: "दैनिक चेक-इन",
    navWellbeing: "माझे आरोग्य",
    navSupport: "सपोर्ट चॅट",
    navResources: "मार्गदर्शन संसाधने",
    navPrivacy: "गोपनीयता केंद्र",
    navAdmin: "प्रशासक केंद्र",
    navCommunityGraph: "समुदाय आलेख",

    checkinTitle: "दैनिक ऐच्छिक आरोग्य चेक-इन",
    voluntaryNotice: "तुमची उत्तरे ऐच्छिक असून केवळ वेळेवर आधार देण्यासाठी वापरली जातात.",
    step1Question: "आज तुम्हाला कसे वाटत आहे?",
    step2Question: "काल रात्री तुम्हाला किती तास झोप मिळाली?",
    step3Question: "अभ्यासाचा किंवा कामाचा ताण कसा होता?",
    step4Question: "तुम्हाला तुमच्या सभोवतालच्या लोकांशी किती जोडलेले वाटते?",
    step5Question: "अंदाजे उपस्थिती आणि मनोगत",
    journalPlaceholder: "पर्यायी: मनात असलेले विचार येथे व्यक्त करा...",
    nextStep: "पुढे जा",
    prevStep: "मागे",
    submitCheckin: "चेक-इन पाठवा",
    wellbeingStatus: "आरोग्य स्थिती",
    stable: "स्थिर (Stable)",
    needsAttention: "लक्ष देण्याची गरज",
    supportRecommended: "मदतीची शिफारस",

    todaysWellbeing: "आजचा आरोग्य सारांश",
    mood: "मनःस्थिती (Mood)",
    sleep: "झोप (Sleep)",
    study: "अभ्यास वेळ",
    attendance: "उपस्थिती (Attendance)",
    socialConnection: "सामाजिक संवाद",
    weeklyTrends: "७-दिवसीय आरोग्य कल",
    supportiveInsights: "मार्गदर्शक स्वयंचलित अंतर्दृष्टी",

    commandCenter: "कॅम्पस वेलनेस कमांड सेंटर",
    commandCenterSubtitle: "लवकर संकेत. त्वरित आधार. संस्थात्मक आरोग्य विहंगावलोकन.",
    totalActiveStudents: "एकूण सक्रिय विद्यार्थी",
    checkinsToday: "आजचे चेक-इन्स",
    studentsNeedingAttention: "लक्ष देण्याची गरज असलेले विद्यार्थी",
    highPriorityAlerts: "महत्त्वाचे अलर्ट्स",
    riskDistribution: "धोका वितरण",
    earlyWarningAlerts: "पूर्वसूचना अलर्ट्स",
    studentId: "विद्यार्थी आयडी",
    riskScore: "धोका गुण",
    topFactors: "प्रमुख घटक",
    trend: "कल",
    lastCheckin: "शेवटचे चेक-इन",
    actions: "कृती",
    reviewAlert: "तपासा",

    communityGraphTitle: "समुदाय संवाद आलेख",
    communityGraphSubtitle: "NetworkX द्वारे विश्लेषित ऐच्छिक मित्र संवाद आलेख.",
    networkXNotice: "आलेख अंतर्दृष्टी केवळ मदतीसाठी आहे; कोणतीही पाळत ठेवली जात नाही.",

    offlineModeActive: "ऑफलाइन मोड (सिम्युलेटेड)",
    offlineQueued: "ऑफलाइन सेव्ह झाले. नेटवर्क आल्यावर आपोआप सिंक होईल.",
    onlineSynced: "सर्व्हरशी कनेक्टेड व सिंक केलेले",
    demoModeBadge: "डेमो मोड सक्रिय",
    demoModeNotice: "सर्व दाखवलेला विद्यार्थी डेटा केवळ प्रात्यक्षिकासाठी कृत्रिम आहे.",
    resetDemoData: "डेटा पूर्ववत करा"
  }
};
