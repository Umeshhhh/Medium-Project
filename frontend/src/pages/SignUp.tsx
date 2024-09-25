import SideComp from "../components/SideComp";
import UpComp from "../components/UpComp";


export default function SignUp(){

    return(
        <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            <UpComp />
            <SideComp />
        </div>
    )
}