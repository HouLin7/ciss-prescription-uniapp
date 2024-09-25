<template>
	<view class="uni-flex,uni-column">
		<view class="uni-flex,uni-row,input-panel">
			<text> 位置:</text>
			<input class="uni-input" placeholder="" />
		</view>
		<view class="uni-flex,uni-row,input-panel">
			<text> 费用:</text>
			<input class="uni-input" placeholder="" />
		</view>
		<map style="width: 100%;height: 900rpx;"></map>

	</view>
</template>

<script>
	import MyCommonUtil from '../../common/MyCommonUtil'
	export default {

		created() {

			MyCommonUtil.getlocation().then((res) => {

			}).catch((error) => {
				uni.showToast({
					title: error
				})
			});
			
			uni.navigateTo({
				url: "/pages/login/login"
			});
		}

		

	}
</script>


<style>
	.input-panel {
		align-items: center;
		justify-content: space-between;
		padding-left: 15rpx;
		padding-right: 15rpx;
		padding-bottom: 15rpx;
	}
</style>