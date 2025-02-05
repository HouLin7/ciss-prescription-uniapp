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

export interface QuestionTypeItem {
	typeTitle : String,
	data : Array<QuestionItem>
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

export interface ApplyRecordItem {
	id : number,
	userId : number,
	healthQuestion : String,
	riskEvaluation : String,
	appVersionCode : String,
	status : String,
	bodyTestRecords : BodyTestRecords
}

export interface BodyTestRecords {
	id : number,
	applyRecordId : number,
	height : number,
	weight : number,
	waist : number,//腰围
	hipline : number,  //臀围
	fatRate : number, //体脂率
	systolicPressure : number,//收缩压
	diastolicPressure : number,//舒张压
	powerCarTestData : number,//功率车
	pulse : number, //脉搏
	vitalCapacity : number,//肺活量
	gripPower : number,//握力
	carryPower : number,//背力
	jumpPower : number,//跳跃
	pushUpCount : number,//俯卧撑
	kneelUpCount : number,//跪卧撑
	sitUpCount : number,//仰卧起坐
	sitAndReach : number,//坐位体前屈
	standOnOne : number,//单脚站立
	responseTime : number,//反应时间
	testDateTime : string//测试日期

}