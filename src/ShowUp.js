import  React,{ Component } from 'react';
import { withRouter } from 'react-router-dom'  
import { Button,List,Avatar } from 'antd';

var ReviewedUser = [];
var backToMain;
class ShowUp extends Component {

    constructor(props,context){
        super(props,context);
        if(this.props.location.state!== undefined){
            ReviewedUser = this.props.location.state.userinfo;
            backToMain = this.props.location.state.backToMain;
        }


    }

    render() {      
  
        return(<div >            
            <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
            <div style={{ width:700,  boxShadow: 'darkgrey 0px 0px 30px 5px inset'}} >
                <div style={{fontSize: 30, testAllign:'center'}}>
                <p> Favorite List </p>
                </div>
            <List itemLayout="horizontal"  dataSource={ReviewedUser.filter((user)=>user.like===true)}   renderItem={item => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar size={100} src={item.userinfo.avatar}/>}
                />
                <User  index={item.index} userinfo={item.userinfo} like={item.like}/>
            </List.Item>
            )}
            /> </div></div>
            </div>
        )
    }
}
class User extends Component {
    
    constructor(){
        super();
        this.state={color:"#00FF00"};
    }

    //handle not like case 
    onNotLike(){
        ReviewedUser[this.props.index] = {
            index:this.props.index,
            like:false,
            userinfo:this.props.userinfo
        }
        this.setState({color:'#FF0000'});
        backToMain(ReviewedUser);
        
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props){
            this.setState({index:nextProps.index, like:nextProps.like});
        }        
    }
    render () {
      
      var userinfo = {name:"",location:""};
      if(this.props.userinfo !== undefined){
        userinfo = this.props.userinfo;
      }

      return (
        <div style={{backgroundColor:this.state.color}}>
          <div>Name：{userinfo.name}</div>
          <div>Address：{userinfo.location}</div>
          <Button type="primary" onClick={()=>this.onNotLike()}> No Like Anymore </Button>
          <hr />
        </div>
      )
    }
  }
export default withRouter(ShowUp);