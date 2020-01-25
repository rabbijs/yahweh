import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({

//  session: Ember.inject.service('session'),

  model: function() {
    //let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];

    let username = 'yahweh';
    let password = 'satoshi';

    let digest = btoa(`${username}:${password}`);
  
    let headers = {
      'Authorization': `Basic ${digest}`
    };
    return Ember.$.ajax({
      method: 'GET',
      url: `${config.apiEndpoint}/api/dashboard`,
      headers: headers
    });
  },

  setupController(controller, model) {
    console.log(model);

    controller.set('hosts', model.hosts);
    controller.set('actors', model.actors);

  }


});
