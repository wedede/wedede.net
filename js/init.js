(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('#callback').modal();    

       $('.collapse').on('click',function(e){
  e.preventDefault();
  $(this).toggleClass('active');
});

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
        
      });
      
      
    $('#send_callback').click(function()
      {
        console.log('ok');
        if($('#callback_email').hasClass('valid') || $('#callback_phone').hasClass('valid')) 
        {
            //create object
            var data={}
            
            data['callback_email']=$('#callback_email').val();
            data['callback_phone']=$('#callback_phone').val();
            
            console.log(data);
            
            Materialize.toast('Отправка данных...',60000);

          $.post( "/callback.php", { jsonData: JSON.stringify(data)})
		  .done(function( returned_data ) 
		  {	
			$('.toast').remove(); 
            $('#callback').modal('close');
              
             console.log(returned_data);

			if(returned_data.result=='sended') 
			{	
                Materialize.toast('Спасибо за контакт, мы свяжемся с вами в ближайшее время', 6000);
			}
            if(returned_data.result=='limit') 
			{	
                Materialize.toast('Благоарим вас, ваши данные были отосланы ранее', 4000);
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
      }
        else 
        {
            Materialize.toast('Проверьте пожалуйста введенные данные', 4000);
        }
       
      });
  }); // end of document ready
})(jQuery); // end of jQuery name space
