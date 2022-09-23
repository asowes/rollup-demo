const { exec } = require("child_process");
const fs = require("fs");
const packageInfo = require("../dist/package.json");
const path = require("path");

const { name } = packageInfo;

const distCwd = path.resolve(__dirname, "..", "dist");

const runCommand = (command, cwd) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        resolve("");
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};

(async () => {
  const npmPkgInfos = await runCommand(`npm view ${name} --json`);
  const { versions } = JSON.parse(npmPkgInfos);
  packageInfo.version = versions[versions.length - 1];

  await runCommand("npm version patch", distCwd);
  await runCommand("npm publish", distCwd);
})();
