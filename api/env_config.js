const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080/api'
  },
  production: {
    API_BASE_URL: '/api'
  }
};

export default config[process.env.NODE_ENV];