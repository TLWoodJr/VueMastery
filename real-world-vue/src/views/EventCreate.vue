<script>
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
  }
}

</script>

<template>
    Create Event, {{ $store.state.user }}
</template>