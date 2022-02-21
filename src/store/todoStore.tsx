import { toJS } from "mobx";
import {types , onSnapshot , flow , applySnapshot , getSnapshot} from "mobx-state-tree";
import { getTodo , setTodo, deleteTodo ,updateTodo } from "../api";


export const TodoModal =types.model({
        id : types.maybeNull(types.number),
        title: types.maybeNull(types.string),
        created : types.maybeNull(types.string),
        complete : types.optional(types.boolean, false)
})

export const TodoListModal = types.model({
    data : types.maybeNull(types.array(TodoModal))
})
.views((self)=>({
    // @ts-ignore
    get getTOODO(){
        return  toJS(self.data)
    }
})).actions((self)=>{
    const getTodoo = flow(function* fetchData() {
        console.log(">>>")
        try {
          const res = yield getTodo()
          self.data = res
        } catch (error) {
          console.log('error', error); 
        } finally {
         console.log('ends')
        }
      }) 
      const setTodoo = flow(function* fetchData(data) {
        console.log(">>>")
        try {
          const res = yield setTodo(data)
          console.log("?")
        } catch (error) {
          console.log('error', error); 
        } finally {
         console.log('ends')
        }
      })
      const deleteTodoo = flow(function* fetchData(id) {
        console.log(">>>")
        try {
          const res = yield deleteTodo(id)
          console.log("?")
        } catch (error) {
          console.log('error', error); 
        } finally {
         console.log('ends')
        }
      })
      const updateTodoo = flow(function* fetchData(id, data) {
        console.log(">>>")
        try {
          const res = yield updateTodo(id, data)
          console.log("?")
        } catch (error) {
          console.log('error', error); 
        } finally {
         console.log('ends')
        }
      }) 
      return { getTodoo, setTodoo ,deleteTodoo ,updateTodoo }
    })
  export function initTodo() {
    return TodoListModal.create({})
  }