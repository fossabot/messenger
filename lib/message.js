const config = require('./config');
const Gun = require('gun')
const gun = Gun(config.server);

class Message {
    constructor(user) {
        this.user = user;
    }
    send(user, message) {
        if (!user.pub) return;
        gun.get(user.pub).set({
            'when': Gun.time.is(),
            'who': this.user.pub,
            'what': message
        });
    }
    async get() {
        return await gun.get(this.user.sea.pub).once().then();
    }
}

module.exports = function (user) {
    return new Message(user);
}