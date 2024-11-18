<!-- 

<template>
  <el-card shadow="never">
    <el-input>
      <template>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>
    <el-tree ref="deptTreeRef" class="mt2" :data="deptList"/>
  </el-card>
</template>
<script setup lang="ts">
import DeptAPI from "@/api/dept";
import { ref, onBeforeMount } from "vue";
// import { OptionType,ElTree } from "@/types/global";
// const props = defineProps({
//   modelValue: {
//     type: [Number],
//     default: undefined,
//   },
// });

const deptList = ref<OptionType[]>(); // 部门列表
// const deptTreeRef = ref(ElTree); // 部门树
const deptName = ref(); // 部门名称 
onBeforeMount(()=>{
  DeptAPI.getList
})
onMounted(async () => {
  try {
    const response = await DeptAPI.getList(queryParams);
    deptList.value = response.data; // 假设后端返回的数据中包含一个data属性，它是DeptVO[]类型的
  } catch (error) {
    console.error('获取部门列表时出错:', error);
    // 可以在这里处理错误，比如显示错误消息
  }
});
</script>
<style lang="scss" scoped></style> -->
<script setup lang="ts"></script>

<template>
  <div>test</div>
</template>

<style lang="scss" scoped></style>
