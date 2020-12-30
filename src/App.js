import { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        />
      </div>

      {/* test post below*/}
      {posts.map(({ id, post: { username, imageUrl, caption } }) => (
        <Post
          key={id}
          username={username}
          imageUrl={imageUrl}
          caption={caption}
        />
      ))}
    </div>
  );
}

export default App;
