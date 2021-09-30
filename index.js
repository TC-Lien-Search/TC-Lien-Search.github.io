const bgImageArr = ['florida-1.jpg','florida-2.jpg','florida-3.jpg','florida-4.jpg','florida-5.jpg'];
let imgArrIdx = 2;
let bgFront = document.querySelector('.bg-front');
let bgBack = document.querySelector('.bg-back');
// let bgInterval;

bgFront.addEventListener('transitionend', (e)=>{
  console.log(e.target);
  if(!bgImageArr[imgArrIdx]) imgArrIdx = 0;
  if(bgFront.classList.contains('fade-out')){
    bgFront.style.backgroundImage = `url(./img/${bgImageArr[imgArrIdx]})`;
  } else {
    bgBack.style.backgroundImage = `url(./img/${bgImageArr[imgArrIdx]})`;
  }
  imgArrIdx++;
})

setInterval(()=>{
  if(bgFront.classList.contains('fade-out')){
    bgFront.classList.remove('fade-out');
  } else {
    bgFront.classList.add('fade-out');
  }
}, 10000);

