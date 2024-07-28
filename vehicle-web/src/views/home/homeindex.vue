
<template>
  <el-scrollbar max-height="90vh" style="margin-top: -22px;">
  <div style="  background-color: #eef2fb;height: 95vh;overflow-x: hidden;overflow: hidden;">
    <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content ep-bg-purple-light content-label">
      <el-icon style="font-size: 90px;color:crimson;"><Comment /></el-icon>
    <p style="float: right; width: 100%; text-align: right; font-size: 25px;">昨日过车次数
<br>
<br>
{{analysisCount.YesterdayRecordCount}}
    </p>
    </div></el-col>
    <el-col :span="6"><div class="grid-content  content-label"  style="background-color: white; height: 120px;">
      <el-icon style="font-size: 90px;color:chocolate;"><ChatLineSquare /></el-icon>
    <p style="float: right; width: 100%; text-align: right; font-size: 25px;">今日过车次数
<br>
<br>
{{analysisCount.CurentDayRecordCount}}
    </p>
    </div></el-col>
    <el-col :span="6"><div class="grid-content  content-label"  style="background-color: #FFF; height: 120px;">
      <el-icon style="font-size: 90px;color:chartreuse;"><HelpFilled /></el-icon>
    <p style="float: right; width: 100%; text-align: right; font-size: 25px;">车辆数量
<br>
<br>
{{analysisCount.VehicleCount}}
    </p>
    </div></el-col>
    <el-col :span="6"><div class="grid-content  content-label"  style="background-color: #FFF; height: 120px;">
      <el-icon style="font-size: 90px;color:forestgreen;"><StarFilled /></el-icon>
    <p style="float: right; width: 100%; text-align: right; font-size: 25px;">今日预警数量
<br>
<br>
{{analysisCount.AlarmCount}}
    </p>
    </div></el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><div id="mychartcontent" class="grid-content ep-bg-purple-light content-label" style="height: 350px;">

    </div></el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="8"><div id="myVehicleTypecontent" class="grid-content ep-bg-purple-light content-label" style="height: 340px;">

    </div></el-col>
    <el-col :span="8"><div id="myEmissioncontent" class="grid-content ep-bg-purple-light content-label" style="height: 340px;">
 
    </div></el-col>
    <el-col :span="8"><div id="myAlarmBarcontent" class="grid-content ep-bg-purple-light content-label" style="height: 340px;">
   
    </div></el-col>
  </el-row>
    <!-- <el-row style="padding:10px">
      <el-col :span="8">
        <div class="ep-bg-purple" id="ep-bg-purple"></div>
        <div class="ep-bg-purple2" id="ep-bg-purple2"></div>
      </el-col>
      <el-col :span="8" style="padding-left:10px">
        <div class="grid-content ep-bg-purple-light" />
        中
      </el-col>
      <el-col :span="8" style="padding-left:10px">
        <div class="ep-bg-purple3" id="ep-bg-purple3"></div>
        <div class="ep-bg-purple4" id="ep-bg-purple4"></div>
      </el-col>
    </el-row> -->
  </div>
</el-scrollbar>
</template>

<script lang="ts" setup>
import {Comment,ChatLineSquare,HelpFilled,StarFilled} from '@element-plus/icons-vue'
import { onMounted,ref } from 'vue'
import * as echarts from 'echarts';
import { $GetCurentCount,$GePastDaysRecord} from '../../api/enterprise.ts';
onMounted(() => {
  setTimeout(()=>{
    LoadanalysisCount();
    LoadcharsData();
    LoadEmissionBar();
  LoadVehicleTypeBar();
  LoadAlarmBar();
          },200)

});
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

let curentUser =JSON.parse(sessionStorage.getItem('user') || '');
//加载当天数量
const LoadanalysisCount=async()=>{
  let res = await $GetCurentCount({
    enterpriseId:curentUser.enterpriseid
  }) as any;
  analysisCount.value = res.Data;
}
//加载近7天数据
const LoadcharsData=async()=>{
  let res = await $GePastDaysRecord({
    enterpriseId:curentUser.enterpriseid
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
      text: '近7天过车记录',
      left: 'center',
      top:'5%',
      textStyle:{
        fontSize:25,
        color:'#6b778c'
      }
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
        name: '近7天过车记录',
        data: charbarData.value.listcount,
        barWidth: '40%',
        type: 'bar'
      }
    ]
  };

  option && myChart1.setOption(option);
}
//加载车辆类型图
const LoadVehicleTypeBar = () => {
  var chartDom3 = document.getElementById('myVehicleTypecontent') as HTMLElement;
var myChart3 = echarts.init(chartDom3);
var option = {
  title: {
    text: '当日车辆类型占比',
    left: 'left'
  },    
  tooltip: {
    trigger: 'item'
  } ,
  legend: {
    orient: '车辆类型占比',
    left: 'right'
  },
  series: [
    {
      name: '车辆类型占比',
      type: 'pie',
      radius: ['0%', '60%'],
      data: [
        { value: 1048, name: '载货车' },
        { value: 735, name: '牵引车' },
        { value: 580, name: '自卸车' },
        { value: 484, name: '重型货车' },
        { value: 300, name: '厢式货车' }
      ]
    }
  ]
};
option && myChart3.setOption(option);
}
//报警统计
const LoadAlarmBar = () => {
  var chartDom2 = document.getElementById('myAlarmBarcontent')! as HTMLElement;
  var myChart2 = echarts.init(chartDom2);
  var option = {
  title: {
    text: '当日报警类型占比',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: '报警类型占比',
    left: 'right'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '60%',
      data: [
        { value: 123, name: '黑名单' },
        { value: 321, name: '核心管控区域国Ⅴ' },
        { value: 452, name: '常规管控国Ⅲ' },
        { value: 12, name: '国Ⅲ及以下' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

  option && myChart2.setOption(option);
}
//当日排放阶段占比
const LoadEmissionBar = () => {
  var chartDom4 = document.getElementById('myEmissioncontent')! as HTMLElement;
var myChart4 = echarts.init(chartDom4);
var option = {
  title: {
    text: '当日排放阶段占比',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: '排放阶段占比',
    left: 'right'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '60%',
      data: [
        { value: 123, name: '国Ⅵ' },
        { value: 321, name: '国Ⅴ' },
        { value: 452, name: '国Ⅳ' },
        { value: 12, name: '国Ⅲ及以下' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
option && myChart4.setOption(option);
}
</script>
<style type="css">
.el-tabs__content .el-scrollbar__wrap {
  overflow-x: hidden; 
}
</style>
<style lang="scss"  scoped >
.el-tabs__content .el-scrollbar__wrap {
  overflow-x: hidden; 
}
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
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.content-label{
  background-color:white; height: 120px; display: flex; align-items: center;padding-left: 20px; padding-right: 50px;
}

</style>