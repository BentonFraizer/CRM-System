<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthorizationForm from '@/components/AuthorizationForm.vue'
</script>

<template>
  <AuthLayout>
    <h2 class="heading">Войдите в свой аккаунт</h2>
    <AuthorizationForm />
    <p>
      Еще нет аккаунта?
      <router-link to="/registration">Зарегистрироваться</router-link>
    </p>
  </AuthLayout>
</template>

<style scoped>
.heading {
  margin-bottom: 50px;
}
</style>
