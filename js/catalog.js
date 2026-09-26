/* ==========================================================================
   SVKM Connect — shared course catalogue
   --------------------------------------------------------------------------
   Single source of truth for colleges, courses and year labels. Loaded by
   discover.html, auth.html and profile.html so the three profile builders can
   never drift apart.

   KEEP IN SYNC with supabase-bot-fixtures.sql, which seeds two bots for every
   college x course x year combination listed below.
   ========================================================================== */
(function (global) {
  'use strict';

  const collegeLabels = {
    mithibai: 'Mithibai College of Arts, Chauhan Institute of Science & Amrutben Jivanlal College',
    'nm-commerce': 'Narsee Monjee College of Commerce and Economics (NM)',
    nmims: 'NMIMS (Deemed-to-be-University)',
    upg: 'Usha Pravin Gandhi College (UPG)',
    sbmp: 'Shri Bhagubhai Mafatlal Polytechnic (SBMP)',
    djsce: 'Dwarkadas J. Sanghvi College of Engineering (DJSCE)',
    jcl: 'Jitendra Chauhan College of Law (JCL)'
  };

  const collegeCourses = {
    /* the generic bucket used by the "All colleges" filter on discover.html */
    all: [
      ['bcom', 'B.Com'], ['bms', 'BMS'], ['baf', 'B.Com Accounting & Finance'], ['bbi', 'B.Com Banking & Insurance'],
      ['bba', 'BBA'], ['ba', 'B.A.'], ['bsc', 'B.Sc.'], ['bsc-it', 'B.Sc. IT'], ['bsc-aids', 'B.Sc. AI & Data Science'],
      ['bammc', 'B.A. Multimedia & Mass Communication'], ['btech-cse', 'B.Tech Computer Engineering'], ['llb', 'LL.B.']
    ],
    mithibai: [
      ['ba', 'B.A.'], ['bsc', 'B.Sc.'], ['bcom', 'B.Com.'], ['bms', 'BMS'], ['baf', 'B.Com. Accounting & Finance'],
      ['bfm', 'B.Com. Financial Markets'], ['bbi', 'B.Com. Banking & Insurance'], ['bia', 'B.Com. Investment Analysis'],
      ['bmf', 'B.Com. Management & Finance'], ['bammc', 'B.A. Multimedia & Mass Communication'], ['bsc-it', 'B.Sc. IT'],
      ['bsc-cs', 'B.Sc. Computer Science'], ['bsc-health', 'B.Sc. Health Sciences'], ['bsc-asda', 'B.Sc. Applied Statistics & Data Analytics'],
      ['bsc-psych', 'B.Sc. Psychology']
    ],
    'nm-commerce': [
      ['bcom', 'B.Com.'], ['baf', 'B.Com. Accounting & Finance'], ['bbi', 'B.Com. Banking & Insurance'],
      ['bfm', 'B.Com. Financial Markets'], ['bms', 'BMS'], ['bsc-it', 'B.Sc. IT'], ['bsc-aids-nm', 'B.Sc. AI & Data Science (Honours)'],
      ['bcom-cs', 'B.Com. Computer Systems'], ['bcom-ms', 'B.Com. Management Studies']
    ],
    nmims: [['bba-fin', 'BBA (Finance)'], ['bba', 'BBA'], ['bsc-fin', 'B.Sc. Finance'], ['bcom-hons', 'B.Com. (Hons.)']],
    upg: [
      ['bms', 'BMS'], ['bammc', 'B.A. Multimedia & Mass Communication'], ['bsc-it', 'B.Sc. IT'],
      ['bsc-aids', 'B.Sc. AI & Data Science'], ['bcom-ms', 'B.Com. (Management Studies)'], ['ba-ftnmp', 'B.A. Film, Television & New Media Production'],
      ['mcom', 'M.Com.'], ['msc-it', 'M.Sc. IT'], ['msc-aids', 'M.Sc. AI & Data Science'], ['ma', 'M.A.']
    ],
    sbmp: [
      ['dip-computer', 'Diploma in Computer Engineering'], ['dip-it', 'Diploma in Information Technology'], ['dip-civil', 'Diploma in Civil Engineering'],
      ['dip-mechanical', 'Diploma in Mechanical Engineering'], ['dip-electrical', 'Diploma in Electrical Engineering'], ['dip-plastics', 'Diploma in Plastics Engineering'],
      ['dip-chemical', 'Diploma in Chemical Engineering'], ['dip-extc', 'Diploma in Electronics & Telecommunication'], ['btech-computer', 'B.Tech Computer Engineering'],
      ['btech-it', 'B.Tech Information Technology'], ['btech-cse', 'B.Tech Computer Science & Engineering'], ['btech-ai', 'B.Tech CSE (AI & Machine Learning)']
    ],
    djsce: [
      ['btech-extc', 'B.Tech Electronics & Telecommunication'], ['btech-it', 'B.Tech Information Technology'], ['btech-computer', 'B.Tech Computer Engineering'],
      ['btech-mechanical', 'B.Tech Mechanical Engineering'], ['btech-ds', 'B.Tech CSE (Data Science)'], ['btech-aiml', 'B.Tech AI & Machine Learning'],
      ['btech-aids', 'B.Tech AI & Data Science'], ['btech-iot', 'B.Tech CSE (IoT & Cyber Security)'], ['mtech', 'M.Tech'], ['phd', 'Ph.D.']
    ],
    jcl: [['ba-llb', 'B.A. LL.B.'], ['bba-llb', 'B.B.A. LL.B.'], ['llb', 'LL.B.'], ['llm', 'LL.M.']]
  };

  const courseYears = {
    bsc: ['FY', 'SY', 'TY'], 'bsc-aids': ['FY', 'SY', 'TY'], 'bsc-aids-nm': ['FY', 'SY', 'TY', 'Honours Year (NEP)'],
    ba: ['FY', 'SY', 'TY'], bcom: ['FY', 'SY', 'TY', 'Honours Year (NEP)'], 'bcom-hons': ['FY', 'SY', 'TY', 'Honours Year'],
    bms: ['FY', 'SY', 'TY'], bba: ['FY', 'SY', 'TY'], 'bba-fin': ['FY', 'SY', 'TY'], baf: ['FY', 'SY', 'TY'], bbi: ['FY', 'SY', 'TY'],
    bfm: ['FY', 'SY', 'TY'], bia: ['FY', 'SY', 'TY'], bmf: ['FY', 'SY', 'TY'], 'bcom-cs': ['FY', 'SY', 'TY'], 'bcom-ms': ['FY', 'SY', 'TY'],
    'bsc-it': ['FY', 'SY', 'TY'], 'bsc-cs': ['FY', 'SY', 'TY'], 'bsc-health': ['FY', 'SY', 'TY'], 'bsc-asda': ['FY', 'SY', 'TY'], 'bsc-psych': ['FY', 'SY', 'TY'],
    bammc: ['FY', 'SY', 'TY'], 'ba-ftnmp': ['FY', 'SY', 'TY'], 'bsc-fin': ['Year 1', 'Year 2', 'Year 3'],
    'btech-computer': ['First Year', 'Second Year', 'Third Year', 'Final Year'], 'btech-it': ['First Year', 'Second Year', 'Third Year', 'Final Year'],
    'btech-cse': ['First Year', 'Second Year', 'Third Year', 'Final Year'], 'btech-ai': ['First Year', 'Second Year', 'Third Year', 'Final Year'],
    'btech-extc': ['First Year', 'Second Year', 'Third Year', 'Final Year'], 'btech-mechanical': ['First Year', 'Second Year', 'Third Year', 'Final Year'],
    'btech-ds': ['First Year', 'Second Year', 'Third Year', 'Final Year'], 'btech-aiml': ['First Year', 'Second Year', 'Third Year', 'Final Year'],
    'btech-aids': ['First Year', 'Second Year', 'Third Year', 'Final Year'], 'btech-iot': ['First Year', 'Second Year', 'Third Year', 'Final Year'],
    'dip-computer': ['First Year', 'Second Year', 'Third Year'], 'dip-it': ['First Year', 'Second Year', 'Third Year'], 'dip-civil': ['First Year', 'Second Year', 'Third Year'],
    'dip-mechanical': ['First Year', 'Second Year', 'Third Year'], 'dip-electrical': ['First Year', 'Second Year', 'Third Year'], 'dip-plastics': ['First Year', 'Second Year', 'Third Year'],
    'dip-chemical': ['First Year', 'Second Year', 'Third Year'], 'dip-extc': ['First Year', 'Second Year', 'Third Year'],
    llb: ['First Year', 'Second Year', 'Third Year'], 'ba-llb': ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Final Year'],
    'bba-llb': ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Final Year'], llm: ['Year 1', 'Year 2'], mtech: ['First Year', 'Final Year'],
    phd: ['Research Year 1', 'Research Year 2', 'Research Year 3'], mcom: ['Year 1', 'Year 2'], 'msc-it': ['Year 1', 'Year 2'], 'msc-aids': ['Year 1', 'Year 2'], ma: ['Year 1', 'Year 2']
  };

  /* Years arrive from the profile tables with their original casing, but the
     discover filter stores them slugified (e.g. "first-year"). Normalise both
     directions so lookups always hit. */
  function slugifyYear(year) {
    return String(year).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  function yearsFor(course) {
    return (courseYears[course] || []).map(year => ({ value: slugifyYear(year), label: year }));
  }
  function coursesFor(college) {
    return collegeCourses[college] || [];
  }
  function courseLabel(college, course) {
    const match = coursesFor(college).find(([value]) => value === course);
    return match ? match[1] : course || '';
  }

  const totalCourses = Object.keys(collegeCourses)
    .filter(key => key !== 'all')
    .reduce((sum, key) => sum + collegeCourses[key].length, 0);

  global.SVKM_CATALOG = {
    version: '2.0.0',
    collegeOrder: ['mithibai', 'nm-commerce', 'nmims', 'upg', 'sbmp', 'djsce', 'jcl'],
    collegeLabels,
    collegeCourses,
    courseYears,
    slugifyYear,
    coursesFor,
    yearsFor,
    courseLabel,
    totalCourses
  };
})(typeof window !== 'undefined' ? window : globalThis);
