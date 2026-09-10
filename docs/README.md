# Docusaurus Plugin PanZoom Documentation

This is the documentation website for the [@r74tech/docusaurus-plugin-panzoom](https://github.com/r74tech/docusaurus-plugin-panzoom) package. The site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Getting Started

### Prerequisites

- Node.js LTS (CI follows the latest LTS release)
- pnpm 11.24.0

### Installation

```bash
# From the repository root, build the locally referenced plugin first
pnpm install --frozen-lockfile
pnpm build
cd docs
pnpm install --frozen-lockfile
```

### Local Development

To start the local development server:

```bash
# Start the development server
pnpm start
```

This command starts a local development server and opens a browser window. Most changes are reflected live without having to restart the server.

### Building the Documentation

To build the static website:

```bash
# Build the static site
pnpm build
```

This command generates static content in the `build` directory, which can be served using any static content hosting service.

## Project Structure

- `/docs` - Documentation content in Markdown format
- `/static` - Static assets like images and favicon

## Deployment

The documentation is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the main branch.

## Contributing

Contributions to improve the documentation are welcome! Please feel free to submit a pull request.

## License

This documentation is licensed under the same [MIT License](https://github.com/r74tech/docusaurus-plugin-panzoom/blob/main/LICENSE) as the main project.
