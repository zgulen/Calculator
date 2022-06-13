const prevDisp = document.querySelector(".previous-display")
const currDisp = document.querySelector(".current-display")

const btnContainer = document.querySelector(".buttons-container")
let currOperand = ""
let prevOperand = ""
let operation = ""

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("num")) {
    appendNumber(e.target.textContent)
    updateDisplay()
  }
  if (e.target.classList.contains("operator")) {
    chooseOperator(e.target.textContent)
    updateDisplay()
  }
  if (e.target.classList.contains("equal")) {
    calculate()
    updateDisplay()
  }
  if (e.target.classList.contains("ac")) {
    currOperand = ""
    prevOperand = ""
    operation = ""
    updateDisplay()
  }
  if (e.target.classList.contains("pm")) {
    if (!currOperand) return
    currOperand = -currOperand
    updateDisplay()
  }
  if (e.target.classList.contains("percent")) {
    if (!currOperand) return
    currOperand /= 100;
    updateDisplay()
  }
})


const appendNumber = (num) => {
  if (num !== "." && currOperand === "0"){
    currOperand = num
    return
  } 
    if (num === "." && currOperand.includes(".")) return
    if (currOperand.length > 9) return
    currOperand += num
}

const updateDisplay = () => {
  if (currOperand.toString().length > 11){
    currOperand = Number(currOperand).toExponential(4)
  }
  currDisp.textContent = currOperand
  prevDisp.textContent = `${prevOperand} ${operation}`

}

const chooseOperator = (op) =>{
  if (prevOperand){
    calculate()
  }
  operation = op
  prevOperand = currOperand
  currOperand = ""
}

const calculate = () =>{
  let calculation = 0;
  const prev = Number(prevOperand)
  const curr = Number(currOperand)
  switch (operation) {
    case "+":
      calculation = prev + curr
      break;
    case "-":
      calculation = prev - curr
      break;
    case "x":
      calculation = prev * curr
      break;
    case "÷":
      calculation = prev / curr
      break;
  
    default:
      return;
  }
  currOperand = calculation
  prevOperand = ""
  operation = ""
}