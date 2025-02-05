<template>
	<view>
		<uni-list>
			<uni-list-item @click="handleItemClick(index)" clickable show-arrow v-for="(item,index) in this.dataList"
				:title="item.createDateTime" :right-text="statusDesc">
				<template v-slot:footer>
					<view class="accent-color">{{statusDesc}} </view>
				</template>
			</uni-list-item>
			<uni-load-more v-show="isShowLoadMore" @clickLoadMore="clickLoadMore" :status="loadMoreStatus"
				:content-text="contentText"></uni-load-more>
		</uni-list>

	</view>
</template>

<script>
	import applyApi from "../../../api/apply_api.js"
	import {
		dateUtils
	} from "../../../common/util.js";

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
				applyApi.getApplyRecords({
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
				// uni.showToast({
				// 	icon: 'none',
				// 	title: "当前状态：" + e.detail.status
				// })
			}
		}
	}
</script>

<style>

</style>