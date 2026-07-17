/* =========================================================
   MediCore — Hospital Management System (Frontend Demo)
   All data is mock / generated client-side. No backend calls.
   ========================================================= */

const STORAGE_KEY = 'medicore_demo_v1';

const DEPARTMENTS = ['Cardiology','Neurology','Orthopedics','Pediatrics','Oncology','General Medicine','Dermatology','ENT'];
const FIRST_NAMES = ['Aarav','Vihaan','Ishaan','Kabir','Rohan','Sanya','Meera','Diya','Ananya','Kavya','Rahul','Sneha','Arjun','Priya','Aditya','Neha','Karan','Pooja','Vikram','Alia'];
const LAST_NAMES  = ['Sharma','Verma','Reddy','Iyer','Nair','Gupta','Rao','Menon','Kapoor','Bose','Chatterjee','Malhotra','Kulkarni','Pillai','Joshi'];
const DOCTOR_NAMES = ['Dr. Anjali Rao','Dr. Rajesh Kumar','Dr. Sneha Iyer','Dr. Vikram Nair','Dr. Priya Menon','Dr. Arjun Bose','Dr. Kavya Reddy','Dr. Manoj Verma','Dr. Divya Kulkarni','Dr. Sameer Joshi'];

function uid(prefix){ return prefix + '-' + Math.random().toString(36).slice(2,7).toUpperCase(); }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function formatDate(d){ return d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}); }
function initialsOf(name){
  return name.replace('Dr.','').trim().split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
}
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

/* =========================================================
   Seed data generation
   ========================================================= */
function generateSeedData(){
  const doctors = DOCTOR_NAMES.map((name,i)=>({
    id: uid('DOC'),
    name,
    dept: DEPARTMENTS[i % DEPARTMENTS.length],
    experience: randInt(3,22),
    rating: (Math.random()*1.3+3.6).toFixed(1),
    available: Math.random() > 0.25,
  }));

  const patients = [];
  for(let i=0;i<26;i++){
    const name = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
    const statusRoll = Math.random();
    const status = statusRoll < 0.4 ? 'Admitted' : statusRoll < 0.65 ? 'Outpatient' : statusRoll < 0.85 ? 'Discharged' : 'Critical';
    const doc = pick(doctors);
    const daysAgo = randInt(0,40);
    const admitted = new Date(Date.now() - daysAgo*86400000);
    patients.push({
      id: uid('PT'),
      name,
      age: randInt(2,88),
      gender: pick(['Male','Female']),
      dept: doc.dept,
      doctor: doc.name,
      status,
      admitted: admitted.toISOString(),
      contact: `9${randInt(100000000,999999999)}`,
    });
  }

  const appointments = [];
  const today = new Date();
  for(let i=0;i<20;i++){
    const dayOffset = randInt(-4,7);
    const date = new Date(today);
    date.setDate(date.getDate()+dayOffset);
    const doc = pick(doctors);
    const statusRoll = Math.random();
    let status = 'Scheduled';
    if(dayOffset < 0) status = Math.random() > 0.2 ? 'Completed' : 'Cancelled';
    else if(statusRoll < 0.08) status = 'Cancelled';
    appointments.push({
      id: uid('APT'),
      date: date.toISOString(),
      time: `${randInt(9,17)}:${pick(['00','15','30','45'])}`,
      patient: pick(patients).name,
      doctor: doc.name,
      dept: doc.dept,
      status,
      reason: pick(['Routine checkup','Follow-up','Consultation','Lab review','Post-surgery review','New symptoms']),
    });
  }
  appointments.sort((a,b)=> new Date(a.date) - new Date(b.date));

  const invoices = [];
  for(let i=0;i<14;i++){
    const amt = randInt(800,42000);
    const statusRoll = Math.random();
    const status = statusRoll < 0.55 ? 'Paid' : statusRoll < 0.85 ? 'Pending' : 'Overdue';
    const daysAgo = randInt(0,28);
    invoices.push({
      id: 'INV-' + (2400 + i),
      patient: pick(patients).name,
      service: pick(['Consultation','Lab Tests','Surgery','Room Charges','Pharmacy','Imaging (X-Ray/MRI)']),
      amount: amt,
      status,
      date: new Date(Date.now() - daysAgo*86400000).toISOString(),
    });
  }

  return { doctors, patients, appointments, invoices };
}

function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){ /* ignore, fall through to fresh seed */ }
  const fresh = generateSeedData();
  saveData(fresh);
  return fresh;
}
function saveData(data){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }catch(e){ /* storage unavailable, continue in-memory */ }
}

let DATA = loadData();

/* =========================================================
   Toast
   ========================================================= */
function showToast(msg, icon='fa-circle-check'){
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<i class="fa-solid ${icon}"></i> ${escapeHtml(msg)}`;
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.transition='opacity .3s'; el.style.opacity='0'; setTimeout(()=>el.remove(),300); }, 2400);
}

/* =========================================================
   Login
   ========================================================= */
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  document.getElementById('topbarUserName').textContent = user ? (user.length < 18 ? capitalizeName(user) : 'Dr. Demo User') : 'Dr. Demo User';
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('appShell').classList.remove('hidden');
  renderAll();
});
function capitalizeName(str){
  return str.split(/[\s._-]+/).filter(Boolean).map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
}
document.getElementById('logoutBtn').addEventListener('click', function(){
  document.getElementById('appShell').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginForm').reset();
});

/* =========================================================
   Navigation
   ========================================================= */
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item=>{
  item.addEventListener('click', ()=> goToPage(item.dataset.target));
});
document.querySelectorAll('[data-goto]').forEach(el=>{
  el.style.cursor='pointer';
  el.addEventListener('click', ()=> goToPage(el.dataset.goto));
});
function goToPage(pageId){
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  document.getElementById('page-'+pageId).classList.remove('hidden');
  navItems.forEach(n=>n.classList.toggle('active', n.dataset.target===pageId));
  document.getElementById('sidebar').classList.remove('open');
  window.scrollTo(0,0);
}

/* mobile sidebar toggle */
const menuToggle = document.getElementById('menuToggle');
function checkMobile(){
  menuToggle.style.display = window.innerWidth <= 860 ? 'inline-flex' : 'none';
}
checkMobile();
window.addEventListener('resize', checkMobile);
menuToggle.addEventListener('click', ()=> document.getElementById('sidebar').classList.toggle('open'));

/* =========================================================
   Modal helper
   ========================================================= */
function openModal(title, bodyHtml, footButtons){
  const root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="modal-backdrop" id="activeModalBackdrop">
      <div class="modal">
        <div class="modal-head">
          <h3>${escapeHtml(title)}</h3>
          <button class="btn-icon" id="modalCloseBtn"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">${bodyHtml}</div>
        <div class="modal-foot" id="modalFoot"></div>
      </div>
    </div>`;
  document.getElementById('modalFoot').append(...footButtons);
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('activeModalBackdrop').addEventListener('click', (e)=>{
    if(e.target.id === 'activeModalBackdrop') closeModal();
  });
}
function closeModal(){ document.getElementById('modalRoot').innerHTML = ''; }
function makeBtn(label, cls, onClick){
  const b = document.createElement('button');
  b.className = 'btn ' + cls;
  b.textContent = label;
  b.addEventListener('click', onClick);
  return b;
}

/* =========================================================
   DASHBOARD
   ========================================================= */
function renderDashboard(){
  document.getElementById('todayDate').textContent =
    "Here's what's happening across the hospital — " + formatDate(new Date());

  // admissions bar chart (last 7 days, derived deterministically-ish from data)
  const chart = document.getElementById('admissionsChart');
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const values = days.map(()=> randIntSeeded());
  const max = Math.max(...values);
  chart.innerHTML = values.map((v,i)=>`
    <div class="bar-col">
      <div class="bar" style="height:${Math.round((v/max)*130)}px" title="${v} admissions"></div>
      <div class="bar-label">${days[i]}</div>
    </div>`).join('');

  // today's appointments (dashboard preview)
  const todayStr = new Date().toDateString();
  const todaysAppts = DATA.appointments.filter(a=> new Date(a.date).toDateString() === todayStr).slice(0,5);
  document.getElementById('statAppointmentsToday').textContent = DATA.appointments.filter(a=> new Date(a.date).toDateString() === todayStr).length;
  const body = document.getElementById('dashAppointmentsBody');
  if(todaysAppts.length === 0){
    body.innerHTML = `<tr><td colspan="5" style="color:var(--ink-500);text-align:center;padding:24px;">No appointments scheduled for today.</td></tr>`;
  } else {
    body.innerHTML = todaysAppts.map(a=>`
      <tr>
        <td>${a.time}</td>
        <td>${escapeHtml(a.patient)}</td>
        <td>${escapeHtml(a.doctor)}</td>
        <td>${escapeHtml(a.dept)}</td>
        <td>${statusBadge(a.status)}</td>
      </tr>`).join('');
  }

  // recent patients
  const recents = [...DATA.patients].sort((a,b)=> new Date(b.admitted)-new Date(a.admitted)).slice(0,5);
  document.getElementById('recentPatientsList').innerHTML = recents.map(p=>`
    <li style="display:flex;align-items:center;gap:12px;">
      <div class="mini-avatar">${initialsOf(p.name)}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:.86rem;">${escapeHtml(p.name)}</div>
        <div class="name-sub">${escapeHtml(p.dept)} · ${formatDate(new Date(p.admitted))}</div>
      </div>
      ${statusBadge(p.status)}
    </li>`).join('');
}
let _seedVals = null;
function randIntSeeded(){
  if(!_seedVals) _seedVals = [];
  const v = randInt(6,24);
  _seedVals.push(v);
  return v;
}

function statusBadge(status){
  const map = {
    'Admitted':'badge-teal','Outpatient':'badge-gray','Discharged':'badge-green','Critical':'badge-coral',
    'Scheduled':'badge-teal','Completed':'badge-green','Cancelled':'badge-coral',
    'Paid':'badge-green','Pending':'badge-amber','Overdue':'badge-coral'
  };
  return `<span class="badge ${map[status]||'badge-gray'}">${escapeHtml(status)}</span>`;
}

/* =========================================================
   PATIENTS
   ========================================================= */
function populateDeptFilter(){
  const sel = document.getElementById('patientDeptFilter');
  sel.innerHTML = '<option value="">All departments</option>' + DEPARTMENTS.map(d=>`<option value="${d}">${d}</option>`).join('');
}
function renderPatients(){
  const q = document.getElementById('patientSearch').value.trim().toLowerCase();
  const dept = document.getElementById('patientDeptFilter').value;
  const status = document.getElementById('patientStatusFilter').value;

  const filtered = DATA.patients.filter(p=>{
    if(q && !p.name.toLowerCase().includes(q) && !p.id.toLowerCase().includes(q)) return false;
    if(dept && p.dept !== dept) return false;
    if(status && p.status !== status) return false;
    return true;
  }).sort((a,b)=> new Date(b.admitted)-new Date(a.admitted));

  const body = document.getElementById('patientsBody');
  document.getElementById('patientsEmpty').classList.toggle('hidden', filtered.length !== 0);

  body.innerHTML = filtered.map(p=>`
    <tr>
      <td>
        <div class="cell-name">
          <div class="mini-avatar">${initialsOf(p.name)}</div>
          <div>
            <div style="font-weight:600;">${escapeHtml(p.name)}</div>
            <div class="name-sub">${p.id}</div>
          </div>
        </div>
      </td>
      <td>${p.age} yrs · ${p.gender}</td>
      <td>${escapeHtml(p.dept)}</td>
      <td>${escapeHtml(p.doctor)}</td>
      <td>${statusBadge(p.status)}</td>
      <td>${formatDate(new Date(p.admitted))}</td>
      <td>
        <div class="row-actions">
          <button class="btn-icon btn-sm" style="width:32px;height:32px;" data-edit-patient="${p.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon btn-sm" style="width:32px;height:32px;" data-del-patient="${p.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');

  body.querySelectorAll('[data-edit-patient]').forEach(btn=>{
    btn.addEventListener('click', ()=> openPatientModal(btn.dataset.editPatient));
  });
  body.querySelectorAll('[data-del-patient]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(confirm('Remove this patient record from the demo data?')){
        DATA.patients = DATA.patients.filter(p=>p.id !== btn.dataset.delPatient);
        saveData(DATA);
        renderPatients();
        showToast('Patient record removed');
      }
    });
  });
}
['patientSearch','patientDeptFilter','patientStatusFilter'].forEach(id=>{
  document.getElementById(id).addEventListener('input', renderPatients);
  document.getElementById(id).addEventListener('change', renderPatients);
});

function openPatientModal(editId){
  const editing = editId ? DATA.patients.find(p=>p.id===editId) : null;
  const body = `
    <div class="form-row">
      <div class="field"><label>Full name</label><input id="pfName" value="${editing?escapeHtml(editing.name):''}" placeholder="e.g. Rohan Sharma"></div>
      <div class="field"><label>Age</label><input id="pfAge" type="number" min="0" max="120" value="${editing?editing.age:''}" placeholder="e.g. 34"></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Gender</label>
        <select id="pfGender">
          <option ${editing&&editing.gender==='Male'?'selected':''}>Male</option>
          <option ${editing&&editing.gender==='Female'?'selected':''}>Female</option>
          <option ${editing&&editing.gender==='Other'?'selected':''}>Other</option>
        </select>
      </div>
      <div class="field"><label>Department</label>
        <select id="pfDept">${DEPARTMENTS.map(d=>`<option ${editing&&editing.dept===d?'selected':''}>${d}</option>`).join('')}</select>
      </div>
    </div>
    <div class="form-row">
      <div class="field"><label>Attending doctor</label>
        <select id="pfDoctor">${DATA.doctors.map(d=>`<option ${editing&&editing.doctor===d.name?'selected':''}>${d.name}</option>`).join('')}</select>
      </div>
      <div class="field"><label>Status</label>
        <select id="pfStatus">
          ${['Admitted','Outpatient','Discharged','Critical'].map(s=>`<option ${editing&&editing.status===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="field"><label>Contact number</label><input id="pfContact" value="${editing?editing.contact:''}" placeholder="e.g. 9876543210"></div>
  `;
  openModal(editing?'Edit Patient':'Add Patient', body, [
    makeBtn('Cancel','btn-ghost', closeModal),
    makeBtn(editing?'Save Changes':'Add Patient','btn-primary', ()=>{
      const name = document.getElementById('pfName').value.trim();
      if(!name){ alert('Please enter a name.'); return; }
      const record = {
        id: editing?editing.id:uid('PT'),
        name,
        age: parseInt(document.getElementById('pfAge').value)||0,
        gender: document.getElementById('pfGender').value,
        dept: document.getElementById('pfDept').value,
        doctor: document.getElementById('pfDoctor').value,
        status: document.getElementById('pfStatus').value,
        admitted: editing?editing.admitted:new Date().toISOString(),
        contact: document.getElementById('pfContact').value.trim(),
      };
      if(editing){
        DATA.patients = DATA.patients.map(p=>p.id===editing.id?record:p);
      } else {
        DATA.patients.unshift(record);
      }
      saveData(DATA);
      closeModal();
      renderPatients();
      renderDashboard();
      showToast(editing?'Patient updated':'Patient added');
    })
  ]);
}
document.getElementById('addPatientBtn').addEventListener('click', ()=>openPatientModal(null));

/* =========================================================
   DOCTORS
   ========================================================= */
let activeDeptChip = '';
function renderDoctorChips(){
  const wrap = document.getElementById('doctorDeptChips');
  const chips = ['All', ...DEPARTMENTS];
  wrap.innerHTML = chips.map(c=>`<span class="chip ${((c==='All'&&!activeDeptChip)||c===activeDeptChip)?'active':''}" data-dept="${c==='All'?'':c}">${c}</span>`).join('');
  wrap.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{ activeDeptChip = chip.dataset.dept; renderDoctorChips(); renderDoctors(); });
  });
}
function renderDoctors(){
  const list = DATA.doctors.filter(d=> !activeDeptChip || d.dept === activeDeptChip);
  document.getElementById('doctorsGrid').innerHTML = list.map(d=>`
    <div class="doc-card">
      <span class="status-dot" title="${d.available?'Available':'Unavailable'}">
        <span class="pulse-dot" style="background:${d.available?'#2E9E62':'#93A2AC'}"></span>
      </span>
      <div class="doc-avatar">${initialsOf(d.name)}</div>
      <h4>${escapeHtml(d.name)}</h4>
      <div class="spec">${escapeHtml(d.dept)}</div>
      <div class="doc-meta"><span><i class="fa-solid fa-briefcase-medical"></i> ${d.experience} yrs</span></div>
      <div class="stars">${'★'.repeat(Math.round(d.rating))}${'☆'.repeat(5-Math.round(d.rating))} <span style="color:var(--ink-500);">${d.rating}</span></div>
      <button class="btn btn-outline btn-sm" style="width:100%;" data-book-doctor="${d.name}">Book Appointment</button>
    </div>`).join('');
  document.getElementById('doctorsGrid').querySelectorAll('[data-book-doctor]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ goToPage('appointments'); openAppointmentModal(null, btn.dataset.bookDoctor); });
  });
}
function openDoctorModal(){
  const body = `
    <div class="form-row">
      <div class="field"><label>Full name</label><input id="dfName" placeholder="e.g. Dr. Neha Kapoor"></div>
      <div class="field"><label>Department</label><select id="dfDept">${DEPARTMENTS.map(d=>`<option>${d}</option>`).join('')}</select></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Years of experience</label><input id="dfExp" type="number" min="0" max="50" placeholder="e.g. 8"></div>
      <div class="field"><label>Availability</label>
        <select id="dfAvail"><option value="1">Available</option><option value="0">Unavailable</option></select>
      </div>
    </div>
  `;
  openModal('Add Doctor', body, [
    makeBtn('Cancel','btn-ghost', closeModal),
    makeBtn('Add Doctor','btn-primary', ()=>{
      const name = document.getElementById('dfName').value.trim();
      if(!name){ alert('Please enter a name.'); return; }
      DATA.doctors.unshift({
        id: uid('DOC'), name,
        dept: document.getElementById('dfDept').value,
        experience: parseInt(document.getElementById('dfExp').value)||0,
        rating: (Math.random()*1.3+3.6).toFixed(1),
        available: document.getElementById('dfAvail').value === '1',
      });
      saveData(DATA);
      closeModal();
      renderDoctorChips();
      renderDoctors();
      showToast('Doctor added');
    })
  ]);
}
document.getElementById('addDoctorBtn').addEventListener('click', openDoctorModal);

/* =========================================================
   APPOINTMENTS
   ========================================================= */
let activeApptStatus = '';
document.querySelectorAll('#apptStatusChips .chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    document.querySelectorAll('#apptStatusChips .chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    activeApptStatus = chip.dataset.status;
    renderAppointments();
  });
});
function renderAppointments(){
  const list = DATA.appointments.filter(a=> !activeApptStatus || a.status === activeApptStatus);
  const body = document.getElementById('appointmentsBody');
  document.getElementById('appointmentsEmpty').classList.toggle('hidden', list.length !== 0);
  body.innerHTML = list.map(a=>`
    <tr>
      <td>${formatDate(new Date(a.date))}</td>
      <td>${a.time}</td>
      <td>${escapeHtml(a.patient)}</td>
      <td>${escapeHtml(a.doctor)}</td>
      <td>${escapeHtml(a.dept)}</td>
      <td>${statusBadge(a.status)}</td>
      <td>
        <div class="row-actions">
          ${a.status==='Scheduled' ? `<button class="btn-sm btn btn-ghost" data-complete="${a.id}">Complete</button><button class="btn-sm btn btn-danger" data-cancel="${a.id}">Cancel</button>` : ''}
        </div>
      </td>
    </tr>`).join('');
  body.querySelectorAll('[data-complete]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const a = DATA.appointments.find(x=>x.id===btn.dataset.complete);
      a.status = 'Completed'; saveData(DATA); renderAppointments(); showToast('Marked as completed');
    });
  });
  body.querySelectorAll('[data-cancel]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const a = DATA.appointments.find(x=>x.id===btn.dataset.cancel);
      a.status = 'Cancelled'; saveData(DATA); renderAppointments(); showToast('Appointment cancelled');
    });
  });
}
function openAppointmentModal(_, presetDoctor){
  const body = `
    <div class="field"><label>Patient</label>
      <select id="afPatient">${DATA.patients.map(p=>`<option>${escapeHtml(p.name)}</option>`).join('')}</select>
    </div>
    <div class="form-row">
      <div class="field"><label>Doctor</label>
        <select id="afDoctor">${DATA.doctors.map(d=>`<option ${presetDoctor===d.name?'selected':''}>${escapeHtml(d.name)}</option>`).join('')}</select>
      </div>
      <div class="field"><label>Department</label>
        <select id="afDept">${DEPARTMENTS.map(d=>`<option>${d}</option>`).join('')}</select>
      </div>
    </div>
    <div class="form-row">
      <div class="field"><label>Date</label><input id="afDate" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="field"><label>Time</label><input id="afTime" type="time" value="10:00"></div>
    </div>
    <div class="field"><label>Reason for visit</label><input id="afReason" placeholder="e.g. Routine checkup"></div>
  `;
  openModal('Book Appointment', body, [
    makeBtn('Cancel','btn-ghost', closeModal),
    makeBtn('Book Appointment','btn-primary', ()=>{
      const dateVal = document.getElementById('afDate').value;
      DATA.appointments.push({
        id: uid('APT'),
        date: new Date(dateVal || Date.now()).toISOString(),
        time: document.getElementById('afTime').value || '10:00',
        patient: document.getElementById('afPatient').value,
        doctor: document.getElementById('afDoctor').value,
        dept: document.getElementById('afDept').value,
        status: 'Scheduled',
        reason: document.getElementById('afReason').value.trim() || 'Consultation',
      });
      DATA.appointments.sort((a,b)=> new Date(a.date)-new Date(b.date));
      saveData(DATA);
      closeModal();
      renderAppointments();
      renderDashboard();
      showToast('Appointment booked');
    })
  ]);
}
document.getElementById('addAppointmentBtn').addEventListener('click', ()=>openAppointmentModal(null));

/* =========================================================
   BILLING
   ========================================================= */
function renderBilling(){
  const sum = (status)=> DATA.invoices.filter(i=>i.status===status).reduce((s,i)=>s+i.amount,0);
  document.getElementById('billingPaidTotal').textContent = '₹' + sum('Paid').toLocaleString('en-IN');
  document.getElementById('billingPendingTotal').textContent = '₹' + sum('Pending').toLocaleString('en-IN');
  document.getElementById('billingOverdueTotal').textContent = '₹' + sum('Overdue').toLocaleString('en-IN');

  document.getElementById('invoicesBody').innerHTML = [...DATA.invoices]
    .sort((a,b)=>new Date(b.date)-new Date(a.date))
    .map(i=>`
      <tr>
        <td><strong>${i.id}</strong></td>
        <td>${escapeHtml(i.patient)}</td>
        <td>${escapeHtml(i.service)}</td>
        <td>₹${i.amount.toLocaleString('en-IN')}</td>
        <td>${statusBadge(i.status)}</td>
        <td>${formatDate(new Date(i.date))}</td>
      </tr>`).join('');
}
function openInvoiceModal(){
  const body = `
    <div class="field"><label>Patient</label>
      <select id="ifPatient">${DATA.patients.map(p=>`<option>${escapeHtml(p.name)}</option>`).join('')}</select>
    </div>
    <div class="form-row">
      <div class="field"><label>Service</label>
        <select id="ifService">${['Consultation','Lab Tests','Surgery','Room Charges','Pharmacy','Imaging (X-Ray/MRI)'].map(s=>`<option>${s}</option>`).join('')}</select>
      </div>
      <div class="field"><label>Amount (₹)</label><input id="ifAmount" type="number" min="0" placeholder="e.g. 4500"></div>
    </div>
    <div class="field"><label>Status</label>
      <select id="ifStatus"><option>Pending</option><option>Paid</option><option>Overdue</option></select>
    </div>
  `;
  openModal('Generate Invoice', body, [
    makeBtn('Cancel','btn-ghost', closeModal),
    makeBtn('Generate','btn-primary', ()=>{
      const amount = parseInt(document.getElementById('ifAmount').value)||0;
      DATA.invoices.unshift({
        id: 'INV-' + randInt(3000,9999),
        patient: document.getElementById('ifPatient').value,
        service: document.getElementById('ifService').value,
        amount,
        status: document.getElementById('ifStatus').value,
        date: new Date().toISOString(),
      });
      saveData(DATA);
      closeModal();
      renderBilling();
      showToast('Invoice generated');
    })
  ]);
}
document.getElementById('addInvoiceBtn').addEventListener('click', openInvoiceModal);

/* =========================================================
   SETTINGS
   ========================================================= */
document.querySelectorAll('.switch').forEach(sw=>{
  sw.addEventListener('click', ()=>{
    sw.classList.toggle('on');
    showToast((sw.dataset.setting||'Setting') + ' ' + (sw.classList.contains('on')?'enabled':'disabled'), 'fa-toggle-on');
  });
});

/* =========================================================
   Global search (jumps to patients/doctors on match)
   ========================================================= */
document.getElementById('globalSearch').addEventListener('keydown', function(e){
  if(e.key === 'Enter'){
    const q = this.value.trim();
    if(!q) return;
    document.getElementById('patientSearch').value = q;
    goToPage('patients');
    renderPatients();
  }
});

/* =========================================================
   Init
   ========================================================= */
function renderAll(){
  populateDeptFilter();
  renderDashboard();
  renderPatients();
  renderDoctorChips();
  renderDoctors();
  renderAppointments();
  renderBilling();
}
