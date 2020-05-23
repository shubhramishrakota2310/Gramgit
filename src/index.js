import React from 'react';
import ReactDOM from 'react-dom';
import './main.css'
class Application extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data:[],
      }
    }
    
    fileChangedHandler = event => {
        this.setState({
          selectedFile: event.target.files[0]
        })

        let reader = new FileReader();
     
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result
          });
        }
     
        reader.readAsDataURL(event.target.files[0])
     
      }   
    onSubmit = event => {
      event.preventDefault();
      const username = this.username.value;
      const caption = this.caption.value;
      const imagePreviewUrl = this.imagePreviewUrl.value;
      const info = {username: username, caption: caption, imagePreviewUrl:<img src={this.state.imagePreviewUrl} alt="icon" width="600" />  };
      const data = [...this.state.data, info];
      this.setState({
        data: data
      });
    };
  
    render() {
        let $imagePreview = (<div className="previewText image-container"></div>);
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="500" /> </div>);
    }
      return (
          <div className="container">
            <h1>Post your images with a quirky caption!</h1>
  
            <hr/>
  
            <div className="row">
              <form className="form-inline" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Username"
                    ref={input => this.username = input}/>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="caption"
                      ref={input => this.caption = input}/>
                </div>
                <input
                      type="file"
                      className="form-control"
                      placeholder="post"
                      onChange={this.fileChangedHandler}
                      ref={input => this.imagePreviewUrl = input}/>
                      
                <button type="submit" className="btn btn-primary">Save</button>
                
              </form>
            </div>
  
            <hr/>
  
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
            <p className="card-title"><span>Username: </span>{props.info.username} </p>
            <p className="card-text">
              <span> </span>{props.info.imagePreviewUrl}
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