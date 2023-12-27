import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPaper, faHandRock, faHandScissors} from "@fortawesome/free-solid-svg-icons";

interface Props {
    playerNick: string
}
function InGameSelection(props: Props) {
    return (
        <div className="w-1/3">
            <div className="border row-span-3 rounded p-5 shadow flex flex-col justify-evenly items-center h-72">
                <h3 className="font-bold text-xl">{props.playerNick}</h3>
                <button className="bg-gray-800 hover:bg-gray-900 text-white p-2 w-1/3 rounded">
                    Piedra
                    <FontAwesomeIcon className="mx-1" icon={faHandRock}/>
                </button>
                <button className="bg-gray-800 hover:bg-gray-900 text-white p-2 w-1/3 rounded">
                    Papel
                    <FontAwesomeIcon className="mx-1" icon={faHandPaper}/>
                </button>
                <button className="bg-gray-800 hover:bg-gray-900 text-white p-2 w-1/3 rounded">
                    Tijeras
                    <FontAwesomeIcon className="mx-1" icon={faHandScissors}/>
                </button>
            </div>
        </div>
    );
}

export default InGameSelection;