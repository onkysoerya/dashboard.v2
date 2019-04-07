import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'react-bootstrap/Image';
import Card from '../Component/Card';
import '../Component/style.css'
// import { Container, Row, Col } from 'react-bootstrap';
const mainA = {
    height:'38px',
};
const btnB = {
    height:'38px',
};
const mbButton = {
    height:'40px',
    width:'100px'
}

const GET_BERITA = "https://backend-bem.herokuapp.com/api/web/public";
const URI_DELETE = "https://backend-bem.herokuapp.com/api/web/protected/delete";
export default class componentName extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : []
        }
    }
    delete (id) {
        const body = {
            id : id
        }
        fetch(URI_DELETE,{
            method : "POST",
            headers: {
                "content-type": "application/json",
                "authorization": JSON.parse(localStorage.user).token
            },
            body: JSON.stringify(body)
        }).then(result=>{
            console.log(result);
            if(result.ok){
                return alert("Berhasil Dihapus");
            }else{
                return alert("Gagal Menghapus");
            }
        })
        this.props.history.replace("/")
    }
    componentWillMount(){
        fetch(GET_BERITA,{
            headers: {
                "content-type": "application/json"
            }
        }).then(res=>{
            return res.json()
        }).then(result=>{
            this.setState({data:result})
        })
    }
  render() {
    if(localStorage.user===undefined){
        window.location.href='#/login';
    }
    return (
        <Container>
        <Row style={{marginTop:'40px'}}>
            <Col md={2} style={mainA}>
                <a href="#/tambahberita"><Button variant="primary">Tambah Berita</Button></a>
            </Col>
            <Col md={8}></Col>
            <Col md={2} style={btnB}>
                <DropdownButton id="dropdown-basic-button" title="Tipe Berita" variant="warning">
                    <Dropdown.Item href="#/action-1">Lomba</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Balang</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
            </Col>
        </Row>
        <Row>
             {this.state.data.map(dataa=>{
                return <Card {...dataa} delete={this.delete.bind(this)} />;
            })}
        </Row>
    </Container>
    )
  }
}

