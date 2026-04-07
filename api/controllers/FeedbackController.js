/**
 * FeedbackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function(req, res) {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Missing feedback message' });
    }

    try {
      await Feedback.create({ message });
      return res.json({ message: 'Feedback saved successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save feedback' });
    }
  }

};
