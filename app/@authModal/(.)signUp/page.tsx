import { SignUp } from "@/components/layouts/SignUp"
import CloseModalButton from "@/components/ui/closeModalButton"


const page = () => {
  return (
    <div className='fixed inset-0 bg-slate-900/30 z-10'>
      <div className='container flex items-center h-full max-w-lg mx-auto'>
        <div className='relative bg-white w-full h-fit py-20 px-2 rounded-xl'>
          <div className='absolute top-4 right-4'>
            <CloseModalButton />
          </div>

          <SignUp />
        </div>
      </div>
    </div>
  )
}

export default page