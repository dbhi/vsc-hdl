'use strict';

import * as vscode from 'vscode';

import { DockerTemplatesProvider } from './dockerTemplates';
//import { ProjectsProvider } from './hdlProjects';
//import { ResultsProvider } from './hdlResults';
import { FileExplorer } from './fileExplorer';
//import { TestView } from './testView';


export function activate(context: vscode.ExtensionContext) {

	vscode.window.registerTreeDataProvider('dockerTemplates', new DockerTemplatesProvider());
	//vscode.window.registerTreeDataProvider('hdlProjects', new ProjectsProvider());
	//vscode.window.registerTreeDataProvider('hdlResults', new ResultsProvider());

	vscode.commands.registerCommand('dockerTemplates.addTemplate', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
	vscode.commands.registerCommand('dockerTemplates.rmTemplate', () => vscode.window.showInformationMessage(`Successfully called remove entry.`));
	vscode.commands.registerCommand('dockerTemplates.runTemplate', () => vscode.window.showInformationMessage(`Successfully called run entry.`));
	vscode.commands.registerCommand('dockerTemplates.inspectTemplate', () => vscode.window.showInformationMessage(`Successfully called inspect entry.`));

	// Samples of `window.createView`
	new FileExplorer(context);

	// Test View
	//new TestView(context);
}


export function deactivate() {}
