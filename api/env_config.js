const config = {
  development: {
    API_BASE_URL: 'https://api.test.example.com'
  },
  production: {
    API_BASE_URL: 'https://api.example.com'
  }
};

export default config[process.env.NODE_ENV];