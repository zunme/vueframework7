// Import Vue
import { createApp } from 'vue';
//import 'lodash'
//import VuePouch from 'vue-pouch-db';

// Import Framework7
import Framework7 from './framework7-custom.js';

// Import Framework7-Vue Plugin
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

// Import Framework7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';

// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Init App
const app = createApp(App);

// Register Framework7 Vue components
registerComponents(app);

/*
const livebooths = vue.observable({ livebooths: {} })
Object.defineProperty(vue.prototype, '$livebooths', {
  get () {
    return livebooths.livebooths
  },
  
  set (value) {
    livebooths.livebooths = value
  }
})
*/
// Mount the app
//app.use(VuePouchDB);
app.mount('#app');