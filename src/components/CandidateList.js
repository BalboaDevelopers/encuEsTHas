import React from 'react';
import {Table} from 'reactstrap';

class CandidateList extends React.Component {
    render() {
        return (
            <Table striped>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad de votos</th>
                </tr>
                </thead>
                <tbody>
                {this.props.candidates.map((obj, i) => {
                    return (
                        <tr key={i}>
                            <td>{obj.name}</td>
                            <td>{obj.voteCount}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        ); 
    }
}

export default CandidateList;