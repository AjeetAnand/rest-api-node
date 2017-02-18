'use strict';
const pro = require('commander');
const con = require('../config/dbcon.js');

pro
  .version('0.0.1')
  .option('-u, --users', 'Insert dummy data in users table')
  .option('-n, --number <num>', 'Number of records to insert')
  .option('-c, --catalog','Insert data in the catalog table')
  .option('-p, --product','Insert data in the product table')
  .parse(process.argv);

 var howMany = +pro.number || 100;

 if (pro.users) {
 	insertInUsers();
 }
 else if(pro.catalog) {
 	insertInCatalog();
 }
 else if(pro.product) {
 	insertInProduct();
 }
  else {
 	console.log('Plz type -h OR --help to get help of options and to choose the command')
 }

 function insertInUsers() {
 	
 	var count = 0;
 	for (var i = -1; ++i < howMany;) {
 		var fname = (i%2) ? 'Intekhab '+i : 'Ankur '+i;
 		var lname = (i%2) ? 'alam' : 'Tripathi';
 		var email = (i%2) ? 'Intekhab'+i+ '@gmail.com' : 'Ankur'+i+ '@gmail.com';
 		var user = { 
 			fName: fname,
 			lName: lname,
 			email: email,
 			password: '12345',
 			created_at: '2014-11-22 12:45:34',//'NOW()',
 			updated_at: '2014-11-22 12:45:34',//'NOW()'
 		};
 		con.query('insert into user set ?', user, (err, result, fields) => {
 			console.log(err, count);
 			count++;
 			if (count === howMany) process.exit(0);
 		});

 	}
 }

 function insertInCatalog(){
 	var cat = ['Men','Women','Electronics','Sports','FootWear','Wathes'];
 	for(var i =0; i< cat.length; i++){
 		let data = {
 			catalog_name: cat[i]
 		};
 		con.query('insert into catalog set ?', data, (err, result, fields) => {
 			console.log(err, i);
 		});
 	}
 }

 function insertInProduct(){
 	var count = 0;
 	for( var i=0; i< howMany ; i++){
 		 var p_name = 'p' + i;
 		 var p_desc = 'This is product p' + i;
 		 var price = i + i*5;
 		 var c_id = (i<7)? i : (function(){ 
 		 	var id =0 ;
 		 	if(count<7){ 
 		 		var id = count; 
 		 		count++ ;
 		 	}
 		 	else { 
 		 		id = 1; 
 		 		count = 0;
 		 	}
 		 	return id 
 		 })()
 		var product = {
 			product_name: p_name,
 			description: p_desc,
 			product_price: price,
 			catalog_id: c_id,
 		}
 		con.query('insert into product set ?', product,(err, result, fields) =>{
 			console.log(err,i,c_id);
 		});
 	}
 }