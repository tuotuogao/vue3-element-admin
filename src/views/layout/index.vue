<template></template>

<script>
export default {
  // mounted() {
  //   const promise = new Promise((resolve, reject) => {
  //     // 异步操作
  //     setTimeout(() => {
  //       if (Math.random() < 0.5) {
  //         console.log(Math.random);
  //         resolve("success");
  //       } else {
  //         reject("error");
  //       }
  //     }, 1000);
  //   });
    
  //   promise
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },


  // 例子2
  mounted(){
    new Promise(function (resolve, reject) {
    var a = 0;
    var b = 1;
    if (b == 0) reject("Divide zero");
    else resolve(a / b);
}).then(function (value) {
    console.log("a / b = " + value);
}).catch(function (err) {
    console.log(err);
}).finally(function () {
    console.log("End");
});
  }
};

</script>

<style>
</style>
