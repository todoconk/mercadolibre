import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Button, Col, Container, Row } from 'reactstrap';
import baseURL from '../endpoint';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { item: { price: { amount: 0 } }, categories: [], status: 'loading' };
  }

  // Sync initial state
  componentWillMount() {
    this.setState({ status: 'loading' });
    axios.get(`${baseURL}/items/${this.props.match.params.id}`)
      .then((res) => {
        this.setState(Object.assign({ status: 'done' }, res.data));
      })
      .catch(() => this.setState({ status: 'error' }));
  }

  render() {
    let component;
    let breadcrumb;

    if (this.state.status === 'loading') {
      component = (<div className="text-center separator">
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>);
    }

    if (this.state.status === 'error') {
      component = (<div className="text-center separator">
        Hemos tenido un error, por favor intenta de nuevo.
      </div>);
    }

    if (this.state.status === 'done') {
      breadcrumb = (<div className="breadcrumb-wrapper">
        <Breadcrumb tag="nav">
          {
            this.state.categories.map(item => (
              <BreadcrumbItem key={item.id} tag="span">{item.name}</BreadcrumbItem>
            ))
          }
        </Breadcrumb>
      </div>);

      component = (<div className="post-wrapper">
        <Row>
          <Col md={8} className="text-center">
            <img
              src={this.state.item.picture}
              alt={this.state.item.title}
              className="img-fluid post-image"
            />
          </Col>
          <Col md={4}>
            <div className="post-condition">
              {this.state.item.condition === 'new' ? 'Nuevo' : 'Usado'} - {this.state.item.sold_quantity} vendidos
            </div>
            <h4 className="post-title">{this.state.item.title}</h4>
            <h2 className="post-price">$ {new Intl.NumberFormat('es-CL').format(this.state.item.price.amount)}</h2>
            <div>
              <Button color="buy" block>Comprar</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <h3 className="post-description-title">Descripción del producto</h3>
            <div className="post-description">
              <img
                src={this.state.item.description}
                alt={this.state.item.title}
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </div>);
    }
    return (
      <Container fluid>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            {breadcrumb}
            {component}
          </Col>
        </Row>
      </Container>
    );
  }
}

Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Post.defaultProps = {
  match: { params: { id: 0 } },
};

export default Post;
