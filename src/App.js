import React, { Component } from 'react';
import './App.css';

import CandidateRegister from './components/CandidateRegister';
import CandidateList from './components/CandidateList';
import CandidateCount from './components/CandidateCount';
import CandidateVoteList from './components/CandidateVoteList';
import CandidateChart from './components/CandidateChart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [
        {name: 'Juan Perez', voteCount: 100}
      ],
      votersCount: 0,
    }
  }

  componentDidMount(){
    // TODO: Get candidates from ETH
    // this.setState(prevState => ({
    //   candidates: [...prevState.candidates, {name: 'Juan Perez', voteCount: 100}]
    // }));
    this.setCount();
  }

  handleAddCandidate = (name) => {
    // TODO: Create candidate on ETH
    this.setState(prevState => ({
      candidates: [...prevState.candidates, {name, voteCount: 0}]
    }));
  }

  handleAddVoteToCandidate = (idx, name) => {
    // TODO: Add vote to candidate on ETH
    let candidates =  this.state.candidates.map( (_candidate, _idx) => {
      if(_idx !== idx) { return _candidate; }
      return {
        name: _candidate.name,
        voteCount: _candidate.voteCount + 1,
      };    
    });
    this.setState({candidates});
    this.setCount();
  }

  setCount = () => {
    let votersCount = 0;
    this.state.candidates.forEach((v, i) => {
      votersCount += v.voteCount;
    })
    this.setState({votersCount})
  }

  render() {
    return (
      <div className="row mx-5 my-5">
        <div className="col-6">
          <div className="row">
            <div className="col-12">
            <div className="card">
              <div className="card-body">
                  <h5 className="card-title">Registrar Candidato</h5>
                  <CandidateRegister addCandidate={this.handleAddCandidate}/>
              </div>
            </div>
            </div>
            <div className="col-12 pt-3">
            <div className="card">
              <div className="card-body">
                  <CandidateCount votersCount={this.state.votersCount}/>
              </div>
            </div>
            </div>
            <div className="col-12 pt-3">
              <div className="card">
                <div className="card-body">
                  <CandidateChart candidates={this.state.candidates} />
                </div>
              </div>  
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-12">
            <div className="card">
              <div className="card-body">
                  <h5 className="card-title">Lista de Candidato</h5>
                  <CandidateList candidates={this.state.candidates}/>
              </div>
            </div>
            </div>
            <div className="col-12 pt-3">
            <div className="card">
              <div className="card-body">
                  <h5 className="card-title">Votar por Candidato</h5>
                  <CandidateVoteList candidates={this.state.candidates} handleAddVoteToCandidate={this.handleAddVoteToCandidate}/>
              </div>
            </div>
            </div> 
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
