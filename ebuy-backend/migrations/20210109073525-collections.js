module.exports = {
  async up(db, client) {
    const collectionOne = {
      name: 'Men Fashion',
      totalSubCollection: 0,
      subCollections: [],
      active: true,
      defaultCollection: true
    }
    const collectionTwo = {
      name: 'Women Fashion',
      totalSubCollection: 0,
      subCollections: [],
      active: true,
      defaultCollection: true
    }
    const collectionThree = {
      name: 'Popular Fashion',
      totalSubCollection: 0,
      subCollections: [],
      active: true,
      defaultCollection: true
    }
    const collectionFour = {
      name: 'New Product',
      totalSubCollection: 0,
      subCollections: [],
      active: true,
      defaultCollection: true
    }
    return db.collection('collections').insertMany([collectionOne, collectionTwo, collectionThree, collectionFour])
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    return db.collection('collections').remove()
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
