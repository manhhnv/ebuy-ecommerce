const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    const hashPassword = await bcrypt.hash('superadmin', 10)
    console.log(hashPassword)
    return db.collection('users').insert({
      username: 'superadmin',
      password: hashPassword,
      email: 'ebuyadmin@gmail.com',
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    return db.collection('users').remove()
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
