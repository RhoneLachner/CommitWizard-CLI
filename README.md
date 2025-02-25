# CommitWizard CLI

<img src="https://raw.githubusercontent.com/RhoneLachner/CommitWizard-CLI/main/assets/commitwizard-logo-vector.png" alt="CommitWizard Logo, wizard image with git and npm logos" width="24%"/>

**CommitWizard CLI** is a command-line tool that helps developers write consistent and structured Git commit messages by interactively selecting a commit category before writing the message. This ensures best practices are followed and makes it easier to maintain a clear commit history.

<img src="https://github.com/RhoneLachner/CommitWizard-CLI/raw/main/assets/commitwizard-prompt.png" alt="CommitWizard Prompt" width="75%"/>

<img src="https://github.com/RhoneLachner/CommitWizard-CLI/raw/main/assets/commitwizard-category-selection.png" alt="CommitWizard Category Selection" width="55%"/>

<img src="https://github.com/RhoneLachner/CommitWizard-CLI/raw/main/assets/commitwizard-description.png" alt="CommitWizard Message & Optional Description" width="44%"/>

## Features

- **Interactive commit prompts**: Select a commit category from a list of predefined options.
- **Structured commit messages**: Automatically prepend the selected category to your commit message.
- **Customizable categories**: Easily modify the categories to suit your workflow, including the use of special characters and emojis for more expressive commit messages.
- **Emoji and special character support**: Write commit messages and categories that include emojis and special characters to add more context and visual clarity.
- **Command-line tools for managing commits**:
  - **View commit history**: Use `commitwizard --log` to view a list of recent commits.
  - **Undo last commit**: Use `commitwizard --undo` to undo the last commit while keeping changes staged.
  - **Amend previous commit**: Use `commitwizard --amend` to modify the previous commit, including editing the message or adding new changes.
  - **Generate configuration**: Use `commitwizard --config` to create a default `.commitwizardrc` file for customizing commit categories.
  - **View version**: Use `commitwizard -v` or `commitwizard --version` to display the current version of CommitWizard CLI.

## Installation

To install CommitWizard globally:

`npm install -g commitwizard-cli`

## Updates

To update CommitWizard globally:

`npm update -g commitwizard-cli`

**Current version:** 2.0.3

## Usage

After staging your changes, simply run:

`commitwizard`

Follow the prompts to select a commit category and write your commit message. CommitWizard will automatically format and create the Git commit for you.

## Commands

| Command                          | Description                                                                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `commitwizard -v` or `--version` | Displays the current version of CommitWizard CLI.                                                                                                      |
| `commitwizard --config`          | Generates a default `.commitwizardrc` configuration file in the current directory. This file can be used to customize the available commit categories. |
| `commitwizard --log`             | Displays a list of the last 10 commits.                                                                                                                |
| `commitwizard --undo`            | Undo the last commit but keep the changes staged.                                                                                                      |
| `commitwizard --amend`           | Amend the previous commit, either by editing the message or adding new changes.                                                                        |

## Default Commit Categories

CommitWizard provides the following categories for your commit messages:

- **chore**: Changes to the build process or auxiliary tools
- **ci**: Continuous Integration and deployment
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: Performance updates and optimization
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **remove**: Removing files or unnecessary code
- **revert**: Undo changes that have been committed to the repository
- **style**: Changes that do not affect the meaning of the code
- **test**: Adding tests or correcting existing tests
- **update**: Small updates that do not change functionality

## Commit Category & Message Example

Stage your changes:

`git add -A`

Run CommitWizard:

`commitwizard`

Select a category and write your commit message:

Select the type of change that you're committing:

- [feat]: A new feature
- [fix]: A bug fix
- [docs]: Documentation only changes

Write your commit message: `Add feature to handle user login`

The resulting commit message will be:

`[feat]: Add feature to handle user login`

## Customization

CommitWizard allows you to define your own commit categories by creating a `.commitwizardrc` file in the root of your project.
Running the `commitwizard --config` command will generate the `.commitwizardrc` file for you, including default categories that can be changed.
The file should be written in JSON format, like so:
```
{
  "categories": [
    { "label": "chore", "description": "Changes to the build process or auxiliary tools" },
    { "label": "ci", "description": "Continuous Integration and deployment" },
    // Add more categories as needed
  ]
}
```

## Adding Commit Descriptions

With the release of version 2.0.0, CommitWizard now supports optional multi-line commit descriptions!

- Leave the input blank and press Enter to skip or finish the description option.
- Add descriptions or bullet points one line at a time, pressing Enter after each line.
- Paste multiple lines of text directly into the terminal and press Enter.

### Description Example

```
Write your commit message: Example commit message

✔ Write your commit message: Commit message example ✨
✔ Write a commit description (optional): 
  - To skip, leave blank & press Enter. Or, 
  - Write a description & press Enter for more lines. Or, 
  - Paste multiple lines at once & press Enter to finish. 
     › commit description line 1 
     <Enter>
✔ Write a commit description (optional): 
  - To skip, leave blank & press Enter. Or, 
  - Write a description & press Enter for more lines. Or, 
  - Paste multiple lines at once & press Enter to finish. 
     › commit description line 2 
     <Enter>
? Write a commit description (optional): 
  - To skip, leave blank & press Enter. Or, 
  - Write a description & press Enter for more lines. Or, 
  - Paste multiple lines at once & press Enter to finish. 
     › 
     <Enter>
```

The resulting commit message will be:

```
[category]: Commit message example ✨

commit description line 1
commit description line 2
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request on [GitHub](https://github.com/RhoneLachner).

## License

MIT

## Author

Sarah Rhone Lachner ([GitHub](https://github.com/RhoneLachner))

Happy committing! 😊
