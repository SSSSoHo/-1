<template>
  <el-drawer v-model="drawer" title="添加车辆" :before-close="handleClose">
    <el-form :model="addForm" :rules="ruleForm" label-width="120px" ref="ruleFormRef">
      <el-form-item label="所属企业" prop="EnterpriseId">
        <el-autocomplete v-model="addForm.EnterpriseName" :fetch-suggestions="querySearch" clearable class="inline-input"
          @select="handleSelect" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="车牌号码" prop="VehicleNumber">
        <el-input v-model="addForm.VehicleNumber" />
      </el-form-item>
      <el-form-item label="车牌颜色" prop="NumberColor">
        <el-select v-model="addForm.NumberColor" placeholder="车牌颜色" clearable style="width: 100%;">
          <el-option label="绿色" value="绿色" />
          <el-option label="黄色" value="黄色" />
          <el-option label="蓝色" value="蓝色" />
          <el-option label="其它" value="其它" />
        </el-select>
      </el-form-item>
      <el-form-item label="车辆类型" prop="VehicleType">
        <el-select v-model="addForm.VehicleType" placeholder="车辆类型" clearable style="width: 100%;">
          <el-option label="厢式货车" value="厢式货车" />
          <el-option label="半挂" value="半挂" />
          <el-option label="载货车" value="载货车" />
          <el-option label="其它" value="其它" />
        </el-select>
      </el-form-item>
      <el-form-item label="燃料类型" prop="FuelType">
        <el-select v-model="addForm.FuelType" placeholder="燃料类型" clearable style="width: 100%;">
          <el-option label="汽油" value="汽油" />
          <el-option label="柴油" value="柴油" />
          <el-option label="天然气" value="天然气" />
          <el-option label="新能源" value="新能源" />
        </el-select>
      </el-form-item>
      <el-form-item label="车辆识别代码" prop="VIN">
        <el-input v-model="addForm.VIN" />
      </el-form-item>
      <el-form-item label="使用性质" prop="VehicleCertificate">
        <el-input v-model="addForm.VehicleCertificate" />
      </el-form-item>
      <el-form-item label="品牌型号" prop="VehicleVariety">
        <el-input v-model="addForm.VehicleVariety" />
      </el-form-item>
      <el-form-item label="注册日期" prop="SignTime">
        <el-date-picker v-model="addForm.SignTime" type="date" style="width: 100%" />
      </el-form-item>
      <el-form-item label="排放阶段" prop="DischargeStage">
        <el-select v-model="addForm.DischargeStage" placeholder="排放阶段" clearable style="width: 100%;">
          <el-option label="国Ⅵ" value="Ⅵ" />
          <el-option label="国Ⅴ" value="Ⅴ" />
          <el-option label="国Ⅳ" value="Ⅳ" />
          <el-option label="国Ⅲ" value="Ⅲ" />
          <el-option label="国Ⅱ" value="Ⅱ" />
          <el-option label="国Ⅰ" value="Ⅰ" />
          <el-option label="新能源" value="新能源" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"><el-icon>
            <Check />
          </el-icon>&nbsp;保存</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import { ElMessageBox, FormRules, FormInstance, ElNotification } from 'element-plus'
import { $GetKeyValueEnts } from '../../../api/enterprise.ts'
import { $AddVehicle } from '../../../api/vehicle.ts'
interface RestaurantItem {
  code: string
  value: string
}
let isSave = false;
const restaurants = ref<RestaurantItem[]>([])
let drawer = ref(false)
const addForm = reactive({
  VehicleType: "",
  NumberColor: "",
  VehicleNumber: "",
  VIN: "",
  SignTime: "",
  EngineNumber: "",
  DischargeStage: "",
  FuelType: "",
  VehicleCertificate: "",
  MechanicalNumber: "",
  Remark: "",
  CreateTime: "",
  UpdateTime: "",
  IsDelete: "",
  VehicleVariety: "",
  EnterpriseId: "",
  EnterpriseName: ""
})
onMounted(async () => {
  let sResult = await $GetKeyValueEnts() as any;
  restaurants.value = sResult;
})
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelect = (item: any) => {
  addForm.EnterpriseId = item.code;
}
const handleClose = (done: () => void) => {
  if (isSave == false) {
    ElMessageBox.confirm('未保存，确定关闭?')
      .then(() => {
        done()
        isSave = false;
      })
      .catch(() => {
        // catch error
      })
  } else {
    done();
    isSave = false;
  }
}
//暴露变量
defineExpose({
  drawer
});
//验证
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<FormRules<typeof addForm>>({
  EnterpriseId: [{ required: true, message: '所属企业必填项', trigger: 'blur' }],
  VehicleNumber: [{ required: true, message: '车牌必填项', trigger: 'blur' }],
  DischargeStage: [{ required: true, message: '排放阶段必填项', trigger: 'blur' }],
  NumberColor: [{ required: true, message: '车牌颜色必填项', trigger: 'blur' }],
  VehicleType: [{ required: true, message: '车辆类型必填项', trigger: 'blur' }]
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let res = await $AddVehicle(addForm) as any;
      console.log(res.Code)
      if (res.Code == "200") {
        ElNotification({
          title: '通知',
          message: '操作成功',
          type: 'success',
        });
        isSave = true;
      } else {
        ElNotification({
          title: '通知',
          message: '操作失败，检查是否重复录入？',
          type: 'success',
        });
        isSave = false;
      }
    }
  })
}
</script>