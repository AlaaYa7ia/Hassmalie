import React, { Component, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';

const ProjectsManagement  = ({ get_user_data, isAuthenticated}) => {
    const [dataRes, setDataRes]= useState([]);
    const [projects, setProjects] = useState([]);
    const [myBusiness, setMyBusiness] = useState({my_business: null});
    const [showProjects, setShowProjects] = useState(false);
    const [showOneProject, setShowOneProject] = useState(false);
    const [projectToShow, setProjectToShow] = useState("");


    const get_projects = async (dataRes) =>{
        const projects_Res = await axios.get('/api/projects/?my_business=' + dataRes)
        setProjects({projects: projects_Res.data});
        setShowProjects(true);
    }

    const get_user = async (dataRes)=>{
       const user_Res = await get_user_data()
       setMyBusiness({my_business: user_Res.id})
       setDataRes(user_Res);
    }

    useEffect(()=>{
      get_user()
    },[])

    useEffect(()=>{
      get_projects(dataRes)
    },[dataRes])

    function getImgUrl(image, instance) {
    if (image === null) {
        return '/default_'+instance+'_pic.png';
    }
     return image;
    }

    //<Link onClick={onLinkClickHandler} >{state.msg}</Link>
//    function onLinkClickHandler(project){
//    console.log(project);
//    setShowOneProject(true)
//    }
//onClick={onLinkClickHandler}
    function oneProject(){}

    function projectsList(){
    const list = projects.projects.map(project => (
                        <div>
                        <div className='col-12'>
                            <img  src={getImgUrl(project.image, "project")}
                             height={150} width={150} style={{ cursor: "pointer"}}></img>
                       </div>
                       <div className='col-12'>
                             <p class='lead'>{project.address} </p>
                             <p class='lead'>{project.type_of_building} </p>
                       </div>
                       </div>
                ))
    return list}
    // {showOneProject ? oneProject(): ""}
    return(
    <html lang="he" >
    <body dir="rtl">
    <p>Projects: {JSON.stringify(projects)}</p>
    <div className = "counter-fluid row right-text">
    {showProjects ? projectsList(): ""}

    </div>
    </body>
    </html>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });
export default connect(mapStateToProps, { get_user_data })(ProjectsManagement);
