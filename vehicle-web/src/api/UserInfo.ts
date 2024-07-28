import {$post} from '../utils/request.js'
import {ElNotification} from 'element-plus'

export const $login = async(parames:object)=> {
	try {
		//console.log(parames)
		let data = await $post('/UserInfo/Login',parames) as any; 
		if (data.Code == 200 && data.Data) {
			//存储登录token
			sessionStorage.setItem("token",data.Data.jwttoken);
			ElNotification({
				title:'通知',
				message: '提交成功',
				type: 'success',
			});
			return data;
		}else{
			ElNotification({
				title:'通知',
				message: data.Message,
				type: 'error',
			});
		} 
	} catch (e) {
		//TODO handle the exception
	}
	return false;
}