import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import { Modal, ModalBody, Button, ModalHeader, Row, Label, Col} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        alert("Added");
        this.toggleModal();
    }

    render() {
        return(
            <React.Fragment>
            <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) =>this.handleSubmit(values)}>
                        <Row className="form-group">
                        <Label htmlFor="author" md={12}>Author </Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" className="form-control" 
                                    name="author" placeholder="Author Name"
                                    validators={ {required, minLength: minLength(3), maxLength: maxLength(15)}  } />
                                    <Errors 
                                    className="text-danger" model=".author" show="touched" messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                                </Col>
                        </Row>
                        <Row className="form-group">
                        <Label htmlFor="rating" md={12}>Rating </Label>
                            <Col md={12}>
                                <Control.select model=".rating" name="rating" id="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" className="form-control" id="message" name="message" placeholder="Enter your comment" rows="12" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                        <Col md={12}>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
        );
    }

}

function RenderComments({comments , postComment, dishId}){
    if(comments == null){
        return(
            <div>No Comments</div>
        );
    }
    console.log(comments[0]);
    const allComments = comments.map((comment) => {
        return(
            <li key= {comment.id}>
                {comment.comment}
                <br /><br />
                -- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date))) }
                <br /><br />
            </li>
        );
    });
    return(
            <React.Fragment>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                { allComments }
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
            </React.Fragment>
    );
}

function RenderDish({dish, isLoading, errMess}){
    if(isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    }
    else if(dish == null){
        return(
            <div></div>
        );
    }
    return(
            
               <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} /> 
                    <CardBody>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            
    );
}

function DishDetail(props){
    console.log(props);
    return(
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="row">      
                <div className="col-12 col-md-5 m-1">          
                <RenderDish dish={props.selectedDish} isLoading={props.isLoading} errMess={props.errMess} />
                </div>
                <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments}
                postComment ={props.postComment}
                dishId={props.selectedDish.id}
                />
                </div>
            </div>
        </div>
    );
}


export default DishDetail;