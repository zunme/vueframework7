<template>
  <f7-app v-bind="f7params" >

  <!-- Left panel with cover effect-->
  <f7-panel left cover theme-dark>

      <f7-page>
        <f7-navbar title="Left Panel"></f7-navbar>
        <f7-block>Left panel content goes here</f7-block>
		  
	<f7-list>
		 <f7-list-item link="/expo" title="Expo Home" panel-close></f7-list-item>
		<f7-list-item link="/expo/progress/pre" title="Expo Home prev" panel-close></f7-list-item>
		<f7-list-item link="/expo/megashow2020" title="Expo megashow2020" panel-close></f7-list-item>
      <f7-list-item link="/about/" title="About" panel-close></f7-list-item>
      <f7-list-item link="/form/" title="Form" panel-close></f7-list-item>
		
      <f7-list-item
        title="Home"
        link="/"
		panel-close
      ></f7-list-item>		
      <f7-list-item
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
		panel-close
      ></f7-list-item>
      <f7-list-item
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
		panel-close
      ></f7-list-item>
      <f7-list-item
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
		panel-close
      ></f7-list-item>
    </f7-list>
	  
		  
		  
      </f7-page>

  </f7-panel>


  <!-- Right panel with reveal effect-->
  <f7-panel right reveal theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Right Panel"></f7-navbar>
        <f7-block>Right panel content goes here {{boothlive.counter}}
		</f7-block>
		 <div v-if="isLogined">
			LOGINUSER
		 </div>
		 <div v-else>
			Loginneed
		 </div>
		  
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/" 
		   :browserHistory="true"
		   :browserHistoryInitialMatch="true"
		   :browserHistorySeparator="''"
		   :push-state="true"
		   :push-status-separator="''"
		   ></f7-view>


    <!-- Popup -->
    <f7-popup id="my-popup" @popup:opened="fnPopOpened" @popup:closed="fnPopClosed">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-login-screen id="my-login-screen" @loginscreen:opened="fnLoginScreenOpened" @loginscreen:closed="fnLoginScreenClosed">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
			
          <f7-list form>
            <f7-list-input
              type="text"
              name="email"
              placeholder="Your Email ID"
              v-model:value="email"
            ></f7-list-input>
            <f7-list-input
              type="password"
              name="password"
              placeholder="Your password"
              v-model:value="password"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" @click="signIn"></f7-list-button>
            <f7-block-footer>
              Some text about login information.<br>Click "Sign In" to close Login Screen
            </f7-block-footer>
          </f7-list>
			
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>

  import { ref, onMounted, reactive, provide, inject  } from 'vue';
  import { f7, f7ready } from 'framework7-vue';
	import axios from 'axios';

  import routes from '../js/routes.js';
  import store from '../js/store';
	
  //import {provideStore, useStore } from '../js/state';
	
  export default {
	data() {
        return {
            useremail: "z@z",
			isLogined : false,
        };
    },
    methods: {

    },	  
    setup() {
	  let history_state={};
	  let historyback = true;
	  const liveon = reactive ({
		  imghost : "https://murflim.run.goorm.io/storage/",
		 liveon : {},
		 delLive : {},
		 newLve : {},
		 isLogin : false,
		 username:"",
		 counter : 0,
	  });
	  provide('liveon', liveon );
		
	  //const errors = observable({ errors: {} })
	  
      // Framework7 Parameters
      const f7params = {
        name: 'Murf', // App name
        theme: 'md', // Automatic theme detection
		  
		view: {
			pushState: true,
			history: true,
			pushStateOnLoad: true,
			pushStateSeparator: '',
		},
		touch: {
			tapHold: true,
			tapHoldDelay: 750,
			disableContextMenu: true,
			tapHoldPreventClicks: false,
		},
        // App store
        store: store,
        // App routes
        routes: routes,
		  
      };
      // Login screen data
      const email = ref('');
      const password = ref('');
	  const search=(e)=>{
			console.log ( e )
	  }
      const alertLoginData = () => {

        f7.dialog.alert('Username: ' + email.value + '<br>Password: ' + password.value, () => {		  
          f7.loginScreen.close();		  
        });
      }
	    const signIn = ()=> {
			axios.get('https://murflim.run.goorm.io/sanctum/csrf-cookie').then(response => {
				axios.post('https://murflim.run.goorm.io/login', {email : email.value, password : password.value}).then(response => {
					console.log('User signed in!');
				}).catch(error => console.log(error));
			}).catch(error => {
				console.log ( "sactum error")
				console.log(error)
			});;
			/*
			axios.post('https://murflim.run.goorm.io/login',{email : email.value, password : password.value})
			.then(response => {
				liveon.isLogin = true;
				liveon.username = email.value;
				f7.loginScreen.close();	
			})
			.catch(response => console.log(response.data));
			
            // app.input.validateInputs("form")
			*/
        }
	  
	  window.onpopstate = function (event) {
		var temp_state = history_state;
		if (event.state) { history_state = event.state; }
		else {
			history_state = { 'pop' : '' , 'target' : ''}
		}
		  
		if ( typeof temp_state == 'undefined' || typeof temp_state.target == 'undefined') return;
		  
		if( temp_state.target == 'mainpop') {
			console.log ( "popclose with back")
			historyback = false;
			f7.popup.close()
		}else if ( temp_state.target == 'loginscreen') {
			console.log ( "loginscreen close with back")
			historyback = false;
			f7.loginScreen.close()
		}
		
	  }
	  const fnPopOpened = () => {
		    history_state = { 'pop' : 'popup' , 'target' : 'mainpop'};
            history.pushState( history_state , 'POPUP', '#popup');
		    console.log ( "history add")
      }	  
	  const fnPopClosed = () =>{
		  f7.dialog.close()
		  if ( historyback ) history.back();
		  else historyback = true;
	  }
	  const fnLoginScreenOpened = () => {
		    history_state = { 'pop' : 'popup' , 'target' : 'loginscreen'};
            history.pushState( history_state , 'POPUP', '#login');
		    console.log ( "history add")
      }
	  const fnLoginScreenClosed = () =>{
		  f7.dialog.close()
		  if ( historyback ) history.back();
		  else historyback = true;
	  }
	  const boothlive = reactive({ counter: 0 });
      onMounted(() => {
        f7ready(() => {


          // Call F7 APIs here
        });
      });
	  
      return {
        f7params,
        email,
        password,
		liveon,
		  
        alertLoginData,
		signIn, 
		  
		history_state,
		historyback,
		fnPopOpened,
		fnPopClosed,
		fnLoginScreenOpened,
		fnLoginScreenClosed,
		boothlive,
		search,
      }
    }
  }
</script>