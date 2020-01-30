import React from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

const Challenge3 = () => {
  console.log(useParams())
  let {grens} = useParams();

  return (
    <>
      <h1>Challenge 3 - {grens}</h1>
    </>
  )
};

export default withAuthentication(observer(Challenge3));
