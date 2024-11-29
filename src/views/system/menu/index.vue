<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import MenuAPI, { MenuVO, MenuQuery, MenuForm } from "@/api/menu";
import { MenuTypeEnum } from "@/enums/MenuTypeEnum";

const loading = ref(false);
const queryParams = reactive<MenuQuery>({});
const menuData = ref<MenuVO[]>([]);
// const formData = ref({ ...initialMenuFormData.value });

// 初始菜单表单数据
const initialMenuFormData = ref<MenuForm>({
  id: undefined,
  parentId: 0,
  visible: 1,
  sort: 1,
  type: MenuTypeEnum.MENU, // 默认菜单
  alwaysShow: 0,
  keepAlive: 1,
  params: [],
});
function handleRowClick() {}
// 查询菜单
function handlemenuList() {
  loading.value = true;
  MenuAPI.getList(queryParams)
    .then((data) => {
      menuData.value = data;
    })
    .finally(() => {
      loading.value = false;
    });
}
const arr1=[1,2,3];
const arr2=[...arr1];
onMounted(() => {
  handlemenuList();
  console.log(arr2)
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
      <template #header>
        <el-button type="success">
          <template #icon><Plus /></template>
          新增
        </el-button>
      </template>

      <el-table
        v-loading="loading"
        :data="menuData"
        highlight-current-row
        row-key="id"
        :expand-row-keys="['1']"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren',
        }"
      >
        <el-table-column label="菜单名称" min-width="200" prop="name">
          <template #defalut="scope">
            <template
              v-if="scope.row.icon && scope.row.icon.startsWith('el-icon')"
            >
              <el-icon style="vertical-align: -0.15em">
                <component :is="scope.row.icon.replace('el-icon-', '')" />
              </el-icon>
            </template>

            <template v-else-if="scope.row.icon">
              <svg-icon :icon-class="scope.row.icon" />
            </template>
            <template v-else>
              <svg-icon icon-class="menu" />
            </template>
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="类型" width="100">
          <template #default="scope">
            <el-tag
              v-if="scope.row.type === MenuTypeEnum.CATALOG"
              type="warning"
            >
              目录
            </el-tag>
            <el-tag v-if="scope.row.type === MenuTypeEnum.MENU" type="success">
              菜单
            </el-tag>
            <el-tag v-if="scope.row.type === MenuTypeEnum.BUTTON" type="danger">
              按钮
            </el-tag>
            <el-tag v-if="scope.row.type === MenuTypeEnum.EXTLINK" type="info">
              外链
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="路由名称" width="100" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="路由路径"
          align="left"
          width="150"
          prop="routePath"
        ></el-table-column>
        <el-table-column
          label="权限标识"
          align="center"
          width="200"
          prop="perm"
        />

        <el-table-column label="状态" align="center" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.visible === 1" type="success">显示</el-tag>
            <el-tag v-else type="info">隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="排序"
          align="center"
          width="80"
          prop="sort"
        ></el-table-column>

        <el-table-column fixed="right" align="center" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-if="scope.row.type === 'CATALOG' || scope.row.type === 'MENU'"
              v-hasPerm="['sys:menu:add']"
              type="primary"
              link
              size="small"
            >
              <template #icon><Plus /></template>
              新增
            </el-button>

            <el-button
              v-hasPerm="['sys:menu:edit']"
              type="primary"
              link
              size="small"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
              v-hasPerm="['sys:menu:delete']"
              type="danger"
              link
              size="small"
            >
              <template #icon><Delete /></template>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
