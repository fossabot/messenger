const config = require('./config');
const gun = require('gun')(config.server);
const user = gun.user();

module.exports = {
    onAuth: function (cb) {
        gun.on('auth', cb);
    },
    create: function (alias, passwd) {
        return new Promise((resolve, reject) => {
            user.create(alias, passwd, cb => {
                if (cb.err) return reject(cb.err)
                resolve(cb);
            })
        });
    },
    auth: function (alias, passwd) {
        return new Promise((resolve, reject) => {
            user.auth(alias, passwd, cb => {
                if (cb.err) return reject(cb.err);
                resolve(cb);
            })
        })
    },
    findByName: async function (alias) {
        if (!alias.startsWith("~@")) alias = "~@" + alias
        return await gun.get(alias).once().then();
    },
    findByPub: async function (pub) {
        if (!pub.startsWith("~")) pub = "~" + pub;
        return await gun.get(pub).once().then();
    }
}