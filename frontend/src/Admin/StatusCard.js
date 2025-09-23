const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
