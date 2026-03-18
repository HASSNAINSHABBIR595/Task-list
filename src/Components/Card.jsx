import { FileText, CircleX, Download } from "lucide-react";
import { motion } from "framer-motion";

const Card = ({ data, reference, deleteTask, updatePosition }) => {
  return (
    <motion.div
      drag
      dragMomentum={true} // throwable
      whileDrag={{ scale: 1.1 }} // enlarge while dragging
      dragElastic={0.4} // springy
      dragConstraints={reference}
      dragTransition={{
        bounceStiffness: 200,
        bounceDamping: 10,
      }}
      onDragEnd={(e, info) => {
        // Keep card inside parent
        const parentRect = reference.current.getBoundingClientRect();
        const boundedX = Math.min(
          Math.max(0, info.point.x),
          parentRect.width - 240, // adjust card width
        );
        const boundedY = Math.min(
          Math.max(0, info.point.y),
          parentRect.height - 160, // adjust card height
        );

        updatePosition(data.id, { x: boundedX, y: boundedY });
      }}
      initial={{ x: data.position.x, y: data.position.y }} // set initial position only once
      className="
        flex flex-col
        justify-between
        w-60
        h-70
        bg-zinc-900 rounded-3xl
        p-5
        shadow-md
        cursor-grab
      "
    >
      {/* TOP CONTENT */}

      <div>
        <div className="flex justify-around gap-30">
          <div className="w-10 h-7 flex items-center justify-center bg-zinc-800 rounded-3xl mb-4">
            <FileText className="text-white" size={15} />
          </div>

          <div className="w-5 h-5 flex items-center justify-center rounded-xl mb-4">
            <CircleX
              className="text-white"
              size={15}
              onClick={() => {
                if (data.close) return;
                if (confirm("Delete this task?")) deleteTask(data.id);
              }}
            />
          </div>
        </div>

        <p
          className="text-zinc-300 font-semibold text-lg leading-snug mb-4
      "
        >
          {data.title}
        </p>

        <div className="flex items-center justify-between text-sm text-zinc-500">
          <span>{data.size} mb</span>
          {data.close ? <CircleX size={18} /> : <Download size={18} />}
        </div>
      </div>

      {data.tag.isopen && (
        <button
          className="bg-zinc-800 w-40 h-10  text-gray-300 rounded-2xl absolute
          bottom-5 left-[50%]
        translate-x-[-50%]"
        >
          {data.tag.tagTitle}
        </button>
      )}
    </motion.div>
  );
};

export default Card;
