import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import Sidebar from './Sidebar';
import imgDefault from '../assets/images/default.jpg';



class Article extends Component {
    urlApi = Global.urlApi;

    state = {
        article: false,
        status: null
    };

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.urlApi + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            }).catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }

    deleteArticle = (id) => {
        swal({
            title: "¿Esta seguro?",
            text: "Una vez borrado no podra recuperarse",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    axios.delete(this.urlApi + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            });

                            swal(
                                'Articulo borrado',
                                'El articulo se ha borrado correctamente',
                                'success'
                            )
                        });


                } else {
                    swal(
                        "El archivo no se ha borrado",
                        "Tus archivos estan a salvo",
                        "success"
                    );
                }
            });
    }

    //Cuando el componente se cargue se llamara a la funcion ajax
    componentWillMount() {
        this.getArticle();
    }

    render() {
        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }

        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {
                                    article.image ? (
                                        <img src={this.urlApi + 'get-image/' + article.image} alt={article.title} />
                                    ) : (
                                            <img src={imgDefault} alt={article.title} />
                                        )
                                }
                            </div>
                            <h1 className="subheader">{article.title}</h1>

                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>

                            <Link to={"/blog/editar/" + article._id} className="btn btn-warning">Editar</Link>
                            <button onClick={
                                () => {
                                    this.deleteArticle(article._id);
                                }
                            } className="btn btn-danger">Eliminar</button>

                            <div className="clearfix"></div>
                        </article>
                    }

                    {!article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">Error al procesar la solicitud</h2>
                            <p>El articulo no existe</p>
                        </div>
                    }

                    {this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando...</h2>
                        </div>
                    }
                </section>

                <Sidebar blog="true" />
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default Article;