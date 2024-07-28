<template>
    <el-drawer v-model="drawer" title="添加车辆" :before-close="handleClose">
      <el-form :model="addForm" :rules="ruleForm" label-width="120px" ref="ruleFormRef">
        <el-form-item label="所属企业" prop="EnterpriseId">
          <el-autocomplete v-model="addForm.EnterpriseName" :fetch-suggestions="querySearch" clearable class="inline-input"
            @select="handleSelect" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="道闸名称" prop="DeviceName">
          <el-input v-model="addForm.DeviceName" />
        </el-form-item>
        <el-form-item label="设备编号" prop="">
          <el-input v-model="addForm.DeviceCode"  :disabled="true"  placeholder="系统自动生成设备编号" />
        </el-form-item>
        <el-form-item label="是否联网" prop="InternetMark">
          <el-select v-model="addForm.InternetMark" placeholder="是否联网" clearable style="width: 100%;">
            <el-option label="否" value="否"/>
            <el-option label="是" value="是" />
          </el-select>
        </el-form-item>
        <el-form-item label="进出口类型" prop="DeviceType">
          <el-select v-model="addForm.DeviceType" placeholder="进出口类型" clearable style="width: 100%;">
            <el-option label="进口" value="进口" />
            <el-option label="出口" value="出口" />
          </el-select>
        </el-form-item>
       
        <el-form-item label="备注" prop="Remark">
          <el-input v-model="addForm.Remark" />
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
  import { $GetKeyValueEnts } from '../../../api/enterprise'
  import { $AddDevice } from '../../../api/device'
  interface RestaurantItem {
    code: string
    value: string
  }
  let isSave = false;
  const restaurants = ref<RestaurantItem[]>([])
  let drawer = ref(false)
  const addForm = reactive({
    DeviceId: "",
    EnterpriseId: "",
    EnterpriseName:"",
    DeviceCode: "",
    InternetMark: "",
    DeviceName: "",
    DeviceType: "",
    Remark: "",
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
  
  const handleSelect = (item:any) => {
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
    DeviceName: [{ required: true, message: '名称必填', trigger: 'blur' }],
    DeviceType: [{ required: true, message: '进出口类型必填项', trigger: 'blur' }]
  });
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        let res = await $AddDevice(addForm) as any;
        console.log(res.Code)
        if (res.Code == "200") {
          ElNotification({
            title: '通知',
            message: '操作成功',
            type: 'success',
          });
          isSave = true;
          drawer.value=false;
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