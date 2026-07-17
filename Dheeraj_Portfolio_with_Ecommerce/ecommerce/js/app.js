/* =========================================================
   Cartly — front-end-only shopping cart & order demo
   All data lives in this file / localStorage. No backend.
========================================================= */

const CATEGORY_COLORS = {
  "Bags & Carry": "#E8A33D",
  "Watches & Wearables": "#1F3A2E",
  "Audio": "#E2A79C",
  "Home & Desk": "#8FA98C",
  "Notebooks & Stationery": "#7C9CB4",
};

// Simple line-art icon set, one per category, drawn in currentColor.
const ICONS = {
  "Bags & Carry": `<svg viewBox="0 0 24 24" fill="none"><path d="M6 8h12l1 12.5a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 20.5L6 8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.5"/></svg>`,
  "Watches & Wearables": `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M12 9v3.2l2 1.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 4h6M9 20h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  "Audio": `<svg viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="3" y="13" width="4" height="6" rx="1.2" stroke="currentColor" stroke-width="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.2" stroke="currentColor" stroke-width="1.5"/></svg>`,
  "Home & Desk": `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V10l8-6 8 6v10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 20v-6h6v6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  "Notebooks & Stationery": `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

const PRODUCTS = [
  { id:"p01", name:"Fieldpack Day Tote", category:"Bags & Carry", price:64, blurb:"Waxed-canvas tote with a padded laptop sleeve.", tag:"Bestseller" },
  { id:"p02", name:"Ridgeline Sling", category:"Bags & Carry", price:38, blurb:"Compact crossbody sling for the daily carry.", tag:null },
  { id:"p03", name:"Harbor Weekender", category:"Bags & Carry", price:112, blurb:"Duffel with a shoe compartment, built for short trips.", tag:"New" },
  { id:"p04", name:"Meridian Field Watch", category:"Watches & Wearables", price:145, blurb:"Automatic movement, sapphire crystal, 5 ATM.", tag:"Bestseller" },
  { id:"p05", name:"Tidal Dive Strap", category:"Watches & Wearables", price:22, blurb:"FKM rubber strap, fits most 20mm lugs.", tag:null },
  { id:"p06", name:"Analog Desk Timer", category:"Watches & Wearables", price:29, blurb:"Wind-up focus timer, 60-minute dial.", tag:null },
  { id:"p07", name:"Aerloop Earbuds", category:"Audio", price:79, blurb:"True wireless, 28-hour case battery.", tag:"New" },
  { id:"p08", name:"Sundial Desk Speaker", category:"Audio", price:96, blurb:"Warm-toned bookshelf speaker, walnut cap.", tag:null },
  { id:"p09", name:"Overhead Studio Cans", category:"Audio", price:118, blurb:"Closed-back headphones for focused listening.", tag:"Bestseller" },
  { id:"p10", name:"Terracotta Planter, Set of 2", category:"Home & Desk", price:34, blurb:"Hand-thrown planters with drainage trays.", tag:null },
  { id:"p11", name:"Basalt Desk Lamp", category:"Home & Desk", price:58, blurb:"Warm dimmable LED on a weighted stone base.", tag:"New" },
  { id:"p12", name:"Oak Cable Tray", category:"Home & Desk", price:26, blurb:"Keeps charging cables corralled on the desk.", tag:null },
  { id:"p13", name:"Fieldnotes Journal, Dot Grid", category:"Notebooks & Stationery", price:18, blurb:"192-page dot-grid journal, lay-flat binding.", tag:null },
  { id:"p14", name:"Brass Desk Pen", category:"Notebooks & Stationery", price:24, blurb:"Solid brass ballpoint that ages with use.", tag:"Bestseller" },
  { id:"p15", name:"Archive Folio", category:"Notebooks & Stationery", price:32, blurb:"A5 leather folio for notebook and cards.", tag:null },
];

const TAX_RATE = 0.08;
const SHIPPING_FLAT = 4.99;
const FREE_SHIPPING_OVER = 75;
const money = (n) => `$${n.toFixed(2)}`;

// ---------- state ----------
let cart = loadCart();          // { [productId]: qty }
let activeCategory = "all";
let searchTerm = "";

function loadCart(){
  try{
    const raw = localStorage.getItem("cartly_cart");
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function saveCart(){
  try{ localStorage.setItem("cartly_cart", JSON.stringify(cart)); }catch(e){}
}

// ---------- rendering: product grid ----------
const grid = document.getElementById("productGrid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

function iconCircle(category, size){
  const color = CATEGORY_COLORS[category];
  return `<div class="p-icon-wrap" style="background:${color}22;color:${color}">${ICONS[category]}</div>`;
}

function tagRotClass(i){
  return ["rot1","rot2","rot3","rot4","rot5"][i % 5];
}

function renderGrid(){
  const term = searchTerm.trim().toLowerCase();
  const filtered = PRODUCTS.filter(p=>{
    const matchesCat = activeCategory === "all" || p.category === activeCategory;
    const matchesTerm = !term || p.name.toLowerCase().includes(term) || p.blurb.toLowerCase().includes(term);
    return matchesCat && matchesTerm;
  });

  resultCount.textContent = `${filtered.length} item${filtered.length===1?"":"s"}`;
  emptyState.hidden = filtered.length !== 0;
  grid.innerHTML = filtered.map((p,i)=>`
    <div class="p-card">
      ${p.tag ? `<span class="tag ${tagRotClass(i)}"><span class="hole"></span>${p.tag}</span>` : ""}
      ${iconCircle(p.category)}
      <span class="p-cat">${p.category}</span>
      <h3 class="p-name">${p.name}</h3>
      <p class="p-blurb">${p.blurb}</p>
      <div class="p-footer">
        <span class="p-price">${money(p.price)}</span>
        <button class="add-btn" data-id="${p.id}">Add to cart</button>
      </div>
    </div>
  `).join("");
}

grid.addEventListener("click", (e)=>{
  const btn = e.target.closest(".add-btn");
  if(!btn) return;
  addToCart(btn.dataset.id);
  btn.textContent = "Added ✓";
  btn.classList.add("added");
  setTimeout(()=>{ btn.textContent = "Add to cart"; btn.classList.remove("added"); }, 1100);
});

// ---------- category + search controls ----------
document.getElementById("catNav").addEventListener("click", (e)=>{
  const pill = e.target.closest(".pill");
  if(!pill) return;
  activeCategory = pill.dataset.cat;
  document.querySelectorAll(".pill").forEach(p=>p.classList.toggle("active", p===pill));
  renderGrid();
});

document.getElementById("searchBox").addEventListener("input", (e)=>{
  searchTerm = e.target.value;
  renderGrid();
});

// ---------- hero feature (rotating "product of the day") ----------
function renderHero(){
  const feature = PRODUCTS[3]; // Meridian Field Watch — a flagship-feeling pick
  const color = CATEGORY_COLORS[feature.category];
  document.getElementById("heroFeature").innerHTML = `
    <div style="width:100%;display:flex;flex-direction:column;gap:14px;">
      <div style="width:64px;height:64px;border-radius:14px;background:${color};display:flex;align-items:center;justify-content:center;color:var(--paper)">
        <div style="width:30px;height:30px">${ICONS[feature.category]}</div>
      </div>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;color:#cfd8d1;font-size:0.7rem;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;">Featured this week</p>
        <h3 style="color:#fff;font-size:1.5rem;margin-bottom:6px;">${feature.name}</h3>
        <p style="color:#cfd8d1;font-size:0.9rem;max-width:32ch;">${feature.blurb}</p>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">
        <span style="font-family:'JetBrains Mono',monospace;color:#fff;font-weight:700;font-size:1.1rem;">${money(feature.price)}</span>
        <button class="add-btn" data-id="${feature.id}" style="background:var(--mustard);color:var(--ink)">Add to cart</button>
      </div>
    </div>
  `;
  document.getElementById("heroFeature").addEventListener("click", (e)=>{
    const btn = e.target.closest(".add-btn");
    if(!btn) return;
    addToCart(btn.dataset.id);
    btn.textContent = "Added ✓";
    setTimeout(()=>{ btn.textContent = "Add to cart"; }, 1100);
  });
}

// ---------- cart logic ----------
function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
  flashCart();
}
function changeQty(id, delta){
  if(!cart[id]) return;
  cart[id] += delta;
  if(cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}
function removeFromCart(id){
  delete cart[id];
  saveCart();
  renderCart();
}
function cartEntries(){
  return Object.entries(cart).map(([id,qty])=>({ ...PRODUCTS.find(p=>p.id===id), qty }));
}
function cartSubtotal(){
  return cartEntries().reduce((sum,item)=>sum + item.price*item.qty, 0);
}
function cartCount(){
  return Object.values(cart).reduce((a,b)=>a+b,0);
}

function flashCart(){
  const btn = document.getElementById("cartOpenBtn");
  btn.style.transform = "scale(1.12)";
  setTimeout(()=> btn.style.transform = "scale(1)", 150);
}

function renderCart(){
  document.getElementById("cartCount").textContent = cartCount();
  const items = cartEntries();
  const wrap = document.getElementById("drawerItems");
  const empty = document.getElementById("drawerEmpty");
  const summary = document.getElementById("drawerSummary");

  if(items.length === 0){
    wrap.innerHTML = "";
    empty.hidden = false;
    summary.style.display = "none";
    return;
  }
  empty.hidden = true;
  summary.style.display = "block";

  wrap.innerHTML = items.map(item=>{
    const color = CATEGORY_COLORS[item.category];
    return `
    <div class="cart-item" data-id="${item.id}">
      <div class="ci-icon" style="background:${color}22;color:${color}">${ICONS[item.category]}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">${money(item.price)} · <span class="ci-line-total">${money(item.price*item.qty)}</span></div>
        <div class="ci-controls">
          <button class="qty-btn" data-action="dec">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" data-action="inc">+</button>
          <button class="ci-remove" data-action="remove">Remove</button>
        </div>
      </div>
    </div>`;
  }).join("");

  document.getElementById("sumSubtotal").textContent = money(cartSubtotal());
}

document.getElementById("drawerItems").addEventListener("click", (e)=>{
  const row = e.target.closest(".cart-item");
  if(!row) return;
  const id = row.dataset.id;
  const action = e.target.dataset.action;
  if(action === "inc") changeQty(id, 1);
  if(action === "dec") changeQty(id, -1);
  if(action === "remove") removeFromCart(id);
});

// ---------- drawer open/close ----------
const cartDrawer = document.getElementById("cartDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
function openDrawer(){
  cartDrawer.classList.add("open");
  drawerBackdrop.classList.add("show");
}
function closeDrawer(){
  cartDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("show");
}
document.getElementById("cartOpenBtn").addEventListener("click", openDrawer);
document.getElementById("cartCloseBtn").addEventListener("click", closeDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);
document.getElementById("continueShoppingBtn")?.addEventListener("click", closeDrawer);

// ---------- checkout modal ----------
const checkoutBackdrop = document.getElementById("checkoutBackdrop");
function openCheckout(){
  if(cartCount() === 0) return;
  renderOrderRecap();
  checkoutBackdrop.classList.add("show");
  closeDrawer();
}
function closeCheckout(){ checkoutBackdrop.classList.remove("show"); }

document.getElementById("checkoutBtn").addEventListener("click", openCheckout);
document.getElementById("checkoutCloseBtn").addEventListener("click", closeCheckout);
checkoutBackdrop.addEventListener("click", (e)=>{ if(e.target === checkoutBackdrop) closeCheckout(); });

function computeTotals(){
  const subtotal = cartSubtotal();
  const shipping = subtotal >= FREE_SHIPPING_OVER || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}

function renderOrderRecap(){
  const { subtotal, shipping, tax, total } = computeTotals();
  document.getElementById("orderRecap").innerHTML = `
    <div class="rr"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <div class="rr"><span>Shipping</span><span>${shipping===0 ? "Free" : money(shipping)}</span></div>
    <div class="rr"><span>Tax (8%)</span><span>${money(tax)}</span></div>
    <div class="rr total"><span>Total</span><span>${money(total)}</span></div>
  `;
}

// ---------- place order -> receipt ----------
const receiptBackdrop = document.getElementById("receiptBackdrop");
const receiptPaper = document.getElementById("receiptPaper");

document.getElementById("checkoutForm").addEventListener("submit", (e)=>{
  e.preventDefault();
  const name = document.getElementById("custName").value.trim() || "Guest";
  const items = cartEntries();
  const { subtotal, shipping, tax, total } = computeTotals();
  const orderNo = "CTY-" + Math.floor(10000 + Math.random()*89999);
  const now = new Date();
  const dateStr = now.toLocaleDateString(undefined, { month:"short", day:"numeric", year:"numeric" });
  const timeStr = now.toLocaleTimeString(undefined, { hour:"2-digit", minute:"2-digit" });

  receiptPaper.innerHTML = `
    <h3>CARTLY</h3>
    <p class="r-sub">Order receipt · ${dateStr} ${timeStr}</p>
    <div class="r-divider"></div>
    ${items.map(item=>`
      <div class="r-line"><span class="nm">${item.qty}× ${item.name}</span><span>${money(item.price*item.qty)}</span></div>
    `).join("")}
    <div class="r-divider"></div>
    <div class="r-line"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <div class="r-line"><span>Shipping</span><span>${shipping===0 ? "Free" : money(shipping)}</span></div>
    <div class="r-line"><span>Tax</span><span>${money(tax)}</span></div>
    <div class="r-divider"></div>
    <div class="r-line r-total"><span>Total</span><span>${money(total)}</span></div>
    <p class="r-thanks">Thank you, ${name}.<br>Your order is confirmed.</p>
    <p class="r-order">${orderNo}</p>
    <button class="r-close" id="receiptCloseBtn">Continue shopping</button>
  `;

  cart = {};
  saveCart();
  renderCart();
  closeCheckout();
  receiptBackdrop.classList.add("show");
  document.getElementById("checkoutForm").reset();

  document.getElementById("receiptCloseBtn").addEventListener("click", ()=>{
    receiptBackdrop.classList.remove("show");
  });
});
receiptBackdrop.addEventListener("click", (e)=>{ if(e.target === receiptBackdrop) receiptBackdrop.classList.remove("show"); });

// ---------- init ----------
renderHero();
renderGrid();
renderCart();
