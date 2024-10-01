<template>

	<view class="root-container">
		<view class="search-bar">	
				<uni-easyinput placeholder="请输入小区名称" suffix-icon="search" icon-click="" />
				<view class="uni-flex uni-row"
					style="padding-top: 20rpx; align-items: center; background: white">
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
				<!-- 筛选条件内容 -->
				<scroll-view :scroll-y="true" style="height: 600rpx; flex: 1;">
					<uni-list class="uni-list">
						<uni-list-item class="uni-list-cell" v-for="(item,index) in provices" :key="index"
							:title="item" />
					</uni-list>
				</scroll-view>

				<scroll-view :scroll-y="true" style="height: 600rpx; flex: 1;">
					<uni-list class="uni-list">
						<uni-list-item class="uni-list-cell" v-for="(item,index) in provices" :key="index"
							:title="item" />
					</uni-list>
				</scroll-view>

				<scroll-view :scroll-y="true" style="height: 600rpx; flex: 1;">
					<uni-list class="uni-list">
						<uni-list-item class="uni-list-cell" v-for="(item,index) in provices" :key="index"
							:title="item" />
					</uni-list>
				</scroll-view>
			</view>

			<view v-show="!isFilterCity" style="height: 600rpx; background-color: white;" class="uni-flex uni-column">
				<!-- 筛选条件内容 -->
				<text>条件1</text>
				<text>条件2</text>
				<text>条件3</text>
			</view>

		</uni-popup>

		<map v-show="reviewModel==1" style="height: 1000rpx; width: 100%;" :markers="allMarkers"
			:latitude="myLocation['latitude']" :longitude="myLocation['longitude']" />

		<uni-list class="search-results" v-show="reviewModel!==1" scroll-y="true">
			<uni-list-item v-for="(item,index) in parkingList" :key="index" @click="parkingItemCLick(index,item)"
				showArrow="true">
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

<script>
	import {
		getMyLocation
	} from '../../common/my-common-utisl';
	import {
		cityList,
		parkingInfoList
	} from '../../mock_data/mock-test-data';

	export default {

		onReady() {
			setTimeout(() => {
					if (this.reviewModel == 1) {
						this.findMySelfLocation();
					}
				},
				1000);
			this.parkingList = parkingInfoList;
		},

		computed: {

			allMarkers: function() {
				return [this.myselfMarker];
			},

			myselfMarker: function() {
				return {
					...this.myLocation,
					'iconPath': '/static/location.png',
					'title': '我的位置',
				}

			},

			distanceIconName: function() {
				return this.distanceOrderFlag === 0 ? "arrow-up" : "arrow-down";
			},

			priceIconName: function() {
				return this.priceOrderFlag === 0 ? "arrow-up" : "arrow-down";
			},
		},

		data() {
			return {
				parkingList: parkingInfoList,
				scrollTop: 0,
				priceOrderFlag: 0,
				distanceOrderFlag: 0,
				isFilterPanelVisible: false,
				isFilterCity: false,
				reviewModel: 0,
				myLocation: {
					"longitude": null,
					"latitude": null
				},
				provices: cityList.map(currVaue => currVaue.name),
			}
		},

		methods: {

			parkingItemCLick(index, item) {

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

				}).catch((error) => {
					uni.showToast({
						title: JSON.stringify(error),
						icon: 'error',
					})
				});
			},

			filterClick() {
				if (this.isFilterCity === true) {
					this.isFilterCity = false;
				}
				this.$refs.popup.open();
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
				this.$refs.popup.open();

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
</style>