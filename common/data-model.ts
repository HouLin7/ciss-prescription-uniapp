export interface RegionItem {
	name : String;
	id : String;
}

export interface ParkingItem{
	provice:string, //省份
	city: string,//城市
	district:string,
	price: number,
	community: string,
	startDate: string,
	endDate: string,
	carParkingNo: string,
	startTime: string,
	endTime: string,
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
	province? : String;
	towncode : String;
	township : String;
	district : String;
}