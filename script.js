// Mobile menu
const burger=document.querySelector('.burger');
const links=document.querySelector('.links');
if(burger){burger.addEventListener('click',()=>links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));}

// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Lightbox for gallery slots / images
const lb=document.querySelector('.lb');
if(lb){
  const stage=lb.querySelector('.lb-stage');
  document.querySelectorAll('.gallery .ph, .gallery img').forEach(el=>{
    el.addEventListener('click',()=>{stage.innerHTML='';stage.appendChild(el.cloneNode(true));lb.classList.add('open');});
  });
  const close=()=>lb.classList.remove('open');
  lb.querySelector('.lb-close').addEventListener('click',close);
  lb.addEventListener('click',e=>{if(e.target===lb)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
}

// Year
document.querySelectorAll('.year').forEach(y=>y.textContent=new Date().getFullYear());
