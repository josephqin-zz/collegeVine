import React from 'react'

//When the counter value is divisible by 5 with a remainder of 3 (i.e. x modulo 5 = 3), turn the background of the component green.
const isGreen = num => num%5===3 

//when the counter value is a prime number turn the background Blue
const isBlue = num => {
	if(num<2) return false;
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num !== 1;
}

//when the counter value is not 0 and dibisible by 10.
const isCircle = num => num>0 && num%10===0


//according to valuce combination to get Shape style and Background style
const setStyle = function(BGvalue,Shapevalue){
	let bgStyle = {width:'200px',height:'200px',border:"solid 5px #000000"}
		if( isGreen(BGvalue) ){
			bgStyle.backgroundColor = 'green';
		}else if( isBlue(BGvalue) ){
			bgStyle.backgroundColor = 'blue';
		}
        if( isCircle(Shapevalue) ) {
        	bgStyle.borderRadius = '150px';
        	bgStyle.boxShadow = '10px -10px 5px #CCC';
            }
    return bgStyle;        
}

//StaticView for the view will increment button click.
const StaticView = function(props){
	return (<div style={setStyle(props.value,props.value)}/>);
}

//get next non-transparent color value by given value
const EscapeTransparentIncrement = function(value){
	let newValue = value+1;
    while( !isGreen(newValue) && !isBlue(newValue) ){
    	newValue++;
    }
    return newValue;
} 



//DynamicView for the view will recape button click.
class DynamicView extends React.Component{
	constructor(props){
		super(props)
		this.state = { value:EscapeTransparentIncrement(0) };//initial should start from the first non-transparent color value 2
	}

	componentDidMount(){
		this.intervalID = setInterval(()=>this.changeColor(),500);
	}

	componentWillUnmount(){
		clearInterval(this.intervalID);
	}

    changeColor(){
        let newValue = EscapeTransparentIncrement(this.state.value)

        this.setState({value:newValue>this.props.value?EscapeTransparentIncrement(0):newValue})
    }	

	render(){
		return  (<div style={setStyle(this.state.value,this.props.value)}/>);
	}
}

//root component
export default class Counter extends React.Component {
	constructor(props){
		super(props);
		this.state = {value:0,recap:false};
	}

	//when counter reach 100 then reset to 0
	onIncrementHandler(){
		this.setState((prevstate)=>({value:prevstate.value===100?1:prevstate.value+1,recap:false}))
	}

	onRecapHandler(){
		this.setState({recap:true})
	}

	render(){
		const view = this.state.recap?(<DynamicView value={this.state.value}/>):(<StaticView value={this.state.value}/>)
		return (
			<div>
			    <button key={'recap'} onClick={this.onRecapHandler.bind(this)}>Recap colors</button>
			   	{ view }	
			    <button key={'increment'} onClick={this.onIncrementHandler.bind(this)}>Click me</button>
			</div>
			)
	}
}