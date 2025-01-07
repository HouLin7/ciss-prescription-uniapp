<template>
	<view class="uni-flex uni-column" style="padding: 10rpx 15rpx;">
		<view class="uni-flex uni-row" style="justify-content:space-between  ">
			<view class="label-text">位置 </view>
			<view class="uni-text-small">{{`${item.city}${item.district}${item.housingEstate}`}} </view>
		</view>
		<view class="uni-flex uni-row" style="justify-content:space-between  ">
			<view class="label-text">价格 </view>
			<view class="uni-text-small">{{item.price}} 元/月 </view>
		</view>

		<view class="uni-flex uni-row" style="justify-content:space-between  ">
			<view class="label-text">可租天数 </view>
			<view class="uni-text-small">{{item.rentDays}} </view>
		</view>
		
		<view class="uni-flex uni-row" style="justify-content:space-between  ">
			<view class="label-text">每日时间段 </view>
			<view class="uni-text-small">{{`${item.startTime}--${item.endTime}`}}</view>
		</view>
	</view>
</template>

<script lang="ts">	
	import { ParkingSpaceItem } from '../../common/data-model'
	export default {

		props: {
			item: {
				type: Object as () => ParkingSpaceItem,
			}

		},

		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.label-text {
		color: #666;
		font-size: 24rpx;
	}
	.divier {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		background-color: #999999;
		height: 1rpx;
	}
	
</style>