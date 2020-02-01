import React from 'react'

import UsersList from '../components/UsersList'

const Users = () => {

    // Dummy Data
    // const USERS = [];
    const USERS = [{id: 'u1', name: "Ryan Riesenberger", image: "https://www.bobross.com/v/vspfiles/templates/bobrossjoy/images/template/home_bob.png", places: 3}];

    return (
        <UsersList items={USERS} />
    )
}
export default Users;