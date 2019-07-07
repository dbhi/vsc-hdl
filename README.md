<p align="center">
  <a title="Dependency Status" href="https://david-dm.org/dbhi/vsc-hdl"><img src="https://img.shields.io/david/dbhi/vsc-hdl.svg?longCache=true&style=flat-square&label=deps"></a><!--
  -->
  <a title="DevDependency Status" href="https://david-dm.org/dbhi/vsc-hdl?type=dev"><img src="https://img.shields.io/david/dev/dbhi/vsc-hdl.svg?longCache=true&style=flat-square&label=devdeps"></a><!--
  -->
</p>

**vsc-hdl** is a [Visual Studio Code](https://code.visualstudio.com/) (VSC) [Extension](https://code.visualstudio.com/docs/editor/extension-gallery) to hopefully improve the UX of hardware designers writting modern VHDL (i.e. `>=2008`) with (FOSS) EDA tools.

# Features

## Supported

 - ...

## Work in progress

- `HDL - Projects` view/section is added to the `Explorer`. The workspace is scanned for known HDL project definition files and a quick-access list is shown.
  - [ ] `VUnit`
  - [ ] `hdl-prj.json`
- `HDL - Results` view/section is added to the `Explorer`. The workspace is scanned for folders/files with known HDL test execution results files and a summary is shown.
  - [ ] `vunit_out`
- `Tasks` view/section is added to the `dockerView` contributed by the [Docker extension for VSC](https://github.com/microsoft/vscode-docker).

## Planned (with no ETA)

- Integrate with [ghdl/ghdl-language-server](https://github.com/ghdl/ghdl-language-server).
- Integrate features to/from [TerosTechnology/terosHDL](https://github.com/TerosTechnology/terosHDL).
  - Symbolator
  - Code coverage
  - FSM
- Integrate ghdl's synthesis features.

# Development

- First, clone the repository:

```sh
git clone https://github.com/dbhi/vsc-hdl
cd vsc-hdl
```

- Optionally, a docker container can be used to avoid installing Node.js on the host. Then, use the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension to *attach* VSC to the container, and open folder `/src`.

```sh
$(command -v winpty) docker run --rm -itv /$(pwd)://src -w //src node bash
```

- Last, but not least, have fun!

## Run tests

- Press `F5` to run the tests in a new window with your extension loaded.
- See the output of the test result in the debug console.
- Make changes to `test/extension.test.ts` or create new test files inside the `test` folder. By convention, the test runner will only consider files matching the name pattern `**.test.ts`. Note that it will find folders/files recursively.

# To Do

- Understand how to write tests.
- [VUnit/vunit#347](https://github.com/VUnit/vunit/issues/347)
  - http://vunit.github.io/cli.html#json-export
- [microsoft/vscode#76891](https://github.com/microsoft/vscode/issues/76891)

# References

- [Extension Guides](https://code.visualstudio.com/api/extension-guides/overview).
- [Contribution Points](https://code.visualstudio.com/api/references/contribution-points).
- [Bundling your extension](https://code.visualstudio.com/api/working-with-extensions/testing-extension).
