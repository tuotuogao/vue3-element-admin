<script setup lang="ts">
defineOptions({
  name: "Role", //设置组件的名称
  inheritAttrs: false, // 控制是否将未声明的属性（attrs）传递给组件的根元素。
});
import { ref, onMounted, reactive } from "vue";
// import RoleAPI, { RolePageVO, RolePageQuery } from "@/api/role";
import RoleAPI, { RolePageVO, RolePageQuery } from "@/api/role";
import { ElTree } from "element-plus";
// import { OptionType } from "@/types/global";
import MenuAPI from "@/api/menu";
const loading = ref(false);

// 试一下git分支合并
const total = ref(0);
const assignPermDialogVisible = ref(false);
// 定义变量roleList变量，用于存储从后端获取的角色列表数据
const roleList = ref<RolePageVO[]>();
interface CheckedRole {
  id?: number;
  name?: string;
}
const checkedRole = ref<CheckedRole>({});

const permTreeRef = ref<InstanceType<typeof ElTree>>();

// 定义变量queryParams变量，用于存储查询条件,包括页码和每页的大小
const queryParams = reactive<RolePageQuery>({
  pageNum: 1,
  pageSize: 10,
});
const isExpanded = ref(true);
const menuPermOptions = ref<OptionType[]>([]);

// 定义一个handleQuery方法，用于查询角色列表
function handleQuery() {
  loading.value = true;
  RoleAPI.getPage(queryParams)
    .then((data) => {
      roleList.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}
// 打开分配权限菜单
async function handleOpenAssignPermDialog(row: RolePageVO) {
  const roleId = row.id;
  if (roleId) {
    assignPermDialogVisible.value = true;
    loading.value = true;
    checkedRole.value.id = roleId;
    checkedRole.value.name = row.name;
    // 获取所有的菜单
    menuPermOptions.value=await MenuAPI.getOptions();
  }
}
// 展开和收缩菜单控制方法
function togglePermTree() {
  isExpanded.value = !isExpanded.value;
  if (permTreeRef.value) {
    Object.values(permTreeRef.value.store.nodesMap).forEach((node: any) => {
      if (isExpanded.value) {
        node.expand();
      } else {
        node.collapse();
      }
    });
  }
}
onMounted(() => {
  handleQuery();
//   console.log(MenuAPI.getOptions());
//   console.log(MenuAPI.getList());
  
  
});

</script>

<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef">
        <el-form-item prop="keywords" label="关键字">
          <el-input placeholder="角色名称" clearable />
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
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <template>
        <el-button type="info">新增</el-button>
        <el-button type="danger">删除</el-button>
      </template>

      <el-table ref="dataTableRef" :data="roleList" highlight-current-row>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          prop="name"
          label="角色名称"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="角色编码"
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
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleOpenAssignPermDialog(scope.row)"
            >
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
      <pagination />
    </el-card>
    <!-- 分配权限弹窗 -->
    <el-drawer
      v-model="assignPermDialogVisible"
      :title="'【' + checkedRole.name + '】权限分配'"
      size="500"
    >
      <div class="flex-x-between">
        <el-input placeholder="菜单权限名称" clearable class="w-[150px]">
          <template #prefix>
            <Search />
          </template>
        </el-input>
        <div class="flex-center ml-5">
          <el-button type="primary" size="small" plain @click="togglePermTree">
            <template #icon>
              <Switch />
            </template>
            {{ isExpanded ? "收起" : "展开" }}
          </el-button>
          <el-checkbox class="ml-5"> 父子联动</el-checkbox>
          <!-- 父子联动提示 -->
          <el-tooltip placement="bottom">
            <template #content>
              如果只需勾选菜单权限，不需要勾选子菜单或者按钮权限，请关闭父子联动
            </template>
            <el-icon
              class="ml-1 color-[--el-color-primary] inline-block cursor-pointer"
            >
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </div>
      </div>
      <el-tree
        ref="permTreeRef"
        node-key="value"
        show-checkbox
        :data="menuPermOptions"
      >
      </el-tree>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
</style>
