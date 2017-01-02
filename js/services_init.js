(function($){
  $(function(){

    $('.button-collapse').sideNav();
  
    $(".jump").on("click", function (event)
     {
        event.preventDefault();
        var i  = $(this).attr('href');
        t = $(i).offset().top;
        $('body,html').animate({scrollTop: t}, 2000, 'easeOutExpo');
    });
      
      
      
      $('.card-panel').click(function ()
      {
        $('.card-panel').removeClass('active');
          $(this).addClass('active');
          $(this).children("span").addClass('blue-text');
          
          $('.dynamic_checkboxes').hide();
          $('#'+$(this).attr('target')+'_field').show().addClass('animated zoomIn');
          
          $('#main_feature').remove();
          $('#summary').prepend("<div class='col s12' id='main_feature'><h4>"+$(this).children('span').html()+"<span class='right'><span class='amount'>"+$(this).data('price')+"</span> грн.</span></h4></div>");
          calculate();
        
      });
      
    
      
      $('input[type="checkbox"]').click(function()
      {        
            var item_id=$(this).attr('id');
            item_id = item_id.split("_");
            item_id=item_id[1];
            var close_button="<i class='material-icons tiny' style='padding-left:1rem;cursor:pointer;' id='remove_"+item_id+"'>close</i>";
          
          if($(this).prop('checked'))
          {
               $('#optional_features').prepend("<h6 id='feature_"+item_id+"'>"+$(this).next('label').text()+"<span class='right'><span class='amount'>"+$(this).data('price')+"</span> грн."+close_button+"</span></h6>");
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
    
      $('#optional_features').on('click', '.material-icons', function()
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
    $('#amount').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () 
    {
        $('#amount').html(amount).removeClass('animated fadeOut').addClass('animated fadeIn');
        //$('#amount').html(amount).addClass('animated fadeIn');
    });

}
      
      $('#send_order').click(function()
      {
          Materialize.toast('Отправка заказа...',60000);
          $.post( "mail.php", { data:'data'})
		.done(function( returned_data ) 
		{	
			$('.toast').remove(); 
			if(returned_data.result=='sended') 
			{	
                Materialize.toast('Спасибо за заказ', 4000);
			}
            if(returned_data.result=='limit') 
			{	
                Materialize.toast('Закза был отослан ранее', 4000);
			}
			console.log(returned_data);
		})
		.fail(function() 
		{
			Materialize.toast('Ошибка отправки', 4000);
		})
      });
      
  }); // end of document ready
})(jQuery); // end of jQuery name space
