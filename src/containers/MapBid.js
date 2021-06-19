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
symbolList['שקע כפול רגיל'] = symbolData('שקע כפול רגיל', 2, 0)
symbolList['שקע כח כפול'] = symbolData('שקע כח כפול', 3, 0)
symbolList['שקע כח יחיד'] = symbolData('שקע כח יחיד', 7, 0)
symbolList['שקע יחיד רגיל'] = symbolData('שקע יחיד רגיל', 5, 0)
symbolList['שקע כפול מוגן מים רגיל'] = symbolData('שקע כפול מוגן מים רגיל', 8, 0)
symbolList['שקע יחיד מוגן מים רגיל'] = symbolData('שקע יחיד מוגן מים רגיל', 6, 0)

const MapBid = ({match}) => {

    const [projectId, setProjectId] = useState("")
    const [myBusiness, setMyBusiness] = useState({my_business: null});

    useEffect(() => {
        setMyBusiness({my_business: match.params.my_business})
        setProjectId(match.params.id)
        InitBids().catch(err => {
            console.log("err", err.response)
        });
        buildArr().then(labeledBoxesFetching()).catch(err => {
            console.log("err", err.response)
        });
    }, [])


    const [symbolLabels, setSymbolLabels] = useState([]);
    const [bidsVersions, setBidsVersions] = useState([]);
    const [fetchedBoxes, setFetchedBoxes] = useState([]);
    const [newMap, setNewMap] = useState(null);
    const [imgUploaded, setImgUploaded] = useState(false);
    let fileSelectedHandler = e => {
        setNewMap(e.target.files[0])

    }

    /*  const buildArr= () => {
          var arr=[]
          for(let key in symbolList){
              arr.push(symbolList[key].getName());

          }
          return arr
      }*/
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


    const buildArr = async () => {
        let symbols = await axios.get(
            "http://127.0.0.1:8000/api/symbols/"
        );
        var arr = []
        console.log("symbols:", symbols)


        for (let key in symbols.data) {
            arr.push(symbols.data[key].type);

        }
        console.log("arr:", arr)
        /* var arr=[]
         for(let key in symbolList){
             arr.push(symbolList[key].getName());

         }*/
        setSymbolLabels(arr);
    }
    const InitBids = async () => {
        let bids = await axios.get(
            "http://127.0.0.1:8000/api/bids/"
        );
        var arr = []
        console.log("symbols:", bids)


        for (let key in bids.data) {
            arr.push(bids.data[key].photo);

        }
        console.log("arr:", arr)
        /* var arr=[]
         for(let key in symbolList){
             arr.push(symbolList[key].getName());

         }*/
        setBidsVersions(arr);
    }

    const labeledBoxesFetching = async () => {

        const response = await fetch(
            "http://127.0.0.1:8000/api/labels/"
        );

        const fetchedData = await response.json();
        console.log("fetchedData:", fetchedData)
        /*        for (var i in fetchedData) {

                    console.log(i)


                }*/
        setFetchedBoxes(fetchedData)
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
                                   formData.append("type", symbolList[[labeledData.boxes[i].annotation]].getName())
                                   formData.append("price", symbolList[[labeledData.boxes[i].annotation]].getPrice())
                                   formData.append("count", symbolList[[labeledData.boxes[i].annotation]].getSymbolNum())
                                   formData.append("total_item_price", symbolList[[labeledData.boxes[i].annotation]].getPrice() * symbolList[[labeledData.boxes[i].annotation]].getSymbolNum())
                                   formData.append("my_business", 1)
                                   formData.append("bid_id", 2)

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

                               // window.location.href = "/TableBid";
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

// Original design here: https://github.com/siriwatknp/mui-treasury/issues/777

    const DownloadMenu = () => {

        const [anchorEl, setAnchorEl] = React.useState(null);

        const downloadMenuClasses = useDownloadMenuStyles();

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <Button
                    className={downloadMenuClasses.button + " addBtn btn btn-dark"}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    {/*
                    <GetAppRoundedIcon className={downloadMenuClasses.downloadIcon}/>
*/}
                    <h3 className={" text-warning"}>בחירת מפה ישנה</h3>
                    <ExpandMoreIcon className={anchorEl ? downloadMenuClasses.upIcon : downloadMenuClasses.downIcon}/>
                </Button>
                <Menu
                    id="simple-menu"
                    classes={{paper: downloadMenuClasses.paper}}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                    }}
                    keepMounted
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >

                        <MenuItem onClick={handleClose}>PDF File</MenuItem>
                        <MenuItem onClick={handleClose}>CSV File</MenuItem>
                        <MenuItem onClick={handleClose}>XLS File</MenuItem>
                </Menu>
            </div>
        );
    };


    return (
        <html>
        <head>
            <meta charset="utf-8">
            </meta>
        </head>
        <body class="container container-fluid p-3 mb-2 bg-secondary text-white " role="alert">
        <h1 class="text-right  text-warning">מפת הפרויקט</h1>
        <form onSubmit={e => mapSubmit(e)} id="buttonToHide" className="row " lang="he" dir="rtl">
            <div className="col-12 col-md-3" dir="rtl">
                <h3 class={" text-warning"}>הוספת מפה:</h3>
            </div>
            <div className="col-12 col-md-3">
                <input className="form-group"
                       type='file'
                       name='photo'
                    onChange={e => fileSelectedHandler(e)}></input>
            </div>
            <div className="col-12 col-md-2">
                <button className="addBtn btn btn-dark"
                        id="imgUpload" type="submit" /*onClick={buildArr().then(labeledBoxesFetching())}*/>הוספה
                </button>
            </div>
            <div className="col-12 col-md-4">
                {DownloadMenu()}
            </div>
        </form>


        {console.log(imgUploaded)}
        {imgUploaded && uploadAnnotation()}

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
