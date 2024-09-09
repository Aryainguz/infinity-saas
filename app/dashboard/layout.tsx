import Dashboard from '@/components/HOC/Dashboard'
interface DashboardProps {
    children: React.ReactNode
}

const DashboardMain = ({ children }: DashboardProps) => {
    return (
        <Dashboard>
            <div>
                {children}
            </div>
        </Dashboard>
    )
}

export default DashboardMain 