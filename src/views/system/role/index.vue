<script setup lang="ts">
defineOptions({
  name: "Role", //设置组件的名称
  inheritAttrs: false, // 控制是否将未声明的属性（attrs）传递给组件的根元素。
});
import { ref, onMounted, reactive, watch } from "vue";
// import RoleAPI, { RolePageVO, RolePageQuery } from "@/api/role";
import RoleAPI, { RolePageVO, RolePageQuery, RoleForm } from "@/api/role";
import { ElMessage, ElMessageBox, ElTree } from "element-plus";
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

// 树节点的父子组件是否联动
const parentChildLinked = ref(true);
const queryFormRef = ref();
const permKeywords = ref("");
const roleFormRef = ref(ElForm);

/** 重置查询 */
function handleResetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}
// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});
const ids = ref<number[]>([]);

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
    menuPermOptions.value = await MenuAPI.getOptions();
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

// 权限筛选
watch(permKeywords, (val) => {
  permTreeRef.value!.filter(val);
});

// 编辑角色打开弹窗
function handlePermFilter(
  value: string,
  data: {
    [key: string]: any;
  }
) {
  if (!value) return true;
  return data.label.includes(value);
}

function handleOpenDialog(roleId?: number) {
  dialog.visible = true;
}
// 删除角色
function handleDelete(roleId?: number) {
  const roleIds = [roleId || ids.value].join(",");
  if (!roleIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(
    () => {
      loading.value = true;
      RoleAPI.deleteByIds(roleIds)
        .then(() => {
          ElMessage.success("删除成功");
          handleResetQuery();
        })
        .finally(() => (loading.value = false));
    },
    () => {
      ElMessage.info("已取消删除");
    }
  );
}
//
const formData = reactive<RoleForm>({
  sort: 1,
  status: 1,
  code: "",
  name: "",
});


const rules = reactive({
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
  dataScope: [{ required: true, message: "请选择数据权限", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "blur" }],
});
// 关闭角色弹窗
function handleCloseDialog() {
  dialog.visible = false;
  roleFormRef.value.resetFields();
  roleFormRef.value.clearValidate();

  formData.id = undefined;
  formData.sort = 1;
  formData.status = 1;
}
// 选中的角色
interface CheckedRole {
  id?: number;
  name?: string;
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
        <el-button type="danger" @click="handleDelete()">删除</el-button>
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
            <el-button
              type="primary"
              size="small"
              link
              @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button type="danger" size="small" link @click="handleDelete()">
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
        :filter-node-method="handlePermFilter"
        :default-expand-all="true"
        :check-strictly="!parentChildLinked"
        class="mt-5"
      >
        <template #default="{ data }">
          {{ data.label }}
        </template>
      </el-tree>
    </el-drawer>

    <!-- 角色表单弹窗 -->
    <el-dialog
      width="500px"
      v-model="dialog.visible"
      :title="dialog.title"
      @close="handleCloseDialog"
    >
      <el-form label-width="100px" ref="roleFormRef" :model="formData" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input placeholder="请输入角色编码"></el-input>
        </el-form-item>
        <el-form-item label="数据权限" prop="dataScope">
          <el-select placeholder="请选择数据权限">
            <el-option :key="0" label="全部数据" :value="0" />
            <el-option :key="1" label="部门及子部门数据" :value="1" />
            <el-option :key="2" label="本部门数据" :value="2" />
            <el-option :key="3" label="本人数据" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number
            v-model="formData.sort"
            controls-position="right"
            :min="0"
            style="width: 100px"
          >
          </el-input-number>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
</style>
