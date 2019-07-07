import * as vscode from 'vscode';
import * as fs from 'fs';

export class ResultsProvider implements vscode.TreeDataProvider<Result> {

	private _onDidChangeTreeData: vscode.EventEmitter<Result | undefined> = new vscode.EventEmitter<Result | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Result | undefined> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: Result): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Result): Thenable<Result[]> {
		console.log('!getChildren ' + element);

		if (!vscode.workspace.rootPath) {
			vscode.window.showInformationMessage('No \'HDL - Results\' in empty workspace');
			return Promise.resolve([]);
		}

		if (!element) {
			return this.findResults();
		}

		return Promise.resolve(
			element.tests.map(i => {
				return new Result(i, '', [], vscode.TreeItemCollapsibleState.None, {
					command: 'extension.helloWorld',
					title: '',
					arguments: []
				});
			})
		);
	}

	private findResults(): Thenable<Result[]> {
		console.log('!findResults');

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
					return new Result(label, folder, tests, vscode.TreeItemCollapsibleState.Collapsed);
				});
			},
			err => {
				console.error(err);
			});

/*
		const toDep = (moduleName: string, version: string): Result => {
			if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
				return new Result(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
			} else {
				return new Result(moduleName, version, vscode.TreeItemCollapsibleState.None, {
					command: 'extension.openPackageOnNpm',
					title: '',
					arguments: [moduleName]
				});
			}
		};
*/
	}
}

export class Result extends vscode.TreeItem {

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

	/*
	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
	};
	*/

	contextValue = 'result';

}


//const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

/*
			const mylist: { [id: string]: string } = {
				one: 'val1',
				two: 'val2',
			};
*/

/*
private pathExists(p: string): boolean {
	try {
		fs.accessSync(p);
	} catch (err) {
		return false;
	}
	return true;
}
*/