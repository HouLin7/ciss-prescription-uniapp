<template>

	<view class="container">
		<scroll-view scroll-y="true" style="flex: 1; max-height: 85vh;">
			<view style="height: 20rpx;"></view>
			<view class="card">
				<view class=" title">基础信息</view>
				<view style="height: 10rpx;"></view>
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
			<view class="card">
				<view class="title">运动目标</view>
				<text style="font-size: 24rpx;">
					{{recipeTemplate.sportGoal}}
				</text>
			</view>
			<view style="height: 10rpx;"></view>
			<view class="card">
				<view class="title">运动方案</view>
				<view class="title">*有氧运动</view>
				<p>1.运动项目选择</p>
				<radio-group @change="radioChangeAerobic">
					<label v-for="(item) in sportItems" :key="item.value" style="font-size: 24rpx;">
						<radio style="transform: scale(0.6)" color="#007aff" :value="item.value"
							:checked="isSelectAerobic(item.value)" />
						{{item.label}}
					</label>
				</radio-group>
				<view v-show="isSelectAerobic('other')">
					<input class="uni-input" focus placeholder="输入运动项目" v-model="otherAerobicSportName" />
				</view>
				<view class="uni-flex" style="align-items: center;">
					<p> 2.运动中达到的最佳心率范围为</p>
					<input class="input_box" v-model="recipeTemplate.aerobicExerciseHeartRateRange" />
					<p>次/分</p>
				</view>

				<view class="uni-flex" style="align-items: center;">
					<p> 3.运动频率：</p>
					<input class="input_box" v-model="recipeTemplate.aerobicExerciseFrequency" />
					<p style="font-size: 24rpx;">次/周，</p>
					<p style="font-size: 24rpx;"> 每次运动时间：</p>
					<input class="input_box" v-model="recipeTemplate.aerobicExerciseDuration" />
					<p style="font-size: 24rpx;">次/分</p>
				</view>
				<p>4.运动流程：</p>
				<uni-table border="true" stripe="true">
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
									<view class="tableItem">需要</view>
									<input class="input_box" v-model="recipeModel.aerobicExerciseStepParams1"
										type="number" maxlength="3" />
									<view class="tableItem">分钟热身运动，可以慢走，</view>
								</view>
								<view class="tableItem">拉伸活动各个关节,此时身体开始出汗，身体的运动兴奋提高。</view>
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
									<view class="tableItem">需要</view>
									<input class="input_box" v-model="recipeModel.aerobicExerciseStepParams2"
										type="number" maxlength="3" />
									<view class="tableItem">分钟运动，该阶段逐步增加运动</view>
								</view>
								<view class="uni-flex">
									<view class="tableItem">强度达到最佳心率范围并持续</view>
									<input class="input_box" v-model="recipeModel.aerobicExerciseStepParams3"
										type="number" maxlength="3" />
									<view class="tableItem">分钟</view>
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
									<view class="tableItem">需要</view>
									<input class="input_box" v-model="recipeModel.aerobicExerciseStepParams4"
										type="number" maxlength="3" />
									<view class="tableItem">分钟整理恢复运动，四肢进行韧</view>
								</view>
								<view class="tableItem">带拉伸伴深呼吸，恢复至平静状态。</view>
							</view>
						</uni-th>
					</uni-tr>
				</uni-table>
				<view class="title">*阻抗运动以及其他</view>
				<p>1.力量训练：</p>
				<checkbox-group @change="checkboxChangeStrength">
					<label v-for="(item,index) in strengthTrainingItems" :key="item.value" style="font-size: 24rpx;">
						<checkbox style="transform: scale(0.6)" color="#007aff" :value="item.value"
							:checked="isSelectStrength(item.value)" />
						{{item.label}}
					</label>
				</checkbox-group>
				<view class="uni-flex">
					<p>2.运动强度：</p>
					<view class="uni-flex">
						<p class="tableItem">每个肌群锻炼</p>
						<input class="input_box" v-model="recipeModel.isometricExerciseIntensity1" type="number"
							maxlength="3" />
						<p class="tableItem">组，每组进行</p>
						<input class="input_box" v-model="recipeModel.isometricExerciseIntensity2" type="number"
							maxlength="3" />
						<p>次</p>
					</view>
				</view>
				<view class="uni-flex">
					<p>3.运动频率：</p>
					<view class="uni-flex">
						<p class="tableItem">每周</p>
						<input class="input_box" type="number" maxlength="3"
							v-model="recipeTemplate.isometricExerciseFrequency" />
						<p class="tableItem">次</p>
					</view>
				</view>
			</view>
			<view style="height: 10rpx;"></view>
			<view class="card">
				<view class="title">运动风险提示</view>
				<p>
					感冒、熬夜、酒后禁止运动。
				</p>
				<p>
					运动中出现胸闷、胸痛、气短、恶心等情况应该立即停止运动。
				</p>
				<p>
					运动后不能立即洗澡，防止出现晕厥跌倒。
				</p>
				<p>
					运动后不要立即大量快速饮水，容易给心脏造成负荷。
				</p>
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
	import { ApplyRecordItem, RecipeItem, UserInfo } from '../../common/data-model';
	import { calculateAge } from '../../common/util';
	import applyApi from "../../api/apply_api.js"
	import { dateUtils } from '../../common/util';
	import recipeApi from "../../api/recipe_api.js"
	import { aerobicExerciseItems, strengthTrainingItems } from "@/common/constants.ts"

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
					this.currUser = data.userInfo;
				});

				this.recipeTemplate = JSON.parse(params["template"]);

				var temp = this.recipeTemplate.aerobicExerciseStepParams.split(',')
				this.recipeModel.aerobicExerciseStepParams1 = temp[0];
				this.recipeModel.aerobicExerciseStepParams2 = temp[1];
				this.recipeModel.aerobicExerciseStepParams3 = temp[2];
				this.recipeModel.aerobicExerciseStepParams4 = temp[3];

				var temp = this.recipeTemplate.isometricExerciseIntensity.split(',')
				this.recipeModel.isometricExerciseIntensity1 = temp[0];
				this.recipeModel.isometricExerciseIntensity2 = temp[1];

				var temp = this.recipeTemplate.aerobicExerciseEvents.split(',')
				this.selectAeroSportValues = temp;

				var temp = this.recipeTemplate.isometricExerciseEvents.split(',')
				this.selectStrengthSportValues = temp;
			}

			var recipeId = params["recipeId"];
			if (recipeId) {
				this.editModel = 1;
			}

		},

		data() {
			return {
				messageText: "",
				recipeTemplate: {} as RecipeItem,

				recipeModel: {
					isometricExerciseIntensity1: "",
					isometricExerciseIntensity2: "",

					aerobicExerciseStepParams1: "",
					aerobicExerciseStepParams2: "",
					aerobicExerciseStepParams3: "",
					aerobicExerciseStepParams4: "",
				},

				editModel: 0, //  0:开处方， 1:回看处方
				currUser: {} as UserInfo,
				applyRecordItem: {} as ApplyRecordItem,

				sportItems: aerobicExerciseItems(),
				strengthTrainingItems: strengthTrainingItems(),
				selectAeroSportValues: [],
				selectStrengthSportValues: [],
				otherAerobicSportName: "",
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
				this.recipeTemplate.aerobicExerciseStepParams = `${this.recipeModel.aerobicExerciseStepParams1},${this.recipeModel.aerobicExerciseStepParams2},${this.recipeModel.aerobicExerciseStepParams3},${this.recipeModel.aerobicExerciseStepParams4}`;
				this.recipeTemplate.isometricExerciseIntensity = `${this.recipeModel.isometricExerciseIntensity1},${this.recipeModel.isometricExerciseIntensity2}`;

				this.selectAeroSportValues.forEach((value, index, _) => {
					if (index == 0) {
						this.recipeTemplate.aerobicExerciseEvents = `${value}`;
					} else {
						this.recipeTemplate.aerobicExerciseEvents = `${this.recipeTemplate.aerobicExerciseEvents},${value}`;
					}
				});

				this.selectStrengthSportValues.forEach((value, index, _) => {
					if (index == 0) {
						this.recipeTemplate.isometricExerciseEvents = `${value}`;
					} else {
						this.recipeTemplate.isometricExerciseEvents = `${this.recipeTemplate.isometricExerciseEvents},${value}`;
					}
				});
				this.recipeTemplate.applyRecordId = this.applyRecordItem.id;
				this.recipeTemplate.createDateTime = null;
				this.recipeTemplate.id = null;
				this.recipeTemplate.otherAerobicExerciseEvent = this.otherAerobicSportName;
				recipeApi.addRecipe(this.recipeTemplate)
					.then((value) => {
						uni.hideLoading();
						uni.navigateBack();
					})
					.catch(e => {
						uni.hideLoading();
						this.showMessage('开方失败');
					})

			},
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
			checkboxChangeStrength(e) {
				this.selectStrengthSportValues = e.detail.value;
			},

			radioChangeAerobic(e) {				
				this.selectAeroSportValues[0] = e.detail.value;
			},
		},

		computed: {

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
		padding: 10rpx 10rpx;
		background-color: white;
		border-radius: 6rpx;
	}

	.tableItem {
		font-size: 26rpx;
		color: #333;
	}
</style>