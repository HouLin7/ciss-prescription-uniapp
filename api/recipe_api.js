import store from "@/store/index";
import httpUtils from "@/api/http-utils.js";
export default {

	/**
	 * 	 开方接口
	 */
	addRecipe(postData) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: "/recipe/record/add",
				dataType: 'json',
				method: "POST",
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
				url: "/recipe/apply/record/search",
				method: "GET",
				data: params,
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
				url: "/recipe/apply/record",
				method: "GET",
				data: params,
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
				url: "/recipe/record/search",
				method: "GET",
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
	getRecipeTemplateList(requestData) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: "/recipe/template",
				method: "GET",
				data: requestData,
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