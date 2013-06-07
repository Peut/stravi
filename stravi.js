if (Meteor.isClient) {
	$(document).ready(function() {
		//var g = new Stravi.Game();
		console.log("loaded");
	})
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
