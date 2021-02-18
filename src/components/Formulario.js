import React, { Component } from 'react';
// import Slider from './Slider';
import Sidebar from './Sidebar';

class Formulario extends Component {
    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    sexoHombreRef = React.createRef();
    sexoMujerRef = React.createRef();
    sexoOtroRef = React.createRef();

    state = {
        user: {}
    };

    recibirFormulario = (e) => {
        e.preventDefault(); //Evita que la pagina recargue cuando se hace el submit del formulario

        let genero;

        if(this.sexoHombreRef.current.checked){
            genero = this.sexoHombreRef.current.value;
        } else if(this.sexoMujerRef.current.checked){
            genero = this.sexoMujerRef.current.value;
        } else {
            genero = this.sexoOtroRef.current.value;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        }

        this.setState({
            user: user
        });

        console.log("Formulario Enviado");
        console.log(this.nombreRef.current.value);
    };

    render() {
        let user = this.state.user;
        return (
            <React.Fragment>
                <h1 className="subheader">Formulario</h1>
                <div className="center">
                    <div id="content">
                        {/* Mostrar datos del formulario */}
                        {this.state.user.nombre &&
                            <div id="user-data">
                                <p>Nombre: <strong>{user.nombre}</strong></p>
                                <p>apellido: <strong>{user.apellido}</strong></p>
                                <p>bio: <strong>{user.bio}</strong></p>
                                <p>genero: <strong>{user.genero}</strong></p>
                            </div>
                        }

                        {/* Fomulario */}
                        {/* El atributo onChange funciona como {{}} de angular para poder mostrar contenido reactivamente */}
                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.sexoHombreRef}/> Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.sexoMujerRef}/> Mujer
                                <input type="radio" name="genero" value="otro" ref={this.sexoOtroRef}/> Otro
                            </div>

                            <div className="clearfix"></div>
                            <input type="submit" value="Enviar" className="btn btn-success"/>
                        </form>
                    </div>
                    
                    <Sidebar
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Formulario;
