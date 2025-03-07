import store from "@/store/index";
import httpUtils from "@/api/http-utils.js";
export default {
	/**
	 * 	 获取匹配模版
	 */
	getCustomTemplate(applyRecordId) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: "/recipe/custom-template/matchByApplyRecord",
				method: "get",
				data: {
					'applyRecordId': applyRecordId
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
	
	searchCustomTemplate(params) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: "/recipe/custom-template/search",
				method: "get",				
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

}