import * as vscode from 'vscode';
//import { ProjectsProvider } from './hdlProjects';
import { ResultsProvider } from './hdlResults';


export function activate(context: vscode.ExtensionContext) {

//	vscode.workspace.findFiles('**/*.py', '**/{node_modules,vunit_out,.tox}/**').then(

	//vscode.window.registerTreeDataProvider('hdlProjects', new ProjectsProvider());
	vscode.window.registerTreeDataProvider('hdlResults', new ResultsProvider());

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}


export function deactivate() {}
