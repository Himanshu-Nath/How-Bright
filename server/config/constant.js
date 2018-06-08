module.exports = {    
    PORT : process.env.PORT || 3000,  

    POST : "POST",
    GET : "GET",
    PUT : "PUT",
    DELETE : "DELETE",

    SUCCESS : "SUCCESS",
    FAIL : "FAILED",
    ERROR : "ERROR",
    ADD : "ADDED",
    DELETE : "DELETED",

    MONGODB_ATLAS_URL: "",
    MONGODB_LOCALHOST_URL: "mongodb://localhost/HB",

    EMAIL : {
        from: 'Sam',
        to: 'hnath723@gmail.com',
        user: 'sampotter723@gmail.com',
        refreshToken: "1/JPN3HjHtfJG3hCTl8zcJnR0D9q82tFRzS48spuBivvNLrJBlQDFe4BoO_2km_u-1",
        type: 'OAuth2',
        clientId: "711190330538-lbsu2btlnmqc1cncgeddjgucr2395bpi.apps.googleusercontent.com",
        clientSecret: "DSkPV8E8FgfOXicsF9GVWu3r",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true
    }
};