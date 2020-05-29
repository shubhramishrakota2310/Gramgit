import React from 'react';
import ReactDOM from 'react-dom';
import './main.css'
class Application extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        file: null,
        name:null,
        caption:null,
        data:[],
       
      }
      this.handleChange = this.handleChange.bind(this)
    }
    //Validates the image selected.
    Filevalidation = () => { 
      const fi = document.getElementById('file'); 
      // Check if any file is selected. 
      if (fi.files.length > 0) { 
          for (var i = 0; i <= fi.files.length - 1; i++) { 

              const fsize = fi.files.item(i).size; 
              const file = Math.round((fsize / 1024)); 
              // Validating the size of the file. 
              if (file >= 2048) { 
                  alert( 
                    "File too big, please select a file less than 2mb"); 
              }  else { 
                  document.getElementById('size').innerHTML = '<b>'
                  + file + '</b> KB'; 
              } 
          } 
      } 
  } 
    handleChange= (event) => {
      this.setState({
        file: URL.createObjectURL(event.target.files[0]),
        
        }
      )
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
                    required aria-required="true"//Ensures non-empty input.
                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                    placeholder="username"
                    value={this.state.name}
                    onChange={this.handleNameChange}/>

                
                  <input
                      type="text"
                      required aria-required="true"
                      className="form-control"//Ensures non-empty input.
                      placeholder="caption"
                      value={this.state.caption}
                      onChange={this.handleCaptionChange}/>
              
                
                <input
                      type="file"
                      id="file"
                      required aria-required="true"//Ensures non-empty input.
                      className="form-control"
                      placeholder="post"
                      onChange={this.handleChange}
                      onChange={this.Filevalidation}/>
                      
                      
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

  //Display after submitting.
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