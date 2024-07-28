<template>
    <el-drawer v-model="drawer" title="添加企业" :before-close="handleClose">
      <el-form :model="addForm" :rules="ruleForm" label-width="120px" ref="ruleFormRef">
        <el-form-item label="企业名称" prop="EnterpriseName">
          <el-input v-model="addForm.EnterpriseName" />
        </el-form-item>
        <el-form-item label="企业类型" prop="EnterpriseType">
          <el-input v-model="addForm.EnterpriseType" />
        </el-form-item>
        <el-form-item label="企业信用代码" prop="CreditCode">
          <el-input v-model="addForm.CreditCode" />
        </el-form-item>
        <el-form-item label="企业地址" prop="Address">
          <el-input v-model="addForm.Address" />
        </el-form-item>
        <el-form-item label="联系人" prop="LinkMan">
          <el-input v-model="addForm.LinkMan" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="LinkManPhone">
          <el-input v-model="addForm.LinkManPhone" />
        </el-form-item>
        <el-form-item label="联系人邮箱" prop="LinkManEmail">
          <el-input v-model="addForm.LinkManEmail" />
        </el-form-item>
        <el-form-item label="企业法人" prop="PrincipalMan">
          <el-input v-model="addForm.PrincipalMan" />
        </el-form-item>
        <el-form-item label="授权到期" prop="AuthorizationDate">
          <el-input v-model="addForm.AuthorizationDate" type="date" />
        </el-form-item>
        <el-form-item label="企业状态" prop="Status">
          <el-select v-model="addForm.Status" placeholder="状态" clearable style="width: 100%;">
            <el-option label="正常" value=1 />
            <el-option label="停产" value=0 />
          </el-select>
        </el-form-item>
        <el-form-item label="共享数据" prop="SharedData">
          <el-select v-model="addForm.SharedData" placeholder="共享数据" clearable style="width: 100%;">
            <el-option label="是" value="true" />
            <el-option label="否" value="false" />
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
  import { $AddEnterpriseInfo } from '../../../api/enterprise.ts'

  let isSave = false;
  let drawer = ref(false)
  const addForm = ref({
       Id:0
      ,EnterpriseName:""
      ,EnterpriseType:""
      ,AreaId:""
      ,Address:""
      ,Longitude:""
      ,Latitude:""
      ,LinkMan:""
      ,LinkManPhone:""
      ,LinkManEmail:""
      ,PrincipalMan:""
      ,EnterprisePhone:""
      ,CreateTime:""
      ,UpdateTime:""
      ,IsDelete:0
      ,AuthorizationDate:""
      ,Status:"1"
      ,CreditCode:""
      ,SharedData:"true"
  })
  onMounted(async () => {

  })
  
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
    drawer,
    addForm
  });
  //验证
  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive<FormRules<typeof addForm>>({
    EnterpriseName: [{ required: true, message: '企业名称必填项', trigger: 'blur' }],
    CreditCode: [{ required: true, message: '信用代码必填项', trigger: 'blur' }],
    AuthorizationDate: [{ required: true, message: '授权到期必填项', trigger: 'blur' }]
  });
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        let res = await $AddEnterpriseInfo(addForm.value) as any;
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