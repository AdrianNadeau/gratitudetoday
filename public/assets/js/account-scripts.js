$( document ).ready(function() {
    //reset your password
    
    $( "#resetPasswordProfile" ).submit(function() {
        $("#validationErrors").hide();
        $("#validationSuccess").hide();
        const pwd = $("#password").val();
        const pwdConfirm = $("#confirmpassword").val();
        if(pwd!=pwdConfirm || !pwd || !pwdConfirm){
            
            $('#validationSuccess').hide();
            $('#validationErrors').html("<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;Passwords must be entered and be equal.</div>");
            $('#validationErrors').fadeIn();
            event.preventDefault();
        }
        
        else{
        $.ajax({
            dataType: "json",
            type : "POST",
              data: {
                
                password : $("#password").val(),
                confirmpassword : $("#confirmpassword").val()},
                url : "/users/account/resetPassword/",
                success : function(customer) {
                    
                    $("#validationSuccess").html("<div class='alert alert-success text-center'><i class='fas fa-check'></i>&nbsp;Password updated successfully.<a href=\"/users/account/account\">Back to Account</a></div>");
                    $("#validationSuccess").fadeIn();
    
                },
                error : function(error) {
                    
                var errors = error.responseJSON.errors;
                let errorMsgs='';
                if(errors!=null && errors!=""){
                    $.each(errors, function (index, value) {
                        //console.log(value.msg);
                        errorMsgs+="<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;"+value.msg+"</div>";
                    });
                    if(errorMsgs!=""){
                       
                        $("#validationErrors").html(errorMsgs);
                        $("#validationErrors").fadeIn();
                        $("#validationErrors").focus();//$("#div2").focus();
                    }
                }
                else {
                    if(error.status=='430'){
    
                        $('#validationErrors').html("<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;Passwords must match.</div>")
                        $('#validationErrors').fadeIn();
                        $('#email').val('');
                        $('#email').focus();
    
                    }
                    else{
                        $('#validationErrors').html("<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;Unable to reset password, please try again.</div>");
                        $('#validationErrors').fadeIn();
                    }
    
                }
            }
        });
        }
    });
    $( "#btn-next" ).submit(function( event ) {
        const _id=$.urlParam('id');
        
        event.preventDefault();
           
            $.ajax({
              dataType: "json",
              type : "POST",
              data: {
                     
                     journey_id :  $("#journeyId").val(),
                    
                     },
              
              url : "/users/account/updateJourney",
              success : function(customer) {
                $("#validationSuccess").html("<div class='alert alert-success text-center'><i class='fas fa-check'></i>&nbsp;Registered Succesfully. You will receive an email to activate your account.</div>");
                 $("#validationSuccess").fadeIn();
                 event.preventDefault();
              },
              error : function(error) {
                console.log('errors:'+error.message);
                 var errors = error.responseJSON.errors;
                 let errorMsgs='';
                 $.each(errors, function (index, value) {
                     //console.log(value.msg);
                     errorMsgs+="<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;"+value.msg+"</div>";
                    });
                     
                     $("#validationErrors").html(errorMsgs);
                     $("#validationErrors").fadeIn();
                     $("#validationErrors").focus();
                 if(error.status=='410'){
                    
                     $('#validationErrors').html("<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;Email already exists, try another one.</div>")
                     $('#validationErrors').fadeIn();
                     $('#email').val('');
                    $('#email').focus();
                    
                 }
                 $( "section-heading-content" ).scrollTop( 0 );
                 event.preventDefault();
                
                 
              
              }
            });  
             
            
          
          
           
      });


      $( "#FormUpdateAccount" ).submit(function() {
       
       
        $("#validationErrors").hide();
        $("#validationSuccess").hide();
        
        event.preventDefault();
         $.ajax({ 
            url: '/users/account/updateAccount',
            type : "POST",
           
                data: {
                     
                    id: $("#id").val(),
                    displayname: $("#displayname").val(),
                    // firstname: $("#firstname").val(),
                    // lastname: $("#lastname").val(),
                    location :  $("#location").val(),
                    bio :  $("#bio").val(),
                    url: $("#url").val(),
                    avatar: $("#avatar").val(),
                     
                    },
             
            
             success : function(user) {
                 
                 $("#validationSuccess").html("<div class='alert alert-success text-center'><i class='fas fa-check'></i>&nbsp;Account Updated Successfully.</div>");
                $("#validationSuccess").fadeIn();
                    //load values
            },
             error : function(error) {
                alert("error");
                  if(error.status=='405'){
                    window.location.href="/sessionexpired";
                  }else
                  {
                    $("#validationErrors").html("<div class=\"alert alert-danger text-center' role='alert'><i class='fas fa-times-circle'></i>&nbsp;Error creating account, please try again.");
                    $("#validationErrors").fadeIn();
                  }
                
              }     
        });
    });
    
});
    
    