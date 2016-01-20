<template>
  <div>
    <legend>Item {{ parseInt(idx) + 1 }} (DVD)</legend>
    <div class="mui-textfield">
      <label for="tracks">Tracklisting (any format):</label>
      <textarea name="tracks" v-model="media.tracks"></textarea>
    </div>
    <div class="mui-textfield">
      <label for="url">File URL:</label>
      <input name="url" type="text" v-model="media.url">
    </div>
    <div class="mui-textfield">
      <label for="password">File Password:</label>
      <input name="password" type="text" v-model="media.password">
    </div>
    <div class="mui-textfield">
      <label for="size">Size (MB):</label>
      <input name="size" type="text" v-model="media.size">
    </div>
  </div>
</template>

<script>
  export default {
    props: ["idx", "media", "removeMedia"]
  }
</script>