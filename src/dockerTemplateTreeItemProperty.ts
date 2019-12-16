import { TreeItem, TreeItemCollapsibleState } from 'vscode';

export class TemplateTreeItemProperty extends TreeItem {

	constructor(
		public readonly label: string,
		public readonly value: string,
		public readonly parent: string,
		public readonly contextValue: string = 'templateProperty',
	) {
		super(label, TreeItemCollapsibleState.None);
	}

	get description(): string {
		return this.value;
	}

	get tooltip(): string {
		return this.value + ': ' + this.label;
	}
}
