// import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/search" component={SearchPage} />
    </Switch>
    <Footer />
  </BrowserRouter>
);


export default App;
