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
  }); // end of document ready
})(jQuery); // end of jQuery name space
