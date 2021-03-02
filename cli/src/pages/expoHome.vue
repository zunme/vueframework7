<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar :sliding="true">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>{{state.expo_name}}</f7-nav-title>
      <f7-nav-right>
		<f7-link class="searchbar-enable" data-searchbar=".searchbar-demo" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search" ></f7-link>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
   <f7-searchbar
      class="searchbar-demo"
      expandable
      :disable-button="true"
	  :custom-search="true"
	  @change="search"
	  v-model:value="state.searchQuery"
    ></f7-searchbar>
		
    </f7-navbar>
	  
    <!-- Toolbar-->
<!--f7-toolbar tabbar bottom>
	<f7-link tab-link="#expo-home-tab-1" v-bind:tab-link-active="false" >전체</f7-link>
	<f7-link tab-link="#expo-home-tab-2" v-bind:tab-link-active="true">진행</f7-link>
	<f7-link tab-link="#expo-home-tab-3">예정</f7-link>
	<f7-link tab-link="#expo-home-tab-4">종료</f7-link>
</f7-toolbar-->

	  
	  
    <!-- Page content-->
	<div class="expo_home_banner_header" v-if="typeof state.data.mobile_banner_header != 'undefined' ">
		<f7-swiper autoplay pagination  scrollbar :loop="true" :speed="500" :slidesPerView="1.1" :spaceBetween="5" :centeredSlides="true">
			<f7-swiper-slide v-for="item in state.data.mobile_banner_header">
				<img :src="state.imghost + item.image_url" style="width:100%">
			</f7-swiper-slide>
		</f7-swiper>	  
	</div>
	  
	  
	<f7-segmented strong tag="p" class="expo-home-segment">
		<f7-button v-bind:active="state.tabactive.all" v-on:click="changehepohometab('all')">
		  전체
		</f7-button>
		<f7-button v-bind:active="state.tabactive.ing" v-on:click="changehepohometab('ing')">
		  진행
		</f7-button>
		<f7-button v-bind:active="state.tabactive.pre" v-on:click="changehepohometab('pre')">
		  예정
		</f7-button>
		<f7-button v-bind:active="state.tabactive.end" v-on:click="changehepohometab('end')">
			종료
		</f7-button>
	</f7-segmented>
	  
	<f7-tabs class="expo-home-tabs">
		<f7-tab id="expo-home-tab-1" class="page-content" v-bind:tab-active="state.tabactive.all" >
			<ExpoTableList :apps="state.data.expo" viewtype="all" col="col-50"/>
		</f7-tab>
		<f7-tab id="expo-home-tab-2" class="page-content" v-bind:tab-active="state.tabactive.ing">
			<ExpoTableList :apps="state.expo_prc_ing" viewtype="ing" />
		</f7-tab>
		<f7-tab id="expo-home-tab-3" class="page-content" v-bind:tab-active="state.tabactive.pre">
			<ExpoTableList :apps="state.expo_prc_pre" viewtype="pre" />
		</f7-tab>
		<f7-tab id="expo-home-tab-4" class="page-content" v-bind:tab-active="state.tabactive.end">
			<ExpoTableList :apps="state.expo_prc_end" viewtype="end" />
		</f7-tab>
	</f7-tabs>	  
	  
	<div class="expo_home_banner_footer" v-if="typeof state.data.mobile_banner_footer != 'undefined' ">
		<f7-swiper autoplay pagination  scrollbar :loop="true" :speed="300" :slidesPerView="1.1" :spaceBetween="5" :centeredSlides="true">
			<f7-swiper-slide v-for="item in state.data.mobile_banner_footer">
				<img :src="state.imghost + item.image_url" style="width:100%">
			</f7-swiper-slide>
		</f7-swiper>	  
	</div>
	  
  </f7-page>
</template>
<script>
	import { reactive,onBeforeMount, inject } from 'vue';
	import axios from 'axios';
	import { f7 } from 'framework7-vue';
	import { useStore } from '../js/state';
	
	import ExpoTableList from '../components/ExpoTableList.vue'
	
    export default {
		name : 'expo-home',
		props: {
			title: String,
			f7route: Object,
      		f7router: Object,
			starttabactive : { type: String, default:''}
		},
		components : ['ExpoTableList'],
		methods: {
			/*
			search(e) {
				const self = this;
				
				const router = self.$f7router;
				if ( e.cancelable ) console.log ( "cancel")
				console.log ( "change")
				this.$f7.mainView.router.load({url: "/about"})
				this.$f7.views.main.router.navigate('/about')
				
			}
			*/
			
		},			
      setup(props) {
		var self = this;
		const state = reactive({
			  imghost : "https://murflim.run.goorm.io/storage/",
			  expo_name : "",
			  searchQuery : "",
			  globalStore : inject('liveon', {}),
			  data :{},
			  tabactive:{
				  'all' : ( props.starttabactive =='' ||props.starttabactive =='all') ? true :false,
				  'ing' : ( props.starttabactive =='ing') ? true :false,
				  'pre' : ( props.starttabactive =='pre') ? true :false,
				  'end' : ( props.starttabactive =='end') ? true :false,
			  },
				expo_prc_all : [],
				expo_prc_ing : [],
				expo_prc_pre : [],
				expo_prc_end : [],
        })
		  
        const getHomeData = async () =>{
			state.expo_name = "EXPO"
			const homedata = await axios({
				method: 'get',
				url: 'https://murflim.run.goorm.io/expo',
				params : {
				}
			}).then(function (response) {
				state.data = response.data.data;
				state.expo_prc_all = response.data.data.expo;
				console.log ( response.data.data.expo)
				response.data.data.expo.forEach( (item, index )=>{
					console.log ( item.progress_status )
					if( item.progress_status == 'ing') {
						state.expo_prc_ing.push( item);
						console.log ( state.expo_prc_ing )
					}
					else if( item.progress_status == 'pre') state.expo_prc_pre.push( item);
					else if( item.progress_status == 'end') state.expo_prc_end.push( item);
				});
				state.expo_name = "HOME"
				if(props.starttabactive=='') changehepohometab(response.data.data.active);
			}).catch((ex) => {
                console.warn("ERROR!!!!! : ",ex)
            })		
		}
		const changehepohometab = (prc) =>{
			if( typeof prc =='undefined' || prc == '') prc = 'all'
			for (const [key, value] of Object.entries(state.tabactive)) {
				if ( key == prc ) state.tabactive[key] = true;
				else state.tabactive[key] = false;
			}
		}
		
		const search = (e)=>{
			if ( e.cancelable ) return
			props.f7router.navigate('/search',{props:{searchword : state.searchQuery }})
			
		}
        onBeforeMount( () => {
			console.log ( state.globalStore );
			getHomeData();
        })
		  /*
		onMounted( () => {})
		onBeforeMount(() => {
          // ... 
        })
        onBeforeUpdate(() => {
          // ... 
        })
        onUpdated(() => {
          // ... 
        })
        onBeforeUnmount(() => {
          // ... 
        })
        onUnmounted(() => {
          // ... 
        })
        onActivated(() => {
          // ... 
        })
        onDeactivated(() => {
          // ... 
        })
        onErrorCaptured(() => {
          // ... 
        })
		*/
		return { 
          state,
		  ExpoTableList,
			
		  getHomeData,
		  changehepohometab,
		  search,
        }
      }
    }
</script>