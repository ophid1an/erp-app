<script setup lang="ts">
import { ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import { changePassword } from '../api/erp'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const onSubmit = async (event: Event) => {
  event.preventDefault()
  if (loading.value) return

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'New password and confirmation must match.'
    success.value = ''
    return
  }

  error.value = ''
  success.value = ''
  loading.value = true

  try {
    const response = await changePassword(currentPassword.value, newPassword.value)
    success.value = response.message ?? 'Password updated successfully.'
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to update password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Security</p>
        <h1 class="text-3xl font-bold text-slate-900">Change password</h1>
        <p class="text-slate-600">Update your account password.</p>
      </div>
    </div>

    <Card class="p-6">
      <form class="space-y-4" @submit="onSubmit">
        <div class="space-y-2">
          <Label for="current">Current password</Label>
          <Input
            id="current"
            v-model="currentPassword"
            type="password"
            placeholder="••••••••"
            required
            autocomplete="current-password"
          />
        </div>
        <div class="space-y-2">
          <Label for="new">New password</Label>
          <Input
            id="new"
            v-model="newPassword"
            type="password"
            placeholder="••••••••"
            required
            autocomplete="new-password"
          />
        </div>
        <div class="space-y-2">
          <Label for="confirm">Confirm password</Label>
          <Input
            id="confirm"
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            autocomplete="new-password"
          />
        </div>
        <Button type="submit" class="w-full" :disabled="loading">
          {{ loading ? 'Updating…' : 'Update password' }}
        </Button>
        <div v-if="error" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {{ error }}
        </div>
        <div v-if="success" class="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">
          {{ success }}
        </div>
      </form>
    </Card>
  </section>
</template>
