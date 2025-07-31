import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  return (
    <Card className="w-full max-w-xs mx-auto p-6 bg-calculator-bg border-none shadow-2xl">
      <div className="space-y-4">
        {/* Display */}
        <div className="bg-calculator-display p-4 rounded-lg">
          <div className="text-right text-2xl font-mono font-bold text-white min-h-8 overflow-hidden">
            {display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1: Clear buttons */}
          <Button
            onClick={clear}
            className="bg-calculator-clear hover:bg-calculator-clear/80 text-white font-semibold h-12 text-sm"
          >
            AC
          </Button>
          <Button
            onClick={clearEntry}
            className="bg-calculator-clear hover:bg-calculator-clear/80 text-white font-semibold h-12 text-sm"
          >
            CE
          </Button>
          <Button
            onClick={() => inputOperation("÷")}
            className="bg-calculator-operator hover:bg-calculator-operator/80 text-white font-semibold h-12 text-lg"
          >
            ÷
          </Button>
          <Button
            onClick={() => inputOperation("×")}
            className="bg-calculator-operator hover:bg-calculator-operator/80 text-white font-semibold h-12 text-lg"
          >
            ×
          </Button>

          {/* Row 2: Numbers 7-9 and minus */}
          <Button
            onClick={() => inputNumber("7")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber("8")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber("9")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            9
          </Button>
          <Button
            onClick={() => inputOperation("-")}
            className="bg-calculator-operator hover:bg-calculator-operator/80 text-white font-semibold h-12 text-lg"
          >
            −
          </Button>

          {/* Row 3: Numbers 4-6 and plus */}
          <Button
            onClick={() => inputNumber("4")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber("5")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber("6")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            6
          </Button>
          <Button
            onClick={() => inputOperation("+")}
            className="bg-calculator-operator hover:bg-calculator-operator/80 text-white font-semibold h-12 text-lg"
          >
            +
          </Button>

          {/* Row 4: Numbers 1-3 and equals (spans 2 rows) */}
          <Button
            onClick={() => inputNumber("1")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber("2")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber("3")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            3
          </Button>
          <Button
            onClick={performCalculation}
            className="bg-calculator-equals hover:bg-calculator-equals/80 text-calculator-bg font-semibold row-span-2 text-lg"
          >
            =
          </Button>

          {/* Row 5: Zero (spans 2 columns) and decimal */}
          <Button
            onClick={() => inputNumber("0")}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 col-span-2 text-lg"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-calculator-number hover:bg-calculator-number/80 text-calculator-bg font-semibold h-12 text-lg"
          >
            .
          </Button>
        </div>
      </div>
    </Card>
  );
};