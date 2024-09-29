#!/usr/bin/env node

import inquirer from 'inquirer';
import { execSync } from 'child_process';

const commitCategories = [
  { name: '[chore]: Changes to the build process or auxiliary tools', value: 'chore' },
  { name: '[ci]: Continuous Integration and deployment', value: 'ci' },
  { name: '[docs]: Documentation only changes', value: 'docs' },
  { name: '[feat]: A new feature', value: 'feat' },
  { name: '[fix]: A bug fix', value: 'fix' },
  { name: '[perf]: Performance updates and optimization', value: 'perf' },
  { name: '[refactor]: A code change that neither fixes a bug nor adds a feature', value: 'refactor' },
  { name: '[remove]: Removing files or unnecessary code', value: 'remove' },
  { name: '[revert]: Undo changes that have been committed to the repository', value: 'revert' },
  { name: '[style]: Changes that do not affect the meaning of the code', value: 'style' },
  { name: '[test]: Adding tests or correcting existing tests', value: 'test' },
  { name: '[update]: Small updates that do not change functionality', value: 'update' },
];

async function runCommitWizard() {
  try {
    // Prompt the user to select a commit category
    const { category } = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: "Select the type of change that you're committing:",
        choices: commitCategories,
      },
    ]);

    // Prompt the user to write a commit message
    const { message } = await inquirer.prompt([
      {
        type: 'input',
        name: 'message',
        message: 'Write your commit message:',
      },
    ]);

    // Construct the full commit message
    const fullCommitMessage = `[${category}]: ${message}`;

    // Run the git commit command with the constructed message
    execSync(`git commit -m "${fullCommitMessage}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runCommitWizard();
