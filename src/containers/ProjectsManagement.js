import React, { useEffect,useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import {Link} from 'react-router-dom';
import PlacesAutocomplete from "react-places-autocomplete";

const ProjectsManagement  = ({ get_user_data, isAuthenticated}) => {
    const [projects, setProjects] = useState([]);
    const [myBusiness, setMyBusiness] = useState({my_business: null});
    const [showProjects, setShowProjects] = useState(false);
    const [showOneProject, setShowOneProject] = useState(false);
    const [projectToShow, setProjectToShow] = useState("");
    const [newProject, setNewProject] = useState("");
    const [addProject, setAddProject] = useState({showForm: false, showButton: true})
    const[changed, setChanged]= useState(false);




    const get_projects = async (dataRes) =>{
        const projects_Res = await axios.get('/api/projects/?my_business='+myBusiness.my_business)
        setProjects(projects_Res.data);
    }

    const get_user = async ()=>{
       const user_Res = await get_user_data()
       setMyBusiness({my_business: user_Res.id})
    }

    useEffect(()=>{
      get_user()
    },[])

    useEffect(()=>{
      get_projects().then(setChanged(false))
    },[myBusiness, changed])

    function getImgUrl(image, instance) {
        if (image === null) {
            return process.env.REACT_APP_API_URL+'/media/defaultpictuers/default_'+instance+'_pic.png';
        }
        return image;
    }

    const newProjectChange = e => setNewProject({ ...newProject, [e.target.name]: e.target.value });

    const newProjectChangeAddress = e => setNewProject({...newProject,['address']: e});
    let fileSelectedHandler  = e =>{setNewProject({...newProject, [e.target.name]: e.target.files[0] })}

    const newProjectSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{
            formData.append("buildingImage", newProject.buildingImage,newProject.buildingImage.name);
        } catch(err){console.log("didn't change photo.")}
        formData.append('my_business', myBusiness.my_business);
        formData.append('manager', myBusiness.my_business);
        formData.append('name', newProject.name);
        formData.append('type_of_building', newProject.type_of_building);
        formData.append('address', newProject.address);
        formData.append('contractor_id', newProject.contractor_id);
        formData.append('architect_id', newProject.architect_id);
        formData.append('customer_id', newProject.customer_id);
        formData.append('progress', newProject.progress);
        let bool = false;
        if(newProject.is_closed === true){bool = true}
        formData.append('is_closed', bool);
        formData.append('description', newProject.description);



        console.log("new pjoject:", newProject);
        setNewProject("");

        axios({
            method: 'post',
            url: "/api/projects/",
            data: formData,
        })
            .then((dataRes) => {

                setProjects(dataRes.data)
                console.log("projects data", dataRes.data)
                setAddProject({showForm: false, showButton: true});
                setChanged(true);
            }).catch(err=>{ console.log("err", err.response)})


    }

    let addProjectClickHandler = () => {
        setAddProject({showForm: true, showButton:  false});
    };

    let dontAddProjectClickHandler = () => {
        setAddProject({showForm: false, showButton: true});
        setNewProject("");
    };

    function projectForm(){
        return(
            <form className="right-text col-6" dir='rtl' onSubmit={e => newProjectSubmit(e)}>
                <input
                    className='form-control'
                    type='text'
                    placeholder= "שם פרויקט"
                    name='name'
                    value={newProject.name}
                    onChange={e => newProjectChange(e)}
                />
                <input
                    className='form-control'
                    type='text'
                    placeholder= "סוג הבניין"
                    name='type_of_building'
                    value={newProject.type_of_building}
                    onChange={e => newProjectChange(e)}
                />
                <div className='form-group'>
                    <PlacesAutocomplete
                        value={newProject.address}
                        onChange={e => newProjectChangeAddress(e)}
                        onSelect={e => newProjectChangeAddress(e)}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>

                                <input className='form-control'
                                       {...getInputProps({ placeholder: "מקום הבניין" })} />

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
                <input
                    className='form-control'
                    type='number'
                    placeholder="קבלן"
                    name='contractor_id'
                    value={newProject.contractor_id}
                    onChange={e => newProjectChange(e)}
                    minLength='1'
                />
                <input
                    className='form-control'
                    type='number'
                    placeholder="אדרכל"
                    name='architect_id'
                    value={newProject.architect_id}
                    onChange={e => newProjectChange(e)}
                    minLength='1'
                />
                <input
                    className='form-control'
                    type='number'
                    placeholder="בעל הבית\ לקוח"
                    name="customer_id"
                    value={newProject.customer_id}
                    onChange={e => newProjectChange(e)}
                    minLength='1'
                />
                <input
                    className='form-control'
                    type='text'
                    placeholder= "תיאור"
                    name='description'
                    value={newProject.description}
                    onChange={e => newProjectChange(e)}
                />
                <input
                    className='form-control'
                    type='number'
                    placeholder="אחוז התקדמות"
                    name="progress"
                    value={newProject.progress}
                    onChange={e => newProjectChange(e)}
                />

                הפרויקט מושבת .
                <input
                    type='checkbox'
                    name='is_closed'
                    value={newProject.is_closed}
                    onChange={e => newProjectChange(e)}
                />
                <br></br>

                <input className='form-group'
                       type = 'file'
                       name='buildingImage'
                       onChange={e => fileSelectedHandler(e)}
                />
                <br></br>
                <button className='btn btn-success' type='submit'>הוספה</button>
                <button className='btn btn-danger' onClick={dontAddProjectClickHandler}>בטל הוספת פרויקט</button>
            </form>
        )
    }

    // function loadProjects(){
    //     try{
    //         return(
    //             projects.map(project => (
    //                 <div id={"accordion"+ project.id}  className='col-2'>
    //                     <div className="card">
    //                         <div className="card-header" id={"heading"+project.id.toString()} >
    //
    //                             <button className="btn btn-link " data-toggle="collapse" data-target={"#collapse"+project.id}
    //                                     aria-expanded="true" aria-controls={"collapse"+project.id}>
    //                                 <img src={getImgUrl(project.buildingImage, "project")} height={150} width={150}></img>
    //                             </button>
    //
    //                         </div>
    //
    //                         <div id={"collapse"+project.id} className="collapse " aria-labelledby={"heading"+project.id} data-parent={"#accordion"+project.id}>
    //                             <div className="card-body">
    //                                 <p>{project.type_of_building}</p>
    //                                 <p>{project.address}</p>
    //                                 <p>{project.contractor_id}</p>
    //                                 <p>{project.architect_id}</p>
    //                                 <p>{project.customer_id}</p>
    //                                 <p><Link to={"/bid/"+project.id} >הצעת מחיר</Link></p>
    //                                 <p><Link to={"/file-repository/"+project.id}>מאגר הקבצים</Link></p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )))
    //     } catch(err){
    //     }
    // }

    function loadProjects(){
        try {

        return(
            projects.map(project => (
                <Link to={"/project/"+project.id} className="img-container m-3 ">
                    <img src={getImgUrl(project.buildingImage, "project")} alt="Avatar" className="image"></img>
                        <div className="overlay">{project.name + " - " + project.address}</div>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped active text-dark " role="progressbar" aria-valuenow={project.progress.toString()}
                             aria-valuemin="0" aria-valuemax="100" style={{width: project.progress.toString()+'%'}}>
                            {project.progress}%
                        </div>
                    </div>
                </Link>

            ))
        )
        } catch(err){}
    }

    return(
        <div>
            <html lang="he" >
            <head>
                <meta charSet="utf-8"></meta>

            </head>
            <body dir="rtl">
            <div className=' container-fluid  mt-5' style={{justifyContent: 'right'}}>
                {addProject.showButton && <button className='btn btn-primary mr-5' onClick={addProjectClickHandler}
                                                  style={{display: 'flex', alignItems: 'right'}}>תוסיף פרויקט
                    חדש</button>}
                {addProject.showForm && projectForm()}

            </div>
            <div class = "container-fluid row mt-5 mr-5">
                {loadProjects()}
            </div>
            </body>
            </html>
        </div>
    );

};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });
export default connect(mapStateToProps, { get_user_data })(ProjectsManagement);
