"use client"

import { useEffect, useState } from "react";
import Alert from "./Alert";
import Cookies from "universal-cookie";
import { useRouter } from 'next/navigation'

const SignUpForm = () => {
    let url = "https://loginapplication-p7v2.onrender.com/api"

    const [PassWordMessage, setPassWordMessage] = useState(false)
    const [OriginalPassword, setOriginalPassword] = useState("")
    const [RepeatPassword, setRepeatPassword] = useState("")
    const [PasswordErrors, setPasswordErrors] = useState([])
    const [Email, setEmail] = useState("")
    const [AlertShow, setAlertShow] = useState(false)
    const [AlertMessage, setAlertMessage] = useState("")
    const [AlertColor, setAlertColor] = useState(false)
    const [SignIn, setSignIn] = useState(false)
    const [spinner, setspinner] = useState(false)
    const cookies = new Cookies()
    const router = useRouter()

    const SubmitRequest = async () => {
        try {
            let body = {}
            if (SignIn) {
                body["email"] = Email
                body["password"] = OriginalPassword
            }
            else {
                body["name"] = document.getElementById("floating_first_name").value + document.getElementById("floating_last_name").value
                body["email"] = Email
                body["password"] = OriginalPassword
            }
            let finalUrl = SignIn ? `${url}/login` : `${url}/signup`
            let fetched = await fetch(finalUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(body)
            })
            let fetchData = await fetched.json()
            if (fetched.status != 200) {
                setAlertMessage(typeof (fetchData.error) === "string" ? fetchData.error : fetchData.error.map((e) => { return e.msg + "\n" }))
                setAlertColor(false)
                setAlertShow(true)
                setspinner(false)
            }
            else {
                cookies.set("authtoken", fetchData.authtoken)
                // window.location="/dashboard"
                router.push('/dashboard/')
                setspinner(false)
            }
            // cookies.set("authToken","akjshakjsgjah")
        }
        catch (error) {
            setAlertMessage("Unable to connect to the Server")
            setAlertColor(false)
            setAlertShow(true)
            setspinner(false)
        }
    }

    const validatePassword = (password) => {
        const errors = [];

        if (!password) {
            errors.push('Please enter the Password.')
        }
        // Check length (between 8 and 63 characters)
        if (!(password.length >= 8 && password.length <= 63)) {
            errors.push('Password should be between 8 and 63 characters.');
        }

        // Check for at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            errors.push('Password should contain at least one lowercase letter.');
        }

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            errors.push('Password should contain at least one uppercase letter.');
        }

        // Check for at least one symbol
        if (!/[^a-zA-Z0-9]/.test(password)) {
            errors.push('Password should contain at least one symbol.');
        }

        // Check for at least one numeric digit
        if (!/\d/.test(password)) {
            errors.push('Password should contain at least one numeric digit.');
        }

        return errors;
    }
    const password = (e) => {
        let errors = validatePassword(e.target.value)
        setPasswordErrors(errors)
        setOriginalPassword(e.target.value)
    }
    const passwordchk = (e) => {
        e.target.value === OriginalPassword ? (PasswordErrors.length > 1 ? setPasswordErrors(PasswordErrors.pop("Password doesn't match")) : setPassWordMessage(false)) : PasswordErrors.includes("Password doesn't match") ? true : setPasswordErrors(PasswordErrors.concat(["Password doesn't match"]))
        setRepeatPassword(e.target.value)
    }

    const CheckPasswordMessage = (e) => {
        setPassWordMessage(!(validatePassword(OriginalPassword).length == 0 && OriginalPassword == RepeatPassword))
    }
    const continueWithButton = (e) => {
        if (!SignIn && !(document.getElementById("floating_first_name").value != "" && document.getElementById("floating_last_name").value != "")) {
            setAlertColor(false)
            setAlertMessage("Please Enter the Name")
            setAlertShow(true)
            return
        }
        if (document.getElementById("floating_email").value == "") {
            setAlertColor(false)
            setAlertMessage("Please Enter Valid Email")
            setAlertShow(true)
            return
        }
        if (validatePassword(OriginalPassword).length > 0) {
            setAlertColor(false)
            setAlertMessage("Please Enter Valid Password")
            setAlertShow(true)
            return
        }
        if (!SignIn && (OriginalPassword != RepeatPassword)) {
            setAlertColor(false)
            setAlertMessage("Password Doesn't Match")
            setAlertShow(true)
            return
        }
        setAlertColor(true)
        setAlertMessage(SignIn ? "Login In The Account" : "Making The Account")
        setAlertShow(true)
        setspinner(true)
        SubmitRequest()
    }

    const chkMail = (e) => {
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(e.target.value)) {
            e.target.style.color = "green"
        }
        else {
            e.target.style.color = "#ef4444"
        }
        setEmail(e.target.value)
    }

    return (
        <>

            <div className="w-full max-h-[55%] h-full max-w-sm overflow-hidden  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
                {
                    SignIn ?
                        <div className="w-full py-3 text-xl text-center flex justify-center items-center">
                            <div className="w-1/2 py-3 bg-slate-600" onClick={() => setSignIn(true)}> Log In</div>
                            <div className="w-1/2 py-3" onClick={() => setSignIn(false)}> Sign In</div>
                        </div>
                        :
                        <div className="w-full py-3 text-xl flex text-center justify-center items-center">
                            <div className="w-1/2 py-3 px-3" onClick={() => setSignIn(true)}> Log In</div>
                            <div className="w-1/2 py-3 bg-slate-600" onClick={() => setSignIn(false)}> Sign In</div>
                        </div>
                }
                <div className="w-full p-4 sm:p-6 md:p-8">
                    {/* Name */}

                    {
                        !SignIn && <div className="grid md:grid-cols-2 md:gap-6">

                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                            </div>
                        </div>
                    }

                    {/* Email */}

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" onChange={(e) => chkMail(e)} value={Email} name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-red-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-red-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>

                    {/* Password */}

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="floating_password" value={OriginalPassword} onChange={(e) => password(e)} onFocus={() => CheckPasswordMessage()} onBlur={() => CheckPasswordMessage()} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

                    </div>

                    {/* Password Check */}

                    {!SignIn && <div className="relative z-0 w-full mb-5 group">
                        <input type="password" value={RepeatPassword} name="repeat_password" onFocus={() => CheckPasswordMessage()} onBlur={() => CheckPasswordMessage()} onChange={(e) => passwordchk(e)} id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    </div>}

                    {/* Submit Button */}

                    <div className="flex">
                        <button id="SubmitButton" onClick={(e) => SignIn ? continueWithButton() : continueWithButton()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        {spinner && <div className="px-2 h-full align-middle my-auto" role="status">
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>}
                    </div>


                </div>
                {PassWordMessage && (PasswordErrors.length > 0) && <div className="error absolute top-[40%] float-right translate-x-[80%]">
                    <div className="block max-w-sm p-6 bg-white border border-gray-200 min-w-72 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        {
                            PasswordErrors.map(element => {
                                return (<p key={element} className="font-normal text-gray-700 dark:text-gray-400">{element}</p>)

                            })
                        }
                    </div>
                </div>}
            </div>
            <Alert AlertShow={AlertShow} setAlertShow={setAlertShow} AlertColor={AlertColor} AlertMessage={AlertMessage} />
        </>
    )
}

export default SignUpForm