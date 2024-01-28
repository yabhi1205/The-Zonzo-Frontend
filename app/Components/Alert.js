import { useEffect } from "react"

const Alert = ({ setAlertShow, AlertShow, AlertColor, AlertMessage }) => {




    useEffect(() => {
        setTimeout(() => {
            setAlertShow(false)
        }, 4000);
        if (AlertShow && AlertColor == true) {
            document.getElementById("alert").style.backgroundColor = "#166534"
        }
        if (AlertShow && AlertColor == false) {
            document.getElementById("alert").style.backgroundColor = "#991b1b"
        }
    }, [AlertShow])

    return (
        <>
            {AlertShow && <div className=" absolute bottom-5 right-5 max-w-64" >
                <div id="alert" className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">{AlertColor}</span> {AlertMessage}
                    </div>
                </div>
            </div >}
        </>
    )
}

export default Alert