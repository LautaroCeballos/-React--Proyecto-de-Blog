import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';
import imgDefault from '../assets/images/default.jpg'

// 1. Tenemos que recojer el id del articulo a editar
// 2. Crear un metodo para sacar el objeto del backend
// 3. Repoblar / Rellenar el formulario con esos datos
// 4. Actualizar el objeto haciendo una peticion al backend

class EditArticle extends Component {
    urlApi = Global.urlApi;

    articleId = null;

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

    //  El metodo updateArticle() se asocia al submit
    //  del formulario, hace una peticion ajax y actualiza
    //  el article a la apiRest

    getArticle = (id) => {
        axios.get(this.urlApi + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                });
            })
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

        //Cada vez que los datos del formulario cambian se comprobaran las validaciones del validator
        this.validator.showMessages();
        this.forceUpdate(); //Forzamos la actualizacion del formulario ?
    }

    updateArticle = (e) => {
        e.preventDefault();

        //Rellenar el state con el fomulario
        this.changeState();

        //Si las validaciones del fomulario son correctas se procedera a realizar la peticion ajax por medio de axios
        if (this.validator.allValid()) {
            //Hacer una peticion http por post para guardar el articulo
            axios.put(this.urlApi + 'article/' + this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        //Subir la imagen
                        if (this.state.selectedFile !== null) {
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
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });

                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }

                        //Libreria de alertas
                        swal(
                            'Articulo Editado',
                            'El articulo se ha editado correctamente',
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
        } else { //En caso de fallo en las validaciones se cargara un status failed en el state
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

    componentWillMount() {
        //Cuando el componente se inicializa se instancia la variable del validator
        //Si quisiera personalizar los mensajes debo pasarle a la instancia un JSON con los datos a mostrar
        this.articleId = this.props.match.params.id;

        this.getArticle(this.articleId);

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido',
                alpha_num_space: 'Solo se aceptan caracteres alfanumericos y espacios'
            }
        });


    }

    render() {
        var article = this.state.article;
        if (this.state.status === 'success') {
            return <Redirect to="/blog" />
        }

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Articulo</h1>

                    {this.state.article.title ? (
                        <form className="mid-form" onSubmit={this.updateArticle} onChange={this.changeState}>
                            {/* 
                                Para precargar los campos del fomulario existe la propiedad "defaultValue"
                                la cual se inicializa con el valor por defecto de ese mismo campo
                            */}
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" ref={this.titleRef} defaultValue={article.title}/>

                                {/* 
                                    Va a mostrar un mensaje cuando falle el campo con el NAME que nosotros le indiquemos
                                    La propiedad a la cual esta referido este mensaje debe ser el dato en donde se aloja en el state
                                    Como 3er parametro se le deben indicar las reglas de validaciones
                                */}
                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}

                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" ref={this.contentRef} defaultValue={article.content}></textarea>

                                {/* Tambien se pueden implementar validaciones de HTML5 a la par si fuese necesario */}
                                {this.validator.message('title', this.state.article.title, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange} />

                                <div className="image-wrap">
                                    {
                                        article.image ? (
                                            <img src={this.urlApi + 'get-image/' + article.image} alt={article.title} className="thumb"/>
                                        ) : (
                                            <img src={imgDefault} alt={article.title} className="thumb"/>
                                        )
                                    }
                                </div>
                                
                            </div>
                            
                            <div className="clearfix"></div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    ) : ( 
                        <h2 className="subheader">Cargando...</h2>
                    )
                    }


                </section>
                <Sidebar />
            </div>
        );
    }
}
export default EditArticle;