import React, {useState} from 'react'
import { Link} from 'react-router-dom'
import { Typewriter } from 'react-typewriting-effect'
import 'react-typewriting-effect/dist/index.css'
import gitLogo from './../assets/github.svg'
import linkedinLogo from './../assets/linkedin-logo.svg'


export function Area1(props) {
    const [isHidden, setisHidden] = useState(true);
    const onFirstlineComplete = () =>{
        setisHidden(false)
    }
    
    return (
    <div className="body-backgroud">
        <div className="home-upper">
        <div className="Area1">
            <div>
            <Typewriter
                string='Hi, I am Sayantan Mishra'
                delay={80}
                stopBlinkinOnComplete
                onComplete={onFirstlineComplete}
                className="typeWritter"
            />
            </div>
            {isHidden ?
                null :
                <Writer2 />
            }
        </div>
        <div className="home-social-links">
            <a href="https://github.com/sayanmdn">
                <img src={gitLogo} width="40px"/>
            </a>
            <a href="https://www.linkedin.com/in/sayanmdn/">
                <img src={linkedinLogo} width="40px" style={{marginLeft:"30px"}}/>
            </a>
        </div>
        </div>
        <div className="home-projects">
            <h2>Projects :</h2>
            <ul>
                <li>Http Logger :</li>
                <p>Please signup with your email id in th top right bar and login to use it</p>
                {/* <br/>
                <li>Chat App :</li>
                <p>Currently under deve</p> */}
            </ul>
        </div>
    </div>
    )
}

export function Writer2(props) {
    

    return (
        <div>
            <Typewriter
                string='Trainee Software Developer @Mantra Labs'
                delay={30}
                stopBlinkinOnComplete
            />
        </div>
    )
}
