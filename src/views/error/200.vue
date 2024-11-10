<template>
  <div>
    <!-- <input type="text" v-model.lazy="message" /> -->
    <ul>
      <li v-for="(item, index) in colors" :key="index">{{ item }}</li>
      <!-- <ol v-for="(item, index) in xiaoming" :key="index">{{ item }}-{{ item.age }}-{{ item.sport }}></ol> -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      colors: ['red', 'pink', 'yellow', 'green', 'blue', 'purple'],
      xiaoming:{
        name:'xiaomiang',
        age:"19",
        sport:"football"
      }
    };
  },
  mounted() {
  // 将组件实例暴露到全局
  window.vm = this;
}
};
</script>

<style scoped lang="scss">
/* 你的样式代码 */
</style>
