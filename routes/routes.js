//// ▶▶ require objects ◀◀ ////
var bodyParser = require('body-parser');
var db = require('../schema/db');

var user=require('../schema/model/user');


//// ▶▶ application/json parser ◀◀ ////
var jsonParser = bodyParser.json();

//// ▶▶ application/x-www-form-urlencoded parser ◀◀ ////
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

    //// ▶▶ enable cors ◀◀ ////
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });



    //// ▶▶ USER add new user ◀◀ ////

    app.post('/api/user/create',jsonParser, function(req,res){
        user.createAndSave(req.body.firstName,req.body.lastName,req.body.email,function(err,done){
            if(err){
                res.status=400;
                res.send(err.toString());
                return;
            }

            res.status=201;
            res.send(done);
            return;
        });
    });



    //// ▶▶ USER find one◀◀ ////
    app.get('/api/user/findOne/:id',function(req,res) {
        user.findByUserID(req.params.id,function(err,cID){
            if (err) {
                res.status = 400;
                res.send(err);
                return;
            }
            if(cID && cID.length>0){
                res.status = 202;
                res.send(cID);
                return;
            }else{
                user.findByEmail(req.params.id,function(err,email){
                    if (err) {
                        res.status = 400;
                        res.send(err);
                        return;
                    }
                    if(email && email.length>0){
                        res.status = 202;
                        res.send(email);
                        return;
                    }else{
                        res.status = 202;
                        res.send("{not found}");
                        return;
                    }
                });
            }
        });
    });

    //// ▶▶ USER generic find ◀◀ ////
    app.get('/api/user/find',function(req,res) {
        user.find(req.query, function (err, done) {
            if (err) {
                res.status = 400;
                res.send(err);
                return;
            }
            res.status = 202;
            res.send(done);
        });
    });

    //// ▶▶ USER find using specific parameter ◀◀ ////
    app.get('/api/user/findLongform', function (req, res) {

        if (req.query.id) {
            user.findUserID(req.query.id, function (err, users) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(users);
            });
        }

        if (req.query.email) {
            user.findByEmail(req.query.email, function (err, users) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(users);
            });
        }

        if (req.query.firstName) {
            user.findByFirstName(req.query.firstName, function (err, users) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(users);
            });
        }

        if (req.query.lastName) {
            user.findByLastName(req.query.lastName, function (err, users) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(users);
            });
        }
    });

};

