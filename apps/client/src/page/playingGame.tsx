import InGameSelection from "../components/inGameSelection.tsx";

function PlayingGame() {
    const isMe = true;
    const handleClick = async () => {
    }
    return (
        <div className="p-10 flex justify-evenly h-screen items-center">
            {isMe ? <InGameSelection playerNick="P1 Name"/> : <InGameSelection playerNick="P2 name"/>}
            <div className="grow flex-col flex items-center justify-evenly h-48">
                <h3 className="font-bold text-2xl">Resultado</h3>
                <span className="text-xs bg-gray-300 rounded-full text-gray-800 font-medium px-2 py-0.5 me-2">Esperando jugador...</span>
                <button className="underline" onClick={handleClick}>
                    Abandonar
                </button>
            </div>
            {isMe ? <InGameSelection playerNick="P2 Name"/> : <InGameSelection playerNick="P1 name"/>}
        </div>
    );
}

export default PlayingGame;