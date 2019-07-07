'use strict';

import * as vscode from 'vscode';

import { ProjectsProvider } from './hdlProjects';
import { ResultsProvider } from './hdlResults';
import { FileExplorer } from './fileExplorer';
//import { TestView } from './testView';


export function activate(context: vscode.ExtensionContext) {

	vscode.window.registerTreeDataProvider('hdlProjects', new ProjectsProvider());
	vscode.window.registerTreeDataProvider('hdlResults', new ResultsProvider());

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.commands.registerCommand('extension.helloWorld', () => vscode.window.showInformationMessage('Hello World!'));

	// Samples of `window.createView`
	new FileExplorer(context);

	// Test View
	//new TestView(context);
}


export function deactivate() {}
