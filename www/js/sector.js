if (window.jQuery) {  
	localStorage.domain = "http://buffetexpress.com.co/REST/";
	localStorage.setItem("quadrant","");
	localStorage.setItem("banner","");	
	var zonas= ajaxrest.getZones();
	if(zonas.length>0){
		localStorage.setItem("zonas",JSON.stringify(zonas));
		for (var i=0; i < zonas.length; i++){
			if(zonas[i].closez==1){
				$('#zonas').append($('<option>', { 
					value: zonas[i].code+"|"+zonas[i].id+"|"+zonas[i].coordinates+"|"+zonas[i].ciudad,
					text : zonas[i].name
				}));
			}
		}
		$('#zonas').append($('<option>', { 
			value: "cam002|0",
			text : "Me encuentro en otro sector"
		}));		
	}
	$(document).on("change", "select", function() {
		var data= this.value.split("|");     
		cleanSession();
		if(data[1]==0){
			localStorage.setItem("plato",1);
			localStorage.setItem("tipo_pago","efectivo");  
			localStorage.setItem("quadrant","");    	
			localStorage.setItem("zona",JSON.stringify({id:2,code:data[0],coords:data[2],ciudad:data[3]}));      	
		}else{		
			localStorage.setItem("plato",1);
			localStorage.setItem("tipo_pago","efectivo");      	
			localStorage.setItem("quadrant","d");
			localStorage.setItem("MsgZone",1);
			localStorage.setItem("zona",JSON.stringify({id:data[1],code:data[0],coords:data[2],ciudad:data[3]}));
		}
		var timer= new Date().getTime();
		localStorage.setItem("timer",timer);
		localStorage.setItem("GPS","false");
		window.location.href = 'internal.html';
	});	
}