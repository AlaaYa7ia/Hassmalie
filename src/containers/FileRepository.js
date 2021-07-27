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
    const [myBusiness, setMyBusiness] = useState("")
    const[changed, setChanged]= useState("");
    const [newFile, setNewFile] = useState("");
    const [project, setProject] = useState({});


    const newFileChange = e => setNewFile({ ...newFile, [e.target.name]: e.target.value });

    const newFileSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try {
            formData.append("file", newFile.file, newFile.file.name);
        } catch (err) {
            console.log("didn't change photo.")
        }
        formData.append("my_business", myBusiness);
        formData.append("project_id", projectId);
        formData.append("name", newFile.name);
        formData.append("category", newFile.category);
        formData.append("deleted", false);
        formData.append("description", newFile.description);

        axios({
            method: 'post',
            url: "/api/projects-files/",
            data: formData,
        })
            .then((dataRes) => {
                console.log("projects data", dataRes.data)
                setChanged(true);
            }).catch(err=>{ console.log("err", err.response)})
    }


    const getProjectData = async () => {
        const projects_Res = await axios.get('/api/projects/?id='+projectId+'&my_business='+myBusiness)
        setProject(projects_Res.data[0]);
    }

    const get_plans = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?project_id='+projectId+'&category=P&deleted=false');
        setPlans(files_Res.data);
    }
    const get_bids = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/bids/?project_id='+projectId+'&deleted=false');
        setBids(files_Res.data);
    }
    const get_images = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?project_id='+projectId+'&category=I&deleted=false');
        setImages(files_Res.data);
    }
    const get_payments = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects-files/?project_id='+projectId+'&category=Pay&deleted=false');
        setPayments(files_Res.data);
    }
    const getbuildingimage = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/projects/'+projectId+'/');
        setImage(files_Res.data.buildingImage);
    }
    useEffect(()=>{
        setProjectId(match.params.id)
        setMyBusiness(match.params.my_business)
    },[])

    useEffect(()=>{
        console.log("here", changed)
        getProjectData()
            .then(getbuildingimage())
            .then(get_plans())
            .then(get_bids())
            .then(get_images())
            .then(get_payments())
            .then(setFlags({images: true, plans: true, payments: true, bids: true}))


    },[projectId, myBusiness, changed])

    // useEffect(()=>{
    //     get_plans()
    // },[image])
    // useEffect(()=>{
    //     get_bids()
    // },[plans])
    // useEffect(()=>{
    //     get_images()
    // },[bids])
    // useEffect(()=>{
    //     get_payments()
    // },[images])
    // useEffect(()=>{
    //     setFlags({images: true, plans: true, payments: true, bids: true})
    // },[payments])

    const deleteFileReq = async(e, file) => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        formData.append('my_business', myBusiness);
        formData.append('project_id', projectId);

        formData.append('deleted', true);

        await axios({
            method: 'put',
            url: "/api/projects-files/"+file.id+"/",
            data: formData,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((dataRes) => {
                console.log( "data", dataRes.data)
                // setPayments([]);
                // setPlans([]);
                // setImages([]);
                // setBids([]);
                setFlags({images: false, plans: false, payments:false, bids: false});
                setChanged(dataRes.data.id);
            }).catch(err=>{ console.log("err", err.response)})

    }


    function checkURLIfImage(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    function getImageByType(url) {
        if(url.match(/\.(pdf)$/) != null){
            return '/media/defaultpictuers/icon8.png';
        }
        if(url.match(/\.(mp4|wmv|avi|mov)$/) != null){
            return '/media/defaultpictuers/icon10.png';
        }
        return '/media/defaultpictuers/icon7.png';
    }

    function showFiles(list){
        try{
            return (
            list.map(file => (
                <div className={"column"}>
                    <a href={file.file} target="_blank" download >
                    <div className="content " style={{ backgroundColor: 'rgba(229, 225, 225)'}}>
                        {checkURLIfImage(file.file) ?
                            <img src={file.file} style={{width:'100%'}}/> :
                            <img src={process.env.REACT_APP_API_URL + getImageByType(file.file)}
                                 style={{width:'100%'}}/>}
                            <h4>{file.name}</h4>
                            <a className='text-dark'>{file.description}</a>

                    </div>
                    </a>
                    <form  onSubmit={e => deleteFileReq(e, file)}>
                    <button className='btn btn-outline-danger mt-1'  type='submit'
                            style={{display: 'flex', alignItems: 'right'}}>מחיקת קובץ</button>
                    </form>
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
                <div  className="column images" >
                    <a href={image} target="_blank" download >
                    <div className="content" style={{ backgroundColor: 'rgba(229, 225, 225)'}}>
                        <img src={image} style={{width:'100%'}}/>
                        <h4>תמונה ראשית של הבניין</h4>
                    </div>
                    </a>
                </div>
            )
        }
    }

    let fileSelectedHandler  = e =>{setNewFile({...newFile, [e.target.name]: e.target.files[0] })}


    function fileForm(){
        return(
            <div className>
                <br/>
            <h3> להוספת קובץ לפרויקט: {project.name}</h3>
            <form className="right-text row" dir='rtl' onSubmit={e => newFileSubmit(e)}>
                <div className='form-group dropdown col-2'>
                    <select
                        className='form-control right-text'
                        placeholder='קטיגוריה*'
                        name='category'
                        value={newFile.category}
                        onChange={e => newFileChange(e)}
                        required
                    >
                        <option value="">קטיגוריה*</option>
                        <option value="I">תמונות</option>
                        <option value="P">תוכניות</option>
                        <option value="Pay">תשלומים</option>
                    </select>
                </div>
                <input
                    className='form-control col-2'
                    type='text'
                    placeholder= "שם קובץ"
                    name='name'
                    value={newFile.name}
                    onChange={e => newFileChange(e)}
                />
                <input className='form-group col-3'
                       type = 'file'
                       name='file'
                       onChange={e => fileSelectedHandler(e)}
                       required
                />
                <input
                    className='form-control col-4'
                    type='text'
                    placeholder= "תיאור"
                    name='description'
                    value={newFile.description}
                    onChange={e => newFileChange(e)}
                />
                <button className='btn btn-success col-1 mr-3' type='submit' >הוספה</button>

            </form>
                <p>* להוספת קובץ הצעת מחיר נא לעבור <Link to={"/bid/"+myBusiness+"/"+projectId} >לדף</Link>.</p>
            </div>
        )

    }

    return(

    <html lang="he" className="right-text" dir='rtl'>
    <body className="counter container-fluid center2 text-black-70" dir="rtl" style={{ backgroundColor: 'rgba(60, 60, 60, 0.2)'}}>
    <h1 className='right-text m-3'>מאגר הקבצים של פרויקט: {project.name}</h1>
    <p className='right-text m-3'> כאן ניתן לצפות בקבצים קיימים או לעלות חדשים, אפשר גם למחוק קבצים מהמאגר.</p>
    <hr/>
    <div className="main">
        <div id="myBtnContainer" className='right-text' >
            {fileForm()}
            <hr/>
            <h3>קבצי הפרויקט</h3>
            <button className="btn active"
                    onClick={()=>setFlags({images: true, plans: true, payments: true, bids: true})}>
                הכל</button>
            <button className="btn  btnx" onClick={()=>setFlags({images: true, plans: false, payments: false, bids: false})}> תמונות</button>
            <button className="btn btnx" onClick={()=>setFlags({images: false, plans: true, payments: false, bids: false})}> תוכניות</button>
            <button className="btn btnx" onClick={()=>setFlags({images: false, plans: false, payments: true, bids: false})}> תשלומים</button>
            <button className="btn btnx" onClick={()=>setFlags({images: false, plans: false, payments: false, bids: true})}> הצעות מחיר</button>

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
