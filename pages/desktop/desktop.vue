<style lang="less" scoped>
	.desktop {
		width: 100%;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			background: #fb7299;
			color: #fff;
			padding: 0 20rpx;

			&>view {
				flex: 0 1 33.33%;
			}

			&-user {}

			&-name {
				text-align: center;
			}

			&-button {
				display: flex;
				justify-content: flex-end;

				&>text:last-of-type {
					margin-left: 52rpx;
				}
			}
		}

		.bookList {
			width: 100%;
			height: calc(100% - 80rpx);
			max-height: calc(100% - 80rpx);
			overflow: scroll;

			&-box {
				display: grid;
				grid-template-columns: repeat(3, 33.33%);
				padding: 10rpx;

				&-item {
					display: flex;
					flex-flow: column;
					align-items: center;
					justify-content: center;
					min-height: 300rpx;
					font-size: 24rpx;

					&-loading {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 70%;
						height: 70%;
					}

					&-img {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 70%;
						height: 70%;

						&>img {
							width: 100%;
							height: 100%;
						}
					}

					&-name {
						height: 60rpx;
						line-height: 60rpx;
						width: 80%;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>

<template>
	<view class="desktop" :style="{height:'calc(100% - '+safeAreaInsets.top+'px)'}">
		<view class="header" :style="{'padding-top':safeAreaInsets.top+'px'}">
			<view class="header-user">
				<evan-icons type="user" color="#fff"></evan-icons>
			</view>
			<view class="header-name">
				我的书架
			</view>
			<view class="header-button">
				<evan-icons type="search" color="#fff" @click="searchBtn">
				</evan-icons>
				<evan-icons type="plus" color="#fff"></evan-icons>
			</view>
		</view>
		<view class="bookList">
			<view class="bookList-box">
				<view class="bookList-box-item" v-for="(item,index) in bookList" :key="index" @click="clickItem(item)">
					<view v-show="loadingObj[item.id]" class="bookList-box-item-loading">
						<u-loading mode="circle" color="#fb7299" size="100">
						</u-loading>
					</view>
					<view v-show="!loadingObj[item.id]" class="bookList-box-item-img">
						<img :src="item.imgSrc || '../../static/images/nocover.jpg'" alt="">
					</view>
					<text class="bookList-box-item-name">{{item.bookName+item.bookName+item.bookName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			safeAreaInsets: {
				type: Object,
				default: () => ({
					top: 37
				})
			}
		},
		data() {
			return {
				bookTotalObj: {},
				loadingObj: {}
			};
		},
		computed: {
			bookList() {
				return this.$store.state.commonData.userInfo.bookList;
			}
		},
		onLoad() {

		},
		created() {

		},
		mounted() {

		},
		watch: {
			bookList: {
				handler(newVal) {
					if (newVal) {
						this.getChapterTotalByBookId()
					}
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			//获取用户书籍
			getUserInfo: function() {
				if (uni.getStorageSync('userInfo')) {
					this.$tools.login(JSON.parse(uni.getStorageSync('userInfo'))).then(res => {
						if (res.type) {
							this.$store.commit('commonData/setUserInfo', res)
						}
					})
				}
			},
			//搜索按钮
			searchBtn: function() {
				uni.navigateTo({
					url: '../search/search'
				});
			},
			//根据bookId请求有多少章节
			getChapterTotalByBookId: async function() {
				for (let i = 0; i < this.bookList.length; i++) {
					this.$set(this.loadingObj, this.bookList[i].id, true)
					let res = this.getDetail(this.bookList[i].id);

				}
			},
			// 获取书籍详情
			getDetail(id) {
				return new Promise(resolve => {
					this.$request.get('/detail', {
						id
					}).then(res => {
						if (res.type) {
							this.bookTotalObj[id] = res.data;
						}
						this.$set(this.loadingObj, id, false);
						resolve()
					}).catch(err => {
						this.$set(this.loadingObj, id, false);
						resolve(false)
						this.$refs.uToast.show({
							title: '获取书籍详情失败！',
							type: 'warning',
						})
					})
				})
			},
			clickItem: async function(item) {
				let bookDetail = this.bookTotalObj[item.id];
				let {
					chapterList
				} = bookDetail;
				let queryData = {
					// bookId: item.id,
					// chapterId: chapterList[0],
					// chapterIndex: res.data.chapterIndex,
					// id:res.data.chapterId,
					...chapterList[0],
					// chapterProgress: res.data.chapterProgress,
					chapterTotal: chapterList.length
				}
				let params = {
					userId: this.$store.state.commonData.userInfo.id,
					bookId: item.id
				}
				//先去请求进度接口
				let progressRes = await this.$request.get('/getUserBookChapterProgress', params);
				if (!progressRes.type) {
					console.log(item)
				} else {
					queryData = {
						...queryData,
						...progressRes.data,
						id: progressRes.data.chapterId,
					}
				}
				uni.navigateTo({
					url: this.$tools.concatToURL('../text/text', queryData)
				});
			}
		}
	}
</script>
