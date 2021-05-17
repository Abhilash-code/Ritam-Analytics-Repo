// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "",
//     DB: "ritam",
//     PORT: "3306",
//     dialect: "mysql", 
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 100000,
//         acquire: 300000
//     }
// };


module.exports = {
    HOST: "ritam.cfwthe0ivh2k.ap-south-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "Admin#ritam",
    DB: "ritam",
    PORT: "3306",
    dialect: "mysql", 
    pool: {
        max: 5,
        min: 0,
        idle: 90000,
        acquire: 110000
    }
};