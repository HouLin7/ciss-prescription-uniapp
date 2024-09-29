<template>

	<view class="counter">

		<view v-if="hasLogin" style="counter">
			<view style="color: gray; font-size: 22rpx;">城市</view>
			<view class="uni-flex uni-row" style="justify-items: center;">
				<uni-easyinput v-model="city" icon-click="">
					<template #right>
						<image src="/static/location.png" style="height: 60rpx;width: 60rpx;"
							@click="getMyLocation()" />
					</template>
				</uni-easyinput>
			</view>
			<view class="divier"></view>

			<view style="color: gray; font-size: 22rpx;">小区</view>
			<view class="uni-flex uni-row" style="justify-items: center;">
				<uni-easyinput v-model="town" icon-click="">
				</uni-easyinput>
			</view>

			<view class="divier"></view>

			<view style="color: gray; font-size: 22rpx;">车位编号</view>
			<view class="uni-flex uni-row" style="justify-items: center;">
				<uni-easyinput type="text" v-model="parking_no" icon-click="">
				</uni-easyinput>
			</view>

			<view class="divier"></view>

			<uni-section type="line" title="每日可共享时间段" sub-title="备注说明" style="padding-bottom: 10rpx;">

				<view class="uni-flex uni-column" style="justify-items: center;padding-right: 10rpx;">
					<view class="uni-flex uni-row" style="flex: 1; padding-bottom: 10rpx;align-items: center;">
						<view class="uni-list-cell-left">开始时间</view>
						<view class="uni-list-cell-db">
							<picker mode="time" :value="startTime" start="09:00" end="21:01" @change="bindTimeChange">
								<view class="uni-input">{{startTime}}</view>
							</picker>
						</view>
					</view>
					<view class="divier" style="margin-left: 40rpx;"></view>

					<view class="uni-flex uni-row" style="flex: 1; padding-bottom: 10rpx;align-items: center;">
						<view class="uni-list-cell-left">
							结束时间
						</view>
						<view class="uni-list-cell-db">
							<picker mode="time" :value="endTime" start="09:0" end="21:01" @change="bindTimeChange">
								<view class="uni-input">{{endTime}}</view>
							</picker>
						</view>
					</view>
				</view>
			</uni-section>


			<view style="height: 20rpx;" />


			<uni-section type="line" title="可租赁时间周期" sub-title="备注说明" style="padding-bottom: 10rpx;">

				<view class="uni-flex uni-column" style="justify-items: center;padding-right: 10rpx;">
					<view class="uni-flex uni-row" style="flex: 1; padding-bottom: 10rpx;align-items: center;">
						<view class="uni-list-cell-left">
							开始日期
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="selectstartDate" :start="startDate" :end="endDate"
								@change="bindStartDateChange">
								<view class="uni-input">{{selectstartDate}}</view>
							</picker>
						</view>
					</view>

					<view class="divier" style="margin-left: 40rpx;"></view>

					<view class="uni-flex uni-row" style="flex: 1; align-items: center;">
						<view class="uni-list-cell-left">结束日期</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="selectEndDate" :start="startDate" :end="endDate"
								@change="bindEndDateChange">
								<view class="uni-input">{{selectEndDate}}</view>
							</picker>
						</view>
					</view>
				</view>
			</uni-section>




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
	} from 'vuex'
	// import { getLocation } from '../../common/MyCommonUtil';
	import {
		AMapWX
	} from '../../common/amap-wx';
	import {
		amapAppKey
	} from '../../common/constants';
	import {
		AmapPoiItem
	} from '../../common/data-model';
	export default {

		created() {
			this.selectEndDate = getDate("");
			this.selectstartDate = getDate("");
			this.amapPlugin = new AMapWX({
				key: amapAppKey
			});
		},

		data() {
			return {
				amapPlugin: null,
				locationInfo: null,
				isLogined: false,
				city: "", //城市
				town: "", //街道
				HousingEstate: "", //小区
				parking_no: "", //车位编号
				startTime: '09:00',
				endTime: '18:00',
				multiIndex: [0, 0, 0],

				selectstartDate: "",

				selectEndDate: "",
				startDate: getDate('start'),
				endDate: getDate('end'),
			}
		},

		computed: {
			...mapState(['hasLogin'])
		},

		methods: {

			bindEndDateChange: function (e) {
				this.selectEndDate = e.detail.value
			},
			bindStartDateChange: function (e) {
				this.selectstartDate = e.detail.value
			},
			bindTimeChange: function (e) {
				this.time = e.detail.value
			},
			getMyLocation() {
				uni.showLoading({
					title: '获取信息中'
				});

				this.amapPlugin.getRegeo({
					success: (data: AmapPoiItem[]) => {
						console.log(data);
						var addressInfo : AmapPoiItem = data[0];
						// console.log(JSON.stringify(addressInfo.regeocodeData));
						// console.log(JSON.stringify(addressInfo.regeocodeData.addressComponent));
						this.city = addressInfo.regeocodeData.addressComponent.province.toString();
						
						uni.hideLoading();
					},
					fail: (error: { errMsg: string;}) => {
						uni.hideLoading();
						console.log(JSON.stringify(error));
						uni.showToast({
							title: error.errMsg,
						})
					},
				});
				
				// commonUtils.getMyLocation().then((res) => {
				// 	locationInfo = res;
				// 	this.city = res.city;
				// }).catch((e) => {
				// 	uni.showToast({
				// 		icon: "fail",
				// 		title: e.msg,
				// 	})
				// });
			},
			turnLoginPage() {

				uni.navigateTo({
					url: '/pages/login/login'
				})
			},


		}
	}
</script>

<style>
	.divier {
		margin-top: 15rpx;
		margin-bottom: 15rpx;
		background-color: #999999;
		height: 1rpx;
	}

	.counter {
		padding: 15rpx;
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
</style>