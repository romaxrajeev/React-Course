import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }   
}


class Main extends Component {

  constructor(props) {
    super(props);
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId});
    console.log(this.props.selectedDish);
  }

  render() {

    const HomePage = () => {
      return(<Home dish={ this.props.dishes.filter((dish) => dish.featured)[0] } 
      promotion={ this.props.promotions.filter((promotion) => promotion.featured)[0] }
      leader={ this.props.leaders.filter((leader) => leader.featured)[0] }
      />);
    }

    const DishWithId = ({match}) =>{
        
        return(
          <DishDetail selectedDish={ this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0] } 
          comments={this.props.comments.filter((comment) => comment.dishId == parseInt(match.params.dishId,10)) }
          addComment={this.props.addComment}
          />
        );
    }

    console.log(this.props.comments.filter((comment) => comment.dishId === 3));

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route exact path="/contactus" component={Contact} />
          <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));