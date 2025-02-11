<template>
	<view>
		<uni-list>


			<uni-list-item v-if="this.status == 0" @click="handleItemClick(index)" clickable show-arrow
				v-for="(item,index) in this.dataList" :title="item.createDateTime">
				<template v-slot:footer>
					<view class="accent-color">{{statusDesc}} </view>
				</template>
			</uni-list-item>

			<uni-list-item v-else @click="handleItemClick(index)" clickable show-arrow
				v-for="(item,index) in dataList" :title="item.createDateTime">
				<template v-slot:footer>
					<button style="margin-right: 20rpx; " @click.stop="viewRecipe(item)">查看处方</button>
				</template>
			</uni-list-item>
			<uni-load-more v-show="isShowLoadMore" @clickLoadMore="clickLoadMore" :status="loadMoreStatus"
				:content-text="contentText"></uni-load-more>
		</uni-list>

	</view>
</template>

<script lang="ts">
	import applyApi from "../../../api/apply_api.js"
	import {
		dateUtils
	} from "../../../common/util.js";
	import recipeApi from "../../../api/recipe_api.js";

	export default {

		onLoad(options) {
			uni.setNavigationBarTitle({
				title: "待开运动处方"
			})
			if (options.status) {
				this.status = options.status;
				if (this.status == 1) {
					uni.setNavigationBarTitle({
						title: "历史运动处方"
					})
				}
			}

			this.refreshData(0);
		},

		mounted() {
			uni.showLoading({
				title: "加载中"
			});
		},

		computed: {
			statusDesc() {
				if (this.status == 0) {
					return "待开方";
				} else {
					return "已开方";
				}
			}
		},

		data() {

			return {
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
			refreshData(pageIndex) {
				applyApi.getMyApplyRecords({
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
			 * 查看处方
			 * @param {Object} e
			 * @param {Object} index
			 */
			viewRecipe(applyRecordItem) {
				uni.showLoading({
					mask: true,
					title: "loading..."
				})
				recipeApi.seachRecipeRecords(applyRecordItem.id, null)
					.then(value => {
						uni.hideLoading();
						var content = value.content as[];
						if (content.length > 0) {
							var firstItem = content.shift();
							console.log(firstItem);
							console.log(applyRecordItem);
							uni.navigateTo({
								url: `/pages/recipe_detail/recipe_detail?applyRecordItem=${JSON.stringify(applyRecordItem)}&recipeItem=${JSON.stringify(firstItem)}`
							});
						} else {
							uni.showToast({
								title: "打开处方失败"
							})
						}
					})
					.catch(e => {
						uni.hideLoading();
						console.log(e);
						uni.showToast({
							title: "" + e
						})
					});


			},
		}
	}
</script>

<style lang="scss">
	button {
		border-color: $uni-color-primary;
		padding: 0rpx 20rpx;
		font-size: 18rpx;
		border-width: 1rpx;
		border-style: solid;
		border-radius: 10rpx;
		background-color: white;
	}
</style>