export default {
	/**
	 * 判断网络请求返回数据是否成功相应 
	 */
	isHttpRspSuccess(uniRsp) {
		if (uniRsp.statusCode === 200) {
			if (uniRsp.data.code == 200) {
				return true;
			}
			return false;
		} else {
			return false;
		}
	}

}