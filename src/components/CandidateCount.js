import React from 'react';


class CandidateCount extends React.Component {

    render() {
        return (
            <div>
                <h5>La cantidad de votantes es de {this.props.votersCount}</h5>
            </div>
        ); 
    }
}

export default CandidateCount;