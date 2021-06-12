import React, {useEffect,useState} from 'react';

import "react-list-editable/lib/react-list-editable.css";
import {Link} from "react-router-dom";
import axios from "axios";

let symbolData;

/*
function symbolData(symbolName,price,symbolPic){
    let symbol={};
    symbol.setName=function (name) {
        symbolName=name;}

    symbol.setPrice=function (Num) {
        price=Num;}

    symbol.getName=function () {
        return symbolName;}

    symbol.setSymbolNum=function (pic) {
        symbolPic=pic;}

    symbol.getSymbolNum=function () {
        return symbolPic;}

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
*/


const Bid = ({match})  => {

    const [projectId, setProjectId] = useState("")
    const [myBusiness, setMyBusiness] = useState({my_business: null});
//   const [imgUploaded,setImgUploaded] = useState(false);
    const [newMap, setNewMap] = useState(null);
    let fileSelectedHandler  = e =>{
        setNewMap(e.target.files[0])

    }


    const mapSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        try{formData.append("photo", newMap,newMap.name);
        } catch(err){console.log("didn't change photo.")}
        console.log(formData.toString());
/*
        formData.append("id",projectId);
*/
        formData.append("my_business",1/*myBusiness.my_business*/);
        formData.append("type",document.getElementById("myInput").value);
        formData.append("price",2/*document.getElementById("priceInput").value*/);

        console.log(formData);

        console.log(newMap)
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL+'/api/symbols/',
            data: formData,
        })
            .then((dataRes) => {
                console.log("symbol data", dataRes.data)
                setNewMap(dataRes.data)
               // .then(() => setImgUploaded(true));
              //  document.getElementById("buttonToHide").style.display="none"
            }).catch(err=>{ console.log("err", err.response)})


    };

    useEffect(()=>{
        setMyBusiness({my_business: match.params.my_business})
        setProjectId(match.params.id)
    },[])
// Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.remove();
            console.log(div.innerText)
         //   const res = await axios.delete('/api/symbols/', { data: { type: div } });
        }
    }
    let fetchedData=false

// Create a new list item when clicking on the "Add" button
    function addElement(inputValue) {
        var li = document.createElement("li");
        li.setAttribute("class","row list-group-item")
        var t = document.createElement("p");
        t.appendChild( document.createTextNode(inputValue));
/*
        t.setAttribute("class","col-7")
*/
        var img= document.createElement("img")
        img.src="https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-img-file-document-icon-png-image_897560.jpg"
        img.setAttribute("class","col-3")
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        li.appendChild(span);
        span.appendChild(txt);
        li.appendChild(t);
        li.appendChild(img);


        document.getElementById("myUL").appendChild(li);

        document.getElementById("myInput").value = "";



        for (i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
    }
    function newElement() {


        if (!fetchedData) {
            if ( document.getElementById("myInput").value === ''|| document.getElementById("priceInput").value==='')
                alert("You must write something!");
            else {
                var inputValue =document.getElementById("myInput").value + "    [₪ " + document.getElementById("priceInput").value + "]    "

                addElement(inputValue);
            }
        }
        else{
            for (var i in symbolData.data){
                addElement(symbolData.data[i].type+"    [₪ "+(symbolData.data[i].price)+"]    ")
            }
            fetchedData=false

        }

    }
    const showList = async () => {
        symbolData = await axios.get('/api/symbols/');
        console.log(symbolData);
        fetchedData = true

        newElement()

        const electricObject = document.getElementById("addThing")
        electricObject.style.display = "block"

    }



    return (
        <html>
        <head>
            <meta charSet="utf-8">
            </meta>
        </head>

        <body class="container container-fluid " role="alert" dir="rtl">

        <h1 class="text-center p-3 mb-2 bg-warning text-dark">הצעת מחיר</h1>
        <div className="jumbotron mt-5 ">

            <div className="row" >
                <div className="col-12 col-md-4" >
                    <button onClick={showList} id="addThing-btn"
                            className="btn btn-dark d-flex justify-content-center">עדכן רשימת פריטים
                    </button>
                    <div id="addThing" style={{display: "none"}}>
                        <ul id="myUL" dir="rtl" >
                        </ul>
                        <form dir="rtl" onSubmit={e => mapSubmit(e)}>
                        <div id="myDIV">
                            <div className="row">
                                <button onClick={newElement} className="addBtn btn btn-dark"
                                        id="imgUpload" type="submit">הוסף</button>
                            </div>

                            <div className="row">
                                <input type="text" id="myInput" placeholder="שם פריט" className="col-5"></input>
                                <input type="number" id="priceInput" placeholder="מחיר הפריט"
                                       className="col-3"></input>
                                <input className="col-4 form-group"
                                       type = 'file'
                                       name='photo'
                                       onChange={e => fileSelectedHandler(e)}></input>
                            </div>

                        </div>
                        </form>
                    </div>
                </div>
                <div className='col-12 col-md-4'>
                    <button className='lead'>
                        <Link to={"/MapBid/"+projectId+"/"+myBusiness.my_business} >
                            עידכון פריטים בהמפה</Link>
                    </button>
                </div>
                <div className=' col-12 col-md-4'>
                    <button className='lead'>
                        <Link to={'/TableBid/'+projectId+"/"+myBusiness.my_business}>עידכון פריטים בטבלה</Link>
                    </button>

                </div>
            </div>

        </div>

        </body>
        </html>
    );
};

export default Bid;

