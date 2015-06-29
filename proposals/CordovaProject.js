/* jshint node:true, unused:false */

var path = require('path');
var BuildConfig = require('cordova-common').BuildConfig;
var ConfigParser = require('cordova-common').ConfigParser;

/**
 * Encapsulates and stores project information.
 *
 * @class
 */
function CordovaProject(root) {
    /**
     * Simple object that exposes this project's filesystem locations, such as www
     *   directory.
     *
     * @type  {Object}
     */
    this.locations = {
        /** @type {String} Www directory location */
        www: path.join(root, 'www'),
        /** @type {String} config.xml file location  */
        configXml: path.join(root, 'config.xml'),
        /** @type {String } Installed platforms location */
        platforms: path.join(root, 'platforms')
    };

    /**
     * The project's root location.
     *
     * @type {String}
     */
    this.root = root;

    /**
     * Represents the configuration, used for building project. Populated with
     *   values from buildconfig.json, if exists, or with some default values,
     *   if not.
     *
     * @type {BuildConfig}
     */
    this.buildConfig = new BuildConfig(root);

    /**
     * Represents the project design-time and runtime configuration which stored in
     *   project's config.xml file.
     *
     * @type  {ConfigParser}
     */
    this.projectConfig = new ConfigParser(this.locations.configXml);
}
