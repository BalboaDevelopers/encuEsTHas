import React from 'react';
import {Button, Table} from 'reactstrap';

class CandidateVoteList extends React.Component {
    hangleSubmit = (idx, name) => {
        // TODO: Make ETH call
        this.props.handleAddVoteToCandidate(idx, name);
    }

    render() {
        return (
            <Table striped>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad de votos</th>
                    <th>Votar</th>
                </tr>
                </thead>
                <tbody>
                {this.props.candidates.map((obj, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{obj.name}</td>
                            <td>{obj.voteCount}</td>
                            <td><Button size="sm" onClick={() => this.hangleSubmit(idx, obj.name)}>Votar</Button></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        ); 
    }
}

export default CandidateVoteList;