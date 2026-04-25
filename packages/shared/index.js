const CONSTANTS = {
  PORTS: {
    GATEWAY: 4000,
    MATCH_SERVICE: 4001,
    PLAYER_SERVICE: 4002,
    AI_SERVICE: 4003,
    USER_SERVICE: 4004,
    NOTIFICATION_SERVICE: 4005,
    OLLAMA: 11434
  },
  MATCH_STATUS: {
    UPCOMING: 'upcoming',
    LIVE: 'live',
    FINISHED: 'finished'
  },
  REDIS_CHANNELS: {
    MATCH_EVENTS: 'match-events'
  }
};

const formatters = {
  formatScore: (score) => `${score.home} - ${score.away}`,
  formatDate: (date) => new Date(date).toLocaleDateString(),
  formatTime: (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

module.exports = {
  CONSTANTS,
  formatters
};
