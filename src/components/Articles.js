import React, { Component } from 'react';

import { Link } from 'react-router-dom';

//Axios para peticiones http
import axios from 'axios';

//Moment para setear las fechas
import Moment from 'react-moment';
import 'moment/locale/es';

//imagenes importadas
import imgDefault from '../assets/images/default.jpg';

import Global from '../Global';

class Articles extends Component {

    urlApi = Global.urlApi;

    state = {
        articles: [],
        status: null
    };

    getArticles = () => {
        axios.get(this.urlApi + "articles")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            });
    }

    getLastArticles = () => {
        axios.get(this.urlApi + "articles/last")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
                //console.log(this.state);
            });
    }

    getArticlesBySearch = (searched) => {
        axios.get(this.urlApi + "search/" + searched)
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });             
                //console.log(this.state);
            })
            .catch(err => {
                //Respuesta del error desde el api
                //console.log(err.response.data);

                this.setState({
                    articles: [],
                    status: 'success'
                });  
            });
    }

    componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;
            
        if(home === "true"){
            this.getLastArticles();
        }else if(search && search !== null && search !== undefined){
            this.getArticlesBySearch(search);
        }else{
            this.getArticles();
        }

        
        
    }

    render() {
        if (this.state.articles.length > 0) {
            
            var listArticles = this.state.articles.map((article) => {
                return(
                    <article id="article-template" className="article-item" key={article._id}>
                        <div className="image-wrap">
                            {article.image ? (
                                    <img src={this.urlApi + 'get-image/' + article.image} alt={article.title}/>
                                ) : (
                                    <img src={imgDefault} alt={article.title}/>
                                )
                            }
                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            {/* fromNow para setear 'hace x tiempo' y locale="es" para forzar el idioma español */}
                            <Moment  locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id}>Leer mas</Link>
                        <div className="clearfix"></div>
                    </article>
                );
            });

            return (
                <div id="articles">
                    {listArticles}
                </div>
            );

        } else if(this.state.articles.length === 0 && this.state.status === 'success') {
                return (
                    <div id="articles">
                        <p>No hay articulos para mostrar</p>
                    </div>
                );
        } else {
            return (
                <div id="articles">
                    <p>Cargando...</p>
                </div>
            );
        }

    }
}
export default Articles;