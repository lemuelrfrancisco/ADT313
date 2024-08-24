import './Header.css'

function Header(){

    return(
        <nav className='header'>
            <div className='nav-logo'>
                <p className='nav-name'>FDC <span>.</span></p>
            </div>
            <div className="nav-button">
                <a href='/Dela Cruz, Franc Alvenn - CV (2024).pdf' className="btn" download={"/Dela Cruz, Franc Alvenn - CV (2024).pdf"}>Download CV <i class="uil uil-file-alt"></i></a>
            </div>
        </nav>
    )


}


export default Header;