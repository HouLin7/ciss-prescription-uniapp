<template>

	<view class="counter">
		<view v-if="hasLogin">

			<uni-section type="line" title="位置信息" class="my-uni-section">

				<view class="uni-flex" style="align-items: center;padding: 0rpx 20rpx; ">
					<view class="label-text">所在城市</view>
					<view style="width: 10rpx;"></view>
					<picker style="flex: 1;" mode="multiSelector" :range="cityRange" @change="onPickerChange"
						@columnchange="onColumnChange">
						<view class="uni-flex picker" style="justify-content: space-between;">
							<view>
								{{currentSelection.province}} {{currentSelection.city}} {{currentSelection.area}}
							</view>
							<!-- <view class="arrow-down" /> -->
							<uni-icons type="arrowdown"></uni-icons>
						</view>
					</picker>
				</view>

				<view style="height: 10rpx;" />

				<view class="uni-flex" style="align-items: center;padding-left: 20rpx;padding-right: 20rpx; ">
					<view class="label-text">所在小区</view>
					<view style="width: 10rpx;"></view>
					<view class="uni-flex uni-row picker"
						style="justify-content: flex-end; justify-items: center; flex: 1;" @click="chooseLocation">
						<view>{{district}}</view>
						<image mode="aspectFit" src="/static/location.png" style="height: 40rpx;width: 40rpx ;" />
					</view>
				</view>
				<view style="height: 10rpx;" />
				<view class="uni-flex" style="align-items: center;padding-left: 20rpx;padding-right: 20rpx; ">
					<view class="label-text">详细地址</view>
					<view style="width: 10rpx;"></view>
					<view class="uni-flex uni-row" style="justify-items: center; flex: 1;">
						<uni-easyinput v-model="detailAddress" placeholder="楼号 单元 ">
						</uni-easyinput>
					</view>
				</view>
				<view style="height: 20rpx;" />
			</uni-section>

			<!-- <view style="height: 10rpx;" /> -->

			<uni-section type="line" title="车位信息" class="my-uni-section">

				<view class="uni-flex" style="justify-content: space-between; align-items: center;padding-left: 20rpx;">

					<view class="label-text" style="margin-right: 10rpx; width: 120rpx;">充电桩</view>

					<radio-group @change="chargeCheckboxChange"
						style=" margin-right: 10rpx; justify-content: flex-start;">
						<radio value="1" :checked="canChargeBattery==1">有充电桩</radio>
						<radio value="0" :checked="canChargeBattery==0" style="margin-left: 30rpx;">无充电桩</radio>
					</radio-group>

				</view>

				<view style="height: 15rpx;" />

				<view class="uni-flex"
					style="justify-content: flex-start; align-items: center;padding-left: 20rpx;padding-right: 20rpx; ">

					<view class="label-text">出租价格</view>
					<view style="width: 10rpx;" />
					<uni-easyinput type="number" v-model="priceUnit" style="width: 100rpx;" />
					<view style="width: 10rpx;" />
					<text>元/月</text>
				</view>
				<view style="height: 20rpx;" />
			</uni-section>

			<!-- <view style="height: 10rpx;" /> -->

			<uni-section type="line" title="工作日可共享时间段" class="my-uni-section">

				<view class="uni-flex uni-row" style="justify-content: center;padding-left: 30rpx;">
					<checkbox-group @change="chargeCheckboxChange">
						<label>
							<checkbox value="1" :checked="weekDayList.has(1)">周一</checkbox>
						</label>

						<label>
							<checkbox value="2" :checked="weekDayList.has(2)">周二</checkbox>
						</label>
						<label>
							<checkbox value="3" :checked="weekDayList.has(3)">周三</checkbox>
						</label>
						<label>
							<checkbox value="4" :checked="weekDayList.has(4)">周四</checkbox>
						</label>
						<label>
							<checkbox value="5" :checked="weekDayList.has(5)">周五</checkbox>
						</label>
					</checkbox-group>
				</view>

				<view style="height: 15rpx;" />
				<view class="uni-flex uni-row" style="justify-items: center;padding: 0rpx 20rpx">

					<view class="label-text uni-flex" style="align-items: center; margin-right: 10rpx;">时间段</view>


					<view class="uni-flex uni-row"
						style="padding: 0rpx 40rpx;justify-content: space-between;flex: 1;align-items: center;">
						<view style="flex: 3;">
							<picker mode="time" :value="startTime" start="09:00" end="21:01"
								@change="bindStartTimeChange">
								<view class="picker">{{startTime}}</view>
							</picker>
						</view>
						<view style="flex:2; display: flex; justify-content: center; align-items: center;">--</view>

						<view style="flex: 3;">
							<picker mode="time" :value="endTime" start="09:0" end="21:01" @change="bindEndTimeChange">
								<view class="picker">{{endTime}}</view>
							</picker>
						</view>
					</view>

				</view>

				<view style="height: 15rpx;" />
				<view class="uni-flex uni-row" style="margin-left: 20rpx; align-items: center;">
					<view class="label-text" style="margin-right: 20rpx;">可租月数</view>
					<uni-easyinput type="number" placeholder="不少于1个月"></uni-easyinput>
					<view style="flex: 1;" />
				</view>
				<view style="height: 20rpx;" />
			</uni-section>


			<!-- 	<uni-section type="line" title="可租赁时间周期" class="my-uni-section">

				<view class="uni-flex uni-column" style="justify-items: center;padding-right: 10rpx;">
					<view class="uni-flex uni-row" style="flex: 1; padding-bottom: 10rpx;align-items: center;">
						<view class="uni-list-cell-left label-text">开始日期</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="selectstartDate" :start="startDate" :end="endDate"
								@change="bindStartDateChange">
								<view class="uni-input">{{selectstartDate}}</view>
							</picker>
						</view>
					</view>

					<view class="uni-flex uni-row" style="flex: 1; align-items: center;">
						<view class="uni-list-cell-left label-text">结束日期</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="selectEndDate" :start="startDate" :end="endDate"
								@change="bindEndDateChange">
								<view class="uni-input">{{selectEndDate}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view style="height: 20rpx;" />
			</uni-section> -->

			<uni-section type="line" title="车位照片" class="my-uni-section">
				<view class="uni-flex uni-column" style="padding: 0 20rpx;">
					<uni-file-picker @select="select" limit="9" file-mediatype="image" title="最多选择9张"
						file-extname="png,jpg">
					</uni-file-picker>
					<view style="height: 10rpx;" />
				</view>

			</uni-section>

			<button type="primary" size="default" style="margin-top: 10rpx;" @click="postInfo">发布信息</button>
		</view>

		<view v-if="!hasLogin" style="display: flex;flex-direction: column;padding-top: 20rpx;align-items: center;">

			<view style="height: 200rpx;"></view>
			<image src="/static/logo.png" style="height: 150rpx;width: 150rpx;"></image>
			<view style="height: 150rpx;"></view>
			<text>登陆后才可以发布</text>
			<view style="height: 10rpx;"></view>
			<button type="primary" style="width: 300rpx;" @click="turnLoginPage">登陆</button>

		</view>



	</view>
</template>

<script lang="ts">
	import { cityList, areaList, provinceList } from '../../mock_data/mock-test-data';

	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 10;
		} else if (type === 'end') {
			year = year + 10;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}

	import {
		mapState
	} from 'vuex';
	import {
		AMapWX
	} from '../../common/amap-wx';
	import {
		amapAppKey
	} from '../../common/constants';
	import {
		AmapPoiItem, ParkingSpaceItem
	} from '../../common/data-model';
	export default {

		onLoad() {
			this.selectEndDate = getDate("");
			this.selectstartDate = getDate("");
			this.amapPlugin = new AMapWX({
				key: amapAppKey
			});
		},

		props: {

			postParkingItem: {
				type: Object as () => ParkingSpaceItem,
				default: null,
			}

		},

		data() {
			return {
				// 选项数组
				options: ['选项1', '选项2', '选项3', '选项4'],
				// 当前选中的索引
				selectedIndex: 0,
				priceUnit: 0,
				amapPlugin: null,
				locationInfo: null,
				isLogined: false,
				city: "", //城市
				district: "", //行政区
				detailAddress: "",
				HousingEstate: "", //小区
				parking_no: "", //车位编号
				startTime: '09:00',
				endTime: '18:00',
				multiIndex: [0, 0, 0],

				weekDayList: new Set([1, 2, 3, 4, 5]),
				canChargeBattery: '0',
				selectstartDate: "",
				longitude: 0,
				latitude: 0,
				selectEndDate: "",
				startDate: getDate('start'),
				endDate: getDate('end'),
				selectedIndexes: [0, 0, 0], // 选择的省市区索引
				currentSelection: {
					province: '',
					city: '',
					area: ''
				},
			}
		},

		watch: {
			// canChargeBattery: function (newVal) {
			// uni.showToast({
			// 	title: `${newVal}`,
			// })
			// },
		},
		computed: {
			...mapState(['hasLogin']),
			cityRange: function () {
				var result = [[...provinceList.map((e) => e.name)], [...cityList.map((e) => e.name)], [...areaList.map((e) => e.name)]];
				return result;
			}
		},

		methods: {


			select(e) {
				console.log('选择文件：', e)
			},

			postInfo() {

				uni.showToast({
					title: "我要发布信息",
				})
			},

			chargeCheckboxChange: function (e : { "detail" : { "value" : [] } }) {
				this.weekDayList.add(e.detail.value[0]);
			},

			weekDayCheckboxChange: function (e : { "detail" : { "value" : [] } }) {
				if (e.detail.value.length === 0) {
					this.canChargeBattery = '0';
				} else {
					this.canChargeBattery = '' + e.detail.value[0];
				}
			},

			bindEndDateChange: function (e) {
				this.selectEndDate = e.detail.value
			},
			bindStartDateChange: function (e) {
				this.selectstartDate = e.detail.value
			},
			bindStartTimeChange: function (e) {
				this.startTime = e.detail.value
			},
			bindEndTimeChange: function (e) {
				this.endTime = e.detail.value
			},

			chooseLocation() {
				uni.chooseLocation({
					success: (data) => {
						this.latitude = data.latitude;
						this.longitude = data.longitude;
						console.log(JSON.stringify(data));
					}
				})
			},

			getMyLocation() {
				uni.showLoading({
					title: '获取位置信息中'
				});

				this.amapPlugin.getRegeo({
					success: (data : AmapPoiItem[]) => {
						console.log(data);
						var addressInfo : AmapPoiItem = data[0];
						if (addressInfo.regeocodeData.addressComponent.cityCode)
							this.city = addressInfo.regeocodeData.addressComponent.province.toString();
						this.district = addressInfo.regeocodeData.addressComponent.district.toString();
						uni.hideLoading();
					},
					fail: (error : { errMsg : string; }) => {
						uni.hideLoading();
						console.log(JSON.stringify(error));
						uni.showToast({
							title: error.errMsg,
						})
					},
				});
			},
			turnLoginPage() {

				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

			// 监听 picker 的选择
			onPickerChange(e) {
				const val = e.detail.value;
				this.selectedIndexes = val;
				this.updateCurrentSelection();
			},

			// 更新当前的省市区显示
			updateCurrentSelection() {
				const provinceIndex = this.selectedIndexes[0];
				const cityIndex = this.selectedIndexes[1];
				const areaIndex = this.selectedIndexes[2];

				this.currentSelection.province = this.cityRange[0][provinceIndex];
				this.currentSelection.city = this.cityRange[1][cityIndex];
				this.currentSelection.area = this.cityRange[2][areaIndex];
			},

			// 监听 picker 列改变
			onColumnChange(e) {
				const { column, value } = e.detail;
				if (column === 0) { // 当省份列发生变化时
					const selectedProvince = this.provinces[value];
					this.range[1] = selectedProvince.cities.map(city => city.name); // 更新城市列
					this.range[2] = selectedProvince.cities[0].areas; // 更新区列为第一城市的区
					this.selectedIndexes[0] = value;
					this.selectedIndexes[1] = 0;
					this.selectedIndexes[2] = 0;
				} else if (column === 1) { // 当城市列发生变化时
					const selectedProvinceIndex = this.selectedIndexes[0];
					const selectedCity = this.provinces[selectedProvinceIndex].cities[value];
					this.range[2] = selectedCity.areas; // 更新区列
					this.selectedIndexes[1] = value;
					this.selectedIndexes[2] = 0;
				}
			}


		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';

	.my-uni-section {
		border: 1px solid #ddd;
		border-radius: 10rpx;
	}

	.label-text {
		color: $uni-text-color;
		font-size: 24rpx;
	}

	.divier {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		background-color: #999999;
		height: 1rpx;
	}

	.counter {
		padding: 0rpx 15rpx;
		display: flex;
		flex-direction: column;
	}

	.picker-view {
		width: 750rpx;
		height: 600rpx;
		margin-top: 20rpx;
	}

	.item {
		line-height: 100rpx;
		text-align: center;
	}

	.picker {
		padding-left: 15rpx;
		padding-right: 15rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 8rpx;
	}

	.arrow-down {
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid #666;
	}
</style>