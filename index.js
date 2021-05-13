const config = require('./lib/config')
const user = require('./lib/user')
async function run() {

    let usr = await user.auth('rxy', 'pwd').catch(() => { });
    if (!usr) usr = await user.create('rxy', 'pwd');

    usr.message = require('./lib/message')(usr);
    console.log(usr);
    console.log(await usr.message.get());
};
run();