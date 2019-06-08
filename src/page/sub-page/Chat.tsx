import React from "react";
import { Grid, List, Image, Segment, Search } from "semantic-ui-react";

const initialState = { isLoading: false, results: [], value: '' }

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

export default class Chat extends React.Component {

  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

    render() {
        return (
            <Grid style={{
                width: '70%', height: '100%',
                margin: '0px auto'
            }}>
                <Grid.Row columns={2}>
                    <Grid.Column width={3}>
                        <Search
                            loading={false}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                            leading: true,
                            })}
                            results={results}
                            value={value}
                            {...this.props}
                        />
                        <List selection verticalAlign='middle'>
                            <List.Item>
                                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg'
                                 style={{filter: 'grayscale(100%)'}} />
                                <List.Content>
                                    <List.Header>Helen</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                                <List.Content>
                                    <List.Header>Christian</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                                <List.Content>
                                    <List.Header>Daniel</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <div style={{
                            width: '100%', height: '100%',
                            borderRadius: 5,
                            backgroundColor: 'rgb(120, 120, 120)'
                        }}>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                    </Grid.Column>
                </Grid.Row>                
            </Grid>
        )
    }

}