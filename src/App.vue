<template>
  <router-link to="/">Home</router-link>
<!--  <router-link to="/about/:id">About</router-link>-->
  <RouterView></RouterView>
</template>




<style>
a {
  margin-right: 10px;
}

a.active {
  font-weight: bold;
}
</style>