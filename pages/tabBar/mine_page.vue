<template>

	<view v-if="false" style="display: flex;flex-direction: column;padding-top: 20rpx;align-items: center;">
		<view style="height: 200rpx;"></view>
		<image src="/static/logo.png" style="height: 150rpx;width: 150rpx;"></image>
		<view style="height: 150rpx;"></view>
		<view class="uni-label-text">登陆后才可查看</view>
		<view style="height: 20rpx;"></view>
		<button class="custom_button_wexin" @click="turnLoginPage">登录</button>
	</view>

	<view v-else class="uni-flex uni-column" style="padding: 0rpx;">

		<view class="card uni-flex uni-row"
			style="padding: 25rpx 30rpx;margin: 50rpx 20rpx; justify-content: space-between; align-items: center;"
			@click="toUserDetailPage">
			<view class=" uni-flex uni-column" style="">
				<view class="uni-flex" style="align-items: center;">
					<text> 姓名</text>
					<text style="margin-left: 40rpx;"> {{userName}}</text>
				</view>

				<view class="uni-flex" style="align-items: center;">
					<text> 性别</text>
					<text style="margin-left: 40rpx;"> {{sexName}}</text>
				</view>
				<view class="uni-flex" style="align-items: center;">
					<text> 年龄</text>
					<text style="margin-left: 40rpx;"> {{age}}</text>
				</view>
				<view class="uni-flex" style="align-items: center;">
					<text> 手机</text>
					<text style="margin-left: 40rpx;"> {{phone}}</text>
				</view>
			</view>
			<uni-icons type="arrowright" size="20" />
		</view>

		<view style="height: 60rpx;"></view>

		<view v-if="roleFlag==1" style=" margin: 20rpx; border-radius: 20rpx; ">
			<uni-list-item border="false" showArrow title="待处理的健康记录" clickable="true" @click="handleTodoApplyRecord" />
			<uni-list-item showArrow title="已开具的健康报告" clickable="true" @click="handledoneApplyRecord" />
		</view>
		
		<view v-else="roleFlag==1" style="margin: 20rpx; border-radius: 20rpx; ">
			<uni-list-item border="false" showArrow title="处方申请记录" clickable="true" @click="handleOpenApplyRecord" />
			<uni-list-item showArrow title="处方运动报告" clickable="true" @click="turnMyTenantSpaceOrder" />
		</view>

		<view style="height: 200rpx;"></view>

		<button class="custom_button_wexin" @click="doLogout">退出登录</button>

	</view>
</template>

<script>
	import {
		nextTick
	} from 'vue';
	import {
		mapMutations,
		mapState,
		mapGetters
	} from 'vuex';
	import {
		calculateAge
	} from '../../common/util';

	import userApi from '../../api/user_api.js';
	export default {

		computed: {
			...mapGetters(['isLogin', 'userInfo']),
			userName() {
				if (this.userInfo.name) {
					return this.userInfo.name;
				} else {
					return "未知";
				}
			},

			roleFlag() {
				return this.userInfo.roleFlag;
			},

			sexName() {
				if (this.userInfo.sex === 1) {
					return "女";
				} else if (this.userInfo.sex === 0) {
					return "男";
				} else {
					return "未知";
				}
			},
			age() {
				if (this.userInfo.birthday) {
					return calculateAge(this.userInfo.birthday);
				} else {
					return "未知";
				}
			},
			phone() {
				return this.userInfo.phoneNumber;
			}

		},

		created() {
			// console.log("userInfo : " + JSON.stringify(this.userInfo));
			userApi.getUser(this.userInfo.id).then(userData => {
				this.setUserInfo(userData);
			}).catch(e => {
				uni.showToast({
					title: "刷新user数据失败" + e,
				});
			});
		},

		methods: {
			...mapMutations(['clearToken', 'setUserInfo']),
			handleOpenApplyRecord() {
				uni.navigateTo({
					url: "/pages/apply/my_apply_record_list/my_apply_record_list"
				})
			},
			doLogout() {
				this.clearToken()
				uni.reLaunch({
					url: '/pages/login/login-by-phone'
				})
			},
			toUserDetailPage() {
				uni.navigateTo({
					url: "/pages/user/user_detail_page/user_detail_page"
				})
			},

			handleTodoApplyRecord() {
				uni.navigateTo({
					url: "/pages/apply/apply_record_list/apply_record_list"
				})
			},
			handledoneApplyRecord() {				
				uni.navigateTo({
					url: "/pages/apply/apply_record_list/apply_record_list?status=" + 1
				})
			}

		},

		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	.card {
		border-radius: 6px;
		background-color: #ffffff;
		/* 添加过渡效果 */
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1),
			0 4px 6px rgba(0, 0, 0, 0.1);
		/* 多层阴影实现立体效果 */
		transition: box-shadow 0.3s ease;
		/* 鼠标悬停过渡效果 */
	}
</style>