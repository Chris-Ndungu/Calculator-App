// THEME
const firstTheme = document.querySelector("#one");
const secondTheme = document.querySelector("#two");
const thirdTheme = document.querySelector("#three");

const toggle = document.querySelector(".toggle-switch");
const dataVisible = toggle.getAttribute("data-visible");

firstTheme.addEventListener("change", () => {
	firstTheme.setAttribute("data-visible", true);
	secondTheme.setAttribute("data-visible", false);
	thirdTheme.setAttribute("data-visible", false);

	document.querySelector("body").classList.remove("two");
	document.querySelector("body").classList.remove("three");
});

secondTheme.addEventListener("change", () => {
	secondTheme.setAttribute("data-visible", true);
	document.querySelector("body").classList.add("two");

	firstTheme.setAttribute("data-visible", false);
	document.querySelector("body").classList.remove("one");

	thirdTheme.setAttribute("data-visible", false);
	document.querySelector("body").classList.remove("three");
});
thirdTheme.addEventListener("change", () => {
	firstTheme.setAttribute("data-visible", false);
	secondTheme.setAttribute("data-visible", false);
	thirdTheme.setAttribute("data-visible", true);

	document.querySelector("body").classList.add("three");

	document.querySelector("body").classList.remove("one");
	document.querySelector("body").classList.remove("two");
});

// CALCULATOR
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".container");
const display = calculator.querySelector(".display-label");
const operatorKeys = keys.querySelectorAll('[data-type="operator"]');

const backspace = calculator.querySelector(".delete-key");

keys.addEventListener("click", (event) => {
	if (!event.target.closest("button")) return;

	const key = event.target;
	const keyValue = key.textContent;
	const displayValue = display.textContent;
	const { type } = key.dataset;
	const { previousKeyType } = calculator.dataset;
	calculator.dataset.previousKeyType = type;

	if (type === "number") {
		if (displayValue === "0" || previousKeyType === "operator") {
			display.textContent = keyValue;
		} else {
			display.textContent = displayValue + keyValue;
		}
	} else if (type === "operator") {
		operatorKeys.forEach((el) => {
			el.dataset.state = "";
		});
		key.dataset.state = "selected";

		calculator.dataset.firstNumber = displayValue;
		calculator.dataset.operator = key.dataset.key;
	} else if (type === "equal") {
		const firstNumber = calculator.dataset.firstNumber;
		const operator = calculator.dataset.operator;
		const secondNumber = displayValue;
		display.textContent = calculate(firstNumber, operator, secondNumber);
	} else if (type === "clear") {
		display.textContent = "0";
		delete calculator.dataset.firstNumber;
		delete calculator.dataset.operator;
	} else if (type === "delete") {
		backspace.onclick = deleteSingle();
	}
});

function deleteSingle() {
	backspaceValue = display.textContent;
	display.textContent = backspaceValue.substr(0, backspaceValue.length - 1);
}

function calculate(firstNumber, operator, secondNumber) {
	firstNumber = parseInt(firstNumber);
	secondNumber = parseInt(secondNumber);

	if (operator === "plus") return firstNumber + secondNumber;
	if (operator === "minus") return firstNumber - secondNumber;
	if (operator === "times") return firstNumber * secondNumber;
	if (operator === "divide") return firstNumber / secondNumber;
}
