<style lang="less" scoped>
	.layout{
		position: relative;
		height: calc(100% - 110rpx);
		.main{
			height:100%;
			width: 100%;
		}
		.bar{
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 100rpx;
			width: 100%;
			background: #fff;
			box-shadow: 0 0 2rpx #000;
			&-item{
				flex:0 1 33.33%;
				display: flex;
				flex-flow: column;
				align-items: center;
				justify-content: center;
				font-size: 18rpx;
			}
		}
	}
</style>

<template>
	<view class="layout">
		<view class="main">
			<Desktop v-show="barIndex==0" :safeAreaInsets='safeAreaInsets'></Desktop>
			<Mine v-show="barIndex==2" :safeAreaInsets='safeAreaInsets'></Mine>
		</view>
		<view class="bar">
			<view class="bar-item"
				  v-for="(item,index) in barIconList"
				  :key="index"
				  @click="barItemClickFn(item,index)"
				  :style="{color:barIndex==index?item.activeColor:item.color}">
				<evan-icons :type="item.iconType"
							:color="barIndex==index?item.activeColor:item.color"
							size="22">
				</evan-icons>
				<text>{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Desktop from "../desktop/desktop"
	import Mine from "../mine/mine"
	const barIconList=[
		{iconType:"bar-chart-o",text:"书架",activeColor:"#fb7299",color:"#909399"},
		{iconType:"shopping-cart",text:"书城",activeColor:"#fb7299",color:"#909399"},
		{iconType:"user-circle",text:"我的",activeColor:"#fb7299",color:"#909399"},
	]
	export default {
		components:{
			Desktop,
			Mine
		},
		data() {
			return {
				barIconList:barIconList,
				barIndex:0,
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
			if (option && option.barIndex) {
				this.barIndex=~~option.barIndex
			}
			if (option.account && option.password) {
				this.$tools.login(option).then(res=>{
					if (res.type) {
						this.$store.commit('commonData/setUserInfo',res)
					}
				})
			}
		},
		methods:{
			//点击下方bar
			barItemClickFn:function (item,index) {
				this.barIndex=index
			},
		}
	}
</script>
