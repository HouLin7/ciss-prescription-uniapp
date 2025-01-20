const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080'
  },
  production: {
    API_BASE_URL: 'https://api.example.com'
  }
};

export default config[process.env.NODE_ENV];