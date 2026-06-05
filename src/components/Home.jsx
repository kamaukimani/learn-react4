import React,{useState,useEffect} from 'react'

function Home(){
    const [people,setPeople]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)

    // useEffect(()=>{
    //     fetch("http://api.open-notify.org/astros.json")
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setPeople(data.people)
    //         setIsLoaded(true)
    //     })
    // },[])

    function handleFetch(){
        fetch("http://api.open-notify.org/astros.json")
        .then(res=>res.json())
        .then(data=>{
            setPeople(data.people)
            setIsLoaded(true)
        })
        .catch(error=>console.log(error))
    }
    // if(!isLoaded) return<h2>Loading.......</h2>
    const displayPeople=people.map((person,index)=>(
        <li key={index}>{person.name}</li>
    ))
    return(
        <div>
            <h2>Welcome to my 4th react application</h2>
            <button onClick={handleFetch}>Fetch Data</button>
            <ol>
                {displayPeople}
            </ol>
        </div>
    )
}
export default Home;