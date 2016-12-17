/*
 * Copyright (c) 2015 Equals182.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 2, maxerr: 50  */
/*global define, brackets, Mustache, $, Promise*/
/*jslint white: true */

define(function (require, exports, module) {
  "use strict";
  
  /**
   * Including all needed modules
   */
  var AppInit = brackets.getModule("utils/AppInit"),
    ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
    FileSystem = brackets.getModule("filesystem/FileSystem"),
    FileUtils = brackets.getModule("file/FileUtils"),
    CommandManager = brackets.getModule("command/CommandManager"),
    Commands = brackets.getModule("command/Commands"),
    Menus = brackets.getModule("command/Menus"),
    ProjectManager = brackets.getModule("project/ProjectManager"),
    MainViewManager = brackets.getModule("view/MainViewManager"),
    PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
    NodeConnection = brackets.getModule("utils/NodeConnection"),
    EventEmitter = require('modules/events/index'),

    //_ = require("node/node_modules/lodash/lodash"),
    utils = require("node/libs/utils"),
    ps = require("node/node_modules/perfect-scrollbar/dist/js/perfect-scrollbar"),
    _ = utils._,

    strings = require("strings"),
    ui = require("./modules/ui"),

    _defaultEqFTPFolder = brackets.app.getUserDocumentsDirectory(),
    _callbacks = {},
    _node,
    _ignore = [
        "**/(.pyc|.git|.gitmodules|.svn|.DS_Store|Thumbs.db|.hg|CVS|.hgtags|.idea|.c9revisions|.SyncArchive|.SyncID|.SyncIgnore|.eqftp)",
        "**/bower_components",
        "**/node_modules"
    ];
  ui.ps = ps;
  EventEmitter = new EventEmitter();

  /**
   * Creating eqftp and _version variables
   */
  var _version = "1.0";
  var eqftp = {
    ui: ui,
    utils: utils
  };
  eqftp.preferences = new function () {
    var self = this;
    self._value = {};
    
    self.p = PreferencesManager.getExtensionPrefs("eqFTP");
    self.get = function (path) {
      return _.get(self._value, path);
    };
    self.set = function (path, value) {
      _.set(self._value, path, value);
      self.p.set("eqFTP", self._value);
      self.p.save();
    };
    self.init = function () {
      self.p.definePreference("eqFTP", "object", {
        misc: {
          first_start: true,
          last_settings_file: ''
        }
      });
      self._value = self.p.get("eqFTP");
      return self._value;
    };
  }();
  eqftp.log = function (text, type) {
    switch (type) {
      case 'error':
        break;
    }
    if (eqftp.ui && eqftp.ui.log) {
      eqftp.ui.log.add({
        time: utils.date_format(new Date(), 'H:i:s'),
        text: text,
        type: type
      });
    }
  };
  eqftp._cache = {
    watched: [],
    tmpfiles: []
  };
  eqftp._watch = {
    reset: function () {
        if (eqftp._cache.watched && _.isArray(eqftp._cache.watched)) {
            eqftp._cache.watched.forEach(function (localpath, i) {
                eqftp._watch.remove(localpath);
            });
        }
        eqftp._cache.watched = [];
        if (eqftp._cache.tmpfiles && _.isObject(eqftp._cache.tmpfiles)) {
            _.forOwn(eqftp._cache.tmpfiles, function (files, i) {
                if (_.isArray(files)) {
                    files.forEach(function (v, i) {
                        eqftp._watch.add(v.localpath);
                    });
                }
            });
        }
        _.forOwn(eqftp.settings.connections, function (connection, id) {
            if (connection.autoupload && connection.localpath) {
                eqftp._watch.add(connection.localpath);
            }
        });
    },
    remove: function (localpath) {
        var i = _.indexOf(eqftp._cache.watched, localpath);
        if (i > -1) {
            eqftp._cache.watched.splice(i, 1);
            FileSystem.resolve(localpath, function (err, item, stat) {
                if (!err) {
                    FileSystem.unwatch(item, function (err) {
                        if (err) {
                            console.error(err, localpath);
                        }
                    });
                }
            });
        }
    },
    add: function (localpath) {
        if (_.indexOf(eqftp._cache.watched, localpath) == -1) {
            eqftp._cache.watched.push(localpath);
            FileSystem.resolve(localpath, function (err, item, stat) {
                if (!err) {
                    FileSystem.watch(item, function () { return true; }, _ignore, function (err) {
                        if (err) {
                            console.error(err, localpath);
                        }
                    });
                }
            });
            eqftp._cache.watched.sort(function (a, b) {
                return a.length - b.length;
            });
            console.log(eqftp._cache.watched);
        }
    }
  };
  /**
   * Adding events to eqftp
   */
  eqftp = _.assignIn(eqftp, EventEmitter);
  // Listening for all events on eqftp object
  eqftp.on('event', function (event) {
    if (!event) {
      return false;
    }
    if (event.action) {
      switch (event.action) {
        case 'ready:html':
          break;
        case 'ready:app':
          _node.domains.eqFTP.commands().done(function (commands) {
            if (_.isArray(commands)) {
              // Adding Domain commands to eqftp object
              commands.forEach(function (command) {
                _.set(eqftp, command.command, _node.domains.eqFTP[command.command]);
              });
              // Initiating Brackets' preferences
              eqftp.preferences.init();
              // Populating eqftp object to window for global use
              window.eqftp = {
                ui: eqftp.ui,
                connect: eqftp.connect,
                openFolder: eqftp.openFolder,
                download: eqftp.download
              };
              var file = eqftp.preferences.get('misc.last_settings_file');
              eqftp.settings.get(file).done(function (settings) {
                eqftp.settings = settings;
                _.forOwn(eqftp.settings.connections, function (connection, id) {
                  ui.search.dropdown.addItem({
                    title: connection.name,
                    host: connection.server,
                    user: connection.login,
                    id: id
                  });                  
                });
                eqftp._watch.reset();
                // Proxy helps making easy requests like eqftp.connections['connection_id'].ls('/path'/);
                eqftp.connections = new Proxy({
                  __do: eqftp.connections
                }, {
                  get: function(connections, prop, receiver) {
                    if (prop in connections) {
                      return connections[prop];
                    } else if (prop in eqftp.settings.connections) {
                      // prop is id;
                      return (function (id) {
                        var p = new Proxy(eqftp.settings.connections[id], {
                          get: function (connection, prop, receiver) {
                            if (prop in connection) {
                              return connection[prop];
                            } else if (['ls', 'upload', 'download'].indexOf(prop) > -1) {
                              return function (params) {
                                return eqftp.connections.__do([id, prop], ...arguments);
                              }
                            }
                            return connection[prop];
                          }
                        });
                        return p;
                      })(prop);
                    } else {
                      return function (params) {
                        return eqftp.connections.__do([prop], ...arguments);
                      }
                    }
                    return {};
                  }
                });
                eqftp.log(ui.m(strings.eqftp__log__settings_load_success, {
                  filename: utils.getNamepart(file, 'filename')
                }), 'info');
              }).fail(function (err) {
                eqftp.log(ui.m(strings.eqftp__log__settings_load_error, {
                  filename: utils.getNamepart(file, 'filename')
                }), 'error');
              }).always(function () {
                console.log(arguments);
              });
            }
          });
          break;
        case 'connection:ready':
          eqftp.log(ui.m(strings.eqftp__log__connection_ready, {
            name: event.data.name,
            id: event.data.id
          }), 'info');
          break;
        case 'connection:error':
          eqftp.log(ui.m(strings.eqftp__log__connection_error, {
            name: event.data.connection.name,
            id: event.data.connection.id,
            error: event.data.error
          }), 'error');
          break;
        case 'connection:close':
          eqftp.log(ui.m(strings.eqftp__log__connection_close, {
            name: event.data.name,
            id: event.data.id
          }), 'info');
          break;
        case 'connection:update':
          eqftp.settings.connections = event.data;
          console.log(event);
          break;
        case 'settings:reload':
          console.log(event);
          break;
      }
    }
  });
  eqftp.connect = function (id) {
    var cb = _.once(function () {
      if (_.isEmpty(eqftp.connections[id])) {
        eqftp.emit('event', {
          action: 'connection:notexist',
          params: {id: id}
        });
        return false;
      }
      var path = (eqftp.connections[id].remotepath || '');
      ui.fileTree.reset();
      eqftp.openFolder(id, path, function (err, elements) {
        if (err) {
          eqftp.openFolder(id, '', function (err) {
            if (!err) {
              eqftp.ui.panel.switchTo('file-tree'); 
            }
          });
        } else {
          eqftp.ui.panel.switchTo('file-tree'); 
        }
      });
    });
    if (_.isObject) {
      eqftp.connections.tmp(id).done(function (connection) {
        id = connection.id;
        cb();
      }).fail(function (err) {
        console.log(err, arguments);
        eqftp.log(ui.m(strings.eqftp__log__connection_tmp_error, {
          error: err
        }), 'error');
      });
    } else {
      cb();
    }
  };
  eqftp.openFolder = function (id, path, callback) {
    if (!id) {
      return false;
    }
    if (!_.isString(path)) {
      path = '';
    }
    if (!_.isEmpty(ui.fileTree._rendered) && _.has(ui.fileTree._rendered, path)) {
      ui.fileTree.itemToggle(path);
    } else {
      eqftp.connections[id].ls(path).done(function (elements) {
        eqftp.ui.fileTree.add(elements, path);
        if (_.isFunction(callback)) {
          callback(null, elements);
        }
      }).fail(function (err) {
        if (_.isFunction(callback)) {
          callback(err);
        }
        console.error('NOT FOUND', arguments, path);
      });
    }
  };
  eqftp.download = function (id, remotepath, open) {
    var args = [...arguments];
    eqftp.connections[id].download(remotepath).done(function (data) {
      eqftp.log(ui.m(strings.eqftp__log__download_success, {
        filename: utils.getNamepart(remotepath, 'filename')
      }), 'success');
      if (open) {
        _.delay(function () {
          CommandManager.execute(Commands.CMD_ADD_TO_WORKINGSET_AND_OPEN, {fullPath: data.localpath, paneId: MainViewManager.getActivePaneId(), options: {noPaneActivate: (args[3].shiftKey ? true : false)}});
        }, 300);
      }
    }).fail(function (err) {
      eqftp.log(ui.m(strings.eqftp__log__download_error, {
        err: err,
        filename: utils.getNamepart(remotepath, 'filename')
      }), 'error');
      console.error('CANT DOWNLOAD', arguments, remotepath);
    });
  };

  // Adding eqftp + listener to ui so we could keep entities separately
  ui.eqftp(eqftp).on('event', ui.events);
  
  /**
   * This starts when Brackets' html is ready
   */
  AppInit.htmlReady(function () {
    // Including CSS files
    ExtensionUtils.loadStyleSheet(module, "assets/main.min.css");

    // Registering Commands
    CommandManager.register(strings.eqftp__context__upload, "eqftp.upload", function() {

    });

    // Creating context menus
    var project_contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.PROJECT_MENU);
    project_contextMenu.addMenuDivider();
    project_contextMenu.addMenuItem("eqftp.upload");

    var working_contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.WORKING_SET_CONTEXT_MENU);
    working_contextMenu.addMenuDivider();
    working_contextMenu.addMenuItem("eqftp.upload");
    
    eqftp.emit('event', {
      action: 'ready:html'
    });
  });
  /**
   * This starts when Node is ready
   */
  AppInit.appReady(function () {
    // Adding "change" listener on watched paths
    FileSystem.on("change", function (e, file) {
      eqftp._cache.watched.some(function (v, i) {
        var r = new RegExp('^' + v);
        if (r.test(file._path)) {
          console.log('UPLOAD!!!!', file._path);
          return true;
        }
      });
    });
    // Adding "rename" listener on watched paths
    FileSystem.on("rename", function (e, file) {
      eqftp._cache.watched.some(function (v, i) {
        var r = new RegExp('^' + v);
        if (r.test(file._path)) {
          console.log('RENAME!', file._path);
          return true;
        }
      });
    });

    // Creating Node connection
    _node = new NodeConnection();
    function connectNode() {
      var connectionPromise = _node.connect(true);
      connectionPromise.fail(function (err) {
        console.error(err);
      });
      return connectionPromise;
    }
    function loadNodeFtp() {
      var path = ExtensionUtils.getModulePath(module, "node/ftpDomain");
      var loadPromise = _node.loadDomains([path], true);
      loadPromise.fail(function (err) {
        console.error(err);
      });
      loadPromise.done(function (done) {
        eqftp.emit('event', {
          action: 'ready:app'
        });
        
        // Adding listener to Node
        _node.on("eqFTP:event", function (event, params) {
          console.log(params);
          eqftp.emit('event', params);
        });
      });
      return loadPromise;
    }
    utils.chain(connectNode, loadNodeFtp);
  });
});