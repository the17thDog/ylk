import { Link, Outlet } from "react-router-dom"

const Settings = () => {
  return (
    <div>
      <Link to='/'>to home</Link>
      settings page
      <Outlet />
    </div>
  )
}

export default Settings
