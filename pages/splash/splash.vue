<template>
	<view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';;
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['isLogin']),
		},
		
		created() {
			if (this.isLogin) {
				uni.switchTab({
					url: "/pages/tabBar/home_page",
				});
			} else {
				uni.redirectTo({
					url: "/pages/login/login-by-phone",
				});
			}
		},

		methods: {

		}
	}
</script>

<style>

</style>