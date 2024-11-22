<script setup lang="ts">
import { DeptQuery, DeptVO } from "@/api/dept";
import { ref } from "vue";
import DeptAPI from "@/api/dept";
const loading=ref(false)
// 加载部门的下拉数据
// const data=DeptAPI.getList();
// const departmentList=ref<any[]>([])
// onMounted(async () => {
//   try {
//     const data = await DeptAPI.getList();
//     departmentList.value = data; // 将获取到的数据赋值给departmentList
//     console.log("是我啊哈哈哈", data);
//   } catch (error) {
//     console.error("获取部门列表时出错:", error);
//   }
// });

const deptList=ref<DeptVO[]>();
  const queryParams = reactive<DeptQuery>({});
  // const data=DeptAPI.getOptions();
// 定义一个方法从后端获取数据
function handleQuery(){
  loading.value = true;
  DeptAPI.getList(queryParams).then((data)=>{
    deptList.value=data;
    loading.value = false;
  })


}
onMounted(()=>{
  handleQuery();
})
</script>

<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :inline="true">
        <el-form-item prop="keywords" label="关键字">
          <el-input placeholder="部门名称" clearable />
        </el-form-item>
        <el-form-item prop="departmentStatus" label="部门状态">
          <el-select
            v-model="queryParams.status"
            placeholder="全部"
            clearable
            class="!w-[100px]"
          >
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">
            <template #icon><Search /></template>
            搜索
          </el-button>
          <el-button>
            <template #icon><Refresh /></template>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <template>
        <el-button type="info">新增</el-button>
        <el-button type="danger">删除</el-button>
      </template>

      <el-table v-loading="loading"
      row-key="id"
      default-expand-all
      :data="deptList"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          prop="name"
          label="部门名称"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="部门编码"
          width="100"
        ></el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <!-- 代表这是插槽内容 #default=scope -->
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" width="80" prop="sort" />

        <el-table-column fixed="right" label="操作" width="220">
          <template>
            <el-button type="primary" size="small" link>
              <template #icon><Position /></template>
              分配权限
            </el-button>
            <el-button type="primary" size="small" link>
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button type="danger" size="small" link>
              <template #icon><Delete /></template>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


