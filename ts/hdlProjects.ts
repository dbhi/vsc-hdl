import * as vscode from 'vscode';
import * as fs from 'fs';

export class ProjectsProvider implements vscode.TreeDataProvider<Project> {

	private _onDidChangeTreeData: vscode.EventEmitter<Project | undefined> = new vscode.EventEmitter<Project | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Project | undefined> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: Project): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Project): Thenable<Project[]> {
		console.log('!getChildren ' + element);

		if (!vscode.workspace.rootPath) {
			vscode.window.showInformationMessage('No \'HDL - Projects\' in empty workspace');
			return Promise.resolve([]);
		}

		if (!element) {
			return this.findProjects();
		}

		return Promise.resolve(
			element.tests.map(i => {
				return new Project(i, '', [], vscode.TreeItemCollapsibleState.None, {
					command: 'extension.helloWorld',
					title: '',
					arguments: []
				});
			})
		);
	}

	private findProjects(): Thenable<Project[]> {
		console.log('!findProjects');

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

					(vscode.workspace.workspaceFolders || []).some(
						f => {
							if (item.path.includes(f.uri.path)) {
								label = f.name;
								folder = folder.replace(f.uri.path, '');
								return true;
							}
							return false;
						}
					);
					return new Project(label, folder, tests, vscode.TreeItemCollapsibleState.Collapsed);
				});
			},
			err => {
				console.error(err);
			});
	}
}

export class Project extends vscode.TreeItem {

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

	contextValue = 'Project';

}
