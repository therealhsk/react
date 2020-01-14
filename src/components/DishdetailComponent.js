import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Label, Modal, ModalBody, ModalHeader, FormGroup
} from 'reactstrap';
import { FadeTransform, Stagger, Fade} from 'react-animation-components'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';

function RenderDish({ dish }) {

    return (
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
    );
}

function RenderComments({ comments, addComment, dishId }) {
    var commentList = comments.map(comment => {
        return (
            <Fade in>
            <li key={comment.id}>
                {comment.comment}
                <br /> <br />
                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                <br /> <br />
            </li>
            </Fade>
        )
    })
    return (
        <div>
            <h4>Comments</h4>
            <ul className='list-unstyled'>
                {commentList}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    )
}

const Dish = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} dishId={props.dish.id} addComment={props.addComment} />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        }
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"> Submit Comment</span>
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" className="form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author" >Your Name</Label>
                                <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less' }} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="feedback" >Comment</Label>

                                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{ required }} />
                                <Errors className="text-danger" model=".comment" show="touched" messages={{ required: 'Required' }} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}



export default Dish