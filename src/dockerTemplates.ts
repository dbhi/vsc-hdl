import * as vscode from 'vscode';
let showErrorMessage = vscode.window.showErrorMessage;
let showInformationMessage = vscode.window.showInformationMessage;
let showWarningMessage = vscode.window.showWarningMessage;

import { Template } from './dockerTemplate';
import { isString } from 'util';

export class Templates {

	private _templates = {};

	constructor(
		defaults: Array<any> = vscode.workspace.getConfiguration("docker").templates
	) {
		if (defaults.length > 0) {
			defaults.forEach( item => {
				this._templates[item["label"]] = new Template(
					item["interactive"],
					item["remove"],
					item["name"],
					item["volumes"],
					item["ports"],
					item["opts"],
					item["image"],
					item["args"],
					item["x11docker"] != undefined ? item["x11docker"].split(' ') : undefined
				);
			});
		}
	}

	private _addTemplate(
		label: string,
		description?: string,
		interactive?: boolean,
		remove?: boolean,
		command?: vscode.Command
	): void {
		this._templates[label] = new Template(
			false,
			true,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		);
	}

	async add(label?: string) {
		if (label === undefined) {
			label = "newtpl";
		}
		if (this._templates[label] != undefined) {
			label = await vscode.window.showInputBox(
				{"placeHolder": `Item with label '${label}' exists already! Select a new label...`}
			);
			switch (label) {
				case undefined:
				case '':
					return;
			}
		}
		this._addTemplate(label);
	}

	rm(label: string): void {
		if (label) {
			delete(this._templates[label]);
		}
	}

	private async _pickInteractive(): Promise<string> {
		let mode = await vscode.window.showQuickPick(
			["Daemon [-d]", "Interactive [-it]"], //, "Daemon TTY [-dt]", "TTY [-t]"
			{"placeHolder": `Select a mode...`}
		);
		if (mode === '') {
			return undefined;
		}
		return mode;
	}

	private async _pickRemove(): Promise<string> {
		let rm = await vscode.window.showQuickPick(
			["Yes", "No"],
			{"placeHolder": `Use option remove ('--rm')?`}
		);
		if (rm === '') {
			return undefined;
		}
		return rm;
	}

	private async _pickName(): Promise<string> {
		let name = await vscode.window.showInputBox(
			{"placeHolder": `Provide a name to the container or leave it empty...`}
		);
		switch (name) {
			case undefined:
			case '':
				return;
		}

		//let label = await vscode.window.showInputBox(
		//	["Yes", "No"],
		//	{"placeHolder": `Use option remove ('--rm')?`}
		//);
		//if (label === '') {
		//	return undefined;
		//}
		//return label;
	}

	async run(label: string) {
		if (!label) {
			showErrorMessage(`Templates [run]: undefined label!`);
			return;
		}
		let item: Template = this._templates[label];

		//if (item === undefined) {
		//const qp = vscode.window.createQuickPick();
		//qp.items = [
		//	new  vscode.window.QuickPickItem()
		//]
			//qp.value = "valmy";
		//qp.show();
			//return;
		//}
		//showWarningMessage(`Templates: 'run' not implemented yet.`);
		////vscode.window.showInformationMessage(`Successfully called run ${item}.`);

		//showWorkspaceFolderPick

		if (item.interactive === undefined) {
			switch (await this._pickInteractive()) {
				case "Daemon [-d]":
					item.interactive = false;
				//case "Daemon TTY [-dt]":
				//case "TTY [-t]":
				case "Interactive [-it]":
					item.interactive = true;
				default:
					return;
			}
		}

		if (item.remove === undefined) {
			switch (await this._pickRemove()) {
				case "Yes":
					item.remove = true;
				case "No":
					item.remove = false;
				default:
					return;
			}
		}

		if (item.name === undefined) {
			item.name = await this._pickName();
		}

		//edit volumes?
		//edit ports?
		//add options?
		//has image?
		//has command?
		showInformationMessage(`Should execute ${item.cmd}`);
	}

	get templates(): {} {
		return this._templates;
	}

	rmOpt(
		parent: string,
		type: string,
		value: string,
	): void {
		switch (type) {
			case 'interactive':
				showWarningMessage(`Templates: 'rmOpt' '${type}' not implemented yet ['${parent}', '${value}'].`);
				showWarningMessage(`Templates: 'rmOpt' '${type}' not implemented yet ['${parent}', '${value}'].`);
				break;
			case 'remove':
				delete(this._templates[parent]['remove']);
				showInformationMessage(`Successfully removed option 'remove' from template '${parent}'.`);
				break;
			case 'volume':
				showWarningMessage(`Templates: 'rmOpt' '${type}' not implemented yet ['${parent}', '${value}'].`);
				break;
			case 'port':
				showWarningMessage(`Templates: 'rmOpt' '${type}' not implemented yet ['${parent}', '${value}'].`);
				break;
			case 'option':
				showWarningMessage(`Templates: 'rmOpt' '${type}' not implemented yet ['${parent}', '${value}'].`);
				break;
			case 'image':
				showWarningMessage(`Templates: 'rmOpt' '${type}' not implemented yet ['${parent}', '${value}'].`);
				break;
			case 'arg':
				showWarningMessage(`Templates: 'rmOpt' '${type}' not implemented yet ['${parent}', '${value}'].`);
				break;
			default:
				showErrorMessage(`Unknown Docker Template property type ${type}.`);
		}
	}
}
