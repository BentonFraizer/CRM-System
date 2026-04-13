<script setup lang="ts">
import { type InputTypeHTMLAttribute } from 'vue'

const {
  type = 'text',
  placeholder,
  errorMessage,
  disabled,
  size = 'medium',
  className = '',
  styleName = '',
} = defineProps<{
  type: InputTypeHTMLAttribute
  placeholder?: string
  errorMessage?: string
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  className?: string
  styleName?: string
}>()

const value = defineModel('value')
</script>

<template>
  <div class="input-wrapper">
    <input
      :type
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="value"
      :class="[className, size]"
      :style="styleName"
    />
    <span class="error-message">{{ errorMessage }}</span>
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
  height: 16px;
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
</style>
