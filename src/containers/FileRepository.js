import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../repoStyle.css';

const FileRepository = ({match}) => {
    const [plans, setPlans] = useState([]);
    const [bids, setBids] = useState([]);
    const [images, setImages] = useState([]);
    const [payments, setPayments] = useState([]);
    const [projectId, setProjectId] = useState()
    const [image, setImage] = useState([]);
    const [flags, setFlags]= useState({images: false, plans: false, payments:false, bids: false})



    const get_plans = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?project_id='+projectId+'&category=P');
        setPlans(files_Res.data);
    }
    const get_bids = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/bids/?project_id='+projectId);
        setBids(files_Res.data);
    }
    const get_images = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?project_id='+projectId+'&category=I');
        setImages(files_Res.data);
    }
    const get_payments = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?project_id='+projectId+'&category=Pay');
        setPayments(files_Res.data);
    }
    const getbuildingimage = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects/'+projectId+'/');
        setImage(files_Res.data.buildingImage);
    }
    useEffect(()=>{
        setProjectId(match.params.id)
    },[])

    useEffect(()=>{
        getbuildingimage()
    },[projectId])

    useEffect(()=>{
        get_plans()
    },[image])
    useEffect(()=>{
        get_bids()
    },[plans])
    useEffect(()=>{
        get_images()
    },[bids])
    useEffect(()=>{
        get_payments()
    },[images])
    useEffect(()=>{
        setFlags({images: true, plans: true, payments: true, bids: true})
    },[payments])

    function checkURLIfImage(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    function showFiles(list){
        try{
            return (
            list.map(file => (
                <div className={"column"}>
                    <a href={file.file} target="_blank" download >
                    <div className="content">
                        {checkURLIfImage(file.file) ?
                            <img src={file.file} style={{width:'100%'}}/> :
                            <img src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon5.png'}
                                 style={{width:'100%'}}/>}
                            <h4>{file.description}</h4>
                    </div>
                    </a>
                </div>
            ))
            )
        }catch (err){
            console.log(err)
        }
    }

    function showbuildingimage(){
        if (image !== null) {
            return (
                <div  className="column images">
                    <a href={image} target="_blank" download >
                    <div className="content">
                        <img src={image} style={{width:'100%'}}/>
                        <h4>תמונה ראשית של הבניין</h4>
                    </div>
                    </a>
                </div>
            )
        }
    }

    function filterSelection(obj){
        try {
            if (obj === 'all') {
                setFlags({images: true, plans: true, payments: true, bids: true})
            } else {
                setFlags({images: false, plans: false, payments: false, bids: false}).then(
                    setFlags(...flags, {[obj]: true})
                )
            }
        }
        catch (err){
            console.log(err)
        }
    }

    return(

    <html lang="he" className="right-text" dir='rtl'>
    <body>
    <div className="main">
        <div id="myBtnContainer" className='right-text' >
            <button className="btn active"
                    onClick={()=>setFlags({images: true, plans: true, payments: true, bids: true})}>
                הכל</button>
            <button className="btn" onClick={()=>setFlags({images: true, plans: false, payments: false, bids: false})}> תמונות</button>
            <button className="btn" onClick={()=>setFlags({images: false, plans: true, payments: false, bids: false})}> תוכניות</button>
            <button className="btn" onClick={()=>setFlags({images: false, plans: false, payments: true, bids: false})}> תשלומים</button>
            <button className="btn" onClick={()=>setFlags({images: false, plans: false, payments: false, bids: true})}> הצעות מחיר</button>

        </div>
        <div className="row">
            {flags.images ? showbuildingimage(): ""}
            {flags.images ? showFiles(images): ""}
            {flags.plans? showFiles(plans):""}
            {flags.payments ? showFiles(payments): ""}
            {flags.bids ? showFiles(bids):""}
        </div>
    </div>

    </body>


    </html>
    )};
export default FileRepository;
