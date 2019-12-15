import * as vscode from 'vscode';
import * as fs from 'fs';

export class DockerTemplatesProvider implements vscode.TreeDataProvider<Template> {

	private _onDidChangeTreeData: vscode.EventEmitter<Template | undefined> = new vscode.EventEmitter<Template | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Template | undefined> = this._onDidChangeTreeData.event;

	refresh(): void {
		console.log('!refresh');
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: Template): vscode.TreeItem {
		console.log('!getTreeItem ' + element);
		return element;
	}

	getChildren(element?: Template): Thenable<Template[]> {
		console.log('!getChildren ' + element);

		console.log('!workspaceFolders: ' + vscode.workspace.workspaceFolders);
//		if (!vscode.workspace.rootPath) {
//			vscode.window.showInformationMessage('No \'HDL - Templates\' in empty workspace');
//			return Promise.resolve([]);
//		}
//
		if (!element) {
			return this.findTemplates();
		}

		return Promise.resolve(
			element.tests.map(i => {
				return new Template(i, '', [], vscode.TreeItemCollapsibleState.None, {
					command: 'extension.helloWorld',
					title: '',
					arguments: []
				});
			})
		);
	}

	private findTemplates(): Thenable<Template[]> {
		console.log('!findTemplates');

		//	vscode.workspace.findFiles('**/*.py', '**/{node_modules,vunit_out,.tox}/**').then(

		const str_inc = 'vunit_out/test_output/test_name_to_path_mapping.txt';
		const str_exc = '{node_modules,.tox}/**';

		return vscode.workspace.findFiles(
			'**/' + str_inc,
			'**/' + str_exc)
			.then(
			val => {
				return val.map( item => {
					const tests = fs.readFileSync(item.path)
						.toString()
						.split('\n')
						.map(t => {
							return t.split(' ')[1];
						});

					var label = '';
					var folder = item.path.replace('/' + str_inc, '');

					//(vscode.workspace.workspaceFolders || []).some(
					//	f => {
					//		if (item.path.includes(f.uri.path)) {
					//			label = f.name;
					//			folder = folder.replace(f.uri.path, '');
					//			return true;
					//		}
					//		return false;
					//	}
					//);
					return new Template(label, folder, tests, vscode.TreeItemCollapsibleState.Collapsed);
				});
			},
			err => {
				console.error(err);
			});
	}
}

export class Template extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		private desc: string,
		public readonly tests: string[],
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return this.label + ((this.desc) ? `: ${this.desc}` : ``);
	}

	get description(): string {
		return this.desc;
	}

	contextValue = 'Template';

}
