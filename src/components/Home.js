import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Bienvenido al Curso de ReactJS"
                    btn={"Ir al blog"}
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Ultimos Articulos</h1>
                        <Articles 
                            home="true"
                        />
                    </div>
                    
                    <Sidebar />
                </div>
            </React.Fragment>
        );
    }
}

export default Home;