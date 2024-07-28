<template>
    <el-row>
        <el-col :span="12">
            <div class="grid-content ep-bg-purple" />
            <el-container class="enterprise-layout">
                <el-descriptions class="enterprise-layout" :column="2" :title="enterpriseInfo.EnterpriseName"
                    style="width: 100%;" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                企业名称
                            </div>
                        </template>
                        {{ enterpriseInfo.EnterpriseName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                社会信用代码
                            </div>
                        </template>
                       {{ enterpriseInfo.CreditCode }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                企业地址
                            </div>
                        </template>
                        {{ enterpriseInfo.Address }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                行政区划
                            </div>
                        </template>
                        <el-tag size="small">
                            {{ enterpriseInfo.AreaId }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                经纬度
                            </div>
                        </template>
                        {{ enterpriseInfo.Longitude }},
                        {{ enterpriseInfo.Latitude }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                联系人
                            </div>
                        </template>
                        {{ enterpriseInfo.LinkMan }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                联系人电话
                            </div>
                        </template>
                        {{ enterpriseInfo.LinkManPhone }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                联系人邮箱
                            </div>
                        </template>
                        {{ enterpriseInfo.LinkManEmail }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                企业法人
                            </div>
                        </template>
                        {{ enterpriseInfo.PrincipalMan }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                企业电话
                            </div>
                        </template>
                        {{ enterpriseInfo.EnterprisePhone }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                信息更新时间
                            </div>
                        </template>
                        {{ enterpriseInfo.UpdateTime }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                       
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                               二维码
                            </div>
                        </template>
                        <qrcode-vue :value="qrCodeValue" :size=1000 style="width: 350px;height: 350px;"></qrcode-vue>
                    </el-descriptions-item>
                </el-descriptions>
            </el-container>
        </el-col>
        <el-col :span="12">
            <div class="grid-content ep-bg-purple-light" />
            <img src="../../images/enterprise_pg.png" alt="企业照片" width="98%" height="500">
        </el-col>
    </el-row>
</template>


<script lang="ts" setup>
import { $GetEnterpriseInfo } from '../../api/enterprise.ts'
import { onMounted,ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import {curentUrl} from '../../config/config.ts'
// import VueQrcode from 'vue-qrcode'

let enterpriseInfo = ref({
    Id: 1,
    EnterpriseName: "",
    EnterpriseType: "",
    AreaId: "",
    Address: "",
    Longitude: "0",
    Latitude: "0",
    LinkMan: "",
    LinkManPhone: "",
    LinkManEmail: "",
    PrincipalMan: "",
    EnterprisePhone: null,
    CreateTime: "",
    UpdateTime: "",
    CreditCode:"",
})
let curentUser =JSON.parse(sessionStorage.getItem('user') || '');
const qrCodeValue = ref(curentUrl+'AddVechicle?EnterpriseId='+curentUser.enterpriseid)


onMounted( async () => {
    let parame = { enterpriseId: curentUser.enterpriseid }
    let sInfo = await $GetEnterpriseInfo(parame) as any;
    enterpriseInfo.value = sInfo!.Data;
})
</script>
<style class>
.enterprise-layout {
    margin: 10px;
}
</style>