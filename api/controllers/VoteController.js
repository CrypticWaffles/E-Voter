/**
 * VoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  vote: async function(req, res) {
    try {
      const { VideoID, choice, zipId } = req.body;

      if (!VideoID || typeof choice !== 'boolean' || !zipId) {
        return res.badRequest({ error: 'Invalid vote data' });
      }

      await Vote.create({ VideoId: VideoID, choice, zipId });

      // Return updated tallies for the voted-on video
      const votes = await Vote.find({ VideoId: VideoID });
      const yesVotes = votes.filter(v => v.choice).length;
      const noVotes  = votes.filter(v => !v.choice).length;

      return res.json({ success: true, yesVotes, noVotes });
    } catch (err) {
      return res.serverError(err);
    }
  },

  analytics: async function(req, res) {
    const votes     = await Vote.find();
    const locations = await Location.find();

    // Build ZIP -> state lookup
    const zipToState = {};
    locations.forEach(l => { zipToState[l.zip] = l.state; });

    // Aggregate yes/no counts by state
    const byState = {};
    votes.forEach(v => {
      const state = zipToState[v.zipId] || 'Unknown';
      if (!byState[state]) byState[state] = { yes: 0, no: 0 };
      v.choice ? byState[state].yes++ : byState[state].no++;
    });

    const stateData = Object.entries(byState)
      .map(([state, counts]) => ({
        state,
        yes:   counts.yes,
        no:    counts.no,
        total: counts.yes + counts.no,
      }))
      .sort((a, b) => b.total - a.total);

    const totalYes = votes.filter(v => v.choice).length;
    const totalNo  = votes.filter(v => !v.choice).length;

    return res.view('pages/analytics', { stateData, totalYes, totalNo });
  }

};
