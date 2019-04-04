import React, {Component} from "react";
import axios from "axios";
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText} from 'reactstrap';
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import AuthorView from './AuthorView'

class AuthorsList extends Component{
	constructor(props){
	super(props)
	this.state = {
            articles:[],
            isLoading: true
        }
	}

	componentDidMount()
    {   
        var config = {
            header: {'Access-Control-Allow-Origin': '*'}
        };

        var today = new Date();
        var priorDate = new Date(new Date().setDate(today.getDate()-30));

        axios.get('http://export.arxiv.org/api/query?search_query=all&sortBy=lastUpdatedDate&sortOrder=descending&max_results=30',config)
        .then(res => {
        	var XMLParser = require('fast-xml-parser');
            var xml = XMLParser.parse(res.data);

            const result = xml.feed.entry.filter(ent=>new Date(ent.updated)>priorDate);
			this.setState({
				articles:result,
				isLoading: false
              });
			console.log(xml);
        })
    }

	render(){

		const articles = this.state.articles
		if(this.state.isLoading){
			return<div className="text-center"><h1><b>Loading.....</b></h1></div>
		}
		
		return(
			<div className="container">
				<card>
					<CardHeader>List of Authors</CardHeader>
	        		<CardBody>
	        			{articles.map((article,index)=>
	          			<CardTitle><AuthorView article = {article} /></CardTitle>
	          			)}
	        		</CardBody>
	        	</card>
                
            </div>
		);
	}
}

export default AuthorsList;