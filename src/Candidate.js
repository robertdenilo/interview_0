import  React,{ Component } from 'react';
import { HashRouter as Router, Route, Link,withRouter } from 'react-router-dom'   //BrowserRouter 
import ShowUp from './ShowUp'
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { Skeleton, Switch, Card, Icon } from 'antd';
const { Meta } = Card;

//mockup data
const users = [
    { name: 'Jerry', age: 11, gender: 'male' },
    { name: 'Tomy', age: 22, gender: 'male' },
    { name: 'Lily', age: 19, gender: 'female' },
    { name: 'Lucy', age: 20, gender: 'female' },
    { name: 'Jack', age: 33, gender: 'female' },
    { name: 'Jack1', age: 44, gender: 'female' },
    { name: 'Jack2', age: 55, gender: 'female' },
    { name: 'Jack3', age: 66, gender: 'female' },
    { name: 'Jack4', age: 77, gender: 'female' }
  ]

var ReviewedUser = [];
var backToMain;
class Candidate extends Component {
    constructor(props){
      super(props);

         if(this.props.location.state!==undefined){
            backToMain = this.props.location.state.backToMain;
         }
      
         
         if(this.props.location.state.userinfo.length===0){
            this.state={index:0};
            //get 1st user initially
            ReviewedUser.push({index:0,like:false});
            this.getUser(0);
  
            backToMain(ReviewedUser);
         }else{
            ReviewedUser = this.props.location.state.userinfo;
            this.state={index:0, userinfo:ReviewedUser[0].userinfo,like:ReviewedUser[0].like};
         }

    }
    
    getUser(index){
      fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(
        (result) => {
          var userinfo = {name: result.results[0].name.first + " " + result.results[0].name.last,
          location: result.results[0].location.street + "" + result.results[0].location.city + " " + result.results[0].location.state,
          avatar:result.results[0].picture.thumbnail}
          var temp = ReviewedUser[index];
          ReviewedUser[index]={index: temp.index, like: temp.like, userinfo: userinfo};
          this.setState({userinfo:userinfo, like: temp.like});
        },
        (error) => {}
      
        )
        
    }
    onClickNext(event){
        var index = this.state.index;
        index++;
        console.log(this.state);
        // if(++index >= ReviewedUser.length){
        //   index = index % ReviewedUser.length;
        // }
        var key = this.existInArray(index);
        if (isNaN(key)){
          var userallinfo = {index:index,
            like:false}
          ReviewedUser.push(userallinfo);
          this.setState({index:index});
          this.getUser(index);
        } else{
          this.setState({index:index,
            userinfo:ReviewedUser[key].userinfo, 
            like: ReviewedUser[key].like});
        }
        console.log(ReviewedUser);

    }
    onClickPrevious(){
      if (this.state.index > 0 ){
        var preindex = this.state.index - 1;
        this.setState({index:preindex,
              like:ReviewedUser[preindex].like,
              userinfo:ReviewedUser[preindex].userinfo});
      }
      console.log(ReviewedUser);
    }

    //check whether exist in ReviewedUser
    existInArray(index){
      for(var key in ReviewedUser){
        if(ReviewedUser[key].index === index){
             return key;
        }
      }
      return NaN;
    }
    onClickLike(event){
      var key = this.existInArray(this.state.index);

      ReviewedUser[key] = {index: this.state.index,
              like:!ReviewedUser[key].like,
              userinfo:ReviewedUser[key].userinfo};
  
      this.setState({index:this.state.index,
        userinfo:ReviewedUser[key].userinfo, 
        like: ReviewedUser[key].like});

      console.log(ReviewedUser);
    }
    componentWillUpdate(){

    }
    componentWillReceiveProps(nextProps) {  
      console.log("AAA");
      console.log(nextProps);
      //console.log(this.props);
      //ReviewedUser = nextProps.location.state.userinfo;
      console.log(ReviewedUser);
      console.log("BBB");

    }

    render () {    //<li><Redirect to={{pathname:"/showup",state:ReviewedUser}}/>Show</li>
         console.log("rendering...");
         console.log(ReviewedUser);
         backToMain(ReviewedUser);
        return (
            <div style={{fontSize:40,textAlign:'center'}}>
              
              {/* <Router>
                <div>
                  <Route exact={true} path="/Showup" component={ShowUp}/> 
                  <ul>
                      <li><Link to={{pathname:"/Showup",state:ReviewedUser}}>Show Likes</Link></li>
                  </ul>
                </div>
              </Router> */}

              <div>
              <p>You may found your interest: </p>
              <User ref="user1" index={this.state.index} userinfo={this.state.userinfo} like={this.state.like}/>
              
              <Row gutter={16}>
                <Col span={6}><Button type="primary" onClick={this.onClickPrevious.bind(this)}>Previous</Button></Col>
                <Col span={6}><Button type="primary" onClick={this.onClickLike.bind(this)}>Like</Button></Col>
                <Col span={6}><Button type="primary" onClick={this.onClickNext.bind(this)}>Next</Button></Col>
              </Row>
              </div>
 
            </div>
            
          )
      }

}
class User extends Component {
    
    constructor(){
      super();
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
  
    render () {
      var like = this.props.like;
      var user = {name: 'N/A',
           position: 'N/A',
           avatar:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
      if(this.props.userinfo!==undefined){
         user = this.props.userinfo;
      }

      return (
        <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
          <Card style={{ width: 700, height:350, marginTop: 16, fontSize:30, textAlign:'center', boxShadow: 'darkgrey 0px 0px 30px 5px inset'}} >
            <Meta
              avatar={<Avatar size={100} icon="user"  src={user.avatar} />}
              title="My Candidate"
              description=""
            />
            <div>Name：{user.name}</div>
            <div>Address：{user.location}</div>
            <div>Favorite：{String(like)}</div>
          </Card>
        </div>
      )
    }
  }
export default withRouter(Candidate);