"use strict";



define('yahweh-admin/app', ['exports', 'yahweh-admin/resolver', 'ember-load-initializers', 'yahweh-admin/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('yahweh-admin/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('yahweh-admin/helpers/app-version', ['exports', 'yahweh-admin/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('yahweh-admin/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('yahweh-admin/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('yahweh-admin/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'yahweh-admin/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('yahweh-admin/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('yahweh-admin/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('yahweh-admin/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('yahweh-admin/initializers/export-application-global', ['exports', 'yahweh-admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('yahweh-admin/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('yahweh-admin/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('yahweh-admin/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("yahweh-admin/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('yahweh-admin/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('yahweh-admin/router', ['exports', 'yahweh-admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('login');
    this.route('dashboard', { path: '/' });
  });

  exports.default = Router;
});
define('yahweh-admin/routes/dashboard', ['exports', 'yahweh-admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    //  session: Ember.inject.service('session'),

    model: function model() {
      //let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];

      var username = 'yahweh';
      var password = 'satoshi';

      var digest = btoa(username + ':' + password);

      var headers = {
        'Authorization': 'Basic ' + digest
      };
      return Ember.$.ajax({
        method: 'GET',
        url: _environment.default.apiEndpoint + '/api/dashboard',
        headers: headers
      });
    },

    setupController: function setupController(controller, model) {
      console.log(model);

      controller.set('hosts', model.hosts);
      controller.set('actors', model.actors);
    }
  });
});
define('yahweh-admin/routes/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('yahweh-admin/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("yahweh-admin/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9ZIEWIT5", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"container\"],[7],[0,\"\\n  \"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "yahweh-admin/templates/application.hbs" } });
});
define("yahweh-admin/templates/dashboard", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dSslhueW", "block": "{\"symbols\":[\"host\",\"actor\"],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\\n\"],[6,\"h1\"],[7],[0,\"Actor System Admin\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"hosts\"]]],null,{\"statements\":[[0,\"    \"],[6,\"h3\"],[7],[0,\"Rabbi Host @ \"],[1,[19,1,[\"ip\"]],false],[8],[0,\"\\n\\n    \"],[6,\"table\"],[9,\"class\",\"table table-dark\"],[7],[0,\"\\n      \"],[6,\"thead\"],[7],[0,\"\\n        \"],[6,\"tr\"],[7],[0,\"\\n          \"],[6,\"th\"],[9,\"scope\",\"col\"],[7],[0,\"Identity\"],[8],[0,\"\\n          \"],[6,\"th\"],[9,\"scope\",\"col\"],[7],[0,\"Host IP\"],[8],[0,\"\\n          \"],[6,\"th\"],[9,\"scope\",\"col\"],[7],[0,\"Exchange\"],[8],[0,\"\\n          \"],[6,\"th\"],[9,\"scope\",\"col\"],[7],[0,\"Routing Key\"],[8],[0,\"\\n          \"],[6,\"th\"],[9,\"scope\",\"col\"],[7],[0,\"Queue\"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[19,1,[\"actors\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"td\"],[7],[1,[19,2,[\"id\"]],false],[8],[0,\"\\n            \"],[6,\"td\"],[7],[1,[19,2,[\"ip\"]],false],[8],[0,\"\\n            \"],[6,\"td\"],[7],[1,[19,2,[\"exchange\"]],false],[8],[0,\"\\n            \"],[6,\"td\"],[7],[1,[19,2,[\"routingkey\"]],false],[8],[0,\"\\n            \"],[6,\"td\"],[7],[1,[19,2,[\"queue\"]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "yahweh-admin/templates/dashboard.hbs" } });
});
define("yahweh-admin/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "s3yNBY4T", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "yahweh-admin/templates/login.hbs" } });
});


define('yahweh-admin/config/environment', ['ember'], function(Ember) {
  var prefix = 'yahweh-admin';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("yahweh-admin/app")["default"].create({"name":"yahweh-admin","version":"0.0.0+5842fcdc"});
}
//# sourceMappingURL=yahweh-admin.map
