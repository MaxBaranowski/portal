var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
// app.set('port', process.env.PORT || 4848);

app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json({limit: '5mb'}))

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/app/index.html');
});

app.get('/api/get-all', function(req,res){
 var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect('mongodb://admin:2486az34@ds119568.mlab.com:19568/portal-database', function(err, db) {
        if (err) throw err;
        //выбрать все из бд
        db.collection('cars-ads')
            .find()
            .sort({ time: -1 })
            .limit(10)
            .toArray(function(err, result) {
            if (err) {
                throw err;
            }else {
                res.json(result);
            }
        });
        db.close();
    });
});

//detail view
app.get('/api/get-by-id/:id', function(req,res){
    // console.log(req.params.id)
    var MongoClient = require('mongodb').MongoClient;

    var ObjectId = require('mongodb').ObjectId; 

    MongoClient.connect('mongodb://admin:2486az34@ds119568.mlab.com:19568/portal-database', function(err, db) {
        if (err) throw err;
        //выбрать все из бд
        db.collection('cars-ads').find(
            {
                _id: new ObjectId(req.params.id)
            }
        ).toArray(function(err, result) {
            if (err) {
                throw err;
            }else {
                res.json(result);
            }
        });
        db.close();
    });
});

//create new ad
app.post('/api/create-ad/', function(req,res){
    //get data and parse it to valid json
    // var data = JSON.parse(req.params.data);
    // console.log('recive: ',req.body)
    var data = req.body;

    var MongoClient = require('mongodb').MongoClient;

    var ObjectId = require('mongodb').ObjectId;

    MongoClient
        .connect('mongodb://admin:2486az34@ds119568.mlab.com:19568/portal-database',
            function(err, db) {
                if (err) throw err;
                //выбрать все из бд
                db.collection('cars-ads')
                    .insertOne(data)
                res.send('OK')
                db.close();
            });
});


app.get('/api/get-by-user-id/:id', function(req,res){
    // console.log(req.params.id)
    var MongoClient = require('mongodb').MongoClient;

    var ObjectId = require('mongodb').ObjectId;

    MongoClient.connect('mongodb://admin:2486az34@ds119568.mlab.com:19568/portal-database', function(err, db) {
        if (err) throw err;
        db.collection('cars-ads').find({
            "userId": req.params.id
        })
        .toArray(function(err, result) {
            if (err) {
                throw err;
            }else {
                res.json(result);
            }
        });
        db.close();
    });
});

//sort by date (new)
app.get('/api/sort/date/old', function(req,res){
    // console.log(req.params.id)
    var MongoClient = require('mongodb').MongoClient;

    var ObjectId = require('mongodb').ObjectId;

    MongoClient.connect('mongodb://admin:2486az34@ds119568.mlab.com:19568/portal-database', function(err, db) {
        if (err) throw err;
        db.collection('cars-ads')
            .find()
            .sort( {time: 1} )
            .toArray(function(err, result) {
                if (err) {
                    throw err;
                }else {
                    res.json(result);
                }
            });
        db.close();
    });
});

//sort by yer (new)
app.get('/api/sort/year/new', function(req,res){
    // console.log(req.params.id)
    var MongoClient = require('mongodb').MongoClient;

    var ObjectId = require('mongodb').ObjectId;

    MongoClient.connect('mongodb://admin:2486az34@ds119568.mlab.com:19568/portal-database', function(err, db) {
        if (err) throw err;
        db.collection('cars-ads')
            .find()
            .sort( {year: 1} )
            .toArray(function(err, result) {
                if (err) {
                    throw err;
                }else {
                    res.json(result);
                }
            });
        db.close();
    });
});

//sort by yer (old)
app.get('/api/sort/year/old', function(req,res){
    // console.log(req.params.id)
    var MongoClient = require('mongodb').MongoClient;

    var ObjectId = require('mongodb').ObjectId;

    MongoClient.connect('mongodb://admin:2486az34@ds119568.mlab.com:19568/portal-database', function(err, db) {
        if (err) throw err;
        db.collection('cars-ads')
            .find()
            .sort( {year: -1} )
            .toArray(function(err, result) {
                if (err) {
                    throw err;
                }else {
                    res.json(result);
                }
            });
        db.close();
    });
});

//sort by mileage (big)
app.get('/api/sort/mileage/big', function(req,res){
    // console.log(req.params.id)
    var MongoClient = require('mongodb').MongoClient;

    var ObjectId = require('mongodb').ObjectId;

    MongoClient.connect('mongodb://admin:2486az34@ds119568.mlab.com:19568/portal-database', function(err, db) {
        if (err) throw err;
        db.collection('cars-ads')
            .find()
            .sort( {mileage: -1} )
            .toArray(function(err, result) {
                if (err) {
                    throw err;
                }else {
                    res.json(result);
                }
            });
        db.close();
    });
});

//sort by mileage (small)
app.get('/api/sort/mileage/small', function(req,res){
    // console.log(req.params.id)
    var MongoClient = require('mongodb').MongoClient;

    var ObjectId = require('mongodb').ObjectId;

    MongoClient.connect('mongodb://admin:2486az34@ds119568.mlab.com:19568/portal-database', function(err, db) {
        if (err) throw err;
        db.collection('cars-ads')
            .find()
            .sort( {mileage: 1} )
            .toArray(function(err, result) {
                if (err) {
                    throw err;
                }else {
                    res.json(result);
                }
            });
        db.close();
    });
});









// app.listen(app.get('port'), function(){
//     console.log("server starts on port: " + app.get('port'));
// });

app.listen(process.env.PORT || 8080, () => {
    console.log('server starts')
})