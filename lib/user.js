const config = require('./config');
const gun = config.gun;
const user = gun.user();

function asyncAuth(alias, passwd) {
    return new Promise((resolve, reject) => {
        user.auth(alias, passwd, cb => {
            if (cb.err) return reject(cb.err);
                resolve(cb);
        })
    })
};
function asyncCreate(alias, passwd) {
        return new Promise((resolve, reject) => {
            user.create(alias, passwd, cb => {
                if (cb.err) return reject(cb.err)
                resolve(cb);
            })
        });
    }
module.exports = {
    onAuth: function (cb) {
        gun.on('auth', cb);
    },
    create: function (alias, passwd) {
        user.create(alias, passwd);
    },
    asyncCreate: asyncCreate,
    auth: function (alias, passwd) {
        user.auth(alias, passwd)
    },
    asyncAuth: asyncAuth,
    asyncCreateOrAuth: async function(alias, passwd) {
        await asyncCreate(alias, passwd).catch(() => {});
        return await asyncAuth(alias, passwd).catch(() => {});
    },
    findByName: async function (alias) {
        if (!alias.startsWith("~@")) alias = "~@" + alias;
        if (alias.length == 2) return undefined;
        let usr = await gun.get(alias).once().then();
        let key = Object.keys(usr)[1];
        return { 'alias': alias.slice(2), 'key': key };
    },
    findByPub: async function (pub) {
        if (!pub.startsWith("~")) pub = "~" + pub;
        let usr = await gun.get(pub).once().then();
        return { 'alias': usr.alias, 'key': usr.pub };
    }
}