<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import type { Profile } from '@/types/auth.ts'
import type { TableProps } from 'ant-design-vue'
import { getAllUsers } from '@/api/userApi.ts'
import { formatIsoDate, hasUserRole } from '@/helpers/helpers.ts'
import { useUserStore } from '@/stores/user.ts'
import { USER_ROLES } from '@/helpers/consts.ts'
import { SearchOutlined } from '@ant-design/icons-vue'

const userStore = useUserStore()
const users = ref<Profile[]>()
const isUserAdminOrModerator = ref<boolean>(false)
const searchValue = ref<string>('')

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
    title: 'Дата регистрации',
    key: 'date',
    dataIndex: 'date',
  },
  {
    title: 'Статус блокировки',
    key: 'isBlocked',
    dataIndex: 'isBlocked',
  },
  {
    title: 'Роли',
    key: 'roles',
    dataIndex: 'roles',
  },
  {
    title: 'Телефон',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
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
  const response = await getAllUsers({
    page: pagination.value.current - 1,
    limit: pagination.value.pageSize,
    sortBy: sortingParams.value.sortBy,
    sortOrder: sortingParams.value.sortOrder,
    search: searchValue.value,
  })
  users.value = response.data
  pagination.value.total = response.meta.totalAmount

  console.log('1. response: ', response)
}

onMounted(async () => {
  await getUsers()
  const userRoles = userStore.getUserProfileData.roles
  isUserAdminOrModerator.value =
    hasUserRole(userRoles, USER_ROLES.ADMIN) || hasUserRole(userRoles, USER_ROLES.MODERATOR)
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
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'date'">
          {{ formatIsoDate(record.date) }}
        </template>
        <template v-if="column.key === 'isBlocked'">
          <a-tag :color="record.isBlocked ? 'error' : 'green'">
            {{ record.isBlocked ? 'Заблокирован' : 'Не заблокирован' }}
          </a-tag>
        </template>
        <template v-if="column.key === 'roles'">
          <span>
            <a-tag
              v-for="role in record.roles"
              :key="role"
              :color="role === 'ADMIN' ? 'green' : role === 'MODERATOR' ? 'blue' : 'volcano'"
            >
              {{ role }}
            </a-tag>
          </span>
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
</style>
