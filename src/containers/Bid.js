import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Annotator} from "image-labeler-react";
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

    return (
        <html lang="HE" dir="rtl">
        <head>
            <meta charset="utf-8"
                  name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            </meta>
        </head>
        <body lang="he" dir="rtl">
        <div dir="rtl" className=" container-fluid jumbotron mt-5" lang="he" style={{  justifyContent:'right'}}>
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
            <div className="App">
                <Annotator
                    height={400}
                    width={600}
                    imageUrl={"https://i.pinimg.com/originals/a6/49/96/a649969f30f6bba48af384878bcc57c2.jpg"}
                    asyncUpload={async (labeledData)=>{
                        // upload labeled data
                    }}
                    types={['A', 'B', 'Cylinder']}
                    defaultBoxes={["a","b"]}
                     />
            </div>
        </div>
        </body>
        </html>
    );
};

export default Bid;
