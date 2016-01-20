<template>
  <fieldset v-for="group in inputs" v-show="showOptional(group)">
    <legend>{{ group.name }}</legend>
    <div class="pure-control-group" v-for="input in group.inputs" v-show="showOptional(input)">
      <label for="{{ input.name }}">{{ input.title }}</label>
      <input v-if="['text', 'checkbox', 'number'].includes(input.type)" type="{{ input.type }}" name="{{ input.name }}" v-model="values[input.name]" value="{{ input.default || '' }}" checked="{{ input.type == 'checkbox' && input.default }}">
      <!-- non-standard inputs -->
      <textarea v-if="input.type == 'textarea'" name="{{ input.name }}" v-model="values[input.name]"></textarea>
      <select v-if="input.type == 'select'" type="select" name="{{ input.name }}" v-model="values[input.name]">
        <option v-for="option in input.options" selected="{{ input.default == $index }}">{{ option }}</option>
      </select>
      <input v-if="input.type == 'date'" type="date" name="{{ input.name }}" v-rome="dt" v-model="values[input.name]">
    </div>
  </fieldset>
</template>

<script>
export default {
  props: ["inputs", "values", "dt"],
  methods: {
    showOptional: function(input) {
      if ("depends" in input) {
        if (typeof input.depends === "function") {
          return input.depends(this.values);
        }
        return this.values[input.depends];
      }
      return true;
    }
  }
}
</script>