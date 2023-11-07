<template>
  <div>
    <div>This is About Page</div>
    <button @click="increment">counter from store {{ count }}</button>
    <el-icon><IEpArrowLeft /></el-icon>
  </div>
</template>

<script setup lang="ts">
  import { useCounterStore } from '@/store';
  import { storeToRefs } from 'pinia';
  const counterStore = useCounterStore();
  const { count } = storeToRefs(counterStore);
  const { increment } = counterStore;

  // 使用接口
  // import { getUserInfo } from '@/apis';
  // const userInfo = await getUserInfo({ userId: '111' });
  // console.log('----userInfo---', userInfo);

</script>

<style scoped></style>