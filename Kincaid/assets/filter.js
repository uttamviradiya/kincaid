
$(document).ready(function(){
  let p = 0;
  $(document).on("change",".filter-main-block form li.filter-item input",function() {
    ajax_filter();   
//     refine_by($(this).attr("id"),$(this).val());   
    console.log(window.location.pathname);
  });
  


  $(document).on("change",".filter-main-block form select",function() {
//     alert("sort by");
    ajax_filter();
  });

  
//   ajax filter
  function ajax_filter(){
//     alert($(".filter-main-block form").serialize());
    let serialize = $(".filter-main-block form").serialize();
    replacestate = new URLSearchParams(serialize),
    path = window.location.pathname;
    console.log(replacestate);
    console.log(path);
    $.ajax({
      type: "GET",
      url: path,
      data: serialize,
      success: function(res) {
        $(".product-grid-wrapper .product-grid-wrapper-list").html($(res).find(".product-grid-wrapper .product-grid-wrapper-list").html());
        $(".filter-main-block").html($(res).find(".filter-main-block").html());
        $(".main-wrapper .product-grid-wrapper .load-more-block").html($(res).find(".main-wrapper .product-grid-wrapper .load-more-block").html());
        refine_by_hide();
        price_range();
        wishlist_init();

        function wishlist_init(){
          let wishlistinit = JSON.parse(localStorage.getItem("wishlist"));
          $(wishlistinit).each(function(i,product){
            $(document).find(".product-card .wishlist-btn[data-handle="+product.handle+"]").addClass("wishlist-added");
          });
        }
      }
    });
    window.history.replaceState(null, null, "?" + replacestate);
//     refine_by(id,val);
  }
  
  refine_by_hide();
  
//   refine by hide
  function refine_by_hide(){
  	if($(".filter-active-block .filter-active-list .filter-active-item").length == 0)
    {
    	$(".filter-active-block").fadeOut();
    }
    else{
    	$(".filter-active-block").fadeIn();
    }
  }
  
//   price range
  function price_range(){
    let max1 =  parseInt($("#filter-Price-LTE" ).attr("max"));
    let maxval = max1;
    let minval = 0;
    if($("#filter-Price-LTE" ).val())
    {
      maxval =  parseInt($("#filter-Price-LTE" ).val());
    
    }
    if($("#filter-Price-GTE" ).val())
    {
      minval =  parseInt($("#filter-Price-GTE" ).val());
    }
    console.log("max=" + max1);
    $(function() {
      $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: max1,
        values: [ minval, maxval ],
        slide: function( event, ui ) {
          $("#filter-Price-GTE" ).val(ui.values[ 0 ]);
          $("#filter-Price-LTE" ).val(ui.values[ 1 ]);

          $("#filter-Price-GTE-label span" ).text(ui.values[ 0 ]);
          $("#filter-Price-LTE-label span" ).text(ui.values[ 1 ]);
        },
        stop: function(event, ui) {
          setTimeout(function(){
            alert();
            console.log("abc");
            console.log($("#filter-Price-GTE" ).val());
            console.log($("#filter-Price-LTE" ).val());

            
            	ajax_filter();
            
          }, 300)
        }
      });
      $( "#filter-Price-GTE" ).val($( "#slider-range" ).slider( "values", 0 ));         
    }); 
  }
  price_range();
  
  $(document).on("click",".filter-active-block .filter-active-item,.filter-active-block .filter-active-remove-all",function(e){
    e.preventDefault();
    let href = $(this).attr("href");
    console.log(href);

    $.ajax({
      type: "GET",
      url: href,
      success: function(res) {
        $(".product-grid-wrapper").html($(res).find(".product-grid-wrapper").html());
        $(".filter-main-block").html($(res).find(".filter-main-block").html());
        refine_by_hide();
        price_range();
        wishlist_init();

        function wishlist_init(){
          let wishlistinit = JSON.parse(localStorage.getItem("wishlist"));
          $(wishlistinit).each(function(i,product){
            $(document).find(".product-card .wishlist-btn[data-handle="+product.handle+"]").addClass("wishlist-added");
          });
        }
      }
    }), window.history.replaceState(null, null, href)
  });

  $(document).on("change",".product-grid-function-top .main-sort-by #sort-SortBy",function(){
//   	alert($(this).val());
    
    $(".filter-main-block form #SortBy").val($(this).val()).trigger("change");
  });
  
  $(document).on("click",".sortsort",function(){
  	alert();
    $(".filter-main-block form #SortBy").val("price-descending").trigger("change");
  });
  
  
  
//   product tag 
  $(".filter-main-block form li.tag-filter-item button.pro-tag-btn").click(function(e) {
    e.preventDefault();
    alert("tag");
//     ajax_filter();   
    //     refine_by($(this).attr("id"),$(this).val());   
    console.log(window.location.pathname + "->" + window.location.search );
    
    
//     alert($(".filter-main-block form").serialize());
    console.log($(this).attr("data-value"));
//     let serialize = $(".filter-main-block form").serialize();
//     replacestate = new URLSearchParams(serialize),
//       path = window.location.pathname;
//     console.log(replacestate);
//     console.log(path);
//     $.ajax({
//       type: "GET",
//       url: path,
//       data: serialize,
//       success: function(res) {
//         $(".product-grid-wrapper .product-grid-wrapper-list").html($(res).find(".product-grid-wrapper .product-grid-wrapper-list").html());
//         $(".filter-main-block").html($(res).find(".filter-main-block").html());
//         refine_by_hide();
//         price_range();
//         wishlist_init();

//         function wishlist_init(){
//           let wishlistinit = JSON.parse(localStorage.getItem("wishlist"));
//           $(wishlistinit).each(function(i,product){
//             $(document).find(".product-card .wishlist-btn[data-handle="+product.handle+"]").addClass("wishlist-added");
//           });
//         }
//       }
//     });
//     window.history.replaceState(null, null, "?" + replacestate);    
    
  });
  
});