<template>
  <div class="vault">
    <createVault vault_name="Vault name here"/>
  </div>
</template>

<script>
// @ is an alias to /src
import createVault from '@/components/comp_CreateVault.vue'

export default {
  name: 'Home',
  components: {
    createVault
  }
}
</script>