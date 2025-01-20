<template>
	<view>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';

	import user_api from '../../api/user_api';

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(['isLogin', 'userInfo']),
		},

		created() {
			if (this.isLogin) {
				user_api.getUser(this.userInfo.id).then(userData => {
					this.setUserInfo(userData);
				}).catch(e => {
					console.log("同步数据失败" + e);
				});
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
			...mapMutations(['setUserInfo'])
		}
	}
</script>

<style>

</style>