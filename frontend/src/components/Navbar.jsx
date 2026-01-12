import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">
          <div className="brand-title">活動報名與名單管理系統</div>
          <div className="brand-sub">Events + Registrations CRUD</div>
        </div>

        <nav className="nav-links">
          <NavLink className="btn btn-ghost" to="/events">活動列表</NavLink>
          <NavLink className="btn btn-ghost" to="/events/new">新增活動</NavLink>
        </nav>
      </div>
    </header>
  );
}
