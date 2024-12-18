
import getCurrentUser from "@/actions/getCurrentUser";

async function Sidebar({ children }: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <main className="lg:pl-0 h-full">
        {children}
      </main>
    </div>
  )
}

export default Sidebar;