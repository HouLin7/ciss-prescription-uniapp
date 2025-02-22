
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

	validator ?: Function,
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
	msg : string,
	data : Object
}

export interface ApplyRecordItem {
	id : number,
	userId : number,
	healthQuestion : string,
	riskEvaluation : string,
	appVersionCode : string,
	status : string,
	createDateTime : string,
	bodyTestRecords : BodyTestRecords,
	userInfo : UserInfo
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
	vitalCapacityScore : number,//肺活量

	gripPower : number,//握力	
	gripPowerScore : number,//握力得分

	carryPower : number,//背力

	jumpPower : number,//跳跃	
	jumpPowerScore : number,//跳跃

	pushUpCount : number,//俯卧撑
	pushUpCountScore : number,//俯卧撑

	kneelUpCount : number,//跪卧撑

	sitUpCount : number,//仰卧起坐
	sitUpCountScore : number,//仰卧起坐

	sitAndReach : number,//坐位体前屈
	sitAndReachScore : number,//坐位体前屈

	standOnOne : number,//单脚站立
	standOnOneScore : number,//单脚站立

	responseTime : number,//反应时间
	responseTimeScore : number,//反应时间

	testDateTime : string//测试日期

}

export interface RecipeItem {
	id : number,
	applyRecordId : number,
	title : string,
	sportGoal : string,//运动目标
	aerobicExerciseEvents : string,//有氧运动项目

	aerobicExerciseHeartRateRange : string,//最佳心率范围
	aerobicExerciseFrequency : string,  //运动频率
	aerobicExerciseDuration : string, //运动时间

	aerobicExerciseStepParams : string,//运动流程

	isometricExerciseEvents : string,//阻抗项目
	isometricExerciseIntensity : string,//阻抗训练强度
	isometricExerciseFrequency : string, //阻抗训练频率

	createRecipeUserId : number,//开处方专家id
	createDateTime : string,
	otherAerobicExerciseEvent : string

}