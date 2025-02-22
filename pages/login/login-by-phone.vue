<template>
	<view style="padding: 0rpx 50rpx; background-color: #fff;height: 95vh;" class="uni-flex uni-column">

		<view style="height: 100rpx;"></view>
		<view class="uni-center">
			<image mode="aspectFit" src="/static/logo.png" style="height: 140rpx;width: 140rpx;" />
		</view>

		<view class="uni-flex uni-row" style="justify-content: center;margin-top: 10rpx;">{{appName}}</view>

		<view style="height: 100rpx;"></view>


		<view class="uni-row uni-flex" style="align-items: center;justify-content: start;">
			<view style="padding-right: 40rpx;">+86</view>
			<input v-model="inputPhoneNum" placeholder="请输入手机号" type="number" name="phone" @confirm="handleLogin" />
		</view>

		<view>
			<view style="height: 1rpx;flex: 1; background-color: grey;opacity: 0.5;margin-top: 20rpx;"></view>
		</view>

		<view style="height: 100rpx;"></view>
		<view class="uni-flex" style="justify-content: center;">
			<view :class="loginButtonClass" :disabled="inputPhoneNum.length==0" @click="handleLogin()">登录</view>
		</view>

		<view style="height: 40rpx;"></view>

		<!-- <view class="uni-flex uni-row " style="align-items:center;">
			<checkbox-group @change="checkboxChange" style="width: 80rpx;">
				<checkbox color="#0000ff" checked="false" value="1" />
			</checkbox-group>
			<view class="underline-text">我已同意隐私协议以及用户声明</view>
		</view> -->
		<uni-popup ref="message" type="message">
			<uni-popup-message type="warning" :message="messageText" :duration="2000" />
		</uni-popup>

	</view>
</template>

<script lang="ts">
	import loginApi from "@/api/login_api.js";
	import { isValidPhoneNumber } from "../../common/util";
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				messageText: "",
				inputPhoneNum: "",
			}
		},

		computed: {
			...mapState(["appName"]),
			...mapGetters(["isLogin"]),
			loginButtonClass() {
				if (this.inputPhoneNum.length == 0) {
					return "custom_button_wexin_disabled";
				} else {
					return "custom_button_wexin";
				}
			},
		},

		methods: {

			...mapMutations(['setHasLogin', 'setLoginToken']),

			showMessage(message : string) {
				this.messageText = message;
				this.$refs.message.open();
			},
			handlePhoneInput(e) {
				this.inputPhoneNum = e.detail.value;
				// console.log(this.inputPhoneNum);
			},

			handleLogin() {
				if (this.inputPhoneNum == '') {
					this.showMessage("请输入手机号");
					return;
				}
				if (!isValidPhoneNumber(this.inputPhoneNum)) {
					this.showMessage("请输入有效的手机号");
					return;
				}

				loginApi.loginByWx("openId", this.inputPhoneNum).then(data => {
					const tokenInfo = data;
					this.setLoginToken(tokenInfo);
					uni.setStorageSync("tokenInfo", tokenInfo);

					if (tokenInfo.newUserFlag == 1) {
						uni.redirectTo({
							url: "/pages/user/user_detail_page/user_detail_page?isNewUser=true",
						})
					} else {
						uni.switchTab({
							url: "/pages/tabBar/home_page"
						})
					}
				}).catch(error => {
					console.log(JSON.stringify(error));
					uni.showToast({
						title: '登录失败'
					});
				})
			},

			checkboxChange(e) {

			},

			handleClose() {
				uni.navigateBack();
			},

		}
	}
</script>

<style scoped lang="scss">
	.custom_button_phone {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 500rpx;
		height: 80;
		border-radius: 100rpx;
		align-content: center;
		color: white;
		background-color: gray;
	}

	.center {
		padding: 100rpx;
	}
</style>