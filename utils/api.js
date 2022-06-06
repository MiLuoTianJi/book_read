const baseUrl = 'http://119.3.209.243';
// const baseUrl = 'http://127.0.0.1';
const baseRequest = (opts, data) => {
	let baseDefaultOpts = {
		url: baseUrl + opts.url,
		// 请求接口地址
		data: data,
		// 传入请求参数
		method: opts.method,
		// 配置请求类型
		// header: opts.method == 'get' ? {'X-Requested-With': 'XMLHttpRequest',"Accept": "application/json","Content-Type": "application/json; charset=UTF-8"} : {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		// 配置请求头
		dataType: 'json',
		//超时
		timeout: 20000,
	}
	return new Promise(function(resolve, reject) {
		uni.request(baseDefaultOpts).then(
			(res) => {
				resolve(res[1].data)
			}
		).catch(err => {
			reject(err)
		})
	})
};
export default {
	get: (url, data) => baseRequest({
		url: url,
		method: 'GET'
	}, data),
	post: (url, data) => baseRequest({
		url: url,
		method: 'POST'
	}, data),
}
