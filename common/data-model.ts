export interface RegionItem {
	name : String;
	id : String;
}



export interface ParkingSpaceItem {
	provice : string, //省份
	city : string,//城市
	district : string, //地区/县
	housingEstate : string,// 小区名称
	detailAddress : string,//具体地址
	price : number,
	community : string,
	rentDays : number,// 租赁天数
	weekDays : number[],//可租赁的工作日
	carParkingNo : string,// 车位编号
	startTime : string, // 每日开始时间
	endTime : string, //每日结束时间
	attachmentList ?: [], //附件照片
	userId ?: string,
	createTime ?: string,
	updateTime ?: string,


}

/**
 * 高得地图定位返回数据
 */
export interface AmapPoiItem {
	name : string;
	desc : string;
	latitude : number;
	longtitude : number;
	regeocodeData : RegeoCodeData;


}

export interface RegeoCodeData {
	addressComponent : AddressComponment;
}

export interface AddressComponment {
	adcode : string;
	city : string;
	cityCode : string;
	country : string;
	province : string;
	towncode : string;
	township : string;
	district : string;
}

/**
 *  高德地图行政级区域
 */
export interface DistrictItem {
	citycode : string,
	adcode : string,
	name : string,
	center : string,
	level : string,
	districts : DistrictItem[]
}

export interface QuestionItem {
	/**
	 * 问题内容
	 */
	title : String,
	answers : Array<string>,
	selectIndexSet : Array<number>,
	isSingleChoise : boolean,
}

export interface LableInputDataItem {
	/**
	 * 数值属性
	 */
	name : String,
	/**
	 * 单位名称
	 */
	unit : String,
	/**
	 * 数值
	 */
	value : number,
}

export interface UserInfo {
	id : number,
	name : String,
	sex : number,
	birthday : String,
	phoneNumber : String,
	openId : String,
	roleFlag : number,

}

export interface LoginToken {
	token : String,
	newUserFlag : number,
	user : UserInfo,
}

export interface UniHttpResponse {
	data : BaseHttpRsp,
	errMsg : String,
	statusCode : number,
	header : Object,
}

export interface BaseHttpRsp {
	code : number,
	msg : String,
	data : Object
}