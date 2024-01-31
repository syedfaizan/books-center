import React, {
    Component
} from 'react';
import http from './utils/axios';
import Rating from 'react-rating';


export default class Book extends Component {
    constructor(props) {
        let session = sessionStorage.getItem('userSession');
        if (!session) {
            window.location.href = '/';
        }
        super(props);
        this.state = {
            BookId: this.props.match.params.id,
            showCommentForm: false,
            Book: {},
            Reviews: [],
            Author: {},
            newReview: {
                rating: null,
                comment: null,
                BookId: this.props.match.params.id
            }
        };
    };
    componentDidMount() {
        let dataPromises = [];

        dataPromises.push(http.get(`/book/${this.state.BookId}`));
        dataPromises.push(http.get(`/review/${this.state.BookId}`));

        return Promise.all(dataPromises)
            .then((responses) => {
                this.setState({
                    Book: responses[0].data
                });
                this.setState({
                    Reviews: responses[1].data.items
                });
                this.setState({
                    Author: this.state.Book.User
                });
            });
    };
    handleAddCommentClick(event) {
        this.setState({
            showCommentForm: !this.state.showCommentForm
        });
    };

    handleRatingChange(rate) {
        this.setState({
            newReview: Object.assign({}, this.state.newReview, {
                rating: rate
            })
        })
    };

    handleCommentChange(event) {
        this.setState({
            newReview: Object.assign({}, this.state.newReview, {
                comment: event.target.value
            })
        });
    };

    handleButtonClick(event) {
        let newrating = this.state.newReview;
        newrating.rating = newrating.rating + '';
        http.post('/review', newrating)
            .then(response => {
                window.location.reload();
            })
    };
    
    render () {
        const numberOfReviews = this.state.Reviews.length;
        return (
            <div className="container marginTop">
                <h5>ISBN: {this.state.Book.ISBN}</h5><br/>
                <h1>Book Title: {this.state.Book.title}</h1><br/>
                <h6>Author Username: {this.state.Author && this.state.Author.username}</h6>
                <div className="well">
                        <hr/>
                        <p>Comments ({numberOfReviews})</p>
                        <hr/>
                        {this.state.Reviews.map( (review, index) => {
                            return (
                                <div key={review.id}>
                                    <div className="row" >
                                        <div className="col-md-4"><b>{review.User.username}</b></div>
                                        <div className="col-md-4"><Rating initialRating={parseInt(review.rating)} readonly/></div>
                                        <div className="col-md-4">"{review.comment}"</div>
                                    </div>
                                </div>
                            )
                            
                        } )}
                        {numberOfReviews > 0 && <hr/>}
                        <div className="addReview">
                            <button className="btn btn-default" onClick={this.handleAddCommentClick.bind(this)}>Leave a Comment</button>
                            <br/>
                            <br/>
                            <br/>
                            {this.state.showCommentForm &&
                                <div className="form-group ">
                                    <label>Rating:&nbsp;&nbsp;</label>
                                    <Rating className="row col-md-6"  initialRating={this.state.newReview.rating} onChange={this.handleRatingChange.bind(this)}/>
                                    <div className="row col-md-6">
                                        <label>Comment</label>
                                        <input className="form-control" onChange={this.handleCommentChange.bind(this)}/>
                                        <br/>
                                        <br/>
                                        <button className="btn btn-primary" onClick={this.handleButtonClick.bind(this)}>Submit</button>
                                    </div>
                                </div>
                            }
                        </div>
                </div>
            </div>
        );
    };
};