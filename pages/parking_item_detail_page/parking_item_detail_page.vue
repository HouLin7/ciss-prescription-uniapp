<template>

	<view>
		<parkingPostComponent :edit-flag="editFlag" :postParkingItem="parkingItem"></parkingPostComponent>

	</view>
</template>

<script>	
	import parkingPostComponent from "../../components/parking_post_componet.vue";

	export default {
		components: {
			parkingPostComponent
		},

		data() {
			return {
				parkingItem: {},
				editFlag: 1,
			};
		},


		onLoad(params) {
			if ("item" in params) {
				let item = params["item"];
				this.parkingItem = decodeURIComponent(item) ;
				if ("editFlag" in params) {
					this.editFlag = params["editFlag"];
				} else {
					this.editFlag = 1;
				}				
			}
		}
	}
</script>