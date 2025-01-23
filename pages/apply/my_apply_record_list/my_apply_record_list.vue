<template>
	<view>
		<uni-list>
			<uni-list-item @click="handleItemClick(index)" clickable="true" show-arrow="true"
				v-for="(item,index) in this.dataList" :title="item.createDateTime" :right-text="statusDesc">
				<template v-slot:footer>
					<view class="accent-color">{{statusDesc}} </view>
				</template>

			</uni-list-item>
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
			applyApi.getApplyRecords({
				"status": this.status
			}).then(data => {
				console.log(data);
				this.dataList = data.content;
				uni.hideLoading()
			}).catch(e => {
				uni.hideLoading()
				uni.showToast({
					title: "" + e,
				})
			});
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
				status: 0,
				dataList: [],
			}
		},
		methods: {
			handleItemClick(index) {
				var item = this.dataList[index]
				uni.navigateTo({
					url: "/pages/apply/apply_record_detail_page/apply_record_detail_page?id=" + item.id
				})
			}
		}
	}
</script>

<style>

</style>