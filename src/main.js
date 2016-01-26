import Vue from 'vue'
import App from './App.vue'
import Form from './Form.vue'
import CDForm from './CDForm.vue'
import DVDForm from './DVDForm.vue'
import BKForm from './BKForm.vue'
import Modal from './Modal.vue'

Vue.config.debug = true;
Vue.component('temp-form', Form);
Vue.component('cd-form', CDForm);
Vue.component('dvd-form', DVDForm);
Vue.component('bk-form', BKForm);
Vue.component('modal', Modal);

window.rome = require('rome');

Vue.directive('rome', {
  bind: function() {
    var vm = this.vm;
    var key = this.expression;
    window.el = this.el;
    window.rome(this.el, {
      time: false,
      styles: {
        container: 'mui-panel'
      }
    }).on('data', function(val) {
      vm.$set(key, val);
    });
  },
  update: function(val) {
    window.rome(this.el).setValue(val);
  }
})

new Vue({
  el: 'body',
  components: {
    App
  }
})
