<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import StatsAPI, { VisitStatsVO } from "@/api/log";
import { ref, onMounted } from "vue";
import router from "@/router";
import NoticeAPI, { NoticePageVO } from "@/api/notice";
const userStore = useUserStore();
// 定义关于时间的问候语。。。。这里补充一个computed属性
const greetings = ref("晨起披衣出草堂，轩窗已自喜微凉🌅");
// 消息待办项目统计数
const statisticData = ref([
  {
    title: "消息",
    iconClass: "message",
    value: 99,
    key: "message",
  },
  {
    value: 50,
    iconClass: "todo",
    title: "待办",
    suffix: "/100",
    key: "upcoming",
  },
  {
    value: 10,
    iconClass: "project",
    title: "项目",
    key: "project",
  },
]);

const onlineUserCount = ref(10);

/** 获取增长率文本颜色类 */
const getGrowthRateClass = (growthRate: number): string => {
  if (growthRate > 0) {
    return "color-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "color-[--el-color-success]";
  } else {
    return "color-[--el-color-info]";
  }
};

interface VisitStats {
  title: string;
  icon: string;
  tagType: "primary" | "success" | "warning";
  growthRate: number;
  // 粒度
  granularity: string;
  // 今日数量
  todayCount: number;
  totalCount: number;
}

const visitStatsList = ref<VisitStats[]>([]);
const visitStatsLoading = ref(true);

// 加载访问统计数据
const loadVisitStatsData = async () => {
  try {
    const list: VisitStatsVO[] = await StatsAPI.getVisitStats();

    if (list) {
      const tagTypes: ("primary" | "success" | "warning")[] = [
        "primary",
        "success",
        "warning",
      ];
      const transformedList: VisitStats[] = list.map((item, index) => ({
        title: item.title,
        icon: getVisitStatsIcon(item.type),
        tagType: tagTypes[index % tagTypes.length],
        growthRate: item.growthRate,
        granularity: "日",
        todayCount: item.todayCount,
        totalCount: item.totalCount,
      }));
      console.log(transformedList); // 添加这一行进行调试
      visitStatsList.value = transformedList;
      visitStatsLoading.value = false;
    }
  } catch (error) {
    console.error("Failed to load visit stats:", error);
    visitStatsLoading.value = false; // 确保即使失败也能关闭骨架屏
  }
};

/** 格式化增长率 */
const formatGrowthRate = (growthRate: number): string => {
  if (growthRate === 0) {
    return "-";
  }

  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, "");
  return formattedRate + "%";
};

/** 获取访问统计图标 */
const getVisitStatsIcon = (type: string) => {
  switch (type) {
    case "pv":
      return "pv";
    case "uv":
      return "uv";
    case "ip":
      return "ip";
    default:
      return "pv";
  }
};
const notices = ref<NoticePageVO[]>([]);
const noticeDetailRef=ref();
onMounted(() => {
  loadVisitStatsData();
});

function viewMoreNotice() {
  router.push({path:"/myNotice"});
}
// 阅读通知公告
function viewNoticeDetail(id: string) {
  noticeDetailRef.value.openNotice(id);
}
</script>

<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" />

    <!-- 主页头部 -->
    <el-card shadow="hover">
      <el-row justify="space-between">
        <el-col :span="18" :xs="24">
          <div class="flex h-full items-center">
            <img
              class="w-20 h-20 mr-5 rounded-full"
              :src="userStore.user.avatar + '?imageView2/1/w/80/h/80'"
            />
            <div>
              <p>{{ greetings }}</p>
              <p class="text-sm text-gray">
                今日天气晴朗，气温在15℃至25℃之间，东南风。
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="6" :xs="24">
          <div class="flex h-full items-center justify-around">
            <el-statistic
              v-for="item in statisticData"
              :key="item.key"
              :value="item.value"
            >
              <template #title>
                <svg-icon :icon-class="item.iconClass" size="20px"></svg-icon>
                <span class="text-[16px] ml-1"> {{ item.title }}</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 主页小卡片 -->
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex-x-between">
              <span class="text-[var(--el-text-color-secondary)]">
                在线用户
              </span>
              <el-tag type="success" size="small">-</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <span class="text-lg">{{ onlineUserCount }}</span>
            <svg-icon icon-class="user" size="2em" />
          </div>
          <div
            class="flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]"
          >
            <span>总用户数</span>
            <span>5</span>
          </div>
        </el-card>
      </el-col>

      <el-col
        v-for="(item, index) in visitStatsList"
        :key="index"
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <el-skeleton :loading="visitStatsLoading" :rows="5" animated>
          <template #template>
            <el-card>
              <template #header>
                <div>
                  <el-skeleton-item variant="h3" style="width: 40%" />
                  <el-skeleton-item
                    variant="rect"
                    style="float: right; width: 1em; height: 1em"
                  />
                </div>
              </template>

              <div class="flex-x-between">
                <el-skeleton-item variant="text" style="width: 30%" />
                <el-skeleton-item
                  variant="circle"
                  style="width: 2em; height: 2em"
                />
              </div>
              <div class="mt-5 flex-x-between">
                <el-skeleton-item variant="text" style="width: 50%" />
                <el-skeleton-item variant="text" style="width: 1em" />
              </div>
            </el-card>
          </template>
          <template v-if="!visitStatsLoading && visitStatsList.length > 0">
            <el-card shadow="never">
              <template #header>
                <div class="flex-x-between">
                  <span class="text-[var(--el-text-color-secondary)]">
                    {{ item.title }}
                  </span>
                  <el-tag :type="item.tagType" size="small">
                    {{ item.granularity }}
                  </el-tag>
                </div>
              </template>

              <div class="flex-x-between mt-2">
                <div class="flex-y-center">
                  <span class="text-lg">{{ item.todayCount }}</span>
                  <span
                    :class="[
                      'text-xs',
                      'ml-2',
                      getGrowthRateClass(item.growthRate),
                    ]"
                  >
                    <el-icon>
                      <Top v-if="item.growthRate > 0" />
                      <Bottom v-else-if="item.growthRate < 0" />
                    </el-icon>
                    {{ formatGrowthRate(item.growthRate) }}
                  </span>
                </div>
                <svg-icon :icon-class="item.icon" size="2em" />
              </div>

              <div
                class="flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]"
              >
                <span>总{{ item.title }}</span>
                <span>{{ item.totalCount }}</span>
              </div>
            </el-card>
          </template>
          <template
            v-else-if="!visitStatsLoading && visitStatsList.length === 0"
          >
            <el-empty description="暂无数据"></el-empty>
          </template>
        </el-skeleton>
      </el-col>
    </el-row>

    <!-- 趋势图 -->
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :span="16">
        <VisitTrend id="VisitTrend" width="100%" height="300px" />
      </el-col>
      <el-col :xs="24" :span="8">
        <el-card>
          <template #header>
            <div class="flex-x-between">
              <div class="flex-y-center">
                通知公告
                <el-icon class="ml-1"><Notification /></el-icon>
              </div>
              <el-link type="primary">
                <span class="text-xs" @click="viewMoreNotice">查看更多</span>
                <el-icon class="text-xs"><ArrowRight /></el-icon>
              </el-link>
            </div>
          </template>

          <el-scrollbar height="400px">
            <div
              v-for="(item, index) in notices"
              :key="index"
              class="flex-y-center py-3"
            >
              <DictLabel v-model="item.type" code="notice_type" size="small" />
              <el-text
                truncated
                class="!mx-2 flex-1 !text-xs !text-[var(--el-text-color-secondary)]"
              >
                {{ item.title }}
              </el-text>
              <el-link @click="viewNoticeDetail(item.id)">
                <el-icon class="text-sm"><View /></el-icon>
              </el-link>
            </div>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.github-corner {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  border: 0;
}
</style>






