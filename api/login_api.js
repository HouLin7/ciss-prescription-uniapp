import baseUrl from "./env_config";
export default {

	login(code) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + "/login"
			})
		});
	},

	getCaptcha() {
		return new Promise((resolve, reject) => {

		});
	},


}