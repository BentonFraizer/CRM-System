<script setup lang="ts">
import { ref } from 'vue'
import { validateTaskTitle } from '@/helpers/helpers.ts'
import { updateTask, deleteTask } from '@/api/tasksApi.ts'
import type { Task } from '@/types/task.ts'
import Checkbox from '@/ui/Checkbox.vue'

defineProps<{
  task: Task
}>()
const emit = defineEmits<{
  taskUpdated: []
}>()

const isEdit = ref<boolean>(false)
const editableTaskTitle = ref<string>('')
const editableTaskErrorMessage = ref<string>('')

const handleUpdateTask = async (taskData: Task, isToggleCheckbox = false) => {
  // Выход из режима редактирования если в заголовок задачи не было внесено изменений
  if (editableTaskTitle.value === taskData.title && !isToggleCheckbox) {
    isEdit.value = false
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

      isEdit.value = false
      editableTaskTitle.value = ''
      emit('taskUpdated')
    } catch (error) {
      console.error(error)
      alert('Не удалось обновить задачу')
    }
  }
}

const handleDeleteTask = async (id: number) => {
  try {
    await deleteTask(id)
    emit('taskUpdated')
  } catch (error) {
    console.error(error)
    alert('Не удалось удалить задачу')
  }
}

const handleEdit = (taskData: Task) => {
  isEdit.value = true
  editableTaskTitle.value = taskData.title
}

const handleCancelEdit = () => {
  isEdit.value = false
  editableTaskTitle.value = ''
  editableTaskErrorMessage.value = ''
}
</script>

<template>
  <li class="task">
    <template v-if="isEdit">
      <form @submit.prevent="handleUpdateTask(task)">
        <div class="tasks-list__edit-left">
          <input type="text" v-model.trim="editableTaskTitle" />
          <span class="error-message">{{ editableTaskErrorMessage }}</span>
        </div>
        <div class="tasks-list__right">
          <button class="icon icon--check" type="submit" />
          <button class="icon icon--close" type="button" @click="handleCancelEdit" />
        </div>
      </form>
    </template>

    <template v-else>
      <div class="tasks-list__left">
        <Checkbox
          :id="task.id.toString()"
          :checked="task.isDone"
          :label="task.title"
          @change="handleUpdateTask(task, true)"
        />
      </div>
      <div class="tasks-list__right">
        <button class="icon icon--edit" type="button" @click="handleEdit(task)" />
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
  background-color: var(--bg-base);
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

.error-message {
  color: var(--danger);
  font-size: 14px;
  height: 16px;
}
</style>
