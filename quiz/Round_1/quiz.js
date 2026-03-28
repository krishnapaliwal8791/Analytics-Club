const supabaseObject = window.supabase.createClient(
  "https://owygwkkolaeoxqmjific.supabase.co",
  "sb_publishable_aY8TVwyhny8W40fsXK39jQ_MFuSgyTq"
);

let user_id = localStorage.getItem("user_id");

if (user_id) {
  document.getElementById("login").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

// LOGIN
async function login() {
  const name = document.getElementById("teamName").value;

  if (!name) {
    alert("Enter team name");
    return;
  }

  const { data, error } = await supabaseObject
    .from("users")
    .insert({ name_team: name })
    .select()
    .single();

  if (error) {
    alert("Error creating user");
    return;
  }

  user_id = data.id;
  localStorage.setItem("user_id", user_id);

  document.getElementById("login").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  loadQuestion();
}

// LOAD QUESTION
async function loadQuestion() {
  const { data, error } = await supabaseObject
    .from("question")
    .select("*")
    .lte("start_time", new Date().toISOString())
    .gte("end_time", new Date().toISOString())
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();   // ✅ FIXED

  if (error || !data) {
    document.getElementById("status").innerText = "Wait for next question";
    document.getElementById("options").innerHTML = "";
    return;
  }

  // check if already submitted
  const { data: sub } = await supabaseObject
    .from("submission")
    .select("*")
    .eq("user_id", user_id)
    .eq("question_id", data.id)
    .maybeSingle();

  if (sub) {
    showSubmitted(sub.selected_option);
    return;
  }

  showOptions(data);
}

// SHOW OPTIONS
function showOptions(q) {
  document.getElementById("status").innerText = "";

  const optionsDiv = document.getElementById("options");

  optionsDiv.innerHTML = `
    <button onclick="submitAnswer('${q.id}','A')">A: ${q.option_a}</button><br><br>
    <button onclick="submitAnswer('${q.id}','B')">B: ${q.option_b}</button><br><br>
    <button onclick="submitAnswer('${q.id}','C')">C: ${q.option_c}</button><br><br>
    <button onclick="submitAnswer('${q.id}','D')">D: ${q.option_d}</button>
  `;
}
const buttons = document.querySelectorAll("#options button");
buttons.forEach(btn => btn.disabled = true);
// SUBMIT
async function submitAnswer(qid, option) {
  if (!user_id) {
    alert("Login first");
    return;
  }

  const { error } = await supabaseObject.from("submission").insert({
    user_id: user_id,
    question_id: qid,
    selected_option: option
  });

  if (error) {
    alert("Already submitted or error");
    return;
  }

document.getElementById("options").innerHTML = "";

document.getElementById("status").innerHTML = `
  ✅ Answer Locked<br><br>
  <span style="color:#38bdf8; font-size:18px;">Selected: ${option}</span>
`;}

// AFTER SUBMIT
document.getElementById("options").innerHTML = "";

document.getElementById("status").innerHTML =
  "✅ Answer locked<br><br><span style='color:#38bdf8'>Selected: " + option + "</span>";