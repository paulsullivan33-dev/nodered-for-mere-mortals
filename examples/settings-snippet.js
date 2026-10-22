// The lab's settings.js additions, from chapter 9 and 10.
// Merge these into the settings file in your Node-RED user
// directory (usually ~/.node-red/settings.js). The password
// hash below is a placeholder: make your own with
//   node-red admin hash-pw
module.exports = {
    uiPort: 1880,
    flowFile: "flows.json",

    // Encrypt the credentials file with our own key, not a
    // system-generated one we could lose.
    credentialSecret: "a-passphrase-you-choose-and-keep",

    // Ask who you are before letting you edit flows.
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "$2y$08$PASTE-YOUR-OWN-HASH-HERE",
            permissions: "*"
        }]
    },

    // Remember context on disk so it survives a restart.
    contextStorage: {
        default: {
            module: "localfilesystem",
            config: { cache: true }
        }
    }
};
