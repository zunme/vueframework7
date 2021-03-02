<template>
	<div class="expotable_inner">
		<ul>
		<template v-if="apps.length">
			<li v-for="item in apps" v-bind:class="col">
				<a v-bind:href="'/expo/'+item.expo_code">
				  <f7-card class="expo-card">
					<f7-card-header
					  class="no-border"
					  valign="bottom"
					  v-bind:style="{ backgroundImage: 'url(https://murflim.run.goorm.io/storage/' + item.expo_image_url + ')' }"
					></f7-card-header>
					<f7-card-content>
					  <div class="expo-card-progress">
						  <span v-if="item.progress_status == 'ing'">[진행중]</span>
						  <span v-else-if="item.progress_status == 'pre'">[예정]</span>
						  <span v-else-if="item.progress_status == 'end'">[종료]</span>
					  </div>
					  <div class="expo-card-title">{{item.expo_name}}</div>
					  <div class="expo-card-date">
						  {{item.expo_open_date}} ~ {{item.expo_close_date}}
					   </div>
					</f7-card-content>
				  </f7-card>
				</a>
			</li>
		</template>
		<template v-else>
			<li>
				<div class="search-prc-expo-fail-box">
                <div>
                  <i class="material-icons">search_off</i>
                </div>
                <div>
                  조회된 결과가 없습니다.
                </div>
              </div>
			</li>
		</template>
		</ul>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import {convertUrl} from "../js/helpers.js";
export default {
  name: 'ExpoTableList',
  props: {
    apps: { type: Array, required: false, default:[] },
    backText: { type: String, required: false, default: '' },
	viewtype : { type: String, required: false , default: 'ing'},
	col : { type: String, required: false, default: '' }, //class ex col-50
  },
  setup(props) {
	  console.log (props.apps)
    return { convertUrl : convertUrl };
  }
}
</script>
