import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Peliculas extends Component {
	state = {};

	cambiarTitulo = () => {
		var { peliculas } = this.state;
		peliculas[0].titulo = "Batman Begins";

		this.setState({
			peliculas: peliculas
		});
	};

	favorita = (pelicula, indice) => {
		console.log("favorita marcada");
		console.log(pelicula, indice);
		this.setState({
			peliculaFavorita: pelicula
		});
	};

	componentWillMount() {
		//Metodo del ciclo de vida
		//Los datos se cargan cuando se carga el componente en la pantalla
		console.log("Se va a cargar el componente");
		this.setState({
			peliculas: [
				{ titulo: 'Batman vs Superman', image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/08/batman-vs-superman.jpg' },
				{ titulo: '6 Grandes Heroes', image: 'https://1.bp.blogspot.com/-nV4Lo5hH-F0/VNGkYkj0z5I/AAAAAAAAHPo/pnGguGSPDrM/s1600/big%2Bhero%2B6%2Bwallpaper.jpg' },
				{ titulo: 'Intensamente', image: 'data:image/jpeg;base64,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' }
			],
			nombre: 'Lautaro Ceballos',
			peliculaFavorita: {}
		});
	}

	componentDidMount() {
		//Metodo del ciclo de vida
		//Los datos se cargan cuando se muestra el componente en la pantalla
		console.log("Se ha cargado el componente");
	}

	componentWillUnmount() {
		//Metodo del ciclo de vida
		//Los datos se cargan cuando se va a desmontar el componente
		console.log("Se va a desmontar el componente");
	}

	render() {
		var pStyle = {
			background: 'green',
			color: 'white',
			padding: '10px'
		};
		return (
			<React.Fragment>
				<Slider
					title="Bienvenido al Curso de ReactJS"
					btn={"Ir al blog"}
					size="slider-big"
				/>
				<div className="center">

					<div id="content" className="peliculas">
						<h2 className="subheader">Peliculas</h2>
						<p>Seleccion de las peliculas favoritas de {this.state.nombre}</p>
						<p>
							<button onClick={this.cambiarTitulo}>
								Cambiar titulo de Batman
					</button>
						</p>

						{/* Condicionales de JSX */}
						{this.state.peliculaFavorita.titulo &&
							<p className="favorita" style={pStyle}>
								<strong>
									La pelicula favorita es:
					</strong>
								<span>
									{this.state.peliculaFavorita.titulo}
								</span>
							</p>
						}

						{/* Condicional Ternario de JSX*/}
						{true ? (
							<p>
								Condicion verdadera
							</p>
						) : (
								<p>
									Condicion Falsa
								</p>
							)

						}


						{/*Crear componente pelicula*/}
						<div id="articles">
							{
								this.state.peliculas.map((pelicula, i) => {
									return (
										<Pelicula
											key={i}
											pelicula={pelicula}
											indice={i}
											marcarFavorita={this.favorita}
										/>
									);
								})
							}
						</div>
					</div>

					<Sidebar />
				</div>
			</React.Fragment>
		);
	}
}

export default Peliculas;