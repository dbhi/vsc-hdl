import { TreeItem, TreeItemCollapsibleState } from 'vscode';

import { Template } from './dockerTemplate';

export class TemplateTreeItem extends TreeItem {

	constructor (
		public readonly label: string,
		public item: Template
	) {
		super(label, TreeItemCollapsibleState.Collapsed);
	}

	get tooltip(): string {
		return this.item.cmd.join(' ');
	}

	contextValue = 'template';
}
