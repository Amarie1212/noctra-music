"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/electron@33.4.11/node_modules/electron/index.js
var require_electron = __commonJS({
  "../../node_modules/.pnpm/electron@33.4.11/node_modules/electron/index.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var pathFile = path.join(__dirname, "path.txt");
    function getElectronPath() {
      let executablePath;
      if (fs.existsSync(pathFile)) {
        executablePath = fs.readFileSync(pathFile, "utf-8");
      }
      if (process.env.ELECTRON_OVERRIDE_DIST_PATH) {
        return path.join(process.env.ELECTRON_OVERRIDE_DIST_PATH, executablePath || "electron");
      }
      if (executablePath) {
        return path.join(__dirname, "dist", executablePath);
      } else {
        throw new Error("Electron failed to install correctly, please delete node_modules/electron and try installing again");
      }
    }
    module2.exports = getElectronPath();
  }
});

// electron/preload.ts
var import_electron = __toESM(require_electron());
import_electron.contextBridge.exposeInMainWorld("api", {
  // Window controls
  window: {
    minimize: () => import_electron.ipcRenderer.send("window:minimize"),
    maximize: () => import_electron.ipcRenderer.send("window:maximize"),
    close: () => import_electron.ipcRenderer.send("window:close"),
    isMaximized: () => import_electron.ipcRenderer.invoke("window:isMaximized"),
    getVersion: () => import_electron.ipcRenderer.invoke("app:getVersion"),
    onMaximizeChange: (cb) => {
      const listener = (_event, value) => cb(Boolean(value));
      import_electron.ipcRenderer.on("window:maximize-changed", listener);
      return () => import_electron.ipcRenderer.removeListener("window:maximize-changed", listener);
    }
  },
  // Dialog
  dialog: {
    openFiles: () => import_electron.ipcRenderer.invoke("dialog:openFiles"),
    openImages: () => import_electron.ipcRenderer.invoke("dialog:openImages"),
    openJson: () => import_electron.ipcRenderer.invoke("dialog:openJson"),
    saveJson: (defaultFileName) => import_electron.ipcRenderer.invoke("dialog:saveJson", { defaultFileName }),
    openFolder: () => import_electron.ipcRenderer.invoke("dialog:openFolder")
  },
  // File utilities
  file: {
    readAsBase64: (path) => import_electron.ipcRenderer.invoke("file:readAsBase64", path),
    readText: (path) => import_electron.ipcRenderer.invoke("file:readText", path),
    writeText: (filePath, content) => import_electron.ipcRenderer.invoke("file:writeText", { filePath, content })
  },
  // Metadata
  metadata: {
    parse: (filePath) => import_electron.ipcRenderer.invoke("metadata:parse", filePath)
  },
  // Folder scan
  folder: {
    scan: (folderPath) => import_electron.ipcRenderer.invoke("folder:scan", folderPath)
  },
  // Library
  library: {
    getAll: () => import_electron.ipcRenderer.invoke("library:getAll"),
    addTracks: (tracks) => import_electron.ipcRenderer.invoke("library:addTracks", tracks),
    removeTrack: (id) => import_electron.ipcRenderer.invoke("library:removeTrack", id),
    updateTrack: (track) => import_electron.ipcRenderer.invoke("library:updateTrack", track),
    updateArtwork: (id, artworkData) => import_electron.ipcRenderer.invoke("library:updateArtwork", { id, artworkData }),
    setArtworkFromFile: (id, filePath) => import_electron.ipcRenderer.invoke("library:setArtworkFromFile", { id, filePath }),
    updatePlayCount: (id) => import_electron.ipcRenderer.invoke("library:updatePlayCount", id),
    search: (query) => import_electron.ipcRenderer.invoke("library:search", query)
  },
  // Playlists
  playlists: {
    getAll: () => import_electron.ipcRenderer.invoke("playlists:getAll"),
    create: (name) => import_electron.ipcRenderer.invoke("playlists:create", name),
    rename: (id, name) => import_electron.ipcRenderer.invoke("playlists:rename", { id, name }),
    delete: (id) => import_electron.ipcRenderer.invoke("playlists:delete", id),
    addTrack: (playlistId, trackId) => import_electron.ipcRenderer.invoke("playlists:addTrack", { playlistId, trackId }),
    addTracks: (playlistId, trackIds) => import_electron.ipcRenderer.invoke("playlists:addTracks", { playlistId, trackIds }),
    removeTrack: (playlistId, trackId) => import_electron.ipcRenderer.invoke("playlists:removeTrack", { playlistId, trackId }),
    removeTracks: (playlistId, trackIds) => import_electron.ipcRenderer.invoke("playlists:removeTracks", { playlistId, trackIds }),
    reorder: (playlistId, trackIds) => import_electron.ipcRenderer.invoke("playlists:reorder", { playlistId, trackIds }),
    updateArtwork: (id, artworkData) => import_electron.ipcRenderer.invoke("playlists:updateArtwork", { id, artworkData }),
    setCoverFromFile: (id, filePath) => import_electron.ipcRenderer.invoke("playlists:setCoverFromFile", { id, filePath })
  },
  // Settings
  settings: {
    get: () => import_electron.ipcRenderer.invoke("settings:get"),
    save: (settings) => import_electron.ipcRenderer.invoke("settings:save", settings)
  },
  // Lyrics
  lyrics: {
    fetchOnline: (args) => import_electron.ipcRenderer.invoke("lyrics:fetchOnline", args),
    loadLocal: (filePath) => import_electron.ipcRenderer.invoke("lyrics:loadLocal", filePath),
    saveLocal: (filePath, content) => import_electron.ipcRenderer.invoke("lyrics:saveLocal", { filePath, content })
  },
  // Theme
  theme: {
    set: (mode) => import_electron.ipcRenderer.send("theme:set", mode)
  },
  updates: {
    getState: () => import_electron.ipcRenderer.invoke("updates:getState"),
    check: () => import_electron.ipcRenderer.invoke("updates:check"),
    download: () => import_electron.ipcRenderer.invoke("updates:download"),
    install: () => import_electron.ipcRenderer.invoke("updates:install"),
    onStatusChange: (cb) => {
      const listener = (_event, value) => cb(value);
      import_electron.ipcRenderer.on("updates:status", listener);
      return () => import_electron.ipcRenderer.removeListener("updates:status", listener);
    }
  }
});
