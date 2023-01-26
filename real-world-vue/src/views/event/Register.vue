<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  event: {
    required: true,
  }
})

function register(){
    
    router.push({
        name: 'event-details'
    })
}
</script>

<template>
  <div v-if="event">
    <p>Register for the event here</p>
    <button @click="register">Register Me</button>
  </div>
</template>