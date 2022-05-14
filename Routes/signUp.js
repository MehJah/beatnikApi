const express = require("express");
const authenticate = express.Router();
const db = require("../database")
authenticate.post('/', async (req, res, next) => {

    try {
        const authData = req.body;
        if (authData.name && authData.email && authData.password && authData.phoneNumber && authData.joinAs && authData.aboutMe) {
            // console.log(authData);
            //validating
            try {
                const result = await db.promise().query(`select * from beatnik_temp where email = '${authData.email}' and phoneNumber = '${authData.phoneNumber}' and isActive = 1`)
                if (result[0].length == 0) {
                    db.promise().query(`INSERT INTO beatnik_temp (id, name, email, password, phoneNumber, joinAs, aboutMe, isActive) VALUES (NULL, '${authData.name}', '${authData.email}', '${authData.password}', '${authData.phoneNumber}', '${authData.joinAs}', '${authData.aboutMe}', '1');`)
                    res.send({
                        "results" : {
                            "status" : "OK",
                            "code" : "202",
                            "data" : {
                                "result" : ""
                            },
                            "msg" : "Signed in Successfully"
                        }
                });
                } else {
                    res.send({
                        "results" : {
                            "status" : "OK",
                            "code" : "202",
                            "data" : {},
                            "msg" : "Details already exists"
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