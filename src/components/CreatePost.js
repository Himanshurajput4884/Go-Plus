import React, {useEffect, useState} from "react";
import { toast, ToastContainer } from 'react-toastify'
import {db} from '../firebase.js'
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
const yourhandle= require('countrycitystatejson')

function CreatePost() {
  const [ country, setCountry ] = useState("");
  const [ state, setState ] = useState();
  const [ city, setCity ] = useState();
  const navigate = useNavigate();
  let countries = yourhandle.getCountries();
  let states = yourhandle.getStatesByShort(country);
  let cities = yourhandle.getCities(country,state);
  const [ theme, setTheme ] = useState({male:false, female: false});
  const [ user, setUser ] = useState({
    name:"",
    email:"",
    dob:"",
    gender:"",
    hobby:"",
    country:"",
    state:"",
    city:"",
  });

  const getUserData=(e)=>{
    setUser({...user, [e.target.name]:e.target.value});
  }

  const getGender=(e)=>{
    const { name } = e.target;
    setUser({...user, gender:name});
    if(name === 'male'){
      setTheme({female:false, male:true});
    }
    if(name === 'female'){
      setTheme({male:false, female:true});
    }
  }

  const getLocation=(e)=>{
    const name = e.target.name;
    if(name === "country"){
      const cc = yourhandle.getCountryByShort(e.target.value);
      console.log(cc);
      setCountry(e.target.value);
      setUser({...user, [e.target.name]:cc.name});
    }
    else if(name === "state"){
      setUser({...user, [e.target.name]:e.target.value});
      setState(e.target.value);
    }
    else if(name === "city"){
      setUser({...user, [e.target.name]:e.target.value});
      setCity(e.target.value);
    }
    states = yourhandle.getStatesByShort(country);
    cities = yourhandle.getCities(country,state);
  }

  const handlePost = () =>{
    setUser({
      name:"",
      email:"",
      dob:"",
      gender:"",
      hobby:"",
      country:"",
      state:"",
      city:"",
    })
    const articleRef = collection(db, "Users");
    addDoc(articleRef, user)
    .then(()=>{
      toast.success("User Added Successfully.");
    })
    .catch((err)=>{
      toast.error("Something went wrong.");
    })
    navigate("/");
  }
  return (
    <div className="border p-3 mt-3 bg-light">
      <ToastContainer/>
      <h2>Create User</h2>
      <label htmlFor="">Name</label>
      <input type="text" name="name" className="form-control" value={user.name} required onChange={getUserData}></input>
      <label htmlFor="">Email</label>
      <input type="email" name="email" className="form-control" value={user.email} required onChange={getUserData}></input>
      <label htmlFor="">Date of Birth</label>
      <input type="date" name="dob" className="form-control" value={user.dob} required onChange={getUserData}></input>
      <label htmlFor="gender">Gender</label><br/>
      <input type="radio" id="male" name="male" value="male" text="male" onChange={getGender} checked={theme.male}/>
        <label htmlFor="male">Male</label><br />
        <input type="radio" id="female" name="female" value="female" text="female" onChange={getGender} checked={theme.female}/>
        <label htmlFor="female">Female</label><br />
      <label htmlFor="">Hobby</label>
      <textarea name="hobby" className="form-control" required value={user.hobby} onChange={getUserData}/>
      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
        required
        name="country"
        onChange={(e) => {
          getLocation(e);
        }}
        // value={user.country}
      >
        <option value="DEFAULT">Select Country</option>
        {countries.map((v, i) => (
          <option key={v.name} value={v.shortName}>{v.name}</option>
        ))}
      </select>
      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
        required
        name="state"
        onChange={(e) => {
          getLocation(e);
        }}
        // value={user.state}
      >
        <option value="DEFAULT">Select State</option>
        {states && states.map((v, i) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
        required
        name="city"
        onChange={(e) => {
          getLocation(e);
        }}
        // value={user.city}
      >
        <option value="DEFAULT">Select City</option>
        {cities && cities.map((v, i) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
      <button className="form-control btn-primary mt-2" onClick={()=>{
        handlePost();
      }}>Upolad</button>
    </div>
  );
}

export default CreatePost;
