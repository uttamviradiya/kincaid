$(document).ready(function(){
  function super_wishlist(){
  //   wishlist
  let wishlist = [];
  wishlist = JSON.parse(localStorage.getItem("wishlist"));
//   console.log(wishlist);
  //   if(wishlist == null)
  //   {
  //   	localStorage.setItem("wishlist",JSON.stringify(wishlist));
  //     wishlist = JSON.parse(localStorage.getItem("wishlist"));
  //   }
//   console.log(wishlist);
  let wishlist_products;

//   $("body").bind(".wishlist-btn").click(function(){
    $(document).on('click','.wishlist-btn',function () {
    let count = 0;
    var pro = $(this).attr("data-handle");

    $.getJSON("/products/" + pro + ".js",function(product){
      //       wishlist = JSON.parse(localStorage.getItem("wishlist"));
      console.log(product);    
      $(wishlist).each(function(i,pro1){
        if(product.id == pro1.id)
        {
          alert(product.handle);
          $(document).find(".product-card .wishlist-btn[data-handle="+product.handle+"]").removeClass("wishlist-added");
          wishlist = JSON.parse(localStorage.getItem("wishlist"));
          wishlist.splice(i, 1); 
          localStorage.setItem("wishlist",JSON.stringify(wishlist));
          count++;
          update_counter();
        }
        console.log(pro1.title);
      });


      console.log(wishlist);
      if(count == 0)
      {
        wishlist = JSON.parse(localStorage.getItem("wishlist"));
        if(wishlist == null)
        {
          localStorage.setItem("wishlist",JSON.stringify(wishlist));
          //           wishlist = JSON.parse(localStorage.getItem("wishlist"));
          wishlist = [];
          console.log("here");
        }
        console.log(wishlist);
        console.log(wishlist.length);
        wishlist.push(product);
        localStorage.setItem("wishlist",JSON.stringify(wishlist));
        wishlist_products = JSON.parse(localStorage.getItem("wishlist"));
        $(document).find(".product-card .wishlist-btn[data-handle="+pro+"]").addClass("wishlist-added");
        update_counter();
      }      
    });
//     display_wishlist();

  });

  wishlist_init();
    
  function wishlist_init(){
    let wishlistinit = JSON.parse(localStorage.getItem("wishlist"));
    $(wishlistinit).each(function(i,product){
      $(document).find(".product-card .wishlist-btn[data-handle="+product.handle+"]").addClass("wishlist-added");
    });
  }

//   function display_wishlist(){
//     let wishlist = JSON.parse(localStorage.getItem("wishlist"));
//     $(wishlist).each(function(i,product){
//       let btn;
//       if(product.variants.length > 0)
//       {
//         btn = "<a class='btn2' href="+product.url+">Select Options</a>";
//       }
//       else{
//         btn = "<button class='direct-to-cart btn2' data-handle="+product.handle+">Add to Cart</button>";
//       }
//       $(".wishlist-main table").append("<tr data-product-index='"+i+"' data-id='"+product.id+"'><td class='td-img'><figure class='wishlist-img'><img src="+product.featured_image+"></figure></td><td class='td-product-name'><a href='"+product.url+"'>"+product.title+"</a></td><td class='td-price'><h5>"+Shopify.formatMoney(product.price, window.money_format)+"</h5></td><td class='td-cart-btn'>"+btn+"</td><td class='td-remove'><button class='wishlist-remove-pro' data-index='"+i+"' data-id='"+product.id+"'><svg class='close-icon' viewBox='0 0 122.878 122.88'><g><path d='M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z'></path></g></svg></button></td></tr>");	
//     });

//   }

  function update_counter(){
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
//     console.log(wishlist.length);
//     console.log(wishlist);

    if(!wishlist)
    {
      $("header .wishlist .counter").text(0);
      $(".mobile-nav-main .mobile-nav .resp-wishlist .counter").text(0);
    }
    else
    {
      $("header .wishlist .counter").text(wishlist.length);
      $(".mobile-nav-main .mobile-nav .resp-wishlist .counter").text(wishlist.length);
    }
  }
//   display_wishlist();
  update_counter();

  $(document).on("click",".section-wishlist .wishlist-main table .wishlist-remove-pro",function(){
    alert($(this).data("id"));
    let i = $(this).data("index");
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    let id = $(this).data("id");

    if(wishlist.length > 1)
    {
      $(wishlist).each(function(j,product){
        if(product.id == id)
        {
          console.log("j=" + j);
          wishlist.splice(j, 1); 
          localStorage.setItem("wishlist",JSON.stringify(wishlist));
//           $(".product-card .wishlist-btn[data-handle="+wishlist[j].handle+"]").removeClass("wishlist-added");
          $(".section-wishlist .wishlist-main table tr[data-id='"+product.id+"']").remove();
          console.log(product.id);

        }
      });
    }
    else
    {
      let pro = wishlist[0];
      wishlist = [];
      localStorage.setItem("wishlist",JSON.stringify(wishlist));
//       $(".product-card .wishlist-btn[data-handle="+pro.handle+"]").removeClass("wishlist-added");
      $(".section-wishlist .wishlist-main table tr[data-id='"+pro.id+"']").remove();
      $(".section-wishlist .wishlist-empty").show();
      $(".section-wishlist .wishlist-header-block").hide();
    }
    update_counter();
  });
 }
  super_wishlist();
});