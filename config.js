module.exports = {
    //Develop config
    port: process.env.PORT || 8000,
    db: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shop',
    SECRET_TOKEN: 'myclavedetokens',

    //QA config
    CREATE_AUTOMATED_SUITES: true
}