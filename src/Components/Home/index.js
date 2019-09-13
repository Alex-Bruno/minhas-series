import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import api from '../../Api';

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class Home extends Component{
    constructor(props){
        super(props);
    
        this.state = {
          series: [],
          genres: [],
          isLoading: false
        }
        this.renderSeries = this.renderSeries.bind(this);
        this.loadData = this.loadData.bind(this);    
      }

      deleteSerie(id){
        api.deleteSerie(id).then((res)=>this.loadData());
      }
    
      componentDidMount(){
        this.loadData();
        this.setState({ isLoading: true });
        api.loadGenres().then((res)=>
        {
          this.setState({
            isLoading: false,
            genres: res.data
          });  
        }
        );
      }

      loadData(){
        this.setState({ isLoading: true });
        api.loadSeries().then((res)=>
        {
          this.setState({
            isLoading: false,
            series: res.data
          });  
        } 
        );
      }

      renderGenreLink(genre){
        return(
          <Link to={`/series/${genre}`}><button className="btn btn-danger btn-geral" key={genre}>
           {genre}
          </button></Link>
        );
      }
    
    renderSeries(serie){
        return(  serie.status != 'toWatch' ? '' : <div key={serie.id} className="item  col-xs-12 col-lg-4">
                <div className="thumbnail">
                    <div className="caption">
                    <h4 className="group inner list-group-item-heading">
                        <strong>{serie.name}</strong></h4>
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                        <p className="lead">
                        {serie.genre} / {statuses[serie.status]} </p>
                        </div>
                        <div className="col-xs-12 col-md-12">
                        <Link className="btn btn-success btn-geral" to={'/series-edit/'+serie.id}>Editar</Link>
                        <a className="btn btn-danger btn-geral" key={serie.id} onClick={()=> this.deleteSerie(serie.id)}>Excluir</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div> 
            <section id="intro" className="intro-section">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12" align="center">
                        <h1><img className="img-responsive" src="images/logo.png" /></h1>
                        <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>
                    </div>
                    <div className="col-lg-12" align="center">
                    {
                      !this.state.isLoading ? this.state.genres.map(this.renderGenreLink) : ''
                    }
                    </div>
                    </div>
                </div>
                </section>

                <section id="services" className="services-section">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <h1>Para assistir</h1>
                        <div id="series" className="row list-group">
                        { this.state.isLoading ? 'Carregando...' : this.state.series.map(this.renderSeries)}
                        { this.state.series.length == 0  && !this.isLoading ? 'Não há séries para assistir.' : '' }
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                </div>
        )
    }
}

export default Home;
