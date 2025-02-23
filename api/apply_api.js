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
				url: "/recipe/apply/record/add",
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

	searchApplyRecordsByKeyword(keyword, status) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: "/recipe/apply/record/searchByKeyword",
				method: "GET",
				data: {
					"status": status,
					"keyword": keyword,
				},
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
	 * 全局搜索申请记录
	 * @param {Object} params
	 */
	searchApplyRecords(pageIndex, pageSize, status) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: "/recipe/apply/record/search",
				method: "GET",
				data: {
					"status": status,
					"pageIndex": pageIndex,
					"pageSize": pageSize,
				},
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
	getMyApplyRecords(params) {
		console.log("login token : " + store.getters.token);
		return new Promise((resolve, reject) => {
			uni.request({
				url: "/recipe/apply/record",
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

	getApplyRecordDetail(id) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: "/recipe/apply/record/" + id,
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