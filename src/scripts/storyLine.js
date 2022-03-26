import { body, header, cursor, coronaCircle, eyes } from './cursorAndCorona';


const secondsForEachStage = [11, 14, 13, 18, 13, 11, 16, 11, 16, 11];

const pFailure = "you failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";
const pFailureAnon = "You failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";

const p = [
"Vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...",
"you made it! But the population grew and you need to vaccinate more people now!",
"you made it again! Now lets see if you can do it even faster!",
"great job! But bats are camming. Can you vaccinate them too?",
"you are awesome! Now lets see if you can do it with people that are in a hurry!",
]

const pAnon = [
    "Vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...",
    "You made it! But the population grew and you need to vaccinate more people now!",
    "You made it again! Now lets see if you can do it even faster!",
    "Great job! But bats are camming. Can you vaccinate them too?",
    "You are awesome! Now lets see if you can do it with people that are in a hurry!",]

export { secondsForEachStage, pFailure, pFailureAnon, p, pAnon };