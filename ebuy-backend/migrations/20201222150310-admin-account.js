module.exports = {
  async up(db, client) {
    return db.collection('admin').insert({
      username: 'superadmin',
      password: 'superadmin',
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    return db.collection('admin').remove()
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
