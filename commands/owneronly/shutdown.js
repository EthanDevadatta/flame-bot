module.exports = {
    name: 'shutdown',
    ownerOnly: true,
    botPerms: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        process.exit()
    }
}