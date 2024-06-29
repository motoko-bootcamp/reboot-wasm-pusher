#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import confirm from '@inquirer/confirm';

import { registerModule } from './service.js';

program
  .version("1.0.0")
  .description("Wasm Pusher CLI")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Name of the module",
        },
        {
          type: "input",
          name: "version",
          message: "Version of the module",
        },
        {
          type: "confirm",
          name: "wasm",
          message: "Have you put your wasm file in the 'yourwasmhere' folder? (y/n)",
        },
      ])
      .then(async (answers) => {
        if (answers.wasm) {
          const res = await registerModule(answers.name, answers.version, answers.wasm);

          if(res.hasOwnProperty('ok')) {
            console.log(chalk.green('Successfully registered your module.'));
          } else {
            console.log(chalk.red('Failed to register your module.'));
          }
        } else {
          console.log(chalk.red('Please put your wasm file in the "yourwasmhere" folder and try again.'));
        };
      });
  });

program.parse(process.argv);