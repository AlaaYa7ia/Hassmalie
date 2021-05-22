import React, { Component } from "react";

import EditableList from "react-list-editable";
import "react-list-editable/lib/react-list-editable.css";
import {Link} from "react-router-dom";

const buildArr= () => {
    var arr=[]
    for(let key in symbolList){
        arr.push(symbolList[key].getName());

    }
    return arr
}

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


const Bid = () => {


/*    // Create a "close" button and append it to each list item
    var myNodelist = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }*/

// Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
    let fetchedData=false

// Create a new list item when clicking on the "Add" button
    function addElement(inputValue) {
        var li = document.createElement("li");
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            document.getElementById("myUL").appendChild(li);
        }
        document.getElementById("myInput").value = "";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
    }
    function newElement() {


        if (!fetchedData) {
            var inputValue = document.getElementById("myInput").value;

            addElement(inputValue);
        }
        else{
            for (var i in symbolList){
                addElement(symbolList[i].getName())
            }
            fetchedData=false

        }

    }
    const showList = () => {

        fetchedData=true

        newElement()

        const electricObject = document.getElementById("addThing")
        electricObject.style.display = "block"

    }
    document.addEventListener("DOMContentLoaded",()=>
    {
       document.getElementById("addbtnthng").addEventListener("click", showList);

    });


    return (
        <html>
        <head>
            <meta charSet="utf-8">
            </meta>
        </head>

        <body class="container container-fluid alert alert-primary " role="alert" dir="rtl">
        <div>
            <div className="row">
                <div className=" col-12 col-md-4">
                    <button onClick={showList} id="addThing-btn">עדכן רשימת פריטים</button>
                    <div  id="addThing"  class="jumbotron mt-5 "  style={{display: "none"}}>

                        <ul id="myUL">
                        </ul>
                        <div id="myDIV" >
                            <input type="text" id="myInput" ></input>
                            <button onClick={newElement}className="addBtn">Add</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4"></div>
                <div className="col-12 col-md-4"></div>
            </div>

        </div>
        <div  class="jumbotron mt-5  row">
            <div className='col-12 col-md-4'>
                <h1 className='lead'>
                    <li><Link to='/MapBid.js'>עידכון פריטים בהמפה</Link></li>
                </h1>
                <h1 className='lead'>
                    <li><Link to='/TableBid.js'>עידכון פריטים בטבלה</Link></li>
                </h1>

            </div>
            <div className=' col-12 col-md-4'></div>
            <div className=' col-12 col-md-4'></div>
        </div>
        </body>
        </html>
    );
};

export default Bid;

