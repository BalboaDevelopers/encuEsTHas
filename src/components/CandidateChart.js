import React from "react";
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class CandidateChart extends React.Component {
    render() {
        let {candidates} = this.props, data=[];
        candidates.forEach(_candidate => {
            data.push([_candidate.name, _candidate.voteCount])
        });
        return (
            <ColumnChart data={data} colors={["#b00", "#666"]}/>
        ); 
    }
}

export default CandidateChart;