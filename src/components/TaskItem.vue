<script setup lang="ts">
import { ref } from 'vue'
import { validateTaskTitle } from '@/helpers/helpers'
import { updateTask, deleteTask } from '@/api/tasksApi'

const { tasksData } = defineProps(['tasksData'])
const emit = defineEmits(['updateTasks'])

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
      emit('updateTasks')
    } catch (error) {
      console.error(error)
      alert('Не удалось обновить задачу')
    }
  }
}

const handleDeleteTask = async (id) => {
  try {
    await deleteTask(id)
    emit('updateTasks')
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
    <template v-if="editableTaskId === task.id">
      <div class="tasks-list__edit-left">
        <input type="text" v-model.trim="editableTaskTitle" />
        <span class="error-message">{{ editableTaskErrorMessage }}</span>
      </div>
      <div class="tasks-list__right">
        <button class="icon icon--check" type="button" @click="handleUpdateTask(task)" />
        <button class="icon icon--close" type="button" @click="handleCancelEditButtonClick" />
      </div>
    </template>

    <template v-else>
      <div class="tasks-list__left">
        <input type="checkbox" :checked="task.isDone" @change="handleUpdateTask(task, true)" />
        <span :class="{ 'is-done': task.isDone }">{{ task.title }}</span>
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
  background-color: white;
  border-radius: 10px;
  padding: 10px;
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

  input {
    margin-right: 10px;
  }

  & .is-done {
    text-decoration: line-through;
    color: gray;
  }
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
  background-image: url('@/assets/img/icon-pencil.svg');
}

.icon--trash {
  width: 16px;
  background-image: url('@/assets/img/icon-trash.svg');
}

.icon--check {
  background-image: url('@/assets/img/icon-check.svg');
}

.icon--close {
  height: 24px;
  width: 24px;
  background-image: url('@/assets/img/icon-close.svg');
}

.error-message {
  color: red;
  font-size: 14px;
  height: 16px;
}
</style>
