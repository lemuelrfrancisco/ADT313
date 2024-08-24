import Name from '../../component/Name/Name';
import Description from '../../component/Description/Description';
import Section from '../../component/Section/Section';
import './Body.css';
import '@iconscout/unicons/css/line.css';


function Body({firstName,lastName,section,description}){


    return(
        <div className='content-box'>
            <div className='content-text'>
                <div className='content-text-card'>
                    <span><Section section={section} /></span>
                </div>

                <div className='content-name'>
                    <p><Name firstName={firstName} lastName={lastName}/><span className='typedText'></span></p>
                </div>
                <div className='content-text-info'>
                    <Description description={description}/>
                </div>

                <div className='content-text-button'>
                    <a href="https://github.com/FrancAlvenn" className="btn btn-blue">Github</a>
                    <a href='/Dela Cruz, Franc Alvenn - CV (2024).pdf' className="btn" download={"/Dela Cruz, Franc Alvenn - CV (2024).pdf"}>Download CV <i class="uil uil-file-alt"></i></a>
                </div>

                <div className="social-icons">
                    <a href='https://www.linkedin.com/in/franc-alvenn-dela-cruz/' className="icon"><i className="uil uil-facebook-f"></i></a>
                    <a href='https://www.linkedin.com/in/franc-alvenn-dela-cruz/' className="icon"><i className="uil uil-linkedin-alt"></i></a>
                    <div className="icon"><i className="uil uil-github-alt"></i></div>
                </div>
            </div>

            <div className='content-image'>
                <div className="image">
                    <img src="/Profile_Pic.png" alt="Profile Image" />
                </div>
            </div>
        </div>
    )
}


export default Body;