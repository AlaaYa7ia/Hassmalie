import React, {useEffect, useState} from 'react';
import "ka-table/style.css";
import {Annotator} from "image-labeler-react";
import 'jspdf-autotable';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import axios from "axios";
import {useDownloadMenuStyles} from '@mui-treasury/styles/menu/download';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';


let dataArray = 0

function symbolData(symbolName, price, symbolNum) {
    let symbol = {};
    symbolNum = 0
    symbol.setName = function (name) {
        symbolName = name;
    }

    symbol.setPrice = function (Num) {
        price = Num;
    }

    symbol.getName = function () {
        return symbolName;
    }

    symbol.setSymbolNum = function () {
        symbolNum++;
    }

    symbol.getSymbolNum = function () {
        return symbolNum;
    }

    symbol.getPrice = function () {
        return price;
    }

    return symbol;
}

//build object
let symbolList = {};

const MapBid = ({match}) => {

    const [projectId, setProjectId] = useState("")
    const [myBusiness, setMyBusiness] = useState({my_business: null});
    const [fetched, setfetched] = useState(false)
    const [fetchedLabels, setfetchedLabels] = useState(false)
    const [fetchedBids, setfetchedBids] = useState([])


    useEffect(() => {

        InitBids().catch(err => {
            console.log("err", err.response)
        });
        buildPAram().then(buildArr().then()).catch(err => {
            console.log("err", err.response)
        });
    }, [])

    const [project, setProject] = useState({});
    const [symbolLabels, setSymbolLabels] = useState([]);
    const [bidsVersions, setBidsVersions] = useState("");
    const [bidsId, setBidsId] = useState("");
    const [fetchedBoxes, setFetchedBoxes] = useState([]);
    const [newMap, setNewMap] = useState({id: ""});
    const [imgUploaded, setImgUploaded] = useState(false);
    let fileSelectedHandler = e => {
        setNewMap(e.target.files[0])
        setBidsId(bidsVersions);
        console.log('bidsID',bidsId)

    }


    const mapSubmit = e => {
        e.preventDefault();
        /*buildArr().catch(err => {
            console.log("err", err.response)
        });
        //console.log("bus befir submit: ",map)
        // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.xsrfCookieName = "csrftoken";
        // axios.defaults.withCredentials = true;*/

        const formData = new FormData();
        try {
            formData.append("photo", newMap, newMap.name);
        } catch (err) {
            console.log("didn't change photo.")
        }
        // console.log(formData.toString());
        formData.append("project_id", projectId);
        formData.append("my_business", myBusiness.my_business);

        // console.log(formData);

        // console.log(newMap)
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/api/bids/',
            data: formData,
        })
            .then((dataRes) => {

                console.log("bid data", dataRes.data)
                setNewMap(dataRes.data)
                demo().then(() => setImgUploaded(true));
                document.getElementById("buttonToHide").style.display = "none"
            }).catch(err => {
            console.log("err", err.response)
        })


    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function demo() {/*
        await sleep(2000);
        */

        // console.log(process.env.REACT_APP_API_URL + '/media/projects/projectsfiles/' + newMap.name)
        // console.log(newMap)
    }


    const buildPAram = async () => {
        setMyBusiness({my_business: match.params.my_business})
        setProjectId(match.params.id)
        setfetched(true)
    }
    const buildArr = async () => {
        let symbols = await axios.get(
            process.env.REACT_APP_API_URL + '/api/symbols/'
        );
        var arr = []
        // console.log("symbols:", symbols)


        for (let key in symbols.data) {
            if (symbolList[symbols.data[key].type] == undefined)
                symbolList[symbols.data[key].type] = symbolData(symbols.data[key].type, symbols.data[key].price, 0)

        }
        for (let key in symbolList) {
            arr.push(key);

        }
        // console.log("arr:", arr)
        // console.log("symbolList:", symbolList)

        setSymbolLabels(arr);
    }
    const InitBids = async () => {
        let bids = await axios.get(
            process.env.REACT_APP_API_URL + "/api/bids/"
        );
        /* var arr = []
         console.log("symbols:", bids)


         for (let key in bids.data) {
             arr.push(bids.data[k);

         }*/
        setfetchedBids(bids.data);
        // console.log("arr:", arr)
        // console.log("arr Len:", bids.data.length)
        /* var arr=[]
         for(let key in symbolList){
             arr.push(symbolList[key].getName());

         }*/
        setBidsVersions(bids.data.length+1);
        setBidsId(bids.data.length+1);
        console.log('bidsID',bidsId)
    }

    const labeledBoxesFetching = async () => {
        if(dataArray==0){
        const response = await fetch(
            process.env.REACT_APP_API_URL + '/api/labels/?my_business=' + myBusiness.my_business + '&version=' + 'B' + newMap.id
        );

        const fetchedData = await response.json();
        // console.log("fetchedData:", fetchedData)
        // console.log("bidsVersions  in fetched:", bidsVersions)
        /*        for (var i in fetchedData) {

                    console.log(i)


                }*/
        setFetchedBoxes(fetchedData)
        setfetchedLabels(true)

        dataArray++;
        }
    }

    function uploadAnnotation() {
        // setImgUploaded(false)
        // console.log("symbolLabelsIn:", symbolLabels)
        // console.log("fetchedBoxesIn:", fetchedBoxes)
        return (
            <div className="App " id="addThing">
                {/*  <script>
                    document.addEventListener("DOMContentLoaded", () => {
                    document.querySelector(".ant-btn").nextElementSibling.innerText = "extract as table"
                });
                </script>*/}
                <div className="alert alert-warning d-flex justify-content-center" role="alert">
                     כדי להזיז את המפה בהתאם To Move
                    <h5 className="text-danger"> |  |</h5>
                    מפיקה טבלת הצעת מחיר ושומרת את המפה והסימוהים שלך upload
                    <h5 className="text-danger"> |  | </h5>
                     כדי להתחיל לסמן פריטים To Annotate
                </div>
                <Annotator id="annotationField"
                           height={700}
                           width={1000}
                           imageUrl={newMap.photo
                               /* "http://127.0.0.1:8000/media/projects/projectsfiles/electrical-wiring-example_QzGkf0q.jpg"*/}
                           asyncUpload={async (labeledData) => {
                               const formData ={};
                               console.log('bidsVersions',bidsVersions)
                               console.log('bidsId',bidsId)
                               console.log('myBusiness.my_business',myBusiness.my_business)
                               console.log('labeledData.boxes',labeledData.boxes)
                               let j=0
                               for (var i in labeledData.boxes) {
                                   symbolList[[labeledData.boxes[i].annotation]].setSymbolNum();
                                   formData[j]= new FormData();
                                   j++
                                   formData[j]= new FormData();
                                   j++
                               }
                               console.log('symbolList', symbolList)
                               j=0;
                               for (var i in symbolList) {
                                   if (symbolList[i].getSymbolNum() !== 0) {
                                       formData[j].append("type", symbolList[i].getName())
                                       formData[j].append("price", symbolList[i].getPrice())
                                       formData[j].append("count", symbolList[i].getSymbolNum())
                                       formData[j].append("total_item_price", symbolList[i].getPrice() * symbolList[i].getSymbolNum())
                                       formData[j].append("my_business", myBusiness.my_business)
                                       formData[j].append("bid_id", bidsId)
                                       formData[j].append("version", "B" + bidsVersions)

                                       axios({
                                           method: 'post',
                                           url: process.env.REACT_APP_API_URL + '/api/bid-table/',
                                           data: formData[j],
                                       })
                                           .then((dataRes) => {
                                               console.log("bid data", dataRes.data)
                                           }).catch(err => {
                                           console.log("err", err.response)
                                       })
                                       j++;
                                   }

                               }


                               for (var i in labeledData.boxes) {
                                   {
                                       formData[j].append("annotation", labeledData.boxes[i].annotation)
                                       formData[j].append("x", labeledData.boxes[i].x)
                                       formData[j].append("y", labeledData.boxes[i].y)
                                       formData[j].append("h", labeledData.boxes[i].h)
                                       formData[j].append("w", labeledData.boxes[i].w)
                                       formData[j].append("my_business", myBusiness.my_business)
                                       formData[j].append("bid_id", bidsId)
                                       formData[j].append("version", "B" + bidsVersions)

                                       axios({
                                           method: 'post',
                                           url: process.env.REACT_APP_API_URL + '/api/labels/',
                                           data: formData[j],
                                       })
                                           .then((dataRes) => {
                                               console.log("label post data", dataRes.data)
                                           }).catch(err => {
                                           console.log("err", err.response)
                                       })
                                       j++;
                                   }

                               }

                              window.location.href = "/TableBid/" + myBusiness.my_business + "/" + "B" +  newMap.id;

                           }}
                    //disableAnnotation={true}
                           types={symbolLabels/*['A', 'B', 'Cylinder']*//*buildArr()*/}

                    /*Boxes={ fetchedBoxes/!*{
                        x: 100,
                        y: 100,
                        w: 10,
                        h: 10,
                        annotation: 'Cylinder'
                    }*!/}*/
                    //array.push to save data

                           showButton={true}
                           defaultBoxes={fetchedBoxes}

                           style={{
                               width: 1100,
                               height: 800,
                               margin: "20px auto",
                               position: "relative",
                               backgroundColor: "#ffffff00 ",
                               borderRadius: 8,
                               padding: 10
                           }}

                    // sceneTypes={['1', '2', '3']}
                />

            </div>

        );
    }

    const projectChange = e => {
        setNewMap({...newMap, [e.target.name]: e.target.value})
        setBidsVersions(newMap.id)
        setBidsId(newMap.id-1)
        console.log("setBidsId",bidsId)

    };


    const handleClick = e => {
        e.preventDefault();
        let bid1 = fetchedBids[newMap.id - 1]
        /*   console.log("event value", newMap.id)
           console.log("selected Bid", bid1)
           console.log("fetchedBids Bid", fetchedBids)*/
        setNewMap(bid1)

        setImgUploaded(true)
        document.getElementById("buttonToHide").style.display = "none"
    };

    function MenuInit() {

        try {
            return (
                fetchedBids.map(bid => (
                    <option value={bid.id}>גרסה {bid.id}</option>
                ))
            )
        } catch (err) {
        }
    }

    return (
        <html>
        <head>
            <meta charset="utf-8">
            </meta>
        </head>

        <body className="counter container-fluid center2 text-black-70" dir="rtl" role="alert" style={{ backgroundColor: 'rgba(60, 60, 60, 0.2)'}}>
        {/*<body class="container container-fluid p-3 mb-2 text-white " role="alert">*/}
        <h1 class="text-right">מפת הפרויקט</h1>
        <p class="text-right">כאן אפשר לבחור גרסה ישנה של המפה, או להעלות מפה חדשה.</p>
        <hr/>
        <div id="buttonToHide" className="row">
            <div className="col-6  d-flex justify-content-center">

                <form className="row right-text" dir='rtl' onSubmit={e => handleClick(e)}>
                    <div className='form-group dropdown'>
                        <h4 >בחירה מפה ישנה </h4>
                        <div className='row'>
                        <select
                            className='form-control right-text'
                            placeholder='בחר גרסה'
                            name='id'
                            /*value={newMap.id}*/
                            onChange={e => projectChange(e)}
                            required
                        >
                            <option value=""> בחר גרסה </option>
                            {MenuInit()}
                        </select>
                        <button className="addBtn btn btn-dark"
                                id="imgUpload" type="submit">בחירה
                        </button>
                        </div>
                    </div>

                </form>
            </div>


            <div className="col-6" dir="rtl">
                <h4 className='text-right m-2'>הוספת מפה חדשה </h4>
                <form onSubmit={e => mapSubmit(e)}  lang="he">

                    <div className="d-flex">
                        <input className="form-group"
                               type='file'
                               name='photo'
                               onChange={e => fileSelectedHandler(e)}></input>
                        <button className="addBtn btn btn-dark"
                                id="imgUpload" type="submit" /*onClick={buildArr().then(labeledBoxesFetching())}*/>הוספה
                        </button>
                    </div>
                </form>
            </div>

        </div>


        {/*console.log(imgUploaded)*/}
        {imgUploaded && fetched && labeledBoxesFetching() && fetchedLabels && uploadAnnotation()}

        <div className="row" id="BidExplanation" style={{display: "none"}}>

            <div className="col-12 col-md-4">
                <div className="row" dir="rtl">

                    <table className="table table-striped">
                        <tbody id="addThing" style={{display: "none"}}>
                        </tbody>
                    </table>


                </div>
            </div>
            <div className="col-12 col-md-4">
                <h3>
                </h3>
            </div>
            <div className="col-12 col-md-4">
                <h3></h3>
            </div>
        </div>


        </body>
        </html>
    );
};

export default MapBid;
