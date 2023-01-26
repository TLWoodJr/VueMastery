<script setup>
const props = defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page'
  }
})

</script>

<template>
    <h1>Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <nav>
        <router-link :to="{ name: 'event-list' }">Back to the home page</router-link>
    </nav>

</template>