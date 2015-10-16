app.controller('facebookController',function($scope,$rootScope){
	gobernadores=["MiguelMarquezM", 
	"eruviel",
	"MiguelAngelMancera",
	'JaimeRodriguezElBronco',
	'franciscokikovega',
	'manuelvelascoc',
	'CarrerasGobernador',
	'SilvanoAureoles',
	'panchdominguez',
	'AlejandroMC',
	'ClaudiaPavlovich',
	'arturonunez',
	'mariolopezvaldez',
	'GobiernodeAguascalientes',
	'robertosandovalc',
	'PacoOlveraFanPage',
	'miguelzac',
	'jaristoteles.sandoval',
	'jherreracaldera',
	'RafaelMorenoValle',
	'GabinoCueMonteagudo',
	'betoborgefans',
	'gracoramirezg',
	'cesarduartejaquez',
	'mario.anguiano.gobernador',
	'egidiotorrecantu'
	];
	gobiernos=["gobiernoguanajuato", 
	"GobiernoDistritoFederal",
	'GobiernoJalisco',
	'gobierno.estado.yucatan',
	'GobQro',
	'gobmichoacan',
	'gobierno.edomex',
	'GobiernodeAguascalientes',
	'GobiernoBC',
	'GobiernoBCS',
	'gobiernochihuahua',
	'GobTamaulipas',
	'gobiernodecoahuila',
	'GuerreroPortal',
	'GobiernodeHidalgo',
	'GobiernoDeMorelos',
	'gobiernonuevoleon',
	'GobOax',
	'gobierno.colima',
	'gobsinaloa',
	'GobiernoSonora',
	'gobiernodetabasco',
	'GobiernodelestadodeTlaxcala',
	'GobiernodeVeracruz',
	'gobzac',
	'GobEdoSLP',
	'gobdgo'
	];
	$scope.result=[];
	$scope.resultGob=[];
	$rootScope.logged=false;
	
	$scope.getMe=function(){
		FB.api('/me?fields=likes',function(response){ 
					$rootScope.$apply(function() { 
      					//$rootScope.user = _self.user = res; 
      					console.log(response);
    				});			
		});
	}

	$scope.getLikes=function(){
		var res=[];
		angular.forEach(gobernadores, function(i){
	     		var obj={};
				FB.api('/' + i + '?fields=likes,picture',function(response){ 
					$rootScope.$apply(function() { 
						obj["likes"] = response.likes;
						obj["foto"] = response.picture;
						obj["nombre"] = i;
						$scope.result.push(obj);
					});
				});
			});
	};

	$scope.getLikesGobiernos=function(){
		var res=[];
		angular.forEach(gobiernos, function(i){
	     		var obj={};
				FB.api('/' + i + '?fields=likes,picture',function(response){ 
					$rootScope.$apply(function() { 
						obj["likes"] = response.likes;
						obj["foto"] = response.picture;
						obj["nombre"] = i;
						$scope.resultGob.push(obj);
					});
				});
			});
	};
	

	watchLoginChange = function() {
		console.log('working...');
	  	FB.Event.subscribe('auth.statusChange', function(res) {
		    if (res.status === 'connected') {
		    	$rootScope.logged=true;
		    	$scope.getLikes();
		    	$scope.getLikesGobiernos();
		    } 
		    else {
		      $rootScope.logged=false;
		    }
	  });
	}
	

	$scope.FBLogin=function(){
		FB.login(function(response) {
	    if (response.authResponse) {
	    	$scope.logged=true;
	    	var accesToken=FB.getAuthResponse();	
		 
	    } else {
	     console.log('User cancelled login or did not fully authorize.');
	    }
		});
	}

	$scope.FBLogot=function(){
		
		FB.logout(function(response) {
			 $rootScope.$apply(function() { 
  				 $rootScope.logged=false;
				$scope.result=[];
  			});
		});
	}

	

	

});