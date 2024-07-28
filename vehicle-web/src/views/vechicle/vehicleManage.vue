<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content ep-bg-purple" />
        <el-form :model="form" label-width="120px" :inline="true" class="demo-form-inline">
          <el-form-item label="所属企业：">
            <el-input v-model="form.EnterpriseId" />
          </el-form-item>
          <el-form-item label="车牌号：">
            <el-input v-model="form.vehicleNumber" />
          </el-form-item>
          <el-form-item label="排放阶段：">
            <el-select v-model="form.DischargeStage" placeholder="排放阶段" clearable>
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
            <el-button type="warning" @click="addVehicleRef.drawer = true"><el-icon>
                <DocumentAdd />
              </el-icon>&nbsp;新增</el-button>
            <!-- <el-button type="danger"><el-icon><Delete /></el-icon>&nbsp;删除</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="padding:20px">
        <div class="grid-content ep-bg-purple-dark" ></div>
        <el-table :data="tableData" style="width: 100%" border max-height="520">
          <el-table-column type="index" width="60" label="序号" style="text-align:center;" />
          <el-table-column prop="EnterpriseName" label="企业名称" width="250" />
          <el-table-column prop="VehicleNumber" label="车牌号码" width="100" />
          <el-table-column prop="NumberColor" label="车牌颜色" width="90" />
          <el-table-column prop="VehicleType" label="车辆类型" width="100" />
          <el-table-column prop="FuelType" label="燃料类型" width="100" />
          <el-table-column prop="VIN" label="车辆识别代码" width="200" />
          <el-table-column prop="VehicleCertificate" label="使用性质" width="100" />
          <el-table-column prop="VehicleVariety" label="品牌型号" width="150" />
          <el-table-column prop="VehicleVariety" label="车辆状态" width="150" :formatter="formateStatus" />
          <el-table-column prop="SignTime" label="注册日期" width="120" :formatter="formateApplyDate" />
          <!-- <el-table-column prop="fazhengriqi" label="发证日期" /> -->
          <el-table-column prop="DischargeStage" label="排放阶段" width="100" />
          <el-table-column label="操作" align="center" width="260">
            <template #default="scope">
              <el-button size="small" v-if="scope.row.IsWhite == 0 && scope.row.isblack == null" type="info"
                @click="HandleBlackList(scope.row.Id)">拉黑</el-button>
              <el-button size="small" v-if="scope.row.IsWhite == 0 && scope.row.isblack == null" type="success"
                @click="HandleWhiteList(scope.row.Id)">拉白</el-button>
              <el-button size="small" v-if="scope.row.IsWhite == 1 || scope.row.isblack != null" color="#626aef"
                type="success" @click="HandSetNormal(scope.row)">恢复正常</el-button>
              <!-- <el-button size="small" v-if="curentUser.IsAdmin" type="primary" :icon="Edit"
                @click="HandleBlackList(scope.row.Id)" />
              <el-button size="small" v-if="curentUser.IsAdmin" type="danger" :icon="Delete"
                @click="HandleBlackList(scope.row.Id)" /> -->
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24" style="padding-left:20px;display:flex;justify-content: center;">
        <div class="grid-content ep-bg-purple-dark" />
        <el-pagination background layout="prev, pager, next" :total="totalCount" v-model:current-page="pageIndex"
          :default-page-size="pageSize" @current-change="loadData" />
      </el-col>
    </el-row>
  </div>

  <addVehicles ref="addVehicleRef"></addVehicles>
  <!--黑名单弹框-->
  <el-dialog v-model="blackListDialogVisible" title="设置黑名单" width="30%">
    <el-form :model="blackListform">
      <el-form-item label="类型：" :label-width="120">
        <el-select v-model="blackListform.BlackType" style="width:100%">
          <el-option label="路检路查黑名单" value="1" />
          <el-option label="入户抽查黑名单" value="2" />
          <el-option label="遥感监测不合格" value="3" />
          <el-option label="年检不合格" value="4" />
          <el-option label="黑烟抓拍不合格" value="5" />
          <el-option label="黑烟举报不合格" value="6" />
          <el-option label="其他" value="7" />
        </el-select>
      </el-form-item>
      <el-form-item label="说明：" :label-width="120">
        <el-input v-model="blackListform.Remark" type="textarea" :rows="4" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="blackListDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitBlackForm">
          提交
        </el-button>
      </span>
    </template>

  </el-dialog>
  <!--白名单弹框-->
  <el-dialog v-model="whiteListVisible" title="设置白名单" width="30%">
    <span><el-icon>
        <InfoFilled />
      </el-icon> 设置白名单车辆，不统计过车数量，过车记录在白名单记录中展示，确定设置？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="whiteListVisible = false">取消</el-button>
        <el-button type="primary" @click="submitWhiteForm">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  DocumentAdd, Search, InfoFilled   //Edit, Delete, 
} from '@element-plus/icons-vue'
import addVehicles from '../components/vehicle/addVehicle.vue'
import { $GetVehicleList, $SetBlack, $SetWhite, $SetNormalFormWhite, $SetNormalFromBlack } from '../../api/vehicle.ts'
import { ref, onMounted } from 'vue'
import { ElTable, ElMessage, ElMessageBox } from 'element-plus'
const form = ref({
  EnterpriseId: '',
  vehicleNumber: '',
  DischargeStage: ''
})

let totalCount = ref(0);
let pageIndex = ref(1);
let pageSize = ref(10);
let tableData = ref([]);
let addVehicleRef = ref();

 let curentUser = JSON.parse(sessionStorage.getItem('user') || '');
const loadData = async () => {
  let res = await $GetVehicleList({
    enterpriseId: curentUser.enterpriseid,
    vehicleNumber: form.value.vehicleNumber,
    DischargeStage: form.value.DischargeStage,
    page: pageIndex.value,
    pageSize: pageSize.value
  }) as any;
  tableData.value = res.Data.datalist;
  totalCount.value = res.Data.totalcount
}
const formateApplyDate = (row: any) => {
  return row.SignTime.substring(0, 10).replace('T', ' ');
}
const HandSetNormal = (row: any) => {
  ElMessageBox.confirm(
    '确定恢复正常?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '关闭',
      type: 'warning',
    }
  )
    .then(async() => {
      let res = { Code: '0' };
      if (row.IsWhite == 1) {
        res = $SetNormalFormWhite({
          VehicleId: row.Id
        }) as any;
      }
      if (row.isblack != null) {
        res = $SetNormalFromBlack({
          VehicleId: row.Id
        }) as any;
      }
      if (res.Code = "200") {
        ElMessage({
          message: '操作成功',
          type: 'success',
        });
       await loadData();
      }
    })
    .catch(() => {
    })
}
const formateStatus = (row: any) => {
  if (row.IsWhite == 1) {
    return "白名单";
  }
  if (row.isblack != null) {
    return "黑名单";
  }
  if (row.IsWhite == 0 && row.isblack == null) {
    return "正常";
  }
  return "";
}
onMounted(() => {
  setTimeout(() => {
    loadData();
  }, 200);

})
//白名单
const whiteListVisible = ref(false);
//黑名单
const blackListDialogVisible = ref(false);
const blackListform = ref({
  BlackType: '',
  VehicleId: '',
  Remark: ''
})
//开始-白名单操作
const whiteVehicleId = ref(0);
const HandleWhiteList = async (Id: any) => {
  whiteVehicleId.value = Id;
  whiteListVisible.value = true;
}
const submitWhiteForm = async () => {
  let res = await $SetWhite({
    VehicleId: whiteVehicleId.value
  }) as any;
  if (res.Code = "200") {
    ElMessage({
      message: '操作成功',
      type: 'success',
    })
    loadData();
  }
  whiteListVisible.value = false
}
//结束-白名单操作
//开始-黑名单操作
const HandleBlackList = async (Id: any) => {
  blackListform.value.VehicleId = Id;
  blackListDialogVisible.value = true;
}
const submitBlackForm = async () => {
  let res = await $SetBlack({
    VehicleId: blackListform.value.VehicleId,
    BlackType: blackListform.value.BlackType,
    Remark: blackListform.value.Remark
  }) as any;
  if (res.Code = "200") {
    ElMessage({
      message: '操作成功',
      type: 'success',
    })
    loadData();
  }
}
//结束-黑名单操作
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>