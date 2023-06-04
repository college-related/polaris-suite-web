
interface IProtectedLayoutProps {
    children: JSX.Element
}

const ProtectedLayout = ({ children }: IProtectedLayoutProps) => {
  return (
    <main className="grid grid-cols-5">
        <div className="col-span-1 p-5 bg-purple-300 h-screen">Sidebar</div>
        <div className="col-span-4 p-5 h-screen overflow-y-scroll">
            {children}
        </div>
    </main>
  )
}

export default ProtectedLayout