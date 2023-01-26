<script setup>
import { ref, onMounted } from 'vue'
import EventService from '../../services/EventService';

const props = defineProps({
  id: {
    required: true,
  }
})
const event = ref(null)

onMounted(() => {
  // fetch event (by id) and set local event data
    EventService.getEvent(props.id)
    .then((response)=>{
        event.value = response.data
    })
    .catch((err)=>{
        console.error(err)
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-details' }"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'event-register' }"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'event-edit' }"
        >Edit</router-link
      >
    </nav>
    <router-view :event="event" />
  </div>
</template>