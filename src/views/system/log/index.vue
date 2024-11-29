<script setup lang="ts">
import LogAPI, { LogPageQuery, LogPageVO } from "@/api/log";
import { ref, reactive, onMounted } from "vue";
const Loading = ref(false);
// 1.获取日志的接口数据
const Loglist = ref<LogPageVO[]>();
// 定义分页数据
const pageData = ref<LogPageVO[]>();

// 响应式数据定义
const queryParams = reactive<LogPageQuery>({
  pageNum: 1,
  pageSize: 10,
  keywords: "",
  createTime: ["", ""],
});
function handleQuery() {
  Loading.value = true;
  LogAPI.getPage(queryParams).then((data) => {
    pageData.value = data.list;
    total.value = data.total;
    Loading.value = false;
  });
}
// 2.将字段与响应的table绑定
// 3.底部的分页按钮
const currentPage = ref(1);
const pageSize = ref(2);
const total = ref(1444);
const handlePageChange = function () {
    
};

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <div class="search-container">
      <el-form shadow="null" class="">
        <el-form-item class="ml-5">
          <el-form-item label=" 关键字">
            <el-input placeholder="日志内容" class="lg=5" />
          </el-form-item>
          <el-form-item label="操作时间">
            <el-date-picker
              type="daterange"
              class="!w-[240px]"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="至"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>

          <el-button type="primary">
            <el-icon><Search /></el-icon>
            搜索</el-button
          >
          <el-button type="default">
            <el-icon> <Refresh /> </el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="log-container">
      <el-card>
        <el-table :data="pageData">
          <el-table-column label="操作时间" prop="createTime" />
          <el-table-column label="操作人" prop="operator" />
          <el-table-column label="日志模块" prop="module" />
          <el-table-column label="日志内容" prop="content"/>
          <el-table-column label="IP地址" prop="ip" />
          <el-table-column label="地区" prop="region" />
          <el-table-column label="浏览器" prop="browser" />
          <el-table-column label="终端系统" prop="os"/>
          <el-table-column
            label="执行时间(ms
                )"
          />
        </el-table>
        
        <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
