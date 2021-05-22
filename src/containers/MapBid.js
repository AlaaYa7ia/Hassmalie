import React, {useState} from 'react';
import "ka-table/style.css";
import {Annotator} from "image-labeler-react";
import 'jspdf-autotable';
import {Link} from "react-router-dom";




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


    /*    const [newMap, setNewMap] = useState("");

                const mapSubmit = e => {
                e.preventDefault();
                //console.log("bus befir submit: ",map)

                const formData = new FormData();
                try{
                formData.append(
                "pic",
               map.pic,
                );
                } catch(err){
                    console.log("didn't change image.")
                }
                formData.append('name',map.name);


                axios({
                    method: 'put',
                    url: "/api/my-business/"+business.manager+"/",
                    data: formData,
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((dataRes) => {
                    setMap(dataRes.data)
                    console.log(dataRes.data)
                }).catch(err=>{ console.log("err", err.response)})
             };*/


    const buildArr= () => {
        var arr=[]
        for(let key in symbolList){
            arr.push(symbolList[key].getName());

        }
        return arr
    }


    return (
        <html >
        <head>
            <meta charset="utf-8">
            </meta>
        </head>
        <body class="container container-fluid alert alert-primary " role="alert">
        <div>
            <div>
                <h1>הצעת מחיר</h1>
                <div className="row " lang="he" dir="rtl">
                    <form dir="rtl">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <h3>הוספת מפה:</h3>
                            </div>
                            <div className="col-12 col-md-4">
                                <input className="form-group" type="file"></input>
                            </div>
                            <div className="col-12 col-md-4">
                                <button className="btn btn-primary" type="submit">הוספה</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="App ">
                <Annotator
                    height={700}
                    width={1000}
                    imageUrl={"https://i.pinimg.com/originals/a6/49/96/a649969f30f6bba48af384878bcc57c2.jpg"}
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
                    /*defaultBoxes={[{
                        x: 316,
                        y: 305,
                        w: 65,
                        h: 61,
                        annotation: ''
                    }]}*/

                    style={{
                        width: 1100,
                        height: 800,
                        margin: "20px auto",
                        position: "relative",
                        backgroundColor: "#368",
                        borderRadius: 8,
                        padding: 10
                    }}
                    // sceneTypes={['1', '2', '3']}
                />
            </div>

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
