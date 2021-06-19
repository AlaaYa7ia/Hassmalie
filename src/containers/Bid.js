import React, {useEffect,useState} from 'react';

// import "react-list-editable/lib/react-list-editable.css";
import {Link} from "react-router-dom";
import axios from "axios";

//let symbolData;

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

    const [symbols, setSymbols] = useState([])
    const [projectId, setProjectId] = useState("")
    const [newSymbol, setNewSymbol] = useState("")
    const [myBusiness, setMyBusiness] = useState({my_business: null});
//   const [imgUploaded,setImgUploaded] = useState(false);
    const [newMap, setNewMap] = useState(null);
    const [show,setShow] = useState(false);

    let fileSelectedHandler = e => {
        setNewSymbol({...newSymbol, [e.target.name]: e.target.files[0] })

    }
    let newSymbolHandler  = e =>{
        setNewSymbol({...newSymbol, [e.target.name]: e.target.value })
    }

    const get_sympols = async () =>{
        const files_Res = await axios.get(process.env.REACT_APP_API_URL+'/api/symbols/?project_id='+projectId+
            '&my_business='+myBusiness.my_business);
        setSymbols(files_Res.data);
    }


    const mapSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        try{formData.append("photo", newSymbol.photo,newSymbol.photo.name);
        } catch(err){console.log("didn't change photo.")}
/*
        formData.append("id",projectId);
*/
        formData.append("my_business",myBusiness.my_business);
        formData.append("type",newSymbol.type);
        formData.append("price",newSymbol.price);

        setNewSymbol("");
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL+'/api/symbols/',
            data: formData,
        })
            .then((dataRes) => {
                get_sympols().then(setShow(true))
              //  document.getElementById("buttonToHide").style.display="none"
            }).catch(err=>{ console.log("err", err.response)})


    };

    useEffect(()=>{
        setMyBusiness({my_business: match.params.my_business})
        setProjectId(match.params.id)
    },[])

    useEffect(()=>{
        get_sympols()
    },[myBusiness, projectId])

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
    //let fetchedData=false

    // function newElement() {
    //
    //
    //     if (!fetchedData) {
    //         if ( document.getElementById("myInput").value === ''|| document.getElementById("priceInput").value==='')
    //             alert("You must write something!");
    //         else {
    //             var inputValue =document.getElementById("myInput").value + "    [₪ " + document.getElementById("priceInput").value + "]    "
    //             console.log(">>>>>>>>>>>>>>>>>>")
    //             console.log(newSymbol.photo)
    //             console.log(symbolData.data)
    //             addElement(inputValue,newSymbol.photo);
    //         }
    //     }
    //     else{
    //         console.log(symbolData.data)
    //         for (var i in symbolData.data){
    //             addElement(symbolData.data[i].type+"    [₪ "+(symbolData.data[i].price)+"]    ",symbolData.data[i].photo/*"https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-img-file-document-icon-png-image_897560.jpg"*/)
    //         }
    //         fetchedData=false
    //
    //     }
    //
    // }
    // const showList = async () => {
    //     symbolData = await axios.get('/api/symbols/');
    //     console.log(symbolData);
    //     fetchedData = true
    //
    //     newElement()
    //
    //     const electricObject = document.getElementById("addThing")
    //     electricObject.style.display = "block"
    //
    // }


// Create a new list item when clicking on the "Add" button
    function addElement(inputValue,imgSRC) {
        var li = document.createElement("li");
        li.setAttribute("class","row list-group-item")
        var t = document.createElement("p");
        t.appendChild( document.createTextNode(inputValue));
        /*
                t.setAttribute("class","col-7")
        */
        var img= document.createElement("img")
        img.src=imgSRC
        console.log(newSymbol.photo)
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

    function showList(){
        try {
        return(
            symbols.map(sympol => (
            <div>
                <li className='row list-group-item'> <p>{sympol.type}    [₪ {sympol.price}] </p>
                <img className='col-3' src={sympol.photo}/></li>


            </div>
            )
        ))}
        catch (e){}
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
                    <button onClick={event => setShow(!show)} id="addThing-btn"
                            className="btn btn-dark d-flex justify-content-center">עדכן רשימת פריטים
                    </button>
                    {show &&
                    <div id="addThing" >
                        <ul id="myUL" dir="rtl" >
                            { showList()}
                        </ul>
                        <form dir="rtl" onSubmit={e => mapSubmit(e)}>
                        <div id="myDIV">
                            <div className="row">
                                <button className="addBtn btn btn-dark"//onClick={newElement}
                                        id="imgUpload" type="submit">הוסף</button>
                            </div>

                            <div className="row">
                                <input type="text" id="myInput" placeholder="שם פריט" className="col-5"
                                        name="type"
                                        value={newSymbol.type}
                                        onChange={e => newSymbolHandler(e)}/>
                                <input type="number" id="priceInput" placeholder="מחיר הפריט"
                                        className="col-3"
                                        name="price"
                                       value={newSymbol.price}
                                        onChange={e => newSymbolHandler(e)}/>
                                <input className="col-4 form-group"
                                        type = 'file'
                                        name='photo'
                                        onChange={e => fileSelectedHandler(e)}/>
                            </div>

                        </div>
                        </form>
                    </div>}
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

