import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";

const App = () => {
  //rendering data from database
  // var Port='http://localhost:5000';
   var Port='https://git.heroku.com/curd-operationapp.git';
  const [userdata, setUserData] = useState([]);
  const [updatestate, setUpdatestate] = useState(0);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState();
  const [input, setInput] = useState({ fname: "", lname: "", uname: "" });
  const userCommon = async () => {
    const res = await fetch(`${Port}/getpost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // crossDomain: true,
      //   credentials: "include",
    });

    const data = await res.json();
    setUserData(data);
  };
  useEffect(() => {
    userCommon();
    localStorage.removeItem("count");
  }, []);
  // console.log(userdata);
  const Adddata = async (e) => {
    e.preventDefault();
    let fname = input.fname;
    let lname = input.lname;
    let uname = input.uname;

    if (fname === "") {
      alert("Please enter valid First Name");
    } else if (lname === "") {
      alert("Please enter valid Last Name");
    } else if (uname === "") {
      alert("Please enter valid UserName");
    } else {
      await fetch(`${Port}/addpost`, {
        method: "POST",
        body: JSON.stringify({
          fname,
          lname,
          uname,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        crossDomain: true,
        credentials: "include",
      });
      setCount(count + 1);
      localStorage.setItem("count", count + 1);
      setInput("");
      if (updatestate === 0) {
        setUpdatestate(1);
      } else {
        setUpdatestate(0);
      }
    }
  };

  const Updatedata = async (e) => {
    e.preventDefault();
    let fname = input.fname;
    let lname = input.lname;
    let uname = input.uname;
    if (fname === "") {
      alert("Please enter valid First Name");
    } else if (lname === "") {
      alert("Please enter valid Last Name");
    } else if (uname === "") {
      alert("Please enter valid UserName");
    } else {
      await fetch(`${Port}/updatepost`, {
        method: "POST",
        body: JSON.stringify({
          fname,
          lname,
          uname,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        crossDomain: true,
        credentials: "include",
      });
      setCount(count + 1);
      localStorage.setItem("count", count + 1);
      setInput("");
      if (updatestate === 0) {
        setUpdatestate(1);
      } else {
        setUpdatestate(0);
      }
    }
  };

  const SelectBtn = (e) => {
    color === e ? setColor() : setColor(e);
  };

  const Deletedata = async (e) => {
    if (!color) {
      alert("No data to Delete");
    } else {
      window.confirm("Confirm Delete");
      await fetch(`${Port}/deletepost/:id`, {
        method: "DELETE",
        body: JSON.stringify({
          color,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setCount(count + 1);
      localStorage.setItem("count", count + 1);
      setInput("");
      if (updatestate === 0) {
        setUpdatestate(1);
      } else {
        setUpdatestate(0);
      }
    }
  };

  useEffect(() => {
    userCommon();
  }, [updatestate]);

  return (
    <div className="App">
      <div className="Table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((Data, index) => (
              <tr
                className={Data.id === color ? "change-color" : "table-color"}
                key={index}
                value={Data.id}
                onClick={(e) => SelectBtn(Data.id)}
              >
                <td>{index + 1}</td>
                <td>{Data.fname}</td>
                <td>{Data.lname}</td>
                <td>
                  {Data.uname}
                  <button
                    className="select-icon"
                    title={Data.id === color ? `deselect item` : `select item`}
                  >
                    {Data.id === color ? (
                      <RiCheckboxCircleFill />
                    ) : (
                      <RiCheckboxBlankCircleLine />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="btn-main">
        <Button variant="warning" className="btn" onClick={Adddata}>
          Add
        </Button>
        <Button variant="primary" className="btn" onClick={Updatedata}>
          Update
        </Button>
        <Button variant="danger" className="btn" onClick={Deletedata}>
          Delete
        </Button>
      </div>
      <p>
        Count no:{" "}
        {localStorage?.getItem("count") ? localStorage.getItem("count") : "0"}
      </p>
      <>
        <Form className="form">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={input.fname || ""}
              onChange={(e) => setInput({ ...input, fname: e.target.value })}
              required=""
              placeholder="Type Your First Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={input.lname || ""}
              onChange={(e) => setInput({ ...input, lname: e.target.value })}
              required=""
              placeholder="Type Your Last Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={input.uname || ""}
              onChange={(e) => setInput({ ...input, uname: e.target.value })}
              required=""
              placeholder="Type Your User Name"
            />
          </Form.Group>
        </Form>
      </>
    </div>
  );
};

export default App;
