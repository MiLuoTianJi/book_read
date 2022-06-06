<style lang="less" scoped>
	.mine{
		.header{
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;
			&>view:first-of-type{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 140rpx;
				height: 140rpx;
				border: 10rpx solid #fb7299;
				border-radius: 50%;
				margin-bottom: 20rpx;
			}
			.noUser{
				width: 70%;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>

<template>
	<view class="mine" :style="{height:'calc(100% - '+safeAreaInsets.top+'px)'}">
		<view class="header" :style="{'padding-top':(safeAreaInsets.top)+'px'}">
			<view>
				<u-icon name="account" color="#fb7299" size="100"></u-icon>
			</view>
			<view v-if="$store.state.commonData.userInfo.id">{{$store.state.commonData.userInfo.name}}</view>
			<view v-else class="noUser">
				<u-button type="success" 
						  shape="square"
						  size="medium"
						  @click="loginFn">
					登录
				</u-button>
				<u-button type="warning"
						  shape="square"
						  size="medium"
						  @click="registerFn">
					注册
				</u-button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			safeAreaInsets:{
				type:Object,
				default:()=>({top:37})
			}
		},
		data() {
			return {
				
			};
		},
		created(){
			
		},
		onLoad() {
		
		},
		methods:{
			//登录
			loginFn:function (){
				uni.navigateTo({
				    url: '../login/login'
				});
			},
			//注册
			registerFn:function (){
				uni.navigateTo({
				    url: '../register/register'
				});
			},
		}
	
	}
</script>
