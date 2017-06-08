import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import ArticleRow from '../components/ArticleRow';
import baseURL from '../endpoint';
import './Results.css';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { author: {}, categories: [], items: [], status: 'loading' };
  }

  // Sync initial state
  componentWillMount() {
    this.setState({ status: 'loading' });
    this.searchItems(this.props.location.search);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ status: 'loading' });
    this.searchItems(nextProps.location.search);
  }

  searchItems(queryString) {
    const params = new URLSearchParams(queryString);
    axios.get(`${baseURL}/items`, { params: { q: params.get('search') } })
      .then((res) => {
        this.setState(Object.assign({ status: 'done' }, res.data));
      })
      .catch(() => this.setState({ status: 'error' }));
  }

  render() {
    let component;
    let breadcrumb;

    if (this.state.status === 'done' && this.state.items.length > 0) {
      breadcrumb = (<div className="breadcrumb-wrapper">
        <Breadcrumb tag="nav">
          {
            this.state.categories.map(item => (
              <BreadcrumbItem key={item.id} tag="span">{item.name}</BreadcrumbItem>
            ))
          }
        </Breadcrumb>
      </div>);
      component = (<div className="results-wrapper">
        { this.state.items.map(el => (<ArticleRow key={el.id} item={el} />)) }
      </div>);
    }

    if (this.state.status === 'done' && this.state.items.length === 0) {
      component = (<div className="text-center separator">
        No se han encontrado resultados
      </div>);
    }

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

Results.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

Results.defaultProps = {
  location: {
    search: '',
  },
};

export default Results;
