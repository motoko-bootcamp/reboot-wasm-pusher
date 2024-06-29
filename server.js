#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";

import { registerModule } from './service.js';

program
  .version("1.0.0")
  .description("Wasm Pusher CLI")
  .action(async() => {
    let name = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Name of the module",
      }
    ]);

    
    let version = await inquirer.prompt([
      {
        type: "input",
        name: "version",
        message: "Version of the module",
      }
    ]);

    let network = await inquirer.prompt([
      {
        type: "list",
        name: "network",
        message: "Network",
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

    let wasm = await inquirer.prompt([
      {
        type: "input",
        name: "wasm",
        message: "Share the absolute path of your wasm?",
      }
    ]);

      const res = await registerModule(name.name, version.version, network.network, wasm.wasm);
    console.log("res", res);
      if(res.hasOwnProperty('ok')) {
        console.log(chalk.green('Successfully registered your module.'));
      } else {
        console.log(chalk.red('Failed to register your module.'));
      }
        
  });

program.parse(process.argv);