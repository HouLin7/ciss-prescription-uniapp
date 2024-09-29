"use strict"
function doGetLocation(resolve, reject) {

	uni.getLocation({
		type:'gcj02',
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
						fail: (err) => {}
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