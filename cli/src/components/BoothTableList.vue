<template>
	<div class="booth_table_inner">
		<ul>
			<BoothTableCol 
				v-for ="item in apps"
				:booth="item" :col="col" :imghost="imghost" />
		</ul>
	</div>
</template>

<script>
import { ref, computed, reactive,onMounted, inject  } from "vue";
import BoothTableCol from '../components/BoothTableCol.vue';
export default {
  name: 'BoothTableList',
  props: {
    apps: { type: Array, required: false, default:[] },
	col : { type: String, required: false, default: '' }, //class ex col-50
	imghost : { type: String, required: false, default: '' }, //class ex col-50
  },
  component :['BoothTableCol'],
  setup(props) {

	const state = reactive({
		 globalStore : inject('liveon', {}),
		 
	});
    return { state, BoothTableCol};
  }
}
</script>
