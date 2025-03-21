const config = {
	development: {
		API_BASE_URL: 'http://localhost:8080/api'
		// API_BASE_URL: 'http://175.27.132.60/api'
		// API_BASE_URL: 'http://192.168.31.120:8080/api'		
	},
	production: {
		API_BASE_URL: '/api'
	}
};

export default config[process.env.NODE_ENV];