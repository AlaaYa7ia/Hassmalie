import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import FileRepository from "./FileRepository";

const Project = ({match}) => {
    const [projectId, setProjectId] = useState("")
    const [project, setProject] = useState({});
    const [myBusiness, setMyBusiness] = useState({my_business: null});

    const getProjectData = async () => {
        const projects_Res = await axios.get('/api/projects/?id='+projectId+'&my_business='+myBusiness.my_business)
        setProject(projects_Res.data[0]);
    }

    useEffect(()=>{
        setMyBusiness({my_business: match.params.my_business})
        setProjectId(match.params.id)
    },[])

    useEffect(()=>{
        getProjectData()
    },[projectId, myBusiness])

    return(
        <html>
        <body>
        project page
        {myBusiness.my_business}
        {projectId}
        {project.address}
        </body>
        </html>
    )
}
export default Project;