<template>
  全局状态<br>
  user：{{user}}<br>
  jim：{{jim}}<br>
  aa：{{aa}}<br>
</template>

<script lang="ts">

  import { defineComponent, ref, toRaw } from 'vue'

  // import { store, useStore } from '/nf-state'
  import { store, useStore } from '../../../lib/main'

  import type { Person } from '../../types/typs'
 
  export default defineComponent({
    name: 'state-global',
    setup() {
      const aa = ref<string>('33')

      const { user } = store

      const jim2 = useStore('user')

      const jim = useStore<Person>('user')
      
      console.log('jim：', jim)
      console.log('jim keys：', Object.keys(jim))

      const obj = jim.$toRaw()
      console.log('$toRaw：', obj) 

      const myRaw = toRaw(jim)
      console.log('vue - toRaw：', myRaw)

      return {
        user,
        jim,
        jim2,
        aa
      }
    }
  })
</script>