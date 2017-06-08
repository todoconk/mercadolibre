import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Search from './Search';
import './Header.css';

const Header = () => (
  <Container fluid>
    <Row className="nav-header">
      <Col md={{ size: 1, offset: 1 }}>
        <Link to="/">
          <img src="/images/Logo_ML.png" srcSet="/images/Logo_ML@2x.png 2x" alt="Mercado Libre" />
        </Link>
      </Col>
      <Col md={9}>
        <Search />
      </Col>
    </Row>
  </Container>
);

export default Header;
