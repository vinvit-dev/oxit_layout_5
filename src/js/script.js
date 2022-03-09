$(document).ready(function(){
    $('.comments__slick').slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              }
            }
        ]
    });
});

header = document.getElementById("header");
menu = document.getElementById("navbarNavAltMarkup");
burg_btn = document.getElementById("burger");


window.addEventListener('scroll', function(e) {
  if(window.pageYOffset > 50) {
    header.style.background = '#151519f0';
    header.style.paddingTop = '20px';
  } else if(!menu.classList.contains("show")){
    header.style.background = 'none';
    header.style.paddingTop = '31px';
  }
});

let burger__items = document.querySelectorAll(".menu .menu__link");
burger__items.forEach(function (item) {
    item.addEventListener("click", function() {
      if(menu.classList.contains("show")){
        $('#navbarNavAltMarkup').collapse('toggle');
      }
    });
});


burg_btn.addEventListener('click', function(e) {
  header.style.background = '#151519f0';
});

