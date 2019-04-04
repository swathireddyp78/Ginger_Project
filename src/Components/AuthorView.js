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
        if(author instanceof Array){
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