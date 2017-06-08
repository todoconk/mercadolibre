import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import './ArticleRow.css';

const ArticleRow = (props) => {
  let freeShipping;
  if (props.item.free_shipping) {
    freeShipping = (
      <span className="free-shipping">
        <img
          alt="Envío gratis"
          srcSet="/images/ic_shipping@2x.png 2x"
          src="/images/ic_shipping.png"
        />
      </span>);
  }
  return (
    <Link to={`/items/${props.item.id}`} className="media result">
      <Media tag="div" left>
        <Media object alt={props.item.title} src={props.item.picture} />
      </Media>
      <Media body className="col-md-7">
        <Media heading>
          $ {new Intl.NumberFormat('es-CL').format(props.item.price.amount)} {freeShipping}
        </Media>
        <Media className="media-description">
          {props.item.title}
        </Media>
      </Media>
      <Media tag="div" className="col-md-3 offset-md-2 media-heading" right>
        {props.item.state_name}
      </Media>
    </Link>
  );
};

ArticleRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
    free_shipping: PropTypes.boolean,
    state_name: PropTypes.string,
    price: PropTypes.shape({
      amount: PropTypes.number,
    }),
  }),
};

ArticleRow.defaultProps = {
  item: {},
};

export default ArticleRow;
