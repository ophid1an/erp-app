<script setup lang="ts">
import { ref } from 'vue'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import { requestPasswordReset } from '../api/erp'

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const onSubmit = async (event: Event) => {
  event.preventDefault()
  if (loading.value) return

  error.value = ''
  success.value = ''
  loading.value = true

  try {
    const response = await requestPasswordReset(email.value)
    success.value = response.message ?? 'Reset link sent if the email exists.'
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to request password reset.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-2">
    <div class="space-y-4">
      <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Password reset</p>
      <h1 class="text-3xl font-bold">Reset your password</h1>
      <p class="text-slate-600">
        Enter the email associated with your account and we’ll send a reset link. Links expire after 15 minutes.
      </p>
    </div>

    <Card class="p-6">
      <form class="space-y-4" @submit="onSubmit">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@company.com"
            required
            autocomplete="email"
          />
        </div>

        <Button type="submit" class="w-full" :disabled="loading">
          {{ loading ? 'Sending…' : 'Send reset link' }}
        </Button>
        <div v-if="error" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {{ error }}
        </div>
        <div v-if="success" class="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">
          {{ success }}
        </div>
        <p class="text-center text-sm text-slate-500">
          Remembered it? <RouterLink to="/login" class="text-teal-600 hover:text-teal-500">Back to login</RouterLink>
        </p>
      </form>
    </Card>
  </section>
</template>
