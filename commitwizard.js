#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get version number from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = fs.readJSONSync(path.join(__dirname, 'package.json'));

// Function to initialize a default .commitwizardrc file
const initCommitWizardConfig = () => {
  const configPath = path.resolve(process.cwd(), '.commitwizardrc');
  if (fs.existsSync(configPath)) {
    console.log('.commitwizardrc already exists in this directory.');
    return;
  }

  const defaultConfig = {
    categories: [
      { label: 'chore', description: 'Changes to the build process or auxiliary tools' },
      { label: 'ci', description: 'Continuous Integration and deployment' },
      { label: 'docs', description: 'Documentation only changes' },
      { label: 'feat', description: 'A new feature' },
      { label: 'fix', description: 'A bug fix' },
      { label: 'perf', description: 'Performance updates and optimization' },
      { label: 'refactor', description: 'A code change that neither fixes a bug nor adds a feature' },
      { label: 'remove', description: 'Removing files or unnecessary code' },
      { label: 'revert', description: 'Undo changes that have been committed to the repository' },
      { label: 'style', description: 'Changes that do not affect the meaning of the code' },
      { label: 'test', description: 'Adding tests or correcting existing tests' },
      { label: 'update', description: 'Small updates that do not change functionality' },
    ],
  };

  try {
    fs.writeJSONSync(configPath, defaultConfig, { spaces: 2 });
    console.log('.commitwizardrc file has been generated successfully.');
  } catch (error) {
    console.error('Error generating .commitwizardrc file:', error.message);
  }
};

// Handle command-line arguments for version, config, log, undo, and amend
if (process.argv.includes('-v') || process.argv.includes('--version')) {
  console.log(`CommitWizard CLI version: ${packageJson.version}`);
  process.exit(0);
} else if (process.argv.includes('--config')) {
  initCommitWizardConfig();
  process.exit(0);
} else if (process.argv.includes('--log')) {
  showCommitHistory();
  process.exit(0);
} else if (process.argv.includes('--undo')) {
  undoLastCommit();
  process.exit(0);
} else if (process.argv.includes('--amend')) {
  amendLastCommit();
  process.exit(0);
}

// Function to show commit history
const showCommitHistory = () => {
  try {
    const log = execSync('git log --oneline -n 10').toString();
    console.log('Recent commits:');
    console.log(log);
  } catch (error) {
    console.error('Error fetching commit history:', error.message);
  }
};

// Function to undo the last commit (soft reset)
const undoLastCommit = () => {
  try {
    execSync('git reset --soft HEAD~1', { stdio: 'inherit' });
    console.log('Last commit has been undone, and changes are still staged.');
  } catch (error) {
    console.error('Error undoing the last commit:', error.message);
  }
};

// Function to amend the last commit
const amendLastCommit = () => {
  try {
    execSync('git commit --amend', { stdio: 'inherit' });
    console.log('Last commit has been amended.');
  } catch (error) {
    console.error('Error amending the last commit:', error.message);
  }
};

// Check if there are changes to commit
const checkForChanges = () => {
  try {
    const status = execSync('git status --porcelain').toString().trim();
    return status.length > 0; // If there is output, it means there are changes
  } catch (error) {
    console.error('Error checking Git status:', error.message);
    process.exit(1);
  }
};

const loadCommitCategories = () => {
  const configPath = path.resolve(process.cwd(), '.commitwizardrc');
  if (fs.existsSync(configPath)) {
    try {
      const config = fs.readJSONSync(configPath);
      if (Array.isArray(config.categories) && config.categories.length > 0) {
        return config.categories.map((category) => ({
          name: `[${category.label}]: ${category.description}`,
          value: category.label,
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
  // Check if there are any changes to commit
  if (!checkForChanges()) {
    console.log('No changes to commit. Please make some changes before running CommitWizard.');
    process.exit(0);
  }

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

    // Escape double quotes in the message to allow special characters within the commit message
    const escapedMessage = message.replace(/"/g, '\\"');
    const fullCommitMessage = `[${category}]: ${escapedMessage}`;

    // Use double quotes to wrap the full commit message
    execSync(`git commit -m "${fullCommitMessage}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runCommitWizard();
