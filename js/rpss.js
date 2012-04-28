Session.set('player_id', null);
Session.set('show_dashboard', false);
Session.set("game_id", null);

Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");



// var RpssRouter = Backbone.Router.extend({
//   
//   routes: {
//     ":game_id": "game"
//   },
//   game: function (game_id) {
//     Session.set("game_id", game_id);
//   }
//   
// });
// 
// Router = new RpssRouter;
// 
// Meteor.startup(function () {
//   Backbone.history.start({pushState: true});
// });


Meteor.startup(function(){
  // Session.set('show_dashboard', true)
  // Session.set('game_id', "c8b4c18f-d210-47e9-ad13-78723c1541de")
})