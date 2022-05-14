const mysql = require("mysql2")
module.exports = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "beatnik"
})

// module.exports = mysql.createConnection({
//     host: "162.241.224.218",
//     port: 80,
//     user: "promaskc_yuru",
//     password: "AshokHeadache",
//     database: "promaskc_yuru"
// })