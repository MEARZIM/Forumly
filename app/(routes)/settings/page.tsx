import React from 'react'

import { getAuthSession } from '@/auth';
import UserForm from '@/components/layouts/UserForm';

export const metadata = {
  title: 'Forumly | Settings',
  description: 'Manage account and settings'
}

const SettingsPage = async () => {

  const session = await getAuthSession();

  return (
    <div>
      <UserForm
        user={{
          id: session?.user.id!,
          username: session?.user.username || '',
        }}
        className='w-fit'
      />
    </div>
  )
}

export default SettingsPage
