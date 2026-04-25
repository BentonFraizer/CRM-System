<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  isChecked: boolean
  label: string
  id: string
  isDisabled?: boolean
}>()

defineEmits<{
  change: []
}>()
</script>

<template>
  <input
    v-bind="$attrs"
    type="checkbox"
    :id="id"
    :checked="isChecked"
    :disabled="isDisabled"
    class="checkbox-input"
    @change="$emit('change')"
  />
  <label :for="id" :class="{ 'is-done': isChecked }">{{ label }}</label>
</template>

<style scoped>
input,
label {
  cursor: pointer;
}

input {
  margin-right: 10px;
}

.is-done {
  text-decoration: line-through;
  color: var(--text-disabled);
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
    color: var(--text-disabled);
  }
}
</style>
