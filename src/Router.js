import React, { Component } from 'react';

//Componente de Rutas
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//Componentes de pruebas
import MiComponente from './components/MiComponente';
import Peliculas from './components/Peliculas';

//Importar Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';

import Error from './components/Error';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                
                {/*Configurar rutas y paginas*/}
                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/articulo/:id" component={Article} />
                    <Route exact path="/blog/crear" component={CreateArticle} />
                    <Route exact path="/blog/editar/:id" component={EditArticle} />
                    <Route exact path="/formulario" component={Formulario} />
                    <Route exact path="/blog/busqueda/:search" component={Search} />

                    {/* Asi se hace una redireccion */}
                    <Route exact path="/redirect/:search" render={
                        (props) => {
                            var search = props.match.params.search;
                            return(
                                <Redirect to={"/blog/busqueda/" + search}/>
                            );
                        }
                    }/>

                    {/* Rutas de prueba */}
                    <Route exact path="/peliculas" component={Peliculas} />
                    <Route exact path="/segunda-ruta" component={MiComponente} />

                    {/* Rutas sin Componentes */}
                    <Route exact path="/pagina-1" render={() => (
                        <h1>Hola mundo desde la ruta: Pagina 1</h1>
                    )} />

                    {/* Parametros en la URL */}
                    <Route exact path="/pruebas/:nombre/:apellidos?" render={(props) => {
                        var nombre = props.match.params.nombre;
                        var apellidos = props.match.params.apellidos;

                        return (
                            <div id="content">
                                <h2 className="subheader">Pagina de pruebas</h2>
                                {nombre && !apellidos &&
                                    <h2>{nombre}</h2>
                                }
                                {nombre && apellidos &&
                                    <h2>{nombre + " " + apellidos}</h2>
                                }
                            </div>
                        );
                    }} />
                   
                    <Route component={Error} />

                </Switch>

                <div className="clearfix"></div>

                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;