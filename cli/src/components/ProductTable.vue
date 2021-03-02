<template>
	<div class="product_table_inner list media-list product-list" v-on:scroll="handleScroll">
		<ul>
			<ProductCol v-for ="item in state.product"
				:product="item" :col="col" :imghost="imghost" />
		</ul>
	</div>
    <Pagenation :apps="state.page" callevent="expo_product_page" :perview="state.perview" />
</template>

<script>
import { ref, reactive,onMounted, onUnmounted  } from "vue";
import { f7, f7ready } from 'framework7-vue';
	
import ProductCol from '../components/ProductCol.vue';
import Pagenation from '../components/Pagenation.vue';
import axios from 'axios';
	
export default {
  name: 'ProductTable',
  props: {
    apps: { type: Array, required: false, default:[] },
	expo_id : {type:Number},
	col : { type: String, required: false, default: '' }, //class ex col-50
	imghost : { type: String, required: false, default: '' }, //class ex col-50
  },
  component :['ProductCol','Pagenation'],
  setup(props) {
	const state = reactive({
		 products:null,
		 perview : 3,
		 page : {
			 current_page : 1,
			 last_page : 1
		 }
	});
	const scrollComponent = ref(null)
	const getProductData = async (page) =>{
		let url='https://murflim.run.goorm.io/mobileapi/prdlist/1'
		
		let data = await axios({
			method: 'get',
			url: url,
			params : {
				page : page
			}
		}).then(function (response) {
			let res= response.data.data;
			state.product = res.data;
			state.page = res;
			console.log ( "===============")
			console.log (state.page)
		}).catch((ex) => {
			return null
			console.warn("ERROR!!!!! : ",ex)
		})		
	}
	const pagechanged = (page) =>{
		console.log ("parent " + page)
	}
	const handleScroll = (e)=>{
		console.log ( e )
		let element = scrollComponent.value;
		console.log (element)
	}
	onMounted( () => {
		 f7ready(() => {
			 f7.on('expo_product_page', (page)=>{
				console.log ( "emit..." ) 
				 getProductData(page)
			 });
			 window.addEventListener("scroll", handleScroll)
		 });
		getProductData('1');
	});
	onUnmounted(() => {
			window.removeEventListener("scroll", handleScroll)
	});''
    return { state,scrollComponent, ProductCol,Pagenation,getProductData, handleScroll };
  }
}
</script>