import { userState } from "@/store/atom/user"
import { userNameState } from "@/store/selector/cred"
import { RecoilBridge, RecoilRoot, useRecoilValue } from "recoil"

export default function blankPage() {
    const name2 = useRecoilValue(userNameState);
    return(

    

    <div>

        <h1>{name2}</h1>
    </div>
    
    )

}