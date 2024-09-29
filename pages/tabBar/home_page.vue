<template>

	<view class="root-container">
		<view v-show="isFilterCity" class="filter-panel">
			<view class="uni-flex uni-row">
				<view class="uni-flex uni-column" style="flex: 1;">

					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
						@scrolltolower="lower" @scroll="scroll">
						<view v-for="(item,index) in provices" :key="index">
							{{item}}
						</view>
					</scroll-view>


				</view>
				<view class="uni-flex uni-column" style="flex: 2;">
					123123sdfsdfds
				</view>
			</view>
		</view>
		<view class="uni-flex uni-column" style="padding: 20rpx;background-color: white;height: 100vh;">
			<view class="uni-flex uni-row">
				<uni-easyinput class="uni-list-cell-db" placeholder="请输入小区名称" suffix-icon="search" icon-click="" />
			</view>
			<view style="height: 10rpx;"></view>

			<view class="uni-flex uni-row" style="padding: 20rpx; align-items: center;">
				<view class="uni-flex uni-row" style="row;flex: 1; align-items: center;" @click="priceOrderClick">
					<view class="text_label">价格</view>
					<uni-icons size="18" :type="priceIconName" color="#666666"></uni-icons>
				</view>
				<view class="uni-flex uni-row" style="flex: 1;" @click="distanceClick">
					<view class="text_label">距离</view>
				</view>
				<view class="uni-flex uni-row" style="flex: 1;" @click="regionClick">
					<view class="text_label">区域</view>
				</view>
				<view class="uni-flex uni-row" style="flex: 1;" @click="filterClick">
					<view class="text_label">筛选</view>
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

				<view v-show="!isFilterCity" style="height: 600rpx; background-color: white;"
					class="uni-flex uni-column">
					<!-- 筛选条件内容 -->
					<text>条件1</text>
					<text>条件2</text>
					<text>条件3</text>
				</view>

			</uni-popup>

			<map style="height: 1000rpx; width: 100%;" :markers="allMarkers" :latitude="myLocation['latitude']" :longitude="myLocation['longitude']" />
		</view>
	</view>

</template>

<script>
	import {
		getMyLocation
	} from '../../common/my-common-utisl';
	import mockData from '../../mock_data/mock-test-data';

	export default {

		created() {
			console.log('created');
			setTimeout(()=>{
					this.findMySelfLocation();		
				},
			1000);				
		},

		computed: {
			
			allMarkers: function(){
				return [this.myselfMarker];
			},
			
			myselfMarker: function(){	
					return {
						...this.myLocation,
						'iconPath':'/static/location.png',
						'title' :'我的位置',
					}
				
			},
			
			priceIconName: function() {
				return this.priceOrderFlag === 0 ? "arrow-up" : "arrow-down";
			},
		},

		data() {
			return {
				scrollTop: 0,
				priceOrderFlag: 0,
				distanceOrderFlag: 0,
				isFilterPanelVisible: false,
				isFilterCity: false,
				myLocation: {"longitude":null,"latitude":null},
				provices: mockData.cityList.map(currVaue => currVaue.name),
			}
		},

		methods: {

			findMySelfLocation(){
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
				this.$refs.popup.open();
			},
			
			distanceClick(){
				console.log("distanceClick");												
			},
			
			regionClick() {
				if (this.isFilterCity == true) {
					this.isFilterCity = false;
				} else {
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
	.root-container {
		position: relative;
	}

	.text_label {
		font-size: 24rpx;
		color: #666666;
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