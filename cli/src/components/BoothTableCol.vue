<template>

<li class="item-content" v-bind:class="col">
	<div class="item-inner">
		<div class="card booth-card elevation-3">
			<a v-bind:href="booth.id" 
			   data-transition="f7-dive"
			   v-bind:style="{ backgroundImage: 'url('+ imghost + booth.booth_mobile_image_url + ')' }"
			   valign="bottom" 
			   class="card-header expo_booth_card_header">
				
			  <div v-if="state.isLiveOn" class="display-flex flex-direction-column elevation-5 booth_live_on">
				  <i class="material-icons align-self-center">live_tv</i>
				  <div style="font-size: 14px;">
					  LIVE ON
				  </div>
			  </div>
		  </a>

		<div class="booth_fav_wrap">
			<a href="#" class="globalToggleBoothLink" @click="favorite(booth.id)">
				<i class="material-icons isfavorite" v-if="state.isFavorite" >favorite</i>
				<i class="material-icons unfavorite" v-else>favorite_border</i>
			</a>
		</div>

		  <div class="card-content booth-card-content-padding">
			  <a href="/expo/isfavorite/1" data-transition="f7-dive" class="">
				  <div class="card-expo-title">{{booth.booth_title}}</div>
				  <div class="card-expo-title booth_company_name">캄퍼니
				  </div>
			  </a>
		  </div>

	  </div>
	</div>
</li>

</template>

<script>
import { ref, computed, reactive,onMounted, inject  } from "vue";
import { f7 } from 'framework7-vue';
	
import axios from 'axios';
import { ajaxError } from '../js/axioserror.js';
	
export default {
  name: 'BoothTableCol',
  props: {
    booth: { type: Object, required: true },
	col : { type: String, required: false, default: '' }, //class ex col-50
	imghost : { type: String, required: false, default: '' }, //class ex col-50
  },
  setup(props) {
	 
	const state = reactive({
		 globalStore : inject('liveon', {}),
		 isFavorite : false,
		 isLiveOn : false,
	});
	
	const favorite = (id) =>{
		console.log ( "favorite" + id )
		axios.post('https://murflim.run.goorm.io/mobileapi/favorite/booth',{booth_id : id})
                    .then(response => {
							state.isFavorited = true}
						 )
                    .catch(error =>{
						ajaxError(error.response)
					});
	}
    return { state,favorite };
  }
}
</script>
