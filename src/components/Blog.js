import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {

    state = {
        articles : {},
        status: null
    };

    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Blog"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de articulos que vendran de la api */}
                        <h2 className="subheader">Todos los articulos</h2>
                        <Articles />
                    </div>
                    
                    <Sidebar
                        blog="true"
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Blog;