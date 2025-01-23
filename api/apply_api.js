import config from "./env_config";
import store from "@/store/index";
import httpUtils from "@/api/http-utils.js";
export default {


	/**
	 * 
	 * @param {Object} openID
	 * @param {Object} phoneNum
	 */
	addApplyRecord(postData) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/api/recipe/apply/record/add",
				dataType: 'json',
				method: "POST",
				header: {
					"Authorization": store.getters.token
				},
				data: postData,
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
	getApplyRecords(params) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/api/recipe/apply/record",
				method: "GET",
				data: params,
				header: {
					"Authorization": store.getters.token
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
	}



}