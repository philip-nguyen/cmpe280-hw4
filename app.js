
// https://hectorcorrea.com/blog/introduction-to-node-js/51
// Server script
var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
// place html and css in public folder to be
// rendered together
app.use(express.static("public"));

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

// Server functions 
// function to save form for demographics
function saveDemographics() {
    console.log("Save Demographics Call");

    event.preventDefault();
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var gender = document.getElementById("gender").value;
    var age = document.getElementById("age").value;
    var notes = document.getElementById("other").value;
    var photo = document.getElementById("photo") ? 
                document.getElementById("photo").value.substring(12) : null;
    // var photo = photo.substring(12);
    // console.log(photo.substring(12));
    // set all the variables
    const mysql = require('mysql');
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

    connection.query('INSERT INTO Patients (name, gender, age, photo) VALUES(?, ?, ?, ?)',
                        [name, gender, age, photo]);
    connection.query('SELECT id FROM Patients WHERE name = '+quoteString(name)+' \
        AND gender = '+quoteString(gender)+' AND age = '+quoteString(age), 
        (err, rows) => {
            console.log(rows[0].id);
            
            sessionStorage.setItem('curId', results.rows[0].id);
        });
    
    var demos = document.getElementById("demographics");
    var vitals = document.getElementById("vitals");
    demos.style.display = "none";
    vitals.style.display = "block";

    //window.location.assign("vitals.html");
}
// function to save form for health vitals
function saveVitals() {
    console.log("Save Health Vitals Call");

    event.preventDefault();
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var bTemp = document.getElementById("bTemp").value;
    var pulse = document.getElementById("pulse").value;
    var bp = document.getElementById("bp").value;
    var meds = document.getElementById("medications").value;
    var notes = document.getElementById("notes").value;

    
    connection.query('UPDATE Patients SET medications=?, notes=? WHERE id = ?',
                            [meds, notes, sessionStorage.getItem('curId') ]);

    var report = document.getElementById("report");
    var vitals = document.getElementById("vitals");
    report.style.display = "block";
    vitals.style.display = "none";
    showReport();
    //window.location.assign("");
}
// function to read from DB
function showReport() {

    var db = openDatabase('healthSpa', '1.0', 'HealthSpa DB', 2 * 1024 * 1024);

    db.transaction(function (tx) { 
        tx.executeSql('SELECT * FROM Patients', [], function (tx, results) { 
           var len = results.rows.length, i; 
           //msg = "<p>Found rows: " + len + "</p>"; 
           //document.querySelector('#status').innerHTML +=  msg; 
            var report = document.getElementById("report");
            
           for (i = 0; i < len; i++) { 
              //msg = "<p><b>" + results.rows.item(i).log + "</b></p>"; 
              //document.querySelector('#status').innerHTML +=  msg;
               var patientRow = document.createElement("tr");

               var patientDetail = document.createElement("td");
               var detail = document.createTextNode(results.rows[i].name);
               patientDetail.appendChild(detail);
               patientRow.appendChild(patientDetail);

               var patientDetail = document.createElement("td");
               var detail = document.createTextNode(results.rows[i].age);
               patientDetail.appendChild(detail);
               patientRow.appendChild(patientDetail);

               var patientDetail = document.createElement("td");
               var detail = document.createTextNode(results.rows[i].gender);
               patientDetail.appendChild(detail);
               patientRow.appendChild(patientDetail);

               var patientDetail = document.createElement("td");
               var detail = document.createTextNode(results.rows[i].photo);
               patientDetail.appendChild(detail);
               patientRow.appendChild(patientDetail);

               var patientDetail = document.createElement("td");
               var detail = document.createTextNode(results.rows[i].medications);
               patientDetail.appendChild(detail);
               patientRow.appendChild(patientDetail);

               var patientDetail = document.createElement("td");
               var detail = document.createTextNode(results.rows[i].notes);
               patientDetail.appendChild(detail);
               patientRow.appendChild(patientDetail);

               report.appendChild(patientRow);
           } 
        }, null); 
     }); 
}
// function to access camera and take picture???

function quoteString(string) {
    return '"' + string + '"';
}