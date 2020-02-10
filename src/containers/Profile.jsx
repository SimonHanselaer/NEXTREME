import React, { useState, useEffect, useRef } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";

const Profile = ({uiStore, databaseStore}) => {
  let history = useHistory();
  let currentInfo = useRef(`info`);
  const [status, setStatus] = useState(false);
  // const [edit, setEdit] = useState(false);
  const [edit, setEdit] = useState(true);
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [regio, setRegio] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [bio, setBio] = useState("");

  const handleLogout = () => {
    uiStore.logout();
    history.push("/login")
  }

  const handleClickEdit = () => {
    setEdit(true);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let props = {
      username: username, city: city, regio: regio, age: age, gender: gender, language: language, bio: bio
    }
    console.log(props);
    // databaseStore.updateUser(props);
    setEdit(false);
  }

  useEffect(() => {
    const getInfo = async () => {
      currentInfo.current = await databaseStore.getRegio(localStorage.uid);
      setStatus(true);
      setUsername(currentInfo.current.Username);
      setCity(currentInfo.current.City);
      setRegio(currentInfo.current.Regio);
      setAge(currentInfo.current.Age);
      setGender(currentInfo.current.Gender);
      setLanguage(currentInfo.current.Language);
      setBio(currentInfo.current.Bio);
    }
    console.log("test");
    getInfo();
  },[databaseStore]);

  console.log(username);
    if(edit === true){
      if(status){
        return (
          <>
            <h1>Profile - Editing</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Naam</label>
                <input type="text" name="username" defaultValue={username} onChange={e => setUsername(e.currentTarget.value)} />
              </div>
              <div>
                <label htmlFor="city">Stad</label>
                <input type="text" name="city" defaultValue={city} onChange={e => setCity(e.currentTarget.value)} />
              </div>
              <div>
                <p>Regio {regio}</p>
                <label htmlFor="">
                  <span>Wallonië</span>
                  {regio === "WL" ? <input type="radio" name="regio" value="Wallonië" defaultChecked onClick={e => setRegio(e.currentTarget.value)} /> : <input type="radio" name="regio" value="Wallonië" onClick={e => setRegio(e.currentTarget.value)} />}
                </label>
                <label htmlFor="">
                  Vlaanderen
                  {regio === "VL" ? <input type="radio" name="regio" value="Vlaanderen" defaultChecked onClick={e => setRegio(e.currentTarget.value)} /> : <input type="radio" name="regio" value="Vlaanderen" onClick={e => setRegio(e.currentTarget.value)} />}
                </label>
                <label htmlFor="">
                  Frankrijk
                  {regio === "FR" ? <input type="radio" name="regio" value="Frankrijk" defaultChecked onClick={e => setRegio(e.currentTarget.value)} /> : <input type="radio" name="regio" value="Frankrijk" onClick={e => setRegio(e.currentTarget.value)} />}
                </label>
                <label htmlFor="">
                  Ander
                  {regio === "Ander" ? <input type="radio" name="regio" value="Ander" defaultChecked onClick={e => setRegio(e.currentTarget.value)} /> : <input type="radio" name="regio" value="Ander" onClick={e => setRegio(e.currentTarget.value)} />}
                </label>
              </div>
              <div>
                <label htmlFor="age">Leeftijd {age}</label>
                <input type="number" name="age" onChange={e => setAge(e.currentTarget.value)} />
              </div>
              <div>
                <p>Geslacht {gender}</p>
                <label htmlFor="" >
                  M
                  {gender === "M" ? <input type="radio" name="gender" value="M" defaultChecked onClick={e => setGender(e.currentTarget.value)} /> : <input type="radio" name="gender" value="M" onClick={e => setGender(e.currentTarget.value)} />}
                </label>
                <label htmlFor="">
                  V
                  {gender === "V" ? <input type="radio" name="gender" value="V" defaultChecked onClick={e => setGender(e.currentTarget.value)} /> : <input type="radio" name="gender" value="V" onClick={e => setGender(e.currentTarget.value)} />}
                </label>
                <label htmlFor="">
                  X
                  {gender === "X" ? <input type="radio" name="gender" value="X" defaultChecked onClick={e => setGender(e.currentTarget.value)} /> : <input type="radio" name="gender" value="X" onClick={e => setGender(e.currentTarget.value)} />}
                </label>
              </div>
              <div>
                <p>Taal {language}</p>
                <label htmlFor="">
                  NL
                  {language === "NL" ? <input type="radio" name="language" value="NL" defaultChecked onClick={e => setLanguage(e.currentTarget.value)} /> : <input type="radio" name="language" value="NL" onClick={e => setLanguage(e.currentTarget.value)} />}
                </label>
                <label htmlFor="">
                  FR
                  {language === "FR" ? <input type="radio" name="language" value="FR" defaultChecked onClick={e => setLanguage(e.currentTarget.value)} /> : <input type="radio" name="language" value="FR" onClick={e => setLanguage(e.currentTarget.value)} />}

                </label>
                <label htmlFor="">
                  EN
                  {language === "EN" ? <input type="radio" name="language" value="EN" defaultChecked onClick={e => setLanguage(e.currentTarget.value)} /> : <input type="radio" name="language" value="EN" onClick={e => setLanguage(e.currentTarget.value)} />}
                </label>
              </div>
              <div>
                <label htmlFor="bio">Bio</label>
                <textarea name="bio" id="bio" cols="50" rows="5" value={bio} onChange={e => setBio(e.currentTarget.value)}></textarea>
              </div>
              <button type="submit">Opslaan</button>
            </form>
          </>
        );
      } else {
        return (
          <p>Loading</p>
        );
      }
    } else {
      if(status){
        let info = currentInfo.current;
        return (
          <>
            <button onClick={() => handleClickEdit()}>Edit</button>
            <h1>Profile</h1>
            <h2>{info.Username}</h2>
            <p>{info.City} - {info.Regio}</p>
            <img src={info.Photo} alt="profielfoto" />
            <div>
              <p>{info.Age}</p>
              <p>Leeftijd</p>
            </div>
            <div>
              <p>{info.Gender}</p>
              <p>Geslacht</p>
            </div>
            <div>
              <p>{info.Language}</p>
              <p>Taal</p>
            </div>
            <div>
              <h3>Over</h3>
              <p>{info.Bio}</p>
            </div>
            <div>
              <h3>Gedane uitdagingen</h3>
              <ul>
                <li>Uitdaging 1</li>
                <li>Uitdaging 2</li>
              </ul>
            </div>
            <button onClick={() => handleLogout()}>Afmelden</button>
          </>
        );
      } else {
        return (
          <p>Loading</p>
        );
      } 
    }
};

export default inject(`uiStore`, `databaseStore`) (withAuthentication(observer(Profile)));
