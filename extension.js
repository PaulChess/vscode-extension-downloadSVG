const vscode = require('vscode');
const req = require('request');
const { logger, generators } = require('./utils');

let globalSvgName = '';

function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.download', uri => {
    new Promise(resolve => {
      vscode.window
        .showInputBox({
          prompt: 'Enter svg name'
        })
        .then(inputValue => resolve(inputValue))
    })
      .then(svgName => {
        if (svgName.length === 0) {
          logger('error', 'svg name can not be empty!');
          throw new Error('svg name can not be empty');
        }
        let svgDir = uri.fsPath;
        globalSvgName = svgName;
        
        // 调用接口获取
        req.get('https://cate.10jqka.com.cn/advanceddiagnosis/aggs/getinfo?_=1616427128823&stockcode=600031', (err, response, body) => {
          // 写文件
          // todo: svg文件压缩和处理
          // todo: 批量下载一个模块的所有svg图标
          if (body !== '' && body !== null && body !== undefined) {
            const data = (JSON.parse(body)).data.company.companyAnalyse;
            return generators.createSvgFile(svgDir, svgName, data);
          } else {
            // 如果没查到要给出错误提示
          }
        })
      })
      .then(
        () => logger('success', `${globalSvgName}.svg download successfully!`),
        err => logger('error', err.message)
      );
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
