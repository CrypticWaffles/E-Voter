/**
 * VideoController
 *
 * @description :: Server-side actions for handling incoming requests related to videos.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: async function(req, res) {
    const videos = await Video.find();
    const votes  = await Vote.find();

    // Tally yes/no per video
    const tallies = {};
    votes.forEach(v => {
      if (!tallies[v.VideoId]) tallies[v.VideoId] = { yes: 0, no: 0 };
      v.choice ? tallies[v.VideoId].yes++ : tallies[v.VideoId].no++;
    });

    const videosWithTallies = videos.map(v => ({
      ...v,
      yesVotes: (tallies[v.id] || {}).yes || 0,
      noVotes:  (tallies[v.id] || {}).no  || 0,
    }));

    return res.view('pages/videoList', { videos: videosWithTallies });
  },

  play: async function(req, res) {
    const video = await Video.findOne({ id: req.params.id });
    if (!video) {
      return res.status(404).send('Video not found');
    }
    return res.view('pages/videoPlay', { video });
  }

};
