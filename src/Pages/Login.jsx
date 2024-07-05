import React,{useRef} from 'react'
import axios from '../axiosConfig'
import { useNavigate,Link } from 'react-router-dom'
import classes from './login.module.css'

const Login = () => {
  const navigate = useNavigate()


  const userNameDom = useRef('')
  const firstnameDom = useRef('')
  const lastnameDom = useRef('')
  const emailDom = useRef('')
  const passwordDom = useRef('')
  

  async function handleSubmit(e){
    e.preventDefault()
  const emailValue = emailDom.current.value
  const passwordValue = passwordDom.current.value

if(
    !emailValue ||
    !passwordValue
){
    alert('please provide all required information')
  return
}

try{
const {data} = await axios.post('/users/login',{
    email:emailValue,
    password:passwordValue
})



localStorage.setItem('token',data.token)

alert('login successful')
navigate('/home')
// window.location.reload();
} 
catch(error){
alert(error?.response?.data?.msg)
console.log(error?.response?.data?.msg)
}

}

  return (
    <section className={classes.total_container}>
    <section className={classes.form_container}>
<section className={`${classes.form_box} ${classes.form_box_login}`}> 



    
<form onSubmit={handleSubmit}>

  <h2>Login to your account</h2>
  <p>
    Don't have an account ? <Link className={classes.a} > Create a new account</Link>
  </p>

    <div className={classes.long_input}>
      
        <input className=''  type="text" ref={emailDom} placeholder='Your email' />
    </div>
    <div className={classes.long_input}>
  
        <input type="password" ref={passwordDom} placeholder='password' />
    </div>
<button type='submit'>LogIn</button>
<div className={classes.registerLink}>
<Link   to={'/register'}>Create an account</Link> 

</div>

 
</form>

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


  )
}

export default Login
