// import { ProfileDashboard } from '@/components/custom/profileDashboard'
// import { useGetUserById } from '@/hooks/useGetUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
    component: Profile,
})

function Profile() {
    // const { user, refetchUser } = useGetUserById()

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                {/* {user && (
                    <ProfileDashboard refetchUser={refetchUser} user={user} />
                )} */}
                Profile
            </div>
        </>
    )
}
