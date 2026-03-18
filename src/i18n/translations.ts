// src/i18n/translations.ts
// Single source of truth for all UI strings.
// Add new keys here first, then reference in templates via t(lang, 'key').

export type Lang = 'en' | 'de';

export const translations = {
  en: {
    // Meta
    siteTitle: 'SystemShift — Coaching for IT Professionals',
    metaDescription: 'Systemic coaching for IT professionals ready to shift. By Lukas Ciszewski — 20+ years in IT, trained systemic coach.',

    // Header
    logoText: 'systemshift.coach',

    // Hero
    heroHeadline: "The system isn't broken.\nYou're just running the wrong one.",
    heroSub: 'Systemic coaching for IT professionals ready to shift.',
    heroCta: 'Book a free discovery call →',

    // Problem
    problemBody: "You're senior. You're capable. You've shipped things most people only read about. And still — something feels off. Maybe it's the burnout you keep patching. The promotion that didn't feel like you thought it would. The team you lead but can't quite reach. The gap between who you are at work and who you want to be.",
    problemPunchline: "That's not a productivity problem. It's a systems problem.",

    // What is systemic coaching
    whatTitle: 'What is systemic coaching?',
    whatBody: "Systemic coaching looks beyond habits and goals. It maps the whole system — your role, your relationships, your organization, your identity — and finds where it's stuck. Then we shift it.",

    // Who it's for
    whoTitle: "Who it's for",
    who1: 'Senior engineers and tech leads feeling the ceiling',
    who2: 'Engineering managers in transition (IC → lead → director)',
    who3: 'CTOs and founders carrying too much, alone',
    who4: 'Anyone in IT whose work has become their entire identity',

    // How it works
    howTitle: 'How it works',
    sessionSingle: 'Single session',
    sessionPackage: '6-session package',
    labelLanguage: 'Language',
    labelFormat: 'Format',
    languageValue: 'German or English',
    formatValue: 'Video call',
    sessionUnit: 'session',
    bookingCta: 'Book your free 30-min discovery call →',

    // About
    aboutTitle: 'About',
    aboutBody: 'I spent 20+ years in IT — as engineer, lead, and leader. I know the culture, the pressure, the identity traps. I\'m also a trained systemic coach. That combination is SystemShift.',

    // Footer
    footerBooking: 'Book a call ↗',
  },

  de: {
    // Meta
    siteTitle: 'SystemShift — Coaching für IT-Professionals',
    metaDescription: 'Systemisches Coaching für IT-Professionals, die bereit sind zur Veränderung. Von Lukas Ciszewski — 20+ Jahre IT, ausgebildeter systemischer Coach.',

    // Header
    logoText: 'systemshift.coach',

    // Hero
    heroHeadline: 'Das System ist nicht kaputt.\nDu fährst nur das falsche.',
    heroSub: 'Systemisches Coaching für IT-Professionals, die bereit sind zur Veränderung.',
    heroCta: 'Kostenloses Kennenlerngespräch buchen →',

    // Problem
    problemBody: 'Du bist senior. Du bist kompetent. Du hast Dinge umgesetzt, von denen andere nur lesen. Und trotzdem — irgendetwas stimmt nicht. Vielleicht ist es das Burnout, das du immer wieder patchst. Die Beförderung, die sich nicht so anfühlte wie erwartet. Das Team, das du führst, aber nicht wirklich erreichst. Die Lücke zwischen dem, wer du bei der Arbeit bist, und dem, wer du sein willst.',
    problemPunchline: 'Das ist kein Produktivitätsproblem. Es ist ein Systemproblem.',

    // What is systemic coaching
    whatTitle: 'Was ist systemisches Coaching?',
    whatBody: 'Systemisches Coaching schaut über Gewohnheiten und Ziele hinaus. Es kartiert das gesamte System — deine Rolle, deine Beziehungen, deine Organisation, deine Identität — und findet heraus, wo es feststeckt. Dann verschieben wir es.',

    // Who it's for
    whoTitle: 'Für wen ist das?',
    who1: 'Senior Engineers und Tech Leads, die an ihre Grenzen stoßen',
    who2: 'Engineering Manager in der Transition (IC → Lead → Director)',
    who3: 'CTOs und Gründer, die zu viel alleine tragen',
    who4: 'Alle in der IT, deren Arbeit zur gesamten Identität geworden ist',

    // How it works
    howTitle: 'Wie es funktioniert',
    sessionSingle: 'Einzelsitzung',
    sessionPackage: '6er-Paket',
    labelLanguage: 'Sprache',
    labelFormat: 'Format',
    languageValue: 'Deutsch oder Englisch',
    formatValue: 'Videogespräch',
    sessionUnit: 'Sitzung',
    bookingCta: 'Kostenloses 30-Min Kennenlerngespräch buchen →',

    // About
    aboutTitle: 'Über mich',
    aboutBody: 'Ich habe 20+ Jahre in der IT verbracht — als Engineer, Lead und Leader. Ich kenne die Kultur, den Druck, die Identitätsfallen. Ich bin außerdem ausgebildeter systemischer Coach. Diese Kombination ist SystemShift.',

    // Footer
    footerBooking: 'Gespräch buchen ↗',
  },
} as const;

/** Type-safe translation lookup */
export function t(lang: Lang, key: keyof typeof translations.en): string {
  return translations[lang][key];
}
