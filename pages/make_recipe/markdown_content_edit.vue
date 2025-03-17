<template>

	<view class="container">
		<scroll-view scroll-y="true" style="flex: 1; max-height: 85vh;">
			<view style="height: 20rpx;"></view>
			<view class="card">
				<textarea class="custom-textarea" style="margin-left: 10rpx;" placeholder="请输入" type="text"
					v-model="markdownContent" auto-height />
			</view>
		</scroll-view>
		<button class="next-button" @click="handleMarkdownEdit">保存</button>
	</view>

</template>

<script lang="ts">
	import { ApplyRecordItem, CustomTemplate, RecipeItem, TemplateFieldItem, UserInfo } from '../../common/data-model';
	import { calculateAge } from '../../common/util';
	import { dateUtils } from '../../common/util';

	import { marked } from 'marked';

	import { encodeBase64Modern, decodeBase64Modern } from "@/utils/base64.js";
	export default {

		onLoad(params : Map<string, string>) {
			this.markdownContent = decodeURIComponent(params["markdown"]);
		},

		data() {
			return {
				markdownContent: "",
			}
		},
		methods: {
			handleMarkdownEdit() {																	
				uni.setStorageSync("fromMakedownEditPage",this.markdownContent);
				uni.navigateBack();
			},			
		},

	}
</script>

<style lang="scss">
	p {
		font-size: 26rpx;
	}

	.nav-bar {
		height: 44px;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;
	}

	.title {
		/* font-size: 26rpx; */
		color: #000;
		font-weight: bold;
	}


	.label {
		color: #666;
		margin-right: 10rpx;
	}

	.value {
		color: #333;
	}

	.right-btn {
		padding: 5px;
	}

	.container {
		display: flex;
		flex-direction: column;
		/* 垂直排列 */
		height: 100vh;
		padding-bottom: 20rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		/* 设置全屏高度 */
		overflow: hidden;
		/* 防止 body 滚动 */
	}

	.input_box {
		background-color: #fff;
		border-radius: 8rpx;
		border: 1px solid #ddd;
		height: 35rpx;
		width: 50rpx;
		font-size: 24rpx;
		padding-left: 6rpx;
		padding-right: 6rpx;
		outline: none;
		margin: 0rpx 4rpx;
		color: #000;
		display: inline-block;
		/* 移除默认的蓝色外框 */
	}

	.input_box:focus {
		background-color: #fff;
		border-radius: 8rpx;
		border: 1rpx solid blue;
		font-size: 24rpx;
		color: #000;
		height: 35rpx;
		width: 50rpx;
		padding-left: 6rpx;
		padding-right: 6rpx;
		box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
		/* 添加发光效果 */
	}

	.card {
		// display: flex;
		// flex-direction: column;		
		padding: 10rpx 14rpx;
		background-color: white;
		border-radius: 6rpx;
	}

	.tableItem {
		font-size: 26rpx;
		color: #333;
	}

	.custom-textarea {
		border: 1px solid #ccc;
		/* 边框 */
		border-radius: 10rpx;
		/* 圆角 */
		padding: 6rpx;
		margin: 5rpx 0rpx;
		width: calc(100% - 20rpx);
		/* 内边距 */
		font-size: 26rpx;
		/* 字体大小 */
		background-color: #fff;
		/* 背景色 */
		color: #333;
		/* 文字颜色 */
	}
</style>