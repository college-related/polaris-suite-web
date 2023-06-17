interface IDashboardTileProps {
    title: string;
    value: number;
    icon: JSX.Element;
}

const DashboardTile = ({ title, value, icon }: IDashboardTileProps) => {
  return (
    <div className=" p-5 bg-white border rounded shadow">
      <div className="w-full h-32 flex items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded p-3 bg-green-600 text-white">
              {icon}
          </div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h5 className="font-bold uppercase text-gray-400">{title}</h5>
          <h3 className="font-bold text-3xl text-gray-600">{value}</h3>
        </div>
      </div>
    </div>
  )
}

export default DashboardTile