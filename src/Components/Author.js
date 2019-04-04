import React, {Component} from "react";
import axios from "axios";
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText} from 'reactstrap';

class Article extends Component{
    constructor(props){
        super(props)
        this.state = {
            authorName:null,
            recentArticles:[],
            isLoading: true
        }
    }

    componentDidMount(){
        // Initialising the author name by fetching from url
        var aname=this.props.match.params.aname
        var config = {
            header: {'Access-Control-Allow-Origin': '*'}
        };
        
        // To access the data of past 30 days setting the variable
        var today = new Date();
        var priorDate = new Date(new Date().setDate(today.getDate()-30));

        
        this.setState({
            authorName:aname
        })
        axios.get('//export.arxiv.org/api/query?search_query=all:='+aname+'&sortBy=lastUpdatedDate&sortOrder=descending',config)
        .then(res => {
            var XMLParser = require('fast-xml-parser');
            var xml = XMLParser.parse(res.data);
            
            // Here filter is used to get the past 30 days entry data
            const result = xml.feed.entry.filter(ent=>new Date(ent.updated)>priorDate);

            console.log(result.length);

			this.setState({
				recentArticles:result,
				isLoading: false
              });
        })
    }


    render(){
            
        if(this.state.isLoading){
			return<h1><b>Loading.....</b></h1>
		}
        return(
            
            <div className="container">
                <h1>{this.state.authorName}</h1>
                <Card>
                    <CardHeader>Articles published</CardHeader>
                    <CardBody>
                        {/* Displaying the titles of the articles written by the particular author from past 30 days*/}
                        <CardText>{this.state.recentArticles.map(
                                (article,index)=>
                            <p>{article.title}</p>
                            )}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
export default Article;