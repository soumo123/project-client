
import React, { useState, useEffect } from "react";
import checkIcon from './svg/check.svg';
import errorIcon from './svg/error.svg';
import infoIcon from './svg/info.svg';
import warningIcon from './svg/warning.svg';

import Toast from "./Toast";
const Message = ({ message, type }) => {
console.log("message, type",message, type)
  const [list, setList] = useState([]);
  useEffect(() => {
    if (message!=='') {
      if (type === "success") {
        setList([...list,  {
          id: Math.floor(Math.random() * 101 + 1),
          title: message,
          description: '',
          backgroundColor: "#28a745",
          icon: checkIcon,
        } ]);
      } else if (type === "warning") {
        setList([...list,  {
          id: Math.floor(Math.random() * 101 + 1),
          title: message,
          description: "",
          backgroundColor: "#ffc107",
          icon: warningIcon,
        } ]);
      } else if (type === "error") {
        setList([...list,  {
          id: Math.floor(Math.random() * 101 + 1),
          title: message,
          description: "",
          backgroundColor: "#dc3545",
          icon: errorIcon,
        } ]);
      } else {
        setList([...list,  {
          id: Math.floor(Math.random() * 101 + 1),
          title: message,
          description: "",
          backgroundColor: "#17a2b8",
          icon: infoIcon,
        } ]);
      }
    }
  }, [ message, type]);



  return (
    <>
     
      <Toast
        toastList={list}
        position={"top-right"}
        autoDelete={true}
        autoDeleteTime={5000}
      />
    </>
  );
};

export default Message;
