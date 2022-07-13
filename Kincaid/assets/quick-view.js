let global_product;
let global_variants = [];
let variant_price;

function qv_slider(){
  $('.product-media-slider-single').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-media-slider-multi',
    prevArrow:'<button class="qv-arrow qv-prev"><i class="fa fa-angle-left"></i></button>',
    nextArrow:'<button class="qv-arrow qv-next"><i class="fa fa-angle-right"></i></button>'
  });
  
  $('.product-media-slider-multi').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.product-media-slider-single',
    prevArrow:'<button class="qv-arrow qv-prev"><i class="fa fa-angle-left"></i></button>',
    nextArrow:'<button class="qv-arrow qv-next"><i class="fa fa-angle-right"></i></button>',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1201,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true
        }
      }
    ]
  });
}


function quick_view(handle,v){
  $.getJSON("/products/"+ handle +".js",function(product){
    console.log(product);
    console.log(v);
    global_product = product;
    let title = product.title,
        url = product.url,
        media = product.media,
        vendor = product.vendor,
        options = product.options,
        variants = product.variants,
        desc = product.description,
        price = product.price,
        c_price = product.compare_at_price

    $(".quick-view-main2 .pro-title").html(title);
    $(".quick-view-main2 .pro-title").attr("href",url);
    if(desc.length >= 150){
      desc = desc.slice(0,150)+'...';
    }
    $(".quick-view-main2 .pro-desc").html(desc);

    //media images
    $(media).each(function(i,media){
      if(media.media_type == 'image'){
        $('.quick-view-main2 .product-media-single .product-media-slider-single').append('<figure><img src="'+media.preview_image.src+'"></figure>');
        $('.quick-view-main2 .product-media-multi .product-media-slider-multi').append('<figure><img src="'+media.preview_image.src+'"></figure>');
      }else if(media.media_type == 'video'){
        $('.quick-view-main2 .product-media-single .product-media-slider-single').append('<figure><video playsinline mute autoplay loop preload="metadata" poster="'+media.preview_image.src+'"><source src="'+media.sources[0].url+'" type="video/mp4"></video></figure>');
        $('.quick-view-main2 .product-media-multi .product-media-slider-multi').append('<figure><video playsinline mute autoplay loop preload="metadata" poster="'+media.preview_image.src+'"><source src="'+media.sources[0].url+'" type="video/mp4"></video></figure>');
      }
    });

    if(media.length > 1){ qv_slider(); }

    //variants
    $(variants).each(function(i,variant){

      $('.quick-view-main2 form .qv-select-variant-select').append('<option value="'+ variant.id +'" data-avail="'+ variant.available +'" data-price="'+ variant.price +'" data-cprice="'+variant.compare_at_price+'" data-sku="'+variant.sku+'" data-variant="'+variant.title+'" data-quantity="'+ v[i].quantity + '">'+ variant.title +'</opion>')

      global_variants.push({"name":variant.title.toLowerCase(),"quanity":v[i].quantity});
    });

    let code = JSON.parse($(".quick-view-main2 .quick-view-main-block .qv-pro-options").attr("data-color"));
    console.log(code);
    if(variants.length > 1)
    {
      $(options).each(function(i,option){
        $(".quick-view-main2 .qv-pro-options").append('<div class="qv-pro-variant ' + option.name.toLowerCase() + '" data-option-index="'+ i +'"><div class="pro-attr-block"><h6 class="pro-attr">'+ option.name + '</h6><em style="color:var(--primary);margin:0 10px;">*</em><span class="qv-option1"></span></div><div class="qv-pro-variant-inner"></div></div>');
        if(option.name.toLowerCase() == 'color' || option.name.toLowerCase() == 'colour')
        {
          $(option.values).each(function(j,value){
            let color_default = 0;
				if(code.length  != 0)
                {
                  $(code).each(function(c,cd){
                  	if(value.toLowerCase() == cd.color)
                    {
                    	console.log("Found");
                      $(".quick-view-main2 .qv-pro-options .qv-pro-variant." + option.name.toLowerCase() +" .qv-pro-variant-inner").append('<span class="option" data-option="'+ option.name.toLowerCase() +'" data-value="'+ value.toLowerCase() +'" style="background:'+ cd.code +';"><div class="tooltip1">'+value.toUpperCase() +'</div></span>');
                      color_default = 1;
                    }
                  });
                }
            if(color_default == 0)
            {
              $(".quick-view-main2 .qv-pro-options .qv-pro-variant." + option.name.toLowerCase() +" .qv-pro-variant-inner").append('<span class="option" data-option="'+ option.name.toLowerCase() +'" data-value="'+ value.toLowerCase() +'" style="background-color:'+ value.toLowerCase() +';"><div class="tooltip1">'+value.toUpperCase() +'</div></span>');
            }
          });
        }
        else{
          $(option.values).each(function(j,value){
            $(".quick-view-main2 .qv-pro-options .qv-pro-variant." + option.name.toLowerCase() +" .qv-pro-variant-inner").append('<span class="option" data-option="'+ option.name.toLowerCase() +'" data-value="'+ value.toLowerCase() +'">'+ value +'<div class="tooltip1">'+value.toUpperCase() +'</div></span>');
          });
        }
      });
      $(".quick-view-main2 .qv-pro-options .qv-pro-variant."+product.options[0].name.toLowerCase()+" .qv-pro-variant-inner").find("span").first().trigger("click");
    }
  });


}
//variant1 click function
let option1;
let var_id;
function variant_clicked(this1){
  this1.siblings().removeClass("active");
  let this_var = this1.attr("data-value");
  let this_option = this1.attr("data-option");

  this1.addClass("active");
//   alert(this_var);
  console.log(this_var + " " + this_option);
  let this_index = this1.parents(".qv-pro-variant").attr("data-option-index");
  console.log(this1.parents(".qv-pro-variant").attr("data-option-index"));
  let count = 0;
  let count2 = 0;
  let active;
  let var_id;
  let active_var ="";
  let active_var2 ="";
  let found;
  if(global_product.options[0].name.toLowerCase() == this_option)
  {
    let unavailable = 0;

    active_var += this_var;
    $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span").removeClass("active available");
    this1.addClass("active");
    $(global_product.variants).each(function(i,variant){
      if(variant.available ){


        if(variant.options[0].toLowerCase() == this_var)

        {
          unavailable = 1;
          found = 0;
          console.log(variant);
          $(variant.options).each(function(op,option){
            if(op != 0){

              if(op != variant.options.length - 1)
              {
                if(count == 0)
                {
                  active = option;
                  $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span[data-value="+option.toLowerCase()+"]").addClass("active available");
                  active_var+=" / " + option.toLowerCase();
                }
                else
                {
                  $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span[data-value="+option.toLowerCase()+"]").addClass("available");           	
                }
              }
              else
              {
                if(variant.title.toLowerCase().includes(active_var) == true)
                {
                  if(count2 == 0)
                  {
                    $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span[data-value="+option.toLowerCase()+"]").addClass("active available");
                    var_id = variant.id;
                  }
                  else
                  {
                    $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span[data-value="+option.toLowerCase()+"]").addClass("available");           	
                  }
                  count2 = 1;
                }
              }
            }
          });           
        }
        if(found == 0)
        {
          count = 1;
        }
      }

    });


    console.log(active_var + " " + unavailable);
    if(unavailable == 0)
    {
      let active_var = "";
      $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span").removeClass("active available");
      $(global_product.options).each(function(i,option){
        if(i != 0)
        {
          console.log("option = " + option.name);
          $(".quick-view-main2 .qv-pro-options .qv-pro-variant."+option.name.toLowerCase()+" .qv-pro-variant-inner").find("span").first().addClass("active");
        }
      });
      this1.addClass("active");

      $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span.active").each(function(a,active){
        if(a != $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span.active").length - 1)
        {
          active_var+=$(this).attr("data-value") + " / ";
        }
        else{
          active_var+=$(this).attr("data-value");
        }
        //       active_var+=$(this).attr("data-value") + " / ";
      });
      console.log(active_var);
      $(global_product.variants).each(function(i,variant){
        if(variant.title.toLowerCase().includes(active_var) == true){
          var_id = variant.id;
          console.log(variant.title.toLowerCase() + " " + active_var);
        }
      });
    }

    image_change(this_var);
  }
  else
  {
    let active_var = "";
    let no_variant_avail = 0;
    let no_avail = 0;
    let first_variant_select;

    if(global_product.options[global_product.options.length - 1].name.toLowerCase() != this_option){
      $(".quick-view-main2 .quick-view-main-block .qv-pro-variant."+global_product.options[global_product.options.length - 1].name.toLowerCase()+" .qv-pro-variant-inner span").removeClass("active available");
    }
    $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span.active").each(function(a,active){
      if(a != $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span.active").length - 1)
      {
        active_var+=$(this).attr("data-value") + " / ";
      }
      else{
        active_var+=$(this).attr("data-value");
      }
    });
    console.log(active_var);
    let first = 0;;
    let first1 = 0;


    $(global_product.variants).each(function(i,variant){
      if(variant.available){
        if(variant.title.toLowerCase().includes(active_var) == true )
        {
          no_avail = 1;
          if(first == 0)
          {
            $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span[data-value="+variant.options[variant.options.length - 1].toLowerCase()+"]").addClass("active available");
            first = 1;
            var_id = variant.id;
            console.log(var_id);
          }
          else
          {
            $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span[data-value="+variant.options[variant.options.length - 1].toLowerCase()+"]").addClass("available");
          }
          console.log(variant);
        }
      }
      else{
        if(variant.title.toLowerCase().includes(active_var) == true )
        {
          no_variant_avail++;
          if(no_variant_avail == 1)
          {
            first_variant_select = variant;
          }
        }
      }

    });
    if(no_variant_avail != 0 && no_avail == 0)
    {
      console.log(first_variant_select);
      console.log(no_variant_avail);
      if(no_variant_avail != 1)
      {
        $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span[data-value="+first_variant_select.options[first_variant_select.options.length - 1].toLowerCase()+"]").addClass("active");
      }
      var_id = first_variant_select.id
    }
  }
  assign_product_form_value(var_id);
}

//assign_product_form_value
function assign_product_form_value(var_id){

  let avail;
  let active_var_list2 = [];
  $(".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span.active").each(function(){
    active_var_list2.push($(this).attr("data-value"));
  });
  console.log(var_id);
  $(".quick-view-main2 .quick-view-main-block .qv-select-variant-select").val(var_id);
  console.log($(".quick-view-main2 .quick-view-main-block .qv-select-variant-select option[value="+var_id+"]").attr("data-avail"));
  avail = $(".quick-view-main2 .quick-view-main-block .qv-select-variant-select option[value="+var_id+"]").attr("data-avail");
  if(avail == "true")
  {
    $(".quick-view-main2 .quick-view-main-block .qv-form-control .qv-pro-a2c").removeClass("a2c-qv-disabled");
  }
  else
  {
    $(".quick-view-main2 .quick-view-main-block .qv-form-control .qv-pro-a2c").addClass("a2c-qv-disabled");
  }
  update_datails(var_id);
}

//update_datails
function update_datails(var_id){
  let variant = $(".quick-view-main2 .quick-view-main-block .qv-select-variant-select option[value="+var_id+"]");
  console.log("Details");
  console.log(variant.attr("data-variant"));
  let sku = variant.attr("data-sku");
  if(sku == "")
  {
    sku = "-";
  }
  console.log(sku);
  let qty = variant.attr("data-quantity");
  let price = variant.attr("data-price");
  variant_price = price;
  console.log(window.money_format);
  let q = $(".quick-view-main2 .qv-q-selector .qv-q").val(); 
  console.log(q);
  console.log(Shopify.formatMoney(price, ""));
  $(".quick-view-main2 .quick-view-main-block .product-info-table .product-sku").text(sku);
  $(".quick-view-main2 .quick-view-main-block .product-info-table .product-quantity").text(qty + " Available");
  $(".quick-view-main2 .quick-view-main-block .qv-pro-price").text(Shopify.formatMoney(price, window.money_format));
  $(".quick-view-main .quick-view-main-block .qv-subtotal").text(Shopify.formatMoney(price*q, window.money_format));
  
}

// image_change
function image_change(this_var1){
  let slideno = 0;;
  let hasimage = 0;
  $(global_product.variants).each(function(v,variant){
    if(variant.options[0].toLowerCase() == this_var1 && variant.featured_image != null)
    {
      console.log(variant);
      $(".quick-view-main2 .product-media-single .product-media-slider-single figure").each(function(i,img){
        if($(this).children("img").attr("src") == variant.featured_image.src)
        {
          console.log(i);
          slideno = i;
        }
      });
      return false;
    }
  });
  console.log(slideno);
  $('.quick-view-main2 .quick-view-main-block .product-media-slider-single').slick('slickGoTo', slideno);
}

function quickview_empty(){
  
  $(".quick-view-main2 .pro-title").empty();
  $(".quick-view-main2 .pro-title").attr("href","");
  $(".quick-view-main2 .pro-desc").empty();
  
  $('.quick-view-main2 .product-media-single .product-media-slider-single').slick('unslick');
  $('.quick-view-main2 .product-media-single .product-media-slider-single').empty();
  
  $('.quick-view-main2 .product-media-multi .product-media-slider-multi').slick('unslick');
  $('.quick-view-main2 .product-media-multi .product-media-slider-multi').empty();
  
  $(".quick-view-main2 .quick-view-main-block .product-info-table .product-sku").empty();
  $(".quick-view-main2 .quick-view-main-block .product-info-table .product-quantity").empty();
  $(".quick-view-main2 .quick-view-main-block .qv-pro-price").empty();
  let q = $(".quick-view-main2 .qv-q-selector .qv-q").val(1); 
  $(".quick-view-main .quick-view-main-block .qv-subtotal").empty();

  $('.quick-view-main2 form .qv-select-variant-select').empty();
  $(".quick-view-main2 .qv-pro-options").empty();
}

//ajax add to cart quick-view-main2
function add_to_cart_ajax(form_id) {

  alert($('#'+form_id).serialize());
  $.ajax({
    type: 'POST', 
    url: '/cart/add.js',
    dataType: 'json', 
    data: $('#'+form_id).serialize(),
    success: addToCartOk,
    error: addToCartFail
  });
}

function addToCartOk(product) { 
  alert("true");
} 

function addToCartFail(obj, status) { 
  alert("false");
}

// add to cart click quick-view
$(".qv-pro-a2c").click(function(){
  add_to_cart_ajax($(".quick-view-main2 .qv-product-form").attr("id"));

}); 

// variant1 click
$(document).on("click",".quick-view-main2 .quick-view-main-block .qv-pro-variant .qv-pro-variant-inner span",function(){

  variant_clicked($(this));
});


//quick view2

$(document).on('click','.pro-quick-view .quick-btn',function(ev){

  $("body .quick-view-main2").css("display","flex").addClass("quick-view-active");
  $("body").css("overflow","hidden");
  let handle = $(this).data("handle");
  let v = $(this).data("variants");

  quick_view(handle,v);

});

//quantity selector
$(".quick-view-main2 .quick-view-main-block .qv-q-selector .qv-minus").click(function(e){

  e.preventDefault();
  if($(".quick-view-main2 .quick-view-main-block .qv-q-selector .qv-q").val() != 1)
  {
    $(".quick-view-main2 .quick-view-main-block .qv-q-selector .qv-q").val(parseInt($(".quick-view-main2 .quick-view-main-block .qv-q-selector .qv-q").val()) - 1);
  }
  let q = $(".quick-view-main2 .qv-q-selector .qv-q").val(); 
  console.log(q);
  $(".quick-view-main .quick-view-main-block .qv-subtotal").text(Shopify.formatMoney(variant_price*q, window.money_format));
});
$(".quick-view-main2 .quick-view-main-block .qv-q-selector .qv-plus").click(function(e){

  e.preventDefault();
  $(".quick-view-main2 .quick-view-main-block .qv-q-selector .qv-q").val(parseInt($(".quick-view-main2 .quick-view-main-block .qv-q-selector .qv-q").val()) + 1);
  let q = $(".quick-view-main2 .qv-q-selector .qv-q").val(); 
  console.log(q);
  $(".quick-view-main .quick-view-main-block .qv-subtotal").text(Shopify.formatMoney(variant_price*q, window.money_format));
});


//quick view2 close
$("body .quick-view-main2 .qv-btn-close").click(function(e){
  e.stopPropagation();
  $("body .quick-view-main2").css("display","none").removeClass("quick-view-active");
  $("body").css("overflow","auto");
  quickview_empty();
});

$("body .quick-view-main2 .quick-view-main-wrapper").click(function(e){
  e.stopPropagation();
  $("body .quick-view-main2").css("display","none").removeClass("quick-view-active");
  $("body").css("overflow","auto");
  quickview_empty();
});
