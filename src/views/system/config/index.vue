<script setup lang="ts">
import { DeptVO } from "@/api/dept";
import { ref, reactive, onMounted } from "vue";
import { ElForm } from "element-plus";
import ConfigAPI, {
  ConfigForm,
  ConfigPageQuery,
  ConfigPageVO,
} from "@/api/config";

// 1，获取页面接口数据
const PageList = ref<DeptVO[]>();
const loading = ref(false);
// 使用vue3的reactive来创建一个响应式对象queryparams，并且初始化他为configpagaquery类型的对象，这个对象包含了分页查询的参数，
// 例如：pageNum,pageSize,keywords等，当用户输入关键字时，queryParams会自动更新，然后调用configapi的getPage方法，获取分页数据，并赋值给PageList
const queryParams = reactive<ConfigPageQuery>({
  pageNum: 1,
  pageSize: 10,
  keywords: "",
});
// 生命一个pagedata用来接收api接口返回的数据
const pageData = ref<ConfigPageVO[]>([]);
// 定义一个变量total来接受查询的总数
const total = ref();

// 监听queryParams的变化，调用handleQuery方法，获取分页数据
function handleQuery() {
  (loading.value = false),
    // 获取数据
    ConfigAPI.getPage(queryParams)
      .then((data) => {
        pageData.value = data.list;
        total.value = data.total;
      })
      .finally(() => {
        loading.value = false;
      });
}
// 系统配置表单
const formData = reactive<ConfigForm>({
  id: undefined,
  configName: "",
  configKey: "",
  configValue: "",
  remark: "",
});

const rules = reactive({
  configName: [
    { required: true, message: "请输入系统配置名称", trigger: "blur" },
  ],
  configKey: [
    { required: true, message: "请输入系统配置编码", trigger: "blur" },
  ],
  configValue: [
    { required: true, message: "请输入系统配置值", trigger: "blur" },
  ],
});


onMounted(() => {
  handleQuery();
});
// console.log(pageData.value);
// 2.将数据到桌面
// 3.获取配置项的数据，先获取接口，再将接口数据渲染到页面，
</script>

<template>
  <div class="app-container">
    <div class="search-container">
      <el-form>
        <el-form-item label="关键字">
          <el-input placeholder="请输入配置键/配置名称"></el-input>

          <el-button type="primary" class="ml-5">
            <el-icon><Search /></el-icon>搜索</el-button
          >
          <el-button type="">
            <el-icon><Refresh /></el-icon>

            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-container">
      <el-card>
        <template #header>
          <el-button type="success"
            ><el-icon><Plus /></el-icon>新增</el-button
          >
          <el-button type="danger"
            ><el-icon><refresh /></el-icon>刷新缓存</el-button
          >
        </template>
        <el-table
          ref="dataTableRef"
          v-loading="loading"
          :data="pageData"
          highlight-current-row

        >
          <el-table-column
            prop="key"
            label="配置键"
            width="150"
          ></el-table-column>
          <el-table-column
            key="configName"
            prop="name"
            label="配置名称"
        
            width="200"
          ></el-table-column>
          <el-table-column
            prop="value"
            label="配置值"
            width="400"
          ></el-table-column>
          <el-table-column
            prop="updated_at"
            label="更新时间"
            width="200"
          ></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template>
              <el-button>
                <template #icon> <Edit /> </template>编辑</el-button
              >
              <el-button>
                <template #icon> <Edit /> </template>删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
