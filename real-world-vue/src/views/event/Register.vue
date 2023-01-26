<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const GStore = inject('GStore');
const props = defineProps({
  event: {
    required: true,
  }
})

function register(){
    
    GStore.flashMessage = 'You are successfully registered for ' + props.event.title

    setTimeout(()=>{
        GStore.flashMessage = ''
    }, 3000)

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