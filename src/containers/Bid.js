
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
                            <li className='row list-group-item  d-flex justify-content-center shadow-lg p-3 bg-body rounded' style={{ backgroundColor: 'rgba(229, 225, 225)'}}>
                                <span className="close" >×</span>
                                <img className='col-3' src={sympol.photo} />
                                <p>{sympol.type} [₪ {sympol.price}] </p>
                                </li>


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
        <body className="counter container-fluid center2 text-black-70" dir="rtl" role="alert" style={{ backgroundColor: 'rgba(60, 60, 60, 0.2)'}}>
        <div className="p-3 mb-2 text-dark">
            <h1 className="text-right">הצעת מחיר </h1>
            <p className="text-right">כאן איפשר לעבור להפקת הצעת מחיר, לעבור לפירוט תשלומים לפי ההצעה האחרונה, או לעדכן את רישימת החפצים (שקעים וכדומה).</p>
            <hr/>
            <br/>
            <br/>

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
                        <img src="https://cdn4.iconfinder.com/data/icons/architecture-20/64/Map-house-home-blueprint-plan-512.png"
                             title="מפת הפרויקט" width={"100%"}  class="shadow-lg p-3 mb-5 bg-body rounded border border-dark" style={{ backgroundColor: 'rgba(229, 225, 225)'}}></img>
                    </Link>
                </div>
                <div className=' col-12 col-md-4 d-flex justify-content-around'>
                    <Link to={'/TableBid/' + projectId + "/" + myBusiness.my_business}>
                        <img src="https://www.pnglib.com/wp-content/uploads/2020/01/bill_5e18e97fa6b7f.png"
                             title="טבלת פירוט מחיר" width={"100%"}  class="shadow-lg p-3 mb-5 bg-body rounded border border-dark" style={{ backgroundColor: 'rgba(229, 225, 225)'}}></img>
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

