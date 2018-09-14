import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import  web3 from '../web3';
import Encuesthas from '../Encuesthas';


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

    hangleSubmit = async (e) => {
        // TODO: Make ETH call
        e.preventDefault();
        e.stopPropagation();

        const accounts = await web3.eth.getAccounts();
        await Encuesthas.methods.addCandidate(web3.utils.toHex(this.state.name)).send({
            from: accounts[0],  // Default to the first one
        });

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