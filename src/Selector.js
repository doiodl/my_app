import  React, { Component } from 'react';
import './App.css';
import './css_style/signin.css';

class Diagram_l extends Component {
	constructor(props) {
		super(props);
		this.state = {
			diagram: [],
			selected: ''
		};
		this.tick = this.tick.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	componentWillReceiveProps()
	{
		this.tick(this)
	}

	tick(e)
	{
		fetch('/api/get_diagram_list')
			.then(function (response) {
				return response.json();
		})
		.then(function (data) {
			e.setState({ diagram: data['diagram_arr']});
		});
	}
	onChange(event)
	{
		event.preventDefault();
		this.props.change(document.getElementById('select').value)
	}
	componentDidMount() {
		this.tick(this)
	}
	render()
	{
		return (
			<form id='from_xml' onSubmit={this.onChange}>
				<select id="select" name={this.props.update}>
				{this.state.diagram.map((element, i) => {
					return (<option value={element.diagram_name} key={i}>{element.diagram_name}</option>)
				})}
				</select>
				<input type="submit" value="Select XML"/>
			</form>

		)
	}
}
export default Diagram_l;
