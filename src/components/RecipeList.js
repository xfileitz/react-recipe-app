import React, { Component } from "react";
import Recipe from "./Recipe";

export default class RecipeList extends Component {
  render() {
    return (
      <div>
        <h2>hello from recipelist</h2>
        <Recipe />
      </div>
    );
  }
}
