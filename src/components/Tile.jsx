export default function Tile({ text, number, color }) {

  const getStatusColor = () => {
    return color;
  };

  return (
    <div
      className={`flex flex-col gap-4 lg:w-56 w-40 h-20 rounded-lg drop-shadow-lg bg-gray-800 items-center justify-center text-center text-white lg:text-lg text-sm font-bold`}
    >
      <div className="flex items-center justify-center lg:gap-4 gap-2 lg:flex-nowrap flex-wrap">
      <p>{text}</p>
      <p className={`${getStatusColor()}`}>{number}</p>
      </div>
    </div>
  );
}
