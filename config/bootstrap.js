/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * Runs just before the Sails app lifts. Seeds the database with
 * initial video data if none exists.
 */

module.exports.bootstrap = async function() {

  if (await Video.count() > 0) { return; }

  await Video.createEach([
    {
      title: 'Infrastructure Investment Act — Floor Debate',
      url: '/videos/testVid1.mp4',
    },
    {
      title: 'Climate Policy Discussion — Senate Hearing',
      url: '/videos/testVid2.mp4',
    },
    {
      title: 'Healthcare Reform Bill — Committee Review',
      url: '/videos/testVid3.mp4',
    },
  ]);

  sails.log.info('Database seeded with 3 videos.');

};
