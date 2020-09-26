import React from 'react';
import './App.css';
import NYTResults from './NYTResults';

const baseURL: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key: string = '2SYZX9MuGF9vTaqSL3RH50rQZMbdHDEY';

type IProps = {
  results?: any,
  pageNumber?: any
  }
  

interface IState {
  pageNumber: number,
  search: string,
  startDate: string,
  endDate: string,
  results: any

}

class NYTApp extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props) 
    this.state = {
      pageNumber: 0,
      search: '',
      startDate: '',
      endDate: '',
      results: []
    }
  
  }

 fetchResults = () => {
    let url: string = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;
    url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
    url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;
  
  fetch(url)
  .then(res => res.json())
  .then(data =>  { console.log(data)
    this.setState({
      results: data.response.docs
    })
    // let results = data.response.docs 
  })
  .catch(err => console.log(err))

  };

  
 handleSubmit = (event: any) => {
    this.fetchResults();
    event.preventDefault();
  
 }

changePageNumber = (event: any, direction: any) => {
    event.preventDefault()
    if(direction === 'down') {
      if (this.state.pageNumber > 0) {
        this.setState({
          pageNumber: this.state.pageNumber - 1
        })
        this.fetchResults();
      }
    }
    if (direction === 'up') {
      this.setState({
        pageNumber: this.state.pageNumber + 1
      })
      this.fetchResults();
    }
  }
 
    
  
  
  
  render() {
  return (
    <div className="App">
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <span>Enter a single search term (required):</span>
        <input type="text" name="search" onChange={(event) => this.setState({search: event.target.value})} required />
        <br />
        <span>Enter a start date:</span>
        <input type="date" name="startDate" pattern="[0-9]{8}" onChange={(event) => this.setState({startDate: event.target.value})} />
        <br />
        <span>Enter an end date:</span>
        <input type="date" name="endDate" pattern="[0-9]{8}" onChange={(event) => this.setState({endDate: event.target.value})} />
        <br />
        <button className="submit">Submit Search</button>
      </form>
      {
        this.state.results.length > 0 ? <NYTResults results={this.state.results} pageNumber={this.changePageNumber}  /> : ''
      }
    </div>
  )
}
}


export default NYTApp;
