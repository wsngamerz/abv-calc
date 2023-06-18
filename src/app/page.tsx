"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

type Ingredient = {
  name: string;
  amount: number;
  abv: number;
};

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [abv, setAbv] = useState(0);
  const [valid, setValid] = useState(false);

  const [totalVol, setTotalVol] = useState(0);
  const [totalAbv, setTotalAbv] = useState(0);

  /**
   * Only set valid input if name, amount and abv are valid
   */
  useEffect(() => {
    if (
      name != "" &&
      amount > 0 &&
      amount <= 1000 &&
      abv >= 0 &&
      abv <= 100 &&
      ingredients.find((i) => i.name === name) == undefined
    ) {
      setValid(true);
      return;
    }

    setValid(false);
  }, [name, setValid, amount, abv, ingredients]);

  /**
   * Calculate total volume and abv
   * when ingredients change
   */
  useEffect(() => {
    // calculate total volume and abv
    const calcVol = ingredients.reduce((sum, i) => sum + i.amount, 0);
    const calcAlc = ingredients.reduce(
      (acc, i) => acc + i.amount * (i.abv / 100),
      0
    );
    const calcAbv = Number(((calcAlc / calcVol) * 100).toFixed(2));

    setTotalVol(calcVol);
    setTotalAbv(calcAbv || 0);
  }, [ingredients]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const onAbvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbv(Number(e.target.value));
  };

  const addIngredient = () => {
    // check if ingredient already exists
    const exists = ingredients.find((i) => i.name === name);

    if (!exists) {
      setIngredients((prev) => [...prev, { name, amount, abv }]);
      setName("");
      setAmount(0);
      setAbv(0);
    }
  };

  const removeIngredient = (name: string) => {
    setIngredients((prev) => prev.filter((i) => i.name !== name));
  };

  const resetIngredients = () => {
    setIngredients([]);
  };

  return (
    <main className="flex justify-center w-full my-16">
      <section className="w-full md:max-w-3xl border rounded p-4 m-4 space-y-4 bg-white drop-shadow-sm">
        <h1 className="font-bold text-xl text-center">
          Cocktail ABV Calculator
        </h1>

        <div className="bg-gray-50 border rounded p-4 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="grid items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                className="bg-white"
                type="text"
                value={name}
                onChange={onNameChange}
              />
            </div>

            <div className="grid items-center gap-2">
              <Label htmlFor="amount">Amount (ml)</Label>
              <Input
                id="amount"
                className="bg-white"
                type="number"
                value={amount}
                onChange={onAmountChange}
              />
            </div>

            <div className="grid items-center gap-2">
              <Label htmlFor="abv">ABV%</Label>
              <Input
                id="abv"
                className="bg-white"
                type="number"
                value={abv}
                onChange={onAbvChange}
              />
            </div>
          </div>
          <Button
            variant="default"
            className="w-full"
            disabled={!valid}
            onClick={addIngredient}
          >
            Add Ingredient
          </Button>
        </div>

        <div>
          <h2 className="font-bold text-lg">Ingredients</h2>
          {ingredients.length == 0 && <span>No ingredients</span>}
          <ul className="space-y-2">
            {ingredients.map((i) => (
              <li key={i.name}>
                <div className="space-x-2 flex items-center">
                  <span className="font-semibold">{i.name}</span>
                  <span className="text-sm text-gray-500">
                    ({i.amount}ml{i.abv > 0 && ` @ ${i.abv}%`})
                  </span>
                  <Trash
                    size={16}
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={() => removeIngredient(i.name)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg">Calculated</h2>
          <ul>
            <li>Total Vol: {totalVol}ml</li>
            <li>Total ABV: {totalAbv}%</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={resetIngredients}>
            Reset
          </Button>
        </div>
      </section>
    </main>
  );
}
