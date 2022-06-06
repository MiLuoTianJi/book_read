export default{
  namespaced:true,
  state:{
    userInfo:{},
  },
  mutations:{
    //存用户信息
    setUserInfo:(state,userInfo)=>{
      state.userInfo=userInfo
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo));
    },
  },
  actions:{
    
  }
}

