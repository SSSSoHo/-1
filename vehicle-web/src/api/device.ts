import { $post } from '../utils/request.ts'
export const $AddDevice = async (VehicleForm:object) => {
    try {
        let data  = await $post('/Device/AddDevice', VehicleForm) as any;
        return data;
    } catch (error) {
        // ElNotification({
        //     title: '通知',
        //     message: "system error",
        //     type: 'error',
        // });
    }
}

export const $GetDeviceList = async(parames:object) => {
    try {
        let data  = await $post('/Device/GetDeviceList', parames);
        return data;
    } catch (error) {
        console.log(JSON.stringify(error));
        // ElNotification({
        //     title: '通知',
        //     message: "system error",
        //     type: 'error',
        // });
    }
}