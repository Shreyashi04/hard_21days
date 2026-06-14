const quotes = [

"Day 1: Start strong.",
"Day 2: Discipline beats excuses.",
"Day 3: Stay consistent.",
"Day 4: You are improving.",
"Day 5: Hard days matter.",
"Day 6: Keep moving.",
"Day 7: One week complete.",
"Day 8: Winners continue.",
"Day 9: Stay focused.",
"Day 10: Halfway mindset.",
"Day 11: Keep grinding.",
"Day 12: Push yourself.",
"Day 13: Growth is happening.",
"Day 14: Stay disciplined.",
"Day 15: You are stronger.",
"Day 16: Keep your promise.",
"Day 17: One more step.",
"Day 18: Habits create success.",
"Day 19: Don't stop now.",
"Day 20: Final push.",
"Day 21: You did it."

];

const defaultTasks = [
"Morning Study",
"Practice Session",
"Revision",
"Plan Tomorrow"
];

let currentDay = 1;

function saveStartDate(){
  const date = document.getElementById("startDate").value;

  if(!date){
    alert("Select a start date");
    return;
  }

  localStorage.setItem("startDate", date);
  init();
}

function resetAll(){
  localStorage.clear();
  location.reload();
}

function calculateDay(){
  const completedDays =
    JSON.parse(localStorage.getItem("completedDays")) || [];

  return completedDays.length + 1;
}

// ✅ FINAL COMPLETION SCREEN
function showCompletionScreen(){

  document.getElementById("dayText").innerText =
    "🎉 Challenge Completed!";

  document.getElementById("todayDate").innerText =
    new Date().toDateString();

  document.getElementById("quote").innerText =
    "You completed all 21 days. Respect. 💪🔥";

  document.getElementById("tasks").innerHTML = `
    <div class="lockedMessage">
      🏆 You finished the 21 Days Hard Challenge! <br><br>
      Stay consistent. Start again or build a new goal 🚀
    </div>
  `;

  document.querySelector(".addBtn").style.display = "none";
  document.querySelector(".completeBtn").style.display = "none";

  document.getElementById("progress").style.width = "100%";
  document.getElementById("streakText").innerText = "🔥 21";
}

// ✅ SHOW BUTTON ONLY IF ALL TASKS DONE
function checkAllDone(){

  const checks = document.querySelectorAll(".check");
  let allDone = true;

  checks.forEach(c=>{
    if(!c.checked){
      allDone = false;
    }
  });

  const btn = document.querySelector(".completeBtn");

  if(allDone){
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

function init(){

  const startDate = localStorage.getItem("startDate");
  if(!startDate) return;

  document.getElementById("startBox").classList.add("hidden");
  document.getElementById("card").classList.remove("hidden");

  document.querySelector(".addBtn").style.display = "block";

  const today = new Date();
  const selectedDate = new Date(startDate);

  today.setHours(0,0,0,0);
  selectedDate.setHours(0,0,0,0);

  // FUTURE LOCK
  if(today < selectedDate){

    const diff = Math.ceil(
      (selectedDate - today) / (1000*60*60*24)
    );

    document.getElementById("dayText").innerText =
      "Challenge Not Started";

    document.getElementById("todayDate").innerText =
      `Starts in ${diff} day(s)`;

    document.getElementById("quote").innerText =
      `⏳ Wait ${diff} more day(s).`;

    document.getElementById("tasks").innerHTML = `
      <div class="lockedMessage">
        🚀 Your challenge starts on
        <br><br>
        ${selectedDate.toDateString()}
      </div>
    `;

    document.querySelector(".addBtn").style.display = "none";
    document.querySelector(".completeBtn").style.display = "none";

    return;
  }

  const completedDays =
    JSON.parse(localStorage.getItem("completedDays")) || [];

  // ✅ FINAL COMPLETION CHECK
  if(completedDays.length >= 21){
    showCompletionScreen();
    return;
  }

  currentDay = calculateDay();
  if(currentDay > 21) currentDay = 21;

  document.getElementById("dayText").innerText =
    `Day ${currentDay}`;

  document.getElementById("todayDate").innerText =
    new Date().toDateString();

  document.getElementById("quote").innerText =
    quotes[currentDay - 1];

  document.getElementById("streakText").innerText =
    `🔥 ${completedDays.length}`;

  document.getElementById("progress").style.width =
    `${(completedDays.length / 21) * 100}%`;

  loadTasks();
}

function loadTasks(){

  const tasksDiv = document.getElementById("tasks");
  tasksDiv.innerHTML = "";

  const tasks =
    JSON.parse(localStorage.getItem(`tasks_${currentDay}`))
    || defaultTasks;

  tasks.forEach((task,index)=>{

    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <input type="checkbox" class="check" onchange="checkAllDone()">
      <textarea onchange="saveTask(${index},this.value)">
        ${task}
      </textarea>
    `;

    tasksDiv.appendChild(div);
  });

  // ✅ check button visibility after loading
  checkAllDone();
}

function saveTask(index,value){

  let tasks =
    JSON.parse(localStorage.getItem(`tasks_${currentDay}`))
    || defaultTasks;

  tasks[index] = value;

  localStorage.setItem(
    `tasks_${currentDay}`,
    JSON.stringify(tasks)
  );
}

function addTask(){

  let tasks =
    JSON.parse(localStorage.getItem(`tasks_${currentDay}`))
    || [...defaultTasks];

  tasks.push("New Task");

  localStorage.setItem(
    `tasks_${currentDay}`,
    JSON.stringify(tasks)
  );

  loadTasks();
}

function completeDay(){

  let completedDays =
    JSON.parse(localStorage.getItem("completedDays")) || [];

  if(!completedDays.includes(currentDay)){
    completedDays.push(currentDay);
  }

  localStorage.setItem(
    "completedDays",
    JSON.stringify(completedDays)
  );

  // ✅ FINAL CHECK
  if(completedDays.length >= 21){
    showCompletionScreen();
    return;
  }

  currentDay++;

  document.getElementById("dayText").innerText =
    `Day ${currentDay}`;

  document.getElementById("quote").innerText =
    quotes[currentDay - 1];

  document.getElementById("streakText").innerText =
    `🔥 ${completedDays.length}`;

  document.getElementById("progress").style.width =
    `${(completedDays.length / 21) * 100}%`;

  loadTasks();
}

init();