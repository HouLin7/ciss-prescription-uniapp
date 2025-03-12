<template>

	<view>
		<scroll-view scroll-y="true" style="flex: 1; max-height: 90vh;">
			<view style="height: 20rpx;"></view>
			<view class="card">
				<view class=" title">基础信息</view>
				<view style="height: 10rpx;"></view>
				<view class="uni-flex" style="justify-content: space-between; margin: 0rpx 10rpx;">

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
				<view style="height: 10rpx;"></view>
				<view v-if="applyRecordItem.bodyTestRecords" class="uni-flex"
					style="justify-content: space-between;margin: 0rpx 10rpx">
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

			<view style="height: 5rpx;"></view>


			<view v-if="!isMarkdownContent" class="uni-flex uni-column card"
				style="margin-top: 10rpx;margin-bottom: 15rpx;" v-for="(item,index) in recipeItem.fieldItems"
				:key="index">
				<h4>{{item.label}}</h4>
				<text style="margin-left: 10rpx;" auto-height v-html="item.content"></text>
			</view>
			<view v-else class="uni-flex uni-column card" style="margin-top: 10rpx;">
				<view v-html="markdownContent"></view>
			</view>
			<view style="height: 10rpx;"></view>
			<view class="card">
				<view>
					本运动处方有效期为1个星期，到期后请及时到医院复查并调整运动处方。
				</view>
				<view class="uni-flex uni-column"
					style="justify-content: flex-start;padding-right: 10rpx;align-items: end; margin-top: 10rpx;">
					<p>开方专家：{{createUserName}}</p>
					<p>{{currDateStr}}</p>
				</view>
			</view>
			<view style="height: 10rpx;"></view>
		</scroll-view>

	</view>

</template>

<script lang="ts">
	import { ApplyRecordItem, CustomTemplate, RecipeItem, UserInfo } from '../../common/data-model';
	import { calculateAge, dateUtils } from '../../common/util';
	import { aerobicExerciseItems, strengthTrainingItems, defaultRiskWarning } from "@/common/constants.ts"
	import recipeApi from "@/api/recipe_api.js";
	import userApi from "@/api/user_api.js";
	import { marked } from 'marked';
	import { encodeBase64Modern, decodeBase64Modern } from "@/utils/base64.js";
	export default {

		onLoad(params : Map<string, string>) {

			this.applyRecordItem = JSON.parse(params["applyRecordItem"]);

			let id = JSON.parse(params["recipeId"]);

			recipeApi.getCustomRecipeDetail(id).then((res) => {
				this.recipeItem = res;

				this.recipeItem.markdownContent = decodeBase64Modern(this.recipeItem.markdownContent);
				if (this.recipeItem.fieldItems) {
					for (const item of this.recipeItem.fieldItems) {
						item.content = decodeBase64Modern(item.content)
					}
				}

				userApi.getUser(this.recipeItem.createRecipeUserId).then((res) => {
					this.createUser = res;
				});
			});


		},



		data() {
			return {
				recipeItem: {} as CustomTemplate,
				createUser: {} as UserInfo,
				currUser: {} as UserInfo,
				applyRecordItem: {} as ApplyRecordItem,


			}
		},
		methods: {

		},

		computed: {
			markdownContent() {
				if (this.recipeItem.markdownContent) {
					return marked(this.recipeItem.markdownContent);
				}
				return "";
			},

			isMarkdownContent() {
				if (this.recipeItem.markdownContent) {
					return true;
				}
				return false;
			},

			createUserName() {
				if (this.createUser.name) {
					return this.createUser.name;
				}
				return "";
			},

			currDateStr() {
				if (this.recipeItem.createDateTime) {
					return this.recipeItem.createDateTime;
				}
				return "";
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
				if (this.applyRecordItem) {
					return this.applyRecordItem.userAge;
				} else {
					return "";
				}
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
	.p {
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
		// padding-bottom: 20rpx;
		// padding-left: 15rpx;
		// padding-right: 15rpx;
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
		padding: 10rpx 10rpx;
		margin-left: 15rpx;
		margin-right: 15px;
		background-color: white;
		border-radius: 6rpx;
	}

	.tableItem {
		font-size: 26rpx;
		color: #333;
	}
</style>