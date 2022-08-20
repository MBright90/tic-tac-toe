This is a tic-tac-toe game created using front end technology. The purpose of undertaking this project was to practice more complex javascript and to implement a modular design pattern. I felt very confident with the HTML and CSS of this project that I quickly had a shell which I could begin to apply the logic to.

To tackle the modular design pattern, I separated my code into four distinct blocks. The first block is the encompassing javascript, primarily written in the javascript.js file. The next step into the program shows us the gameMaster. This object holds the methods to control the start of the game, change various choices within the setup and show or update the scores. The gameMaster then holds the gameBoard object, which controls the board itself and by extension the flow of the game.

In a separate file, computerBrain.js, I created a module to hold the ai opposition logic. After researching the minimax algorithm, I read through the steps required and turned it into code. The algorithm uses a recursive loop to iterate through every possible move from every possible cell all the way up to an end-game state, and return a score based on the outcome. Therefore, the computer is able to choose the cell which has the highest likelihood to end in a victory. As this algorithm essentially creates an unbeatable opponent, I then decided to implement a difficulty scaling. The scaling works by choosing either a completely random cell, or the best possible move as returned by the minimax function. The player can choose between four different difficulties, which pass the module a percentage to represent the chance of playing the best possible move.

The recursive minimax function was certainly the most difficult aspect of this project to complete.

After completing the four blocks I had set out to create at the beginning of my project, I then decided to add an additional module to the utilities file to control the drop-menu.

# Original README.md: tic-tac-toe
A simple tic-tac-toe game.
