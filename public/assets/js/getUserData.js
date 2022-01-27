function getData(){
  
    $.ajax({ 
        
        url: '/users/account/userInfo',
        type : "GET",
        data: {},
         success : function(user) {
                
                //load values
                $("#id").val(user._id);
                $("#email").val(user.email);
                $("#email").html(user.email);
                $("#displayname").html(user.displayName);
                $("#displayname").val(user.displayName);
                
                $("#location").val(user.location);
                $("#location").html(user.location);
                $("#bio").val(user.bio);
                $("#bio").html(user.bio);
                $("#avatar").val(user.avatar);
                $("#avatar").html(user.avatar);
                $("#profile-avatar").attr("src",user.avatar);
                
                
                $("#url").val(user.url);
                $("#url").html(user.url);
                $("#displayname").html(user.displayName);
                $("#profile-name").html(user.displayName);
                var dateFormat = user.createDate;
                
                $("#reg-date").html(dateFormat);
                
        },
         error : function(error) {
             
              if(error.status=='405'){
                window.location.href="/sessionexpired";
              }else
              {
                $("#error-msg").fadeIn();
              }
    
          }     
    });
    
} 