<template>

	<view class="container">
		<scroll-view scroll-y="true" style="flex: 1; max-height: 1200rpx;">
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
				<view style="height: 10rpx;"></view>
				<view class="uni-flex" style="justify-content: space-between;">
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

			<view style="height: 20rpx;"></view>
			<view class="card">
				<view class="title">运动目标</view>
				<text style="font-size: 24rpx;">
					1.控制血压，增强心肺功能。\n2.改善血糖控制，增强胰岛素敏感性。\n3.促进体重管理，缓解相关并发症。\n4.提升心理健康，增强生活质量。
				</text>
			</view>
			<view style="height: 20rpx;"></view>
			<view class="card">
				<view class="title">运动方案</view>
				<view class="title">*有氧运动</view>
				<p>1.运动项目选择</p>
				<checkbox-group @change="checkboxChange">
					<label v-for="(item,index) in sportItems" :key="item.value">
						<checkbox style="transform: scale(0.6)" color="#007aff" :value="item.value"
							:checked="isSelect(item.value)" />
						{{item.label}}
					</label>
				</checkbox-group>
				<view v-show="isSelect('other')">
					<input class="uni-input" focus placeholder="输入运动项目" />
				</view>
				<view class="uni-flex" style="align-items: center;">
					<p> 2.运动中达到的最佳心率范围为</p>
					<input class="input_box" />
					<p>次/分</p>
				</view>

				<view class="uni-flex" style="align-items: center;">
					<p> 3.运动频率</p>
					<input class="input_box" />
					<p style="font-size: 24rpx;">次/周，</p>
					<p style="font-size: 24rpx;"> 每次运动时间：</p>
					<input class="input_box" />
					<p style="font-size: 24rpx;">次/分</p>
				</view>
				<p>4.运动流程：</p>				
				<uni-table border="true" stripe="true">
					<uni-tr>
						<uni-th style="background-color: lightgrey; color: #333;" align="center"
							width="30rpx">阶段</uni-th>
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
									<input class="input_box" type="number" maxlength="3" />
									<view class="tableItem">分钟热身运动，可以慢走，</view>
								</view>
								<view class="tableItem">拉伸活动各个关节,此时身体开始出汗，身体的运动兴奋提高。</view>
							</view>
						</uni-th>

					</uni-tr>
					<uni-tr>
						<uni-th class="tableItem" align="center">加量加强</uni-th>
						<uni-th align="left">
							<view class="uni-flex uni-column">
								<view class="uni-flex">
									<view class="tableItem">需要</view>
									<input class="input_box" type="number" maxlength="3" />
									<view class="tableItem">分钟运动，该阶段逐步增加运动</view>
								</view>
								<view class="uni-flex">
									<view class="tableItem">强度达到最佳心率范围并持续</view>
									<input class="input_box" type="number" maxlength="3" />
									<view class="tableItem">分钟</view>
								</view>

							</view>
						</uni-th>
					</uni-tr>
					<uni-tr>
						<uni-th class="tableItem" align="center">整理恢复</uni-th>
						<uni-th align="left">
							<view class="uni-flex uni-column">
								<view class="uni-flex">
									<view class="tableItem">需要</view>
									<input class="input_box" type="number" maxlength="3" />
									<view>分钟整理恢复运动，四肢进行韧</view>
								</view>
								<view class="tableItem">带拉伸伴深呼吸，恢复至平静状态。</view>
							</view>
						</uni-th>
					</uni-tr>
				</uni-table>
				<view class="title">*阻抗运动以及其他</view>
				<p>1.力量训练：</p>
				<checkbox-group @change="">
					<label v-for="(item,index) in strengthTrainingItems" :key="item.value">
						<checkbox style="transform: scale(0.6)" color="#007aff" :value="item.value"
							:checked="isSelect(item.value)" />
						{{item.label}}
					</label>
				</checkbox-group>
				<view class="uni-flex">
					<p>2.运动强度：</p>
					<view class="uni-flex">
						<p class="tableItem">每个肌群锻炼</p>
						<input class="input_box" type="number" maxlength="3" />
						<p class="tableItem">组，每组进行</p>
						<input class="input_box" type="number" maxlength="3" />
						<p>次</p>
					</view>
				</view>
				<view class="uni-flex">
					<p>3.运动频率：</p>
					<view class="uni-flex">
						<p class="tableItem">每周</p>
						<input class="input_box" type="number" maxlength="3" />
						<p class="tableItem">次</p>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
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
			<view style="height: 20rpx;"></view>
			<view class="card">
				<p>
					本运动处方有效期为1个星期，到期后请及时到医院复查并调整运动处方。
				</p>
				<view class="uni-flex" style="justify-content: flex-end;padding-right: 20rpx;">
					<view>处方日期{{}}</view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
		</scroll-view>

		<button class="next-button" @click="doSave">提交</button>
	</view>


</template>

<script lang="ts">
	import { ApplyRecordItem, UserInfo } from '../../common/data-model';
	import { calculateAge } from '../../common/util';
	import applyApi from "../../api/apply_api.js"
	import { aerobicExerciseItems, strengthTrainingItems } from "@/common/constants.ts"

	export default {

		onLoad(params : Map<string, string>) {
			uni.setNavigationBarTitle({
				title: "开具处方"
			});
			var id = params["id"];
			applyApi.getApplyRecordDetail(id).then(data => {
				this.applyRecordItem = data;
				this.currUser = data.userInfo;
			});

			this.sportItems = aerobicExerciseItems();
		},

		data() {
			return {
				currUser: {} as UserInfo,
				applyRecordItem: {} as ApplyRecordItem,
				sportItems: aerobicExerciseItems(),
				strengthTrainingItems: strengthTrainingItems(),
				selectSportValues: [] as {
					label : string;
					value : string;
				}[],
			}
		},
		methods: {
			doSave() {

			},
			isSelect(value) {
				for (var item of this.selectSportValues) {
					if (item == value) {
						return true;
					}
				}
				return false;
			},
			checkboxChange(e) {
				console.log(e);

				const values = e.detail.value;
				this.selectSportValues = e.detail.value;
			},
		},
		computed: {
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
		height: 95vh;
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