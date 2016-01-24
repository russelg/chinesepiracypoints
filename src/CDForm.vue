<template>
  <div>
    <legend>Item {{ parseInt(idx) + 1 }} (CD)</legend>
    <div class="mui-textfield" @dragover.prevent @dragenter.prevent @drop="dropCue">
      <label for="tracks">Tracklisting (any format):</label>
      <textarea name="tracks" v-model="media.tracks">{{ media.tracks }}</textarea>
      <button type="button" class="mui-btn mui-btn--primary" @click="$els.cue.click()">Load CUE</button>
    </div>
    <div class="mui-textfield" @dragover.prevent @dragenter.prevent @drop="dropLog">
      <label for="log">Log:</label>
      <textarea name="log" v-model="media.log">{{ media.log }}</textarea>
      <button type="button" class="mui-btn mui-btn--primary" @click="$els.log.click()">Load Log</button>
    </div>
    <input type='file' v-el:cue @change="closeCue()" class="hide" />
    <input type='file' v-el:log @change="closeLog()" class="hide" />
  </div>
</template>
<style>
input[type='file'].hide {
  position: fixed;
  top: -100em;
}
</style>
<script>
function ReadFileAllBrowsers(FileElement, CallBackFunction) {
  try {
    var file = FileElement.files[0];
    var contents_ = "";

    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function(evt) {
        CallBackFunction(evt.target.result);
      }
      reader.onerror = function(evt) {
        alert("Error reading file");
      }
    }
  }
  catch (Exception) {
    var fall_back = ieReadFile(FileElement.value);
    if (fall_back != false) {
      CallBackFunction(fall_back);
    }
  }
}

///Reading files with Internet Explorer
function ieReadFile(filename) {
  try {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile(filename, 1);
    var contents = fh.ReadAll();
    fh.Close();
    return contents;
  }
  catch (Exception) {
    alert(Exception);
    return false;
  }
}

export default {
  props: ["idx", "media", "values"],
  data() {
    return {
      showCue: false,
      showLog: false
    }
  },
  methods: {
    closeCue: function(elm) {
      var load = (typeof elm === "undefined") ? this.$els.cue : elm;
      var _this = this;
      ReadFileAllBrowsers(load, function(content) {
        var cueSheet = require('cue-parser-plus').parseText(content);
        console.log(cueSheet);
        var trcks = cueSheet.files[0].tracks.map(function(itm) {
          return itm.number + ". " + itm.performer + " - " + itm.title;
        });
        _this.media.tracks = trcks.join("\n");
        _this.showCue = false;
        _this.$set('values.artist', cueSheet.performer);
        _this.$set('values.title', cueSheet.title);
        _this.$set('values.catalog', cueSheet.files[0].name.split(".")[0]);
        console.log(_this.values);
      });
    },
    closeLog: function(elm) {
      var load = (typeof elm === "undefined") ? this.$els.log : elm;
      var _this = this;
      ReadFileAllBrowsers(load, function(content) {
        _this.media.log = content;
        _this.showLog = false;
      });
    },
    dropCue: function(e) {
      e.preventDefault();
      this.closeCue(e.dataTransfer);
    },
    dropLog: function(e) {
      e.preventDefault();
      this.closeLog(e.dataTransfer);
    }
  }
}
</script>
