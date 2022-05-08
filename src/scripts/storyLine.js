import { body, header, cursor, coronaCircle, eyes } from './cursorAndCorona';


const secondsForEachStage = [11, 14, 13, 18, 13, 16, 20, 18];
// 
const figuresPerStage = [7, 10, 10, 14, 10, 20, 20, 20];

const pFailure = "you failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";
const pFailureAnon = "You failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";

const p = [
"vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...",
"you made it! But the population grew and you need to vaccinate more people now!",
"you made it again! Now lets see if you can do it even faster!",
"great job! But bats are camming. Can you vaccinate them too?",
"you are awesome! Now lets see if you can do it with people that are in a hurry!",
"amazing work! Can you also vaccinate each person in only one second?",
"the Corona can't beat you! Lets try it now with the bats and faster!",
"you're almost at the end of your journy, only one stage to go!",
"you did it! You saved humanity! You ended the coronavirus disease and made XXX point."
]

const pAnon = [
    "Vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...",
    "You made it! But the population grew and you need to vaccinate more people now!",
    "You made it again! Now lets see if you can do it even faster!",
    "Great job! But bats are camming. Can you vaccinate them too?",
    "You are awesome! Now lets see if you can do it with people that are in a hurry!",
    "Amazing work! Can you also vaccinate each person in only one second?",
    "The Corona can't beat you! Lets try it now with the bats!",
    "You're almost at the end of your journy, only one stage to go!",
    "You did it! You saved humanity! You ended the coronavirus disease and made XXX point."
]

export { secondsForEachStage, figuresPerStage, pFailure, pFailureAnon, p, pAnon };