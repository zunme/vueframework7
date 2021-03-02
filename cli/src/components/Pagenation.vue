<template>
	<div class="pagenation_wrap">
		<ul>
			<li class="pagelink_first" 
				v-bind:class=" {disable : state.current_page== 1 } "
				@click="onPageChange(1)">
				first
			</li>
			<li class="pagelink_prev" 
				v-bind:class=" {disable : state.prev== 1 } "
				@click="onPageChange(state.prev)">
				prev
			</li>
			<li class="pagelink_page" v-for="num in state.pages" 
				v-bind:class=" {active : state.current_page== num} "
				 @click="onPageChange( num )"
				>{{num}}</li>
			<li class="pagelink_next" 
				v-bind:class=" {disable : state.next == state.last_page } "
				@click="onPageChange(state.next)">
				next
			</li>			
			<li class="pagelink_last"
				@click="onPageChange(  state.last_page )"
				v-bind:class=" {disable : state.current_page == state.last_page } "
				>last</li>
		</ul>
	</div>
</template>

<script>
import { ref, reactive,toRefs,watch,onMounted  } from "vue";
import { f7 } from 'framework7-vue';
	
export default {
  name: 'Pagenation',
  props: {
    apps: { type: Object, required: false, default:{} },
	perview : { type: Number, required: false, default:3 },
	callevent : { type: String , required: false, default:"pagechange" },
  },
  setup(props) {
	const state = reactive({
		 current_page : props.apps.current_page,
		 last_page : props.apps.last_page,
		 prev : 1,
		 next : props.apps.last_page,
		 pages : []
	});
	  
	let { apps } = toRefs(props)
	watch(apps, (newValue, oldValue) => {
		pagecalc(newValue)
	})
	const pagecalc = (vals)=>{
	    let before = Math.floor(( props.perview - 1 )/2);
		let start = 1;
		let end = 1;

		if( vals.current_page - before > 1 ) start = vals.current_page - before;

		if( start + props.perview-1 > vals.last_page ){
			end = vals.last_page;
			start =  vals.last_page - props.perview +1;
			if( start < 1 ) start = 1;
		}else {
			end = start + props.perview - 1;
		}
		
		let pages = [];
		for ( let i = start; i <= end; i++ ){
			pages.push(i)
		}
		 state.current_page = vals.current_page
		 state.last_page = vals.last_page
		 state.prev= ( start - 1 ) > 1 ? start - 1 : 1;
		 state.next = ( end + 1 ) > vals.last_page ? end + 1 : vals.last_page ;
		 state.pages = pages
	}
	onMounted( () => {
		 pagecalc( props.apps )
	});
	const onPageChange = (page) =>{
		if (page == state.current_page) return;
		f7.emit(props.callevent , page);
	}
    return { state, onPageChange };
  }
}
</script>