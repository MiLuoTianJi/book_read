<script>
	export default {
		onLaunch: function() {
			// console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			// console.log('App Launch')
			if (uni.getStorageSync('userInfo')) {
				this.$tools.login(JSON.parse(uni.getStorageSync('userInfo'))).then(res=>{
					if (res.type) {
						this.$store.commit('commonData/setUserInfo',res)
					}
				})
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	html,body,uni-page-body{
		width: 100%;
		height: 100%;
	}
	*{
		margin: 0;
		padding: 0;
	}
	.divInput{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 500rpx;
		height: 60rpx;
		background: #fff;
		border-radius: 12rpx;
		padding: 0 20rpx;
		&-icon{

		}
		&>view:last-of-type{
			margin-left: 10rpx;
			width: 300rpx;
			height: 100%;
		}
		& .u-input__right-icon{
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar
    {
        width: 16upx!important;
        height: 16upx!important;
        background-color: #F5F5F5;
    }
	/*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track
    {
        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #fff;
    }
      
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #666;
    }
</style>
