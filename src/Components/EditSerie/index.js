import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import api from '../../Api';

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class EditSerie extends Component{

    constructor(props){
        super(props);
    
        this.state = {
          genres: [],
          isLoading: false,
          redirect: false,
          serie: {}
        }

        this.saveSerie = this.saveSerie.bind(this);
    
      }
    
      componentDidMount(){
        this.setState({ isLoading: true });
        api.loadGenres().then((res)=>
        {
          this.setState({
            isLoading: false,
            genres: res.data
          });  
        }
        );
        api.loadSeriesById(this.props.match.params.id).then((res)=>
        {
          this.setState({serie: res.data});
          const s = this.state.serie;
          this.refs.name.value = s.name;
          this.refs.status.value = s.status;
          this.refs.genre.value = s.genre;
          this.refs.comments.value = s.comments;
        });
      }

      saveSerie(){
          const newSerie = {
              'id': this.props.match.params.id,
              'name': this.refs.name.value,
              'status': this.refs.status.value,
              'genre': this.refs.genre.value,
              'comments': this.refs.comments.value 
          }
          api.updateSerie(newSerie).then((res)=>{
            this.setState({
              redirect: '/series/'+this.refs.genre.value
            });
          });
      }

    render(){ 
        return  (
        <section className="intro-section container">
          { this.state.redirect && 
            <Redirect to={this.state.redirect}/>
          }
            <h1>Editar Série</h1>
            <form>
                <div className="row">
                     <div className="col-md-4">
                          <input type="text" id="name" ref="name" className="form-control" placeholder="Nome" />
                     </div>
                     <div className="col-md-4">
                          <select className="form-control" ref="status">
                            { Object.keys(statuses).map(key => <option key={key} value={key}>{statuses[key]}</option>) }
                          </select>
                     </div>
                     <div className="col-md-4">
                          <select className="form-control" ref="genre">
                            { this.state.genres.map(key => <option key={key} value={key}>{key}</option>) }
                          </select>
                     </div>
                </div>
                <br/>
                <div className="row">
                     <div className="col-md-12">
                        <textarea ref="comments" className="form-control" placeholder="Comentários" rows="5"></textarea>
                     </div>
                </div>
                <div id="btn-save">
                    <button type="button" onClick={() => this.saveSerie()} class="btn btn-success">Salvar</button>
                    <button type="reset" class="btn btn-danger">Limpar</button>
                </div>
            </form>
        </section>
        );
    }
}

export default EditSerie;