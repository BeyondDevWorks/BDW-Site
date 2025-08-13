// Tabs + Smooth Scroll
const tabs = document.querySelectorAll('.tab');
const navLinks = document.querySelectorAll('[data-tab]');
function activateTab(id){
  tabs.forEach(t => t.classList.toggle('active', t.id === id));
  window.location.hash = id;
  // Fokus für Screenreader
  document.getElementById(id).setAttribute('tabindex','-1');
  document.getElementById(id).focus({preventScroll:true});
  window.scrollTo({top:0, behavior:'smooth'});
}
navLinks.forEach(el=>{
  el.addEventListener('click', (e)=>{
    const id = el.getAttribute('data-tab');
    if(id){ e.preventDefault(); activateTab(id); }
  });
});
window.addEventListener('load', ()=>{
  const hash = (location.hash || '#home').replace('#','');
  if(document.getElementById(hash)) activateTab(hash);
  document.getElementById('year').textContent = new Date().getFullYear();
});



// Scroll-Reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Feature Suche
const featureSearch = document.getElementById('featureSearch');
const featureList = document.getElementById('featureList');
if(featureSearch && featureList){
  featureSearch.addEventListener('input', ()=>{
    const q = featureSearch.value.trim().toLowerCase();
    featureList.querySelectorAll('.card').forEach(card=>{
      const hay = (card.textContent + ' ' + (card.dataset.tags||'')).toLowerCase();
      card.style.display = hay.includes(q) ? '' : 'none';
    });
  });
}

// Copy SHA-256
const copyBtn = document.getElementById('copyHashBtn');
if(copyBtn){
  copyBtn.addEventListener('click', ()=>{
    const sel = copyBtn.getAttribute('data-copy');
    const el = document.querySelector(sel);
    if(!el) return;
    const text = el.textContent.trim();
    navigator.clipboard.writeText(text).then(()=>{
      copyBtn.textContent = 'Kopiert ✔';
      setTimeout(()=>copyBtn.textContent='SHA-256 kopieren', 1400);
    });
  });
}


const appImages = {
  app1: ['assets/img/beyondmusic_show2.png', 'assets/img/beyondmusic_show.png'],
  app2: ['app2-1-gross.jpg', 'app2-2-gross.jpg']
};

let currentApp = '';
let currentIndex = 0;

function openLightbox(app, index) {
  currentApp = app;
  currentIndex = index;
  document.getElementById('lightbox-img').src = appImages[app][index];
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function nextImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex + 1) % appImages[currentApp].length;
  document.getElementById('lightbox-img').src = appImages[currentApp][currentIndex];
}

function prevImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex - 1 + appImages[currentApp].length) % appImages[currentApp].length;
  document.getElementById('lightbox-img').src = appImages[currentApp][currentIndex];
}
