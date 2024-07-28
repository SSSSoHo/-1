import { $post } from '../utils/request.ts'
export const $AddApplyStarStop = async (parames:object) => {
    try {
        let data  = await $post('/ApplyStarStop/AddApplyStarStop', parames) as any;
        return data;
    } catch (error) {
        // ElNotification({
        //     title: '通知',
        //     message: "system error",
        //     type: 'error',
        // });
    }
}

export const $GetListApplyStarStop = async(parames:object) => {
    try {
        let data  = await $post('/ApplyStarStop/GetListApplyStarStop', parames);
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
export const $CreditApplyStarStop = async(parames:object) => {
    try {
        let data  = await $post('/ApplyStarStop/CreditApplyStarStop', parames);
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
