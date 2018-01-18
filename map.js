$("path").hover(function(e) {
    $('#info-tip').css('display','block');
    $('#info-tip').html($(this).data('info'));
  });
  
  $("path").mouseleave(function(e) {
    $('#info-tip').css('display','none');
  });
  
  $(document).mousemove(function(e) {
    $('#info-tip').css('top',e.pageY-$('#info-tip').height()-30);
    $('#info-tip').css('left',e.pageX-($('#info-tip').width())/2);
  }).mouseover();
  
  