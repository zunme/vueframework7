<template>

<li class="item-content" v-bind:class="col">
	<div class="item-content product_item">
		<div class="item-media">
			<a v-bind:href=" '/m/product/' + product.id" >
				<div class="prdimg" 
					 v-bind:style="{ backgroundImage: 'url('+ config.img_url + product.prd_img1 + ')' }"
					 >
				</div>
			</a>
		</div>
		<div class="item-inner ">
			<div class="item-title-row">
				<a href="/m/product/6" class="new-list-item-title-ellipsis2">{{product.prd_title}}
				</a>
			</div>
			<div class="prd-item-company-name" style="display:none">Beatles</div>
			<a v-bind:href=" '/m/product/' + product.id"
			   class="prd-item-price-wrap display-flex justify-content-space-between">
				<div class="prd-item-price-down">

				</div>
				
				<div class="prd-item-price-inner" v-if=" product.prd_viewprice=='Y' ">
						<div class="prd-item-before_price">
							<span class="prd-item-before_price_tag2">
								{{product.prd_org_price}} 원
							</span>
							<span class="pricedntag">{{product.prd_price_percent}}%</span>
						</div>
						<div class="prd-item-after_price">
							{{product.prd_price}} 원
						</div>
				</div>
				<div class="prd-item-price-inner" v-else>
						<div class="prd-item-after_price prd-item-none-price">
							가격 협의
						</div>
				</div>
			</a>
		</div>
		<div class="prd-item-fav prd-item-fav-outer display-flex">
			<a class="globalTogglePrdLink" @click="favorite( product.id )">
					<i class="material-icons isfavorite" v-if="state.isfavorite">favorite</i>
					<i class="material-icons unfavorite" v-else>favorite_border</i>
			</a>
		</div>
	</div>
</li>

</template>

<script>
import { reactive,onMounted  } from "vue";
import { f7 } from 'framework7-vue';

import { config } from '../js/config.js';
	
import axios from 'axios';
import { ajaxError } from '../js/axioserror.js';

	
export default {
  name: 'BoothTableCol',
  props: {
    product: { type: Object, required: true },
	col : { type: String, required: false, default: '' }, //class ex col-50
	imghost : { type: String, required: false, default: '' }, //class ex col-50
  },
  setup(props) {
	const state = reactive({
		 isFavorite : props.isfavorite ? true : false ,
	});
	
	const favorite = (id) =>{
		console.log ( "favorite" + id )
		axios.post( config.api_url + '/mobileapi/favorite/prd',{prd_id : id})
                    .then(response => {
							state.isFavorited = true}
						 )
                    .catch(error =>{
						ajaxError(error.response)
					});		
	}
    return { state,config,favorite };
  }
}
</script>
