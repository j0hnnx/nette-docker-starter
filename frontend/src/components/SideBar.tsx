import {NavLink} from "react-router-dom";

const links = [
    { to: '/', label: 'Home'},
    { to: '/todo', label: 'Todo List'}
]

export default function SideBar() {
    return (
        <div className="d-flex flex-column vh-100 bg-white border-end" style={{ width: 220 }}>
            <div className="p-3 border-bottom">
                <small className="text-muted text-uppercase" style={{ letterSpacing: '0.08em', fontSize: 11 }}>Nette + React</small>
                <div className="fw-medium mt-1">My Projects</div>
            </div>
            <nav className="p-2 flex-grow-1">
                <small className="text-muted text-uppercase px-2" style={{ fontSize: 11, letterSpacing: '0.07em' }}>Projects</small>
                {links.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end
                        className={({ isActive }) =>
                            `d-flex align-items-center px-3 py-2 rounded text-decoration-none mt-1 ${
                                isActive ? 'bg-primary bg-opacity-10 text-primary fw-medium' : 'text-secondary'
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    )
}