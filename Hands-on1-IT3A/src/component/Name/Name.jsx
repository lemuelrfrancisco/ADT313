import './Name.css';

function Name({firstName, lastName}){
    return (
        <div>
            <h1><span className='text-firstname'>{firstName}</span> <span className='text-lastname'>{lastName}</span></h1>
        </div>
    )
}
export default Name;