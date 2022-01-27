$( document ).ready(function() {
    //login 
    $( "#FormLogin" ).submit(function() {
       
        
        $("#validationErrors").hide();
        $("#validationSuccess").hide();
        
        event.preventDefault();
        loginUser();
        $( "section-heading-content" ).scrollTop( 0 );
        event.preventDefault();
    });
    
async function loginUser(){
        console.log($("#email").val());
        console.log($("#password").val());
        
         let result;
         try{
                $.ajax({
                url : "/users/login/",
                dataType: "json",
                type : "POST",
                data: {
                    email :  $("#email").val(),
                    password : $("#password").val(),
                },
        });
        console.log(result);
                
              
        } catch (error) {
                console.log("error:"+error.message);
            //    try{
            //      var errors = error.responseJSON.errors;
            //      if (errors){
            //        let errorMsgs='';
            //        if(errors!=null && errors!=""){
            //          $("#validationSuccess").hide();
            //            $.each(errors, function (index, value) {
            //                //console.log(value.msg);
            //                errorMsgs+="<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;"+value.msg+"</div>";
            //            });
            //            if(errorMsgs!=""){
            //                $("#validationErrors").html(errorMsgs);
            //                $("#validationErrors").fadeIn();
            //                $("#validationErrors").focus();
            //            }
            //        }
            //      }
            //    }catch(err) {
            //      console.log("catch: "+err);
            //          $("#validationSuccess").hide();
            //          $('#validationErrors').html("<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;Error Logging in, try again or contact us.</div>");
            //          $('#validationErrors').fadeIn();
            //    }
               
           }
           //spin wheel function (hide)
           
         }  
    $( "#button-reset-email" ).click(function() {
        $("#validationErrors").hide(); 
        $("#validationSuccess").hide();
        event.preventDefault();
        console.log('reset it');
        $.ajax({
                dataType: "json",
                type : "POST",
                  data: {
                    email :  $("#email").val(),
                    password : $("#password").val()},
                    url : "/users/login/sendReset",
                    success : function(customer) {
                       
                        $("#validationSuccess").html("<div class='alert alert-success text-center'><i class='fas fa-check'></i>&nbsp;Email sent Succesfully. You will receive an email to reset your password.</div>");
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
                        
                        
                        $('#validationErrors').html("<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;Email not found, try another.</div>");
                        $('#validationErrors').fadeIn();
                       
                    }
                }
         });
                
           
    });
    
    
    //reset your password
    $( "#resetPassword" ).click(function() {
        const _id = $.urlParam('id');
        
        $("#validationErrors").hide();
        $("#validationSuccess").hide();
        
        event.preventDefault();
        
        const pwd = $("#password").val();
        const pwdConfirm = $("#confirmpassword").val();
        if(pwd!=pwdConfirm){
    
            $('#validationSuccess').hide();
            $('#validationErrors').html("<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;Passwords must be equal.</div>");
            $('#validationErrors').fadeIn();
        }
       
        $.ajax({
            dataType: "json",
            type : "POST",
              data: {
                _id: _id,
                password : $("#password").val(),
                confirmpassword : $("#confirmpassword").val()},
                url : "/users/login/resetPassword/"+ _id,
                success : function(customer) {
                    
                    $("#validationSuccess").html("<div class='alert alert-success text-center'><i class='fas fa-check'></i>&nbsp;Password updated successfully.<a href=\"/users/login/\">Login</a></div>");
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
    
    });
    
    
    });
    
    