import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
  } from "react-router-dom";
import SignUp from "./Signup"
import Login from "./Login"

  function nav(){

    return (
        <>
        <Router>
      <div>
        <ul>
          <button>
            <Link to="/">Login</Link>
          </button>
          <button>
            <Link to="/signUp">SignUp</Link>
          </button>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
        </Routes>
      </div>
    </Router>
        </>
    )
  }

  export default nav;