'use strict';

import { ExtensionContext, window } from 'vscode';

import { DockerTplProvider, RegisterDockerTplProviderCommands } from './dockerTemplateProvider';
import { Templates } from './dockerTemplates';
import { FileExplorer } from './fileExplorer';

export function activate(context: ExtensionContext) {

	const tplsProvider = new DockerTplProvider(new Templates());
	window.registerTreeDataProvider('dockerTemplates', tplsProvider);
	RegisterDockerTplProviderCommands(tplsProvider);

	new FileExplorer(context);

}
