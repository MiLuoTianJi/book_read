<style lang="less" scoped>
	.text {
		position: relative;
		display: flex;
		flex-flow: column;
		width: 100%;
		background: rgb(218, 191, 123);
		overflow: hidden;

		&>view {
			background: rgb(218, 191, 123);
		}

		&-header {
			display: flex;
			align-items: center;
			height: 40rpx;
			font-size: 24rpx;
			color: #666;
			margin-left: 10rpx;
		}

		&-main {
			position: relative;
			flex: 1;

			// &>text:first-of-type{
			// 	margin-right: 30rpx;
			// 	font-size: 40rpx;
			// 	font-weight: 700;
			// }
			&-list {
				width: 100%;
				height: 100%;
				padding: 8rpx 20rpx;
				box-sizing: border-box;

				&-item {
					font-size: 36rpx;
					color: #333;
					line-height: 60rpx;
					letter-spacing: 4rpx;
				}
			}

			&-clickBox {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 1;

				&-top {
					height: 20%;
					background: transparent;
				}

				&-middle {
					height: 60%;
					background: transparent;
				}

				&-bottom {
					height: 20%;
					background: transparent;
				}
			}

			&-loading {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
			}
		}

		&-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 40rpx;
			box-sizing: border-box;
			font-size: 20rpx;
		}

		&-textMenuBox {
			color: #fff;
			font-size: 28rpx;

			&-top {
				position: absolute;
				left: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 10%;
				background: rgba(0, 0, 0, .7);
				padding: 40rpx 20rpx 0 20rpx;
				box-sizing: border-box;
				transition: top .3s;
				z-index: 999;

				&>view:last-of-type {
					display: flex;
					align-items: center;

					&>view:first-of-type {
						margin-right: 40rpx;
					}
				}
			}

			&-middle {
				position: absolute;
				left: 0;
				top: 10%;
				width: 100%;
				height: 76%;
			}

			&-bottom {
				position: absolute;
				left: 0;
				width: 100%;
				height: 14%;
				background: rgba(0, 0, 0, .7);
				padding: 20rpx;
				box-sizing: border-box;
				transition: bottom .3s;
				z-index: 999;

				&>view:nth-of-type(1) {
					display: flex;
					justify-content: space-between;
					align-items: center;

					&>view:nth-of-type(1),
					&>view:nth-of-type(3) {
						width: 100rpx;
						text-align: center;
					}

					&>view:nth-of-type(2) {
						width: 450rpx;
					}

					&>view:nth-of-type(3) {}
				}

				&>view:nth-of-type(2) {
					display: flex;
					justify-content: space-between;
					padding: 20rpx;

					&>view {
						display: flex;
						flex-flow: column;
						align-items: center;
					}
				}
			}
		}

		&-popup {
			&-content {
				box-sizing: border-box;
				color: #333;

				&-header {
					&-top {
						height: 60rpx;
						display: flex;
						justify-content: space-between;
						padding: 0 20rpx;
						box-sizing: border-box;
						font-size: 40rpx;
					}

					&-bottom {
						display: flex;
						align-items: center;
						justify-content: center;
						height: 110rpx;
						font-size: 28rpx;

						&>view {
							flex: 0 1 40%;
							text-align: center;
							line-height: 50rpx;
							box-sizing: border-box;
							color: #fb7299;
							border: 2rpx solid #fb7299;
						}

						&-active {
							color: #fff !important;
							background: #fb7299;
						}
					}
				}

				&-middle {
					height: 50rpx;
					line-height: 50rpx;
					font-size: 28rpx;
					padding-left: 30rpx;
					box-sizing: border-box;
					background: #fb7299;
					color: #fff;
				}

				&-item {
					font-size: 28rpx;
					padding: 30rpx 0 30rpx 30rpx;
					box-sizing: border-box;
				}

				&-activeItem {
					color: #fb7299;
				}
			}
		}
	}

	.u-toast {
		background: #fa3534 !important;
	}

	#text-popup-content-list {
		height: auto !important;
	}
</style>

<template>
	<view class="text" :style="{height:'calc(100% - '+safeAreaInsets.top+'px)','padding-top':safeAreaInsets.top+'px'}">
		<view class="text-header" :style="{}">
			<text>{{chapterInfo.chapterName}}</text>
		</view>
		<view class="text-main">
			<!-- <text>{{chapterInfo.chapterName}}</text>
			<br/> -->
			<view class="text-main-loading" v-show="loading">
				<u-loading mode="circle" color="#fb7299" size="100">
				</u-loading>
			</view>
			<view class="text-main-list" v-show="!loading">
				<view v-for="(item,index) in resolutionStrArr[pageIndex]" :key="index"
					:style="{'text-indent':item.isNewRow?'72rpx':'0'}" class="text-main-list-item">
					{{item.text}}
				</view>
			</view>
			<view class="text-main-clickBox" v-show="!loading">
				<view class="text-main-clickBox-top" @click="clickTop"></view>
				<view class="text-main-clickBox-middle" @click="clickMiddle"></view>
				<view class="text-main-clickBox-bottom" @click="clickBottom"></view>
			</view>
		</view>
		<view class="text-footer" :style="{padding: `0 ${safeAreaInsets.top}px`}">
			<text>{{$tools.getNowTime('minutes')}}</text>
			<text>{{(pageIndex+1)+'/'+resolutionStrArr.length}}</text>
		</view>
		<view class="text-textMenuBox">
			<view class="text-textMenuBox-top" :style="{top:textMenu.isShow?'0':'-10%'}">
				<u-icon name="arrow-left" color="#fff" size="34" @click="backBtn"></u-icon>
				<view>
					<view>刷新</view>
					<u-icon name="list" color="#fff" size="40"></u-icon>
				</view>
			</view>
			<view class="text-textMenuBox-middle" @click="clickTextMenuBoxMiddleFn" :style="{
					  display:textMenu.isShow?'block':'none',
					  'z-index':textMenu.isShow?'999':'-1'
					}">
			</view>
			<view class="text-textMenuBox-bottom" :style="{bottom:textMenu.isShow?'0':'-14%'}">
				<view>
					<view @click="goToPreChapterFn">上一章</view>
					<!-- <u-line-progress :striped="true" 
									 :percent="70" 
									 :striped-active="true"
									 :show-percent="false"
									 active-color="#fb7299">
					</u-line-progress> -->
					<u-slider v-model="textMenu.progress" block-color="#fb7299" active-color="#fb7299">
					</u-slider>
					<view @click="goToNextChapterFn">下一章</view>
				</view>
				<view>
					<view @click="chapterListFn">
						<u-icon name="list-dot" color="#fff" size="50">
						</u-icon>
						目录
					</view>
					<view @click="settingFn">
						<u-icon name="setting" color="#fff" size="50">
						</u-icon>
						设置
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="text-chapterListBox">
			
		</view> -->
		<u-popup mode="left" v-model="chapterListBox.show" width="600rpx">
			<view class="text-popup-content"
				:style="{height:'calc(100% - '+safeAreaInsets.top+'px)','padding-top':safeAreaInsets.top+'px'}">
				<view class="text-popup-content-header">
					<view class="text-popup-content-header-top">
						<u-icon name="arrow-left" color="#333" size="34">
						</u-icon>
						<view>{{bookInfo.bookName}}</view>
						<u-icon :name="chapterListBox.asc?'arrow-up-fill':'arrow-down-fill'" color="#333" size="34">
						</u-icon>
					</view>
					<view class="text-popup-content-header-bottom">
						<view :class="chapterListBox.listOrMarks==1?'text-popup-content-header-bottom-active':''"
							@click="listOrMarksClickFn(1)">
							目录{{bookInfo.chapterList?bookInfo.chapterList.length:0}}
						</view>
						<view :class="chapterListBox.listOrMarks==2?'text-popup-content-header-bottom-active':''"
							@click="listOrMarksClickFn(2)">
							书签0
						</view>
					</view>
				</view>
				<view class="text-popup-content-middle">{{chapterListBox.listOrMarks==1?"目录":"书签"}}</view>
				<scroll-view scroll-y="true" :style="{height:'calc(100% - 220rpx)'}">
					<view id="text-popup-content-list">
						<view v-for="item in bookInfo.chapterList || []" :key="item.id"
							:class="item.id==chapterInfo.id?'text-popup-content-item text-popup-content-activeItem':'text-popup-content-item'"
							@click="chooseChapterFn(item)">
							{{item.chapterName}}
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				safeAreaInsets: {
					top: 37
				},
				//书籍信息
				bookInfo: {},
				//章节信息
				chapterInfo: {},
				//下一章的信息
				nextChapterInfo: {},
				//上一章的信息
				preChapterInfo: {},
				//分解好的全部正文
				resolutionStrArr: [],
				//当前页需要显示的正文
				nowTextArr: [],
				//正文区的高宽等信息
				pageInfo: {},
				pageIndex: 0,
				//最大章节数
				chapterTotal: 0,
				//页面跳转的options
				options: {},
				//点击正文中部的菜单
				textMenu: {
					isShow: false,
					//进度
					progress: 70
				},
				//章节列表弹出层
				chapterListBox: {
					show: false,
					//排序方式(是否正序)
					asc: true,
					//1是目录，2是书签
					listOrMarks: 1
				}
			};
		},
		computed: {
			//分解正文需要的参数
			resolutionStrInfo: function() {
				return {
					chapterInfo: this.chapterInfo,
					pageInfo: this.pageInfo
				}
			}
		},
		watch: {
			resolutionStrInfo: {
				handler: async function(newVal) {
					// 第一次进来为了确保信息都拿到之后再执行分割字符串
					// 后面就手动调用
					if (this.resolutionStrArr.length == 0) {
						await this.resolutionStr(newVal)
						this.chapterTotal = this.options.chapterTotal
						this.pageIndex = ~~(this.options.chapterProgress)
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {

		},
		onLoad(options) {
			uni.getSystemInfo({ // 获取当前设备的具体信息
				success: (sysinfo) => {
					this.safeAreaInsets = sysinfo.safeAreaInsets
				}
			});
			if (options.id) {
				this.options = options
				console.log(options)
				this.getText(options.id)
			}
		},
		mounted() {
			this.$nextTick(function() {
				// select中的参数就如css选择器一样选择元素
				let info = uni.createSelectorQuery().in(this).select(".text-main");
				let that = this
				info.boundingClientRect(function(data) {
					//	data - 包含元素的高度等信息
					that.pageInfo = data
				}).exec(function(res) {
					// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
				})
			})
		},
		methods: {
			//分割章节字符串
			resolutionStr: function(resolutionStrInfo) {
				let str = resolutionStrInfo.chapterInfo.chapterText
				let windowWidth = uni.getSystemInfoSync().windowWidth
				//这两个是px，边框是rpx，转一下
				let w = ~~(resolutionStrInfo.pageInfo.width) - (~~(this.$tools.sizeDeal('20rpx', windowWidth)).num * 2)
				let h = ~~(resolutionStrInfo.pageInfo.height) - (~~(this.$tools.sizeDeal('8rpx', windowWidth).num) * 2)
				//下面这三个是rpx,要转一下
				let lh = ~~(this.$tools.sizeDeal('60rpx', windowWidth).num)
				let fs = ~~(this.$tools.sizeDeal('36rpx', windowWidth).num)
				let ls = ~~(this.$tools.sizeDeal('4rpx', windowWidth).num)

				function textNumber(num) {
					return Object.prototype.toString.call(num) == '[object Number]'
				}
				if (str && textNumber(w) && textNumber(h) && textNumber(lh) && textNumber(fs) && textNumber(ls)) {
					let resolutionStrArr = this.$tools.resolutionStr(str, w, h, lh, fs, ls)
					this.resolutionStrArr = resolutionStrArr
					return Promise.resolve(true)
				}
			},
			//返回按钮
			backBtn: async function() {
				await this.saveProgress()
				uni.navigateTo({
					url: '../layout/layout'
				});
			},
			//进来获取正文
			getText: function(id, isChoose) {
				this.loading = true
				this.$request.get('/getText', {
					id: id
				}).then(async (res) => {
					if (res.type) {
						this.chapterInfo = res.data
						if (isChoose) { //区别一下是刚进来还是后面选择的章节
							await this.resolutionStr({
								chapterInfo: this.chapterInfo,
								pageInfo: this.pageInfo
							})
							this.pageIndex = 0
						}
						this.loading = false
						//获取到正文之后开始预请求上一章和下一章
						this.getTextByBookIdAndChapterIndex(res.data.bookId, Number(res.data
							.chapterIndex) - 1, 'preChapterInfo')
						this.getTextByBookIdAndChapterIndex(res.data.bookId, Number(res.data
							.chapterIndex) + 1, 'nextChapterInfo')
					} else {
						this.loading = false
					}
				}).catch(err => {
					this.loading = false
				})
			},
			//通过书籍ID和章节index获取正文
			getTextByBookIdAndChapterIndex: async function(bookId, chapterIndex, path) {
				let params = {
					bookId: bookId,
					chapterIndex: chapterIndex
				}
				await new Promise(resolve => {
					this.$request.get('/getTextByBookIdAndChapterIndex', params).then(res => {
						if (res.type) {
							this[path] = res.data
							resolve(true)
						} else {
							resolve(false)
						}
					}).catch(err => {
						resolve(false)
					})
				})
			},
			//点击正文上部
			clickTop: function() {
				//如果textMenu出来就不触发任何事件
				if (this.textMenu.isShow) return
				if (this.pageIndex <= 0) {
					if (this.chapterInfo.chapterIndex == 0) {
						//说明已经是第一章
						this.$refs.uToast.show({
							title: '已经没有上一章了！',
							type: 'warning',
						})
						return
					}
					// 到顶了还触发事件，说明要换到上一章
					this.goToPreChapterFn()
				} else {
					this.pageIndex--
				}
			},
			//点击正文中部
			clickMiddle: function() {
				this.textMenu.isShow = true
			},
			//点击正文下部
			clickBottom: function() {
				//如果textMenu出来就不触发任何事件
				if (this.textMenu.isShow) return
				if ((this.pageIndex + 1) == this.resolutionStrArr.length) {
					if (this.chapterInfo.chapterIndex == (this.chapterTotal - 1)) {
						//说明已经是最后一章了
						this.$refs.uToast.show({
							title: '已经是最后一章了！',
							type: 'warning',
						})
						return
					}
					// 到底了还触发事件，说明要换到下一章
					this.goToNextChapterFn()
				} else {
					this.pageIndex++
				}
			},
			//请求保存进度接口
			saveProgress: async function() {
				let params = {
					userId: this.$store.state.commonData.userInfo.id,
					bookId: this.chapterInfo.bookId,
					chapterId: this.chapterInfo.id,
					chapterIndex: this.chapterInfo.chapterIndex,
					chapterProgress: this.pageIndex
				}
				let res = await this.$request.post('/setUserBookChapterProgress', params);
				return Promise.resolve(res)
			},
			//上一章
			goToPreChapterFn: async function() {
				// 当前章变成下一章，上一章变成当前章，然后去请求上上章
				// pageIndex变成上一章的length-1
				this.nextChapterInfo = this.chapterInfo
				this.chapterInfo = this.preChapterInfo
				await this.resolutionStr({
					chapterInfo: this.chapterInfo,
					pageInfo: this.pageInfo
				})
				this.pageIndex = this.resolutionStrArr.length - 1
				await this.getTextByBookIdAndChapterIndex(this.preChapterInfo.bookId, Number(this.preChapterInfo
					.chapterIndex) - 1, 'preChapterInfo')
			},
			//下一章
			goToNextChapterFn: async function() {
				// 当前章变成上一章，下一章变成当前章，然后去请求下下章
				// pageIndex变成0
				this.preChapterInfo = this.chapterInfo
				this.chapterInfo = this.nextChapterInfo
				await this.resolutionStr({
					chapterInfo: this.chapterInfo,
					pageInfo: this.pageInfo
				})
				this.pageIndex = 0
				await this.getTextByBookIdAndChapterIndex(this.nextChapterInfo.bookId, Number(this.nextChapterInfo
					.chapterIndex) + 1, 'nextChapterInfo')
			},
			//点击textMenuBox中部
			clickTextMenuBoxMiddleFn: function() {
				this.textMenu.isShow = false
			},
			//目录
			chapterListFn: function() {
				this.textMenu.isShow = false
				if (!this.bookInfo.chapterList || !this.bookInfo.chapterList.length > 0) {
					this.getBookDetailFromDB()
				}
				setTimeout(() => {
					this.chapterListBox.show = true
				}, 300)
			},
			//获取书籍详情
			getBookDetailFromDB: function() {
				this.$request.get('/detailFromDB', {
					id: this.chapterInfo.bookId
				}).then(res => {
					this.bookInfo = res.data
					// setTimeout(()=>{
					// 	uni.createSelectorQuery().in(this).select("#text-popup-content-list").boundingClientRect(e=>{
					// 		console.log(e);
					// 		uni.pageScrollTo({
					// 			duration:0,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
					// 			scrollTop: 500,//滚动到目标位置
					// 			selector:"#text-popup-content-list",
					// 			success:function(e){
					// 				console.log('success',e)
					// 			},
					// 			fail:function(e){
					// 				console.log('fail',e)
					// 			},
					// 			complete:function(e){
					// 				console.log('complete',e)
					// 			},
					// 		})
					// 	}).exec(function(res){
					// 		// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
					// 	})

					// },1000)
				})
			},
			//设置
			settingFn: function() {

			},
			//切换目录和书签
			listOrMarksClickFn: function(type) {
				this.chapterListBox.listOrMarks = type
			},
			//选择章节
			chooseChapterFn: function(item) {
				this.chapterListBox.show = false
				this.getText(item.id, true)
			}
		},
		onBackPress() {
			this.saveProgress()
		},

	}
</script>
