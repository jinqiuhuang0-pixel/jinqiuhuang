if ('scrollRestoration' in history) history.scrollRestoration='manual';
if (location.hash) history.replaceState(null,'',`${location.pathname}${location.search}`);
scrollTo(0,0);

const projects=[
{id:'niu',no:'01',section:'AI CINEMATIC & MOTION',title:'NIU ELECTRIC',zh:'小牛电动',meta:'STORYBOARD / VISUAL DEVELOPMENT / MOTION',copy:'从手绘分镜与画面开发出发，以镜头连续性构建速度、机械与运动叙事。',color:'#181438',cover:0,dark:true,coverSrc:"./media/covers/niu-v2.png"},
{id:'xuliang',no:'02',section:'AI CINEMATIC & MOTION',title:'TIME FOLD',zh:'徐良《时间折叠》',meta:'IMAGE DIRECTION / SEQUENCE',copy:'紧扣青春怀旧与日常物件，为QQ炫舞演唱会输出统一风格的AI VJ关键帧序列。',color:'#cfe2bd',cover:0,coverSrc:"./media/covers/xuliang-v2.png"},
{id:'pony',no:'03',section:'AI CINEMATIC & MOTION',title:'MY LITTLE PONY',zh:'小马宝莉',meta:'CHARACTER SYSTEM / ART DEVELOPMENT / MOTION',copy:'围绕不同角色建立统一而具有辨识度的造型系统，并延展至画面与动态输出。',color:'#f0a7cb',cover:0,coverSrc:"./media/covers/pony-v2.jpg"},
{id:'mcgrady',no:'04',section:'AI CINEMATIC & MOTION',title:'TRACY McGRADY / NBA2K',zh:'麦迪 NBA2K',meta:'CINEMATIC LIGHTING / CHARACTER PRESENCE',copy:'以红色烟雾、轮廓光和低调环境强化角色存在感，密集连续画面形成影视级节奏。',color:'#8d1420',cover:0,dark:true},
{id:'chagee',no:'05',section:'BRAND ART DIRECTION & AI KV',title:'CHAGEE',zh:'霸王茶姬',meta:'BRAND KV / ART PROPS / APPLICATION',copy:'由概念视觉推进至美术开发、道具与实际制作现场，呈现完整品牌美术链路。',color:'#cbbbe9',cover:0,coverSrc:"./media/covers/chagee-hd.png"},
{id:'lesamedi',no:'06',section:'BRAND ART DIRECTION & AI KV',title:'LE SAMEDI',zh:'此间构筑',meta:'ART PLANNING / KEY VISUAL / LANDED CAMPAIGN',copy:'为品牌秋冬系列大秀进行视觉概念策划，并完成KV、邀请函等一系列物料设计。',color:'#6e1729',cover:32,coverSrc:"./media/covers/lesamedi-hd.png",dark:true},
{id:'illustration',no:'07',section:'PERSONAL ILLUSTRATION',title:'PERSONAL ILLUSTRATION',zh:'个人手绘创作',meta:'DRAWING / SERIES',copy:'以手绘痕迹、层叠肌理与叙事性构图持续展开的个人视觉研究。',color:'#ffffff',cover:0},
{id:'weightlab',no:'08',section:'DESIGN × CODE EXPERIMENTS',title:'VARIABLE WEIGHT LAB',zh:'PNG 字重调节工作台',meta:'INTERACTIVE TOOL / TYPE EXPERIMENT',copy:'一张图像，几个滑块，快速、高效感受字形在细与粗之间自由流动。',color:'#ffffff',cover:0,coverSrc:'./media/works/weightlab/art-weight-contact-sheet.png'},
{id:'promptskill',no:'09',section:'DESIGN × CODE EXPERIMENTS',title:'PROMPT SKILL',zh:'提示词工作流',meta:'AI WORKFLOW / PROMPT DESIGN',copy:'把反复解释的创作判断，变成可复用的提示词工作流。',color:'#ffffff',cover:0,coverSrc:'./media/works/promptskill/cover.svg'}];

const manifest=await fetch('./media/manifest.json').then(r=>r.json());
const grouped=manifest.reduce((all,item)=>{(all[item.project]??=[]).push(item);return all},{});
grouped.illustration=[
{src:'./media/works/illustration/guanzizai-02.jpg',orientation:'portrait',type:'image'},
{src:'./media/works/illustration/guanzizai-01-web.jpg',orientation:'portrait',type:'image'},
{src:'./media/works/illustration/fushiji-01-web.jpg',orientation:'portrait',type:'image'},
{src:'./media/works/illustration/fushiji-02-web.jpg',orientation:'portrait',type:'image'}];

const works=document.querySelector('#works');
const worksIndex=document.querySelector('#works-index');
const rail=document.querySelector('#works-rail');
const detail=document.querySelector('#project-detail');
const coverFor=project=>project.coverSrc?{src:project.coverSrc}:(grouped[project.id]||[])[project.cover]||(grouped[project.id]||[])[0];
function cardMarkup(project){const cover=coverFor(project);return `<button class="work-card" type="button" data-open-project="${project.id}"><span class="work-card-visual"><img src="${cover?.src||''}" alt="${project.zh}" loading="lazy"><span class="work-card-action" data-scramble="VIEW PROJECT">VIEW PROJECT</span></span><span class="work-card-info"><strong data-scramble="${project.title}">${project.title}</strong><small>${project.zh}<br>${project.meta}</small></span></button>`}
const railProjects=projects.filter(project=>!['weightlab','promptskill'].includes(project.id));
rail.innerHTML=[...railProjects,...railProjects].map(cardMarkup).join('');

const scrambleGlyphs='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function scrambleText(element){
 const finalText=element.dataset.scramble||element.textContent,token=String((Number(element.dataset.scrambleToken)||0)+1);element.dataset.scrambleToken=token;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){element.textContent=finalText;return}
 const start=performance.now(),duration=680,characters=[...finalText],letterCount=characters.filter(character=>/[A-Za-z0-9]/.test(character)).length;
 function frame(now){if(element.dataset.scrambleToken!==token)return;const progress=Math.min(1,(now-start)/duration),resolved=Math.floor(progress*letterCount);let letterIndex=0;element.textContent=characters.map(character=>{if(!/[A-Za-z0-9]/.test(character))return character;const value=letterIndex++<resolved?character:scrambleGlyphs[Math.floor(Math.random()*scrambleGlyphs.length)];return value}).join('');if(progress<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);
}
function scrambleGroup(container){container.querySelectorAll('[data-scramble]').forEach(scrambleText)}
function resetScrambleGroup(container){container.querySelectorAll('[data-scramble]').forEach(element=>{element.dataset.scrambleToken=String((Number(element.dataset.scrambleToken)||0)+1);element.textContent=element.dataset.scramble})}
const processGlyphs='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',processHan='视觉创作画面动态设计后期分镜策划影像';
document.querySelectorAll('.process-track article').forEach(row=>{
 row.tabIndex=0;
 const labels=[...row.querySelectorAll('b,h3,p')].map(element=>({element,original:element.textContent}));
 let frameId=0,run=0;
 const reset=()=>{run++;cancelAnimationFrame(frameId);row.classList.remove('is-active');labels.forEach(({element,original})=>element.textContent=original)};
 const start=()=>{reset();row.classList.add('is-active');if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const current=++run,startTime=performance.now(),duration=680;
  function tick(now){if(current!==run)return;const progress=Math.min(1,(now-startTime)/duration);labels.forEach(({element,original})=>{const chars=[...original],resolveCount=Math.floor(progress*chars.length);element.textContent=chars.map((char,index)=>{if(index<resolveCount||!/[A-Za-z0-9\u4e00-\u9fff]/.test(char))return char;if(/[0-9]/.test(char))return String(Math.floor(Math.random()*10));if(/[\u4e00-\u9fff]/.test(char))return processHan[Math.floor(Math.random()*processHan.length)];return processGlyphs[Math.floor(Math.random()*processGlyphs.length)]}).join('')});if(progress<1)frameId=requestAnimationFrame(tick)}frameId=requestAnimationFrame(tick)};
 row.addEventListener('pointerenter',start);row.addEventListener('pointerleave',reset);row.addEventListener('focus',start);row.addEventListener('blur',reset);
});

let railOffset=0,railPaused=false,lastFrame=performance.now();
function animateRail(now){
 if(!railPaused&&!matchMedia('(prefers-reduced-motion: reduce)').matches){railOffset+=(now-lastFrame)*.0385;const loop=rail.scrollWidth/2;if(loop&&railOffset>=loop)railOffset-=loop;rail.style.transform=`translate3d(${-railOffset}px,0,0)`}
 rail.querySelectorAll('.work-card').forEach(card=>{const rect=card.getBoundingClientRect();const travel=Math.max(0,Math.min(1,(rect.left+rect.width)/(innerWidth+rect.width)));card.style.setProperty('--rail-length',(30+travel*26).toFixed(2)+'vh')});
 lastFrame=now;requestAnimationFrame(animateRail);
}
requestAnimationFrame(animateRail);
rail.querySelectorAll('.work-card').forEach(card=>{card.addEventListener('pointerenter',()=>{railPaused=true;scrambleGroup(card)});card.addEventListener('pointerleave',()=>{railPaused=false;resetScrambleGroup(card)});card.addEventListener('focus',()=>{railPaused=true;scrambleGroup(card)});card.addEventListener('blur',()=>{railPaused=false;resetScrambleGroup(card)});card.addEventListener('click',()=>openProject(card.dataset.openProject,card))});

function detailFigure(item,index,project){const orientation=item.orientation||'landscape';return `<figure class="detail-media detail-media--${orientation} ${item.type==='gif'?'detail-media--motion':''}"><img src="${item.src}" alt="${project.zh} ${item.type==='gif'?'动态节选':`作品画面 ${String(index+1).padStart(2,'0')}`}" loading="lazy"><figcaption>${String(index+1).padStart(2,'0')} / ${item.type==='gif'?'MOTION EXCERPT':'SELECTED FRAME'}</figcaption></figure>`}
const chageeStickerSequence=[
  {kind:'word',text:'CHAGEE',style:'word-a'},
  {kind:'image',file:'3',design:'main',style:'sticker-a'},
  {kind:'image',file:'12',design:'11',style:'sticker-b'},
  {kind:'image',file:'24',design:'23',style:'sticker-c'},
  {kind:'word',text:'chagee together',style:'word-b'},
  {kind:'image',file:'6',design:'5',style:'sticker-d'},
  {kind:'image',file:'13',design:'11',style:'sticker-e'},
  {kind:'image',file:'18',design:'17',style:'sticker-f'},
  {kind:'word',text:'1117',style:'word-c'},
  {kind:'image',file:'15',design:'14',style:'sticker-g'},
  {kind:'image',file:'8',design:'7',style:'sticker-h'},
  {kind:'image',file:'22',design:'21',style:'sticker-i'},
  {kind:'image',file:'10',design:'9',style:'sticker-j'},
  {kind:'image',file:'8-2',design:'7',style:'sticker-k'}
];
function chageeTrackItems(items,duplicate=false){return items.map((item,index)=>item.kind==='word'
  ? `<span class="chagee-word ${item.style}"${duplicate?' aria-hidden="true"':''}>${item.text}</span>`
  : `<button class="chagee-sticker-card ${item.style}" type="button" aria-label="${duplicate?'':`查看霸王茶姬道具 ${index+1} 的设定图`}" aria-pressed="false"${duplicate?' tabindex="-1"':''}><span class="chagee-sticker-flip"><img class="chagee-sticker-front" src="./media/works/chagee/stickers/prop-${item.file}.png?v=4" alt="${duplicate?'':`霸王茶姬美术道具 ${index+1}`}" loading="eager"><img class="chagee-sticker-back" src="./media/works/chagee/designs/design-${item.design}.png?v=3" alt="" loading="eager"></span></button>`).join('')}
function chageeLandingItems(duplicate=false){return [1,2,3,4,5].map(n=>`<figure class="chagee-landing"><img src="./media/works/chagee/landing/${n}.jpg" alt="${duplicate?'':`霸王茶姬落地画面 ${n}`}" loading="eager"${duplicate?' aria-hidden="true"':''}></figure>`).join('')}
function chageeShowcase(){return `<section class="chagee-showcase" aria-label="霸王茶姬道具实物与落地图"><div class="chagee-showcase-panel chagee-showcase-props"><div class="chagee-props-glow"></div><div class="chagee-showcase-track"><div class="chagee-showcase-set">${chageeTrackItems(chageeStickerSequence)}</div><div class="chagee-showcase-set" aria-hidden="true">${chageeTrackItems(chageeStickerSequence,true)}</div></div></div><div class="chagee-showcase-panel chagee-showcase-landings"><div class="chagee-showcase-track"><div class="chagee-showcase-set">${chageeLandingItems()}</div><div class="chagee-showcase-set" aria-hidden="true">${chageeLandingItems(true)}</div></div></div></section>`}
function chageeStickerPile(kind){
 const files=kind==='frames'?['6','12','24','8-2','10']:['13','18','22','15'];
 return `<div class="chagee-fall-pile chagee-fall-pile--${kind}" aria-hidden="true">${files.map((file,index)=>`<span class="chagee-fall-piece" style="--fall-index:${index};--rest-angle:${[-18,14,-8,23,-12][index]}deg;--piece-left:${kind==='frames'?[7,26,47,68,85][index]:[13,37,62,83][index]}%;--piece-width:${[108,91,102,83,95][index]}px"><img src="./media/works/chagee/stickers/prop-${file}.png?v=4" alt="" draggable="false"></span>`).join('')}</div>`
}
function chageeKeyframes(){
 const videos=['111.mov','222.mov','333.mov','444.mov'];
 return `<section class="chagee-keyframes" aria-label="霸王茶姬美术帧及动态影像"><div class="chagee-keyframes-head"><span>CHAGEE / 01—04</span><h3>KEY FRAME</h3><span>IMAGE / MOTION</span></div><div class="chagee-keyframes-list">${videos.map((video,index)=>`<div class="chagee-keyframe-pair" style="--pair-index:${index}"><div class="chagee-keyframe-label"><span>${String(index+1).padStart(2,'0')}</span><span>CHAGEE<br>KEY FRAME</span></div><figure class="chagee-keyframe-media chagee-keyframe-still"><img src="./media/works/chagee/keyframes/${String(index+1).padStart(2,'0')}.jpg" alt="霸王茶姬美术帧 ${index+1}" loading="lazy"><figcaption>${String(index+1).padStart(2,'0')} / IMAGE</figcaption></figure><figure class="chagee-keyframe-media chagee-keyframe-motion"><video src="./media/works/chagee/keyframes/${video}" autoplay muted loop playsinline preload="metadata" poster="./media/works/chagee/keyframes/${String(index+1).padStart(2,'0')}.jpg" aria-label="霸王茶姬美术帧 ${index+1} 动态影像"></video><figcaption>${String(index+1).padStart(2,'0')} / MOTION</figcaption></figure></div>`).join('')}</div></section>`
}
const niuObjectFrames=['1047','1048','1049','1059','1060','1063','1065','1064','1061','1062','1066','1050','1051','1052','1053','1054','1055','1056','1057'];
const niuPeopleFrames=['1068','1069','1070','1071'];
const niuObjectNames=['TENNIS COURT','FRONT LIGHT','VINYL MIX','CINEMA NIGHT','TURN AHEAD','CITY BREAK','STREET MOTION','SMART COMPANION','CORE CHIP','LUNAR RIDER','NEON PORTAL','SOLAR ECLIPSE','COSMIC BURST','STELLAR RING','ORBITAL HALO','GALAXY SPIRAL','COSMIC PULSE','FINAL ORBIT','INFINITE RING'];
const niuPeopleNames=['URBAN RIDER','CITY PORTRAIT','HELMET READY','FREE SPIRIT'];
function niuPhase(kind,video,frames,index,names){return `<div class="niu-phase niu-phase--${kind}"><video muted playsinline preload="metadata" src="./media/works/niu/keyframes/${video}" poster="./media/works/niu/keyframes/${kind}/IMG_${frames[0]}.jpg" aria-label="小牛电动${kind==='objects'?'事物':'人物'}快切"></video><div class="niu-sequence-video-title"><span>NIU</span><strong>HIGHLIGHTS</strong><small>${String(index).padStart(2,'0')} / ${kind.toUpperCase()}</small></div><div class="niu-frame-viewport"><div class="niu-frame-track"><div class="niu-frame-title"><span>NIU</span><span>KEY FRAME</span></div>${frames.map((n,i)=>`<figure class="niu-frame-card"><span class="niu-frame-number" data-label="${String(i+1).padStart(2,'0')}">${String(i+1).padStart(2,'0')}</span><img src="./media/works/niu/keyframes/${kind}/IMG_${n}.jpg" alt="小牛电动${kind==='objects'?'事物':'人物'}美术帧 ${i+1}" loading="lazy"><figcaption data-label="${names[i]}">${names[i]}</figcaption></figure>`).join('')}<div class="niu-frame-logo" aria-hidden="true"><img src="./media/works/niu/keyframes/niu-logo-black.png" alt=""></div></div></div></div>`}
const niuCrowdFrames=['IMG_1072.PNG','IMG_1073.JPG','IMG_1074.PNG','IMG_1075.PNG','IMG_1076.PNG'];
function niuCrowdChapter(){return `<div class="niu-crowd-gap" aria-hidden="true"></div><section class="niu-crowd-sequence" aria-label="小牛电动群像快切与静帧"><div class="niu-crowd-stage"><div class="niu-crowd-kicker">NIU / 03</div><div class="niu-crowd-screen"><div class="niu-crowd-video-window"><video muted playsinline preload="metadata" src="./media/works/niu/keyframes/crowd.mov" aria-label="小牛电动群像快切"></video></div><div class="niu-sequence-video-title niu-crowd-video-title"><span>NIU</span><strong>HIGHLIGHTS</strong></div>${niuCrowdFrames.map((name,i)=>`<div class="niu-crowd-still-panel${i===0||i===3?' niu-crowd-still-panel--full':''}${i===3?' niu-crowd-still-panel--top-crop':''}" style="--crowd-index:${i}"><div class="niu-crowd-still-meta"><span>${String(i+1).padStart(2,'0')} / 05</span></div><div class="niu-crowd-still-image"><img src="./media/works/niu/keyframes/crowd/${name}" alt="小牛电动群像静帧 ${i+1}" loading="lazy"></div>${i===0?'<strong>NIU KEY FRAME</strong>':''}</div>`).join('')}</div><div class="niu-crowd-foot"><span>HIGHLIGHTS</span><span>NIU / 03</span></div></div></section>`}
const ponyCrowdFrames=['01.jpg','02.jpg','03.jpg','04.jpg'];
const ponyCrowdNames=['柔柔凝视','飙车','紫悦','碧琪'];
function ponyCrowdChapter(){return `<section class="niu-crowd-sequence pony-crowd-sequence" aria-label="小马宝莉视频与静帧"><div class="niu-crowd-stage"><div class="niu-crowd-kicker">MY LITTLE PONY / 01</div><div class="niu-crowd-screen"><div class="niu-crowd-video-window"><video muted playsinline preload="metadata" src="./media/works/pony/keyframes/total.mov" aria-label="小马宝莉总视频"></video></div><div class="niu-sequence-video-title niu-crowd-video-title"><span>PONY</span><strong>HIGHLIGHTS</strong></div>${ponyCrowdFrames.map((name,i)=>`<div class="niu-crowd-still-panel niu-crowd-still-panel--full" style="--crowd-index:${i}"><div class="niu-crowd-still-meta"><span>${String(i+1).padStart(2,'0')} / 04</span></div><div class="niu-crowd-still-image"><img src="./media/works/pony/keyframes/${name}" alt="小马宝莉${ponyCrowdNames[i]}静帧" loading="lazy"></div>${i===0?'<strong>PONY KEY FRAME</strong>':''}</div>`).join('')}</div><div class="niu-crowd-foot"><span>HIGHLIGHTS</span><span>PONY / 01</span></div></div></section>`}
const ponyShowcasePairs=[
 {name:'TWILIGHT SPARKLE',still:'twilight.jpg',motion:'twilight.mov'},
 {name:'TRANSITION',still:'transition.jpg',motion:'transition.mov'},
 {name:'RAINBOW DASH',still:'rainbow.jpg',motion:'crowd.mov',start:1.32,end:1.98},
 {name:'APPLEJACK',still:'applejack.jpg',motion:'crowd.mov',start:0,end:.66},
 {name:'FLUTTERSHY',still:'fluttershy.jpg',motion:'crowd.mov',start:.66,end:1.32},
 {name:'PINKIE PIE',still:'pinkie-close.jpg',motion:'crowd.mov',start:1.98,end:2.64},
 {name:'PINKIE PIE / FULL',still:'pinkie-full.jpg',motion:'crowd.mov',start:2.64,end:3.32},
 {name:'END CARD',still:'endcard.jpg',motion:'endcard.mov'}
];
function ponyShowcase(){return `<section class="chagee-keyframes pony-showcase" aria-label="小马宝莉关键帧及动态影像"><div class="chagee-keyframes-head"><span>MY LITTLE PONY / 01—08</span><h3>KEY FRAME</h3><span>IMAGE / MOTION</span></div><div class="chagee-keyframes-list">${ponyShowcasePairs.map((pair,index)=>{const n=String(index+1).padStart(2,'0'),base='./media/works/pony/showcase/';return `<div class="chagee-keyframe-pair"><div class="chagee-keyframe-label"><span>${n}</span><span>MY LITTLE PONY<br>${pair.name}</span></div><figure class="chagee-keyframe-media chagee-keyframe-still"><img src="${base+pair.still}" alt="小马宝莉${pair.name}关键帧" loading="lazy"><figcaption>${n} / IMAGE</figcaption></figure><figure class="chagee-keyframe-media chagee-keyframe-motion"><video src="${base+pair.motion}" muted loop playsinline preload="metadata" poster="${base+pair.still}" ${pair.start===undefined?'autoplay':`data-segment-start="${pair.start}" data-segment-end="${pair.end}"`} aria-label="小马宝莉${pair.name}动态影像"></video><figcaption>${n} / MOTION</figcaption></figure></div>`}).join('')}</div></section>`}
function startPonyShowcase(root){
 const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{target.classList.toggle('is-visible',isIntersecting);const video=target.querySelector('video');if(!video)return;if(isIntersecting){const start=Number(video.dataset.segmentStart||0);if(video.dataset.segmentStart!==undefined)video.currentTime=start;video.play().catch(()=>{})}else video.pause()}),{threshold:.12});
 root.querySelectorAll('.pony-showcase .chagee-keyframe-pair').forEach(pair=>observer.observe(pair));
 const videos=[...root.querySelectorAll('.pony-showcase video[data-segment-start]')];
 const onTime=event=>{const video=event.currentTarget,end=Number(video.dataset.segmentEnd),start=Number(video.dataset.segmentStart);if(video.currentTime>=end-.025){video.currentTime=start;video.play().catch(()=>{})}};
 videos.forEach(video=>video.addEventListener('timeupdate',onTime));
 return()=>{observer.disconnect();videos.forEach(video=>video.removeEventListener('timeupdate',onTime));root.querySelectorAll('.pony-showcase video').forEach(video=>video.pause())};
}
function updateProjectStageColor(){
 const id=detail.dataset.project;if(!['niu','pony','mcgrady','xuliang'].includes(id))return;
 const frame=detail.querySelector(id==='niu'?'.niu-sequence--combined':id==='pony'?'.pony-crowd-sequence':id==='xuliang'?'.timefold-hero':'.mcgrady-hero');if(!frame)return;
 const top=frame.getBoundingClientRect().top,range=innerHeight*.66,raw=(id==='mcgrady'||id==='xuliang')?(-top-innerHeight*.15)/range:(innerHeight-top)/range,t=Math.max(0,Math.min(1,raw)),smooth=t*t*(3-2*t),hex=id==='niu'?'181438':id==='pony'?'f0a7cb':id==='xuliang'?'243b43':'8d1420',rgb=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)),mix=rgb.map(c=>Math.round(255+(c-255)*smooth));
 works.style.setProperty('--detail-stage-color',`rgb(${mix.join(',')})`);
 if(id==='niu'||id==='mcgrady'||id==='xuliang'){const ink=Math.round(9+(247-9)*smooth);works.style.setProperty('--detail-stage-ink',`rgb(${ink},${ink},${ink})`)}
}
const mcgradyFrames=Array.from({length:11},(_,i)=>`frame-${String(i+1).padStart(2,'0')}.jpg`).concat('frame-12.JPG');
function mcgradyChapter(){const base='./media/works/mcgrady/showcase/';return `<section class="mcgrady-showcase" aria-label="Tracy McGrady NBA2K key frames"><div class="mcgrady-hero"><img class="mcgrady-hero-image" src="${base}hero-poster.png" alt="Tracy McGrady poster"><span class="mcgrady-hero-corner">NBA2K · 2026</span></div>${[0,1].map((group)=>`<div class="mcgrady-grid-chapter"><header><span>NBA2K / ${String(group+1).padStart(2,'0')}</span><strong>KEY FRAME</strong><span>${group?'07 — 12':'01 — 06'}</span></header><div class="mcgrady-grid">${mcgradyFrames.slice(group*6,group*6+6).map((file,i)=>`<figure class="mcgrady-tile" style="--tile-index:${i}"><img src="${base+file}" alt="NBA2K key frame ${group*6+i+1}" loading="lazy"></figure>`).join('')}</div></div>`).join('')}</section>`}
const timefoldFrames=Array.from({length:16},(_,i)=>`frame-${String(i+1).padStart(2,'0')}.jpg`);
function timefoldChapter(){const base='./media/works/xuliang/showcase/';return `<section class="mcgrady-showcase timefold-showcase" aria-label="徐良时间折叠关键帧"><div class="mcgrady-hero timefold-hero"><img class="mcgrady-hero-image" src="${base}hero.jpg" alt="徐良时间折叠项目主视觉"><span class="mcgrady-hero-corner">TIME FOLD · 2026</span></div>${[0,1].map(group=>`<div class="mcgrady-grid-chapter"><header><span>TIME FOLD / ${String(group+1).padStart(2,'0')}</span><strong>KEY FRAME</strong><span>${group?'09 — 16':'01 — 08'}</span></header><div class="mcgrady-grid">${timefoldFrames.slice(group*8,group*8+8).map((file,i)=>`<figure class="mcgrady-tile" style="--tile-index:${i}"><img src="${base+file}" alt="时间折叠关键帧 ${group*8+i+1}" loading="lazy"></figure>`).join('')}</div></div>`).join('')}</section>`}
function startMcgradyChapter(root){const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>target.classList.toggle('is-visible',isIntersecting)),{threshold:.12,rootMargin:'0px 0px -8% 0px'});root.querySelectorAll('.mcgrady-grid-chapter').forEach(group=>observer.observe(group));return()=>observer.disconnect()}
function niuStoryboard(){return `<section class="niu-storyboard" aria-label="小牛电动分镜精选"><div class="niu-storyboard-head"><span>NIU ELECTRIC / STORYBOARD</span><h3>分镜</h3><p>基于 Demo 视频的节奏与叙事框架，参与品牌宣传动画的内容设计 —— 从光球起源、吉祥物登场，到产品轮廓与车机交互的逐镜构思，并落实为分镜绘制，明确每镜的景别、镜头运动与画面动作。</p></div><div class="niu-storyboard-images"><figure><img src="./media/works/niu/storyboard/selection-01.png" alt="小牛电动分镜精选：光球起源、吉祥物与产品镜头" width="2125" height="1868" loading="lazy" decoding="async"></figure><figure><img src="./media/works/niu/storyboard/selection-02.png" alt="小牛电动分镜精选：车机交互、骑行与结尾镜头" width="2117" height="1825" loading="lazy" decoding="async"></figure></div></section>`}
function niuChapter(){return `<div class="niu-keyframes"><section class="niu-sequence niu-sequence--combined" aria-label="小牛电动视频与美术帧"><div class="niu-sequence-stage"><div class="niu-sequence-topline"><span>NIU ELECTRIC / 01—02</span><span>KEY FRAME / MOTION</span></div><div class="niu-sequence-screen">${niuPhase('objects','objects.mov',niuObjectFrames,1,niuObjectNames)}${niuPhase('people','people.mov',niuPeopleFrames,2,niuPeopleNames)}</div><div class="niu-sequence-bottomline"><span>NIU KEY FRAME</span><span>OBJECTS — PEOPLE</span></div></div></section>${niuCrowdChapter()}</div>`}
function fitNiuHeadline(title){const box=title.parentElement,strong=title.querySelector('strong'),width=box.clientWidth;if(!width||!strong)return;const size=width*.172;strong.style.fontSize=`${size}px`;strong.style.transform=`translateX(-.018em) scaleX(${width*1.007/Math.max(1,strong.scrollWidth)})`;title.style.setProperty('--niu-headline-size',`${size}px`)}
function fitPonyFrameHeadline(screen){const strong=screen.querySelector('.niu-crowd-still-panel strong');if(!strong||!screen.clientWidth)return;strong.style.fontSize='100px';strong.style.fontSize=`${100*screen.clientWidth*1.018/Math.max(1,strong.scrollWidth)}px`}
function startNiuSequences(root){
 const section=root.querySelector('.niu-sequence--combined');if(!section)return()=>{};
 const phases=[...section.querySelectorAll('.niu-phase')],clamp=v=>Math.max(0,Math.min(1,v)),ease=v=>{v=clamp(v);return v*v*(3-2*v)};let raf=0,disposed=false,start=null,lastPhase=-1,cycleIndex=-1,entryTimes=new WeakMap();
 const fitTitles=()=>section.querySelectorAll('.niu-sequence-video-title').forEach(fitNiuHeadline);fitTitles();const titleObserver=new ResizeObserver(fitTitles);titleObserver.observe(section.querySelector('.niu-sequence-screen'));
 const timing=phase=>{const v=phase.querySelector('video'),count=phase.querySelectorAll('.niu-frame-card').length,videoTime=Number.isFinite(v.duration)&&v.duration>1?Math.min(v.duration,12):7;return{videoTime,frameStart:videoTime+1.15,frameRun:Math.max(0,count-3)*.8+3.7,foldRun:count*.13+1.1,pause:.65}};
 function drawPhase(phase,t){const screen=section.querySelector('.niu-sequence-screen'),video=phase.querySelector('video'),title=phase.querySelector('.niu-sequence-video-title'),viewport=phase.querySelector('.niu-frame-viewport'),track=phase.querySelector('.niu-frame-track'),frameTitle=phase.querySelector('.niu-frame-title'),logo=phase.querySelector('.niu-frame-logo'),cards=[...track.querySelectorAll('.niu-frame-card')],T=timing(phase),foldStart=T.frameStart+T.frameRun,done=foldStart+T.foldRun;
  const opened=ease(t/.72),closed=1-ease((t-T.videoTime-.2)/.72),width=clamp(Math.min(opened,closed));video.style.clipPath=`inset(0 ${50-width*50}% 0 ${50-width*50}%)`;
  const wipe=ease((t-.16)/.78),top=Math.min(100,wipe*130),bottom=Math.min(100,Math.max(0,wipe*130-25)),side=50-width*50;title.style.clipPath=`polygon(${side}% 0,${100-side}% 0,${100-side}% ${top}%,${side}% ${bottom}%)`;
  const ft=t-T.frameStart;viewport.style.clipPath=ft>=0?'inset(0 0 0 0)':'inset(0 50% 0 50%)';const titleWipe=ease(ft/.8);frameTitle.style.clipPath=`polygon(0 0,100% 0,100% ${Math.min(100,titleWipe*130)}%,0 ${Math.min(100,Math.max(0,titleWipe*130-25))}%)`;
  const rowHeight=(cards[0]?.offsetHeight||1)+parseFloat(getComputedStyle(track).gap||0),travel=Math.min(Math.max(0,track.scrollHeight-screen.clientHeight*.5),Math.max(0,(ft-.75)/.8*rowHeight));track.style.transform=`translate3d(0,${screen.clientHeight*.22-travel}px,0)`;
  const titleHeight=frameTitle.offsetHeight+parseFloat(getComputedStyle(frameTitle).marginBottom||0),centerY=screen.clientHeight*.5;
  cards.forEach((card,i)=>{const cardTop=screen.clientHeight*.22+titleHeight+i*rowHeight-travel,cardCenter=cardTop+card.offsetHeight*.5;
    if(i>=2&&cardTop<=screen.clientHeight&&!entryTimes.has(card))entryTimes.set(card,Math.max(ft,.9));
    const onset=i===0?.6:i===1?.73:(entryTimes.get(card)??Infinity),opened=ease((ft-onset-.12)/.44),fold=1-ease((t-foldStart-i*.13)/.48),reveal=clamp(Math.min(opened,fold));
    const centered=opened>.98?ease(1-Math.abs(cardCenter-centerY)/(rowHeight*.58)):0,imageWidth=reveal*(1-.22*centered);
    card.style.setProperty('--frame-reveal',reveal);card.style.clipPath='inset(0 0 0 0)';card.querySelector('img').style.clipPath=`inset(0 ${50-imageWidth*50}% 0 ${50-imageWidth*50}%)`;
    card.style.setProperty('--active-reveal',centered);
  });
  logo.style.visibility=ft>=.9+(cards.length-2)*.8+.58&&t<foldStart+(cards.length-1)*.13+.48?'visible':'hidden';
  return done+T.pause;
 }
 function update(now){if(disposed)return;const rect=section.getBoundingClientRect(),bg=ease(clamp((innerHeight-rect.top)/innerHeight));section.style.setProperty('--niu-bg-mix',Math.round(bg*100)+'%');
  if(rect.top<innerHeight&&rect.bottom>0){if(start===null)start=now;let t=(now-start)/1000;const durations=phases.map(p=>{const q=timing(p);return q.frameStart+q.frameRun+q.foldRun+q.pause});const total=durations[0]+durations[1],nextCycle=Math.floor(t/total),cycle=t%total;if(nextCycle!==cycleIndex){entryTimes=new WeakMap();cycleIndex=nextCycle}const active=cycle<durations[0]?0:1,local=active===0?cycle:cycle-durations[0];phases.forEach((p,i)=>{p.style.clipPath=i===active?'inset(0 0 0 0)':'inset(0 50% 0 50%)';p.style.pointerEvents=i===active?'auto':'none'});if(active!==lastPhase){phases.forEach((p,i)=>{const v=p.querySelector('video');if(i===active){v.currentTime=0;v.play().catch(()=>{})}else v.pause()});lastPhase=active}drawPhase(phases[active],local)}raf=requestAnimationFrame(update)}raf=requestAnimationFrame(update);return()=>{disposed=true;cancelAnimationFrame(raf);titleObserver.disconnect();phases.forEach(p=>p.querySelector('video').pause())};
}
function startNiuCrowd(root,selector='.niu-crowd-sequence'){
 const section=root.querySelector(selector);if(!section)return()=>{};
 const screen=section.querySelector('.niu-crowd-screen'),window=section.querySelector('.niu-crowd-video-window'),video=window.querySelector('video'),title=section.querySelector('.niu-crowd-video-title'),panels=[...section.querySelectorAll('.niu-crowd-still-panel')],clamp=v=>Math.max(0,Math.min(1,v)),ease=v=>{v=clamp(v);return v*v*(3-2*v)};
 let raf=0,disposed=false,start=null,lastCycle=-1;
 const fitTitle=()=>{fitNiuHeadline(title);if(section.classList.contains('pony-crowd-sequence'))fitPonyFrameHeadline(screen)};fitTitle();const titleObserver=new ResizeObserver(fitTitle);titleObserver.observe(screen);
 function update(now){if(disposed)return;const rect=section.getBoundingClientRect(),entry=ease((innerHeight-rect.top)/(innerHeight*.85));screen.style.clipPath=`inset(0 ${50-entry*50}% 0 ${50-entry*50}%)`;screen.style.transform=`translate3d(0,${(1-entry)*14}vh,0)`;
  if(rect.top<innerHeight&&rect.bottom>0&&entry>.22){if(start===null)start=now;const videoEnd=Number.isFinite(video.duration)&&video.duration>2?video.duration:6.55,stillStart=videoEnd+1.15,cardTime=1.86,total=stillStart+panels.length*cardTime+.75,elapsed=(now-start)/1000,cycleIndex=Math.floor(elapsed/total),t=elapsed%total;
   if(cycleIndex!==lastCycle){video.currentTime=0;video.play().catch(()=>{});lastCycle=cycleIndex}
   if(t>=videoEnd&& !video.paused)video.pause();else if(t<videoEnd&&video.paused)video.play().catch(()=>{});
   const slit=ease((t-.34)/.62),expand=ease((t-.86)/1.14),depart=ease((t-videoEnd)/.72);
   window.style.left=`${20*(1-expand)}%`;window.style.top=`${52*(1-expand)-108*depart}%`;window.style.width=`${60+40*expand}%`;window.style.height=`${45+55*expand}%`;window.style.clipPath=`inset(0 ${50-slit*50}% 0 ${50-slit*50}%)`;
   const titleWidth=ease((t-1.24)/.76)*(1-depart),wipe=ease((t-1.15)/.62),side=50-titleWidth*50,top=Math.min(100,wipe*130),bottom=Math.min(100,Math.max(0,wipe*130-25));title.style.clipPath=`polygon(${side}% 0,${100-side}% 0,${100-side}% ${top}%,${side}% ${bottom}%)`;
   panels.forEach((panel,i)=>{const local=t-stillStart-i*cardTime,arrive=ease(local/.66),leave=ease((local-1.47)/.68),y=(1-arrive)*104-leave*104,unfold=ease((local-.04)/.7),headline=ease((local-.36)/.56),image=panel.querySelector('.niu-crowd-still-image'),caption=panel.querySelector('strong');panel.style.transform=`translate3d(0,${y}%,0)`;image.style.inset=panel.classList.contains('niu-crowd-still-panel--full')?'0':'13% 12% 15%';image.style.clipPath=`inset(0 ${50-unfold*50}% 0 ${50-unfold*50}%)`;if(caption)caption.style.clipPath=`polygon(0 0,100% 0,100% ${Math.min(100,headline*130)}%,0 ${Math.min(100,Math.max(0,headline*130-25))}%)`});
  }else{if(!video.paused)video.pause();start=null;lastCycle=-1}raf=requestAnimationFrame(update)}raf=requestAnimationFrame(update);
 return()=>{disposed=true;cancelAnimationFrame(raf);titleObserver.disconnect();video.pause()};
}
const lesamediSource=number=>`./media/works/lesamedi/source/${String(number).padStart(2,'0')}.${({7:'jpeg',26:'jpeg',27:'jpeg',30:'png',31:'png',32:'png'})[number]||'jpg'}`;
function lesamediImages(numbers,kind){return numbers.map((number,index)=>`<figure class="ls-image ls-image--${index+1}"><img src="${lesamediSource(number)}" alt="${kind} · 参考图 ${index+1}" loading="lazy"></figure>`).join('')}
function lesamediDirection({number,word,title,meaning,selected,mood,kv,shoot}){
 const status=selected?'SELECTED DIRECTION / FINAL CONCEPT':'CONCEPT EXPLORATION / OP1';
 return `<section class="ls-direction ${selected?'ls-direction--selected':'ls-direction--one'}" aria-label="OP${number} ${title}">
  <header class="ls-option-head"><span class="ls-option-ghost" aria-hidden="true">OPTION</span><div class="ls-option-center"><span class="ls-option-overline">LE SAMEDI / CONCEPT ${String(number).padStart(2,'0')}</span><strong>${word}</strong><span class="ls-option-number">OP${number} — ${title}</span></div><div class="ls-option-bottom"><p>${meaning}</p><small>${status}</small></div></header>
  <section class="ls-board"><header class="ls-section-head"><span>01 / VISUAL RESEARCH</span><h3>MOODBOARD</h3><small>${number===1?'同一人物多视角并存 / 连续动态轨迹':'玻璃、窗框、纱帘切割室内空间 / 日常行为'}</small></header><div class="ls-mood-grid ls-mood-grid--${number}">${lesamediImages(mood,'OP'+number+' Moodboard')}</div></section>
  <section class="ls-kv"><header class="ls-section-head"><span>02 / IMAGE LANGUAGE</span><h3>KV<br>REFERENCE</h3><small>${selected?'SPACE SLICES / EMOTIONAL SLICES':'MOVEMENT / TRACES'}</small></header><div class="ls-kv-grid ls-kv-grid--${number}">${lesamediImages(kv,'OP'+number+' KV Reference')}</div></section>
  <section class="ls-shoot"><header class="ls-section-head"><span>03 / PHOTOGRAPHY</span><h3>拍摄参考</h3><small>${selected?'多层折射空间 · 生活感动态设计':'多机位姿态共存 · 前中后景层级明确'}</small></header><div class="ls-shoot-grid ls-shoot-grid--${number}">${lesamediImages(shoot,'OP'+number+' 拍摄参考')}</div></section>
 </section>`;
}
function lesamediLayout(){
 const pairs=[['222.png','截屏2026-08-11 17.53.00.png','庭院'],['333.png','截屏2026-08-11 17.53.20.png','室内'],['111.png','截屏2026-08-11 20.20.14.png','楼梯'],['444.png','截屏2026-08-11 17.50.54.png','砖拱']];
 return `<section class="ls-layout" aria-label="LAYOUT 实拍效果参考"><div class="ls-layout-stage"><div class="ls-layout-black-push" aria-hidden="true"></div><div class="ls-layout-content"><div class="ls-layout-intro"><span>LE SAMEDI / SELECTED DIRECTION</span><h2>LAYOUT</h2><p>基于美术设定与实景勘景图，运用AI生成高还原度视觉Layout作为实拍效果参考，显著缩短前期筹备周期并降低沟通与试错成本。</p><figure class="ls-layout-location"><img src="./media/works/lesamedi/layout/${pairs[0][1]}" alt="${pairs[0][2]}实地勘景照片"><figcaption>LOCATION / ${pairs[0][2]}</figcaption></figure></div><div class="ls-layout-cards">${pairs.map(([image,location,label],index)=>`<button class="ls-layout-card" type="button" data-location="${location}" data-label="${label}" aria-label="查看${label} Layout"><img src="./media/works/lesamedi/layout/${image}" alt="${label}场景 AI 视觉 Layout"><span>0${index+1} / ${label}</span></button>`).join('')}</div><div class="ls-layout-actual" aria-label="艺人实际拍摄展示">${["IMG_1368.jpg","IMG_1366.jpg","IMG_1367.jpg","IMG_1369.jpg"].map((file,index)=>`<figure><img src="./media/works/lesamedi/actual/${file}" alt="艺人实际拍摄画面 ${index+1}"></figure>`).join('')}<div class="ls-layout-actual-label"><strong>艺人实际拍摄展示</strong><small>ARTIST PHOTOSHOOT / FINAL IMAGES</small></div></div></div></div></section>`;
}
function lesamediDeliverables(){
 const base='./media/works/lesamedi/deliverables/';
 const pieces=[
  ['平台.png','平台工作牌','9%','24%','-13deg','8vw'],
  ['直播技术组.png','直播技术组工作牌','87%','21%','12deg','8vw'],
  ['工作人员.png','工作人员工作牌','86%','76%','-11deg','8vw'],
  ['画板 1@3x.png','品牌明信片一','17%','65%','-9deg','15vw'],
  ['画板 1 拷贝@3x.png','品牌明信片二','28%','82%','8deg','15vw'],
  ['画板 1 拷贝 2@3x.png','品牌明信片三','74%','75%','-7deg','15vw'],
  ['画板 1 拷贝 3@3x.png','品牌明信片四','77%','37%','13deg','15vw'],
  ['画板 1 拷贝 4@3x.png','品牌明信片五','16%','35%','7deg','15vw'],
  ['画板 1 拷贝 5@3x.png','品牌明信片六','68%','16%','-12deg','15vw'],
  ['画板 1 拷贝 6@3x.png','品牌明信片七','30%','16%','11deg','15vw']
 ];
 return `<section class="ls-deliverables" data-stage="5" aria-label="此间构筑成品展示"><div class="ls-deliverables-table" aria-hidden="true"></div><header class="ls-deliverables-heading"><strong>大秀平面视觉设计</strong><span>RUNWAY GRAPHIC DESIGN</span></header><div class="ls-deliverables-pieces">${pieces.map(([file,label,x,y,rotation,width],index)=>`<img class="ls-deliverable-piece" src="${base+encodeURIComponent(file)}" alt="${label}" draggable="false" style="--x:${x};--y:${y};--r:${rotation};--w:${width};--stack-r:${(index-5)*2}deg;--stack-x:${(index-5)*2}px;--stack-y:${(index-5)*-2}px">`).join('')}</div><div class="ls-deliverables-note"><strong>明信片、工牌</strong><span>POSTCARDS & STAFF BADGES</span></div><figure class="ls-deliverable-main ls-deliverable-invite"><img src="${base}invitation.png" alt="此间构筑邀请函"><figcaption><span>此间构筑</span><strong>邀请函</strong></figcaption></figure><figure class="ls-deliverable-main ls-deliverable-kv"><img src="${base}kv.png" alt="此间构筑主视觉 KV"><figcaption><span>此间构筑</span><strong>KV</strong></figcaption></figure></section>`;
}
function lesamediShowcase(){
 const one=lesamediDirection({number:1,word:'ONE',title:'痕迹',meaning:'以动态痕迹诠释生活痕迹',selected:false,mood:[15,6,2,14,16,17],kv:[22,29],shoot:[4,3,1,11,10,9]});
 const two=lesamediDirection({number:2,word:'TWO',title:'切片',meaning:'以空间切片映照情绪切片',selected:true,mood:[28,23,24,7,8,26,27,25],kv:[19,18,7],shoot:[12,32,20,5,30,21,13,31]});
 const frame=(markup,number)=>{const holder=document.createElement('div');holder.innerHTML=markup;const pages=[...holder.firstElementChild.children];return `<article class="ls-frame ls-direction ${number===2?'ls-direction--selected':'ls-direction--one'}" data-ls-frame="${number}" aria-label="OP${number} 自动翻页展示"><div class="ls-frame-viewport">${pages.map((page,index)=>`<div class="ls-frame-page ${index===0?'is-current':''}" data-ls-page="${index}" aria-hidden="${index===0?'false':'true'}">${page.outerHTML}</div>`).join('')}</div><div class="ls-frame-footer"><span>OP${number} / ${number===1?'痕迹':'切片'}</span><span class="ls-frame-count">01 / 04</span></div></article>`};
 return `<div class="lesamedi-showcase"><div class="ls-frame-stack">${frame(one,1)}${frame(two,2)}</div><div class="ls-expanded-view" hidden aria-label="OP2 切片完整内容"><button class="ls-expanded-close" type="button" aria-label="关闭放大展示">✕ CLOSE / NEXT PROJECT</button>${two}${lesamediLayout()}${lesamediDeliverables()}</div></div>`;
}
function startLesamediShowcase(root){
 const frames=[...root.querySelectorAll('.ls-frame')],overlay=root.querySelector('.ls-expanded-view'),selected=frames[1],layout=overlay.querySelector('.ls-layout'),deliverables=overlay.querySelector('.ls-deliverables');
 let expanded=false,closing=false,suppressUntil=0,lastY=scrollY,touchStart=0,layoutStarted=false,wheelGestureActive=false,wheelGestureTimer=0;
 const advance=frame=>{if(frame.dataset.animating==='true'||(expanded&&frame===selected))return;const pages=[...frame.querySelectorAll('.ls-frame-page')],current=pages.findIndex(page=>page.classList.contains('is-current')),nextIndex=(current+1)%pages.length,from=pages[current],to=pages[nextIndex];frame.dataset.animating='true';to.classList.add('is-ready');to.getBoundingClientRect();from.classList.add('is-leaving');from.classList.remove('is-current');from.setAttribute('aria-hidden','true');to.classList.remove('is-ready');to.classList.add('is-current');to.setAttribute('aria-hidden','false');frame.querySelector('.ls-frame-count').textContent=`${String(nextIndex+1).padStart(2,'0')} / 04`;setTimeout(()=>{from.classList.remove('is-leaving');delete frame.dataset.animating},850)};
 const timers=frames.map((frame,index)=>{let interval;const start=setTimeout(()=>{advance(frame);interval=setInterval(()=>advance(frame),4400)},4400+index*1900);return()=>{clearTimeout(start);clearInterval(interval)}});
 const open=()=>{if(expanded||closing||!selected.isConnected)return;expanded=true;const r=selected.getBoundingClientRect();overlay.hidden=false;const pageIndex=[...selected.querySelectorAll('.ls-frame-page')].findIndex(page=>page.classList.contains('is-current'));overlay.scrollTop=overlay.querySelector('.ls-direction').children[pageIndex]?.offsetTop||0;overlay.style.inset=`${Math.max(0,r.top)}px ${Math.max(0,innerWidth-r.right)}px ${Math.max(0,innerHeight-r.bottom)}px ${Math.max(0,r.left)}px`;overlay.style.overflow='hidden';document.body.classList.add('ls-is-expanded');requestAnimationFrame(()=>{overlay.classList.add('is-open');overlay.style.inset='0px'});setTimeout(()=>{if(expanded)overlay.style.overflowY='auto'},700)};
 const close=toNext=>{if(!expanded||closing)return;closing=true;expanded=false;overlay.style.overflow='hidden';overlay.scrollTop=0;const r=selected.getBoundingClientRect();overlay.classList.remove('is-open');overlay.style.inset=`${Math.max(0,r.top)}px ${Math.max(0,innerWidth-r.right)}px ${Math.max(0,innerHeight-r.bottom)}px ${Math.max(0,r.left)}px`;setTimeout(()=>{overlay.hidden=true;overlay.style.inset='';overlay.style.overflow='';setStage(0);document.body.classList.remove('ls-is-expanded');closing=false;suppressUntil=performance.now()+1000;if(toNext)root.querySelector('.next-project')?.scrollIntoView({behavior:'smooth'});else scrollBy({top:-innerHeight*.32,behavior:'smooth'})},660)};
 const onScroll=()=>{const y=scrollY;if(!expanded&&!closing&&performance.now()>suppressUntil&&y>lastY+1){const r=selected.getBoundingClientRect();if(r.top<=innerHeight*.23&&r.bottom>innerHeight*.5)open()}lastY=y};
 const onWheel=event=>{if(!expanded||closing)return;const resetWheelGesture=()=>{clearTimeout(wheelGestureTimer);wheelGestureTimer=setTimeout(()=>{wheelGestureActive=false},280)};if(wheelGestureActive){event.preventDefault();resetWheelGesture();return}if(navigateLayout(event.deltaY)){event.preventDefault();wheelGestureActive=true;resetWheelGesture();return}const atTop=overlay.scrollTop<=2;if(atTop&&event.deltaY<0){event.preventDefault();close(false)}};
 const onTouchStart=event=>{touchStart=event.touches[0]?.clientY||0};
 const onTouchEnd=event=>{if(!expanded||closing)return;if(draggedRecently){draggedRecently=false;return}const delta=(event.changedTouches[0]?.clientY||0)-touchStart;if(navigateLayout(-delta)){event.preventDefault();return}if(overlay.scrollTop<=2&&delta>48)close(false);};
 overlay.querySelector('.ls-expanded-close')?.addEventListener('click',()=>close(true));
 const cards=[...layout.querySelectorAll('.ls-layout-card')],locationImage=layout.querySelector('.ls-layout-location img'),locationCaption=layout.querySelector('.ls-layout-location figcaption');
 let layoutFocus=0,manualStage=null,lastNavigateAt=0,draggedRecently=false;
 const focusLayout=index=>{const card=cards[index];if(!card)return;layout.classList.add('has-focus');cards.forEach(item=>item.classList.toggle('is-focused',item===card));locationImage.src=`./media/works/lesamedi/layout/${card.dataset.location}`;locationImage.alt=`${card.dataset.label}实地勘景照片`;locationCaption.textContent=`LOCATION / ${card.dataset.label}`;layoutFocus=index};
 const setStage=stage=>{manualStage=stage;layout.classList.toggle('is-actual',stage>=5);layout.classList.toggle('is-four-again',stage>=4);deliverables.dataset.stage=String(stage);if(stage<4){layout.classList.remove('is-four-again');focusLayout(stage)}else{layout.classList.remove('has-focus');cards.forEach(item=>item.classList.remove('is-focused'))}};
 const navigateLayout=delta=>{if(!layoutStarted||!layout.classList.contains('is-cards')||Math.abs(delta)<3)return false;const stage=manualStage??layoutFocus;const r=layout.getBoundingClientRect();if(stage===0&&(r.top>innerHeight*.15||r.bottom<innerHeight*.3))return false;if(delta<0&&stage===0)return false;if(performance.now()-lastNavigateAt<1100)return true;lastNavigateAt=performance.now();if(delta>0&&stage===9){close(true);return true}setStage(Math.max(0,Math.min(9,stage+(delta>0?1:-1))));overlay.scrollTop=Math.max(0,layout.offsetTop+layout.offsetHeight-innerHeight);return true};
 let drag=null;
 const onPieceDown=event=>{if(Number(deliverables.dataset.stage)!==7)return;const piece=event.target.closest('.ls-deliverable-piece');if(!piece)return;drag={piece,x:event.clientX,y:event.clientY,dx:parseFloat(piece.style.getPropertyValue('--dx'))||0,dy:parseFloat(piece.style.getPropertyValue('--dy'))||0};piece.setPointerCapture(event.pointerId);piece.classList.add('is-dragging');draggedRecently=true;event.preventDefault()};
 const onPieceMove=event=>{if(!drag)return;drag.piece.style.setProperty('--dx',`${drag.dx+event.clientX-drag.x}px`);drag.piece.style.setProperty('--dy',`${drag.dy+event.clientY-drag.y}px`)};
 const onPieceUp=()=>{if(!drag)return;drag.piece.classList.remove('is-dragging');drag=null;setTimeout(()=>{draggedRecently=false},120)};
 const onTableClick=event=>{if(event.target!==deliverables&&event.target!==deliverables.querySelector('.ls-deliverables-table'))return;deliverables.querySelectorAll('.ls-deliverable-piece').forEach(piece=>{piece.style.removeProperty('--dx');piece.style.removeProperty('--dy')})};
 const startLayout=()=>{if(layoutStarted)return;layoutStarted=true;layout.classList.add('is-started');setTimeout(()=>layout.classList.add('is-black'),950);setTimeout(()=>{layout.classList.add('is-cards');setStage(0)},1700)};
 const layoutObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting))startLayout()},{root:overlay,threshold:.2});layoutObserver.observe(layout);
 cards.forEach((card,index)=>{card.addEventListener('click',()=>{if(layout.classList.contains('is-cards')&&manualStage===4)setStage(index)})});
 addEventListener('scroll',onScroll,{passive:true});overlay.addEventListener('wheel',onWheel,{passive:false});overlay.addEventListener('touchstart',onTouchStart,{passive:true});overlay.addEventListener('touchend',onTouchEnd,{passive:false});deliverables.addEventListener('pointerdown',onPieceDown);deliverables.addEventListener('pointermove',onPieceMove);deliverables.addEventListener('pointerup',onPieceUp);deliverables.addEventListener('pointercancel',onPieceUp);deliverables.addEventListener('click',onTableClick);
 return()=>{clearTimeout(wheelGestureTimer);layoutObserver.disconnect();timers.forEach(stop=>stop());removeEventListener('scroll',onScroll);overlay.removeEventListener('wheel',onWheel);overlay.removeEventListener('touchstart',onTouchStart);overlay.removeEventListener('touchend',onTouchEnd);document.body.classList.remove('ls-is-expanded')};
}
const illustrationPieces=[
 {file:'fushiji-01.jpg',series:'fushiji',label:'浮世击 01'},
 {file:'guanzizai-01.jpg',series:'guanzizai',label:'观自在 01'},
 {file:'fushiji-02.jpg',series:'fushiji',label:'浮世击 02'},
 {file:'guanzizai-02.jpg',series:'guanzizai',label:'观自在 02'},
 {file:'fushiji-03.jpg',series:'fushiji',label:'浮世击 03'},
 {file:'guanzizai-03.jpg',series:'guanzizai',label:'观自在 03'},
 {file:'guanzizai-04.jpg',series:'guanzizai',label:'观自在 04'},
 {file:'guanzizai-05.jpg',series:'guanzizai',label:'观自在 05'}
];
const illustrationSeries={
 fushiji:{title:'浮世击：专辑灵感系列插画',copy:'以专辑概念与听觉情绪为灵感，将音乐氛围转化为图像叙事，完成听觉到视觉的跨媒介表达。'},
 guanzizai:{title:'观自在：敦煌采风系列插画',copy:'敦煌实地采风，提取丝路壁画与戈壁视觉元素，用当代插画语言转译东方古典美学。'}
};
function illustrationChapter(){return `<section class="illustration-gallery" aria-label="个人插画创作作品画廊"><div class="illustration-gallery-top"><span>07 / PERSONAL ILLUSTRATION</span><span>SELECTED WORKS · 08</span></div><div class="illustration-mosaic" aria-label="悬停展开插画作品">${illustrationPieces.map((piece,index)=>`<button class="illustration-tile" type="button" data-illustration-index="${index}" aria-label="查看${piece.label}，${illustrationSeries[piece.series].title}"><img src="./media/works/illustration/gallery/${piece.file}" alt="${piece.label}" loading="${index<3?'eager':'lazy'}"></button>`).join('')}</div><div class="illustration-gallery-bottom"><h3>Find<br>the image</h3><p>八幅插画，两个系列。<br>从听觉情绪到敦煌采风，触碰图像中的叙事。</p><span>that reflects<br>your ideas</span></div><div class="illustration-lightbox" hidden role="dialog" aria-modal="true" aria-label="插画作品预览"><button class="illustration-lightbox-close" type="button" aria-label="关闭作品预览">✕ CLOSE</button><button class="illustration-lightbox-arrow illustration-lightbox-prev" type="button" aria-label="上一幅作品">←</button><div class="illustration-lightbox-content"><div class="illustration-lightbox-image-wrap"><img class="illustration-lightbox-image" alt=""></div><div class="illustration-lightbox-meta"><span class="illustration-lightbox-count"></span><div><h4></h4><p></p></div></div></div><button class="illustration-lightbox-arrow illustration-lightbox-next" type="button" aria-label="下一幅作品">→</button></div></section>`}
function startIllustrationGallery(root){
 const gallery=root.querySelector('.illustration-gallery'),mosaic=gallery.querySelector('.illustration-mosaic'),tiles=[...gallery.querySelectorAll('.illustration-tile')],lightbox=gallery.querySelector('.illustration-lightbox'),image=lightbox.querySelector('.illustration-lightbox-image');
 document.body.append(lightbox);
 const count=lightbox.querySelector('.illustration-lightbox-count'),heading=lightbox.querySelector('h4'),description=lightbox.querySelector('p');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let selected=0,returnFocus=null,locked=false;
 const updateDarkness=()=>{const rect=gallery.getBoundingClientRect(),progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight*.92)));gallery.style.setProperty('--light-opacity',String(1-progress));gallery.classList.toggle('is-dark',progress>.48);root.classList.toggle('illustration-on-dark',rect.top<50&&rect.bottom>50&&progress>.65)};
 const spread=()=>mosaic.classList.add('is-spread');
 const gather=()=>{mosaic.classList.remove('is-spread');tiles.forEach(tile=>{tile.style.removeProperty('--mx');tile.style.removeProperty('--my')})};
 const move=event=>{if(!mosaic.classList.contains('is-spread'))return;const rect=mosaic.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;tiles.forEach((tile,index)=>{const factor=(index%3+1)*9;tile.style.setProperty('--mx',`${(-x*factor).toFixed(1)}px`);tile.style.setProperty('--my',`${(-y*factor).toFixed(1)}px`)})};
 const onFocusOut=event=>{if(!mosaic.contains(event.relatedTarget))gather()};
 mosaic.addEventListener('pointerenter',spread);mosaic.addEventListener('pointerleave',gather);mosaic.addEventListener('pointermove',move);mosaic.addEventListener('focusin',spread);mosaic.addEventListener('focusout',onFocusOut);
 addEventListener('scroll',updateDarkness,{passive:true});addEventListener('resize',updateDarkness);updateDarkness();
 const show=index=>{selected=(index+illustrationPieces.length)%illustrationPieces.length;const piece=illustrationPieces[selected],series=illustrationSeries[piece.series];image.src=`./media/works/illustration/gallery/${piece.file}`;image.alt=piece.label;count.textContent=`${String(selected+1).padStart(2,'0')} / ${String(illustrationPieces.length).padStart(2,'0')}`;heading.textContent=series.title;description.textContent=series.copy};
 const open=index=>{if(locked)return;returnFocus=tiles[index];show(index);lightbox.hidden=false;document.body.classList.add('illustration-modal-open');requestAnimationFrame(()=>{lightbox.classList.add('is-open');if(!reduced){const from=tiles[index].getBoundingClientRect(),to=image.getBoundingClientRect(),dx=from.left+from.width/2-to.left-to.width/2,dy=from.top+from.height/2-to.top-to.height/2;image.animate([{transform:`translate(${dx}px,${dy}px) scale(${Math.max(.08,from.width/to.width)},${Math.max(.08,from.height/to.height)})`,opacity:.55},{transform:'translate(0,0) scale(1)',opacity:1}],{duration:680,easing:'cubic-bezier(.22,1,.36,1)'})}lightbox.querySelector('.illustration-lightbox-close').focus()})};
 const close=()=>{if(lightbox.hidden||locked)return;locked=true;lightbox.classList.remove('is-open');document.body.classList.remove('illustration-modal-open');setTimeout(()=>{lightbox.hidden=true;locked=false;returnFocus?.focus()},reduced?0:360)};
 const step=direction=>{show(selected+direction);if(!reduced)image.animate([{opacity:.35,transform:`translateX(${direction*34}px) scale(.97)`},{opacity:1,transform:'translateX(0) scale(1)'}],{duration:460,easing:'cubic-bezier(.22,1,.36,1)'})};
 const onKey=event=>{if(lightbox.hidden)return;if(event.key==='Escape')close();else if(event.key==='ArrowRight')step(1);else if(event.key==='ArrowLeft')step(-1);else if(event.key==='Tab'){const focusables=[lightbox.querySelector('.illustration-lightbox-close'),lightbox.querySelector('.illustration-lightbox-prev'),lightbox.querySelector('.illustration-lightbox-next')];if(event.shiftKey&&document.activeElement===focusables[0]){event.preventDefault();focusables.at(-1).focus()}else if(!event.shiftKey&&document.activeElement===focusables.at(-1)){event.preventDefault();focusables[0].focus()}}};
 tiles.forEach((tile,index)=>tile.addEventListener('click',()=>open(index)));
 lightbox.querySelector('.illustration-lightbox-close').addEventListener('click',close);
 lightbox.querySelector('.illustration-lightbox-prev').addEventListener('click',()=>step(-1));
 lightbox.querySelector('.illustration-lightbox-next').addEventListener('click',()=>step(1));
 lightbox.addEventListener('click',event=>{if(event.target===lightbox)close()});
 addEventListener('keydown',onKey);
 return()=>{removeEventListener('scroll',updateDarkness);removeEventListener('resize',updateDarkness);removeEventListener('keydown',onKey);mosaic.removeEventListener('pointerenter',spread);mosaic.removeEventListener('pointerleave',gather);mosaic.removeEventListener('pointermove',move);mosaic.removeEventListener('focusin',spread);mosaic.removeEventListener('focusout',onFocusOut);root.classList.remove('illustration-on-dark');document.body.classList.remove('illustration-modal-open');lightbox.remove()};
}
function chapterMarkup(project,media){
 if(project.id==='weightlab')return weightlabChapter();
 if(project.id==='promptskill')return promptskillChapter();
 if(project.id==='chagee')return chageeShowcase()+chageeKeyframes();
 if(project.id==='niu')return niuStoryboard()+niuChapter();
 if(project.id==='pony')return ponyCrowdChapter()+ponyShowcase();
 if(project.id==='mcgrady')return mcgradyChapter();
 if(project.id==='xuliang')return timefoldChapter();
 if(project.id==='lesamedi')return lesamediShowcase();
 if(project.id==='illustration')return illustrationChapter();
 return `<div class="detail-gallery">${media.map((item,index)=>detailFigure(item,index,project)).join('')}</div>`;
}
function weightlabChapter(){return `<section class="weight-story" aria-label="PNG 字重工作台的操作与作品展示">
  <div class="weight-story-intro weight-rise"><p class="weight-eyebrow">THE IDEA / PNG → VARIABLE WEIGHT</p><h3>让静态字形<br>动起来。</h3><p>上传一张字形 PNG，拖动滑块即可实时预览从细到粗的连续变化。中点保留原图；具备关键帧、局部字重调节功能，提高产出速度的同时追求精度。</p></div>
  <div class="weight-showcase">
   <figure class="weight-process weight-rise"><div class="weight-process-screen"><video src="./media/works/weightlab/tool-demo.mov" autoplay muted loop playsinline preload="auto" aria-label="PNG 字重工作台操作录屏"></video></div><figcaption><span>THE TOOL</span><p>一张 PNG，变成可探索的字重范围。<br>从上传、拖动到导出，变化发生在眼前。</p></figcaption></figure>
   <figure class="weight-variations weight-rise"><img src="./media/works/weightlab/art-weight-contact-sheet.png" alt="艺术二字从细到粗的字重变化过程图" loading="lazy"><figcaption><span>THE RANGE</span><p>同一组字形，连续变化的 25 个瞬间。</p></figcaption></figure>
   <figure class="weight-result weight-rise"><div class="weight-result-frame"><img src="./media/works/weightlab/art-weight-wave.gif" alt="繁体艺术二字左右错拍、笔画轻微波动的字重动态作品" loading="lazy"></div><figcaption><span>THE RESULT</span><p>以「藝術」为素材，让两字错拍变化，形成具有呼吸感的字体动效。</p></figcaption></figure>
  </div>
  <div class="weight-outro weight-rise"><p>FROM PNG<br>TO MOTION.</p><a href="https://png-weight-lab.jinqiuhuang0.chatgpt.site/" target="_blank" rel="noopener noreferrer" aria-label="打开 PNG 字重工作台，新窗口">打开字重工作台 <span aria-hidden="true">↗</span></a></div>
 </section>`}
function promptskillChapter(){return `<section class="prompt-story" aria-label="提示词 Skill 的方法与示例">
 <div class="prompt-intro weight-rise"><span>THE IDEA / 01</span><h3>把反复解释，<br>变成一次调用。</h3><p>用 AI 辅助设计时，真正费时的是重复说明“参考什么、不参考什么”。我把这套判断写成 Skill，让意图更快变成可执行的提示词。</p></div>
 <div class="prompt-demo weight-rise" data-prompt-mode="reference" aria-label="提示词 Skill 交互演示">
  <div class="prompt-demo-top"><span>IN ACTION / 模拟演示</span><div class="prompt-demo-tabs" role="group" aria-label="切换演示场景"><button type="button" data-mode="reference" aria-pressed="true">01 选择性参考</button><button type="button" data-mode="measure" aria-pressed="false">02 数值化复刻</button></div></div>
  <div class="prompt-demo-window"><div class="prompt-demo-bar"><span class="prompt-demo-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>PROMPT SKILL / WORKSPACE</span><span>● ACTIVE</span></div>
   <div class="prompt-demo-chat"><div class="prompt-demo-attach"><span>REFERENCE IMAGES / 03</span><div class="prompt-demo-images"><figure><img src="./media/works/illustration/guanzizai-01-web.jpg" alt="观自在系列：眼形构图与中心圆形图案"><figcaption>01 / 图像结构</figcaption></figure><figure><img src="./media/works/illustration/fushiji-01-web.jpg" alt="浮世击系列：灰阶兽首与彩色图形的数码拼贴"><figcaption>02 / 拼贴肌理</figcaption></figure><figure><img src="./media/works/illustration/guanzizai-02.jpg" alt="观自在系列：红黑底色与金色佛首"><figcaption>03 / 构图配色</figcaption></figure></div></div>
   <div class="prompt-demo-reply prompt-demo-reply--reference"><span>SKILL / SELECTIVE REFERENCE · 02</span><p>仅借用第 02 张的<strong>数码拼贴工艺与肌理</strong>。</p><div><b>提取</b> 剪贴蒙版叠层；灰阶干刷、拓印颗粒与局部错位套印；硬切轮廓和擦除边缘交替。</div><div><b>屏蔽</b> 兽首、人物、花卉图案、横向构图及青绿／朱红配色；保持目标图自身的主体与色彩。</div></div>
   <div class="prompt-demo-reply prompt-demo-reply--measure"><span>SKILL / RECONSTRUCTION PROMPT · 03</span><p>将第 03 张转译为<strong>可执行的画面参数</strong>。</p><div><b>构图</b> 横幅约 1.52:1；佛首居中，宽约占画面 42%；右侧树根状竖线形成次要视觉轴。</div><div><b>色块</b> 焦黑／深褐约 55%，朱红约 30%，赭金与灰白约 15%；明部集中于面部和右侧线条。</div><div><b>肌理</b> 低照度壁画质感，叠加干刷、磨损纸纹与细密回纹；左下保留三处白色细线小人物。</div></div></div>
   <div class="prompt-demo-composer"><span class="prompt-demo-slash">/prompt-skill</span><span class="prompt-demo-input prompt-demo-input--reference">只参考图 02 的拼贴肌理；主体、构图与配色沿用我的原图。</span><span class="prompt-demo-input prompt-demo-input--measure">分析图 03，写出可供图像模型复刻的构图、色彩和肌理提示词。</span><span class="prompt-demo-send" aria-hidden="true">↗</span></div>
  </div><div class="prompt-demo-foot"><span>DEMO / 比例为画面估算，生成时可微调</span><p>指明一个维度，自动屏蔽其余信息。<br>要求复刻，自动把感受拆成参数。</p></div>
 </div>
 <div class="prompt-finale weight-rise"><span>DESIGN × AI × WORKFLOW</span><p>少一点重复操作。<br>多一点准确表达。</p><small>从个人提示词方法出发，建立稳定、可迁移的视觉产出流程。</small></div>
 </section>`}
function startWeightlabReveal(root){
 const targets=[...root.querySelectorAll('.weight-overview>*,.prompt-overview>*,.weight-rise')];
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){targets.forEach(target=>target.classList.add('is-visible'));return()=>{}}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
 targets.forEach(target=>observer.observe(target));
 return()=>observer.disconnect();
}
function mixedLines(lines){
 let characterIndex=0;return lines.map(line=>`<span class="opening-title-line">${line.map(word=>`<span class="opening-title-word">${[...word].map(character=>{const serif=[1,2,4,5].includes(characterIndex++%6);return `<i class="title-char ${serif?'title-char--serif':'title-char--sans'}">${character}</i>`}).join('')}</span>`).join('<i class="title-space">&nbsp;</i>')}</span>`).join('');
}
function mixedTitle(title){
 const words=title.replace(' / ',' ').split(' '),cut=Math.ceil(words.length/2),lines=words.length===1?[words]:[words.slice(0,cut),words.slice(cut)];return mixedLines(lines);
}
document.querySelectorAll('[data-mixed-title]').forEach(label=>{label.innerHTML=mixedLines(label.dataset.mixedTitle.split('|').map(line=>line.split(' ')))});
let activeOpeningHandler,activeDecorationHandler,activeNiuHandler;
function updateDetailOpening(){
 const opening=detail.querySelector('.detail-opening'),stage=detail.querySelector('.detail-opening-stage');if(!opening||!stage)return;
 const rect=opening.getBoundingClientRect(),distance=Math.max(1,opening.offsetHeight-innerHeight),progress=Math.max(0,Math.min(1,-rect.top/distance));
 stage.style.setProperty('--opening-progress',progress.toFixed(4));updateProjectStageColor();
 const image=stage.querySelector('.opening-image');
 if(image){const eased=1-Math.pow(1-progress,3),width=28+72*eased,height=19+29*eased,top=10*(1-eased);if(detail.dataset.project==='chagee')image.style.objectPosition=`center ${32-8*progress}%`;image.style.width=`${width}vw`;image.style.height=`${height}vh`;image.style.top=`${top}vh`;image.style.borderRadius=`${Math.max(0,2*(1-eased))}px`;}
}
function startChageeRain(root){
 const field=document.createElement('div');field.className='chagee-rain';field.setAttribute('aria-hidden','true');root.append(field);
 const targets=[...root.querySelectorAll('.chagee-keyframe-still img'),root.querySelector('.next-project')];
 const files=chageeStickerSequence.filter(item=>item.kind==='image').map(item=>item.file);
 const targetIndexes=[0,0,1,1,2,2,3,3,4,4,4];
 let alive=true,last=performance.now(),startedAt=last,frameId=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const particles=files.map((file,index)=>{
  const el=document.createElement('img');el.className='chagee-rain-sticker';el.src=`./media/works/chagee/stickers/prop-${file}.png?v=4`;el.alt='';el.draggable=false;
  const width=Math.max(92,Math.min(157,innerWidth*(.08+(index%4)*.006)));
  el.style.width=`${width}px`;field.append(el);
  return {el,index,target:targets[targetIndexes[index]],width,height:width*1.12,x:0,y:0,vx:0,vy:0,angle:(index%2?1:-1)*12,spin:0,started:false,settledAt:0,cycle:0};
 });
 const origin=()=>root.getBoundingClientRect();
 function targetPoint(p){
  const box=p.target.getBoundingClientRect(),base=origin();
  const lane=(p.index*0.61803398875+p.cycle*.157)%1;
  return {x:box.left-base.left+box.width*(.13+lane*.72)-p.width/2,y:box.top-base.top-p.el.offsetHeight};
 }
 function launch(p,now){const point=targetPoint(p);p.x=point.x+(p.index%2?24:-24);p.y=point.y-Math.min(650,innerHeight*.85);p.vx=0;p.vy=12;p.spin=(p.index%2?1:-1)*9;p.started=true;p.settledAt=0;p.cycle++;p.el.style.opacity='1'}
 function gust(event){if(!alive)return;for(const p of particles){if(!p.started)continue;const box=p.el.getBoundingClientRect(),dx=box.left+box.width/2-event.clientX,dy=box.top+box.height/2-event.clientY,distance=Math.hypot(dx,dy);if(distance>190)continue;const power=1-distance/190;p.vx+=Math.sign(dx||1)*power*38;p.vy-=power*65;p.spin+=Math.sign(dx||1)*power*8;p.settledAt=0}}
 function tick(now){if(!alive)return;const dt=Math.min(.04,(now-last)/1000);last=now;for(const p of particles){
  const targetRect=p.target.getBoundingClientRect();
  if(!p.started){if(targetRect.top<innerHeight*1.35&&targetRect.bottom>-.4*innerHeight&&now-startedAt>p.index*260)launch(p,now);else continue}
  const landing=targetPoint(p);p.vy=Math.min(510,p.vy+230*dt);p.y+=p.vy*dt;p.x+=p.vx*dt;p.vx*=Math.pow(.965,dt*60);p.angle+=p.spin*dt;p.spin*=Math.pow(.94,dt*60);
  if(p.y>=landing.y&&p.vy>0){p.y=landing.y;if(p.vy>48){p.vy=-p.vy*.17;p.angle+=(p.index%2?1:-1)*1.8;p.spin+=(p.index%2?1:-1)*2.5}else{p.vy=0;p.spin=0;if(!p.settledAt)p.settledAt=now}p.vx=0}
  if(p.settledAt&&now-p.settledAt>4200+(p.index%4)*850&&targetRect.bottom>0&&targetRect.top<innerHeight){launch(p,now)}
  p.el.style.transform=`translate3d(${p.x}px,${p.y}px,0) rotate(${p.angle}deg)`;
 }frameId=requestAnimationFrame(tick)}
 addEventListener('pointermove',gust,{passive:true});frameId=requestAnimationFrame(tick);
 if(reduced){particles.forEach(p=>{const point=targetPoint(p);p.el.style.cssText+=`;opacity:1;transform:translate3d(${point.x}px,${point.y}px,0) rotate(${p.angle}deg)`});cancelAnimationFrame(frameId)}
 return ()=>{alive=false;cancelAnimationFrame(frameId);removeEventListener('pointermove',gust);field.remove()};
}
function openProject(id,originCard){
 const project=projects.find(item=>item.id===id);if(!project)return;
 const media=grouped[project.id]||[],cover=coverFor(project),originImage=originCard?.querySelector('img'),originRect=originImage?.getBoundingClientRect(),projectIndex=projects.findIndex(item=>item.id===id),nextProject=projects[(projectIndex+1)%projects.length],nextCover=coverFor(nextProject);
 if(activeOpeningHandler){removeEventListener('scroll',activeOpeningHandler);activeOpeningHandler=null}document.querySelector('.project-transition')?.remove();
 document.body.classList.add('project-open');works.style.setProperty('--project-color',project.color);works.classList.toggle('detail-dark',Boolean(project.dark));works.classList.toggle('detail-color-on-scroll',id==='niu'||id==='pony'||id==='mcgrady'||id==='xuliang');works.style.setProperty('--detail-stage-color','#fff');works.style.setProperty('--detail-stage-ink','#090909');works.classList.add('is-detail');worksIndex.hidden=true;detail.hidden=false;detail.dataset.project=id;
 const total=String(projects.length).padStart(2,'0');
 const overview=id==='promptskill'?`<section class="detail-overview prompt-overview"><p>${project.copy}</p><div><span>DESIGN × CODE / 2026</span><p>我将日常写提示词时反复使用的判断整合成 Skill：先界定参考范围，再把画面分析转译为更精确的生成语言。</p></div></section>`:id==='weightlab'?`<section class="detail-overview weight-overview"><p>${project.copy}</p><div><span>DESIGN × CODE / 2026</span><p>这是一件从字形图像出发的浏览器工具实验。通过多个滑块即时调整整体与局部视觉字重，用关键帧记录变化，并将选中的状态导出为清晰的 PNG。</p></div></section>`:`<section class="detail-overview"><p>${project.copy}</p><dl><div><dt>ROLE</dt><dd>${project.meta}</dd></div><div><dt>PROJECT</dt><dd>${project.zh}</dd></div><div><dt>YEAR</dt><dd>2026</dd></div></dl></section>`;
 detail.innerHTML=`<nav class="detail-nav"><button type="button" data-close-detail>← ALL WORKS</button><div><strong>${project.title}</strong><small>${project.zh} / ${project.meta}</small></div><span>${project.no} / ${total}</span></nav><nav class="detail-bottom-nav"><button type="button" data-close-detail>← ALL WORKS</button><small>${project.zh} / ${project.meta}</small><span>${project.no} / ${total}</span></nav><section class="detail-opening"><div class="detail-opening-stage">${id==='weightlab'||id==='promptskill'?'':`<img class="opening-image" src="${cover?.src||''}" alt="${project.zh}">`}${id==='weightlab'?`<div class="weight-motion-hero"><video src="./media/works/weightlab/variable-weight-motion.webm" autoplay muted loop playsinline preload="auto" aria-label="VARIABLE WEIGHT LAB 混排字重动态头图"></video></div>`:`<h1 class="opening-title opening-title--mixed">${mixedTitle(project.title)}</h1>`}<h2 class="opening-title opening-title--large">${project.title}</h2><span class="opening-index">${project.no} / ${total} · SCROLL</span></div></section>${overview}${chapterMarkup(project,media)}<section class="next-project"><span>NEXT PROJECT</span><button type="button" data-next-project="${nextProject.id}"><span class="next-project-visual"><img src="${nextCover?.src||''}" alt="${nextProject.zh}"><span class="work-card-action" data-scramble="VIEW PROJECT">VIEW PROJECT</span></span><span><strong data-scramble="${nextProject.title}">${nextProject.title}</strong><small>${nextProject.zh}<br>${nextProject.meta}</small></span></button><button class="detail-continue" type="button" data-continue-site>继续浏览 WORKFLOW ↓</button></section>`;
 if(activeDecorationHandler){activeDecorationHandler();activeDecorationHandler=null}
 if(activeNiuHandler){activeNiuHandler();activeNiuHandler=null}
 if(id==='niu'){const stopSequence=startNiuSequences(detail),stopCrowd=startNiuCrowd(detail);activeNiuHandler=()=>{stopSequence();stopCrowd()}}
 if(id==='pony'){const stopCrowd=startNiuCrowd(detail,'.pony-crowd-sequence'),stopShowcase=startPonyShowcase(detail);activeNiuHandler=()=>{stopCrowd();stopShowcase()}}
 if(id==='mcgrady'||id==='xuliang')activeNiuHandler=startMcgradyChapter(detail);
 if(id==='chagee')activeDecorationHandler=startChageeRain(detail);
 if(id==='lesamedi')activeDecorationHandler=startLesamediShowcase(detail);
 if(id==='illustration')activeDecorationHandler=startIllustrationGallery(detail);
 if(id==='weightlab'||id==='promptskill')activeDecorationHandler=startWeightlabReveal(detail);
 if(id==='promptskill'){const demo=detail.querySelector('.prompt-demo');demo.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{demo.dataset.promptMode=button.dataset.mode;demo.querySelectorAll('[data-mode]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)))}))}
 if(id==='chagee'){const keyframeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.12});detail.querySelectorAll('.chagee-keyframe-pair').forEach(pair=>keyframeObserver.observe(pair));}
 if(id==='chagee')detail.querySelectorAll('.chagee-sticker-card').forEach(card=>card.addEventListener('click',async()=>{clearTimeout(card.liftTimer);const request=card.flipRequest=(card.flipRequest||0)+1;card.classList.add('is-extracted');const back=card.querySelector('.chagee-sticker-back');try{await Promise.all([new Promise(resolve=>setTimeout(resolve,210)),back.decode()])}catch{card.classList.remove('is-extracted');return}if(request!==card.flipRequest||!card.isConnected)return;card.classList.toggle('is-flipped');card.setAttribute('aria-pressed',String(card.classList.contains('is-flipped')));card.liftTimer=setTimeout(()=>card.classList.remove('is-extracted'),750)}));
 detail.querySelectorAll('[data-close-detail]').forEach(button=>button.addEventListener('click',()=>closeProject()));
 detail.querySelector('[data-continue-site]')?.addEventListener('click',()=>closeProject('process'));
 const nextButton=detail.querySelector('[data-next-project]');nextButton.addEventListener('pointerenter',()=>scrambleGroup(nextButton));nextButton.addEventListener('pointerleave',()=>resetScrambleGroup(nextButton));nextButton.addEventListener('focus',()=>scrambleGroup(nextButton));nextButton.addEventListener('blur',()=>resetScrambleGroup(nextButton));nextButton.addEventListener('click',event=>openProject(event.currentTarget.dataset.nextProject,event.currentTarget));
 history.replaceState(null,'',`#project-${project.id}`);requestAnimationFrame(()=>requestAnimationFrame(()=>scrollTo({top:works.offsetTop,behavior:'instant'})));
 const stageImage=detail.querySelector('.opening-image');if(id==='weightlab'||id==='promptskill'){if(id==='weightlab'){const motion=detail.querySelector('.weight-motion-hero video');motion.playbackRate=1.2;motion.play().catch(()=>{})}detail.classList.add('is-opening','opening-ready');activeOpeningHandler=()=>updateDetailOpening();addEventListener('scroll',activeOpeningHandler,{passive:true});updateDetailOpening();return}const transition=document.createElement('div');transition.className='project-transition';transition.style.background=(id==='niu'||id==='pony'||id==='mcgrady'||id==='xuliang')?'#fff':project.color;
 const clone=stageImage.cloneNode();clone.className='project-transition-image';if(id==='lesamedi')clone.style.objectPosition='center 35%';if(id==='chagee')clone.style.objectPosition='center 32%';transition.append(clone);document.body.append(transition);stageImage.style.opacity='0';
 if(originRect){Object.assign(clone.style,{left:`${originRect.left}px`,top:`${originRect.top}px`,width:`${originRect.width}px`,height:`${originRect.height}px`})}
 else Object.assign(clone.style,{left:'36vw',top:'34vh',width:'28vw',height:'32vh'});
 requestAnimationFrame(()=>requestAnimationFrame(()=>{transition.classList.add('is-running');Object.assign(clone.style,{left:'36vw',top:'10vh',width:'28vw',height:'19vh'});detail.classList.add('is-opening')}));
 setTimeout(()=>{stageImage.style.opacity='1';transition.remove();detail.classList.add('opening-ready')},900);
 activeOpeningHandler=()=>updateDetailOpening();addEventListener('scroll',activeOpeningHandler,{passive:true});updateDetailOpening();
}
function closeProject(destination='works'){if(activeNiuHandler){activeNiuHandler();activeNiuHandler=null}if(activeDecorationHandler){activeDecorationHandler();activeDecorationHandler=null}if(activeOpeningHandler){removeEventListener('scroll',activeOpeningHandler);activeOpeningHandler=null}document.querySelector('.project-transition')?.remove();document.body.classList.remove('project-open');detail.hidden=true;detail.innerHTML='';detail.className='project-detail';delete detail.dataset.project;worksIndex.hidden=false;works.classList.remove('is-detail','detail-dark','detail-color-on-scroll');works.style.removeProperty('--project-color');works.style.removeProperty('--detail-stage-color');works.style.removeProperty('--detail-stage-ink');history.replaceState(null,'','#works');requestAnimationFrame(()=>requestAnimationFrame(()=>document.querySelector(destination==='process'?'#process':'#works')?.scrollIntoView({behavior:'instant'})))}
document.querySelectorAll('[data-project-target]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();openProject(link.dataset.projectTarget)}));

const capabilityWindows=[...document.querySelectorAll('.capability-window')];
let topWindow=40;
let folderActivationY=null;
function activateWindow(panel){
 capabilityWindows.forEach(item=>item.classList.toggle('is-active',item===panel));
 panel.style.zIndex=String(++topWindow);
 folderActivationY=scrollY;
}
addEventListener('scroll',()=>{
 if(folderActivationY===null||Math.abs(scrollY-folderActivationY)<64)return;
 capabilityWindows.forEach(panel=>{panel.style.removeProperty('z-index');panel.classList.remove('is-active')});
 folderActivationY=null;
},{passive:true});
capabilityWindows.forEach(panel=>{
 let drag=null;
 panel.addEventListener('pointerdown',event=>{
   if(event.button!==0||event.pointerType!=='mouse'||event.target.closest('a,button,.tool-card'))return;
   activateWindow(panel);
   drag={id:event.pointerId,x:event.clientX,y:event.clientY,baseX:Number(panel.dataset.dragX)||0,baseY:Number(panel.dataset.dragY)||0};
   panel.setPointerCapture(event.pointerId);
   event.preventDefault();
 });
 panel.addEventListener('pointermove',event=>{
   if(!drag||event.pointerId!==drag.id)return;
   const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
   if(Math.abs(dx)+Math.abs(dy)>4)panel.classList.add('is-dragging');
   if(!panel.classList.contains('is-dragging'))return;
   const x=drag.baseX+dx,y=drag.baseY+dy;
   panel.dataset.dragX=String(x);panel.dataset.dragY=String(y);
   panel.style.setProperty('--drag-x',`${x}px`);
   panel.style.setProperty('--drag-y',`${y}px`);
 });
 const endDrag=event=>{
   if(!drag||event.pointerId!==drag.id)return;
   if(panel.hasPointerCapture(event.pointerId))panel.releasePointerCapture(event.pointerId);
   panel.classList.remove('is-dragging');
   drag=null;
 };
 panel.addEventListener('pointerup',endDrag);
 panel.addEventListener('pointercancel',endDrag);
});

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,loader=document.querySelector('.loader');
const loaderMaterials=['tape','liquid-silver','stone','fabric','blue-chrome','balloon','worn-metal'];
const loaderLetters=[...document.querySelectorAll('[data-loader-letter]')],loaderNumber=document.querySelector('[data-progress]'),loaderMeta=document.querySelector('[data-loader-meta]');
const loaderFinal=[0,3,2,6,4,5];
const readyLoaderImages=new Set();
loaderLetters.forEach(letter=>{const src=letter.src;if(letter.complete&&letter.naturalWidth)readyLoaderImages.add(src);else letter.addEventListener('load',()=>readyLoaderImages.add(src),{once:true})});
function setLoaderFrame(frame,final=false){
 loaderLetters.forEach((letter,index)=>{const materialIndex=final?loaderFinal[index]:(frame+index*2)%loaderMaterials.length;const material=loaderMaterials[materialIndex];const src=new URL(`./media/loader/letters/${material}-${index+1}.png`,location.href).href;if(!readyLoaderImages.has(src))return;letter.parentElement.dataset.material=material;letter.src=src});
}
function scrambleLoaderCopy(element,ratio,frame,glyphs){
 const finalText=element.dataset.final,characters=[...finalText],eligible=characters.filter(character=>/[A-Za-z0-9]/.test(character)).length,resolved=Math.floor(ratio*eligible);let index=0;
 element.textContent=characters.map(character=>{if(!/[A-Za-z0-9]/.test(character))return character;return index++<resolved?character:glyphs[(frame*5+index*3)%glyphs.length]}).join('');
}
function finishLoader(){setLoaderFrame(0,true);loader.classList.add('is-final');loaderNumber.textContent=loaderNumber.dataset.final;loaderMeta.textContent=loaderMeta.dataset.final;setTimeout(()=>{scrollTo(0,0);document.body.classList.add('ready');setTimeout(()=>loader.remove(),800)},190)}
function animateLoader(){
 if(reduced){finishLoader();return}
 const start=performance.now(),duration=780,frameInterval=78;let lastFrame=-1;
 function tick(now){const elapsed=now-start,ratio=Math.min(1,elapsed/duration),frame=Math.floor(elapsed/frameInterval);if(frame!==lastFrame){setLoaderFrame(frame);lastFrame=frame}scrambleLoaderCopy(loaderNumber,ratio,frame,'0123456789');scrambleLoaderCopy(loaderMeta,ratio,frame,scrambleGlyphs);if(ratio<1)requestAnimationFrame(tick);else finishLoader()}
 requestAnimationFrame(tick);
}
const loaderLetterSources=loaderMaterials.flatMap(material=>loaderLetters.map((_,index)=>`./media/loader/letters/${material}-${index+1}.png`));
loaderLetterSources.forEach(src=>{const image=new Image();image.fetchPriority='low';image.onload=()=>readyLoaderImages.add(new URL(src,location.href).href);image.src=src});
animateLoader();
const aboutSection=document.querySelector('#about');
function makeAboutScrambler(element){
 const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT),parts=[];let node;
 while((node=walker.nextNode()))if(node.textContent.trim())parts.push({node,original:node.textContent});
 let frameId=0,run=0;
 const reset=()=>{run++;cancelAnimationFrame(frameId);parts.forEach(part=>part.node.textContent=part.original)};
 const start=()=>{reset();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const current=++run,startTime=performance.now(),duration=680,total=parts.reduce((sum,part)=>sum+[...part.original].length,0);
  function tick(now){if(current!==run)return;const resolved=Math.floor(Math.min(1,(now-startTime)/duration)*total);let offset=0;parts.forEach(({node,original})=>{node.textContent=[...original].map((char,index)=>{const done=offset+index<resolved;if(done||!/[A-Za-z0-9\u4e00-\u9fff]/.test(char))return char;if(/[0-9]/.test(char))return String(Math.floor(Math.random()*10));if(/[\u4e00-\u9fff]/.test(char))return processHan[Math.floor(Math.random()*processHan.length)];return processGlyphs[Math.floor(Math.random()*processGlyphs.length)]}).join('');offset+=[...original].length});if(now-startTime<duration)frameId=requestAnimationFrame(tick)}frameId=requestAnimationFrame(tick)};
 element.addEventListener('pointerenter',start);element.addEventListener('pointerleave',reset);return{start,reset};
}
const aboutScramblers=[...aboutSection.querySelectorAll('.about-heading h2,.about-name-zh')].map(makeAboutScrambler);
let aboutScrambleTimers=[];
new IntersectionObserver(entries=>entries.forEach(entry=>{const visible=entry.isIntersecting;if(visible===aboutSection.classList.contains('is-in-view'))return;aboutSection.classList.toggle('is-in-view',visible);aboutScrambleTimers.forEach(clearTimeout);aboutScrambleTimers=[];if(visible){aboutScramblers.forEach((item,index)=>aboutScrambleTimers.push(setTimeout(item.start,170+index*150)))}else aboutScramblers.forEach(item=>item.reset())}),{threshold:.16}).observe(aboutSection);
if(!reduced){
 const hero=document.querySelector('.hero');hero.addEventListener('pointermove',event=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(event.clientX-r.left)/r.width-.5);hero.style.setProperty('--my',(event.clientY-r.top)/r.height-.5)});
 const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('seen');io.unobserve(entry.target)}}),{rootMargin:'0px 0px -10%'});
 const revealSelector='.capabilities-intro,.capability-window,.works-index-head,.works-stage,.works-index-foot,.process .section-head,.process-track article,.about-heading,.about-portrait img';
 document.querySelectorAll(revealSelector).forEach(element=>{element.classList.add('scroll-reveal');io.observe(element)});
}
