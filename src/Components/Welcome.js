import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';


class Welcome extends Component{
	constructor(props){
		super(props)
	}


	render(){
		return(
			
			<div className="container">
				<br /><br />
				<h2><b>Welcome to the React Web Application.</b></h2>
				<br /><br />
				<Card>
		        	<CardHeader tag="h3">Articles</CardHeader>
		        	<CardBody>
		          		<CardText>To view the list of Articles.</CardText>
		          		{/* link to view the list of articles page*/}
		          		<Button outline color="info"><Link to="articleslist">Click here</Link></Button>
		        	</CardBody>
		        </Card>
				<Card>
		        	<CardHeader tag="h3">Authors</CardHeader>
		        	<CardBody>
		          		<CardText>To view the list of Authors.</CardText>
		          		{/* link to view the list of authors page*/}
		          		<Button outline color="info"><Link to="authorslist">Click here</Link></Button>
		        	</CardBody>
		      	</Card>
		    </div>

		);
	}
}

export default Welcome;