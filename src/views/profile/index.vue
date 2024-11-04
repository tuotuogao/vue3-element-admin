<template>
  <div class="app-container">
    <el-tabs tab-position="left">
      <!-- 账号信息 -->
      <el-tab-pane label="账号信息">
        <div class="w-full">
          <el-card>
            <!-- 头像和昵称 -->
            <div class="relative w-100px h-100px flex-center">
              <el-avatar :size="100" />
              <el-button
                type="info"
                class="absolute bottom-0 right-0 cursor-pointer"
                circle
              />

              <input
                ref="fileInput"
                type="file"
                style="display: none"
                @click="handleFileChange"
              />
            </div>
            <div class="mt-5">
              {{ userProfile.nickname }}
              <el-icon
                class="align-middle cursor-pointer"
                @click="handleOpenDialog(DialogType.ACCOUNT)"
              >
                <Edit />
              </el-icon>
            </div>

            <!-- 用户信息描述 -->
            <el-descriptions :column="1" class="mt-10">
              <!-- 用户名 -->
              <el-descriptions-item>
                <template #label>
                  <el-icon class="align-middle"><User /></el-icon>
                  用户名
                </template>
                {{ userProfile.username }}
                <el-icon
                  v-if="userProfile.gender === 1"
                  class="align-middle color-blue"
                >
                  <Male />
                </el-icon>
                <el-icon v-else class="align-middle color-pink">
                  <Female />
                </el-icon>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <el-icon class="align-middle"><Phone /></el-icon>
                  手机号码
                </template>
                {{ userProfile.mobile }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <el-icon class="align-middle"><Message /></el-icon>
                  邮箱
                </template>
                {{ userProfile.email }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <SvgIcon icon-class="tree" />
                  部门
                </template>
                {{ userProfile.deptName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <SvgIcon icon-class="role" />
                  角色
                </template>
                {{ userProfile.roleNames }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <el-icon class="align-middle"><Timer /></el-icon>
                  创建日期
                </template>
                {{ userProfile.createTime }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </div>
      </el-tab-pane>

      <!-- 安全设置 -->
      <el-tab-pane label="安全设置"></el-tab-pane>
      <!-- 弹窗 -->
      <el-dialog v-model="dialog.visible" :title="dialog.title" :width="500">
        <!-- 账号资料 -->
        <el-form
          :label-width="100"
          :model="userProfileForm"
          ref="userProfileFormRef"
        >
        <el-form-item label="昵称">
          <el-input v-model="userProfileForm.nickname" />
        </el-form-item>
        <el-form-item label="性别">
          <dictionary v-model="userProfileForm.gender" code="gender" />
        </el-form-item>
      </el-form>

        <!--  -->
      </el-dialog>
    </el-tabs>
  </div>
</template>


<script lang="ts" setup>
import UserAPI, {
  UserProfileVO,
  PasswordChangeForm,
  MobileBindingForm,
  EmailBindingForm,
  UserProfileForm,
} from "@/api/user";
import { reactive, ref } from "vue";
// 不加花括号表示导出整个模块，但是模块当中必须只有一个默认导出，否则就只能通过花括号导出一部分

enum DialogType {
  ACCOUNT = "account",
  PASSWORD = "password",
  MOBILE = "mobile",
  EMAIL = "email",
}
const dialog = reactive({
  visible: false,
  title: "",
  type: "" as DialogType,
});
const handleFileChange = async () => {};
const userProfileForm = reactive<UserProfileForm>({});
const userProfile = ref<UserProfileVO>({});

const handleOpenDialog = (type: DialogType) => {
  dialog.type = type;
  dialog.visible = true;
  switch (type) {
    case DialogType.ACCOUNT:
      dialog.title = "账号资料";
      // 初始化表单数据
      userProfileForm.id = userProfile.value.id;
      userProfileForm.nickname = userProfile.value.nickname;
      userProfileForm.gender = userProfile.value.gender;
      break;
    case DialogType.PASSWORD:
      dialog.title = "修改密码";
      break;
    case DialogType.MOBILE:
      dialog.title = "绑定手机";
      break;
    case DialogType.EMAIL:
      dialog.title = "绑定邮箱";
      break;
  }
};
/** 加载用户信息 */
const loadUserProfile = async () => {
  const data = await UserAPI.getProfile();
  userProfile.value = data;
};
onMounted(() => {
  loadUserProfile();
});
</script>



<style lang="scss" scoped>
/** 关闭tag标签  */
.app-container {
  /* 50px = navbar = 50px */
  height: calc(100vh - 50px);
  background: var(--el-fill-color-blank);
}

/** 开启tag标签  */
.hasTagsView {
  .app-container {
    /* 84px = navbar + tags-view = 50px + 34px */
    height: calc(100vh - 84px);
  }
}
</style>
