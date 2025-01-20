import config from "./env_config";
import httpUtils from "@/api/http-utils.js";
export default {
	/**
	 * 
	 * @param {Object} openID
	 * @param {Object} phoneNum
	 */
	loginByWx(openID, phoneNum) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/api/auth/login/weixin",
				dataType: 'json',
				method: "POST",
				data: {
					"phone": phoneNum,
					"openId": openID
				},
				success(response) {
					if (httpUtils.isHttpRspSuccess(response)) {
						resolve(response.data.data)
					} else {
						uni.showToast({
							title:response.data.msg
						})						
					}
				},
				fail(e) {
					reject(e);
				}

			})
		});
	},

	getCaptcha() {
		return new Promise((resolve, reject) => {

		});
	},




}