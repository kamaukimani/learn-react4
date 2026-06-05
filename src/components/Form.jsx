import React,{useState,useEffect} from 'react'

function Form(){
     const initialFormData={
        userName:"",
        password:"",
        isAdult:false
    }
    const [users,setUsers]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)
    const [formData,setFormData]=useState(initialFormData)
   
    useEffect(()=>{
        fetch("http://localhost:3000/persons")
        .then(res=>res.json())
        .then(data=>{
            setUsers(data)
            setIsLoaded(true)
        })
    },[])
    const displayUsers=users.map((user)=>(
        <li key={user.userName}>UserName: {user.userName} Password: {user.password}</li>
    ))
    if(!isLoaded) return <h2>Loading.....</h2>
    function handleAdd(event){
        const name=event.target.name;
        const value=event.target.value;
        const checked=event.target.checked;
        const type=event.target.type
        
        setFormData({
            ...formData,
            [name]:type==="checkbox"? checked:value
        })
    }
    //console.log(formData)
    function handleSubmit(e){
        e.preventDefault()
        fetch("http://localhost:3000/persons",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then(data=>{
            setUsers([
                ...users,
                data
            ])
            setFormData(initialFormData)
        })

    }
    return(
        <>
            <div>
                <h2>My Logged in Users</h2>
                <ol>{displayUsers}</ol>
            </div>
            <form onSubmit={handleSubmit}>
                <h2>My Login Form</h2>
                <label>
                    UserName:
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleAdd}
                    />
                </label><br/>
                <label>
                    Password:
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleAdd}

                    />
                </label><br/>
                <label>
                    <input
                        type="checkbox"
                        id="isAdult"
                        name="isAdult"
                        checked={formData.isAdult}
                        onChange={handleAdd}
                    />
                    Adult
                </label><br/>
                <input type="submit" value="Click To Submit"/>
            </form>
        </>
    )
}

export default Form;