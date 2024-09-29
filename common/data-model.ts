interface RegionItem {
	name : String;
	id : String;
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

interface RegeoCodeData {
	addressComponent : AddressComponment;
}

interface AddressComponment {
	adcode : String;
	cityCode : String;
	country : String;
	province? : String;
	towncode : String;
	township : String;
	district : String;
}