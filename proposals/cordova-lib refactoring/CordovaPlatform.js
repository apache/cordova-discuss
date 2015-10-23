/* jshint node:true, unused:false */

var path = require('path');
var BuildConfig = require('cordova-common').BuildConfig;
var ConfigParser = require('cordova-common').ConfigParser;

/**
 * Encapsulates and stores platform's information.
 *
 * @class
 */
function CordovaPlatform(root) {
    /**
     * Simple object that exposes platform's filesystem locations, such as www
     *   directory.
     *
     * @type  {Object}
     */
    this.locations = {
        /** @type {String} Platform's www directory location */
        www: path.join(root, 'www'),
        /** @type {String} Platform's config.xml file location  */
        configXml: path.join(root, 'config.xml'),
        /**
         * Location of cordova.js that shipped with platform.
         *   NOTE: THIS PATH IS NOT ABSOLUTE. IT IS RELATIVE TO PLATFORM'S
         *   ORIGINAL PACKAGE DIRECTORY, NOT THE INSTALLED PLATFORM'S LOCATION.
         *
         * @type  {String}
         */
        cordovaJs: path.join('bin', 'template', 'www', 'cordova.js'),
        /**
         * Location of platform's cordova.js sources, shipped with platform.
         *   NOTE: THIS PATH IS NOT ABSOLUTE. IT IS RELATIVE TO PLATFORM'S
         *   ORIGINAL PACKAGE DIRECTORY, NOT THE INSTALLED PLATFORM'S LOCATION.
         *
         * @type  {String}
         */
        cordovaJsSrc: 'cordova-js-src'
    };

    /**
     * The installed platform's root location.
     *
     * @type {String}
     */
    this.root = root;

    /**
     * Represents the platform's design-time and runtime configuration which
     *   stored in config.xml file.
     *
     * @type  {ConfigParser}
     */
    this.projectConfig = new ConfigParser(this.locations.configXml);
}
