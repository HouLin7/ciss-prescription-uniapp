<template>
	<view>
		<uni-list>


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
			applyApi.getApplyRecords().then(data => {
				console.log(data);
				uni.hideLoading()
			}).catch(e => {
				uni.hideLoading()
			});
		},

		mounted() {
			uni.showLoading({
				title: "加载中"
			});
		},

		data() {

			return {
				status: 10
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>