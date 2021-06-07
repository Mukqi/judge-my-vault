<template>
  <div class="vault">
    <comp_Vault vault_name="Vault name here"/>
  </div>
</template>

<script>
// @ is an alias to /src
import comp_Vault from '@/components/comp_CreateVault.vue'

export default {
  name: 'Home',
  components: {
    comp_Vault
  }
}
</script>