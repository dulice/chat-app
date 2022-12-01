import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const Store = createContext();
const SOCKET_URL = "http://localhost:5000";
export const socket = io(SOCKET_URL);

export default function StoreProvider({children}) {
    const [members, setMembers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState("");
    const [privateRoom, setPrivateRoom] = useState("");
    const [messages, setMessages] = useState([]);

    const value = {socket, members, setMembers, rooms, setRooms, currentRoom, setCurrentRoom, privateRoom, setPrivateRoom, messages, setMessages};
    return(
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    )
}