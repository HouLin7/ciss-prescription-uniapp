"use strict";
const common_vendor = require("./vendor.js");
function doGetLocation(resolve, reject) {
  common_vendor.index.getLocation({
    success: (data) => {
      resolve(data);
    },
    fail: () => {
      reject({
        "msg": "获取位置信息失败"
      });
    }
  });
}
function getMyLocation() {
  return new Promise((resolve, reject) => {
    common_vendor.index.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userLocation"] === void 0) {
          common_vendor.index.authorize({
            scope: "scope.userLocation",
            success: () => {
              doGetLocation(resolve, reject);
            },
            fail: () => {
              reject({
                "msg": "用户拒绝授权位置信息"
              });
            }
          });
          return;
        }
        if (res.authSetting["scope.userLocation"]) {
          doGetLocation(resolve, reject);
        } else {
          common_vendor.index.openSetting({
            success: (res2) => {
              if (res2.authSetting && res2.authSetting["scope.userLocation"]) {
                doGetLocation();
              }
            },
            fail: (err) => {
            }
          });
          common_vendor.index.authorize({
            scope: "scope.userLocation",
            success: () => {
              doGetLocation(resolve, reject);
            },
            fail: () => {
            }
          });
        }
      }
    });
  });
}
const CommonUtils = {
  getlocation: getMyLocation()
};
exports.CommonUtils = CommonUtils;
