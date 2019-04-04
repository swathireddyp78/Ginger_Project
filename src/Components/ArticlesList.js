import React, {Component} from "react";
import axios from "axios";
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class ArticlesList extends Component{
	constructor(props){
	super(props)
    // Initialised state 
	this.state = {
		articles:[],
		isLoading: true
	}
	}

	componentDidMount()
    {   
        // HTTP request
        var config = {
            header: {'Access-Control-Allow-Origin': '*'}
        };

        // API call to get the articles required
        axios.get('http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:theraphy+OR+all:"data science"+OR+all:"machine learning"&sortBy=lastUpdatedDate&sortOrder=descending&max_results=30',config)
        .then(res => {

            // Parsing the XML data
			var XMLParser = require('fast-xml-parser');
			var xml = new XMLParser.parse(res.data);

			this.setState({
                articles:xml.feed.entry,
			 	isLoading: false
               });
         })
        
     }


	render(){
		if(this.state.isLoading){
			return<div className="text-center"><h1><b>Loading.....</b></h1></div>
		}
		return(
			<div>
                <h1 className="text-center" color="info">List of Articles</h1>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Article Name</th>
							<th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.articles.map(
                            (article,index)=>
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td >{article.title}</td>
                                <td><NavLink to={`${article.id.split("/").pop()}/article`} className="btn btn-info">View Article</NavLink></td>
                            </tr>
                            )}
                    </tbody>
                </Table>
            </div>			
		);
	}
}

export default ArticlesList;