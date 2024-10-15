<template>
	<view class="tabs">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index"
				@click="ontabtap">
				<text class="uni-tab-item-title"
					:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<view class="line-h"></view>
		<view style="flex: 1;">
			<uni-list scroll-y="true">
				<uni-list-item v-for="(item,index) in dataList" :key="index" showArrow="true">
					<template #body>
						<order-list-item :item="item" style="width: 100%;"></order-list-item>
					</template>
					<!-- <view class="divier" style="margin: 0rpx 10rpx;"></view> -->
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import orderListItem from '../order-list-item/order-list-item.vue';

	export default {

		components: {
			orderListItem
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
					name: '待支付',
					id: 'guanzhu'
				}, {
					name: '已支付',
					id: 'tuijian'
				}, {
					name: '已完成',
					id: 'tuijian'
				}, ],
				dataList: [{
						provice: "北京",
						city: "北京",
						district: "大兴区",
						price: "800",
						housingEstate: "郁花园一里",
						carParkingNo: '9d8400',
						startTime: '09:00',
						endTime: '19:00',
						rentDays: 90, // 租赁天数
						weekDays: [1, 2, 3], //可租赁的工作日
					},
					{
						provice: "北京",
						city: "北京",
						district: "大兴区",
						price: "800",
						housingEstate: "郁花园一里",
						carParkingNo: '9d8400',
						startTime: '09:00',
						endTime: '19:00',
						rentDays: 90, // 租赁天数
						weekDays: [1, 2, 3], //可租赁的工作日
					},
				],

			}
		},
		methods: {
			switchTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
		}
	}
</script>

<style>
	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifndef APP-PLUS */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 750rpx;
		/* #ifdef H5 */
		width: 100%;
		/* #endif */
		height: 80rpx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}

	.line-h {
		height: 1rpx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		display: inline-block;
		flex-wrap: nowrap;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 26rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		white-space: nowrap;
	}

	.uni-tab-item-title-active {
		color: #007AFF;
	}
</style>