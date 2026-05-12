<script setup lang="ts">
import authBg from '@/assets/images/auth-bg.png'
</script>

<template>
  <a-layout class="layout">
    <a-layout class="image">
      <a-image :src="authBg" :preview="false" class="auth-image" />
    </a-layout>

    <a-layout class="content">
      <a-layout-content class="layout-content">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.image {
  width: 60%;
  height: 100vh;
  overflow: hidden;
  background-color: #ffe6c9;
  display: flex;
  justify-content: center;
}

.content {
  width: 40%;
  height: 100vh;
  overflow: auto;
}

.layout-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth-image {
  width: 100%;
  height: 100%;
}

.auth-image :deep(.ant-image-img) {
  width: 100%;
  height: 100vh;
  object-fit: contain;
  display: block;
}
</style>
