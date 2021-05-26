import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const FileRepository = ({match}) => {
    const [plans, setPlans] = useState([]);
    const [bids, setBids] = useState([]);
    const [images, setImages] = useState([]);
    const [payments, setPayments] = useState([]);
    const [projectId, setProjectId] = useState("")
    const [uplaoded, setUplaoded] = useState(false);
    const get_plans = async () =>{
        //const projects_Res = await axios.get('/api/projects/?my_business=' + dataRes)
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?category=P&project_id='+projectId);
        console.log("files_Res>>>>>>>>>",files_Res.data)
        setPlans(files_Res.data);
    }
    const get_bids = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?category=B&project_id='+projectId);
        console.log("files_Res>>>>>>>>>",files_Res.data)
        setPlans(files_Res.data);
    }
    const get_images = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?category=I&project_id='+projectId);
        console.log("files_Res>>>>>>>>>",files_Res.data)
        setImages(files_Res.data);
    }
    const get_payments = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?category=Pay&project_id='+projectId);
        console.log("files_Res>>>>>>>>>",files_Res.data)
        setPayments(files_Res.data);
    }
    useEffect(()=>{
        setProjectId(match.params.id)
    },[])

    useEffect(()=>{
        get_plans()
            .then(get_bids())
            .then(get_images())
            .then(get_payments())
            .then(setUplaoded(true))


    },[projectId])

    function showFiles(){
        try{
            return (
            plans.map(file => (
                <div><p><a herf={file.file} download>{ file.file}</a></p></div>
            ))
            )
        }catch (err){
            console.log(err)
        }
    }

    return(
    <html lang="he" >
    <body>
        FileRepository
        <h1>Plans Files:</h1>
        {uplaoded && showFiles()}
        <h1>Bids Files:</h1>
        <h1>Images:</h1>
        <h1>Payment Files:</h1>
    </body>

    </html>
    )};
export default FileRepository;
