import SignUpForm from "./SignupForm"
import "./CSS/Signup.css"
const Form = () => {
    return (
        <>
            <div className=" h-[85vh] w-screen flex">
                <div className="w-full flex justify-center items-center rounded-xl  mx-auto my-auto">

                    <SignUpForm />
                </div>
            </div>
        </>
    )
}


export default Form