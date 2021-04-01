module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "ams",

    dialect: "mysql", 
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
};
