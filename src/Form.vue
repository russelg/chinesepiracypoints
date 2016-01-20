<template>
  <div class="mui-panel" v-for="group in inputs" v-show="showOptional(group)">
    <legend>{{ group.name }}</legend>
    <div v-for="input in group.inputs" class="{{ classFor(input.type) }}" v-show="showOptional(input)">
      <label for="{{ input.name }}">
        <input v-if="input.type == 'checkbox'" type="checkbox" name="{{ input.name }}" v-model="values[input.name]" value="{{ input.default || '' }}" checked="{{ input.type == 'checkbox' && input.default }}">
      {{ input.title }}</label>
      <input v-if="['text', 'number'].includes(input.type)" type="{{ input.type }}" name="{{ input.name }}" v-model="values[input.name]" value="{{ input.default || '' }}">
      <!-- non-standard inputs -->
      <textarea v-if="input.type == 'textarea'" name="{{ input.name }}" v-model="values[input.name]"></textarea>
      <select v-if="input.type == 'select'" type="select" name="{{ input.name }}" v-model="values[input.name]">
        <option v-for="option in input.options" selected="{{ input.default == $index }}">{{ option }}</option>
      </select>
      <input v-if="input.type == 'date'" type="date" name="{{ input.name }}" v-rome="dt" v-model="values[input.name]">
    </div>
  </div>
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
    },
    classFor: function(type) {
      if (['text', 'number', 'date', 'textarea'].includes(type)) type = "textfield";
      return "mui-" + type;
    }
  }
}
</script>