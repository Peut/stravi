/*
Accounts.loginServiceConfiguration.insert({
  service: "facebook",
  appId: "366989566757303",
  secret: "230fea9aa0734a8ccc1c4aea6fdfe1fb"
});
*/

tileCollection = new Meteor.Collection('tiles');

if (Meteor.isClient) {
    Meteor.startup(function () {
        
        Meteor.subscribe('tiles', function() {
            
        });
        
        g = new Stravi.Game();
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        Meteor.publish('tiles', function() {
            return tileCollection.find();
        });
    });
}