// clientt/app/data/chatbotData.js
//
// Prewritten Q&A bank for the CoinIQ chatbot.
// Matching strategy: lowercase the user's message and count how many
// keywords from each entry appear inside it. Whichever entry has the
// most keyword hits (at least 1) wins. No match -> fallback + suggestions.

export const SUGGESTED_QUESTION_IDS = ["exp1", "emi1", "sav1", "add_txn", "budget_rule"];

export const chatbotQA = [
  // ---------------- Expense Management ----------------
  {
    id: "exp1",
    question: "How can I manage my expenses better?",
    keywords: ["manage expense", "manage my expenses", "control spending", "control my spending", "spend less", "reduce spending", "expense management", "overspending", "spending too much", "manage money"],
    answer: "Here are a few simple habits that make a big difference: 1) Track every expense, even small ones — use the Transactions page here to log them. 2) Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings. 3) Review your spending weekly, not just at month-end. 4) Set category budgets (food, travel, shopping) and check them often.",
  },
  {
    id: "exp2",
    question: "What's the best way to categorize expenses?",
    keywords: ["categorize expense", "expense category", "categorise expense", "how to categorize"],
    answer: "Stick to broad categories like Food, Travel, Shopping, Bills, and Entertainment. Too many categories make tracking tedious and you'll stop doing it.",
  },
  {
    id: "exp3",
    question: "How do I reduce unnecessary spending?",
    keywords: ["reduce unnecessary spending", "unnecessary spending", "cut spending", "stop wasting money"],
    answer: "Review your last month's transactions and flag anything you don't remember or don't need — subscriptions, impulse buys, and food delivery are usually the biggest culprits.",
  },
  {
    id: "exp4",
    question: "What are fixed vs variable expenses?",
    keywords: ["fixed expense", "variable expense", "fixed vs variable", "fixed and variable"],
    answer: "Fixed expenses stay the same every month (rent, EMI, subscriptions). Variable expenses change (groceries, fuel, entertainment). Knowing the split helps you see what's actually flexible.",
  },
  {
    id: "exp5",
    question: "How much should I spend on food each month?",
    keywords: ["spend on food", "food budget", "food expense", "grocery budget"],
    answer: "A common guideline is 10–15% of your monthly income, but it varies by city and family size. Check your Food category total for the last 3 months to see your actual average.",
  },
  {
    id: "exp6",
    question: "How do I stop overspending on shopping?",
    keywords: ["stop overspending", "shopping too much", "impulse buy", "impulse shopping", "overspend on shopping"],
    answer: "Try a 24-hour rule: wait a day before any non-essential purchase over a set amount. It cuts a lot of impulse buying.",
  },
  {
    id: "exp7",
    question: "Can I set spending limits per category?",
    keywords: ["spending limit", "category limit", "set a limit", "budget limit per category"],
    answer: "Not yet in this version, but you can manually track a target and compare it against your category totals in the Transactions page.",
  },
  {
    id: "exp8",
    question: "How do I know if I'm overspending?",
    keywords: ["am i overspending", "know if overspending", "spending too much money"],
    answer: "If your monthly expenses consistently exceed your income, or your savings category shows ₹0, that's a clear sign. Check your monthly summary regularly.",
  },
  {
    id: "budget_rule",
    question: "What's the 50/30/20 rule?",
    keywords: ["50/30/20", "50 30 20", "budget rule", "good budget rule", "budgeting rule"],
    answer: "50% of your income for needs, 30% for wants, 20% for savings and debt. It's a simple starting framework — adjust the percentages to fit your situation.",
  },
  {
    id: "exp10",
    question: "How do I track shared or family expenses?",
    keywords: ["family expense", "shared expense", "track family spending", "split expenses"],
    answer: "Use the Family section of the app to log and view expenses shared with family members in one place.",
  },

  // ---------------- Budgeting ----------------
  {
    id: "bud1",
    question: "How do I create a monthly budget?",
    keywords: ["create a budget", "make a budget", "monthly budget", "build a budget"],
    answer: "Start with your total income, subtract fixed expenses (rent, EMI, bills), then split the rest between savings and discretionary spending using a rule like 50/30/20.",
  },
  {
    id: "bud2",
    question: "What's a zero-based budget?",
    keywords: ["zero-based budget", "zero based budget"],
    answer: "Every rupee of income is assigned a job — expenses, savings, or debt — so income minus allocations equals zero. It forces intentional spending.",
  },
  {
    id: "bud3",
    question: "How often should I review my budget?",
    keywords: ["review budget", "how often budget", "check my budget"],
    answer: "Weekly for spending checks, monthly for a full review and adjustment. Your habits and income can shift, so budgets shouldn't be static.",
  },
  {
    id: "bud4",
    question: "What if I go over budget one month?",
    keywords: ["over budget", "exceeded budget", "went over budget"],
    answer: "Don't panic — look at which category caused it, and adjust next month's plan. Occasional overshoots are normal; consistent ones need a habit change.",
  },
  {
    id: "bud5",
    question: "How do I budget with irregular income?",
    keywords: ["irregular income", "budget freelance", "variable income budget"],
    answer: "Budget off your lowest expected monthly income, and treat anything extra as a bonus to save or invest rather than spend.",
  },
  {
    id: "bud6",
    question: "Should students have a budget?",
    keywords: ["student budget", "budget for students", "college budget"],
    answer: "Yes — even a simple one. Track pocket money or stipend income against food, transport, and entertainment spending to build the habit early.",
  },
  {
    id: "bud7",
    question: "How do I budget for irregular expenses like festivals?",
    keywords: ["festival expense", "irregular expense", "occasional expense", "yearly expense budget"],
    answer: "Set aside a small fixed amount every month into a 'sinking fund' for these, so the expense doesn't blindside your regular budget.",
  },
  {
    id: "bud8",
    question: "What percentage of income should go to rent?",
    keywords: ["rent percentage", "how much rent", "rent budget", "rent income ratio"],
    answer: "A common rule of thumb is no more than 30% of your take-home income, though this varies a lot by city.",
  },
  {
    id: "bud9",
    question: "How do I budget as a couple or family?",
    keywords: ["couple budget", "family budget", "budget with partner", "budget together"],
    answer: "Agree on shared categories (rent, groceries, bills) and individual discretionary spending, then track shared expenses together using the Family section.",
  },
  {
    id: "bud10",
    question: "What's an emergency fund and how big should it be?",
    keywords: ["emergency fund", "emergency savings", "how big emergency fund"],
    answer: "It's savings set aside for unexpected costs like medical bills or job loss. Aim for 3–6 months of essential expenses, kept separate from regular savings.",
  },

  // ---------------- Savings ----------------
  {
    id: "sav1",
    question: "How can I save more money each month?",
    keywords: ["save more money", "how to save money", "increase savings", "save money each month"],
    answer: "Automate savings right when you get paid, cut unused subscriptions, and set a specific numbered goal — vague goals are easy to abandon.",
  },
  {
    id: "sav2",
    question: "What's the difference between saving and investing?",
    keywords: ["saving vs investing", "difference saving investing", "save or invest"],
    answer: "Saving is setting money aside safely for short-term needs. Investing puts money into assets like stocks or mutual funds aiming for growth over time, with more risk.",
  },
  {
    id: "sav3",
    question: "How much should I save from my salary?",
    keywords: ["how much to save", "save from salary", "percentage of salary save"],
    answer: "20% is a common target, but even 10% consistently is far better than an inconsistent higher amount. Start where you can and increase gradually.",
  },
  {
    id: "sav4",
    question: "What is compound interest?",
    keywords: ["compound interest", "compounding"],
    answer: "It's interest calculated on both your original amount and the interest already earned, so your money grows faster over time — the earlier you start, the bigger the effect.",
  },
  {
    id: "sav5",
    question: "How do I set a savings goal?",
    keywords: ["savings goal", "set a goal", "financial savings target"],
    answer: "Pick a specific amount and deadline (e.g. ₹1,00,000 in 12 months), then divide it into a monthly target you can track against your income.",
  },
  {
    id: "sav6",
    question: "Where should I keep my emergency fund?",
    keywords: ["keep emergency fund", "where emergency fund", "store emergency savings"],
    answer: "Somewhere safe and easily accessible, like a savings account or liquid fund — not locked into long-term investments you can't quickly withdraw.",
  },
  {
    id: "sav7",
    question: "How do I save for a big purchase like a car?",
    keywords: ["save for a car", "save for big purchase", "saving for a purchase"],
    answer: "Set a target amount and timeline, then automate a fixed monthly transfer toward it so it doesn't compete with everyday spending.",
  },
  {
    id: "sav8",
    question: "What's a recurring deposit?",
    keywords: ["recurring deposit", "rd account"],
    answer: "A bank scheme where you deposit a fixed amount every month for a set tenure and earn fixed interest — good for disciplined, short-to-medium term saving.",
  },
  {
    id: "sav9",
    question: "How do I save money on a tight budget?",
    keywords: ["tight budget savings", "save on low income", "save with little money"],
    answer: "Even small automated amounts (₹500–1000/month) build the habit. Focus on cutting one or two recurring costs rather than trying to overhaul everything at once.",
  },
  {
    id: "sav10",
    question: "Is it better to save or pay off debt first?",
    keywords: ["save or pay debt", "debt vs savings", "pay off debt first"],
    answer: "Generally, build a small emergency fund first (1 month's expenses), then prioritize paying off high-interest debt before aggressive saving or investing.",
  },

  // ---------------- EMI & Loans ----------------
  {
    id: "emi1",
    question: "How do I calculate my EMI?",
    keywords: ["calculate emi", "emi calculation", "how emi works", "find my emi"],
    answer: "EMI = [P × R × (1+R)^N] / [(1+R)^N − 1], where P is principal, R is monthly interest rate, and N is tenure in months. Use the EMI section here to calculate it instantly.",
  },
  {
    id: "emi2",
    question: "What factors affect my EMI amount?",
    keywords: ["emi factors", "affect emi", "emi amount depends"],
    answer: "Three things: loan amount, interest rate, and tenure. A longer tenure lowers your EMI but increases total interest paid.",
  },
  {
    id: "emi3",
    question: "Should I choose a longer or shorter loan tenure?",
    keywords: ["loan tenure", "shorter tenure", "longer tenure"],
    answer: "Shorter tenure means higher EMI but less total interest. Longer tenure eases monthly cash flow but costs more overall — balance based on what you can comfortably pay.",
  },
  {
    id: "emi4",
    question: "What happens if I miss an EMI payment?",
    keywords: ["miss emi", "missed emi payment", "emi default", "late emi"],
    answer: "You'll typically face a late fee, a hit to your credit score, and continued interest accrual. Contact your lender immediately if you expect to miss one.",
  },
  {
    id: "emi5",
    question: "Can I prepay my loan early?",
    keywords: ["prepay loan", "pay off loan early", "loan prepayment"],
    answer: "Yes, most loans allow prepayment, which reduces total interest paid. Check if your lender charges a prepayment penalty first.",
  },
  {
    id: "emi6",
    question: "What's the difference between flat rate and reducing balance interest?",
    keywords: ["flat rate interest", "reducing balance", "flat vs reducing"],
    answer: "Flat rate charges interest on the full principal throughout the tenure. Reducing balance charges interest only on the remaining principal — it's cheaper and more common for loans.",
  },
  {
    id: "emi7",
    question: "How do I set EMI reminders?",
    keywords: ["emi reminder", "loan reminder", "notify emi due"],
    answer: "This app can send you EMI reminder notifications automatically — check the EMI section to make sure your due dates are entered.",
  },
  {
    id: "emi8",
    question: "What documents do I need for a loan?",
    keywords: ["loan documents", "documents for loan", "papers needed loan"],
    answer: "Typically ID proof, address proof, income proof (salary slips or ITR), bank statements, and photographs. Requirements vary by lender and loan type.",
  },
  {
    id: "emi9",
    question: "What's a good credit score for a loan?",
    keywords: ["good credit score loan", "credit score for loan", "score needed for loan"],
    answer: "750 and above is generally considered good and gets you better interest rates. Below 650 may lead to rejection or higher rates.",
  },
  {
    id: "emi10",
    question: "How does a personal loan differ from a credit card loan?",
    keywords: ["personal loan vs credit card", "credit card loan", "personal loan difference"],
    answer: "Personal loans usually have lower interest rates and fixed EMIs over a set tenure. Credit card loans (or revolving credit) carry higher interest and more flexible but riskier repayment.",
  },
  {
    id: "emi11",
    question: "What's loan tenure?",
    keywords: ["what is loan tenure", "define tenure"],
    answer: "The total time period over which you repay a loan, usually expressed in months or years. Longer tenure means smaller EMIs but more total interest.",
  },
  {
    id: "emi12",
    question: "Can I get a loan with a low income?",
    keywords: ["loan low income", "loan with low salary"],
    answer: "Yes, but the loan amount will likely be smaller, and you may need a co-applicant or collateral depending on the lender's policy.",
  },
  {
    id: "emi13",
    question: "What's the difference between secured and unsecured loans?",
    keywords: ["secured loan", "unsecured loan", "secured vs unsecured"],
    answer: "Secured loans require collateral (like a house or car) and have lower interest rates. Unsecured loans (like personal loans) need no collateral but charge higher interest.",
  },
  {
    id: "emi14",
    question: "How is home loan EMI different from personal loan EMI?",
    keywords: ["home loan emi", "personal loan emi difference"],
    answer: "The calculation formula is the same, but home loans usually have lower interest rates and much longer tenures (up to 30 years) compared to personal loans.",
  },
  {
    id: "emi15",
    question: "What's a moratorium period on a loan?",
    keywords: ["moratorium period", "loan moratorium"],
    answer: "A period where you're not required to pay EMIs, often used during loan disbursement delays or specific hardship schemes — interest may still accrue during this time.",
  },
  {
    id: "emi16",
    question: "How do I improve my chances of loan approval?",
    keywords: ["loan approval chances", "get loan approved", "improve loan approval"],
    answer: "Maintain a good credit score, keep your debt-to-income ratio low, have stable income proof, and avoid multiple loan applications in a short period.",
  },
  {
    id: "emi17",
    question: "What is loan foreclosure?",
    keywords: ["loan foreclosure", "foreclose loan"],
    answer: "Paying off your entire remaining loan balance before the scheduled tenure ends, which reduces total interest but may include a foreclosure charge.",
  },

  // ---------------- Investments ----------------
  {
    id: "inv1",
    question: "What is a mutual fund?",
    keywords: ["mutual fund", "what is mutual fund"],
    answer: "A pool of money from many investors managed by a professional fund manager, invested in stocks, bonds, or other assets. It offers diversification without needing to pick individual stocks yourself.",
  },
  {
    id: "inv2",
    question: "What's SIP?",
    keywords: ["sip", "systematic investment plan"],
    answer: "A Systematic Investment Plan — investing a fixed amount into a mutual fund regularly (usually monthly), which builds discipline and benefits from rupee-cost averaging over time.",
  },
  {
    id: "inv3",
    question: "Should I invest in stocks or mutual funds?",
    keywords: ["stocks or mutual funds", "invest in stocks", "invest in mutual funds"],
    answer: "Mutual funds are generally better for beginners since they're professionally managed and diversified. Stocks require more research and carry higher individual risk.",
  },
  {
    id: "inv4",
    question: "What is diversification?",
    keywords: ["diversification", "diversify portfolio"],
    answer: "Spreading your investments across different assets (stocks, bonds, gold, etc.) so that a loss in one doesn't sink your entire portfolio.",
  },
  {
    id: "inv5",
    question: "How much risk should I take when investing?",
    keywords: ["investment risk", "how much risk", "risk tolerance"],
    answer: "It depends on your age, goals, and timeline. Generally, younger investors with longer timelines can afford more risk (equity-heavy), while those closer to their goal should shift to safer assets.",
  },
  {
    id: "inv6",
    question: "What's the difference between equity and debt funds?",
    keywords: ["equity fund", "debt fund", "equity vs debt"],
    answer: "Equity funds invest mainly in stocks — higher risk, higher potential return. Debt funds invest in bonds and fixed-income instruments — lower risk, more stable but modest returns.",
  },
  {
    id: "inv7",
    question: "When should I start investing?",
    keywords: ["when to start investing", "start investing early"],
    answer: "As early as possible. Thanks to compounding, starting even a few years earlier can significantly increase your final returns, even with smaller amounts.",
  },
  {
    id: "inv8",
    question: "What is a fixed deposit?",
    keywords: ["fixed deposit", "fd account"],
    answer: "A bank product where you deposit a lump sum for a fixed tenure and earn a guaranteed interest rate. It's low-risk but offers lower returns than market-linked investments.",
  },
  {
    id: "inv9",
    question: "How do I start investing with a small amount?",
    keywords: ["start investing small amount", "invest with little money"],
    answer: "Start a SIP in a mutual fund with as little as ₹500/month. Consistency matters more than the amount when you're starting out.",
  },
  {
    id: "inv10",
    question: "What's the safest investment option?",
    keywords: ["safest investment", "low risk investment"],
    answer: "Government-backed options like PPF, fixed deposits, and government bonds are considered among the safest, though they offer lower returns than equity.",
  },

  // ---------------- Receipts & OCR ----------------
  {
    id: "rec1",
    question: "How do I upload a receipt?",
    keywords: ["upload receipt", "add receipt", "scan receipt"],
    answer: "Go to the Receipts section and upload a photo of your bill. The app will automatically extract the amount, date, and category using OCR.",
  },
  {
    id: "add_txn",
    question: "How do I add a transaction?",
    keywords: ["add a transaction", "add transaction", "log a transaction", "create transaction", "new transaction"],
    answer: "Go to your Dashboard and use the Transaction Form — enter the amount, pick a category (like Food, Travel, or Shopping), select income or expense, and hit save. It'll instantly show up in your list and update your charts.",
  },
  {
    id: "rec2",
    question: "What is OCR?",
    keywords: ["what is ocr", "ocr meaning"],
    answer: "Optical Character Recognition — technology that reads text from images, letting the app automatically pull details like amount and date from a photographed receipt instead of you typing them manually.",
  },
  {
    id: "rec3",
    question: "Can I edit details extracted from a receipt?",
    keywords: ["edit receipt", "edit extracted details", "fix receipt data"],
    answer: "Yes, after the app extracts the data you can review and edit any field before saving it as a transaction.",
  },
  {
    id: "rec4",
    question: "What file types can I upload for receipts?",
    keywords: ["file types receipt", "receipt format", "image format receipt"],
    answer: "Standard image formats like JPG and PNG work best for accurate text extraction.",
  },
  {
    id: "rec5",
    question: "Why did my receipt scan get the wrong amount?",
    keywords: ["wrong receipt amount", "receipt scan error", "ocr got it wrong"],
    answer: "This can happen with blurry photos or unusual receipt formats. Try a clearer, well-lit photo, or edit the extracted amount manually before saving.",
  },
  {
    id: "rec6",
    question: "Does uploading a receipt automatically create a transaction?",
    keywords: ["receipt creates transaction", "automatic transaction from receipt"],
    answer: "Yes, once you confirm the extracted details, it's saved as a transaction and reflected in your dashboard and charts.",
  },

  // ---------------- Credit Score & Debt ----------------
  {
    id: "cs1",
    question: "What is a credit score?",
    keywords: ["what is credit score", "credit score meaning"],
    answer: "A numerical rating (typically 300–900) reflecting your creditworthiness, based on your repayment history, credit usage, and loan history. Higher scores mean better loan terms.",
  },
  {
    id: "cs2",
    question: "How can I improve my credit score?",
    keywords: ["improve credit score", "increase credit score", "boost credit score"],
    answer: "Pay EMIs and credit card bills on time, keep credit utilization below 30%, avoid too many loan applications, and maintain a healthy mix of credit types.",
  },
  {
    id: "cs3",
    question: "What is debt-to-income ratio?",
    keywords: ["debt to income", "debt-to-income ratio"],
    answer: "The percentage of your monthly income that goes toward debt payments. Lenders prefer this below 40% — lower means you have more room to take on and repay new debt.",
  },
  {
    id: "cs4",
    question: "How do I get out of debt faster?",
    keywords: ["get out of debt", "pay off debt faster", "clear debt quickly"],
    answer: "Try the avalanche method (pay off highest-interest debt first) or snowball method (pay off smallest debt first for motivation). Also avoid taking on new debt while paying off existing ones.",
  },
  {
    id: "cs5",
    question: "Is credit card debt bad?",
    keywords: ["credit card debt", "is credit card debt bad"],
    answer: "It can be, since interest rates are typically very high (30%+ annually) if you carry a balance. Pay your full statement amount each month to avoid this entirely.",
  },
  {
    id: "cs6",
    question: "What happens if I default on a loan?",
    keywords: ["default on loan", "loan default consequences"],
    answer: "Your credit score drops significantly, you may face legal action or asset seizure (for secured loans), and it becomes much harder to get credit in the future.",
  },
  {
    id: "cs7",
    question: "How many credit cards should I have?",
    keywords: ["how many credit cards", "number of credit cards"],
    answer: "There's no fixed number — what matters is managing whatever you have responsibly. More cards can help your credit mix but also increase risk of overspending.",
  },

  // ---------------- Taxes ----------------
  {
    id: "tax1",
    question: "How can I save on taxes?",
    keywords: ["save on taxes", "tax saving", "reduce taxes"],
    answer: "Common options include investments under Section 80C (like PPF, ELSS, life insurance), health insurance premiums under 80D, and home loan interest deductions — consult a tax advisor for your specific situation.",
  },
  {
    id: "tax2",
    question: "What is Section 80C?",
    keywords: ["section 80c", "80c deduction"],
    answer: "A section of the Income Tax Act allowing deductions up to ₹1.5 lakh for investments like PPF, ELSS mutual funds, life insurance premiums, and EPF contributions.",
  },
  {
    id: "tax3",
    question: "Do I need to file taxes if my income is low?",
    keywords: ["file taxes low income", "need to file taxes"],
    answer: "Filing requirements depend on your country's income threshold and rules — it's best to check current regulations or consult a tax professional for your exact situation.",
  },
  {
    id: "tax4",
    question: "What's the difference between old and new tax regimes?",
    keywords: ["old tax regime", "new tax regime", "tax regime difference"],
    answer: "Generally, the old regime allows more deductions and exemptions but has higher tax rates, while the new regime has lower rates but fewer deductions — the better choice depends on your specific deductions.",
  },
  {
    id: "tax5",
    question: "What is TDS?",
    keywords: ["what is tds", "tds meaning", "tax deducted at source"],
    answer: "Tax Deducted at Source — tax automatically deducted by your employer or bank before paying you, which is later adjusted against your total tax liability when you file returns.",
  },

  // ---------------- General App Usage ----------------
  {
    id: "app1",
    question: "How do I sign up?",
    keywords: ["sign up", "register account", "create account"],
    answer: "Click Sign Up on the homepage, enter your name, email, and password, and you're in. You can then start adding transactions right away.",
  },
  {
    id: "app2",
    question: "How do I log in?",
    keywords: ["log in", "login", "sign in"],
    answer: "Click Login on the homepage and enter your registered email and password.",
  },
  {
    id: "app3",
    question: "I forgot my password, what do I do?",
    keywords: ["forgot password", "reset password", "lost password"],
    answer: "Use the 'Forgot Password' option on the login page to reset it via your registered email.",
  },
  {
    id: "app4",
    question: "How do I view my spending charts?",
    keywords: ["spending chart", "view charts", "expense chart", "dashboard chart"],
    answer: "Your Dashboard automatically shows income vs. expense charts based on the transactions you've logged.",
  },
  {
    id: "app5",
    question: "Can I delete a transaction?",
    keywords: ["delete transaction", "remove transaction"],
    answer: "Yes, go to your Transaction List and use the delete option next to the entry you want to remove.",
  },
  {
    id: "app6",
    question: "How do I edit a transaction?",
    keywords: ["edit transaction", "update transaction", "change transaction"],
    answer: "Open the Transaction List, select the entry, and update the amount, category, or date as needed.",
  },
  {
    id: "app7",
    question: "What is the Family feature?",
    keywords: ["family feature", "family section"],
    answer: "It lets you track and view shared expenses with family members in one combined dashboard.",
  },
  {
    id: "app8",
    question: "How do EMI reminders work?",
    keywords: ["how emi reminders work", "emi notification"],
    answer: "Once you add a loan in the EMI section, the app schedules automatic email reminders before your due dates.",
  },
  {
    id: "app9",
    question: "Is my financial data secure?",
    keywords: ["data secure", "is my data safe", "security of data"],
    answer: "Your data is protected using authentication and standard security practices, but always use a strong, unique password for your account.",
  },
  {
    id: "app10",
    question: "Can I use this app on mobile?",
    keywords: ["use on mobile", "mobile app", "works on phone"],
    answer: "Yes, the app is responsive and works on mobile browsers, though a dedicated mobile app isn't available yet.",
  },

  // ---------------- Small Talk / General ----------------
  {
    id: "st1",
    question: "Hello",
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    answer: "Hi there! 👋 I'm your finance assistant. Ask me about expenses, savings, EMIs, or budgeting anytime.",
  },
  {
    id: "st2",
    question: "Thank you",
    keywords: ["thank you", "thanks", "thank u", "appreciate it"],
    answer: "You're welcome! Let me know if you have any other finance questions.",
  },
  {
    id: "st3",
    question: "What can you help me with?",
    keywords: ["what can you help", "what can you do", "how can you help"],
    answer: "I can help with expense tracking, budgeting, savings tips, EMI calculations, investments, credit scores, and using this app. Just ask!",
  },
  {
    id: "st4",
    question: "Who made this app?",
    keywords: ["who made this app", "who built this", "who created this app"],
    answer: "This is CoinIQ, a personal finance management app built to help you track expenses, manage EMIs, and grow your savings.",
  },
  {
    id: "st5",
    question: "Are you a real person?",
    keywords: ["are you real", "are you a bot", "are you human", "are you ai"],
    answer: "Nope, I'm an assistant built into CoinIQ to help answer your finance questions quickly!",
  },

  // ---------------- Miscellaneous Finance Concepts ----------------
  {
    id: "misc1",
    question: "What is inflation?",
    keywords: ["what is inflation", "inflation meaning"],
    answer: "The rate at which prices rise over time, reducing the purchasing power of your money. It's why keeping savings only in cash long-term loses value.",
  },
  {
    id: "misc2",
    question: "What is net worth?",
    keywords: ["net worth", "what is net worth"],
    answer: "The total value of everything you own (assets) minus everything you owe (liabilities/debt). It's a snapshot of your overall financial health.",
  },
  {
    id: "misc3",
    question: "What's the difference between gross and net income?",
    keywords: ["gross income", "net income", "gross vs net"],
    answer: "Gross income is your total earnings before deductions like tax. Net income is what you actually take home after deductions.",
  },
  {
    id: "misc4",
    question: "What is a financial goal?",
    keywords: ["financial goal", "money goal"],
    answer: "A specific, measurable target for your money — like saving ₹5 lakh in 2 years — that guides your budgeting and investment decisions.",
  },
  {
    id: "misc5",
    question: "How do I plan for retirement early?",
    keywords: ["plan for retirement", "retirement planning", "retire early"],
    answer: "Start investing in retirement-focused instruments (like PPF, NPS, or equity mutual funds) as early as possible — compounding rewards early starters significantly.",
  },
  {
    id: "misc6",
    question: "What is liquidity?",
    keywords: ["what is liquidity", "liquidity meaning"],
    answer: "How quickly an asset can be converted to cash without losing value. Savings accounts are highly liquid; real estate is not.",
  },
  {
    id: "misc7",
    question: "What's the difference between assets and liabilities?",
    keywords: ["assets and liabilities", "assets vs liabilities"],
    answer: "Assets are things you own that have value (savings, property, investments). Liabilities are what you owe (loans, credit card debt).",
  },
  {
    id: "misc8",
    question: "How do I build good financial habits?",
    keywords: ["financial habits", "good money habits", "build financial habits"],
    answer: "Start small: track every expense, automate savings, review your budget monthly, and avoid impulse purchases. Consistency matters more than perfection.",
  },
  {
    id: "misc9",
    question: "What is financial literacy?",
    keywords: ["financial literacy", "what is financial literacy"],
    answer: "Understanding how to manage money effectively — budgeting, saving, investing, and debt — so you can make informed financial decisions.",
  },
  {
    id: "misc10",
    question: "Bye",
    keywords: ["bye", "goodbye", "see you", "later"],
    answer: "Goodbye! Come back anytime you have finance questions. 👋",
  },
];

export const FALLBACK_ANSWER =
  "I don't understand that question. Here are some things I can help with:";