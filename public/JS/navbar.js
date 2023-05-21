console.clear();
var hamb = document.querySelector('.hamburger');
var nav = document.querySelector('.nav-items');

hamb.addEventListener('click', function(){
  nav.classList.toggle('display');
})