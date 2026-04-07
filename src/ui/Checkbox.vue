<script setup lang="ts">
defineProps<{
  checked: boolean
  label: string
  id: string
  disabled?: boolean
  classNames?: string
}>()

defineEmits<{
  change: []
}>()
</script>

<template>
  <input
    type="checkbox"
    :id="id"
    :checked="checked"
    :disabled="disabled"
    class="checkbox-input"
    :class="classNames"
    @change="$emit('change')"
  />
  <label :for="id" :class="{ 'is-done': checked }">{{ label }}</label>
</template>

<style scoped>
input,
label {
  cursor: pointer;
}

input {
  width: 270px;
  margin-right: 10px;
}

.is-done {
  text-decoration: line-through;
  color: var(--text-secondary);
}

/* Кастомизация чекбокса */
.checkbox-input {
  appearance: none;
  position: relative;
  width: 22px;
  height: 22px;
  background: var(--bg-base);
  border: 2px solid var(--bg-primary);
  border-radius: 50%;
}

.checkbox-input::after {
  content: '';
  background: var(--primary);
  color: var(--bg-base);
  background-image: url('@/assets/icons/icon-white-check-mark.svg');
  position: absolute;
  top: -1px;
  left: -1px;
  width: 0;
  height: 0;
  font-size: 18px;
  overflow: hidden;
  border-radius: 50%;
}

.checkbox-input:checked {
  &:disabled {
    opacity: 0.7;
  }

  &::after {
    width: 20px;
    height: 20px;
  }
}

input:disabled {
  background-color: var(--bg-checkbox-disabled);

  & + label {
    color: var(--text-secondary);
  }
}
</style>
