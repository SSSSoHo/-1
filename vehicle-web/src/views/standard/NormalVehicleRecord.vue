<template>
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content ep-bg-purple" />
          <el-form :model="form" label-width="120px" :inline="true" class="demo-form-inline">
            <el-form-item label="企业名称">
              <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          placeholder="企业名称"
          @select="handleSelect"
        />
              <!-- <el-input v-model="form.vehicleNumber" /> -->
            </el-form-item>
            <el-form-item label="日期范围">
              <el-date-picker v-model="form.daterange" type="daterange" unlink-panels range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
            <el-form-item label="进出口">
              <el-select v-model="form.doorCode" placeholder="进出口" clearable>
                <el-option label="全部" value="" />
                <el-option label="进" value="1" />
                <el-option label="出" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="燃油类型">
              <el-select v-model="form.fuelType" placeholder="燃油类型" clearable>
                <el-option label="全部" value="" />
                <el-option label="柴油" value="1" />
                <el-option label="汽油" value="1" />
                <el-option label="天然气" value="2" />
                <el-option label="天然气(NG/CNG/LNG)" value="2" />
                <el-option label="电动" value="2" />
                <el-option label="氢" value="2" />
                <el-option label="两用燃料" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="车牌颜色">
              <el-select v-model="form.numberColor" placeholder="车牌颜色" clearable>
                <el-option label="全部" value=""/>
                <el-option label="绿色" value="1" />
                <el-option label="蓝色" value="2" />
                <el-option label="黄色" value="3" />
                <el-option label="白色" value="4" />
                <el-option label="其它" value="5" />
              </el-select>
            </el-form-item>
            <el-form-item label="排放阶段">
              <el-select v-model="form.emissionStage" placeholder="排放阶段" clearable>
                <el-option label="全部" value="" />
                <el-option label="国Ⅵ" value="6" />
                <el-option label="国Ⅴ" value="5" />
                <el-option label="国Ⅳ" value="4" />
                <el-option label="国Ⅲ" value="3" />
                <el-option label="国Ⅱ" value="2" />
                <el-option label="国Ⅰ" value="1" />
                <el-option label="未知" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loadData"><el-icon>
                  <Search />
                </el-icon>&nbsp;查询</el-button>
                <el-button type="primary" @click="download"><el-icon>
                  <Search />
                </el-icon>&nbsp;导出</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="24" style="padding:20px;">
          <div class="grid-content ep-bg-purple-dark" />
          <el-table :data="tableData" style="width: 100%" max-height="520" :row-class-name="tableRowClassName">
            <el-table-column type="index" prop="DischargeStage"  label="序号" width="60" align="center" />
            <el-table-column type="index" prop="EnterDoorCode"  label="入口编号" width="60" align="center" />
            <el-table-column type="index" prop="OutDoorCode"  label="出口编号" width="60" align="center" />
            <el-table-column type="index" prop="EnterDeviceCode"  label="进口道闸编号" width="60" align="center" />
            <el-table-column type="index" prop="OutDeviceCode"  label="出口道闸编号" width="60" align="center" />
            <el-table-column type="index" prop="EnterTime" label="进厂时间" width="60" align="center" :formatter="formatePassDate"/>
            <el-table-column type="index" prop="OutTime"  label="出厂时间" width="60" align="center" :formatter="formatePassDate"/>
            <el-table-column type="index" prop="VehicleNumber" label="车牌号码" width="60" align="center" />
            <el-table-column type="index" prop="NumberColor" label="号牌颜色" width="60" align="center" />
            <el-table-column type="index" prop="VehicleType"  label="车辆类型" width="60" align="center" />
            <el-table-column type="index" prop="RegisDate"  label="注册登记日期" width="60" align="center" />
            <el-table-column type="index" prop="VIN"  label="车辆识别代码（VIN）" width="60" align="center" />
            <el-table-column type="index" prop="FuelType"  label="燃料类型" width="60" align="center" />
            <el-table-column type="index" prop="DischargeStage"  label="排放标准" width="60" align="center" />
            <el-table-column type="index" prop="InternetState"  label="联网状态" width="60" align="center" />
            <el-table-column type="index" prop="UseNature"  label="使用性质" width="60" align="center" />
            <el-table-column type="index" prop="EnterGoods"  label="进厂货物名称" width="60" align="center" />
            <el-table-column type="index" prop="EnterGoodsCount"  label="进厂运输量" width="60" align="center" />
            <el-table-column type="index" prop="OutGoods"  label="出厂货物名称" width="60" align="center" />
            <el-table-column type="index" prop="OutGoodsCount"  label="出厂运输量" width="60" align="center" />
            <el-table-column type="index" prop="FleetName"  label="车队名称" width="60" align="center" />
            <el-table-column type="index" prop="EnterImg"  label="进厂照片" width="60" align="center" >
            <template #default="scope">
                <el-tag v-if="scope.row.EnterImg"@click="showImg(baseUrl_test + 'Upload/'+scope.row.EnterImg)">预览</el-tag>
                <span v-if="scope.row.EnterImg==''">无</span>
            </template>
        </el-table-column>
            <el-table-column type="index" prop="OutImg"  label="出厂照片" width="60" align="center" >
                <template #default="scope">
                <el-tag v-if="scope.row.OutImg"@click="showImg(baseUrl_test + 'Upload/'+scope.row.OutImg)">预览</el-tag>
                <span v-if="scope.row.OutImg==''">无</span>
            </template>
            </el-table-column>
            <el-table-column type="index" prop="ListReportImg"  label="随车清单" width="60" align="center" >
                <template #default="scope">
                <el-tag v-if="scope.row.ListReportImg"@click="showImg(baseUrl_test + 'Upload/'+scope.row.ListReportImg)">预览</el-tag>
                <span v-if="scope.row.ListReportImg==''">无</span>
            </template>
            </el-table-column>

            <el-table-column type="index" prop="DrivingLicenseImg"  label="行驶证" width="60" align="center" >
                <template #default="scope">
                <el-tag v-if="scope.row.DrivingLicenseImg"@click="showImg(baseUrl_test + 'Upload/'+scope.row.DrivingLicenseImg)">预览</el-tag>
                <span v-if="scope.row.DrivingLicenseImg==''">无</span>
            </template>
            </el-table-column>
          </el-table>
        </el-col>
        <!-- <el-col :span="12" style="padding:20px">
          <div class="grid-content ep-bg-purple-dark" />
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content ep-bg-purple" style="display:flex;justify-content: center;" />车辆照片
              <img :src="vehicleImg" width="100%">
            </el-col>
            <el-col :span="8">
              <div class="grid-content ep-bg-purple" style="display:flex;justify-content: center;" />随车清单
              <img src="../../images/随车清单.jpg" width="100%">
            </el-col>
            <el-col :span="8">
              <div class="grid-content ep-bg-purple" style="display:flex;justify-content: center;" />驾驶证
              <img src="../../images/行驶证.jpg" width="100%">
            </el-col>
          </el-row>
        </el-col> -->
      </el-row>
      <el-row justify="center">
        <el-col :span="24" style="padding-left:20px;display:flex;justify-content: center;">
            <el-pagination background layout="prev, pager, next" :total="totalCount" v-model:current-page="pageIndex"
              :default-page-size="pageSize" @current-change="loadData" />
  
        </el-col>
      </el-row>
      <el-dialog v-model="dialogFormVisible" title="车辆图片" width="50%">
        <el-image
        :src="vehicleImg"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :initial-index="4"
        fit="cover"
      />
    </el-dialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {
    Search
  } from '@element-plus/icons-vue'
  import { ref, onMounted } from 'vue'
  import { $GetNormalVehicleRecord, $GetFileAddress } from '../../api/vehicle'
  import { baseUrl_test } from '../../config/config'
  import { $GetKeyValueEnts } from '../../api/enterprise'
  const dialogFormVisible = ref(false);
  const vehicleImg = ref('');
  const showImg = (imgurl:any)=>{
    dialogFormVisible.value=true;
    vehicleImg.value = imgurl;
  }
  let curentUser = JSON.parse(sessionStorage.getItem('user') || '');
  const form = ref({
    daterange: '',
    enterpriseId: '',
    vehicleNumber: '',
    numberColor: '3',
    emissionStage: '',
    doorCode: '',
    fuelType: '',
    IsWhite:false
  })

  interface Device {
    xuhao: number
    daozha: string
    inout: string
    passtime: string
    carno: string
    carcolor: string
    emissionStage: string
    reconsiderContent: string
  }
  let totalCount = ref(0);
  let pageIndex = ref(1);
  let pageSize = ref(10);
  const loadData = async () => {
    let res = await $GetNormalVehicleRecord({
      startDate: form.value.daterange[0],
      endDate: form.value.daterange[1],
      enterpriseId: curentUser.enterpriseid,
      vehicleNumber: form.value.vehicleNumber,
      numberColor: form.value.numberColor,
      emissionStage: form.value.emissionStage,
      doorCode: form.value.doorCode,
      fuelType: form.value.fuelType,
      page: pageIndex.value,
      pageSize: pageSize.value,
      IsWhite:form.value.IsWhite
    }) as any;
    tableData.value = res.Data.datalist;
    totalCount.value = res.Data.totalCount;
    let entres = await $GetKeyValueEnts() as any;
    restaurants.value = entres;
  }
  
  
  const download = async () => {
    let address = await $GetFileAddress({
      startDate: form.value.daterange[0],
      endDate: form.value.daterange[1],
      enterpriseId: curentUser.enterpriseid,
      vehicleNumber: form.value.vehicleNumber,
      numberColor: form.value.numberColor,
      emissionStage: form.value.emissionStage,
      doorCode: form.value.doorCode,
      fuelType: form.value.fuelType,
      page: pageIndex.value,
      pageSize: pageSize.value,
      IsWhite:form.value.IsWhite
    })as any;
    window.open(`http://36.41.184.182:8091/${address.Data}`)
  }
  onMounted(() => {
    setTimeout(() => {
      loadData();
    }, 200);
  
  })
  const tableRowClassName = ({
    rowIndex,
  }: {
    row: Device
    rowIndex: number
  }) => {
    if (rowIndex % 2 == 0) {
      return 'success-row'
    }
    return ''
  }
  
  const tableData = ref([])
  const formatePassDate = (row: any) => {
    return row.PassTime.replace('T', ' ');
  }
  
  
    interface RestaurantItem {
    value: string
  }
  
  const state = ref('')
  const restaurants = ref<RestaurantItem[]>([])
  const querySearch = (queryString: string, cb: any) => {
    const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value
    // call callback function to return suggestions
    cb(results)
  }
  const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
      return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    }
  }
  const handleSelect = (item:any) => {
    curentUser.enterpriseid = item.code;
  
    console.log(item)
  }
  
  
  </script>
  
  <style>
  .el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
  }
  
  .el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
  }
  
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }
  </style>