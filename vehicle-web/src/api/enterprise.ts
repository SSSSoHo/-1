import { $post } from '../utils/request.ts'
export const $GetEnterpriseInfo = async (enterpriseId:any) => {
    try {
        let data  = await $post('/EnterpriseInfo/GetEnterpriseInfo', enterpriseId);
        console.log(JSON.stringify(data));
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
export const $AddEnterpriseInfo = async (parames:object) => {
    try {
        let data  = await $post('/EnterpriseInfo/AddEnterpriseInfo', parames);
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
export const $DeleteEnterpriseInfo = async (enterpriseId:any) => {
    try {
        console.log(enterpriseId)
        let data  = await $post('/EnterpriseInfo/DeleteEnterpriseInfo', enterpriseId);
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



export const $GetCurentCount = async (parames:object) => {
    try {
        let data  = await $post('/EnterpriseInfo/GetCurentCount', parames);
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

export const $GePastDaysRecord = async (parames:object) => {
    try {
        let data  = await $post('/EnterpriseInfo/GePastDaysRecord', parames);
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
export const $GetListEnterprise = async (parames:object) => {
    try {
        let data  = await $post('/EnterpriseInfo/GetListEnterprise', parames);
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

export const $GetKeyValueEnts = async() => {
    try {
        let sStrUserInfo = sessionStorage.getItem('user');
       let user = JSON.parse(sStrUserInfo||'');

      let parames:object= {
        userId:user?.userid,
        areaid:0,
        enterpriseName:''
      }
        let data  = await $post('/EnterpriseInfo/GetSampleListEnt', parames);
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