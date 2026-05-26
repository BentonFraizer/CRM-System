<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import type { Profile } from '@/types/auth.ts'
import type { TableProps } from 'ant-design-vue'
import { getAllUsers } from '@/api/adminApi.ts'
import { formatIsoDate, hasUserRole } from '@/helpers/helpers.ts'
import { useUserStore } from '@/stores/user.ts'
import { USER_ROLES } from '@/helpers/consts.ts'
import {
  ArrowRightOutlined,
  SearchOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons-vue'

const userStore = useUserStore()
const users = ref<Profile[]>()
const isUserAdminOrModerator = ref<boolean>(false)
const isUserAdmin = ref<boolean>(false)
const searchValue = ref<string>('')
const isLoading = ref<boolean>(true)

const PAGINATION_SETTINGS = {
  showSizeChanger: false,
  hideOnSinglePage: true,
}

const pagination = ref({
  total: 0,
  pageSize: 20,
  current: 1,
  ...PAGINATION_SETTINGS,
})

const sortingParams = ref({
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
  // TODO: по завершении задачи подумать стоит ли вообще отображать столбец,
  // для польз-ля не являющегося админом или же модератором.
  // То есть если ни одной кнопки не будет, то и столбец не нужен
  {
    title: '',
    key: 'action',
  },
]

const handleTableChange: TableProps['onChange'] = async (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
) => {
  console.log('pagination: ', pag)
  console.log('filters: ', filters)
  console.log('sorter ', sorter)
  pagination.value.current = pag.current
  pagination.value.pageSize = pag.pageSize
  await getUsers()

  // results: pag.pageSize,
  // pagination.value.limit: pag?.current,
  // sortField: sorter.field,
  // sortOrder: sorter.order,
  // ...filters,
}

const getUsers = async () => {
  isLoading.value = true
  const response = await getAllUsers({
    page: pagination.value.current - 1,
    limit: pagination.value.pageSize,
    sortBy: sortingParams.value.sortBy,
    sortOrder: sortingParams.value.sortOrder,
    search: searchValue.value,
  }).finally(() => (isLoading.value = false))
  users.value = response.data
  pagination.value.total = response.meta.totalAmount

  console.log('1. response: ', response)
}

onMounted(async () => {
  await getUsers()
  const userRoles = userStore.getUserProfileData.roles
  isUserAdminOrModerator.value =
    hasUserRole(userRoles, USER_ROLES.ADMIN) || hasUserRole(userRoles, USER_ROLES.MODERATOR)
  isUserAdmin.value = hasUserRole(userRoles, USER_ROLES.MODERATOR)
})
</script>

<template>
  <AppLayout>
    <div class="header">
      <h3>Пользователи</h3>
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
              <a-button v-show="isUserAdmin">Разблокировать</a-button>
            </template>
            <template v-else>
              <a-button danger>Заблокировать</a-button>
            </template>

            <a-tooltip title="Перейти к профилю" placement="topLeft">
              <a-button
                :icon="h(ArrowRightOutlined)"
                @click="$router.push(`/users/${record.id}`)"
                class="goto-profile-btn"
              />
            </a-tooltip>
          </div>
        </template>
      </template>
    </a-table>
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

.search-input {
  max-width: 360px;
}

.search-icon {
  color: #ccc;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  max-width: 200px;
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
