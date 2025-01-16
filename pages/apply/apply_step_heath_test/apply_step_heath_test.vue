<template>
	<view class="container">
		<view class="top">
			<uni-steps class=" card" :options="stepMenus" :active="active" />
		</view>

		<scroll-view class="middle" scroll-y="true">
			<view class="uni-flex uni-column">

			</view>
		</scroll-view>

		<view class="bottom ">
			<button class="next-button">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
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

		}
	}
</script>

<style>

</style>