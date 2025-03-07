<template>
	<view>
		<uni-search-bar @confirm="doSearch" :focus="true" v-model="searchValue" @cancel="doSearchCancel"
			placeholder="请输入手机号或姓名搜索" />

		<view v-show="isInSearchModel">
			<uni-list v-show="searchResut.length>0" :border="false" :scroll-y="true" enableBackToTop="true">

				<view class="uni-flex list-item-divider "
					style="padding: 10rpx 30rpx; justify-content: space-between;align-items: center;"
					v-for="(item,index) in searchResut" @click="handleItemClick(index)">

					<view class="uni-flex uni-column" style="flex: 3;">
						<view class="uni-flex" style="align-items: center;">
							<view class="label">{{item.userInfo.name}}</view>

							<view class="label">{{ sexDesc(item.userInfo)}}</view>

							<view class="label">{{ item.userInfo.phoneNumber}}</view>
						</view>
						<view style="height: 10rpx;" />

						<view>{{item.createDateTime}}</view>

					</view>

					<view style="margin-right: 20rpx;">
						<view v-if="status==0"
							style="color: #FA541C;font-size: 24rpx;background-color: #FFF2E8;padding: 6rpx 16rpx;border-radius: 10rpx;"
							@click.stop="createRecipe($event,index)">开处方</view>
						<view v-else
							style="margin-right: 20rpx; background-color: #CAD6FF;color:#2260FF ; font-size: 24rpx;padding: 6rpx 14rpx;border-radius: 10rpx;text-align: center;"
							@click.stop="viewRecipe($event,index)">查看处方</view>
					</view>


					<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
				</view>

			</uni-list>

			<view v-show="searchResut.length==0" class="uni-flex"
				style="justify-content: center; padding: 40rpx; font-size: 26rpx;">
				<text>暂无匹配记录</text>
			</view>
		</view>

		<view v-show="!isInSearchModel">
			<uni-list v-if="dataList.length>0" :border="false" :scroll-y="true" enableBackToTop="true">

				<view class="uni-flex list-item-divider "
					style="padding: 10rpx 30rpx; justify-content: space-between;align-items: center;"
					v-for="(item,index) in dataList" @click="handleItemClick(index)">


					<view class="uni-flex uni-column" style="flex: 3;">
						<view class="uni-flex" style="align-items: center;">
							<view class="label">{{item.userInfo.name}}</view>

							<view class="label">{{ sexDesc(item.userInfo)}}</view>

							<view class="label">{{ item.userInfo.phoneNumber}}</view>
						</view>
						<view style="height: 10rpx;" />

						<view>{{item.createDateTime}}</view>
						<!-- <view style="height: 5rpx;" /> -->

					</view>

					<view style="margin-right: 20rpx;">
						<view v-if="status==0"
							style="color: #FA541C;font-size: 24rpx;background-color: #FFF2E8;padding: 6rpx 16rpx;border-radius: 10rpx;"
							@click.stop="createRecipe($event,index)">开处方</view>
						<view v-else
							style="margin-right: 20rpx; background-color: #CAD6FF;color:#2260FF ; font-size: 24rpx;padding: 6rpx 14rpx;border-radius: 10rpx;text-align: center;"
							@click.stop="viewRecipe($event,index)">查看处方</view>
					</view>



					<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
				</view>


				<uni-load-more v-show="isShowLoadMore" @clickLoadMore="clickLoadMore" :status="loadMoreStatus"
					:content-text="contentText"></uni-load-more>
			</uni-list>


			<view v-else class="uni-flex" style="justify-content: center; padding: 40rpx; font-size: 26rpx;">
				<text>暂无处理记录</text>
			</view>
		</view>


		<uni-popup ref="popup">
			<view class="popup-content">
				<view class="uni-flex"
					style="font-size: 28rpx; color: #000; padding-bottom: 10rpx; margin-bottom: 10rpx; align-items: center;">
					<view>请选择处方模版</view>
					<span style="font-size: 22rpx;color: cadetblue; margin-left: 20rpx;"
						v-if="customRecipeTemplateList.length>0">精准推荐</span>
				</view>

				<scroll-view scroll-y="true" style="height: 800rpx;">
					<uni-list-item v-for="(item) in myRecipeTemplateList" clickable
						@click="handleRedipeTemplateItemClick(item)" show-arrow>
						<template v-slot:body>
							<view class="uni-flex uni-column">
								<text> {{item.title}}</text>
								<view style="color: #666; font-size: 26rpx;">{{item.sex==0?"男":"女"}} {{item.sickName}}
									{{item.sportName}} {{item.minAge}}-{{item.maxAge}}岁
								</view>
							</view>

						</template>
					</uni-list-item>
				</scroll-view>

			</view>
		</uni-popup>


	</view>
</template>

<script lang="ts">
	import applyApi from "../../../api/apply_api.js"
	import recipeApi from "../../../api/recipe_api.js";
	import templateApi from "../../../api/template_api.js";
	import { ApplyRecordItem, CustomTemplate, QuestionItem, RecipeItem } from "../../../common/data-model.js";
	import { mapGetters } from 'vuex'
	import { heathAskQuestion } from "../../../common/constants.js";
	export default {

		onLoad(options) {

			uni.setNavigationBarTitle({
				title: "待开方记录"
			})
			if (options.status) {
				this.status = Number(options.status);
				if (this.status == 1) {
					uni.setNavigationBarTitle({
						title: "已开方记录"
					})
				}
			}

			// recipeApi.getRecipeTemplateList({})
			// 	.then(data => {
			// 		this.recipeTemplateList = data.content;
			// 	})
			// 	.catch(e => uni.showToast({
			// 		title: "获取处方模版失败"
			// 	}));


			templateApi.searchCustomTemplate({}).then((data) => {
				this.recipeTemplateList = data.content;
			});

			this.heathAskQuestion = heathAskQuestion().questionsUni1;
		},

		onShow() {
			this.refreshData(this.pageIndex);
		},

		computed: {
			...mapGetters(['userInfo']),
			statusDesc() {
				if (this.status == 0) {
					return "待开方";
				} else {
					return "已开方";
				}
			},

			myRecipeTemplateList() : CustomTemplate[] {
				if (this.customRecipeTemplateList && this.customRecipeTemplateList.length > 0) {
					return this.customRecipeTemplateList;
				}
				return this.recipeTemplateList;
			}
		},
		data() {

			return {

				isInSearchModel: false,
				searchValue: "",
				targetApplyRecord: {} as ApplyRecordItem,	//开方目标item
				recipeTemplateList: [] as CustomTemplate[],

				customRecipeTemplateList: [] as CustomTemplate[], //筛选过的处方模版

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
				pageIndex: 0 as number,
				status: 0,
				loadMoreStatus: 'more',
				isShowLoadMore: false,
				dataList: [] as ApplyRecordItem[],

				searchResut: [] as ApplyRecordItem[],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				heathAskQuestion: [] as QuestionItem[] //健康问卷第一部分题目
			}
		},
		methods: {

			doSearchCancel(res) {
				this.searchResut.length = 0;
				this.isInSearchModel = false;
			},

			doSearch(res) {
				this.isInSearchModel = true;
				uni.showLoading({
					title: "加载中"
				});
				const keyword = res.value;
				applyApi.searchApplyRecordsByKeyword(keyword, this.status).then(data => {
					this.searchResut.length = 0;
					this.searchResut.push(...data.content);
					uni.hideLoading()
				}).catch(e => {
					this.searchResut.length = 0;
					uni.hideLoading()
					uni.showToast({
						title: "" + e,
					})
				});
			},

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

			refreshData(pageIndex : number) {
				uni.showLoading({
					title: "加载中"
				});
				applyApi.searchApplyRecords(pageIndex, 20, this.status).then(data => {
					if (pageIndex == 0) {
						this.dataList.length = 0;
					}
					this.dataList.push(...data.content);
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
			 * 开处方
			 * @param {Object} e
			 * @param {Object} index
			 */
			createRecipe(e, index) {
				var item = this.dataList[index]
				this.targetApplyRecord = item;
				templateApi.getCustomTemplate(item.id).then((data) => {
					this.customRecipeTemplateList = data;
					this.$refs.popup.open('center');
				});


				// if (this.targetApplyRecord.healthQuestion[0]) {
				// 	var targetIndex = this.targetApplyRecord.healthQuestion.split(",")[0];
				// 	var name = this.heathAskQuestion[0].answers[targetIndex];

				// 	recipeApi.getRecipeTemplateList({ "title": name })
				// 		.then(data => {
				// 			this.customRecipeTemplateList = data.content;
				// 			this.$refs.popup.open('center');
				// 		})
				// 		.catch(e => {
				// 			this.customRecipeTemplateList = [];
				// 			uni.showToast({
				// 				title: "获取处方模版失败"
				// 			})
				// 			this.$refs.popup.open('center');
				// 		});
				// } else {
				// 	this.$refs.popup.open('center');
				// }

			},


			/**
			 * 查看处方
			 * @param {Object} e
			 * @param {Object} index
			 */
			viewRecipe(e, index) {
				var applyRecordItem = this.dataList[index]
				uni.showLoading({
					mask: true,
					title: "loading..."
				})
				recipeApi.seachCustomRecipeRecords(applyRecordItem.id, this.userInfo.id)
					.then(value => {
						uni.hideLoading();
						var content = value.content as CustomTemplate[];
						if (content.length > 0) {
							var firstItem = content.shift();
							// console.log(firstItem);
							// console.log(applyRecordItem);
							uni.navigateTo({
								url: `/pages/recipe_detail/custom_recipe_detail?applyRecordItem=${JSON.stringify(applyRecordItem)}&recipeId=${firstItem.id}`
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

			handleRedipeTemplateItemClick(item : CustomTemplate) {
				this.$refs.popup.close();
				uni.navigateTo({
					url: `/pages/make_recipe/make_custom_recipe?applyRecordId=${this.targetApplyRecord.id}&template=${JSON.stringify(item)}`
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

	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.popup-content {
		@include flex;
		// align-items: center;
		justify-content: start;
		padding: 10px;
		width: 600rpx;
		border-radius: 10rpx;
		background-color: #fff;
	}
</style>