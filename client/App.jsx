import { useState } from 'react';
import { Activity, ArrowDownRight, ArrowUpRight, Bell, BookOpen, BrainCircuit, BriefcaseBusiness, CalendarDays, Check, ChevronDown, CircleHelp, Code2, Flame, GraduationCap, LayoutDashboard, Menu, MessageSquareText, Search, Settings, ShieldCheck, Sparkles, Target, Trophy, X } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const trend = [
  { day: 'Mon', solved: 4 }, { day: 'Tue', solved: 7 }, { day: 'Wed', solved: 5 },
  { day: 'Thu', solved: 9 }, { day: 'Fri', solved: 6 }, { day: 'Sat', solved: 11 }, { day: 'Sun', solved: 8 },
];
const initialTasks = [
  { id: 1, title: 'Solve 2 array problems', meta: 'DSA Arena · 25 min', done: true },
  { id: 2, title: 'Complete a logical reasoning test', meta: 'Aptitude Lab · 20 min', done: false },
  { id: 3, title: 'Revise DBMS normalization', meta: 'Interview Prep · 15 min', done: false },
];
const nav = [
  { label: 'Overview', icon: LayoutDashboard }, { label: 'DSA Arena', icon: Code2 },
  { label: 'Aptitude Lab', icon: BrainCircuit }, { label: 'Interview Prep', icon: MessageSquareText },
  { label: 'Company Hub', icon: BriefcaseBusiness }, { label: 'Study Planner', icon: CalendarDays },
];

export default function App() {
  const [active, setActive] = useState('Overview');
  const [tasks, setTasks] = useState(initialTasks);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const completed = tasks.filter(t => t.done).length;

  const changePage = label => {
    setActive(label);
    setMobileOpen(false);
    setNotice('');
  };

  return <div className="app-shell">
    {mobileOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><GraduationCap size={23}/></div><div><strong>PrepSphere</strong><span>CAREER COMMAND CENTER</span></div><button className="close-menu icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-list" aria-label="Main navigation">
        
      {nav.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => changePage(label)}><Icon size={18}/><span>{label}</span>{label === 'DSA Arena' && <span className="nav-count">24</span>}</button>)}
      </nav>
      <div className="sidebar-spacer" />
      <div className="streak-card"><div className="streak-icon"><Flame size={19}/></div><div><strong>7-day streak</strong><span>Keep the momentum going!</span></div><Sparkles size={17} className="streak-spark"/></div>
      <button className={`nav-item ${active === 'Settings' ? 'active' : ''}`} onClick={() => changePage('Settings')}><Settings size={18}/><span>Settings</span></button>
      <div className="sidebar-profile"><div className="avatar">ST</div><div className="profile-copy"><strong>Student User</strong><span>Placement aspirant</span></div><ChevronDown size={16} className="muted"/></div>
    </aside>

    <main className="main-content">
      <header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div></div><div className="topbar-actions"><label className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your workspace..."/><kbd>⌘ K</kbd></label><button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotice('You are all caught up — no new notifications.')}><Bell size={18}/><i/></button><div className="top-avatar">ST</div></div></header>
<div className="page-wrap">
        {notice && <div className="notice-banner"><CircleHelp size={17}/><span>{notice}</span><button className="icon-button" onClick={() => setNotice('')} aria-label="Dismiss message"><X size={16}/></button></div>}
        <section className="welcome-row"><div><div className="eyebrow"><span className="live-dot"/> YOUR CAREER JOURNEY</div><h1>{active === 'Overview' ? <>Your next opportunity<br className="desktop-break"/> starts <span>with today's progress.</span></> : active}</h1><p className="welcome-subtitle">Build skills, stay consistent, and get one step closer to your dream role.</p></div><button className="primary-button" onClick={() => changePage('Study Planner')}><Target size={17}/> View today's plan</button></section>

        {active === 'Overview' ? <><section className="stats-grid" aria-label="Progress overview">
          <StatCard icon={Code2} label="Problems solved" value="124" change="12 this week" positive />
          <StatCard icon={BrainCircuit} label="Mock accuracy" value="82%" change="6% vs last week" positive />
          <StatCard icon={Flame} label="Current streak" value="7 days" change="Personal best: 12" />
          <StatCard icon={Target} label="Weekly goals" value={`${completed}/3`} change={`${Math.round(completed / 3 * 100)}% completed`} progress={completed / 3 * 100} />
        </section>

        <section className="content-grid">
          <div className="panel performance-panel"><div className="panel-heading"><div><h2>Learning activity</h2><p>Your problem-solving consistency this week</p></div><button className="select-button" onClick={() => setNotice('Showing sample activity for the last 7 days.')}>This week <ChevronDown size={15}/></button></div><div className="chart-legend"><span><i/> Problems solved</span><strong>50 <small>total this week</small></strong></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{ top: 12, right: 5, left: -22, bottom: 0 }}><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a7bff" stopOpacity={0.3}/><stop offset="100%" stopColor="#9a7bff" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid stroke="#293044" strokeDasharray="4 5" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7e879d', fontSize: 12 }} dy={10}/><Tooltip contentStyle={{ background: '#171d2e', border: '1px solid #343b52', borderRadius: 10, color: '#f5f6ff' }} labelStyle={{ color: '#b9c0d5' }}/><Area type="monotone" dataKey="solved" name="Problems solved" stroke="#a78bfa" strokeWidth={2.5} fill="url(#chartFill)" activeDot={{ r: 5, fill: '#a78bfa', stroke: '#171d2e', strokeWidth: 3 }}/></AreaChart></ResponsiveContainer></div><div className="chart-footer"><span><ArrowUpRight size={15}/> Consistency is improving</span><span>Sample dashboard data</span></div></div>

          <div className="panel readiness-panel"><div className="panel-heading"><div><h2>Placement readiness</h2><p>Your preparation snapshot</p></div><button className="icon-button" aria-label="Readiness information" onClick={() => setNotice('Readiness is a demo indicator until real activity data is connected.')}><CircleHelp size={17}/></button></div><div className="readiness-score"><div className="score-ring"><div><strong>72<span>%</span></strong><small>READINESS</small></div></div><div className="score-copy"><strong>Good momentum!</strong><p>You're building a solid foundation. Keep practising to improve your score.</p></div></div><div className="skill-list"><Skill label="DSA practice" score={78}/><Skill label="Aptitude" score={84}/><Skill label="Interview prep" score={56}/></div><button className="secondary-button full-button" onClick={() => changePage('Interview Prep')}>Improve your skills <ArrowDownRight size={16}/></button></div>
        </section>

        <section className="bottom-grid"><div className="panel tasks-panel"><div className="panel-heading"><div><h2>Today's mission</h2><p>Small steps make a big difference</p></div><span className="task-count">{completed} of {tasks.length}</span></div><div className="task-list">{tasks.filter(t => !query || t.title.toLowerCase().includes(query.toLowerCase())).map(task => <button key={task.id} className={`task-row ${task.done ? 'task-done' : ''}`} onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}><span className="task-check">{task.done && <Check size={14}/>}</span><span className="task-copy"><strong>{task.title}</strong><small>{task.meta}</small></span><span className="task-arrow">↗</span></button>)}{tasks.filter(t => !query || t.title.toLowerCase().includes(query.toLowerCase())).length === 0 && <p className="empty-state">No tasks match your search.</p>}</div><button className="text-button" onClick={() => changePage('Study Planner')}>Open study planner <span>→</span></button></div>

          <div className="panel quick-panel"><div className="panel-heading"><div><h2>Quick launch</h2><p>Jump back into practice</p></div></div><div className="quick-links"><QuickLink icon={Code2} tint="purple" title="DSA Arena" subtitle="Continue solving" onClick={() => changePage('DSA Arena')}/><QuickLink icon={BrainCircuit} tint="blue" title="Aptitude test" subtitle="Test your speed" onClick={() => changePage('Aptitude Lab')}/><QuickLink icon={BriefcaseBusiness} tint="orange" title="Company prep" subtitle="Explore opportunities" onClick={() => changePage('Company Hub')}/></div></div></section>

        </> : <ModulePage active={active} query={query} setNotice={setNotice} />}
        <footer className="footer"><span>© 2026 PrepSphere</span><span><ShieldCheck size={14}/> Built for your next big opportunity</span></footer>
      </div>
    </main>
  </div>;
}

function StatCard({ icon: Icon, label, value, change, positive, progress }) { return <div className="stat-card"><div className="stat-top"><span className="stat-icon"><Icon size={18}/></span>{positive && <span className="trend-tag"><ArrowUpRight size={13}/></span>}</div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-change">{progress !== undefined ? <div className="mini-progress"><span style={{ width: `${progress}%` }}/></div> : positive ? <span className="positive-text"><ArrowUpRight size={14}/></span> : null}{change}</div></div>; }
function Skill({ label, score }) { return <div className="skill-row"><div className="skill-meta"><span>{label}</span><strong>{score}%</strong></div><div className="skill-track"><span style={{ width: `${score}%` }}/></div></div>; }
function QuickLink({ icon: Icon, tint, title, subtitle, onClick }) { return <button className="quick-link" onClick={onClick}><span className={`quick-icon ${tint}`}><Icon size={18}/></span><span className="quick-copy"><strong>{title}</strong><small>{subtitle}</small></span><span className="quick-chevron">↗</span></button>; }


const dsaProblems = [
  { id: 1, title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', platform: 'LeetCode' },
  { id: 2, title: 'Valid Parentheses', topic: 'Stack', difficulty: 'Easy', platform: 'LeetCode' },
  { id: 3, title: 'Best Time to Buy and Sell Stock', topic: 'Arrays', difficulty: 'Easy', platform: 'LeetCode' },
  { id: 4, title: 'Longest Substring Without Repeating Characters', topic: 'Strings', difficulty: 'Medium', platform: 'LeetCode' },
  { id: 5, title: 'Binary Tree Level Order Traversal', topic: 'Trees', difficulty: 'Medium', platform: 'LeetCode' },
  { id: 6, title: 'Climbing Stairs', topic: 'Dynamic Programming', difficulty: 'Easy', platform: 'LeetCode' },
  { id: 7, title: 'Number of Islands', topic: 'Graphs', difficulty: 'Medium', platform: 'LeetCode' },
  { id: 8, title: 'Merge K Sorted Lists', topic: 'Heap', difficulty: 'Hard', platform: 'LeetCode' },
];
const interviewQuestions = [
  { category: 'Java', level: 'Beginner', question: 'What is the difference between JDK, JRE and JVM?', answer: 'JDK is the development kit, JRE provides the runtime environment, and JVM executes Java bytecode.' },
  { category: 'DBMS', level: 'Intermediate', question: 'What is database normalization?', answer: 'Normalization organizes tables to reduce redundant data and improve data integrity.' },
  { category: 'Operating Systems', level: 'Intermediate', question: 'What is the difference between a process and a thread?', answer: 'A process is an executing program with its own resources; threads are execution units within a process that share its memory.' },
  { category: 'OOP', level: 'Beginner', question: 'Explain encapsulation with an example.', answer: 'Encapsulation bundles data and methods and controls access, for example private fields accessed through public methods.' },
  { category: 'Computer Networks', level: 'Intermediate', question: 'What is the difference between TCP and UDP?', answer: 'TCP provides reliable, ordered delivery; UDP is connectionless and has lower overhead.' },
  { category: 'HR', level: 'Beginner', question: 'Tell me about yourself.', answer: 'Structure your answer around your education, relevant skills, one project, and the role you are targeting.' },
];
const companies = [
  { name: 'TCS', tag: 'IT Services', rounds: 'Aptitude · Coding · Technical · HR', focus: 'Quantitative aptitude, programming fundamentals, DSA basics' },
  { name: 'Infosys', tag: 'IT Services', rounds: 'Assessment · Technical · HR', focus: 'Logical reasoning, pseudocode, problem solving' },
  { name: 'Accenture', tag: 'Consulting & Technology', rounds: 'Cognitive · Technical · Interview', focus: 'Communication, reasoning, coding fundamentals' },
  { name: 'Wipro', tag: 'IT Services', rounds: 'Online assessment · Interview', focus: 'Aptitude, verbal ability, OOP and projects' },
];
const aptitudeQuestions = [
  { q: 'A number is increased by 20% and then decreased by 20%. What is the net change?', options: ['No change', '4% decrease', '4% increase', '2% decrease'], correct: 1, explain: '100 becomes 120, then 120 × 0.8 = 96, so the net change is a 4% decrease.' },
  { q: 'If 5 workers finish a task in 12 days, how many days would 10 equally efficient workers take?', options: ['3 days', '6 days', '10 days', '24 days'], correct: 1, explain: 'Total work is 5 × 12 = 60 worker-days. 60 ÷ 10 = 6 days.' },
  { q: 'Choose the next number: 2, 6, 12, 20, 30, __', options: ['36', '40', '42', '44'], correct: 2, explain: 'The terms are n × (n + 1): 1×2, 2×3, …, 6×7 = 42.' },
  { q: 'A train travels 150 km in 3 hours. What is its average speed?', options: ['45 km/h', '50 km/h', '55 km/h', '60 km/h'], correct: 1, explain: 'Average speed = distance ÷ time = 150 ÷ 3 = 50 km/h.' },
];
function ModulePage({ active, query, setNotice }) {
  const [solved, setSolved] = useState([1, 2]);
  const [topic, setTopic] = useState('All topics');
  const [difficulty, setDifficulty] = useState('All levels');
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [revealed, setRevealed] = useState([]);
  const [planner, setPlanner] = useState([
    { id: 1, title: 'Solve 2 DSA problems', detail: '25 minutes · DSA Arena', done: false },
    { id: 2, title: 'Take an aptitude mini-test', detail: '15 minutes · Aptitude Lab', done: false },
    { id: 3, title: 'Revise DBMS normalization', detail: '20 minutes · Interview Prep', done: false },
    { id: 4, title: 'Review one target company', detail: '15 minutes · Company Hub', done: false },
  ]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All categories');
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [settings, setSettings] = useState({ reminders: true, weeklyReport: true, darkMode: true });
  const filteredProblems = dsaProblems.filter(p => (topic === 'All topics' || p.topic === topic) && (difficulty === 'All levels' || p.difficulty === difficulty) && `${p.title} ${p.topic}`.toLowerCase().includes(query.toLowerCase()));
  const filteredInterviews = interviewQuestions.filter(q => (filterCategory === 'All categories' || q.category === filterCategory) && `${q.question} ${q.category} ${q.answer}`.toLowerCase().includes(query.toLowerCase()));
  const titleMap = {
    'DSA Arena': ['DSA Arena', 'Build problem-solving consistency, one question at a time.'],
    'Aptitude Lab': ['Aptitude Lab', 'Practise under time pressure and learn from every answer.'],
    'Interview Prep': ['Interview Prep', 'Prepare clear, confident answers to common technical and HR questions.'],
    'Company Hub': ['Company Prep Hub', 'Explore hiring patterns and create a focused preparation plan.'],
    'Study Planner': ['Study Planner', 'Turn your placement goal into a realistic daily routine.'],
    'Settings': ['Settings', 'Manage your learning preferences.'],
  };
  const [title, subtitle] = titleMap[active] || [active, 'Your placement preparation workspace.'];
  const toggleSolved = id => setSolved(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
  const currentQuestion = aptitudeQuestions[quizIndex];
  const score = aptitudeQuestions.reduce((sum, q, i) => sum + (answers[i] === q.correct ? 1 : 0), 0);
  return <div className="module-page">
    <section className="module-intro"><div><div className="eyebrow"><span className="live-dot"/> PREPSPHERE WORKSPACE</div><h2>{title}</h2><p>{subtitle}</p></div><div className="module-intro-chip"><Sparkles size={16}/> Practice mode <span>·</span> Sample data</div></section>
    {active === 'DSA Arena' && <>
      <div className="module-metrics"><Metric label="Problems in library" value={dsaProblems.length} icon={Code2}/><Metric label="Marked solved" value={solved.length} icon={Check}/><Metric label="Remaining" value={dsaProblems.length-solved.length} icon={Target}/></div>
      <div className="panel module-panel"><div className="panel-heading"><div><h2>Problem library</h2><p>Tick a problem when you have solved it.</p></div><span className="task-count">{Math.round(solved.length/dsaProblems.length*100)}% complete</span></div>
        <div className="filter-row"><select value={topic} onChange={e=>setTopic(e.target.value)}><option>All topics</option>{[...new Set(dsaProblems.map(p=>p.topic))].map(t=><option key={t}>{t}</option>)}</select><select value={difficulty} onChange={e=>setDifficulty(e.target.value)}><option>All levels</option><option>Easy</option><option>Medium</option><option>Hard</option></select><span className="filter-hint">Search uses the top bar</span></div>
        <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Status</th><th>Problem</th><th>Topic</th><th>Difficulty</th><th>Platform</th></tr></thead><tbody>{filteredProblems.map(p=><tr key={p.id}><td><button className={`round-check ${solved.includes(p.id)?'checked':''}`} onClick={()=>toggleSolved(p.id)} aria-label="Toggle solved">{solved.includes(p.id)?<Check size={14}/>:null}</button></td><td><strong>{p.title}</strong></td><td>{p.topic}</td><td><span className={`difficulty ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span></td><td>{p.platform}</td></tr>)}</tbody></table>{!filteredProblems.length&&<p className="empty-state">No problems match these filters.</p>}</div>
      </div>
      <div className="panel module-panel"><div className="panel-heading"><div><h2>Recommended practice order</h2><p>Start with fundamentals before moving to advanced topics.</p></div></div><div className="recommendation-grid"><div><strong>01 · Arrays & Strings</strong><p>Build confidence with indexing, hashing and sliding windows.</p></div><div><strong>02 · Stack & Queue</strong><p>Practise common interview patterns and data flow.</p></div><div><strong>03 · Trees & Graphs</strong><p>Move into traversal, recursion and graph search.</p></div></div></div>
    </>}
    {active === 'Aptitude Lab' && <>
      <div className="module-metrics"><Metric label="Practice questions" value={aptitudeQuestions.length} icon={BrainCircuit}/><Metric label="Answered" value={Object.keys(answers).length} icon={Check}/><Metric label="Current score" value={`${score}/${aptitudeQuestions.length}`} icon={Target}/></div>
      <div className="panel quiz-panel"><div className="panel-heading"><div><h2>{testStarted ? (quizFinished?'Test results':'Quantitative aptitude mini-test') : 'Ready for a quick challenge?'}</h2><p>{testStarted ? (quizFinished?'Review your result and explanations.':`Question ${quizIndex+1} of ${aptitudeQuestions.length} · No timer in this demo`) : '4 sample questions covering common placement aptitude patterns.'}</p></div><span className="task-count">Practice test</span></div>
      {!testStarted ? <div className="quiz-start"><div className="quiz-start-icon"><BrainCircuit size={30}/></div><h3>Quick Aptitude Challenge</h3><p>Try a short set of quantitative and logical reasoning questions. Your answers are scored locally in this demo.</p><button className="primary-button" onClick={()=>setTestStarted(true)}>Start test <ArrowUpRight size={16}/></button></div> : quizFinished ? <div className="quiz-result"><div className="result-circle">{Math.round(score/aptitudeQuestions.length*100)}%</div><h3>{score>=3?'Great work!':'Good practice — keep going!'}</h3><p>You answered {score} out of {aptitudeQuestions.length} correctly.</p><div className="explanation-list">{aptitudeQuestions.map((q,i)=><div className="explanation-item" key={q.q}><strong>{i+1}. {q.q}</strong><p className={answers[i]===q.correct?'answer-correct':'answer-wrong'}>{answers[i]===q.correct?'Correct':'Review'} · {q.options[q.correct]}</p><small>{q.explain}</small></div>)}</div><button className="primary-button" onClick={()=>{setQuizIndex(0);setAnswers({});setQuizFinished(false);setTestStarted(false)}}>Try again</button></div> : <div className="quiz-question"><div className="quiz-progress"><span style={{width:`${(quizIndex+1)/aptitudeQuestions.length*100}%`}}/></div><span className="eyebrow">QUESTION {quizIndex+1}</span><h3>{currentQuestion.q}</h3><div className="option-list">{currentQuestion.options.map((o,i)=><button key={o} className={`quiz-option ${answers[quizIndex]===i?'selected':''}`} onClick={()=>setAnswers(prev=>({...prev,[quizIndex]:i}))}><span>{String.fromCharCode(65+i)}</span>{o}</button>)}</div><div className="quiz-actions"><button className="secondary-button" disabled={quizIndex===0} onClick={()=>setQuizIndex(i=>i-1)}>Previous</button>{quizIndex<aptitudeQuestions.length-1?<button className="primary-button" disabled={answers[quizIndex]===undefined} onClick={()=>setQuizIndex(i=>i+1)}>Next question</button>:<button className="primary-button" disabled={answers[quizIndex]===undefined} onClick={()=>setQuizFinished(true)}>Submit test</button>}</div></div>}
      </div>
    </>}
    {active === 'Interview Prep' && <div className="panel module-panel"><div className="panel-heading"><div><h2>Interview question bank</h2><p>Search, reveal model answers and bookmark questions.</p></div><span className="task-count">{filteredInterviews.length} questions</span></div><div className="filter-row"><select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)}><option>All categories</option>{[...new Set(interviewQuestions.map(q=>q.category))].map(c=><option key={c}>{c}</option>)}</select><span className="filter-hint">Use the search bar to find topics</span></div><div className="question-stack">{filteredInterviews.map((q,i)=><article className="question-card" key={q.question}><div className="question-meta"><span className="category-pill">{q.category}</span><span>{q.level}</span></div><h3>{q.question}</h3>{revealed.includes(q.question)&&<div className="model-answer"><strong>Suggested answer</strong><p>{q.answer}</p></div>}<div className="question-actions"><button className="text-button" onClick={()=>setRevealed(prev=>prev.includes(q.question)?prev.filter(x=>x!==q.question):[...prev,q.question])}>{revealed.includes(q.question)?'Hide answer':'Reveal answer'} →</button><button className="secondary-button" onClick={()=>setSavedQuestions(prev=>prev.includes(q.question)?prev.filter(x=>x!==q.question):[...prev,q.question])}>{savedQuestions.includes(q.question)?'★ Saved':'☆ Save question'}</button></div></article>)}</div>{!filteredInterviews.length&&<p className="empty-state">No questions match your search.</p>}</div>}
    {active === 'Company Hub' && <><div className="module-metrics"><Metric label="Company guides" value={companies.length} icon={BriefcaseBusiness}/><Metric label="Preparation rounds" value="4+" icon={Target}/><Metric label="Focus" value="Skill-based" icon={Activity}/></div><div className="company-grid">{companies.filter(c=>`${c.name} ${c.tag} ${c.focus}`.toLowerCase().includes(query.toLowerCase())).map(c=><article className="panel company-card" key={c.name}><div className="company-logo">{c.name.slice(0,1)}</div><div className="company-tag">{c.tag}</div><h3>{c.name}</h3><p className="company-rounds">{c.rounds}</p><div className="company-focus"><strong>Preparation focus</strong><p>{c.focus}</p></div><button className="primary-button" onClick={()=>setSelectedCompany(selectedCompany===c.name?null:c.name)}>{selectedCompany===c.name?'Hide checklist':'View checklist'} <ArrowUpRight size={15}/></button>{selectedCompany===c.name&&<div className="company-checklist"><strong>Suggested checklist</strong><p>□ Review company and role requirements</p><p>□ Practise 2 aptitude sets</p><p>□ Revise DSA and core CS subjects</p><p>□ Prepare 2 project explanations</p></div>}</article>)}</div>{!companies.some(c=>`${c.name} ${c.tag} ${c.focus}`.toLowerCase().includes(query.toLowerCase()))&&<p className="empty-state">No companies match your search.</p>}<p className="disclaimer">Company details are illustrative preparation guides, not a guarantee of current hiring criteria. Verify eligibility and rounds from official career pages.</p></>}
    {active === 'Study Planner' && <><div className="module-metrics"><Metric label="Daily tasks" value={planner.length} icon={CalendarDays}/><Metric label="Completed" value={planner.filter(t=>t.done).length} icon={Check}/><Metric label="Completion" value={`${Math.round(planner.filter(t=>t.done).length/planner.length*100)}%`} icon={Target}/></div><div className="panel module-panel"><div className="panel-heading"><div><h2>Today's plan</h2><p>Mark tasks complete as you finish them.</p></div><span className="task-count">{planner.filter(t=>t.done).length}/{planner.length} done</span></div><div className="planner-list">{planner.map(t=><button key={t.id} className={`planner-task ${t.done?'task-done':''}`} onClick={()=>setPlanner(prev=>prev.map(x=>x.id===t.id?{...x,done:!x.done}:x))}><span className="task-check">{t.done?<Check size={14}/>:null}</span><span className="task-copy"><strong>{t.title}</strong><small>{t.detail}</small></span><span className="task-arrow">{t.done?'Completed':'Mark done'}</span></button>)}</div><button className="secondary-button" onClick={()=>setPlanner(prev=>prev.map(t=>({...t,done:false})))}>Reset today's checklist</button></div><div className="panel module-panel"><h2>Suggested weekly routine</h2><div className="recommendation-grid"><div><strong>Mon–Tue</strong><p>DSA fundamentals and aptitude practice.</p></div><div><strong>Wed–Thu</strong><p>Core CS revision and interview questions.</p></div><div><strong>Fri–Sun</strong><p>Mock test, revision and project explanation practice.</p></div></div></div></>}
    {active === 'Settings' && <div className="panel module-panel"><div className="panel-heading"><div><h2>Learning preferences</h2><p>These settings are local demo preferences for now.</p></div><Settings size={20}/></div><div className="settings-list">{Object.entries({reminders:'Daily study reminders',weeklyReport:'Weekly progress summary',darkMode:'Dark dashboard theme'}).map(([key,label])=><label className="setting-row" key={key}><span><strong>{label}</strong><small>{key==='reminders'?'Keep your daily goals visible.':key==='weeklyReport'?'Review your weekly learning trends.':'Use the PrepSphere dark interface.'}</small></span><input type="checkbox" checked={settings[key]} onChange={e=>setSettings(prev=>({...prev,[key]:e.target.checked}))}/></label>)}</div><button className="primary-button" onClick={()=>setNotice('Demo preferences updated for this session.')}>Save preferences</button></div>}
  </div>;
}
function Metric({ label, value, icon: Icon }) { return <div className="stat-card module-metric"><div className="stat-top"><span className="stat-icon"><Icon size={18}/></span></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div></div>; }
