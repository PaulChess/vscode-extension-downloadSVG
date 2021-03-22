const vscode = require('vscode');
const fse = require('fs-extra');

function logger(type, msg = '') {
  switch(type) {
    case 'success':
      return vscode.window.showInformationMessage(`Success: ${msg}`);
    case 'warning':
      return vscode.window.showWarningMessage(`Warning: ${msg}`);
    case 'error':
      return vscode.window.showErrorMessage(`Failed: ${msg}`);
  }
}

module.exports = {
  logger,
  generators: {
    createFile: (file, data) => {
      new Promise(resolve => {
        let output = fse.outputFile(file, data);
        resolve(output);
      })
    },
    createSvgFile(svgDir, svgName, fileContent) {
      let fileName = `${svgDir}/svgFolders/${svgName}.svg`;
      return this.createFile(fileName, fileContent);
    }
  }
}