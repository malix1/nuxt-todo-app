<template>
  <div>
    This is error page
    <p>{{error.statusCode}} Not Found</p>
    <p>{{error.message}} Not Found</p>
  </div>
</template>

<script>
export default {
  layout: "error-layout",
  props: {
    error: {
      type: Object,
      default: null
    }
  }
};
</script>

<style scoped>
</style>