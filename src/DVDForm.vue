<template>
  <div>
    <legend>Item {{ parseInt(idx) + 1 }} (DVD)</legend>
    <div class="pure-control-group">
      <label for="tracks">Tracklisting (any format):</label>
      <textarea name="tracks" v-model="media.tracks"></textarea>
    </div>
    <div class="pure-control-group">
      <label for="url">File URL:</label>
      <input name="url" type="text" v-model="media.url">
    </div>
    <div class="pure-control-group">
      <label for="password">File Password:</label>
      <input name="password" type="text" v-model="media.password">
    </div>
    <div class="pure-control-group">
      <label for="size">Size (MB):</label>
      <input name="size" type="text" v-model="media.size">
    </div>
    <div style="text-align: center">
      <button type="button" class="button-error pure-button remove-button" @click="removeMedia(idx)">Remove</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["idx", "media", "removeMedia"]
  }
</script>