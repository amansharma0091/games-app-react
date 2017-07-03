import React from 'react';

export class GamesListTabs extends React.Component{
  render(){
    return(
      <div className="tabs is-right">
        <div style={{"borderBottom":"1px solid #ccc"}}>
          <p className="control">
            <input className="input" type="text" placeholder="Find by name..." />
          </p>
        </div>
        <ul>
          <li>Sort By</li>
          <li className="active"><a><span  className="sort-anchor">Score</span>
              <i className="fa fa-arrow-down"></i></a>
          </li>
          <li><a><span  className="sort-anchor">Score</span>
              <i className="fa fa-arrow-down"></i></a>
          </li>
          <li><a><span  className="sort-anchor">Score</span>
              <i className="fa fa-arrow-down"></i></a>
          </li>
        </ul>
      </div>
    );
  }
}