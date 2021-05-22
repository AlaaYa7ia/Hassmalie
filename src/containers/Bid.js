import React, {useState} from 'react';
import "ka-table/style.css";
import {Annotator} from "image-labeler-react";
import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import 'jspdf-autotable';
import { getValueByColumn } from 'ka-table/Utils/DataUtils';

import jsPDF from "jspdf";
import {
    closeRowEditors,
    hideNewRow,
    openRowEditors,
    saveNewRow,
    saveRowEditors,
    showNewRow
} from 'ka-table/actionCreators';

import { ICellEditorProps, ICellTextProps } from 'ka-table/props';
import { deleteRow } from 'ka-table/actionCreators';

//


const dataArray = Array(4).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);

var addCol = false;

let maxValue = Math.max(...dataArray.map(i => i.id));
const generateNewId = () => {
    maxValue++;
    return maxValue;
};

const AddButton = ({
                       dispatch,
                   }) => {
    return (
        <div className='plus-cell-button'>
            <img
                src='https://komarovalexander.github.io/ka-table/static/icons/plus.svg'
                alt='Add New Row'
                title='Add New Row'
                onClick={() => {
                    dispatch(showNewRow())
                    addCol=true
                }}
            />
        </div>
    );
};

const DeleteRow: React.FC<ICellTextProps> = ({
                                                 dispatch, rowKeyValue,
                                             }) => {
    return (
        <img
            src='https://komarovalexander.github.io/ka-table/static/icons/delete.svg'
            className='delete-row-column-button'
            onClick={() => dispatch(deleteRow(rowKeyValue))}
            alt=''
        />
    );
};

const EditButton = ({
                        dispatch, rowKeyValue
                    }) => {
    return (
        <div className='edit-cell-button'>
            <img
                src='https://komarovalexander.github.io/ka-table/static/icons/edit.svg'
                alt='Edit Row'
                title='Edit Row'
                onClick={() => dispatch(openRowEditors(rowKeyValue))}
            />
        </div>
    );
};




const SaveButton = ({dispatch, rowKeyValue}) => {
    const saveNewData = () => {
        const rowKeyValue = generateNewId();
        dispatch(saveNewRow(rowKeyValue, {
            validate: true
        }));
    };
    return (
        <div className='buttons'
             style={{display: 'flex', justifyContent: 'space-between'}} >
            <img
                src='https://komarovalexander.github.io/ka-table/static/icons/save.svg'
                className='save-cell-button'
                alt='Save'
                title='Save'
                onClick={() => {
                    if(addCol) {
                        saveNewData();
                        addCol=false;
                    }
                    else {
                        dispatch(saveRowEditors(rowKeyValue, {
                                validate: true,
                            })
                        );
                    }
                }}
            />
            <img
                src='https://komarovalexander.github.io/ka-table/static/icons/close.svg'
                className='close-cell-button'
                alt='Cancel'
                title='Cancel'
                onClick={() => {
                    if (addCol){
                        dispatch(hideNewRow())
                        addCol=false
                    }
                    else
                        dispatch(closeRowEditors(rowKeyValue));
                }}
            />
        </div >
    );
};

const tablePropsInit: ITableProps = {
    columns: [
        { key: ':delete', style: { width: 60, textAlign: 'center' } },
        { key: 'column1', title: 'מחיר כולל ', dataType: DataType.String , style: { width: 160, textAlign: 'center' } },
        { key: 'column2', title: 'כמות', dataType: DataType.String , style: { width: 160, textAlign: 'center' } },
        { key: 'column3', title: 'מחיר  ליחידה', dataType: DataType.String , style: { width: 160, textAlign: 'center' } },
        { key: 'column4', title: 'סוג', dataType: DataType.String , style: { width: 160, textAlign: 'center' } },
        { key: 'editColumn', style: { width: 100, textAlign: 'center' } },
        { key: 'addColumn',style: {width: 100} },
    ],
    virtualScrolling: {
        enabled: true
    },
    data: dataArray,
    editingMode: EditingMode.Cell,
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
};



const Bid: React.FC = () => {
    const [tableProps, changeTableProps] = useState(tablePropsInit);
    const dispatch: DispatchFunc = action => {
        changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    };


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
         };

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
    const exportClick = orientation => {
        const doc = new jsPDF(orientation);
        const head = [tableProps.columns.map(c => c.title)];
        const body = tableProps.data.map(d =>
            tableProps.columns.map(c => getValueByColumn(d, c))
        );
        doc.autoTable({
            margin: 1,
            headStyles: { fillColor: "#F1F5F7", textColor: "#747D86" },
            alternateRowStyles: { fillColor: "#F9FBFC" },
            head,
            body
        });

        doc.save("table.pdf");
    };

    return (
        <html >
        <head>
            <meta charset="utf-8">
            </meta>
        </head>
        <body class="container container-fluid alert alert-primary " role="alert">
        <div>
            <div >
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
            <div className="App ">
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

        <div id="bid-table">
            <div>
                <div
                    style={{
                        marginBottom: 20,
                        marginLeft: 20
                    }}
                >
                    <button onClick={() => exportClick()}>Export to PDF</button>
                    <button
                        style={{ marginLeft: 40 }}
                        onClick={() => exportClick("landscape")}
                    >
                        Export to PDF (Landscape)
                    </button>
                </div>

            </div>
            <div className='add-row-demo'>
                <Table
                    {...tableProps}
                    childComponents={{
                        cellText: {
                            content: (props) => {
                                if (props.column.key === 'editColumn')
                                    return <EditButton {...props}/>

                                switch (props.column.key){
                                    case ':delete': return <DeleteRow {...props}/>;
                                }
                            }
                        },
                        cellEditor: {
                            content: (props) => {
                                if (props.column.key === 'editColumn'){
                                    return <SaveButton {...props}/>
                                }
                            }
                        },
                        headCell: {
                            content: (props) => {
                                if (props.column.key === 'addColumn') {
                                    return <AddButton {...props}/>;
                                }
                            }
                        }
                    }}
                    dispatch={dispatch}
                />
            </div>
        </div>
        </body>
        </html>
    );
};

export default Bid;
