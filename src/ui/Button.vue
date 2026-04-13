<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

const {
  htmlType,
  type = 'default',
  disabled,
  size = 'medium',
} = defineProps<{
  htmlType?: ButtonHTMLAttributes['type']
  type?: 'default' | 'primary' | 'danger'
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    :type="htmlType ?? 'button'"
    :class="[type, size]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.default {
  color: var(--text-base);
  background-color: var(--bg-btn-default);
  border: 1px solid var(--border-btn-default);

  &:hover {
    border: 1px solid var(--border-btn-default-hover);
    color: var(--text-btn-default-hover);
  }
}

.primary {
  color: var(--text-btn-primary);
  background-color: var(--bg-btn-primary);

  &:hover {
    background-color: var(--bg-btn-primary-hover);
  }
}

.danger {
  color: var(--text-btn-danger);
  background-color: var(--bg-btn-danger);

  &:hover {
    background-color: var(--bg-btn-danger-hover);
  }
}

.small {
  border-radius: 3px;
  padding: 0 8px;
  font-size: 14px;
  height: 22px;
}

.medium {
  border-radius: 6px;
  padding: 0 16px;
  font-size: 14px;
  height: 30px;
}

.large {
  border-radius: 9px;
  padding: 0 24px;
  font-size: 16px;
  height: 38px;
}

button:disabled,
button:disabled:hover {
  cursor: not-allowed;
  color: var(--text-disabled);
  background-color: var(--bg-btn-disabled);
  border: 1px solid var(--border-disabled);
}
</style>
