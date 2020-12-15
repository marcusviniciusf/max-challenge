import React from "react";
import ReactDOM from "react-dom";
// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Styles
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import DefaultStyles from "./styles/globalStyles";
// Pages
import GenreListPage from "./pages/genreList/GenreList";
import ArtistPage from "./pages/artist/ArtistDetail";
import MyListPage from "./pages/myList/MyList";
// UI
import { Container, Header } from "./components";
// Other
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <GenreListPage />
            </Route>
            <Route exact path="/mylist">
              <MyListPage />
            </Route>
            <Route exact path="/:id">
              <ArtistPage />
            </Route>
          </Switch>
        </Router>
      </Container>
      <DefaultStyles />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
