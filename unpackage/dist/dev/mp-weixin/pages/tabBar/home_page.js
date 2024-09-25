"use strict";
const common_vendor = require("../../common/vendor.js");
const common_MyCommonUtil = require("../../common/MyCommonUtil.js");
const _sfc_main = {
  created() {
    common_MyCommonUtil.CommonUtils.getlocation().then((res) => {
    }).catch((error) => {
      common_vendor.index.showToast({
        title: error
      });
    });
    common_vendor.index.navigateTo({
      url: "/pages/login/login"
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
