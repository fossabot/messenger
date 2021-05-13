const config = require('./config');
const Gun = config.Gun;
const gun = config.gun;

class Message {
    constructor(user) {
        if (!user.sea.pub) throw "Use this module inside gun.on('auth') callback"
        this.user = user;
    }
    async send(user, message) {
        if (!user.key) return undefined;
        let msg = {
            'when': Gun.time.is(),
            'who': this.user.sea.pub,
            'what': message
        }
        gun.get('chat').get(user.key).set(msg, () => {});
    }
    async get() {
        return await this.get(this.user.sea.pub);
    }
    async get(key) {
        return await gun.get(key).once().then();
    }
}

module.exports = function (user) {
    return new Message(user);
}