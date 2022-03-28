"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-typescript-simple:app", () => {
  const prompts = {
    appName: "test name",
    description: "test description"
  };

  const setUp = async prompts =>
    helpers.run(path.join(__dirname, "../generators/app")).withPrompts(prompts);

  it("creates files", async () => {
    await setUp(prompts);
    assert.file(".vscode/launch.json");
    assert.file("src/__tests__/index.spec.ts");
    assert.file("src/index.ts");
    assert.file(".editorconfig");
    assert.file(".eslintignore");
    assert.file(".eslintrc");
    assert.file(".gitignore");
    assert.file("jest.config.js");
    assert.file("package.json");
    assert.file("README.md");
    assert.file("tsconfig.json");
  });

  it("writes appropriate content to the files", async () => {
    await setUp(prompts);
    assert.fileContent("package.json", /"name": "test name"/);
    assert.fileContent("package.json", /"description": "test description"/);
    assert.fileContent("README.md", /# test name/);
    assert.fileContent("README.md", /test description/);
    assert.fileContent(".gitignore", /node_modules/);
  });
});
