var Promise = require('promise');
var fs = require('fs');

var write = Promise.denodeify(fs.writeFile)


// Example #1: Using promisified functions
// Important!! .then() and .catch() need to be passed in a function!
var promise = write('bla.txt', 'Blablabla', 'utf-8')
				.then(function(){console.log('Success!')})
				.catch(function(err){console.log('Error occured: ' + err)})


// Example #2: Creating a promise myself
function readFile(filename){
	return new Promise(function(resolve, reject){

		fs.readFile(filename, 'utf-8', function(err, data){
			if(err) reject(err);
			else resolve(data)
		});

	});
}

readFile('bla.txt')
	.then(function(results){console.log('Success! Here are the results: ', results)})
	.catch(function(err){console.error('Error during operation: ', err)})