import { useEffect } from "react";

const App = () => {
    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-500">
                Welcome to Ludo Game
            </h1>
        </div>
    );
};

export default App;
