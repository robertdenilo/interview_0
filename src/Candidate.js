import  React,{ Component } from 'react';
import { withRouter } from 'react-router-dom'   

import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { Switch, Card } from 'antd';
const { Meta } = Card;

class Candidate extends Component {
    backToMain;
    ReviewedUser = [];
    constructor(props){
      super(props);

      if(this.props.location.state!==undefined){
         if(this.props.location.state!==undefined ){
            this.backToMain = this.props.location.state.backToMain;
         }

         if(this.props.location.state.userinfo.length === 0 ){
            this.state={index:0};
            //get 1st user initially
            this.ReviewedUser.push({index:0,like:false});
            this.getUser(0);
  
            this.backToMain(this.ReviewedUser);
         }else{
            this.ReviewedUser = this.props.location.state.userinfo;
            this.state={index:0, userinfo:this.ReviewedUser[0].userinfo,like:this.ReviewedUser[0].like};
         }


      }else{
         this.state={index:0, userinfo:"",like:false};
       }
    }
    //call to api
    getUser(index){
      fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(
        (result) => {
          var userinfo = {name: result.results[0].name.first + " " + result.results[0].name.last,
          location: result.results[0].location.street + "" + result.results[0].location.city + " " + result.results[0].location.state,
          avatar:result.results[0].picture.thumbnail}
          var temp = this.ReviewedUser[index];
          this.ReviewedUser[index]={index: temp.index, like: temp.like, userinfo: userinfo};
          this.setState({userinfo:userinfo, like: temp.like});
        },
        (error) => {}
              //need process error furthurmore when testing
        )
        
    }
    //get next page user info
    onClickNext(event){
        var index = this.state.index;
        index++;

        var key = this.existInArray(index);
        if (isNaN(key)){
          var userallinfo = {index:index,
            like:false}
          this.ReviewedUser.push(userallinfo);
          this.setState({index:index});
          this.getUser(index);
        } else{
          this.setState({index:index,
            userinfo:this.ReviewedUser[key].userinfo, 
            like: this.ReviewedUser[key].like});
        }
    }
    //render previous user info
    onClickPrevious(){
      if (this.state.index > 0 ){
        var preindex = this.state.index - 1;
        this.setState({index:preindex,
              like:this.ReviewedUser[preindex].like,
              userinfo:this.ReviewedUser[preindex].userinfo});
      }
    }

    //check whether exist in ReviewedUser
    existInArray(index){
      for(var key in this.ReviewedUser){
        if(this.ReviewedUser[key].index === index){
             return key;
        }
      }
      return NaN;
    }
    onChange = (checked) => {
      var key = this.existInArray(this.state.index);
      if(!isNaN(key)){
        this.ReviewedUser[key] = {index: this.state.index,
          like:!this.ReviewedUser[key].like,
          userinfo:this.ReviewedUser[key].userinfo};

        this.setState({index:this.state.index,
          userinfo:this.ReviewedUser[key].userinfo, 
          like: this.ReviewedUser[key].like});
        this.setState({ loading: this.ReviewedUser[key].like });
      }

    }

    render () {    
         if(this.backToMain){
            this.backToMain(this.ReviewedUser);
         }
        return (
            <div style={{fontSize:40,textAlign:'center'}}>
              
              <div>
              <p>You may found your interest: </p>
              <User ref="user1" index={this.state.index} userinfo={this.state.userinfo} like={this.state.like}/>
              
              <Row gutter={80}>
                <Col span={8}><Button type="primary" onClick={this.onClickPrevious.bind(this)}>Previous</Button></Col>
                <Col span={8}>
                     <div style={{float:"left", fontSize:20, width:80, height:80}}>
                     <div><p>Like?</p></div>
                     <div><Switch checked={this.state.like} onChange={this.onChange}/></div>
                     </div>
                </Col>
                <Col span={8}><Button type="primary" onClick={this.onClickNext.bind(this)}>Next</Button></Col>
              </Row>
             
              </div>
 
            </div>
            
          )
      }

}
class User extends Component {
    
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