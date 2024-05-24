import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Pages
import Home from "./pages/home";
import About from "./pages/about";
import Article from "./pages/article";
import ArticlesList from "./pages/articles_list";
import NotFound from "./pages/NotFound";

//Components
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="max-w-screen-md mx-auto pt-20">

        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/about" element = {<About/>} />
          <Route path="/article/:name" element = {<Article/>} />
          <Route path="/articles_list" element = {<ArticlesList/>} />
          <Route path="*" element = {<NotFound/>} />  
        </Routes>

      </div>

    </Router>


  );
}

export default App;
