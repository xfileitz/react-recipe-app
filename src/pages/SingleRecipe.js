import React, { Component } from "react";
import { recipeData } from "../data/tempDetails";
import { Link } from "react-router-dom";

export default class SingleRecipe extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.state = {
      recipe: {},
      id,
      loading: true
    };
  }

  async componentDidMount() {
    const url = `https://www.food2fork.com/api/get?key=${process.env.REACT_APP_API_KEY}&rId=${this.state.id}`;
    // const url = `https://www.food2fork.com/api/get?key=3c5a2005dcf6970d5cc544f4f4ce0e00&rId=${this.state.id}`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      this.setState({
        recipe: responseData.recipe,
        loading: false
      });
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;
    if (this.state.loading) {
      return (
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <h2>loading recipe....</h2>
          </div>
        </div>
      );
    }

    return (
      <div className="container my-5">
        <div className="col-10 mx-auto col-md-6 my-3">
          <Link to="/recipes" className="btn btn-warning mb-5 text-capatilize">
            back to recipes list
          </Link>
          <img
            src={image_url}
            className="d-block w-100"
            style={{ maxHeight: "30rem" }}
            alt=""
          />
        </div>
        <div className="col-10 mx-auto col-md-6 my-3">
          <h6 className="text-uppercase">{title}</h6>
          <h6 className="text-warning text-capitalize text-slanted">
            provided by {publisher}
          </h6>
          <a
            href={publisher_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-2 text-capitalize"
          >
            publisher webpage
          </a>
          <a
            href={source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success mt-2  mx-2 text-capitalize"
          >
            recipe url
          </a>
          <ul className="list-group mt-4"></ul>
          <h2 className="mt-3 mb-4">Ingredients</h2>
          {ingredients.map((item, index) => {
            return (
              <li key={index} className="list-group-item text-slanted">
                {item}
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}
