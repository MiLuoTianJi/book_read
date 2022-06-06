<style lang="less" scoped>
	.register{
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
	<view class="register" :style="{height:'calc(100% - '+safeAreaInsets.top+'px)'}">
		<view class="register-header" :style="{'padding-top':safeAreaInsets.top+'px'}">
			<evan-icons type="chevron-left"
						color="#fff"
						@click="backBtn">
			</evan-icons>
			<text>用户注册</text>
			<view></view>
		</view>
		<view class="register-main">
			<u-form :model="form" ref="uForm" border-bottom label-position='top'>
				<u-form-item label="昵称：" border-bottom>
					<u-input v-model="form.name"  placeholder="请输入昵称"/>
				</u-form-item>
				<u-form-item label="账户名：" border-bottom>
					<u-input v-model="form.account"  placeholder="请输入账户名"/>
				</u-form-item>
				<u-form-item label="密码：" border-bottom>
					<u-input v-model="form.password" type="password"  placeholder="请输入密码"/>
				</u-form-item>
				<u-form-item label="确认密码：" border-bottom>
					<u-input v-model="form.password_2" type="password"  placeholder="请再次输入密码"/>
				</u-form-item>
			</u-form>
			<view class="register-main-confirmBtn" @click="confirmFn">注册</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					name:"",
					account:"",
					password:"",
					password_2:"",
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
				this.$request.post('/register',this.form).then(res=>{
					if (res.type) {
						this.$refs.uToast.show({
							title: '注册成功！',
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