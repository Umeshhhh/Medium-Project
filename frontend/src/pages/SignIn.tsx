import InComp from "../components/InComp";
import SideComp from "../components/SideComp";


export default function SignIn(){

    return(
        <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            <InComp />
            <SideComp />
        </div>
    )
}