# CSC307-ScreenSquad

## Instructions to run:
- Frontend -> navigate into react-frontend folder. Run the command npm start.
- Backend -> navigate into the expressjs-backend folder. Run the command npm run dev.

Figma: https://www.figma.com/file/YQA3k3PgyCOS2Mnljyuh5f/Screen-Squad-Website?type=design&node-id=0-1&t=TxlZTGoQHmAZec7c-0

Code Styling Tools we use:
ESLint 
Prettier

To set up ESLint in VSCode:

1.) Install ESLint: Ensure that you have ESLint installed globally on your system. Open your terminal or command prompt and run the following command:
npm install -g eslint

2.) Install the ESLint extension in Visual Studio Code: Launch Visual Studio Code and go to the Extensions view (click on the square icon in the left sidebar or press Ctrl+Shift+X). Search for "ESLint" in the search bar and click "Install".

3.) Initialize ESLint configuration: Open the root folder of your project in Visual Studio Code. In the terminal or command prompt, navigate to the project's root directory and run the following command:
eslint --init

4.) Configure ESLint: The ESLint configuration wizard will prompt you with a series of questions to set up your ESLint configuration.

5.) Enable ESLint in Visual Studio Code: Open the settings in Visual Studio Code by clicking on "File" -> "Preferences" -> "Settings" (or by using the shortcut Ctrl+,). In the settings tab, search for "ESLint". Look for the "ESLint: Enable" option and check the box to enable ESLint in Visual Studio Code.

6.) Restart Visual Studio Code: Restart Visual Studio Code for the changes to take effect.


To set up Prettier in Visual Studio Code, follow these steps:

1.) Install the Prettier extension: Launch Visual Studio Code and go to the Extensions view (click on the square icon in the left sidebar or press Ctrl+Shift+X). Search for "Prettier - Code formatter" in the search bar and click "Install" next to the Prettier extension.

2.) Configure Prettier as the default formatter: Open the settings in Visual Studio Code by clicking on "File" -> "Preferences" -> "Settings" (or by using the shortcut Ctrl+,). In the settings tab, search for "Default Formatter". Look for the "Editor: Default Formatter" option and select "esbenp.prettier-vscode" from the dropdown list. This setting ensures that Prettier is used as the default code formatter for your project.


3.) Customize Prettier settings (optional): You can customize Prettier's behavior by modifying its settings. In the settings tab, search for "Prettier". You will find various options to configure Prettier, such as indentation, line wrapping, and more. Adjust these settings according to your preferences.

4.) Format code with Prettier: Now that Prettier is set up, you can format your code by right-clicking in the editor or using the shortcut Shift+Alt+F. You can also format the entire file by right-clicking on the file in the Explorer sidebar and selecting "Format Document".

5.) Enable format on save (optional): If you want Visual Studio Code to automatically format your code with Prettier whenever you save a file, you can enable the "Format On Save" feature. Open the settings and search for "Editor: Format On Save". Check the box to enable this feature. From now on, your code will be formatted automatically whenever you save a file.
