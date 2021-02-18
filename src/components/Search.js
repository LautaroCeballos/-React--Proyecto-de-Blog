import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Search extends Component {

    state = {
        status: null
    };

    render() {
        var searched = this.props.match.params.search;
        return (
            <React.Fragment>
                <Slider
                    title={"Busqueda: " + searched}
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de articulos que vendran de la api */}
                        <h2 className="subheader">Todos los articulos</h2>
                        <Articles 
                            search={searched}
                        />
                    </div>
                    
                    <Sidebar
                        blog="true"
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Search;