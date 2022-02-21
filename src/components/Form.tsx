import {Form, Button , Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/rootStore';
import { observer } from 'mobx-react-lite';

const FormItems = () => {
    const [form] = Form.useForm();
    const Task=useRef('')
    const [data, setData]= useState({})
    const [listItem , setListItem]=useState([])
    const [btn , setBtn]=useState(true)
    const [id , setId]=useState()
    const [title , setTitle]=useState()

    const {
        TodoListModal: { getTodoo, setTodoo,deleteTodoo,updateTodoo, getTOODO},
      } 
      = useStore(null)

      useEffect(() => {
         
        async function load() {
          await getTodoo()
        }
        load()
      }, [])

      const inputValue=(e:any)=>{
          if(id){
            let data = {
                title:e.target.value,
                complete: false 
            }
            updateTodoo(id , data)
        }
          else{
            let data = {
                title:e.target.value,
                complete: false 
            }
            setData(data)
          }
      }

      const submit=()=>{
        setTodoo(data)
        setBtn(true)
      }
      const deleteItem=(id : any)=>{
        deleteTodoo(id.id)
      }
      const updateItem=(id : any)=>{
        
        form.setFieldsValue({
            title: id.title,
          });
          setBtn(false)
           setId(id.id)
           setTitle(id.title)
      
      }
   
    return ( <>
        <div >
        <Form form={form} onFinish={submit}>
            <Form.Item name='title'>
            <Input placeholder="Basic usage" value='' onChange={(e)=>inputValue(e)}/>
            </Form.Item>
            <Form.Item>{
                btn ?
                <Button type="primary" htmlType="submit">Submit</Button> :
                <Button type="primary" htmlType="submit" >Update</Button> 
            }
            </Form.Item>
        </Form>
           
            
            
            <ul>
            {getTOODO? getTOODO.map((item , ind)=>{
                return(
                    <div key={ind}>
                        <li >{item.title}

                        <Button onClick={()=>deleteItem(item)}>D</Button>
                        <Button onClick={()=>updateItem(item)}>U</Button>
                        </li>
                    </div>
                )
            }) : ''}
            </ul>
            </div>
        </> );
}

export default observer(FormItems)