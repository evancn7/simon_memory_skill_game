## The Simon Memory Game
##### Brief overview of game from programming perspective

There is one array for defined colors and another for the pattern and another for user input.

1. The start button is clicked by the user and the event handler is called.
2. The event handler calls a function.
3. This function change the indicator from red to green.
4. There is a wait of 3 seconds.
5. A random number is generated between 1 - 4 and this is the index to retrieve the color from defined colors.
6. This color is appended to the pattern array.
7. A for loop iterates the pattern array and calls a function to change the opacity to produce a flashing effect. The user see this on screen.
8. The user enters their guesses and this is added to the user array.
9. The user array is compared to the pattern array.

 on the button iterates through an array of "colors" and on each "color" calls a function to alter the opacity of the colors producing a flashing effect. To begin a random color is chosen from an array of defined colors and added to the pattern array.

- create array to choose random color
- write code block to pick a random color
- create and array to store the pattern
- write code block to add each next input to array (append)
