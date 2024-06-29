#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import "dotenv/config.js";

import { registerModule } from '../service.js';

program
  .version("0.0.1")
  .description("Wasm Pusher CLI")
  .action(async() => {

    const nameValidation = (name) => {
      if (name === "") {
        return "Mandatory field."
      } else {
        return true;
      }
    };
    
    let name = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Name of the module",
        validate: nameValidation
      }
    ]);

    const versionValidation = (version) => {
      if (version === "") {
        return "Mandatory field."
      } else {
        return true;
      }
    };
    
    let version = await inquirer.prompt([
      {
        type: "input",
        name: "version",
        message: "Version of the module",
        validate: versionValidation
      }
    ]);

    const networkValidation = (network) => {
      if (network === "") {
        return "Mandatory field."
      } else {
        return true;
      }
    };
    
    let network = await inquirer.prompt([
      {
        type: "list",
        name: "network",
        message: "Network",
        validat: networkValidation,
        choices: [
          {
            name: 'mainnet',
            value: 'https://ic0.app',
            description: 'Use this if you want to push your module to the mainnet.',
          },
          {
            name: 'local',
            value: 'http://localhost:4943',
            description: 'Use this if you want to test with the local registry.',
          },
        ]
      }
    ]);

    let canisterId = '';

    if(network.network === 'local') {
      
      const canisterIdValidation = (canisterId) => {
        if (canisterId === "") {
          return "Mandatory field."
        } else {
          return true;
        }
      };
    
      canisterId = await inquirer.prompt([
        {
          type: "input",
          name: "Module manager canisterId",
          message: "Enter the canister id of the local registry",
          validate: canisterIdValidation
        }
      ]);
      
    } else {
      canisterId = process.env.CANISTERID;
    };

    const wasmValidation = (wasm) => {
      if (wasm === "") {
        return "Mandatory field."
      } else {
        return true;
      }
    };
    
    let wasm = await inquirer.prompt([
      {
        type: "input",
        name: "wasm",
        message: "Share the absolute path of your wasm?",
        validate: wasmValidation
      }
    ]);

      const res = await registerModule(name.name, version.version, network.network, canisterId, wasm.wasm);
    console.log("res", res);
      if(res.hasOwnProperty('ok')) {
        console.log(chalk.green('Successfully registered your module.'));
      } else {
        console.log(chalk.red('Failed to register your module.'));
      }
        
  });

program.parse(process.argv);