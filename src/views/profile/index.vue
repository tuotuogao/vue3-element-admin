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
      <el-tab-pane label="安全设置">
        <el-card>
          <el-row>
            <el-col :span="16">
              <div class="font-bold">账号密码</div>
              <div class="text-12px mt-2">
                定期修改密码有助于保护账号安全
                <el-button
                  type="primary"
                  plain
                  size="small"
                  class="ml-5"
                  @click="handleOpenDialog(DialogType.PASSWORD)"
                  >修改</el-button
                >
              </div>
            </el-col>
          </el-row>
          <!-- 绑定手机 -->
          <div class="mt-5">
            <div class="font-bold">绑定手机</div>
            <div class="text-12px mt-2">
              <span v-if="userProfile.mobile">
                已绑定手机号：{{ userProfile.mobile }}
              </span>
              <span v-else>未绑定手机</span>
              <el-button
                v-if="userProfile.mobile"
                type="primary"
                plain
                size="small"
                class="ml-5"
                @click="() => handleOpenDialog(DialogType.MOBILE)"
              >
                更换
              </el-button>
              <el-button
                v-else
                type="primary"
                plain
                size="small"
                class="ml-5"
                @click="() => handleOpenDialog(DialogType.MOBILE)"
              >
                绑定
              </el-button>
            </div>
          </div>

          <!-- 绑定邮箱 -->
          <div class="mt-5">
            <div class="font-bold">绑定邮箱</div>
            <div class="text-12px mt-2">
              <span v-if="userProfile.email">
                已绑定手机号：{{ userProfile.email }}
              </span>
              <span v-else>未绑定邮箱</span>
              <el-button
                v-if="userProfile.email"
                type="primary"
                plain
                size="small"
                class="ml-5"
                @click="() => handleOpenDialog(DialogType.EMAIL)"
              >
                更换
              </el-button>
              <el-button
                v-else
                type="primary"
                plain
                size="small"
                class="ml-5"
                @click="() => handleOpenDialog(DialogType.EMAIL)"
              >
                绑定
              </el-button>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <!-- 弹窗 -->
      <el-dialog v-model="dialog.visible" :title="dialog.title" :width="500">
        <!-- 账号资料 -->
        <el-form
          v-if="dialog.type === DialogType.ACCOUNT"
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
        <el-form
          v-if="dialog.type === DialogType.PASSWORD"
          ref="passwordChageFormRef"
          :label-width="100"
          :model="passwordChangeForm"
          :rules="passwordChangeRules"
        >
          <el-form-item label="原密码" prop="oldPassword">
            <el-input v-model="passwordChangeForm.oldPassword" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="passwordChangeForm.newPassword" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="passwordChangeForm.confirmPassword" />
          </el-form-item>
        </el-form>
        <!-- 修改手机号码 -->
        <el-form
          v-if="dialog.type === DialogType.MOBILE"
          ref="mobileBindingFormRef"
          :label-width="100"
          :model="mobileBindingForm"
          :rules="mobileBindingRules"
        >
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="mobileBindingForm.mobile" style="width: 250px" />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="mobileBindingForm.code" style="width: 250px">
              <template #append>
                <el-button
                  class="ml-5"
                  :disabled="mobileCountdown > 0"
                  @click="handleSendVerificationCode('MOBILE')"
                  >{{
                    mobileCountdown > 0
                      ? `${mobileCountdown}s后重新发送`
                      : "发送验证码"
                  }}</el-button
                >
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 绑定邮箱 -->

        <el-form
          v-if="dialog.type === DialogType.EMAIL"
          ref="emailBindingFormRef"
          :label-width="100"
          :model="emailBindingForm"
          :rules="emailBindingRules"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="emailBindingForm.email" style="width: 250px" />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="emailBindingForm.code" style="width: 250px">
              <template #append>
                <el-button
                  class="ml-5"
                  :disabled="mobileCountdown > 0"
                  @click="handleSendVerificationCode('EMAIL')"
                  >{{
                    mobileCountdown > 0
                      ? `${mobileCountdown}s后重新发送`
                      : "发送验证码"
                  }}</el-button
                >
              </template>
            </el-input>
          </el-form-item>
        </el-form>

        <template #footer>
          <span>
            <el-button @click="dialog.visible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确认</el-button>
          </span>
        </template>
        <!--  -->
      </el-dialog>
    </el-tabs>
  </div>
</template>


<script lang="ts" setup>
import UserAPI, {
  UserProfileVO,
  MobileBindingForm,
  UserProfileForm,
  PasswordChangeForm,
} from "@/api/user";
import { EmailBindingForm } from "@/api/user";
import { reactive, ref } from "vue";
// 不加花括号表示导出整个模块，但是模块当中必须只有一个默认导出，否则就只能通过花括号导出一部分
import { ElMessage } from "element-plus";
enum DialogType {
  ACCOUNT = "account",
  PASSWORD = "password",
  MOBILE = "mobile",
  EMAIL = "email",
}
const emailBindingForm = reactive<EmailBindingForm>({});

const dialog = reactive({
  visible: false,
  title: "",
  type: "" as DialogType,
});
const handleFileChange = async () => {};
const userProfileForm = reactive<UserProfileForm>({});
const userProfile = ref<UserProfileVO>({});
// 定义一个变量passwordChangeForm用来修改密码
const passwordChangeForm = reactive<PasswordChangeForm>({});
const passwordChangeRules = {
  oldPassword: [{ required: true, message: "请输入原密码", trigger: "blur" }],
  newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请确认新密码", trigger: "blur" },
  ],
};

// 绑定邮箱规则
const emailBindingRules = {
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
};
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

const mobileBindingForm = reactive<MobileBindingForm>({});
const mobileBindingRules = {
  mobile: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请填写正确的手机号码",
      trigger: "blur",
    },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
// 发送验证码
const handleSendVerificationCode = async (contactType: string) => {
  if (contactType === "MOBILE") {
    if (!mobileBindingForm.mobile) {
      ElMessage.error("请输入手机号");
      return;
    }
    mobileCountdown.value = 60;
    mobileTimer.value = setInterval(() => {
      if (mobileCountdown.value > 0) {
        mobileCountdown.value -= 1;
      } else {
        clearInterval(mobileTimer.value!);
      }
    }, 1000);
  }
};
const handleSubmit = async () => {
  if (dialog.type === DialogType.ACCOUNT) {
    // 调用api发送验证
    UserAPI.updateProfile(userProfileForm).then(() => {
      ElMessage.success("账号资料修改成功");
      dialog.visible = false;
      loadUserProfile();
    });
  } else if (dialog.type === DialogType.PASSWORD) {
    if (passwordChangeForm.newPassword !== passwordChangeForm.confirmPassword) {
      ElMessage.error("两次输入的密码不一致");
      return;
    }
    UserAPI.changePassword(passwordChangeForm).then(() => {
      ElMessage.success("密码修改成功");
      dialog.visible = false;
    });
  } else if (dialog.type === DialogType.MOBILE) {
    UserAPI.bindMobile(mobileBindingForm).then(() => {
      ElMessage.success("手机号绑定成功");
      dialog.visible = false;
      loadUserProfile();
    });
  } else if (dialog.type === DialogType.EMAIL) {
    UserAPI.bindEmail(emailBindingForm).then(() => {
      ElMessage.success("邮箱绑定成功");
      dialog.visible = false;
      loadUserProfile();
    });
  }
};
const mobileCountdown = ref(0);
const mobileTimer = ref<NodeJS.Timeout | null>(null);
const emailCountdown = ref(0);
const emailTimer = ref<NodeJS.Timeout | null>(null);
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
