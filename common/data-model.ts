export interface RegionItem {
	name : String;
	id : String;
}

export interface ParkingSpaceItem {
	provice : string, //省份
	city : string,//城市
	district : string, //地区/县
	housingEstate : String,// 小区名称
	detailAddress : String,//具体地址
	price : number,
	community : string,
	rentDays : number,// 租赁天数
	weekDays : number[],//可租赁的工作日
	carParkingNo : string,// 车位编号
	startTime : string, // 每日开始时间
	endTime : string, //每日结束时间
	attachmentList ?: [], //附件照片
}

/**
 * 高得地图定位返回数据
 */
export interface AmapPoiItem {
	name : String;
	desc : String;
	latitude : Number;
	longtitude : Number;
	regeocodeData : RegeoCodeData;


}

export interface RegeoCodeData {
	addressComponent : AddressComponment;
}

export interface AddressComponment {
	adcode : String;
	cityCode : String;
	country : String;
	province ?: String;
	towncode : String;
	township : String;
	district : String;
}