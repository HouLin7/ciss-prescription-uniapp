<template>

	<view class="root-container">
		<view class="search-bar">
			<uni-search-bar placeholder="请输入小区名称"></uni-search-bar>
			<view class="uni-flex uni-row" style="padding-top: 20rpx; align-items: center; background: white">
				<view class="uni-flex uni-row" style="flex: 1; align-items: center;justify-content: center;"
					@click="priceOrderClick">
					<view class="text-label">价格</view>
					<uni-icons size="18" :type="priceIconName" color="#666666"></uni-icons>
				</view>
				<view class="uni-flex uni-row" style="flex: 1;align-items: center;justify-content: center;"
					@click="distanceClick">
					<view class="text-label">距离</view>
					<uni-icons size="18" :type="distanceIconName" color="#666666"></uni-icons>
				</view>
				<view class="uni-flex uni-row" style="flex: 1;justify-content: center;" @click="regionClick">
					<view class="text-label">区域</view>
				</view>
				<view class="uni-flex uni-row" style="flex: 1;justify-content: center;" @click="filterClick">
					<view class="text-label">筛选</view>
				</view>
				<view class="uni-flex uni-row" style="flex: 1;justify-content: center;" @click="changeReviewModel">
					<image v-show="reviewModel==0" src="../../static/icons/item_list_review.png"
						style="width: 30rpx;height: 30rpx;"></image>
					<image v-show="reviewModel==1" src="../../static/icons/map_list_review.png"
						style="width: 30rpx;height: 30rpx;"></image>
				</view>
			</view>


		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="uni-flex uni-row" v-show="isFilterCity" style="height: 600rpx; background-color: white;">
				
				<scroll-view :scroll-y="true" style="height: 600rpx; flex: 1;">
					<uni-list class="uni-list">
						<uni-list-item class="uni-list-cell" v-for="(item,index) in citys" :key="index"
							:title="item['name']" />
					</uni-list>
				</scroll-view>

				<scroll-view :scroll-y="true" style="height: 600rpx; flex: 1;">

					<uni-list-item class="uni-list-cell" v-for="(item,index) in districts" :key="index"
						:title="item['name']" clickable="true" @click="closePopup" />

				</scroll-view>


			</view>

			<view v-show="!isFilterCity" style="height: 600rpx; padding: 15rpx 25rpx;background-color: white;"
				class="uni-flex uni-column">
				<!-- 筛选条件内容 -->
				<view style="height: 20rpx;"></view>
				<view class="title">发布时间</view>
				<radio-group class="uni-list" @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in checkboxItems" :key="item.name">
						<view>
							<radio :value="item.value" :checked="false" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>

				<button class="custom_button_wexin" style="margin-top: 80rpx;" @click="closePopup">确定</button>
			</view>

		</uni-popup>

		<map v-show="reviewModel==1" style="height: 1000rpx; width: 100%;" :markers="allMarkers"
			:latitude="myLocation['latitude']" :longitude="myLocation['longitude']" />

		<uni-list class="search-results" v-show="reviewModel!==1" scroll-y="true">
			<uni-list-item v-for="(item,index) in parkingList" :key="index" @click="parkingItemClick(index,item)"
				showArrow="true" clickable="true">
				<template #header>
					<image src="../../static/uni.png" style="width: 100rpx;height: 100rpx; border-radius: 10rpx;" />
				</template>
				<template #body>

					<view class="uni-flex uni-column" style="margin-left: 10rpx;">
						<view class="text-value"> {{ `${item.district}  ${item.community}` }}</view>

						<view v-show="item.carParkingNo!==undefined" class="uni-flex uni-row">
							<view class="text-label">车位编号 </view>
							<view class="text-value"> {{item.carParkingNo}}</view>
						</view>

						<view class="uni-row uni-flex">
							<view class="text-label">出租价格 </view>
							<view class="text-value"> {{item.price}} 元/日</view>
						</view>
					</view>

				</template>

			</uni-list-item>
		</uni-list>
	</view>

</template>

<script lang="ts">
	import {
		mapState
	} from 'vuex';

	import {
		getMyLocation,
		getCityConfig,
		getPoiInfo
	} from '../../api/location_api';

	import {
		cityList,
		parkingInfoList
	} from '../../mock_data/mock-test-data';
	import { AmapPoiItem, DistrictItem } from '../../common/data-model';
	import { nextTick } from 'vue';

	export default {

		created() {
			setTimeout(() => {
				this.findMySelfLocation();
			},
				1000);
			this.parkingList = parkingInfoList;
		},

		computed: {

			...mapState(["platformInfo"]),

			allMarkers: function () {
				return [this.myselfMarker];
			},

			myselfMarker: function () {
				return {
					...this.myLocation,
					'iconPath': '/static/location.png',
					'title': '我的位置',
				}

			},

			distanceIconName: function () {
				return this.distanceOrderFlag === 0 ? "arrow-up" : "arrow-down";
			},

			priceIconName: function () {
				return this.priceOrderFlag === 0 ? "arrow-up" : "arrow-down";
			},
		},

		data() {
			return {
				checkboxItems: [{
					name: '一天内',
					value: '1day'
				},
				{
					name: '三天内',
					value: '3day',
				},
				{
					name: '七天内',
					value: '3day',
				},
				],

				adCode: "",
				parkingList: parkingInfoList,
				scrollTop: 0,
				priceOrderFlag: 0,
				distanceOrderFlag: 0,
				isFilterPanelVisible: false,
				isFilterCity: false,
				reviewModel: 0,
				myLocation: {
					"longitude": '',
					"latitude": ''
				},
				provices: [],
				citys: [],
				districts: []
			}
		},

		methods: {

			checkboxChange(e) {
				let value = e.detail.value;
			},

			parkingItemClick(index, item) {
					
				uni.navigateTo({
					url: "/pages/parking_item_detail_page/parking_item_detail_page?item=" + encodeURIComponent(JSON.stringify(item)) + "&editFlag=1"
				})

			},

			changeReviewModel() {
				if (this.reviewModel == 0) {
					this.reviewModel = 1;
					this.findMySelfLocation();
				} else {
					this.reviewModel = 0;
				}
			},
			findMySelfLocation() {
				getMyLocation().then((res) => {

					this.myLocation.longitude = res.longitude;
					this.myLocation.latitude = res.latitude;

					getPoiInfo(res.latitude, res.longitude).then(_data => {
						var data = _data as AmapPoiItem[];
						var keyword = data[0].regeocodeData.addressComponent.province;
						if (keyword.includes("北京") || keyword.includes("天津") || keyword.includes("上海")
							|| keyword.includes("重庆")) {
							keyword = data[0].regeocodeData.addressComponent.province;
							getCityConfig(keyword, 2).then((data) => {
								console.log(data);
								let province = data['data']['districts'] as DistrictItem[];
								this.citys = province[0].districts;
								this.districts = province[0].districts[0].districts as DistrictItem[];
							});
						} else {
							keyword = data[0].regeocodeData.addressComponent.city;
							getCityConfig(keyword, 1).then((data) => {
								console.log(data);
								let cityList = data['data']['districts'] as DistrictItem[];
								this.city = cityList;
								this.districts = cityList[0].districts;

							});
						}
					}).catch((error) => {
						console.log(error);
						uni.showToast({
							title: JSON.stringify(error),
							icon: 'error',
						})
					});

				}).catch((error) => {
					uni.showToast({
						title: JSON.stringify(error),
						icon: 'error',
					})
				});
			},


			closePopup() {
				this.$refs.popup.close();
			},

			/**
			 * 
			 */
			filterClick() {

				if (this.isFilterCity === true) {
					this.isFilterCity = false;
				}
				this.$refs.popup.open('bottom');


			},

			distanceClick() {
				if (this.distanceOrderFlag === 0) {
					this.distanceOrderFlag = 1;
				} else {
					this.distanceOrderFlag = 0;
				}
			},

			regionClick() {
				if (this.isFilterCity === false) {
					this.isFilterCity = true;
				}
				this.$refs.popup.open('bottom');

				if (this.citys.length === 0) {
					this.findMySelfLocation();
				}

			},

			priceOrderClick() {
				if (this.priceOrderFlag === 0) {
					this.priceOrderFlag = 1;
				} else {
					this.priceOrderFlag = 0;
				}

			},


		}

	}
</script>


<style>
	.search-bar {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 10rpx 10rpx;
		padding: 10rpx 10rpx;
		background-color: white;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		/* 给搜索栏一个阴影效果 */
	}

	.search-results {
		flex: 1;
		/* 搜索栏的高度 */
		/* padding: 10rpx; */
		overflow-y: auto;
		margin: 10rpx 10rpx;
		/* background-color: #f5f5f5; */
	}

	.root-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		/* 设置页面的高度为全屏 */
	}

	.text-label {
		margin-right: 10rpx;
		font-size: 24rpx;
		color: #666666;
	}

	.text-value {
		font-size: 24rpx;
		color: #333;
	}

	.input-panel {
		align-items: center;
		justify-content: space-between;
		padding-left: 15rpx;
		padding-right: 15rpx;
		padding-bottom: 15rpx;
	}

	.filter-panel {
		position: absolute;
		top: 200rpx;
		width: 100%;
		background-color: white;
		border-top: 1px solid #ccc;
		/* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); */
		z-index: 100;
		height: 0;
		overflow: hidden;
		transition: height 0.3s ease;
		/* 添加高度的平滑过渡 */
	}

	.filter-panel.show {
		height: 300rpx;
		/* 设置展开时的高度 */
	}

	.custom_button_confirm {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 200rpx;
		height: 70rpx;
		border-radius: 10rpx;
		color: white;
		background-color: $uni-color-primary;
	}
</style>