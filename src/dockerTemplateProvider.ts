import * as vscode from 'vscode';
let showWarningMessage = vscode.window.showWarningMessage;

import { Templates } from './dockerTemplates';
import { TemplateTreeItem } from './dockerTemplateTreeItem';
import { TemplateTreeItemProperty } from './dockerTemplateTreeItemProperty';

export class DockerTplProvider implements vscode.TreeDataProvider<TemplateTreeItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<TemplateTreeItem | undefined> = new vscode.EventEmitter<TemplateTreeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<TemplateTreeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(
		public tpls: Templates | undefined
	) {}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: TemplateTreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(treeItem?: TemplateTreeItem): Thenable<TemplateTreeItem[]> {
		if (treeItem) {
			var props = [];
			let parent: string = treeItem.label;

			let addFromArray = (label: string, arr: string[]) => {
				if (arr && arr.length!=0) {
					arr.forEach((el) => {
						props.push(new TemplateTreeItemProperty(el, label, parent));
					});
				}
			};

			let isDaemon = treeItem.item.interactive!=true;
			props.push(new TemplateTreeItemProperty(
				isDaemon?'-d':'-it',
				isDaemon?'daemon':'interactive',
				parent,
				"templateFixedProperty"
			));

			if (treeItem.item.remove===true) {
				props.push(new TemplateTreeItemProperty("--rm", "remove", parent));
			}

			addFromArray("volume", treeItem.item.volumes);
			addFromArray("port", treeItem.item.ports);

			return Promise.resolve(props);

		} else {
			return Promise.resolve(<TemplateTreeItem[]> Object.keys(this.tpls.templates).map(
				(key, val) => new TemplateTreeItem(key, this.tpls.templates[key])
			));
		}
	}

	private async _pickTemplate(): Promise<string> {
		let label = await vscode.window.showQuickPick(
			Object.keys(this.tpls.templates),
			{"placeHolder": `Select a template...`}
		);
		if (label === '') {
			return undefined;
		}
		return label;
	}

	add(): void {
		showWarningMessage(`DockerTplProvider: 'add' not implemented yet.`);
		//const label = "newtpl";
		//this.tpls.add(label);
		//this.refresh();
	}

	cp(treeItem: TemplateTreeItem): void {
		showWarningMessage(`DockerTplProvider: 'cp' not implemented yet.`);
		this.refresh();
	}

	async rm(treeItem: TemplateTreeItem) {
		let label : string = treeItem ? treeItem.label : await this._pickTemplate();
		if (label) {
			this.tpls.rm(label);
			this.refresh();
		}
	}

	inspect(treeItem: TemplateTreeItem): void {
		showWarningMessage(`DockerTplProvider: 'inspect' not implemented yet.`);
	}

	async run(treeItem: TemplateTreeItem) {
		let label : string = treeItem ? treeItem.label : await this._pickTemplate();
		if (label) {
			this.tpls.run(label);
		}
	}

	addOpt(treeItem: TemplateTreeItem): void {
		showWarningMessage(`DockerTplProvider: 'addOpt' not implemented yet.`);
	}

	editOpt(treeItem: TemplateTreeItem): void {
		showWarningMessage(`DockerTplProvider: 'editOpt' not implemented yet.`);
	}

	rmOpt(treeItemProp: TemplateTreeItemProperty): void {
		this.tpls.rmOpt(treeItemProp.parent, treeItemProp.value, treeItemProp.label);
		this.refresh();
	}
}

export function RegisterDockerTplProviderCommands(provider: DockerTplProvider) {
	let registerCommand = vscode.commands.registerCommand;

	registerCommand('dockerTemplates.refresh',
		() => provider.refresh());

	registerCommand('dockerTemplates.run',
		(item: TemplateTreeItem) => provider.run(item));

	registerCommand('dockerTemplates.add',
		() => provider.add());

	registerCommand('dockerTemplates.inspect',
		(item: TemplateTreeItem) => provider.inspect(item));

	registerCommand('dockerTemplates.rm',
		(item: TemplateTreeItem) => provider.rm(item));

	registerCommand('dockerTemplates.addOpt',

		(item: TemplateTreeItem) => provider.addOpt(item));
	registerCommand('dockerTemplates.editOpt',
		(item: TemplateTreeItem) => provider.editOpt(item));

	registerCommand('dockerTemplates.rmOpt',
		(item: TemplateTreeItemProperty) => provider.rmOpt(item));

	registerCommand('dockerTemplates.cp',
		(item: TemplateTreeItem) => provider.cp(item));

	registerCommand('dockerTemplates.runImage',
		(item) => showWarningMessage(`'runImage' not implemented yet [${item}].`));
	//TODO: import { ImageTreeItem } from 'vscode-docker/src/tree/images/ImageTreeItem';
}
