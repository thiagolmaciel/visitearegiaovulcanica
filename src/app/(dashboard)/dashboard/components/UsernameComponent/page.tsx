'use server'
import { getServerSession } from "next-auth";


const UserGreetText = async () => {
  const session = await getServerSession()

      return (
       <p>{session?.user?.name}</p>
      );
};

export default UserGreetText;