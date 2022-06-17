const instructionsPTag = document.querySelector('#instructions p');

const secondsForEachStage = [11, 14, 13, 18, 17, 13, 22, 20];
// 
const figuresPerStage = [7, 10, 10, 14, 20, 10, 20, 20];

const p = [
"vaccinate the world's population and help fight the coronavirus. If you fail, a new variant will arrive...",
"you made it! But the population grew and you need to vaccinate more people now!",
"you made it again! Now let's see if you can do it even faster!",
"great job! But bats are coming and need to get vaccinated too. Can you do that?",
"amazing work! Can you vaccinate more people in less time?",
"you are awesome! Now let's see if you can do it while people are in a hurry!",
"the coronavirus can't beat you! Let's try it fast and with the bats!",
"you're almost at the end of your journey. Only one stage to go!",
"congratulations! You ended the coronavirus. Now, start over and try to gain the world's highest score."
]

const pAnon = [
    "Vaccinate the world's population and help fight the coronavirus. If you fail, a new variant will arrive...",
    "You made it! But the population grew and you need to vaccinate more people now!",
    "You made it again! Now let's see if you can do it even faster!",
    "Great job! But bats are coming and need to get vaccinated too. Can you do that?",
    "Amazing work! Can you vaccinate more people in less time?",
    "You are awesome! Now let's see if you can do it while people are in a hurry!",
    "The coronavirus can't beat you! Let's try it fast and with the bats!",
    "You're almost at the end of your journey. Only one stage to go!",
    "Congratulations! You ended the coronavirus. Now, start over and try to gain the world's highest score."
]

export { instructionsPTag, secondsForEachStage, figuresPerStage, p, pAnon };