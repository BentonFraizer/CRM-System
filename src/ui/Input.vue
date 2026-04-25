<script setup lang="ts">
import { type InputTypeHTMLAttribute } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  type?: InputTypeHTMLAttribute
  placeholder?: string
  errorMessage?: string
  isDisabled?: boolean
  size?: 'small' | 'medium' | 'large'
}>()

const value = defineModel('value')
</script>

<template>
  <div class="input-wrapper">
    <input
      v-bind="$attrs"
      :type="props.type ?? 'text'"
      :placeholder="props.placeholder"
      :disabled="props.isDisabled"
      v-model="value"
      :class="props.size ?? 'medium'"
    />
    <span class="error-message">{{ props.errorMessage }}</span>
  </div>
</template>

<style scoped>
input {
  font-size: 14px;
  padding: 10px 5px;
  border: 1px solid var(--border);
  border-radius: 6px;
}

.input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.error-message {
  color: var(--danger);
  font-size: 14px;
  min-height: 16px;
}

.small {
  padding: 3px 7px;
  border-radius: 4px;
}

.medium {
  padding: 7px 11px;
}

.large {
  padding: 10px 11px;
  font-size: 16px;
}

.border-bottom {
  border: 0;
  border-bottom: 2px solid var(--border-btn-default);
}
</style>
