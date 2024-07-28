<template>
    <div>
        <el-row>
            <el-col :span="8"><div class="grid-content ep-bg-purple" />
                <el-form :model="form" label-width="120px">
                    <el-form-item label="设备名称：">
                        <el-input v-model="form.deviceName" />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8" style="padding-left:10px"><div class="grid-content ep-bg-purple-light" />
                <el-button type="primary" @click="loadData"><el-icon><Search /></el-icon>&nbsp;查询</el-button>
                <el-button type="warning"   @click="addVehicleRef.drawer=true"><el-icon><DocumentAdd /></el-icon>&nbsp;新增</el-button>
                <!-- <el-button type="danger"><el-icon><Delete /></el-icon>&nbsp;删除</el-button> -->
            </el-col>
        </el-row>
        <el-row>
    <el-col :span="24" style="padding:20px"><div class="grid-content ep-bg-purple-dark" />
        <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    border
  >
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column prop="EnterpriseName" label="企业名称"  width="280" />
    <el-table-column prop="DeviceName" label="设备名称" width="180" />
    <el-table-column prop="DeviceType" label="设备类型" />
    <el-table-column prop="DeviceCode" label="设备编号" width="310"  />
    <el-table-column prop="Status" label="是否在线" >
      <template #default="scope">
        <el-tag type="success" v-if="scope.row.Status==1">在线</el-tag>
        <el-tag type="danger" v-if="scope.row.Status==0">离线</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="UpdateTime" label="离线时间" :formatter="formaterdate" >
      <template #default="scope">
        <span v-if="scope.row.Status==1">--</span>
      </template>
    </el-table-column>
    <el-table-column prop="Remark" label="备注" />
  </el-table>
    </el-col>
  </el-row>
  <el-row justify="center">
    <el-col :span="24" style="padding-left:20px;display:flex;justify-content: center;"><div class="grid-content ep-bg-purple-dark" />
        <el-pagination background layout="prev, pager, next" :total="totalCount" v-model:current-page="pageIndex" :default-page-size="pageSize" @current-change="loadData"/>
    </el-col>
  </el-row>
    </div>
    <addVehicles ref="addVehicleRef"></addVehicles>
</template>

<script lang="ts" setup>
import {
DocumentAdd,Search
} from '@element-plus/icons-vue'
import { ref,onMounted } from 'vue'
const form = ref({
	deviceName: ''
})
import addVehicles from '../components/device/addDevice.vue'
import { $GetDeviceList } from '../../api/device.ts'; 
const formaterdate = (row: any) => {
  return row.UpdateTime.replace('T', ' ');
}
interface Device {
    deviceName: string
    EnterpriseName: string
    DeviceCode: string
    InternetMark: string 
    deviceType: string
    Remark: string
    CreateTime:string
}
let addVehicleRef = ref();
const tableRowClassName = ({
  rowIndex,
}: {
  row: Device
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}
let totalCount = ref(0);
let pageIndex = ref(1);
let pageSize = ref(10);
let tableData = ref([]);
let curentUser =JSON.parse(sessionStorage.getItem('user') || '');
const loadData = async() => {
  let res = await $GetDeviceList({
    deviceName:form.value.deviceName, 
    enterpriseId:curentUser.enterpriseid,  
    page:pageIndex.value, 
    pageSize:pageSize.value
  }) as any;
  tableData.value = res.Data.datalist;
  console.log(JSON.stringify(tableData.value));  
  totalCount.value = res.Data.totalcount    
  console.log(totalCount);  
}
onMounted(() => {
  setTimeout(() => {
    loadData();
  }, 200);
  setInterval(() => {
     loadData(); // 每1秒自增1次计数器值
    }, 12000);
})
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>