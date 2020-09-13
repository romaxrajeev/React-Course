import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem  } from 'reactstrap';
//import DishDetailComponent from './DishDetailComponent';
import DishDetail from './DishDetailComponent';
import { Link } from 'react-router-dom';

function RenderMenuItem({dish}){
  return(
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Menu(props){
  const menu = props.dishes.map((dish) => {
    return (
        <div className="col-12 col-md-5 m-1"  key={dish.id}>
            <RenderMenuItem dish={dish} />
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div class="col-12">
            <h3>Menu</h3>
            <hr />
          </div>
        </div>
        <div className="row">
            {menu}
        </div>
      </div>
    );
}

export default Menu;