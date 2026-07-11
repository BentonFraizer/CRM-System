<script setup lang="ts">
import { computed, onMounted, ref, h } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import type { Profile, Role } from '@/types/auth.ts'
import type { TableProps, SelectProps } from 'ant-design-vue'
import { blockUser, deleteUser, editUserRights, getAllUsers, unblockUser } from '@/api/adminApi.ts'
import { formatIsoDate, hasUserRole, openNotificationWithIcon } from '@/helpers/helpers.ts'
import { useUserStore } from '@/stores/user.ts'
import { SORTING_ORDER, USER_ROLES } from '@/helpers/consts.ts'
import {
  ArrowRightOutlined,
  SearchOutlined,
  PhoneOutlined,
  MailOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

const userStore = useUserStore()
const users = ref<Profile[]>()
const isUserAdminOrModerator = computed<boolean>(
  () =>
    hasUserRole(userStore.roles, USER_ROLES.ADMIN) ||
    hasUserRole(userStore.roles, USER_ROLES.MODERATOR),
)
const isUserAdmin = computed<boolean>(() => hasUserRole(userStore.roles, USER_ROLES.ADMIN))
const searchValue = ref<string>('')
const blockedUsersStatusFilter = ref<'all' | 'true' | 'false'>('all')
const isLoading = ref<boolean>(true)

const [modal, contextHolder] = Modal.useModal()
const isChangeUserRightsModalOpen = ref<boolean>(false)
const selectedUserId = ref<string>('')
const selectedUserRoles = ref<Role[]>([])

const PAGINATION_SETTINGS = {
  showSizeChanger: false,
  hideOnSinglePage: true,
}

const pagination = ref({
  total: 0,
  pageSize: 20,
  current: 1,
  size: 'medium',
  ...PAGINATION_SETTINGS,
})

const sortingParams = ref<{ sortBy: string; sortOrder: 'asc' | 'desc' }>({
  sortBy: '',
  sortOrder: 'asc',
})

const columns = [
  {
    title: 'Имя',
    dataIndex: 'username',
    sorter: true,
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
    key: 'email',
  },
  {
    title: 'Телефон',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Роли',
    key: 'roles',
    dataIndex: 'roles',
  },
  {
    title: 'Статус блокировки',
    key: 'isBlocked',
    dataIndex: 'isBlocked',
  },
  {
    title: 'Дата регистрации',
    key: 'date',
    dataIndex: 'date',
  },
  {
    title: '',
    key: 'action',
  },
]

const blockedUsersOptions = ref<SelectProps['options']>([
  {
    value: 'all',
    label: 'Все',
  },
  {
    value: 'true',
    label: 'Заблокированные',
  },
  {
    value: 'false',
    label: 'Разблокированные',
  },
])

const isUsersBlockedFilter = computed<boolean | null>(() => {
  if (blockedUsersStatusFilter.value === 'all') {
    return null
  }

  return blockedUsersStatusFilter.value === 'true'
})

const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any, // Пример взят из документации https://antdv.com/components/table#components-table-demo-ajax. Указанные параметры в нем не типизированы.
) => {
  pagination.value.current = pag.current
  pagination.value.pageSize = pag.pageSize
  sortingParams.value.sortBy = sorter.column?.key
  sortingParams.value.sortOrder = SORTING_ORDER[sorter.order?.toUpperCase()]

  getUsers()
}

const getUsers = async () => {
  isLoading.value = true
  try {
    const response = await getAllUsers({
      page: pagination.value.current - 1,
      limit: pagination.value.pageSize,
      sortBy: sortingParams.value.sortBy,
      sortOrder: sortingParams.value.sortOrder,
      search: searchValue.value,
      isBlocked: isUsersBlockedFilter.value,
    })
    users.value = response.data
    pagination.value.total = response.meta.totalAmount
  } finally {
    isLoading.value = false
  }
}

const handleToggleBlockedUserStatus = (id: string, isBlocked: boolean) => {
  const modalText = isBlocked ? 'Разблокировать' : 'Заблокировать'

  modal.confirm({
    title: modalText,
    icon: h(ExclamationCircleOutlined),
    cancelText: 'Отмена',
    okText: modalText,
    content: `Вы действительно хотите ${modalText.toLocaleLowerCase()} пользователя?`,
    async onOk() {
      try {
        const action = isBlocked ? unblockUser : blockUser

        await action(id)
        await getUsers()
      } catch (error) {
        openNotificationWithIcon(
          'error',
          `Не удалось ${modalText.toLocaleLowerCase()} пользователя`,
          error as string,
        )
      }
    },
    onCancel() {},
  })
}

const openChangeUserRightsModal = (id: string, roles: Role[]) => {
  selectedUserId.value = id
  selectedUserRoles.value = roles
  isChangeUserRightsModalOpen.value = true
}

const handleChangeUserRightsClickOkButton = async () => {
  try {
    await editUserRights({ id: selectedUserId.value, roles: selectedUserRoles.value })
    await getUsers()
    selectedUserId.value = ''
    selectedUserRoles.value = []
    isChangeUserRightsModalOpen.value = false
  } catch (error) {
    openNotificationWithIcon('error', 'Не удалось обновить роли', error as string)
  }
}

const handleDeleteUser = (id: string) => {
  modal.confirm({
    title: 'Удалить',
    icon: h(DeleteOutlined),
    cancelText: 'Отмена',
    okText: 'Удалить',
    content: `Вы действительно хотите удалить пользователя?`,
    async onOk() {
      try {
        await deleteUser(id)
        await getUsers()
        openNotificationWithIcon('success', 'Пользователь успешно удален')
      } catch (error) {
        openNotificationWithIcon('error', `Не удалось удалить пользователя`, error as string)
      }
    },
    onCancel() {},
  })
}

const handleBlockedUsersStatusFilterChange = () => {
  getUsers()
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <AppLayout>
    <contextHolder />
    <div class="header">
      <h3>Пользователи</h3>

      <div class="header-filters">
        <a-input
          class="search-input"
          v-if="isUserAdminOrModerator"
          v-model:value="searchValue"
          placeholder="Введите имя или email"
          @change="getUsers"
          size="large"
        >
          <template #prefix>
            <search-outlined class="search-icon" />
          </template>
        </a-input>

        <a-select
          v-if="isUserAdmin"
          class="blocking-filter"
          ref="select"
          v-model:value="blockedUsersStatusFilter"
          :options="blockedUsersOptions"
          @change="handleBlockedUsersStatusFilterChange"
          size="large"
        />
      </div>
    </div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="users"
      :pagination="isUserAdminOrModerator && pagination"
      :loading="isLoading"
      @change="handleTableChange"
      size="middle"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'email'">
          <div class="email-cell">
            <MailOutlined />
            <a-typography-link :href="`mailto:${record.email}`" target="_blank" underline>
              {{ record.email }}
            </a-typography-link>
          </div>
        </template>

        <template v-else-if="column.key === 'phoneNumber'">
          <template v-if="record.phoneNumber">
            <PhoneOutlined />
            {{ record.phoneNumber }}
          </template>
        </template>

        <template v-else-if="column.key === 'roles'">
          <span>
            <a-tag
              v-for="role in record.roles"
              :key="role"
              :color="
                role === USER_ROLES.ADMIN
                  ? 'green'
                  : role === USER_ROLES.MODERATOR
                    ? 'blue'
                    : 'volcano'
              "
            >
              {{ role }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'isBlocked'">
          {{ record.isBlocked ? '+' : '-' }}
        </template>
        <template v-else-if="column.key === 'date'">
          {{ formatIsoDate(record.date) }}
        </template>
        <template v-else-if="column.key === 'action' && isUserAdminOrModerator">
          <div class="action-buttons">
            <template v-if="record.isBlocked">
              <a-button
                v-show="isUserAdmin"
                @click="() => handleToggleBlockedUserStatus(record.id, record.isBlocked)"
              >
                Разблокировать
              </a-button>
            </template>
            <template v-else>
              <a-button
                danger
                @click="() => handleToggleBlockedUserStatus(record.id, record.isBlocked)"
              >
                Заблокировать
              </a-button>
            </template>

            <div class="tooltip-buttons">
              <a-tooltip title="Перейти к профилю" placement="topLeft">
                <a-button
                  :icon="h(ArrowRightOutlined)"
                  @click="$router.push(`/users/${record.id}`)"
                  class="goto-profile-btn"
                />
              </a-tooltip>

              <a-tooltip
                title="Изменить роли"
                placement="topLeft"
                v-if="isUserAdmin"
                @click="() => openChangeUserRightsModal(record.id, record.roles)"
              >
                <a-button :icon="h(MoreOutlined)" />
              </a-tooltip>

              <a-tooltip
                title="Удалить пользователя"
                placement="topLeft"
                v-if="isUserAdmin"
                @click="() => handleDeleteUser(record.id)"
              >
                <a-button :icon="h(DeleteOutlined)" />
              </a-tooltip>
            </div>
          </div>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="isChangeUserRightsModalOpen"
      title="Выберите роли"
      @ok="handleChangeUserRightsClickOkButton"
      cancel-text="Отмена"
      ok-text="Изменить"
    >
      <a-checkbox-group v-model:value="selectedUserRoles" style="width: 100%">
        <a-row>
          <a-col :span="8">
            <a-checkbox value="ADMIN">Админ</a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="MODERATOR">Модератор</a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="USER">Пользователь</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-modal>
  </AppLayout>
</template>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;

  & h3 {
    margin: 0;
  }
}

.header-filters {
  display: flex;
  gap: 10px;
}

.search-input {
  width: 360px;
}

.blocking-filter {
  width: 200px;
}

.search-icon {
  color: #ccc;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  max-width: 230px;
  gap: 10px;
}

.tooltip-buttons {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: end;
}

.goto-profile-btn :deep(.anticon) {
  font-size: 10px;
}

.email-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
