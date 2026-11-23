const subjects = [
 {name:"Mathematics",symbol:"∑",tone:"math",desc:"Numbers, functions and mathematical reasoning.",questions:[
  {q:"What is the value of 8 × 7?",o:["54","56","64","48"],a:1,e:"8 multiplied by 7 equals 56. Multiplication is repeated addition: 8 added seven times."},
  {q:"What is the square root of 144?",o:["10","11","12","14"],a:2,e:"12 × 12 = 144, so the principal square root of 144 is 12."},
  {q:"What is 25% of 200?",o:["25","40","50","75"],a:2,e:"25% means one quarter. 200 ÷ 4 = 50."},
  {q:"Which is an even number?",o:["17","21","29","32"],a:3,e:"An even number is divisible by 2 without a remainder. 32 ÷ 2 = 16."},
  {q:"What is the perimeter of a square with side 5 cm?",o:["10 cm","15 cm","20 cm","25 cm"],a:2,e:"Perimeter of a square = 4 × side. Therefore 4 × 5 = 20 cm."}
 ]},
 {name:"English",symbol:"Aa",tone:"english",desc:"Grammar, vocabulary and reading skills.",questions:[
  {q:"Choose the correct plural of 'child'.",o:["Childs","Childes","Children","Childrens"],a:2,e:"'Children' is the irregular plural form of 'child'."},
  {q:"Which word is a synonym of 'rapid'?",o:["Slow","Quick","Weak","Quiet"],a:1,e:"'Rapid' means happening quickly, so 'quick' is a synonym."},
  {q:"Choose the correct sentence.",o:["She go to class.","She goes to class.","She going class.","She gone to class."],a:1,e:"With third-person singular 'she' in the simple present, the verb takes -s: goes."},
  {q:"What is the opposite of 'ancient'?",o:["Old","Historic","Modern","Past"],a:2,e:"'Modern' means relating to the present or recent times, the opposite of ancient."},
  {q:"Identify the noun: 'The student reads a book.'",o:["Reads","The","Student","A"],a:2,e:"'Student' names a person, so it is a noun."}
 ]},
 {name:"Computer Science",symbol:"⌘",tone:"computer",desc:"Computer fundamentals and digital concepts.",questions:[
  {q:"What does CPU stand for?",o:["Central Processing Unit","Computer Personal Unit","Central Program Utility","Core Power Unit"],a:0,e:"CPU stands for Central Processing Unit. It executes instructions and performs core processing."},
  {q:"Which device is used to input text?",o:["Monitor","Keyboard","Speaker","Projector"],a:1,e:"A keyboard is an input device used to enter text and commands."},
  {q:"Which one is an operating system?",o:["Google Chrome","Microsoft Word","Windows","HTML"],a:2,e:"Windows is an operating system that manages computer hardware and software resources."},
  {q:"What does URL identify?",o:["A web address","A processor","A file size","A programming loop"],a:0,e:"URL means Uniform Resource Locator. It identifies the address of a resource on the web."},
  {q:"Which is a storage device?",o:["Mouse","RAM only","SSD","Microphone"],a:2,e:"An SSD (Solid State Drive) stores data persistently."}
 ]},
 {name:"Algebra",symbol:"x²",tone:"algebra",desc:"Expressions, equations and algebraic operations.",questions:[
  {q:"Solve: x + 5 = 12.",o:["5","6","7","8"],a:2,e:"Subtract 5 from both sides: x = 12 − 5 = 7."},
  {q:"Simplify: 3a + 2a.",o:["5","5a","6a","a5"],a:1,e:"Like terms are combined by adding coefficients: 3a + 2a = 5a."},
  {q:"If x = 4, what is 2x + 3?",o:["8","9","11","14"],a:2,e:"Substitute x = 4: 2(4) + 3 = 8 + 3 = 11."},
  {q:"What is the coefficient of y in 9y − 2?",o:["−2","2","9","y"],a:2,e:"The coefficient is the numerical factor multiplying the variable. Here it is 9."},
  {q:"Factorise: x² − 9.",o:["(x−9)(x+1)","(x−3)(x+3)","(x−3)²","(x+9)(x−1)"],a:1,e:"This is a difference of squares: a² − b² = (a−b)(a+b)."}
 ]},
 {name:"General Knowledge",symbol:"◎",tone:"general",desc:"General awareness, science and world knowledge.",questions:[
  {q:"What is the capital city of Pakistan?",o:["Karachi","Lahore","Islamabad","Peshawar"],a:2,e:"Islamabad is the capital city of Pakistan."},
  {q:"How many days are there in a leap year?",o:["364","365","366","367"],a:2,e:"A leap year has 366 days because February has 29 days."},
  {q:"Which planet is known as the Red Planet?",o:["Venus","Mars","Jupiter","Mercury"],a:1,e:"Mars appears reddish because iron minerals in its soil oxidize, or rust."},
  {q:"Which is the largest ocean on Earth?",o:["Atlantic","Indian","Arctic","Pacific"],a:3,e:"The Pacific Ocean is the largest and deepest of Earth's oceanic divisions."},
  {q:"What is the national language of Pakistan?",o:["Punjabi","Urdu","English","Sindhi"],a:1,e:"Urdu is the national language of Pakistan."}
 ]}
];
const schedule = [
 {date:"2026-12-02",subject:"Mathematics",time:"09:00 AM – 10:00 AM",duration:"60 minutes"},
 {date:"2026-12-04",subject:"English",time:"10:00 AM – 11:00 AM",duration:"60 minutes"},
 {date:"2026-12-07",subject:"Computer Science",time:"09:30 AM – 10:30 AM",duration:"60 minutes"},
 {date:"2026-12-09",subject:"Algebra",time:"11:00 AM – 12:00 PM",duration:"60 minutes"},
 {date:"2026-12-11",subject:"General Knowledge",time:"10:00 AM – 11:00 AM",duration:"60 minutes"}
];
const $ = id => document.getElementById(id);
let currentSubject=null, currentIndex=0, answers=[], timeLeft=300, timerHandle=null;
let results=JSON.parse(localStorage.getItem("caspamResults")||"[]");
let profile=JSON.parse(localStorage.getItem("caspamProfile")||'{"name":"Student","roll":""}');
const fmtDate = d => new Date(d+"T00:00:00").toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
function updateClock(){const d=new Date();$("clock").textContent=d.toLocaleTimeString("en-GB");$("todayDate").textContent=d.toLocaleDateString("en-GB",{weekday:"short",day:"2-digit",month:"short",year:"numeric"});}
setInterval(updateClock,1000);updateClock();$("year").textContent=new Date().getFullYear();
function showSection(id){document.querySelectorAll(".page-section").forEach(s=>s.classList.toggle("active",s.id===id));document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.section===id));$("pageName").textContent=({dashboard:"Dashboard",schedule:"Exam Schedule",subjects:"Subjects & Exams",results:"My Results",exam:"Live Examination",review:"Exam Review"})[id]||"Dashboard";$("sidebar").classList.remove("open");if(id==="results")renderResults();window.scrollTo({top:0,behavior:"smooth"});}
document.querySelectorAll("[data-section]").forEach(b=>b.addEventListener("click",()=>showSection(b.dataset.section)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showSection(b.dataset.go)));
$("menuToggle").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
function renderProfile(){ $("welcomeName").textContent=profile.name||"Student";$("avatarInitial").textContent=(profile.name||"S").trim().charAt(0).toUpperCase(); }
function openProfile(){ $("studentName").value=profile.name==="Student"?"":profile.name;$("rollNumber").value=profile.roll||"";$("profileModal").classList.remove("hidden");}
$("editProfile").addEventListener("click",openProfile);$("closeModal").addEventListener("click",()=>$("profileModal").classList.add("hidden"));
$("profileForm").addEventListener("submit",e=>{e.preventDefault();profile={name:$("studentName").value.trim(),roll:$("rollNumber").value.trim()};localStorage.setItem("caspamProfile",JSON.stringify(profile));renderProfile();$("profileModal").classList.add("hidden");});
if(!localStorage.getItem("caspamProfile"))openProfile();renderProfile();
function renderSchedule(){ $("scheduleRows").innerHTML=schedule.map(s=>`<tr><td>${fmtDate(s.date)}</td><td><strong>${s.subject}</strong></td><td>${s.time}</td><td>${s.duration}</td><td><span class="status">Practice session</span></td></tr>`).join("");$("miniSchedule").innerHTML=schedule.slice(0,3).map(s=>{let d=new Date(s.date+"T00:00:00");return `<div class="mini-item"><div class="date-block"><b>${d.getDate()}</b><small>${d.toLocaleDateString("en",{month:"short"}).toUpperCase()}</small></div><div><strong>${s.subject}</strong><span>${s.time} · ${s.duration}</span></div></div>`}).join("");}
function renderSubjects(){$("subjectGrid").innerHTML=subjects.map((s,i)=>`<article class="subject-card"><div class="subject-symbol ${s.tone}">${s.symbol}</div><h3>${s.name}</h3><p>${s.desc}</p><div class="card-bottom"><small>5 MCQs · 5 minutes</small><button class="btn btn-primary" onclick="startExam(${i})">Start exam →</button></div></article>`).join("");}
function updateDashboard(){const avg=results.length?Math.round(results.reduce((a,r)=>a+r.percent,0)/results.length):null;$("completedCount").textContent=results.length;$("averageScore").textContent=avg===null?"—":avg+"%";$("resultTotal").textContent=results.length;$("resultAverage").textContent=avg===null?"—":avg+"%";$("subjectCount").textContent=subjects.length;$("upcomingCount").textContent=schedule.length;}
function countdown(){const target=new Date(schedule[0].date+"T09:00:00");let diff=Math.max(0,target-new Date());let days=Math.floor(diff/86400000);diff%=86400000;let hours=Math.floor(diff/3600000);diff%=3600000;let mins=Math.floor(diff/60000);let secs=Math.floor(diff%60000/1000);$("cdDays").textContent=String(days).padStart(2,"0");$("cdHours").textContent=String(hours).padStart(2,"0");$("cdMins").textContent=String(mins).padStart(2,"0");$("cdSecs").textContent=String(secs).padStart(2,"0");}
setInterval(countdown,1000);countdown();
function startExam(i){currentSubject=subjects[i];currentIndex=0;answers=Array(currentSubject.questions.length).fill(null);timeLeft=300;showSection("exam");$("examSubject").textContent=currentSubject.name;renderQuestion();clearInterval(timerHandle);timerHandle=setInterval(()=>{timeLeft--;let m=Math.floor(timeLeft/60),s=timeLeft%60;$("examTimer").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");if(timeLeft<=0)finishExam();},1000);$("examTimer").textContent="05:00";}
window.startExam=startExam;
function renderQuestion(){const q=currentSubject.questions[currentIndex];$("questionProgress").textContent=`Question ${currentIndex+1} of ${currentSubject.questions.length}`;$("questionProgressBar").style.width=((currentIndex+1)/currentSubject.questions.length*100)+"%";$("questionText").textContent=q.q;$("optionsList").innerHTML=q.o.map((o,i)=>`<label class="option ${answers[currentIndex]===i?"selected":""}"><input type="radio" name="answer" value="${i}" ${answers[currentIndex]===i?"checked":""}><span>${String.fromCharCode(65+i)}.</span> ${o}</label>`).join("");document.querySelectorAll('input[name="answer"]').forEach(inp=>inp.addEventListener("change",()=>{answers[currentIndex]=Number(inp.value);renderQuestion();}));$("prevQuestion").disabled=currentIndex===0;$("prevQuestion").style.opacity=currentIndex===0?".45":"1";$("nextQuestion").classList.toggle("hidden",currentIndex===currentSubject.questions.length-1);$("submitExam").classList.toggle("hidden",currentIndex!==currentSubject.questions.length-1);$("answeredCount").textContent=answers.filter(a=>a!==null).length;}
$("prevQuestion").addEventListener("click",()=>{if(currentIndex>0){currentIndex--;renderQuestion();}});
$("nextQuestion").addEventListener("click",()=>{if(currentIndex<currentSubject.questions.length-1){currentIndex++;renderQuestion();}});
$("submitExam").addEventListener("click",()=>finishExam());
$("exitExam").addEventListener("click",()=>{if(confirm("Exit this exam? Your current answers will not be saved.")){clearInterval(timerHandle);showSection("subjects");}});
function finishExam(){if(!currentSubject)return;clearInterval(timerHandle);let correct=0;currentSubject.questions.forEach((q,i)=>{if(answers[i]===q.a)correct++;});let percent=Math.round(correct/currentSubject.questions.length*100);let record={subject:currentSubject.name,correct,total:currentSubject.questions.length,percent,date:new Date().toLocaleDateString("en-GB")};results.unshift(record);localStorage.setItem("caspamResults",JSON.stringify(results));$("scorePercent").textContent=percent+"%";$("scoreRing").style.setProperty("--score",percent+"%");$("resultTitle").textContent=percent>=80?"Excellent work!":percent>=50?"Good effort!":"Keep practising!";$("resultSummary").textContent=`You answered ${correct} out of ${currentSubject.questions.length} questions correctly in ${currentSubject.name}.`; $("correctChip").textContent=correct+" Correct";$("wrongChip").textContent=(currentSubject.questions.length-correct)+" Incorrect";$("reviewList").innerHTML=currentSubject.questions.map((q,i)=>{let ok=answers[i]===q.a;return `<article class="review-card"><h3>${i+1}. ${q.q}</h3><p class="${ok?"right":"wrong"}">${ok?"✓ Correct":"✕ Incorrect"} · Your answer: ${answers[i]===null?"Not answered":q.o[answers[i]]}</p><p><b>Correct answer:</b> ${q.o[q.a]}</p><p><b>Explanation:</b> ${q.e}</p></article>`}).join("");currentSubject=null;updateDashboard();showSection("review");}
function renderResults(){updateDashboard();$("emptyResults").classList.toggle("hidden",results.length>0);$("resultRows").innerHTML=results.map(r=>`<tr><td><strong>${r.subject}</strong></td><td>${r.date}</td><td>${r.correct}/${r.total} (${r.percent}%)</td><td><span class="status">${r.percent>=80?"Excellent":r.percent>=50?"Passed practice":"Keep practising"}</span></td></tr>`).join("");}
$("clearResults").addEventListener("click",()=>{if(confirm("Clear all saved result history from this browser?")){results=[];localStorage.removeItem("caspamResults");renderResults();}});
renderSchedule();renderSubjects();updateDashboard();
