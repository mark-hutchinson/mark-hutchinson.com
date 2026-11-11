// ---- Experience data ----
const EXPERIENCE = [
  {
    company: "Volleyball Showcase", accent: true, dates: "2026 — Now",
    project: "Canadian University Volleyball Showcase · SaaS", role: "Founding Engineer",
    desc: "Sole engineer on a SaaS product for a national youth volleyball recruitment event, built and shipped with an AI-first workflow (Claude Code) while owning architecture, code review and production operations. Admins review applications and accept athletes; athletes claim accounts, pay through Stripe and manage their profiles; university coaches search, filter and message athletes. First season: 787 applications, 269 athletes accepted, 94% account-claim rate and $99K CAD processed through Stripe Checkout.",
    tech: "Go · gRPC · PostgreSQL · React · TypeScript · Stripe · Firebase",
    link: "https://app.canadianvolleyballshowcase.com/",
    images: ["assets/showcase.png", "assets/showcase2.jpg", "assets/showcase3.jpg", "assets/showcase4.jpg", "assets/showcase5.jpg", "assets/showcase6.jpg", "assets/showcase7.jpg", "assets/showcase8.jpg", "assets/showcase9.jpg", "assets/showcase10.jpg"]
  },
  {
    company: "Limit Break", dates: "2022 — 2026",
    project: "Core Services · Puzzle Panic", role: "Senior Software Engineer",
    desc: "First server engineer: architected the backend from the ground up as Go microservices over gRPC, backed by MySQL, Redis and Kafka. Built the observability stack (Prometheus, Grafana) and defined alerting with SRE; built in-app purchases, guilds, friends and card collection; rebuilt a Node.js backend in Go with a full accounts system (Firebase auth, Twilio 2FA); built an event-driven service consuming Ethereum events into S3 processing and an LLM localization pipeline on AWS Bedrock. On-call for all backend systems.",
    tech: "Go · gRPC · Kafka · MySQL · Redis · Prometheus · AWS · React",
    images: ["assets/limitbreak.png"]
  },
  {
    company: "Zynga", dates: "2016 — 2022",
    project: "Zynga Poker", role: "Principal Software Engineer",
    desc: "Promoted to Principal (2016), then Principal II (2021). Designed, built and ran the in-app purchase services: product configuration tools, virtual-currency grants, loyalty and progressive-sale features. Integrated Stripe for the off-Facebook zyngapoker.com. Managed a team of 7 engineers (hiring, onboarding, performance reviews), and was a core member of the small team that rewrote the legacy game server as Go microservices.",
    tech: "Go · PHP · Hack · C#",
    images: ["assets/poker.png","assets/poker2.png","assets/poker3.png","assets/poker4.png","assets/poker5.png"]
  },
  {
    company: "Zynga", dates: "2014 — 2016",
    project: "Word Streak with Friends", role: "Senior Software Engineer",
    desc: "Rebuilt the UI of every screen in the iOS app for its rebrand from Scramble With Friends, working in Objective-C with a small iOS team, plus core updates in Cocos2d-x (C++).",
    tech: "Objective-C · C++",
    images: ["assets/wordstreak.png","assets/wordstreak2.png","assets/wordstreak3.png","assets/wordstreak4.png","assets/wordstreak5.png"]
  },
  {
    company: "Zynga", dates: "2011 — 2014",
    project: "FarmVille 2", role: "Software Engineer → Senior Engineer",
    desc: "Joined pre-launch to build core systems, then became pod lead for 4–5 engineers: mentoring, estimating features and allocating work. Led multi-month projects such as a competitive leaderboard and a much-reused scriptable onboarding system, delivered on schedule for a product with 9M+ daily active users.",
    tech: "PHP · ActionScript",
    images: ["assets/farmville.png","assets/farm2.png","assets/farm3.png","assets/farm4.png","assets/farm5.png"]
  },
  {
    company: "IBM Canada", dates: "2008 — 2011",
    project: "Rational Application Developer", role: "Software Developer",
    desc: "Built XML and web-service tooling for Rational Application Developer and Eclipse WTP in Java, including Java EE 6 web-service generation on WebSphere 8. Acted as the team's focal point for performance: designed and ran performance tests, profiled execution time and memory, and shipped fixes.",
    tech: "Java · Eclipse WTP",
    images: ["assets/ibm.png"]
  }
];

// ---- Lightbox (full-size image viewer) ----
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
const lbCounter = lb.querySelector('.lb-counter');
let lbState = null; // { images, idx, alt, onChange, returnFocus }

function lbShow(n) {
  const { images } = lbState;
  lbState.idx = (n + images.length) % images.length;
  lbImg.src = images[lbState.idx];
  lbImg.alt = lbState.alt;
  const multi = images.length > 1;
  lb.querySelector('.lb-prev').hidden = !multi;
  lb.querySelector('.lb-next').hidden = !multi;
  lb.classList.remove('zoomed');
  lbCounter.textContent = (multi ? (lbState.idx + 1) + ' / ' + images.length + ' · ' : '') + 'tap image to zoom';
  lbState.onChange(lbState.idx);
}
function openLightbox(images, idx, alt, onChange) {
  lbState = { images, idx, alt, onChange, returnFocus: document.activeElement };
  lb.hidden = false;
  document.body.classList.add('lb-open');
  lbShow(idx);
  lb.querySelector('.lb-close').focus();
}
function closeLightbox() {
  if (!lbState) return;
  lb.hidden = true;
  lb.classList.remove('zoomed');
  document.body.classList.remove('lb-open');
  if (lbState.returnFocus) lbState.returnFocus.focus();
  lbState = null;
}
lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
lb.querySelector('.lb-prev').addEventListener('click', () => lbShow(lbState.idx - 1));
lb.querySelector('.lb-next').addEventListener('click', () => lbShow(lbState.idx + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
lbImg.addEventListener('click', () => lb.classList.toggle('zoomed'));
document.addEventListener('keydown', (e) => {
  if (!lbState) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowLeft') lbShow(lbState.idx - 1);
  else if (e.key === 'ArrowRight') lbShow(lbState.idx + 1);
});
let touchX = null;
lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
  if (touchX === null || !lbState || lb.classList.contains('zoomed')) return;
  const dx = e.changedTouches[0].clientX - touchX;
  touchX = null;
  if (Math.abs(dx) > 40) lbShow(lbState.idx + (dx < 0 ? 1 : -1));
});

// ---- Render rows + carousels ----
function renderRows(items, list) {
items.forEach((exp) => {
  let cur = 0;
  const multi = exp.images.length > 1;

  const row = document.createElement('div');
  row.className = 'exprow';
  row.innerHTML = `
    <div>
      <div class="exp-company" style="color:${exp.accent ? 'var(--accent)' : '#f4f6f4'}">${exp.company}</div>
      <div class="exp-dates">${exp.dates}</div>
    </div>
    <div>
      <div class="exp-project">${exp.project}</div>
      <div class="exp-role">${exp.role}</div>
      <p class="exp-desc">${exp.desc}</p>
      <div class="exp-tech">${exp.tech}</div>
    </div>
    <div class="media">
      <div class="stage">
        <img alt="${exp.project}">
        <button class="expand" aria-label="View larger"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M10 2h4v4M6 14H2v-4M14 2 9.5 6.5M2 14l4.5-4.5"/></svg></button>
        ${multi ? '<button class="arrow prev" aria-label="Previous">‹</button><button class="arrow next" aria-label="Next">›</button>' : ''}
      </div>
      <div class="stagebar">
        <div class="dots"></div>
        <div class="counter"></div>
      </div>
    </div>`;
  list.appendChild(row);

  const img = row.querySelector('.stage img');
  const dotsEl = row.querySelector('.dots');
  const counter = row.querySelector('.counter');

  const expand = () => openLightbox(exp.images, cur, exp.project, show);
  img.addEventListener('click', expand);
  row.querySelector('.expand').addEventListener('click', expand);

  if (multi) {
    exp.images.forEach((_, j) => {
      const d = document.createElement('button');
      d.className = 'dot';
      d.setAttribute('aria-label', 'Go to image ' + (j + 1));
      d.addEventListener('click', () => show(j));
      dotsEl.appendChild(d);
    });
    row.querySelector('.prev').addEventListener('click', () => show((cur - 1 + exp.images.length) % exp.images.length));
    row.querySelector('.next').addEventListener('click', () => show((cur + 1) % exp.images.length));
  }

  function show(n) {
    cur = n;
    img.src = exp.images[cur];
    if (multi) {
      counter.textContent = (cur + 1) + ' / ' + exp.images.length;
      [...dotsEl.children].forEach((d, j) => d.classList.toggle('active', j === cur));
    }
  }
  show(0);
});
}
renderRows(EXPERIENCE, document.getElementById('exp-list'));

// ---- Cupcake easter egg ----
const cupcake = document.getElementById('cupcake');
const dogname = document.getElementById('dogname');
const showDog = () => cupcake.classList.add('up');
const hideDog = () => cupcake.classList.remove('up');
dogname.addEventListener('mouseenter', showDog);
dogname.addEventListener('mouseleave', hideDog);
dogname.addEventListener('focus', showDog);
dogname.addEventListener('blur', hideDog);
dogname.addEventListener('click', () => {
  showDog();
  clearTimeout(dogname._t);
  dogname._t = setTimeout(hideDog, 2500);
});

// ---- Accent color cycle (MH logo) ----
const PALETTE = ['#c8f135', '#5bd6c4', '#8aa0ff', '#ff8a6b', '#f5c542'];
let accentIdx = 0;
document.getElementById('logo').addEventListener('click', () => {
  accentIdx = (accentIdx + 1) % PALETTE.length;
  document.documentElement.style.setProperty('--accent', PALETTE[accentIdx]);
});
