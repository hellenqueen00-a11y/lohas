const dialog=document.querySelector('#media-dialog');
const content=document.querySelector('#media-content');
const title=document.querySelector('#media-title');
function openMedia(label){title.textContent=label;content.replaceChildren();dialog.showModal();document.body.style.overflow='hidden'}
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{openMedia(button.dataset.title);const video=document.createElement('video');video.src=button.dataset.video;video.controls=true;video.playsInline=true;video.preload='metadata';content.append(video);video.play().catch(()=>{});}));
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{openMedia(button.dataset.title);const img=document.createElement('img');img.src=button.dataset.image;img.alt=button.dataset.title;content.append(img)}));
document.querySelector('#menu-open').addEventListener('click',()=>{openMedia('코코망고 메뉴');const note=document.createElement('p');note.className='menu-note';note.textContent='제공된 메뉴 자료입니다. 메뉴와 가격은 변경될 수 있으니 이용 전 확인해 주세요.';content.append(note);const grid=document.createElement('div');grid.className='menu-grid';for(let i=2;i<=11;i++){const img=document.createElement('img');img.src=`assets/coco-${i}.jpg`;img.alt=`코코망고 메뉴 ${i-1}`;img.loading='lazy';grid.append(img)}content.append(grid)});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>{const video=content.querySelector('video');if(video)video.pause();content.replaceChildren();document.body.style.overflow=''});
const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){document.querySelectorAll('nav a').forEach(a=>{const current=a.hash===`#${entry.target.id}`;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}},{rootMargin:'-20% 0px -60% 0px'});document.querySelectorAll('#ocean,#dining,#hotel,#next').forEach(section=>observer.observe(section));

const heroVideo=document.querySelector("#hero-video");
const heroPlay=document.querySelector("#hero-play");
const heroSound=document.querySelector("#hero-sound");
heroPlay.addEventListener("click",()=>{if(heroVideo.paused){heroVideo.play().catch(()=>{heroPlay.textContent="영상 재생"})}else{heroVideo.pause()}});
heroVideo.addEventListener("play",()=>{heroPlay.textContent="일시정지"});
heroVideo.addEventListener("pause",()=>{heroPlay.textContent="영상 재생"});
let waitingForSound=false;
function syncSound(){heroSound.textContent=heroVideo.muted?"음악 켜기":"음악 끄기";heroSound.setAttribute("aria-pressed",String(!heroVideo.muted))}
heroVideo.addEventListener("volumechange",syncSound);
heroSound.addEventListener("click",()=>{waitingForSound=false;heroVideo.muted=!heroVideo.muted;syncSound();if(!heroVideo.muted)heroVideo.play().catch(()=>{heroPlay.textContent="영상 재생"})});
heroVideo.muted=false;
heroVideo.play().catch(()=>{waitingForSound=true;heroVideo.muted=true;syncSound();heroVideo.play().catch(()=>{heroPlay.textContent="영상 재생"})});
function startMusic(event){if(!waitingForSound||event.target.closest("button,video,dialog"))return;waitingForSound=false;heroVideo.muted=false;syncSound();heroVideo.play().catch(()=>{waitingForSound=true;heroVideo.muted=true;syncSound()})}
document.addEventListener("click",startMusic);
document.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" ")startMusic(event)});

let resumeAfterMedia=false;
document.querySelectorAll("[data-video]").forEach(button=>button.addEventListener("click",()=>{resumeAfterMedia=!heroVideo.paused;heroVideo.pause()}));
dialog.addEventListener("close",()=>{if(resumeAfterMedia){resumeAfterMedia=false;heroVideo.play().catch(()=>{heroPlay.textContent="영상 재생"})}});



