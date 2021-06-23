import React, {useEffect, useState} from 'react';
import "ka-table/style.css";
import {Annotator} from "image-labeler-react";
import {ITableProps, kaReducer, Table} from 'ka-table';
import {ActionType, DataType, EditingMode, FilteringMode, SortDirection, SortingMode} from 'ka-table/enums';
import {DispatchFunc} from 'ka-table/types';
import 'jspdf-autotable';
import {getValueByColumn} from 'ka-table/Utils/DataUtils';

import jsPDF from "jspdf";
import {
    closeRowEditors,
    hideNewRow, loadData,
    openRowEditors,
    saveNewRow,
    saveRowEditors,
    showNewRow, updateData
} from 'ka-table/actionCreators';

import {ICellEditorProps, ICellTextProps} from 'ka-table/props';
import {deleteRow} from 'ka-table/actionCreators';

//

const dataArray = Array()
let addCol = false;

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
                src="https://komarovalexander.github.io/ka-table/static/icons/plus.svg"
                alt='Add New Row'
                title='Add New Row'
                onClick={() => {
                    dispatch(showNewRow())
                    addCol = true
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


const SaveButton: React.FC<ICellEditorProps> = ({dispatch}) => {
    const saveNewData = () => {
        const rowKeyValue = generateNewId();
        dispatch(
            saveNewRow(rowKeyValue, {
                validate: true
            })
        );
    };
    return (
        <div className="buttons">
            <img
                src="https://komarovalexander.github.io/ka-table/static/icons/save.svg"
                className="save-cell-button"
                alt="Save"
                title="Save"
                onClick={saveNewData}
            />
            <img
                src="https://komarovalexander.github.io/ka-table/static/icons/close.svg"
                className="close-cell-button"
                alt="Cancel"
                title="Cancel"
                onClick={() => dispatch(hideNewRow())}
            />
        </div>
    );
};
/*
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
*/

const tablePropsInit: ITableProps = {
    columns: [
        {key: ':delete', style: {width: 60, textAlign: 'center'}},
        {
            key: 'total_item_price',
            title: 'מחיר כולל',
            dataType: DataType.Number,
            style: {width: 160, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {
            key: 'count',
            title: 'כמות',
            dataType: DataType.Number,
            style: {width: 160, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {
            key: 'price',
            title: 'מחיר  ליחידה',
            dataType: DataType.Number,
            style: {width: 160, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {
            key: 'type',
            title: 'סוג',
            dataType: DataType.String,
            style: {width: 160, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {key: 'addColumn', style: {width: 60}},
    ],
    virtualScrolling: {
        enabled: true
    },
    singleAction: loadData(),
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
};
const dataArray2 = [
    {
        id: 2,
        column1: 'Billi Bob',
        column2: 55,
        column3: new Date(2020, 10, 8, 10),
        column4: "visa",
        column6: "Bob@gmail.com",
        column5: "100% הכנת קירות וצנרות מרתף ",
    },
    {
        id: 3,
        column1: 'Tom Williams',
        column2: 45,
        column3: new Date(2019, 11, 8, 10),
        column4: "direct",
        column6: "Williams@gmail.com",
        column5: "50% נרת פנימית וחוטים ,  50%הרכבת אבזרים ולוחות חשמל",
    },
    {
        id: 6,
        column1: 'Sunny Fox',
        column2: 33,
        column3: new Date(2021, 10, 9, 10),
        column4: "masterCrd",
        column6: "Wims@gmail.com",
        column5: "70% הכנת קירות וצנרות מרתף, 30% לאחר ביקורת חברת חשמל או בודק פרטי",
    },
    {
        id: 1,
        column1: 'Mike Wazowski',
        column2: 80,
        column3: new Date(2010, 10, 8, 10),
        column4: "מזומן",
        column6: "ms@gmail.com",
        column5: "100% הכנת קירות וצנרות מרתף ",
    },
];

const tablePropsInit2: ITableProps = {
    columns: [
        {key: ':delete', style: {width: 60, textAlign: 'center'}},
        {
            key: 'payer_name',
            title: 'שולם על ידי',
            dataType: DataType.String,
            style: {width: 100, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {
            key: 'total',
            title: 'סכום',
            dataType: DataType.String,
            style: {width: 100, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {
            key: 'payment_date',
            title: 'תאריך',
            dataType: DataType.Date,
            style: {width: 100, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {
            key: 'pay_type',
            title: 'סוג תשלום',
            dataType: DataType.String,
            style: {width: 100, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {
            key: 'contact_mail',
            title: 'שליח הודעה',
            dataType: DataType.String,
            style: {width: 100, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {
            key: 'pay_condition',
            title: 'תנאי תשלום',
            dataType: DataType.String,
            style: {width: 100, textAlign: 'center'},
            sortDirection: SortDirection.Ascend
        },
        {key: 'addColumn', style: {width: 100}},
    ],
    virtualScrolling: {
        enabled: true
    },
    singleAction: loadData(),
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
};

/*
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
symbolList['שקע יחיד מוגן מים רגיל']=symbolData('שקע יחיד מוגן מים רגיל',6,0)*/

//var fetchedData;
var fetchedData2;
// var fetched=false;


const TableBid = ({match}) => {

    const [BidData, SetBidData] = useState("");
    const [tableProps, changeTableProps] = useState(tablePropsInit);
    const [fetched, setfetched] = useState(false)

    const [note, setnote] = useState("תלחץ פה כדי להוסף תשלומים אחרים")

    const [fetchedData, setfetchedData] = useState("")
    const [versionId, setversionId] = useState("")
    const [myBusiness, setMyBusiness] = useState({my_business: null});
    useEffect(() => {
        setMyBusiness({my_business: match.params.my_business})
        setversionId(match.params.version)
    }, [])
    useEffect(async () => {
        if (myBusiness.my_business !== null && versionId !== "") {
            const response = await fetch(
                'http://127.0.0.1:8000/api/bid-table/?my_business=' + myBusiness.my_business + '&version=' + versionId
            );
            var fetchedData1 = await response.json();
            setfetchedData(fetchedData1)
            console.log(fetchedData)
            setfetched(true)
        }

    }, [myBusiness, versionId])


    const dispatch: DispatchFunc = async action => {
        console.log("busnis" + myBusiness.my_business + '&version=' + versionId)
        changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));

        if (action.type === ActionType.LoadData) {

            dispatch(updateData(fetchedData));


        }

    };

    const [tableProps2, changeTableProps2] = useState(tablePropsInit2);
    const dispatch2: DispatchFunc = async action => {
        changeTableProps2((prevState: ITableProps) => kaReducer(prevState, action));

        if (action.type === ActionType.LoadData) {
            const response = await fetch(
                "http://localhost:8000/api/payments/"
            );
            fetchedData2 = await response.json();
            console.log(fetchedData2)
            dispatch2(updateData(fetchedData2));
            // fetched=true

        }

    };


    function fetchPrice() {

        var totalPrice = 0
        if (fetched) {
            for (var i in fetchedData)
                totalPrice += fetchedData[i].total_item_price

            return "     [₪ " + totalPrice + "]:   מחיר סופי"
        } else return ""
    }


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


    /*    const buildArr= () => {
            var arr=[]
            for(let key in symbolList){
                arr.push(symbolList[key].getName());

            }
            return arr
        }*/

    const exportClick = orientation => {
        const doc = new jsPDF(orientation);
        const head = [tableProps.columns.map(c => c.title)];
        const body = tableProps.data.map(d =>
            tableProps.columns.map(c => getValueByColumn(d, c))
        );
        doc.autoTable({
            margin: 1,
            headStyles: {fillColor: "#F1F5F7", textColor: "#747D86"},
            alternateRowStyles: {fillColor: "#F9FBFC"},
            head,
            body
        });

        doc.save("table.pdf");
    };


    function buildBidTable() {
        return (
            <div>
                <Table
                    {...tableProps}
                    childComponents={{
                        cellEditor: {
                            content: props => {
                                if (props.column.key === "addColumn") {
                                    return <SaveButton {...props} />;
                                }
                                switch (props.column.key) {
                                    case ':delete':
                                        return <DeleteRow {...props}/>;
                                        break;
                                }
                            }
                        },
                        cellText: {
                            content: (props) => {

                                switch (props.column.key) {
                                    case ':delete':
                                        return <DeleteRow {...props}/>;
                                        break;
                                }
                            }
                        },
                        headCell: {
                            content: props => {
                                if (props.column.key === "addColumn") {
                                    return <AddButton {...props} />;
                                }

                            }
                        }
                    }}
                    dispatch={dispatch}
                />
                <h6 class="p-3 mb-2 bg-light ">{fetchPrice()}</h6>
            </div>
        )
    }

    return (
        <html>
        <head>
            <meta charset="utf-8">
            </meta>
        </head>
        <body class="container container-fluid p-3 mb-2 bg-dark " role="alert">
        <div>
            <h2 className="text-center text-warning">פירוט הצעת מחיר </h2>

            <div className="row">
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
                        style={{marginLeft: 40}}
                        onClick={() => exportClick("landscape")}
                    >
                        Export to PDF (Landscape)
                    </button>
                </div>

            </div>
            <div>
                {fetched && buildBidTable()}
            </div>
            <h2 className="text-center text-warning">תשלומים </h2>

            <div className="remote-data">
                <Table
                    {...tableProps2}
                    childComponents={{
                        cellEditor: {
                            content: props => {
                                if (props.column.key === "addColumn") {
                                    return <SaveButton {...props} />;
                                }
                                switch (props.column.key) {
                                    case ':delete':
                                        return <DeleteRow {...props}/>;
                                        break;
                                }
                            }
                        },
                        cellText: {
                            content: (props) => {

                                switch (props.column.key) {
                                    case ':delete':
                                        return <DeleteRow {...props}/>;
                                        break;
                                }
                            }
                        },
                        headCell: {
                            content: props => {
                                if (props.column.key === "addColumn") {
                                    return <AddButton {...props} />;
                                }

                            }
                        }
                    }}
                    dispatch={dispatch2}
                />
            </div>
            <p contentEditable="true" className=" text-warning d-flex justify-content-around">{note} </p>
        </div>
        </body>
        </html>
    );
};

export default TableBid;
