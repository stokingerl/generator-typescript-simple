"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const slugify = require("slugify");

module.exports = class extends Generator {
  constructor(args, options, features) {
    super(args, options, features);

    this.env.options.nodePackageManager = "yarn";
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the barely mediocre ${chalk.red(
          "generator-typescript-simple"
        )} generator!`
      )
    );

    const prompts = [
      {
        name: "appName",
        message: "What's the name of the application?",
        default: slugify(this.appname)
      },
      {
        name: "description",
        message: "What is the app's description?",
        default: "This application could be improved a bit."
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const plainFiles = [
      "src/__tests__/index.spec.ts",
      "src/index.ts",
      ".editorconfig",
      ".eslintignore",
      ".eslintrc",
      ".gitignore",
      "jest.config.js",
      "tsconfig.json"
    ];
    const tplFiles = ["package.json", "README.md"];

    plainFiles.forEach(file => {
      this.fs.copy(this.templatePath(file), this.destinationPath(file));
    });
    tplFiles.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      );
    });
  }
};
