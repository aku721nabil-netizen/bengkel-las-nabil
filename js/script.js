  document.getElementById('yr').textContent = new Date().getFullYear();

  /* ======================================================
     PRELOADER BOOT SEQUENCE
     ====================================================== */
  const preloader = document.getElementById('preloader');
  const bootPct = document.getElementById('bootPct');
  const bootBarFill = document.getElementById('bootBarFill');
  const hero = document.getElementById('hero');
  const heroBody = document.getElementById('heroBody');

  let pct = 0;
  function boot(){
    pct += Math.random()*14 + 6;
    if(pct >= 100){
      pct = 100;
      bootPct.textContent = '100%';
      bootBarFill.style.width = '100%';
      setTimeout(()=>{
        preloader.classList.add('hide');
        hero.classList.add('loaded');
        heroBody.classList.add('ready');
        setTimeout(()=> preloader.style.display = 'none', 1000);
      }, 220);
      return;
    }
    bootPct.textContent = Math.floor(pct) + '%';
    bootBarFill.style.width = pct + '%';
    setTimeout(boot, 120 + Math.random()*90);
  }
  setTimeout(boot, 260);

  /* ======================================================
     SCROLL PROGRESS GAUGE
     ====================================================== */
  const scrollProgress = document.getElementById('scrollProgress');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateProgress, {passive:true});

  /* ======================================================
     BACK TO TOP
     ====================================================== */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{
    backToTop.classList.toggle('show', window.scrollY > window.innerHeight*0.6);
  }, {passive:true});
  backToTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  /* ======================================================
     HERO PARALLAX (with smoothing / lerp)
     ====================================================== */
  const heroGrid = document.getElementById('heroGrid');
  const decoEls = document.querySelectorAll('.deco');
  const heroWrap = document.getElementById('heroPhotoWrap');
  let targetX = 0, targetY = 0, curX = 0, curY = 0;

  heroWrap.addEventListener('mousemove', (e)=>{
    const r = heroWrap.getBoundingClientRect();
    targetX = (e.clientX - r.left)/r.width - 0.5;
    targetY = (e.clientY - r.top)/r.height - 0.5;
  });
  heroWrap.addEventListener('mouseleave', ()=>{ targetX = 0; targetY = 0; });

  function parallaxLoop(){
    curX += (targetX - curX) * 0.08;
    curY += (targetY - curY) * 0.08;
    heroGrid.style.transform = `translate(${curX*10}px, ${curY*10}px)`;
    decoEls.forEach((el,i)=>{
      const depth = (i+1)*4;
      el.style.transform = `translate(${curX*depth}px, ${curY*depth}px)`;
    });
    requestAnimationFrame(parallaxLoop);
  }
  parallaxLoop();

  window.addEventListener('scroll', ()=>{
    const p = Math.min(window.scrollY / (window.innerHeight*0.8), 1);
    heroGrid.style.opacity = 0.5 - p*0.3;
    document.getElementById('heroPhoto').style.transform = `scale(${1.1 + p*0.05})`;
  }, {passive:true});

  document.getElementById('scrollCue').addEventListener('click', ()=>{
    document.getElementById('portfolio').scrollIntoView({behavior:'smooth'});
  });

  /* ======================================================
     MAGNETIC BUTTONS
     ====================================================== */
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('mousemove', (e)=>{
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width/2);
      const my = e.clientY - (r.top + r.height/2);
      el.style.transform = `translate(${mx*0.25}px, ${my*0.3}px)`;
    });
    el.addEventListener('mouseleave', ()=>{ el.style.transform = 'translate(0,0)'; });
  });

  /* ======================================================
     STATS COUNT-UP
     ====================================================== */
  const statEls = document.querySelectorAll('.stat-num');
  const statIO = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const el = en.target;
        const target = parseInt(el.dataset.target, 10);
        const start = performance.now();
        const dur = 1400;
        function step(now){
          const t = Math.min((now-start)/dur, 1);
          const eased = 1 - Math.pow(1-t, 3);
          el.textContent = Math.floor(eased * target) + (t>=1 ? '+' : '');
          if(t < 1) requestAnimationFrame(step);
          else el.textContent = target + '+';
        }
        requestAnimationFrame(step);
        statIO.unobserve(el);
      }
    });
  }, {threshold:0.5});
  statEls.forEach(el=> statIO.observe(el));

  /* ======================================================
     BUILD PROJECT CARDS
     ====================================================== */
  const projects = [
    { title:"fabrikasi rangka", desc:"Pengerjaan rangka baja untuk bangunan dengan pengelasan presisi dan konstruksi yang kokoh, kuat, serta siap digunakan dalam jangka panjang." },
    { title:"Pemasangan Rangka Atap", desc:"Pembuatan dan pemasangan rangka atap menggunakan material besi dengan sambungan las yang kuat dan pengerjaan yang rapi sesuai kebutuhan bangunan." },
    { title:"Pagar Besi Dekoratif", desc:"Pembuatan pagar besi dengan desain dekoratif yang mengutamakan kekuatan, kerapian, dan tampilan yang sesuai dengan karakter rumah atau bangunan." },
    { title:"Pembuatan Pagar & Gerbang", desc:"Fabrikasi pagar dan gerbang besi custom dengan konstruksi kokoh, hasil las rapi, serta desain yang dapat disesuaikan dengan kebutuhan pelanggan." },
    { title:"Pembuatan Kanopi Besi", desc:"Pengerjaan rangka kanopi dengan konstruksi kuat dan presisi, cocok untuk teras, halaman, maupun area tambahan pada bangunan." },
    { title:"Fabrikasi Besi Custom", desc:"Mengerjakan berbagai kebutuhan fabrikasi besi custom, mulai dari pagar, gerbang, rangka, hingga konstruksi lainnya dengan hasil las yang kuat dan rapi." },
    { title:"Pembuatan & Perbaikan Railing", desc:"Pembuatan dan perbaikan railing besi untuk tangga maupun area bangunan dengan hasil las yang kuat, rapi, dan aman." },
    { title:"Fabrikasi Rangka Bangunan", desc:"Pengerjaan rangka besi untuk berbagai kebutuhan konstruksi, dengan pengelasan presisi dan struktur yang kokoh." },
    { title:"Pembuatan Pintu & Gerbang Besi", desc:"Pembuatan pintu dan gerbang besi custom dengan desain sesuai kebutuhan, dipadukan dengan konstruksi kuat dan hasil pengerjaan yang rapi." },
    { title:"Pembuatan Kanopi & Rangka Atap", desc:"Pembuatan serta pemasangan rangka kanopi dan atap besi dengan konstruksi kokoh, sambungan las kuat, dan pengerjaan presisi." },
    { title:"Fabrikasi Struktur Besi", desc:"Pengerjaan struktur dan konstruksi besi untuk berbagai kebutuhan bangunan, mulai dari rangka hingga struktur custom dengan sambungan las yang kuat." }
  ];

  const grid = document.getElementById('grid');
  const cardEls = [];

  projects.forEach((p, i)=>{
    const src = `images/proyek-${String(i+1).padStart(2,'0')}.jpg`;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <span class="rivet-b1"></span><span class="rivet-b2"></span>
      <div class="card-photo">
        <span class="card-index">${String(i+1).padStart(2,'0')}</span>
        <img class="card-img" loading="lazy" src="${src}" alt="Hasil pekerjaan: ${p.title}">
        <span class="card-speckle"></span>
        <button class="reveal-btn" aria-label="Tampilkan foto: ${p.title}">
          <span class="card-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/></svg>
            Lihat foto
          </span>
        </button>
        <span class="card-glare"></span>
        <button class="zoom-btn" aria-label="Perbesar foto: ${p.title}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>
        </button>
      </div>
      <div class="card-caption">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    `;
    grid.appendChild(card);
    cardEls.push(card);

    const revealBtn = card.querySelector('.reveal-btn');
    revealBtn.addEventListener('click', (e)=>{
      const willReveal = !card.classList.contains('revealed');
      card.classList.toggle('revealed');
      if(willReveal) spawnBurst(e.clientX, e.clientY, 26);
    });

    card.querySelector('.zoom-btn').addEventListener('click', (e)=>{
      e.stopPropagation();
      openLightbox(i);
    });

    /* 3D tilt + glare */
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left)/r.width;
      const py = (e.clientY - r.top)/r.height;
      const rx = (py - 0.5) * -10;
      const ry = (px - 0.5) * 12;
      card.classList.add('tilting');
      card.style.transform = `translateY(0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      const glare = card.querySelector('.card-glare');
      glare.style.setProperty('--mx', (px*100)+'%');
      glare.style.setProperty('--my', (py*100)+'%');
      card.classList.add('tilt-hover');
    });
    card.addEventListener('mouseleave', ()=>{
      card.classList.remove('tilting','tilt-hover');
      card.style.transform = '';
    });
  });

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('in-view');
        io.unobserve(en.target);
      }
    });
  }, {threshold:0.15});
  cardEls.forEach(c=> io.observe(c));

  /* ======================================================
     LIGHTBOX LOGIC
     ====================================================== */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbTitle = document.getElementById('lbTitle');
  const lbDesc = document.getElementById('lbDesc');
  const lbCount = document.getElementById('lbCount');
  let lbIndex = 0;

  function openLightbox(i){
    lbIndex = i;
    renderLightbox();
    lightbox.classList.add('open');
  }
  function renderLightbox(){
    const p = projects[lbIndex];
    lbImg.src = `images/proyek-${String(lbIndex+1).padStart(2,'0')}.jpg`;
    lbImg.alt = p.title;
    lbTitle.textContent = p.title;
    lbDesc.textContent = p.desc;
    lbCount.textContent = String(lbIndex+1).padStart(2,'0') + ' / ' + String(projects.length).padStart(2,'0');
  }
  function closeLightbox(){ lightbox.classList.remove('open'); }
  function lbStep(dir){ lbIndex = (lbIndex + dir + projects.length) % projects.length; renderLightbox(); }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', ()=> lbStep(-1));
  document.getElementById('lbNext').addEventListener('click', ()=> lbStep(1));
  lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e)=>{
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') lbStep(-1);
    if(e.key === 'ArrowRight') lbStep(1);
  });

  let touchStartX = null;
  lightbox.addEventListener('touchstart', (e)=>{ touchStartX = e.changedTouches[0].clientX; }, {passive:true});
  lightbox.addEventListener('touchend', (e)=>{
    if(touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if(Math.abs(dx) > 40) lbStep(dx > 0 ? -1 : 1);
    touchStartX = null;
  }, {passive:true});

  /* ======================================================
     WELDING SPARK CANVAS (ambient, section heading)
     ====================================================== */
  const canvas = document.getElementById('sparkCanvas');
  const ctx = canvas.getContext('2d');
  let ambientParticles = [];
  function resizeCanvas(){
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function spawnAmbientSpark(){
    const cx = canvas.width/2;
    const cy = canvas.height*0.35;
    for(let i=0;i<3;i++){
      ambientParticles.push({
        x:cx, y:cy,
        vx:(Math.random()-0.5)*3.2*devicePixelRatio,
        vy:(Math.random()*-2.4 - 0.4)*devicePixelRatio,
        life:1,
        size:(Math.random()*1.6+0.6)*devicePixelRatio
      });
    }
  }
  function drawSparkParticle(p){
    const alpha = Math.max(p.life,0);
    const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*3);
    grad.addColorStop(0, `rgba(255,230,170,${alpha})`);
    grad.addColorStop(0.5, `rgba(255,140,60,${alpha*0.7})`);
    grad.addColorStop(1, `rgba(255,90,30,0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size*3, 0, Math.PI*2);
    ctx.fill();
  }
  function ambientTick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(!reduceMotion && Math.random() < 0.55) spawnAmbientSpark();
    ambientParticles.forEach(p=>{ p.x += p.vx; p.y += p.vy; p.vy += 0.09*devicePixelRatio; p.life -= 0.028; });
    ambientParticles = ambientParticles.filter(p=> p.life > 0);
    ambientParticles.forEach(drawSparkParticle);
    requestAnimationFrame(ambientTick);
  }
  ambientTick();

  /* ======================================================
     CLICK SPARK BURST (full-viewport overlay canvas)
     ====================================================== */
  const burstCanvas = document.getElementById('burstCanvas');
  const bctx = burstCanvas.getContext('2d');
  let burstParticles = [];
  function resizeBurst(){
    burstCanvas.width = window.innerWidth * devicePixelRatio;
    burstCanvas.height = window.innerHeight * devicePixelRatio;
  }
  resizeBurst();
  window.addEventListener('resize', resizeBurst);

  function spawnBurst(clientX, clientY, count){
    if(reduceMotion) return;
    const x = clientX * devicePixelRatio;
    const y = clientY * devicePixelRatio;
    for(let i=0;i<count;i++){
      const angle = Math.random()*Math.PI*2;
      const speed = (Math.random()*3.5 + 1.5) * devicePixelRatio;
      burstParticles.push({
        x, y,
        vx:Math.cos(angle)*speed,
        vy:Math.sin(angle)*speed - 1*devicePixelRatio,
        life:1,
        size:(Math.random()*1.4 + 0.6)*devicePixelRatio
      });
    }
  }
  function burstTick(){
    bctx.clearRect(0,0,burstCanvas.width, burstCanvas.height);
    burstParticles.forEach(p=>{
      p.x += p.vx; p.y += p.vy; p.vy += 0.16*devicePixelRatio; p.life -= 0.035;
    });
    burstParticles = burstParticles.filter(p=> p.life > 0);
    burstParticles.forEach(p=>{
      const alpha = Math.max(p.life,0);
      const grad = bctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*3);
      grad.addColorStop(0, `rgba(255,240,190,${alpha})`);
      grad.addColorStop(0.5, `rgba(255,150,60,${alpha*0.75})`);
      grad.addColorStop(1, `rgba(255,90,30,0)`);
      bctx.fillStyle = grad;
      bctx.beginPath();
      bctx.arc(p.x, p.y, p.size*3, 0, Math.PI*2);
      bctx.fill();
    });
    requestAnimationFrame(burstTick);
  }
  burstTick();
