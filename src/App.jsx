import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';

const App = ()=>{
  const [listItems, setListItems] = useState([]); 
  const [ items, setItems] = useState();
  const [arr, setArr] = useState([]);

  useEffect(()=>{
    const storageData = localStorage.getItem('data');
    setListItems(JSON.parse(storageData));
    const deletData = localStorage.getItem('delet');
    setArr(JSON.parse(deletData));
  },[]);

  useEffect(()=>{
    localStorage.setItem('data', JSON.stringify(listItems));
    localStorage.setItem('delet',JSON.stringify(arr));
  });

  const inputData= (val)=>{
    setItems(val.target.value);
  }
 const addnew =()=>{
  if(items)
  {setListItems((oldItems)=>{
    return [...oldItems, items];
  });
  setItems("");}
 };

 const  deletItem = (id)=>{  
   setArr([...arr, id]);
};
const clearList=()=>{
  setListItems([]);
  setArr([]);
}
  return(<>
    <div className="main_container">
      <div className="list_container">
      <h1 className="heading">ToDo List</h1> <hr/>
       <div className="header"><input className="input" placeholder="Add an Item"  onChange={inputData} value ={items}  />
        <Button variant="outlined" style={{
          color:"green",
          padding:"5px",
          margin:'auto 5px'
        }} onClick={addnew}> <AddIcon/> </Button>
        </div> 
        <div className="list_items">
          <ul>
          { listItems.map((val, index)=>{
            return(<li key={index} style={{textDecoration: arr.includes(index)?'line-through':'none'}}><DeleteIcon className="delet_icon" onClick = {()=>deletItem(index)} />{val} </li>);
          })}
         </ul>
        </div>

        <Button variant="outlined" style={{
          color:"red",
          padding:"3px",
          margin:'auto 5px'
        }} onClick={clearList}>Clear List</Button>
      

      </div>
    </div>
  </>);
}


export default App;