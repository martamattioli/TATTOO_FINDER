module.exports = {
    db: process.env.MONGODB_URI || 'mongodb://localhost/tattoo-finder-v2',
    port: process.env.PORT || 3000,
    secret: 'shhh'
}