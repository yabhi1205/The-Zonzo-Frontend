import SignUpForm from "./SignupForm"
import "./CSS/Signup.css"
const Form = () => {
    return (
        <>
            <div className=" h-[85vh] w-screen flex">
                <div className=" flex rounded-xl bg-blue-700 mx-auto my-auto">

                    <SignUpForm />
                </div>
            </div>
        </>
    )
}


export default Form