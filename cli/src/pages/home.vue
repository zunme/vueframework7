<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar :sliding="true">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Way2Expo</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
	  
    <!-- Toolbar-->
<!--f7-toolbar tabbar bottom>
	<f7-link tab-link="#expo-home-tab-1" v-bind:tab-link-active="false" >전체</f7-link>
	<f7-link tab-link="#expo-home-tab-2" v-bind:tab-link-active="true">진행</f7-link>
	<f7-link tab-link="#expo-home-tab-3">예정</f7-link>
	<f7-link tab-link="#expo-home-tab-4">종료</f7-link>
</f7-toolbar-->

	  
	  
    <!-- Page content-->

	  
	  
	  
	  
	  
    <f7-block strong>
      <p></p>
    </f7-block>
    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
	 <f7-list-item link="/expo" title="Expo Home"></f7-list-item>
		<f7-list-item link="/expo/progress/pre" title="Expo Home prev"></f7-list-item>
		<f7-list-item link="/expo/megashow2020" title="Expo megashow2020"></f7-list-item>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>

    <f7-block-title>Modals</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised popup-open="#my-popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised login-screen-open="#my-login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Panels</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised panel-open="left">Left Panel</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised panel-open="right">Right Panel</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-list>
      <f7-list-item
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      ></f7-list-item>
      <f7-list-item
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      ></f7-list-item>
      <f7-list-item
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      ></f7-list-item>
    </f7-list>
	  
	  
  </f7-page>
</template>
<script>
	import { reactive,onMounted, inject } from 'vue';
	import axios from 'axios';
	import { f7 } from 'framework7-vue';
	import { useStore } from '../js/state';
	
	import ExpoTableList from '../components/ExpoTableList.vue'
	
    export default {
		name : 'main',
		props: {
			title: String,
			f7route: Object,
      		f7router: Object,
		},
		components : ['ExpoTableList'],
      setup(props) {
		const state = reactive({
			  imghost : "https://murflim.run.goorm.io/storage/",
			  globalStore : inject('liveon', {}),
			  data :{},

        })
		  
		const login = () => {
          // login method
        }
        onMounted( () => {
			console.log ( "=================")
			console.log ( state.globalStore );
			console.log ( "=================")
        })
		return { 

          state,
        }
      }
    }
</script>