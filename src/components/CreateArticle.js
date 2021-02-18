import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';

// Validacion de formularios y alertas

class CreateArticle extends Component{
    urlApi = Global.urlApi;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    //  El fomulario, por cada tecla que se presione
    //  cambia el state dinamicamente por el metodo
    //  changeState()

    //  El metodo saveArticle() se asocia al submit
    //  del formulario, hace una peticion ajax y envia
    //  el article a la apiRest

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });

        //Cada vez que los datos del formulario cambian se comprobaran las validaciones del validator
        this.validator.showMessages();
        this.forceUpdate(); //Forzamos la actualizacion del formulario ?
    }

    saveArticle = (e) => {
        e.preventDefault();

        //Rellenar el state con el fomulario
        this.changeState();

        //Si las validaciones del fomulario son correctas se procedera a realizar la peticion ajax por medio de axios
        if(this.validator.allValid()){
        //Hacer una peticion http por post para guardar el articulo
            axios.post(this.urlApi + 'save/', this.state.article)
                .then(res => {
                    if(res.data.article){
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        //Subir la imagen
                        if(this.state.selectedFile !== null){
                            //Sacar el id del articulo guardado
                            var articleId = this.state.article._id;

                            //Crear un formData y añadirle un fichero
                            const formData = new FormData();

                            formData.append( //Le vinculamos un fichero con el metodo append
                                'file0', //Nombre del fichero que va a recibir el apiRest (Es el mismo nombre)
                                this.state.selectedFile, //Datos del fichero que se quiere cargar
                                this.state.selectedFile.name //Nombre que el fichero va a guardar
                            );
                            //Peticion ajax con axios
                            axios.post(this.urlApi + 'upload-image/' + articleId, formData)
                                .then(res => {
                                    if(res.data.article){
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    }else{
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });

                        }else{
                            this.setState({
                                status: 'success'
                            });
                        }

                        //Libreria de alertas
                        swal(
                            'Articulo creado',
                            'El articulo ha sido creado correctamente',
                            'success'   
                        );

                    } else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                })
                .catch(err => {
                    console.log(err);

                    this.setState({
                        status: 'failed'
                    });
                    
                    swal(
                        'Intente nuevamente',
                        'Hubo un error y el articulo no se ha guardado correctamente',
                        'error'   
                    );
                })
        }else{ //En caso de fallo en las validaciones se cargara un status failed en el state
            this.setState({
                status: 'failed'
            });
        }
    }

    fileChange = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    componentWillMount(){
        //Cuando el componente se inicializa se instancia la variable del validator
        //Si quisiera personalizar los mensajes debo pasarle a la instancia un JSON con los datos a mostrar
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido',
                alpha_num_space: 'Solo se aceptan caracteres alfanumericos y espacios'
            }
        });
    }

    render(){
        if(this.state.status === 'success'){
            return <Redirect to="/blog"/>
        }

        return(
            <div className="center">
                <section id="content">
                    <h1 className="subheader"> Crear Articulo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle} onChange={this.changeState}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} />
                            
                            {/* 
                                Va a mostrar un mensaje cuando falle el campo con el NAME que nosotros le indiquemos
                                La propiedad a la cual esta referido este mensaje debe ser el dato en donde se aloja en el state
                                Como 3er parametro se le deben indicar las reglas de validaciones
                            */}
                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}

                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef}></textarea>

                            {/* Tambien se pueden implementar validaciones de HTML5 a la par si fuese necesario */}
                            {this.validator.message('title', this.state.article.title, 'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange}/>
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success"/>
                    </form>
                </section>
                <Sidebar/>
            </div>
        );
    }
}
export default CreateArticle;