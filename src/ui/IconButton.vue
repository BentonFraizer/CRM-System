<script setup lang="ts">
import { type ButtonHTMLAttributes } from 'vue'

const { type = 'button', iconName } = defineProps<{
  type?: ButtonHTMLAttributes['type']
  iconName: 'edit' | 'trash' | 'check' | 'close'
  disabled?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    :type
    :disabled
    class="icon"
    :class="[`icon--${iconName}`]"
    @click="$emit('click')"
  ></button>
</template>

<style scoped>
.icon {
  display: block;

  margin: 0;
  padding: 0;
  width: 20px;
  height: 20px;

  cursor: pointer;

  border: none;
  background-color: transparent;
  background-size: cover;

  &:disabled {
    background-color: var(--bg-icon-btn-disabled);
    cursor: not-allowed;
  }
}

.icon--edit {
  background-color: var(--primary);
  mask: url('@/assets/icons/icon-pencil.svg') no-repeat center;
  mask-size: contain;
}

.icon--trash {
  width: 16px;
  background-color: var(--danger);
  mask: url('@/assets/icons/icon-trash.svg') no-repeat center;
  mask-size: contain;
}

.icon--check {
  background-color: var(--success);
  mask: url('@/assets/icons/icon-check.svg') no-repeat center;
  mask-size: contain;
}

.icon--close {
  height: 24px;
  width: 24px;
  background-color: var(--danger);
  mask: url('@/assets/icons/icon-close.svg') no-repeat center;
  mask-size: contain;
}
</style>
