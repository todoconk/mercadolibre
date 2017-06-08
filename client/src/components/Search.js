import React from 'react';
import { withRouter } from 'react-router-dom';
import { InputGroup, InputGroupButton, Button } from 'reactstrap';
import './Search.css';

let searchInput;

const Search = withRouter(({ history }) => (
  <form onSubmit={(e) => {
    e.preventDefault();
    const url = searchInput.value ? `/items?search=${searchInput.value}` : '/';
    history.push(url);
  }}
  >
    <InputGroup>
      <input
        type="text"
        placeholder="Nunca dejes de buscar"
        className="input-search form-control"
        ref={(el) => {
          searchInput = el;
        }}
      />
      <InputGroupButton>
        <Button color="search">
          <img src="/images/ic_Search.png" srcSet="/images/ic_Search@2x.png 2x" alt="Buscar" />
        </Button>
      </InputGroupButton>
    </InputGroup>
  </form>
));

export default Search;
