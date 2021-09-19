import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
import { useSelector, useDispatch } from "react-redux";
import { getNotebooks, addNotebook } from "../actions/typeactions";
import { loaduser } from "../actions/authtype";
import Notebook from "./Groupinfo";
import Modal from "./notebookComponent/Modal";
import Logout from "./authuser/Logout";

function Notes() {
  //initialize the dispatch method with
  const dispatchdata = useDispatch();

  //dispatching the get method
  useEffect(() => {
    dispatchdata(getNotebooks());
    dispatchdata(loaduser());
    // };
    // return subscribe;
  }, []);

  //loading the state
  const notebooks = useSelector((state) => state.notebook.notebook);
  console.log(notebooks);
  //Load the user
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const chatinfo = useSelector((state) => state.chat.chat);
  //posting the data to database

  //returning the jsx element
  return (
    <div className="h-viewHeight bg-sidebarBackgroundColor-color">
      {/* Show the user in the top */}
      <div className="flex pl-5 pt-1 border-b-4 border-borderColor pb-3">
        <div className="mr-5 pt-1">
          <p className="rounded-full w-10 h-10 bg-gray-100 block mx-auto"></p>
        </div>
        <div className="flex flex-col ">
          <p className="text-lg text-gray-200">{user.name}</p>
          <p className="text-xs text-gray-300">{user.email}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex pl-3.5 pt-2 justify-between">
          <span className="text-gray-400 text-lg">Your Groups</span>
          <Modal />
        </div>
        <div className="flex flex-col  h-groupHeight overflow-y-scroll">
          {notebooks.map((notebook) => (
            <>
              <Notebook
                id={notebook._id}
                title={notebook.text}
                color={notebook.color}
                weight={notebook.weight}
              />
            </>
          ))}
        </div>
      </div>
      <Logout />
    </div>
  );
}

export default Notes;
