(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('#modal_email').modal();     
    
    $(".jump").on("click", function (event)
     {
        event.preventDefault();
        var i  = $(this).attr('href');
        t = $(i).offset().top;
        $('body,html').animate({scrollTop: t}, 700, 'easeInOutSine');
    });
      
      
      
      
      $('.card-panel').click(function ()
      {
        if($(this).hasClass('active'))
        {
            $('#'+$(this).attr('target')+'_field').hide();
            $(this).removeClass('active');
            $('#main_feature').remove();
            $('#dynamic_header').hide().removeClass('animated zoomIn');
        $('#'+$(this).attr('target')+'_field').children().children('input[type="checkbox"]').each(function(){
               $(this).prop( "checked", false );
                var id=$(this).next('label').attr('for');
                id = id.split("_");
                id=id[1];

                $('#feature_'+id).addClass('animated flipOutX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function ()
               {
                   $('#feature_'+id).remove();
                   calculate();
                });

            });

        }
        else
        {

          var unclicked_id=$('.active').attr('target');
          $('.card-panel').removeClass('active');

          $(this).addClass('active');

            //анимация заголовка
         $('#dynamic_header').show().addClass('animated fadeIn');

          
          $('.dynamic_checkboxes').hide();

            //анимация блока
          $('#'+$(this).attr('target')+'_field').show().addClass('animated fadeIn');
          
          $('#main_feature').remove();
          $('#summary').prepend("<div class='col s12' id='main_feature'><h6 class='feature'>"+$(this).children('span').html()+"<span class='right'><span class='amount'>"+$(this).data('price')+"</span> грн.</span></h6></div>");



         $('#'+unclicked_id+'_field').children().children('input[type="checkbox"]').each(function(){
               $(this).prop( "checked", false );
                var id=$(this).next('label').attr('for');
                id = id.split("_");
                id=id[1];

                $('#feature_'+id).addClass('animated flipOutX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function ()
               {
                   $('#feature_'+id).remove();
                   calculate();
                });

            });


        }

          calculate();
        
      });
      
    
      
      $('input[type="checkbox"]').click(function()
      {        
            var item_id=$(this).attr('id');
            item_id = item_id.split("_");
            item_id=item_id[1];
            var close_button="<i class='fa fa-times black-text' aria-hidden='true' style='padding-left:1rem;cursor:pointer;' id='remove_"+item_id+"'></i>";
          
          if($(this).prop('checked'))
          {
               $('#optional_features').prepend("<h6 id='feature_"+item_id+"' class='feature'>"+$(this).next('label').text()+"<span class='right'><span class='amount'>"+$(this).data('price')+"</span> грн."+close_button+"</span></h6>");
               $('#feature_'+item_id).addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () 
               {
                    $('#feature_'+item_id).removeClass('animated flipInX');
                   calculate();
               });
          }
          else
          {
                $('#feature_'+item_id).addClass('animated flipOutX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () 
               {
                   $('#feature_'+item_id).remove(); 
                    calculate();
                });
          }
        
        
      
      });
    
      $('#optional_features').on('click', '.fa-times', function()
	   {
         var item_id=$(this).attr('id');
         item_id = item_id.split("_");
         item_id=item_id[1];
        $(this).parent().parent('h6').addClass('animated flipOutX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () 
               {
                   $('#feature_'+item_id).remove(); 
                    $('#f_'+item_id).prop( "checked", false );
                    calculate();
                });
       });
      
      
      
      
function calculate() 
{
        var amount=0;
    
          $('.amount').each(function()
          {
              amount=amount+parseInt($(this).html());
          });
//    $('#amount').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function ()
//    {
//        $('#amount').html(amount).removeClass('animated fadeOut').addClass('animated fadeIn');
        $('#amount').html(amount);
    //.addClass('animated fadeIn');
//    });

}
      
      $('#send_order').click(function()
      {
         var data={}
         
         var amounts=[];
          
         $('.amount').each(function()
          {
             amounts.push(parseInt($(this).html()));
         });
         
         var features=[];
          
         $('.feature').each(function()
          {
             features.push($(this).clone().children().remove().end().text());
         });
        
          
         data['features']=features; 
         data['amounts']=amounts;
          
         data['summ']=$('#amount').text();
         data['currency']=$('#currency').text();
         data['contact']=$('#email').val();
          
          
          console.log(data);
          Materialize.toast('Отправка заказа...',60000);

          $.post( "/mail.php", { jsonData: JSON.stringify(data)})
		.done(function( returned_data ) 
		{	
			$('.toast').remove(); 
              
             console.log(returned_data);
              
			if(returned_data.result=='sended') 
			{	
                Materialize.toast('Спасибо за заказ, мы свяжемся с вами в ближайшее время', 6000);
			}
            if(returned_data.result=='limit') 
			{	
                Materialize.toast('Закза был отослан ранее', 4000);
			}
              if(returned_data.result=='empty') 
			{
             	Materialize.toast('Что то определенно пошло не так... и мы уже ковыряемся', 4000);   
            }
		})
		.fail(function() 
		{
			Materialize.toast('Ошибка отправки', 4000);
            console.log(returned_data);
		})
      });
      
      function GetURLParameter(sParam)
      {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
      }

      
      var main_val = GetURLParameter('p');
      var option_val = GetURLParameter('i');
      
      
      $('#'+main_val+'_button').click();
      $('#'+option_val).click();
 
  }); // end of document ready
})(jQuery); // end of jQuery name space
