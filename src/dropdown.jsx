import React from 'react';

class AccountDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			parentClass: props.parentClass
		};

		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.closeDropdown = this.closeDropdown.bind(this);
	}

	toggleDropdown() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	closeDropdown() {
		this.setState({ isOpen: false });
	}

	render() {
		return (
			<div class={this.state.parentClass}>
				<div class="relative">
					<button
						onClick={this.toggleDropdown}
						class="relative z-10 block border-2 bg-gray-500 rounded-lg border-gray-500 bg-opacity-70 text-white overflow-hidden focus:outline-none focus:font-bold px-3 py-1 hover:bg-opacity-50 mt-3 mr-8"
					>
						Guides <span className='text-xs'>▼</span>
					</button>
					<button
						class={
							this.state.isOpen ? (
								' cursor-default bg-black opacity-50 fixed inset-0 w-full h-full'
							) : (
								'hidden'
							)
						}
						onClick={this.closeDropdown}
						tabIndex="-1"
					/>
					<div
						class={
							this.state.isOpen ? (
								'absolute right-0 mt-2 w-48 bg-white rounded-lg py-2 shadow-xl'
							) : (
								'hidden'
							)
						}
					>
						<a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
							Define variable
						</a>
						<a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
							For and while loops
						</a>
						<a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
							If and else statements
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default AccountDropdown