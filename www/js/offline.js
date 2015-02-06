    window.setTimeout(function() {
			alert("Reintentar");
			$.ajax({
			    url:'http://buffetexpress.co/REST/resources/images/logo.png',
			    type:'HEAD',
			    error: function()
			    {
			        alert("Sin internet");
			    },
			    success: function()
			    {
			        window.location.href = 'internal.html';
			    }
			});
    }, 10000);