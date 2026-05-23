'use client'

import Link from 'next/link'
import {
  Zap, Brain, Wallet, Users, FolderKanban, Package,
  Clock, Target, Shield, Globe, Sparkles, ArrowRight,
  CheckCircle2, BarChart3, MessageSquare, Bot,
} from 'lucide-react'
import { useTranslation } from '@/components/providers/i18n-provider'

const content = {
  en: {
    badge: 'About NEXUS',
    heroTitle: 'We built the tool\nwe always needed.',
    heroSub: 'NEXUS is more than a dashboard — it\'s a complete business operating system for modern entrepreneurs, freelancers, and growing companies.',
    problemTitle: 'The Problem',
    problemDesc: 'Most business owners spend hours every week scattered across spreadsheets, banking apps, messaging tools, and sticky notes. Nothing talks to each other. Nothing gives you a clear picture. You\'re always reacting — never in control.',
    problemQuote: '"I had revenue, but I didn\'t know if I was actually profitable."',
    solutionTitle: 'The NEXUS Solution',
    solutionDesc: 'One intelligent platform that brings together your finances, clients, projects, team, inventory, and AI insights. Built for clarity, speed, and real business decisions.',
    whatTitle: 'What is NEXUS?',
    whatDesc: 'NEXUS is an AI-powered business management platform designed for freelancers, solopreneurs, small businesses, and agencies. It combines financial tracking, project management, team oversight, inventory control, and intelligent AI insights — all in one beautiful interface, available in English, French, and Arabic.',
    modulesTitle: 'Everything You Need. One Place.',
    modules: [
      {
        icon: 'Wallet',
        title: 'Smart Finances',
        desc: 'Track every transaction, monitor cash flow in real time, and understand where your money goes. Know your profit margin at a glance — not at the end of the quarter.',
      },
      {
        icon: 'Users',
        title: 'Client Management',
        desc: 'Manage your entire client base — contact info, billing balances, project history, and outstanding payments. Never lose track of who owes what.',
      },
      {
        icon: 'FolderKanban',
        title: 'Project Hub',
        desc: 'Create, track, and close projects with real progress visibility. Assign clients, set deadlines, and move work from To Do to Done — efficiently.',
      },
      {
        icon: 'Users',
        title: 'Team & Employees',
        desc: 'Add your team, track performance, manage salaries and payment status. Know who\'s delivering and who needs support — all without micromanaging.',
      },
      {
        icon: 'Package',
        title: 'Inventory & Profit',
        desc: 'Track products, purchase prices, selling prices, and margins. Get automatic low-stock alerts before you lose a sale. Built for sellers and product businesses.',
      },
      {
        icon: 'Clock',
        title: 'Time & Productivity',
        desc: 'Log your daily activities and see exactly where your time goes. Productive, waste, neutral — the truth about your day, quantified.',
      },
      {
        icon: 'Target',
        title: 'Goals & Targets',
        desc: 'Set annual financial and productivity goals. Track your progress visually. Turn ambition into measurable milestones.',
      },
      {
        icon: 'Brain',
        title: 'AI Business Advisor',
        desc: 'Powered by Google Gemini and Claude AI. NEXUS reads your real data and delivers sharp, specific, personalized insights — in your language. Not generic tips. Your advice.',
      },
    ],
    aiTitle: 'Your Personal AI Business Advisor',
    aiDesc: 'NEXUS doesn\'t just show you data — it interprets it. The AI advisor analyzes your actual transactions, project velocity, client activity, and time patterns, then delivers 3 sharp, actionable insights every time you ask.',
    aiFeatures: [
      'Personalized to your real numbers, not averages',
      'Available in English, French, and Arabic',
      'Powered by Google Gemini 1.5 Flash',
      'Updates with every new report you generate',
    ],
    forTitle: 'Built For You — Whoever You Are',
    personas: [
      {
        title: 'Freelancers & Consultants',
        desc: 'Track client payments, log your hours, manage project deadlines, and understand your true hourly rate — all without hiring an accountant.',
      },
      {
        title: 'E-commerce & Sellers',
        desc: 'Monitor inventory levels, track product margins, record sales transactions, and get alerts before you run out of stock. Seller Mode gives you a dedicated dashboard.',
      },
      {
        title: 'Agencies & Small Teams',
        desc: 'Coordinate multiple clients, manage your team, oversee budgets, and get a bird\'s eye view of all active projects — across every client, every week.',
      },
    ],
    valuesTitle: 'What We Stand For',
    values: [
      { icon: 'Shield', title: 'Privacy First', desc: 'Your data never leaves your account. No ads, no selling your information.' },
      { icon: 'Globe', title: 'Built for Everyone', desc: 'Full RTL support for Arabic. Three languages. One seamless experience.' },
      { icon: 'Sparkles', title: 'Clarity Over Complexity', desc: 'Every feature is designed to make things simpler, not add more noise.' },
      { icon: 'CheckCircle2', title: 'Honest Advice', desc: 'AI insights based on your real data — not sugar-coated, not generic.' },
    ],
    statsTitle: 'Designed to Scale With You',
    stats: [
      { value: '3', label: 'Languages supported', sub: 'English, French, Arabic' },
      { value: '8+', label: 'Core modules', sub: 'Finance to AI insights' },
      { value: '100%', label: 'Data privacy', sub: 'Your data stays yours' },
      { value: '∞', label: 'Growth potential', sub: 'From freelancer to agency' },
    ],
    ctaTitle: 'Ready to take control of your business?',
    ctaDesc: 'Join NEXUS today. Free trial. No credit card required.',
    ctaBtn: 'Start Free — It\'s Free',
    ctaLogin: 'Already have an account?',
  },
  fr: {
    badge: 'À propos de NEXUS',
    heroTitle: 'Nous avons construit\nl\'outil qu\'il nous fallait.',
    heroSub: 'NEXUS est bien plus qu\'un tableau de bord — c\'est un système d\'exploitation complet pour les entrepreneurs modernes, freelances et entreprises en croissance.',
    problemTitle: 'Le Problème',
    problemDesc: 'La plupart des chefs d\'entreprise passent des heures chaque semaine à jongler entre les feuilles de calcul, les applications bancaires, les messageries et les post-its. Rien ne communique. Rien ne donne une image claire. Vous réagissez toujours — jamais vraiment aux commandes.',
    problemQuote: '"J\'avais du chiffre d\'affaires, mais je ne savais pas si j\'étais vraiment rentable."',
    solutionTitle: 'La Solution NEXUS',
    solutionDesc: 'Une plateforme intelligente qui regroupe vos finances, clients, projets, équipe, inventaire et analyses IA. Conçue pour la clarté, la rapidité et de vraies décisions d\'affaires.',
    whatTitle: 'Qu\'est-ce que NEXUS ?',
    whatDesc: 'NEXUS est une plateforme de gestion d\'entreprise propulsée par l\'IA, conçue pour les freelances, solopreneurs, PME et agences. Elle combine le suivi financier, la gestion de projets, la supervision d\'équipe, le contrôle des stocks et des analyses IA intelligentes — tout dans une interface élégante, disponible en anglais, français et arabe.',
    modulesTitle: 'Tout ce dont vous avez besoin. Un seul endroit.',
    modules: [
      {
        icon: 'Wallet',
        title: 'Finances Intelligentes',
        desc: 'Suivez chaque transaction, surveillez votre trésorerie en temps réel et comprenez où va votre argent. Connaissez votre marge bénéficiaire en un coup d\'œil — pas en fin de trimestre.',
      },
      {
        icon: 'Users',
        title: 'Gestion des Clients',
        desc: 'Gérez toute votre clientèle — coordonnées, soldes de facturation, historique des projets et paiements en attente. Ne perdez plus jamais le fil de qui doit quoi.',
      },
      {
        icon: 'FolderKanban',
        title: 'Hub de Projets',
        desc: 'Créez, suivez et clôturez vos projets avec une visibilité réelle sur leur avancement. Assignez des clients, fixez des délais et faites avancer le travail — efficacement.',
      },
      {
        icon: 'Users',
        title: 'Équipe & Employés',
        desc: 'Ajoutez votre équipe, suivez les performances, gérez les salaires et les statuts de paiement. Sachez qui livre et qui a besoin de soutien — sans micromanagement.',
      },
      {
        icon: 'Package',
        title: 'Stock & Profit',
        desc: 'Suivez les produits, prix d\'achat, prix de vente et marges. Recevez des alertes automatiques avant d\'être en rupture de stock. Idéal pour les vendeurs et commerces.',
      },
      {
        icon: 'Clock',
        title: 'Temps & Productivité',
        desc: 'Journalisez vos activités quotidiennes et voyez exactement où va votre temps. Productif, gaspillé, neutre — la vérité sur votre journée, quantifiée.',
      },
      {
        icon: 'Target',
        title: 'Objectifs & Cibles',
        desc: 'Fixez des objectifs financiers et de productivité annuels. Suivez votre progression visuellement. Transformez l\'ambition en jalons mesurables.',
      },
      {
        icon: 'Brain',
        title: 'Conseiller IA',
        desc: 'Propulsé par Google Gemini et Claude AI. NEXUS lit vos vraies données et livre des analyses précises et personnalisées — dans votre langue. Pas des conseils génériques. Vos conseils.',
      },
    ],
    aiTitle: 'Votre Conseiller d\'Affaires IA Personnel',
    aiDesc: 'NEXUS ne se contente pas d\'afficher des données — il les interprète. Le conseiller IA analyse vos transactions réelles, la vélocité de vos projets, l\'activité client et vos habitudes de temps, puis livre 3 analyses précises et actionnables à chaque demande.',
    aiFeatures: [
      'Personnalisé à vos vrais chiffres, pas des moyennes',
      'Disponible en anglais, français et arabe',
      'Propulsé par Google Gemini 1.5 Flash',
      'Se met à jour à chaque nouveau rapport généré',
    ],
    forTitle: 'Conçu Pour Vous — Qui Que Vous Soyez',
    personas: [
      {
        title: 'Freelances & Consultants',
        desc: 'Suivez les paiements clients, journalisez vos heures, gérez les délais de projets et comprenez votre vrai taux horaire — sans embaucher un comptable.',
      },
      {
        title: 'E-commerce & Vendeurs',
        desc: 'Surveillez les niveaux de stock, suivez les marges produits, enregistrez les transactions de vente et recevez des alertes avant la rupture. Le Mode Vendeur vous offre un tableau de bord dédié.',
      },
      {
        title: 'Agences & Petites Équipes',
        desc: 'Coordonnez plusieurs clients, gérez votre équipe, supervisez les budgets et obtenez une vue d\'ensemble de tous les projets actifs — pour chaque client, chaque semaine.',
      },
    ],
    valuesTitle: 'Ce En Quoi Nous Croyons',
    values: [
      { icon: 'Shield', title: 'Confidentialité d\'Abord', desc: 'Vos données ne quittent jamais votre compte. Pas de publicité, pas de revente.' },
      { icon: 'Globe', title: 'Conçu Pour Tous', desc: 'Support RTL complet pour l\'arabe. Trois langues. Une expérience fluide.' },
      { icon: 'Sparkles', title: 'Clarté sur la Complexité', desc: 'Chaque fonctionnalité est conçue pour simplifier, pas ajouter du bruit.' },
      { icon: 'CheckCircle2', title: 'Conseils Honnêtes', desc: 'Des analyses IA basées sur vos vraies données — sans embellissement ni généralité.' },
    ],
    statsTitle: 'Conçu Pour Évoluer Avec Vous',
    stats: [
      { value: '3', label: 'Langues supportées', sub: 'Anglais, Français, Arabe' },
      { value: '8+', label: 'Modules principaux', sub: 'Des finances aux insights IA' },
      { value: '100%', label: 'Confidentialité', sub: 'Vos données vous appartiennent' },
      { value: '∞', label: 'Potentiel de croissance', sub: 'Du freelance à l\'agence' },
    ],
    ctaTitle: 'Prêt à reprendre le contrôle de votre business ?',
    ctaDesc: 'Rejoignez NEXUS aujourd\'hui. Essai gratuit. Sans carte bancaire.',
    ctaBtn: 'Commencer Gratuitement',
    ctaLogin: 'Déjà un compte ?',
  },
  ar: {
    badge: 'حول NEXUS',
    heroTitle: 'بنينا الأداة\nالتي كنا نحتاجها دائماً.',
    heroSub: 'NEXUS أكثر من مجرد لوحة تحكم — إنه نظام تشغيل أعمال متكامل للرياديين العصريين والمستقلين والشركات النامية.',
    problemTitle: 'المشكلة',
    problemDesc: 'معظم أصحاب الأعمال يضيعون ساعات كل أسبوع موزعين بين جداول البيانات وتطبيقات البنوك وأدوات المراسلة والملاحظات اللاصقة. لا شيء يتحدث مع الآخر. لا شيء يعطيك صورة واضحة. أنت دائماً رد فعل — لست أبداً في السيطرة.',
    problemQuote: '"كان لدي إيرادات، لكنني لم أكن أعرف إذا كنت فعلاً مربحاً."',
    solutionTitle: 'حل NEXUS',
    solutionDesc: 'منصة ذكية واحدة تجمع ماليتك وعملاءك ومشاريعك وفريقك ومخزونك وتحليلات الذكاء الاصطناعي. مبنية من أجل الوضوح والسرعة وقرارات الأعمال الحقيقية.',
    whatTitle: 'ما هو NEXUS؟',
    whatDesc: 'NEXUS منصة إدارة أعمال مدعومة بالذكاء الاصطناعي، مصممة للمستقلين وأصحاب المشاريع الفردية والشركات الصغيرة والمتوسطة والوكالات. تجمع تتبع الماليات وإدارة المشاريع والإشراف على الفريق والتحكم في المخزون والتحليلات الذكية — كل ذلك في واجهة واحدة أنيقة، متاحة بالإنجليزية والفرنسية والعربية.',
    modulesTitle: 'كل ما تحتاجه. في مكان واحد.',
    modules: [
      {
        icon: 'Wallet',
        title: 'الماليات الذكية',
        desc: 'تتبع كل معاملة، راقب التدفق النقدي في الوقت الفعلي، وافهم أين يذهب مالك. اعرف هامش ربحك بنظرة واحدة — لا في نهاية الربع.',
      },
      {
        icon: 'Users',
        title: 'إدارة العملاء',
        desc: 'أدر قاعدة عملائك بالكامل — معلومات الاتصال، أرصدة الفواتير، تاريخ المشاريع والمدفوعات المعلقة. لا تفقد أبداً سجل من يدين بماذا.',
      },
      {
        icon: 'FolderKanban',
        title: 'مركز المشاريع',
        desc: 'أنشئ مشاريعك، تابعها وأغلقها مع رؤية حقيقية للتقدم. عيّن العملاء، حدد المواعيد النهائية، وأنجز العمل — بكفاءة.',
      },
      {
        icon: 'Users',
        title: 'الفريق والموظفون',
        desc: 'أضف فريقك، تابع الأداء، أدر الرواتب وحالات الدفع. اعرف من يُنجز ومن يحتاج دعماً — دون إدارة تفصيلية مرهقة.',
      },
      {
        icon: 'Package',
        title: 'المخزون والأرباح',
        desc: 'تتبع المنتجات وأسعار الشراء والبيع والهوامش. احصل على تنبيهات تلقائية للمخزون المنخفض قبل أن تخسر بيعاً. مثالي للبائعين والتجار.',
      },
      {
        icon: 'Clock',
        title: 'الوقت والإنتاجية',
        desc: 'سجّل أنشطتك اليومية وشاهد بالضبط أين يذهب وقتك. منتج، مهدر، محايد — حقيقة يومك بالأرقام.',
      },
      {
        icon: 'Target',
        title: 'الأهداف والنتائج',
        desc: 'حدد أهدافاً مالية وإنتاجية سنوية. تابع تقدمك بصرياً. حوّل الطموح إلى معالم قابلة للقياس.',
      },
      {
        icon: 'Brain',
        title: 'المستشار الذكي',
        desc: 'مدعوم بـ Google Gemini و Claude AI. يقرأ NEXUS بياناتك الحقيقية ويقدم تحليلات دقيقة وشخصية — بلغتك. ليست نصائح عامة. نصائحك أنت.',
      },
    ],
    aiTitle: 'مستشارك الذكي الشخصي للأعمال',
    aiDesc: 'NEXUS لا يكتفي بعرض البيانات — بل يفسّرها. يحلل المستشار الذكي معاملاتك الفعلية، سرعة مشاريعك، نشاط العملاء وأنماط وقتك، ثم يقدم 3 تحليلات حادة وقابلة للتنفيذ في كل مرة تطلبها.',
    aiFeatures: [
      'مخصص لأرقامك الحقيقية، لا المتوسطات',
      'متاح بالإنجليزية والفرنسية والعربية',
      'مدعوم بـ Google Gemini 1.5 Flash',
      'يتحدث مع كل تقرير جديد تطلبه',
    ],
    forTitle: 'مبني لك — مهما كان مسارك',
    personas: [
      {
        title: 'المستقلون والمستشارون',
        desc: 'تابع مدفوعات العملاء، سجّل ساعاتك، أدر مواعيد المشاريع، وافهم معدلك الحقيقي بالساعة — دون الحاجة لمحاسب.',
      },
      {
        title: 'التجارة الإلكترونية والبائعون',
        desc: 'راقب مستويات المخزون، تابع هوامش المنتجات، سجّل معاملات البيع، واحصل على تنبيهات قبل نفاد المخزون. وضع البائع يمنحك لوحة تحكم مخصصة.',
      },
      {
        title: 'الوكالات والفرق الصغيرة',
        desc: 'نسّق بين عدة عملاء، أدر فريقك، أشرف على الميزانيات، واحصل على نظرة شاملة لجميع المشاريع النشطة — لكل عميل، كل أسبوع.',
      },
    ],
    valuesTitle: 'ما نؤمن به',
    values: [
      { icon: 'Shield', title: 'الخصوصية أولاً', desc: 'بياناتك لا تغادر حسابك أبداً. لا إعلانات، لا بيع معلومات.' },
      { icon: 'Globe', title: 'مبني للجميع', desc: 'دعم كامل للنص من اليمين لليسار. ثلاث لغات. تجربة واحدة سلسة.' },
      { icon: 'Sparkles', title: 'الوضوح على التعقيد', desc: 'كل ميزة مصممة لتبسيط الأمور، لا لإضافة ضجيج.' },
      { icon: 'CheckCircle2', title: 'نصائح صادقة', desc: 'تحليلات ذكاء اصطناعي مبنية على بياناتك الحقيقية — بلا تجميل ولا عمومية.' },
    ],
    statsTitle: 'مصمم للنمو معك',
    stats: [
      { value: '3', label: 'لغات مدعومة', sub: 'الإنجليزية، الفرنسية، العربية' },
      { value: '8+', label: 'وحدات أساسية', sub: 'من الماليات إلى الذكاء الاصطناعي' },
      { value: '100%', label: 'خصوصية البيانات', sub: 'بياناتك تبقى ملكك' },
      { value: '∞', label: 'إمكانية النمو', sub: 'من مستقل إلى وكالة' },
    ],
    ctaTitle: 'مستعد لاستعادة السيطرة على أعمالك؟',
    ctaDesc: 'انضم إلى NEXUS اليوم. تجربة مجانية. بدون بطاقة بنكية.',
    ctaBtn: 'ابدأ مجاناً الآن',
    ctaLogin: 'لديك حساب بالفعل؟',
  },
}

const iconMap: Record<string, any> = {
  Wallet, Users, FolderKanban, Package, Clock, Target, Brain,
  Shield, Globe, Sparkles, CheckCircle2,
}

export default function AboutPage() {
  const { lang, t } = useTranslation()
  const c = content[lang as keyof typeof content] || content.en
  const isRtl = lang === 'ar'

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950" dir={isRtl ? 'rtl' : 'ltr'}>

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-text/5 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent2 rounded-xl flex items-center justify-center shadow-lg shadow-accent2/20">
              <Zap className="w-4 h-4 text-white fill-current" />
            </div>
            <span className="font-black font-outfit text-lg uppercase tracking-tight">NEXUS</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-text/60 hover:text-text transition-colors">{t('signIn')}</Link>
            <Link href="/register" className="btn-primary px-5 py-2 text-sm font-bold rounded-xl">{t('getStarted')}</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent2/8 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent1/8 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-accent2/10 text-accent2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8">
            <Zap className="w-3 h-3" />
            {c.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-outfit text-text leading-none tracking-tight whitespace-pre-line mb-8">
            {c.heroTitle}
          </h1>
          <p className="text-xl text-text/60 leading-relaxed max-w-2xl mx-auto">
            {c.heroSub}
          </p>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black text-danger uppercase tracking-widest mb-4">{c.problemTitle}</p>
            <p className="text-lg text-text/70 leading-relaxed mb-8">{c.problemDesc}</p>
            <blockquote className="border-l-4 border-accent2 pl-6 text-text/50 italic text-sm">
              {c.problemQuote}
            </blockquote>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-text/5">
            <p className="text-xs font-black text-accent2 uppercase tracking-widest mb-4">{c.solutionTitle}</p>
            <p className="text-lg text-text/70 leading-relaxed">{c.solutionDesc}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {['Finance', 'Clients', 'Projects', 'AI'].map(tag => (
                <div key={tag} className="flex items-center gap-2 bg-secondary/50 rounded-xl px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  <span className="text-sm font-bold text-text/70">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is NEXUS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-black text-accent2 uppercase tracking-widest mb-4">{c.whatTitle}</p>
          <p className="text-xl text-text/70 leading-relaxed">{c.whatDesc}</p>
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black font-outfit text-text text-center mb-16 tracking-tight">{c.modulesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.modules.map((mod, i) => {
              const Icon = iconMap[mod.icon] || Sparkles
              return (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-text/5 shadow-sm hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-accent2/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent2/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent2" />
                  </div>
                  <h3 className="font-black font-outfit text-text mb-2 uppercase tracking-tight text-sm">{mod.title}</h3>
                  <p className="text-xs text-text/60 leading-relaxed">{mod.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-gradient-to-br from-text to-text/80 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent2/20 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-accent2" />
              </div>
              <span className="text-xs font-black text-accent2 uppercase tracking-widest">AI Business Advisor</span>
            </div>
            <div className="space-y-4">
              {[
                { label: lang === 'ar' ? 'صافي الربح' : lang === 'fr' ? 'Bénéfice net' : 'Net Profit', value: '+$4,200', color: 'text-green-400' },
                { label: lang === 'ar' ? 'الإنتاجية' : lang === 'fr' ? 'Productivité' : 'Productivity', value: '87%', color: 'text-blue-400' },
                { label: lang === 'ar' ? 'العملاء النشطون' : lang === 'fr' ? 'Clients actifs' : 'Active Clients', value: '12', color: 'text-purple-400' },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60 text-sm font-semibold">{stat.label}</span>
                  <span className={`font-black ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-accent2/10 rounded-2xl border border-accent2/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent2" />
                <span className="text-xs font-black text-accent2 uppercase tracking-widest">
                  {lang === 'ar' ? 'تحليل الذكاء الاصطناعي' : lang === 'fr' ? 'Analyse IA' : 'AI Insight'}
                </span>
              </div>
              <p className="text-white/80 text-xs leading-relaxed">
                {lang === 'ar'
                  ? '"ربحيتك تبلغ 68٪ — أعلى من متوسط القطاع. فكر في توسيع قاعدة عملائك."'
                  : lang === 'fr'
                  ? '"Votre rentabilité est de 68% — au-dessus de la moyenne du secteur. Envisagez d\'élargir votre clientèle."'
                  : '"Your profitability is at 68% — above industry average. Consider expanding your client base."'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-black text-accent2 uppercase tracking-widest mb-4">{c.aiTitle}</p>
            <p className="text-lg text-text/70 leading-relaxed mb-8">{c.aiDesc}</p>
            <ul className="space-y-3">
              {c.aiFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-text/70 font-semibold">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* For Who */}
      <section className="py-24 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black font-outfit text-text text-center mb-16 tracking-tight">{c.forTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {c.personas.map((p, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-text/5 shadow-sm">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  i === 0 ? 'bg-accent2/10' : i === 1 ? 'bg-accent1/10' : 'bg-accent3/10'
                }`}>
                  {i === 0 ? <Users className={`w-6 h-6 text-accent2`} /> : i === 1 ? <Package className="w-6 h-6 text-accent1" /> : <BarChart3 className="w-6 h-6 text-accent3" />}
                </div>
                <h3 className="font-black font-outfit text-text mb-3 uppercase tracking-tight">{p.title}</h3>
                <p className="text-sm text-text/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black font-outfit text-text text-center mb-16 tracking-tight">{c.statsTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {c.stats.map((s, i) => (
              <div key={i} className="text-center p-8 bg-secondary/30 rounded-3xl">
                <p className="text-5xl font-black font-outfit text-accent2 mb-2">{s.value}</p>
                <p className="font-black text-text uppercase tracking-tight text-sm mb-1">{s.label}</p>
                <p className="text-xs text-text/40">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black font-outfit text-text text-center mb-16 tracking-tight">{c.valuesTitle}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {c.values.map((v, i) => {
              const Icon = iconMap[v.icon] || Sparkles
              return (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-text/5 shadow-sm text-center">
                  <div className="w-12 h-12 bg-accent2/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-accent2" />
                  </div>
                  <h3 className="font-black font-outfit text-text mb-2 text-sm uppercase tracking-tight">{v.title}</h3>
                  <p className="text-xs text-text/60 leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-accent2/5 via-transparent to-accent1/5" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-5xl font-black font-outfit text-text tracking-tight mb-6">{c.ctaTitle}</h2>
          <p className="text-xl text-text/60 mb-10">{c.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary px-10 py-4 text-base font-black rounded-2xl shadow-xl shadow-accent2/20 flex items-center gap-2 justify-center">
              {c.ctaBtn}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login" className="px-10 py-4 text-base font-bold rounded-2xl border border-text/10 hover:bg-secondary transition-colors">
              {c.ctaLogin}
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-text/40">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-success" /> {t('freeTrial')}</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-success" /> {t('noCardRequired')}</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-text/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent2 rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 text-white fill-current" />
            </div>
            <span className="font-black font-outfit text-sm uppercase">NEXUS</span>
          </div>
          <div className="flex gap-6 text-xs text-text/40 font-semibold">
            <Link href="/" className="hover:text-text transition-colors">{t('pricing')}</Link>
            <Link href="/login" className="hover:text-text transition-colors">{t('signIn')}</Link>
            <Link href="/register" className="hover:text-text transition-colors">{t('createAccount')}</Link>
          </div>
          <p className="text-xs text-text/30">© 2025 NEXUS. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
