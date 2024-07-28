<template>
        <el-form :model="form" :rules="ruleForm" label-width="130px"  ref="ruleFormRef" v-loading="loading">
          <el-form-item label="行驶证："  prop="DrivingLiceseImg">
            <el-upload class="avatar-uploader" :action="baseUrl_test + 'Vehicle/UploadDrivingLicesnseImg'"  capture="camera"
              :show-file-list="false" :on-success="UploadDrivingLiceseImg" :before-upload="beforUpload">
              <img v-if="form.DrivingLiceseImg" :src="baseUrl_test + form.DrivingLiceseImg" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="车牌号：" prop="VehicleNumber">
            <el-input v-model="form.VehicleNumber" />
          </el-form-item>
          <el-form-item label="车牌颜色：" prop="NumberColor">
            <el-select v-model="form.NumberColor" placeholder="车牌颜色" clearable style="width: 100%;">
              <el-option label="绿色" value="绿" />
              <el-option label="黄色" value="黄" />
              <el-option label="蓝色" value="蓝" />
              <el-option label="白色" value="白" />
              <el-option label="黑色" value="黑" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <el-form-item label="车辆类型：">
            <el-select v-model="form.VehicleType" placeholder="车辆类型" clearable style="width: 100%;">
              <el-option label="厢式货车" value="厢式货车" />
              <el-option label="半挂" value="半挂" />
              <el-option label="面包车" value="面包车" />
              <el-option label="重型货车" value="重型货车" />
              <el-option label="普通货车" value="普通货车" />
              <el-option label="轻型货车" value="轻型货车" />
              <el-option label="其他车" value="其他车" />
            </el-select>
          </el-form-item>
          <el-form-item label="燃料类型：" prop="FuelType">
            <el-select v-model="form.FuelType" placeholder="燃料类型" clearable style="width: 100%;">
              <el-option label="汽油" value="汽油" />
              <el-option label="柴油" value="柴油" />
              <el-option label="天然气" value="天然气" />
              <el-option label="新能源" value="新能源" />
              <el-option label="油电混动" value="油电混动" />
              <el-option label="液化石油气" value="液化石油气" />
              <el-option label="氢" value="氢" />
              <el-option label="无燃料" value="无燃料" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <el-form-item label="车辆识别代码：" prop="VIN">
            <el-input v-model="form.VIN" />
          </el-form-item>
          <el-form-item label="发动机号码：" prop="EngineNumber">
            <el-input v-model="form.EngineNumber" />
          </el-form-item>
          <el-form-item label="使用性质：">
            <el-select v-model="form.VehicleCertificate" placeholder="使用性质" clearable style="width: 100%;">
              <el-option label="货运" value="货运" />
              <el-option label="非营运" value="非营运" />
              <el-option label="营转非" value="营转非" />
              <el-option label="租赁货运" value="租赁货运" />
              <el-option label="危险废物运输" value="危险废物运输" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <el-form-item label="所有人：" prop="Owner">
            <el-input v-model="form.Owner" />
          </el-form-item>
          <el-form-item label="住址：">
            <el-input v-model="form.Address" />
          </el-form-item>
          <el-form-item label="品牌型号">
            <el-input v-model="form.VehicleVariety" />
          </el-form-item>
          <el-form-item label="注册日期" prop="SignTime">
            <el-date-picker v-model="form.SignTime" type="date" style="width: 100%" />
          </el-form-item>
          <el-form-item label="发证日期：" prop="CreateCerDate">
            <el-date-picker v-model="form.CreateCerDate" type="date" style="width: 100%" />
          </el-form-item>
          <el-form-item label="排放阶段：" prop="DischargeStage">
            <el-input v-model="form.DischargeStage" :readonly="isreadonly"  v-if="isreadonly==true" />
            <el-select v-model="form.DischargeStage"  placeholder="排放阶段" v-if="isreadonly==false" clearable style="width: 100%;">
              <el-option label="国Ⅰ" value="Ⅰ" />
              <el-option label="国Ⅱ" value="Ⅱ" />
              <el-option label="国Ⅲ" value="Ⅲ" />
              <el-option label="国Ⅳ" value="Ⅳ" />
              <el-option label="国V" value="V" />
              <el-option label="国Ⅵ" value="Ⅵ" />
              <el-option label="新能源" value="新能源" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <el-form-item label="运输货物名称：">
            <el-input v-model="form.GoodsName" />
          </el-form-item>
          <el-form-item label="运输量（吨）：">
            <el-input v-model="form.MaxGoodsWeight" />
          </el-form-item>
          <el-form-item label="进出货：">
            <el-select v-model="form.ImpOrExp" placeholder="进出货：" clearable style="width: 100%;">
              <el-option label="进货" value="进货" />
              <el-option label="出货" value="出货" />
            </el-select>
          </el-form-item>
          <el-form-item label="车队名称：">
            <el-input v-model="form.FleetName" />
          </el-form-item>
          <el-form-item label="驾驶证："  prop="DriverLiceseImg">
            <el-upload class="avatar-uploader" :action="baseUrl_test + 'Vehicle/UploadDriverLiceseImg'"  capture="camera"
              :show-file-list="false" :on-success="UploadDriverLiceseImg" :before-upload="beforeAvatarUpload">
              <img v-if="form.DriverLiceseImg" :src="baseUrl_test + form.DriverLiceseImg" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="随车清单："  prop="VehicleListReportImg">
            <el-upload class="avatar-uploader" :action="baseUrl_test + 'Vehicle/UploadVehicleListReportImg'"  capture="camera"
              :show-file-list="false" :on-success="UploadVehicleListReportImg" :before-upload="beforeAvatarUpload">
              <img v-if="form.VehicleListReportImg" :src="baseUrl_test + form.VehicleListReportImg" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 150px;">保存</el-button>
          </el-form-item>
        </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { FormRules, FormInstance, ElNotification, UploadProps,ElMessage } from 'element-plus'
import { baseUrl_test } from '../../config/config.ts'
import { $AddVehicleFromPhone } from '../../api/vehicle.ts'
import { useRouter } from 'vue-router'
import * as imageConversion from 'image-conversion'
const loading = ref(false);
const {currentRoute} = useRouter();
const router = currentRoute.value;
const isreadonly = ref(true);
const form = reactive({
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
  EnterpriseId:  router.query.EnterpriseId,
  EnterpriseName: "",
  Address: "",
  CreateCerDate: "",
  ImpOrExp: "",
  Owner: "",
  GoodsName: "",
  MaxGoodsWeight: "",
  FleetName: "",
  DriverLiceseImg: "",
  VehicleListReportImg: "",
  DrivingLiceseImg:""
})
const beforUpload: UploadProps["beforeUpload"] = async () => {
  loading.value=true;
}
//上传驾驶证
const UploadDriverLiceseImg: UploadProps['onSuccess'] = (
  response
) => {
  let { Code, Data } = response;
  if (Code == 200) {
    form.DriverLiceseImg = Data;
  }else{
    ElMessage.error('上传失败！')
  }
  loading.value=false;
}
//上传行驶证
const UploadDrivingLiceseImg: UploadProps['onSuccess'] = (
  response
) => {
  let { Code, Data,Message } = response;
  if (Code == 200) {
    form.DrivingLiceseImg = Data.FileName;
    form.VIN = Data.VIN;
    form.Address = Data.Address;
    form.CreateCerDate = Data.CreateCerDate;
    form.VehicleVariety = Data.VehicleVariety;
    form.VehicleType = Data.VehicleType;
    form.Owner = Data.Owner;
    form.VehicleCertificate = Data.VehicleCertificate;
    form.EngineNumber = Data.EngineNumber;
    form.VehicleNumber = Data.VehicleNumber;
    form.SignTime = Data.SignTime;
    form.DischargeStage = Data.DischargeStage;
    form.FuelType = Data.FuelType;
  }else{
    ElMessage.error(Message)
  }
  loading.value=false;
}
//上传随车清单
const UploadVehicleListReportImg: UploadProps['onSuccess'] = (
  response
) => {
  let { Code, Data } = response;
  if (Code == 200) {
    form.VehicleListReportImg = Data;
  }else{
    ElMessage.error('上传失败！')
  }
  loading.value=false;
}
//照片验证
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type != 'image/jpeg' && rawFile.type != 'image/png' && rawFile.type != 'image/jpg') {
    ElMessage.error('必须上传jpg、PNG格式图片！')
    return false
  } else{
    return new Promise((resolve) => {
        if (rawFile.size > 1000) {
          imageConversion.compressAccurately(rawFile, 1000).then(res => {
          resolve(res)
          })
        } else {
         return true;
        }
      })
  }
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<FormRules<typeof form>>({
  VehicleNumber: [{ required: true, message: '必填项', trigger: 'blur' }],
  VehicleCertificate: [{ required: true, message: '必填项', trigger: 'blur' }],
  NumberColor: [{ required: true, message: '必填项', trigger: 'blur' }],
  VIN: [{ required: true, message: '必填项', trigger: 'blur' }],
  CreateCerDate: [{ required: true, message: '必填项', trigger: 'blur' }],
  SignTime: [{ required: true, message: '必填项', trigger: 'blur' }],
  Owner: [{ required: true, message: '必填项', trigger: 'blur' }],
  VehicleListReportImg: [{ required: true, message: '必填项', trigger: 'blur' }],
  DischargeStage: [{ required: true, message: '排放阶段为必填项', trigger: 'blur' }],
  FuelType: [{ required: true, message: '燃油类型为必填项', trigger: 'blur' }]
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if(form.DischargeStage==""){
         isreadonly.value=false;
        }
  if (!formEl){
    return
  } 
  formEl.validate(async (valid) => {
    if (valid) {
      loading.value=true;
      let res = await $AddVehicleFromPhone(form) as any;
     
      if (res!=undefined&&res.Code == "200") {
        ElNotification({
          title: '通知',
          message: res.Data,
          type: 'success',
        });
      } else {
        ElNotification({
          title: '通知',
          message: "服务器错误",
          type: 'error',
        });
      }
      loading.value=false;
    }
  })
}
//拍照

</script>

<style>
.avatar{
  width:120px; height: 120px;
}

</style>
    