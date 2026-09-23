/* A little vanilla JavaScript powers the timer and checklist.
   All layout, themes, illustrations of progress, and motion live in style.css. */
'use strict';
const $ = (selector) => document.querySelector(selector);
let totalSeconds = 25 * 60;
let remaining = totalSeconds;
let deadline = null;
let running = false;
let completedSessions = 0;
const announce = (message) => { $('#announcement').textContent = message; };

$('#today').textContent = new Intl.DateTimeFormat('en', { weekday:'short', month:'short', day:'numeric' }).format(new Date());
$('#today').dateTime = new Date().toISOString().slice(0,10);

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const next = theme === 'dark' ? 'Light' : 'Dark';
  $('#theme-label').textContent = next + ' mode';
  $('#theme').setAttribute('aria-label', 'Switch to ' + next.toLowerCase() + ' theme');
  try { localStorage.setItem('orbit-theme', theme); } catch (_) { /* Private browsers may block storage. */ }
}
try { if(localStorage.getItem('orbit-theme') === 'light') setTheme('light'); } catch (_) {}
$('#theme').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

function renderTimer() {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  $('#timer').textContent = String(minutes).padStart(2,'0') + ':' + String(seconds).padStart(2,'0');
  $('#timer').setAttribute('aria-label', minutes + ' minutes ' + seconds + ' seconds remaining');
  $('#timer-ring').style.setProperty('--sweep', ((totalSeconds - remaining) / totalSeconds * 360) + 'deg');
  $('#start-label').textContent = running ? 'Pause session' : remaining === 0 ? 'Start again' : remaining < totalSeconds ? 'Resume session' : 'Start focusing';
  $('#session-state').textContent = running ? 'In your flow' : remaining === 0 ? 'Session complete' : remaining < totalSeconds ? 'On a little pause' : 'Ready when you are';
}
function tick() {
  if (!running) return;
  remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  if (remaining === 0) {
    running = false;
    completedSessions++;
    $('#sessions').textContent = completedSessions;
    $('#timer-hint').textContent = 'Nicely done. Take a breath.';
    announce('Session complete. You have completed ' + completedSessions + ' sessions.');
  }
  renderTimer();
}
function toggleTimer() {
  if (running) { tick(); running = false; }
  else {
    if (remaining === 0) remaining = totalSeconds;
    deadline = Date.now() + remaining * 1000;
    running = true;
    $('#timer-hint').textContent = 'Small steps, meaningful progress.';
  }
  renderTimer();
}
function resetTimer() {
  running = false; deadline = null; remaining = totalSeconds;
  $('#timer-hint').textContent = 'Small steps, meaningful progress.';
  renderTimer();
}
$('#start').addEventListener('click', toggleTimer);
$('#reset').addEventListener('click', resetTimer);
document.querySelectorAll('[data-minutes]').forEach(button => button.addEventListener('click', () => {
  totalSeconds = Number(button.dataset.minutes) * 60;
  document.querySelectorAll('[data-minutes]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  $('#timer-caption').textContent = button.dataset.minutes === '5' ? 'TIME TO RECHARGE' : 'TIME TO FOCUS';
  resetTimer();
}));
setInterval(tick, 250);
document.addEventListener('visibilitychange', tick);

function updateProgress() {
  const tasks = document.querySelectorAll('.task input');
  const done = Array.from(tasks).filter(input => input.checked).length;
  const percentage = Math.round(done / tasks.length * 100);
  $('#task-count').textContent = done + '/' + tasks.length;
  $('#progress-label').textContent = percentage + '%';
  $('#progress').value = percentage;
  announce(done + ' of ' + tasks.length + ' intentions complete.');
}
$('#tasks').addEventListener('change', updateProgress);
$('#task-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = $('#new-task');
  const value = input.value.trim();
  if (!value) { input.setCustomValidity('Please enter an intention.'); input.reportValidity(); return; }
  const label = document.createElement('label'); label.className = 'task';
  const check = document.createElement('input'); check.type = 'checkbox';
  const marker = document.createElement('span'); marker.className = 'checkmark'; marker.setAttribute('aria-hidden','true');
  const copy = document.createElement('span'); copy.className = 'task-copy';
  const text = document.createElement('strong'); text.textContent = value;
  copy.append(text); label.append(check, marker, copy); $('#tasks').append(label);
  input.value = ''; updateProgress(); announce('Intention added: ' + value);
  $('#tasks').scrollTop = $('#tasks').scrollHeight; input.focus();
});
$('#new-task').addEventListener('input', event => event.target.setCustomValidity(''));

// Optional browser integration. Unsupported browsers simply skip this block.
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  try {
    Promise.resolve(document.modelContext.registerTool({
      name:'read_focus_session', title:'Read focus session',
      description:'Read the current timer and number of completed sessions without changing them.',
      inputSchema:{type:'object', properties:{}, additionalProperties:false},
      annotations:{readOnlyHint:true, untrustedContentHint:false},
      execute(input) {
        if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length) throw new Error('Expected an empty object.');
        return {remainingSeconds:remaining, running, completedSessions};
      }
    }, {signal:lifecycle.signal})).catch(() => {});
  } catch (_) { /* The main interface does not require this experimental API. */ }
  window.addEventListener('pagehide', () => lifecycle.abort(), {once:true});
}
