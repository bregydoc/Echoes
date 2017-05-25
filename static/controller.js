
var urlConnection = "http://localhost:4600";
var MixerState;
var LocalState = [[],[],[],[],[],[],[],[],[],[]];

var GlobalState = [[],[],[],[],[],[],[],[],[],[]];


var updateFreq = 10;
/*
$.get(urlConnection + "/echoes/api/mixer-current-state", function(data) {
	console.log(data);
});
*/
(function worker() {
	$.ajax({
    	url: urlConnection + "/echoes/api/mixer-current-state", 
    	success: function(data) {
      	MixerState = data;
      	//console.log(MixerState);
	    },
	    
	    complete: function() {
	    	// Schedule the next request when the current one's complete
	    	setTimeout(worker, updateFreq);
	    }

  	});
})();


(function worker() {
	//console.log({"content":LocalState});
    $.ajax({
		url: urlConnection + "/echoes/api/update-state", 
		type: "POST",
		//dataType : 'json',
		data: {"content": JSON.stringify(LocalState)},
		success: function(data) {
			var onlineState = JSON.parse(data);
			GlobalState = onlineState;
	      	//MixerState = data;
	      	//console.log(MixerState);
		},
    	complete: function() {
    		setTimeout(worker, updateFreq);
    	}
  	});
})();