<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content ep-bg-purple" />
        <el-form :model="form" label-width="120px" :inline="true" class="demo-form-inline">
          <el-form-item label="日期范围">
            <el-date-picker v-model="form.daterange" type="daterange" unlink-panels range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
          <el-form-item label="进出类型">
            <el-select v-model="form.inOut" placeholder="进出类型" clearable>
              <el-option label="全部" value="" />
              <el-option label="进" value="1" />
              <el-option label="出" value="2" />
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
        <el-table :data="tableData" style="width: 100%" max-height="520" >
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="DeviceName" label="道闸" align="center"/>
          <el-table-column prop="InOut" label="进出类型" align="center" />
          <el-table-column prop="PassTime" label="通过时间" width="180" align="center" :formatter="formatePassDate"/>
          <el-table-column prop="VehicleNumber" label="车牌号" align="center" width="150" />
          <el-table-column prop="NumberColor" label="车牌颜色" align="center"  width="80" />
          <el-table-column prop="DischargeStage" label="排放阶段" align="center" />
          <el-table-column prop="NumberImg" label="车牌照片" align="center">
          <template #default="scope"><el-image :src="baseUrl_test + 'Upload/'+scope.row.NumberImg" style="width: 60px; height: 30px"/></template>
          </el-table-column>
          <el-table-column prop="VehicleImg" label="车辆照片" align="center">
            <template #default="scope">
            <el-image
      style="width: 60px; height: 28px;cursor: pointer;"
      :src="baseUrl_test + 'Upload/'+scope.row.VehicleImg"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :initial-index="4"
      fit="cover"
      @click="showImg(baseUrl_test + 'Upload/'+scope.row.VehicleImg)"
    />
  </template>
          </el-table-column>
          <el-table-column prop="qingdan" label="随车清单" align="center">
            <template #default="scope">
            <el-image
      style="width: 60px; height: 30px;cursor: pointer;"
      :src="baseUrl_test +scope.row.VehicleListReportImg"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :initial-index="4"
      fit="cover"
      @click="showImg(baseUrl_test +scope.row.VehicleListReportImg)"
    />
  </template>
          </el-table-column>
          <el-table-column prop="jiszhiz" label="驾驶证" align="center">
            <template #default="scope">
            <el-image
      style="width: 60px; height: 30px;cursor: pointer;"
      :src="baseUrl_test +scope.row.DriverLiceseImg"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :initial-index="4"
      fit="cover"
      @click="showImg(baseUrl_test +scope.row.DriverLiceseImg)"
    />
  </template>
          </el-table-column>
          <el-table-column prop="reconsiderContent" label="操作" v-if="curentUser.IsAdmin" align="center" >
            <template #default="scope">
              <el-button size="small" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
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
import { $GetPassRecord,$DeletePassRecord, $GetFileAddress } from '../../api/vehicle.ts'
import { baseUrl_test } from '../../config/config.ts'
import { ElMessageBox} from 'element-plus'
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
  inOut: '',
  vehicleType: '',
  IsWhite:false
})
// const handleRowClick = async (rowdata: any) => {
//   vehicleImg.value = baseUrl_test +"Upload/"+ rowdata.VehicleImg;
// };
let totalCount = ref(0);
let pageIndex = ref(1);
let pageSize = ref(10);
const loadData = async () => {
  let res = await $GetPassRecord({
    startDate: form.value.daterange[0],
    endDate: form.value.daterange[1],
    enterpriseId: curentUser.enterpriseid,
    vehicleNumber: form.value.vehicleNumber,
    numberColor: form.value.numberColor,
    emissionStage: form.value.emissionStage,
    inOut: form.value.inOut,
    vehicleType: form.value.vehicleType,
    page: pageIndex.value,
    pageSize: pageSize.value,
    IsWhite:form.value.IsWhite
  }) as any;
  tableData.value = res.Data.datalist;
  totalCount.value = res.Data.totalCount;
  let entres = await $GetKeyValueEnts() as any;
  restaurants.value = entres;
  console.log(restaurants.value);
}


const download = async () => {
  let address = await $GetFileAddress({
    startDate: form.value.daterange[0],
    endDate: form.value.daterange[1],
    enterpriseId: curentUser.enterpriseid,
    vehicleNumber: form.value.vehicleNumber,
    numberColor: form.value.numberColor,
    emissionStage: form.value.emissionStage,
    inOut: form.value.inOut,
    vehicleType: form.value.vehicleType,
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

const tableData = ref([])
const handleDelete = async(Id: number) => {
  ElMessageBox.confirm(
    '确定删除？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async() => {
      let res = await $DeletePassRecord({
        Id: Id
      }) as any;
      if(res.Code="200"){
      loadData();}
    })
    .catch(async() => {

    })
}

const formatePassDate = (row: any) => {
  return row.PassTime.replace('T', ' ');
}

  interface RestaurantItem {
  value: string
}
const restaurants = ref<RestaurantItem[]>([])
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