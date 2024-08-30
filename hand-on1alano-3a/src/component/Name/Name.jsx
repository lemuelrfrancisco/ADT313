import './Name.css';
function Name({Firstname, Lastname}) {
    return (
        <div>
            <h1 className='violet'>
                {Firstname} <span>{Lastname}</span></h1>
        </div>
    )
    
}

export default Name;