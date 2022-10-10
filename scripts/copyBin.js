const fs = require("fs");
const path = require("path");

const copiedPath = "../src/bin";
const resultPath = "../dist/bin";

/**
 * 复制文件夹
 *
 * @param copiedPath 要复制的文件夹路径
 * @param resultPath 复制到的文件夹路径
 * @param direct 是否是文件夹
 */
const copyBinFolder = (copiedPath, resultPath, direct) => {
  if (!direct) {
    copiedPath = path.join(__dirname, copiedPath);
    resultPath = path.join(__dirname, resultPath);
  }

  if (!fs.existsSync(copiedPath)) {
    console.log("要复制的文件路径不存在：", copiedPath);
    return;
  }

  if (fs.existsSync(resultPath)) {
    deleteFolder(resultPath);
  }

  createDir(resultPath);

  const files = fs.readdirSync(copiedPath, { withFileTypes: true });
  for (let i = 0; i < files.length; i++) {
    const cf = files[i];
    const ccp = path.join(copiedPath, cf.name);
    const crp = path.join(resultPath, cf.name);

    if (cf.isFile()) {
      const readStream = fs.createReadStream(ccp);
      const writeStream = fs.createWriteStream(crp);
      readStream.pipe(writeStream);
    } else {
      try {
        fs.accessSync(path.join(crp, ".."), fs.constants.W_OK);
        copyBinFolder(ccp, crp, true);
      } catch (error) {
        console.log("文件夹写入错误", error);
      }
    }
  }
};

const createDir = (dirPath) => {
  fs.mkdirSync(dirPath);
};

/**
 * 删除文件夹
 *
 * @param delPath 要删除的文件夹路径
 */
const deleteFolder = (delPath) => {
  try {
    if (!fs.existsSync(delPath)) {
      console.log("要删除的文件夹路径不存在：", delPath);
      return;
    }
    const delFn = (address) => {
      const files = fs.readdirSync(address);
      for (let i = 0; i < files.length; i++) {
        const dirPath = path.join(address, files[i]);
        if (fs.statSync(dirPath).isDirectory()) {
          delFn(dirPath);
        } else {
          deleteFile(dirPath, true);
        }
      }
      fs.rmdirSync(address);
    };
    delFn(delPath);
  } catch (error) {
    console.log("文件夹删除错误", error);
  }
};

/**
 * 删除文件
 *
 * @param delPath 要删除的文件路径
 * @param direct 是否是文件夹
 */
const deleteFile = (delPath, direct) => {
  delPath = direct ? delPath : path.join(__dirname, delPath);
  try {
    if (!fs.existsSync(delPath)) {
      console.log("要删除的文件路径不存在：", delPath);
    }
    fs.unlinkSync(delPath);
  } catch (error) {
    console.log("文件删除错误", error);
  }
};

/**
 * run
 */
(() => {
  copyBinFolder(copiedPath, resultPath);
})();
