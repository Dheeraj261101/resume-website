// YNews — front-end-only demo. All content below is fictional placeholder
// copy standing in for what would normally come from a MySQL-backed API.

const ARTICLES = [
  {
    id: 1,
    category: "technology",
    icon: "🛰️",
    tag: "Technology",
    headline: "City Council Approves Fiber Rollout for Old Town District",
    dek: "A three-year buildout will bring gigabit connections to the last unwired blocks downtown, closing a gap officials called \"long overdue.\"",
    byline: "By Arun Mehta · Staff Writer · 6 min read",
    date: "Jul 6, 2026",
    body: [
      "The city council voted 7-2 late Thursday to fund a fiber-optic expansion into the Old Town district, an area of roughly four thousand households that has relied on aging copper lines for two decades.",
      "Construction crews are expected to begin trenching work in September, with the first connections live by next spring. Officials said the project was delayed twice over budget disputes before this week's vote broke the deadlock.",
      "Residents who spoke at the public comment session were largely supportive, though several raised concerns about street closures during peak construction months. The council promised a rolling public schedule once contractors are selected.",
      "Council member Priya Raman, who sponsored the measure, called it \"the single biggest infrastructure investment in this district since the water mains were replaced.\" The project is budgeted at 14 million dollars, funded through a mix of municipal bonds and a state broadband grant."
    ]
  },
  {
    id: 2,
    category: "business",
    icon: "📈",
    tag: "Business",
    headline: "Local Manufacturer Doubles Workforce After Export Deal",
    dek: "A mid-size auto-parts supplier is adding 300 jobs after signing a five-year contract with an overseas buyer.",
    byline: "By Elena Cho · Business Desk · 4 min read",
    date: "Jul 5, 2026",
    body: [
      "Meridian Components announced Tuesday it will hire roughly 300 workers over the next 18 months after finalizing a supply agreement with a European automaker.",
      "The company, which has operated out of the same riverside plant since 1998, said the deal effectively doubles its production capacity requirements.",
      "Economic development officials welcomed the news, noting the plant has weathered two rounds of layoffs since 2019. \"This is the turnaround we've been hoping for,\" one spokesperson said.",
      "Hiring is expected to begin with second-shift machinists in August, followed by logistics and quality-control roles through the end of the year."
    ]
  },
  {
    id: 3,
    category: "sports",
    icon: "🏟️",
    tag: "Sports",
    headline: "Riverside High Clinches Regional Title in Extra Innings",
    dek: "A two-out, bases-loaded single in the tenth sent the home crowd onto the field for the first time in eleven years.",
    byline: "By Marcus Webb · Sports · 3 min read",
    date: "Jul 4, 2026",
    body: [
      "It took ten innings, three pitching changes, and a rain delay, but Riverside High finally has its regional championship back.",
      "Junior shortstop Dana Ilic drove in the winning run with a line drive to right field, scoring pinch-runner Kofi Adeyemi from third and setting off a celebration that spilled from the dugout onto the infield.",
      "The win caps a season that started rocky — Riverside lost four of its first six games — before a mid-season pitching adjustment turned the campaign around.",
      "The team advances to the state semifinal next weekend, a matchup fans have circled since the bracket was announced."
    ]
  },
  {
    id: 4,
    category: "culture",
    icon: "🎭",
    tag: "Culture",
    headline: "Restored 1920s Theater Reopens With Sold-Out Jazz Weekend",
    dek: "After a six-year renovation, the Aldridge Theater welcomed its first audience back with three sold-out nights.",
    byline: "By Sofia Nunez · Culture · 5 min read",
    date: "Jul 3, 2026",
    body: [
      "The Aldridge Theater's original plaster ceiling, hand-painted in 1926 and hidden under drop panels since the 1970s, was the first thing patrons noticed walking in Friday night.",
      "The restoration, funded largely through a preservation grant and a local bond issue, replaced the building's wiring, seating, and stage rigging while keeping its Art Deco facade intact.",
      "Organizers booked a three-night jazz series to mark the reopening, and all three nights sold out within a week of tickets going on sale.",
      "\"We wanted the first sound in this room to matter,\" said the theater's artistic director, who has led the restoration effort since 2020."
    ]
  },
  {
    id: 5,
    category: "health",
    icon: "🩺",
    tag: "Health",
    headline: "New Clinic Hours Aim to Cut Emergency Room Overflow",
    dek: "A nearby urgent-care network is extending evening hours after data showed a rise in non-emergency ER visits.",
    byline: "By Dr. Kavya Iyer · Health Desk · 4 min read",
    date: "Jul 2, 2026",
    body: [
      "Three urgent-care clinics in the metro area will stay open until midnight starting this month, a change hospital administrators hope will ease pressure on emergency departments.",
      "An internal review found that nearly a third of overnight ER visits last year involved conditions that could have been treated at an urgent-care clinic, including minor fractures and infections.",
      "Clinic staff say the extended hours will require additional nursing hires, which are already underway.",
      "Officials caution the change is not meant to replace emergency care for serious conditions, but to give patients another option for care that doesn't need a hospital setting."
    ]
  },
  {
    id: 6,
    category: "technology",
    icon: "🔋",
    tag: "Technology",
    headline: "Transit Authority Pilots Electric Bus Route on Line 12",
    dek: "Six battery-electric buses will replace diesel models on one of the city's busiest routes for a year-long trial.",
    byline: "By Arun Mehta · Staff Writer · 3 min read",
    date: "Jul 1, 2026",
    body: [
      "The transit authority rolled out its first electric buses Monday morning on Line 12, which carries roughly 9,000 riders a day between downtown and the northern suburbs.",
      "The pilot is funded through a federal clean-transit grant and will run for twelve months before officials decide whether to expand the program.",
      "Drivers assigned to the new buses underwent two weeks of training on the vehicles' regenerative braking and charging systems.",
      "If the pilot succeeds, officials say up to a quarter of the fleet could be electrified within five years."
    ]
  },
  {
    id: 7,
    category: "business",
    icon: "🏪",
    tag: "Business",
    headline: "Downtown Vacancy Rate Falls for Third Straight Quarter",
    dek: "New leases from small retailers are filling storefronts that sat empty since 2022.",
    byline: "By Elena Cho · Business Desk · 3 min read",
    date: "Jun 29, 2026",
    body: [
      "Commercial vacancy along the main downtown corridor dropped to its lowest level in four years, according to a report released this week by the downtown business association.",
      "Much of the recovery has come from independent retailers and food vendors rather than national chains, a shift the association's director called \"a healthier kind of growth.\"",
      "Rents have ticked up slightly as a result, prompting some concern among longtime tenants about affordability.",
      "The association plans to introduce a small-business rent stabilization proposal at next month's meeting."
    ]
  },
  {
    id: 8,
    category: "sports",
    icon: "🏊",
    tag: "Sports",
    headline: "Teen Swimmer Breaks 20-Year-Old Regional Record",
    dek: "A 16-year-old set a new mark in the 200m freestyle that had stood since 2006.",
    byline: "By Marcus Webb · Sports · 2 min read",
    date: "Jun 27, 2026",
    body: [
      "Sixteen-year-old Priya Deshmukh shaved just under half a second off a regional 200m freestyle record that had stood since 2006, finishing in 1:58.42 at Saturday's championship meet.",
      "The previous record holder, now a coach at a nearby university, was in the stands and was among the first to congratulate her.",
      "Deshmukh said she wasn't tracking the pace during the race and only learned she'd broken the record after checking the scoreboard.",
      "She has one more meet before nationals, where she'll be seeded in the top ten for the first time."
    ]
  },
  {
    id: 9,
    category: "culture",
    icon: "🖼️",
    tag: "Culture",
    headline: "Community Mural Project Adds Fourth Wall Downtown",
    dek: "Local art students completed a wraparound mural depicting the city's rail history on the old freight building.",
    byline: "By Sofia Nunez · Culture · 3 min read",
    date: "Jun 25, 2026",
    body: [
      "Twelve art students from the community college spent five weeks completing the newest addition to the city's mural trail, wrapping three sides of the old freight depot with scenes from the rail line's early years.",
      "The project was funded through a small-grants program aimed at giving students paid public-art experience.",
      "Organizers say it's the fourth mural completed under the program since 2023, with a fifth already planned for next spring.",
      "A community unveiling is scheduled for later this month, with several of the students' families expected to attend."
    ]
  },
  {
    id: 10,
    category: "health",
    icon: "🧬",
    tag: "Health",
    headline: "Regional Blood Bank Reports Lowest Reserves in Five Years",
    dek: "Officials are calling for donors ahead of the summer travel season, when donations typically dip.",
    byline: "By Dr. Kavya Iyer · Health Desk · 2 min read",
    date: "Jun 23, 2026",
    body: [
      "The regional blood bank said Tuesday its reserves have fallen to the lowest level since 2021, with less than a two-day supply of O-negative blood on hand.",
      "Officials attributed the shortfall to a combination of summer travel, fewer workplace donation drives, and a slow start to the year's donor recruitment.",
      "Mobile donation units will be stationed at three shopping centers this weekend in an effort to close the gap.",
      "The blood bank is asking eligible donors, particularly those with O-negative or O-positive blood types, to schedule appointments in the coming week."
    ]
  }
];

const state = {
  category: "all",
  query: ""
};

// ---------- Utility ----------
function filterArticles() {
  return ARTICLES.filter(a => {
    const matchesCat = state.category === "all" || a.category === state.category;
    const matchesQuery = state.query === "" ||
      a.headline.toLowerCase().includes(state.query) ||
      a.dek.toLowerCase().includes(state.query);
    return matchesCat && matchesQuery;
  });
}

function renderDateline() {
  const el = document.getElementById("dateline");
  const now = new Date();
  el.textContent = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function renderTicker() {
  const track = document.getElementById("wireTrack");
  const headlines = ARTICLES.slice(0, 8).map(a => `<span>${a.headline}</span>`).join("");
  track.innerHTML = headlines + headlines; // duplicate for seamless loop
}

function renderAll() {
  const list = filterArticles();
  renderLead(list);
  renderAlsoInNews(list);
  renderGrid(list);
}

function renderLead(list) {
  const leadWrap = document.getElementById("leadStory");
  if (!list.length) {
    leadWrap.innerHTML = "";
    return;
  }
  const lead = list[0];
  leadWrap.innerHTML = `
    <div class="lead-text">
      <span class="eyebrow">${lead.tag} · Lead Story</span>
      <h2>${lead.headline}</h2>
      <p class="dek">${lead.dek}</p>
      <p class="byline">${lead.byline} · ${lead.date}</p>
    </div>
    <div class="lead-figure" data-icon="${lead.icon}"></div>
  `;
  leadWrap.onclick = () => openReader(lead.id);
}

function renderAlsoInNews(list) {
  const wrap = document.getElementById("alsoList");
  const items = list.slice(1, 5);
  if (!items.length) {
    wrap.innerHTML = `<p class="empty-state">No further stories in this section.</p>`;
    return;
  }
  wrap.innerHTML = items.map(a => `
    <div class="also-item" data-id="${a.id}">
      <span class="tag">${a.tag}</span>
      <h3>${a.headline}</h3>
    </div>
  `).join("");
  wrap.querySelectorAll(".also-item").forEach(el => {
    el.addEventListener("click", () => openReader(Number(el.dataset.id)));
  });
}

function renderGrid(list) {
  const wrap = document.getElementById("gridList");
  const title = document.getElementById("gridTitle");
  const items = list.slice(5);
  title.textContent = state.category === "all" ? "More Stories" : `More in ${capitalize(state.category)}`;

  if (!list.length) {
    wrap.innerHTML = `<p class="empty-state">No stories match "${state.query}". Try another search.</p>`;
    return;
  }
  if (!items.length) {
    wrap.innerHTML = `<p class="empty-state">That's everything in this section for now.</p>`;
    return;
  }
  wrap.innerHTML = items.map(a => `
    <article class="story-card" data-id="${a.id}">
      <span class="tag">${a.tag}</span>
      <h3>${a.headline}</h3>
      <p>${a.dek}</p>
      <div class="meta">${a.date}</div>
    </article>
  `).join("");
  wrap.querySelectorAll(".story-card").forEach(el => {
    el.addEventListener("click", () => openReader(Number(el.dataset.id)));
  });
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---------- Reader overlay ----------
function openReader(id) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return;
  const content = document.getElementById("readerContent");
  content.innerHTML = `
    <div class="reader-content">
      <span class="tag">${article.tag}</span>
      <h1>${article.headline}</h1>
      <p class="byline">${article.byline} · ${article.date}</p>
      ${article.body.map(p => `<p>${p}</p>`).join("")}
    </div>
  `;
  document.getElementById("readerOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeReader() {
  document.getElementById("readerOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ---------- Events ----------
document.getElementById("readerClose").addEventListener("click", closeReader);
document.getElementById("readerOverlay").addEventListener("click", (e) => {
  if (e.target.id === "readerOverlay") closeReader();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeReader();
});

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.category = btn.dataset.cat;
    renderAll();
  });
});

document.getElementById("searchBox").addEventListener("input", (e) => {
  state.query = e.target.value.trim().toLowerCase();
  renderAll();
});

// ---------- Init ----------
renderDateline();
renderTicker();
renderAll();
