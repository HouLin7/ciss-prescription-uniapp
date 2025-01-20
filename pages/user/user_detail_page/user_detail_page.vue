<template>
	<view class="uni-flex uni-column" style="padding: 40rpx 20rpx;background-color: white;height: 90vh;">

		<view class="uni-flex list-item-divider item">
			<view>姓名</view>
			<view style="width: 40rpx;"></view>
			<input placeholder="请输入" :value="userName" @input="handleInputName" />

		</view>

		<view class="uni-flex list-item-divider item" style="align-items: center;">
			<view style="width: 80rpx;">性别</view>
			<view style="width: 40rpx;"></view>
			<radio-group @change="radioChange" style="display: flex; align-items: center;">
				<label>
					<radio value="0" :checked="this.selectSex==0" />男
				</label>
				<label style="margin-left: 40rpx;">
					<radio value="1" :checked="this.selectSex==1" />女
				</label>
			</radio-group>
		</view>

		<view class="uni-flex list-item-divider item" style="align-items: center;">
			<view>生日</view>
			<view style="width: 20rpx;"></view>
			<picker mode="date" @change="birthdayChange">
				<view v-if="selectBirthday===''" class="uni-label" style="color: #666;"> 请选择</view>
				<view v-else>{{selectBirthday}}</view>
			</picker>
		</view>

		<view class="uni-flex list-item-divider item" style="align-items: center;">
			<view>手机</view>
			<view style="width: 40rpx;"></view>
			<view class="uni-bold">{{phoneNum}}</view>
		</view>

		<view style="margin-top: 100rpx;">
			<button v-if="isFirstLogin" class="custom_button_wexin" @click="doSave">立即体验</button>
			<button v-else class="custom_button_wexin" @click="doSave">保存</button>
		</view>

	</view>
</template>

<script>
	import {
		nextTick
	} from "vue";
	import httpUtils from "../../../api/http-utils";
	import userApi from "@/api/user_api.js";
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {

		onLoad(options) {
			if (options.isNewUser) {
				this.isFirstLogin = true;
				uni.setNavigationBarTitle({
					title: "完善基本资料"
				})
			}
		},
		created() {
			console.log(JSON.stringify(this.userInfo));
			if (this.userInfo.birthday) {
				this.selectBirthday = this.userInfo.birthday
			}

			this.selectSex = this.userInfo.sex;

			if (this.userInfo.name) {
				this.userName = this.userInfo.name;
			}
			userApi.getUser(this.userInfo.id).then(userData => {
				this.setUserInfo(userData);
			}).catch(e => {
				uni.showToast({
					title: "刷新user数据失败" + e,
				});
			});
		},

		computed: {
			...mapGetters(['userInfo']),

			phoneNum() {
				return this.userInfo.phoneNumber;
			}

		},

		data() {
			return {
				userName: "",
				isFirstLogin: false,
				selectBirthday: "",
				selectSex: -1
			}
		},
		methods: {
			...mapMutations(['setUserInfo']),

			handleInputName(e) {
				this.userName = e.detail.value;
			},

			doSave() {
				if (this.userName == "") {
					uni.showToast({
						title: '请输入姓名'
					});
					return;
				}
				if (this.selectSex == -1) {
					uni.showToast({
						title: '请选择性别'
					});
					return;
				}
				if (this.selectBirthday == "") {
					uni.showToast({
						title: '请选择生日'
					});
					return;
				}

				userApi.saveUser(this.userName, this.selectSex, this.selectBirthday).then(response => {

					userApi.getUser(this.userInfo.id).then(userData => {
						this.setUserInfo(userData);
					}).catch(e => {
						uni.showToast({
							title: "刷新user数据失败" + e,
						});
					});

					uni.showToast({
						title: "保存成功"
					});

					setTimeout(() => {
						uni.navigateBack();
					}, 500)				

				}).catch(e => {
					uni.showToast({
						title: "保存失败"
					});
				});
			},

			birthdayChange(e) {
				this.selectBirthday = e.detail.value;
			},
			radioChange(e) {
				this.selectSex = parseInt(e.detail.value);
			}



		}
	}
</script>

<style>
	.item {
		padding: 10rpx 20rpx;
	}
</style>