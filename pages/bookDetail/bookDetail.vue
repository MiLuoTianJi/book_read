<style lang="less" scoped>
	.bookDetail{
		width: 100%;
		&-header{
			position: relative;
			overflow: hidden;
			width: 100%;
			padding: 0 20rpx 30rpx 20rpx;
			box-sizing: border-box;
			color: #fff;
			&-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;
				&>view{
					font-size: 20rpx;
					padding: 8rpx 12rpx;
					border: 2rpx solid #fff;
					border-radius: 8rpx;
				}
			}
			&-main{
				display: flex;
				margin-top: 30rpx;
				&-img{
					width: 200rpx;
					height: 240rpx;
					&>image{
						width: 100%;
						height: 100%;
					}
				}
				&-info{
					display: flex;
					flex-flow: column;
					justify-content: space-between;
					margin-left: 30rpx;
					padding-bottom: 14rpx;
					box-sizing: border-box;
					&>view{
						text-overflow: ellipsis;
						font-size: 20rpx;
						&:first-of-type{
							font-size: 40rpx;
						}
					}
				}
			}
			&-background{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				transform: scale(1.5);
				filter: blur(20px) brightness(70%);
				z-index: -999;
			}
		}
		&-main{
			font-size: 24rpx;
			color: #666;
			&>view{
				padding: 20rpx;
				box-sizing: border-box;
			}
			&-introduction{
				&>text{
					text-indent:48rpx
				}
			}
			&-lastChapterList{}
			&-allChapterList{}
			&-header{
				font-size: 32rpx;
				font-weight: 600;
				color: #333;
				margin-bottom: 20rpx;
			}
		}
		&-fenge{
			width: 100%;
			height: 12rpx;
			background: #eee;
			padding:0 !important
		}
		.chapterItem{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0 20rpx 12rpx;
			box-sizing: border-box;
			border-bottom: 2rpx dashed #eee;
			&:active{
				background: #fafafa;
			}
		}
	}
</style>

<template>
	<view class="bookDetail" :style="{height:'calc(100% - '+safeAreaInsets.top+'px)'}">
		<view class="bookDetail-header" :style="{'padding-top':safeAreaInsets.top+'px',}">
			<view class="bookDetail-header-top">
				<evan-icons type="chevron-left"
							color="#fff"
							@click="backBtn">
				</evan-icons>
				<view>书架</view>
			</view>
			<view class="bookDetail-header-main">
				<view class="bookDetail-header-main-img">
					<image :src="bookInfo.imgSrc" mode="" />
				</view>
				<view class="bookDetail-header-main-info">
					<view>{{bookInfo.bookName}}</view>
					<view>{{'作者：'+bookInfo.author}}</view>
					<view>{{'类型：'+bookInfo.type}}</view>
					<view>{{'最后更新时间：'+bookInfo.lastUpdateTime}}</view>
				</view>
			</view>
			<image :src="bookInfo.imgSrc" class="bookDetail-header-background" mode="" />
		</view>
		<view class="bookDetail-main">
			<view class="bookDetail-fenge"></view>
			<view class="bookDetail-main-introduction">
				<view class="bookDetail-main-header">简介</view>
				<text>{{bookInfo.introduction}}</text>
			</view>
			<view class="bookDetail-fenge"></view>
			<view class="bookDetail-main-lastChapterList">
				<view class="bookDetail-main-header">最新章节</view>
				<view>
					<view class="chapterItem" @click="chapterItemDetailFn(bookInfo.chapterList[bookInfo.chapterList.length-1].id)">
						<text>{{bookInfo.lastChapter}}</text>
						<evan-icons type="chevron-right" color="#999" size="10"></evan-icons>
					</view>
				</view>
			</view>
			<view class="bookDetail-fenge"></view>
			<view class="bookDetail-main-allChapterList">
				<view class="bookDetail-main-header">目录</view>
				<view class="bookDetail-main-allChapterList-list">
					<view class="bookDetail-main-allChapterList-list-item chapterItem"
						  v-for="(item,index) in bookInfo.chapterList"
						  :key="index"
						  @click="chapterItemDetailFn(item.id)">
						<text>{{item.chapterName}}</text>
						<evan-icons type="chevron-right" color="#999" size="10"></evan-icons>
					</view>
				</view>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookInfo:{
					// id
					// bookName
					// imgSrc
					// author
					// type
					// lastUpdateTime
					// lastChapterUrl
					// lastChapter
					// pageUrl
					// category
					// status
					// wordsNumber
				},
				safeAreaInsets:{top:37}
			};
		},
		created(){
			
		},
		onLoad(option) {
			uni.getSystemInfo({ // 获取当前设备的具体信息
				success: (sysinfo) => {
					this.safeAreaInsets=sysinfo.safeAreaInsets
				}
			});
			if (option.id) {
				this.getDetail(option.id)
			}
		},
		methods:{
			//返回
			backBtn:function (params){
				uni.navigateTo({
				    url:'../search/search'
				});
			},
			//进来请求书籍详情
			getDetail:function (id) {
				this.$request.get('/detail',{id:id}).then(res=>{
					if (res.type) {
						this.bookInfo=res.data
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
				})
			},
			//点击章节，获取正文
			chapterItemDetailFn:function (id) {
				uni.navigateTo({
				    url:`../text/text?id=${id}&chapterTotal=${this.bookInfo.chapterList.length}`
				});
			}
		}
	
	}
</script>