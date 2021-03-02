<template>
  <f7-page name="expo">
    <!-- Top Navbar -->
    <f7-navbar :sliding="true">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>
			<div class="navbar-expo-name">{{state.expo_name}}</div>
		  	<div class="navbar-expo-duration">{{state.expo_duration}}</div>
	  </f7-nav-title>
      <f7-nav-right>
		<f7-link class="searchbar-enable" data-searchbar=".searchbar-expo" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search" ></f7-link>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
	  <!--f7-nav-title-large sliding>
		  <div class="navbar-sliding-text-wrap">
			<div class="navbar-expo-name">{{state.expo_name}}</div>
		  	<div class="navbar-expo-duration">{{state.expo_duration}}</div>
		  </div>
	  </f7-nav-title-large-->
   <f7-searchbar
      class="searchbar-demo searchbar-expo"
      expandable
      :disable-button="true"
	  :custom-search="true"
	  @change="search"
	  v-model:value="state.searchQuery"
    ></f7-searchbar>
		
    </f7-navbar>
	  
    <!-- Toolbar-->
<f7-toolbar tabbar top>
	<f7-link tab-link="#expo-tab-1" tab-link-active>소개</f7-link>
	<f7-link tab-link="#expo-tab-2" >부스</f7-link>
	<f7-link tab-link="#expo-tab-3">전시상품</f7-link>
	<f7-link tab-link="#expo-tab-4">출품안내</f7-link>
</f7-toolbar>

<f7-tabs swipeable class="expo-home-tabs">
	
	<f7-tab id="expo-tab-1" class="page-content" tab-active  v-on:scroll="handleScroll">
		<div class="expo_info_wrap">
			<div class="expo_info_sub_wrap">
				<img v-if="state.data.expo" :src="state.globalStore.imghost + state.data.expo.expo_image_url" style="width:100%" />
				<div v-if="state.data.expo" class="expo_info_description">
					{{ state.data.expo.expo_description}}
				</div>
			</div>
			<div class="expo_attach_wrap" v-if="state.expo_attach">
				<img v-for="item in state.expo_attach"  :src="state.globalStore.imghost + item.url" style="width:100%" />
				<f7-photo-browser
					:photos="state.photos"
					ref="standalone"
					:routable-modals="false"
				  ></f7-photo-browser>
				<div class="expo_attach_browser_btn" @click="$refs.standalone.open()">
					<i class="material-icons">zoom_out_map</i>
				</div>
			</div>
		</div>

	</f7-tab>
	
	
	<f7-tab id="expo-tab-2" class="page-content">
		<div class="expo_info_booth_wrap">
			<div class="expo_info_booth_inner" v-if="state.booth_view">
				<BoothTableList :apps="state.booths" col="col-50" :imghost="state.globalStore.imghost" />
			</div>
			<div class="expo_booth_ready_wrap" v-else>
				<div class="expo_booth_ready_inner">
				부스 준비중입니다.
				</div>
			</div>
		</div>
	</f7-tab>
	
	
	<f7-tab id="expo-tab-3" class="page-content">
		<div class="expo_info_product_wrap">
			<div class="expo_info_product_inner" v-if="state.product_view">
				<ProductTable :expo_id="state.data.expo.id" />
			</div>			
			<div class="expo_booth_ready_wrap" v-else>
				<div class="expo_booth_ready_inner">
				전시상품 준비중입니다.
				</div>
			</div>
		</div>		
	</f7-tab>
	
	
	<f7-tab id="expo-tab-4" class="page-content">출품안내</f7-tab>
</f7-tabs>
		  
	  
    <!-- Page content-->
	  

	  
  </f7-page>
</template>

<script>
	import { reactive,onBeforeMount, inject } from 'vue';
	import axios from 'axios';
	import { f7 } from 'framework7-vue';
	import BoothTableList from '../components/BoothTableList.vue';
	import ProductTable from '../components/ProductTable.vue';
	
	export default {
		name : 'expo',
		props: {
			title: String,
			f7route: Object,
			f7router: Object,
			expocode : String,
			//starttabactive : { type: String, default:''}
		},
		components : ['BoothTableList','ProductTable'],
		setup(props) {
			const state = reactive({
			  expo_name : "",
			  expo_duration:'',
			  searchQuery : "",
			  globalStore : inject('liveon', {}),
			  data:{},
			  expo_attach : null,
			  booths : null,
			  photos : [],
			  booth_view:false,
			  product_view:false,
			});
			const search = (e)=>{
				if ( e.cancelable ) return
				props.f7router.navigate('/search',{props:{searchword : state.searchQuery }})

			}
			const getExpoData = async () =>{
				const homedata = await axios({
					method: 'get',
					url: 'https://murflim.run.goorm.io/expo-meta/'+ props.expocode,
					params : {
					}
				}).then(function (response) {
					state.data = response.data.data;
					if( typeof response.data.data.expo.expo_attach !='undefined'){
						state.expo_attach = response.data.data.expo.expo_attach;
						 response.data.data.expo.expo_attach.forEach( (item, index )=>{
							state.photos.push( state.globalStore.imghost + item.url)
						 });
					}

					if( typeof response.data.data.expo =="object"){
						let expo = response.data.data.expo;
						state.expo_name = expo.expo_name
						state.expo_duration = state.data.expo.expo_open_date + ' ~ ' + state.data.expo.expo_close_date;
						if( expo.expo_use_yn=='Y') {
							
							
							if( expo.open=='Y' || expo.progress_status != 'pre' ){
								if( typeof expo.booths !='undefined'){
									state.booths = response.data.data.expo.booths;
									state.booth_view = true;
								}
							}
							
							if(  expo.progress_status != 'pre' ) state.product_view = true;
						}
					}

				}).catch((ex) => {
					console.warn("ERROR!!!!! : ",ex)
				})		
			}
			const getProductData = async () =>{
				const homedata = await axios({
					method: 'get',
					url: 'https://murflim.run.goorm.io/expo-meta/megashow2020',
					params : {
					}
				}).then(function (response) {
				}).catch((ex) => {
					console.warn("ERROR!!!!! : ",ex)
				})		
			}
			onBeforeMount(() => {
			  getExpoData();
			})
			const handleScroll = (e)=>{
				console.log ("dddd")
			}
			return { 
				state,
				search,
				BoothTableList,
				ProductTable,
				
				handleScroll,
			}	
		}
	}
</script>