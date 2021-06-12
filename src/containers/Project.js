import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import PlacesAutocomplete from "react-places-autocomplete";

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
    const [addProject, setAddProject] = useState({showForm: false, showButton: true, edit: false})
    const[changed, setChanged]= useState(false);
    const [contractors, setContactors] = useState([]);
    const [architects, setArchitects] = useState([]);
    const [customers, setCustomers] = useState([]);

    const getProjectData = async () => {
        const projects_Res = await axios.get('/api/projects/?id='+projectId+'&my_business='+myBusiness.my_business)
        setProject(projects_Res.data[0]);
    }

    const get_customers = async (dataRes) =>{
        const projects_Res = await axios.get('/api/customers/?my_business='+myBusiness.my_business)
        setCustomers(projects_Res.data);
    }

    const get_contractors = async (dataRes) =>{
        const projects_Res = await axios.get('/api/workers/?my_business='+myBusiness.my_business+'&title=C')
        setContactors(projects_Res.data);
    }

    const get_archetictors = async (dataRes) =>{
        const projects_Res = await axios.get('/api/workers/?my_business='+myBusiness.my_business+'&title=A')
        setArchitects(projects_Res.data);
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
            .then(get_archetictors())
            .then(get_contractors())
            .then(get_customers())
            .then(setChanged(false))
    },[projectId, myBusiness,changed])

    useEffect(()=>{
        getContractor().then(
            getArchitect().then(
                getCustomer()
            )
        )
    },[project])


    let addProjectClickHandler = () => {
        setAddProject({showForm: true, showButton:  false});
    };

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
                            <img src={getImgUrl(customer.photo, "customer")} height={120} width={120}></img>
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
                            <img src={getImgUrl(worker.photo, "worker")} height={120} width={120}></img>
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

    const projectChange = e => setProject({ ...project, [e.target.name]: e.target.value });
    const projectChangeAddress = e => setProject({...project,['address']: e});
    let fileSelectedHandler  = e =>{setProject({...project, [e.target.name]: e.target.files[0] })}
    let dontAddProjectClickHandler = () => {
        setAddProject({showForm: false, showButton: true});
    };

    const editProjectSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{
            formData.append("buildingImage", project.buildingImage,project.buildingImage.name);
        } catch(err){console.log("didn't change photo.")}
        formData.append('my_business', myBusiness.my_business);
        formData.append('manager', myBusiness.my_business);
        formData.append('name', project.name);
        formData.append('type_of_building', project.type_of_building);
        formData.append('address', project.address);
        formData.append('contractor_id', project.contractor_id);
        formData.append('architect_id', project.architect_id);
        formData.append('customer_id', project.customer_id);
        formData.append('progress', project.progress? project.progress: 0);
        let bool = false;
        if(project.is_closed === true){bool = true}
        formData.append('is_closed', bool);
        formData.append('description', project.description);



        console.log("edit project:", project);
        setProject("");

        axios({
            method: 'put',
            url: "/api/projects/"+projectId+"/",
            data: formData,
        })
            .then((dataRes) => {

                setProject(dataRes.data)
                console.log("projects data", dataRes.data)
                setAddProject({showForm: false, showButton: true});
                setChanged(true);
            }).catch(err=>{ console.log("err", err.response)})


    }

    function getWorkersNames(arr){
        try {
            return(
                arr.map(worker => (
                    <option value={worker.id}>{worker.first_name+" "+ worker.last_name}</option>
                ))
            )
        } catch(err){}
    }

    function projectForm(){
        return(
            <form className="right-text" dir='rtl' onSubmit={e => editProjectSubmit(e)}>
                <input
                    className='form-control'
                    type='text'
                    placeholder= "שם פרויקט*"
                    name='name'
                    value={project.name}
                    onChange={e => projectChange(e)}
                    required
                />
                <input
                    className='form-control'
                    type='text'
                    placeholder= "סוג הבניין*"
                    name='type_of_building'
                    value={project.type_of_building}
                    onChange={e => projectChange(e)}
                    required
                />
                <div className='form-group'>
                    <PlacesAutocomplete
                        value={project.address}
                        onChange={e => projectChangeAddress(e)}
                        onSelect={e => projectChangeAddress(e)}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>

                                <input className='form-control'
                                       required
                                       {...getInputProps({ placeholder: "מקום הבניין*" })} />

                                <div>
                                    {loading ? <div>...loading</div> : null}

                                    {suggestions.map(suggestion => {
                                        const style = {
                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                        };

                                        return (
                                            <div {...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </div>
                <div className='form-group dropdown'>
                    <select
                        className='form-control right-text'
                        placeholder='קבלן*'
                        name='contractor_id'
                        value={project.contractor_id}
                        onChange={e => projectChange(e)}
                        required
                    >
                        <option value="">שם קבלן*</option>
                        {getWorkersNames(contractors)}
                    </select>
                </div>
                <div className='form-group dropdown'>
                    <select
                        className='form-control right-text'
                        placeholder='אדרכל*'
                        name='architect_id'
                        value={project.architect_id}
                        onChange={e => projectChange(e)}
                        required
                    >
                        <option value="">שם אדרכל*</option>
                        {getWorkersNames(architects)}
                    </select>
                </div>
                <div className='form-group dropdown'>
                    <select
                        className='form-control right-text'
                        placeholder='בעל הבית\ לקוח*'
                        name='customer_id'
                        value={project.customer_id}
                        onChange={e => projectChange(e)}
                        required
                    >
                        <option value="">בעל הבית\ לקוח*</option>
                        {getWorkersNames(customers)}
                    </select>
                </div>
                <input
                    className='form-control'
                    type='text'
                    placeholder= "תיאור"
                    name='description'
                    value={project.description}
                    onChange={e => projectChange(e)}
                />
                <input
                    className='form-control'
                    type='number'
                    placeholder="אחוז התקדמות"
                    name="progress"
                    value={project.progress}
                    onChange={e => projectChange(e)}
                />
                <div className='text-danger'>הפרויקט מושבת? (שים לב: סימון של פרויקט כלא פעיל מוריד אותו מהמערכת)</div>
                הפרויקט מושבת .
                <input
                    type='checkbox'
                    name='is_closed'
                    value={project.is_closed}
                    onChange={e => projectChange(e)}
                />
                <br></br>

                <input className='form-group'
                       type = 'file'
                       name='buildingImage'
                       onChange={e => fileSelectedHandler(e)}
                />
                <br></br>
                <button className='btn btn-success' type='submit'>עריכה</button>
                <button className='btn btn-danger' onClick={dontAddProjectClickHandler}>בטל עריכת פרויקט</button>
            </form>
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
                <div className='mt-5 mb-5 col-5'>
                    <h1>פרויקט: {project.name}</h1>
                </div>
                <div className='col-4'></div>
                <div className="text-container col-1 mt-5">
                    <Link to={"/file-repository/"+myBusiness.my_business+"/"+project.id}>
                        <img className='img-link'
                             src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon5.png'} height={70}
                             width={70}/>
                        <p className="centered lead">מאגר הקבצים</p>
                    </Link>
                </div>
                <div className="text-container col-1 mt-5">
                    <Link to={"/bid/"+myBusiness.my_business+"/"+project.id} >
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
            <div className='col-4 m-5'>
                <div className='row'>
                <div className='col-2'></div>
                <div className='col-10'>
                <img src={getImgUrl(project.buildingImage, "project")} height={450} width={450}/>
                <div className='row'>
                <div  className='col-6'>
                    <p>{project.name}</p>
                    <p>{project.type_of_building}</p>
                    <p>{project.address}</p>
                    <p>{project.description}</p>
                </div>
                    <div className=' container-fluid  mt-5 col-6' style={{justifyContent: 'right'}}>
                        {addProject.showButton && <button className='btn btn-primary mr-5' onClick={addProjectClickHandler}
                                                          style={{display: 'flex', alignItems: 'right'}}>לעריכת פרטי הפרויקט</button>}

                    </div>
                </div>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped active text-dark " role="progressbar" aria-valuenow={project.progress}
                             aria-valuemin="0" aria-valuemax="100" style={{width: project.progress+'%'}}>
                            {project.progress}%
                        </div>
                    </div>
                </div>
            </div>

            </div>
            {addProject.showForm && <div className='col-5'> {projectForm()}</div>}
            <div className='row col-4'>
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