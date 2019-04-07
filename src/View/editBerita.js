import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import './css/stylein.css';
import '../Component/react-tabs.css';

const EDIT_URI = "https://backend-bem.herokuapp.com/api/web/protected/edit";
const GET_URI = "https://backend-bem.herokuapp.com/api/web/public/get";
export default class EditBerita extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    judul : undefined,
    gambar : undefined,
    kategori : undefined,
    isi : undefined
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  send = (event) =>{
    console.log(this.state);
    const body = {
      id : this.state.id,
      nama : this.state.judul,
      kategori : this.state.kategori,
      isi : draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      gambar : this.state.gambar
    }
    console.log(body)
    fetch(EDIT_URI,{
      method : 'POST',
      headers: {
        "content-type": "application/json",
        "authorization": JSON.parse(localStorage.user).token
      },
        body : JSON.stringify(body)
    }).then(ress=>{
      if(ress.ok){
        return alert('Berhasil Dietdit');
      }else{
        return alert('gagal update');
      }
    })
    this.props.history.replace('/')
    event.preventDefault();
  }
  componentWillMount(){
    let id = this.props.location.search.substring(1);
    console.log(id);
    axios.get(GET_URI,{
            params:{
                id:id
            } 
    }).then(ress=>{
      console.log(ress.data)

      const blocksFromHtml = htmlToDraft(ress.data[0].isi);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

      this.setState({id:ress.data[0].id});
      this.setState({gambar:ress.data[0].gambar});
      this.setState({editorState: EditorState.createWithContent(contentState)});
      this.setState({kategori:ress.data[0].kategori});
      this.setState({judul:ress.data[0].nama});
      console.log(this.state)
    }).catch(err=>{
      console.log(err);
    })
        

  }
  render() {
    const { editorState } = this.state;
    const UPLOAD_FILE = "https://api.imgur.com/3/image";
    return (
      <div>
        <Container>
          <Row>
            <Col md={12} style={{backgroundColor:'#F8F8F8',height:'100%',marginTop:'100px',borderRadius:'10px',padding:'20px'}}>
              <Form>
                  <Form.Group controlId="formBasicText">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control type="text" placeholder="Title here" value={this.state.judul} onChange={(val) => this.setState({judul: val.target.value})}/>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Tipe Berita</Form.Label>
                    <Form.Control value={this.state.kategori} as="select" onChange={(val) => {
                            this.setState({kategori: val.target.value})
                            console.log(this.state.kategori)
                        }}>
                    <option value="Advokesma">Advokesma</option>
                    <option value="Bismit">Bismit</option>
                    <option value="Kastrat">Kastrat</option>
                    <option value="PSDM">PSDM</option>
                    <option value="Perhub">Perhub</option>
                    <option value="Inoya">Inoya</option>
                    <option value="Sosma">Sosma</option>
                    <option value="Medinfo">Medinfo</option>
                    <option value="PIT">PIT</option>
                    </Form.Control>
                  </Form.Group>
                  <Tabs>
                    <TabList>
                      <Tab>Text</Tab>
                      <Tab>Editor</Tab>
                    </TabList>

                    <TabPanel>
                    <Form.Group controlId="exampleForm.Controltextarea">
                        <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        placeholder="text here"
                        onChange={(val) => {this.setState({isi : val.blocks[0].text})
                        console.log(this.state.editorState)}}
                      />
                    </Form.Group>
                    </TabPanel>
                    <TabPanel>
                    <Form.Group controlId="exampleForm.Controltextarea" style={{width:'100%'}}>
                        <textarea
                          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        />
                    </Form.Group>
                    </TabPanel>
                  </Tabs>
                  <Form.Group>
                    <Form.Label>Gambar : </Form.Label><br></br>
                    <input type="file" name="gambar" id="gambar" onChange={(event)=>{
                        var formData = new FormData();
                        var imagefile = document.querySelector('#gambar');
                        formData.append("image", imagefile.files[0]);
                        axios({
                        method: 'post',
                        url: UPLOAD_FILE,
                        headers: {
                            'Authorization' : 'Client-ID 66031c0605f8539'
                        },
                        data : formData
                        }).then(res=>{
                        console.log(res.data.data.link);
                        this.setState({gambar: res.data.data.link});
                        })
                        event.preventDefault();
                    }}>
                    </input>
                  </Form.Group>             
                  <Form.Group controlId="exampleForm.Controlsubmit">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form.Group>
                </Form>
                </Col>
              </Row>
        </Container>
      </div>
    );
  }
}
