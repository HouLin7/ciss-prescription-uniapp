<template>
	<view class="container">
		<view class="top card" style="margin: 10rpx 20rpx">
			<uni-steps :options="stepMenus" :active="active" />
		</view>

		<view class="middle card" style="margin: 10rpx 20rpx;">

			<p>
				《中国高血压防治指南2010》已将体育运动纳入了高血压的非药物治疗中，并作为高血压预防与治疗环节中的一项重要组成部分。本课题主要针对您的生活质量和运动能力进行评价，并对您今后的运动方式进行有针对性的指导。
			</p>
			<p>
				我们将通过问卷了解您的生活质量和体力活动情况。在医生的监护下进行运动负荷试验评价您的运动能力，此后的一周中，我们将为您佩戴加速度计，实际检测您的运动水平，并据此指导您进行3个月的运动干预，干预结束后复测运动负荷试验。在整个课题观察过程中，我们会在运动干预前后检测2次相关血液学指标。通过以上测试内容，可以明确您的安全运动强度，找到适合自己长期坚持的运动方式，并通过适当的运动提高自己的运动能力。
			</p>
			<p>
				<strong>参与者义务：</strong>不得半途而废，前后两次运动测试及抽血化验保证按时参加，12周运动干预按照医生要求，保质保量完成。
			</p>
			<p>
				若您已了解此项研究的内容和意义，愿意参加并配合我们完成相关研究，请点击“同意”按钮。
			</p>

			<!-- <web-view fullscreen="false" style="margin-top: 110rpx; margin-bottom: 10rpx;" :src="url"></web-view> -->
		</view>

		<!-- <view class="bottom"> -->
		<view class="uni-flex bottom" style="padding: 10rpx 40rpx;">
			<button class="custom_button_wexin" style="background-color: #999;" @click="reject">拒绝</button>
			<view style="width: 40rpx"></view>
			<button class="custom_button_wexin" @click="agree">同意</button>
		</view>

	</view>
</template>

<script>
	// import {
	// 	userAgreementUrl
	// } from "@/common/constants.js"

	import {
		mapState
	} from 'vuex';
	import applyApi from '../../../api/apply_api.js'
	export default {
		computed: {
			...mapState(['tempApplyRecordItem']),
		},
		data() {
			return {
				url: "",
				active: 3,

				stepMenus: [{
					title: "风险评估"
				}, {
					title: "健康问卷"
				}, {
					title: "体测数据"
				}, {
					title: "知情同意书"
				}, ],
			}
		},

		methods: {
			reject() {
				uni.switchTab({
					url: "/pages/tabBar/home_page"
				})
			},
			agree() {
				if (!this.tempApplyRecordItem) {
					uni.showToast({
						title: "保存基础对象为空"
					})
					return;
				}
				applyApi.addApplyRecord(this.tempApplyRecordItem).then(rsp => {
					uni.showToast({
						title: "提交成功"
					});
					setTimeout(() => {
						uni.switchTab({
							url: "/pages/tabBar/home_page"
						});
					}, 500);
				}).catch(e => {
					uni.showToast({
						title: `${e}`
					});
				});

			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		/* 垂直排列 */
		height: 95vh;
		padding-bottom: 20rpx;
		/* 设置全屏高度 */
		overflow: hidden;

	}

	.top {
		height: 80rpx;
		padding: 10rpx 20rpx;
		overflow: hidden;
	}

	.middle {
		flex: 1;
		overflow: hidden;
	}

	.bottom {
		height: 80rpx;
		background-color: white;
		overflow: hidden;
		/* height: 100rpx; */
	}

	.container1 {
		/* max-width: 800px; */
		/* margin: auto; */
		padding: 10rpx 30rpx;
		background: #fff;
		/* border-radius: 8px; */
		/*box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);*/
	}

	p {
		margin: 20rpx 0;
	}
</style>