import { useState } from "react";
import "./App.css";
import Post from "./Post";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "test_name1",
      imageUrl:
        "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=400&q=80",
      caption: "test caption",
    },
    {
      username: "test_name2",
      imageUrl:
        "https://images.unsplash.com/photo-1608549036505-ead5b1de5417?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      caption: "teeessstt caption",
    },
  ]);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        />
      </div>

      {/* test post below*/}
      {posts.map(({ username, imageUrl, caption }) => (
        <Post username={username} imageUrl={imageUrl} caption={caption} />
      ))}
    </div>
  );
}

export default App;
