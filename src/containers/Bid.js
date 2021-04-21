import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Annotator} from "image-labeler-react";
import {Link} from 'react-router';


const Bid = () => {
    const [newMap, setNewMap] = useState("");

    /*        const mapSubmit = e => {
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
    /*

    function symbolData(symbolName,price,symbolNum){
            let symbol={};

            symbol.setName=function (name) {
                symbolName=name;}

            symbol.setPrice=function (Num) {
                price=Num;}

            symbol.getName=function () {
                return symbolName;}

            symbol.setSymbolNum=function (Num) {
                symbolNum=Num;}

            symbol.getSymbolNum=function () {
                return symbolNum;}

            symbol.getPrice=function () {
                return price;}

            return symbol;
        }

        //build object
        let symbolList={symbolID:symbolData()};
        symbolList['שקע כפול רגיל']=symbolData('שקע כפול רגיל',2,0)
        symbolList['שקע כח כפול']=symbolData('שקע כח כפול',2,0)
        symbolList['שקע כח יחיד' ]=symbolData('שקע כח יחיד',2,0)
        symbolList['שקע יחיד רגיל']=symbolData('שקע יחיד רגיל',2,0)
        symbolList['שקע כפול מוגן מים רגיל']=symbolData('שקע כפול מוגן מים רגיל',2,0)
        symbolList['שקע יחיד מוגן מים רגיל']=symbolData('שקע יחיד מוגן מים רגיל',2,0)

    */


    return (
        <html lang="HE" dir="rtl">
        <head>
            <meta charset="utf-8"
                  name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            </meta>
            <link rel='stylesheet' href='https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css'>
                <link rel='stylesheet' href='https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css'>
                    <link rel="stylesheet" href="src/TextStyle.css">

        </head>
        <body lang="he" dir="rtl">
        <div dir="rtl" className=" container-fluid " lang="he" style={{justifyContent: 'right'}}>
            <div className=" alert alert-primary " role="alert">
                <h1 >הצעת מחיר</h1>
                <div class="row " lang="he" dir="rtl">
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
            <div className="App">
                <Annotator
                    height={700}
                    width={1000}
                    imageUrl={"https://i.pinimg.com/originals/a6/49/96/a649969f30f6bba48af384878bcc57c2.jpg"}
                    asyncUpload={async (labeledData) => {
                        let html = " <tr>     <th scope=\"col\">" + 'סוג' + "</th>" +
                            "   <td> " + "מחיר ליח'" + "</td>" /*+
                                "   <td> " + "כמות" + "</td>" +
                                "   <td> " + "מחיר כללי" + "</td>"*/;
                        let price = 0
                        const electricObject = document.getElementById("addThing")
                        document.getElementById("BidExplanation").style.display = "block"

                        if (labeledData.boxes != null) {

                            electricObject.style.display = "block"

                            // reports.forEach(report => (
                            //     w[report.worker_id]=workers.find((worker)=>worker.id === report.worker_id)
                            // ))

                            for (let i in labeledData.boxes) {

                                console.log("box annotation", i)
                                // symbolList[labeledData.boxes[i].annotation].price
                                //symbolList[labeledData.boxes[i].annotation].num++
                                html += " <tr>     <th scope=\"col\">" + labeledData.boxes[i].annotation + "</th>" +
                                    "   <td> " + "100" + "</td>"/*+
                                        "   <td> " + "100" + "</td>"+
                                        "   <td> " + //symbolList[labeledData.boxes[i].annotation].num++
                                         + "</td>"*/;//symbolList[labeledData.boxes[i].annotation].price
                                price += 100//symbolList[labeledData.boxes[i].annotation].price

                            }
                            // electricObject.appendChild(html) ;
                        }
                        html += " <tr>     <th scope=\"col\">" + 'סכום' + "</th>" +
                            "   <td> " + price + "</td>";
                        electricObject.innerHTML = html;
                    }}
                    //disableAnnotation={true}
                    types={[
                        'שקע יחיד רגיל', 'שקע כפול רגיל',
                        'שקע יחיד מוגן מים רגיל', 'שקע כפול מוגן מים רגיל'
                        , 'שקע כח יחיד', 'שקע כח כפול'
                    ]}
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

            <div className="row" >
                <div className="col-12 col-md-4">
                    <h3></h3>
                </div>
                <div className="col-12 col-md-4">
                    <div id="BidExplanation" className="row" dir="rtl" style={{display: "none"}}>
                        <table className="table table-striped">
                            <tbody id="addThing" style={{display: "none"}}>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <h3></h3>
                </div>
            </div>



        </div>

        <div className="container">
            <h1>HTML5 Editable Table</h1>
            <p>Through the powers of <strong>contenteditable</strong> and some simple jQuery you can easily create a
                custom editable table. No need for a robust JavaScript library anymore these days.</p>

            <ul>
                <li>An editable table that exports a hash array. Dynamically compiles rows from headers</li>
                <li>Simple / powerful features such as add row, remove row, move row up/down.</li>
            </ul>

            <div id="table" className="table-editable">
                <span className="table-add glyphicon glyphicon-plus"></span>
                <table className="table">
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td contentEditable="true">Stir Fry</td>
                        <td contentEditable="true">stir-fry</td>
                        <td>
                            <span className="table-remove glyphicon glyphicon-remove"></span>
                        </td>
                        <td>
                            <span className="table-up glyphicon glyphicon-arrow-up"></span>
                            <span className="table-down glyphicon glyphicon-arrow-down"></span>
                        </td>
                    </tr>
                    <tr className="hide">
                        <td contentEditable="true">Untitled</td>
                        <td contentEditable="true">undefined</td>
                        <td>
                            <span className="table-remove glyphicon glyphicon-remove"></span>
                        </td>
                        <td>
                            <span className="table-up glyphicon glyphicon-arrow-up"></span>
                            <span className="table-down glyphicon glyphicon-arrow-down"></span>
                        </td>
                    </tr>
                </table>
            </div>

            <button id="export-btn" className="btn btn-primary">Export Data</button>
            <p id="export"></p>
        </div>

        <script  src="./script.js"></script>

        </body>
        </html>
);
};

export default Bid;
