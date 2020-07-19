import React from "react"
import Axios from "axios"
import {API_URL} from "../../../../Constants/API"
import{Table} from "reactstrap"

class DataMember extends React.Component {
    state = {
        memberData: [],
    }

    getMemberData = () => {
        Axios.get(`${API_URL}/members/dataMember`)
        .then((res) => {
            this.setState({ memberData: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getMemberData();
    }

    renderMemberData = () => {
        return this.state.memberData.map((val) => {
            const {id, username, name, email, phone} = val;
            return(
                <>
                <tr>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                </tr>
                </>
            )
        })
    }

    render(){
        return(
            <div className="container py-4 text-center">
                <h3>Data Member</h3>
                <Table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    </thead>
                    <tbody>{this.renderMemberData()}</tbody>
                </Table>
            </div>
        )
    }
}

export default DataMember;