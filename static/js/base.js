/* base.js — Saidbek Kamolov Portfolio */

// =================== CURSOR ===================
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;
  const c = document.getElementById('cursor');
  const r = document.getElementById('cursor-ring');
  if(!c||!r) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    c.style.left=mx+'px'; c.style.top=my+'px';
  });
  (function anim(){
    rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
    r.style.left=rx+'px'; r.style.top=ry+'px';
    requestAnimationFrame(anim);
  })();
  document.querySelectorAll('a,button,.skill-card,.proj-card,.cc,.mp-track-item,.mp-btn,.mp-play').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      c.style.width='18px'; c.style.height='18px';
      r.style.width='50px'; r.style.height='50px';
    });
    el.addEventListener('mouseleave',()=>{
      c.style.width='10px'; c.style.height='10px';
      r.style.width='36px'; r.style.height='36px';
    });
  });
})();

// =================== NAVBAR SCROLL ===================
(function(){
  const nav = document.getElementById('navbar');
  if(!nav) return;
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// =================== HAMBURGER ===================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mmOverlay = document.getElementById('mmOverlay');

function openMobileMenu(){
  mobileMenu.classList.add('open');
  mmOverlay.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeMobileMenu(){
  mobileMenu.classList.remove('open');
  mmOverlay.classList.remove('open');
  hamburger.classList.add('open');
  hamburger.classList.remove('open');
  document.body.style.overflow='';
}
if(hamburger){
  hamburger.addEventListener('click',()=>{
    if(mobileMenu.classList.contains('open')) closeMobileMenu();
    else openMobileMenu();
  });
}

// =================== SCROLL ANIMATIONS ===================
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

// =================== MUSIC PLAYER ===================
let tracks = [];
let audio = null;
let curIdx = 0;
let isPlaying = false;
let shuffle = false;
let repeat = false;
let progressTimer = null;
let panelOpen = false;

async function loadTracks(){
  try {
    const res = await fetch('/api/music');
    tracks = await res.json();
    renderTrackList();
    if(tracks.length > 0){
      const idx = Math.floor(Math.random() * tracks.length);
      initAudio(idx);
    }
  } catch(e){
    console.log('Music API error:', e);
    document.getElementById('mpTracks').innerHTML = `
      <div class="mp-tracks-loading">Musiqa topilmadi</div>
    `;
  }
}

function initAudio(idx){
  if(audio){ audio.pause(); clearInterval(progressTimer); }
  curIdx = idx;
  const t = tracks[idx];
  document.getElementById('mpTitle').textContent = t.title;
  document.getElementById('mpArtist').textContent = t.artist;
  renderTrackList();
  if(!t.src){ updatePlayBtn(false); return; }
  audio = new Audio(t.src);
  audio.volume = parseFloat(document.getElementById('volSlider').value);
  audio.addEventListener('ended',()=>{
    if(repeat) playTrack(curIdx);
    else if(shuffle) playTrack(Math.floor(Math.random()*tracks.length));
    else nextTrack();
  });
  audio.addEventListener('loadedmetadata',()=>{
    document.getElementById('mpDur').textContent = fmtTime(audio.duration);
  });
  audio.addEventListener('error',()=>{
    document.getElementById('mpArtist').textContent = 'Fayl topilmadi';
  });
}

function playTrack(idx){
  initAudio(idx);
  if(!audio||!tracks[idx].src) return;
  audio.play().then(()=>{
    isPlaying = true;
    updatePlayBtn(true);
    startProgress();
  }).catch(()=>{});
}

function togglePlay(){
  if(!audio || !tracks[curIdx]?.src){
    if(tracks.length > 0) playTrack(curIdx);
    return;
  }
  if(isPlaying){
    audio.pause();
    isPlaying = false;
    updatePlayBtn(false);
    clearInterval(progressTimer);
  } else {
    audio.play().then(()=>{
      isPlaying = true;
      updatePlayBtn(true);
      startProgress();
    });
  }
}

function updatePlayBtn(playing){
  const disc = document.getElementById('mpDisc');
  const vinyl = document.getElementById('vinylFab');
  const icon = document.getElementById('playIcon');
  if(playing){
    disc?.classList.add('spinning');
    vinyl?.classList.add('spinning');
    if(icon){ icon.setAttribute('data-lucide','pause'); lucide.createIcons(); }
    // wave animation
    document.querySelectorAll('.mp-wave').forEach(w=>w.classList.add('playing'));
  } else {
    disc?.classList.remove('spinning');
    vinyl?.classList.remove('spinning');
    if(icon){ icon.setAttribute('data-lucide','play'); lucide.createIcons(); }
    document.querySelectorAll('.mp-wave').forEach(w=>w.classList.remove('playing'));
  }
}

function nextTrack(){
  let idx = shuffle
    ? Math.floor(Math.random()*tracks.length)
    : (curIdx+1)%tracks.length;
  playTrack(idx);
}
function prevTrack(){
  if(audio && audio.currentTime > 3){ audio.currentTime=0; return; }
  let idx = (curIdx-1+tracks.length)%tracks.length;
  playTrack(idx);
}

function toggleShuffle(){
  shuffle = !shuffle;
  document.getElementById('shuffleBtn')?.classList.toggle('active', shuffle);
}
function toggleRepeat(){
  repeat = !repeat;
  document.getElementById('repeatBtn')?.classList.toggle('active', repeat);
}
function setVolume(v){ if(audio) audio.volume = parseFloat(v); }

function fmtTime(s){
  if(isNaN(s)) return '0:00';
  const m=Math.floor(s/60), sec=Math.floor(s%60);
  return m+':'+(sec<10?'0':'')+sec;
}
function startProgress(){
  clearInterval(progressTimer);
  progressTimer = setInterval(()=>{
    if(audio && audio.duration){
      const pct = (audio.currentTime / audio.duration)*100;
      document.getElementById('mpFill').style.width = pct+'%';
      document.getElementById('mpCur').textContent = fmtTime(audio.currentTime);
    }
  },500);
}

document.getElementById('mpBar')?.addEventListener('click',function(e){
  if(!audio) return;
  const pct = e.offsetX / this.offsetWidth;
  audio.currentTime = pct * audio.duration;
});

function renderTrackList(){
  const container = document.getElementById('mpTracks');
  if(!tracks.length){ container.innerHTML='<div class="mp-tracks-loading">Musiqa yo\'q</div>'; return; }
  container.innerHTML = tracks.map((t,i)=>`
    <div class="mp-track-item ${i===curIdx?'active':''}" onclick="playTrack(${i})">
      <div class="mp-wave ${isPlaying&&i===curIdx?'playing':''}">
        <span></span><span></span><span></span><span></span>
      </div>
      <span class="mp-track-num">${i+1}</span>
      <div class="mp-track-info-li">
        <div class="mp-track-name-li">${t.title}</div>
        <div class="mp-track-art-li">${t.artist}</div>
      </div>
    </div>
  `).join('');
}

function toggleMusicPanel(){
  panelOpen = !panelOpen;
  document.getElementById('music-panel').classList.toggle('open', panelOpen);
}

// Init music on page load
window.addEventListener('load', loadTracks);