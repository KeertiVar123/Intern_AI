import axios from 'axios';
// --- REPLACEMENT IMAGES (So the app runs) ---
const image_d211268d491d4fd0de24f74a81dbb41e5f73c007 = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80";
const heroImage = "https://i.pinimg.com/736x/09/6e/35/096e359e1e0bee3457c3517b09c4d165.jpg";
const studentBgImage = "https://i.pinimg.com/736x/96/3f/26/963f261fb3cf29c56a57ad8122fdf408.jpg";
const orgBgImage = "https://i.pinimg.com/1200x/36/20/de/3620de5dec3eda8d22fb20b7e0c95953.jpg";
const govInternshipImage = "https://i.pinimg.com/736x/c6/11/42/c61142d43932fbb1894587ececf0e806.jpg";
const mncInternshipImage = "https://i.pinimg.com/1200x/20/f0/3c/20f03cf64d201ca22c70c4a33364874c.jpg";
const techBgImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80";
const circuitBoardBg = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80";
const newLogo = "https://i.pinimg.com/736x/0b/ee/52/0bee520d4fb8b2aaab112febc45bc316.jpg"; // A generic education logo
const bgImage = "https://i.pinimg.com/1200x/27/49/0c/27490c11dcf909b6e37d05e309a73b51.jpg";
import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { 
  GraduationCap, Building2, Globe, Target, TrendingUp, 
  Briefcase, Languages, Upload, FileCheck, Search, CircleCheck, 
  UserCheck, ChartBar, Award, Rocket, Sparkles, ArrowRight,
  FileText, WandSparkles, Mail, Lock, User, Phone, MapPin, Calendar,
  BookOpen, Building, Home, LogIn, UserPlus, Eye, EyeOff,
  Code, Cpu, Database, LineChart, Palette, ShieldCheck, Microscope, Factory,
  Clock, MapPinned, IndianRupee, CheckCircle2, X, Filter, ExternalLink,
  Zap, TrendingUp as TrendingUpIcon, AlertCircle, Users, BarChart3, 
  Activity, Globe2, MapIcon, Route, BookMarked, CheckSquare, Layers, Volume2,
  Facebook, Twitter, Instagram, Youtube, Linkedin, Mic, Cloud, UserCircle, Shield, Cog
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Language = 'en' | 'hi' | 'zh' | 'fr' | 'es';
type Page = 'home' | 'student-login' | 'student-signup' | 'org-login' | 'org-signup' | 'gov-internships' | 'mnc-internships' | 'matched-internships' | 'career-roadmap';
type InternshipMode = 'Remote' | 'In-Office' | 'Hybrid';
type InternshipCategory = 'All' | 'Technology' | 'Research' | 'Engineering' | 'Design' | 'Business' | 'Data Science';

interface Internship {
  id: number;
  title: string;
  company: string;
  mode: InternshipMode;
  deadline: string;
  duration: string;
  location: string;
  stipend: string;
  category: string;
  description: string;
  applyUrl: string;
  isNew: boolean;
  postedDate: string;
  icon: any;
  domains: string[];
}

const translations = {
  en: {
    appName: 'InternAI',
    home: 'Home',
    login: 'Login',
    signup: 'Sign Up',
    studentLogin: 'Student Login',
    studentSignup: 'Student Sign Up',
    orgLogin: 'Organization Login',
    orgSignup: 'Organization Sign Up',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    phone: 'Phone Number',
    city: 'City',
    college: 'College/University',
    degree: 'Degree',
    yearOfStudy: 'Year of Study',
    orgName: 'Organization Name',
    industry: 'Industry',
    companySize: 'Company Size',
    website: 'Website',
    designation: 'Your Designation',
    forgotPassword: 'Forgot Password?',
    loginButton: 'Login',
    signupButton: 'Create Account',
    alreadyAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    loginHere: 'Login here',
    signupHere: 'Sign up here',
    orLoginAs: 'Or login as',
    orSignupAs: 'Or signup as',
    student: 'Student',
    organization: 'Organization',
    backToHome: 'Back to Home',
    uploadResume: 'Upload Resume (PDF/DOCX)',
    resumeUploaded: 'Resume uploaded successfully!',
    dragDrop: 'Drag and drop your resume here or click to browse',
    selectDomains: 'Select Internship Domains',
    selectDomainsDesc: 'Choose areas you\'re interested in (select multiple)',
    tagline: 'Smart Resume Screening. AI-Matched Internships. Personalized Career Roadmaps.',
    subtitle: 'Upload your resume and let our AI analyze your skills, match you with the best internship opportunities from MNCs and Government schemes, and create a personalized learning path to bridge any skill gaps.',
    joinStudent: 'JOIN AS STUDENT',
    joinOrg: 'JOIN AS ORGANIZATION',
    exploreTitle: 'Explore Internship Opportunities',
    govInternships: 'Government Internships',
    govDesc: 'PM Schemes, PSUs, Ministries, Research Programs',
    mncInternships: 'MNC & Corporate Internships',
    mncDesc: 'Top MNCs, Startups, Global Companies',
    exploreBtn: 'View All Opportunities',
    howItWorksStudent: 'How It Works - For Students',
    howItWorksOrg: 'How It Works - For Organizations',
    studentStep1: 'Upload Your Resume',
    studentStep1Desc: 'Simply upload your resume in PDF or DOCX format',
    studentStep2: 'AI Analysis',
    studentStep2Desc: 'Our AI screens and analyzes your skills, experience, and potential',
    studentStep3: 'Get Matched',
    studentStep3Desc: 'Receive personalized internship recommendations based on your profile',
    studentStep4: 'Learn & Grow',
    studentStep4Desc: 'Access custom learning roadmaps to fill any skill gaps',
    orgStep1: 'Post Internships',
    orgStep1Desc: 'Create detailed internship listings with requirements',
    orgStep2: 'AI Screening',
    orgStep2Desc: 'Our AI automatically screens and ranks candidates',
    orgStep3: 'Review Matches',
    orgStep3Desc: 'Access top-matched candidates with detailed analytics',
    orgStep4: 'Hire Talent',
    orgStep4Desc: 'Connect with the best-fit candidates for your organization',
    footer: 'Powered by AI • Designed for Careers • Built for India',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy',
    duration: 'Duration',
    location: 'Location',
    stipend: 'Stipend',
    mode: 'Mode',
    deadline: 'Deadline',
    apply: 'Apply on Official Website',
    viewDetails: 'View Details',
    searchPlaceholder: 'Search internships...',
    filterBy: 'Filter by Category',
    allCategories: 'All Categories',
    sortBy: 'Sort by',
    endingSoon: 'Ending Soon',
    newLabel: 'New',
    updated: 'Updated',
    remote: 'Remote',
    inOffice: 'In-Office',
    hybrid: 'Hybrid',
    showing: 'Showing',
    opportunities: 'opportunities',
    deadlinePriority: 'Sorted by nearest deadline',
    analyticsTitle: 'Real-Time Platform Analytics',
    totalInternships: 'Total Internships',
    activeStudents: 'Active Students',
    partneredCompanies: 'Partnered Companies',
    successRate: 'Success Rate',
    sectorAllocation: 'Sector-Wise Allocation',
    countryParticipation: 'Country-Wise Participation',
    stateParticipation: 'Indian State-Wise Participation',
    liveUpdate: 'Live Updates',
    resumeMatchTitle: 'Resume Match Analysis',
    matchedInternships: 'Matched Internships Found',
    noMatches: 'No Matching Internships',
    noMatchesDesc: 'Based on your resume analysis, we couldn\'t find any exact matches at the moment.',
    viewCareerRoadmap: 'Get Personalized Career Roadmap',
    careerRoadmapTitle: 'Your Personalized Career Roadmap',
    careerRoadmapDesc: 'A step-by-step guide tailored to your profile and career goals',
    skillsToLearn: 'Skills to Learn',
    suggestedProjects: 'Suggested Projects',
    recommendedDomains: 'Recommended Internship Domains',
    learningPath: 'Learning Path',
    viewMatches: 'View Matched Internships',
    matchScore: 'Match Score',
  },
  hi: {
    appName: 'इंटर्नAI',
    home: 'होम',
    login: 'लॉगिन',
    signup: 'साइन अप',
    studentLogin: 'छात्र लॉगिन',
    studentSignup: 'छात्र साइन अप',
    orgLogin: 'संगठन लॉगिन',
    orgSignup: 'संगठन साइन अप',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    fullName: 'पूरा नाम',
    phone: 'फोन नंबर',
    city: 'शहर',
    college: 'कॉलेज/विश्वविद्यालय',
    degree: 'डिग्री',
    yearOfStudy: 'अध्ययन का वर्ष',
    orgName: 'संगठन का नाम',
    industry: 'उद्योग',
    companySize: 'कंपनी का आकार',
    website: 'वेबसाइट',
    designation: 'आपका पदनाम',
    forgotPassword: 'पासवर्ड भूल गए?',
    loginButton: 'लॉगिन',
    signupButton: 'खाता बनाएं',
    alreadyAccount: 'पहले से खाता है?',
    noAccount: 'खाता नहीं है?',
    loginHere: 'यहाँ लॉगिन करें',
    signupHere: 'यहाँ साइन अप करें',
    orLoginAs: 'या लॉगिन करें',
    orSignupAs: 'या साइन अप करें',
    student: 'छात्र',
    organization: 'संगठन',
    backToHome: 'होम पर वापस जाएं',
    uploadResume: 'रिज्यूमे अपलोड करें (PDF/DOCX)',
    resumeUploaded: 'रिज्यूमे सफलतापूर्वक अपलोड!',
    dragDrop: 'अपना रिज्यूमे यहां खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें',
    selectDomains: 'इंटर्नशिप डोमेन चुनें',
    selectDomainsDesc: 'वे क्षेत्र चुनें जिनमें आप रुचि रखते हैं (एकाधिक चुनें)',
    tagline: 'स्मार्ट रिज्यूमे स्क्रीनिंग। AI-मैच्ड इंटर्नशिप। व्यक्तिगत करियर रोडमैप।',
    subtitle: 'अपना रिज्यूमे अपलोड करें और हमारे AI को आपके कौशल का विश्लेषण करने दें, MNC और सरकारी योजनाओं से सर्वोत्तम इंटर्नशिप अवसरों के साथ मिलान करें।',
    joinStudent: 'छात्र के रूप में जुड़ें',
    joinOrg: 'संगठन के रूप में जुड़ें',
    exploreTitle: 'इंटर्नशिप अवसर खोजें',
    govInternships: 'सरकारी इंटर्नशिप',
    govDesc: 'PM योजनाएं, PSU, मंत्रालय, अनुसंधान कार्यक्रम',
    mncInternships: 'MNC और कॉर्पोरेट इंटर्नशिप',
    mncDesc: 'शीर्ष MNC, स्टार्टअप, वैश्विक कंपनियां',
    exploreBtn: 'सभी अवसर देखें',
    howItWorksStudent: 'यह कैसे काम करता है - छात्रों के लिए',
    howItWorksOrg: 'यह कैसे काम करता है - संगठनों के लिए',
    studentStep1: 'अपना रिज्यूमे अपलोड करें',
    studentStep1Desc: 'बस अपना रिज्यूमे PDF या DOCX प्रारूप में अपलोड करें',
    studentStep2: 'AI विश्लेषण',
    studentStep2Desc: 'हमारा AI आपके कौशल, अनुभव और क्षमता की स्क्रीनिंग और विश्लेषण करता है',
    studentStep3: 'मिलान प्राप्त करें',
    studentStep3Desc: 'अपनी प्रोफ़ाइल के आधार पर व्यक्तिगत इंटर्नशिप सिफारिशें प्राप्त करें',
    studentStep4: 'सीखें और बढ़ें',
    studentStep4Desc: 'किसी भी कौशल अंतर को भरने के लिए कस्टम लर्निंग रोडमैप तक पहुँचें',
    orgStep1: 'इंटर्नशिप पोस्ट करें',
    orgStep1Desc: 'आवश्यकताओं के साथ विस्तृत इंटर्नशिप लिस्टिंग बनाएं',
    orgStep2: 'AI स्क्रीनिंग',
    orgStep2Desc: 'हमारा AI स्वचालित रूप से उम्मीदवारों की जांच और रैंकिंग करता है',
    orgStep3: 'मिलान की समीक्षा करें',
    orgStep3Desc: 'विस्तृत विश्लेषण के साथ शीर्ष-मैच उम्मीदवारों तक पहुँचें',
    orgStep4: 'प्रतिभा को नियुक्त करें',
    orgStep4Desc: 'अपने संगठन के लिए सर्वोत्तम-फिट उम्मीदवारों से जुड़ें',
    footer: 'AI द्वारा संचालित • करियर के लिए डिज़ाइन • भारत के लिए निर्मित',
    about: 'के बारे में',
    contact: 'संपर्क',
    privacy: 'गोपनीयता',
    duration: 'अवधि',
    location: 'स्थान',
    stipend: 'वजीफा',
    mode: 'मोड',
    deadline: 'समय सीमा',
    apply: 'आधिकारिक वेबसाइट पर आवेदन करें',
    viewDetails: 'विवरण देखें',
    searchPlaceholder: 'इंटर्नशिप खोजें...',
    filterBy: 'श्रेणी के अनुसार फ़िल्टर करें',
    allCategories: 'सभी श्रेणियां',
    sortBy: 'इसके अनुसार क्रमबद्ध करें',
    endingSoon: 'जल्द समाप्त हो रहा है',
    newLabel: 'नया',
    updated: 'अपडेट किया गया',
    remote: 'रिमोट',
    inOffice: 'ऑफिस में',
    hybrid: 'हाइब्रिड',
    showing: 'दिखा रहे हैं',
    opportunities: 'अवसर',
    deadlinePriority: 'निकटतम समय सीमा के अनुसार क्रमबद्ध',
    analyticsTitle: 'वास्तविक समय प्लेटफार्म विश्लेषिकी',
    totalInternships: 'कुल इंटर्नशिप',
    activeStudents: 'सक्रिय छात्र',
    partneredCompanies: 'भागीदार कंपनियां',
    successRate: 'सफलता दर',
    sectorAllocation: 'क्षेत्र आवंटन',
    countryParticipation: 'देश भागीदारी',
    stateParticipation: 'राज्य भागीदारी',
    liveUpdate: 'लाइव अपडेट',
    resumeMatchTitle: 'रिज्यूमे मैच विश्लेषण',
    matchedInternships: 'मिलान इंटर्नशिप मिली',
    noMatches: 'कोई मिलान नहीं',
    noMatchesDesc: 'आपके रिज्यूमे विश्लेषण के आधार पर, हमें फिलहाल कोई सटीक मिलान नहीं मिला।',
    viewCareerRoadmap: 'व्यक्तिगत करियर रोडमैप प्राप्त करें',
    careerRoadmapTitle: 'आपका व्यक्तिगत करियर रोडमैप',
    careerRoadmapDesc: 'अपने करियर लक्ष्यों को प्राप्त करने के लिए अनुकूलित सीखने का पथ',
    skillsToLearn: 'सीखने के लिए कौशल',
    recommendedCourses: 'अनुशंसित पाठ्यक्रम',
    certifications: 'प्रमाणपत्र',
    projectIdeas: 'परियोजना विचार',
    matchScore: 'मैच स्कोर',
  },
  zh: {
    appName: 'InternAI',
    home: '主页',
    login: '登录',
    signup: '注册',
    studentLogin: '学生登录',
    studentSignup: '学生注册',
    orgLogin: '组织登录',
    orgSignup: '组织注册',
    email: '电子邮件地址',
    password: '密码',
    confirmPassword: '确认密码',
    fullName: '全名',
    phone: '电话号码',
    city: '城市',
    college: '学院/大学',
    degree: '学位',
    yearOfStudy: '学年',
    tagline: '智能简历筛选。AI匹配实习。个性化职业路线图。',
    subtitle: '上传您的简历，让我们的AI分析您的技能，将您与最佳实习机会匹配。',
    joinStudent: '以学生身份加入',
    joinOrg: '以组织身份加入',
    resumeMatchTitle: '简历匹配分析',
    matchedInternships: '找到匹配的实习',
    noMatches: '没有匹配',
    viewCareerRoadmap: '获取个性化职业路线图',
    careerRoadmapTitle: '您的个性化职业路线图',
    selectDomains: '选择实习领域',
    backToHome: '返回主页',
  },
  fr: {
    appName: 'InternAI',
    home: 'Accueil',
    login: 'Connexion',
    signup: 'S\'inscrire',
    studentLogin: 'Connexion Étudiant',
    studentSignup: 'Inscription Étudiant',
    orgLogin: 'Connexion Organisation',
    orgSignup: 'Inscription Organisation',
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    fullName: 'Nom complet',
    phone: 'Numéro de téléphone',
    city: 'Ville',
    college: 'Collège/Université',
    degree: 'Diplôme',
    yearOfStudy: 'Année d\'études',
    tagline: 'Filtrage intelligent de CV. Stages correspondants par IA. Feuilles de route de carrière personnalisées.',
    subtitle: 'Téléchargez votre CV et laissez notre IA analyser vos compétences et vous faire correspondre aux meilleures opportunités.',
    joinStudent: 'Rejoindre en tant qu\'étudiant',
    joinOrg: 'Rejoindre en tant qu\'organisation',
    resumeMatchTitle: 'Analyse de correspondance de CV',
    matchedInternships: 'Stages correspondants trouvés',
    noMatches: 'Aucune correspondance',
    viewCareerRoadmap: 'Obtenir une feuille de route de carrière personnalisée',
    careerRoadmapTitle: 'Votre feuille de route de carrière personnalisée',
    selectDomains: 'Sélectionnez les domaines de stage',
    backToHome: 'Retour à l\'accueil',
  },
  es: {
    appName: 'InternAI',
    home: 'Inicio',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    studentLogin: 'Inicio de sesión de estudiante',
    studentSignup: 'Registro de estudiante',
    orgLogin: 'Inicio de sesión de organización',
    orgSignup: 'Registro de organización',
    email: 'Dirección de correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    fullName: 'Nombre completo',
    phone: 'Número de teléfono',
    city: 'Ciudad',
    college: 'Colegio/Universidad',
    degree: 'Título',
    yearOfStudy: 'Año de estudio',
    tagline: 'Filtrado inteligente de currículum. Prácticas emparejadas por IA. Hojas de ruta profesionales personalizadas.',
    subtitle: 'Sube tu currículum y deja que nuestra IA analice tus habilidades y te empareje con las mejores oportunidades.',
    joinStudent: 'Unirse como estudiante',
    joinOrg: 'Unirse como organización',
    resumeMatchTitle: 'Análisis de coincidencia de currículum',
    matchedInternships: 'Prácticas coincidentes encontradas',
    noMatches: 'Sin coincidencias',
    viewCareerRoadmap: 'Obtener hoja de ruta profesional personalizada',
    careerRoadmapTitle: 'Tu hoja de ruta profesional personalizada',
    selectDomains: 'Seleccionar dominios de prácticas',
    backToHome: 'Volver al inicio',
  },
};

const internshipDomains = [
  'Software Development',
  'Data Science & AI',
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Cybersecurity',
  'Cloud Computing',
  'Digital Marketing',
  'Business Analytics',
  'Product Management',
  'Research & Development',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Biotechnology',
  'Content Writing',
  'Graphic Design',
  'Finance & Accounting',
  'Human Resources',
  'Sales & Marketing',
];

// Analytics Data
const sectorData = [
  { name: 'Information Technology', value: 22, color: '#4F46E5' },
  { name: 'Digital India', value: 13, color: '#06B6D4' },
  { name: 'Research & Development', value: 10, color: '#8B5CF6' },
  { name: 'Engineering', value: 15, color: '#F59E0B' },
  { name: 'Data Science & AI', value: 28, color: '#10B981' },
  { name: 'Business & Consulting', value: 7, color: '#EF4444' },
  { name: 'Design & Creative', value: 5, color: '#EC4899' },
];

const countryData = [
  { name: 'India', students: 7500000 },
  { name: 'USA', students: 15000000 },
  { name: 'UK', students: 3200000 },
  { name: 'Canada', students: 2100000 },
  { name: 'Australia', students: 1600000 },
  { name: 'Germany', students: 3000000 },
  { name: 'Singapore', students: 1200000 },
  { name: 'Others', students: 5400000 },
];

const stateData = [
  { name: 'Karnataka', students: 1200000 },
  { name: 'Maharashtra', students: 1100000 },
  { name: 'Telangana', students: 850000 },
  { name: 'Tamil Nadu', students: 900000 },
  { name: 'Delhi NCR', students: 1000000 },
  { name: 'Uttar Pradesh', students: 750000 },
  { name: 'Gujarat', students: 600000 },
  { name: 'West Bengal', students: 500000 },
  { name: 'Kerala', students: 450000 },
  { name: 'Rajasthan', students: 400000 },
  { name: 'Madhya Pradesh', students: 350000 },
  { name: 'Punjab & Haryana', students: 450000 },
  { name: 'Other States', students: 700000 },
];

const generateInternshipData = (): Internship[] => {
  const today = new Date();
  const addDays = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  return [
    {
      id: 1,
      title: 'AI Research Intern',
      company: 'ISRO - Indian Space Research Organisation',
      mode: 'In-Office',
      deadline: addDays(3),
      duration: '3 months',
      location: 'Bangalore, Karnataka',
      stipend: '₹25,000/month',
      category: 'Research',
      description: 'Work on cutting-edge AI applications for space technology and satellite data analysis.',
      applyUrl: '#',
      isNew: true,
      postedDate: new Date().toISOString().split('T')[0],
      icon: Rocket,
      domains: ['Data Science & AI', 'Research & Development'],
    },
    {
      id: 2,
      title: 'Cybersecurity Analyst Intern',
      company: 'DRDO - Defence Research Organisation',
      mode: 'In-Office',
      deadline: addDays(7),
      duration: '6 months',
      location: 'Delhi',
      stipend: '₹30,000/month',
      category: 'Technology',
      description: 'Join India\'s premier defense research organization to work on cybersecurity projects.',
      applyUrl: '#',
      isNew: true,
      postedDate: new Date().toISOString().split('T')[0],
      icon: Shield,
      domains: ['Cybersecurity'],
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'CSIR - Council of Scientific Research',
      mode: 'Hybrid',
      deadline: addDays(7),
      duration: '4 months',
      location: 'Pune, India',
      stipend: '₹15,000/month',
      category: 'Data Science',
      description: 'Apply machine learning to scientific research data',
      applyUrl: 'https://www.csir.res.in',
      isNew: false,
      postedDate: addDays(-10),
      icon: Database,
      domains: ['Data Science & AI', 'Research & Development'],
    },
    {
      id: 4,
      title: 'Web Development Intern',
      company: 'NIC - National Informatics Centre',
      mode: 'Hybrid',
      deadline: addDays(10),
      duration: '3 months',
      location: 'New Delhi, India',
      stipend: '₹18,000/month',
      category: 'Technology',
      description: 'Build e-governance web applications for government services',
      applyUrl: 'https://www.nic.in',
      isNew: false,
      postedDate: addDays(-5),
      icon: Globe,
      domains: ['Web Development', 'Software Development'],
    },
    {
      id: 5,
      title: 'Mechanical Engineering Intern',
      company: 'BHEL - Bharat Heavy Electricals',
      mode: 'In-Office',
      deadline: addDays(12),
      duration: '6 months',
      location: 'Hyderabad, India',
      stipend: '₹20,000/month',
      category: 'Engineering',
      description: 'Support power equipment design and manufacturing processes',
      applyUrl: 'https://careers.bhel.in',
      isNew: false,
      postedDate: addDays(-7),
      icon: Cog,
      domains: ['Mechanical Engineering'],
    },
    {
      id: 6,
      title: 'Software Engineering Intern',
      company: 'Microsoft India',
      mode: 'Hybrid',
      deadline: addDays(5),
      duration: '3 months',
      location: 'Bangalore, India',
      stipend: '₹50,000/month',
      category: 'Technology',
      description: 'Develop cloud-based solutions using Azure platform',
      applyUrl: 'https://careers.microsoft.com',
      isNew: true,
      postedDate: addDays(-1),
      icon: Code,
      domains: ['Software Development', 'Cloud Computing'],
    },
    {
      id: 7,
      title: 'Software Engineering Intern',
      company: 'Google India',
      mode: 'Hybrid',
      deadline: addDays(6),
      duration: '4-6 months',
      location: 'Bangalore/Hyderabad, India',
      stipend: '₹55,000/month',
      category: 'Technology',
      description: 'Work on scalable distributed systems',
      applyUrl: 'https://careers.google.com',
      isNew: true,
      postedDate: addDays(-3),
      icon: Code,
      domains: ['Software Development', 'Web Development'],
    },
    {
      id: 8,
      title: 'UX Design Intern',
      company: 'Adobe India',
      mode: 'Remote',
      deadline: addDays(14),
      duration: '3 months',
      location: 'Remote',
      stipend: '₹40,000/month',
      category: 'Design',
      description: 'Design intuitive user experiences for Creative Cloud products',
      applyUrl: 'https://adobe.wd5.myworkdayjobs.com',
      isNew: false,
      postedDate: addDays(-6),
      icon: Palette,
      domains: ['UI/UX Design', 'Graphic Design'],
    },
    {
      id: 9,
      title: 'Business Analyst Intern',
      company: 'Deloitte India',
      mode: 'In-Office',
      deadline: addDays(11),
      duration: '3 months',
      location: 'Mumbai, India',
      stipend: '₹45,000/month',
      category: 'Business',
      description: 'Support strategic consulting for Fortune 500 clients',
      applyUrl: 'https://www2.deloitte.com/careers',
      isNew: false,
      postedDate: addDays(-12),
      icon: LineChart,
      domains: ['Business Analytics', 'Product Management'],
    },
    {
      id: 10,
      title: 'Cloud Computing Intern',
      company: 'Amazon Web Services India',
      mode: 'Hybrid',
      deadline: addDays(9),
      duration: '6 months',
      location: 'Mumbai/Hyderabad, India',
      stipend: '₹48,000/month',
      category: 'Technology',
      description: 'Work on AWS cloud infrastructure and services',
      applyUrl: 'https://www.amazon.jobs',
      isNew: true,
      postedDate: addDays(-4),
      icon: Cloud,
      domains: ['Cloud Computing', 'Software Development'],
    },
  ];
};

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [aiData, setAiData] = useState(null); //added
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showPassword, setShowPassword] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<InternshipCategory>('All');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [matchedInternships, setMatchedInternships] = useState<Internship[]>([]);
  const [hasResumeUploaded, setHasResumeUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState({
    totalInternships: 14033,
    activeStudents: 59678,
    partneredCompanies: 1247,
    successRate: 87.5,
  });

  // Accessibility Features
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(false);
  const [isSpeechToTextEnabled, setIsSpeechToTextEnabled] = useState(false);
  const [isSimpleLanguage, setIsSimpleLanguage] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);

  // Form State Management - Student Login
  const [studentLoginEmail, setStudentLoginEmail] = useState('');
  const [studentLoginPassword, setStudentLoginPassword] = useState('');

  // Form State Management - Student Signup
  const [studentSignupFullName, setStudentSignupFullName] = useState('');
  const [studentSignupEmail, setStudentSignupEmail] = useState('');
  const [studentSignupPhone, setStudentSignupPhone] = useState('');
  const [studentSignupCollege, setStudentSignupCollege] = useState('');
  const [studentSignupCollegeOther, setStudentSignupCollegeOther] = useState('');
  const [studentSignupCity, setStudentSignupCity] = useState('');
  const [studentSignupCityOther, setStudentSignupCityOther] = useState('');
  const [studentSignupDegree, setStudentSignupDegree] = useState('');
  const [studentSignupDegreeOther, setStudentSignupDegreeOther] = useState('');
  const [studentSignupYear, setStudentSignupYear] = useState('1st Year');
  const [studentSignupPassword, setStudentSignupPassword] = useState('');
  const [studentSignupConfirmPassword, setStudentSignupConfirmPassword] = useState('');

  // Form State Management - Organization Login
  const [orgLoginEmail, setOrgLoginEmail] = useState('');
  const [orgLoginPassword, setOrgLoginPassword] = useState('');

  // Form State Management - Organization Signup
  const [orgSignupName, setOrgSignupName] = useState('');
  const [orgSignupEmail, setOrgSignupEmail] = useState('');
  const [orgSignupPhone, setOrgSignupPhone] = useState('');
  const [orgSignupWebsite, setOrgSignupWebsite] = useState('');
  const [orgSignupIndustry, setOrgSignupIndustry] = useState('');
  const [orgSignupSize, setOrgSignupSize] = useState('');
  const [orgSignupPassword, setOrgSignupPassword] = useState('');
  const [orgSignupConfirmPassword, setOrgSignupConfirmPassword] = useState('');
  
  const t = new Proxy(translations[language], {
    get: (target, prop) => {
      return target[prop as keyof typeof target] || translations.en[prop as keyof typeof translations.en] || String(prop);
    }
  });

  // Text-to-Speech Function
  const speak = useCallback((text: string) => {
    if (isTextToSpeechEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, [isTextToSpeechEnabled, language]);

  useEffect(() => {
    const data = generateInternshipData();
    const sorted = data.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    setInternships(sorted);

    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        totalInternships: prev.totalInternships + Math.floor(Math.random() * 3),
        activeStudents: prev.activeStudents + Math.floor(Math.random() * 10),
        partneredCompanies: prev.partneredCompanies + (Math.random() > 0.9 ? 1 : 0),
        successRate: Math.min(99.9, prev.successRate + (Math.random() * 0.1)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hasResumeUploaded && selectedDomains.length > 0) {
      const matches = internships.filter(internship => 
        internship.domains.some(domain => selectedDomains.includes(domain))
      );
      setMatchedInternships(matches);
    }
  }, [hasResumeUploaded, selectedDomains, internships]);

  // Handle Escape key to close accessibility panel
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showAccessibilityPanel) {
        setShowAccessibilityPanel(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showAccessibilityPanel]);

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || internship.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isNewInternship = (postedDate: string) => {
    const posted = new Date(postedDate);
    const today = new Date();
    const diffTime = today.getTime() - posted.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const toggleDomain = useCallback((domain: string) => {
    setSelectedDomains(prev => 
      prev.includes(domain) 
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  }, []);

  // Accessibility Toolbar Component
  const AccessibilityToolbar = () => {
    if (!showAccessibilityPanel) return null;
    
    return (
      <div className="fixed right-4 top-24 z-50 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl p-5 border-2 border-indigo-300 max-w-xs w-80 animate-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="size-6 text-indigo-600" />
            Accessibility Options
          </h3>
          <button
            onClick={() => setShowAccessibilityPanel(false)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close accessibility panel"
          >
            <X className="size-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
      
      <div className="space-y-3">
        {/* High Contrast Mode */}
        <button
          onClick={() => {
            setIsHighContrast(!isHighContrast);
            speak(isHighContrast ? 'High contrast mode off' : 'High contrast mode on');
          }}
          className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isHighContrast 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Toggle high contrast mode"
        >
          <Eye className="size-4" />
          High Contrast
        </button>

        {/* Font Size */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-2 block">Font Size</label>
          <div className="flex gap-2">
            {(['normal', 'large', 'xlarge'] as const).map((size) => (
              <button
                key={size}
                onClick={() => {
                  setFontSize(size);
                  speak(`Font size ${size}`);
                }}
                className={`flex-1 px-3 py-2 rounded-lg font-bold transition-all ${
                  fontSize === size
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${size === 'normal' ? 'text-sm' : size === 'large' ? 'text-base' : 'text-lg'}`}
                aria-label={`Set font size to ${size}`}
              >
                {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
              </button>
            ))}
          </div>
        </div>

        {/* Text to Speech */}
        <button
          onClick={() => {
            setIsTextToSpeechEnabled(!isTextToSpeechEnabled);
            const message = !isTextToSpeechEnabled ? 'Text to speech enabled' : 'Text to speech disabled';
            if (!isTextToSpeechEnabled && 'speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance(message);
              window.speechSynthesis.speak(utterance);
            }
          }}
          className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isTextToSpeechEnabled 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Toggle text to speech"
        >
          <Volume2 className="size-4" />
          Text to Speech
        </button>

        {/* Speech to Text */}
        <button
          onClick={() => {
            setIsSpeechToTextEnabled(!isSpeechToTextEnabled);
            const message = !isSpeechToTextEnabled ? 'Speech to text enabled' : 'Speech to text disabled';
            speak(message);
          }}
          className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isSpeechToTextEnabled 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Toggle speech to text"
        >
          <Mic className="size-4" />
          Speech to Text
        </button>

        {/* Simple Language */}
        <button
          onClick={() => {
            setIsSimpleLanguage(!isSimpleLanguage);
            speak(isSimpleLanguage ? 'Normal language mode' : 'Simple language mode');
          }}
          className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isSimpleLanguage 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Toggle simple language"
        >
          <BookOpen className="size-4" />
          Simple Mode
        </button>

        {/* Keyboard Shortcuts Info */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-600 font-semibold mb-1">Keyboard Shortcuts:</p>
          <p className="text-xs text-gray-500">Tab - Navigate</p>
          <p className="text-xs text-gray-500">Enter - Select/Submit</p>
          <p className="text-xs text-gray-500">Esc - Close dialogs</p>
        </div>
      </div>
    </div>
    );
  };

  // REPLACEMENT CODE FOR handleFileChange
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Check if the user actually picked a file
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      console.log("File Selected:", file.name); // This prints to Console (F12)

      // 2. Save it to React State IMMEDIATELY
      setResumeFile(file);
      setHasResumeUploaded(true);

      // 3. Reset progress bars so they don't get stuck
      setIsUploading(false); 
      setUploadProgress(100);
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setResumeFile(null);
    setHasResumeUploaded(false);
    setUploadProgress(0);
    setIsUploading(false);
    // Reset the file input
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }, []);

  const ResumeUploadJSX = useMemo(() => (
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">{t.uploadResume}</label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors bg-gray-50">
          {isUploading ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full animate-pulse">
                  <Upload className="size-7 text-blue-600" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-blue-700 font-bold text-base mb-1">Uploading Resume...</p>
                  <p className="text-sm text-blue-600">Please wait while we process your file</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{uploadProgress}%</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                       style={{ 
                         backgroundSize: '200% 100%',
                         animation: 'shimmer 1.5s infinite'
                       }}
                  />
                </div>
              </div>
              
              <p className="mt-3 text-xs text-gray-500">
                {uploadProgress < 30 ? 'Analyzing file structure...' : 
                 uploadProgress < 70 ? 'Processing resume content...' : 
                 uploadProgress < 95 ? 'Almost done...' : 'Finalizing upload...'}
              </p>
            </div>
          ) : !resumeFile ? (
            <div>
              <div className="inline-flex items-center justify-center size-16 bg-indigo-100 rounded-full mb-3">
                <Upload className="size-8 text-indigo-600" />
              </div>
              <p className="text-gray-700 mb-1 font-medium">{t.dragDrop}</p>
              <p className="text-xs text-gray-500 mb-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
              <input 
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
                aria-label="Upload resume file"
                disabled={isUploading}
              />
              <label 
                htmlFor="resume-upload"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg cursor-pointer hover:from-indigo-700 hover:to-blue-700 transition-all text-sm font-medium shadow-md hover:shadow-lg"
              >
                <Upload className="size-4" />
                Choose Resume File
              </label>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="size-7 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-green-700 font-bold text-base">✓ Resume Uploaded Successfully!</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-lg mt-2">
                      <FileText className="size-4 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-800 font-semibold">{resumeFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(resumeFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={handleRemoveFile}
                  className="flex-shrink-0 ml-3 p-2.5 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all border-2 border-red-200 hover:border-red-600"
                  aria-label="Remove uploaded file"
                  title="Remove file"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  ), [resumeFile, isUploading, uploadProgress, t, handleFileChange, handleRemoveFile]);

  const DomainSelectorJSX = useMemo(() => (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2 font-medium">{t.selectDomains}</label>
      <p className="text-sm text-gray-600 mb-3">{t.selectDomainsDesc}</p>
      <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-4 border-2 border-gray-200 rounded-xl bg-gray-50">
        {internshipDomains.map((domain) => (
          <button
            key={domain}
            type="button"
            onClick={() => toggleDomain(domain)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedDomains.includes(domain)
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-400'
            }`}
          >
            {domain}
          </button>
        ))}
      </div>
      {selectedDomains.length > 0 && (
        <p className="mt-2 text-sm text-indigo-600 font-medium">
          {selectedDomains.length} domain{selectedDomains.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  ), [selectedDomains, t, toggleDomain, internshipDomains]);

  const NavigationBar = () => (
    <nav className="sticky top-0 z-50 shadow-lg">
      <div className="absolute inset-0">
        <img 
          src={circuitBoardBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-sm" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="relative size-14">
              <img 
                src={newLogo} 
                alt="InternAI Logo" 
                className="size-full object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              {t.appName}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-gray-200 shadow-sm">
              <Languages className="size-4 text-gray-700" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent border-none outline-none cursor-pointer text-sm text-gray-800 font-medium"
              >
                <option value="en" className="bg-white text-gray-800">English</option>
                <option value="hi" className="bg-white text-gray-800">हिन्दी</option>
                <option value="zh" className="bg-white text-gray-800">中文</option>
                <option value="fr" className="bg-white text-gray-800">Français</option>
                <option value="es" className="bg-white text-gray-800">Español</option>
              </select>
            </div>

            {currentPage !== 'home' && (
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-gray-200 shadow-sm hover:bg-white hover:shadow-md transition-all text-gray-800 font-medium text-sm"
              >
                <Home className="size-4" />
                <span>{t.home}</span>
              </button>
            )}

            <button 
              onClick={() => {
                setShowAccessibilityPanel(!showAccessibilityPanel);
                speak('Accessibility options');
              }}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-gray-200 shadow-sm transition-all hover:shadow-md"
              aria-label="Toggle accessibility options"
            >
              <ShieldCheck className="size-4 text-gray-700" />
              <span className="text-sm text-gray-800 font-medium">Accessibility</span>
            </button>

            <div className="relative group">
              <button className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                <LogIn className="size-4 text-gray-700" />
                <span className="text-sm text-gray-800 font-medium">{t.login}</span>
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                <button 
                  onClick={() => setCurrentPage('student-login')}
                  className="w-full text-left px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors rounded-t-xl"
                >
                  <GraduationCap className="size-5" />
                  <span className="text-sm font-medium">{t.studentLogin}</span>
                </button>
                <button 
                  onClick={() => setCurrentPage('org-login')}
                  className="w-full text-left px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors border-t rounded-b-xl"
                >
                  <Building2 className="size-5" />
                  <span className="text-sm font-medium">{t.orgLogin}</span>
                </button>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all">
                <UserPlus className="size-5" />
                <span className="text-sm font-medium">{t.signup}</span>
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                <button 
                  onClick={() => setCurrentPage('student-signup')}
                  className="w-full text-left px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors rounded-t-xl"
                >
                  <GraduationCap className="size-5" />
                  <span className="text-sm font-medium">{t.studentSignup}</span>
                </button>
                <button 
                  onClick={() => setCurrentPage('org-signup')}
                  className="w-full text-left px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors border-t rounded-b-xl"
                >
                  <Building2 className="size-5" />
                  <span className="text-sm font-medium">{t.orgSignup}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const InternshipCard = ({ internship }: { internship: Internship }) => {
    const IconComponent = internship.icon;
    const daysLeft = getDaysUntilDeadline(internship.deadline);
    const isEndingSoon = daysLeft <= 5;
    const isNew = isNewInternship(internship.postedDate);

    return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <IconComponent className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-1">
                  {internship.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{internship.company}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {isEndingSoon && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-200">
                <AlertCircle className="size-3" />
                {t.endingSoon}
              </span>
            )}
            {isNew && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                <Sparkles className="size-3" />
                {t.newLabel}
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              internship.mode === 'Remote' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
              internship.mode === 'Hybrid' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
              'bg-gray-50 text-gray-700 border border-gray-200'
            }`}>
              {internship.mode}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{internship.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-sm font-medium text-gray-900">{internship.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="size-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Stipend</p>
                <p className="text-sm font-medium text-gray-900">{internship.stipend}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPinned className="size-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-900 truncate">{internship.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Deadline</p>
                <p className={`text-sm font-medium ${isEndingSoon ? 'text-red-600' : 'text-gray-900'}`}>
                  {daysLeft} days left
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <a
            href={internship.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium text-sm group"
          >
            <span>{t.apply}</span>
            <ExternalLink className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    );
  };

  const ResumeMatchSection = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <FileCheck className="size-10 text-green-600" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 drop-shadow-sm">
            {t.resumeMatchTitle}
          </h2>
        </div>
      </div>

      {matchedInternships.length > 0 ? (
        <div>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-8 text-green-600" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{t.matchedInternships}</h3>
                  <p className="text-gray-700">Found {matchedInternships.length} opportunities matching your profile</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('matched-internships')}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
              >
                <span>{t.exploreBtn}</span>
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedInternships.slice(0, 3).map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      ) : hasResumeUploaded && selectedDomains.length > 0 ? (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-12 text-center shadow-xl">
          <div className="inline-flex items-center justify-center size-20 bg-orange-100 rounded-full mb-6">
            <AlertCircle className="size-10 text-orange-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.noMatches}</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.noMatchesDesc}
          </p>
          <button
            onClick={() => setCurrentPage('career-roadmap')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-lg"
          >
            <Route className="size-6" />
            <span>{t.viewCareerRoadmap}</span>
            <ArrowRight className="size-6" />
          </button>
        </div>
      ) : (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-12 text-center shadow-xl">
          <div className="inline-flex items-center justify-center size-20 bg-blue-100 rounded-full mb-6">
            <Upload className="size-10 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Upload Resume to Get Started</h3>
          <p className="text-lg text-gray-600 mb-8">
            Create an account and upload your resume to discover matching internship opportunities
          </p>
          <button
            onClick={() => setCurrentPage('student-signup')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-lg"
          >
            <GraduationCap className="size-6" />
            <span>{t.joinStudent}</span>
            <ArrowRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  );

  const AnalyticsDashboard = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <Activity className="size-10 text-indigo-600 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 drop-shadow-sm">
            {t.analyticsTitle}
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 backdrop-blur-md rounded-full border border-green-300 mt-4 shadow-sm">
          <Zap className="size-4 text-green-600 animate-pulse" />
          <span className="text-sm text-green-700 font-medium">{t.liveUpdate}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-blue-100 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className="size-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Briefcase className="size-6 text-white" />
            </div>
            <TrendingUpIcon className="size-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.totalInternships}</p>
          <p className="text-3xl font-bold text-gray-900">{liveMetrics.totalInternships.toLocaleString()}</p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-purple-100 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className="size-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Users className="size-6 text-white" />
            </div>
            <TrendingUpIcon className="size-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.activeStudents}</p>
          <p className="text-3xl font-bold text-gray-900">{liveMetrics.activeStudents.toLocaleString()}</p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-indigo-100 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className="size-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="size-6 text-white" />
            </div>
            <TrendingUpIcon className="size-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.partneredCompanies}</p>
          <p className="text-3xl font-bold text-gray-900">{liveMetrics.partneredCompanies.toLocaleString()}</p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-green-100 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className="size-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Award className="size-6 text-white" />
            </div>
            <TrendingUpIcon className="size-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.successRate}</p>
          <p className="text-3xl font-bold text-gray-900">{liveMetrics.successRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="size-6 text-indigo-600" />
            <h3 className="text-2xl font-bold text-gray-900">{t.sectorAllocation}</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {sectorData.map((sector, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="size-3 rounded-full" style={{ backgroundColor: sector.color }} />
                <span className="text-xs text-gray-600">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Globe2 className="size-6 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900">{t.countryParticipation}</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="students" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-100 mt-8">
        <div className="flex items-center gap-3 mb-6">
          <MapIcon className="size-6 text-orange-600" />
          <h3 className="text-2xl font-bold text-gray-900">{t.stateParticipation}</h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={stateData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 11, angle: -45, textAnchor: 'end' }} height={100} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Bar dataKey="students" fill="#F59E0B" radius={[8, 8, 0, 0]} name="Active Students" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );

  // Career Roadmap Page
  // Replace your existing CareerRoadmapPage with this:
  const CareerRoadmapPage = () => {
    // Default fallback if user goes here without signing up
    const data = aiData || {
      skills_to_learn: ['Python', 'SQL', 'React'],
      learning_path: [
        { phase: 'Phase 1', title: 'Basics', tasks: ['Learn the syntax', 'Understand logic'] },
        { phase: 'Phase 2', title: 'Building', tasks: ['Create a small app', 'Connect to DB'] }
      ],
      suggested_projects: [
        { title: 'ToDo App', desc: 'Simple task manager', difficulty: 'Beginner' }
      ],
      recommended_domains: ['Software Engineering']
    };

    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-gray-700 mb-6 bg-white/80 px-4 py-2 rounded-lg"
          >
            <ArrowRight className="size-5 rotate-180" />
            <span className="font-medium">{t.backToHome}</span>
          </button>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">{t.careerRoadmapTitle}</h1>
            <p className="text-xl text-gray-700">
               AI Match Score: <span className="font-bold text-green-600">{data.match_score || 85}%</span>
            </p>
          </div>

          <div className="space-y-8">
            {/* Skills Section */}
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.skillsToLearn}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {data.skills_to_learn?.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <CheckSquare className="size-5 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-gray-900">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Path Section */}
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.learningPath}</h2>
              <div className="space-y-4">
                {data.learning_path?.map((phase, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex-shrink-0 size-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-purple-600">{phase.phase}</span>
                        <span className="text-xl font-bold text-gray-900">{phase.title}</span>
                      </div>
                      <ul className="space-y-1">
                        {phase.tasks?.map((task, taskIdx) => (
                          <li key={taskIdx} className="flex items-center gap-2 text-gray-700">
                            <div className="size-1.5 bg-purple-400 rounded-full" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Projects Section */}
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.suggestedProjects}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {data.suggested_projects?.map((project, idx) => (
                  <div key={idx} className="p-6 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {project.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-700">{project.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Matched Internships Page
  const MatchedInternshipsPage = () => (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
        >
          <ArrowRight className="size-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">{t.backToHome}</span>
        </button>

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">{t.matchedInternships}</h1>
          <p className="text-xl text-gray-700">
            Found {matchedInternships.length} opportunities based on your profile
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 backdrop-blur-md rounded-full border border-green-300 shadow-sm">
            <CheckCircle2 className="size-4 text-green-600" />
            <span className="text-sm text-green-700 font-medium">{t.matchScore}: 85-95%</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </div>
    </div>
  );

  // Government & MNC Internships Pages (keeping previous implementations)
  const GovInternshipsPage = () => {
    const govInternships = filteredInternships.filter(i => 
      ['ISRO', 'DRDO', 'CSIR', 'Ministry', 'BHEL', 'Indian Institute'].some(org => i.company.includes(org))
    );

    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <button 
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
            >
              <ArrowRight className="size-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">{t.backToHome}</span>
            </button>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">{t.govInternships}</h1>
            <p className="text-xl text-gray-700">{t.govDesc}</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 backdrop-blur-md rounded-full border border-green-300 shadow-sm">
              <TrendingUpIcon className="size-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">{t.deadlinePriority}</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-200 shadow-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as InternshipCategory)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="All">{t.allCategories}</option>
                  <option value="Technology">Technology</option>
                  <option value="Research">Research</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>
            </div>
            <div className="mt-4 text-white text-sm">
              {t.showing} <span className="font-semibold">{govInternships.length}</span> {t.opportunities}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {govInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MNCInternshipsPage = () => {
    const mncInternships = filteredInternships.filter(i => 
      ['Google', 'Microsoft', 'Adobe', 'Deloitte', 'Cisco', 'Amazon'].some(org => i.company.includes(org))
    );

    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <button 
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
            >
              <ArrowRight className="size-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">{t.backToHome}</span>
            </button>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">{t.mncInternships}</h1>
            <p className="text-xl text-gray-700">{t.mncDesc}</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 backdrop-blur-md rounded-full border border-green-300 shadow-sm">
              <TrendingUpIcon className="size-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">{t.deadlinePriority}</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-200 shadow-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as InternshipCategory)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="All">{t.allCategories}</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>
            </div>
            <div className="mt-4 text-white text-sm">
              {t.showing} <span className="font-semibold">{mncInternships.length}</span> {t.opportunities}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mncInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Login/Signup Pages (keeping from previous, will add domain selector to signup)
  const StudentLoginPage = () => {
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, nextFieldId?: string) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (nextFieldId) {
          const nextField = document.getElementById(nextFieldId);
          if (nextField) {
            nextField.focus();
          }
        }
      }
    }, []);

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
              <GraduationCap className="size-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.studentLogin}</h2>
            <p className="text-gray-600">Welcome back, student!</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  id="login-email"
                  type="email"
                  value={studentLoginEmail}
                  onChange={(e) => setStudentLoginEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  placeholder="student@example.com"
                  autoComplete="email"
                  spellCheck="false"
                  onKeyDown={(e) => handleKeyDown(e, 'login-password')}
                  aria-label="Email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={studentLoginPassword}
                  onChange={(e) => setStudentLoginPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  spellCheck="false"
                  aria-label="Password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const form = e.currentTarget.form;
                      if (form) {
                        form.requestSubmit();
                      }
                    }
                  }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button type="button" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                {t.forgotPassword}
              </button>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              {t.loginButton}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {t.noAccount}{' '}
              <button 
                onClick={() => setCurrentPage('student-signup')}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {t.signupHere}
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs mb-3">{t.orLoginAs}</p>
            <button 
              onClick={() => setCurrentPage('org-login')}
              className="flex items-center justify-center gap-2 w-full py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 transition-all"
            >
              <Building2 className="size-5" />
              <span className="font-medium">{t.organization}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const StudentSignupPage = () => {
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>, nextFieldId?: string) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (nextFieldId) {
          const nextField = document.getElementById(nextFieldId);
          if (nextField) {
            nextField.focus();
          }
        }
      }
    }, []);

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
              <GraduationCap className="size-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.studentSignup}</h2>
            <p className="text-gray-600">Start your career journey today!</p>
          </div>

          <form className="space-y-6">
            {ResumeUploadJSX}
            {DomainSelectorJSX}

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">{t.fullName}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  id="signup-fullname"
                  type="text"
                  value={studentSignupFullName}
                  onChange={(e) => setStudentSignupFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  placeholder="Rahul Kumar"
                  autoComplete="name"
                  onKeyDown={(e) => handleKeyDown(e, 'signup-email')}
                  aria-label="Full name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium text-sm">{t.email}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input 
                    id="signup-email"
                    type="email"
                    value={studentSignupEmail}
                    onChange={(e) => setStudentSignupEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                    placeholder="student@example.com"
                    autoComplete="email"
                    spellCheck="false"
                    onKeyDown={(e) => handleKeyDown(e, 'signup-phone')}
                    aria-label="Email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium text-sm">{t.phone}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input 
                    id="signup-phone"
                    value={studentSignupPhone}
                    onChange={(e) => setStudentSignupPhone(e.target.value)}
                    type="tel"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    onKeyDown={(e) => handleKeyDown(e, 'signup-college')}
                    aria-label="Phone number"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium text-sm">{t.college}</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none z-10" />
                  <select 
                    id="signup-college"
                    value={studentSignupCollege}
                    onChange={(e) => {
                      setStudentSignupCollege(e.target.value);
                      if (e.target.value !== 'Others') {
                        setStudentSignupCollegeOther('');
                      }
                    }}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all appearance-none bg-white cursor-pointer"
                    onKeyDown={(e) => handleKeyDown(e, studentSignupCollege === 'Others' ? 'signup-college-other' : 'signup-city')}
                    aria-label="College or university"
                  >
                    <option value="">Select College/University</option>
                    <option value="IIT Bombay">IIT Bombay</option>
                    <option value="IIT Delhi">IIT Delhi</option>
                    <option value="IIT Madras">IIT Madras</option>
                    <option value="IIT Kanpur">IIT Kanpur</option>
                    <option value="IIT Kharagpur">IIT Kharagpur</option>
                    <option value="IIT Roorkee">IIT Roorkee</option>
                    <option value="IIT Guwahati">IIT Guwahati</option>
                    <option value="IIT Hyderabad">IIT Hyderabad</option>
                    <option value="NIT Trichy">NIT Trichy</option>
                    <option value="NIT Warangal">NIT Warangal</option>
                    <option value="NIT Surathkal">NIT Surathkal</option>
                    <option value="NIT Calicut">NIT Calicut</option>
                    <option value="IIIT Hyderabad">IIIT Hyderabad</option>
                    <option value="IIIT Bangalore">IIIT Bangalore</option>
                    <option value="IIIT Delhi">IIIT Delhi</option>
                    <option value="Delhi University (DU)">Delhi University (DU)</option>
                    <option value="NSUT">NSUT</option>
                    <option value="DTU">DTU</option>
                    <option value="JNU">JNU</option>
                    <option value="BITS Pilani">BITS Pilani</option>
                    <option value="VIT">VIT</option>
                    <option value="SRM University">SRM University</option>
                    <option value="Manipal University">Manipal University</option>
                    <option value="Amity University">Amity University</option>
                    <option value="Symbiosis">Symbiosis</option>
                    <option value="Christ University">Christ University</option>
                    <option value="University of Toronto">University of Toronto</option>
                    <option value="University of British Columbia">University of British Columbia</option>
                    <option value="National University of Singapore (NUS)">National University of Singapore (NUS)</option>
                    <option value="Nanyang Technological University (NTU)">Nanyang Technological University (NTU)</option>
                    <option value="University of Melbourne">University of Melbourne</option>
                    <option value="University of Sydney">University of Sydney</option>
                    <option value="University of Oxford">University of Oxford</option>
                    <option value="University of Cambridge">University of Cambridge</option>
                    <option value="Harvard University">Harvard University</option>
                    <option value="Stanford University">Stanford University</option>
                    <option value="MIT">MIT</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {studentSignupCollege === 'Others' && (
                  <input 
                    id="signup-college-other"
                    type="text"
                    value={studentSignupCollegeOther}
                    onChange={(e) => setStudentSignupCollegeOther(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all mt-2"
                    placeholder="Enter your college/university name"
                    onKeyDown={(e) => handleKeyDown(e, 'signup-city')}
                    aria-label="Other college or university"
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium text-sm">{t.city}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none z-10" />
                  <select 
                    id="signup-city"
                    value={studentSignupCity}
                    onChange={(e) => {
                      setStudentSignupCity(e.target.value);
                      if (e.target.value !== 'Others') {
                        setStudentSignupCityOther('');
                      }
                    }}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all appearance-none bg-white cursor-pointer"
                    onKeyDown={(e) => handleKeyDown(e, studentSignupCity === 'Others' ? 'signup-city-other' : 'signup-degree')}
                    aria-label="City"
                  >
                    <option value="">Select City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Pune">Pune</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Toronto">Toronto</option>
                    <option value="Vancouver">Vancouver</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Sydney">Sydney</option>
                    <option value="Melbourne">Melbourne</option>
                    <option value="London">London</option>
                    <option value="Oxford">Oxford</option>
                    <option value="Cambridge">Cambridge</option>
                    <option value="Boston">Boston</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {studentSignupCity === 'Others' && (
                  <input 
                    id="signup-city-other"
                    type="text"
                    value={studentSignupCityOther}
                    onChange={(e) => setStudentSignupCityOther(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all mt-2"
                    placeholder="Enter your city name"
                    onKeyDown={(e) => handleKeyDown(e, 'signup-degree')}
                    aria-label="Other city"
                  />
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium text-sm">{t.degree}</label>
                <select 
                  id="signup-degree"
                  value={studentSignupDegree}
                  onChange={(e) => {
                    setStudentSignupDegree(e.target.value);
                    if (e.target.value !== 'Others') {
                      setStudentSignupDegreeOther('');
                    }
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all appearance-none bg-white cursor-pointer"
                  onKeyDown={(e) => handleKeyDown(e, studentSignupDegree === 'Others' ? 'signup-degree-other' : 'signup-year')}
                  aria-label="Degree"
                >
                  <option value="">Select Degree</option>
                  <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                  <option value="M.Tech / M.E.">M.Tech / M.E.</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                  <option value="BA">BA</option>
                  <option value="MA">MA</option>
                  <option value="B.Com">B.Com</option>
                  <option value="M.Com">M.Com</option>
                  <option value="LLB">LLB</option>
                  <option value="LLM">LLM</option>
                  <option value="MBBS">MBBS</option>
                  <option value="Others">Others</option>
                </select>
                {studentSignupDegree === 'Others' && (
                  <input 
                    id="signup-degree-other"
                    type="text"
                    value={studentSignupDegreeOther}
                    onChange={(e) => setStudentSignupDegreeOther(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all mt-2"
                    placeholder="Enter your degree"
                    onKeyDown={(e) => handleKeyDown(e, 'signup-year')}
                    aria-label="Other degree"
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium text-sm">{t.yearOfStudy}</label>
                <select 
                  id="signup-year"
                  value={studentSignupYear}
                  onChange={(e) => setStudentSignupYear(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  onKeyDown={(e) => handleKeyDown(e, 'signup-password')}
                  aria-label="Year of study"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Final Year</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium text-sm">{t.password}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input 
                    id="signup-password"
                    value={studentSignupPassword}
                    onChange={(e) => setStudentSignupPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    spellCheck="false"
                    onKeyDown={(e) => handleKeyDown(e, 'signup-confirmpassword')}
                    aria-label="Password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
            </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium text-sm">{t.confirmPassword}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input 
                    id="signup-confirmpassword"
                    type="password"
                    value={studentSignupConfirmPassword}
                    onChange={(e) => setStudentSignupConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    spellCheck="false"
                    aria-label="Confirm password"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const form = e.currentTarget.form;
                        if (form) {
                          form.requestSubmit();
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Signup Progress Indicator */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 mb-3">Signup Progress</p>
              <div className="space-y-2">
                <div className={`flex items-center gap-2 text-sm ${hasResumeUploaded ? 'text-green-700' : 'text-gray-500'}`}>
                  {hasResumeUploaded ? (
                    <CheckCircle2 className="size-4 text-green-600" />
                  ) : (
                    <div className="size-4 border-2 border-gray-400 rounded-full" />
                  )}
                  <span className={hasResumeUploaded ? 'font-medium' : ''}>Resume Uploaded</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${selectedDomains.length > 0 ? 'text-green-700' : 'text-gray-500'}`}>
                  {selectedDomains.length > 0 ? (
                    <CheckCircle2 className="size-4 text-green-600" />
                  ) : (
                    <div className="size-4 border-2 border-gray-400 rounded-full" />
                  )}
                  <span className={selectedDomains.length > 0 ? 'font-medium' : ''}>
                    Domains Selected {selectedDomains.length > 0 && `(${selectedDomains.length})`}
                  </span>
                </div>
              </div>
            </div>

            {!hasResumeUploaded && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium text-sm">Resume Required</p>
                  <p className="text-amber-700 text-xs mt-1">Please upload your resume to continue with signup</p>
                </div>
              </div>
            )}

            {hasResumeUploaded && selectedDomains.length === 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-800 font-medium text-sm">Select Your Domains</p>
                  <p className="text-blue-700 text-xs mt-1">Choose at least one domain of interest above</p>
                </div>
              </div>
            )}

            <button 
              type="submit"
              onClick={async (e) => {
                e.preventDefault();

                // 1. Validation
                if (!hasResumeUploaded) {
                  alert('Please upload your resume to continue');
                  return;
                }
                
                // 2. Wrap Data
                const formData = new FormData();
                formData.append("full_name", studentSignupFullName);
                formData.append("email", studentSignupEmail);
                formData.append("selected_domains", JSON.stringify(selectedDomains));
                formData.append("degree", studentSignupDegree);
                formData.append("resume", resumeFile);

                try {
                  alert("Sending to AI... Please wait.");
                  
                  // 3. Send to Backend
                  const response = await axios.post("https://intern-ai-qgk8.onrender.com/signup-student", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                  });

                  // 4. Save the AI Data (CRITICAL STEP)
                  console.log("Saving AI Data:", response.data.ai_analysis);
                  setAiData(response.data.ai_analysis);

                  alert("Signup Successful! Click OK to see your Roadmap.");

                  // 5. Force Navigation to Roadmap (so you can see the result)
                  setCurrentPage('career-roadmap');

                } catch (error) {
                  console.error(error);
                  alert("Backend Error. Check terminal.");
                }
              }}
              className={`w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium ${
                !hasResumeUploaded 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:from-blue-700 hover:to-indigo-700'
              }`}
            >
              {t.signupButton}
            </button>

            {hasResumeUploaded && selectedDomains.length > 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  {matchedInternships.length > 0 
                    ? `✅ ${matchedInternships.length} internships match your profile!`
                    : '⚠️ No exact matches found, but we have a career roadmap for you'}
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentPage(matchedInternships.length > 0 ? 'matched-internships' : 'career-roadmap')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  {matchedInternships.length > 0 ? t.viewMatches : t.viewCareerRoadmap}
                </button>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {t.alreadyAccount}{' '}
              <button 
                onClick={() => setCurrentPage('student-login')}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {t.loginHere}
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="px-6 py-2.5 bg-white/80 backdrop-blur-md text-gray-800 rounded-full border border-gray-200 shadow-sm hover:bg-white hover:shadow-md transition-all font-medium flex items-center gap-2 mx-auto"
            >
              <Home className="size-5" />
              <span>{t.backToHome}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Org Login/Signup pages (keeping simplified versions)
  const OrganizationLoginPage = () => {
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, nextFieldId?: string) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (nextFieldId) {
          const nextField = document.getElementById(nextFieldId);
          if (nextField) {
            nextField.focus();
          }
        }
      }
    }, []);

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
              <Building2 className="size-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.orgLogin}</h2>
            <p className="text-gray-600">Find the perfect talent!</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  id="org-login-email"
                  type="email"
                  value={orgLoginEmail}
                  onChange={(e) => setOrgLoginEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                  placeholder="hr@company.com"
                  autoComplete="email"
                  spellCheck="false"
                  onKeyDown={(e) => handleKeyDown(e, 'org-login-password')}
                  aria-label="Email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  id="org-login-password"
                  type={showPassword ? "text" : "password"}
                  value={orgLoginPassword}
                  onChange={(e) => setOrgLoginPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                  autoComplete="current-password"
                  spellCheck="false"
                  aria-label="Password"
                  placeholder="••••••••"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const form = e.currentTarget.form;
                      if (form) {
                        form.requestSubmit();
                      }
                    }
                  }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              {t.loginButton}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {t.noAccount}{' '}
              <button 
                onClick={() => setCurrentPage('org-signup')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {t.signupHere}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const OrganizationSignupPage = () => (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
            <Building2 className="size-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.orgSignup}</h2>
          <p className="text-gray-600">Hire the best interns!</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium text-sm">{t.orgName}</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input 
                type="text"
                value={orgSignupName}
                onChange={(e) => setOrgSignupName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                placeholder="Tech Corp India"
                autoComplete="organization"
                aria-label="Organization name"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  type="email"
                  value={orgSignupEmail}
                  onChange={(e) => setOrgSignupEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                  placeholder="hr@company.com"
                  autoComplete="email"
                  spellCheck="false"
                  aria-label="Email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">{t.phone}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  type="tel"
                  value={orgSignupPhone}
                  onChange={(e) => setOrgSignupPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  aria-label="Phone number"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={orgSignupPassword}
                  onChange={(e) => setOrgSignupPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  spellCheck="false"
                  aria-label="Password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">{t.confirmPassword}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  type="password"
                  value={orgSignupConfirmPassword}
                  onChange={(e) => setOrgSignupConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  spellCheck="false"
                  aria-label="Confirm password"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            {t.signupButton}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {t.alreadyAccount}{' '}
            <button 
              onClick={() => setCurrentPage('org-login')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {t.loginHere}
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="px-6 py-2.5 bg-white/80 backdrop-blur-md text-gray-800 rounded-full border border-gray-200 shadow-sm hover:bg-white hover:shadow-md transition-all font-medium flex items-center gap-2 mx-auto"
          >
            <Home className="size-5" />
            <span>{t.backToHome}</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Home Page
  const HomePage = () => (
    <>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 animate-fade-in">
              <div className="relative size-24">
                <img 
                  src={newLogo} 
                  alt="InternAI Logo" 
                  className="w-full h-full object-contain animate-pulse"
                  {/* className="size-full object-contain animate-pulse" */}
                />
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {t.appName}
              </h1>
            </div>
            
            <p className="text-3xl md:text-4xl text-gray-800 max-w-5xl mx-auto drop-shadow-lg font-semibold">
              {t.tagline}
            </p>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed drop-shadow">
              {t.subtitle}
            </p>
            
            <div className="max-w-5xl mx-auto mt-8 rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src={heroImage}
                alt="Students working"
                className="w-full h-80 object-cover"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button 
                onClick={() => setCurrentPage('student-signup')}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 min-w-[280px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-3">
                  <GraduationCap className="size-6" />
                  <span className="text-xl font-semibold">{t.joinStudent}</span>
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button 
                onClick={() => setCurrentPage('org-signup')}
                className="group relative px-10 py-5 bg-white text-indigo-600 border-3 border-indigo-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 min-w-[280px]"
              >
                <div className="flex items-center justify-center gap-3">
                  <Briefcase className="size-6" />
                  <span className="text-xl font-semibold">{t.joinOrg}</span>
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <ResumeMatchSection />
      <AnalyticsDashboard />

      <section className="relative py-20 mt-20 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src={studentBgImage}
            alt="Student Education Background"
            className="w-full h-full object-cover blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-indigo-900/60 to-purple-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <GraduationCap className="size-12 text-yellow-300" />
              <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {t.howItWorksStudent}
              </h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Upload, title: t.studentStep1, desc: t.studentStep1Desc, color: 'from-yellow-300 to-orange-400' },
              { icon: WandSparkles, title: t.studentStep2, desc: t.studentStep2Desc, color: 'from-green-300 to-emerald-400' },
              { icon: Search, title: t.studentStep3, desc: t.studentStep3Desc, color: 'from-blue-300 to-cyan-400' },
              { icon: Rocket, title: t.studentStep4, desc: t.studentStep4Desc, color: 'from-purple-300 to-pink-400' },
            ].map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 size-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900">
                    {idx + 1}
                  </div>
                  <div className="mt-8 mb-6">
                    <div className={`inline-flex items-center justify-center size-20 bg-gradient-to-br ${step.color} rounded-2xl`}>
                      <IconComponent className="size-10 text-gray-900" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-blue-100 text-base">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src={orgBgImage}
            alt="Business Professionals Background"
            className="w-full h-full object-cover blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-pink-900/60 to-red-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Briefcase className="size-12 text-yellow-300" />
              <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {t.howItWorksOrg}
              </h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: t.orgStep1, desc: t.orgStep1Desc, color: 'from-cyan-300 to-blue-400' },
              { icon: FileCheck, title: t.orgStep2, desc: t.orgStep2Desc, color: 'from-emerald-300 to-teal-400' },
              { icon: ChartBar, title: t.orgStep3, desc: t.orgStep3Desc, color: 'from-orange-300 to-amber-400' },
              { icon: Award, title: t.orgStep4, desc: t.orgStep4Desc, color: 'from-violet-300 to-purple-400' },
            ].map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 size-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900">
                    {idx + 1}
                  </div>
                  <div className="mt-8 mb-6">
                    <div className={`inline-flex items-center justify-center size-20 bg-gradient-to-br ${step.color} rounded-2xl`}>
                      <IconComponent className="size-10 text-gray-900" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-pink-100 text-base">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 drop-shadow-lg">
          {t.exploreTitle}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-10">
          <div 
            onClick={() => setCurrentPage('gov-internships')}
            className="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden cursor-pointer hover:scale-105"
          >
            <div className="relative h-64 overflow-hidden">
              <ImageWithFallback 
                src={govInternshipImage}
                alt="Indian Flag"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {t.govInternships}
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {t.govDesc}
              </p>
              <button className="flex items-center gap-2 text-orange-600 group-hover:gap-4 transition-all font-semibold">
                <span className="text-lg">{t.exploreBtn}</span>
                <ArrowRight className="size-6" />
              </button>
            </div>
          </div>
          
          <div 
            onClick={() => setCurrentPage('mnc-internships')}
            className="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden cursor-pointer hover:scale-105"
          >
            <div className="relative h-64 overflow-hidden">
              <ImageWithFallback 
                src={mncInternshipImage}
                alt="Global Network"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {t.mncInternships}
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {t.mncDesc}
              </p>
              <button className="flex items-center gap-2 text-indigo-600 group-hover:gap-4 transition-all font-semibold">
                <span className="text-lg">{t.exploreBtn}</span>
                <ArrowRight className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20">
        {/* Social Media Section */}
        <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="text-white font-medium text-lg">Follow InternAI</span>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="Facebook">
                    <Facebook className="size-5" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter className="size-5" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="Instagram">
                    <Instagram className="size-5" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="LinkedIn">
                    <Linkedin className="size-5" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="YouTube">
                    <Youtube className="size-5" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-10">
                  <img src={newLogo} alt="InternAI" className="size-full object-contain" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  {t.appName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="bg-white/95 backdrop-blur-sm py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {/* For Students */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">For Students</h3>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Browse Internships</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Government Schemes</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">MNC Opportunities</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Career Roadmap</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Resume Builder</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Skill Assessment</a></li>
                </ul>
              </div>

              {/* For Organizations */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">For Organizations</h3>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Post Internships</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Find Talent</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Employer Dashboard</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Pricing Plans</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Success Stories</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Partnership Programs</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Blog</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Guides & Tutorials</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Webinars</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">FAQs</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Community Forum</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">About InternAI</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Careers</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Press & Media</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Investors</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Our Team</a></li>
                </ul>
              </div>

              {/* Platform */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">AI Technology</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Security</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">API Access</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Integrations</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Mobile App</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">System Status</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Accessibility</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Multilingual Support</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Student Support</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Employer Support</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Feedback</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">Report Issue</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-100 border-t border-gray-300 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <Globe className="size-4" />
                  <span className="font-medium">{language === 'en' ? 'English (India)' : language === 'hi' ? 'हिन्दी (भारत)' : 'Language'}</span>
                </div>
                <a href="#" className="hover:text-indigo-600 hover:underline">Privacy</a>
                <a href="#" className="hover:text-indigo-600 hover:underline">Terms of Use</a>
                <a href="#" className="hover:text-indigo-600 hover:underline">Sitemap</a>
                <a href="#" className="hover:text-indigo-600 hover:underline">Cookie Policy</a>
                <a href="#" className="hover:text-indigo-600 hover:underline">Safety & Security</a>
                <a href="#" className="hover:text-indigo-600 hover:underline">Accessibility</a>
              </div>
              <div className="text-gray-500">
                © InternAI 2026
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );

  return (
    <div 
      className={`min-h-screen relative ${isHighContrast ? 'high-contrast' : ''} ${fontSize === 'large' ? 'font-size-large' : fontSize === 'xlarge' ? 'font-size-xlarge' : ''}`}
      style={{
        fontFamily: isSimpleLanguage ? 'Arial, sans-serif' : 'inherit'
      }}
    >
      <div className="fixed inset-0 z-0">
        <img 
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        <NavigationBar />
        <AccessibilityToolbar />

        {currentPage === 'home' && <HomePage />}
        {currentPage === 'student-login' && <StudentLoginPage />}
        {currentPage === 'student-signup' && <StudentSignupPage />}
        {currentPage === 'org-login' && <OrganizationLoginPage />}
        {currentPage === 'org-signup' && <OrganizationSignupPage />}
        {currentPage === 'gov-internships' && <GovInternshipsPage />}
        {currentPage === 'mnc-internships' && <MNCInternshipsPage />}
        {currentPage === 'matched-internships' && <MatchedInternshipsPage />}
        {currentPage === 'career-roadmap' && <CareerRoadmapPage />}
      </div>

      {/* Accessibility CSS */}
      <style>{`
        /* High Contrast Mode */
        .high-contrast {
          filter: contrast(1.5) brightness(1.1);
        }
        .high-contrast * {
          border-color: #000 !important;
        }
        .high-contrast button, .high-contrast input, .high-contrast select {
          border: 2px solid #000 !important;
        }

        /* Font Size Scaling */
        .font-size-large {
          font-size: 115% !important;
        }
        .font-size-large * {
          font-size: inherit !important;
        }
        
        .font-size-xlarge {
          font-size: 130% !important;
        }
        .font-size-xlarge * {
          font-size: inherit !important;
        }

        /* Preserve button and heading sizes */
        .font-size-large h1, .font-size-xlarge h1 {
          font-size: 2.5em !important;
        }
        .font-size-large h2, .font-size-xlarge h2 {
          font-size: 2em !important;
        }
        .font-size-large h3, .font-size-xlarge h3 {
          font-size: 1.5em !important;
        }

        /* Accessibility Panel Animation */
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: slideInFromTop 0.3s ease-out;
        }

        /* Ensure dropdown menus open downward */
        select {
          appearance: auto;
          -webkit-appearance: menulist;
          -moz-appearance: menulist;
        }
        
        select option {
          background-color: white;
          color: #1f2937;
        }
      `}</style>
    </div>
  );
}
