import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {deleteDoc as del, doc} from "firebase/firestore";
import {toast, ToastContainer} from "react-toastify";



function Home() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const articleRef = collection(db, "Users");
    const q = query(articleRef);
    onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUser(users);
      console.log(user);
    });
  }, []);

  const deleteUser=(post)=>{
    const deleteRef = doc(db, "Users", `${post}`);
    del(deleteRef);
    toast("User Deleted Successfully.");
    navigate("/");
  }

  return (
    <div className="container">
      <ToastContainer/>
      <div className="row">
        <div className="col-mt-8">
          <h2>Posts</h2>
          {user.length === 0 ? (
            <p> No Article Found...</p>
          ) : (
            user.map((post, i) => (
              <div className="border mt-3 p-3 bg-light" key={i}>
                <div className="row">
                  <div className="col-9 ps-3">
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>{post.name}</Card.Title>
                        <Card.Text>Email: {post.email}</Card.Text>
                        <Card.Text>Date of Birth: {post.dob}</Card.Text>
                        <Card.Text>Hobby: {post.hobby}</Card.Text>
                        <Card.Text>Gender: {post.gender}</Card.Text>
                        <Card.Text>Country: {post.country}</Card.Text>
                        <Card.Text>State: {post.state}</Card.Text>
                        <Card.Text>City: {post.city}</Card.Text>
                      <Button style={{margin: "4px"}} variant="success" onClick={()=>{navigate(`/edit/${post.id}`)}}> Edit </Button>
                  
                      <Button style={{margin: "4px"}} variant="success" onClick={(e)=>{deleteUser(post.id);}}> Delete </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
