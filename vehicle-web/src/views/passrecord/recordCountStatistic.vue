
<template>
    <div style="background-color: #eef2fb;height: 95vh;overflow-x: hidden;overflow: hidden;">
        <el-row>
      <el-col :span="24" style="height:60px;background-color: #FFF;">
        <el-form :model="form" label-width="120px" :inline="true" class="demo-form-inline">
            <el-form-item label="企业名称">
          <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-80"
        :placeholder="placeholderent"
        @select="handleSelect"
      />
    </el-form-item>
          <el-form-item label="开始日期">
            <!-- <el-date-picker v-model="form.daterange" type="daterange" unlink-panels range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" /> -->
              <el-date-picker
        v-model="form.stardate"
        type="date"
        placeholder="开始日期"
      />
          </el-form-item>
          <el-form-item label="结束日期">
            <!-- <el-date-picker v-model="form.daterange" type="daterange" unlink-panels range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" /> -->
              <el-date-picker
        v-model="form.enddate"
        type="date"
        placeholder="结束日期"
      />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ReloadData"><el-icon>
                <Search />
              </el-icon>&nbsp;查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
      <el-row>
      <el-col :span="6"><div class="grid-content ep-bg-purple-light content-label">
      <p style="float: right; width: 100%; text-align: center; font-size: 25px;">昨日过车次数
  <br>
  <br>
  {{analysisCount.YesterdayRecordCount}}
      </p>
      </div></el-col>
      <el-col :span="6"><div class="grid-content  content-label"  style="background-color: white; height: 120px;">
      <p style="float: right; width: 100%; text-align: center; font-size: 25px;">今日过车次数
  <br>
  <br>
  {{analysisCount.CurentDayRecordCount}}
      </p>
      </div></el-col>
      <el-col :span="6"><div class="grid-content  content-label"  style="background-color: #FFF; height: 120px;">
      <p style="float: right; width: 100%; text-align: center; font-size: 25px;">车辆数量
  <br>
  <br>
  {{analysisCount.VehicleCount}}
      </p>
      </div></el-col>
      <el-col :span="6"><div class="grid-content  content-label"  style="background-color: #FFF; height: 120px;">
      <p style="float: right; width: 100%; text-align: center; font-size: 25px;">今日预警数量
  <br>
  <br>
  {{analysisCount.AlarmCount}}
      </p>
      </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div id="mychartcontent" class="grid-content ep-bg-purple-light content-label" style="height: 450px;">
  
      </div></el-col>
    </el-row>
</div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted,ref } from 'vue'
  import * as echarts from 'echarts';
  import { $GetCurentCount,$GePastDaysRecord, $GetKeyValueEnts} from '../../api/enterprise';

  onMounted(() => {
    setTimeout(()=>{
      loadData()
    },200)

  });
  const placeholderent = ref('');
  const loadData = async () => {
    let entres =  await $GetKeyValueEnts() as any;
     restaurants.value = entres;
    form.value.enterpriseId = entres[0].code;
    placeholderent.value =  entres[0].value;
    await ReloadData();
  }
  const ReloadData = async()=>{
    LoadanalysisCount();
      LoadcharsData();
  }
  const form = ref({
  stardate: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000),
  enddate:new Date(),
  enterpriseId: ''
})
  const analysisCount = ref({
    VehicleCount:0,
    CurentDayRecordCount:0,
    YesterdayRecordCount:0,
    AlarmCount:0
  })
  const charbarData = ref({
    listdate:['1-1','1-2','1-3','1-4','1-5','1-6','1-7'],
    listcount:[12,34,45,23,56,23,56]
  
  });
  //加载当天数量
  const LoadanalysisCount=async()=>{
    let res = await $GetCurentCount({
      enterpriseId:form.value.enterpriseId,
      startDate:form.value.stardate,
      endDate:form.value.enddate
    }) as any;
    analysisCount.value = res.Data;
  }
  //加载近7天数据
  const LoadcharsData=async()=>{
    let res = await $GePastDaysRecord({
      enterpriseId:form.value.enterpriseId,
      startDate:form.value.stardate,
      endDate:form.value.enddate
    }) as any;
    charbarData.value = res.Data;
      LoadCharts1();
  }
  //加载柱状图
  const LoadCharts1 = () => {
    var chartDom1 = document.getElementById('mychartcontent')! as HTMLElement;
    var myChart1 = echarts.init(chartDom1);
    var option  = {
      title: {
        text: '过车记录统计',
        left: 'center',
        top:'5%',
        textStyle:{
          fontSize:25,
          color:'#6b778c'
        }
      },
  tooltip: {
    trigger: 'axis'
  },
      grid: {
      left: '0%',
      right: '1%',
      bottom: '3%',
      containLabel: true
    },
      xAxis: {
        type: 'category',
        data: charbarData.value.listdate
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '过车记录统计',
          data: charbarData.value.listcount,
          barWidth: '40%',
          type: 'line'
        }
      ]
    };
    option && myChart1.setOption(option);
  }



  interface RestaurantItem {
  value: string
}
const state = ref('')
const restaurants = ref<RestaurantItem[]>([])
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
 form.value.enterpriseId = item.code;
}



  
  </script>
  <style type="css">
  .el-row {
  margin-bottom: 10px;
}
 
  </style>
  <style lang="scss"  scoped >
  .ep-bg-purple {
    height: 400px;
    border: 1px soid #CCC;
    width: 450px;
  }
  .ep-bg-purple2{
    height: 400px;
    border: 1px soid #CCC;
    width: 450px;
  }
  .ep-bg-purple3{
    height: 400px;
    border: 1px soid #CCC;
    width: 450px;
  }
  .ep-bg-purple4{
    height: 400px;
    border: 1px soid #CCC;
    width: 450px;
  }
  
  .el-row {
    margin-bottom: 10px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 20px;
  }
  
  .content-label{
    background-color:white; height: 120px; display: flex; align-items: center;padding-left: 20px; padding-right: 50px;
  }
  .demo-form-inline .el-input {
  --el-input-width: 220px;
}
  </style>