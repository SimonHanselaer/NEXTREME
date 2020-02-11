import React, { useState, useEffect, useRef } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";

const Profile = ({uiStore, databaseStore}) => {
  let history = useHistory();
  const [status, setStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [city, setCity] = useState("");
  const [regio, setRegio] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [bio, setBio] = useState("Voeg een bio toe");
  const [challenges, setChallenges] = useState("");

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
    databaseStore.updateUser(props);
    setEdit(false);
  }

  useEffect(() => {
    const getInfo = async () => {
      let info = await databaseStore.getRegio(localStorage.uid);
      let userChallenges = await databaseStore.getChallengesUser(localStorage.uid);
      setStatus(true);
      setUsername(info.Username);
      setPhoto(info.Photo);
      setCity(info.City);
      setRegio(info.Regio);
      setAge(info.Age);
      setGender(info.Gender);
      setLanguage(info.Language);
      setBio(info.Bio);
      setChallenges(userChallenges);
    }

    // console.log("test");
    getInfo();
  },[databaseStore]);

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
                <input type="text" name="city" defaultValue={city !== "" ? city : " "} onChange={e => setCity(e.currentTarget.value)} />
              </div>
              <div>
                <p>Regio</p>
                <label htmlFor="">
                  <span>Wallonië</span>
                  {regio === "WL" ? <input type="radio" name="regio" value="WL" defaultChecked onClick={e => setRegio(e.currentTarget.value)} /> : <input type="radio" name="regio" value="WL" onClick={e => setRegio(e.currentTarget.value)} />}
                </label>
                <label htmlFor="">
                  Vlaanderen
                  {regio === "VL" ? <input type="radio" name="regio" value="VL" defaultChecked onClick={e => setRegio(e.currentTarget.value)} /> : <input type="radio" name="regio" value="VL" onClick={e => setRegio(e.currentTarget.value)} />}
                </label>
                <label htmlFor="">
                  Frankrijk
                  {regio === "FR" ? <input type="radio" name="regio" value="FR" defaultChecked onClick={e => setRegio(e.currentTarget.value)} /> : <input type="radio" name="regio" value="FR" onClick={e => setRegio(e.currentTarget.value)} />}
                </label>
                <label htmlFor="">
                  Ander
                  {regio === "Ander" ? <input type="radio" name="regio" value="Ander" defaultChecked onClick={e => setRegio(e.currentTarget.value)} /> : <input type="radio" name="regio" value="Ander" onClick={e => setRegio(e.currentTarget.value)} />}
                </label>
              </div>
              <div>
                <label htmlFor="age">Leeftijd</label>
                <input type="number" name="age" defaultValue={age !== "" ? age : " "} onChange={e => setAge(e.currentTarget.value)} />
              </div>
              <div>
                <p>Geslacht</p>
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
                <label htmlFor="" >
                  Zeg ik liever niet
                  {gender === "geen" ? <input type="radio" name="gender" value="geen" defaultChecked onClick={e => setGender(e.currentTarget.value)} /> : <input type="radio" name="gender" value="geen" onClick={e => setGender(e.currentTarget.value)} />}
                </label>
              </div>
              <div>
                <p>Taal</p>
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
                <textarea name="bio" id="bio" cols="50" rows="5" defaultValue={bio !== "" ? bio : " "} onChange={e => setBio(e.currentTarget.value)}></textarea>
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
        return (
          <>
            <button onClick={() => handleClickEdit()}>Edit</button>
            <h1>Profile</h1>
            <h2>{username}</h2>
            <p>{city} - {regio}</p>
            <img src={photo} alt="profielfoto" />
            <div>
              <p>{age}</p>
              <p>Leeftijd</p>
            </div>
            <div>
              <p>{gender}</p>
              <p>Geslacht</p>
            </div>
            <div>
              <p>{language}</p>
              <p>Taal</p>
            </div>
            <div>
              <h3>Over</h3>
              <p>{bio}</p>
            </div>
            <div>
              <h3>Gedane uitdagingen</h3>
              <ul>
                {challenges ? (
                  Object.keys(challenges).map(key => {
                    return( 
                      <li key={key}>{challenges[key].naam}</li>
                    )
                  })

                ) : (
                    <p>Loading...</p>
                  )
                }
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
