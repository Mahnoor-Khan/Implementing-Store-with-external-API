import {Form, Button } from 'antd';
import {CheckOutlined , PlusOutlined , CloseOutlined , EditOutlined} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/rootStore';
import { observer } from 'mobx-react-lite';
import {FormStyle} from './styles/Form.styled'
import {InputFeild} from './styles/input.styled'
import {List} from './styles/list.styled'
import {BtnStyle,DelBtn , UpdateBtn , DelAllBtnDiv , DelAllBtn ,SubBtn} from './styles/btn.styled'
import {ListDiv} from './styles/list.styled'
// import '../App.css'

const FormItems = () => {
    const [form] = Form.useForm();
    const [data, setData]= useState({})
    const [btn , setBtn]=useState(true)
    const [id , setId]=useState()

    const btns={
      del : "delBtn",
      update : "UpBtn",
    }

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
        setBtn(true)
        setTodoo(data)
        
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
      }

      const clickme=()=>{    
      getTOODO ? getTOODO.map((elem)=> {console.log(elem.id) ;
        deleteTodoo(elem.id)
    } ) : console.log('nothing')
      }
   
    return ( <>
        
            <FormStyle>
        <Form form={form} onFinish={submit}>
            <Form.Item name='title'>
            <InputFeild placeholder="Enter Task" onChange={(e)=>inputValue(e)}></InputFeild>
            </Form.Item>
            <Form.Item>
              <BtnStyle>
                {
                btn ?
                <SubBtn  onClick={submit}><PlusOutlined /></SubBtn> :
                <SubBtn onClick={submit} ><EditOutlined /></SubBtn> 
              } 
                </BtnStyle>            
            </Form.Item>
        </Form>
            <ListDiv>
            <ul>
            {getTOODO? getTOODO.map((item , ind)=>{
                return(
                    <div key={ind}>
                        <List>{item.title}
                        <DelBtn onClick={()=>deleteItem(item)}><CloseOutlined /></DelBtn>
                        <UpdateBtn onClick={()=>updateItem(item)}><EditOutlined /></UpdateBtn>
                        </List>
                    </div>
                )
            }) : ''}
            </ul>
            </ListDiv>
            <DelAllBtnDiv>
           <DelAllBtn  onClick={clickme}>Delete All</DelAllBtn>
           </DelAllBtnDiv>
            </FormStyle>
        </> );
}

export default observer(FormItems)