import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class MyBusinessDetails extends React.Component {
  constructor(props) {
    super(props);
      console.log("MyBusinessDetails");
    this.state = {
        id:0,
        first_name: "",
        last_name:"",
        email: "",
        address:"",
        password:"",
        phone_number: 0,
        usersList: [],
    };
  }
  componentDidMount() {
  console.log("componentDidMount");
    this.refreshList();
  }
  refreshList = () => {
  console.log("refreshList");
    axios
      .get("/api/users/")
      .then(res => {this.setState({ usersList: res.data})
      })
      .catch(err => console.log(err));
  };
  render(){
  console.log(this.state.usersList); //prints the data
    return (
    <div>
    somthing!!
    <p>{JSON.stringify(this.state.usersList)}</p>
    </div>
    );
  };

}
export default MyBusinessDetails;
