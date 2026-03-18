import { useRef, useState,useEffect } from "react";
import Card from "./Card";
import InputBox from "./InputBox";
const Forground = () => {
  const ref = useRef(null);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const addTask = (note) => {
    const newTask = {
      id: Date.now(),
      title: note,
      size: Math.floor(Math.random() * 10),
      close: false,
      position: { x: 0, y: 0 },
      tag: { isopen: true, tagTitle: "New Task" },
    };
    setTasks((prev) => [...prev, newTask]);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const updatePosition = (id, pos) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, position: pos } : task)),
    );
  };
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
//hasnain
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-10 w-full h-full
    p-5
    flex flex-wrap gap-10"
    >
      <div>
        <InputBox addTask={addTask} />
      </div>
      {tasks.map((task) => (
        <Card
          key={task.id}
          data={task}
          reference={ref}
          deleteTask={deleteTask}
          updatePosition={updatePosition}
        />
      ))}
    </div>
  );
};

export default Forground;
