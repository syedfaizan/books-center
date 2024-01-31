let models = require('../models');


let UserCont = {
    create: (username) => {
        return models.User.findOrCreate({
            where: {
                username
            },
            defaults: {
                username
            }
        })
        .then( user => user[0] || user);
    }
}


module.exports = UserCont;