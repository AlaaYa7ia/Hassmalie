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

const TableBid = () => {
    const [tableProps, changeTableProps] = useState(tablePropsInit);
    const dispatch: DispatchFunc = action => {
        changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    };


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

export default TableBid;
