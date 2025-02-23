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
				url: "/users/mine/update",
				dataType: 'json',
				method: "POST",
				data: {
					"name": name,
					"sex": sex,
					"birthday": birthday
				},
				success(response) {
					console.log(response);
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
				url: "/users/" + userId,
				dataType: 'json',
				method: "GET",
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