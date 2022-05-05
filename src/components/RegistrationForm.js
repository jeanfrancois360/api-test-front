import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const RegistrationForm = () => {

const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [members, setMembers] = useState([]);

const fetchMembers = async () => {
    try {
        let res =  await axios.get("http://localhost:8000/members/", {
                headers: {
                'Content-Type': 'application/json',
                }
        });
        setMembers(res);
   } catch (error) {
      console.error(error)
    }
}

useEffect(()=>{
   fetchMembers();
},[])

 const handleSubmit = (e) => {
   e.preventDefault();
   let data = {
    first_name: firstName,
    last_name: lastName,
   }
    try {
        let res = axios.post("http://localhost:8000/members/add/", {'first_name': data.first_name, 'last_name': data.last_name}, {
                headers: {
                'Content-Type': 'application/json',
                }
        });

        if(res){
            alert("registered successfully");
            fetchMembers()
        }
   } catch (error) {
      console.error(error)
    }
 }
 const handleChangeFN = (e) => {
    setFirstName(e.target.value)
 }

 const handleChangeLN = (e) => {
    setLastName(e.target.value)
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChangeFN} name="first_name" placeholder="Enter first name" required />
          <input type="text" onChange={handleChangeLN} name="last_name" placeholder="Enter last name" required />
          <button type="submit">Register</button>
      </form>
      <div>
          {members.data && members.data !== undefined ? members.data.map((member) => {
              return (
                  <p key={member.id}>{member.first_name} {member.last_name}</p>
              )
          }): "No data to show"}
      </div>
    </div>

  )
}
