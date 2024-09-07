# OP Conceirge Invoice
OP Conceirge Invoice & Billing System with Metamask integration, activation using  ConnectKit and Web3 tooling

## Prerequisites

Make sure you have Node.js and Yarn installed on your machine. You can check their versions using the following commands:

```bash
node -v
yarn -v
```

## Getting Started

### Cloning the Repository

Clone your fork of the Web3-Medical-Invoice repository:

```bash
git clone https://github.com/[USER_NAME]/Web3-Medical-Invoice
```

### Opening the Project

Open the project in your preferred code editor. If you use Visual Studio Code, you can do this with:

```bash
code Web3-Medical-Invoice
```

### Setting Up Environment Variables

1. Create a `.env` file in the root directory of the project:

   ```bash
   touch .env
   ```

2. Copy the contents from `.env.example` and paste them into `.env`.

3. Obtain the following credentials:

   - **WalletConnect Project ID**: Log into the [WalletConnect dashboard](https://walletconnect.com/) and retrieve your Project ID. Add it to `.env` like this:
     ```
     REACT_APP_WALLETCONNECT_PROJECT_ID=<your_walletconnect_project_id>
     ```

   - **Alchemy API Key**: Visit the [Alchemy dashboard](https://dashboard.alchemy.com/) to get your API key. Add it to `.env` like this:
     ```
     REACT_APP_ALCHEMY_ID=<your_alchemy_api_key>
     ```

### Installing Dependencies

Install the necessary dependencies using Yarn:

```bash
yarn
```

### Running the Project

To start the project locally and view it in your browser, run:

```bash
yarn start
```

The project will be available at `http://localhost:3000`.
