import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const WORKER_TYPE =
    {'R': 'חשמלאי רגיל',
        'C': 'קבלן',
        'A': 'אדרכל'};

const Project = ({match}) => {
    const [projectId, setProjectId] = useState("")
    const [project, setProject] = useState({});
    const [myBusiness, setMyBusiness] = useState({my_business: null});
    const [contractor, setContractor] = useState({});
    const [architect, setArchitect] = useState({});
    const [customer, setCustomer] = useState({});

    const getProjectData = async () => {
        const projects_Res = await axios.get('/api/projects/?id='+projectId+'&my_business='+myBusiness.my_business)
        setProject(projects_Res.data[0]);
    }

    const getContractor = async () => {
        const projects_Res = await axios.get('/api/workers/?id='+project.contractor_id+'&my_business='+myBusiness.my_business)
        setContractor(projects_Res.data[0]);
    }
    const getArchitect = async () => {
        const projects_Res = await axios.get('/api/workers/?id='+project.architect_id+'&my_business='+myBusiness.my_business)
        setArchitect(projects_Res.data[0]);
    }
    const getCustomer = async () => {
        const projects_Res = await axios.get('/api/customers/?id='+project.customer_id+'&my_business='+myBusiness.my_business)
        setCustomer(projects_Res.data[0]);
    }

    useEffect(()=>{
        setMyBusiness({my_business: match.params.my_business})
        setProjectId(match.params.id)
    },[])

    useEffect(()=>{
        getProjectData()
    },[projectId, myBusiness])

    useEffect(()=>{
        getContractor().then(
            getArchitect().then(
                getCustomer()
            )
        )
    },[project])

    function getImgUrl(image, instance) {
        if (image === null) {
            return process.env.REACT_APP_API_URL+'/media/defaultpictuers/default_'+instance+'_pic.png';
        }
        return image;
    }

    function loadCustomer(customer){
        return(
            <div id={"accordion"+ customer.id}  className='col-4'>
                <div className="card">
                    <div className="card-header" id={"heading"+customer.id} >

                        <button className="btn btn-link " data-toggle="collapse" data-target={"#collapse"+customer.id}
                                aria-expanded="true" aria-controls={"collapse"+customer.id}>
                            <img src={getImgUrl(customer.photo, "customer")} height={150} width={150}></img>
                            <p className='lead'>{customer.first_name} {customer.last_name} - לקוח\ בעל הבית </p>
                        </button>

                    </div>

                    <div id={"collapse"+customer.id} className="collapse " aria-labelledby={"heading"+customer.id} data-parent={"#accordion"+customer.id}>
                        <div className="card-body">
                            <p>{customer.email}</p>
                            <p>{customer.password}</p>
                            <p>{customer.phone_number}</p>
                            <p>{customer.address}</p>
                            <p>{customer.age}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    function loadPeople(worker){
        return(
            <div id={"accordion"+ worker.id}  className='col-4'>
                <div className="card">
                    <div className="card-header" id={"heading"+worker.id} >

                        <button className="btn btn-link " data-toggle="collapse" data-target={"#collapse"+worker.id}
                                aria-expanded="true" aria-controls={"collapse"+worker.id}>
                            <img src={getImgUrl(worker.photo, "worker")} height={150} width={150}></img>
                            <p className='lead'>{worker.first_name} {worker.last_name} - {WORKER_TYPE[worker.title]}</p>
                        </button>

                    </div>

                    <div id={"collapse"+worker.id} className="collapse " aria-labelledby={"heading"+worker.id} data-parent={"#accordion"+worker.id}>
                        <div className="card-body">
                            <p>{worker.email}</p>
                            <p>{worker.password}</p>
                            <p>{worker.phone_number}</p>
                            <p>{worker.address}</p>
                            <p>{worker.rate_per_day}</p>
                            <p>{worker.age}</p>
                            <p><a href={worker.id_photo} >תעודת זהות</a></p>
                            <p> <a href={worker.license} >רשיון נהיגה</a></p>
                            <p><a href={worker.permit}>רשיון עבודה</a></p>
                            <p>{worker.is_active ? "פעיל" : "לא פעיל"}</p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <html lang="he" >
        <head>
            <meta charSet="utf-8"></meta>

        </head>
        <body className='right-text' dir="rtl">
        <div>
            <div className=' container-fluid row' style={{justifyContent: 'right'}}>
                <div className='mt-5 mb-5 col-7'>
                    <h1>פרויקט: {project.name}</h1>
                </div>
                <div className="text-container col-2 mt-5">
                    <Link to={"/file-repository/"+project.id}>
                        <img className='img-link'
                             src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon5.png'} height={70}
                             width={70}/>
                        <p className="centered lead">מאגר הקבצים</p>
                    </Link>
                </div>
                <div className="text-container col-2 mt-5">
                    <Link to={"/bid/"+project.id} >
                        <img className='img-link'
                             src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon6.png'} height={70}
                             width={70}/>
                        <p className="centered lead text-danger">להפקת הצעת מחיר</p>
                    </Link>
                </div>
                <div className='col-1'></div>
            </div>
        <div className=' container-fluid  mt-5' style={{justifyContent: 'right'}}>
        <div className='row'>
            <div className='col-3 m-5'>
                <img src={getImgUrl(project.buildingImage, "project")} height={450} width={300}/>
                <div>
                    <p>{project.name}</p>
                    <p>{project.type_of_building}</p>
                    <p>{project.address}</p>
                    <p>{project.description}</p>
                </div>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped active text-dark " role="progressbar" aria-valuenow={project.progress}
                         aria-valuemin="0" aria-valuemax="100" style={{width: project.progress+'%'}}>
                        {project.progress}%
                    </div>
                </div>
            </div>
            <div className='row col-7 m-5'>
                {loadPeople(contractor)}
                {loadPeople(architect)}
                {loadCustomer(customer)}
            </div>
        </div>
        </div>


        </div>
        </body>
        </html>
    )
}
export default Project;