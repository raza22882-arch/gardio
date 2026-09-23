document.querySelectorAll('.nav-button').forEach(btn=>{
  btn.addEventListener('click', e=>{
    e.stopPropagation();
    const parent=btn.parentElement;
    document.querySelectorAll('.nav-dropdown').forEach(x=>{if(x!==parent)x.classList.remove('open')});
    parent.classList.toggle('open');
  });
});
document.addEventListener('click',()=>document.querySelectorAll('.nav-dropdown').forEach(x=>x.classList.remove('open')));

const mobile=document.querySelector('.mobile-menu');
const nav=document.querySelector('.main-nav');
const actions=document.querySelector('.nav-actions');
mobile?.addEventListener('click',()=>{
  const open=nav.classList.toggle('mobile-open');
  actions.classList.toggle('mobile-open');
  document.body.classList.toggle('menu-open',open);
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(!id || id==='#') return;
    const el=document.querySelector(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>img.classList.add('asset-missing'));
});
