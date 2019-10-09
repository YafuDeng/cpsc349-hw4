(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQeury;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };
  //retrieves all orders and passes them to callback cb
  RemoteDataStore.prototype.getAll = function(cb){
    $.get(this.serverUrl, function (serverResponse){
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + "/?emailAddress" + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.remove = function(key) {
    var urls = this.serverUrl;
    $.get(urls + "/?emailAddress=" + key, function(serverResponse) {
      $.ajax({
        type: "DELETE",
        url: urls + "/" + $(serverResponse).attr("id")
      });
    })
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
