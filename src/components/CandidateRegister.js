import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class CandidateRegister extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: undefined,
        }
    }
   
    handleChange = (event) => {
        this.setState({name: event.target.value});
    }

    hangleSubmit = (e) => {
        // TODO: Make ETH call
        e.preventDefault();
        e.stopPropagation();
        this.props.addCandidate(this.state.name);
    }
    
    render() {
        return (
            <Form onSubmit={this.hangleSubmit}>
                <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input type="text" name="name" id="nameId" placeholder="Escriba un nombre" onChange={this.handleChange} />
                </FormGroup>
                <Button color="info" onClick={this.hangleSubmit}>¡Registrar!</Button>
            </Form>
        ); 
    }
}

export default CandidateRegister;