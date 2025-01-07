<template>
	<view>
		<web-view :webview-styles="webviewStyles"
			src="https://static-mp-3fa417de-ad4a-45be-a3c4-d7ba2040c23a.next.bspapp.com/private/%E9%9A%90%E7%A7%81%E6%94%BF%E7%AD%96-%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.html" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333',
					}
				},
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>