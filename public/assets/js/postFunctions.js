$( document ).ready(function() {
  
  loadPosts();
    
    $( "#postMsgButton" ).click(function() {
     
        $("#onboardflag").hide();
        $("#validationErrors").hide();
        $("#validationSuccess").hide();
        var radioValue = $("input[name='optradio']:checked").val();
       
        // var checkboxes = document.getElementsByName("publicYn");
        //var checkboxes = $("input[name='publicYn']:checked").val();
        var checkboxes = document.getElementsByClassName("publicYn");
        let checkboxValue = false;
        if (checkboxes[0].type === "checkbox" && checkboxes[0].checked) {
            checkboxValue = true;
        }
           
        event.preventDefault();
        $.ajax({ 
            url: '/posts/',
            type : "POST",
           
                data: {
                    postMsg: $("#postMsg").val(),
                    id: $("#id").val(),
                    happiness: radioValue,
                    public: checkboxValue,
                    
                     
                },
                success : function(post) {
               
                  $("#validationSuccess").hide();
                  $("#validationErrors").hide();
                  $("#validationSuccess").html("<div class='alert alert-success text-center'><i class='fas fa-check'></i>&nbsp;Way to go! Post submitted successfully!!! &nbsp;<a href='/users/account/myposts/'>Click here to check your posts.</a></div>");
                  // loadPosts();
                  $("#validationSuccess").fadeIn();
                  $("#postMsg").val('');
                  $("#postMsg").focus();
                  $("#chars").html('200');
              }, 
              error : function(error) {
                  if(error.status=='405'){
                    window.location.href="/sessionexpired";
                  }else
                  {
                    
                    $("#validationSuccess").hide();
                    $("#validationErrors").hide();
                    $("#validationErrors").html("<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;"+error+"</div>");
                    $("#validationErrors").fadeIn();
                   }
               }     
            });
    });
});
$( "#updatePostButton" ).click(function() {
    
  
   $("#validationErrors").hide();
   $("#validationSuccess").hide();
   var radioValue = $("input[name='optradio']:checked").val();
  
   // var checkboxes = document.getElementsByName("publicYn");
   //var checkboxes = $("input[name='publicYn']:checked").val();
   var checkboxes = document.getElementsByClassName("publicYn");
   let checkboxValue = false;
   if (checkboxes[0].type === "checkbox" && checkboxes[0].checked) {
       checkboxValue = true;
   }
   const postid=$.urlParam('id');
   
   event.preventDefault();
   $.ajax({ 
       url: '/posts/editPost',
       type : "POST",
        
           data: {
              postid: postid,
                postMsg: $("#postMsg").val(),
                happiness: radioValue,
                public: checkboxValue,
           },
           success : function(post) {
           
             $("#validationSuccess").hide();
             $("#validationErrors").hide();
             $("#validationSuccess").html("<div class='alert alert-success text-center'><i class='fas fa-check'></i>&nbsp;Way to go! Post updated successfully!!! &nbsp;<a href='/users/account/myposts/'>Click here to check your posts.</a></div>");
             // loadPosts();
             $("#validationSuccess").fadeIn();
             $("#postMsg").val('');
             $("#postMsg").focus();
             $("#chars").html('200');
         }, 
         error : function(error) {
             if(error.status=='405'){
               window.location.href="/sessionexpired";
             }else
             {
               
               $("#validationSuccess").hide();
               $("#validationErrors").hide();
               $("#validationErrors").html("<div class='alert alert-danger text-center'><i class='fas fa-times-circle'></i>&nbsp;"+error+"</div>");
               $("#validationErrors").fadeIn();
              }
          }     
       });
});




function loadPosts() {
  
    $( document ).ready(function() {
      let overallAverage;
        $.ajax({
            url: '/posts/userposts',
            type: "GET",
            dataType: "json",
            data: {},
            /**
            * A function to be called if the request succeeds.
            */
          
            success: function(data, textStatus, jqXHR) {
              
                $(".alert-post-danger").hide();
                let recentPostsHTML="";
                let avgHappiness=0;
                let publicValue='No';
               
                $.each( data, function( key, value ) {
                    
                        if(this.user){
                            
                            switch(value.public){
                              case true:
                                publicValue = "Yes";
                                 break;
                              case false:
                                publicValue = "No";
                                break;
                            }

                            var happy;
                            switch (value.happiness) {
                              case 1:
                                happy = "Down";
                                avgHappiness=avgHappiness+1;
                                break;
                              case 2:
                                avgHappiness=avgHappiness+2;
                                happy = "Not Great";
                                break;
                              case 3:
                                avgHappiness=avgHappiness+3;
                                happy = "Okay";
                                break;
                              case 4:
                                avgHappiness=avgHappiness+4;
                                happy = "Good";
                                break;
                              case 5:
                                avgHappiness=avgHappiness+5;
                                happy = "Great";
                                break;
                              
                            }
                            
                            var dateFormat = getFormattedDate(value.createDate);
                            recentPostsHTML += "<div style='padding-bottom:20px;' class='php-email-form'>"+
                            
                            "<strong>Posted:</strong>&nbsp;"+dateFormat+"<br/>"+
                            "<strong>Happiness:</strong>&nbsp;"+happy+"<br/>"+
                            "<strong>Share with Public:</strong>&nbsp;"+publicValue+"<br/>"+
                            "<strong>Grateful For:</strong><br/>"+value.postMsg+"<br/>"+
                          "<br/>"+
                          
                         //http://localhost:3508/users/account/getpost/post/60ccb0ccd1183b21d0b9c55c
                          "<a href='/users/account/getpost/?id="+value._id+"'>Edit</a>&nbsp;|&nbsp;"+
                          // "<a href='/users/account/getsharepost/?id="+value._id+"'>Share</a>&nbsp;|&nbsp;"+
                          "<a href='/users/account/deletepost/?id="+value._id+"'>Delete</a><br/>"+
                          
                          // <a href='/users/account/getpost/+value._id+'>Edit</a>&nbsp;|&nbsp;<a href='/doors/getPost/?=s'>Share</a><br/>"+
                          "</div><br/>";
                         
                        }
                });
                
                $("#recentPosts").html(recentPostsHTML);
                $("#recentPosts").fadeIn();
                $("#total-posts").html(data.length);
                var totalPts = data.length*50+100;
                $("#grat-pts").html(totalPts);
                
                
                avgHappiness=avgHappiness/data.length;
                avgHappiness=avgHappiness.toFixed(2);
                $("#avg-happiness").html(avgHappiness);
                $("#avg-happiness").html(avgHappiness);
                // $("#hiddenOverallHappiness").val(avgHappiness);
                let msgs;
              
                if(totalPts>299){
                  msgs="<img src='/assets/img/medals/bronze-tier.png'>";
                  msgs+="&nbsp;Challenge 1: Get a total of 300 Gratipoints to move to level.";
                  //set image to bronze icon //$(this).attr("src", "images/card-front.jpg");
                  // $("#badge-status").src("/assets/img/medals/silver-tier.png");
                  $("#badge-status").attr("src", "/img/medals/bronze-tier.png");
                  $("#memberlevel").html("Bronze");
                  
                }
                else{
                  msgs="&nbsp;Challenge 1: Get a total of 300 Gratipoints to move to level.";
                  
                }
                $("#quest1").html(msgs);
                if(totalPts>999){
                  msgs="<img src='/assets/img/medals/silver-tier.png'>";
                  msgs+="&nbsp;Challenge 2 Get a total of 1000 Gratipoints to move to level.";
                  $("#memberlevel").html("Silver");
                  $("#badge-status").attr("src", "/assets/img/medals/silver-tier.png");
                  
                }
                else{
                  msgs="&nbsp;Challenge 2: Get a total of 1000 Gratipoints to move to level.";
                }
                $("#quest2").html(msgs);
              
                if(totalPts>2999){
                  msgs="<img src='/assets/img/medals/gold-tier.png'>";
                  msgs+="&nbsp;Challenge 3 Get a total of 3000 Gratipoints to move to level.";
                  $("#memberlevel").html("Gold");
                  $("#badge-status").attr("src", "/assets/img/medals/gold-tier.png");
                  
                }
                else{
                  msgs="&nbsp;Challenge 3: Get a total of 3000 Gratipoints to move to level.";
                }
                
                $("#quest3").html(msgs);

                
                // msgs="";
                // if(totalPts>9999){
                //   msgs="<i class='fas fa-check-circle'></i>";
                // }
                // msgs+="&nbsp;Quest 3: Get a total of 3000 to complete quest(gold)";
                // $("#quest3").html(msgs);
                
                //$("#quest4").html("&nbsp;Quest 4: Complete post 7 days in a row");
                //>Quest 4: 
                
               
                
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
            
                $(".alert-post-success").hide();
                $(".alert-post-danger").fadeIn();
            }
        });
    });

}
function getFormattedDate(postDate){

    var currentDate = new Date();
    var postDate=postDate;
    var dateB = moment(currentDate);
    var dateC = moment(postDate);
    
    return dateC.from(dateB);

}
 

