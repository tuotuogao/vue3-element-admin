<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import MenuAPI, { MenuVO, MenuQuery } from "@/api/menu";
const loading = ref(false);
const queryParams = reactive<MenuQuery>({});
const menuData = ref<MenuVO[]>([]);
function handlemenuList() {
  loading.value = true;
  MenuAPI.getList(queryParams).then((data) => {
    menuData.value = data;
    loading.value = false;
  });
}
onMounted(() => {
  handlemenuList();
});
</script>

<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :inline="true">
        <el-form-item prop="keywords" label="关键字">
          <el-input placeholder="菜单名称" clearable />
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

      <el-table :data="menuData" default-expand-all>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          prop="name"
          label="菜单名称"
          min-width="100"
        ></el-table-column>
        <el-table-column prop="code" label="类型" width="100"></el-table-column>
        <el-table-column label="路由名称" width="100" align="center">
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


