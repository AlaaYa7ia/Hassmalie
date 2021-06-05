import React, {useEffect,useState} from 'react';
import "ka-table/style.css";
import {Annotator} from "image-labeler-react";
import 'jspdf-autotable';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";




const dataArray = Array()

function symbolData(symbolName,price,symbolNum){
    let symbol={};
    symbolNum=0
    symbol.setName=function (name) {
        symbolName=name;}

    symbol.setPrice=function (Num) {
        price=Num;}

    symbol.getName=function () {
        return symbolName;}

    symbol.setSymbolNum=function () {
        symbolNum++;}

    symbol.getSymbolNum=function () {
        return symbolNum;}

    symbol.getPrice=function () {
        return price;}

    return symbol;
}

//build object
let symbolList={};
symbolList['שקע כפול רגיל']=symbolData('שקע כפול רגיל',2,0)
symbolList['שקע כח כפול']=symbolData('שקע כח כפול',3,0)
symbolList['שקע כח יחיד' ]=symbolData('שקע כח יחיד',7,0)
symbolList['שקע יחיד רגיל']=symbolData('שקע יחיד רגיל',5,0)
symbolList['שקע כפול מוגן מים רגיל']=symbolData('שקע כפול מוגן מים רגיל',8,0)
symbolList['שקע יחיד מוגן מים רגיל']=symbolData('שקע יחיד מוגן מים רגיל',6,0)

const MapBid = () => {


    const [newMap, setNewMap] = useState(null);
    const [imgUploaded,setImgUploaded] = useState(false);
    let fileSelectedHandler  = e =>{
        setNewMap(e.target.files[0])

    }
    const mapSubmit = e => {
        e.preventDefault();
        //console.log("bus befir submit: ",map)
        // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.xsrfCookieName = "csrftoken";
        // axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{formData.append("photo", newMap,newMap.name);
        } catch(err){console.log("didn't change photo.")}
        console.log(formData.toString());
        formData.append("my_business",1);
        formData.append("project_id",1);

        console.log(formData);
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL+'/api/bids/',
            data: formData,
        })
            .then((dataRes) => {
                console.log("bid data", dataRes.data)
                setNewMap(dataRes.data.photo)
                demo().then(() => setImgUploaded(true));
                document.getElementById("buttonToHide").style.display="none"
            }).catch(err=>{ console.log("err", err.response)})


    };
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function demo() {
        await sleep(2000);
        console.log(process.env.REACT_APP_API_URL+'/media/projects/projectsfiles/'+newMap.name)
    }


    const buildArr= () => {
        var arr=[]
        for(let key in symbolList){
            arr.push(symbolList[key].getName());

        }
        return arr
    }


    const labeledBoxesFetching=async action => {

        const response = await fetch(
            "http://127.0.0.1:8000/api/labels/"
        );

        const fetchedData = await response.json();
        console.log(fetchedData)
        for(var i in fetchedData) {

            console.log(i)
            delete fetchedData[i]["id"];
            delete fetchedData[i]["bid_id"];

        }
        return fetchedData
    }

    function uploadAnnotation() {
        // setImgUploaded(false)
        return (
        <div className="App "   id="addThing" >
            <Annotator id="annotationField"
                       height={700}
                       width={1000}
                       imageUrl={process.env.REACT_APP_API_URL+'/media/projects/projectsfiles/'+newMap.name
                      /*"http://127.0.0.1:8000/media/projects/projectsfiles/electrical-wiring-example_QzGkf0q.jpg"*/}
                       asyncUpload={async (labeledData) => {

                           for (var i in labeledData.boxes)
                               dataArray.push({
                                   column1: symbolList[[labeledData.boxes[i].annotation]].getName(),
                                   column2: symbolList[[labeledData.boxes[i].annotation]].getPrice(),
                                   column3: symbolList[[labeledData.boxes[i].annotation]].getSymbolNum(),
                                   column4: symbolList[[labeledData.boxes[i].annotation]].getPrice()* symbolList[[labeledData.boxes[i].annotation]].getSymbolNum(),
                                   id: i,
                               })

                           console.log(dataArray)
                           window.location.href = "/TableBid";
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
                       types={buildArr()}


                //array.push to save data

                       showButton={true}
                /*defaultBoxes={labeledBoxesFetching()}*/

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

    return (
        <html >
        <head>
            <meta charset="utf-8">
            </meta>
        </head>
        <body class="container container-fluid p-3 mb-2 bg-secondary text-white " role="alert">
        <div>
            <div>
                <h1 class="text-right  text-warning">מפת הפרויקט</h1>
                <div className="row " lang="he" dir="rtl">
                    <form dir="rtl" onSubmit={e => mapSubmit(e)}>
                        <div className="row" id="buttonToHide">
                            <div className="col-12 col-md-4">
                                <h3 class={" text-warning"}>הוספת מפה:</h3>
                            </div>
                            <div className="col-12 col-md-4">
                                <input className="form-group"
                                       type = 'file'
                                       name='photo'
                                       onChange={e => fileSelectedHandler(e)}></input>
                            </div>
                            <div className="col-12 col-md-4" >
                                <button className="addBtn btn btn-dark"
                                        id="imgUpload" type="submit">הוספה</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {console.log(imgUploaded)}
            {imgUploaded && uploadAnnotation()}

            <div className="row" id="BidExplanation" style={{display: "none"}}>

                <div className="col-12 col-md-4">
                    <div className="row" dir="rtl" >

                        <table className="table table-striped">
                            <tbody id="addThing" style={{display: "none"}}>
                            </tbody>
                        </table>


                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <h3><button ><Link to='/TableBid'>עידכון פריטים בטבלה</Link></button></h3>
                </div>
                <div className="col-12 col-md-4">
                    <h3></h3>
                </div>
            </div>
        </div>


        </body>
        </html>
    );
};

export default MapBid;
