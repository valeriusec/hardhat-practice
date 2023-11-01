const ethers = require('ethers');
require('dotenv').config();

async function main() {

  const url = process.env.GOERLI_URL;

  let artifacts = await hre.artifacts.readArtifact("Faucet");

  const provider = new ethers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let faucet = await factory.deploy();

  await faucet.waitForDeployment();

  console.log("Faucet address:", await faucet.getAddress());

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});