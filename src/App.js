import React, {Component}from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import $ from "jquery";
//Icons
import { IoIosDocument } from "react-icons/io";
import { IoIosCopy } from "react-icons/io";
import { IoMdFlower } from "react-icons/io";
import { IoIosGrid } from "react-icons/io";
import { IoIosCube } from "react-icons/io";
import { MdImage  } from "react-icons/md";
import { IoIosSearch } from "react-icons/io"
import { IoMdTrash   } from "react-icons/io";
import { IoMdGrid } from "react-icons/io"
import { MdTextFields } from "react-icons/md";
import { MdViewCarousel } from "react-icons/md"
import { MdViewAgenda } from "react-icons/md"
import { IoIosTrash } from "react-icons/io";
import {IoIosTabletLandscape} from "react-icons/io";
import {IoIosPhonePortrait} from "react-icons/io";
import {IoIosDesktop} from "react-icons/io";
import {IoMdArrowBack} from "react-icons/io";
import {IoMdArrowForward} from "react-icons/io";
import {IoMdEye} from "react-icons/io";
import{IoMdExpand} from "react-icons/io";
import {IoMdArrowRoundDown} from "react-icons/io"
import {ButtonGroup } from 'react-bootstrap'
import {ButtonToolbar } from 'react-bootstrap'
//Dropzone plus paletteElements
import {
  Canvas,
  Palette,
  state,
  Trash,
  core,
  Preview,
  registerPaletteElements
} from 'react-page-maker';
import { Row, Col, Button, Container } from 'reactstrap';
import Modal from 'react-awesome-modal';
//Draggable Elements
import { elements } from './components/const';
import DraggableTextbox from './components/functions/DraggableTextBox';
import DraggableLayoutR3C3 from './components/functions/DraggableLayoutR3C3';
import DraggableLayoutR1C2 from './components/functions/DraggableLayoutR1C2';
import DraggableLayout2x2 from './components/functions/DraggableLayout2x2'
import DraggableDropdown from './components/functions/DraggableDropdown';
import Figure from 'react-bootstrap/Figure'
import DraggableImage from './components/functions/DraggableImage'
import Carousel from 'react-bootstrap/Carousel'


class App extends Component {

  constructor(props){ //constructor helping set initial states
    super(props);

    this.state = { //setting unvisible state for popup
      visible : false
  }
   
    registerPaletteElements([{ //adding elements to palette, in case you wanna add elements make sure to initialize them below
        type: elements.TEXTBOX,
        component:DraggableTextbox

    },{
        type: elements.DROPDOWN,
        component:DraggableDropdown
    },{
      type: elements.GRID_LAYOUT_3_3,
      component: DraggableLayoutR3C3
    }, {
      type: elements.GRID_LAYOUT_2_2,
      component: DraggableLayout2x2

    }, {
      type: elements.GRID_LAYOUT_1_2,
      component: DraggableLayoutR1C2

    }]);
    }


    openModal() { //1
      this.setState({
          visible : true
      });
  }
   //1&2 trigger and close popup
  closeModal() { //2 
      this.setState({
          visible : false
      });
  }

    state={
        currentState:[]
    }

    componentWillMount(){   //adding events when about to drag
        state.addEventListener('change',(newState)=>{
            this.setState({
                currentState:newState
            })
        });
    }

    state={
        data:null
    }

    initialElements=[{    //dropzone initial inside element
      type: elements.TEXTBOX,
      name: 'Existing field 1',
      id:'ef1',
      component:DraggableTextbox
    }]

    paletteItemsTobeRendered=[{ //component inside palette to be rendered (every additional functionnality is to be added)
        type: elements.TEXTBOX,
        name: 'Text Field',
        id: 'f1',
        
        payload: {
        fname: 'Test',
        lname: 'Builder'
        },

        elementProps:{}
            },{
        type: elements.DROPDOWN,
        name:'DropDown field',
        id: 'f2'

      },{
        
        type: elements.GRID_LAYOUT_3_3,
         name: '3 by 3 Grid',
         id: '3-3-grid'
     }, {
      type: elements.GRID_LAYOUT_2_2,
      name: '2 by 2 Grid',
      id: '2-2-grid'
  }, {
         type: elements.GRID_LAYOUT_1_2,
         name: '1 by 2 Grid',
         id: '1-2-grid'
            }]



            _onDrop = (data, cb) => {     //set names and IDs for every dragged element (name is not 100% functional)
              if (data.payload && data.payload.dataAlreadySet) {
                return cb(data);
              }
          
              const name = window.prompt('Enter name of field');
          
              const result = cb({
                ...data,
                name: name || data.name,
                id: name || data.id,
                payload: {
                  ...data.payload,
                  dataAlreadySet: true
                }
              });

              console.log("done!")
            }


              
  _clearState=()=>{ //delete component
      state.clearState();
  }



componentDidMount=()=>{
$( "a" ).click(function() {
  var htmlString = $( this ).html();
  window.alert(  htmlString ); 
  
});}


  
  
  render(){
  return (
    <BrowserRouter>
    <div className="PLV">
      <header className="header">
            <div className="navigationbar">
            <div>
            <ButtonToolbar aria-label="Toolbar with button groups">
               
               <ButtonGroup aria-label="Basic example" className="mode">
                    <button className="mobile" id="mobile-view" variant="outline-dark"   title="Mobile view">
                       <IoIosPhonePortrait/>

                    </button>


                    <button className="tablet" id="tablet-view" variant="outline-dark"   title="Tablet view" >
                        <IoIosTabletLandscape/>
                        
                    </button>


                    <button className="desktop" id="desktop-view"  variant="outline-dark"   title="Desktop view">
                        <IoIosDesktop/>
                        
                    </button>
                </ButtonGroup>

             
                    

                <ButtonGroup aria-label="Basic example" className="control">
                      <button className="undo" variant="outline-dark" title="Undo (Ctrl/Cmd + Z)" id="undo-btn">
						 <IoMdArrowBack/>

					  </button>

					  <button className="redo"   variant="outline-dark" title="Redo (Ctrl/Cmd + Shift + Z)" id="redo-btn">
						  <IoMdArrowForward/>

					  </button>

                      </ButtonGroup>

                      <ButtonGroup aria-label="Basic example" className="view">

					  <button onClick={()=>this.openModal()} className="preview"  title="Preview" id="preview-btn" type="button" variant="outline-dark" >
						 <IoMdEye/>
					  </button>
            <Modal visible={this.state.visible} width="900" effect="fadeInDown" onClickAway={()=>this.closeModal()} >
            <Preview>
                 {
                     ({children})=>( //displaying preview
                         <Container>
                          
                             <h3>Preview</h3>
                             <a> code
                             {children}
                             </a>
                         </Container>
                     )
                 }
             </Preview>
            </Modal>



					  <button className="fullscreen" title="Fullscreen (F11)" id="fullscreen-btn" variant="outline-dark" >
						 <IoMdExpand/>

					  </button>

                      </ButtonGroup>


            <ButtonGroup aria-label="Basic example" className="download">
					  <button className="export" title="Export (Ctrl + E)" id="save-btn" variant="outline-dark">
						 <IoMdArrowRoundDown/>
            </button>
					  
                      </ButtonGroup>	
                    
            </ButtonToolbar>        

        </div>
            </div>
    </header>

      <div className="rightpanel">
      <div id="filemanager"> 
            <div className="rightheader">
                <a href="#" className="text-secondary"><IoIosCopy/><small>Pages</small></a>

                    <div className="btn-group responsive-btns mr-4 float-right" role="group">
                      <button className="btn btn-link btn-sm" title="New file" id="new-file-btn" data-vvveb-action="newPage">
                          <i className="la la-file"></i> <IoIosDocument/><small>New page</small>
                      </button>
                      
                    </div>

                </div>

                <div className="tree">
                    <ol>
                    </ol>
                </div>

      </div>

      <div className="drag-elements">

                <div className="headerrightp">							
                    <ul className="nav nav-tabs" id="elements-tabs" role="tablist">
                    <li className="nav-item component-tab">
                        <a className="nav-link active" id="components-tab" href="#components" role="tab" ><i className="la la-lg la-cube"></i> <div><small> <IoIosCube/>Components</small></div></a>
                    </li>
                    <li className="nav-item blocks-tab">
                        <a className="nav-link" id="blocks-tab" data-toggle="tab" href="#blocks" role="tab" ><i className="la la-lg la-image"></i> <div><IoIosGrid/><small>Blocks</small></div></a>
                    </li>
                    <li className="nav-item component-properties-tab">
                        <a className="nav-link" id="properties-tab" data-toggle="tab" href="#properties" role="tab" ><i className="la la-lg la-cog"></i>
                    <div><IoMdFlower/><small>Properties</small></div></a>
                    </li>
                    </ul>
                </div>

            <div className="tab-content">
                    <div className="tab-pane fade show active" id="components" role="tabpanel" >
                        
                        <div className="search">
                                <input className="form-control form-control-sm component-search" placeholder=" Search components" type="text"/> 
                                <button className="clear-backspace" >
                                <IoIosSearch/> <small>Search</small>
                                    <i className="la la-close"></i>
                                </button>
                            </div>
                    
                        <div>
                        <h6>Components :) just drag and drop items</h6>
                        </div>

                       <div className="d-flex flex-column">
                                <ButtonGroup className="mt-3">
                                    <Figure>  <Button > <MdImage/> <div> 
                                  <small> Add an image </small> </div></Button> </Figure>
                                   
                                   <Figure>  <Button onClick={this.addtext}> <MdTextFields thumbnail/> <div> 
                                   <small>Add a text field</small> </div></Button> </Figure>

                                   <Figure>  <Button> <MdViewCarousel thumbnail/> <div> 
                                   <small>Add a carousel </small></div></Button> </Figure>
                                </ButtonGroup>

                                <ButtonGroup className="mt-3">
                                <Figure> <Button> <MdViewAgenda/> <div><small>Add a 2x1 Grid</small></div></Button></Figure>
                                   <Figure> <Button> <IoMdGrid/> <div><small>Add a 3x3 Grid</small></div></Button></Figure>
                                    <Button><div><small>Func</small></div></Button>
                                </ButtonGroup>

                                <ButtonGroup className="mt-3">
                                    <Button><div><small>Func</small></div></Button>
                                    <Button><div><small>Func</small></div></Button>
                                    <Button><div><small>Func</small></div></Button>
                                </ButtonGroup>

                                <ButtonGroup className="mt-3">
                                <Palette paletteElements={this.paletteItemsTobeRendered}/>
                                </ButtonGroup>
                        </div>

                      

                </div>
        </div>




    </div>



      </div>


  <div className="body">

<div className="deletebuttons">    
  <Button color="danger" width="200px" onClick={this._clearState}> <IoMdTrash/> <div> Delete All</div> </Button>
 <div className="trash" width="200px"><Trash> <IoIosTrash/><div> Elements</div> </Trash></div>

  </div>
  <Col sm="6" className="canvas-container"> 
           <Canvas OnDrop={this._onDrop}  className="pagebuilder"  initialElements={this.initialElements} placeholder="Drop elements "  
           //dropping elements here
           /> 
  
        </Col>

  </div>


      
  </div>
    </BrowserRouter>
  );
}
}
export default App;
