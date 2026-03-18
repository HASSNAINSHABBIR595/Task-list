import { useState } from "react";

const InputBox = ({ addTask }) => {
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!note.trim()) return;
    addTask(note);
    setNote(""); // clear input
  };

  return (
    <div
      className="
    absolute
    bottom-28
    left-[50%]
    translate-x-[-50%]
    flex gap-3"
    >
      <input
        type="text"
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a Task..."
        className="px-4 py-5 rounded-xl bg-zinc-700 text-white outline-none w-64"
      />

      <button
        onClick={handleAdd}
        className="px-6 py-2 bg-yellow-600 rounded-xl text-white"
      >
        Add
      </button>
    </div>
  );
};

export default InputBox;
