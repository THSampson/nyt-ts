import React from 'react';
interface IState {
_id: number,
multimedia: any,
headline: any,
length: string,
keywords: any,
snippet: string,
web_url: string,
results: any
}

type IProps = {
results?: any,
pageNumber?: any
}

class NYTResults extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
    }
render() {
return(
    <div>
        {this.props.results.map((result: IState) => {
            return(
                <div key={result._id}>
                 <h2>{result.headline.main}</h2>
                {result.multimedia.length > 1 ? <img alt="article" src={`http://www.nytimes.com/${result.multimedia[1].url}`} /> : ''}
                 <p>
                {result.snippet}
                 <br />
                {result.keywords.length > 0 ? 'Keywords:' : ''}
                </p>
                 <ul>
                {result.keywords.map((keyword: any) => <li key={keyword.value}>{keyword.value}</li>)}
                </ul>
                <a href={result.web_url}><button>Read It</button></a>
                </div>
            )
        })
        }
    </div>
)
}
}
export default NYTResults;