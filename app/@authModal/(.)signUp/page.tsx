
import { SignUp } from "@/components/layouts/SignUp"
import { AuthModal } from "@/components/modals/auth-modal"


export default function Page() {
  return (
    <AuthModal>
      <SignUp />
    </AuthModal>
  )
}
