<script setup>
const props = defineProps({
  event: {
    required: true,
  }
})
</script>

<template>
  <div v-if="event">
    <p>{{ props.event.time }} on {{ props.event.date }} @ {{ props.event.location }}</p>
    <p>{{ props.event.description }}</p>
  </div>
</template>