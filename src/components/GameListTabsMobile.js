import React from 'react'

export default ()=>{
	return(
		<div>
      <div className="tabs is-right">
       		<span>
       			<a>Sort By</a>
       		</span>
	        <ul>
	          <li className="active" ><a><span  className="sort-anchor">Score</span>
	              <i className="fa fa-arrow-down"></i></a>
	          </li>
	          <li><a><span  className="sort-anchor">Name</span>
	              <i></i></a>
	          </li>
	          <li><a><span  className="sort-anchor">Platform</span>
	              <i></i></a>
	          </li>
	        </ul>


      </div>

        <div style={{"display":"none"}}>
          <p className="control">
            <input className="input" type="text" placeholder="Find by name..."/>
          </p>
        </div>
      </div>


    );
}