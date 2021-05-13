const Gun = require('gun');
const server = "http://localhost:8765/gun" 
 
module.exports = { server: server, Gun: Gun, gun: Gun(server) }