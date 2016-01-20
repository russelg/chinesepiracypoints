<template>
  <div>
    <legend>Item {{ parseInt(idx) + 1 }} (BK)</legend>
    <div class="pure-control-group">
      <label for="dpi">DPI:</label>
      <input name="dpi" v-model="media.dpi" type="number">
    </div>
    <div class="pure-control-group">
      <label for="preview">Preview URL:</label>
      <input name="preview" v-model="media.preview" type="text">
    </div>
    <div class="pure-control-group">
      <label for="url">File URL:</label>
      <input name="url" v-model="media.url" type="text">
    </div>
    <div class="pure-control-group">
      <label for="password">File Password:</label>
      <input name="password" v-model="media.password" type="text">
    </div>
    <div class="pure-control-group">
      <label for="size">Size (MB):</label>
      <input name="size" v-model="media.size" type="text">
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