<style lang="less" scoped>
	.search {
		width: 100%;

		&-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			background: #fb7299;
			color: #fff;
			padding: 0 20rpx;
		}

		&-main {
			width: 100%;
			height: calc(100% - 100rpx);
			overflow-y: auto;
			padding: 10rpx;
			box-sizing: border-box;

			&-loading {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			&-list {
				&-result {
					font-size: 20rpx;
					color: #666;
					margin-bottom: 20rpx;
				}

				&-item {
					display: flex;
					align-items: center;
					border-bottom: 2rpx solid #eee;
					padding: 10rpx 20rpx 10rpx 10rpx;

					&:active {
						background: #fafafa;
					}

					&-img {
						width: 200rpx;
						height: 240rpx;

						&>image {
							width: 100%;
							height: 100%;
						}
					}

					&-info {
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: calc(100% - 200rpx);
						height: 240rpx;

						&-bookInfo {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							height: 100%;
							padding: 24rpx 0 24rpx 30rpx;
							box-sizing: border-box;

							&>text:first-of-type {
								font-weight: 580;
								font-size: 36rpx;
							}

							&>text:last-of-type {
								font-size: 20rpx;
								color: #666;
							}
						}

						&-collectionInfo {
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 40rpx;

							&>view {
								font-size: 24rpx;
								color: 666;
							}
						}
					}
				}
			}

			&-noBook {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #666;
			}
		}
	}
</style>

<template>
	<view class="search" :style="{height:'calc(100% - '+safeAreaInsets.top+'px)'}">
		<view class="search-header" :style="{'padding-top':safeAreaInsets.top+'px'}">
			<evan-icons type="chevron-left" color="#fff" @click="backBtn">
			</evan-icons>
			<view class="search-header-input divInput">
				<evan-icons type="search" color="#666" class="divInput-icon"></evan-icons>
				<u-input v-model="searchText" type="text" height="60" placeholder="搜索书名或作者" />
			</view>
			<view @click="searchFn">搜索</view>
		</view>
		<view class="search-main">
			<view class="search-main-loading" v-show="loading">
				<u-loading mode="circle" color="#fb7299" size="100">
				</u-loading>
			</view>
			<view class="search-main-list" v-show="!loading && !noBook">
				<view class="search-main-list-result">
					共<text>{{bookList.length}}</text>条搜索结果
				</view>
				<view class="search-main-list-item" v-for="(item,index) in bookList" :key="index"
					@click="checkBookDetailFn(item)">
					<view class="search-main-list-item-img">
						<image :src="item.imgSrc || '../../static/images/nocover.jpg'" mode=""></image>
					</view>
					<view class="search-main-list-item-info">
						<view class="search-main-list-item-info-bookInfo">
							<text>{{item.bookName}}</text>
							<text>作者：{{item.author}}</text>
						</view>
						<view v-if="$store.state.commonData.userInfo.id"
							class="search-main-list-item-info-collectionInfo">
							<view v-if="$store.state.commonData.userInfo.bookListIdList.indexOf(item.id)!=-1">已加入</view>
							<u-icon name="plus-circle" color="#fb7299" size="50" @click.native.stop="collectionFn(item)"
								v-else>
							</u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="search-main-noBook" v-show="!loading && noBook">
				暂无数据
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText: "",
				safeAreaInsets: {
					top: 37
				},
				bookList: [],
				noBook: false,
				isSearch: false,
				loading: false
			};
		},
		created() {

		},
		onLoad() {
			uni.getSystemInfo({ // 获取当前设备的具体信息
				success: (sysinfo) => {
					this.safeAreaInsets = sysinfo.safeAreaInsets
				}
			});
		},
		methods: {
			//返回按钮
			backBtn: function() {
				uni.navigateTo({
					url: '../layout/layout'
				});
			},
			//搜索按钮
			searchFn: function() {
				this.loading = true;
				this.$request.get('/search', {
					text: this.searchText
				}).then(res => {
					if (!res || res.length == 0) {
						this.noBook = true;
					} else {
						this.noBook = false;
					}
					this.bookList = res || [];
					this.loading = false;
				}).catch(err => {
					this.loading = false;
					this.noBook = true;
				})
			},
			//bookList右边收藏按钮
			collectionFn: function(item) {
				let params = {
					bookId: item.id,
					userId: this.$store.state.commonData.userInfo.id,
					type: true, //true新增  false取消
				}
				this.$request.post('/collection', params).then(res => {
					//调登录接口重新获取信息
					this.$refs.uToast.show({
						title: res.msg,
						type: res.type ? 'success' : 'warning',
					})
					this.$tools.login(this.$store.state.commonData.userInfo).then(res => {
						if (res.type) {
							this.$store.commit('commonData/setUserInfo', res)
						}
					})
				}).catch(err => {

				})
			},
			//查看书籍详情
			checkBookDetailFn: function(item) {
				uni.navigateTo({
					url: '../bookDetail/bookDetail?id=' + item.id
				});
			}
		}

	}
</script>
