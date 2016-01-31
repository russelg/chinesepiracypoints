<template>
  <div class="mui-panel" v-for="group in inputs" v-if="showOptional(group)">
    <legend>{{ group.name }}</legend>
    <div v-for="input in group.inputs" v-bind:class="classFor(input.type)" v-if="showOptional(input)">
      <label>
        <input v-if="input.type == 'checkbox'" type="checkbox" v-bind:name="input.name" v-model="values[input.name]" v-bind:checked="input.default" /> {{ input.title }}
      </label>
      <input v-if="['text', 'number'].includes(input.type)" type="{{ input.type }}" v-bind:name="input.name" v-model="values[input.name]" v-bind:value="input.default">
      <!-- non-standard inputs -->
      <textarea v-if="input.type == 'textarea'" v-bind:name="input.name" v-model="values[input.name]"></textarea>
      <select v-if="input.type == 'select'" type="select" v-bind:name="input.name" v-model="values[input.name]">
        <option v-for="option in input.options" v-bind:selected="input.default == $index">{{ option }}</option>
      </select>
      <input v-if="input.type == 'date'" type="text" v-bind:name="input.name" v-rome="dt" v-model="values[input.name]" v-bind:value="input.default">
    </div>
  </div>
</template>
<script>
export default {
  props: ["inputs", "values", "dt"],
  methods: {
    showOptional: function(input) {
      console.log(JSON.parse(JSON.stringify(input)));
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
