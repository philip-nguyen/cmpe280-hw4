
// https://hectorcorrea.com/blog/introduction-to-node-js/51
// Server script
var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var $ = require('jquery');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// place html and css in public folder to be
// rendered together
app.use(express.static("public"));

//set the path of the jquery file to be used from the node_module jquery package  
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  

// mysql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'health_spa'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});


app.post("", jsonParser, function(req, res) {
    // get the request body
    console.log("Req body: ", req.body);

    if(req.body.fname) {
        var name = req.body.fname + " " + req.body.lname;
        var gender = req.body.gender;
        var age = req.body.age;
        var photo = req.body.photo;
        
        connection.query('INSERT INTO Patients (name, gender, age, photo) VALUES(?, ?, ?, ?)',
                            [name, gender, age, photo]);
        
        connection.query('SELECT id FROM Patients WHERE name = '+quoteString(name)+' \
            AND gender = '+quoteString(gender)+' AND age = '+quoteString(age), 
            (err, rows) => {
                console.log("ID: ", rows[0].id);
                
                //sessionStorage.setItem('curId', results.rows[0].id);
                res.json(rows[0].id);
            });
    }
    
    if(req.body.medications) {
        var meds = req.body.medications;
        var notes = req.body.notes;
        var id = req.body.id;
        connection.query('UPDATE Patients SET medications=?, notes=? WHERE id = ?',
                        [meds, notes, id]);

        connection.query('SELECT * FROM Patients', function(err, rows, fields) {
            if (err) throw err;
            var data = [];
            for(i = 0; i < rows; i++) {
                data.push(rows[i].name);
                data.push(rows[i].age);
                data.push(rows[i].gender);
                data.push(rows[i].photo);
                data.push(rows[i].medications);
                data.push(rows[i].notes);
            }
            res.json(JSON.stringify(data));
        });
    }
    
});





app.post('/demo', function(req, res) {
    event.preventDefault();
    
    console.log('req.body');
    console.log(req.body);
    res.write('You sent the name "' + req.body.name+'".\n');
    res.write('You sent the Email "' + req.body.email+'".\n');
    res.write('You sent the City "' + req.body.city+'".\n');
    res.write('You sent the Pincode "' + req.body.pincode+'".\n');
    res.end()
});

app.listen(8000);
console.log('Example app listening at port:8000');

// quote string function
function quoteString(string) {
    return '"' + string + '"';
}