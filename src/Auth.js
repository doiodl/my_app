import  React, { Component } from 'react';
import ReactBpmn from './Diagrams';
import './css_style/bootstrap.min.css';
import './css_style/signin.css';
import logo from './css_style/sber_logo.png';
import Cookies from 'universal-cookie';

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
		name: '',
		greeting: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
		handleChange(event) {
			this.setState({ name: event.target.value });
		}
		handleSubmit(event) {
			event.preventDefault();
			fetch(`/api/check_user?user_id=${encodeURIComponent(this.state.name)}&password=${document.getElementById('password').value}`)
				.then(response =>
					// console.log(response.json())
					response.json()
				)
				.then((result) => {
					console.log(result)
					if (result.answer)
					{
						var cookies = new Cookies();
						cookies.set('login', true, { path: '/' });
						this.props.go(ReactBpmn)
					}
					else
						alert("Error: Try admin admin")
				}
				);
		}

	render() {
		return (

			<form class="form-signin" width='50%' onSubmit={this.handleSubmit}>
			<img class="mb-4" src={logo} alt="" width="72" height="72"></img>
			<h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
			<label for="inputEmail" class="sr-only">Email address</label>
			<input id="user_id" type="text" value={this.state.name} onChange={this.handleChange} class="form-control" placeholder="Login" required autofocus></input>
			<label for="inputPassword" class="sr-only">Password</label>
			<input id="password" type="password" class="form-control" placeholder="Password" required></input>
				<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
			</form>
		)
	}
}

export default Auth;
