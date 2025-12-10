<script setup lang="ts">
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import Input from '../components/ui/Input.vue'
import Label from '../components/ui/Label.vue'
import Badge from '../components/ui/Badge.vue'

const onSubmit = (event: Event) => {
  event.preventDefault()
  // Hook up to real auth action
}
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-2">
    <div class="space-y-4">
      <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Authentication</p>
      <h1 class="text-3xl font-bold">Welcome back</h1>
      <p class="text-slate-600">
        Sign in to the ERP portal using your work email. Password reset is available from the reset page.
      </p>
      <div class="flex flex-wrap gap-2">
        <Badge>Secure</Badge>
        <Badge>SSO ready</Badge>
        <Badge>Role aware</Badge>
      </div>
    </div>

    <Card class="p-6">
      <form class="space-y-4" @submit="onSubmit">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" required />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" required />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-slate-700">
            <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-200" />
            Remember me
          </label>
          <RouterLink to="/reset" class="text-indigo-600 hover:text-indigo-500">Forgot password?</RouterLink>
        </div>

        <Button type="submit" class="w-full">Sign in</Button>
        <p class="text-center text-sm text-slate-500">
          Need an account? <a class="text-indigo-600 hover:text-indigo-500" href="#">Request access</a>
        </p>
      </form>
    </Card>
  </section>
</template>
