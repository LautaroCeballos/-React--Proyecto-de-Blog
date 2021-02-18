import React, {Component} from 'react';

class MiComponente extends Component{
	render(){
		let receta = {
			nombre: 'piza',
			ingredientes: ['Tomate', 'Queso', 'Jamon Cocido'],
			calorias: 400
		}

		return(
			<React.Fragment>
			{
				/*La etiqueta React.Fragment permite agrupar etiquetas para renderizar sin tener que crear elemenetos extra en el DOM*/
			}
				<h1>{'Receta: ' + receta.nombre}</h1>
				<h2>{'Calorias: ' + receta.calorias}</h2>
				<ol>
					{
						receta.ingredientes.map((ingrediente, i) => {
							/*SIEMPRE es necesario usar el artibuto Key inicializada con el indice cuando se hace un bucle de un elemento*/
							return(
								<li key={i}>
									{ ingrediente }
								</li>
							)
						})
					}
				</ol>
				<hr/>
			</React.Fragment>	
		);
	}
}

export default MiComponente;