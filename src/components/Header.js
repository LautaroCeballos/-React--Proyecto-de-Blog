import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<header id="header">
				<div className="center">
					<div id="logo">
						<img src={logo} className="app-logo" alt="logotipo" />
						<span id="brand">
							<strong>Curso</strong>React
						</span>
					</div>

					<nav id="menu">
						<ul>
							<li>
								<NavLink to="/home" activeClassName="active" >Inicio</NavLink>
							</li>
							<li>
								<NavLink to="/blog" activeClassName="active">Blog</NavLink>
							</li>
							<li>
								<NavLink to="/formulario" activeClassName="active">Formulario</NavLink>
							</li>
							<li>
								<NavLink to="/peliculas" activeClassName="active">Peliculas</NavLink>
							</li>
							<li>
								<NavLink to="/pruebas/Lautaro" activeClassName="active">Pagina 2</NavLink>
							</li>
						</ul>
					</nav>
					<div className="clearfix"></div>
				</div>
			</header>
		);
	}
}

export default Header;