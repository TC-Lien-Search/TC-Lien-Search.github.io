const bgImageArr = ['florida1.jpg','florida2.jpg','florida3.jpg','florida4.jpg','florida5.jpg'];
let imgArrIdx = 2;
let bgFront = document.querySelector('.bg-front');
let bgBack = document.querySelector('.bg-back');
// let bgInterval;

bgFront.addEventListener('transitionend', (e)=>{
  if(!bgImageArr[imgArrIdx]) imgArrIdx = 0;
  if(bgFront.classList.contains('fade-out')){
    bgFront.style.backgroundImage = `url(./img/${bgImageArr[imgArrIdx]})`;
  } else {
    bgBack.style.backgroundImage = `url(./img/${bgImageArr[imgArrIdx]})`;
  }
})

setInterval(()=>{
  if(bgFront.classList.contains('fade-out')){
    bgFront.classList.remove('fade-out');
  } else {
    bgFront.classList.add('fade-out');
  }
}, 10000);

