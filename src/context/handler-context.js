import { createContext } from "react";

export const HandelerContext = createContext({
    addNewTodo: (newTodo) => {},
    deleteHandler: (id) => {},
    editHandler: (id, todo) => {},
});