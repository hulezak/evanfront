import React from 'react'
import classes from './header.module.css'
import evangadiLogo from '../../assets/evan_logo.png'
import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <div>
      

<nav className={classes.header}>
<div>
    
     {/* evangadi logo */}
<img src={evangadiLogo} alt="" />
</div>



  


    <div>

        <ul className={classes.header_list}>
            <Link className={classes.homelink} to='/home'> <li>Home</li></Link>
            <li>How It Works</li>
            <li>
                {/* log out button */}
                <button>LogOut</button>
            </li>
        </ul>
    </div>
</nav>
<hr />
    </div>
  )
}

export default Header
