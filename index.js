const config = require('./lib/config');
const users = require('./lib/user')
const gun = config.gun;
async function loginned(user) {
    user.message = require('./lib/message')(user);
    let rec = await users.findByName("rxy");
    for (let i = 0; i < 80000; i++) {
        console.log(i);
        user.message.send(rec, i + "hello bro :D" + i);
    }
    console.log(rec.key);
    console.log(await gun.get('chat').get(rec.key).once().then());
}
async function run() {
    let usr = await users.asyncCreateOrAuth('rxy', 'pwd');
    await loginned(usr);
};
run();