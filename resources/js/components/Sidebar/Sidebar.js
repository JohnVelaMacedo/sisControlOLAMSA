import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import "./Sidebar.css";
import OLAMSA from "../../olamsa.png";

class Sidebar extends Component {
	render() {
		const { tipo } = this.props;
		var aside = "";
		switch (tipo) {
			case 1:
				aside = (
					<div>
						<li className="nav-item has-treeview">
						<a href="#" className="nav-link">
							<i className="nav-icon fa fa-user-circle-o"></i>
							<p>
								Usuarios
                                <i className="fa fa-angle-right right"></i>
							</p>
						</a>
						<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
							<li className="nav-item">
								<Link to="/adminRegUsu" className="nav-link">
								<i className="fa fa-plus-square nav-icon"></i>
									<p>Agregar</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/listaUsu" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Lista de Usuarios</p>
								</Link>
							</li>
							
						</ul>
					</li>
					<li className="nav-item has-treeview">
						<a href="#" className="nav-link">
							<i className="nav-icon fa fa-car"></i>
							<p>
								Tipo de Vehículo
                                <i className="fa fa-angle-right right"></i>
							</p>
						</a>
						<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
							<li className="nav-item">
								<Link to="/adminRegTipoVehiculo" className="nav-link">
								<i className="fa fa-plus-square nav-icon"></i>
									<p>Agregar</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/listaTipoV" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Lista de tipos de vehículos</p>
								</Link>
							</li>
							
						</ul>
					</li>
					<li className="nav-item has-treeview">
						<a href="#" className="nav-link">
							<i className="nav-icon fa fa-database"></i>
							<p>
								Proveedor
                                <i className="fa fa-angle-right right"></i>
							</p>
						</a>
						<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
							<li className="nav-item">
								<Link to="/adminRegProv" className="nav-link">
								<i className="fa fa-plus-square nav-icon"></i>
									<p>Agregar</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/listaProv" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Lista de Proveedores</p>
								</Link>
							</li>
							
						</ul>
					</li>
					<li className="nav-item has-treeview">
						<a href="#" className="nav-link">
							<i className="nav-icon fa fa-users"></i>
							<p>
								Comite
                                <i className="fa fa-angle-right right"></i>
							</p>
						</a>
						<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
							<li className="nav-item">
								<Link to="/adminRegComite" className="nav-link">
								<i className="fa fa-plus-square nav-icon"></i>
									<p>Agregar</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/listaCom" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Lista de Comités</p>
								</Link>
							</li>
							
						</ul>
					</li>
						<li className="nav-item has-treeview">
							<a href="#" className="nav-link">
								<i className="nav-icon fa fa-sign-in"></i>
								<p>
									Registro Entrada
									<i className="fa fa-angle-right right"></i>
								</p>
							</a>
							<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
								<li className="nav-item">
									<Link to="/agenteRegistro-as" className="nav-link">
									<i className="fa fa-plus-square nav-icon"></i>
										<p>Agregar</p>
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/listaAgenteReg-as" className="nav-link">
										<i className="fa fa-list-ol nav-icon"></i>
										<p>Lista de Registros</p>
									</Link>
								</li>
								
							</ul>
						</li>
						<li className="nav-item has-treeview">
							<Link to="/listaPendienteEntrada" className="nav-link">
								<i className="nav-icon fa fa-exchange"></i>
								<p>
									Pendiente Entrada Salida
								</p>
							</Link>
						</li>
						<li className="nav-item has-treeview">
							<a href="#" className="nav-link">
								<i className="fa fa-archive" aria-hidden="true"></i>
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
						<li className="nav-item has-treeview">
							<Link to="listaReporte" className="nav-link">
								<i className="nav-icon fa fa-file-pdf-o"></i>
								<p>
									Reportes
								</p>
							</Link>
						</li>
					</div>
				);
				break;
			case 2:
				aside = (
					<div>
						<li className="nav-item has-treeview">
							<a href="#" className="nav-link">
								<i className="nav-icon fa fa-sign-in"></i>
								<p>
									Registro Entrada
									<i className="fa fa-angle-right right"></i>
								</p>
							</a>
							<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
								<li className="nav-item">
									<Link to="/agenteRegistro-as" className="nav-link">
									<i className="fa fa-plus-square nav-icon"></i>
										<p>Agregar</p>
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/listaAgenteReg-as" className="nav-link">
										<i className="fa fa-list-ol nav-icon"></i>
										<p>Lista de Registros</p>
									</Link>
								</li>
								
							</ul>
						</li>
						<li className="nav-item has-treeview">
							<Link to="/listaPendienteEntrada" className="nav-link">
								<i className="nav-icon fa fa-exchange"></i>
								<p>
									Pendiente Entrada Salida
								</p>
							</Link>
						</li>
						<li className="nav-item has-treeview">
							<a href="#" className="nav-link">
								<i className="fa fa-archive" aria-hidden="true"></i>
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
						<li className="nav-item has-treeview">
							<Link to="listaReporte" className="nav-link">
								<i className="nav-icon fa fa-file-pdf-o"></i>
								<p>
									Reportes
								</p>
							</Link>
						</li>
					</div>
				);
				break;
			case 3:
				aside = (
					<div>
						<li className="nav-item has-treeview">
						<a href="#" className="nav-link">
							<i className="nav-icon fa fa-sign-in"></i>
							<p>
								Registro Entrada
                                <i className="fa fa-angle-right right"></i>
							</p>
						</a>
						<ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
							<li className="nav-item">
								<Link to="/agenteRegistro" className="nav-link">
								<i className="fa fa-plus-square nav-icon"></i>
									<p>Agregar</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/listaAgenteReg" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Lista de Registros</p>
								</Link>
							</li>
							
						</ul>
					</li>
					<li className="nav-item has-treeview">
						<Link to="/listaPendienteEntrada" className="nav-link">
							<i className="nav-icon fa fa-exchange"></i>
							<p>
								Pendiente Entrada Salida
                                {/* <i className="fa fa-angle-right right"></i> */}
							</p>
						</Link>
						{/* <ul className="nav nav-treeview" style={{ paddingLeft: '10px' }}>
							<li className="nav-item">
								<Link to="/agenteRegistro" className="nav-link">
								<i className="fa fa-plus-square nav-icon"></i>
									<p>Agregar</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/" className="nav-link">
									<i className="fa fa-list-ol nav-icon"></i>
									<p>Lista</p>
								</Link>
							</li>
							
						</ul> */}
					</li>
					</div>
				);
				break;
			case 4:
				aside = (
						<li className="nav-item has-treeview">
							<a href="#" className="nav-link">
								<i className="fa fa-archive" aria-hidden="true"></i>
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
			<aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ minHeight: '500px' }}>
				<Link className="brand-link text-center" to="/home">
					<img src={OLAMSA} alt="Olamsa" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
					<span className="brand-text font-weight-light">Sistema de Control</span>
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