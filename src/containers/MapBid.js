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


const dataArray = Array()

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
    const [fetchedBoxes, setFetchedBoxes] = useState([]);
    const [newMap, setNewMap] = useState({id: ""});
    const [imgUploaded, setImgUploaded] = useState(false);
    let fileSelectedHandler = e => {
        setNewMap(e.target.files[0])

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
        console.log(formData.toString());
        formData.append("project_id", projectId);
        formData.append("my_business", myBusiness.my_business);

        console.log(formData);

        console.log(newMap)
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

        console.log(process.env.REACT_APP_API_URL + '/media/projects/projectsfiles/' + newMap.name)
        console.log(newMap)
    }


    const buildPAram = async () => {
        setMyBusiness({my_business: match.params.my_business})
        setProjectId(match.params.id)
        setfetched(true)
    }
    const buildArr = async () => {
        let symbols = await axios.get(
            "http://127.0.0.1:8000/api/symbols/"
        );
        var arr = []
        console.log("symbols:", symbols)


        for (let key in symbols.data) {
            if (symbolList[symbols.data[key].type] == undefined)
                symbolList[symbols.data[key].type] = symbolData(symbols.data[key].type, symbols.data[key].price, 0)

        }
        for (let key in symbolList) {
            arr.push(key);

        }
        console.log("arr:", arr)
        console.log("symbolList:", symbolList)

        setSymbolLabels(arr);
    }
    const InitBids = async () => {
        let bids = await axios.get(
            "http://127.0.0.1:8000/api/bids/"
        );
        /* var arr = []
         console.log("symbols:", bids)


         for (let key in bids.data) {
             arr.push(bids.data[k);

         }*/
        setfetchedBids(bids.data);
        // console.log("arr:", arr)
        console.log("arr Len:", bids.data.length)
        /* var arr=[]
         for(let key in symbolList){
             arr.push(symbolList[key].getName());

         }*/
        setBidsVersions(bids.data.length);
    }

    const labeledBoxesFetching = async () => {

        const response = await fetch(
            'http://127.0.0.1:8000/api/labels/?my_business=' + myBusiness.my_business + '&version=' + 'B'+newMap.id
        );

        const fetchedData = await response.json();
        console.log("fetchedData:", fetchedData)
        /*        for (var i in fetchedData) {

                    console.log(i)


                }*/
        setFetchedBoxes(fetchedData)
        setfetchedLabels(true)
    }

    function uploadAnnotation() {
        // setImgUploaded(false)
        console.log("symbolLabelsIn:", symbolLabels)
        console.log("fetchedBoxesIn:", fetchedBoxes)
        return (
            <div className="App " id="addThing">
                {/*  <script>
                    document.addEventListener("DOMContentLoaded", () => {
                    document.querySelector(".ant-btn").nextElementSibling.innerText = "extract as table"
                });
                </script>*/}
                <Annotator id="annotationField"
                           height={700}
                           width={1000}
                           imageUrl={newMap.photo
                               /* "http://127.0.0.1:8000/media/projects/projectsfiles/electrical-wiring-example_QzGkf0q.jpg"*/}
                           asyncUpload={async (labeledData) => {
                               const formData = new FormData();

                               console.log(labeledData.boxes)
                               for (var i in labeledData.boxes) {
                                   symbolList[[labeledData.boxes[i].annotation]].setSymbolNum();
                               }
                               console.log('symbolList', symbolList)
                               for (var i in symbolList) {
                                   if (symbolList[i].getSymbolNum() !== 0) {
                                       formData.append("type", symbolList[i].getName())
                                       formData.append("price", symbolList[i].getPrice())
                                       formData.append("count", symbolList[i].getSymbolNum())
                                       formData.append("total_item_price", symbolList[i].getPrice() * symbolList[i].getSymbolNum())
                                       formData.append("my_business", myBusiness.my_business)
                                       formData.append("bid_id", (bidsVersions))
                                       formData.append("version", "B" + bidsVersions)

                                       axios({
                                           method: 'post',
                                           url: process.env.REACT_APP_API_URL + '/api/bid-table/',
                                           data: formData,
                                       })
                                           .then((dataRes) => {

                                               console.log("bid data", dataRes.data)
                                           }).catch(err => {
                                           console.log("err", err.response)
                                       })
                                       console.log(formData)
                                   }
                               }

                               for (var i in labeledData.boxes) {
                                   {
                                       formData.append("annotation", labeledData.boxes[i].annotation)
                                       formData.append("x", labeledData.boxes[i].x)
                                       formData.append("y", labeledData.boxes[i].y)
                                       formData.append("h", labeledData.boxes[i].h)
                                       formData.append("w", labeledData.boxes[i].w)
                                       formData.append("bid_id", (bidsVersions))
                                       formData.append("version", "B" + bidsVersions)

                                       axios({
                                           method: 'post',
                                           url: process.env.REACT_APP_API_URL + '/api/labels/',
                                           data: formData,
                                       })
                                           .then((dataRes) => {

                                               console.log("label post data", dataRes.data)
                                           }).catch(err => {
                                           console.log("err", err.response)
                                       })
                                       console.log(formData)
                                   }
                               }

                               window.location.href = "/TableBid/" + myBusiness.my_business + "/" + "B" + bidsVersions;
                               /*
                                                       let html = " <tr>     <th scope=\"col\">" + 'סוג' + "</th>" +
                                                           "   <td> " + "מחיר ליח'" + "</td>" /!*+
                                                               "   <td> " + "כמות" + "</td>" +
                                                               "   <td> " + "מחיר כללי" + "</td>"*!/;
                                                       let price = 0
                                                       const electricObject = document.getElementById("addThing")
                                                       document.getElementById("BidExplanation").style.display = "block"
                                                       document.addEventListener("DOMContentLoaded",()=>
                                                       {
                                                           document.querySelector(".ant-btn").nextElementSibling.innerText = "extract as table"
                                                       });

                                                       if (labeledData.boxes != null) {

                                                           electricObject.style.display = "block"

                                                           // reports.forEach(report => (
                                                           //     w[report.worker_id]=workers.find((worker)=>worker.id === report.worker_id)
                                                           // ))

                                                           for (let i in labeledData.boxes) {
                                                               symbolList[labeledData.boxes[i].annotation].setSymbolNum();
                                                           }
                                                           for (let i in  symbolList) {
                                                               // symbolList[labeledData.boxes[i].annotation].price
                                                               //symbolList[labeledData.boxes[i].annotation].num++
                                                               html += " <tr>     <th scope=\"col\">" +symbolList[i].getName() + "</th>" +
                                                                   "   <td> " + symbolList[i].getPrice() + "</td>"/!*+
                                                                       "   <td> " + "100" + "</td>"+
                                                                       "   <td> " + //symbolList[labeledData.boxes[i].annotation].num++
                                                                        + "</td>"*!/;//symbolList[labeledData.boxes[i].annotation].price
                                                               price += symbolList[i].getPrice()//symbolList[labeledData.boxes[i].annotation].price

                                                           }
                                                           console.log(symbolList)
                                                           // electricObject.appendChild(html) ;
                                                       }
                                                       html += " <tr>     <th scope=\"col\">" + 'סכום' + "</th>" +
                                                           "   <td> " + price + "</td>";
                                                       electricObject.innerHTML = html;*/
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
                               backgroundColor: "#413b1a",
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
    };


    const handleClick = e => {
        e.preventDefault();
        let bid1 = fetchedBids[newMap.id-1]
        console.log("event value", newMap.id)
        console.log("selected Bid", bid1)
        console.log("fetchedBids Bid", fetchedBids)
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
        <body class="container container-fluid p-3 mb-2 bg-secondary text-white " role="alert">
        <h1 class="text-right  text-warning d-flex justify-content-center">מפת הפרויקט</h1>
        <div id="buttonToHide">
            <div className="col-12 col-md-6 " dir="rtl">

                <form onSubmit={e => mapSubmit(e)} className="row " lang="he" dir="rtl">
                    <h4 class={"row text-warning d-flex justify-content-center"}>הוספת מפה</h4>

                    <div className="row  d-flex justify-content-center">
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

            <div className="col-12 col-md-6 d-flex justify-content-center">

                <form className="right-text" dir='rtl' onSubmit={e => handleClick(e)}>
                    <div className='form-group dropdown'>
                        <select
                            className='form-control right-text'
                            placeholder='בחר גרסה'
                            name='id'
                            /*value={newMap.id}*/
                            onChange={e => projectChange(e)}
                            required
                        >
                            <option value="">בחר גרסה</option>
                            {MenuInit()}
                        </select>
                    </div>
                    <button className="addBtn btn btn-dark"
                            id="imgUpload" type="submit">בחירה
                    </button>
                </form>
            </div>
        </div>


        {console.log(imgUploaded)}
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
                    <button><Link to='/TableBid'>עידכון פריטים בטבלה</Link></button>
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
