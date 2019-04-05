import { EventEmitter } from 'events';

export default class localStoragesManager {
  static storages = {};
  static events = Object.assign({}, EventEmitter.prototype, {
    emitChange: function(storageKey) {
        this.emit(storageKey);
    },

    addChangeListener: function(storageKey, callback) {
        this.on(storageKey, callback);
    },

    removeChangeListener: function(storageKey, callback) {
        this.removeListener(storageKey, callback);
    }
  });

  static setStorage(storageKey, content)
  {
    if(localStoragesManager.storages[storageKey] === undefined || Array.isArray(content))
      localStoragesManager.storages[storageKey] = content;
    else
    {
      for(key in content)
        localStoragesManager.storages[storageKey][key] = content[key];
    }
    localStoragesManager.events.emitChange(storageKey);
  }

  static getStorage(storageKey)
  {
    return localStoragesManager.storages[storageKey];
  }

  static addStorageChangeListener(storageKey, callback)
  {
    localStoragesManager.events.addChangeListener(storageKey, callback);
  }

  static removeStorageChangeListener(storageKey, callback)
  {
    localStoragesManager.events.removeChangeListener(storageKey, callback);
  }
}