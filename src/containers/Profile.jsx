import React, { useState, useEffect } from 'react';
import withAuthentication from '../components/auth/WithAuthentication';
import { observer, inject } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import styles from './Profile.module.css';
import stylesTypo from '../styles/typo.module.css';

const Profile = ({ uiStore, databaseStore }) => {
  let history = useHistory();
  const [status, setStatus] = useState(false);
  // const [edit, setEdit] = useState(false);
  const [edit, setEdit] = useState(true);
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState('');
  const [city, setCity] = useState('');
  const [regio, setRegio] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [bio, setBio] = useState('Voeg een bio toe');
  const [challenges, setChallenges] = useState('');

  const handleLogout = () => {
    uiStore.logout();
    history.push('/login');
  };

  const handleClickEdit = () => {
    setEdit(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let props = {
      username: username,
      city: city,
      regio: regio,
      age: age,
      gender: gender,
      language: language,
      bio: bio
    };
    databaseStore.updateUser(props);
    setEdit(false);
  };

  useEffect(() => {
    const getInfo = async () => {
      let info = await databaseStore.getRegio(localStorage.uid);
      let userChallenges = await databaseStore.getChallengesUser(
        localStorage.uid
      );
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
    };

    // console.log("test");
    getInfo();
  }, [databaseStore]);

  if (edit === true) {
    if (status) {
      return (
        <>
          <h1>Editing</h1>
          <form onSubmit={handleSubmit}>
            <h2 className={stylesTypo.button1}>Algemene gegevens</h2>
            {/* 16 bold */}
            <div>
              <label htmlFor="username" className={styles.inputLabel}>
                Naam
              </label>
              <input
                type="text"
                name="username"
                className="formInput"
                defaultValue={username}
                onChange={e => setUsername(e.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor="city">Stad</label>
              <input
                type="text"
                name="city"
                className="formInput"
                defaultValue={city !== '' ? city : ' '}
                onChange={e => setCity(e.currentTarget.value)}
              />
            </div>
            <div>
              <p>Regio</p>
              <label htmlFor="">
                <span>Wallonië</span>
                {regio === 'WL' ? (
                  <input
                    type="radio"
                    name="regio"
                    value="WL"
                    defaultChecked
                    onClick={e => setRegio(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="regio"
                    value="WL"
                    onClick={e => setRegio(e.currentTarget.value)}
                  />
                )}
              </label>
              <label htmlFor="">
                Vlaanderen
                {regio === 'VL' ? (
                  <input
                    type="radio"
                    name="regio"
                    value="VL"
                    defaultChecked
                    onClick={e => setRegio(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="regio"
                    value="VL"
                    onClick={e => setRegio(e.currentTarget.value)}
                  />
                )}
              </label>
              <label htmlFor="">
                Frankrijk
                {regio === 'FR' ? (
                  <input
                    type="radio"
                    name="regio"
                    value="FR"
                    defaultChecked
                    onClick={e => setRegio(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="regio"
                    value="FR"
                    onClick={e => setRegio(e.currentTarget.value)}
                  />
                )}
              </label>
              <label htmlFor="">
                Ander
                {regio === 'Ander' ? (
                  <input
                    type="radio"
                    name="regio"
                    value="Ander"
                    defaultChecked
                    onClick={e => setRegio(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="regio"
                    value="Ander"
                    onClick={e => setRegio(e.currentTarget.value)}
                  />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="age">Leeftijd</label>
              <input
                type="number"
                name="age"
                className="formInput"
                defaultValue={age !== '' ? age : ' '}
                onChange={e => setAge(e.currentTarget.value)}
              />
            </div>
            <div>
              <p>Geslacht</p>
              <label htmlFor="">
                M
                {gender === 'M' ? (
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    defaultChecked
                    onClick={e => setGender(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    onClick={e => setGender(e.currentTarget.value)}
                  />
                )}
              </label>
              <label htmlFor="">
                V
                {gender === 'V' ? (
                  <input
                    type="radio"
                    name="gender"
                    value="V"
                    defaultChecked
                    onClick={e => setGender(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="gender"
                    value="V"
                    onClick={e => setGender(e.currentTarget.value)}
                  />
                )}
              </label>
              <label htmlFor="">
                X
                {gender === 'X' ? (
                  <input
                    type="radio"
                    name="gender"
                    value="X"
                    defaultChecked
                    onClick={e => setGender(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="gender"
                    value="X"
                    onClick={e => setGender(e.currentTarget.value)}
                  />
                )}
              </label>
              <label htmlFor="">
                Zeg ik liever niet
                {gender === 'geen' ? (
                  <input
                    type="radio"
                    name="gender"
                    value="geen"
                    defaultChecked
                    onClick={e => setGender(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="gender"
                    value="geen"
                    onClick={e => setGender(e.currentTarget.value)}
                  />
                )}
              </label>
            </div>
            <div>
              <p>Taal</p>
              <label htmlFor="">
                NL
                {language === 'NL' ? (
                  <input
                    type="radio"
                    name="language"
                    value="NL"
                    defaultChecked
                    onClick={e => setLanguage(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="language"
                    value="NL"
                    onClick={e => setLanguage(e.currentTarget.value)}
                  />
                )}
              </label>
              <label htmlFor="">
                FR
                {language === 'FR' ? (
                  <input
                    type="radio"
                    name="language"
                    value="FR"
                    defaultChecked
                    onClick={e => setLanguage(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="language"
                    value="FR"
                    onClick={e => setLanguage(e.currentTarget.value)}
                  />
                )}
              </label>
              <label htmlFor="">
                EN
                {language === 'EN' ? (
                  <input
                    type="radio"
                    name="language"
                    value="EN"
                    defaultChecked
                    onClick={e => setLanguage(e.currentTarget.value)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="language"
                    value="EN"
                    onClick={e => setLanguage(e.currentTarget.value)}
                  />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                id="bio"
                cols="50"
                rows="5"
                className="formInput"
                defaultValue={bio !== '' ? bio : ' '}
                onChange={e => setBio(e.currentTarget.value)}
              ></textarea>
            </div>
            <button type="submit">Opslaan</button>
          </form>
        </>
      );
    } else {
      return <p>Loading</p>;
    }
  } else {
    if (status) {
      return (
        <>
          <div className={styles.containerHeader}>
            {/* <h1>Profile</h1> */}
            <div className={styles.header}>
              <div>
                <h2 className="accent">{username}</h2>
                <p className="small">
                  {city} -{' '}
                  {regio === 'VL'
                    ? 'Vlaanderen'
                    : regio === 'WL'
                    ? 'Wallonië'
                    : regio === 'FR'
                    ? 'Frankrijk'
                    : null}
                </p>
              </div>
              <button onClick={() => handleClickEdit()}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" fill="white" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 18.25V22H6.75L17.81 10.94L14.06 7.19L3 18.25ZM20.71 8.04C20.8972 7.85316 21.0024 7.59951 21.0024 7.335C21.0024 7.07049 20.8972 6.81685 20.71 6.63L18.37 4.29C18.1832 4.10277 17.9295 3.99756 17.665 3.99756C17.4005 3.99756 17.1468 4.10277 16.96 4.29L15.13 6.12L18.88 9.87L20.71 8.04Z"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="3"
                      y1="3.99756"
                      x2="21.0024"
                      y2="22"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFC371" />
                      <stop offset="1" stopColor="#FF5F6D" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
            <img
              src={photo}
              alt="profielfoto"
              width="110"
              height="110"
              align="right"
            />
          </div>
          <div className={styles.container}>
            <div className="flexRow">
              <div className={styles.info}>
                <p className="accent">{age}</p>
                <p className="small">Leeftijd</p>
              </div>
              <div className={styles.info}>
                <p className="accent">{gender}</p>
                <p className="small">Geslacht</p>
              </div>
              <div className={styles.info}>
                <p className="accent">{language}</p>
                <p className="small">Taal</p>
              </div>
            </div>
            <div className={styles.shortline}></div>
            <div>
              <h3 className={styles.titles}>Over</h3>
              <p className="small">{bio}</p>
            </div>
            <div>
              <h3 className={styles.titles}>Gedane uitdagingen</h3>
              <ul>
                {challenges ? (
                  Object.keys(challenges).map(key => {
                    return (
                      <li key={key} className={styles.challengeButton}>
                        <span className={styles.challengeButtonSpan}>
                          {challenges[key].naam}
                        </span>
                      </li>
                    );
                  })
                ) : (
                  <p>Loading...</p>
                )}
              </ul>
            </div>
            <button onClick={() => handleLogout()}>Afmelden</button>
          </div>
        </>
      );
    } else {
      return <p>Loading</p>;
    }
  }
};

export default inject(
  `uiStore`,
  `databaseStore`
)(withAuthentication(observer(Profile)));
