import  React, { Component } from 'react';
import './App.css';
import Auth from './Auth';
import './css_style/signin.css';
import Diagram_l from './Selector';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import ReactBpmn from './Diagrams';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			greeting: '',
			active_panel: Auth,
			selected_xml: '',
			selected_url: '',
			style: '',
			list: null,
			update_list: 0,
			cookie_d: new Cookies()
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.go = this.go.bind(this);
		this.change_xml = this.change_xml.bind(this);
		this.file_read = this.file_read.bind(this);
		this.save_server = this.save_server.bind(this);
	}

	componentDidMount()
	{
		if (this.state.cookie_d.getAll().login)
			this.go(ReactBpmn)
		// const cookies = new Cookies();
		// cookies.set('myCat', 'Pacman', { path: '/' });
		// console.log(cookies.getAll());
	}
	handleChange(event) {
	this.setState({ name: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
		.then(response => response.json())
		.then(state => this.setState(state));
	}
	go(data) {
		this.setState({ active_panel: data });
		this.setState({ list: true });
		document.getElementById('root').setAttribute('style', "width: 100%; height:100%");
		document.getElementById('first').setAttribute('style', "width: 90%; height:80%");
	};
	change_xml(name)
	{
		var el = this;
		fetch(`/api/get_diagram_text?name_diag=${encodeURIComponent(name)}`)
			.then((response) => response.json()).then((result) => {
				el.setState({selected_xml: result.diagram_text})
			}).catch((e) => console.log(e))
	}
	save_server()
	{
		var name = prompt("Please enter file name");
		if (name)
		{
			$.ajax({
				type: "POST",
				url: '/api/set_diagram_new',
				data: {text_diag:this.state.selected_xml ,name_diag:name},
			});
			this.setState({update_list : this.state.update_list + 1})
		}
	}
	file_read(e)
	{
		let el = this;
		let reader = new FileReader();
		if (e.target.files[0])
			reader.readAsText(e.target.files[0])
			reader.onload = function(event) {
				el.setState({ selected_xml: event.target.result });
			};
	}
	render() {
		return (
			<div className="App" style={{ width: '100%', height: '100%' }}>
				<div id='first'>
					{this.state.active_panel ? < this.state.active_panel go={this.go} url={this.state.selected_url} diagramXML={this.state.selected_xml} /> : null}
				</div>
				<div>
					{this.state.list ? <Diagram_l change={this.change_xml} update={this.state.update_list}/> : null}
				</div>
				<div>
					{this.state.list ? <input type='file' onChange={(e) => this.file_read(e)}></input> : null}
					{this.state.selected_xml ? <button id='save_on_serv' onClick={this.save_server} >Save to server</button> : null}
				</div>
			</div>
		)
	}
}

export default App;
