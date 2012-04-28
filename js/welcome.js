if (Meteor.is_client) {

  Template.welcome.player_name = function(){
    Session.set('player_id', $.cookie('player_id'));
    var player = Players.findOne(Session.get('player_id'));
    return player ? player.name : null;
  }
  
  Template.welcome.show_welcome = function(){
    return !Session.get('show_dashboard');
  }

  Template.welcome.events = {
    'click a.create-player' : function (event) {
      var $input = $(event.target).siblings('input');
      if($input.val() != "") {
        
        // build player
        opts = {name: $input.val()};
        Players.insert(opts);
        var player = Players.findOne(opts);

        // change session
        Session.set('player_id', player._id);
        $.cookie('player_id', player._id, { expires: 100 })
        
        // change display
        $input.val('');
      }
    },
     
    'click a.continue': function() {
      Session.set('show_dashboard', true);
    }   
  }

};

var logout = function(){
  $.cookie('player_id', null)
  Session.set('player_id', null)
  Session.set('show_dashboard', false)
}