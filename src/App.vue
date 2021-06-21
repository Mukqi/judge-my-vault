<template>
  <div id="app">
    <div v-if="authState !== 'signedin'">You are signed out.</div>
      <amplify-authenticator username-alias="username">
      <amplify-sign-up
        slot="sign-up"
        username-alias="username"
        :form-fields.prop="formFields"
      ></amplify-sign-up>
      <amplify-sign-in slot="sign-in" username-alias="username"></amplify-sign-in>
      <div v-if="user">
        <div>Hello, {{user.username}}</div>


        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/vault">Vault</router-link> | 
          <router-link to="/vault/1234">Vote</router-link> |
          <router-view/>
        </div>


      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
</template>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'app',
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
      this.$store.commit('setUser', authData)
    })
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      formFields: [
        {
          type: 'username',
          label: 'Username',
          placeholder: 'Username',
          inputProps: { required: true, autocomplete: 'username' }
        },
        {
          type: 'email',
          label: 'Email',
          placeholder: 'you@provider.com',
          inputProps: { required: true, autocomplete: 'email' },
        },
        {
          type: 'password',
          label: 'Password',
          placeholder: 'Password',
          inputProps: { required: true, autocomplete: 'Aa1!Bb2@' },
        }
      ]
    }
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
