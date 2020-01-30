import React from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

const Challenge2 = () => {
  console.log(useParams())
  let {grens} = useParams();

  return (
    <>
      <h1>Challenge 2 - {grens}</h1>
    </>
  )
}

export default withAuthentication(observer(Challenge2))
