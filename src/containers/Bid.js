
// import "react-list-editable/lib/react-list-editable.css";
import {Link} from "react-router-dom";
import axios from "axios";
import React, {useCallback, useEffect, useState} from 'react';
/*import ChatWidget from "react-styled-chat-widget";
import {Message, MessageSendHandler, SendClickHandler} from "react-styled-chat-widget";
import Spinner from 'react-bootstrap/Spinner'*/


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
/*    const [messages, setMessages] = useState<Message>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // load some messages from history here using setMessages
        setLoading(false);
    }, []);


    // used to switch message delivery indicator
    const onMessageSend = useCallback<MessageSendHandler>((currentID, setDeliveryStatus) => {
        setDeliveryStatus();
    }, []);

    // called when user presses the send button
    const onSendClick = useCallback<SendClickHandler>((message: string) => {
        setMessages((messages) => {
            return [
                ...messages,
                {id: Math.floor(Math.random() * 10000), isPrimary: true, date: new Date(), sent: true, message, author: 'You'},
            ]
        })
    }, []);*/


    useEffect(()=>{
        setMyBusiness({my_business: match.params.id})
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


// Create a new list item when clicking on the "Add" button
    function showList() {
        try {
            return (
                symbols.map(sympol => (
                        <div>
                            <li className='row list-group-item'>
                                <span className="close">×</span>
                                <p>{sympol.type} [₪ {sympol.price}] </p>
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
                    <div id="addThing">
                        <ul id="myUL" dir="rtl">
                            {showList()}
                        </ul>
                        <form dir="rtl" onSubmit={e => mapSubmit(e)}>
                            <div id="myDIV">
                                <div className="row">
                                    <button className="addBtn btn btn-dark"//onClick={newElement}
                                            id="imgUpload" type="submit">הוסף
                                    </button>
                                </div>

                                <div className="row ">
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
                                           type='file'
                                           name='photo'
                                           onChange={e => fileSelectedHandler(e)}/>
                                </div>

                            </div>
                        </form>
                    </div>}
                </div>

                <div className='col-12 col-md-4 d-flex justify-content-around'>

                        <Link to={"/MapBid/" + projectId + "/" + myBusiness.my_business}>
                            <img src="https://static.thenounproject.com/png/3107437-200.png"  title="מפת הפרויקט"></img>
                        </Link>

                </div>
                <div className=' col-12 col-md-4 d-flex justify-content-around'>
                        <Link to={'/TableBid/' + projectId + "/" + myBusiness.my_business}>
                            <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/database-table-781612.png"
                                 title="טבלת פירוט מחיר"></img>
                        </Link>
                </div>
            </div>
            <br></br>
            <br></br>


        </div>
        {/*<ChatWidget
            defaultPosition={'bottomRight'}
            messages={messages} // required
            loading={loading} // required
            onMessageSend={onMessageSend} // required
            onSendClick={onSendClick} // required
            spinner={<Spinner/>} // required
        >
            // Header of the widget should be here :)
            <div>
                <p>Welcome to support window!</p>
                <hr/>
                <p>Here you can chat directly with moderators. They usually answer in a few hours.</p>
            </div>
        </ChatWidget>*/}


        </body>
        </html>
    );
};

export default Bid;

