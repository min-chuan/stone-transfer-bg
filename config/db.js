let MYSQL_CONFIG;
let REDIS_CONFIG;

if(process.env.NODE_ENV === 'dev'){
    MYSQL_CONFIG = {
        host     : '116.62.25.117',
        user     : 'root',
        password : 'mysqlwyf123',
        database : 'pro'
    }
} else if(process.env.NODE_ENV === 'pro'){
    MYSQL_CONFIG = {
        host     : '116.62.25.117',
        user     : 'root',
        password : 'mysqlwyf123',
        database : 'dev'
    }
}

module.exports = {
    MYSQL_CONFIG
}