<template>
	<view style="padding-left: 40rpx;padding-right: 40rpx;: center" class="uni-flex uni-column">
		<!-- 		<view class="uni-flex uni-column">
			<view class="flex-item">A</view>
			<view class="flex-item">b</view>
			<view class="flex-item">b</view>
		</view> -->


		<view class="uni-flex uni-row" style="-webkit-justify-content: flex-end;justify-content: flex-end;">
			<image mode="aspectFit"  src="/static/close.png"  @click="handleClose" style="height: 20rpx;width: 20rpx;"/>
			
		</view>
		<view class="uni-flex uni-row" >
						
			<button  size="default" class="uni-bg-blue ">微信一键登录</button>
				
		</view>

	<view class="uni-flex uni-row"  style="un">
			
			<checkbox  color="#0000ff"></checkbox>
			<view>我已同意隐私协议以及用户声明</view>
				
		</view>
		

		<view class="uni-flex uni-row">
			<view class="text" style="padding-left: 30rpx;" />
			<view class="text" style="-webkit-flex: 1;flex: 1;">横向布局-平均分布</view>
			<view class="text" style="-webkit-flex: 1;flex: 1;">横向布局-平均分布</view>
		</view>

		<view>
			<view class="uni-flex uni-row"
				style="-webkit-justify-content: space-between;justify-content: space-between;">
				<view class="text">横向布局-两端对齐</view>
				<view class="text">横向布局-两端对齐</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			type: {
				type: String,
				default: '222'
			}
		},

		methods: {
			
				handleClose(){
					uni.navigateBack();
				}

		}
	}
</script>

<style>
	.center {
		padding: 100rpx;
	}
</style>