/*jshint node: true */
'use strict';

var VERSIONS = {
  'core': '~2.2.2',
  'components': '~2.2.0',
  'dataviz': '~2.1.1',
  'extras': '~2.1.1',
  'material': '~2.1.4',
  'bootstrap-2': '~2.1.2',
  'bootstrap-3': '~2.1.2',
  'business-theme': '~1.1.3',
  'simple-theme': '~3.1.1',
  'angular-mocks': '~1.4.8'
};

var generators = require('yeoman-generator'),
    _ = require('lodash'),
    defaultConfig = require('./default-config'),
    welcome =
        ' __      _________________   ' + '\n' +
        '/  \\    /  \\_____  \\   _  \\  ' + '\n' +
        '\\   \\/\\/   //  ____/  / \\  \\ ' + '\n' +
        ' \\        //       \\  \\_/  /' + '\n' +
        '  \\__/\\__/ \\________\\_____/' + '\n';


var w20Project = {
    fragment: '',
    w20Fragments: [],
    w20App: {},
    theme: '',
    bower: {}
};

module.exports = generators.Base.extend({

    _print: function (msg) {
        this.log('\n' + msg + '\n');
    },

    _prompt: function (config, callback) {
        var self = this;

        var done = self.async();
        self.prompt(config, function (answers) {

            callback(answers);
            done();

        }.bind(self));
    },

    constructor: function () {
        generators.Base.apply(this, arguments);
    },

    initializing: function () {
        this.log(welcome);
    },

    prompting: {

        fragment: function () {
            var self = this;

            self._prompt({
                type: 'input',
                name: 'name',
                message: 'Your project fragment name ?',
                default: this.appname
            }, function (answers) {

                answers.name = answers.name.split(' ').join('-');
                w20Project.fragment = answers.name;

            }, self);
        },

        w20Fragments: function () {
            var self = this;

            self._prompt({
                type: 'checkbox',
                name: 'w20Fragments',
                message: 'W20 fragments to use in addition to core ? ',
                choices: ['components', 'dataviz', 'extras'],
                default: []
            }, function (answers) {

                w20Project.w20Fragments = answers.w20Fragments.concat(['core']);

            }, self);
        },

        w20CSSFramework: function () {
            var self = this;

            self._prompt({
                type: 'list',
                name: 'cssFramework',
                message: 'CSS framework to use ? ',
                choices: ['bootstrap-3', 'material', 'none', '[deprecated] bootstrap-2'],
                default: ['bootstrap-3']
            }, function (answers) {
                if (answers.cssFramework !== 'none') {
                    w20Project.w20Fragments = w20Project.w20Fragments.concat(answers.cssFramework);
                }
            }, self);
        },

        theme: function () {
            var self = this;

            self._prompt({
                type: 'list',
                name: 'theme',
                message: 'Use a W20 theme ?',
                choices: ['business-theme', 'simple-theme', 'none'],
                default: ['business-theme'],
                when: function () {
                    return _.includes(w20Project.w20Fragments, 'bootstrap-3');
                }
            }, function (answers) {

                if (answers.theme !== 'none') {
                    w20Project.theme = answers.theme;
                    w20Project.w20Fragments = w20Project.w20Fragments.concat(w20Project.theme);
                }
            }, self);
        }
    },

    configuring: function () {
        this._print('Configuring application...');

        var dependencies = {};

        // Add required fragments to bower.json dependencies
        _.each(w20Project.w20Fragments, function (fragment) {
            dependencies['w20-' + fragment] = VERSIONS[fragment];
        });

        dependencies['w20'] = dependencies['w20-core'];
        delete dependencies['w20-core'];

        if (w20Project.theme) {
            dependencies['w20-' + w20Project.theme] = VERSIONS[w20Project.theme];
        }

        w20Project.bower = {
            name: w20Project.fragment,
            version: '0.0.1',
            dependencies: dependencies,
            devDependencies: {
              'angular-mocks': VERSIONS['angular-mocks']
            }
        };

        // Set the home view path
        defaultConfig.core.definition.modules.application.home = '/' + w20Project.fragment + '/' + 'content';

        // Add the user fragment
        w20Project.w20App[w20Project.fragment + '/' + w20Project.fragment + '.w20.json'] = {};

        // Set the w20 fragments default config
        _.each(w20Project.w20Fragments, function (fragment) {
            var fragmentConf = defaultConfig[fragment];

            if (fragmentConf) {
                w20Project.w20App[fragmentConf.path] = fragmentConf.definition;
            }

        });
    },

    writing: function () {
        this._print('Writing...');

        var self = this,
            tplContext = { title: w20Project.fragment };

        self.fs.copyTpl(
            this.templatePath('root'),
            this.destinationPath('.'),
            tplContext
        );

        // copy dot files
        self.fs.copy(
            this.templatePath('root/.*'),
            this.destinationPath('.'),
            tplContext
        );

        self.fs.copyTpl(
            this.templatePath('basic-fragment'),
            this.destinationPath(w20Project.fragment),
            tplContext
        );

        self.fs.copyTpl(
            this.templatePath('basic-fragment.w20.json'),
            this.destinationPath(w20Project.fragment + '/' + w20Project.fragment + '.w20.json'),
            tplContext
        );

        self.fs.write(this.destinationPath('w20.app.json'), JSON.stringify(w20Project.w20App, null, 4));

        self.fs.write(this.destinationPath('bower.json'), JSON.stringify(w20Project.bower, null, 4));
    },

    conflicts: function () {

    },

    install: function () {
        var self = this;

        self._print('Installing dependencies...');

        this.installDependencies({ callback: function () {
            self._print('Done Installing dependencies\n');
        }});
    },

    end: function () {
        this._print('Done.\n');
        this._print('If you got dependencies errors with npm, try running npm cache clean && npm install\n');
        this._print('If you got dependencies errors with bower, try removing the bower_components and do a bower install\n');
        this._print('Enter "grunt connect" to start the app');
    }
});
