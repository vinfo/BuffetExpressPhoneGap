if (window.jQuery) {  
	var zonas= ajaxrest.getZones();
	if(zonas.length>0){
		localStorage.setItem("zonas",JSON.stringify(zonas));
		for (var i=0; i < zonas.length; i++){
			if(zonas[i].closez==1){
				$('#zonas').append($('<option>', { 
					value: zonas[i].code+"|"+zonas[i].id,
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
      var timer= new Date().getTime();
      localStorage.setItem("timer",timer);       
      localStorage.setItem("quadrant","");
      if(data[1]==0){
      	localStorage.setItem("zona",JSON.stringify({id:2,code:data[0]}));
      	alert("Usuario fuera de cobertura.\n(Puedes ver nuestro menú pero no podrás ordenar)");
      	window.location.href = 'internal.html';
      }else{
		localStorage.setItem("zona",JSON.stringify({id:data[1],code:data[0]}));
		window.location.href = 'internal.html';
      }     
    });	
}