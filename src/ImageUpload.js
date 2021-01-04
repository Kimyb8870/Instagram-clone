import { Button, Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./ImageUpload.css";
import { storage, db } from "./firebase";

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  //for comment of new post
  const [progress, setProgress] = useState(0);
  //for progress state of uploading new post
  const [image, setImage] = useState("");
  //for path of selected file

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function
        console.log(error.message);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="imageUpload">
      <progress max="100" className="imageUpload__progress" value={progress} />
      <Input
        type="text"
        placeholder="Enter a Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Input type="file" onChange={handleChange} />

      <Button className="imageupload__button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
