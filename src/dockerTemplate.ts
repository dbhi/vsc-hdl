export class Template {

	constructor (
		public interactive: boolean = false,
		public remove: boolean = true,
		public name?: string,
		public volumes?: string[],
		public ports?: string[],
		public opts?: string,
		public image?: string,
		public args?: string[],
		public x11docker?: string[]
	) {
	}

	get cmd(): string[] {
		let addFromArray = (label: string, arr: string[]) => {
			if (arr && arr.length != 0) {
				arr.forEach((el) => {
					Array.prototype.push.apply(cmd, [label, el]);
				});
			}
		};

		var cmd: string[] = [];
		if ( this.x11docker != undefined) {
			Array.prototype.push.apply(cmd, this.x11docker);
			cmd.push('--');
		} else {
			cmd = ['docker', 'run', this.interactive ? ' -it' : ' -d'];
			if (this.remove != false) {
				cmd.push('--rm');
			}
			if (this.name) {
				Array.prototype.push.apply(cmd, ['--name', this.name]);
			}
		}

		addFromArray("-v", this.volumes);
		addFromArray("-p", this.ports);

		Array.prototype.push.apply(cmd, this.opts);

		cmd.push('--');
		cmd.push(this.image ? this.image : 'IMAGE');

		Array.prototype.push.apply(cmd, this.args);

		return cmd;
	}
}
