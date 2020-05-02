<template>
  <div class="page-title">
      <h1><b-icon class="mr-1" :icon="icon"></b-icon> {{ main }}</h1>
      <h2>{{ sub }}</h2>
      <hr>
  </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>
.page-title {
    width: 100%;
    text-align: left;
}
.page-title {
    margin-top: 15px;
}
.page-title h1 {
    font-size: 1.5em;
}
.page-title h2 {
    color: #777;
    font-size: 1em;
}
</style>