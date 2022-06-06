import request from "./api"

//在线图片转base64
export function networkImgToBase64(url) {
    let base64Url="";
    let xhr=new XMLHttpRequest();
    xhr.open('get',url,true);
    xhr.responseType='blob';
    xhr.onload=function (res) {
        console.log(res);
        console.log(this);
        if(this.status==200){
            let blob=this.response;
            let fr=new FileReader();
            fr.onloadend=function (e) {
                console.log(e.target.result);
                base64Url=e.target.result
            };
            fr.readAsDataURL(blob);
        }
    }
    xhr.send();
    console.log(base64Url);
    return base64Url
}

export async function login(info) {
    if (!info.account || !info.password) return
    let result=await new Promise(resolve=>{
        request.post('/login',info).then(res=>{
            resolve(res)
        })
    })
    return Promise.resolve(result)
}

//把参数连接到url上
export function concatToURL(url,params) {
    let arr=[],
        result=url
    if (Object.prototype.toString.call(params)!='[object Object]') return
    for (const key in params) {
        result+=`${result.indexOf("?")==-1?`?${key}`:`&${key}`}=${params[key]}`
    }
    return result
}

//根据屏幕大小字符串拆分
export function resolutionStr(str,w,h,lh,fs,ls) {
    let rows=~~(h/lh) //总共的行数
    let rowWordNums=~~(w/(fs+ls)) //每行多少字
    let strArr=str.replace(/(\r\n|\n|\r)/g,"&#&").replace(/\s/g,"").replace(/\&\#\&\&\#\&/g,"&#&").split('&#&')
    // return strArr
    let result=[]
    let count=0 //页数
    for (let i = 0; i < strArr.length; i++) {
        //把每一行按rowWordNums分解
        //首行缩进2格，所以总的长度+2
        for (let k = 1; k <= Math.ceil((strArr[i].length)/rowWordNums); k++) {
            let start=((k-1)*rowWordNums-2)<0?0:((k-1)*rowWordNums-2)
            let end=k*rowWordNums-2
            //按每一页有多少行把数据分开
            if (result[count] && result[count].length==rows) count++
            if (!result[count]) result[count]=[]
            result[count].push({
                isNewRow:k==1?true:false,
                text:strArr[i].slice(start,end)
            })
        }
    }
    
    return result
}

//rpx转px 
export function sizeDeal(size,windowWidth) {
    let scale = 750 / windowWidth;
    // 分离字体大小和单位,rpx 转 px
    let s = Number.isNaN(parseFloat(size)) ? 0 : parseFloat(size)
    let u = size.toString().replace(/[0-9]/g, '').replace('-','')
    if (u == 'rpx') {
        s /= scale
        u = 'px'
    } else if (u == '') {
        u = 'px'
    }else if (u == 'vw') {
        u = 'px'
        s = s / 100 * 750 / scale
    }
    return {
        num:s,
        unit:u,
        str:s+u
    }
}

//获取时间
export function getNowTime(type) {
    let newDate=new Date(),
        result='',
        year=newDate.getFullYear(),
        month=newDate.getMonth()+1,
        date=newDate.getDate(),
        hour=newDate.getHours(),
        minutes=newDate.getMinutes(),
        seconds=newDate.getSeconds()
    if (month<10) {
      month='0'+month
    }
    if (date<10) {
      date='0'+date
    }
    if (hour<10) {
      hour='0'+hour
    }
    if (minutes<10) {
      minutes='0'+minutes
    }
    if (seconds<10) {
      seconds='0'+seconds
    }
    if (type=='year') {
      result=year
    }
    if (type=='month') {
      result=year+'-'+month
    }
    if (type=='date') {
      result=year+'-'+month+'-'+date
    }
    if (type=='hour') {
      result=year+'-'+month+'-'+date+' '+hour
    }
    if (type=='minutes') {
      result=year+'-'+month+'-'+date+' '+hour+':'+minutes
    }
    if (type=='seconds') {
      result=year+'-'+month+'-'+date+' '+hour+':'+minutes+':'+seconds
    }
    return result
}