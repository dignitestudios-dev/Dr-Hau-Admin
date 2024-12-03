import React from 'react'
import UsersTable from '../../components/Users/UsersTable';

const Users = () => {
  return (
    <div className="w-full p-6 rounded-md shadow-md overflow-auto">
    <UsersTable />
  </div>  )
}

export default Users