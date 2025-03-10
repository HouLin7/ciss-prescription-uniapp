<template>

	<view class="container">
		<scroll-view scroll-y="true" style="flex: 1; max-height: 85vh;">
			<view style="height: 20rpx;"></view>
			<view class="card">
				<!-- <view class=" title">基础信息</view>
				<view style="height: 10rpx;"></view> -->
				<view class="uni-flex" style="justify-content: space-between;">

					<view class="uni-flex">
						<view class="label">姓名:</view>
						<view class="value">{{userName}}</view>
					</view>

					<view class="uni-flex">
						<view class="label">性别:</view>
						<view class="value">{{sex}}</view>
					</view>

					<view class="uni-flex" style="align-items: center;">
						<view class="label">年龄</view>
						<view class="value">{{age}}</view>
					</view>

				</view>

				<view v-if="applyRecordItem.bodyTestRecords" class="uni-flex"
					style="justify-content: space-between; margin-top: 10rpx;">
					<view class="uni-flex" style="align-items: center;">
						<view class="label">身高:</view>
						<view class="value">{{bodyHeight}}cm</view>
					</view>

					<view class="uni-flex" style="align-items: center;">
						<view class="label">体重:</view>
						<view class="value">{{bodyWeight}}kg</view>
					</view>
					<view class="uni-flex" style="align-items: center;">
						<view class="label">体脂率:</view>
						<view class="value">{{fatRate}}%</view>
					</view>

				</view>
			</view>

			<view style="height: 10rpx;"></view>

			<view v-if="!isMarkdownContent" class="uni-flex uni-column card"
				v-for="(item,index) in recipeTemplate.fieldItems" :key="index">
				<h4>{{item.label}}</h4>
				<textarea class="custom-textarea" style="margin-left: 10rpx;" placeholder="请输入" type="text"
					v-model="item.content" auto-height />
				<!-- <mp-html :content="item.content" /> -->
			</view>
			<view v-else class="uni-flex uni-column card">
				<view v-html="markdownContent"></view>
			</view>
			<view style="height: 10rpx;"></view>
			<view class="card">
				<p>
					本运动处方有效期为1个星期，到期后请及时到医院复查并调整运动处方。
				</p>
				<view class="uni-flex" style="justify-content: flex-end;padding-right: 20rpx;">
					<view>处方日期：{{currDateStr}}</view>
				</view>
			</view>
			<view style="height: 10rpx;"></view>
		</scroll-view>
		<button class="next-button" @click="doSave">提交</button>

		<uni-popup ref="message" type="message">
			<uni-popup-message type="warning" :message="messageText" :duration="2000" />
		</uni-popup>
	</view>

</template>

<script lang="ts">
	import { ApplyRecordItem, CustomTemplate, RecipeItem, TemplateFieldItem, UserInfo } from '../../common/data-model';
	import { calculateAge } from '../../common/util';
	import applyApi from "../../api/apply_api.js"
	import { dateUtils } from '../../common/util';
	import recipeApi from "../../api/recipe_api.js"
	import { marked } from 'marked';

	export default {

		onLoad(params : Map<string, string>) {
			uni.setNavigationBarTitle({
				title: "开具处方"
			});
			var id = params["applyRecordId"];
			if (id) {
				this.editModel = 0
				applyApi.getApplyRecordDetail(id).then(data => {
					this.applyRecordItem = data;
				});

				this.recipeTemplate = JSON.parse(params["template"]);
			}

		},

		data() {
			return {
				messageText: "",
				recipeTemplate: {} as CustomTemplate,
				currUser: {} as UserInfo,
				applyRecordItem: {} as ApplyRecordItem,
			}
		},
		methods: {
			showMessage(message : string) {
				this.messageText = message;
				this.$refs.message.open();
			},
			doSave() {
				uni.showLoading({
					mask: true,
					title: "正在提交..."
				})
				this.recipeTemplate.applyRecordId = this.applyRecordItem.id;
				this.recipeTemplate.createDateTime = null;
				this.recipeTemplate.updateDateTime = null;
				this.recipeTemplate.id = null;

				if (this.recipeTemplate.fieldItems) {
					for (var item of this.recipeTemplate.fieldItems) {
						item.id = null;
					}
				}
				recipeApi.addRecipeV1(this.recipeTemplate)
					.then((value) => {
						uni.hideLoading();
						uni.navigateBack();
					})
					.catch(e => {
						uni.hideLoading();
						this.showMessage('开方失败');
					})

			},

		},

		computed: {
			markdownContent() {
				if (this.recipeTemplate.markdownContent) {
					var result = marked(this.recipeTemplate.markdownContent);
					return result;
				}
				return "";
			},

			isMarkdownContent() {
				if (this.recipeTemplate.markdownContent) {
					return true;
				}
				return false;
			},
			currDateStr() {
				var now = new Date();
				return dateUtils.formatYYMMDD(now);
			},

			bodyHeight() {
				if (this.applyRecordItem.bodyTestRecords) {
					return this.applyRecordItem.bodyTestRecords.height;
				}
				return "";
			},
			bodyWeight() {
				if (this.applyRecordItem.bodyTestRecords) {
					return this.applyRecordItem.bodyTestRecords.weight;
				}
				return "";
			},
			fatRate() {
				if (this.applyRecordItem.bodyTestRecords) {
					return this.applyRecordItem.bodyTestRecords.fatRate;
				}
				return "";
			},

			userName() {
				return this.applyRecordItem.userName;
			},

			sex() {
				if (this.applyRecordItem.userSex != undefined) {
					if (this.applyRecordItem.userSex == 0) {
						return "男";
					} else {
						return "女";
					}

				}
				return "";
			},
			age() {
				return this.applyRecordItem.userAge;
			},
			createDate() {
				if (this.applyRecordItem) {
					return this.applyRecordItem.createDateTime;
				}
				return "";
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