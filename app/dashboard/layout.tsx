import Dashboard from '@/components/HOC/Dashboard'
interface DashboardProps {
    children: React.ReactNode
}

const DashboardMain = ({ children }: DashboardProps) => {
    return (
            <div>
                {children}
            </div>
    )
}

export default DashboardMain 