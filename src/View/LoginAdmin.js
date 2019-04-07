import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'react-bootstrap/Image';
import '../Component/style.css';

export default class LoginAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                username : undefined,
                password : undefined
            }
        }
    }
    login = (event) =>{
        const body = {
            nim : this.state.user.username,
            pass : this.state.user.password
        }
        fetch('https://backend-bem.herokuapp.com/auth/login',{
            method: 'POST',
            headers: {
				"content-type": "application/json"
            },
            body : JSON.stringify(body)
        }).then(ress=>{
            if(ress.ok){
                return ress.json();
            }else{
                return alert('NIM atau Password salah');
            }
        }).then(result=>{
            const ba = {
                nim : this.state.user.username
            }
            fetch('https://backend-bem.herokuapp.com/api/web/protected/cekAdmin',{
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "authorization": "bearer " + result
                },
                body : JSON.stringify(ba)
            }).then(has=>{
                return has.json();
            }).then(hasil=>{
                if(hasil.status){
                    const data = {
                        "token" : "bearer " + result,
                        "level" : hasil.value
                    }
                    console.log(data);
                    localStorage.setItem('user', JSON.stringify(data));
                    this.props.history.replace('/');
                }else{
                    return alert('anda tidak punya hak untuk masuk ke halaman ini');
                }
            })
        }).catch(err=>{
            return alert("NIM atau Password Error");
        })
        event.preventDefault();
    }
    handleChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let copyPost = Object.assign({}, this.state.user);
        copyPost[inputName] = inputValue;
        this.setState({ user: copyPost });
        
    }
  render() {
    if(localStorage.user!==undefined){
        window.location.href='#/';
    }
    return (
      <div>
        <Container>
            <Row>
                <Col md={7} className="card-area-admin">
                    <div className="cardLeft">
                        <Image src="/Image/logobem4.png" className="img"></Image>
                    </div>
                </Col>
                <Col md={5} className="card-area-admin">
                    <div className="cardRight">
                    <Form className="formLogin" onSubmit={this.login}>
                        <Container>
                            <Form.Row>
                                <Col md={2}></Col>
                                <Col md={8} className="loginNim">
                                <Form.Control type="text" placeholder="Nim" name="username" onChange={this.handleChange} />
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={2}></Col>
                                <Col md={8} className="loginPassword">
                                    <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={2}></Col>
                                <Col md={8} className="btnLogin">
                                    <Button variant="primary" type="submit" name="submit" style={{width:'100%'}}>Login</Button>
                                </Col>
                            </Form.Row>
                        </Container>
                    </Form>               
                    </div>
                </Col>
            </Row>
        </Container>
      </div>
    )
  }
}
