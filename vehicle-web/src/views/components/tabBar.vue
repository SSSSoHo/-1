<template>
    <el-tabs type="card" v-model="activeKey" editable @tab-click="clickTab" @tab-remove="reoveTab" class="demo-tabs">
        <el-tab-pane v-for="item in tabslist" :key="item.path" :label="item.title" :name="item.path">
          
        </el-tab-pane>
        <router-view></router-view>
    </el-tabs>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import { Itab } from '../../store/type';
const store = useStore();
const route = useRoute();
const router = useRouter();
const tabslist = computed(() => {
    return store.getters.getAddtab
})
const activeKey = ref('')
//添加tab
const addTab = () => {
    const { meta, path } = route
    const tab: Itab = {
        path: path,
        title: meta.title as string
    }
    store.commit('addTab', tab)
}
//监控当前路由
watch(() => route.path, () => {
    activeKey.value = route.path;
    addTab()
})
//点击tab
const clickTab = (event: any) => {
   router.push({ path: event.props.name })
}
//移除tab
const reoveTab = (targetName: any) => {
    if (tabslist.value.length == 1) {
        return alert("已经是最后一页了");
    }
    if (activeKey.value == targetName) {
        tabslist.value.forEach((tab: Itab, index: number) => {
            if (tab.path == targetName) {
                const nextTab = tabslist.value[index + 1] || tabslist.value[index - 1];
                if (nextTab) {
                    activeKey.value = nextTab.path;
                }
            }

        });
    }
    store.commit("removeTab");
}
</script>
<style  lang="scss">
.demo-tabs .el-tabs__content {
  padding-top: 22px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 400;
  background-color:#FFF;
  margin: 15px;
  border-radius: 8px;
  height: 85vh;
}
.demo-tabs .is-active{
    background-color: #FFF;
}
.el-scrollbar__wrap{
  overflow-x: hidden;
  }
</style>