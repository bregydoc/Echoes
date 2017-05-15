
var urlConnection = "http://localhost:4600";
var MixerState;
var LocalState = [[],[],[],[],[],[],[],[],[],[]];
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
      setTimeout(worker, 10);
    }
  });
})();

(function worker() {
	console.log({"content":LocalState});
  $.ajax({
  	type: "POST",
  	dataType : 'json',
    url: urlConnection + "/echoes/api/update-state", 
    data: {content:LocalState},
    success: function(data) {
      //MixerState = data;
      //console.log(MixerState);
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(worker, 100);
    }
  });
})();