const packageInfo = require("@asow/rollup-demo/package.json");
const { name, version } = packageInfo;
const { execSync } = require("child_process");

const runCommand = (command) => {
  let options = { stdio: "pipe" };
  return execSync(command, options).toString();
};

class AsowPackage {
  constructor(option) {
    const defaultObj = {
      current: true,
      all: false,
      newest: false,
    };

    const combineObj = Object.assign(defaultObj, option);
    const { current, all, newest } = combineObj;

    this.current = current;
    this.all = all;
    this.newest = newest;
  }

  checkVersion() {
    console.log(version);
    if (this.newest) {
      const npmPkgInfos = runCommand(`npm view ${name} --json`);
      const { versions } = JSON.parse(npmPkgInfos);
      console.log("最新的版本为：", versions[versions.length - 1]);
    }
  }

  updateVersion() {
    if (this.current) {
      execSync(`yarn add ${name}`, { stdio: "inherit" });
    }
    if (this.all) {
      console.log("yarn add xxx 1 ...");
      console.log("yarn add xxx 2 ...");
      console.log("yarn add xxx 3 ...");
    }
  }
}

module.exports = AsowPackage;
