if (Meteor.isClient) {
	Meteor.startup(function () {
		g = new Stravi.Game();
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
