<script setup lang="ts">
import { ref } from 'vue'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import { login } from '../api/erp'

const email = ref('')
const password = ref('')
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
    const response = await login(email.value, password.value)
    success.value = response.message ?? 'Signed in successfully.'

    // TODO: persist session hash/expiresAt to storage when available in the ERP SPA
    if (response.hash) {
      console.debug('ERP session hash received', response.hash)
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to sign in.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-2">
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

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            autocomplete="current-password"
          />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-slate-700">
            <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-200" />
            Remember me
          </label>
          <RouterLink to="/reset" class="text-teal-600 hover:text-teal-500">Forgot password?</RouterLink>
        </div>

        <Button type="submit" class="w-full" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </Button>
        <div v-if="error" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {{ error }}
        </div>
        <div v-if="success" class="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">
          {{ success }}
        </div>
        <p class="text-center text-sm text-slate-500">
          Need an account? <a class="text-teal-600 hover:text-teal-500" href="#">Request access</a>
        </p>
      </form>
    </Card>
  </section>
</template>
