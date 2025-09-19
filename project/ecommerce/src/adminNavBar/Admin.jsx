import React from 'react'
import AdminNavBar from './AdminNavBar'

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.type !== "admin") {
  return <h2>Access denied</h2>
}

  return (
    <div>
        <AdminNavBar/>
        
    </div>
  )
}

export default Admin