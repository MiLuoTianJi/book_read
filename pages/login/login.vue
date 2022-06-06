<style lang="less" scoped>
	.login{
		&-header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100rpx;
			background: #fb7299;
			color: #fff;
			padding: 0 20rpx;
		}
		&-main{
			display: flex;
			flex-flow: column;
			align-items: center;
			&>view{
				width: 80%;
			}
			&-confirmBtn{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 80rpx;
				background: #fb7299;
				color: #fff;
				margin-top: 20rpx;
				border-radius: 12rpx;
			}
			& .u-input{
				border-bottom:2rpx solid #666
			}
			/deep/& .uni-input-input{
				color: #666;
			}
		}
		
	}
</style>

<template>
	<view class="login" :style="{height:'calc(100% - '+safeAreaInsets.top+'px)'}">
		<view class="login-header" :style="{'padding-top':safeAreaInsets.top+'px'}">
			<evan-icons type="chevron-left"
						color="#fff"
						@click="backBtn">
			</evan-icons>
			<text>用户登录</text>
			<view></view>
		</view>
		<view class="login-main">
			<u-form :model="form" ref="uForm" border-bottom label-position='top'>
				<u-form-item label="账户名：" border-bottom>
					<u-input v-model="form.account" placeholder="请输入账户名" />
				</u-form-item>
				<u-form-item label="密码：" border-bottom>
					<u-input v-model="form.password" type="password"  placeholder="请输入密码" />
				</u-form-item>
			</u-form>
			<view class="login-main-confirmBtn" @click="confirmFn">登录</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					account:"",
					password:"",
				},
				safeAreaInsets:{top:37}
			};
		},
		created(){
			
		},
		onLoad() {
			uni.getSystemInfo({ // 获取当前设备的具体信息
				success: (sysinfo) => {
					this.safeAreaInsets=sysinfo.safeAreaInsets
				}
			});
		},
		methods:{
			//返回
			backBtn:function (params){
				let url='../layout/layout?barIndex=2'
				if (params) {
					url=this.$tools.concatToURL(url,params)
				}
				uni.navigateTo({
				    url:url
				});
			},
			//注册按钮
			confirmFn:function () {
				this.$request.post('/login',this.form).then(res=>{
					if (res.type) {
						this.$refs.uToast.show({
							title: '登录成功！',
							type: 'success',
							callback:()=>{
								this.backBtn(this.form)
							}
						})
						this.$tools.login(this.form).then(res=>{
							if (res.type) {
								this.$store.commit('commonData/setUserInfo',res)
							}
						})
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
				})
			},
		}
	
	}
</script>