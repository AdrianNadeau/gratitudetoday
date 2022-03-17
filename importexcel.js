// const readXlsxFile = require('read-excel-file/node')
const path = "C:/repos/gratitudetoday/data/quotes.xlsx";
// console.log("get path: "+path)
// // File path.
// readXlsxFile(path).then((rows) => {
//     console.log(rows);
    
//     // console.log(rows)
//     //insert row into quotes if not null
//     // db.products.insert( { item: "card", qty: 15 } )
//   // `rows` is an array of rows
//   // each row being an array of cells.
// })

// const xlsxFile = require('read-excel-file/node');
 
// xlsxFile(path).then((rows) => {
//     for (i in rows){
//         if(rows[i])
//             for (j in rows[i]){
//                 if(rows[i][j])

//                 console.dir(rows[i][j]);
//             }
//     }
//  })
// Requiring the module
// const reader = require('xlsx')
  
// // Reading our test file
// const file = reader.readFile(path)
  
// let data = []
  
// const sheets = file.SheetNames
  
// for(let i = 0; i < sheets.length; i++)
// {
//    const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//         temp.forEach((res) => {
            
//             data.push(res)
//         })
// }
  
// // Printing data
// console.log(data)
// const xlsx = require("xlsx");

// console.log("Reading the spreadsheet..")
//   const spreadsheet = xlsx.readFile(path);
//   const sheets = spreadsheet.SheetNames;
//   console.log('Sheet Names -- ' + sheets);
//   console.log('Raeding second sheet...');
//   const secondSheetName = sheets[0];
//   const secondSheet = spreadsheet.Sheets[secondSheetName];

//   for(let i=1; ;i++) {
//     const firstColumn = secondSheet['A' + i];
//     if(!firstColumn) {
//       break;
//     }
//     console.log('First Column A' + i + ' --- '  + firstColumn);
//   }
const Excel = require('exceljs');
const { MongoClient } = require("mongodb");
var workbook = new Excel.Workbook(); 
const uri =
  "mongodb://localhost:27017";
  
    // Create a new MongoClient
    const client = new MongoClient(uri);
  
async function run() {
  try {
    // Connect the client to the server
    var db = await client.connect();
    let quoteDoc;
    // Establish and verify connecti{on
    await client.db("gratitude-today-dev").command({ ping: 1 });
    workbook.xlsx.readFile(path).then(() => {
        var sheet = workbook.getWorksheet("Sheet1");
        console.log(sheet.actualRowCount)
        for (var i = 1; i <= sheet.actualRowCount; i++) {
          for (var j = 1; j <= sheet.actualColumnCount; j++) {
            data = sheet.getRow(i).getCell(j).toString();
            // process.stdout.write(data+" ");
            var o = {} // empty Object
            var key = 'Quotes';
            o[key] = []; // empty Array, which you can push() values into
            var data = {
                quote: data,
                // data: '76.36731:3.4651554:0.5665419'
            };
            // var data2 = {
            //     author: data,
            //     // data: '78.15431:0.5247617:-0.20050584'
            // };
            o[key].push(data);
            // o[key].push(data2);         
            console.log(data);
            // console.log(data2)
            // data+" "
            // process.stdout.write(quoteDoc);
            // await client.db.quotes.insert(data+" ")
            // db.quotes.insertOne()
            // var quote = new BsonDocument
            // {
            //     {"name", "BMW"},
            //     {"price", 34621}
            // };

            
          }
          console.log()
        }
      });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// mongoose
//   .connect("mongodb://mongodb0.example.com:27017", {
//     useNewUrlParser: true,
//     connectWithNoPrimary: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .catch((error) => console.error(error));




  
  

  



