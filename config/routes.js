module.exports.routes = {
  '/': { view: 'pages/homepage' },

  // Feedback
  '/feedback': { view: 'pages/feedback' },
  'POST /feedback': 'FeedbackController.create',

  // ZIP
  '/location': { view: 'pages/location' },
  'GET /api/location': 'LocationController.find',

  // Videos
  'GET /video/list': 'VideoController.list',
  'GET /video/play/:id': 'VideoController.play',

  // Voting
  'POST /vote': 'VoteController.vote',

  // Analytics
  'GET /analytics': 'VoteController.analytics',
};
