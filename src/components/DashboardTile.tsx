interface IDashboardTileProps {
  title: string;
  value: number;
  icon: JSX.Element;
}

const DashboardTile = ({ title, value, icon }: IDashboardTileProps) => {
  return (
    <div className="p-5 bg-neutral_white rounded">
      <div className="inline-block rounded p-3 bg-deep_blue text-white my-2">
        {icon}
      </div>
      <h5 className="font-bold text-xl text-dark">{value} {title}</h5>
    </div>
  )
}

export default DashboardTile