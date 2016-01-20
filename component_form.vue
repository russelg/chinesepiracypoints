<template>
  <div id="app">
    <form id="main" method="#" class="pure-form pure-form-aligned">
      <div class="pure-g">
        <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2" v-for="group in inputs">
          <fieldset class="{{ makeSafeForCSS(group.name.toLowerCase()) }}" v-show="showOptional(group)">
            <legend>{{ group.name }}</legend>
            <div class="pure-control-group" v-for="input in group.inputs" v-show="showOptional(input)">
              <label for="{{ input.name }}">{{ input.title }}</label>
              <input v-if="input.type == 'text' || input.type == 'checkbox'" type="{{ input.type }}" name="{{ input.name }}" v-model="values[input.name]">
              <textarea v-if="input.type == 'textarea'" type="{{ input.type }}" name="{{ input.name }}" v-model="values[input.name]"></textarea>
              <select v-if="input.type == 'select'" type="{{ input.type }}" name="{{ input.name }}" v-model="values[input.name]">
                <option v-for="option in input.options">{{ option }}</option>
              </select>
            </div>
          </fieldset>
        </div>
      </div>
      <button v-on:click="this.$log()" type="button">Log</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputs: [
        {
          name: "General",
          inputs: [
            {
              name: 'selfrip',
              type: 'checkbox',
              title: 'Selfrip?'
            },
            {
              name: 'web',
              type: 'checkbox',
              title: 'WEB?'
            },
            {
              name: 'artist',
              type: 'text',
              title: 'Artist:'
            },
            {
              name: 'title',
              type: 'text',
              title: 'Title:'
            },
            {
              name: 'date',
              type: 'date',
              title: 'Release Date:'
            },
            {
              name: 'cover',
              type: 'text',
              title: 'Cover URL:'
            },
            {
              name: 'homepage',
              type: 'text',
              title: 'Homepage URL:'
            },
            {
              name: 'label',
              type: 'text',
              title: 'Label:'
            },
            {
              name: 'catalog',
              type: 'text',
              title: 'Catalog Number:'
            },
            {
              name: 'desc',
              type: 'textarea',
              title: 'Description:'
            },
            {
              name: 'main_filetype',
              type: 'select',
              title: 'Audio Format:',
              options: [
                'WAV',
                'FLAC',
                'TAK',
                'MP3'
              ]
            },
            {
              name: 'cuefiles',
              type: 'checkbox',
              title: 'CUE(s) Included?'
            },
            {
              name: 'event',
              type: 'checkbox',
              title: 'Event?'
            },
            {
              name: 'event_name',
              type: 'text',
              title: 'Event Name:',
              depends: 'event'
            }
          ]
        },
        {
          name: 'Proof',
          depends: function(values) {
            return !values.selfrip || values.web;
          },
          inputs: [
            {
              name: 'proof_url',
              type: 'text',
              title: 'Proof URL:'
            }
          ]
        }
      ],
      values: {}
    }
  },
  methods: {
    showOptional: function(input) {
      if ("depends" in input) {
        console.log(typeof input.depends);
        if (typeof input.depends === "function") {
          return input.depends(this.values);
        }
        return this.values[input.depends];
      }
      return true;
    },
    makeSafeForCSS: function(name) {
      return name.replace(/[^a-z0-9]/g, function(s) {
          var c = s.charCodeAt(0);
          if (c == 32) return '-';
          if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
          return '__' + ('000' + c.toString(16)).slice(-4);
      });
    }
  }
}
</script>