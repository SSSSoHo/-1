import { $post } from '../utils/request.ts'
export const $AddVehicle = async (VehicleForm:object) => {
    try {
        let data  = await $post('/Vehicle/AddVehicle', VehicleForm) as any;
        return data;
    } catch (error) {
        // ElNotification({
        //     title: '通知',
        //     message: "system error",
        //     type: 'error',
        // });
    }
}
export const $AddVehicleFromPhone = async (VehicleForm:object) => {
    try {
        let data  = await $post('/Vehicle/AddVehicleFromPhone', VehicleForm) as any;
        return data;
    } catch (error) {
        // ElNotification({
        //     title: '通知',
        //     message: "system error",
        //     type: 'error',
        // });
    }
}
export const $GetVehicleList = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/GetVehicleList', parames);
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

export const $GetVehicleInfo = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/GetVehicleInfo', parames);
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

export const $GetPassRecord  = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/GetVehicleRecord', parames);
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
export const $GetNormalVehicleRecord  = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/GetNormalVehicleRecord', parames);
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

export const $GetFileAddress  = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/ExportData', parames);
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

export const $DeletePassRecord = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/DeletePassRecord', parames);
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

export const $SetBlack = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/SetBlack', parames);
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
export const $SetNormalFromBlack = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/SetNormalFromBlack', parames);
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
export const $SetWhite = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/SetWhite', parames);
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
export const $SetNormalFormWhite = async(parames:object) => {
    try {
        let data  = await $post('/Vehicle/SetNormalFormWhite', parames);
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