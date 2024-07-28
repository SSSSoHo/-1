<template>
    <div>
        <el-row>
            <el-col :span="24"><div class="grid-content ep-bg-purple" />
                <el-form :model="form" label-width="120px" :inline="true" class="demo-form-inline">
                    <el-form-item label="日期范围">
                        <el-date-picker
        v-model="form.date1"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </el-form-item>
    <el-form-item label="车牌号">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="进出类型">
      <el-select
        v-model="form.inout"
        placeholder="进出类型"
        clearable
      >
        <el-option label="进" value="1" />
        <el-option label="出" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="排放阶段" >
      <el-select v-model="form.EmissionStore" placeholder="排放阶段"  clearable>
      <el-option label="国Ⅵ" value="6" />
      <el-option label="国Ⅴ" value="5" />
      <el-option label="国Ⅳ" value="4" />
      <el-option label="国Ⅲ及以下" value="3" />
    </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary"><el-icon><Search /></el-icon>&nbsp;查询</el-button>
    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
    <el-col :span="24" style="padding:20px"><div class="grid-content ep-bg-purple-dark" />
        <el-table
    :data="tableData"
    :cell-style="{padding:'10px 10px;'}"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="xuhao" label="序号" width="60" align="center" />
    <el-table-column prop="daozha" label="道闸"  align="center" />
    <el-table-column prop="inout" label="进出类型"  align="center" />
    <el-table-column prop="passtime" label="通过时间"  width="200"  align="center" />
    <el-table-column prop="carno" label="车牌号"  align="center" />
    <el-table-column prop="carcolor" label="车牌颜色"  align="center" />
    <el-table-column prop="emissionStage" label="排放阶段"  align="center" />
    <el-table-column prop="reconsiderContent" label="复议内容"  align="center" />
  </el-table>
    </el-col>
  </el-row>
  <el-row justify="center">
    <el-col :span="24" style="padding-left:20px;display:flex;justify-content: left;"><div class="grid-content ep-bg-purple-dark" />
        <el-pagination background layout="prev, pager, next" :total="1" />
    </el-col>
  </el-row>
    </div>
</template>

<script lang="ts" setup>
import {
Search
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const form = ref({
	name: '',
    date1:'',
    inout:'进',
    carType:'',
    carColor:'',
    EmissionStore:''
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

const tableRowClassName = ({
  rowIndex,
}: {
  row: Device
  rowIndex: number
}) => {
    if (rowIndex%2==0) {
        return 'success-row'
  } 
  return ''
}

const tableData= ref([
])

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