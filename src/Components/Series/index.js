import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import api from '../../Api';

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class Series extends Component{

    constructor(props){
        super(props);
    
        this.state = {
          series: [],
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
      }
     
      loadData(){
        this.setState({ isLoading: true });
        api.loadSeriesByGenre(this.props.match.params.genre).then((res)=>
        {
          this.setState({
            isLoading: false,
            series: res.data
          }); 
        } 
        );
      }

    renderSeries(serie){
        return(<div key={serie.id} className="item  col-xs-12 col-lg-4">
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
        <section className="intro-section container">
            <h1>Séries {this.props.match.params.genre} </h1>

            <div id="series" className="row list-group">
                { this.state.isLoading ? 'Carregando...' : this.state.series.map(this.renderSeries)}
                { this.state.series.length === 0  && !this.isLoading ? 'Não há séries cadastradas com esse gênero.' : '' }
            </div>

        </section>
        );
    }

}

export default Series;
