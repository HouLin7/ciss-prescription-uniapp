'use stric'
import {
	AMapWX
} from '../common/amap-wx';
import {
	amapWebApiKey,
	amapAppKey
} from '../common/constants';

import { isWexinRuntime } from '../common/util';

/**
 * 搜索基础信息
 * @param {string} keywords
 * @param {string} subdistrict
 */
export function getCityConfig(keywords, subdistrict) {

	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://restapi.amap.com/v3/config/district?keywords=${keywords}&subdistrict=${subdistrict}&key=
				${amapWebApiKey}`,
			success(data) {
				resolve(data);
				console.log(data)
			},

			fail(e) {
				reject(e);
				console.log(e);
			}

		})
	});
}


/**
 * @param {Object} resolve
 * @param {Object} reject
 */


function doGetLocation(resolve, reject) {
	uni.getLocation({
		type: 'gcj02',
		success: (data) => {
			resolve(data);
		},
		fail: () => {
			reject({
				'msg': '获取位置信息失败'
			})
		}
	})
}

export function getMyLocation() {
	return new Promise((resolve, reject) => {		
		if (!isWexinRuntime()) {
			let testData = {
				"latitude": 39.88452121310764,
				"longitude": 116.42566053602431										
			};
			resolve(testData);
			return;
		}
		
		uni.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userLocation'] === undefined) {

					uni.authorize({
						scope: 'scope.userLocation',
						success: () => {
							doGetLocation(resolve, reject)
						},
						fail: () => {
							reject({
								"msg": '用户拒绝授权位置信息'
							})
						}
					})

					return;
				}
				if (res.authSetting['scope.userLocation']) {
					doGetLocation(resolve, reject)
				} else {
					uni.openSetting({
						success: (res) => {
							if (res.authSetting && res.authSetting[
									'scope.userLocation']) {
								doGetLocation(resolve, reject)
							}
						},
						fail: () => {}
					})

					uni.authorize({
						scope: 'scope.userLocation',
						success: () => {
							doGetLocation(resolve, reject)
						},
						fail: () => {

						}
					})
				}
			},
			fail: (e) => {
				reject(e);
			}
		});


	})
}


/**
 *  
 * @param {number} latitude 
 * @param {number} longitude 
 * @return 
 */
export function getPoiInfo(latitude, longitude) {
	return new Promise((resolve, reject) => {
		const amapPlugin = new AMapWX({
			key: amapAppKey
		});
		amapPlugin.getRegeo({
			location: `${longitude},${latitude}`,
			success: (data) => {
				console.log(data);
				// var addressInfo = data[0];
				resolve(data);
			},
			fail: (error) => {
				reject(error);
				console.log(JSON.stringify(error));
			},
		});
	});


}