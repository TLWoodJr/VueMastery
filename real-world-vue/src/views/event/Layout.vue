<script setup>
import { ref, onMounted } from 'vue'
import EventService from '../../services/EventService';
import { useRouter } from 'vue-router'
import { inject } from 'vue';

const router = useRouter()

const props = defineProps({
  id: {
    required: true,
  }
})

const GStore = inject('GStore')
</script>

<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
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
    <router-view :event="GStore.event" />
  </div>
</template>