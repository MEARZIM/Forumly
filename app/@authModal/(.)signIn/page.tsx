
import { SignIn } from "@/components/layouts/SignIn"
import { AuthModal } from "@/components/modals/auth-modal"

export default function Page() {
  return (
    <AuthModal>
      <SignIn />
    </AuthModal>
  )
}
