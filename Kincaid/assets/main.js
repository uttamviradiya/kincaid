$(document).ready(function(){

  //  sticky header 
  $(window).scroll(function(){

    var headertop = $(".header-top").height() + $(".header-bottom-primary").height() + 100;
    if($(document).scrollTop() >= headertop)
    {
      //     	$(".header-bottom-primary").addClass("sticky");
      //       $(".mobile-search-main").addClass("sticky-search").css("top","" + $(".header-bottom-primary").height() + "px");

    }
    else{
      //       $(".header-bottom-primary").removeClass("sticky");
      //       $(".mobile-search-main").removeClass("sticky-search").css("top","100%");
    }
  });


  /*  mobile menu open  */

  $(".resp-ham-block .hamburger").click(function(){
    $(".mobile-nav-main").fadeIn();
    $(".mobile-nav-main .mobile-nav").css("transform","translateX(0)");  
    $("body").css("overflow","hidden");
    pro_slider();
  });

  $(".mobile-nav .close").click(function(){
    $(".mobile-nav-main").fadeOut();
    $(".mobile-nav-main .mobile-nav").css("transform","translateX(-100%)");  
    $("body").css("overflow","auto");
  });  

  $(".nav-overlay").click(function(){
    $(".mobile-nav-main").fadeOut();
    $(".mobile-nav-main .mobile-nav").css("transform","translateX(-100%)");  
    $(".mobile-nav-main .login-popup-block").css("transform","translateX(200%)");  
    $("body").css("overflow","auto");
  });

  $(".main-li").click(function(){
    $(this).find(".mob-dropdown-menu1").addClass("active");   
  });

  $(".main-sub-li").click(function(){

    //     $("div").scrollTop(0);
    //     $(this).find(".mob-dropdown-submenu1").scrollTop(0).addClass("active");  
    $(this).find(".mob-dropdown-submenu1").scrollTop(0).addClass("active");    
    $(".mob-dropdown-menu1").scrollTop(0).addClass("over-hide");
  });

  $(".main-li-head").click(function(e){    
    e.stopPropagation();
    $(".mob-dropdown-menu1").removeClass("active");    

  });

  $(".main-sub-li-head").click(function(e){

    e.stopPropagation();
    $(".mob-dropdown-menu1").removeClass("over-hide");
    $(".mob-dropdown-submenu1").removeClass("active");


  });
  // serach 
  $("#search").click(function(){
    $("#close-search").show();
    $("#search").hide();
    $(".mobile-search-main").fadeIn();

  });

  $("#close-search").click(function(){
    $("#close-search").hide();
    $("#search").show();
    $(".mobile-search-main").fadeOut();
  });

  function pro_slider(){
    $('.resp-product-slider').slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      speed: 700,
      dots:true
    });
  }

  //click to copy
  $(".dis-code-btn").click(function(){

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($($(this)).text()).select();
    document.execCommand("copy");
    $temp.remove();
  });

  //   click on login
  $(".login-click-popup").click(function(){
    $(".mobile-nav-main").fadeIn();
    $(".mobile-nav-main .login-popup-block").css("transform","translateX(0)");  
    $("body").css("overflow","hidden");

  });

  $(".login-popup-block .close").click(function(){
    $(".mobile-nav-main").fadeOut();
    $(".mobile-nav-main .login-popup-block").css("transform","translateX(200%)");  
    $("body").css("overflow","auto");
  });

  //click on cart popup
  $(".cart-popup").click(function(){
    $(".mobile-nav-main").fadeIn();
    $(".mobile-nav-main .cart-popup-block").css("transform","translateX(0)");  
    $("body").css("overflow","hidden");

  });

  $(".cart-popup-block .close").click(function(){
    $(".mobile-nav-main").fadeOut();
    $(".mobile-nav-main .cart-popup-block").css("transform","translateX(200%)");  
    $("body").css("overflow","auto");
  });
  
 

// tab menu

  $(".tab-menu-list .tab-a").first().addClass("active-a");
  $(".section-tab-menu .tab").first().addClass("tab-active");
  $('.tab-menu-list .tab-a').click(function(){  
    $(".tab-active .pro-block-slider").slick("unslick");
    $(".section-tab-menu .tab").removeClass('tab-active');

    $(".section-tab-menu #tab"+$(this).attr('id')+"").addClass("tab-active");

    $(".tab-menu-list .tab-a").removeClass('active-a');

    $(this).addClass('active-a');
    tab_menu_slider();
  });

  function tab_menu_slider(){

    $(".tab-active .pro-block-slider").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 2,
      arrows:true,
      prevArrow:'<button class="qv-arrow qv-prev"><i class="fa fa-angle-left"></i></button>',
      nextArrow:'<button class="qv-arrow qv-next"><i class="fa fa-angle-right"></i></button>',
      responsive: [
        {
          breakpoint: 1401,
          settings: {
            slidesToShow: 4,
            slidesToScroll:2,
            infinite: true,
            arrows:true
          }
        },
        {
          breakpoint: 1201,
          settings: {
            slidesToShow: 3,
            slidesToScroll:1,
            infinite: true,
            arrows:true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll:1,
            infinite: true,
            arrows:true
          }
        },
        {
          breakpoint: 578,
          settings: {
            slidesToShow: 1, 
            slidesToScroll: 1,
            arrows:true
          }
        }
      ]
    });
  }
  tab_menu_slider();

 });