<template>
            <el-row>
            <el-col :span="24"><div class="grid-content ep-bg-purple" />
                <el-form :model="form" label-width="120px" :inline="true" class="demo-form-inline">
                   
    <el-form-item label="车牌号">
      <el-input v-model="form.VehicleNumber" />
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="loadData"><el-icon><Search /></el-icon>&nbsp;查询</el-button>
    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    <el-row>
        <el-col :span="24">
            <div class="grid-content ep-bg-purple" />
            <el-container class="enterprise-layout">
                <el-descriptions class="enterprise-layout" :column="2" 
                    style="width: 100%;" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                车牌号
                            </div>
                        </template>
                        {{ vehicleInfo.VehicleNumber }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            车牌颜色
                            </div>
                        </template>
                        {{ vehicleInfo.NumberColor }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                车辆类型
                            </div>
                        </template>
                        {{ vehicleInfo.VehicleType }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                燃料类型
                            </div>
                        </template>
                        <el-tag size="small">
                            {{ vehicleInfo.FuelType }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                车辆识别代码
                            </div>
                        </template>
                        {{ vehicleInfo.VIN }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                发动机号码
                            </div>
                        </template>
                        {{ vehicleInfo.EngineNumber }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                使用性质
                            </div>
                        </template>
                        {{vehicleInfo.VehicleCertificate}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                所有人
                            </div>
                        </template>
                       {{ vehicleInfo.Owner}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                住址
                            </div>
                        </template>
                        {{ vehicleInfo.Address}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                品牌型号
                            </div>
                        </template>
                        {{ vehicleInfo.VehicleVariety}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                车辆备案日期
                            </div>
                        </template>
                        {{ vehicleInfo.CreateTime.replace('T',' ')}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                发证日期
                            </div>
                        </template>
                        {{ vehicleInfo.CreateCerDate.replace('T',' ')}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                排放阶段
                            </div>
                        </template>
                        {{ vehicleInfo.DischargeStage}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                运输货物名称
                            </div>
                        </template>
                        {{ vehicleInfo.GoodsName}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                运输量（吨）
                            </div>
                        </template>
                        {{ vehicleInfo.MaxGoodsWeight}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                车队名称
                            </div>
                        </template>
                        {{ vehicleInfo.FleetName}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                驾驶证
                            </div>
                        </template>
                        <img :src="baseUrl_test + vehicleInfo.DriverLiceseImg"  alt="驾驶证" width="300" height="200">
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                随车清单
                            </div>
                        </template>
                        <img :src="baseUrl_test + vehicleInfo.VehicleListReportImg"  alt="随车清单" width="300" height="200">
                    </el-descriptions-item>
                </el-descriptions>
            </el-container>
        </el-col>
        <!-- <el-col :span="12">
            <div class="grid-content ep-bg-purple-light" />
            <img src="../../images/车辆照片.png" alt="车辆照片" width="98%" height="500">
        </el-col> -->
    </el-row>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { baseUrl_test } from '../../config/config.ts'
import {$GetVehicleInfo} from '../../api/vehicle.ts'
let vehicleInfo = ref({
    Id: 11,
        VehicleType: "载货车",
        VehicleNumber: "冀A987FK",
        VIN: "666666666",
        SignTime: "2024-01-01",
        EngineNumber: "9999999999",
        NumberColor: "绿",
        DischargeStage: "Ⅵ",
        FuelType: "汽油",
        VehicleCertificate: "",
        MechanicalNumber: "",
        Remark: "",
        CreateTime: "2024-01-15",
        UpdateTime: "2024-01-15",
        IsDelete: false,
        VehicleVariety: "",
        EnterpriseId: "",
        Address: "",
        CreateCerDate: "2024-01-09T16:00:00",
        ImpOrExp: "进货",
        VehicleListReportImg: "Upload/NO-Img.png",
        DriverLiceseImg: "Upload/NO-Img.png",
        Owner: "个人",
        GoodsName: "无",
        MaxGoodsWeight: "20",
        FleetName: "无"
})
const form = ref({
    VehicleNumber:''
})
const loadData = async () => {
  let res = await $GetVehicleInfo({
    vehicleNumber: form.value.VehicleNumber
  }) as any;
  vehicleInfo.value = res.Data;
}
</script>
<style class>
.enterprise-layout {
    margin: 10px;
}
</style>