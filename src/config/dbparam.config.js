module.exports = {
    HOST: "localhost",
    USER: "rtodo_user",
    PASSWORD: "secret",
    DB: "todoDB",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};