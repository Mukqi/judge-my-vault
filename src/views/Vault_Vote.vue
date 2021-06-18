<template>
  <div class="vault">
    <voteVault vault_name="Vault name here"/>
  </div>
</template>

<script>
// @ is an alias to /src
import voteVault from '@/components/comp_VoteVault.vue'

export default {
  name: 'Home',
  components: {
    voteVault
  }
}
</script>