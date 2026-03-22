<script setup lang="ts">
import { ref } from 'vue'
import { validateTaskTitle } from '@/helpers/helpers'
import { updateTask, deleteTask } from '@/api/tasksApi'

const { tasksData } = defineProps(['tasksData'])
const emit = defineEmits(['taskUpdated'])

const editableTaskId = ref(null)
const editableTaskTitle = ref('')
const editableTaskErrorMessage = ref('')

const handleUpdateTask = async (taskData, isToggleCheckbox = false) => {
  // Выход из режима редактирования если в заголовок задачи не было внесено изменений
  if (editableTaskTitle.value === taskData.title && !isToggleCheckbox) {
    editableTaskId.value = null
    editableTaskTitle.value = ''
    return
  }

  editableTaskErrorMessage.value = validateTaskTitle(editableTaskTitle.value)
  const isTitleValid = !editableTaskErrorMessage.value?.length

  if (isTitleValid || isToggleCheckbox) {
    try {
      const taskDataToSend = {
        id: taskData.id,
        isDone: isToggleCheckbox ? !taskData.isDone : taskData.isDone,
        title: editableTaskTitle.value,
      }

      await updateTask(taskDataToSend)

      editableTaskId.value = null
      editableTaskTitle.value = ''
      emit('taskUpdated')
    } catch (error) {
      console.error(error)
      alert('Не удалось обновить задачу')
    }
  }
}

const handleDeleteTask = async (id) => {
  try {
    await deleteTask(id)
    emit('taskUpdated')
  } catch (error) {
    console.error(error)
    alert('Не удалось удалить задачу')
  }
}

const handleEditButtonClick = (taskData) => {
  editableTaskId.value = taskData.id
  editableTaskTitle.value = taskData.title
}

const handleCancelEditButtonClick = () => {
  editableTaskId.value = null
  editableTaskTitle.value = ''
  editableTaskErrorMessage.value = ''
}
</script>

<template>
  <li v-for="task in tasksData" :key="task.id" class="task">
    <form @submit.prevent="handleUpdateTask(task)" v-if="editableTaskId === task.id">
      <div class="tasks-list__edit-left">
        <input type="text" v-model.trim="editableTaskTitle" />
        <span class="error-message">{{ editableTaskErrorMessage }}</span>
      </div>
      <div class="tasks-list__right">
        <button class="icon icon--check" type="submit" />
        <button class="icon icon--close" type="button" @click="handleCancelEditButtonClick" />
      </div>
    </form>

    <template v-else>
      <div class="tasks-list__left">
        <input
          type="checkbox"
          class="checkbox-input"
          :checked="task.isDone"
          @change="handleUpdateTask(task, true)"
          :id="task.id"
        />
        <label :for="task.id" :class="{ 'is-done': task.isDone }">
          {{ task.title }}
        </label>
      </div>
      <div class="tasks-list__right">
        <button class="icon icon--edit" type="button" @click="handleEditButtonClick(task)" />
        <button class="icon icon--trash" type="button" @click="handleDeleteTask(task.id)" />
      </div>
    </template>
  </li>
</template>

<style scoped>
.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 450px;
  height: 40px;
  background-color: var(--primary-bg-color);
  border-radius: 10px;
  padding: 10px;

  & form {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}

.tasks-list__edit-left {
  display: flex;
  flex-direction: column;

  & input {
    width: 270px;
  }
}

.tasks-list__right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.tasks-list__left {
  display: flex;
  align-items: center;

  input {
    margin-right: 10px;
  }

  & .is-done {
    text-decoration: line-through;
    color: var(--secondary-color);
  }
}

/* Кастомизация чекбокса */
.checkbox-input {
  appearance: none;
  position: relative;
  width: 22px;
  height: 22px;
  background: var(--primary-bg-color);
  border: 2px solid var(--secondary-bg-color);
  border-radius: 50%;
}

.checkbox-input::after {
  content: '';
  background: var(--primary-btn-bg-color);
  color: var(--primary-bg-color);
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

.checkbox-input:checked::after {
  width: 20px;
  height: 20px;
}

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
}

.icon--edit {
  background-color: var(--primary-btn-bg-color);
  mask: url('@/assets/icons/icon-pencil.svg') no-repeat center;
  mask-size: contain;
}

.icon--trash {
  width: 16px;
  background-color: var(--danger-btn-bg-color);
  mask: url('@/assets/icons/icon-trash.svg') no-repeat center;
  mask-size: contain;
}

.icon--check {
  background-color: var(--success-btn-bg-color);
  mask: url('@/assets/icons/icon-check.svg') no-repeat center;
  mask-size: contain;
}

.icon--close {
  height: 24px;
  width: 24px;
  background-color: var(--danger-btn-bg-color);
  mask: url('@/assets/icons/icon-close.svg') no-repeat center;
  mask-size: contain;
}

.error-message {
  color: var(--error-color);
  font-size: 14px;
  height: 16px;
}
</style>
