import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Container from "../Container/container";
import Categorias from "../Pages/Categorias";
import Produtos from "../Pages/Produtos";
const CustomRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (
        <Container>
          <Component />
        </Container>
      )}
    />
  );
};

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/produtos" />
      </Route>
      <CustomRoute path="/produtos" component={Produtos} />
      <CustomRoute path="/categoriaprodutos" component={Categorias} />
    </Switch>
  );
};

export default Router;
