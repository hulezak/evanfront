import React, { useRef } from 'react'
import classes from './login.module.css'

import {useNavigate,Link} from 'react-router-dom'
import axios from '../axiosConfig'
import Header from '../components/Header/Header'
function Register() {
  const navigate = useNavigate()


    const userNameDom = useRef('')
    const firstnameDom = useRef('')
    const lastnameDom = useRef('')
    const emailDom = useRef('')
    const passwordDom = useRef('')
    
async function handleSubmit(e){
    e.preventDefault()
  const usernameValue = userNameDom.current.value
  const firstnameValue = firstnameDom.current.value
  const lastnameValue = lastnameDom.current.value
  const emailValue = emailDom.current.value
  const passwordValue = passwordDom.current.value

if(
    !usernameValue ||
    !firstnameValue||
    !lastnameValue ||
    !emailValue ||
    !passwordValue
){
    alert('please provide all required information')
  return
}

try{
await axios.post('/users/register',{
    username:usernameValue,
    firstname:firstnameValue,
    lastname:lastnameValue,
    email:emailValue,
    password:passwordValue
})

alert('registered successful please log in')
navigate('/')
} 
catch(error){
alert('something went wrong')
console.log(error)
}

}
    return (
        <>

     

<section className={classes.total_container}>

    <section className={classes.form_container}>

        <section className={classes.form_box}> 
    
<form onSubmit={handleSubmit}>

<h2>Join the network</h2>
<p>Already have an account  
    <Link to='/'> Sign in ?</Link>
</p>
    <div className={classes.long_input} >
       
        <input type="text"  ref={userNameDom} placeholder='username' />
    </div>
  
    <div className={classes.short_inputs} >
    <input 
       
       ref={firstnameDom}
           type="text" placeholder='first name' />
       
        <input type="text" ref={lastnameDom} placeholder='last name' />
    </div>
    <div className={classes.long_input}>
     
        <input type="text" ref={emailDom}  placeholder='email' />
    </div>
    <div  className={classes.long_input} >
       
        <input type="password" ref={passwordDom} placeholder='password' />
    </div>

    <div className={classes.long_input}>
    <button type='submit'>Agree and Join</button>
    </div>

   <div className={classes.terms_use_container}>


    <div className={classes.child_terms}>
        I agree to the <a href=""  >privacy policy</a>  and  <a href="">terms of service</a> </div>
 
     
      <Link className={classes.child_terms} to={'/'}>Already have an account ?</Link> 
    
   </div>

</form > 


</section>



<section className={classes.about}>
<Link className={classes.a} to='/about'>About</Link>

<div>
    <h2>Evangadi Networks Q&A</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum et delectus asperiores dolore architecto deserunt temporibus quia recusandae inventore alias nostrum eligendi dignissimos minu</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam in architecto non maxime corrupti ullam! Perferendis minus nostrum corporis! Optio quas perferendis accusantium dolorem possimus</p>

 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum sint quia alias neque amet fuga reprehenderit voluptas, necessitatibus est ad quis, eligendi sit laudantium impedit </p>
</div>

<button>How it Works</button>
</section>


    </section>
    </section>
    </>
  )
}

export default Register
