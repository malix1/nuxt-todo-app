<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="info">
      <b-navbar-brand>
        <nuxt-link class="link" to="/">Home Page</nuxt-link>
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <nuxt-link class="link" to="/todos">Todos</nuxt-link>

        <!--         <b-nav-item class="link" v-on:click="logout" v-if="isLoggedIn">Logout</b-nav-item>
        <b-nav-item v-else>
          <nuxt-link class="link" to="/login">Login</nuxt-link>
        </b-nav-item>-->
      </b-navbar-nav>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.link {
  color: black;
  text-decoration-line: none;
  margin-right: 1rem;
}
</style>