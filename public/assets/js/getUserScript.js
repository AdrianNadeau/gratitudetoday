function getUserInfo(){
   
  const _id=$.urlParam('id');
  
    $.ajax({
          url: '/users/'+_id,
          type: "GET",
          dataType: "json",
          data: {id: _id},
            success: function(data, textStatus, jqXHR) {
                  
                  $("#name").html(data.firstname+" "+data.lastname);
                
                  $("#website").html(data.website);
                  $("#id").html(data._id); 
                  $("#uid").html(data._id);               
                  // input values
                  $("#id").val(data._id);
                  $("#id-hidden").val(data._id);
                  $("#avatar").attr("src","../"+data.avatar);
                  $("#bio").val(data.bio);
                  $("#url").val(data.url);
                  $("#firstname").val(data.firstname);
                  $("#lastname").val(data.lastname);
                  $("#email").val(data.email);
                  $("#email").html(data.email);
                  $("#visit-profile").attr("href","/profile/?id="+_id);
                  $("#location").html(data.location);
                  $("#location").val(data.location);
                  $("#info-link").attr("href","/info/?id="+_id);
                
                      $("id").val(data._id);
                      
                   
                      
                      $("#name").html(data.firstname+" "+data.lastname );
                      $("#profile-name").html(data.firstname+" "+data.lastname );
                      console.log(data.firstname+" "+data.lastname )
                      
                      
                      $("#email").html(data.email);
                      $("#account-link").attr("href","/account/?id="+_id);
                      $("#support-link").attr("href","/support/?id="+_id);
                      $("#journal-link").attr("href","/journal/?id="+_id);
                      $("#password-link").attr("href","/resetProfileForm/?id="+_id);
                      
                      
                      $("#url").html(data.url);
                      $("#bio").html(data.bio);
                      $("#location").html(data.location);
                      console.log("ava:"+data.avatar);
                      if(data.avatar==null){
                         
                            $("#profile-avatar").attr("src", '/profile/assets/img/avatars/gratitudetoday-avatar.png');
                      }
                      else{
                            $("#profile-avatar").attr("src", data.avatar);
                         
                      }
                      
                      $("#info-email").val(data.email);
                      $("#info-firstname").val(data.firstname);
                      $("#info-lastname").val(data.lastname);
                      $("#info-location").val(data.location);
                      $("#info-bio").val(data.bio);
                      $("#info-url").val(data.url);
                      
                      //jquery datepicker plugin
                      var dateFormat = data.createDate;
                      var dateFormat = $.datepicker.formatDate('MM dd, yy', new Date(dateFormat));
                      //alert(dateFormat);
                      $("#reg-date").html(dateFormat);
                      //check here for welcome
                      $("#postedBy").val(data.firstname+" "+data.lastname);
                      
                  $("#info-email").val(data.email);
                  $("#info-firstname").val(data.firstname);
                  $("#info-lastname").val(data.lastname);
                  $("#info-location").val(data.location);
                  $("#info-bio").val(data.bio);
                  $("#info-url").val(data.url);
                      
                  //jquery datepicker plugin
                  var dateFormat = data.createDate;
                  var dateFormat = $.datepicker.formatDate('MM dd, yy', new Date(dateFormat));
                  //alert(dateFormat);
                  $("#reg-date").html(dateFormat);
                  //check here for welcome
                  $("#postedBy").val(data.firstname+" "+data.lastname);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                   
                    
            }
            
        }); 
        $("#btn_skip").click(function() {
            event.preventDefault();
            window.location.assign("/profile/?id="+ _id);
            
        });
        $("#btn-cancel").click(function() {
          event.preventDefault();
          window.location.assign("/account/?id="+ _id);
          
        });
}
        
