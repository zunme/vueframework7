import { f7 } from 'framework7-vue';
export function toastmessage(msg){
	f7.toast.show({
		text: `로그인이 필요한 페이지입니다`,
		position: "bottom",
		closeTimeout: 2000,
	 });
}
export function ajaxError(jqXHR) {
	if( jqXHR.status == 401 ){
		toastmessage('로그인이 필요한 페이지입니다')
		//f7.dialog.alert("로그인이 필요한 페이지입니다.");	
	}else if(jqXHR.status == 403) {
		toastmessage('권한이 없습니다')
    }else if(jqXHR.status != 422 && jqXHR.status != 500 && jqXHR.status !=400) {
		toastmessage('잠시후에 이용해주세요')
          return;
    }else {
        var msg ;
        var exception ;
		  
        if (jqXHR.responseJSON ) {
          msg = jqXHR.responseJSON.errors;
          exception = jqXHR.responseJSON.exception;
        }else if ( typeof jqXHR.data == "object"){
		  msg = jqXHR.data.errors;
          exception = jqXHR.data.exception;
		}
        if(msg) {
          for(key in msg) {
            if(msg.hasOwnProperty(key)) {
              if(key.indexOf('.') < 0 ) {
                //$$('input[name='+key+']').focus();
              }
  
              if ( $$.isNumeric( key )) {
				  toastmessage(msg)
              } else {
                 toastmessage(msg[key][0]); 
              }
              break;
            }
          }
        } else {
		  toastmessage('잠시후에 이용해주세요.');
        }
    }
	//f7.dialog.alert("error");
  	console.log (jqXHR);
}