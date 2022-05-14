const express = require("express");
const authenticate = express.Router();
const db = require("../database")
var crypto = require('crypto');
authenticate.post('/', async (req, res, next) => {

    try {
        const authData = req.body;
        if (authData.username && authData.password) {
            //validating
            try {
                const result = await db.promise().query(`select * from beatnik_temp where email = '${authData.username}' and password = '${authData.password}' and isActive = 1`)
                if (result[0].length > 0) {
                    res.send({
                        "results" : {
                            "status" : "OK",
                            "code" : "202",
                            "data" : {
                                "token" : crypto.randomBytes(64).toString('hex'),
                                "result" : result[0]
                            },
                            "msg" : "Logged In Successfully"
                        }
                });
                } else {
                    res.send({
                        "results" : {
                            "status" : "NOK",
                            "code" : "400",
                            "data" : {},
                            "msg" : "Wrong username and password"
                        }
                    });
                }
            
            } catch (error) {
                console.log(error.message);
            }
            // res.send({
            //     "results" : {
            //         "status" : "OK",
            //         "code" : "202",
            //         "data" : {
            //             "token" : crypto.randomBytes(64).toString('hex')
            //         },
            //         "msg" : "Logged In Successfully"
            //     }
            // });
        } else {
            res.send({
                "results" : {
                    "status" : "NOK",
                    "code" : "400",
                    "data" : {},
                    "msg" : "Fields missing"
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = authenticate;