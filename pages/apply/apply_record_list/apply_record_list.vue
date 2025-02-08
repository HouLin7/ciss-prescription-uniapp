<template>
	<view>
		<uni-list :border="false" :scroll-y="true" enableBackToTop="true">

			<view class="uni-flex list-item-divider "
				style="padding: 10rpx 30rpx; justify-content: space-between;align-items: center;"
				v-for="(item,index) in this.dataList" @click="handleItemClick(index)">
				<view class="uni-flex uni-column">
					<view class="uni-flex" style="align-items: center;">
						<view class="label">{{item.userInfo.name}}</view>

						<view class="label">{{ sexDesc(item.userInfo)}}</view>

						<view class="label">{{ item.userInfo.phoneNumber}}</view>
					</view>
					<view style="height: 10rpx;" />
					<view class="uni-flex" style="align-items: center;">
						<view>{{item.createDateTime}}</view>
						<button style="margin-left: 200rpx;" @click.stop="prescribe($event,index)">开处方</button>
					</view>
					<view style="height: 5rpx;" />

				</view>

				<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
			</view>

			<!-- 			<uni-list-item @click="handleItemClick(index)" clickable show-arrow v-for="(item,index) in this.dataList">
				<template v-slot:header>
					<view style="width: 10rpx;"> </view>
				</template>

				<template v-slot:body>
					<view class="uni-flex uni-column">
						<view class="uni-flex" style="align-items: center;">
							<view class="label">{{item.userInfo.name}}</view>

							<view class="label">{{ sexDesc(item.userInfo)}}</view>

							<view class="label">{{ item.userInfo.phoneNumber}}</view>
						</view>
						<view style="height: 20rpx;"></view>
						<view class="uni-flex" style="align-items: center;">
							<view>{{item.createDateTime}}</view>
							<button style="margin-left: 140rpx;" @click="prescribe">开处方</button>
						</view>
					</view>
				</template>
			</uni-list-item> -->


			<uni-load-more v-show="isShowLoadMore" @clickLoadMore="clickLoadMore" :status="loadMoreStatus"
				:content-text="contentText"></uni-load-more>
		</uni-list>

	</view>
</template>

<script>
	import applyApi from "../../../api/apply_api.js"
	export default {

		onLoad(options) {
			uni.setNavigationBarTitle({
				title: "待开方记录"
			})
			if (options.status) {
				this.status = options.status;
				if (this.status == 1) {
					uni.setNavigationBarTitle({
						title: "已开方记录"
					})
				}
			}
		},

		created() {
			this.refreshData(0);
		},

		mounted() {
			uni.showLoading({
				title: "加载中"
			});
		},

		computed: {

			statusDesc() {
				if (status == 0) {
					return "待开方";
				} else {
					return "已开方";
				}
			}
		},
		data() {

			return {

				isReadonly: true,
				radioList: [{
						label: "选项1",
						value: "A"
					},
					{
						label: "选项2",
						value: "B"
					}
				],
				selectedRadio: "A",
				pageIndex: 0,
				status: 0,
				loadMoreStatus: 'more',
				isShowLoadMore: false,
				dataList: [],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		methods: {
			onRadioChange(event) {
				if (this.isReadonly) {
					return; // 如果是只读状态，不允许修改
				}
				this.selectedRadio = event.detail.value; // 正常更新值
			},
			sexDesc(userInfo) {
				if (userInfo.sex == 0) {
					return "男";
				} else {
					return "女";
				}
			},
			refreshData(pageIndex) {
				applyApi.searchApplyRecords({
					"status": this.status,
					"pageIndex": pageIndex,
					"pageSize": 10,
				}).then(data => {
					console.log(data);
					this.dataList.push(...data.content);
					// this.dataList = data.content;
					uni.hideLoading()
					if (data.last) {
						this.isShowLoadMore = false;
						this.loadMoreStatus = "noMore";
					} else {
						this.isShowLoadMore = true;
					}
					this.pageIndex = pageIndex;
				}).catch(e => {
					uni.hideLoading()
					uni.showToast({
						title: "" + e,
					})
				});
			},

			handleItemClick(index) {
				var item = this.dataList[index]
				uni.navigateTo({
					url: "/pages/apply/apply_record_detail_page/apply_record_detail_page?id=" + item.id
				})
			},
			clickLoadMore(e) {
				this.loadMoreStatus = "loading";
				this.refreshData(this.pageIndex + 1);				
			},

			/**
			 * 开处方事件
			 * @param {Object} e
			 * @param {Object} index
			 */
			prescribe(e, index) {
				var item = this.dataList[index]
				uni.navigateTo({
					url: "/pages/make_recipe/make_recipe?applyRecordId=" + item.id
				})
			}

		}
	}
</script>

<style lang="scss">
	button {
		border-color: $uni-color-primary;
		// height: 40rpx;
		padding: 0rpx 20rpx;
		font-size: 18rpx;
		border-width: 1rpx;
		border-style: solid;
		border-radius: 10rpx;
		background-color: white;
	}

	.label {
		margin-right: 60rpx;
		// font-weight: bold;
		// font-size: 30rpx;
	}

	.list-item-divider {
		border-bottom: 0.1rpx solid #ddd;
		margin: 0rpx 0rpx;
	}
</style>