export const formulas = [
  {
    id: 1,
    name: 'הגדרת גבול של סדרה',
    latex:
      '\\forall \\varepsilon > 0, \\exists N \\in \\mathbb{N} : n > N \\Rightarrow |a_n - L| < \\varepsilon',
    description: 'במשולש ישר זווית, סכום ריבועי הניצבים שווה לריבוע היתר',
    tags: ['גאומטריה', 'משולשים', 'קלאסי'],
    proof: [
      {
        type: 'paragraph',
        content:
          'תהי סדרה $(a_n)$ ותהי $L \\in \\mathbb{R}$. נניח כי לכל $\\varepsilon > 0$ קיים $N \\in \\mathbb{N}$ כך שלכל $n > N$ מתקיים $|a_n - L| < \\varepsilon$.',
      },
      {
        type: 'equation',
        latex: '|a_n - L| < \\varepsilon',
      },
      {
        type: 'paragraph',
        content:
          'לפי הגדרת הגבול של סדרה, תנאי זה מבטיח שהאיברים של הסדרה מתקרבים כרצוננו אל $L$ החל ממקום מסוים ואילך.',
      },
      {
        type: 'step',
        title: 'בחירת אינדקס מתאים',
        content:
          'בהינתן $\\varepsilon > 0$, בוחרים $N$ כך שלכל $n > N$ מתקיים $|a_n - L| < \\varepsilon$.',
      },
      {
        type: 'step',
        title: 'הסקת ההתכנסות',
        content:
          'מכיוון שהתנאי מתקיים לכל $\\varepsilon > 0$, נובע כי $\\lim_{n \\to \\infty} a_n = L$.',
      },
    ],
    dependencies: [3, 6, 4, 8],
  },
  {
    id: 2,
    name: 'נוסחת הפתרון למשוואה ריבועית',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}',
    description: 'פתרון למשוואה ריבועית מהצורה ax² + bx + c = 0',
    proof: [
      {
        type: 'paragraph',
        content: 'יהי $f(x)$ פונקציה רציפה על $[a,b]$',
      },
      {
        type: 'equation',
        latex: "F'(x) = f(x)",
      },
      {
        type: 'paragraph',
        content: 'לפי הגדרת הנגזרת...',
      },
      {
        type: 'step',
        title: 'נשתמש במשפט ממוצע הדברים',
        content: 'קיים c כך שמתקיים...',
      },
    ],
    created_at: '2026-03-30',
    dependencies: [1, 3, 4, 5, 8],
    tags: ['אלגברה', 'משוואות', 'פולינומים'],
  },
  {
    id: 3,
    name: 'זהות אוילר',
    latex: 'e^{i\\pi} + 1 = 0',
    description: 'קשר יפהפה בין חמישה מהקבועים החשובים ביותר במתמטיקה',
    tags: ['אנליזה', 'מרוכבים', 'קלאסי'],
  },
  {
    id: 4,
    name: 'שטח מעגל',
    latex: 'A = \\pi r^2',
    description: 'שטח מעגל בעל רדיוס r',
    tags: ['גאומטריה', 'מעגלים'],
  },
  {
    id: 5,
    name: 'נגזרת של פונקציה מעריכית',
    latex: '\\frac{d}{dx}e^x = e^x',
    description: 'הנגזרת של e בחזקת x שווה לעצמה',
    tags: ['חשבון דיפרנציאלי', 'נגזרות', 'אנליזה'],
  },
  {
    id: 6,
    name: 'אינטגרל של סינוס',
    latex: '\\int \\sin(x)dx = -\\cos(x) + C',
    description: 'אינטגרל לא מסוים של פונקציית הסינוס',
    tags: ['חשבון אינטגרלי', 'טריגונומטריה', 'אנליזה'],
  },
  {
    id: 7,
    name: 'נוסחת אוילר למספרים מרוכבים',
    latex: 'e^{ix} = \\cos(x) + i\\sin(x)',
    description: 'קשר בין פונקציות אקספוננציאליות לטריגונומטריות',
    tags: ['מרוכבים', 'טריגונומטריה', 'אנליזה'],
  },
  {
    id: 8,
    name: 'סכום סדרה הנדסית',
    latex: 'S_n = a\\frac{1-r^n}{1-r}',
    description: 'סכום n האיברים הראשונים בסדרה הנדסית',
    tags: ['סדרות', 'אלגברה'],
  },
  {
    id: 9,
    name: 'נוסחת הקומבינציות',
    latex: '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}',
    description: 'מספר הדרכים לבחור k אלמנטים מתוך n',
    tags: ['קומבינטוריקה', 'הסתברות'],
  },
  {
    id: 10,
    name: 'משפט בייס',
    latex: 'P(A|B) = \\frac{P(B|A)P(A)}{P(B)}',
    description: 'חישוב הסתברות מותנית',
    tags: ['הסתברות', 'סטטיסטיקה'],
  },
  {
    id: 11,
    name: 'נפח כדור',
    latex: 'V = \\frac{4}{3}\\pi r^3',
    description: 'נפח כדור ברדיוס r',
    tags: ['גאומטריה', 'תלת ממד'],
  },
  {
    id: 12,
    name: 'כלל המכפלה לנגזרות',
    latex: "(fg)' = f'g + fg'",
    description: 'כלל לגזירת מכפלת שתי פונקציות',
    tags: ['חשבון דיפרנציאלי', 'נגזרות', 'אנליזה'],
  },
  {
    id: 13,
    name: 'כלל השרשרת',
    latex: "\\frac{d}{dx}f(g(x)) = f'(g(x))g'(x)",
    description: 'כלל לגזירת הרכבת פונקציות',
    tags: ['חשבון דיפרנציאלי', 'נגזרות', 'אנליזה'],
  },
  {
    id: 14,
    name: 'זהות טריגונומטרית בסיסית',
    latex: '\\sin^2(x) + \\cos^2(x) = 1',
    description: 'זהות יסודית בטריגונומטריה',
    tags: ['טריגונומטריה', 'קלאסי'],
  },
  {
    id: 15,
    name: 'סכום סדרה אינסופית',
    latex: '\\sum_{n=0}^{\\infty} ar^n = \\frac{a}{1-r}, \\quad |r| < 1',
    description: 'סכום סדרה הנדסית אינסופית',
    tags: ['סדרות', 'אנליזה'],
  },
]
