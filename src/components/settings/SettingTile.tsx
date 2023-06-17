interface ISettingTileProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const SettingTile = ({ title, description, children }: ISettingTileProps) => {
  return (
    <div className="w-full flex justify-between items-center py-2 px-4 my-4 bg-white rounded-md">
        <div>
            <h3>{title}</h3>
            <p className="font-bold text-gray-400">{description}</p>
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default SettingTile