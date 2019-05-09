import React, {Component} from 'react'
import {
    View, Text, StyleSheet,Button,TouchableOpacity,TextInput,FlatList,ActivityIndicator
} from 'react-native'
import {STYLE_CONTAINER} from '../config/app.config'
import {sizeFont} from '../helper/size.helper'
import { autocompletePlaces } from '../api/google_map'
import { place_id } from '../api/place_id'


export default class LocationHouse extends Component {
constructor(props){
    super(props)
    this.state = {
            data:[],
            string:this.props.navigation.getParam('address',''),
            address:'',
            place_id:'',
            loading:false,
            location:{}
}

}
// async componentDidMount(){
    
// }
async request_address(){
    let res = await autocompletePlaces(this.state.string)
    console.log(res)
    this.setState({data:res.predictions,loading:false})
}
async request_place_id(){
    action = this.props.navigation.getParam('action','')
    let res = await place_id(this.state.place_id)
    this.setState({location:res.result.geometry.location},()=>{
        action(this.state.address,this.state.location)
        this.props.navigation.goBack()
    })
}
    render () {
        return (

            <View style={{flex:1}}>
               <TextInput 
               value={this.state.string}
               onChangeText={(text)=>this.setState({string:text,loading:true},()=>this.request_address())}
               style={{width:'90%',height:50}}
               placeholder="Nhập địa chỉ"
               >
                  
               </TextInput>
               {
                   this.state.loading
                   ?
                   <ActivityIndicator size="large"></ActivityIndicator>
                   :
                   null
               }
               <FlatList
                   ListEmptyComponent={<Text>Không có dữ liệu</Text>}
                   data={this.state.data}
                   keyExtractor={(item,index)=>index}
                   renderItem={({item,index})=>{
                       return(
                           <TouchableOpacity style={{margin:20}}
                               onPress={()=>{
                                this.setState({place_id:item.place_id,address:item.description},()=>this.request_place_id())
                                   
                               }}
                           ><Text>{item.description}</Text>
                           </TouchableOpacity>
                       )
                   }}
               >

               </FlatList>
            </View>
        );
    }
}