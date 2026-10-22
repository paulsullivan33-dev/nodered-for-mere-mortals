// A pocket MQTT broker for trying Node-RED's MQTT nodes without
// installing anything system-wide. Pure JavaScript (aedes).
//   npm install aedes
//   node broker.js
// It listens on 127.0.0.1:1883 only. It is a lab toy, not a
// broker for real use: no accounts, no persistence, no TLS.
const { Aedes } = require('aedes');
(async () => {
  const aedes = await Aedes.createBroker();
  const server = require('net').createServer(aedes.handle);
  server.listen(1883, '127.0.0.1', () =>
    console.log('lab broker listening on 127.0.0.1:1883'));
  aedes.on('publish', (packet, client) => {
    if (!packet.topic.startsWith('$SYS')) {
      console.log(`broker saw publish: ${packet.topic} -> ${packet.payload.toString()}`);
    }
  });
  aedes.on('subscribe', (subs, client) => {
    console.log(`broker saw subscribe: ${subs.map(s => s.topic).join(', ')}`);
  });
})();
