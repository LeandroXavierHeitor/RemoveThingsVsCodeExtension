import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('removethings.removeConsoleLog', () => {
		vscode.workspace.findFiles('**/*.js').then((files) => {
			files.forEach((file) => {
				vscode.workspace.openTextDocument(file).then((document) => {
					let text = document.getText();
					let newText = text.replace(/console\.log\((.*?)\);/g, '');
					let edit = new vscode.WorkspaceEdit();
					edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), newText);
					vscode.workspace.applyEdit(edit);
				});
			});
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
