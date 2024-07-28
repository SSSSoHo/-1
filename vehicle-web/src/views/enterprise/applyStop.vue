<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content ep-bg-purple" />
        <el-form :model="form" label-width="120px" :inline="true" class="demo-form-inline">
          <el-form-item label="所属企业" v-if="curentUser.IsAdmin">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="申请类型">
            <el-select v-model="form.applyType" placeholder="申请类型" clearable>
              <el-option label="开业申请" value="1" />
              <el-option label="停产申请" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="form.checkState" placeholder="审核状态" clearable>
              <el-option label="申请中" value="1" />
              <el-option label="已审核" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"><el-icon>
                <Search />
              </el-icon>&nbsp;查询</el-button>
            <el-button type="warning" @click="drawer = true"><el-icon> <!--v-if="curentUser.IsAdmin == false"-->
                <DocumentAdd />
              </el-icon>&nbsp;添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="padding:20px">
        <div class="grid-content ep-bg-purple-dark" />
        <el-table :data="tableData" :cell-style="{ padding: '10px 10px;' }" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="EnterpriseName" label="企业名称" align="center" />
          <el-table-column prop="ApplyType" label="申请类型" width="200" align="center" :formatter="formateApplyType" />
          <el-table-column prop="ApplyDate" label="申请时间" align="center" :formatter="formateApplyDate" />
          <el-table-column prop="RangeDate" label="起止日期" align="center" />
          <el-table-column prop="ApplyCause" label="申请原因" align="center" />
          <el-table-column prop="Status" label="状态" align="center" :formatter="formateStatus" />
          <el-table-column prop="Remark" label="备注" align="center" />
          <el-table-column align="center" label="操作" width="200" v-if="curentUser.IsAdmin">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row.Id)" v-if="scope.row.Status == 1">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24" style="padding-left:20px;display:flex;justify-content: left;">
        <div class="grid-content ep-bg-purple-dark" />
        <el-pagination background layout="prev, pager, next" :total="totalCount" v-model:current-page="pageIndex"
          :default-page-size="pageSize" @current-change="loadData" />
      </el-col>
    </el-row>
    <el-drawer v-model="drawer" title="开业停业申请">
      <el-form :model="addForm" label-width="120px" :rules="ruleForm" ref="ruleFormRef">
        <el-form-item label="所属企业" prop="username">
          <el-input :value="curentUser.username" disabled />
        </el-form-item>
        <el-form-item label="申请类型" prop="ApplyType">
          <el-select v-model="addForm.ApplyType" placeholder="申请类型" clearable>
            <el-option label="开业申请" value="1" />
            <el-option label="停业申请" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="起止日期" prop="RangeDate">
          <el-date-picker v-model="addForm.RangeDate" type="daterange" unlink-panels range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item label="申请理由" prop="ApplyCause">
          <el-input v-model="addForm.ApplyCause" :rows="4" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"><el-icon>
              <Check />
            </el-icon>&nbsp;保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
  <el-dialog v-model="dialogFormVisible" title="审核" width="30%">
    <el-form :model="creditform">
      <el-form-item label="审核：" :label-width="formLabelWidth">
        <el-select v-model="creditform.Status" style="width:100%">
          <el-option label="通过" value="2" selected />
          <el-option label="驳回" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="说明：" :label-width="formLabelWidth">
        <el-input v-model="creditform.Remark" type="textarea" :rows="4" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="CreditForm">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  Search,
  DocumentAdd,
  Check
} from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import { FormRules, FormInstance, ElMessage } from 'element-plus'
import { $AddApplyStarStop, $GetListApplyStarStop, $CreditApplyStarStop } from '../../api/ApplyStarStop.ts';
const form = ref({
  name: '',
  applyType: '',
  checkState: ''
})
const addForm = ref({
  Id: 0,
  EnterpriseId: 0,
  ApplyType: "1",
  RangeDate: "2023-01-01 至 2023-01-10",
  ApplyCause: "",
  Status: "1",
  Remark: ""
})

let curentUser = JSON.parse(sessionStorage.getItem('user') || '');
const tableData = ref([])
let totalCount = ref(0);
let pageIndex = ref(1);
let pageSize = ref(10);
const loadData = async () => {
  let res = await $GetListApplyStarStop({
    applyType: form.value.applyType,
    status: form.value.checkState,
    enterpriseId: curentUser.enterpriseid,
    page: pageIndex.value,
    pageSize: pageSize.value
  }) as any;
  if (res.Code == "200") {
    tableData.value = res.Data.datalist;
    totalCount.value = res.Data.totalcount;
  }
}

const formateApplyType = (row: any) => {
  if (row.ApplyType == 1) {
    return "开业申请";
  }
  if (row.ApplyType == 0) {
    return "停业申请";
  }
  return "";
}
const formateApplyDate = (row: any) => {
  return row.ApplyDate.substring(0, 16).replace('T', ' ');
}


const formateStatus = (row: any) => {
  if (row.Status == 1) {
    return "审核中";
  }
  if (row.Status == 2) {
    return "已审核";
  }
  if (row.Status == 3) {
    return "已驳回";
  }
  return "";
}
//验证
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<FormRules<typeof addForm>>({
  RangeDate: [{ required: true, message: '日期范围必填项', trigger: 'blur' }],
  ApplyCause: [{ required: true, message: '申请理由必填项', trigger: 'blur' }]
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      addForm.value.EnterpriseId = curentUser.enterpriseid;
      let res = await $AddApplyStarStop(addForm.value) as any;
      console.log(JSON.stringify(res));
      if (res.Code == "200") {
        ElMessage({
          message: '操作成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '操作失败',
          type: 'error',
        })
      }
    }
  })
}
const drawer = ref(false)
onMounted(() => {
  curentUser = JSON.parse(sessionStorage.getItem('user') || '');
  setTimeout(() => {
    loadData();
  }, 200);
})
const handleEdit = async (Id: number) => {
  creditform.value.Id = Id;
  dialogFormVisible.value = true;
}
const CreditForm = async () => {
  let res = await $CreditApplyStarStop({
    Id: creditform.value.Id,
    status: creditform.value.Status,
    remark: creditform.value.Remark
  }) as any;
  console.log(JSON.stringify(res));
  if (res.Code == "200") {
    tableData.value = res.Data.datalist;
    totalCount.value = res.Data.totalcount;
    ElMessage({
      message: '操作成功',
      type: 'success',
    });
    dialogFormVisible.value = false;
  } else {
    ElMessage({
      message: '操作失败',
      type: 'error',
    })
  }
  loadData();
}
const creditform = ref({
  Id: 0,
  Remark: "",
  Status: ""

});

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
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