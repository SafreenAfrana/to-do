import React, { Component } from 'react'
import Todolist from './components/Todolist'
import  "bootstrap/dist/css/bootstrap.min.css"
import  {v4 as uuidv4} from 'uuid'
import Todoinput from './components/Todoinput'
class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        items:[],
        id: uuidv4(),
        item:'',
        editItem:false
      }
      
    }
    handleChange= (e) =>{
        this.setState({
          item:e.target.value
          
        })
        
      }
      handleSubmit = (e) =>{
            e.preventDefault()
            const newItem ={
              id:this.state.id,
              title:this.state.item
              
            };
            
            const updateItems = [...this.state.items,newItem]
            this.setState({
              items:updateItems,
              item:'',
              id:uuidv4(),
              editItem:false
            })
            
            
              const items=[]
              items.push(updateItems)
              localStorage.setItem("items",JSON.stringify(items))
              
            
            this.setState({
              items:updateItems,
              })
            
          }
          
          clearList = () =>{
            localStorage.removeItem('items')
            this.setState({
              items:[]
            })
          }
          handleDelete = (id)=>{
            
            const filteredItems = this.state.items.filter(item => 
              item.id !== id)
              
              let itemsValue = JSON.parse(localStorage.getItem('items'))
              localStorage.setItem("items",JSON.stringify(itemsValue))
              itemsValue.splice(filteredItems,1)
              this.setState({
                
                items:filteredItems
              })
              
              localStorage.setItem("items",JSON.stringify(filteredItems))
              
              
                  this.setState({
                items:filteredItems
                
            })
            
              //console.log(filteredItems)
            }
          handleEdit = (id) =>{
            const filteredItems = this.state.items.filter(item => 
              item.id !== id)
              const selectedItem = this.state.items.find(item => 
                item.id === id)
                
              this.setState({
                items:filteredItems,
                item:selectedItem.title,
                editItem:true,
                id:id

              })
          }
        
          componentDidMount(){
            
            const item = window.localStorage.getItem('items')
            const parsedItems = JSON.parse(item)
            if(item == null){
              return false
            }
            else{

              parsedItems.map(parsedItem =>{

              this.setState({
              
                items:parsedItem,
                
                
              })
            })
            }
            
              console.log(parsedItems)
              
              
              
            }
          
              
              
          
  render() {
    return (
      
      <div className="container">
    <div className="row">
    <div className="col-10 mx-auto col-md-8 mt-4">
    <h3 className="text-capitalize text-center">Todo Input</h3>
    <Todoinput item={this.state.item}
    handleChange={this.handleChange} 
    handleSubmit={this.handleSubmit} 
    editItem={this.state.editItem} />
    
    <Todolist items={this.state.items} 
    clearList={this.clearList}
    handleDelete={this.handleDelete} 
    handleEdit={this.handleEdit} 
    />
    
    </div>
    </div>
    </div>
    
    )
  }
  

}

export default App
