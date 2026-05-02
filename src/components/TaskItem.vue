<script setup lang="ts">
import { reactive, ref, type UnwrapRef } from 'vue'
import { openNotificationWithIcon } from '@/helpers/helpers.ts'
import { updateTask, deleteTask } from '@/api/tasksApi.ts'
import type { Task } from '@/types/task.ts'
import {
  CheckSquareTwoTone,
  CloseCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons-vue'
import { createEditTaskRules } from '@/helpers/consts.ts'
import type { FormInstance } from 'ant-design-vue'

defineProps<{
  task: Task
}>()
const emit = defineEmits<{
  taskUpdated: []
  taskInEditMode: []
  taskExitEditMode: []
}>()

interface FormState {
  title: string
}

const formRef = ref<FormInstance>()
const formState: UnwrapRef<FormState> = reactive({
  title: '',
})

const isEdit = ref<boolean>(false)

const handleUpdateTask = async (taskData: Task, isOnlyToggleCheckbox = false) => {
  // Выход из режима редактирования если в заголовок задачи не было внесено изменений
  if (formState.title === taskData.title && !isOnlyToggleCheckbox) {
    isEdit.value = false
    emit('taskExitEditMode')
    return
  }

  const taskDataToSend = {
    id: taskData.id,
    isDone: isOnlyToggleCheckbox ? !taskData.isDone : taskData.isDone,
    title: formState.title || taskData.title,
  }

  try {
    if (!isOnlyToggleCheckbox) {
      await formRef.value?.validate()
    }

    await updateTask(taskDataToSend)

    isEdit.value = false
    emit('taskUpdated')
    openNotificationWithIcon('success', 'Задача успешно обновлена')

    if (!isOnlyToggleCheckbox) {
      emit('taskExitEditMode')
      resetForm()
    }
  } catch (error) {
    console.log('error:', error)
    openNotificationWithIcon('error', 'Не удалось обновить задачу')
  }
}

const resetForm = () => {
  formRef.value && formRef.value.resetFields()
}

const handleDeleteTask = async (id: number) => {
  try {
    await deleteTask(id)
    emit('taskUpdated')
    openNotificationWithIcon('success', 'Задача успешно удалена')
  } catch (error) {
    console.error(error)
    openNotificationWithIcon('error', 'Не удалось удалить задачу')
  }
}

const handleEdit = (taskData: Task) => {
  isEdit.value = true
  formState.title = taskData.title
  emit('taskInEditMode')
}

const handleCancelEdit = () => {
  isEdit.value = false
  formState.title = ''
  emit('taskExitEditMode')
}
</script>

<template>
  <li class="task">
    <template v-if="isEdit">
      <a-form
        ref="formRef"
        :model="formState"
        layout="inline"
        :rules="createEditTaskRules"
        @finish="handleUpdateTask(task)"
      >
        <div class="tasks-list__edit-left">
          <a-form-item name="title">
            <a-input v-model:value="formState.title" />
          </a-form-item>
        </div>
        <div class="tasks-list__right">
          <a-button html-type="submit">
            <template #icon>
              <CheckSquareTwoTone two-tone-color="#52c41a" />
            </template>
          </a-button>
          <a-button @click="handleCancelEdit">
            <template #icon>
              <CloseCircleTwoTone two-tone-color="#ff4d4f" />
            </template>
          </a-button>
        </div>
      </a-form>
    </template>

    <template v-else>
      <div class="tasks-list__left">
        <a-checkbox
          :checked="task.isDone"
          @change="handleUpdateTask(task, true)"
          :class="{ checked: task.isDone }"
        >
          {{ task.title }}
        </a-checkbox>
      </div>
      <div class="tasks-list__right">
        <a-button @click="handleEdit(task)">
          <template #icon>
            <EditTwoTone two-tone-color="#1677ff" />
          </template>
        </a-button>
        <a-button @click="handleDeleteTask(task.id)">
          <template #icon>
            <DeleteTwoTone two-tone-color="#ff4d4f" />
          </template>
        </a-button>
      </div>
    </template>
  </li>
</template>

<style scoped>
.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  width: 70%;
  display: flex;
  flex-direction: column;
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

.checked {
  text-decoration: line-through;
}
</style>
