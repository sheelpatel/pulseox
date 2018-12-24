import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){                  //will run when component initialized
    super(props);

  }

   render(){                      // outputs to screen
     return(
       <div className="chart">
        <Line
        data ={this.props.children[1]}
        />
       </div>
     )
   }
}

export default Chart;
