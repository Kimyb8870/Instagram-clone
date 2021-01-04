import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  //for load posts from db
  const [open, setOpen] = useState(false);
  //manage state of sign up modal is opened or not
  const classes = useStyles();
  //for styleing modal
  const [modalStyle] = useState(getModalStyle);
  //for styling modal
  const [openSignIn, setOpenSignIn] = useState(false);
  //manage state of sign in(just log in) modal is opened or not
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  //for detect changes of auth
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    });
  }, [user, username]);

  //for load posts from database
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signup = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setUsername("");
    setEmail("");
    setPassword("");
    setOpen(false);
  };

  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setEmail("");
    setPassword("");
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      {/* need to build */}
      {/* Caption input */}
      {/* File picker */}
      {/* Post Button */}

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button type="submit" onClick={signup}>
              Sign up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" />
            </center>

            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button type="submit" onClick={signin}>
              Sign up
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        />

        {/* for deal with log in, sign up or sign out */}
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Login</Button>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post: { username, imageUrl, caption } }) => (
            <Post
              key={id}
              username={username}
              imageUrl={imageUrl}
              caption={caption}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <Post
            key={0}
            username="hotFix"
            imageUrl="https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            caption="this is for hotfix"
          />
          {/* <InstagramEmbed
            url="https://www.instagram.com/p/CIxQY_EpeWN/"
            // clientAccessToken="123|456"
            // https://www.npmjs.com/package/react-instagram-embed
            // follow this
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {
              console.log("success");
            }}
            onAfterRender={() => {}}
            onFailure={() => {}}
            className="instagramEmbed"
          /> */}
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to log in to upload</h3>
      )}
    </div>
  );
}

export default App;
