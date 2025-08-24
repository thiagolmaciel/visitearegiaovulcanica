import supabase from "../../../../utils/supabase/client"
import DashboardForm from "./components/DashboardForm/DashboardForm"

export default async function Account() {

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return <DashboardForm user={user} />
}