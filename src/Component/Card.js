import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import '../Component/style.css';

const mbButton = {
    height:'40px',
    width:'100px'
}

export default class Card extends Component {
    deleteHandler(e){
        e.preventDefault();
        this.props.delete(this.props.id)
    }
  render() {
    return (
        <Col md={4} className="cardArea">
                <div className="cardBody">
                <Row style={{padding:'10px'}}>
                            <Col>{this.props.nama}</Col>
                        </Row>
                    <div className="cardImage">
                        <Image src={this.props.gambar} className="img"></Image>
                    </div>
                    <div className="cardButton">
                        <Row style={{padding:'10px'}}>
                            <Col md={2} xs={2} className={mbButton}></Col>
                            <Col md={4} xs={4}className={mbButton}>
                                <a href={"#/edit?" + this.props.id}><Button variant="primary" style={mbButton}>Edit</Button></a>
                            </Col>
                            <Col md={4} xs={4} className={mbButton}>
                                <Button variant="danger" style={mbButton} onClick={this.deleteHandler.bind(this)}>Hapus</Button>
                            </Col>
                            <Col md={2} xs={2} className={mbButton}></Col>
                        </Row>
                    </div>
                </div>
            </Col>
    )
  }
}
