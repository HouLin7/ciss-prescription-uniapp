import config from "./env_config";
import store from "@/store/index";
import httpUtils from "@/api/http-utils.js";
export default {

	/**
	 * 	 
	 */
	addRecipe(postData) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/recipe/record/add",
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

	/**
	 * 全局搜索申请记录
	 * @param {Object} params
	 */
	searchApplyRecords(params) {
		console.log("login token : " + store.getters.token);
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/recipe/apply/record/search",
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
	},

	getMyRecipeList(params) {
		console.log("login token : " + store.getters.token);
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/recipe/apply/record",
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
	},

	/**
	 * @param {Object} applyRecordId  申请记录ID
	 */
	seachRecipeRecords(applyRecordId, createRecipeUserId) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/recipe/record/search",
				method: "GET",
				header: {
					"Authorization": store.getters.token
				},
				data: {
					"applyRecordId": applyRecordId,
					"createRecipeUserId": createRecipeUserId
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

	/**
	 * 获取模版列表	 
	 */
	getRecipeTemplateList() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: config['API_BASE_URL'] + "/recipe/template",
				method: "GET",
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