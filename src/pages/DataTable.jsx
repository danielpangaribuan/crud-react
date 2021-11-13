import React from 'react';
import Axios from 'axios';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

class DataTable extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			clients : [],
			name : '',
			email : '',
			phone : '',
			currency : '',
			address : '',
			postalZip : '',
			region : '',
			page: 0,
			rowsPerPage: 10
		}
	}

	handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
	}

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: +event.target.value});
		this.setState({ page: 0 });
	}

  	componentDidMount () {
		Axios.get('http://localhost:2000/clients')
		.then(response => {
			this.setState({ clients: response.data });
		})
		.catch(error => console.log('error : ', error));
	}

	renderClientList = () => {
		const { clients, page, rowsPerPage } = this.state;
		return clients
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			.map((row) => {
			return (
				<TableRow key={row.id}>
					<TableCell>{row.id}</TableCell>
					<TableCell>{row.name}</TableCell>
					<TableCell>{row.email}</TableCell>
					<TableCell>{row.phone}</TableCell>
					<TableCell>{row.currency}</TableCell>
					<TableCell>{row.address}</TableCell>
					<TableCell>{row.postalZip}</TableCell>
					<TableCell>{row.region}</TableCell>
					<TableCell>
						<Button onClick={() => this.deleteTableList(row.id)} size="small" variant="contained" color="error" startIcon={<DeleteIcon />}>
							Delete
						</Button>
					</TableCell>
				</TableRow>
			)
		})
	}

  	deleteTableList = (id) => {
		Axios.delete(`http://localhost:2000/clients/${id}`)
		.then(() => {
			alert(`ID Data ${id} Deleted`);
			this.componentDidMount();
		})
		.catch(error => console.log('error : ', error));
  	}

	onButtonSubmit = () => {
		const newClient = {
			name : this.state.name,
			email : this.state.email,
			phone : this.state.phone,
			currency : this.state.currency,
			address : this.state.address,
			postalZip : this.state.postalZip,
			region : this.state.region,
			numberrange : 0,
			country : ''
		}
		Axios.post('http://localhost:2000/clients', newClient)
		.then(() => {
			this.setState({
				name : '',
				email : '',
				phone : '',
				currency : '',
				address : '',
				postalZip : '',
				region : '',
			})
			this.componentDidMount();
		})
		.catch(error => console.log('error : ', error));
	}
	render () {
		return (
			<Paper sx={{ width: '100%' }}>
				<TableContainer sx={{ maxHeight: 600 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell>
									<TextField id="input-name" label="Name" variant="standard" value={this.state.name} onChange={ event => this.setState({ name : event.target.value })} />
								</TableCell>
								<TableCell>
									<TextField id="input-email" label="Email" variant="standard" value={this.state.email} onChange={ event => this.setState({ email : event.target.value })} />
								</TableCell>
								<TableCell>
									<TextField id="input-phone" label="Phone" variant="standard" value={this.state.phone} onChange={ event => this.setState({ phone : event.target.value })} />
								</TableCell>
								<TableCell>
									<TextField id="input-currency" label="Currency" variant="standard" value={this.state.currency} onChange={ event => this.setState({ currency : event.target.value })} />
								</TableCell>
								<TableCell>
									<TextField id="input-address" label="Address" variant="standard" value={this.state.address} onChange={ event => this.setState({ address : event.target.value })} />
								</TableCell>
								<TableCell>
									<TextField id="input-postzip" label="Post/Zip" variant="standard" value={this.state.postalZip} onChange={ event => this.setState({ postalZip : event.target.value })} />
								</TableCell>
								<TableCell>
									<TextField id="input-region" label="Region" variant="standard" value={this.state.region} onChange={ event => this.setState({ region : event.target.value })} />
								</TableCell>
								<TableCell>
									<Button variant="contained" size="small" onClick={this.onButtonSubmit}>
										Add
									</Button>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ top: 81 }}>ID</TableCell>
								<TableCell style={{ top: 81 }}>Name</TableCell>
								<TableCell style={{ top: 81 }}>Email</TableCell>
								<TableCell style={{ top: 81 }}>Phone</TableCell>
								<TableCell style={{ top: 81 }}>Currency</TableCell>
								<TableCell style={{ top: 81 }}>Address</TableCell>
								<TableCell style={{ top: 81 }}>Post/Zip</TableCell>
								<TableCell style={{ top: 81 }}>Region</TableCell>
								<TableCell style={{ top: 81 }}>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody style={{ maxHeight: '200px' }}>
							{ this.renderClientList() }
						</TableBody>
						
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10,25,100]}
					component="div"
					count={ this.state.clients.length }
					rowsPerPage={ this.state.rowsPerPage }
					page={ this.state.page }
					onPageChange={ this.handleChangePage }
					onRowsPerPageChange={ this.handleChangeRowsPerPage }	
				/>
			</Paper>
		)
	}
}

export default DataTable;