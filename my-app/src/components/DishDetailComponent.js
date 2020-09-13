import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText } from 'reactstrap';


class DishDetail extends Component{
    constructor(props){
        super(props);
        console.log(this.props.selectedDish);
    }

    renderComments(comments){
        if(comments == null){
            return(
                <div>No Comments</div>
            );
        }
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
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {allComments}
                </ul>
            </div>
        );
    }


    render(){
        if(this.props.selectedDish == null){
            return(
                <div></div>
            );
        }
        console.log(this.props.selectedDish);
        return(
                <React.Fragment>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src={this.props.selectedDish.image} alt={this.props.selectedDish.name} /> 
                                <CardBody>
                                    <CardText>
                                        {this.props.selectedDish.description}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </React.Fragment>
        );
    }
}

export default DishDetail;