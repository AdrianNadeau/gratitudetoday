const fs = require('fs')
/////////////////////////////////////////////////////
//////// Check Blacklist before submit //////////////
/////////////////////////////////////////////////////

fs.readFile('blacklist/blacklist.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    else     
      var blacklistArray = data.split("\n");
      var postWordsArray = "grateful for fuck my test!".split(" ");
      console.log(postWordsArray);
      let badWordsArray = [];
      // for (const blackWord of blacklistArray) {
       
      //   for (const postsWord of postWordsArray){
      //     console.log(postsWord);
      //     if (postsWord.toLowerCase().indexOf(blackWord.toLowerCase()) !== -1) {
      //         console.log("found: "+blackWord)
      //         badWordsArray.push(item)
      //     }
      // } 
      // }
      
      for (const blackWord of blacklistArray) {
        for (const postsWord of postWordsArray){
          if(blackWord.toLowerCase().localeCompare(postsWord.toLowerCase()==1)){
            console.log("FOUND: " +blackWord);
          }
          // if(blackWord.toLowerCase().localeCompare(postsWord.toLowerCase())){
            
          }
      }        
      
      // for(int= i=0 ;i<blacklistArray.length;i++){
      //   for(int= x=0 ;x<postWordsArray.length;x++){
      //     if(blacklistArray[i].toLowerCase()==postWordsArray[x].toLowerCase()){


      //     // if(blacklistArray[i].toLowerCase()==(postWordsArray[x].toLowerCase())){ // true
      //       console.log("FOUND: "+blacklistArray[i])
      //       badWordsArray.push(blacklistArray[i]);
      //     }
      //   }
      // }
      // if(badWordsArray.length>0)
      //   badWordsArray.forEach(element => console.log(element));
      });