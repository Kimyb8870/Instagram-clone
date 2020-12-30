import "./App.css";
import Post from "./Post";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        />
      </div>

      {/* test post below*/}
      <Post
        username="test_name1"
        imageUrl="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=400&q=80"
        // this url is for test
        caption="test caption"
      />
      <Post
        username="test_name2"
        imageUrl="https://images.unsplash.com/photo-1608549036505-ead5b1de5417?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        // this url is for test
        caption="teeessstt caption"
      />
      <Post
        username="test_name3"
        imageUrl="https://images.unsplash.com/photo-1608585269273-5cacd36870f5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
        // this url is for test
        caption="teeessstt caption!"
      />
      <Post />
      <Post />
      {/* Posts */}
      {/* Posts */}
      {/* Posts */}
      {/* Posts */}
      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;
