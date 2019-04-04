import React, {Component} from "react";
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import ArticlesCount from './ArticlesCount';

class AuthorView extends Component{

constructor(props){
	super(props)
}

render(){
		const author = this.props.article.author
		var authorArray;

	{/* Checking if the particular article has multiple authors*/}
        if(author instanceof Array){
        	{/* Created the child component and passed author name as a parameter */}
            authorArray = author.map(
                (auth,index)=>
	                <ArticlesCount authName = {auth.name} />            	
            )
        }else{
        		authorArray = <ArticlesCount authName = {author.name} />
	       
            
        }
	return(
		<div>
			{authorArray}
		</div>
		)
	}
}

	
export default AuthorView;