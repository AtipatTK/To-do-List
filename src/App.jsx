import { useEffect, useState , useReducer } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NewTodoTask from "./components/NewTodoTask/NewTodoTask";
import TodoList from "./components/TodoList/TodoList";
import { HandelerContext } from "./context/handler-context";

let count = 4;

function uniqueId() {
  count = count + 1;
  return count;
}

const INITAL_TODOS = [
  {
    id: 1,
    task: "Read a book",
    dueDate: new Date("2023-02-28"),
    isFinished: false,
  },
  {
    id: 2,
    task: "Buy dog food",
    dueDate: new Date("2024-06-14"),
    isFinished: true,
  },
  {
    id: 3,
    task: "Go to cinema",
    dueDate: new Date("2023-05-20"),
    isFinished: true,
  },
  {
    id: 4,
    task: "Print homework",
    dueDate: new Date("2024-07-26"),
    isFinished: true,
  },
];

function reducer(todoList, action) {
  switch (action.type) {
    case "add_todo" :
      return [...todoList, action.newTodoItem]
    case "delete_todo" :
      return todoList.filter((e) => e.id !== action.deletedId)
    case "edit_todo" :
      const newTodoList = [...todoList];

      const index = todoList.findIndex((e) => e.id === action.editId);
      newTodoList[index] = { ...action.todo };
      return newTodoList
    default :
  }
}

function App() {

  const [todoList, dispatch] = useReducer(reducer, {}, () => {
    const localTodo = localStorage.getItem("todo");
    if (localTodo === null) {
      return INITAL_TODOS;
    }
    return JSON.parse(localTodo).map(e => {
      return {
        ...e,
        dueDate: new Date(e.dueDate),
      }
    });
  });

  const [curYear, setCurYear] = useState("2023");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList])

  const addNewTodo = (newTodo) => {
    const newTodoItem = {
      ...newTodo,
      id: uniqueId(),
    };

    dispatch({
      type: "add_todo",
      newTodoItem: newTodoItem,
    })
  };

  const deleteHandler = (id) => {
    dispatch({
      type: "delete_todo",
      deletedId: id,
    })
  };

  const editHandler = (id, todo) => {
    dispatch({
      type: "edit_todo",
      editId: id,
      todo: todo,
    })
  };

  return (
    <HandelerContext.Provider value={{
      addNewTodo: addNewTodo,
      deleteHandler: deleteHandler,
      editHandler: editHandler,
      }}>
    <div className="App">
      <Header value={curYear} onChange={(e) => setCurYear(e.target.value)} />
      {isShow ? (
        <NewTodoTask setIsShow={setIsShow}/>
      ) : (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => setIsShow(true)}>Add new Todo</button>
        </div>
      )}
      <TodoList
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        currentYear={curYear}
        todoList={todoList}
      />
    </div>
    </HandelerContext.Provider>
  );
}

export default App;
