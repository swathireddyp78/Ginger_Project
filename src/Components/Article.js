import React, {Component} from "react";
import axios from "axios";
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Article extends Component{
    constructor(props){
        super(props)
        this.state = {
            article:[],
            isLoading: true
        }
    }

    componentDidMount(){
        // Initialising the id value by fetching from url
        var aid=this.props.match.params.aid
        var config = {
            header: {'Access-Control-Allow-Origin': '*'}
        };
        
        //HItting the API to get the article of this particular id
        axios.get('//export.arxiv.org/api/query?search_query=&id_list='+aid,config)
        .then(res => {
            var XMLParser = require('fast-xml-parser');
			var xml = XMLParser.parse(res.data);
			this.setState({
				article:xml.feed.entry,
				isLoading: false
              });
        })

    }

    render(){
        const article = this.state.article;
        
        if(this.state.isLoading){
			return<h1><b>Loading.....</b></h1>
        }

        var authorArray;
        {/*checking if the article has multiple authors and fetching names by iterating through each author*/}
        if(article.author instanceof Array){
            authorArray = article.author.map(
                (auth,index)=>
            <p><NavLink to={`/${auth.name}/author`} >{auth.name}</NavLink></p>
            )
        }else{
        {/* If the article has single author fetch the author name */}
            authorArray = <p><NavLink to={`/${article.author.name}/author`} >{article.author.name}</NavLink></p>
        }
        return(
            
            <div className="container">
                {/* Displaying the title of the article */}
                <h3>{article.title}</h3>
                <Card>
                    <CardHeader>Summary</CardHeader>
                    <CardBody>
                        {/* Displaying the Summary of the article */}
                        <CardText>{article.summary}</CardText>
                    </CardBody>
                </Card>
                <br /><br />
                <Card>
                    <CardHeader>Authors</CardHeader>
                    <CardBody>
                        <CardText>
                            {authorArray}
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
export default Article;