#!/usr/bin/env node
const { program } = require("commander");
const packageInfo = require("@asow/rollup-demo/package.json");
const AsowPackage = require("./asowPackage");

program
  .version(packageInfo.version, "-v, --version", "查看当前包版本")
  .command("version")
  .description("查看当前包版本")
  .option("-n --newest", "是否是最新版")
  .action((cmd) => {
    const { newest } = cmd;
    const instance = new AsowPackage({ newest });
    instance.checkVersion();
  });

program
  .command("upgrade")
  .description("升级包版本到最新版")
  .option("-c, --current", "升级已安装的当前包")
  .option("-a, --all", "升级已安装@asow的所有包")
  .action((cmd) => {
    const { current, all } = cmd;
    const instance = new AsowPackage({ current, all });
    instance.updateVersion();
  });

program.parse(process.argv);
