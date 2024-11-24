import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { transports : ['websocket'] });

const App = () => {
    const [diceValue, setDiceValue] = useState<number | null>(null);

    useEffect(() => {
        socket.on("dice-rolled", (data) => {
            setDiceValue(data.value);
        });

        return () => {
            socket.off("dice-rolled");
        };
    }, []);

    const handleRollDice = () => {
        socket.emit("roll-dice");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold">Ludo Game</h1>
            <button
                type="button"
                onClick={handleRollDice}
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Roll Dice
            </button>
            {diceValue !== null && (
                <p className="mt-3 text-xl">You rolled: {diceValue}</p>
            )}
        </div>
    );
};

export default App;
