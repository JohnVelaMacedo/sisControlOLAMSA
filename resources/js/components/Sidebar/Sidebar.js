import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import "./Sidebar.css";

class Sidebar extends Component {
	render() {
		const { tipo } = this.props;
		var aside = "";
		switch (tipo) {
			case 1:
				aside = (
					<li className="nav-item has-treeview">
						<a href="#" className="nav-link">
							<i className="nav-icon fa fa-folder"></i>
							<p>
								Administrador
                                <i className="fa fa-angle-right right"></i>
							</p>
						</a>
						<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
							<li className="nav-item">
								<Link to="/ejemplo" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Ejemplo</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/ejemplo2" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Ejemplo 2</p>
								</Link>
							</li>
						</ul>
					</li>
				);
				break;
			case 2:
				aside = (
					<li className="nav-item has-treeview">
						<a href="#" className="nav-link">
							<i className="nav-icon fa fa-folder"></i>
							<p>
								Supervisor
                                <i className="fa fa-angle-right right"></i>
							</p>
						</a>
						<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
							<li className="nav-item">
								<Link to="/ejemplo" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Ejemplo</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/ejemplo2" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Ejemplo 2</p>
								</Link>
							</li>
						</ul>
					</li>
				);
				break;
			case 3:
				aside = (
					<li className="nav-item has-treeview">
						<a href="#" className="nav-link">
							<i className="nav-icon fa fa-folder"></i>
							<p>
								Agente Garita
                                <i className="fa fa-angle-right right"></i>
							</p>
						</a>
						<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
							<li className="nav-item">
								<Link to="/ejemplo" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Ejemplo</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/ejemplo2" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Ejemplo 2</p>
								</Link>
							</li>
						</ul>
					</li>
				);
				break;
			case 4:
				aside = (
						<li className="nav-item has-treeview">
							<a href="#" className="nav-link">
								<i className="nav-icon fa fa-folder"></i>
								<p>
									Pendiente Descarga
                                    <i className="fa fa-angle-right right"></i>
								</p>
							</a>
							<ul className="nav nav-treeview" style={{ paddingLeft: '6px' }}>
								<li className="nav-item">
									<Link to="/pendiente-descarga" className="nav-link">
										<i className="fa fa-list-ol nav-icon"></i>
										<p>Listado</p>
									</Link>
								</li>
							</ul>
						</li>
				);
				break;
			default:
				break;
		}
		return (
			<aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ minHeight: '600px' }}>
				<Link className="brand-link text-center" to="/home">
					<span className="brand-text font-weight-light">Control</span>
				</Link>
				<div className="sidebar">
					<nav className="mt-2">
						<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" 
							data-accordion="false">
							{aside}
						</ul>
					</nav>
				</div>
			</aside>
		);
	}
}

export default Sidebar;