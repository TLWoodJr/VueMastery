<script setup>
import { onBeforeRouteLeave } from 'vue-router';

const props = defineProps({
  event: {
    required: true,
  }
})

const unsavedChanges = true

onBeforeRouteLeave((routeTo, routeFrom, next)=>{
    if(unsavedChanges){
        const answer = window.confirm(
            'Do you really want to leave? You have unsaved changes!'
        )
        if(!answer) {
            next()
        }else{
            next(false)
        }
    } else {
        next()
    }
})
</script>

<template>
  <div v-if="event">
    <p>Edit the event here</p>
  </div>
</template>