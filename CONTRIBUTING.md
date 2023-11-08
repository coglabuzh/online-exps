# Contributing

## Issues

### Bug reports

- use the "Bug report" issue template

### Feature requests

- use the "Feature request" issue template

## Contributing code

### Prerequisites

- Basic knowledge of JS and TypeScript
- Basic knowledge of Git
- Contact maintainers, e.g. by leaving a comment under your issue, if you need help
- GitHub account that is added to this repository
  - contact maintainers if you would like to be added

### General Procedure

1. Ensure an Issue Exists:

- Before making a change, ensure there's an issue that describes the problem or feature request.
- If one doesn't exist, create one. This provides a place to discuss the change before doing the work.

2. Clone the Repository

- `git clone https://github.com/coglabuzh/online-exps.git`

3. Create a new branch

- Always create a new branch for your changes with the feature name. This ensures the main or development branch remains stable and is not affected by ongoing work.
- Best way to do this: [Click "Create a branch" in the issue view](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-a-branch-for-an-issue)

4. Make changes

- Make frequent, small commits.
- Regularly pull the latest changes from the dev branch to stay updated, especially if your PR takes time.
- Any new user-facing function you add must be added as a default export to `src/index.ts` in order to be accessible for library users.

5. Pull request

- Describe the purpose of your changes, link to any related tickets or tasks, and provide instructions for reviewing and testing your changes.

6. Review process

- Team members review the changes.
- Address any feedback or requested changes. Pushing additional commits to your branch will automatically update the PR/MR.

7. Merging

- Once approved, the PR gets merged into the dev branch.

### Environment setup

#### NodeJS and NPM

- Download and install instructions are [here](https://nodejs.org/en)

#### Code Editor

- Visual Studio Code recommended, download [here](https://code.visualstudio.com)

#### Prettier Plugin

- Download the code formatter "Prettier" as editor extension, it's what we use for code formatting.

#### Installing dependencies

- In the root of the project, run `npm install` to install all dependencies

#### Building

- Run `npm run build` to compile the .ts into .js files (located in `/dist`). Only then will your changes be visible in the examples.
- Run `npm run watch` to compile on every save. This is very convenient to see changes instantly when working on the library.

#### Previewing Results

- To see changes made in the library, it is best to create a new experiment in the examples folder that uses the functions you are working on.
- To use the local version of the library (not the one currently published on npm) you have to run `npm install` with the relative path to the root of the libary. In the example experiments, this is `npm install ../..`.

### Project structure

#### `src`

All source files are here.

- `/utils`: provides various helper functions for generating the timeline variables.
- `/stimuli`: functions that generate html which is used as stimulus.

#### `dist`

JS files compiled when executing `npm run build` are here. Do not change anything in this folder manually.

#### `examples`

Examples. Preferably, every feature should be showcased in at least one example.

### Contribution guidelines

#### Documentation

- For any user-facing function, provide a brief description in a docstring above the function definition (see existing functions)
- For any user-facing type, provide a brief description above the type definition and for every attribute that isn't entirely obvious
- In general: use descriptive variable, type and function names; use comments to explain non-obvious things

- If a function needs a longer documentation, create a folder of the same name with the source file and a `readme.md` file. This should be the default for stimuli functions.

- Create an example under `/examples` for more complex features, such as stimuli functions.

#### Naming
##### Folders
- Use lower-case and separate words by dashes “-”

##### Files
- Use camelCase for filenames, e.g., attentionCheck.ts.

##### Variables
- Try to use camelCase for variables. If not possible, you can use lower-case. 

##### Functions
- verbCamelCase or just verb

#### Types

- All arguments of user-facing functions should be fully typed

#### Formatting

- Use Prettier to format your code
- Prettier can provide syntax highlighting for html strings (example for this in`/src/stimuli/circle_of_squares`)

####
