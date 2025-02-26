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

			<view style="height: 10rpx;"></view>
			<view class="card">
				<view class="title">运动目标</view>
				<view style="padding: 0rpx 10rpx;">
					<text style="font-size: 24rpx;">
						{{recipeItem.sportGoal}}
					</text>
				</view>

			</view>
			<view style="height: 10rpx;"></view>
			<view class="card">
				<view class="title">运动方案</view>
				<view class="title">*有氧运动</view>
				<view class="uni-flex" style="align-items: center;">
					<p>1.运动项目：</p>

					<view v-if="isSelectAerobic('other')">
						<view>{{recipeItem.otherAerobicExerciseEvent}}</view>
					</view>
					<label v-else v-if="!isSelectAerobic('other')" v-for="(item,index) in sportItems" :key="item.value"
						style="font-size: 26rpx; font-weight: normal; color: royalblue; margin-right: 15rpx;">
						{{item.label}}
					</label>

				</view>


				<view class="uni-flex" style="align-items: center;">
					<p> 2.运动中达到的最佳心率范围为 {{recipeItem.aerobicExerciseHeartRateRange}}次/分</p>
				</view>

				<view class="uni-flex" style="align-items: center;">
					<p>3.运动频率：{{recipeItem.aerobicExerciseFrequency}}次/周，每次运动时间：{{recipeItem.aerobicExerciseDuration}}次/分
					</p>
				</view>
				<p>4.运动流程：</p>

				<uni-table border="true" stripe="true" style="margin: 8rpx 0rpx;">
					<uni-tr>
						<uni-th style="background-color: lightgrey; color: #333;" align="center"
							width="100rpx">阶段</uni-th>
						<uni-th style="background-color: lightgrey; color: #333;" align="center">运动内容</uni-th>
					</uni-tr>
					<uni-tr>
						<uni-th align="center">
							<view class="tableItem"> 预备热身</view>
						</uni-th>
						<uni-th align="left">
							<view class="uni-flex uni-column">
								<view class="uni-flex">
									<view class="tableItem">
										需要{{recipeModel.aerobicExerciseStepParams1}}分钟热身运动，可以慢走，拉伸活动各个关节,此时身体开始出汗，身体的运动兴奋提高。
									</view>
								</view>
							</view>
						</uni-th>

					</uni-tr>
					<uni-tr>
						<uni-th class="tableItem" align="center">
							<view class="tableItem">加量加强 </view>
						</uni-th>
						<uni-th align="left">
							<view class="uni-flex uni-column">
								<view class="uni-flex">
									<view class="tableItem">
										需要{{recipeModel.aerobicExerciseStepParams2}}分钟运动，该阶段逐步增加运动强度达到最佳心率范围并持续{{recipeModel.aerobicExerciseStepParams3}}分钟
									</view>
								</view>
							</view>
						</uni-th>
					</uni-tr>
					<uni-tr>
						<uni-th align="center">
							<view class="tableItem">整理恢复 </view>
						</uni-th>
						<uni-th align="left">
							<view class="uni-flex uni-column">
								<view class="uni-flex">
									<view class="tableItem">
										需要{{recipeModel.aerobicExerciseStepParams4}}分钟整理恢复运动，四肢进行韧带拉伸伴深呼吸，恢复至平静状态。
									</view>
								</view>
							</view>
						</uni-th>
					</uni-tr>
				</uni-table>
				<view class="title">*阻抗运动以及其他</view>
				<view class="uni-flex">
					<p>1.力量训练：</p>
					<label v-for="(item,index) in strengthTrainingItems" :key="item.value"
						style="font-size: 26rpx; font-weight: normal; color: royalblue; margin-right: 15rpx;">
						{{item.label}}
					</label>
				</view>

				<view class="uni-flex">
					<p>2.运动强度：</p>
					<view class="uni-flex">
						<p class="tableItem">
							每个肌群锻炼{{recipeModel.isometricExerciseIntensity1}}组，每组进行{{recipeModel.isometricExerciseIntensity2}}次
						</p>
					</view>
				</view>
				<view class="uni-flex">
					<p>3.运动频率：</p>
					<view class="uni-flex">
						<p class="tableItem">每周{{recipeItem.isometricExerciseFrequency}}次</p>
					</view>
				</view>
			</view>
			<view style="height: 10rpx;"></view>
			<view class="card">
				<view class="title">运动风险提示</view>
				<text style="font-size: 24rpx;">{{recipeItem.riskWarning}}</text>
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

	</view>

</template>

<script lang="ts">
	import { ApplyRecordItem, RecipeItem, UserInfo } from '../../common/data-model';
	import { calculateAge } from '../../common/util';
	import { dateUtils } from '../../common/util';
	import { aerobicExerciseItems, strengthTrainingItems, defaultRiskWarning } from "@/common/constants.ts"

	export default {

		onLoad(params : Map<string, string>) {

			this.applyRecordItem = JSON.parse(params["applyRecordItem"]);
			this.recipeItem = JSON.parse(params["recipeItem"]);
			this.currUser = this.applyRecordItem.userInfo;

			var temp = this.recipeItem.aerobicExerciseStepParams.split(',')
			this.recipeModel.aerobicExerciseStepParams1 = temp[0];
			this.recipeModel.aerobicExerciseStepParams2 = temp[1];
			this.recipeModel.aerobicExerciseStepParams3 = temp[2];
			this.recipeModel.aerobicExerciseStepParams4 = temp[3];

			var temp = this.recipeItem.isometricExerciseIntensity.split(',')
			this.recipeModel.isometricExerciseIntensity1 = temp[0];
			this.recipeModel.isometricExerciseIntensity2 = temp[1];

			var temp = this.recipeItem.aerobicExerciseEvents.split(',')
			this.selectAeroSportValues = temp;

			var temp = this.recipeItem.isometricExerciseEvents.split(',')
			this.selectStrengthSportValues = temp;

			this.sportItems = this.sportItems.filter((item) => this.isSelectAerobic(item.value));
			this.strengthTrainingItems = this.strengthTrainingItems.filter((item) => this.isSelectStrength(item.value));
			if (!this.recipeItem.riskWarning) {
				this.recipeItem.riskWarning = defaultRiskWarning;
			}
		},

		data() {
			return {

				recipeItem: {} as RecipeItem,

				recipeModel: {
					isometricExerciseIntensity1: "",
					isometricExerciseIntensity2: "",

					aerobicExerciseStepParams1: "",
					aerobicExerciseStepParams2: "",
					aerobicExerciseStepParams3: "",
					aerobicExerciseStepParams4: "",
				},


				currUser: {} as UserInfo,
				applyRecordItem: {} as ApplyRecordItem,

				sportItems: aerobicExerciseItems(),
				strengthTrainingItems: strengthTrainingItems(),
				selectAeroSportValues: [],
				selectStrengthSportValues: [],
			}
		},
		methods: {
			isSelectAerobic(value) {
				for (var item of this.selectAeroSportValues) {
					if (item == value) {
						return true;
					}
				}
				return false;
			},

			isSelectStrength(value) {
				for (var item of this.selectStrengthSportValues) {
					if (item == value) {
						return true;
					}
				}
				return false;
			},

		},

		computed: {

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
				return this.currUser.name;
			},

			sex() {
				if (this.currUser) {
					if (this.currUser.sex == 0) {
						return "男";
					} else {
						return "女";
					}

				}
				return "";
			},
			age() {
				if (this.currUser.birthday) {
					return calculateAge(this.currUser.birthday);
				} else {
					return "";
				}
			},
			phoneNum() {
				if (this.currUser) {
					return this.currUser.phoneNumber;
				}
				return "";
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