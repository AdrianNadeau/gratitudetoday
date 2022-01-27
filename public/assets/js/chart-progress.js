// $( document ).ready(function() {
//     window['moment-range'].extendMoment(moment);
//     var canvas = document.getElementById("line");
//     var ctx = canvas.getContext('2d');
  
//   // Global Options:
//   Chart.defaults.global.defaultFontColor = 'black';
//   Chart.defaults.global.defaultFontSize = 16;
  

//   //get current date month and spread out past 6 months
//   var currentMonth = moment().format('MM');
//   var currentYear = moment().format('YYYY');  
//   var dateCurrent = moment().format('MMM');
//     // var date1 = moment().subtract(5, 'months').format('MMM');
//   // var date2 = moment().subtract(4, 'months').format('MMM');
  
// var date3 = moment().subtract(3, 'months').format('MMM');
// var date3MonthNum = moment().subtract(3, 'months').format('MM');
// var date3Year = moment().subtract(3, 'YYYY').format('YYYY');
    
// var date4 = moment().subtract(2, 'months').format('MMM');
// var date4MonthNum = moment().subtract(2, 'months').format('MM');
// var date4Year = moment().subtract(2, 'YYYY').format('YYYY');

// var date5 = moment().subtract(1, 'months').format('MMM');
// var date5MonthNum = moment().subtract(1, 'months').format('MM');
// var date5Year = moment().subtract(1, 'YYYY').format('YYYY');

// let startDate,daysInMonth,month1Posts= 0, month2Posts= 0, month3Posts= 0, month4Posts= 0,
// month1Happiness = 0, month2Happiness=0, month3Happiness =0,month4Happiness =0
// //var checkDates = [date3, date4, date5, dateCurrent];
    
//     //get all posts with ajax call
//     $.ajax({
//       url: '/posts/userpostscount',
//       type: "GET",
//       dataType: "json",
//       data: {},
//       /**
//       * A function to be called if the request succeeds.
//       */
//      //compare first date on chart with second, second with third, third with fouth (current month)
//       success: function(data, textStatus, jqXHR) {
       
//           for(let i =0; i<data.length;i++){
//             let day = moment(data[i].createDate).format("DD");
//             let year = moment(data[i].createDate).format("YYYY");
//             let month = moment(data[i].createDate).format("MM");
//             daysInMonth = moment(month).daysInMonth();
//             let happyAvg = data[i].happiness;
            
//             if(month==2){
//                 //feb posts
//                  //check if post is in range
//                  startDate = moment(year+'-'+month+'-01'), 
//                  endDate = new Date(year, month, daysInMonth),
//                  date  = new Date(year, month, day),
//                  range = moment().range(startDate, endDate);
//                   if(range.contains(date)){
//                     month1Posts++
//                     month1Happiness++
//                   }
                 
//             }
//             else if(month==3){
//                 //check if post is in range
//                 startDate = moment(year+'-'+month+'-01'), 
//                 endDate = new Date(year, month, daysInMonth),
//                 date  = new Date(year, month, day),
//                 range = moment().range(startDate, endDate);
//                  if(range.contains(date)){
//                     month2Posts++
//                     month2Happiness++
//                  }


//             }
//             else if(month==4){
//                 //check if post is in range
//                 startDate = moment(year+'-'+month+'-01'), 
//                 endDate = new Date(year, month, daysInMonth),
//                 date  = new Date(year, month, day),
//                 range = moment().range(startDate, endDate);
//                  if(range.contains(date)){
//                     month3Posts++
//                     month3Happiness++
//                  }


//             }
//             else if(month==currentMonth){
//                  //check if post is in range
                 
//                  startDate = moment(year+'-'+month+'-01'), 
//                  endDate = new Date(year, month, daysInMonth),
//                  date  = new Date(year, month, day),
//                  range = moment().range(startDate, endDate);
//                   if(range.contains(date)){
//                      month4Posts++
//                      month4Happiness++
//                   }
//             }
           
//           }
//           console.log("Posts");
//           console.log(month1Posts);
//           console.log(month2Posts);
//           console.log(month3Posts);
//           console.log(month4Posts);

//           console.log("Happy");
//           console.log(month1Happiness);
//           console.log(month2Happiness);
//           console.log(month3Happiness);
//           console.log(month4Happiness);
//         },
        
//       error: function(jqXHR, textStatus, errorThrown) {
//         //send error message
//       }
      
//     });
//   <canvas id="myChart" width="400" height="400"></canvas>
// <script>
//   var data = {
//     labels: [ date3, date4, date5, dateCurrent],
//     datasets: [{
//         label: "Happiness",
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: "rgba(225,0,0,0.4)",
//         borderColor: "red", // The main line color
//         borderCapStyle: 'square',
//         borderDash: [], // try [5, 15] for instance
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: "black",
//         pointBackgroundColor: "red",
//         pointBorderWidth: 1,
//         pointHoverRadius: 8,
//         pointHoverBackgroundColor: "yellow",
//         pointHoverBorderColor: "brown",
//         pointHoverBorderWidth: 2,
//         pointRadius: 4,
//         pointHitRadius: 10,
//         // notice the gap in the data and the spanGaps: true
//         data: [month1Happiness,month2Happiness,month3Happiness,month4Happiness],
       
//         spanGaps: true,
//       }, {
//         label: "Posts",
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: "#999",
//         borderColor: "green", // The main line color
//         borderCapStyle: 'square',
//         borderDash: [], // try [5, 15] for instance
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: "black",
//         pointBackgroundColor: "green",
//         pointBorderWidth: 1,
//         pointHoverRadius: 8,
//         pointHoverBackgroundColor: "yellow",
//         pointHoverBorderColor: "brown",
//         pointHoverBorderWidth: 2,
//         pointRadius: 4,
//         pointHitRadius: 10,
//         // notice the gap in the data and the spanGaps: true
       
//         data: [month1Posts, month2Posts, month3Posts, month4Posts],
        
//         spanGaps: true,
      
      
//       }
  
//     ]
//   };
  
//   // Notice the scaleLabel at the same level as Ticks
//   var options = {
//     scales: {
//               yAxes: [{
//                   ticks: {
//                       beginAtZero:true
//                   },
//                   scaleLabel: {
//                        display: true,
//                        labelString: 'Posts',
//                        fontSize: 20 
//                     }
//               }]            
//           }  
//   };
//   Chart declaration:
//   var myChart = new Chart(ctx, {
//     type: 'line',
//     data: data,
//     options: options
//   });
//   </script>
  
// });