'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var MonkeyGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},

	askFor: function () {
		var done = this.async();

		this.log(chalk.yellow("                   __,__"));
		this.log(chalk.yellow("          .--.  .-\"     \"-.  .--."));
		this.log(chalk.yellow("         / .. \\/  .-. .-.  \\/ .. \\"));
		this.log(chalk.yellow("        | |  '|  /   Y   \\  |'  | |"));
		this.log(chalk.yellow("        | \\   \\  \\ 0 | 0 /  /   / |"));
		this.log(chalk.yellow("         \\ '- ,\\.-\"' '\"-./, -' /"));
		this.log(chalk.yellow("          ''-' /_   ^ ^   _\\ '-''"));
		this.log(chalk.yellow("          .--'|  \\._ _ _./  |'--. "));
		this.log(chalk.yellow("        /'    \\   \\.-.  /   /    '\\"));
		this.log(chalk.yellow("       /       '._/  |-' _.'       \\"));
		this.log(chalk.yellow("      /          ;  /--~'   |       \\"));
		this.log(chalk.yellow("     /        .'\\|.-\\--.     \\       \\"));
		this.log(chalk.yellow("    /   .'-. /.-.;\\  |\\|'~'-.|\\       \\"));
		this.log(chalk.yellow("    \\       '-./'|_\\_/ '     '\\'.      \\"));
		this.log(chalk.yellow("     '.      ;     ___)        '.';    /"));
		this.log(chalk.yellow("       '-.,_ ;     ___)          \\/   /"));
		this.log(chalk.yellow("        \\   ''------'\\       \\   '  /"));
		this.log(chalk.yellow("         '.    \\       '.      |   ;/_"));
		this.log(chalk.yellow("       ___>     '.       \\_ _ _/   ,  '--."));
		this.log(chalk.yellow("     .'   '.   .-~~~~~-. /     |--''~~-.  \\"));
		this.log(chalk.yellow("    // / .---'/  .-~~-._/ / / /---..__.'  /"));
		this.log(chalk.yellow("   ((_(_/    /  /      (_(_(_(---.__    .'"));
		this.log(chalk.yellow("             | |     _              '~~'"));
		this.log(chalk.yellow("             | |     \\'."));
		this.log(chalk.yellow("              \\ '....' |"));
		this.log(chalk.yellow("               '.,___.'"));
		this.log(chalk.yellow("===================================================="));
		this.log(chalk.yellow("                                                    "));

		// replace it with a short and sweet description of your generator
		this.log(chalk.magenta('You\'re using the Monkey Generator, this little monkey will do you job.'));

		var prompts = [{
				name: 'projectName',
				message: 'What do you want to call your project?',
				default: 'myProject'
			},
			{
				name: 'projectDescription',
				message: 'Tell me a brief description of the project',
				default: 'Project Description'	
			},
			{
				name: 'authorName',
				message: "What's your name?",
				default: 'author'
			},
			{
				type: 'confirm',
				name: 'defaultOpt',
				message: 'Do you want Monkey default configuration to your project?',
				default: true
			},
			{
				type: 'list',
				name: 'cssOption',
				message: 'What CSS preprocessor do you want to use?',
				choices: [{
						name: "SASS (with Compass)",
						value: "sass"
				},
				{
						name: "LESS (with Less Hat)",
						value: "less"
				},
				{
						name: "STYLUS (with NIB)",
						value: "stylus"
				},
				{
						name: "None",
						value: "none"
				}],
				when: function( props ) {
						return props.defaultOpt == false;
				}
			},
			{
				type: 'list',
				name: 'jsOption',
				message: 'What JS library do you prefer?',
				choices: [{
						name: "jQuery (1.*)",
						value: "jquery"
				},
				{
						name: "Zepto",
						value: "zepto"
				},
				{
						name: "None",
						value: "none"
				}],
				when: function( props ) {
						return props.defaultOpt == false;
				}
			},
			{
				type: 'confirm',
				name: 'jsHint',
				message: 'Do you want Grunt to use jsHint? (Y)',
				default: true,
				when: function( props ) {
						return props.defaultOpt == false;
				}
			},
			{
				type: 'confirm',
				name: 'jsRespond',
				message: 'Your project will be responsive? (Y)',
				default: true,
				when: function( props ) {
						return props.defaultOpt == false;
				}
			},
			{
				type: 'confirm',
				name: 'jsPlaceholder',
				message: 'Are you going to use placeholders for old IE\'s? (Y)',
				default: true,
				when: function( props ) {
						return props.defaultOpt == false;
				}
			}];

		this.prompt(prompts, function (props) {
		    this.defaultOpt = props.defaultOpt;
		    this.projectName = props.projectName;
		    this.authorName = props.authorName;
		    this.projectDescription = props.projectDescription;
		    var that = this;

		    if(this.defaultOpt == false) {
		        this.cssOption = props.cssOption;
		        this.jsOption = props.jsOption;
		        this.jsRespond = props.jsRespond;
		        this.jsPlaceholder = props.jsPlaceholder;
		        this.jsHint = props.jsHint;
		    }
		    else {
		        this.cssOption = 'sass';
		        this.jsOption = 'jquery';
		        this.jsRespond = false;
		        this.jsPlaceholder = false;
		        this.jsHint = true;
		    }

		    this.devDependencies = (function() {
		        var optionalDependencies = {
		            less: '"grunt-contrib-less": "~0.8.3"',
		            sass: '"grunt-contrib-compass": "~0.7.0"',
		            stylus: '"grunt-contrib-stylus": "~0.11.0"',
		            nib: '"nib": "~1.0.0"',
		            jshint: '"grunt-contrib-jshint": "~0.8.0"',
		            cssmin: '"grunt-contrib-cssmin": "~0.7.0"',
		        },
		            devDependencies = [
		                '"grunt": "~0.4.2"',
		                '"grunt-notify": "~0.2.16"',
		                '"grunt-contrib-uglify": "~0.2.7"',
		                '"grunt-contrib-watch": "~0.5.3"',
		                '"grunt-contrib-connect": "~0.6.0"',
		                '"grunt-contrib-copy": "~0.5.0"',
		                '"grunt-contrib-imagemin": "~0.4.0"'
		            ];

		        if(that.cssOption.indexOf('sass') !== -1) {
		            devDependencies.push(optionalDependencies.sass);
		        }

		        if(that.cssOption.indexOf('less') !== -1) {
		            devDependencies.push(optionalDependencies.less);
		        }

		        if(that.cssOption.indexOf('stylus') !== -1) {
		            devDependencies.push(optionalDependencies.stylus);
		            devDependencies.push(optionalDependencies.nib);
		        }

		        if(that.cssOption.indexOf('none') !== -1) {
		            devDependencies.push(optionalDependencies.cssmin)
		        }

		        if(that.jsHint) {
		            devDependencies.push(optionalDependencies.jshint);
		        }

		        return devDependencies;

		    }());

		    done();
		  }.bind(this));
	},

	packageJSON: function() {
	  this.template('_package.json', 'package.json');
	},

	git: function() {
	  this.copy('gitignore', '.gitignore');
	  this.copy('gitattributes', '.gitattributes');
	},	

	bower: function() {
	  this.copy('bowerrc', '.bowerrc');
	  this.copy('_bower.json', 'bower.json');
	},	

	editorConfig: function() {
	  this.copy('editorconfig', '.editorconfig');
	},	

	favicon: function() {
	  this.copy('favicon.ico', 'dev/favicon.ico');
	},	

	app: function() {
	  console.log("Creating main folders...");

	  this.mkdir('dist');
	  this.mkdir('dev');

	  // build folders

	  this.mkdir('dist/css');
	  this.mkdir('dist/js');
	  this.mkdir('dist/fonts');
	  this.mkdir('dist/img');

	  // dev folders

	  this.mkdir('dev/css');
	  this.mkdir('dev/js');
	  this.mkdir('dev/fonts');
	  this.mkdir('dev/img');
	  this.mkdir('dev/img/_src');
	},	

	cssFolder: function() {
	    console.log("Creating CSS preprocessor folders...");

	    if(this.cssOption == "sass") {
	        this.mkdir('dev/css/sass');
	    }
	    else if (this.cssOption == "less") {
	        this.mkdir('dev/css/less');
	    }
	    else if (this.cssOption == "stylus") {
	        this.mkdir('dev/css/stylus');
	    }
	},

	htmlFile: function() {
	    console.log("Moving index.html to its place...");

	    this.template('_index.html', 'dev/index.html');
	},

	jsLibrary: function() {
	  if(this.jsOption == "jquery") {
	    console.log('Installing jQuery...');

	    this.bowerInstall([ 'jquery#1.*' ], { save: true }); 
	  }
	  if(this.jsOption == "zepto") {
	    console.log('Installing Zepto...');

	    this.bowerInstall([ 'zeptojs' ], { save: true });
	  }
	},

	jsRespond: function() {
	  console.log('Installing Respond...');

	  if(this.jsRespond) {
	    this.bowerInstall([ 'respond' ], { save: true });
	  } 
	},

	jsPlaceholder: function() {
	  console.log('Installing Placeholders.js...');

	  if(this.jsPlaceholder) {
	    this.bowerInstall([ 'Placeholders.js-bower' ], { save: true });
	  }
	},

	jsFile: function() {
	    console.log('Putting Scripts.js in the right place...');

	    this.template('js/scripts.js', 'dev/js/scripts.js');
	},

	preprocessorFiles: function() {
	    console.log('Moving the preprocessor files...');

	    if(this.cssOption.indexOf('sass') !== -1) {
	        this.copy('sass/_imports.scss', 'dev/css/sass/_imports.scss');
	        this.copy('sass/style.scss', 'dev/css/sass/style.scss');
	    }

	    if(this.cssOption.indexOf('stylus') !== -1) {
	        this.copy('stylus/style.styl', 'dev/css/stylus/style.styl');
	        this.copy('stylus/imports.styl', 'dev/css/stylus/imports.styl');
	        this.bowerInstall([ 'nib' ], { save: true });
	    }

	    if(this.cssOption.indexOf('less') !== -1) {
	        this.copy('less/style.less', 'dev/css/less/style.less');
	        this.copy('less/imports.less', 'dev/css/less/imports.less');
	        this.bowerInstall([ 'lesshat' ], { save: true });
	    }
	},

	Gruntfile: function() {
	    this.template('_Gruntfile.js', 'Gruntfile.js');
	}
});

module.exports = MonkeyGenerator;