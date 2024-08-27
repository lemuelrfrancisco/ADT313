import './Name.css'

function Name({firstName,lastName}) {
    return (
        <div> 
            <h1 className= 'name'> <span className='firstName'>{firstName}</span> <span className='lastName'>{lastName}</span></h1>
        </div>
    )
}

export default Name