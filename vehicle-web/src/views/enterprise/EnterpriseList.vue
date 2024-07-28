<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple" />
        <el-form :model="form" label-width="120px">
          <el-form-item label="企业名称：">
            <el-input v-model="form.enterpriseName" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" style="padding-left:10px">
        <div class="grid-content ep-bg-purple-light" />
        <el-button type="primary" @click="loadData"><el-icon>
            <Search />
          </el-icon>&nbsp;查询</el-button>
        <el-button type="warning" @click="addVehicleRef.drawer = true"><el-icon>
            <DocumentAdd />
          </el-icon>&nbsp;添加</el-button>
        <!-- <el-button type="danger"><el-icon><Delete /></el-icon>&nbsp;删除</el-button> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="padding:20px">
        <div class="grid-content ep-bg-purple-dark" />
        <el-table :data="tableData" style="width: 100%" max-height="520" >
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="EnterpriseName" label="企业名称" width="280" />
          <el-table-column prop="CreditCode" label="社会信用代码" />
          <el-table-column prop="Address" label="企业地址" width="280" />
          <el-table-column prop="EnterpriseType" label="企业类型" />
          <el-table-column prop="LinkMan" label="联系人" />
          <el-table-column prop="LinkManPhone" label="联系人电话" />
          <el-table-column prop="AuthorizationDate" label="授权日期" :formatter="formateDate" />
          <el-table-column prop="Status" label="企业状态" :formatter="formateStatus" />
          <el-table-column align="center" label="操作" width="200">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row.Id)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
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
  <addEnterprise ref="addVehicleRef"></addEnterprise>
</template>

<script lang="ts" setup>
import {
  DocumentAdd, Search
} from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
const form = ref({
  enterpriseName: ''
})
import addEnterprise from '../components/enterprise/addEnterprise.vue'
import { $GetListEnterprise, $GetEnterpriseInfo, $DeleteEnterpriseInfo } from '../../api/enterprise.ts';

let addVehicleRef = ref();

let totalCount = ref(0);
let pageIndex = ref(1);
let pageSize = ref(10);
//数据结果
let tableData = ref([]);
let curentUser =JSON.parse(sessionStorage.getItem('user') || '');
const loadData = async () => {
  let res = await $GetListEnterprise({
    enterpriseName: form.value.enterpriseName,
    page: pageIndex.value,
    userId:curentUser.userid,
    pageSize: pageSize.value
  }) as any;
  tableData.value = res.Data.datalist;
  totalCount.value = res.Data.totalcount;
}
const formateStatus = (row:any) => {
  if (row.Status == 1) {
    return "正常";
  }
  if (row.Status == 0) {
    return "停产";
  }
  return "";
}
const formateDate = (row:any) => {
  return row.AuthorizationDate.substring(0, 10)
}

const handleEdit = async(Id: number) => {
  let res = await $GetEnterpriseInfo({
    enterpriseId: Id
  }) as any;
  addVehicleRef.value.drawer = true;
  res.Data.SharedData = res.Data.SharedData.toString();
  res.Data.Status = res.Data.Status.toString();
  res.Data.AuthorizationDate = res.Data.AuthorizationDate.substring(0, 10);
  addVehicleRef.value.addForm = res.Data;
}
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
      let res = await $DeleteEnterpriseInfo({
        enterpriseId: Id
      }) as any;
      if(res.Code="200"){
      loadData();}
     
    })
    .catch(async() => {

    })
}
onMounted(() => {
  setTimeout(() => {
    loadData();
  }, 200);
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