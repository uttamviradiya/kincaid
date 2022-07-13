$(document).ready(function(){
  $(".product-card .pro-img-block .pro-a2c1").click(function(){


    if(!$(this).parents(".pro-img-block").siblings(".pro-info-block").children(".pro-variant").children("label").hasClass("active"))
    {
      $(this).parents(".pro-img-block").siblings(".pro-info-block").children(".pro-variant").children("label").first().trigger("click");
    }
    $(".product-card .pro-img-block .pro-a2c1").show();
    $(this).hide();
    $(".product-card .pro-variant-block").removeClass("show");
    $(this).parent().children(".pro-variant-block").addClass("show");


    //     $(this).parents(".pro-img-block").siblings(".pro-info-block").children(".pro-variant").children("label").first().trigger("click");
  });

  
  //color click event
  $(".product-card .pro-info-block .pro-variant label").click(function(){
    
    $(".product-card .pro-info-block .pro-variant label").removeClass("active");
    $(".product-card .pro-img-block .pro-variant-block .variant-selector label").removeClass("selected");
    $(".product-card .product-form .btn--purchase").removeClass("a2c-disabled");
    $(this).addClass("active");
    let current = $(this).data("value");
    
    
    console.log(current);
    $(".product-card").removeClass("active-card");

    $(this).parents(".product-card").addClass("active-card");
    let temp = 0;
    let selector = $(".product-card.active-card .pro-img-block .pro-variant-block .variant-selector");
    console.log(selector.length);
    
    $(".product-card.active-card .pro-img-block .pro-variant-block .variant-selector").each(function(){
      console.log($(this).data("option").toLowerCase());

      if($(this).data("option").toLowerCase() == "colour" || $(this).data("option").toLowerCase() == "color")
      {
        console.log($(this).data("option"));
        $(this).children(".variant-list").children("input").each(function(){
          console.log($(this).val());
          if(current == $(this).val()){
			$(this).prop("checked", true);
            $(this).prev().addClass("selected");
          }
        });
      }
      else
      {
//         if($(this).data("index") != selector.length - 1)
//         {
          temp = 0;
//         }
        console.log($(this).data("option"));
        $(this).children(".variant-list").children("input").each(function(){
          console.log($(this).val());
          let id = $(this).attr("id");
          if(temp == 0)
          {
            console.log(id);
            $(this).prop("checked", true);
            $(this).prev().addClass("selected");
            temp = 1;
          }
        });
      }
    });
    
    let active_var = "";
    $(".product-card.active-card .pro-img-block .pro-variant-block .variant-selector input:checked").each(function(i,radio){
      if( i != $(".product-card.active-card .pro-img-block .pro-variant-block .variant-selector input:checked").length -1)
      {
    	active_var += $(this).val() + " / ";
      }
      else
      {
      	active_var += $(this).val();
      }
      console.log(active_var);
    });
    
//     a2c-disabled
// select box options loop     
    let text;
    let non_avail = 0;
    $(".product-card.active-card form .select-variant-select option").each(function(i,option){
    	
      text = $(this).text();
      console.log(text.trim());
      if(text.trim().includes(active_var) == true)
      {
        let var_id = $(this).val();
        $(".product-card.active-card form .select-variant-select").val(var_id);
        if($(this).attr("data-avail") == "true")
        {
          console.log($(this).val());
          console.log($(this).text());
          non_avail = 1;
        }

      }
    });
    if(non_avail == 0)
    {
   		$(".product-card.active-card .product-form .btn--purchase").addClass("a2c-disabled");
    }
    else{
    	$(".product-card.active-card .product-form .btn--purchase").removeClass("a2c-disabled");
    }
    
    
  });
  
  //variant click
  $("body").on('change','.product-card.active-card .pro-img-block .pro-variant-block .variant-selector input[type=radio]',function() {
    
    $(this).siblings().removeClass("selected");

    $(this).prev().addClass("selected");
    $(".product-card .product-form .btn--purchase").removeClass("a2c-disabled");
    
    let current = $(this).data("value");
    
    
    console.log(current);
    $(".product-card").removeClass("active-card");

    $(this).parents(".product-card").addClass("active-card");
    let temp = 0;
    let selector = $(".product-card.active-card .pro-img-block .pro-variant-block .variant-selector");
    console.log(selector.length);
    
    
    let active_var = "";
    $(".product-card.active-card .pro-img-block .pro-variant-block .variant-selector input:checked").each(function(i,radio){
      if( i != $(".product-card.active-card .pro-img-block .pro-variant-block .variant-selector input:checked").length -1)
      {
    	active_var += $(this).val() + " / ";
      }
      else
      {
      	active_var += $(this).val();
      }
      console.log(active_var);
    });
    
//     a2c-disabled
// select box options loop     
    let text;
    let non_avail = 0;
    $(".product-card.active-card form .select-variant-select option").each(function(i,option){
    	
      text = $(this).text();
      console.log(text.trim());
      if(text.trim().includes(active_var) == true)
      {
        let var_id = $(this).val();
        $(".product-card.active-card form .select-variant-select").val(var_id);
        if($(this).attr("data-avail") == "true")
        {
          console.log($(this).val());
          console.log($(this).text());
          non_avail = 1;
        }

      }
    });
    if(non_avail == 0)
    {
   		$(".product-card.active-card .product-form .btn--purchase").addClass("a2c-disabled");
    }
    else{
    	$(".product-card.active-card .product-form .btn--purchase").removeClass("a2c-disabled");
    }
    
    
    
  });
  
  //close variant selection
  $(".product-card .pro-variant-block .close").click(function(){
    $(this).parents(".pro-variant-block").removeClass("show");
    $(this).parents("figcaption").children(".pro-a2c").show();
  });
  
});