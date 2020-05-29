import React from 'react';
import ReactDOM from 'react-dom';
import './main.css'
class Application extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        file: null,
        name:'',
        caption:'',
        data:[]
      }
      this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
      this.setState({
        file: URL.createObjectURL(event.target.files[0])
      })
    }

    handleNameChange = (event) => {
      this.setState({ name: event.target.value});
    };

    handleCaptionChange = (event) => {
      this.setState({ caption: event.target.value});
    };

    handleSubmit = event => {
      event.preventDefault();
      const info = {name: this.state.name, caption: this.state.caption, file:<img src={this.state.file} alt="icon" width="600" />}
      const data = [...this.state.data, info];
      this.setState({
        data: data
      });
    };
   
  
    
      
    render() {
       
      return (
          <div className="container" onSubmit={this.handleSubmit}>
            <h1>Post your images with a quirky caption!</h1>
  
            <hr/>
  
            <div className="row">
              <form className="form-inline" layout="inline">
              <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                <input
                    type="text"
                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                    value={this.state.name}
                    onChange={this.handleNameChange}/>
                
                  <input
                      type="text"
                      className="form-control"
                      placeholder="caption"
                      value={this.state.caption}
                      onChange={this.handleCaptionChange}/>
              
                
                <input
                      type="file"
                      className="form-control"
                      placeholder="post"
                      onChange={this.handleChange}/>
                      
                  </div>
                      
                <button type="submit" className="btn btn-primary">Save</button>
                
              </form>
            </div>

            <div className="row">
              {
                this.state.data.map((info, index) => <Card key={index} info={info}/>)
              }
            </div>
  
            
  
          </div>
      )
    }
  }


  const Card = props =>
  <div className="col-md-6 col-lg-3">
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-title"><span>Username: </span>{props.info.name} </p>
        <p className="card-text">
          <span> </span>{props.info.file}
        <p className="card-post">
          <span>caption: </span>{props.info.caption}</p>
          
        </p>
      </div>
    </div>
  </div>;
  
  ReactDOM.render(
      <Application/>,
      document.getElementById('root')
  );