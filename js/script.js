


document.addEventListener('DOMContentLoaded', (event) => {
    const previousOperationText = document.querySelector("#previous-operations");
    const currentOperationText = document.querySelector("#current-operations");
    const buttons = document.querySelectorAll("#buttons-container button");

    class Calculator {
        constructor(previousOperationText, currentOperationText) {
            this.previousOperationText = previousOperationText;
            this.currentOperationText = currentOperationText;
            this.clear();
        }

        clear() {
            this.currentOperation = "";
            this.previousOperation = "";
            this.operation = undefined;
        }

        delete() {
            this.currentOperation = this.currentOperation.toString().slice(0, -1);
        }

        appendNumber(number) {
            if (number === '.' && this.currentOperation.includes('.')) return;
            this.currentOperation = this.currentOperation.toString() + number.toString();
        }

        chooseOperation(operation) {
            if (this.currentOperation === '') return;
            if (this.previousOperation !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperation = this.currentOperation;
            this.currentOperation = '';
        }

        compute() {
            let computation;
            const prev = parseFloat(this.previousOperation);
            const current = parseFloat(this.currentOperation);
            if (isNaN(prev) || isNaN(current)) return;
            switch (this.operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            this.currentOperation = computation;
            this.operation = undefined;
            this.previousOperation = '';
        }

        updateDisplay() {
            this.currentOperationText.innerText = this.currentOperation;
            if (this.operation != null) {
                this.previousOperationText.innerText = `${this.previousOperation} ${this.operation}`;
            } else {
                this.previousOperationText.innerText = '';
            }
        }
    }

    const calculator = new Calculator(previousOperationText, currentOperationText);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            switch (button.innerText) {
                case 'CE':
                    calculator.clear();
                    calculator.updateDisplay();
                    break;
                case 'DEL':
                    calculator.delete();
                    calculator.updateDisplay();
                    break;
                case '=':
                    calculator.compute();
                    calculator.updateDisplay();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    calculator.chooseOperation(button.innerText);
                    calculator.updateDisplay();
                    break;
                default:
                    calculator.appendNumber(button.innerText);
                    calculator.updateDisplay();
                    break;
            }
        });
    });
});
