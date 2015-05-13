var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('name', {type: String, required: false, default: this.appname});

    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });
    this.option('skip-install-message', {
      desc:     'Whether commands run should be shown',
      defaults: false,
    });
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      type    : 'input',
      name    : 'description',
      message : 'Project description',
      default : 'A general purpose aronnax module.'
    },
    {
      type    : 'input',
      name    : 'author',
      message : 'Project author',
      default : 'Marco Segreto<msegreto@miceover.com>'
    },
    {
      type    : 'input',
      name    : 'email',
      message : 'Project author email (npm email)',
      default : 'msegreto@miceover.com'
    },
    {
      type    : 'input',
      name    : 'repo',
      message : 'Project respository',
    },
    {
      type    : 'confirm',
      name    : 'integration',
      message : 'Would you like integration tests',
    }
    ];

    this.prompt(prompts, function(answers) {
      this.description = answers.description;
      this.author = answers.author;
      this.email = answers.email;
      this.repo = answers.repo || 'git@github.com:aronnax/' + this.name + '.git';
      this.integration = answers.integration;

      done();
    }.bind(this));
  },

  app: function() {
    this.mkdir('src');
    this.mkdir('test');
    this.mkdir('test/unit');
    this.copy('gitignore', '.gitignore');
    this.copy('eslintrc', '.eslintrc');
    this.copy('npmignore', '.npmignore');

    this.copy('test/setup.js', 'test/setup.js');
    this.copy('test/unit_testem.json', 'test/unit_testem.json');
    this.copy('test/unit.js', 'test/unit.js');
    if (this.integration) {
      this.copy('test/integration_testem.json', 'test/integration_testem.json');
      this.copy('test/integration.js', 'test/integration.js');
    }

    this.template('bower.json');
    this.template('_package.json', 'package.json');
    this.template('travis.yml', '.travis.yml');
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-install-message'],
    });
  }
});
