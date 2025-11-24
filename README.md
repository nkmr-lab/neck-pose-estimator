# Neck Pose Estimator

This repository is a monorepo for the Neck Pose Estimator library and its sample applications, managed with `pnpm` workspaces.

This project consists of a core library (written in TypeScript) that estimates neck pose using camera and device sensors, and a React-based and vanilla JavaScript sample applications demonstrating its usage.

## Workspace Structure

- `packages/neck-pose-estimator`: The core library. Published as a private GitHub Package under @nkmr-lab. It provides the `NeckAngleEstimator` class which connects to a backend API to estimate neck angles.
  - See the [README](packages/neck-pose-estimator/README.md) for usage and details.
- `packages/neck-pose-estimator-example`: Contains sample applications using the `neck-pose-estimator` library.
  - `neck-pose-estimator-example-react`: A React application built with Vite.
  - `neck-pose-estimator-example-vanilla`: A vanilla JavaScript application.

## Tech Stack

- **pnpm Workspaces**: Monorepo management
- **TypeScript**: Type safety across the project
- **React**: UI for the sample application
- **Vite**: Fast development experience for the sample application
- **Vitest**: Unit and integration testing for the core library

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/)

### Setup

Clone the repository and install dependencies from the root directory.

```bash
# Clone the repository
git clone <repository-url>
cd neck-pose-estimator

# Install dependencies for all packages
pnpm install
```

### Build

To build all packages in the workspace, run the following command from the root directory:

```bash
pnpm -r build
```

### Running the Sample Application

To run the React sample application in development mode, use the following command:

```bash
pnpm -F @nkmr-lab/neck-pose-estimator-example-react dev
```

This starts the Vite development server. Note that the application requires an HTTPS context to access the camera and device sensors. For detailed setup including environment variables and self-signed certificates, please refer to the `neck-pose-estimator-example` [README](packages/neck-pose-estimator-example/README.md).

### Running Tests

To run the test suite for the core library, use the following command:

```bash
pnpm -F @nkmr-lab/neck-pose-estimator test
```

### Updating Backend API Schema

If the backend API schema is updated, `packages/neck-pose-estimator/src/types/api-schema.ts` needs to be updated.
You can fetch the latest schema by running the following command (you need to set the URL serving the backend OpenAPI schema in the `.env` file):

```bash
pnpm -F @nkmr-lab/neck-pose-estimator openapi
```

# Citing

If you find our work useful, please cite it as follows:

```bibtex
@proceedings{64687.3764720,
  booktitle = {OzCHI '25: The 2025 ACM SIGCHI Conference on Human Computer Interaction},
  title = {Can We Prevent "Text Neck" Using Only a Smartphone? Real-Time Neck Angle Estimation and a Serious Game as a Case Study},
  author = {Kento, Watanabe and Satoshi, Nakamura},
  year = {2025},
  doi = {https://doi.org/10.1145/3764687.3764720}
}
```
