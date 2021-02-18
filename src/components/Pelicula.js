import React, { Component } from 'react';

class Pelicula extends Component{
	marcar = () => {
		this.props.marcarFavorita(this.props.pelicula, this.props.indice);
	};
	render(){
		const {titulo, image} = this.props.pelicula;

		return(
			<article id="article-template" className="article-item">
				<div className="image-wrap">
					<img src={ image } alt={ titulo }/>
				</div>

				<h2>{ titulo }</h2>
				<span className="date">
					Hace 5 minutos
				</span>
				<a href="article.html">Leer mas</a>
				<button onClick={this.marcar}>
					Marcar como favorita
				</button>
				<div className="clearfix"></div>
			</article>
		);
	}
}

export default Pelicula;