<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { onMounted } from 'vue'
import { getAllUsers } from '@/api/userApi.ts'

onMounted(async () => {
  const response = await getAllUsers({ limit: 20, page: 0 })
})
</script>

<!-- TODO: скорее всего нужно взять другой пример таблицы из antdv. -->
<!-- TODO: Первый пример с сортировкой имеет axios-запрос на сервер. Думаю будет супер, если адаптировать его -->
<template>
  <AppLayout>
    <h3>Страница под таблицу с пользователями</h3>
  </AppLayout>
</template>

<style scoped>
h3 {
  text-align: center;
  margin-top: 50px;
}
</style>
