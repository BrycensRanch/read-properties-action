# BrycensRanch/read-properties-action

GitHub Action to read values from Java's `.properties` files.

## Usage

Returning a single property is as simple as:

```yaml
- uses: BrycensRanch/read-properties-action@v1
  id: version
  with:
    file: gradle.properties
    property: version
    default: 0.0.1

- run: echo ${{ steps.version.outputs.version }} # Project's version from gradle.properties or 0.0.1 if it is not defined there
```

Alternatively, you could return all the values from the `.properties` file by employing the `all` flag:

```yaml
- uses: BrycensRanch/read-properties-action@latest
  id: all
  with:
    file: gradle.properties
    all: true

- run: echo ${{ steps.all.outputs.version }} # Project's version from gradle.properties
- run: echo ${{ steps.all.outputs.groupId }} # Project's groupID from gradle.properties
  …
```

To see the list of available versions of this action (`latest` in the example above), navigate to the [Releases & Tags](https://github.com/BrycensRanch/read-properties-action/tags) page of this repo.
Whenever a new version is released, corresponding tags are created / updated.
`latest` tag always points to the latest stable release.
`master` label could also be used, being a synonym to `latest`.
There are also `$major` and `$major.$minor` tags pointing to the latest matching version (i.e. tag `1` always points to the latest `1.x` version, and tag `1.1` — to the latest `1.1.x` version).

To see this action… in action… check its integration test in [`test.yml`](.github/workflows/test.yml).

## Acknowledgments

This action is based on [read-java-properties-action](https://github.com/madhead/read-java-properties/)
However, it has numerous benefits over the original package. For example, it is written in TypeScript, it is tested, and it is published as a GitHub Action automatically.
Docker is not used, so the action is much faster and it fixes the JAVA_HOME issue the original action had.
The action is completely rewritten, so it is much more robust and it supports all the features of the original action.
By all the features, I also mean it maintains 100% compatibility with the original action.

## Changelog

Unlike the original action, this action is semantically versioned and it has a changelog. View it [here](CHANGELOG.md).

## Contributing

Contributions are welcome! Please view the [Contributing Guidelines](CONTRIBUTING.md) for more information.

## Building

Install [Git](https://git-scm.com/).
Install [Node.js LTS (Iron, 20)](https://nodejs.org/en/).
Install [pnpm](https://pnpm.js.org/).

Clone the repository by running `git clone https://github.com/BrycensRanch/read-properties-action.git`.

If you're aiming to contribute, please clone the `next` branch instead using the `-b next` flag and read our [CONTRIBUTING.md](CONTRIBUTING.md).

Enter the repository by running `cd read-properties-action`.

### Commands

Install the project's dependencies by running `pnpm install`.
To build the action, run `pnpm build`.
To run tests, run `pnpm test`.

## License

[MIT](LICENSE)
