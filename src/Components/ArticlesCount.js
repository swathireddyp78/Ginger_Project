import React, {Component} from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

class ArticlesCount extends Component{
	constructor(props){
		super(props)
		this.state = {
			authName:null,
            count:null,
            isLoading: true
        }
	}

	componentDidMount(){
        var aname=this.props.authName
        var config = {
            header: {'Access-Control-Allow-Origin': '*'}
        };
        
        var today = new Date();
        var priorDate = new Date(new Date().setDate(today.getDate()-30));
        
        axios.get('//export.arxiv.org/api/query?search_query=all:='+aname+'&sortBy=lastUpdatedDate&sortOrder=descending',config)
        .then(res => {
            var XMLParser = require('fast-xml-parser');
            var xml = XMLParser.parse(res.data);

            console.log(xml);
            const result = xml.feed.entry.filter(ent=>new Date(ent.updated)>priorDate);

			this.setState({
				authName:aname,
				count:result.length,
				isLoading: false
              });

        })
    }

    render(){
    	if(this.state.isLoading){
			return<div className="text-center"><b>Loading.....</b></div>
		}
    	return(

    		<div>
    			<p><NavLink to={`/${this.state.authName}/author`} >{this.state.authName}</NavLink></p>
    			<p>Articles Written: {this.state.count}</p>
                <hr />
    		</div>

    		)
    }
}

export default ArticlesCount;