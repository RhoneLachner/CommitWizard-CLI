#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import path from 'path';

const loadCommitCategories = () => {
  const configPath = path.resolve(process.cwd(), '.commitwizardrc');
  if (fs.existsSync(configPath)) {
    try {
      const config = fs.readJSONSync(configPath);
      if (Array.isArray(config.categories) && config.categories.length > 0) {
        return config.categories.map(category => ({
          name: `[${category.label}]: ${category.description}`,
          value: category.label
        }));
      }
    } catch (error) {
      console.error('Error reading .commitwizardrc file:', error.message);
    }
  }

  // Default categories if configuration file is not found or has errors
  return [
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
};

async function runCommitWizard() {
  try {
    const commitCategories = loadCommitCategories();

    const { category } = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: "Select the type of change that you're committing:",
        choices: commitCategories,
      },
    ]);

    const { message } = await inquirer.prompt([
      {
        type: 'input',
        name: 'message',
        message: 'Write your commit message:',
      },
    ]);

    const fullCommitMessage = `[${category}]: ${message}`;

    execSync(`git commit -m "${fullCommitMessage}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runCommitWizard();
