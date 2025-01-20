import config from "./env_config";
import store from "@/store/index";
import httpUtils from "@/api/http-utils.js";
export default {

	/**
	 * 
	 * @param {Object} openID
	 * @param {Object} phoneNum
	 */
	saveUser(name, sex, birthday) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/api/api/users/add",
				dataType: 'json',
				method: "POST",
				header: {
					"Authorization": store.getters.token
				},
				data: {
					"name": name,
					"sex": sex,
					"birthday": birthday
				},
				success(response) {
					if (httpUtils.isHttpRspSuccess(response)) {
						resolve(response.data.data);
					} else {
						reject(response.data.msg);
					}
				},
				fail(e) {
					reject(e);
				}

			})
		});
	},

	getUser(userId) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/api/api/users/" + userId,
				dataType: 'json',
				method: "GET",
				header: {
					"Authorization": store.getters.token
				},
				success(response) {
					if (httpUtils.isHttpRspSuccess(response)) {
						resolve(response.data.data);
					} else {
						reject(response.data.msg)
					}
				},
				fail(e) {
					reject(e);
				}

			})
		});
	},


}