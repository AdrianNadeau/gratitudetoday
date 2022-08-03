
$( "#no-thanks-btn" ).click(function() {
   
    window.location.assign("/");
});

$( "#btn_skip" ).click(function() {
   
  window.location.assign("/users/account/profile");
});

var bioMaxLength = 200; 
$('#bio').keyup(function() {
  var length = $(this).val().length;
  var length = bioMaxLength-length;
  $('#chars').text(length);
});

$('#postMsg').keyup(function() {
  console.log('key up');
  var length = $(this).val().length;
  var length = bioMaxLength-length;
  $('#chars').text(length);
});



 
     
